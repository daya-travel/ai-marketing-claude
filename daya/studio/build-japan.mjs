// Instagram- und TikTok-Karussell „Before you fly to Japan alone" - her.solotrip.
//
// Nutzwert-Post. Zielmetrik ist Speichern, nicht Reposten. Jeder Fakt ist belegt,
// Quellen stehen in daya/content/2026-08-28-carousel-japan.md.
//
// ALLE SLIDES SIND RANDLOS. Die Objektbilder kamen aus nano_banana_pro als 4:5.
// Erste Fassung setzte sie als Karte auf Emerald-Grund, weil ein 9:16-Zuschnitt
// rund 30 % der Breite weggeschnitten haette. Alesya am 28.08.: „vllt kannst du
// doch das bild in voller breite des slides machen ... dieser gruene hintergrund
// stoert irgendwie." Richtig. Geloest ueber `outpaint_image` von 4:5 auf 9:16:
// das Modell verlaengert Leinen und Weg, die Gegenstaende bleiben unangetastet,
// und es entsteht oben und unten freie Flaeche fuer den Text.
//
// ty = vertikale Position des Textblocks in Prozent. Auf den Objektslides sitzt
// der Text tief in der leeren Leinenflaeche, damit er keinen Gegenstand verdeckt.
// Ab ty >= 65 wird zusaetzlich der untere Verlauf eingeblendet, sonst waere Creme
// auf hellem Leinen unlesbar.
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
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'carousel-japan');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const BEATS = [
  // Hook zeigt auf das Bild selbst: die Leserin scannt die Gegenstaende, findet die
  // Antwort nicht und muss wischen. Aufloesung auf Slide 05. Die Behauptung stimmt,
  // die Blisterpackung liegt im Bild und Pseudoephedrin ist in Japan verboten.
  // SECHS, nicht fuenf: die Info-Slides sind 02 bis 07. Alesya am 28.08. gefunden.
  { id: '01', photo: 'o1-flatlay', light: true, cover: true, ty: 80, zoom: 1.2, oy: 0.92,
    head: 'One thing in this picture is banned in Japan.',
    body: 'Six things worth knowing before you fly.' },

  { id: '02', photo: 'j2-train-b',
    head: 'Japan is one of the safest countries in the world for women.',
    body: 'It still has women-only carriages on 87 train lines. Both of those are true.' },

  { id: '03', photo: 'k3-pink-a',
    head: 'Pink means women only.',
    body: 'Pink paint on the platform shows where that carriage stops, and the door has pink stickers. It applies on weekdays in rush hour, from the first train until about 9:30, and in the evening on some lines. Outside those hours anyone can use it. Get on the wrong one and nothing happens, nobody is fined.' },

  // ty: ohne das sitzt der Fliesstext auf ihrem Gesicht, geprueft am 28.08.
  { id: '04', photo: 'm4-park-a', ty: 34,
    head: "There's a police box within five minutes of you.",
    body: 'They\u2019re called koban. In central Tokyo there\u2019s usually one within a five minute walk, often right outside a station. Search \u4EA4\u756A on the map. Most people go in just to ask directions. Shibuya and Kabukicho have English speakers on every shift, and the emergency number is 110.' },

  { id: '05', photo: 'o5-meds', light: true, ty: 78, zoom: 1.2, oy: 0.92,
    head: 'Check your cold medicine before you fly.',
    body: 'Sudafed, Actifed and Vicks inhalers are banned. Anything with codeine needs a permit you apply for before you travel. A prescription from home doesn\u2019t help. Check the ingredients on the box.' },

  { id: '06', photo: 'o6-carry', light: true, ty: 80, zoom: 1.06, oy: 0.88,
    head: 'Pack a hand towel and a plastic bag.',
    body: 'Most public toilets have no paper towels and no dryer, so everyone carries a small towel. And there are almost no bins on the street. Your rubbish goes in the bag until you reach a konbini, the convenience stores you\u2019ll see everywhere.' },

  // Text oben in den weichen Hintergrund, die Bank mit dem Handy bleibt frei.
  { id: '07', photo: 'o7-phone', light: true, ty: 24,
    head: "Lose your phone here and you'll probably get it back.",
    body: 'In Tokyo about 83% of lost phones are returned to their owner. That\u2019s the highest of anything people lose. Wallets are around 65%. Everything goes to the same police box, and about 7,700 items get handed in every day.' },

  { id: 'end', photo: 'j7-end-a', endcard: true,
    head: 'Now go book it.' },
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
.bot{position:absolute;left:0;right:0;bottom:0;height:46%;
  background:linear-gradient(0deg,rgba(6,29,21,.9) 0%,rgba(6,29,21,.78) 34%,
    rgba(6,29,21,0) 100%)}
/* enge, kraeftige Verlaeufe fuer helle Objektbilder */
.botlight{position:absolute;left:0;right:0;bottom:0;height:38%;
  background:linear-gradient(0deg,rgba(6,29,21,.94) 0%,rgba(6,29,21,.88) 40%,
    rgba(6,29,21,0) 100%)}
.toplight{position:absolute;left:0;right:0;top:0;height:46%;
  background:linear-gradient(180deg,rgba(6,29,21,.92) 0%,rgba(6,29,21,.82) 46%,
    rgba(6,29,21,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
.bar.dark .brand span{color:#0e3b2c;text-shadow:none}
.bar.dark .brand svg{filter:none;opacity:.85}

/* Fotoslides: Text mittig ueber dem Bild */
.block{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%);
  text-align:center}
.head{font-family:'Archivo';font-weight:800;font-size:60px;line-height:1.12;
  letter-spacing:-.02em;text-wrap:balance;color:#efc05a;
  text-shadow:0 4px 22px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.body{margin-top:26px;font-family:'Inter';font-weight:500;font-size:33px;line-height:1.5;
  color:#f4ecdb;text-wrap:pretty;text-shadow:0 2px 16px rgba(0,0,0,.9)}

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

// 1) Backplate. Alle Slides randlos beschnitten.
//    zoom: Vergroesserungsfaktor ueber das Nötige hinaus, schafft Spielraum zum
//    Verschieben. oy: wo aus diesem Spielraum geschnitten wird, 0 = oben,
//    0.5 = mittig (Standard), 1 = unten. Groesseres oy schiebt den Bildinhalt
//    nach OBEN. Gebraucht auf dem Cover: dort stand oben leeres Leinen, waehrend
//    der Textverlauf unten die Schuhe angeschnitten hat (Alesya, 28.08.).
beats.forEach((b) => {
  const f = join(PHOTOS, `${b.photo}.png`);
  if (!existsSync(f)) throw new Error('missing photo ' + f);
  const out = join(GRID, `${b.id}.png`);
  const zoom = b.zoom || 1;
  const oy = b.oy === undefined ? 0.5 : b.oy;
  const py = `
from PIL import Image
im = Image.open('${f}').convert('RGB'); w, h = im.size
s = max(${W} / w, ${H} / h) * ${zoom}
im = im.resize((int(w * s), int(h * s)), Image.LANCZOS); w, h = im.size
x = (w - ${W}) // 2
y = int((h - ${H}) * ${oy})
im.crop((x, y, x + ${W}, y + ${H})).save('${out}')`;
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
  // Sitzt der Text tief, braucht er den unteren Verlauf. Ohne ihn steht Creme auf
  // hellem Leinen und ist unlesbar.
  const low = (b.ty || 50) >= 65;
  // Dunkle Kopfzeile nur, wenn der Bildkopf hell bleibt: helles Objektbild MIT
  // tiefem Text. Sitzt der Text oben (Slide 07), verdunkelt .toplight den Kopf,
  // dort bleibt die Kopfzeile creme.
  const darkBar = Boolean(b.light) && low;
  // Helle Objektbilder ohne Mittelverlauf und ohne Emerald-Gradierung, sonst
  // versinken die Gegenstaende. Alesya am 28.08.: das Flatlay muss absuchbar
  // bleiben, der Hook zeigt darauf.
  const inner = `${b.light ? '' : '<div class="grade"></div>'}
  ${b.light ? '' : '<div class="top"></div><div class="mid"></div>'}
  ${b.light ? (low ? '<div class="botlight"></div>' : '<div class="toplight"></div>') : ''}
  ${!b.light && (b.endcard || low) ? '<div class="bot"></div>' : ''}
  <div class="block${b.cover ? ' cover' : ''}"${b.ty ? ` style="top:${b.ty}%"` : ''}>${text}</div>`;
  writeFileSync(htmlPath, head + `<div class="wrap">
  ${inner}
  <div class="bar${darkBar ? ' dark' : ''}"><span class="brand">${glyph(darkBar ? '#0e3b2c' : '#f4ecdb')}<span>her.solotrip</span></span></div>
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
  console.log('slide', n, b.id, 'ok');
});
