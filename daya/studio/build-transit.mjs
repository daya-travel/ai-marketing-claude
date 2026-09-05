// Reel + TikTok carousel "how to move through a new city alone" - her.solotrip.
//
// LAYOUT: die Vorlage, die Alesya geschickt hat - @heygirlceo. Screenshots liegen
// unter /root/.claude/uploads/<session>/ (IMG_3685, IMG_3686, IMG_3688). Am Bild
// gemessen, nicht geschaetzt:
//   Ueberschrift  fette Sans in KLEINBUCHSTABEN, mittig, ~64 px auf 1080 Breite
//   Fliesstext    fette Sans, mittig, ~40 px, enge Zeilen
//   Position      auf der Naht in der Bildmitte
//   kein Logo und kein Handle auf den Innenslides
//
// Diese Werte sind identisch mit build-solo-dates.mjs, bis auf einen Punkt: dort
// stand Caveat als Ueberschrift auf jeder Slide. In der Vorlage steht Schreibschrift
// nur in einer Zeile auf dem Cover. Genau das war das "kursiv", das raus sollte.
//
// Vier Layouts davor waren von mir erfunden, weil ich die Vorlage nie aufgemacht
// habe: Kopfzeilen-Band mit Textbalken, Text unten links ueber einem Verlauf,
// derselbe Text weiter oben mit Marke in der Kopfzeile, dann eine Serifenfassung.
// Alle vier verworfen. Wer hier Werte anfasst, schaut vorher in die Screenshots.
//
// Bild: ein randloses Foto pro Slide statt des Vierer-Rasters der Vorlage.
// Entscheidung Alesya am Muster, 20.08. Fuer ein Raster braeuchten wir 32 Fotos.
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
// Zwei verschiedene Marken, nie vertauschen (Quelle: daya/brand/design-package):
//   her.solotrip = Pfeil mit zwei Schallwellen-Boegen, duenne Linie, Creme.
//                  Steht oben links in jedem Post dieses Accounts.
//   DAYA         = Bogen mit Pfeil. Nur auf der Schlusskarte, in Gold.
// Die Glyphe kommt inline als SVG, damit sie bei 30 px scharf bleibt.
const GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="#f4ecdb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const MARK_CREAM = join(__dirname, 'photos', 'daya-grid', 'daya-mark-cream.png');
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
  { id: 'cover', dur: 3.14, photo: 'c2', clip: 'clip-car.mp4', cover: true,
    kicker: 'SOLO TRAVEL',
    lead: 'Six things I do now that I did not do on my first trip.',
    title: 'How to move through a new city alone', hi: 'alone',
    body: 'Trains, rides and the hours in between. No guesswork.', bodyHi: 'No guesswork.' },

  { id: '01', dur: 7.1, photo: 't902', n: 1, gx: 'right', gy: 300,
    kicker: 'NIGHT TRAIN',
    lead: 'Check the one thing most people skip.',
    title: 'Book the ladies only compartment', hi: 'ladies only',
    body: 'Nightjet has one in the couchette and the sleeper. Women only, same price as a mixed compartment. Look for the female icon when you book, they sell out early.',
    bodyHi: 'same price' },

  { id: '02', dur: 4.96, photo: 'n42', n: 2, gx: 'left', gy: 300,
    kicker: 'GETTING A RIDE',
    lead: 'The first sentence decides the rest.',
    title: 'Ask who are you here for', hi: 'who',
    body: 'Never say your name first. A real driver already has it on the screen in front of them. If they have to guess, walk away.',
    bodyHi: 'walk away' },

  { id: '03', dur: 5.2, photo: 'm431', n: 3, gx: 'right', gy: 300,
    kicker: 'GETTING A RIDE',
    lead: 'The right car can still be the wrong one.',
    title: 'Check the plate, not the car', hi: 'the plate',
    body: 'The scam is the right model with the wrong plate. Match the whole thing before you open the door, not just the colour.',
    bodyHi: 'before you open the door' },

  { id: '04', dur: 3.6, photo: 'm442', n: 4, gx: 'left', gy: 900,
    kicker: 'ON BOARD',
    lead: 'Quieter is not the same as better.',
    title: 'Sit in the fuller carriage', hi: 'fuller',
    body: 'Not the empty one at the end, even though it is quieter. Near the doors, near other people, is the better seat.',
    bodyHi: 'near other people' },

  { id: '05', dur: 3.77, photo: 'm456', n: 5, gx: 'left', gy: 560,
    kicker: 'WAITING',
    lead: 'Where you wait is part of the plan.',
    title: 'Wait for your ride inside', hi: 'inside',
    body: 'Not at the kerb in the dark. Inside there are staff and other people, and you can watch for the car through the glass.',
    bodyHi: 'staff and other people' },

  // clip-morning was dropped after the eight-frame check: it is a train front
  // with two small figures beside it, so the beat would have been the one slide
  // in the set without a woman on it. The still does the job better.
  { id: '06', dur: 3.73, photo: 'm463', n: 6, gx: 'right', gy: 300,
    kicker: 'TIMING',
    lead: 'Same ticket, different arrival.',
    title: 'Book the earlier train', hi: 'earlier',
    body: 'More people on the platform, more open at the other end, and no waiting alone once you land.',
    bodyHi: 'no waiting alone' },

  { id: 'end', dur: 4.03, photo: 'e1', endcard: true,
    kicker: 'SAVE THIS',
    // Spruch auf der Schlusskarte, aus Alesyas eigener Formulierung fuer den
    // Vorgaengerpost: "und jedes Mal komme ich nach Hause und bin anders als davor"
    lead: 'You come home a little different every time.',
    title: 'Save this before your next transfer', hi: 'next transfer',
    body: 'Which one did you not know?', bodyHi: 'Which one' },
];
const TIPS = BEATS.filter((b) => b.n).length;

