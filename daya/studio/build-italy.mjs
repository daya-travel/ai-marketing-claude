// Reel „Taking this home is a 3,000 euro fine" - her.solotrip.
//
// Dreizehn Frames. Cover, elf Punkte, Schlusskarte. Aufloesung des Raetsels auf
// Slide 6, dem Sand - dieselbe Mechanik wie beim Japan-Karussell.
//
// DER HOOK, ZWEITE FASSUNG. Die erste war eine Behauptung, „Italy will fine you
// for sitting down". Alesya am 02.09.: „der hook ist scheisse - so haben wir es
// nicht entschieden! es muss ein raetsel sein". Der zweite Vorschlag war zwar
// ein Raetsel, aber verschachtelt: „der hook past nicht ganz. es muss einfach zu
// lesen sein". Diese Fassung hat acht Woerter und keinen Nebensatz, genau wie
// der Japan-Hook („One thing in this picture is banned in Japan"), der mit 48
// Speicherungen auf 2216 Aufrufe der beste Post war. „this" zeigt auf das
// Coverfoto, einen Strand. Deshalb steht der Sand nicht mehr an erster Stelle,
// sondern in der Mitte, wo er den Hook aufloest.
//
// DER TEXTSTIL kommt vom Japan-Karussell, das Alesya am 02.09. als Referenz
// geschickt hat: Ueberschrift in Creme, nur einzelne Woerter in Marigold. Vorher
// war die ganze Ueberschrift marigold, damit hebt nichts mehr etwas hervor.
// Ausgezeichnet wird mit *Sternchen*, dieselbe Konvention wie in
// build-carousel.mjs. Die Schrift ist ausserdem groesser (Ueberschrift 74 statt
// 64, Zeilen 37 statt 32) und linksbuendig, beides nachgemessen an den
// Japan-Slides. Die Punkte vor den Zeilen sind weg, dort stehen einfache
// Zeilen.
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
// *Sternchen* markieren die Woerter, die marigold werden. Konvention aus
// build-carousel.mjs. Alles andere bleibt creme - das ist der Unterschied zur
// ersten Fassung, in der die ganze Ueberschrift marigold war.
const fmt = (s) => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');

