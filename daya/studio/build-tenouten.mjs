// Reel + TikTok-Karussell "i have no one to go with / go alone" - her.solotrip.
//
// Format ist das laufende 10/10-Muster: Erlebnis oben, Bewertung darunter.
// Kein Tipp-Post, ein Identitaets-Check. Frame 6 ist der DAYA-Moment, er steht
// mitten in einer Liste ueber Freiheit und wirkt dadurch wie Alltag.
//
// LAYOUT-VARIANTE B wie build-understand.mjs: randloses Foto, Text mittig,
// Kopfzeile mit der her.solotrip-Glyphe. Neu gegenueber Variante B ist die
// Bewertungszeile in Marigold unter dem Satz.
//
// Marken nie vertauschen: her.solotrip = Pfeil mit zwei Schallwellen-Boegen in
// Creme, oben. DAYA = Bogen mit Pfeil in Gold, nur auf der Schlusskarte.
//
// Usage: node build-tenouten.mjs          alle Frames + MP4
//        ONLY=03 node build-tenouten.mjs  nur ein Frame
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'tenouten');
const GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="#f4ecdb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'reel-tenouten');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// score = die Bewertung in Marigold. note = der kleine Nachsatz darunter.
const BEATS = [
  { id: '01', photo: 'y1-hall', hook: true,
    quote: 'i have no one to go with',
    line: 'go alone.' },

  { id: '02', photo: 'x2-plane-b',
    line: 'first flight alone', score: '0/10', note: 'terrifying' },

  { id: '03', photo: 'y3-dinner1',
    line: 'dinner alone, day one', score: '4/10', note: 'everyone is looking (they are not)' },

  { id: '04', photo: 'x4-dinner4-b',
    line: 'dinner alone, day four', score: '10/10', note: 'peace' },

  { id: '05', photo: 'y5-lane',
    line: 'lost with no signal', score: '11/10', note: 'found a better street' },

  { id: '06', photo: 'y6-street',
    line: 'sending the plate to your group chat', score: '10/10', note: 'normal now' },

  { id: '07', photo: 'x7-morning-b',
    line: 'the first morning nobody knows your name', score: '100/10' },

  { id: '08', photo: 'y8-view',
    line: 'realising you do not need anyone to enjoy your life', score: '∞/10' },

  { id: 'end', photo: 'z9-train-c', endcard: true,
    line: 'Repost if you felt this on your first solo trip' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
/* Emerald-Gradierung plus Korn, DAYA-Signatur laut design-package/DAYA-DESIGN.md */
.grade{position:absolute;inset:0;background:rgba(14,59,44,.12);mix-blend-mode:multiply}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}
.top{position:absolute;left:0;right:0;top:0;height:16%;
  background:linear-gradient(180deg,rgba(6,29,21,.55) 0%,rgba(6,29,21,0) 100%)}
.mid{position:absolute;left:0;right:0;top:24%;height:52%;
  background:linear-gradient(180deg,rgba(6,29,21,0) 0%,rgba(6,29,21,.52) 30%,
    rgba(6,29,21,.52) 70%,rgba(6,29,21,0) 100%)}
.bot{position:absolute;left:0;right:0;bottom:0;height:26%;
  background:linear-gradient(0deg,rgba(6,29,21,.72) 0%,rgba(6,29,21,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
/* Textblock mittig: Zeile in Creme, Bewertung darunter in Marigold */
.block{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%);
  text-align:center}
.line{font-family:'Archivo';font-weight:800;font-size:72px;line-height:1.1;
  letter-spacing:-.02em;text-wrap:balance;color:#f4ecdb;
  text-shadow:0 4px 22px rgba(0,0,0,.85),0 2px 8px rgba(0,0,0,.8)}
.score{margin-top:34px;font-family:'Archivo';font-weight:800;font-size:104px;line-height:1;
  letter-spacing:-.03em;color:#efc05a;
  text-shadow:0 4px 22px rgba(0,0,0,.85),0 2px 8px rgba(0,0,0,.8)}
.note{margin-top:18px;font-family:'Inter';font-weight:500;font-size:36px;line-height:1.35;
  color:#f4ecdb;opacity:.95;text-wrap:balance;text-shadow:0 2px 14px rgba(0,0,0,.85)}
/* Hook: das Zitat klein und kursiv, die Antwort gross in Gold */
.quote{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:56px;
  line-height:1.25;color:#f4ecdb;opacity:.95;text-shadow:0 2px 14px rgba(0,0,0,.85)}
.answer{margin-top:26px;font-family:'Archivo';font-weight:800;font-size:132px;line-height:1;
  letter-spacing:-.03em;color:#efc05a;
  text-shadow:0 4px 22px rgba(0,0,0,.85),0 2px 8px rgba(0,0,0,.8)}
.block.end{top:25%}
.lockup{position:absolute;left:0;right:0;bottom:170px;display:flex;align-items:center;
  justify-content:center;gap:16px}
.lockup img{height:52px;filter:drop-shadow(0 3px 12px rgba(0,0,0,.9))}
.lockup .word{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;
  letter-spacing:.22em;font-size:34px;color:#efc05a;line-height:1;
  text-shadow:0 3px 12px rgba(0,0,0,.9)}
</style></head><body>`;
const foot = `</body></html>`;

const beats = ONLY ? BEATS.filter((b) => b.id === ONLY) : BEATS;
if (!beats.length) throw new Error('ONLY matched no beat: ' + ONLY);
if (!ONLY) rmSync(OUT, { recursive: true, force: true });
[OV, GRID, SLIDES].forEach((d) => mkdirSync(d, { recursive: true }));

// 1) Backplate: ein Foto, randlos, mittig beschnitten
beats.forEach((b) => {
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
});

// 2) Overlay
beats.forEach((b) => {
  const htmlPath = join(OV, `${b.id}.html`);
  const pngPath = join(OV, `${b.id}.png`);
  const mark = existsSync(MARK) ? `<img src="file://${MARK}">` : '';
  const block = b.hook
    ? `<div class="quote">&bdquo;${esc(b.quote)}&ldquo;</div><div class="answer">${esc(b.line)}</div>`
    : `<div class="line">${esc(b.line)}</div>` +
      (b.score ? `<div class="score">${b.score}</div>` : '') +
      (b.note ? `<div class="note">${esc(b.note)}</div>` : '');
  writeFileSync(htmlPath, head + `<div class="wrap">
  <div class="grade"></div>
  <div class="top"></div>
  <div class="mid"></div>
  ${b.endcard ? '<div class="bot"></div>' : ''}
  <div class="bar"><span class="brand">${GLYPH}<span>her.solotrip</span></span></div>
  <div class="block${b.endcard ? ' end' : ''}">${block}</div>
  ${b.endcard ? `<div class="lockup">${mark}<span class="word">Daya</span></div>` : ''}
  <div class="grain"></div>
</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
});

// 3) fertige Slides
beats.forEach((b) => {
  const n = String(BEATS.indexOf(b) + 1).padStart(2, '0');
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

// 4) Reel ohne Ton. Zwei Sekunden je Frame, beim 10/10-Trend wird schnell
//    geschnitten. Neun Frames = 18 Sekunden. Ton waehlt Alesya in der App.
if (!ONLY) {
  const list = join(OUT, 'frames.txt');
  const lines = BEATS.map((b, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `file '${join(SLIDES, `${n}-${b.id}.png`)}'\nduration 2`;
  });
  const last = BEATS[BEATS.length - 1];
  lines.push(`file '${join(SLIDES, `0${BEATS.length}-${last.id}.png`)}'`);
  writeFileSync(list, lines.join('\n') + '\n');
  const mp4 = join(OUT, 'reel-tenouten.mp4');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${list}" -vf "fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 18 -movflags +faststart "${mp4}"`, { stdio: 'ignore' });
  console.log('mp4', mp4);
}
