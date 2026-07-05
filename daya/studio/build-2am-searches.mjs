// "5 things solo female travelers google at 2am" - TikTok carousel, 7 slides.
// TRUE TikTok format: 1080x1920 (9:16), text TOP-LEFT (right rail + bottom
// caption stay clear), big item numbers at the top. Search-bar visual per slide.
// Photos: photos/2am-searches/{cover,q1..q5,end}.png
// Usage: node build-2am-searches.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', '2am-searches');
const OUT = join(__dirname, 'out', '2am-searches');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const SWIPE = `<span class="swipe">swipe <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#efc05a" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;
const LENS = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0e3b2c" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`;
const hl = (s) => s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const SEARCHES = [
  { q: 'is it weird to eat dinner alone', a: 'No. It\'s a *power move*.', body: 'Bar seat, not corner table. A book, one glass of wine, talk to the bartender. Nobody stares - that\'s a story fear tells you at 2am.', photo: 'q1' },
  { q: 'hotel room safety check', a: '90 seconds, *then sleep*.', body: 'Chain on, deadbolt down, doorstop wedged, count the doors to the exit once. Your body sleeps better when it knows you checked.', photo: 'q2' },
  { q: 'what if someone follows me', a: 'Walk into a *hotel lobby*.', body: 'Not a shop - shops close. Hotels have staff at the door all night. Sit down, order tea, take your time.', photo: 'q3' },
  { q: 'emergency number in europe', a: '112. One number, *whole EU*.', body: 'Works from any phone, even locked. Screenshot the full 20-country list before you land - it\'s in our free playbook.', photo: 'q4' },
  { q: 'is solo travel worth it', a: 'You *already know*.', body: 'That\'s why you\'re up at 2am reading about it. Fear shrinks when plans grow.', photo: 'q5' },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Archivo:wght@700;800&family=Inter:wght@400;500&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.88) 0%, rgba(6,29,21,.6) 40%, rgba(6,29,21,.12) 70%, rgba(6,29,21,.42) 100%)}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
/* top-left content block; right 210px + bottom stay clear for TikTok UI */
.pad{position:absolute;inset:0;padding:150px 210px 120px 88px;display:flex;flex-direction:column;align-items:flex-start;text-align:left}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:27px;color:#efc05a}
.hl{font-style:italic;color:#efc05a}
.num{font-family:'Cormorant Garamond';font-weight:600;font-size:120px;line-height:1;color:#efc05a}
.num small{font-size:44px;color:#f4ecdb;opacity:.65;font-family:'Archivo';font-weight:800;letter-spacing:.14em;vertical-align:18px;margin-left:14px}
.search{display:flex;align-items:center;gap:20px;background:#f4ecdb;border-radius:60px;padding:26px 38px;margin-top:44px;box-shadow:0 18px 50px -18px rgba(0,0,0,.55)}
.search span{font-family:'Inter';font-weight:500;font-size:35px;color:#0e3b2c}
.ans{font-family:'Cormorant Garamond';font-weight:600;font-size:92px;line-height:1.06;margin-top:56px;max-width:780px}
.body{font-family:'Inter';font-weight:400;font-size:36px;line-height:1.5;color:#e7efe7;opacity:.93;margin-top:36px;max-width:760px}
.cv-title{font-family:'Cormorant Garamond';font-weight:600;font-size:108px;line-height:1.05;margin-top:30px;max-width:820px}
.cv-sub{font-family:'Inter';font-weight:500;font-size:34px;color:#e7efe7;opacity:.94;margin-top:34px}
.bottom{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;width:100%}
.swipe{font-family:'Caveat';font-weight:600;font-size:46px;color:#efc05a}
.swipe svg{vertical-align:middle}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:#efc05a}
</style></head><body>`;
const foot = `</body></html>`;

const slides = [];
// 1 cover
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/cover.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">her.solotrip &middot; save this</div>
  <div class="cv-title">5 things solo female travelers google at ${'<span class="hl">2am</span>'}</div>
  <div class="cv-sub">calm answers. one per slide.</div>
  <div class="bottom"><span></span>${SWIPE}</div>
</div></div>`);
// 2-6 searches
SEARCHES.forEach((s, i) => {
  slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/${s.photo}.png"><div class="scrim"></div><div class="grain"></div>
  <div class="pad">
    <div class="num">0${i + 1}<small>/ 05</small></div>
    <div class="search">${LENS}<span>${s.q}</span></div>
    <div class="ans">${hl(s.a)}</div>
    <div class="body">${hl(s.body)}</div>
    <div class="bottom"><span></span>${i < SEARCHES.length - 1 ? SWIPE : ''}</div>
  </div></div>`);
});
// 7 endcard
slides.push(`<div class="wrap"><img class="photo" src="file://${PHOTOS}/end.png"><div class="scrim"></div><div class="grain"></div>
<div class="pad">
  <div class="kicker">close the tabs</div>
  <div class="cv-title">Every 2am answer, in ${'<span class="hl">one calm place</span>'}.</div>
  <div class="cv-sub">the full playbook is free - link in bio</div>
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
