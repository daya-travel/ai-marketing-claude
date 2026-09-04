// Drei Trial Reels fuer Italien - her.solotrip.
//
// WARUM DAS HIER STEHT. Der Italien-Reel kam auf 65 Aufrufe bei 11 Sekunden
// durchschnittlicher Wiedergabe. Japan, gleiche Reihe, gleiche Laenge (~1 min),
// kam auf 3.202 Aufrufe bei 22 Sekunden. Zahlen aus der Instagram-App vom
// 03.09.2026. Der auffaelligste Unterschied ist das Cover: Japan zeigte ein
// Flatlay, das man absuchen muss, Italien eine Frau am Strand.
//
// Weil das eine Vermutung ist und keine Messung, wird sie getestet statt
// geglaubt. Trial Reels gehen ausschliesslich an Nicht-Follower - genau die
// Gruppe, die bei Japan 97,1 % ausgemacht und bei Italien gefehlt hat.
//
//   A  Flatlay + Raetsel      "One thing in this picture is a 3,000 euro fine"
//   B  Flatlay + Aufloesung   "A handful of sand here is a 3,000 euro fine"
//   C  Strandfoto, Kontrolle  "Taking this home is a 3,000 euro fine"
//
// A gegen C prueft Flatlay gegen Personenfoto. A gegen B prueft Raetsel gegen
// sofortige Antwort. Ohne C wuessten wir hinterher nicht, ob das Cover gewirkt
// hat oder nur die Kuerze.
//
// GEMEINSAMER RUMPF, damit nur die ersten Sekunden variieren: fuenf Punkte,
// zwei Zeilen je Slide, sieben Frames, unter 30 Sekunden. Einzige Ausnahme ist
// der Marker „THIS IS THE ONE" auf Slide 3, den nur A traegt - er gehoert zur
// Raetsel-Mechanik, die A testet.
//
// TEXTFARBE. Auf dem hellen Flatlay stehen Ueberschrift und Zeilen in Emerald
// mit Amber-Auszeichnung statt Creme mit Marigold. Verlaeufe sind seit dem
// 02.09. verboten („Lass alle Verdunklungen hinter dem Text bitte weg"), und
// creme auf weissem Leinen ist unlesbar. Die Regel dafuer steht schon im
// CLAUDE.md: auf hellen Objektbildern die Kopfzeile in Emerald.
//
// Usage: node build-italy-reels.mjs            alle drei Varianten
//        VARIANT=A node build-italy-reels.mjs  nur eine
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'italy', 'final');
const LOCKUP = join(__dirname, '..', 'brand', 'design-package', 'daya-brand', 'daya-lockup-flat-cream.png');
const glyph = (stroke) => `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h9"/><path d="M11 9.5 13.5 12 11 14.5"/><path d="M16.5 7.2a7 7 0 0 1 0 9.6"/><path d="M19 5a10.5 10.5 0 0 1 0 14"/></svg>`;
const OUT = join(__dirname, 'reels', 'italy-trials');
const W = 1080, H = 1920, RESERVE = 87;
const ONLY = process.env.VARIANT || '';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = (s) => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');

// Die fuenf Punkte. Zwei Zeilen je Slide, damit ein Slide in zwei Sekunden
// gelesen ist - bei sieben Frames auf unter 30 Sekunden bleibt keine Zeit fuer
// vier Zeilen.
const BODY = [
  { id: '02', photo: 'f03-trail', ty: 63,
    head: 'Flip-flops on the *trails*.',
    lines: ['*50 to 2,500 euros* on the Cinque Terre paths',
            'Rangers check your shoes at the trailhead'] },

  // Slide 3 loest bei Variante A das Raetsel auf.
  { id: '03', photo: 'f02-sand', light: true, darkBar: true, ty: 62, reveal: true,
    head: 'Shells, pebbles and *sand*.',
    lines: ['*500 to 3,000 euros* off any Sardinian beach',
            '*4 tonnes* seized at one airport in 2 years'] },

  { id: '04', photo: 'f05-steps', light: true, darkBar: true, ty: 27, oy: 0.82,
    head: '*Sitting* down in Rome.',
    lines: ['*250 euros* on the Spanish Steps',
            'No food needed. Sitting is enough'] },

  { id: '05', photo: 'f06-ztl', ty: 63,
    head: 'The *camera* at the end of the street.',
    lines: ['*80 to 130 euros* per gate in a ZTL',
            'The letter arrives months after the trip'] },

  { id: '06', photo: 'f12-fountain', ty: 63,
    head: 'One foot in the *fountain*.',
    lines: ['*About 500 euros* in Rome',
            'Plus a Daspo, a ban from the area'] },
];

const END = { id: 'end', photo: 'f13-end', endcard: true, ty: 60,
  head: 'Send this to whoever’s *booking Italy*.',
  body: 'Follow for more.' };

const VARIANTS = {
  A: { photo: 'f00-flatlay', lightCover: true,
       head: 'One thing in this picture is a *3,000 euro* fine in Italy.',
       sub: '5 things Italy fines you for.',
       spoken: 'One thing in this picture is a 3,000 euro fine in Italy.' },
  B: { photo: 'f00-flatlay', lightCover: true,
       head: 'A handful of *sand* here is a *3,000 euro* fine.',
       sub: '5 things Italy fines you for.',
       spoken: 'A handful of sand from an Italian beach is a 3,000 euro fine.' },
  C: { photo: 'f00-cover', lightCover: false,
       head: 'Taking this home is a *3,000 euro* fine.',
       sub: '5 things Italy fines you for.',
       spoken: 'Taking this home is a 3,000 euro fine.' },
};
