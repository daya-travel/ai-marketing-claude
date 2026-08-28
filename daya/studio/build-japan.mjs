// Instagram- und TikTok-Karussell „Before you fly to Japan alone" - her.solotrip.
//
// Nutzwert-Post. Zielmetrik ist Speichern, nicht Reposten. Jeder Fakt ist belegt,
// Quellen stehen in daya/content/2026-08-28-carousel-japan.md.
//
// ZWEI SLIDE-TYPEN:
//   'photo'  - randloses 9:16-Foto, Text mittig. Wie Variante B im Design-System.
//   'object' - 4:5-Objektbild als Karte auf Emerald, Text darunter. Neu.
//     Grund: die Objektbilder kommen aus nano_banana_pro und sind 4:5. Ein
//     zentraler 9:16-Zuschnitt schneidet rund 30 % der Breite weg, also die
//     Gegenstaende am Rand. Die Karte auf Emerald zeigt das ganze Bild und
//     trennt die Objektslides sichtbar von den Fotoslides.
//
// Modellwahl, bewusst getrennt:
//   Objektbilder -> nano_banana_pro, weil sie lesbare Kaertchen brauchen.
//   Fotos        -> soul_2, kann keine Buchstaben, deshalb Motive ohne Schrift.
//
// Marken nie vertauschen: her.solotrip = Pfeil mit zwei Schallwellen-Boegen in
// Creme, oben. DAYA = Bogen mit Pfeil in Gold, nur auf der Schlusskarte.
//
// Usage: node build-japan.mjs        alle Slides
//        ONLY=03 node build-japan.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'japan');
const GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="#f4ecdb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'carousel-japan');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const BEATS = [
  { id: '01', photo: 'j1-flatlay-a', kind: 'object', cover: true,
    head: 'Before you fly to Japan alone',
    body: 'Five things worth knowing.' },

  { id: '02', photo: 'j2-train-b', kind: 'photo',
    head: 'Japan is one of the safest countries in the world for women.',
    body: 'It also has women-only carriages on 87 train lines. Both of those are true.' },

  { id: '03', photo: 'k3-pink-a', kind: 'photo',
    head: "The pink markings aren't decoration.",
    body: 'Weekday rush hour, from the first train until around 9:30, and evenings on some lines. Pink paint on the platform, pink stickers on the door. Get on the wrong one by accident and nothing happens. It’s a social rule, not a law.' },

  // ty: Textblock hoeher als die Mitte. Ohne das sitzt der Fliesstext auf ihrem
  // Gesicht, geprueft am 28.08. an der ersten Fassung dieser Slide.
  { id: '04', photo: 'm4-park-a', kind: 'photo', ty: 34,
    head: "There's a police box within five minutes of you.",
    body: 'In central Tokyo, usually right by a JR exit. Search 交番 on the map. Shibuya and Kabukicho have English speakers on every shift. Emergency is 110.' },

  { id: '05', photo: 'j5-meds-b', kind: 'object',
    head: 'Check your cold medicine before you fly.',
    body: 'Sudafed, Actifed and Vicks inhalers are banned. Anything with codeine needs a permit you apply for in advance. Your prescription doesn’t override it.' },

  { id: '06', photo: 'j6-carry-a', kind: 'object',
    head: 'Pack a hand towel and a plastic bag.',
    body: 'Most public toilets have no paper and no dryer. And there are almost no public bins, so you carry your rubbish to a konbini.' },

  { id: 'end', photo: 'j7-end-a', kind: 'photo', endcard: true,
    head: 'Save this before you book.' },
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
.mid{position:absolute;left:0;right:0;top:22%;height:58%;
  background:linear-gradient(180deg,rgba(6,29,21,0) 0%,rgba(6,29,21,.6) 26%,
    rgba(6,29,21,.6) 74%,rgba(6,29,21,0) 100%)}
