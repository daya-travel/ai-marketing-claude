// Reel + TikTok carousel "how to move through a new city alone" - her.solotrip.
//
// LAYOUT: Hausstil aus daya/brand/DESIGN-SYSTEM.md, Abschnitt "Post-Layout".
// Ein randloses Foto pro Slide, weicher Verlauf, Text im unteren Drittel und
// linksbuendig, Cormorant Garamond als Ueberschrift und Inter als Fliesstext,
// darunter eine Zeile mit Handle und Bildmarke. Unterkante des Blocks 520 px
// ueber dem unteren Rand, damit Instagram und TikTok nichts davon zukleben.
//
// Diese Werte werden im Design-System geaendert, nicht hier. Fuer diesen einen
// Post wurden vier Layouts erfunden, bis Alesya am 20.08. den Stil festgelegt
// hat. Wer hier Zahlen anfasst, faengt das wieder an.
//
// FACT BASE (checked 18.08. before any image was generated):
//   - Nightjet ladies-only compartment: couchette or sleeper, women only, same
//     price as a mixed compartment, selectable when booking online.
//     nightjet.com/en/komfortkategorien/spezialabteile/damenabteil
//   - "Ask who are you here for" / "match the plate, not the model": standard
//     rideshare guidance; the documented scam is the right model, wrong plate.
//
// IMAGE RULE (Alesya, 18.08.): every slide has a person on it. The first set had
// people on six of twenty-five motifs and an empty escalator as the cover, which
// is unusable and also breaks hard rule 2 of the design system. Pose is free now,
// the "from behind only" rule is lifted. Beautiful but not too perfect, or nobody
// believes it. Recipe is written down in ai-marketing-claude/CLAUDE.md.
//
// Still true: soul_2 garbles every piece of lettering it draws. Two airport
// motifs and one platform motif were thrown out of this set for exactly that
// (a departure board reading "Smiffistan", two aircraft tails). Check every photo
// at true display size, never at full resolution.
//
// Usage: node build-transit.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'transit');
const CLIPS = join(PHOTOS, 'clips');
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'reel-transit');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
rmSync(OUT, { recursive: true, force: true });
[OV, GRID, SLIDES].forEach((d) => mkdirSync(d, { recursive: true }));
const W = 1080, H = 1920, RESERVE = 87;

