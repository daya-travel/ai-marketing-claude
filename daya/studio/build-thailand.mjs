// Reel „Seven things that are actually illegal in Thailand" - her.solotrip.
//
// Neun Frames auf der geprueften Tonspur `audio/thailand/thailand-isla-115.wav`
// (61 s, 170 W/min). Die Schnittpunkte stehen gemessen in `audio/thailand/cuts.json`,
// ermittelt mit `ffmpeg -af silencedetect`, nicht geschaetzt.
//
// JEDE ZAHL IN DIESEM POST IST BELEGT. Die Quellen stehen in
// daya/content/2026-08-31-reel-thailand-illegal.md. Von den sieben Punkten des
// ElevenLabs-Originals stimmten zwei, zwei waren falsch, drei unvollstaendig.
// Hier steht nur die korrigierte Fassung. Keine neue Rechtsangabe ohne Beleg.
//
// Aufbau uebernommen von build-japan.mjs, mit den Entscheidungen vom 29.08.:
//   - randlos, ein Slide-Typ
//   - KEIN Emerald-Layer ueber Fotos, alle Verlaeufe neutrales Schwarz
//   - keine Buchstaben auf den Gegenstaenden im Bild, nur der Overlay-Text
//
// Motivauswahl: Thailand hat an jeder Strasse mehr Schrift als Japan, und soul_2
// macht daraus Buchstabensalat. Deshalb sind alle Orte bewusst schriftfrei
// gewaehlt - Strand, Himmel, Unterwasser, Blatt, leere Halle. Sechs von achtzehn
// ersten Varianten flogen genau daran raus („worosiie", „ND SASS", „Majodore",
// Aufdruck auf einem T-Shirt), drei Motive wurden neu erzeugt.
//
// Die DAYA-Wortmarke auf der Schlusskarte ist das eingecheckte Original aus
// daya/brand/design-package/daya-brand/. Kein Link, kein Feature-Satz vor dem
// Launch (Alesya, 29.08.).
//
// Usage: node build-thailand.mjs        alle Slides
//        ONLY=05 node build-thailand.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'thailand');
// Flaches Lockup ohne die Emerald-Kachel - Alesya, 31.08.: die App-Icon-Fassung
// ist nicht das Logo fuer Posts. Gebaut aus derselben Originaldatei, die
// Strichzeichnung ist aus der Kachel geloest und flach eingefaerbt.
const LOCKUP = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-cream.png');
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const OUT = join(__dirname, 'reels', 'thailand');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ty  = vertikale Mitte des Textblocks in Prozent
// light = helles Foto: kein Mittelverlauf, enger Verlauf hinter dem Text
// zoom/oy = Bildinhalt im randlosen Zuschnitt verschieben, groesseres oy schiebt
//           den Inhalt nach OBEN
const BEATS = [
  // Frame 1 - Hook. Sie steht klein am Strand, die Kueste traegt das Bild.
  { id: '01', photo: 'f1', cover: true, ty: 24,
    head: '7 things that are actually illegal in Thailand.',
    body: 'And tourists do them every day.' },

  // Frame 2 - Vapes. Bild: ein blankes schwarzes Geraet auf Beton, keine
  // Aufschrift. Die zweite Variante trug „worosiie" und flog raus.
  { id: '02', photo: 'f2', ty: 72,
    head: 'Vapes.',
    body: 'Banned since 2014, and there’s no exception for tourists. Fines reach 30,000 baht, about $900.' },

  // Frame 3 - Strandrauchen. Zwanzig Straende, seit November 2017.
  { id: '03', photo: 'f3', ty: 72,
    head: 'Smoking on the beach.',
    body: 'Twenty beaches, Phuket and Koh Samui among them. Up to a year, or 100,000 baht, about $3,000.' },

  // Frame 4 - Drohne. Laengstes Segment (10,5 s), deshalb vier Stichpunkte.
  // „Tempel" aus dem Original steht NICHT drin, das war unbelegt.
  { id: '04', photo: 'f4', ty: 74,
    head: 'Flying a drone.',
    bullets: [
      'Two registrations, within thirty days of landing',
      'No-fly zone nine kilometres around every airport',
      'That covers almost all of Phuket',
      'All national parks as well',
    ] },

  // Frame 5 - Monarchie. §112. Das Beispiel „auf Geld treten" aus dem Original
  // liess sich nicht belegen und ist raus, der Punkt mit den Beitraegen ist belegt.
  { id: '05', photo: 'f5', ty: 72,
    head: 'Posting about the monarchy.',
    body: 'Three to fifteen years, and every single post counts separately.' },

  // Frame 6 - Cannabis. Erste Fassung warnte vor nichts: sie sagte „your prescription
  // from home doesn't count", aber eine thailaendische Verschreibung bekommt man vor
  // Ort, und genau deshalb kaufen Tourist:innen dort ohne Probleme ein (Alesya,
  // 31.08.: „wovor warnen wir dann?"). Bestraft wird der oeffentliche Konsum und die
  // Ausfuhr - Section 244 Customs Act, in Kraft seit 17.06.2026.
  { id: '06', photo: 'f6', light: true, ty: 70,
    head: 'Cannabis.',
    bullets: [
      'Buying is legal with a Thai prescription',
      'Smoking in public costs up to 25,000 baht, about $750',
      'Taking it out of the country is the serious one',
      'Since June 2026 that’s ten years and 500,000 baht, about $15,000',
    ] },

  // Frame 7 - Overstay. Helle Halle, Text oben in den .toplight-Verlauf.
  { id: '07', photo: 'f7', light: true, ty: 23,
    head: 'Overstaying.',
    bullets: [
      '500 baht for every day you’re over, about $15',
      'Capped at 20,000, about $600, after forty days',
      'Report yourself and you just pay it',
      'Get stopped at the airport and it’s a five-year ban',
    ] },

  // Frame 8 - Korallen. Text oben ins offene Wasser.
  { id: '08', photo: 'f8', ty: 26,
    head: 'Taking coral home.',
    body: 'Inside a national park that runs to five years and 500,000 baht, about $15,000.' },

  // Frame 9 - Schlusskarte. Kein Link, kein Feature-Satz vor dem Launch.
  { id: 'end', photo: 'f9', endcard: true, ty: 72,
    head: 'Save this before you fly.',
    body: 'Follow for more.' },
];

