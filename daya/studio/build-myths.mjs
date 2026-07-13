// "3 solo travel myths" carousel - 5 slides, 1080x1920 (9:16), from the
// Meta Business Suite suggestion (13.07.). Layout = proven over-50/2am
// format: italic myth quote, big serif truth, body tip, text top-left.
// Photos 100% reused from the existing library - zero new credits.
// Close slide = comment question (top comment driver per Meta insights).
// Usage: node build-myths.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos');
const OUT = join(__dirname, 'out', 'myths');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const SWIPE = `<span class="swipe">swipe <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;
const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const MYTHS = [
  { m: '“You’re always alone.”', t: 'Alone is *optional*.', body: 'Nobody makes friends faster than a solo traveler. Hostel kitchens, walking tours, cafe counters - you choose your company, day by day.', photo: 'over-50/q2.png' },
  { m: '“You have to be brave.”', t: 'You have to be *prepared*.', body: 'Courage is overrated. A checked-in hotel, an offline map and one plan B beat bravery every time.', photo: 'over-50/q5.png' },
  { m: '“Nights are unsafe everywhere.”', t: 'Nights are a *strategy*.', body: 'Arrive in daylight. Pick the lively street over the shortcut. Take the taxi when it’s late. That’s not fear - that’s a plan.', photo: '2am-searches/q3.png' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(1.5) saturate(1.15) contrast(1.03)}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.58) 0%, rgba(6,29,21,.38) 42%, rgba(6,29,21,.2) 72%, rgba(6,29,21,.4) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:250px 150px 150px 150px;display:flex;flex-direction:column;align-items:center;text-align:center}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:27px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.hl{font-style:italic;color:#efc05a}
.num{font-family:'Cormorant Garamond';font-weight:600;font-size:120px;line-height:1;color:#efc05a;text-shadow:0 3px 26px rgba(0,0,0,.65)}
.num small{font-size:44px;color:#f4ecdb;opacity:.65;font-family:'Archivo';font-weight:800;letter-spacing:.14em;vertical-align:18px;margin-left:14px}
.myth{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:56px;line-height:1.15;color:#f4ecdb;opacity:.95;margin-top:46px;max-width:780px;text-shadow:0 3px 24px rgba(0,0,0,.75)}
.truth{font-family:'Archivo';font-weight:800;font-size:84px;letter-spacing:-.02em;line-height:1.04;margin-top:48px;max-width:780px;text-shadow:0 3px 28px rgba(0,0,0,.7)}
.body{font-family:'Inter';font-weight:500;font-size:36px;line-height:1.5;color:#f4ecdb;margin-top:36px;max-width:760px;text-shadow:0 2px 22px rgba(0,0,0,.75)}
.cv-title{font-family:'Archivo';font-weight:800;font-size:92px;letter-spacing:-.02em;line-height:1.06;margin-top:30px;max-width:820px;text-shadow:0 3px 28px rgba(0,0,0,.7)}
.cv-sub{font-family:'Inter';font-weight:600;font-size:34px;line-height:1.45;color:#f4ecdb;margin-top:34px;max-width:760px;text-shadow:0 2px 22px rgba(0,0,0,.75)}
.bottom{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;width:100%}
.swipe{font-family:'Caveat';font-weight:600;font-size:46px;color:#efc05a}
.swipe svg{vertical-align:middle}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
</style></head><body>`;
const foot = `</body></html>`;

const slides = [];
// 1 cover
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/over-50/q4.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">her.solotrip &middot; read this</div>
  <div class="cv-title">${hl('“Solo travel is *dangerous*”?')}</div>
  <div class="cv-sub">3 myths that keep women home - and what’s actually true</div>
  <div class="bottom"><span></span>${SWIPE}</div>
</div></div>`);
// 2-4 myths
MYTHS.forEach((s, i) => {
  slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/${s.photo}"><div class="scrim"></div><div class="grain"></div>
  <div class="pad">
    <div class="num">0${i + 1}<small>/ 03</small></div>
    <div class="myth">myth: ${s.m}</div>
    <div class="truth">${hl(s.t)}</div>
    <div class="body">${hl(s.body)}</div>
    <div class="bottom"><span></span>${i < MYTHS.length - 1 ? SWIPE : ''}</div>
  </div></div>`);
});
// 5 close - comment question (no playbook CTA)
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/2am-searches/end.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">her.solotrip</div>
  <div class="cv-title">${hl('Which myth kept *you* home?')}</div>
  <div class="cv-sub">tell me in the comments - I read every single one 💚</div>
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
