// Reel 03 "Silent Signals" - Signal for Help + bar codewords + water signal.
// Fully self-contained: the hand sign is rendered as accurate flat pictograms
// (SVG, brand colors) instead of filmed/AI hands - a wrong finger position
// would teach the WRONG distress signal, so the diagram must be exact:
// step 1 palm out, step 2 thumb folded across palm, step 3 fingers closed
// over the thumb. B-roll from the 9 existing clips. No audio on purpose
// (trending sound or the ElevenLabs VO gets added in the app).
// Usage: node build-reel-03.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIPS = join(__dirname, 'reels', 'reel-01-green-flags');
const OUT = join(__dirname, 'reels', 'reel-03-silent-signals');
const OV = join(OUT, 'overlays');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OV, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

// --- Signal for Help pictograms (cream hand, marigold thumb) -------------
// Shared finger geometry: 4 fingers above the palm, thumb changes per step.
const FINGERS = `
  <rect x="136" y="92"  width="46" height="230" rx="23" fill="#f4ecdb"/>
  <rect x="192" y="58"  width="46" height="264" rx="23" fill="#f4ecdb"/>
  <rect x="248" y="74"  width="46" height="248" rx="23" fill="#f4ecdb"/>
  <rect x="304" y="122" width="46" height="200" rx="23" fill="#f4ecdb"/>`;
const PALM = `<rect x="128" y="292" width="224" height="196" rx="58" fill="#f4ecdb"/>`;

const HAND_1 = `<svg class="hand" viewBox="0 0 460 560">
  ${FINGERS}${PALM}
  <rect x="46" y="260" width="46" height="160" rx="23" fill="#efc05a" transform="rotate(-24 69 340)"/>
</svg>`;
const HAND_2 = `<svg class="hand" viewBox="0 0 460 560">
  ${FINGERS}${PALM}
  <rect x="150" y="348" width="170" height="46" rx="23" fill="#efc05a" transform="rotate(-12 235 371)"/>
</svg>`;
const HAND_3 = `<svg class="hand" viewBox="0 0 460 560">
  <rect x="128" y="300" width="224" height="188" rx="52" fill="#f4ecdb"/>
  <rect x="136" y="258" width="46" height="100" rx="23" fill="#f4ecdb"/>
  <rect x="192" y="246" width="46" height="112" rx="23" fill="#f4ecdb"/>
  <rect x="248" y="252" width="46" height="106" rx="23" fill="#f4ecdb"/>
  <rect x="304" y="268" width="46" height="90" rx="23" fill="#f4ecdb"/>
  <rect x="170" y="386" width="140" height="62" rx="31" fill="none" stroke="#efc05a" stroke-width="8" stroke-dasharray="18 14"/>
</svg>`;

const step = (chip, svg, line, sub) => `
  <div class="mid">
    <div class="chip">${chip}</div>
    ${svg}
    <div class="line">${hl(line)}</div>
    ${sub ? `<div class="sub">${hl(sub)}</div>` : ''}
  </div>`;

const SEGS = [
  { clip: '01-bluehour-lane.mp4', ss: 0, dur: 2.6, body: `
    <div class="mid">
      <div class="kicker">signal for help</div>
      <div class="hook">This hand signal has *saved lives*.</div>
      <div class="sub">most people can't recognize it - yet</div>
    </div>` },
  { clip: '06-woman-lane-goldenhour.mp4', ss: 0, dur: 2.2, body: step('STEP 1', HAND_1, 'Palm *out*.') },
  { clip: '06-woman-lane-goldenhour.mp4', ss: 2.4, dur: 2.2, body: step('STEP 2', HAND_2, 'Tuck your *thumb*.') },
  { clip: '05-tram.mp4', ss: 0, dur: 2.6, body: step('STEP 3', HAND_3, 'Close your fingers *over it*.', 'it means: *I need help*') },
  { clip: '02-carfree-morning-street.mp4', ss: 0, dur: 2.6, body: `
    <div class="mid">
      <div class="line">2021: a driver *recognized it*.</div>
      <div class="sub">a missing 16-year-old was found - because one person knew the sign</div>
    </div>` },
  { clip: '03-evening-square.mp4', ss: 0, dur: 2.4, body: `
    <div class="mid">
      <div class="line">If you see it: *don't confront*.</div>
      <div class="sub">stay close - call 112 (EU) / 911 (US)</div>
    </div>` },
  { clip: '04-market-coffee.mp4', ss: 0, dur: 3.6, body: `
    <div class="mid">
      <div class="line">At the bar, ask: *"Ist Luisa hier?"*</div>
      <div class="sub">UK: "Ask for Angela" &middot; US: order an "Angel Shot"<br>trained staff will get you out - quietly, no questions</div>
    </div>` },
  { clip: '08-waves-on-stones.mp4', ss: 0, dur: 2.4, body: `
    <div class="mid">
      <div class="line">On the water: *both arms overhead*.</div>
      <div class="sub">wave them - that's the official distress signal</div>
    </div>` },
  { clip: '07-ferry-sea-sunset.mp4', ss: 0, dur: 3.8, body: `
    <div class="mid">
      <div class="hook" style="font-size:76px">One day a woman will make this sign - *hoping someone knows it*.</div>
      <div class="sub">be the reason someone does</div>
      <div class="repost">repost this</div>
      <div class="brand">solo travel, minus the fear</div>
    </div>` },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;padding:0 110px 0 96px}
