#!/usr/bin/env python3
"""Misst die Segmentgrenzen einer Reel-Tonspur, statt sie zu schaetzen.

`ffmpeg -af silencedetect` findet die Sprechpausen. Aus der Wortzahl je Abschnitt
kommt eine Erwartung, die dann auf eine echte Pause gerastet wird.

WICHTIG, gelernt am 31.08.2026: die reine Nearest-Neighbour-Rasterung greift daneben.
Eine TTS-Stimme macht zwischen zwei Absaetzen eine deutlich laengere Pause als
zwischen zwei Saetzen, und die kurze Satzpause liegt manchmal naeher an der
Erwartung. Bei Thailand hat das zwei von acht Grenzen falsch gesetzt: einmal auf die
Pause nach „Up to a year in prison" statt auf den Absatz danach, einmal auf die Pause
nach dem Wort „Seven." statt davor. Deshalb geht die Pausenlaenge mit ins Ergebnis
ein - K gewichtet, wie stark eine lange Pause eine groessere Abweichung aufwiegt.

Usage:
    python3 measure-cuts.py <audio.wav> <sections.json> [out.json]

sections.json: [["Name", "gesprochener Text des Abschnitts"], ...]
"""
import json
import re
import subprocess
import sys

# Wie stark eine lange Pause zaehlt, in Sekunden Abweichung je Sekunde Pause.
# 6 trennt bei den bisherigen Spuren Absatz- sauber von Satzpausen.
K = 6.0
# Mindestabstand zur vorigen Grenze, damit kein Abschnitt auf null zusammenfaellt.
MIN_GAP = 1.2


def duration(path):
    out = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
         '-of', 'csv=p=0', path],
        capture_output=True, text=True, check=True).stdout
    return float(out.strip())


def pauses(path, noise='-32dB', mindur='0.30'):
    out = subprocess.run(
        ['ffmpeg', '-hide_banner', '-nostats', '-i', path,
         '-af', f'silencedetect=noise={noise}:d={mindur}', '-f', 'null', '-'],
        capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return [((s + e) / 2, e - s) for s, e in zip(starts, ends)]


def measure(audio, sections):
    total = duration(audio)
    ps = pauses(audio)
    counts = [len(text.split()) for _, text in sections]
    words = sum(counts)
    cuts = [0.0]
    cum = 0
    used = set()
    for n in counts[:-1]:
        cum += n
        expected = total * cum / words
        cand = [(m, d) for m, d in ps if m > cuts[-1] + MIN_GAP and m not in used]
        if not cand:
            raise SystemExit(f'keine Pause mehr fuer Grenze bei {expected:.2f}s')
        best = min(cand, key=lambda md: abs(md[0] - expected) - K * md[1])
        used.add(best[0])
        cuts.append(round(best[0], 2))
    cuts.append(round(total, 2))
    return cuts, total, words


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    audio, secfile = sys.argv[1], sys.argv[2]
    out = sys.argv[3] if len(sys.argv) > 3 else 'cuts.json'
    sections = json.load(open(secfile))
    cuts, total, words = measure(audio, sections)
    for i, (name, _) in enumerate(sections):
        print(f'{i + 1} {name:12s} {cuts[i]:6.2f} - {cuts[i + 1]:6.2f} '
              f'({cuts[i + 1] - cuts[i]:5.2f} s)')
    json.dump(cuts, open(out, 'w'))
    print(f'-> {out}  ({total:.2f} s, {words} Woerter, '
          f'{words / total * 60:.1f} W/min)')


if __name__ == '__main__':
    main()
