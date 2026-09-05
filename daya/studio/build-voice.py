#!/usr/bin/env python3
"""Baut die Tonspur eines Trial Reels aus abschnittsweise vertonten Clips.

WARUM ABSCHNITTSWEISE. Beim Thailand-Reel kam die Stimme in einem Stueck und
`measure-cuts.py` hat die Segmentgrenzen hinterher aus den Sprechpausen
herausgemessen. Fuer die Trials geht das nicht mehr auf: bei fuenf Abschnitten
und elf Pausen liegen Satz- und Absatzpausen zu dicht beieinander, und die
Grenze rutscht auf die falsche. Wer jeden Abschnitt einzeln vertont, kennt die
Grenzen exakt und muss nichts messen.

WAS HIER GEMESSEN WIRD. Die Rohclips von seed_audio tragen lange Pausen: bei
Japan waren es 10,7 Sekunden auf 21,3 Sekunden reine Sprache, also ein Drittel
der Laufzeit. Die Stimme selbst liegt mit 161 W/min genau im normalen Bereich.
Beschleunigen waere deshalb der falsche Hebel gewesen - `atempo 1.35` haette
sie auf ueber 200 W/min gehetzt, obwohl nur die Stille zu lang war.

Also: jede Pause INNERHALB eines Abschnitts wird auf GAP_IN gekuerzt, die
Stille am Anfang und Ende faellt ganz weg, und zwischen zwei Abschnitten steht
genau GAP_OUT. Damit steht die Gesamtlaenge fest, statt sich zu ergeben.

Usage:
    python3 build-voice.py audio/trial1
Erwartet dort s1.wav ... sN.wav und schreibt voice.wav plus cuts.json.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

GAP_IN = 0.24   # Pause innerhalb eines Abschnitts, in Sekunden
GAP_OUT = 0.30  # Pause zwischen zwei Abschnitten

# Nach dem Hook laenger. Das Cover stellt ein Raetsel und will abgesucht werden;
# in der ersten Fassung stand es 3,7 Sekunden, das reicht fuer den Satz, aber
# nicht fuer den Blick. Der erste Punkt setzt danach ein.
GAP_AFTER_HOOK = 0.90
THRESH = '-35dB'
MINDUR = '0.18'


def run(*args):
    return subprocess.run(args, capture_output=True, text=True)


def duration(path):
    out = run('ffprobe', '-v', 'error', '-show_entries', 'format=duration',
              '-of', 'csv=p=0', str(path)).stdout.strip()
    return float(out)


def pauses(path):
    err = run('ffmpeg', '-hide_banner', '-nostats', '-i', str(path),
              '-af', f'silencedetect=noise={THRESH}:d={MINDUR}',
              '-f', 'null', '-').stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    ee = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    return list(zip(ss, ee))


def tighten(src, dst):
    """Schneidet die Sprechteile heraus und setzt sie mit GAP_IN zusammen."""
    total = duration(src)
    ps = pauses(src)
    speech = []
    cur = 0.0
    for s, e in ps:
        if s > cur + 0.05:
            speech.append((cur, s))
        cur = e
    if total > cur + 0.05:
        speech.append((cur, total))
    if not speech:
        raise SystemExit(f'keine Sprache in {src}')

    tmp = dst.parent / 'tmp'
    tmp.mkdir(exist_ok=True)
    parts = []
    for i, (a, b) in enumerate(speech):
        piece = tmp / f'{dst.stem}-{i}.wav'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(src),
                        '-ss', f'{a:.3f}', '-to', f'{b:.3f}', str(piece)], check=True)
        parts.append(piece)
        if i < len(speech) - 1:
            gap = tmp / f'{dst.stem}-{i}-gap.wav'
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi',
                            '-i', f'anullsrc=r=44100:cl=mono', '-t', f'{GAP_IN}',
                            str(gap)], check=True)
            parts.append(gap)
    listfile = tmp / f'{dst.stem}.txt'
    listfile.write_text(''.join(f"file '{p.name}'\n" for p in parts))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat',
                    '-safe', '0', '-i', listfile.name, str(dst.resolve())],
                   cwd=str(tmp), check=True)
    return duration(dst)


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    d = Path(sys.argv[1])
    srcs = sorted(d.glob('s[0-9].wav'), key=lambda p: int(p.stem[1:]))
    if not srcs:
        raise SystemExit(f'keine s1.wav ... sN.wav in {d}')

    tight = d / 'tight'
    tight.mkdir(exist_ok=True)
    lens = []
    for s in srcs:
        out = tight / s.name
        lens.append(tighten(s, out))
        print(f'{s.name}  {duration(s):5.2f} -> {lens[-1]:5.2f} s')

    gaps = [GAP_AFTER_HOOK] + [GAP_OUT] * (len(srcs) - 2)
    for i, g in enumerate(gaps):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi',
                        '-i', 'anullsrc=r=44100:cl=mono', '-t', f'{g}',
                        str(tight / f'gap{i}.wav')], check=True)

    parts = []
    for i, s in enumerate(srcs):
        parts.append(s.name)
        if i < len(srcs) - 1:
            parts.append(f'gap{i}.wav')
    (tight / 'list.txt').write_text(''.join(f"file '{p}'\n" for p in parts))
    voice = d / 'voice.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat',
                    '-safe', '0', '-i', 'list.txt', str(voice.resolve())],
                   cwd=str(tight), check=True)

    # Die Grenze liegt am ENDE der Pause, nicht in ihrer Mitte: das Bild
    # wechselt, wenn der naechste Satz einsetzt, und haelt solange die Pause
    # laeuft. In der Mitte geschnitten wechselte es mitten in die Stille.
    cuts = [0.0]
    t = 0.0
    for i, ln in enumerate(lens):
        t += ln
        if i < len(lens) - 1:
            t += gaps[i]
            cuts.append(round(t, 2))
    cuts.append(round(duration(voice), 2))

    json.dump(cuts, open(d / 'cuts.json', 'w'))
    sec = json.load(open(d / 'sections.json'))
    words = sum(len(x[1].split()) for x in sec)
    for i, (name, _) in enumerate(sec):
        print(f'{i + 1} {name:10s} {cuts[i]:6.2f} - {cuts[i + 1]:6.2f} '
              f'({cuts[i + 1] - cuts[i]:5.2f} s)')
    total = duration(voice)
    print(f'-> {voice}  {total:.2f} s, {words} Woerter, {words / total * 60:.1f} W/min')


if __name__ == '__main__':
    main()
