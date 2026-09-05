// Instagram cover for the hotel-canceled reel: same cover photo + copy as the
// reel's first frame, but the title sits CENTERED in the image (IG feed shows
// the reel cover as a 4:5/1:1 crop; centered reads better there than the
// top-left TikTok layout). Standalone 1080x1920 PNG - does NOT touch the reel.
// Usage: node build-cover-hotel-ig.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTO = join(__dirname, 'photos', 'hotel-canceled', 'cover.png');
const OUT = join(__dirname, 'out', 'hotel-canceled');
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;
const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.06) saturate(1.1) contrast(1.03)}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.5) 0%, rgba(6,29,21,.34) 35%, rgba(6,29,21,.5) 60%, rgba(6,29,21,.6) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:120px 110px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.28em;font-size:28px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.hl{font-style:italic;color:#efc05a}
.cv-title{font-family:'Archivo';font-weight:800;font-size:98px;letter-spacing:-.02em;line-height:1.05;margin-top:34px;max-width:900px;text-shadow:0 4px 32px rgba(0,0,0,.78)}
.cv-sub{font-family:'Inter';font-weight:600;font-size:36px;color:#f4ecdb;margin-top:38px;max-width:760px;text-shadow:0 2px 22px rgba(0,0,0,.8)}
</style></head><body>
<div class="wrap"><img class="photo" src="file://${PHOTO}"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">if it happens &middot; 02</div>
  <div class="cv-title">${hl('Your hotel just *canceled*. Tonight.')}</div>
  <div class="cv-sub">5 steps - none of them is panic</div>
</div></div>
</body></html>`;

const htmlPath = join(OUT, 'cover-ig.html');
const pngPath = join(OUT, 'cover-ig.png');
writeFileSync(htmlPath, html);
execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
console.log('DONE ->', pngPath);
