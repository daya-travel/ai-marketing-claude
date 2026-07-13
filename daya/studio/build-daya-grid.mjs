// DAYA account grid: 3 seamless rows of 3 tiles (each tile 1080x1440).
// Each row is designed as one 3240x1440 banner, then sliced into 3 PNGs.
// Row 1 "feeling": coastal panorama + real DAYA logo + claim (photo: hero.png)
// Row 2 "the app": emerald gradient + 3 real founder-page phone mockups
// Row 3 "the makers": two women from behind (photo: founders.png) + line
// Posting order per row: RIGHT tile first (IG fills the grid from the left).
// Output names carry the posting order: r<row>-post1-right ... post3-left.
// Real logo approved by Alesya (12.07.) for the official DAYA account.
// Usage: node build-daya-grid.mjs [row]   (row = 1|2|3, default: all buildable)
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const P = join(__dirname, 'photos', 'daya-grid');
const OUT = join(__dirname, 'out', 'daya-grid');
mkdirSync(OUT, { recursive: true });
const W = 3240, H = 1440, RESERVE = 87;
const only = process.argv[2] ? Number(process.argv[2]) : null;

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb;font-family:'Inter'}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.grain{position:absolute;inset:0;opacity:.13;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.hl{color:#efc05a}
/* row 1: hero */
.r1 .scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.35) 0%, rgba(6,29,21,.15) 40%, rgba(6,29,21,.55) 100%)}
.r1 .mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.r1 .logo{height:150px;filter:drop-shadow(0 6px 30px rgba(0,0,0,.5))}
.r1 .claim{font-family:'Cormorant Garamond';font-style:italic;font-weight:600;font-size:120px;color:#f4ecdb;margin-top:44px;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r1 .site{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.34em;font-size:34px;color:#efc05a;margin-top:46px;text-shadow:0 2px 20px rgba(0,0,0,.6)}
/* row 2: app */
.r2{background:linear-gradient(120deg, #0a2b20 0%, #0e3b2c 45%, #14503c 100%)}
.r2 .head{position:absolute;top:92px;left:0;right:0;text-align:center;z-index:2}
.r2 .head .kick{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.34em;font-size:30px;color:#efc05a}
.r2 .head h2{font-family:'Archivo';font-weight:800;text-transform:uppercase;font-size:76px;letter-spacing:.01em;color:#f4ecdb;margin-top:22px}
.r2 .head h2 .hl{color:#efc05a}
.r2 .tiles{position:absolute;inset:0;display:flex}
.r2 .tile{width:1080px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:84px}
.r2 img.ph{height:880px;width:auto;border-radius:40px;box-shadow:0 40px 90px -30px rgba(0,0,0,.7)}
.r2 .cap{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:30px;color:#efc05a;margin-top:48px}
.r2 .sub{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:44px;color:#f4ecdb;margin-top:16px}
.r2 .glow{position:absolute;top:-320px;left:1170px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle, rgba(239,192,90,.16) 0%, rgba(239,192,90,0) 70%)}
/* row 3: makers */
.r3 .scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.5) 0%, rgba(6,29,21,.2) 45%, rgba(6,29,21,.6) 100%)}
.r3 .mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.r3 .line{font-family:'Archivo';font-weight:800;text-transform:uppercase;font-size:96px;letter-spacing:.01em;color:#f4ecdb;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r3 .serif{font-family:'Cormorant Garamond';font-style:italic;font-weight:600;font-size:104px;color:#efc05a;margin-top:10px;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r3 .sub{font-family:'Inter';font-weight:500;font-size:38px;color:#f4ecdb;opacity:.92;margin-top:44px;text-shadow:0 2px 20px rgba(0,0,0,.6)}
</style></head><body>`;
const foot = `</body></html>`;

const ROWS = {
  1: () => existsSync(join(P, 'hero.png')) && `<div class="wrap r1">
    <img class="photo" src="file://${join(P, 'hero.png')}"><div class="scrim"></div><div class="grain"></div>
    <div class="mid">
      <img class="logo" src="file://${join(P, 'daya-horiz-cream.png')}">
      <div class="claim">solo travel, minus the fear.</div>
      <div class="site">dayatravel.app</div>
    </div></div>`,
  2: () => `<div class="wrap r2"><div class="glow"></div><div class="grain"></div>
    <div class="head"><div class="kick">one app &middot; every step of the trip</div><h2>safety that <span class="hl">runs itself.</span></h2></div>
    <div class="tiles">
      <div class="tile"><img class="ph" src="file://${join(P, 'phone-checkin.png')}"><div class="cap">smart check-in</div><div class="sub">if you don't check in, your people know.</div></div>
      <div class="tile"><img class="ph" src="file://${join(P, 'phone-playbook.png')}"><div class="cap">the playbook, in your pocket</div><div class="sub">the right words, in the right language.</div></div>
      <div class="tile"><img class="ph" src="file://${join(P, 'phone-walkhome.png')}"><div class="cap">walk-me-home</div><div class="sub">someone watches the route with you.</div></div>
    </div></div>`,
  3: () => existsSync(join(P, 'founders.png')) && `<div class="wrap r3">
    <img class="photo" src="file://${join(P, 'founders.png')}"><div class="scrim"></div><div class="grain"></div>
    <div class="mid">
      <div class="line">built by two women</div>
      <div class="serif">who actually travel solo.</div>
      <div class="sub">DAYA &middot; coming soon &middot; dayatravel.app</div>
    </div></div>`,
};

for (const [row, make] of Object.entries(ROWS)) {
  if (only && Number(row) !== only) continue;
  const body = make();
  if (!body) { console.log(`row ${row}: photo missing, skipped`); continue; }
  const htmlPath = join(OUT, `row-${row}.html`);
  const bannerPath = join(OUT, `row-${row}-banner.png`);
  writeFileSync(htmlPath, head + body + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${bannerPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "
from PIL import Image
im = Image.open('${bannerPath}').crop((0, 0, ${W}, ${H}))
im.save('${bannerPath}')
names = ['post3-left', 'post2-middle', 'post1-right']
for i, n in enumerate(names):
    im.crop((i*1080, 0, (i+1)*1080, ${H})).save('${OUT}/r${row}-' + n + '.png')
"`, { stdio: 'inherit' });
  console.log(`row ${row}: banner + 3 tiles ok`);
}
console.log('DONE ->', OUT);
