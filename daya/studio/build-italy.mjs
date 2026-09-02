// Reel „Italy will fine you for sitting down" - her.solotrip.
//
// Dreizehn Frames. Cover, elf Punkte, Schlusskarte. Aufloesung des Hooks auf
// Slide 5, der Spanischen Treppe - dieselbe Mechanik wie beim Japan-Karussell.
//
// JEDE ZAHL IN DIESEM POST IST BELEGT. Die Quellen stehen in
// daya/content/2026-09-02-reel-italy-illegal.md und in der Datenbank unter
// daya/tools/her-solo-banned-generator/data/banned_database.json, jede mit
// Quelle und Pruefdatum. Alesya kam mit einer Gemini-Liste von sieben
// Behauptungen, davon stimmten drei - keine einzige davon ist uebernommen,
// alle elf Punkte sind am 02.09.2026 neu recherchiert.
//
// Euro braucht keine Umrechnung. Die Regel aus dem Thailand-Post („30,000 baht,
// about $900") entfaellt hier und spart in jeder Zeile vier Woerter.
//
// Aufbau uebernommen von build-thailand.mjs, samt der Entscheidungen vom 29.08.
// und 31.08.:
//   - randlos, ein Slide-Typ
//   - KEIN Emerald-Layer ueber Fotos, alle Verlaeufe neutrales Schwarz
//   - nie drei Verlaeufe uebereinander: liegt der Text tief, faellt .mid weg
//   - Text nie tiefer als rund 78 % der Bildhoehe, sonst verdeckt ihn TikTok
//   - keine Buchstaben auf den Gegenstaenden im Bild, nur der Overlay-Text
//
// Motivauswahl: Italien hat an jeder Fassade eine Inschrift und an jeder Ecke
// ein Schild, und soul_2 macht daraus Buchstabensalat. Vier von dreissig ersten
// Varianten flogen genau daran raus - ein Gebaeude mit „KAFCKXS" ueber der
// Treppe, ein Strassenschild am Campo, ein bedrucktes Handtuch und eine
// Postkarten-Ueberschrift „VENETIA / YETOMDE PEVCRETR GOUT". Geloest wurde das
// jedes Mal durch einen anderen Ort, nicht durch einen besseren Prompt.
//
// Usage: node build-italy.mjs        alle Slides
//        ONLY=05 node build-italy.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'italy', 'final');
// Flaches Lockup ohne die Emerald-Kachel - Alesya, 31.08.: die App-Icon-Fassung
// ist nicht das Logo fuer Posts.
const LOCKUP = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-cream.png');
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const OUT = join(__dirname, 'reels', 'italy');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
const SLIDES = join(OUT, 'slides');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.ONLY || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ty  = vertikale Mitte des Textblocks in Prozent. 68 bei vier Stichpunkten,
//       72 bei Fliesstext - beides so gewaehlt, dass die letzte Zeile ueber
//       78 % bleibt.
// light = helles Foto: kein Mittelverlauf, enger Verlauf hinter dem Text
const BEATS = [
  // Frame 1 - Hook. Sie sitzt auf breiten Steinstufen, die Treppe traegt das
  // Bild. Die erste Variante hatte oben ein Gebaeude mit erfundener Schrift
  // („KAFCKXS", „RR") und flog raus.
  { id: '01', photo: 'f01-cover', cover: true, ty: 26,
    head: 'Italy will fine you for sitting down.',
    body: 'Eleven things worth knowing before you go.' },

  // Frame 2 - Sardinien. Regionalgesetz 16/2017. Die vier Tonnen sind aus dem
  // Bericht zum Projekt „Take Me Back to the Sea", nicht geschaetzt.
  { id: '02', photo: 'f02-sand', light: true, ty: 68,
    head: 'Sand from the beach.',
    bullets: [
      '500 to 3,000 euros',
      'Sand, pebbles and shells all count',
      'X-ray checks at Olbia, Cagliari and Alghero',
      'Four tonnes came out of one airport in two years',
    ] },

  // Frame 3 - Cinque Terre. Gilt nur auf den markierten Wegen, das gehoert
  // dazu, sonst ist es ein Verbot, das niemanden trifft.
  { id: '03', photo: 'f03-trail', ty: 68,
    head: 'Flip-flops on the trails.',
    bullets: [
      'The marked coastal paths in the Cinque Terre',
      '50 euros, up to 2,500 if they have to rescue you',
      'Rangers check your shoes at the trailhead',
      'The villages themselves are fine',
    ] },

  // Frame 4 - Faelschungen. Der interessante Teil ist die Haftung der
  // Kaeuferin, nicht die strittige Obergrenze. Deshalb steht hier der belegte
  // Einzelfall und keine Spanne bis 10.000.
  { id: '04', photo: 'f04-fake', light: true, ty: 68,
    head: 'The bag on the beach towel.',
    bullets: [
      'The buyer is liable, not only the seller',
      'One documented case: 1,000 euros for one bag',
      'It applies on the beach and in the street',
      'The bag gets confiscated either way',
    ] },

  // Frame 5 - AUFLOESUNG des Hooks. Rom, seit 2019 durchgesetzt.
  // oy 0.82: der mittige Zuschnitt schnitt sie fast heraus und uebrig blieben
  // nackte Stufen. Groesseres oy schiebt den Inhalt nach oben, also zeigt der
  // Ausschnitt den unteren Teil des Fotos, in dem sie sitzt.
  // Text nach oben: bei ty 70 stand er genau auf ihrem Kopf.
  { id: '05', photo: 'f05-steps', light: true, ty: 30, oy: 0.82,
    head: 'This is the one.',
    body: 'Sitting on the Spanish Steps is 250 euros, and 400 if you leave a mark. Sitting is enough. No food needed.' },

  // Frame 6 - ZTL. Der teuerste Punkt fuer alle, die einen Wagen mieten, und
  // der einzige, der erst Monate spaeter auffaellt.
  { id: '06', photo: 'f06-ztl', ty: 68,
    head: 'The camera at the end of the street.',
    bullets: [
      '80 to 130 euros per gate',
      'Every camera you pass counts separately',
      'Your rental company adds its own fee',
      'The letter arrives months after the trip',
    ] },

  // Frame 7 - Internationaler Fuehrerschein, Art. 135 Codice della Strada.
  { id: '07', photo: 'f07-road', ty: 68,
    head: 'Your licence on its own.',
    bullets: [
      'Only for licences issued outside the EU',
      '408 to 1,634 euros, payable on the spot',
      'The rental desk won’t ask. The police will',
      'You apply for the permit at home',
    ] },

  // Frame 8 - Venedig, Anstandsregeln 2019.
  { id: '08', photo: 'f08-bridge', ty: 68,
    head: 'Lunch on a bridge.',
    bullets: [
      'Bridges, steps, monument bases, quaysides',
      '100 to 200 euros',
      'Sitting on the ground to eat counts too',
      'Swimming in a canal is 350',
    ] },

  // Frame 9 - Sorrent, Anordnung vom 06.07.2022.
  { id: '09', photo: 'f09-amalfi', ty: 68,
    head: 'Swimwear in town.',
    bullets: [
      'Sorrento centre, 25 to 500 euros',
      'Bikinis, swimsuits and bare chests',
      'Beach clubs and pools are exempt',
      'Venice charges 250 for the same thing',
    ] },

  // Frame 10 - Contributo di accesso. Der Kalender wechselt jaehrlich, deshalb
  // steht hier der Stand 2026 und im Content-Doc das Pruefdatum.
  { id: '10', photo: 'f10-lagoon', light: true, ty: 68,
    head: 'Walking into Venice.',
    bullets: [
      'Day visitors only, hotel guests are exempt',
      '5 euros booked early, 10 euros late',
      'Fridays to Sundays, April to July',
      'Without one: 50 to 300 euros',
    ] },

  // Frame 11 - Handtuch. Objektbild ohne Menschen, erlaubt seit Alesyas
  // Entscheidung vom 26.08.: der Gegenstand ist hier der Inhalt.
  { id: '11', photo: 'f11-towel', light: true, ty: 68,
    head: 'The towel you left out.',
    bullets: [
      'Umbrellas, chairs and towels left overnight',
      'Around 200 euros, and it’s confiscated',
      'Dawn clearances on the free beaches',
      'The paid clubs aren’t affected',
    ] },

  // Frame 12 - Brunnen. Staerkster Schluss: der Daspo laeuft weiter, wenn das
  // Bussgeld laengst bezahlt ist.
  { id: '12', photo: 'f12-fountain', ty: 68,
    head: 'One foot in the fountain.',
    bullets: [
      'Wading counts, you don’t have to swim',
      'About 500 euros in Rome',
      'Plus a Daspo, a ban from the area',
      'One lifetime ban handed out in May 2026',
    ] },

  // Frame 13 - Schlusskarte. „before you go" statt „before you fly": nach
  // Italien faehrt man auch, und die Zeile darf sich nicht wiederholen.
  { id: 'end', photo: 'f13-end', endcard: true, ty: 60,
    head: 'Save this before you go.',
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
/* bottom 440 statt 300. Nachgemessen am 02.09.: bei 300 px sass die Unterkante
   der Wortmarke auf 84,3 % der Bildhoehe, also unter der 78-%-Linie, die genau
   dafuer aufgestellt wurde. Der Kommentar in build-thailand.mjs behauptet das
   Gegenteil, gerechnet wurde es dort nie - 300 px ueber dem Rand eines
   1920er-Bildes sind 84 %, nicht 78. 440 px setzen die Unterkante auf 77,1 %.
   Der Textblock der Schlusskarte rueckt dafuer auf ty 60, sonst stossen beide
   aneinander. */
.lockup{position:absolute;left:0;right:0;bottom:440px;display:flex;justify-content:center}
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
  const darkBar = Boolean(b.light) && low;
  // Nur so viel Verlauf wie noetig. Drei uebereinander machen das Foto matschig.
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
