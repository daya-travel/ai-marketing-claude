// Drei Trial Reels fuer @her.solotrip - der Test aus dem Plan vom 04.09.2026.
//
// WARUM DIESE DREI. Drei Reels derselben Reihe, die Reichweite bricht von Post
// zu Post ein: Japan 3.202 Aufrufe bei 22 Sekunden Wiedergabe, Thailand 197 bei
// 14, Italien 65 bei 11. Alle drei liefen rund eine Minute. Die Reichweite folgt
// der Wiedergabezeit eins zu eins.
//
// Der groesste Unterschied war nicht die Machart, sondern der Inhalt: der
// Japan-Post war nie eine Verbotsliste. Er erklaerte Vorbereitung - Frauenwagen,
// Koban, Erkaeltungsmittel - und holte 89 Speicherungen. Thailand, Korea und
// Italien sind reine Strafenlisten und kamen auf 4 und 3.
//
//   Trial 1  Japan,   nuetzlich       \  1 gegen 2 misst das THEMA
//   Trial 2  Italien, nuetzlich       /  (Format gleich, Land wechselt)
//   Trial 3  Italien, Bussgeldliste      2 gegen 3 misst den INHALT
//                                        (Land gleich, Blickwinkel wechselt)
//
// In allen dreien gleich, also nicht getestet: Flatlay-Cover, drei Punkte,
// unter 25 Sekunden, Untertitel, Aufloesung im ersten Punkt. Das kommt aus dem,
// was bei Japan schon drin war, und aus den 2026-Richtwerten.
//
// UEBERNOMMEN AUS build-italy.mjs, samt aller Entscheidungen, die dort teuer
// waren:
//   - randlos, ein Slide-Typ, kein Emerald-Layer ueber Fotos
//   - KEINE VERLAEUFE. Alesya, 02.09.: „Lass alle Verdunklungen hinter dem Text
//     bitte weg." Was den Text traegt, ist der Schlagschatten
//   - Text nie tiefer als rund 78 % der Bildhoehe, sonst verdeckt ihn TikTok
//   - Ueberschrift in Creme, nur *Sternchen* werden marigold
//   - Zahlen als Ziffern, ueberall wo sie gelesen werden
//   - Wortmarke auf bottom 440, das sind 77,1 % - nicht 300 wie in Thailand
//
// NEU HIER: das Cover ist ein helles Flatlay auf weissem Leinen. Creme auf
// Creme ist unlesbar, und dunkler machen darf ich es nicht. Also kehrt sich die
// Schrift um: Emerald mit Amber-Auszeichnung und einem hellen statt dunklen
// Schlagschatten. Die Regel steht schon im CLAUDE.md („Und die Kopfzeile dort in
// Emerald statt Creme, sonst steht Creme auf Creme").
//
// Usage: TRIAL=trial1 node build-trials.mjs
//        TRIAL=trial2 ONLY=02 node build-trials.mjs
//        TRIAL=all node build-trials.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCKUP = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-cream.png');
// Emerald-Fassung fuer helle Slides, dieselbe Zeichnung ohne Kachel.
const LOCKUP_DARK = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-emerald.png');
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const W = 1080, H = 1920, RESERVE = 87;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = (s) => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');

