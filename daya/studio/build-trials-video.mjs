// Baut das MP4 zu einem Trial Reel aus den Slides von build-trials.mjs.
//
// Muster ist build-thailand-video.mjs, samt der beiden Entscheidungen, die dort
// teuer waren:
//
//   1. Die Segmentgrenzen sind GEMESSEN, nicht geschaetzt. `measure-cuts.py`
//      findet die Sprechpausen mit `ffmpeg -af silencedetect` und rastet die
//      erwarteten Grenzen darauf. Jeder Frame sitzt damit auf einer echten
//      Pause zwischen „One.", „Two." und so weiter.
//   2. Gezoomt wird das FOTO, nicht der fertige Slide. Wuerde man den fertigen
//      Slide zoomen, wanderte die Schrift mit und wuerde unscharf. Deshalb
//      laeuft der Push-in auf der Backplate und der Textlayer liegt still
//      darueber.
//
// Der Schlussframe laeuft HOLD Sekunden laenger als die Tonspur, damit „Save
// this for your Japan trip." lesbar bleibt, wenn die Stimme schon fertig ist.
// 1,5 statt Thailands 2,0: die Trials sollen unter 25 Sekunden bleiben.
//
// Usage: TRIAL=trial1 node build-trials-video.mjs
//
// Erwartet:
//   reels/<trial>/grids/*.png      Backplates aus build-trials.mjs
//   reels/<trial>/overlays/*.png   Textlayer, transparent
//   audio/<trial>/voice.wav        fertige Tonspur, Tempo schon angepasst
//   audio/<trial>/cuts.json        sechs Grenzen aus measure-cuts.py
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRIAL = process.env.TRIAL || '';
if (!TRIAL) throw new Error('TRIAL fehlt. TRIAL=trial1 node build-trials-video.mjs');

const OUT = join(__dirname, 'reels', TRIAL);
const GRID = join(OUT, 'grids');
const OV = join(OUT, 'overlays');
const AUDIO = join(__dirname, 'audio', TRIAL, 'voice.wav');
const CUTS = join(__dirname, 'audio', TRIAL, 'cuts.json');
const NAMES = { trial1: 'daya-trial1-japan', trial2: 'daya-trial2-italy-useful', trial3: 'daya-trial3-italy-fines' };

const W = 1080, H = 1920, FPS = 30;
// crf 23: bei 18 kam Trial 1 auf 31 MB, bei 21 mit zehn Frames wieder auf 31.
// Der Versand haengt bei 30 MB. Instagram kodiert ohnehin neu, der Unterschied
// ist dort nicht zu sehen - die Dateigroesse dagegen schon.

// 2,0 s Nachlauf. Daisy liest die Schlusszeile in 1,78 s - mit 1,2 s Nachlauf
// staende die Schlusskarte samt DAYA-Wortmarke nur knapp 3 Sekunden.
const HOLD = 2.0;

// 48 kHz stereo ausdruecklich gesetzt. seed_audio liefert 24 kHz, und ein MP4
// mit 24-kHz-Ton spielt nicht ueberall ab - Alesya am 06.09.: „In meinem Video
// ist kein Ton?" Der Ton war da und hatte Pegel, nur die Rate war unueblich.
//
// MEHRERE BILDER JE GESPROCHENEM ABSCHNITT. Alesya am 07.09.: „man muss lange
// lesen und bevor man liest, kommt man schon zum naechsten Bild ... ich hatte
// da teilweise zwei oder drei Bilder." Die Zuordnung Frame zu Abschnitt steht
// deshalb in frames.json, geschrieben von build-trials.mjs. Die Zeit eines
// Abschnitts wird auf seine Frames verteilt, gewichtet nach `w`.
const FRAMES = join(OUT, 'frames.json');
if (!existsSync(FRAMES)) throw new Error('missing frames.json - erst build-trials.mjs laufen lassen');
const frames = JSON.parse(readFileSync(FRAMES, 'utf8'));
const sections = [...new Set(frames.map((f) => f.sec))].sort((a, b) => a - b);
if (!existsSync(AUDIO)) throw new Error('missing audio ' + AUDIO);
if (!existsSync(CUTS)) throw new Error('missing cuts ' + CUTS);
const cuts = JSON.parse(readFileSync(CUTS, 'utf8'));
if (cuts.length !== sections.length + 1) {
  throw new Error(`cuts.json hat ${cuts.length} Grenzen, erwartet ${sections.length + 1}`);
}

const segs = [];
sections.forEach((sec, i) => {
  const mine = frames.filter((f) => f.sec === sec);
  const total = cuts[i + 1] - cuts[i] + (i === sections.length - 1 ? HOLD : 0);
  const weight = mine.reduce((n, f) => n + f.w, 0);
  mine.forEach((f) => {
    const dur = total * f.w / weight;
    segs.push({ id: f.id, dur, frames: Math.round(dur * FPS) });
  });
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
  execSync(`ffmpeg -y -loglevel error -loop 1 -i "${grid}" -i "${ov}" -filter_complex "${filter}" -map "[out]" -frames:v ${s.frames} -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p "${out}"`, { stdio: 'inherit' });
});

// 2) zusammensetzen
writeFileSync(join(OUT, 'list.txt'), segs.map((s) => `file 'seg-${s.id}.mp4'`).join('\n') + '\n');
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy silent.mp4`, { stdio: 'inherit' });

// 3) Tonspur anlegen. Kein -shortest: das Video ist um HOLD laenger als der Ton
//    und dieser Nachlauf soll stehen bleiben.
const final = join(OUT, `${NAMES[TRIAL] || TRIAL}.mp4`);
execSync(`ffmpeg -y -loglevel error -i "${join(OUT, 'silent.mp4')}" -i "${AUDIO}" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -map 0:v:0 -map 1:a:0 "${final}"`, { stdio: 'inherit' });

const probe = (f, stream) => execSync(`ffprobe -v error -select_streams ${stream} -show_entries stream=duration -of csv=p=0 "${f}"`).toString().trim();
console.log('->', final);
console.log('video', probe(final, 'v:0'), 's');
console.log('audio', probe(final, 'a:0'), 's');