const style = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}
.top{position:absolute;left:0;right:0;top:0;height:16%;
  background:linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,0) 100%)}
.mid{position:absolute;left:0;right:0;top:12%;height:68%;
  background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.55) 22%,
    rgba(0,0,0,.55) 78%,rgba(0,0,0,0) 100%)}
.bot{position:absolute;left:0;right:0;bottom:0;height:46%;
  background:linear-gradient(0deg,rgba(0,0,0,.86) 0%,rgba(0,0,0,.72) 34%,
    rgba(0,0,0,0) 100%)}
/* enge, kraeftige Verlaeufe fuer helle Bilder */
/* 54 % statt 40 %: seit der Text hoeher sitzt (ty 70) begann der erste Stichpunkt
   sonst oberhalb des Verlaufs, also creme auf hellem Stein. */
.botlight{position:absolute;left:0;right:0;bottom:0;height:54%;
  background:linear-gradient(0deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.84) 34%,
    rgba(0,0,0,.6) 62%,rgba(0,0,0,0) 100%)}
.toplight{position:absolute;left:0;right:0;top:0;height:48%;
  background:linear-gradient(180deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.78) 48%,
    rgba(0,0,0,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
.bar.dark .brand span{color:#0e3b2c;text-shadow:0 1px 4px rgba(255,255,255,.85)}
.bar.dark .brand svg{filter:drop-shadow(0 1px 3px rgba(255,255,255,.9));opacity:.9}

.block{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%);
  text-align:center}
.head{font-family:'Archivo';font-weight:800;font-size:64px;line-height:1.1;
  letter-spacing:-.02em;text-wrap:balance;color:#efc05a;
  text-shadow:0 4px 22px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.body{margin-top:26px;font-family:'Inter';font-weight:500;font-size:34px;line-height:1.45;
  color:#f4ecdb;text-wrap:pretty;text-shadow:0 2px 16px rgba(0,0,0,.9)}
/* Stichpunkte: Zeilen linksbuendig, die Liste als Ganzes mittig */
.list{margin-top:30px;display:inline-block;text-align:left;
  font-family:'Inter';font-weight:500;font-size:32px;line-height:1.4;color:#f4ecdb;
  text-shadow:0 2px 16px rgba(0,0,0,.9)}
.list div{position:relative;padding-left:34px;margin-bottom:16px}
.list div:last-child{margin-bottom:0}
.list div::before{content:'';position:absolute;left:6px;top:.62em;width:9px;height:9px;
  border-radius:50%;background:#efc05a}

.cover .head{font-size:78px}
.cover .body{margin-top:30px;font-size:33px;letter-spacing:.02em;opacity:.88}
.end .head{font-size:70px}
.end .body{font-size:31px;letter-spacing:.02em;opacity:.85}
/* Schlusskarte: das eingecheckte DAYA-Lockup, kein nachgebauter Schriftzug */
/* bottom 300 statt 150: unter rund 78 % der Bildhoehe verdeckt die TikTok-Oberflaeche
   alles, das gilt auch fuer die Wortmarke (Alesya, 31.08.) */
.lockup{position:absolute;left:0;right:0;bottom:300px;display:flex;justify-content:center}
.lockup img{height:78px;filter:drop-shadow(0 3px 14px rgba(0,0,0,.9))}
</style></head><body>`;
const foot = `</body></html>`;

const beats = ONLY ? BEATS.filter((b) => b.id === ONLY) : BEATS;
if (!beats.length) throw new Error('ONLY matched no beat: ' + ONLY);
if (!ONLY) rmSync(OUT, { recursive: true, force: true });
[OV, GRID, SLIDES].forEach((d) => mkdirSync(d, { recursive: true }));

// 1) Backplate, randlos beschnitten
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
  const lock = existsSync(LOCKUP) ? `<img src="file://${LOCKUP}">` : '';
  if (b.endcard && !lock) throw new Error('missing DAYA lockup ' + LOCKUP);
  const text = `<div class="head">${esc(b.head)}</div>` +
    (b.body ? `<div class="body">${esc(b.body)}</div>` : '') +
    (b.bullets ? `<div class="list">${b.bullets.map((l) => `<div>${esc(l)}</div>`).join('')}</div>` : '');
  // Sitzt der Text tief, braucht er den unteren Verlauf.
  const low = (b.ty || 50) >= 65;
  // Dunkle Kopfzeile nur, wenn der Bildkopf hell BLEIBT: helles Foto MIT tiefem
  // Text. Sitzt der Text oben, verdunkelt .toplight den Kopf und die Kopfzeile
  // bleibt creme.
  const darkBar = Boolean(b.light) && low;
  // Nur so viel Verlauf wie noetig. Liegt der Text tief, deckt .bot ihn schon ab,
  // dann faellt .mid weg - drei uebereinanderliegende Verlaeufe machen das Foto
  // matschig und genau das sollte weg („muss eher roh aussehen", Alesya 29.08.).
  const inner = `
  ${b.light ? '' : '<div class="top"></div>'}
  ${!b.light && !low && !b.endcard ? '<div class="mid"></div>' : ''}
  ${b.light ? (low ? '<div class="botlight"></div>' : '<div class="toplight"></div>') : ''}
  ${!b.light && (b.endcard || low) ? '<div class="bot"></div>' : ''}
  <div class="block${b.cover ? ' cover' : ''}${b.endcard ? ' end' : ''}"${b.ty ? ` style="top:${b.ty}%"` : ''}>${text}</div>`;
  writeFileSync(htmlPath, style + `<div class="wrap">
  ${inner}
  <div class="bar${darkBar ? ' dark' : ''}"><span class="brand">${glyph(darkBar ? '#0e3b2c' : '#f4ecdb')}<span>her.solotrip</span></span></div>
  ${b.endcard ? `<div class="lockup">${lock}</div>` : ''}
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
