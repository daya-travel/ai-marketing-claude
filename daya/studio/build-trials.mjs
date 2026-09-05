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
// HELLE FLATLAYS: SCHMALES BAND, NICHT DUNKLE SCHRIFT.
//
// Erste Fassung setzte auf den hellen Covern Emerald mit Amber-Auszeichnung,
// weil Creme auf Creme unlesbar ist und Verdunkeln seit dem 02.09. gestrichen
// war. Alesya am 05.09.: „textfarbe im post fuer japan auf weiss und gold
// setzen, nicht orange und gruen, sieht nicht gut aus."
//
// Auf die Rueckfrage, wie weisse Schrift auf hellem Leinen lesbar wird: „in
// unserem erfolgreichen post fuer japan war auch viel weiss, aber design war
// richtig schoen. schaue es dir noch mal an und mache aehnlich."
//
// Nachgesehen in build-japan.mjs, dem Bauplan des Posts mit 3.202 Aufrufen.
// Sein Cover steht auf `light: true` und `ty: 80`, und der Kommentar dort sagt
// woertlich: „Ab ty >= 65 wird zusaetzlich der untere Verlauf eingeblendet,
// sonst waere Creme auf hellem Leinen unlesbar." Der erfolgreiche Post war also
// viel weiss auf hellem Leinen, und lesbar wurde er durch einen Verlauf.
//
// Also: Creme mit Marigold ueberall, und ein Verlauf nur da, wo die Messung ihn
// verlangt. Als BAND in der Bauart von build-italy.mjs, nicht als Rampe bis zum
// Rand - die Rampe hat am 02.09. das untere Drittel schwarz gemacht und genau
// den bearbeiteten Look erzeugt, der weg sollte. Das Band liegt hinter dem
// Textblock, ist dort am kraeftigsten und faellt nach oben und unten ab.
//
// ALLE BILDER BEKOMMEN EINEN LIFT. Alesya, 05.09.: „bilder etwas zu dunkel
// alle." Auf allen soul_2-Bildern dieser Serie liegt ein kuehlgrauer Stich.
// LIFT unten hebt Helligkeit und Waerme leicht an. Kein Farblayer - der
// Emerald-Layer ist seit dem 29.08. gestrichen und kommt nicht zurueck.
//
// Usage: TRIAL=trial1 node build-trials.mjs
//        TRIAL=trial2 ONLY=02 node build-trials.mjs
//        TRIAL=all node build-trials.mjs
import { writeFileSync, readFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
// Flaches Lockup ohne die Emerald-Kachel - Alesya, 31.08.: die App-Icon-Fassung
// ist nicht das Logo fuer Posts. Nur die cremefarbene Fassung, seit die
// Schlusskarten dunkle Fotos sind.
const LOCKUP = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-cream.png');
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const W = 1080, H = 1920, RESERVE = 87;

// Milder Lift auf jede Backplate, gegen den kuehlgrauen Stich von soul_2.
// Bewusst klein: „muss aber eher roh aussehen, nicht wie KI" (Alesya, 29.08.).
const LIFT = { brightness: 1.07, warmth: 1.03 };

// Ab welcher Helligkeit Creme nicht mehr traegt.
//
// Die reine Rechnung sagt 103 von 255: Creme #f4ecdb hat rund 0,79 relative
// Leuchtdichte, fuer 4,5:1 darf der Grund hoechstens 0,1367 haben. Das ergab
// ein Band von 0,39 und machte das Leinen grau - genau das Gegenteil von
// „bilder etwas zu dunkel alle".
//
// 135 ist der Wert aus Alesyas eigener Abnahme. Der Sand-Slide des
// Italien-Posts hat Median 158 und traegt Creme allein mit dem Schlagschatten.
// Der Schatten (0 4px 22px schwarz) legt einen dunklen Hof um jeden Buchstaben,
// den die reine Flaechenrechnung nicht kennt. 135 plus Hof liest sich sauber
// und laesst das Leinen hell.
const CREAM_FLOOR = 135;
const BAND_MAX = 0.5;

// Der Verlauf ist warm-ink, nicht neutral schwarz. Schwarz ueber cremefarbenem
// Leinen ergibt Grau, und grau sah das Cover schmutzig aus. Die Regel vom
// 29.08. („alle Verlaeufe sind neutrales Schwarz") richtete sich gegen den
// EMERALD-Stich ueber Fotos, nicht gegen die eigene Tintenfarbe der Marke.
const BAND_RGB = '26,20,11';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = (s) => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');

// Das Band kommt aus der Messung, nicht aus einem Flag am Beat - siehe bandFor().
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
      { id: '01', photo: 'j00-flatlay', cover: true, darkBar: true, ty: 24,
        head: 'One thing in this picture costs you a *whole day*.',
        body: '3 things to sort before Japan.' },

      { id: '02', photo: 'j01-luggage', ty: 63,
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

      { id: 'end', photo: 'j04-end', endcard: true, ty: 60,
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
      { id: '01', photo: 'u00-flatlay', cover: true, darkBar: true, ty: 30,
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
      { id: '01', photo: 'u10-shells', cover: true, darkBar: true, ty: 24,
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

/* BAND HINTER DEM TEXT, nur auf hellen Backplates. Die Deckkraft kommt aus
   der Messung und nicht aus dem Gefuehl - siehe bandFor() weiter unten. Sie
   ist die kleinste, mit der Creme auf der gemessenen Helligkeit rund 4,5:1
   erreicht. Lage und Hoehe folgen dem Textblock, deshalb stehen sie inline. */
.band{position:absolute;left:0;right:0;pointer-events:none}

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
    const ty = b.ty || 50;
    const py = `
from PIL import Image, ImageEnhance
import json

im = Image.open('${f}').convert('RGB'); w, h = im.size
s = max(${W} / w, ${H} / h) * ${zoom}
im = im.resize((int(w * s), int(h * s)), Image.LANCZOS); w, h = im.size
x = (w - ${W}) // 2
y = int((h - ${H}) * ${oy})
im = im.crop((x, y, x + ${W}, y + ${H}))

# Lift: Helligkeit leicht hoch, Blau leicht runter. Gegen den kuehlgrauen
# Stich, nicht als Filter - die Werte stehen als LIFT in build-trials.mjs.
im = ImageEnhance.Brightness(im).enhance(${LIFT.brightness})
r, g, bl = im.split()
bl = bl.point(lambda v: min(255, int(v / ${LIFT.warmth})))
r = r.point(lambda v: min(255, int(v * ${LIFT.warmth})))
im = Image.merge('RGB', (r, g, bl))
im.save('${out}')

# Helligkeit im Textfeld messen. p85 statt Median: der Text scheitert an den
# hellen Stellen, nicht am Durchschnitt.
box = im.convert('L').crop((80, max(0, int((${ty} - 15) / 100 * ${H})),
                            ${W} - 110, min(${H}, int((${ty} + 15) / 100 * ${H}))))
px = sorted(box.getdata())
json.dump({'p85': px[int(len(px) * 0.85)], 'median': px[len(px) // 2]},
          open('${join(GRID, `${b.id}.json`)}', 'w'))`;
    const pyPath = join(GRID, `${b.id}.py`);
    writeFileSync(pyPath, py);
    execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
  });

  // Wie kraeftig das Band sein muss, damit Creme auf dieser Backplate traegt.
  // Nichts geraten: der Median kommt aus der Messung im Zuschnitt-Schritt,
  // CREAM_FLOOR aus der Kontrastrechnung.
  //
  // Gemessen wird der Median, nicht p85. Erste Fassung nahm p85 und gab damit
  // 13 von 15 Slides ein Band - auch denen, die Alesya so schon abgenommen
  // hatte. Ihre eigene Abnahme ist der bessere Massstab: der Sand-Slide des
  // Italien-Posts hat Median 158 und traegt Creme allein mit Schlagschatten.
  // An den hellen Einzelstellen scheitert der Text nicht, an einem durchgehend
  // hellen Grund schon.
  const bandFor = (id) => {
    const m = JSON.parse(readFileSync(join(GRID, `${id}.json`), 'utf8'));
    if (m.median <= CREAM_FLOOR) return 0;
    return Math.min(BAND_MAX, 1 - CREAM_FLOOR / m.median);
  };

  // 2) Overlay
  beats.forEach((b) => {
    const htmlPath = join(OV, `${b.id}.html`);
    const pngPath = join(OV, `${b.id}.png`);
    const lock = existsSync(LOCKUP) ? `<img src="file://${LOCKUP}">` : '';
    if (b.endcard && !lock) throw new Error('missing DAYA lockup ' + lockFile);
    const text =
      `<div class="head">${fmt(b.head)}</div>` +
      (b.body ? `<div class="body">${fmt(b.body)}</div>` : '') +
      (b.lines ? `<div class="list">${b.lines.map((l) => `<div>${fmt(l)}</div>`).join('')}</div>` : '');
    const cls = ['block'];
    if (b.cover) cls.push('cover');
    if (b.endcard) cls.push('end');
    const inner = `
  <div class="${cls.join(' ')}"${b.ty ? ` style="top:${b.ty}%"` : ''}>${text}</div>`;

    // Band nur auf dem Cover. Dort liegt Creme auf weissem Leinen, das ist der
    // einzige Fall, den der Schlagschatten nicht traegt - und genau der Fall,
    // den der erfolgreiche Japan-Post mit einem Verlauf geloest hat. Die
    // Punkte-Slides liegen auf Fotos und bleiben ohne, so wie abgenommen.
    //
    // Es spannt 14 Prozentpunkte ueber und unter der Textmitte und faellt zu
    // beiden Seiten auf null. Erste Fassung war 48 Prozentpunkte breit und
    // wusch damit die halbe Bildhoehe grau; die zweite mit 34 reichte noch bis
    // auf die Gegenstaende und machte sie stumpf.
    const a = b.cover ? bandFor(b.id) : 0;
    const ty = b.ty || 50;
    const top = Math.max(0, ty - 14);
    const height = Math.min(100 - top, 28);
    const bandHtml = a === 0 ? '' : `
  <div class="band" style="top:${top}%;height:${height}%;background:linear-gradient(180deg,
    rgba(${BAND_RGB},0) 0%, rgba(${BAND_RGB},${(a * 0.8).toFixed(3)}) 24%,
    rgba(${BAND_RGB},${a.toFixed(3)}) 42%, rgba(${BAND_RGB},${a.toFixed(3)}) 64%,
    rgba(${BAND_RGB},${(a * 0.66).toFixed(3)}) 84%, rgba(${BAND_RGB},0) 100%)"></div>`;
    if (a > 0) console.log(name, b.id, 'Band', a.toFixed(2));
    // Emerald-Kopfzeile nur, solange oben wirklich helles Leinen steht. Reicht
    // das Band bis unter die Zeile, waere Emerald auf Dunkel unlesbar.
    const dark = Boolean(b.darkBar) && (a === 0 || top > 8);

    writeFileSync(htmlPath, style + `<div class="wrap">
  ${bandHtml}
  ${inner}
  <div class="bar${dark ? ' dark' : ''}"><span class="brand">${glyph(dark ? '#0e3b2c' : '#f4ecdb')}<span>her.solotrip</span></span></div>
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
