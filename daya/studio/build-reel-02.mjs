// Reel 02 "What to do if your phone is stolen abroad" - cuts the 9 generated
// clips into a 16s IG reel (1080x1920) with brand text overlays.
// Overlays: HTML -> transparent PNG (Chrome) -> ffmpeg overlay + concat.
// No audio on purpose: trending sound gets added in the IG app for reach.
// Usage: node build-reel-02.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIPS = join(__dirname, 'reels', 'reel-01-green-flags');
const OUT = join(__dirname, 'reels', 'reel-02-phone-stolen');
const OV = join(OUT, 'overlays');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OV, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

// segment = { clip, dur, overlay html body }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

const chip = (min, text) => `
  <div class="mid">
    <div class="chip">${min}</div>
    <div class="line">${hl(text)}</div>
  </div>`;

const SEGS = [
  { clip: '01-bluehour-lane.mp4', dur: 2.8, body: `
    <div class="mid">
      <div class="kicker">if it happens</div>
      <div class="hook">What to do if your phone is *stolen* abroad</div>
      <div class="sub">the first 30 minutes, minute by minute</div>
    </div>` },
  { clip: '03-evening-square.mp4', dur: 2.2, body: chip('MIN 0-5', 'Mark it lost. *Find My* works from any browser.') },
  { clip: '04-market-coffee.mp4', dur: 2.2, body: chip('MIN 5-10', 'Block your cards. One call: *+49 116 116*.') },
  { clip: '05-tram.mp4', dur: 2.2, body: chip('MIN 10-15', 'Change your *email password* first - the master key.') },
  { clip: '02-carfree-morning-street.mp4', dur: 2.2, body: chip('MIN 15-25', 'Police report. Case number *in writing*.') },
  { clip: '07-ferry-sea-sunset.mp4', dur: 2.2, body: chip('MIN 25-30', "Text your person: *I'm safe.* Then breathe.") },
  { clip: '08-waves-on-stones.mp4', dur: 3.0, body: `
    <div class="mid">
      <div class="hook" style="font-size:74px">You won't remember this under stress. <span class="hl">That's the point.</span></div>
      <div class="sub">it's one page in our free playbook - link in bio</div>
      <div class="brand">solo travel, minus the fear</div>
    </div>` },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Archivo:wght@700;800&family=Inter:wght@500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;padding:0 110px 0 96px}
.scrim{position:absolute;inset:0;background:radial-gradient(90% 55% at 50% 46%, rgba(6,29,21,.62) 0%, rgba(6,29,21,.34) 55%, rgba(6,29,21,0) 100%)}
.mid{position:relative;text-align:center;max-width:860px;transform:translateY(-90px)}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.3em;font-size:26px;color:#efc05a;margin-bottom:34px}
.hook{font-family:'Cormorant Garamond';font-weight:600;font-size:88px;line-height:1.08;color:#f4ecdb}
.hook .hl{font-style:italic;color:#efc05a}
.sub{font-family:'Inter';font-weight:500;font-size:32px;color:#e7efe7;opacity:.92;margin-top:36px}
.chip{display:inline-block;font-family:'Archivo';font-weight:800;letter-spacing:.22em;font-size:34px;color:#0e3b2c;background:#efc05a;border-radius:14px;padding:16px 34px;margin-bottom:42px}
.line{font-family:'Cormorant Garamond';font-weight:600;font-size:78px;line-height:1.12;color:#f4ecdb}
.line .hl{font-style:italic;color:#efc05a}
.brand{font-family:'Cormorant Garamond';font-style:italic;font-size:34px;color:#efc05a;margin-top:44px;opacity:.9}
</style></head><body>`;
const foot = `</body></html>`;

// 1) render overlays (transparent PNGs)
SEGS.forEach((s, i) => {
  const htmlPath = join(OV, `ov-${i}.html`);
  const pngPath = join(OV, `ov-${i}.png`);
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="scrim"></div>${s.body}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', i, 'ok');
});

// 2) cut each segment: trim, scale 720x1280 -> 1080x1920, overlay, normalize
SEGS.forEach((s, i) => {
  const src = join(CLIPS, s.clip);
  if (!existsSync(src)) throw new Error('missing clip ' + src);
  execSync(`ffmpeg -y -loglevel error -i "${src}" -i "${join(OV, `ov-${i}.png`)}" -filter_complex "[0:v]trim=0:${s.dur},setpts=PTS-STARTPTS,scale=${W}:${H}:flags=lanczos,fps=30[v];[v][1:v]overlay=0:0,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -crf 18 -preset medium "${join(OUT, `seg-${i}.mp4`)}"`, { stdio: 'inherit' });
  console.log('segment', i, 'ok');
});

// 3) concat
const list = SEGS.map((_, i) => `file 'seg-${i}.mp4'`).join('\n');
writeFileSync(join(OUT, 'list.txt'), list);
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-02-phone-stolen.mp4`, { stdio: 'inherit' });
console.log('DONE ->', join(OUT, 'daya-reel-02-phone-stolen.mp4'));