// ink   = dunkle Schrift auf hellem Foto (Emerald + Amber, heller Schatten)
// ty    = vertikale Mitte des Textblocks in Prozent, nie ueber 72
const TRIALS = {
  // ---------------------------------------------------------------- Trial 1
  // Japan, nuetzlich. Das Raetsel zeigt auf den Koffer, der wirklich im Flatlay
  // liegt. Aufgeloest im ersten Punkt, nicht bei Sekunde 25.
  //
  // Erste Fassung des Hooks zeigte auf die Bankkarte. Verworfen: eine Karte ist
  // von Natur aus bedruckt, und soul_2 schreibt Buchstabensalat drauf.
  trial1: {
    photos: join(__dirname, 'photos', 'japan', 'final'),
    beats: [
      { id: '01', photo: 'j00-flatlay', cover: true, ink: true, darkBar: true, ty: 30,
        head: 'One thing in this picture costs you a *whole day*.',
        body: '3 things to sort before Japan.' },

      { id: '02', photo: 'j01-luggage', ink: true, darkBar: true, ty: 63,
        head: 'Your *suitcase*.',
        lines: [
          'Hand it in at the hotel desk or a konbini',
          '*About 3,000 yen* inside Tokyo, about $19',
          'Tokyo to Kyoto *about 3,200 yen*, about $21',
          'Under 25 kilos, there the next day',
        ] },

      { id: '03', photo: 'j02-card', ty: 63,
        head: 'Your *bank card*.',
        lines: [
          'Bank machines refuse foreign cards',
          '7-Eleven: *over 28,000*, open all night',
          'Visa, Mastercard, Maestro, Amex and JCB',
          'Post offices work, but they shut overnight',
        ] },

      { id: '04', photo: 'j03-lasttrain', ty: 52,
        head: 'The *last train*.',
        lines: [
          'Trains stop around midnight, back around 5',
          'Taxis add *20 %* from 10pm to 5am',
          '7 km is *2,500 to 3,000 yen*, about $17',
          'Check your last train before you go out',
        ] },

      { id: 'end', photo: 'j04-end', endcard: true, ty: 60, zoom: 1.18, oy: 0.82,
        head: 'Save this for your *Japan trip*.',
        body: 'Follow for more.' },
    ],
  },

  // ---------------------------------------------------------------- Trial 2
  // Italien, nuetzlich. Gleiche Bauart, gleiche Slide-Zahl, anderes Land -
  // genau das ist die Variable gegen Trial 1. Das Raetsel zeigt auf den Schal.
  trial2: {
    photos: join(__dirname, 'photos', 'italy', 'final'),
    beats: [
      { id: '01', photo: 'u00-flatlay', cover: true, ink: true, darkBar: true, ty: 30,
        head: 'One thing in this picture gets you into the *Vatican*.',
        body: '3 things to sort before you land.' },

      { id: '02', photo: 'u01-scarf', ty: 63,
        head: 'A *scarf*.',
        lines: [
          'No sleeveless tops, nothing low-cut',
          'No shorts above the knee, no miniskirts',
          'They turn you away at the door',
          'A scarf covers it and weighs nothing',
        ] },

      { id: '03', photo: 'f12-fountain', ty: 63,
        head: 'A *water bottle*.',
        lines: [
          '*Over 3,000* public fountains in Rome',
          'The same drinking water as the taps, free',
          'Running 24 hours, over 200 in the old centre',
          'Cover the hole on top and drink upwards',
        ] },

      { id: '04', photo: 'u03-arrival', ty: 63,
        head: 'The taxi from the *airport*.',
        lines: [
          'Fiumicino to the centre: fixed *55 euros*',
          'Ciampino: fixed *31 euros*',
          'White car, TAXI sign, number on the door',
          'Nobody inside the terminal is a taxi',
        ] },

      { id: 'end', photo: 'f13-end', endcard: true, ty: 60,
        head: 'Save this for your *Italy trip*.',
        body: 'Follow for more.' },
    ],
  },

  // ---------------------------------------------------------------- Trial 3
  // Die Kontrolle: die Bussgeldliste, auf dasselbe Format gekuerzt. Drei von
  // elf schon belegten Punkten, Cover ist das fertige Muschel-Flatlay.
  //
  // Der Elf-Punkte-Hook zeigte auf ein Strandfoto, auf dem der Sand kein
  // Gegenstand war, und loeste erst nach 25 Sekunden auf. Hier zeigt er auf
  // Muscheln und Kieselsteine, die wirklich im Bild liegen.
  trial3: {
    photos: join(__dirname, 'photos', 'italy', 'final'),
    beats: [
      { id: '01', photo: 'u10-shells', cover: true, ink: true, darkBar: true, ty: 20,
        head: 'One thing in this picture is a *3,000 euro* fine.',
        body: '3 things Italy fines you for.' },

      { id: '02', photo: 'f02-sand', ty: 62,
        head: 'Sand from the *beach*.',
        lines: [
          'Free to pick up. *Up to 3,000 euros* to keep',
          'Sand, pebbles and shells all count',
          'X-ray checks at Olbia, Cagliari and Alghero',
          '*4 tonnes* seized at one airport in 2 years',
        ] },

      { id: '03', photo: 'f05-steps', ty: 27, oy: 0.82,
        head: 'Sitting on the *Spanish Steps*.',
        lines: [
          'Sitting alone is enough, no food needed',
          '*250 euros*, 400 if you leave a mark',
          'Officers patrol the steps and whistle you off',
          'Enforced since 2019',
        ] },

      { id: '04', photo: 'f06-ztl', ty: 63,
        head: 'The *camera* at the end of the street.',
        lines: [
          '*80 to 130 euros* per gate',
          'Every camera you pass counts separately',
          'Your rental company adds its own fee',
          'The letter arrives months after the trip',
        ] },

      { id: 'end', photo: 'f13-end', endcard: true, ty: 60,
        head: 'Save this for your *Italy trip*.',
        body: 'Follow for more.' },
    ],
  },
};

