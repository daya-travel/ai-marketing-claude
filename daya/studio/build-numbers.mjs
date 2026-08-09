// "Numbers every woman should have" - her.solotrip carousel, 9 slides, 1080x1350 (4:5).
// Format borrowed from a viral German TikTok (Steffi Dellmann), but rebuilt in the DAYA
// design system - never copy her pink/typewriter look, it would read as a repost.
// EVERY number below was verified 03.08. against the operator's own site:
//   112 / 999 / 911 / 000 / 111 ....... Wikipedia list of emergency telephone numbers
//   116 123 / 116 111 / 116 117 ....... EU harmonised 116 services
//   0808 2000 247 ..................... nationaldahelpline.org.uk (Refuge)
//   116 123 UK ........................ samaritans.org
//   1800 341 900 ...................... womensaid.ie
//   988 .............................. samhsa.gov
//   1-800-799-7233 .................... thehotline.org
//   1-800-656-4673 .................... rainn.org
//   1800 737 732 / 0458 737 732 ....... 1800respect.org.au
//   13 11 14 .......................... Lifeline Australia
//   0800 733 843 ...................... Women's Refuge NZ
// 116 006 (EU victims of crime) is deliberately LEFT OUT - live in only 13 EU states,
// so it would fail for half of Europe.
// No website URL on purpose (playbook page still being reworked). Logo on the last slide only.
// Usage: node build-numbers.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO = join(__dirname, 'photos', 'daya-grid', 'daya-icon.png');
// bow mark keyed out of the app icon (luminance key + circular mask). Placeholder
// until the real transparent lockup lands in photos/daya-grid/.
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-cream.png');
// `node build-numbers.mjs tiktok` renders 9:16 instead of the 4:5 Instagram crop.
// On TikTok the right edge carries the action buttons and the bottom ~450px the
// caption, so content is pushed into the safe upper area and the mark moves to
// the top right corner.
const TT = process.argv[2] === 'tiktok';
const OUT = join(__dirname, 'out', TT ? 'numbers-tiktok' : 'numbers');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const W = 1080, H = TT ? 1920 : 1350, RESERVE = 87;

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb;font-family:'Inter';
  background:linear-gradient(160deg,#0a2b20 0%,#0e3b2c 46%,#14503c 100%)}
.glow{position:absolute;top:-280px;right:-220px;width:820px;height:820px;border-radius:50%;
  background:radial-gradient(circle,rgba(239,192,90,.15) 0%,rgba(239,192,90,0) 70%)}
.grain{position:absolute;inset:0;opacity:.13;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.pad{position:absolute;inset:0;padding:${TT ? '210px 88px 470px' : '150px 88px 140px'};display:flex;flex-direction:column;justify-content:center}
.pad.mid{align-items:center;justify-content:center;text-align:center}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.3em;font-size:32px;color:#efc05a}
.rule{height:2px;background:rgba(239,192,90,.35);margin:26px 0 46px}
.row{margin-bottom:56px}
.row:last-of-type{margin-bottom:0}
.num{font-family:'Archivo';font-weight:800;font-size:84px;line-height:1.05;color:#efc05a;letter-spacing:-.01em}
.num.sm{font-size:68px}
.desc{font-family:'Inter';font-weight:500;font-size:32px;line-height:1.4;color:#f4ecdb;opacity:.88;margin-top:12px;max-width:880px}
.foot{margin-top:52px;font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:32px;color:#efc05a;opacity:.92}
.title{font-family:'Archivo';font-weight:800;font-size:88px;line-height:1.06;letter-spacing:-.02em}
.title.sm{font-size:74px}
.sub{font-family:'Inter';font-weight:500;font-size:34px;line-height:1.45;color:#f4ecdb;opacity:.85;margin-top:34px;max-width:840px}
.big{font-family:'Archivo';font-weight:800;font-size:78px;color:#efc05a;letter-spacing:-.02em}
.step{display:flex;gap:26px;align-items:flex-start;margin-top:34px;text-align:left}
.step b{font-family:'Archivo';font-weight:800;font-size:44px;color:#efc05a;line-height:1.1;min-width:56px}
.step span{font-family:'Inter';font-weight:500;font-size:34px;line-height:1.35;color:#f4ecdb}
.logo{width:172px;height:172px;border-radius:42px;margin-bottom:48px;box-shadow:0 22px 54px -18px rgba(0,0,0,.7)}
.pad.between{align-items:center;justify-content:space-between;text-align:center;padding:${TT ? '150px 88px 420px' : '150px 88px 140px'}}
.handle{font-family:'Archivo';font-weight:800;text-transform:lowercase;letter-spacing:.16em;font-size:32px;color:#efc05a}
.sig{display:flex;flex-direction:column;align-items:center}
.markonly{height:230px;margin-bottom:56px}
.wm-handle{position:absolute;top:52px;left:88px;font-family:'Archivo';font-weight:800;letter-spacing:.16em;font-size:25px;color:#efc05a;opacity:.9}
.wm-logo{position:absolute;${TT ? 'top:44px;right:84px' : 'bottom:44px;right:78px'};height:62px;opacity:.6}
.lockup{display:flex;align-items:center;gap:34px}
.lockup img{height:104px}
.lockup span{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;letter-spacing:.2em;font-size:62px;color:#f4ecdb;line-height:1}
</style></head><body>`;
const foot = `</body></html>`;

// country slides: kicker + list of {n, d, sm?} + optional footnote
const LIST = (kicker, rows, note) => `<div class="pad">
  <div class="kicker">${kicker}</div><div class="rule"></div>
  ${rows.map((r) => `<div class="row"><div class="num${r.sm ? ' sm' : ''}">${r.n}</div><div class="desc">${r.d}</div></div>`).join('')}
  ${note ? `<div class="foot">${note}</div>` : ''}
</div>`;

const SLIDES = [
  // 1 cover
  `<div class="pad mid">
    ${existsSync(MARK) ? `<img class="markonly" src="file://${MARK}">` : ''}
    <div class="title">Numbers every woman should have.</div>
    <div class="sub">You will probably never call them.<br>Save them anyway.</div>
  </div>`,

  // 2 Europe
  LIST('Europe', [
    { n: '112', d: 'Emergency, anywhere in Europe' },
    { n: '116 123', d: 'Emotional support, day and night' },
    { n: '116 111', d: 'For anyone under 18' },
    { n: '116 117', d: 'Ill, but not an emergency' },
  ], '112 also works in much of Africa and Asia.'),

  // 3 UK & Ireland
  LIST('UK &amp; Ireland', [
    { n: '999 or 112', d: 'Emergency' },
    { n: '0808 2000 247', d: 'National Domestic Abuse Helpline, UK. 24 hours, free, translation available', sm: true },
    { n: '116 123', d: 'Samaritans. Free from any phone, never shows on your bill' },
    { n: '1800 341 900', d: "Women's Aid Ireland. 24 hours, free", sm: true },
  ]),

  // 4 USA
  LIST('USA', [
    { n: '911', d: 'Emergency' },
    { n: '988', d: 'Suicide &amp; Crisis Lifeline. Call or text' },
    { n: '1-800-799-7233', d: 'National Domestic Violence Hotline. 200+ languages, or text START to 88788', sm: true },
    { n: '1-800-656-4673', d: 'RAINN, sexual assault. Or text HOPE to 64673', sm: true },
  ]),

  // 5 Australia & New Zealand
  LIST('Australia &amp; New Zealand', [
    { n: '000 / 111', d: 'Emergency. 000 in Australia, 111 in New Zealand' },
    { n: '1800 737 732', d: '1800RESPECT. 24 hours, or text 0458 737 732', sm: true },
    { n: '13 11 14', d: 'Lifeline Australia' },
    { n: '0800 733 843', d: "Women's Refuge New Zealand. 24/7", sm: true },
  ]),

  // 6 everywhere else
  `<div class="pad mid">
    <div class="kicker">Everywhere else</div>
    <div class="big" style="margin-top:44px">findahelpline<br>.com</div>
    <div class="sub">Vetted helplines in more than 175 countries. Domestic violence, sexual assault, crisis support.</div>
    <div class="foot" style="margin-top:56px">Screenshot it before you fly. Then it works offline.</div>
  </div>`,

  // 7 before you fly
  `<div class="pad">
    <div class="kicker">Before every trip</div><div class="rule"></div>
    <div class="title sm">Three numbers.<br>Four minutes.</div>
    <div class="step"><b>1</b><span>The emergency number for that country</span></div>
    <div class="step"><b>2</b><span>The women's helpline for that country</span></div>
    <div class="step"><b>3</b><span>Your embassy there</span></div>
    <div class="foot">You will never do this once you have landed.</div>
  </div>`,

  // 8 lock screen trick
  `<div class="pad">
    <div class="kicker">The one that always works</div><div class="rule"></div>
    <div class="title sm">Put them where you cannot lose them.</div>
    <div class="sub">Write your numbers on a note, screenshot it, and set it as your lock screen.</div>
    <div class="sub" style="margin-top:26px">Anyone helping you can read it without your PIN. Three minutes to set up, and it still works when your battery is dead and someone else is holding their phone.</div>
  </div>`,

  // 9 save + logo
  `<div class="pad between">
    <div class="handle">@her.solotrip</div>
    <div>
      <div class="title">Save this post.</div>
      <div class="sub">One day it might be for someone you love.</div>
    </div>
    <div class="lockup">
      ${existsSync(MARK) ? `<img src="file://${MARK}">` : ''}
      <span>Daya</span>
    </div>
  </div>`,
];

const WM = `<div class="wm-handle">@her.solotrip</div>` +
  (existsSync(MARK) ? `<img class="wm-logo" src="file://${MARK}">` : '');

SLIDES.forEach((body, i) => {
  const n = String(i + 1).padStart(2, '0');
  const wm = i === SLIDES.length - 1 ? '' : WM;
  const htmlPath = join(OUT, `s${n}.html`);
  const pngPath = join(OUT, `${n}.png`);
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="glow"></div><div class="grain"></div>${body}${wm}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=6000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('slide', n, 'ok');
});
console.log('DONE ->', OUT);