// Gold-Hervorhebung: genau eine Stelle in der Ueberschrift und eine im Fliesstext,
// so wie in der Vorlage. Kein Fund, kein Hervorheben - nichts wird geraten.
const hi = (text, part) => {
  const t = esc(text);
  if (!part) return t;
  const p = esc(part);
  return t.includes(p) ? t.replace(p, `<span class="hi">${p}</span>`) : t;
};

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
/* Verlauf: oben nur leicht angedunkelt fuer die Kopfzeile, unten traegt er den
   ganzen Textblock */
/* Foto bekommt die Emerald-Gradierung und darueber das Korn - beides steht in
   daya/brand/design-package/DAYA-DESIGN.md als DAYA-Signatur */
.grade{position:absolute;inset:0;background:rgba(14,59,44,.12);mix-blend-mode:multiply}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}
.top{position:absolute;left:0;right:0;top:0;height:16%;
  background:linear-gradient(180deg,rgba(6,29,21,.55) 0%,rgba(6,29,21,0) 100%)}
.scrim{position:absolute;left:0;right:0;bottom:0;height:58%;
  background:linear-gradient(180deg,
    rgba(6,29,21,0) 0%,
    rgba(6,29,21,.42) 26%,
    rgba(6,29,21,.80) 52%,
    rgba(6,29,21,.94) 76%,
    rgba(6,29,21,.97) 100%)}

/* Kopfzeile: Bildmarke plus Handle links, Zaehler rechts */
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center;
  justify-content:space-between}