// ty  = vertikale Mitte des Textblocks in Prozent. 68 bei vier Stichpunkten,
//       72 bei Fliesstext - beides so gewaehlt, dass die letzte Zeile ueber
//       78 % bleibt.
// light = helles Foto: kein Mittelverlauf, enger Verlauf hinter dem Text
const BEATS = [
  // Frame 1 - Das Raetsel. Coverfoto ist ein Strand, „this" zeigt darauf.
  // Aufgeloest auf Slide 6.
  { id: '01', photo: 'f00-cover', cover: true, light: true, darkBar: true, ty: 27,
    head: 'Taking this home is a *3,000 euro* fine.',
    body: 'Eleven things Italy fines you for.' },

  // Frame 2 - Cinque Terre. Gilt nur auf den markierten Wegen, das gehoert
  // dazu, sonst ist es ein Verbot, das niemanden trifft.
  { id: '02', photo: 'f03-trail', darkBar: true, ty: 63,
    head: 'Flip-flops on the *trails*.',
    lines: [
      'The marked coastal paths in the Cinque Terre',
      '*50 to 2,500 euros*, more if they rescue you',
      'Rangers check your shoes at the trailhead',
      'The villages themselves are fine',
    ] },

  // Frame 3 - Faelschungen. Der interessante Teil ist die Haftung der
  // Kaeuferin, nicht die strittige Obergrenze. Deshalb steht hier der belegte
  // Einzelfall und keine Spanne bis 10.000.
  { id: '03', photo: 'f04-fake', light: true, darkBar: true, ty: 63,
    head: 'The bag on the *beach towel*.',
    lines: [
      'The *buyer* is liable, not only the seller',
      'One case in Venice: *1,000 euros* for one bag',
      'It applies on the beach and in the street',
      'The bag gets confiscated either way',
    ] },

  // Frame 4 - Rom, seit 2019 durchgesetzt. War in der ersten Fassung die
  // Aufloesung, jetzt ein Punkt wie jeder andere.
  { id: '04', photo: 'f05-steps', light: true, ty: 27, oy: 0.82,
    head: 'Sitting on the *Spanish Steps*.',
    lines: [
      'Sitting alone is enough, no food needed',
      '*250 euros*, 400 if you leave a mark',
      'Officers patrol the steps and whistle you off',
      'Enforced since 2019',
    ] },

  // Frame 5 - ZTL. Der teuerste Punkt fuer alle, die einen Wagen mieten, und
  // der einzige, der erst Monate spaeter auffaellt.
  { id: '05', photo: 'f06-ztl', ty: 63,
    head: 'The *camera* at the end of the street.',
    lines: [
      '*80 to 130 euros* per gate',
      'Every camera you pass counts separately',
      'Your rental company adds its own fee',
      'The letter arrives months after the trip',
    ] },

  // Frame 6 - AUFLOESUNG. Regionalgesetz Sardinien 16/2017. Die vier Tonnen
  // sind aus dem Bericht zum Projekt „Take Me Back to the Sea", nicht
  // geschaetzt.
  { id: '06', photo: 'f02-sand', light: true, darkBar: true, ty: 62,
    eyebrow: 'THIS IS THE ONE',
    head: 'Sand from the *beach*.',
    lines: [
      'Free to pick up. *Up to 3,000 euros* to keep',
      'Sand, pebbles and shells all count',
      'X-ray checks at Olbia, Cagliari and Alghero',
      '*Four tonnes* seized in two years, one airport',
    ] },

  // Frame 7 - Internationaler Fuehrerschein, Art. 135 Codice della Strada.
  { id: '07', photo: 'f07-road', ty: 63,
    head: 'Your licence *on its own*.',
    lines: [
      'Only for licences issued outside the EU',
      '*408 to 1,634 euros*, payable on the spot',
      'The rental desk won\u2019t ask. The police will',
      'You apply for the permit at home',
    ] },

  // Frame 8 - Venedig, Anstandsregeln 2019.
  { id: '08', photo: 'f08-bridge', ty: 63,
    head: 'Lunch on a *bridge*.',
    lines: [
      'Venice: bridges, steps, monuments, quays',
      '*100 to 200 euros*',
      'Sitting on the ground to eat counts too',
      'Swimming in a canal is *350*',
    ] },

  // Frame 9 - Sorrent, Anordnung vom 06.07.2022.
  { id: '09', photo: 'f09-amalfi', ty: 63,
    head: 'Swimwear *in town*.',
    lines: [
      'Sorrento centre, *25 to 500 euros*',
      'Bikinis, swimsuits and bare chests',
      'Beach clubs and pools are exempt',
      'Venice charges *250* for the same thing',
    ] },

  // Frame 10 - Contributo di accesso. Der Kalender wechselt jaehrlich, deshalb
  // steht hier der Stand 2026 und im Content-Doc das Pruefdatum.
  { id: '10', photo: 'f10-lagoon', light: true, darkBar: true, ty: 63,
    head: '*Walking into* Venice.',
    lines: [
      'Day visitors only, hotel guests are exempt',
      '*5 euros* booked early, *10* late',
      'Fridays to Sundays, April to July',
      'Without one: *50 to 300 euros*',
    ] },

  // Frame 11 - Handtuch. Objektbild ohne Menschen, erlaubt seit Alesyas
  // Entscheidung vom 26.08.: der Gegenstand ist hier der Inhalt.
  // ty 50 statt 63: bei 63 lagen die Zeilen auf hellem Sand und waren
  // schwaecher als auf jedem anderen Slide. Weiter oben liegt das ruhige,
  // dunklere Meer. Alesya, 02.09.: „bild 11 - text im bild etwas nach oben
  // schieben."
  { id: '11', photo: 'f11-towel', light: true, darkBar: true, ty: 50,
    head: 'The towel you *left out*.',
    lines: [
      'Umbrellas, chairs and towels left overnight',
      '*Around 200 euros*, and it\u2019s confiscated',
      'Dawn clearances on the free beaches',
      'The paid clubs aren\u2019t affected',
    ] },

  // Frame 12 - Brunnen. Staerkster Schluss: der Daspo laeuft weiter, wenn das
  // Bussgeld laengst bezahlt ist.
  { id: '12', photo: 'f12-fountain', ty: 63,
    head: 'One foot in the *fountain*.',
    lines: [
      'Wading counts, you don\u2019t have to swim',
      '*About 500 euros* in Rome',
      'Plus a *Daspo*, a ban from the area',
      'One lifetime ban handed out in May 2026',
    ] },

  // Frame 13 - Schlusskarte, mittig gesetzt. „Save this for your Italy trip"
  // statt „before you go". Alesya, 02.09.: „bitte nicht einfach - before you
  // go, sondern save this for your italy trip oder so."
  //
  // Ich hatte dagegengehalten, das habe es bei Japan nicht gegeben - im Repo
  // steht als Schlusskarte „Now go book it.". Sie hat richtiggestellt: die
  // Datei war veraltet, in der ElevenLabs-Fassung stand „save this for your
  // japan trip". Also gilt die Zeile auch fuer die Tonspur, nicht nur fuers
  // Bild. Nachgesehen im Repo hatte ich, nur an der falschen Stelle.
  { id: 'end', photo: 'f13-end', endcard: true, ty: 60,
    head: 'Save this for your *Italy trip*.',
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
/* BAND statt Rampe. Ein vom unteren Rand hochlaufender Verlauf muss unten fast
   undurchsichtig sein, damit er oben am Textanfang noch traegt - und macht das
   untere Drittel des Fotos schwarz. Gemessen und angesehen am 02.09.: genau der
   bearbeitete Look, der laut Alesya (29.08.) weg sollte.
   Das Band liegt stattdessen hinter dem Textblock, ist dort am kraeftigsten und
   faellt nach oben UND nach unten ab. Darunter haelt ein schwacher Fussverlauf
   den Bildrand ruhig. Der Textblock liegt bei rund 50 bis 78 % der Bildhoehe,
   das Band spannt 40 bis 88 %. */
.bot{position:absolute;left:0;right:0;top:40%;height:48%;
  background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.62) 18%,
    rgba(0,0,0,.76) 40%,rgba(0,0,0,.76) 78%,rgba(0,0,0,.4) 94%,
    rgba(0,0,0,0) 100%)}
