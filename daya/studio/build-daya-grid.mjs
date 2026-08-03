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
/* typographic wordmark per DESIGN-SYSTEM (swap for the real logo PNG when available) */
.r1 .icon{width:210px;height:210px;border-radius:48px;box-shadow:0 30px 70px -20px rgba(0,0,0,.75)}
.r1 .mark{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;letter-spacing:.18em;font-size:132px;color:#f4ecdb;margin-top:34px;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r1 .claim{font-family:'Cormorant Garamond';font-style:italic;font-weight:600;font-size:96px;color:#f4ecdb;margin-top:18px;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r1 .claim .hl{color:#efc05a}
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
/* built-in phone mockups (no real screenshots available yet) */
.phone{width:432px;height:880px;border-radius:56px;background:#05170f;padding:14px;box-shadow:0 40px 90px -30px rgba(0,0,0,.75), 0 0 0 2px rgba(244,236,219,.10)}
.scr{position:relative;width:100%;height:100%;border-radius:44px;overflow:hidden;background:linear-gradient(170deg,#0b3125 0%,#082419 100%);display:flex;flex-direction:column;align-items:center;padding:34px 30px}
.scr .bar{width:118px;height:7px;border-radius:4px;background:rgba(244,236,219,.28)}
.scr .brand{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;letter-spacing:.28em;font-size:23px;color:#f4ecdb;opacity:.82;margin-top:26px}
.scr .lbl{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.2em;font-size:16px;color:#efc05a;margin-top:34px}
.scr .big{font-family:'Archivo';font-weight:800;font-size:52px;color:#f4ecdb;margin-top:12px;line-height:1.1;text-align:center}
.scr .note{font-family:'Inter';font-weight:500;font-size:19px;color:#f4ecdb;opacity:.62;margin-top:14px;text-align:center;line-height:1.45}
.ring{position:relative;width:250px;height:250px;border-radius:50%;margin-top:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:radial-gradient(circle,rgba(239,192,90,.14) 0%,rgba(239,192,90,0) 70%);border:3px solid rgba(239,192,90,.55)}
.ring .t{font-family:'Archivo';font-weight:800;font-size:60px;color:#efc05a}
.ring .u{font-family:'Inter';font-weight:600;font-size:17px;color:#f4ecdb;opacity:.6;letter-spacing:.14em;text-transform:uppercase;margin-top:6px}
.sos{width:250px;height:250px;border-radius:50%;margin-top:40px;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 38% 32%,#f7d283 0%,#efc05a 45%,#d8a63c 100%);box-shadow:0 0 0 18px rgba(239,192,90,.13), 0 0 0 36px rgba(239,192,90,.06)}
.sos span{font-family:'Archivo';font-weight:800;font-size:58px;letter-spacing:.06em;color:#0a2b20}
.map{position:relative;width:100%;height:300px;border-radius:26px;margin-top:36px;overflow:hidden;background:linear-gradient(150deg,#0e3f2f 0%,#0a2c21 100%);border:1px solid rgba(244,236,219,.12)}
.map i{position:absolute;background:rgba(244,236,219,.09)}
.route{position:absolute;left:14%;top:78%;width:72%;height:3px;background:linear-gradient(90deg,#efc05a,rgba(239,192,90,.25));border-radius:3px;transform:rotate(-31deg);transform-origin:left center}
.dot{position:absolute;width:22px;height:22px;border-radius:50%;background:#efc05a;box-shadow:0 0 0 8px rgba(239,192,90,.22)}
.pill{display:flex;align-items:center;gap:12px;margin-top:26px;padding:14px 24px;border-radius:999px;background:rgba(244,236,219,.09);border:1px solid rgba(244,236,219,.14)}
.pill em{width:13px;height:13px;border-radius:50%;background:#efc05a;display:block}
.pill span{font-family:'Inter';font-weight:600;font-size:20px;color:#f4ecdb;opacity:.92;font-style:normal}
.who{display:flex;gap:-10px;margin-top:30px}
.who b{width:60px;height:60px;border-radius:50%;margin-left:-14px;border:3px solid #0b3125;display:flex;align-items:center;justify-content:center;
  font-family:'Archivo';font-weight:800;font-size:23px;color:#0a2b20;background:#efc05a}
.who b:nth-child(2){background:#cfe3d6}
.who b:nth-child(3){background:#f4ecdb}
.r2 .glow{position:absolute;top:-320px;left:1170px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle, rgba(239,192,90,.16) 0%, rgba(239,192,90,0) 70%)}
/* row 3: makers */
.r3 .scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.5) 0%, rgba(6,29,21,.2) 45%, rgba(6,29,21,.6) 100%)}
.r3 .mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.r3 .line{font-family:'Archivo';font-weight:800;text-transform:uppercase;font-size:96px;letter-spacing:.01em;color:#f4ecdb;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r3 .serif{font-family:'Cormorant Garamond';font-style:italic;font-weight:600;font-size:104px;color:#efc05a;margin-top:10px;text-shadow:0 4px 34px rgba(0,0,0,.6)}
.r3 .sub{font-family:'Inter';font-weight:500;font-size:38px;color:#f4ecdb;opacity:.92;margin-top:44px;text-shadow:0 2px 20px rgba(0,0,0,.6)}
</style></head><body>`;
const foot = `</body></html>`;

const phone = (inner) => `<div class="phone"><div class="scr">
  <div class="bar"></div><div class="brand">Daya</div>${inner}
</div></div>`;

const ROWS = {
  1: () => existsSync(join(P, 'hero.png')) && `<div class="wrap r1">
    <img class="photo" src="file://${join(P, 'hero.png')}"><div class="scrim"></div><div class="grain"></div>
    <div class="mid">
      ${existsSync(join(P, 'daya-icon.png'))
        ? `<img class="icon" src="file://${join(P, 'daya-icon.png')}"><div class="mark">Daya</div>`
        : `<div class="mark">Daya</div>`}
      <div class="claim">safety app for <span class="hl">everyday life &amp; travel.</span></div>
      <div class="site">dayatravel.app</div>
    </div></div>`,
  // Phone screens are drawn in HTML from the design system - swap in real app
  // screenshots (phone-checkin/-sos/-walkhome.png) once they exist.
  2: () => `<div class="wrap r2"><div class="glow"></div><div class="grain"></div>
    <div class="head"><div class="kick">one app &middot; every day, every trip</div><h2>this is how DAYA <span class="hl">looks out for you.</span></h2></div>
    <div class="tiles">
      <div class="tile">${phone(`
        <div class="lbl">check-in</div>
        <div class="big">you're due<br>at 21:00</div>
        <div class="ring"><div class="t">2:14</div><div class="u">left</div></div>
        <div class="note">miss it, and your people<br>get told automatically.</div>
        <div class="who"><b>D</b><b>M</b><b>A</b></div>`)}
        <div class="cap">check-in</div><div class="sub">if you don't check in, your people know.</div></div>
      <div class="tile">${phone(`
        <div class="lbl">emergency</div>
        <div class="big">hold to<br>send help</div>
        <div class="sos"><span>SOS</span></div>
        <div class="note">shares your live location,<br>even with the screen locked.</div>
        <div class="pill"><em></em><span>Lisbon &middot; Rua da Prata</span></div>`)}
        <div class="cap">emergency</div><div class="sub">one tap, and help knows where you are.</div></div>
      <div class="tile">${phone(`
        <div class="lbl">walk-me-home</div>
        <div class="big">Diana is<br>watching</div>
        <div class="map">
          <i style="left:0;top:34%;width:100%;height:2px"></i>
          <i style="left:38%;top:0;width:2px;height:100%"></i>
          <i style="left:72%;top:0;width:2px;height:100%"></i>
          <i style="left:0;top:70%;width:100%;height:2px"></i>
          <div class="route"></div>
          <div class="dot" style="left:12%;top:76%"></div>
          <div class="dot" style="left:74%;top:26%;background:#f4ecdb"></div>
        </div>
        <div class="note">she sees you move.<br>she sees you stop.</div>
        <div class="pill"><em></em><span>12 min to home</span></div>`)}
        <div class="cap">walk-me-home</div><div class="sub">someone walks the route with you. Any route.</div></div>
    </div></div>`,
  3: () => existsSync(join(P, 'founders.png')) && `<div class="wrap r3">
    <img class="photo" src="file://${join(P, 'founders.png')}"><div class="scrim"></div><div class="grain"></div>
    <div class="mid">
      <div class="line">by women</div>
      <div class="serif">for women.</div>
      <div class="sub">DAYA &middot; safety for everyday life &amp; travel &middot; dayatravel.app</div>
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