/* In der Kopfzeile steht allein der Account-Name. Die DAYA-Bildmarke stand hier
   direkt neben "her.solotrip" und wurde dadurch als Logo des Reise-Accounts
   gelesen - zwei Marken vermischt. DAYA tritt nur auf der Endkarte auf. */
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
.count{font-family:'Inter';font-weight:700;font-size:24px;letter-spacing:.16em;
  color:#efc05a;text-shadow:0 2px 10px rgba(0,0,0,.85)}

/* Grosse Umriss-Ziffer, nur auf den nummerierten Slides. Seite und Hoehe werden
   pro Beat gesetzt (gx/gy), weil eine feste Ecke bei drei von sechs Fotos auf
   einem Gesicht landete. Vor jeder Aenderung an einem Foto: Slide ansehen. */
.ghost{position:absolute;font-family:'Archivo';font-weight:800;
  font-size:270px;line-height:.8;letter-spacing:-.04em;color:transparent;
  -webkit-text-stroke:3px rgba(239,192,90,.62)}

/* Textblock unten links */
.copy{position:absolute;left:80px;right:80px;bottom:250px}
.kicker{font-family:'Archivo';font-weight:800;font-size:24px;letter-spacing:.2em;
  color:#efc05a;text-shadow:0 2px 10px rgba(0,0,0,.85)}
.lead.big{font-size:56px;line-height:1.15}
.lead{font-family:'Cormorant Garamond';font-weight:500;font-style:italic;font-size:46px;
  line-height:1.2;color:#f4ecdb;margin-top:22px;text-shadow:0 2px 14px rgba(0,0,0,.7)}
.title{font-family:'Archivo';font-weight:800;font-size:82px;line-height:1.02;
  letter-spacing:-.025em;color:#f4ecdb;margin-top:14px;text-wrap:balance;
  text-shadow:0 3px 18px rgba(0,0,0,.75)}
.title.sm{font-size:70px}
.title.lg{font-size:92px}
.hi{color:#efc05a}
.rule{width:74px;height:6px;background:#efc05a;margin:28px 0 26px;border-radius:3px}
.body{font-family:'Inter';font-weight:400;font-size:31px;line-height:1.5;
  color:#f4ecdb;opacity:.95;max-width:900px;text-shadow:0 2px 12px rgba(0,0,0,.7)}
.body .hi{font-weight:600;opacity:1}

/* Pille unten rechts */
.save{position:absolute;right:80px;bottom:100px;display:flex;align-items:center;gap:12px;
  background:#efc05a;color:#1a140b;border-radius:999px;padding:16px 30px;
  font-family:'Inter';font-weight:700;font-size:24px;letter-spacing:.1em;
  box-shadow:0 6px 24px rgba(0,0,0,.45)}
.save svg{width:22px;height:22px;fill:#1a140b}

/* Endkarte: Wortmarke statt Pille */
.lockup{position:absolute;left:80px;bottom:96px;display:flex;align-items:center;gap:16px}
.lockup img{height:52px;filter:drop-shadow(0 3px 12px rgba(0,0,0,.9))}
.lockup .word{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;
  letter-spacing:.22em;font-size:34px;color:#efc05a;line-height:1;
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
  const markCream = existsSync(MARK_CREAM) ? `<img src="file://${MARK_CREAM}">` : '';
  const long = b.title.length > 30;
  const bookmark = '<svg viewBox="0 0 24 24"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4-7 4V3a1 1 0 0 1 1-1z"/></svg>';
  const arrow = '<svg viewBox="0 0 24 24"><path d="M13 4l8 8-8 8-1.4-1.4 5.6-5.6H3v-2h14.2l-5.6-5.6z"/></svg>';
  const plus = '<svg viewBox="0 0 24 24"><path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z"/></svg>';
  writeFileSync(htmlPath, head + `<div class="wrap">
  <div class="grade"></div>
  <div class="top"></div>
  <div class="scrim"></div>
  <div class="bar">
    <span class="brand">${GLYPH}<span>her.solotrip</span></span>
    ${b.n ? `<span class="count">${String(b.n).padStart(2, '0')} / ${String(TIPS).padStart(2, '0')}</span>` : ''}
  </div>
  ${b.n ? `<div class="ghost" style="${b.gx === 'left' ? 'left' : 'right'}:80px;top:${b.gy}px">${String(b.n).padStart(2, '0')}</div>` : ''}
  <div class="copy">
    <div class="kicker">${esc(b.kicker)}</div>
    <div class="lead${b.endcard ? ' big' : ''}">${esc(b.lead)}</div>
    <div class="title${b.cover ? ' lg' : long ? ' sm' : ''}">${hi(b.title, b.hi)}</div>
    <div class="rule"></div>
    <div class="body">${hi(b.body, b.bodyHi)}</div>
  </div>
  ${b.endcard ? `<div class="lockup">${mark}<span class="word">Daya</span></div>` : ''}
  ${b.cover
    ? `<div class="save">SWIPE ${arrow}</div>`
    : b.endcard
      ? `<div class="save">${plus}FOLLOW</div>`
      : `<div class="save">${bookmark}SAVE THIS</div>`}
  <div class="grain"></div>
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
