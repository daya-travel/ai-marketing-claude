// IG reel cover v2 "Silent Signals" - car-window photo (open palm against
// rainy glass, silhouette). Copy deliberately does NOT claim to show the
// exact sign (the photo's palm is open) - the reel teaches the pose.
// Usage: node build-cover-signal-v2.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTO = join(__dirname, 'photos', 'signal-hands', 'car-window.png');
const OUT = join(__dirname, 'out', 'covers');
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.06) saturate(1.05)}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.6) 0%, rgba(6,29,21,.42) 32%, rgba(6,29,21,.34) 58%, rgba(6,29,21,.62) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:96px 80px 120px;display:flex;flex-direction:column;align-items:center;text-align:center}
.handle{font-family:'Archivo';font-weight:800;font-size:44px;color:#f4ecdb;text-shadow:0 2px 20px rgba(0,0,0,.6)}
.mid{margin-top:330px}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.32em;font-size:30px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.title{font-family:'Archivo';font-weight:800;text-transform:uppercase;font-size:132px;line-height:1.05;color:#f4ecdb;margin-top:36px;text-shadow:0 4px 34px rgba(0,0,0,.65)}
.serif{display:block;font-family:'Cormorant Garamond';font-style:italic;font-weight:600;text-transform:none;font-size:150px;line-height:1.02;color:#efc05a;margin-top:14px}
.save{margin-top:auto;font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.28em;font-size:26px;line-height:1.7;color:#f4ecdb;opacity:.9;text-shadow:0 2px 18px rgba(0,0,0,.7)}
</style></head><body>
<div class="wrap"><img class="photo" src="file://${PHOTO}"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="handle">her.solotrip</div>
  <div class="mid">
    <div class="kicker">solo travel &middot; safety</div>
    <div class="title">3 signs<br>that could<br>save<span class="serif">your life.</span></div>
  </div>
  <div class="save">watch &middot; then repost -<br>it only works if people know it</div>
</div></div>
</body></html>`;

const htmlPath = join(OUT, 'cover-signal-v2.html');
const pngPath = join(OUT, 'cover-signal-v2.png');
writeFileSync(htmlPath, html);
execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
console.log('DONE ->', pngPath);