const EMERALD = '#0e3b2c';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const BEATS = [
  { id: 'cover', dur: 3.14, photo: 't901', clip: 'clip-car.mp4', cover: true,
    title: 'How to move through a new city alone',
    body: 'Six things that make it easier. Solo travel, minus the guesswork.' },

  { id: '01', dur: 7.1, photo: 't902',
    title: 'Book the ladies only compartment',
    body: 'Nightjet has one in the couchette and the sleeper. Women only, same price as a mixed compartment. Look for the female icon when you book, they sell out early.' },

  { id: '02', dur: 4.96, photo: 'n42',
    title: 'Ask who are you here for',
    body: 'Never say your name first. A real driver already has it on the screen in front of them. If they have to guess, walk away.' },

  { id: '03', dur: 5.2, photo: 'm431',
    title: 'Check the plate, not the car',
    body: 'The scam is the right model with the wrong plate. Match the whole thing before you open the door, not just the colour.' },

  { id: '04', dur: 3.6, photo: 'm442',
    title: 'Sit in the fuller carriage',
    body: 'Not the empty one at the end, even though it is quieter. Near the doors, near other people, is the better seat.' },

  { id: '05', dur: 3.77, photo: 'm456',
    title: 'Wait for your ride inside',
    body: 'Not at the kerb in the dark. Inside there are staff and other people, and you can watch for the car through the glass.' },

  // clip-morning was dropped after the eight-frame check: it is a train front
  // with two small figures beside it, so the beat would have been the one slide
  // in the set without a woman on it. The still does the job better.
  { id: '06', dur: 3.73, photo: 'm463',
    title: 'Book the earlier train',
    body: 'Same ticket, different arrival. More people on the platform, more open at the other end, and no waiting alone once you land.' },

  { id: 'end', dur: 4.03, photo: 'n82', endcard: true,
    title: 'Save this before your next transfer',
    body: 'Which one did you not know?' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
/* ein weicher Verlauf traegt alles: Ueberschrift, Fliesstext, Handle und Marke.
   Kein Band, kein Balken, kein Kasten - das Foto laeuft darunter durch. */
.scrim{position:absolute;left:0;right:0;bottom:0;height:72%;
  background:linear-gradient(180deg,
    rgba(6,29,21,0) 0%,
    rgba(6,29,21,.38) 25%,
    rgba(6,29,21,.75) 45%,
    rgba(6,29,21,.90) 65%,
    rgba(6,29,21,.95) 100%)}
.copy{position:absolute;left:0;right:0;bottom:520px;padding:0 78px;text-align:left}
.kicker{width:58px;height:2px;background:#efc05a;margin-bottom:30px;opacity:.9}
.title{font-family:'Cormorant Garamond';font-weight:600;font-size:82px;line-height:1.04;
  color:#f4ecdb;letter-spacing:.004em;text-shadow:0 2px 18px rgba(0,0,0,.55)}
.title.sm{font-size:70px}
.body{font-family:'Inter';font-weight:400;font-size:32px;line-height:1.5;
  color:#f4ecdb;opacity:.92;margin-top:24px;max-width:840px;
  text-shadow:0 2px 14px rgba(0,0,0,.6)}
/* Handle und Marke stehen im Fluss unter dem Text, nicht am Bildrand - dadurch
   wandern sie mit dem Block mit und bleiben ausserhalb der App-Oberflaechen */
.foot{margin-top:40px;display:flex;align-items:center;justify-content:space-between}
.handle{font-family:'Inter';font-weight:600;text-transform:lowercase;
  letter-spacing:.14em;font-size:26px;color:#f4ecdb;opacity:.78;
  text-shadow:0 2px 12px rgba(0,0,0,.8)}
.lockup{display:flex;align-items:center;gap:15px}
.lockup img{height:52px;filter:drop-shadow(0 3px 12px rgba(0,0,0,.9))}
.lockup .word{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;
  letter-spacing:.22em;font-size:32px;color:#efc05a;line-height:1;
  text-shadow:0 3px 12px rgba(0,0,0,.9)}
</style></head><body>`;
const foot = `</body></html>`;

// 1) backplates: one photo, edge to edge, centre-cropped to the full frame
BEATS.forEach((b) => {
  const f = join(PHOTOS, `${b.photo}.png`);
  if (!existsSync(f)) throw new Error('missing photo ' + f);
  const py = `
from PIL import Image
im = Image.open('${f}').convert('RGB'); w, h = im.size
s = max(${W} / w, ${H} / h)
im = im.resize((int(w * s), int(h * s)), Image.LANCZOS); w, h = im.size
im.crop(((w - ${W}) // 2, (h - ${H}) // 2, (w - ${W}) // 2 + ${W}, (h - ${H}) // 2 + ${H})).save('${join(GRID, `${b.id}.png`)}')`;
  const pyPath = join(GRID, `${b.id}.py`);
  writeFileSync(pyPath, py);
  execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
  console.log('plate', b.id, 'ok');
});

// 2) overlays: gradient + copy + footer, nothing opaque, so a still photo and a
//    running clip read the same underneath
BEATS.forEach((b) => {
  const htmlPath = join(OV, `${b.id}.html`);
  const pngPath = join(OV, `${b.id}.png`);
  const mark = existsSync(MARK) ? `<img src="file://${MARK}">` : '';
  const long = b.title.length > 30;
  writeFileSync(htmlPath, head + `<div class="wrap">
  <div class="scrim"></div>
  <div class="copy">
    ${b.endcard ? '<div class="kicker"></div>' : ''}
    <div class="title${long ? ' sm' : ''}">${esc(b.title)}</div>
    <div class="body">${esc(b.body)}</div>
    <div class="foot"><span class="handle">@her.solotrip</span>
      <span class="lockup">${mark}<span class="word">Daya</span></span></div>
  </div>
</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', b.id, 'ok');
});

// 3) flat slides for the TikTok photo carousel
BEATS.forEach((b, i) => {
  const n = String(i + 1).padStart(2, '0');
  const py = `
from PIL import Image
g = Image.open('${join(GRID, `${b.id}.png`)}').convert('RGBA')
o = Image.open('${join(OV, `${b.id}.png`)}').convert('RGBA')
Image.alpha_composite(g, o).convert('RGB').save('${join(SLIDES, `${n}-${b.id}.png`)}')`;
  const pyPath = join(SLIDES, `${n}.py`);
  writeFileSync(pyPath, py);
  execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
  console.log('slide', n, b.id, 'ok');
});

// 4) segments. A clip fills the frame behind the gradient; a still plate gets a
//    slow push instead.
BEATS.forEach((b) => {
  const clip = b.clip ? join(CLIPS, b.clip) : null;
  const useClip = clip && existsSync(clip);
  if (b.clip && !useClip) console.warn('no clip', b.clip, '- falling back to the plate');
  const src = useClip ? clip : join(GRID, `${b.id}.png`);
  const ov = join(OV, `${b.id}.png`);
  const out = join(OUT, `seg-${b.id}.mp4`);
  const frames = Math.round(30 * b.dur);
  // a 5 s clip on a longer beat is stretched rather than frozen on its last frame
  const stretch = useClip && b.dur > 5.0 ? `,setpts=${(b.dur / 5.0).toFixed(4)}*PTS` : '';
  const vf = useClip
    ? `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=30${stretch}[v]`
    : `[0:v]scale=2160:3840,zoompan=z='1.0+0.0005*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${W}x${H}:fps=30[v]`;
  execSync(`ffmpeg -y -loglevel error ${useClip ? '' : '-loop 1'} -i "${src}" -i "${ov}" -filter_complex "${vf};[v][1:v]overlay=0:0,format=yuv420p[o]" -map "[o]" -frames:v ${frames} -an -c:v libx264 -crf 18 -preset medium -r 30 "${out}"`, { stdio: 'inherit' });
  console.log('segment', b.id, 'ok');
});

// 5) concat, then the same cut with the ElevenLabs voiceover under it
writeFileSync(join(OUT, 'list.txt'), BEATS.map((b) => `file 'seg-${b.id}.mp4'`).join('\n'));
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-transit-CLEAN.mp4`, { stdio: 'inherit' });
const VO = join(CLIPS, 'vo.mp3');
if (existsSync(VO)) {
  // apad needs an explicit whole_dur: "-af apad -shortest" never terminates
  const total = BEATS.reduce((a, b) => a + b.dur, 0).toFixed(2);
  execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -i daya-reel-transit-CLEAN.mp4 -i "${VO}" -c:v copy -c:a aac -b:a 192k -af "adelay=800|800,apad=whole_dur=${total}" -t ${total} -map 0:v:0 -map 1:a:0 daya-reel-transit-VO.mp4`, { stdio: 'inherit' });
  console.log('DONE ->', join(OUT, 'daya-reel-transit-VO.mp4'));
}
console.log('DONE ->', join(OUT, 'daya-reel-transit-CLEAN.mp4'),
  '  total', BEATS.reduce((a, b) => a + b.dur, 0).toFixed(1), 's');
