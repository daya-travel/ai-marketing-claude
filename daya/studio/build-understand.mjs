// TikTok- und Instagram-Karussell "7 things only solo female travellers
// understand" - her.solotrip.
//
// LAYOUT-VARIANTE B, "Erkennungs-Post". Vorbild ist der Karussell-Post von
// @sebastiandariusch, den Alesya am 22.08. geschickt hat (Screenshots unter
// /root/.claude/uploads/<session>/). Was der macht:
//   ein randloses Foto pro Slide, sonst nichts
//   EIN fetter Satz, mittig im Bild, zwei bis drei Zeilen
//   kein Kicker, kein Zaehler, keine Ziffer, keine Pille
//
// Unterschied zu Variante A (build-transit.mjs): dort steht ein Textblock unten
// links mit Kicker, kursiver Zeile, Ueberschrift und Fliesstext. Hier steht ein
// einziger Satz in der Bildmitte. Beide Varianten stehen im DESIGN-SYSTEM.md.
//
// Zwei bewusste Abweichungen vom Vorbild:
//   1. Auf jedem Bild ist eine Frau (harte Regel 2 im Design-System). Das Vorbild
//      zeigt oft nur Orte.
//   2. Die Kopfzeile mit der her.solotrip-Glyphe bleibt. Das Vorbild hat kein Logo.
//
// Marken nie vertauschen: her.solotrip = Pfeil mit zwei Schallwellen-Boegen in
// Creme, oben. DAYA = Bogen mit Pfeil in Gold, nur auf der Schlusskarte.
//
// Usage: node build-understand.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'understand');
const GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="#f4ecdb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'reel-understand');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;

// Textfassung: 'gold' = ganze Zeile in Marigold wie im Vorbild,
//              'cream' = Zeile in Creme mit einem Wort in Marigold wie in Variante A.
// Wird am Muster entschieden, nicht geraten.
const STYLE = process.env.STYLE === 'cream' ? 'cream' : 'gold';
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hi = (text, part) => {
  const t = esc(text);
  if (!part) return t;
  const p = esc(part);
  return t.includes(p) ? t.replace(p, `<span class="hi">${p}</span>`) : t;
};

const BEATS = [
  { id: 'cover', photo: 'u-city-b', cover: true,
    line: '7 things only solo female travellers understand', hiW: 'only' },

  { id: '01', photo: 'u-kerb-a',
    line: 'Sending the plate number to the group chat before you even open the door',
    hiW: 'before you even open the door' },

  { id: '02', photo: 'u-tram-b',
    line: 'Choosing the fuller carriage without thinking about it',
    hiW: 'without thinking about it' },

  { id: '03', photo: 'u-dinner-a',
    line: 'Eating dinner alone and finding out you like your own company',
    hiW: 'your own company' },

  { id: '04', photo: 'u-walk-b',
    line: 'The walk back where your keys are already in your hand',
    hiW: 'already in your hand' },

  { id: '05', photo: 'u-platform-a',
    line: 'Booking the earlier train just so you do not arrive in the dark',
    hiW: 'do not arrive in the dark' },

  { id: '06', photo: 'u-desk-a',
    line: 'Telling a stranger you are meeting a friend, when you are not',
    hiW: 'when you are not' },

  { id: '07', photo: 'u-home-b',
    line: 'Coming home different, and nobody seeing it yet',
    hiW: 'nobody seeing it yet' },

  { id: 'end', photo: 'u-tram-a', endcard: true,
    line: 'You come home a little different every time',
    hiW: 'a little different',
    body: 'Save this for the next one. Which one is you?' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
/* Foto-Look wie in Variante A: leichte Emerald-Gradierung plus Korn, beides
   DAYA-Signatur laut daya/brand/design-package/DAYA-DESIGN.md */
.grade{position:absolute;inset:0;background:rgba(14,59,44,.12);mix-blend-mode:multiply}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}
.top{position:absolute;left:0;right:0;top:0;height:16%;
  background:linear-gradient(180deg,rgba(6,29,21,.55) 0%,rgba(6,29,21,0) 100%)}
/* weicher Verlauf um die Bildmitte, damit der Satz auch auf hellen Fotos steht */
.mid{position:absolute;left:0;right:0;top:24%;height:52%;
  background:linear-gradient(180deg,rgba(6,29,21,0) 0%,rgba(6,29,21,.52) 30%,
    rgba(6,29,21,.52) 70%,rgba(6,29,21,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
/* der eine Satz, mittig */
.line{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%);
  text-align:center;font-family:'Archivo';font-weight:800;font-size:72px;line-height:1.1;
  letter-spacing:-.02em;text-wrap:balance;
  text-shadow:0 4px 22px rgba(0,0,0,.85),0 2px 8px rgba(0,0,0,.8)}
.line.gold{color:#efc05a}
.line.cream{color:#f4ecdb}
.line.cream .hi{color:#efc05a}
.line.big{font-size:88px}
.body{position:absolute;left:80px;right:80px;bottom:250px;text-align:center;
  font-family:'Inter';font-weight:500;font-size:34px;line-height:1.45;color:#f4ecdb;
  opacity:.95;text-shadow:0 2px 14px rgba(0,0,0,.8)}
.lockup{position:absolute;left:0;right:0;bottom:120px;display:flex;align-items:center;
  justify-content:center;gap:16px}
.lockup img{height:52px;filter:drop-shadow(0 3px 12px rgba(0,0,0,.9))}
.lockup .word{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;
  letter-spacing:.22em;font-size:34px;color:#efc05a;line-height:1;
  text-shadow:0 3px 12px rgba(0,0,0,.9)}
</style></head><body>`;
const foot = `</body></html>`;

const beats = ONLY ? BEATS.filter((b) => b.id === ONLY) : BEATS;
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
  const cls = `${STYLE}${b.cover ? ' big' : ''}`;
  writeFileSync(htmlPath, head + `<div class="wrap">
  <div class="grade"></div>
  <div class="top"></div>
  <div class="mid"></div>
  <div class="bar"><span class="brand">${GLYPH}<span>her.solotrip</span></span></div>
  <div class="line ${cls}">${STYLE === 'cream' ? hi(b.line, b.hiW) : esc(b.line)}</div>
  ${b.body ? `<div class="body">${esc(b.body)}</div>` : ''}
  ${b.endcard ? `<div class="lockup">${mark}<span class="word">Daya</span></div>` : ''}
  <div class="grain"></div>
</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
});

// 3) fertige Slides
beats.forEach((b) => {
  const i = BEATS.indexOf(b);
  const n = String(i + 1).padStart(2, '0');
  const suffix = ONLY ? `-${STYLE}` : '';
  const py = `
from PIL import Image
g = Image.open('${join(GRID, `${b.id}.png`)}').convert('RGBA')
o = Image.open('${join(OV, `${b.id}.png`)}').convert('RGBA')
Image.alpha_composite(g, o).convert('RGB').save('${join(SLIDES, `${n}-${b.id}${suffix}.png`)}')`;
  const pyPath = join(SLIDES, `${n}${suffix}.py`);
  writeFileSync(pyPath, py);
  execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
  console.log('slide', n, b.id, STYLE, 'ok');
});
