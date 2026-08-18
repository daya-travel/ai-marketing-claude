// Reel "solo trip dates" - her.solotrip, 1080x1920, ~42 s, 9 ideas + cover + endcard.
//
// Format borrowed from the collage reels that are doing the numbers right now
// (@heygirlceo's "solo date ideas" post: 6.199 likes but 498 reposts and 1.763
// shares - the share ratio is the reason we are copying the mechanic, not the
// look). The mechanic is the 2x2 photo grid: four pictures per beat instead of
// one. No single frame has to carry the shot, the four do not need to match,
// and nobody looks at any one of them long enough to find a fault.
//
// WHY A GRID AND NOT SINGLE PHOTOS - learned the hard way on 14.08.:
//   soul_2 garbles every piece of lettering it draws. Bus destination blinds,
//   cinema marquees, market price cards, newspapers, stadium hoardings, postbox
//   plates - all came back as "Desttotwaton", "POCPCORU", "LARCGKLNCI". Negative
//   prompts do NOT fix it, the model ignores them. The only reliable fix is to
//   frame subjects that physically cannot contain a printed surface. Every photo
//   in PHOTOS below was checked at true cell size (540x960), not at full size -
//   at full size the garbage is easy to miss, at cell size it is a headline.
//   One image (704) also came back rotated on its side, the failure the project
//   CLAUDE.md already warns about. Check every one, every time.
//
// COPY RULES APPLIED: no long dashes, no "not X but Y", no rule of three, no
// prices or figures we have not verified. The only two places named on screen
// (Galeries Lafayette, El Corte Inglés at Callao) were checked against the
// operators' own city tourism pages for free public access.
//
// Usage: node build-solo-dates.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'solo-dates');
// marigold recolour of daya-mark-cream.png (same alpha, brand gold fill)
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-gold.png');
const OUT = join(__dirname, 'reels', 'reel-solo-dates');
const OV = join(OUT, 'overlays');
const GRID = join(OUT, 'grids');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OV, { recursive: true });
mkdirSync(GRID, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const BEATS = [
  { id: 'cover', dur: 3.0, photos: ['401', '801', '305', '203'],
    script: 'solo trip dates', title: '9 for your next city alone' },

  { id: '01', dur: 4.4, photos: ['101', '103', '105', '106'],
    script: 'the bus to the end of the line',
    body: 'Get on any city bus heading away from the centre and stay on until it stops. One ticket, no plan, and the parts of a city that no list has a name for.' },

  { id: '02', dur: 4.4, photos: ['201', '202', '203', '204'],
    script: 'the first table of the evening',
    body: 'Walk in the minute the kitchen opens, while the room is still empty. The staff have time, they talk to you, and eating alone stops feeling like a thing.' },

  { id: '03', dur: 4.4, photos: ['301', '302', '303', '305'],
    script: 'a film in a language you do not speak',
    body: 'Buy one ticket for the afternoon show and sit in the middle of the empty row. Do not read the plot first. You will follow more than you think.' },

  { id: '04', dur: 4.8, photos: ['401', '402', '403', '404'],
    script: 'the highest place you can get into for free',
    body: 'Galeries Lafayette in Paris and El Corte Inglés at Callao in Madrid let anyone up, no ticket and no receipt. Everywhere else it is the top floor of a hotel with a bar, or the hill the locals walk up on a Sunday.' },

  { id: '05', dur: 4.2, photos: ['503', '504', '505', '506'],
    script: 'the market in its first hour',
    body: 'Go while they are still setting up. Buy one thing you cannot identify and ask what it is. That is the whole plan.' },

  { id: '06', dur: 4.6, photos: ['601', '602', '603', '604'],
    script: 'the lobby of the most expensive hotel in town',
    body: 'Order one coffee and stay two hours. Warm, quiet, clean bathroom, working wifi, and nobody asks you anything.' },

  { id: '07', dur: 4.4, photos: ['702', '703', '705', '706'],
    script: 'a ticket to the local team',
    body: 'Any sport, any league, the cheapest seat. Families everywhere, and two hours in which nobody wonders why you came alone.' },

  { id: '08', dur: 4.4, photos: ['801', '802', '803', '804'],
    script: 'get your hair washed',
    body: 'Walk into a salon and book a wash and blow dry. An hour of somebody looking after you, and you walk out looking like the trip is going well.' },

  { id: '09', dur: 4.4, photos: ['903', '904', '905', '906'],
    script: 'a postcard to your own address',
    body: 'Buy one on the first day and write it while everything is still new. It lands on your doormat long after you are home.' },

  // four distinct photos: 602 and 905 are both espresso cups and read as a
  // duplicate when they land in the same grid
  // hill and pitch read as the same photo even though they are not, so green
  // appears once and the fourth cell brings a warm tone the card was missing
  { id: 'end', dur: 3.5, photos: ['404', '601', '905', '302'], endcard: true,
    script: 'which one are you', title: 'doing first?' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
/* the text sits across the seam of the 2x2 grid, so it needs its own shadow
   rather than a full scrim - a scrim would flatten all four photos at once */
.band{position:absolute;left:0;right:0;top:34%;height:32%;
  background:linear-gradient(180deg,rgba(6,29,21,0) 0%,rgba(6,29,21,.62) 26%,rgba(6,29,21,.62) 74%,rgba(6,29,21,0) 100%)}
.pad{position:absolute;inset:0;padding:0 76px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center}
.script{font-family:'Caveat';font-weight:600;font-size:96px;line-height:1.0;color:#f4ecdb;
  text-shadow:0 4px 26px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.8)}
.script.big{font-size:120px}
.title{font-family:'Archivo';font-weight:800;font-size:64px;line-height:1.1;letter-spacing:-.02em;
  color:#f4ecdb;margin-top:16px;text-shadow:0 4px 26px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.8)}
.body{font-family:'Archivo';font-weight:700;font-size:40px;line-height:1.28;color:#f4ecdb;
  margin-top:22px;max-width:900px;text-shadow:0 4px 24px rgba(0,0,0,.9),0 2px 8px rgba(0,0,0,.85)}
.wm{position:absolute;bottom:250px;left:0;right:0;text-align:center;font-family:'Archivo';
  font-weight:800;letter-spacing:.2em;font-size:26px;color:#efc05a;opacity:.92;
  text-shadow:0 2px 18px rgba(0,0,0,.9)}
/* on the closing card the handle goes to the top and the mark to the bottom,
   per the rule in daya/brand/DESIGN-SYSTEM.md */
.wm.top{top:150px;bottom:auto}
/* The mark is cream, and on the endcard it landed on sunlit grass and pale
   marble, so it disappeared. It now sits on a solid emerald plate: on brand,
   and legible no matter which photo ends up behind it. */
/* Marigold, no plate. Cream vanished on sunlit grass and pale marble, and a
   translucent plate behind it looked like a sticker. Gold carries itself on
   both halves of the seam; the shadow is what keeps it readable, not a box. */
.lockup{position:absolute;bottom:300px;left:0;right:0;display:flex;justify-content:center}
.plate{display:flex;align-items:center;gap:18px}
.plate img{height:70px;filter:drop-shadow(0 4px 16px rgba(0,0,0,.98)) drop-shadow(0 1px 5px rgba(0,0,0,.95))}
.plate .word{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;
  letter-spacing:.2em;font-size:42px;color:#efc05a;line-height:1;
  text-shadow:0 4px 16px rgba(0,0,0,.98),0 1px 5px rgba(0,0,0,.95)}
</style></head><body>`;
const foot = `</body></html>`;

// 1) 2x2 photo grids. Each cell is 540x960, centre-cropped from the source.
BEATS.forEach((b) => {
  const files = b.photos.map((p) => {
    const f = join(PHOTOS, `${p}.png`);
    if (!existsSync(f)) throw new Error('missing photo ' + f);
    return f;
  });
  const out = join(GRID, `${b.id}.png`);
  const py = `
from PIL import Image
def cell(f):
    im = Image.open(f).convert('RGB'); w, h = im.size
    # NOTE: 204 carries a film strip with garbled frame numbers down both edges,
    # from "35mm Kodak Portra" in its prompt. A 6% inset here would crop it off,
    # but that shifts every other slide too and Alesya has already downloaded
    # them, so the slides stay exactly as delivered. Fix 204 itself if it ever
    # needs to be clean.
    s = max(540 / w, 960 / h)
    im = im.resize((int(w * s), int(h * s)), Image.LANCZOS); w, h = im.size
    return im.crop(((w - 540) // 2, (h - 960) // 2, (w - 540) // 2 + 540, (h - 960) // 2 + 960))
g = Image.new('RGB', (1080, 1920))
for i, f in enumerate(${JSON.stringify(files)}):
    g.paste(cell(f), ((i % 2) * 540, (i // 2) * 960))
g.save('${out}')`;
  // via a temp file, not python3 -c: a shell-quoted -c string keeps "\n" as a
  // literal backslash-n and python then chokes on a one-line program.
  const pyPath = join(GRID, `${b.id}.py`);
  writeFileSync(pyPath, py);
  execSync(`python3 "${pyPath}"`, { stdio: 'inherit' });
  console.log('grid', b.id, 'ok');
});

// 2) text overlays (transparent PNG)
BEATS.forEach((b) => {
  const htmlPath = join(OV, `${b.id}.html`);
  const pngPath = join(OV, `${b.id}.png`);
  const inner = b.body
    ? `<div class="script">${esc(b.script)}</div><div class="body">${esc(b.body)}</div>`
    : `<div class="script big">${esc(b.script)}</div><div class="title">${esc(b.title)}</div>`;
  const mark = b.endcard && existsSync(MARK)
    ? `<div class="wm top">@her.solotrip</div><div class="lockup"><div class="plate"><img src="file://${MARK}"><span class="word">Daya</span></div></div>`
    : `<div class="wm">@her.solotrip</div>`;
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="band"></div><div class="pad">${inner}</div>${mark}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', b.id, 'ok');
});

// 3) flat slides: grid + overlay burnt in, 1080x1920 PNGs. These are the
// TikTok photo carousel, which takes the same 9:16 as the reel. Same text
// placement works there: it sits in the middle band, clear of the caption
// strip at the bottom and the action buttons down the right edge.
const SLIDES = join(OUT, 'slides');
mkdirSync(SLIDES, { recursive: true });
BEATS.forEach((b, i) => {
  const n = String(i + 1).padStart(2, '0');
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

// 4) segments: slow push on the whole grid so the frame is never fully still
BEATS.forEach((b) => {
  const grid = join(GRID, `${b.id}.png`);
  const ov = join(OV, `${b.id}.png`);
  const out = join(OUT, `seg-${b.id}.mp4`);
  const frames = Math.round(30 * b.dur);
  execSync(`ffmpeg -y -loglevel error -loop 1 -i "${grid}" -i "${ov}" -filter_complex "[0:v]scale=2160:3840,zoompan=z='1.0+0.0005*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${W}x${H}:fps=30[v];[v][1:v]overlay=0:0,format=yuv420p[o]" -map "[o]" -frames:v ${frames} -an -c:v libx264 -crf 18 -preset medium -r 30 "${out}"`, { stdio: 'inherit' });
  console.log('segment', b.id, 'ok');
});

// 4) concat. No audio: a trending sound goes on in the app.
writeFileSync(join(OUT, 'list.txt'), BEATS.map((b) => `file 'seg-${b.id}.mp4'`).join('\n'));
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-solo-dates.mp4`, { stdio: 'inherit' });
console.log('DONE ->', join(OUT, 'daya-reel-solo-dates.mp4'),
  '  total', BEATS.reduce((a, b) => a + b.dur, 0).toFixed(1), 's');
