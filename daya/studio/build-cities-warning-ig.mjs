// "7 cities everyone warns you about" - INSTAGRAM variant.
// Same 9 slides/photos/copy as build-cities-warning.mjs (the TikTok version,
// text top-left), but centered vertically: Instagram's feed shows a 4:5
// center-crop of a 9:16 upload, so top-left text gets clipped there. Output
// goes to a separate out/ dir - does NOT touch the TikTok version.
// Usage: node build-cities-warning-ig.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'cities-warning');
const OUT = join(__dirname, 'out', 'cities-warning-ig');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const SWIPE = `<span class="swipe">swipe <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;
const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const CITIES = [
  { city: 'Marrakech, Morocco', warn: '“You’ll get hassled the whole time.”', truth: 'Violent crime against tourists is *rarer* than in Paris or New York.', body: 'The real challenge is persistent vendors, not danger. Dress modestly and walk with purpose - the hassling drops fast.', photo: 'marrakech' },
  { city: 'Mexico City, Mexico', warn: '“It’s not safe to go alone.”', truth: 'Streetlights have *panic buttons* wired straight to the police.', body: 'Plus women-only train cars, and Roma & Condesa are leafy, walkable neighborhoods full of solo travelers.', photo: 'mexico-city' },
  { city: 'Bogotá, Colombia', warn: '“Don’t even think about it.”', truth: 'Genuinely safe - *by day*.', body: 'Bogotá has become a welcoming solo destination, but it rewards experience. First solo trip ever? Pick somewhere else first.', photo: 'bogota' },
  { city: 'Cairo, Egypt', warn: '“You’ll be harassed nonstop.”', truth: 'One traveler expected constant catcalling and got *almost none*.', body: 'Violent crime against tourists is extremely rare. Book rides through an app - it shows the driver and the route.', photo: 'cairo' },
  { city: 'Naples, Italy', warn: '“It’s Italy’s most dangerous city.”', truth: 'Naples dropped *out of the top 10* in crime rankings entirely.', body: 'The real risk is pickpocketing in crowds, not violence. Keep your bag zipped and in front on the metro.', photo: 'naples' },
  { city: 'Johannesburg, South Africa', warn: '“Never go alone.”', truth: 'Here, the caution is *mostly right*.', body: 'Sandton and Rosebank are genuinely safe, walkable suburbs. Downtown genuinely isn’t for tourists. Uber only, always.', photo: 'johannesburg' },
  { city: 'Mumbai, India', warn: '“A woman alone? Never.”', truth: 'One of the *lowest* crime rates among India’s major cities.', body: 'Nearly every solo traveler surveyed said they’d go alone again. Ride the women-only train coaches after dark.', photo: 'mumbai' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.08) saturate(1.12) contrast(1.03)}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.58) 0%, rgba(6,29,21,.36) 34%, rgba(6,29,21,.5) 62%, rgba(6,29,21,.6) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:130px 110px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.pad-top{position:absolute;inset:0;padding:200px 110px 150px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center}
.pad-cv{position:absolute;inset:0;padding:190px 90px 150px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center}
.foot{position:absolute;left:0;right:0;bottom:150px;display:flex;align-items:center;justify-content:center}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.2em;font-size:26px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.hl{font-style:italic;color:#efc05a}
.num{font-family:'Cormorant Garamond';font-weight:600;font-size:92px;line-height:1;color:#efc05a;text-shadow:0 3px 26px rgba(0,0,0,.65)}
.num small{font-size:36px;color:#f4ecdb;opacity:.65;font-family:'Archivo';font-weight:800;letter-spacing:.14em;vertical-align:14px;margin-left:12px}
.city{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.1em;font-size:42px;color:#efc05a;margin-top:22px;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.warn{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:48px;line-height:1.18;color:#f4ecdb;opacity:.95;margin-top:26px;max-width:820px;text-shadow:0 3px 24px rgba(0,0,0,.8)}
.truth{font-family:'Archivo';font-weight:800;font-size:62px;letter-spacing:-.015em;line-height:1.1;margin-top:32px;max-width:840px;text-shadow:0 3px 28px rgba(0,0,0,.78)}
.body{font-family:'Inter';font-weight:500;font-size:32px;line-height:1.52;color:#f4ecdb;margin-top:30px;max-width:740px;text-shadow:0 2px 22px rgba(0,0,0,.82)}
.cv-title{font-family:'Archivo';font-weight:800;font-size:114px;letter-spacing:-.02em;line-height:1.02;margin-top:32px;max-width:900px;text-shadow:0 3px 28px rgba(0,0,0,.78)}
.cv-sub{font-family:'Inter';font-weight:600;font-size:38px;color:#f4ecdb;margin-top:36px;max-width:800px;text-shadow:0 2px 22px rgba(0,0,0,.82)}
.swipe{font-family:'Caveat';font-weight:600;font-size:46px;color:#efc05a}
.swipe svg{vertical-align:middle}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
</style></head><body>`;
const foot = `</body></html>`;

const slides = [];
// 1 cover
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/cover.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad-cv">
  <div class="kicker">her.solotrip &middot; read before you skip a trip</div>
  <div class="cv-title">${hl('7 cities everyone *warns* you about.')}</div>
  <div class="cv-sub">ranked by what's actually true - swipe</div>
</div><div class="foot">${SWIPE}</div></div>`);
// 2-8 cities
CITIES.forEach((c, i) => {
  slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/${c.photo}.png"><div class="scrim"></div><div class="grain"></div>
  <div class="pad-top">
    <div class="num">0${i + 1}<small>/ 07</small></div>
    <div class="city">${c.city}</div>
    <div class="warn">${c.warn}</div>
    <div class="truth">${hl(c.truth)}</div>
    <div class="body">${hl(c.body)}</div>
  </div><div class="foot">${i < CITIES.length - 1 ? SWIPE : ''}</div></div>`);
});
// 9 endcard
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/end.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad-top">
  <div class="kicker">her.solotrip</div>
  <div class="cv-title">${hl('The real danger? *Never going* because of a headline.')}</div>
  <div class="cv-sub">save this before you cross a city off your list</div>
</div><div class="foot"><span class="tag">solo travel, minus the fear</span></div></div>`);

slides.forEach((body, i) => {
  const htmlPath = join(OUT, `s${i + 1}.html`);
  const pngPath = join(OUT, `0${String(i + 1).padStart(1, '0')}.png`);
  writeFileSync(htmlPath, head + body + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('slide', i + 1, 'ok');
});
console.log('DONE ->', OUT);
