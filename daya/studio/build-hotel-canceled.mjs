// IF IT HAPPENS 02 - "your hotel cancels without warning" TikTok carousel.
// 7 slides, 1080x1920 (9:16), same proven format as build-2am-searches.mjs:
// text top-left, brightness(1.5) photo filter, marigold numbers, swipe cue.
// Facts verified 16.07. (One Mile at a Time, Perk, Daily Passport): a hotel
// CAN cancel, but you still get a full refund - "non-refundable" only binds
// the guest, not the hotel; platforms owe you a comparable alternative and
// often the first night at the new place.
// Usage: node build-hotel-canceled.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'hotel-canceled');
const OUT = join(__dirname, 'out', 'hotel-canceled');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const SWIPE = `<span class="swipe">swipe <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;
const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const STEPS = [
  { q: 'step 1 &middot; the first 2 minutes', a: 'Screenshot *everything*.', body: 'Booking confirmation, the cancellation message, the chat. That’s your proof - get it before anything disappears.', photo: 'q1' },
  { q: 'step 2 &middot; know this', a: '“Non-refundable” was never *your* rule.', body: 'That label binds you if you cancel. If the hotel cancels, you get a full refund. Always.', photo: 'q2' },
  { q: 'step 3 &middot; who to call', a: 'Call the *platform*, not just the hotel.', body: 'Booking.com, Airbnb and co. owe you a comparable room - and often cover your first night at the new one.', photo: 'q3' },
  { q: 'step 4 &middot; the move nobody makes', a: 'Save 3 backups *before* you fly.', body: 'Screenshot 2-3 nearby hotels before your trip even starts. Now “no room” takes 90 seconds to fix, not a panic spiral.', photo: 'q4' },
  { q: 'step 5 &middot; if nobody answers', a: 'Walk into a *different* lobby.', body: 'In person beats the phone at midnight. Reception staff can often seat you faster than any hotline.', photo: 'q5' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.5) saturate(1.15) contrast(1.03)}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.45) 0%, rgba(6,29,21,.22) 42%, rgba(6,29,21,.05) 72%, rgba(6,29,21,.2) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:270px 210px 150px 88px;display:flex;flex-direction:column;align-items:flex-start;text-align:left}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.2em;font-size:26px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.hl{font-style:italic;color:#efc05a}
.num{font-family:'Cormorant Garamond';font-weight:600;font-size:120px;line-height:1;color:#efc05a;text-shadow:0 3px 26px rgba(0,0,0,.65)}
.num small{font-size:44px;color:#f4ecdb;opacity:.65;font-family:'Archivo';font-weight:800;letter-spacing:.14em;vertical-align:18px;margin-left:14px}
.ans{font-family:'Archivo';font-weight:800;font-size:80px;letter-spacing:-.02em;line-height:1.06;margin-top:48px;max-width:800px;text-shadow:0 3px 28px rgba(0,0,0,.72)}
.body{font-family:'Inter';font-weight:500;font-size:36px;line-height:1.5;color:#f4ecdb;margin-top:36px;max-width:760px;text-shadow:0 2px 22px rgba(0,0,0,.75)}
.cv-title{font-family:'Archivo';font-weight:800;font-size:88px;letter-spacing:-.02em;line-height:1.06;margin-top:30px;max-width:820px;text-shadow:0 3px 28px rgba(0,0,0,.72)}
.cv-sub{font-family:'Inter';font-weight:500;font-size:34px;color:#f4ecdb;margin-top:34px;text-shadow:0 2px 22px rgba(0,0,0,.75)}
.bottom{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;width:100%}
.swipe{font-family:'Caveat';font-weight:600;font-size:46px;color:#efc05a}
.swipe svg{vertical-align:middle}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
</style></head><body>`;
const foot = `</body></html>`;

const slides = [];
// 1 cover
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/cover.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">if it happens &middot; 02</div>
  <div class="cv-title">Your hotel just *canceled*. Tonight.</div>
  <div class="cv-sub">5 steps - none of them is panic</div>
  <div class="bottom"><span></span>${SWIPE}</div>
</div></div>`);
// 2-6 steps
STEPS.forEach((s, i) => {
  slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/${s.photo}.png"><div class="scrim"></div><div class="grain"></div>
  <div class="pad">
    <div class="num">0${i + 1}<small>/ 05</small></div>
    <div class="kicker" style="margin-top:22px">${s.q}</div>
    <div class="ans">${hl(s.a)}</div>
    <div class="body">${hl(s.body)}</div>
    <div class="bottom"><span></span>${i < STEPS.length - 1 ? SWIPE : ''}</div>
  </div></div>`);
});
// 7 endcard
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/end.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">her.solotrip</div>
  <div class="cv-title">A canceled room ends a *booking* - not a trip.</div>
  <div class="cv-sub">save this before you need it</div>
  <div class="bottom"><span class="tag">solo travel, minus the fear</span></div>
</div></div>`);

slides.forEach((body, i) => {
  const htmlPath = join(OUT, `s${i + 1}.html`);
  const pngPath = join(OUT, `0${i + 1}.png`);
  writeFileSync(htmlPath, head + body + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('slide', i + 1, 'ok');
});
console.log('DONE ->', OUT);