const style = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
.bar.dark .brand span{color:#0e3b2c;text-shadow:0 1px 4px rgba(255,255,255,.85)}
.bar.dark .brand svg{filter:drop-shadow(0 1px 3px rgba(255,255,255,.9));opacity:.9}

.block{position:absolute;left:90px;right:110px;top:50%;transform:translateY(-50%);
  text-align:left}
.head{font-family:'Archivo';font-weight:800;font-size:77px;line-height:1.08;
  letter-spacing:-.02em;text-wrap:balance;color:#f4ecdb;
  text-shadow:0 4px 22px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.hl{color:#efc05a}
.body{margin-top:26px;font-family:'Inter';font-weight:500;font-size:43px;line-height:1.42;
  color:#f4ecdb;text-wrap:pretty;text-shadow:0 2px 16px rgba(0,0,0,.9)}
.list{margin-top:28px;font-family:'Inter';font-weight:500;font-size:40px;
  line-height:1.34;color:#f4ecdb;text-shadow:0 2px 16px rgba(0,0,0,.9)}
.list div{margin-bottom:14px}
.list div:last-child{margin-bottom:0}

/* HELLES FOTO, DUNKLE SCHRIFT. Das Cover ist ein Flatlay auf weissem Leinen,
   dort ist Creme unlesbar - und dunkler machen darf ich das Foto nicht
   (Alesya, 02.09.). Also Emerald statt Creme, Amber statt Marigold, und der
   Schlagschatten wird hell statt dunkel. */
.block.ink .head{color:#0e3b2c;
  text-shadow:0 2px 18px rgba(244,236,219,.95),0 1px 5px rgba(255,255,255,.9)}
/* Kein cremefarbener Glow an der Auszeichnung: Amber auf Leinen mit Creme
   drumherum war der unlesbarste Text im ganzen Reel. Stattdessen ein schmaler
   dunkler Schatten, der die Kante haelt. */
/* Amber #cf8a1d auf cremefarbenem Leinen ergibt rund 2,6:1 Kontrast, das ist
   unter jeder Lesbarkeitsgrenze. #8a5209 ist dieselbe Farbe zwei Stufen
   dunkler und kommt auf rund 5,5:1. */
.block.ink .hl{color:#8a5209;text-shadow:0 1px 3px rgba(26,20,11,.35)}
.block.ink .body{color:#1a140b;opacity:.86;
  text-shadow:0 2px 14px rgba(244,236,219,.95)}
/* Ohne diese Zeile blieben die Stichpunkte creme, waehrend die Ueberschrift
   darueber schon dunkel war - auf hellem Tatami war das der schwaechste Text
   im ganzen Reel. */
.block.ink .list{color:#1a140b;
  text-shadow:0 2px 14px rgba(244,236,219,.95)}

.block.cover,.block.end{text-align:center;left:80px;right:80px}
.cover .head{font-size:102px;line-height:1.02}
.cover .body{margin-top:28px;font-size:41px;letter-spacing:.01em;opacity:.92}
.end .head{font-size:83px}
.end .body{font-size:39px;letter-spacing:.01em;opacity:.9}
/* bottom 440 = Unterkante auf 77,1 % der Bildhoehe. 300, wie in Thailand,
   waeren 84,3 % und damit unter der Linie, die genau dafuer aufgestellt wurde. */
.lockup{position:absolute;left:0;right:0;bottom:440px;display:flex;justify-content:center}
.lockup img{height:78px;filter:drop-shadow(0 3px 14px rgba(0,0,0,.9))}
</style></head><body>`;
const foot = `</body></html>`;

const want = process.env.TRIAL || '';
if (!want) throw new Error('TRIAL fehlt. TRIAL=trial1|trial2|trial3|all');
const names = want === 'all' ? Object.keys(TRIALS) : [want];
const ONLY = process.env.ONLY || '';

for (const name of names) {
  const trial = TRIALS[name];
  if (!trial) throw new Error('unbekannter TRIAL: ' + name + ' (' + Object.keys(TRIALS).join(', ') + ')');
  const OUT = join(__dirname, 'reels', name);
  const OV = join(OUT, 'overlays');
  const GRID = join(OUT, 'grids');
  const SLIDES = join(OUT, 'slides');
  const beats = ONLY ? trial.beats.filter((b) => b.id === ONLY) : trial.beats;
  if (!beats.length) throw new Error('ONLY matched no beat: ' + ONLY);
  if (!ONLY) rmSync(OUT, { recursive: true, force: true });
  [OV, GRID, SLIDES].forEach((d) => mkdirSync(d, { recursive: true }));

  // 1) Backplate, randlos beschnitten
  beats.forEach((b) => {
    const f = join(trial.photos, `${b.photo}.png`);
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
    const lockFile = b.ink && existsSync(LOCKUP_DARK) ? LOCKUP_DARK : LOCKUP;
    const lock = existsSync(lockFile) ? `<img src="file://${lockFile}">` : '';
    if (b.endcard && !lock) throw new Error('missing DAYA lockup ' + lockFile);
    const text =
      `<div class="head">${fmt(b.head)}</div>` +
      (b.body ? `<div class="body">${fmt(b.body)}</div>` : '') +
      (b.lines ? `<div class="list">${b.lines.map((l) => `<div>${fmt(l)}</div>`).join('')}</div>` : '');
    const cls = ['block'];
    if (b.cover) cls.push('cover');
    if (b.endcard) cls.push('end');
    if (b.ink) cls.push('ink');
    const inner = `
  <div class="${cls.join(' ')}"${b.ty ? ` style="top:${b.ty}%"` : ''}>${text}</div>`;
    writeFileSync(htmlPath, style + `<div class="wrap">
  ${inner}
  <div class="bar${b.darkBar ? ' dark' : ''}"><span class="brand">${glyph(b.darkBar ? '#0e3b2c' : '#f4ecdb')}<span>her.solotrip</span></span></div>
  ${b.endcard ? `<div class="lockup">${lock}</div>` : ''}
  <div class="grain"></div>
</div>` + foot);
    execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
    execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  });

  // 3) fertige Slides
  beats.forEach((b) => {
    const n = String(trial.beats.indexOf(b) + 1).padStart(2, '0');
    const py = `
from PIL import Image
g = Image.open('${join(GRID, `${b.id}.png`)}').convert('RGBA')
o = Image.open('${join(OV, `${b.id}.png`)}').convert('RGBA')
Image.alpha_composite(g, o).convert('RGB').save('${join(SLIDES, `${n}-${b.id}.png`)}')`;
    const pyPath = join(SLIDES, `${n}.py`);
    writeFileSync(pyPath, py);
    execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
    console.log(name, 'slide', n, b.id, 'ok');
  });
}