.bot{position:absolute;left:0;right:0;bottom:0;height:26%;
  background:linear-gradient(0deg,rgba(6,29,21,.72) 0%,rgba(6,29,21,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}

/* Fotoslides: Text mittig ueber dem Bild */
.block{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%);
  text-align:center}
.head{font-family:'Archivo';font-weight:800;font-size:60px;line-height:1.12;
  letter-spacing:-.02em;text-wrap:balance;color:#efc05a;
  text-shadow:0 4px 22px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.body{margin-top:26px;font-family:'Inter';font-weight:500;font-size:33px;line-height:1.5;
  color:#f4ecdb;text-wrap:pretty;text-shadow:0 2px 16px rgba(0,0,0,.9)}

/* Objektslides: Emerald-Grund, Bild als Karte, Text darunter */
.obj{position:absolute;inset:0;background:#0e3b2c}
.card{position:absolute;left:120px;top:230px;width:840px;height:1050px;overflow:hidden;
  border-radius:4px;box-shadow:0 18px 60px rgba(0,0,0,.45)}
.card img{width:100%;height:100%;object-fit:cover;display:block}
.objtext{position:absolute;left:100px;right:100px;top:1350px;text-align:center}
.objtext .head{text-shadow:none}
.objtext .body{text-shadow:none;opacity:.92}
/* Titelkarte: Zeile groesser, Unterzeile kleiner */
.cover .head{font-size:72px}
.cover .body{font-size:31px;letter-spacing:.02em;opacity:.85}

.lockup{position:absolute;left:0;right:0;bottom:150px;display:flex;align-items:center;
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

// 1) Backplate. Fotoslides werden randlos beschnitten, Objektslides bekommen
//    einen leeren Emerald-Grund, das Bild sitzt im Overlay als Karte.
beats.forEach((b) => {
  const f = join(PHOTOS, `${b.photo}.png`);
  if (!existsSync(f)) throw new Error('missing photo ' + f);
  const out = join(GRID, `${b.id}.png`);
  const py = b.kind === 'object'
    ? `
from PIL import Image
Image.new('RGB', (${W}, ${H}), (14, 59, 44)).save('${out}')`
    : `
from PIL import Image
im = Image.open('${f}').convert('RGB'); w, h = im.size
s = max(${W} / w, ${H} / h)
im = im.resize((int(w * s), int(h * s)), Image.LANCZOS); w, h = im.size
im.crop(((w - ${W}) // 2, (h - ${H}) // 2, (w - ${W}) // 2 + ${W}, (h - ${H}) // 2 + ${H})).save('${out}')`;
  const pyPath = join(GRID, `${b.id}.py`);
  writeFileSync(pyPath, py);
  execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
});

// 2) Overlay
beats.forEach((b) => {
  const htmlPath = join(OV, `${b.id}.html`);
  const pngPath = join(OV, `${b.id}.png`);
  const mark = existsSync(MARK) ? `<img src="file://${MARK}">` : '';
  const text = `<div class="head">${esc(b.head)}</div>` +
    (b.body ? `<div class="body">${esc(b.body)}</div>` : '');
  const inner = b.kind === 'object'
    ? `<div class="obj"></div>
  <div class="card"><img src="file://${join(PHOTOS, `${b.photo}.png`)}"></div>
  <div class="objtext${b.cover ? ' cover' : ''}">${text}</div>`
    : `<div class="grade"></div>
  <div class="top"></div>
  <div class="mid"></div>
  ${b.endcard ? '<div class="bot"></div>' : ''}
  <div class="block"${b.ty ? ` style="top:${b.ty}%"` : ''}>${text}</div>`;
  writeFileSync(htmlPath, head + `<div class="wrap">
  ${inner}
  <div class="bar"><span class="brand">${GLYPH}<span>her.solotrip</span></span></div>
  ${b.endcard ? `<div class="lockup">${mark}<span class="word">Daya</span></div>` : ''}
  <div class="grain"></div>
</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
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
  console.log('slide', n, b.id, b.kind, 'ok');
});