.scrim{position:absolute;inset:0;background:radial-gradient(90% 55% at 50% 46%, rgba(6,29,21,.66) 0%, rgba(6,29,21,.38) 55%, rgba(6,29,21,0) 100%)}
.mid{position:relative;text-align:center;max-width:860px;transform:translateY(-90px)}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.3em;font-size:26px;color:#efc05a;margin-bottom:34px}
.hook{font-family:'Cormorant Garamond';font-weight:600;font-size:88px;line-height:1.08;color:#f4ecdb}
.hl{font-style:italic;color:#efc05a}
.sub{font-family:'Inter';font-weight:500;font-size:32px;line-height:1.4;color:#e7efe7;opacity:.92;margin-top:36px}
.chip{display:inline-block;font-family:'Archivo';font-weight:800;letter-spacing:.22em;font-size:34px;color:#0e3b2c;background:#efc05a;border-radius:14px;padding:16px 34px;margin-bottom:40px}
.line{font-family:'Cormorant Garamond';font-weight:600;font-size:78px;line-height:1.12;color:#f4ecdb}
.hand{width:400px;height:auto;display:block;margin:0 auto 44px;filter:drop-shadow(0 10px 40px rgba(0,0,0,.5))}
.repost{font-family:'Caveat';font-weight:600;font-size:74px;color:#efc05a;margin-top:44px}
.brand{font-family:'Cormorant Garamond';font-style:italic;font-size:34px;color:#efc05a;margin-top:30px;opacity:.9}
</style></head><body>`;
const foot = `</body></html>`;

// 1) overlays
SEGS.forEach((s, i) => {
  const htmlPath = join(OV, `ov-${i}.html`);
  const pngPath = join(OV, `ov-${i}.png`);
  // raw bodies still carry *emphasis* markers - convert them here (step()
  // output is already converted; it contains no asterisks, so this is safe)
  const body = s.body.replace(/\*([^*<]+?)\*/g, '<span class="hl">$1</span>');
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="scrim"></div>${body}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', i, 'ok');
});

// 2) segments (trim supports a start offset now)
SEGS.forEach((s, i) => {
  const src = join(CLIPS, s.clip);
  if (!existsSync(src)) throw new Error('missing clip ' + src);
  execSync(`ffmpeg -y -loglevel error -i "${src}" -i "${join(OV, `ov-${i}.png`)}" -filter_complex "[0:v]trim=${s.ss}:${s.ss + s.dur},setpts=PTS-STARTPTS,scale=${W}:${H}:flags=lanczos,fps=30[v];[v][1:v]overlay=0:0,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -crf 18 -preset medium "${join(OUT, `seg-${i}.mp4`)}"`, { stdio: 'inherit' });
  console.log('segment', i, 'ok');
});

// 3) concat
const list = SEGS.map((_, i) => `file 'seg-${i}.mp4'`).join('\n');
writeFileSync(join(OUT, 'list.txt'), list);
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-03-silent-signals.mp4`, { stdio: 'inherit' });
console.log('DONE ->', join(OUT, 'daya-reel-03-silent-signals.mp4'));
