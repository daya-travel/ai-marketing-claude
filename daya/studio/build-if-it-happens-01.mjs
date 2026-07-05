// IF IT HAPPENS 01 - "phone stolen abroad" TikTok carousel (8 slides, 1080x1440).
// Cover + endcard on photo, 6 timeline slides typographic on emerald + grain.
// Same render pipeline as build-carousel.mjs (Chrome screenshot + PIL crop).
// Usage: node build-if-it-happens-01.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'if-it-happens-01-phone');
const OUT = join(__dirname, 'out', 'if-it-happens-01-phone');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1440, RESERVE = 87;

const ARROW = `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#f4ecdb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`;
const SWIPE = `<span class="swipe">swipe <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;

const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>').replace(/\n/g, '<br>');

const STEPS = [
  { min: 'MIN 0-5', title: 'Mark it *lost*.', body: 'Borrow any phone or open any browser. Find My (Apple) or Find My Device (Google) - "Mark as Lost". Your phone locks itself and shows a message.' },
  { min: 'MIN 5-10', title: 'Block your *cards*.', body: 'Banking app on any device. German cards: one call to +49 116 116 blocks them all - 24/7, from anywhere.' },
  { min: 'MIN 10-15', title: '*Email* password first.', body: 'Not Instagram. Email. It is the master key to everything else you own - whoever holds it can reset the rest.' },
  { min: 'MIN 15-25', title: 'Police report, *in writing*.', body: 'Ask for the case number on paper. Your travel insurance pays with it - and not without it.' },
  { min: 'MIN 25-30', title: 'Text *your person*.', body: 'From any device: "Phone stolen. I am safe. Reach me here." Then sit down and breathe. The worst part is over.' },
  { min: 'THE POINT', title: 'You memorize *nothing*.', body: 'Under stress nobody remembers lists. You screenshot this once, and it waits quietly in your camera roll until the day you need it.' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Archivo:wght@700;800&family=Inter:wght@400;500&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.25) 0%, rgba(6,29,21,.45) 55%, rgba(6,29,21,.88) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:84px 88px;display:flex;flex-direction:column}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:26px;color:#efc05a}
.hl{font-style:italic;color:#efc05a}
.swipe{font-family:'Caveat';font-weight:600;font-size:44px;color:#efc05a}
.swipe svg{vertical-align:middle}
/* cover / end */
.cv-title{font-family:'Cormorant Garamond';font-weight:600;font-size:104px;line-height:1.04;margin-top:26px}
.cv-sub{font-family:'Inter';font-weight:500;font-size:33px;color:#e7efe7;opacity:.94;margin-top:30px}
.bottom{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between}
/* step slides - photo background, text anchored top under a heavy top scrim */
.step .scrim{background:linear-gradient(180deg, rgba(6,29,21,.86) 0%, rgba(6,29,21,.62) 42%, rgba(6,29,21,.18) 72%, rgba(6,29,21,.55) 100%)}
.step .bottom{margin-top:auto}
.chip{display:inline-block;font-family:'Archivo';font-weight:800;letter-spacing:.24em;font-size:33px;color:#0e3b2c;background:#efc05a;border-radius:14px;padding:18px 38px}
.st-title{font-family:'Cormorant Garamond';font-weight:600;font-size:112px;line-height:1.05;margin-top:54px}
.st-body{font-family:'Inter';font-weight:400;font-size:37px;line-height:1.5;color:#e7efe7;opacity:.92;margin-top:44px;max-width:840px}
.count{font-family:'Archivo';font-weight:800;letter-spacing:.2em;font-size:26px;color:#f4ecdb;opacity:.55}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:#efc05a}
</style></head><body>`;
const foot = `</body></html>`;

const slides = [];
// 1 cover
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/cover.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">if it happens &middot; 01</div>
  <div class="cv-title">What to do if your phone is ${'<span class="hl">stolen</span>'} abroad</div>
  <div class="cv-sub">the first 30 minutes, minute by minute</div>
  <div class="bottom">${ARROW}${SWIPE}</div>
</div></div>`);
// 2-7 steps (photo backgrounds: step1.png .. step6.png)
STEPS.forEach((s, i) => {
  slides.push(`<div class="wrap step"><img class="photo" src="file://${PHOTOS}/step${i + 1}.png"><div class="scrim"></div><div class="grain"></div>
  <div class="pad">
    <div><span class="chip">${s.min}</span></div>
    <div class="st-title">${hl(s.title)}</div>
    <div class="st-body">${hl(s.body)}</div>
    <div class="bottom"><span class="count">${i + 2} / 8</span>${i < STEPS.length - 1 ? SWIPE : ''}</div>
  </div></div>`);
});
// 8 endcard
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/end.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">save this</div>
  <div class="cv-title">You'll never need it - ${'<span class="hl">until you do</span>'}.</div>
  <div class="cv-sub">the full playbook is free - link in bio</div>
  <div class="bottom"><span class="tag">solo travel, minus the fear</span>${ARROW}</div>
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
