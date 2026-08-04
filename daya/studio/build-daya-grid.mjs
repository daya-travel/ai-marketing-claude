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
/* phone mockups rebuilt from the real Lovable app screens (SOS / fake call /
   check-in), copy forced to English - the live app still shows mixed DE/EN */
.phone{width:430px;height:900px;border-radius:52px;background:#04140d;padding:11px;
  border:1px solid rgba(239,192,90,.30);box-shadow:0 42px 95px -32px rgba(0,0,0,.8)}
.scr{position:relative;width:100%;height:100%;border-radius:42px;overflow:hidden;padding:18px 22px 0;
  background:linear-gradient(165deg,#0e3928 0%,#082017 58%,#061a12 100%);display:flex;flex-direction:column}
.notch{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:112px;height:21px;border-radius:14px;background:#04140d}
.sb{display:flex;justify-content:space-between;align-items:center;font-family:'Cormorant Garamond';font-weight:500;font-size:15px;color:#f4ecdb;opacity:.72}
.hdr{display:flex;justify-content:space-between;align-items:center;margin-top:15px}
.hdr .l{display:flex;align-items:center;gap:9px;font-family:'Archivo';font-weight:700;letter-spacing:.22em;font-size:15px;color:#f4ecdb}
.hdr .l em{width:11px;height:11px;border-radius:50%;background:#2ecc8f;display:block;box-shadow:0 0 10px rgba(46,204,143,.85)}
.hdr .r{font-family:'Archivo';font-weight:700;letter-spacing:.22em;font-size:13px;color:#f4ecdb;opacity:.55}
.rule{height:1px;background:rgba(244,236,219,.16);margin-top:13px}
.tabs{display:flex;margin-top:17px;border:1px solid rgba(239,192,90,.45);border-radius:999px;padding:5px}
.tabs b{flex:1;text-align:center;padding:11px 0;border-radius:999px;font-family:'Archivo';font-weight:700;letter-spacing:.11em;font-size:12px;color:#f4ecdb;opacity:.6}
.tabs b.on{background:#efc05a;color:#0a2b20;opacity:1;box-shadow:0 0 22px rgba(239,192,90,.45)}
.ttl{font-family:'Cormorant Garamond';font-weight:500;font-size:34px;color:#f4ecdb;text-align:center;margin-top:24px}
.desc{font-family:'Inter';font-weight:400;font-size:15px;line-height:1.5;color:#f4ecdb;opacity:.62;text-align:center;margin-top:11px}
.mid2{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;width:100%}
.sosbtn{width:194px;height:194px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  background:radial-gradient(circle at 40% 32%,#f8dc9a 0%,#efc05a 52%,#d9a942 100%);
  box-shadow:0 0 0 13px rgba(239,192,90,.10),0 0 0 28px rgba(239,192,90,.05),0 0 62px rgba(239,192,90,.35)}
.sosbtn span{font-family:'Cormorant Garamond';font-weight:500;font-size:31px;color:#0a2b20}
.callbtn{width:132px;height:132px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:rgba(239,192,90,.13);border:1px solid rgba(239,192,90,.34);box-shadow:0 0 0 24px rgba(239,192,90,.045)}
.ringc{position:relative;width:206px;height:206px;border-radius:50%;border:2px solid rgba(239,192,90,.42);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px}
.ringc .knob{position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:15px;height:15px;border-radius:50%;background:#efc05a}
.ringc .v{font-family:'Inter';font-weight:500;font-size:25px;letter-spacing:.1em;color:#f4ecdb}
.pills{display:flex;gap:11px}
.pills b{padding:12px 19px;border-radius:999px;border:1px solid rgba(239,192,90,.45);font-family:'Archivo';font-weight:700;letter-spacing:.1em;font-size:13px;color:#efc05a}
.pills b.on{background:#efc05a;color:#0a2b20}
.cta{width:100%;padding:17px 0;border-radius:999px;background:#efc05a;text-align:center;
  font-family:'Archivo';font-weight:800;letter-spacing:.16em;font-size:15px;color:#0a2b20;box-shadow:0 0 34px rgba(239,192,90,.38)}
.hint{font-family:'Archivo';font-weight:700;letter-spacing:.17em;font-size:13px;color:#efc05a;text-align:center}
.chip{padding:11px 19px;border-radius:999px;background:rgba(244,236,219,.09);
  font-family:'Archivo';font-weight:700;letter-spacing:.13em;font-size:12px;color:#f4ecdb;opacity:.85}
.ways{display:flex;gap:20px;justify-content:center;font-family:'Archivo';font-weight:700;letter-spacing:.13em;font-size:11.5px;color:#f4ecdb;opacity:.58}
.nav{display:flex;padding:13px 2px 10px;border-top:1px solid rgba(244,236,219,.12);margin-top:auto}
.nav i{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;font-style:normal;
  font-family:'Archivo';font-weight:700;letter-spacing:.09em;font-size:10px;color:#f4ecdb;opacity:.45}
.nav i.on{color:#efc05a;opacity:1}
.nav i.warn{color:#e8654f;opacity:.95}
.hbar{width:116px;height:5px;border-radius:3px;background:rgba(244,236,219,.3);margin:0 auto 11px}
</style></head><body>`;
const foot = `</body></html>`;

const ico = {
  shield: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0a2b20" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z"/></svg>`,
  call: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>`,
  timer: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4M9.5 2h5"/></svg>`,
  home: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>`,
  map: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z"/><path d="M9 3v15M15 6v15"/></svg>`,
  chat: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M21 12a8 8 0 01-8 8H7l-4 3V12a8 8 0 018-8h2a8 8 0 018 8z"/></svg>`,
  friends: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8" r="3"/><circle cx="17.5" cy="9" r="2.3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16.5 14.5c2.5 0 4.5 2 4.5 4.5"/></svg>`,
  warn: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l8.5 15.5h-17L12 3.5z"/><path d="M12 10v4M12 16.8v.4"/></svg>`,
};

// bottom tab bar - `on` is the highlighted item, SOS always keeps its red tint
const nav = (on) => `<div class="nav">
  <i class="${on === 'home' ? 'on' : ''}">${ico.home}HOME</i>
  <i class="${on === 'map' ? 'on' : ''}">${ico.map}MAP</i>
  <i class="${on === 'chat' ? 'on' : ''}">${ico.chat}CHAT</i>
  <i class="${on === 'friends' ? 'on' : ''}">${ico.friends}FRIENDS</i>
  <i class="warn">${ico.warn}SOS</i>
</div><div class="hbar"></div>`;

const TABS = ['SOS', 'FAKE CALL', 'CHECK-IN'];
const phone = (active, title, desc, body, navOn) => `<div class="phone"><div class="scr">
  <div class="notch"></div>
  <div class="sb"><span>23:47</span><span>88%</span></div>
  <div class="hdr"><div class="l"><em></em>DAYA</div><div class="r">LIVE</div></div>
  <div class="rule"></div>
  <div class="tabs">${TABS.map((t) => `<b class="${t === active ? 'on' : ''}">${t}</b>`).join('')}</div>
  <div class="ttl">${title}</div>
  <div class="desc">${desc}</div>
  <div class="mid2">${body}</div>
  ${nav(navOn)}
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
  2: () => `<div class="wrap r2"><div class="glow"></div><div class="grain"></div>
    <div class="head"><div class="kick">one app &middot; every day, every trip</div><h2>this is how DAYA <span class="hl">looks out for you.</span></h2></div>
    <div class="tiles">
      <div class="tile">
        ${phone('SOS', 'Trigger SOS',
          'Hold for 2.4 seconds - a false alarm is impossible. DAYA sends your live location, the last 60 seconds of ambient sound and your emergency note to up to 3 trusted contacts.',
          `<div class="sosbtn">${ico.shield}<span>SOS</span></div>
           <div class="hint">PRESS AND HOLD &middot; 2.4 SEC</div>
           <div class="ways"><span>SMS</span><span>PUSH</span><span>MAIL</span></div>`, 'home')}
        <div class="cap">sos</div><div class="sub">one hold - location, sound and your note go out.</div></div>
      <div class="tile">
        ${phone('FAKE CALL', 'Start Voice Cover',
          'Tap - the call comes in 1 second. In the app you can schedule it from 10 seconds up to 5 minutes ahead.',
          `<div class="callbtn">${ico.call}</div>
           <div class="chip">PREVIEW: MOM CALLING</div>
           <div class="cta">TEST IT NOW</div>`, 'chat')}
        <div class="cap">fake call</div><div class="sub">a way out of any room, in one tap.</div></div>
      <div class="tile">
        ${phone('CHECK-IN', 'Check-in timer',
          "Choose 15, 30 or 60 min (customizable in the app). If you don't check in on time, you first get a warning - then escalation kicks in.",
          `<div class="pills"><b class="on">15 MIN</b><b>30 MIN</b><b>60 MIN</b></div>
           <div class="ringc"><div class="knob"></div>${ico.timer}<div class="v">15 min</div></div>
           <div class="cta">START TIMER</div>`, 'friends')}
        <div class="cap">check-in</div><div class="sub">miss the timer and the escalation starts.</div></div>
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