.foot{position:absolute;left:0;right:0;bottom:0;height:22%;
  background:linear-gradient(0deg,rgba(0,0,0,.42) 0%,rgba(0,0,0,0) 100%)}
/* enge, kraeftige Verlaeufe fuer helle Bilder */
/* Dasselbe Band, nur kraeftiger. Sand und Wasser sind heller als jeder Stein,
   belegt an Slide 3, 6, 10 und 11: dort lag der hellste Bildbereich hinter dem
   Text bei 171 bis 198 von 255, creme darauf war nicht zu lesen. */
.botlight{position:absolute;left:0;right:0;top:40%;height:48%;
  background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.74) 18%,
    rgba(0,0,0,.87) 40%,rgba(0,0,0,.87) 78%,rgba(0,0,0,.5) 94%,
    rgba(0,0,0,0) 100%)}
.toplight{position:absolute;left:0;right:0;top:0;height:52%;
  background:linear-gradient(180deg,rgba(0,0,0,.94) 0%,rgba(0,0,0,.9) 55%,
    rgba(0,0,0,.8) 76%,rgba(0,0,0,.4) 92%,rgba(0,0,0,0) 100%)}
.bar{position:absolute;left:80px;right:80px;top:88px;display:flex;align-items:center}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.95))}
.brand span{font-family:'Archivo';font-weight:700;font-size:27px;letter-spacing:.01em;
  color:#f4ecdb;text-shadow:0 2px 10px rgba(0,0,0,.8)}
.bar.dark .brand span{color:#0e3b2c;text-shadow:0 1px 4px rgba(255,255,255,.85)}
.bar.dark .brand svg{filter:drop-shadow(0 1px 3px rgba(255,255,255,.9));opacity:.9}

/* Linksbuendig und groesser, nachgemessen an den Japan-Slides: dort ist die
   Ueberschrift rund 78 px auf 1080 Breite, hier standen vorher 64. Am 02.09.
   noch einmal um 3 px angehoben, auf Alesyas Bitte („um 1-3 mehr? sodass man
   den text besser lesen kann ohne etwas auf das bild zu klatschen") - seit die
   Verlaeufe weg sind, traegt die Groesse die Lesbarkeit mit. */
.block{position:absolute;left:90px;right:110px;top:50%;transform:translateY(-50%);
  text-align:left}
/* .block.cover und .block.end ueberschreiben left/right weiter unten */
/* Ueberschrift in CREME. Marigold traegt nur, was .hl auszeichnet - vorher war
   die ganze Zeile marigold und hob damit nichts mehr hervor (Alesya, 02.09.:
   „weiße und gelbe worte - gelb hebt etwas hervor"). */
.head{font-family:'Archivo';font-weight:800;font-size:77px;line-height:1.08;
  letter-spacing:-.02em;text-wrap:balance;color:#f4ecdb;
  text-shadow:0 4px 22px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.hl{color:#efc05a}
.eyebrow{font-family:'Archivo';font-weight:800;text-transform:uppercase;
  letter-spacing:.22em;font-size:29px;color:#efc05a;margin-bottom:18px;
  text-shadow:0 2px 12px rgba(0,0,0,.9)}
.body{margin-top:26px;font-family:'Inter';font-weight:500;font-size:43px;line-height:1.42;
  color:#f4ecdb;text-wrap:pretty;text-shadow:0 2px 16px rgba(0,0,0,.9)}
/* Einfache Zeilen statt Stichpunkte mit Punkten - so steht es auf den
   Japan-Slides, die Alesya als Referenz geschickt hat. */
.list{margin-top:28px;font-family:'Inter';font-weight:500;font-size:40px;
  line-height:1.34;color:#f4ecdb;text-shadow:0 2px 16px rgba(0,0,0,.9)}
.list div{margin-bottom:14px}
.list div:last-child{margin-bottom:0}

/* Cover und Schlusskarte mittig, die elf Punkte-Slides bleiben linksbuendig.
   Alesya, 02.09.: „mach den text auf dem letzten bild mittig, nicht seitlich"
   und „text auf dem cover groesser und zentrierter wie in japan". Beide Karten
   tragen nur zwei Zeilen ohne Aufzaehlung darunter, zentriert steht das besser.
   Die Raender werden dafuer symmetrisch, sonst sitzt der Block optisch links. */
.block.cover,.block.end{text-align:center;left:80px;right:80px}
.cover .head{font-size:102px;line-height:1.02}
.cover .body{margin-top:28px;font-size:41px;letter-spacing:.01em;opacity:.92}
.end .head{font-size:83px}
.end .body{font-size:39px;letter-spacing:.01em;opacity:.9}
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
  const text =
    (b.eyebrow ? `<div class="eyebrow">${esc(b.eyebrow)}</div>` : '') +
    `<div class="head">${fmt(b.head)}</div>` +
    (b.body ? `<div class="body">${fmt(b.body)}</div>` : '') +
    (b.lines ? `<div class="list">${b.lines.map((l) => `<div>${fmt(l)}</div>`).join('')}</div>` : '');
  // Sitzt der Text tief, braucht er den unteren Verlauf.
  // Schwelle 60 statt 65. Seit die Schrift groesser ist, liegen die Textbloecke
  // auf ty 62 bis 63 statt 68 bis 72 - mit der alten Schwelle galten sie als
  // "oben" und bekamen den Kopfverlauf, waehrend der Text auf ungeschuetztem
  // hellem Sand stand. Gemessen am 02.09.: der hellste Bildbereich hinter dem
  // Text lag auf Slide 6, 10 und 11 zwischen 171 und 196 von 255.
  const low = (b.ty || 50) >= 60;
  // Ohne Kopfverlauf entscheidet allein das Foto, welche Farbe die Kopfzeile
  // braucht. Gemessen am 02.09. an der Backplate, im Rechteck der Kopfzeile:
  // ueber 120 von 255 steht Creme auf Hell und verschwindet, darunter tut es
  // Emerald. Deshalb steht die Entscheidung als Flag am Beat und nicht mehr an
  // b.light - Slide 4 und 8 sind helle Fotos mit dunklem Bildkopf, Slide 2 ein
  // dunkles mit hellem.
  const darkBar = Boolean(b.darkBar);
  // KEINE VERLAEUFE MEHR. Entscheidung Alesya, 02.09.2026, nachdem sie die
  // Fassung mit Band gesehen hatte: „Lass alle Verdunklungen hinter dem Text
  // bitte weg. Alle Fotos bleiben so, wie sie sind." Genannt hatte sie das
  // Cover, die Schlusskarte, die Spanische Treppe und den Strand - dort war es
  // ihr zu dunkel, und lesen liess es sich auch ohne.
  //
  // Was den Text jetzt traegt, ist allein der Schlagschatten an .head, .body
  // und .list. Die Klassen .top, .mid, .bot, .botlight, .toplight und .foot
  // stehen noch im Stylesheet, werden aber nicht mehr ausgegeben - falls die
  // Entscheidung je zurueckgenommen wird, reicht eine Zeile hier.
  const inner = `
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
