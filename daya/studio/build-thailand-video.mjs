// Baut das MP4 zum Thailand-Reel aus den Slides von build-thailand.mjs.
//
// Die Segmentgrenzen sind GEMESSEN, nicht geschaetzt: `ffmpeg -af silencedetect`
// hat die Sprechpausen in `audio/thailand/thailand-isla-115.wav` gefunden, die
// neun Grenzen stehen in `audio/thailand/cuts.json`. Jeder Frame sitzt damit auf
// einer echten Pause zwischen „One.", „Two." und so weiter.
//
// Aufbau wie in build-reel-hotel-canceled.mjs: das Foto bekommt einen langsamen
// Push-in, der Textlayer bleibt stehen. Wuerde man den fertigen Slide zoomen,
// wanderte die Schrift mit und wuerde unscharf.
//
// Der Schlussframe laeuft HOLD Sekunden laenger als die Tonspur, damit „Save this
// before you fly." lesbar bleibt, wenn die Stimme schon fertig ist.
//
// Usage: node build-thailand.mjs && node build-thailand-video.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'reels', 'thailand');
const GRID = join(OUT, 'grids');
const OV = join(OUT, 'overlays');
// Fassung 2: der Cannabis-Satz war inhaltlich unbrauchbar und wurde neu vertont.
// Die neue Aufnahme wurde langsamer eingelesen (132 statt 147 W/min), deshalb
// atempo 1.30 statt 1.15 - damit liegt sie wieder bei 172 W/min wie die
// abgenommene Fassung.
const AUDIO = join(__dirname, 'audio', 'thailand', 'thailand-isla-v2-130.wav');
const CUTS = join(__dirname, 'audio', 'thailand', 'cuts.json');
const W = 1080, H = 1920, FPS = 30;
const HOLD = 2.0; // Nachlauf auf der Schlusskarte, in Sekunden

const ids = ['01', '02', '03', '04', '05', '06', '07', '08', 'end'];
const cuts = JSON.parse(readFileSync(CUTS, 'utf8'));
if (cuts.length !== ids.length + 1) {
  throw new Error(`cuts.json hat ${cuts.length} Grenzen, erwartet ${ids.length + 1}`);
}
if (!existsSync(AUDIO)) throw new Error('missing audio ' + AUDIO);

const segs = ids.map((id, i) => {
  const dur = cuts[i + 1] - cuts[i] + (i === ids.length - 1 ? HOLD : 0);
  return { id, dur, frames: Math.round(dur * FPS) };
});
segs.forEach((s) => console.log(`seg ${s.id}  ${s.dur.toFixed(2)}s  ${s.frames}f`));

// 1) Segmente einzeln: Foto hochskalieren, langsam hineinfahren, Text darueber
segs.forEach((s) => {
  const grid = join(GRID, `${s.id}.png`);
  const ov = join(OV, `${s.id}.png`);
  if (!existsSync(grid) || !existsSync(ov)) throw new Error('missing render for ' + s.id);
  const out = join(OUT, `seg-${s.id}.mp4`);
  const filter = `[0:v]scale=${W * 2}:${H * 2}:flags=lanczos,` +
    `zoompan=z='min(1+0.0009*on,1.09)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
    `d=${s.frames}:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0,format=yuv420p[out]`;
  execSync(`ffmpeg -y -loglevel error -loop 1 -i "${grid}" -i "${ov}" -filter_complex "${filter}" -map "[out]" -frames:v ${s.frames} -an -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p "${out}"`, { stdio: 'inherit' });
});

// 2) zusammensetzen
writeFileSync(join(OUT, 'list.txt'), segs.map((s) => `file 'seg-${s.id}.mp4'`).join('\n') + '\n');
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy silent.mp4`, { stdio: 'inherit' });

// 3) Tonspur anlegen. Kein -shortest: das Video ist um HOLD laenger als der Ton
//    und dieser Nachlauf soll stehen bleiben.
const final = join(OUT, 'daya-reel-thailand-illegal.mp4');
execSync(`ffmpeg -y -loglevel error -i "${join(OUT, 'silent.mp4')}" -i "${AUDIO}" -c:v copy -c:a aac -b:a 192k -map 0:v:0 -map 1:a:0 "${final}"`, { stdio: 'inherit' });

const probe = (f, stream) => execSync(`ffprobe -v error -select_streams ${stream} -show_entries stream=duration -of csv=p=0 "${f}"`).toString().trim();
console.log('video', probe(final, 'v:0'), 's');
console.log('audio', probe(final, 'a:0'), 's');
console.log('->', final);
