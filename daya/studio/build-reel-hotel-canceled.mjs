// IG Reel "IF IT HAPPENS 02" - hotel cancels without warning. Reuses the
// exact 7 photos from the TikTok carousel (build-hotel-canceled.mjs) with
// a slow Ken Burns zoom per scene - zero new credits. Overlays carry the
// FULL copy (phase badge + title + body), same as the carousel, just no
// swipe cue. No audio on purpose (trending sound or ElevenLabs VO added in
// the app). Sorted into 3 phases: BEFORE -> WHEN IT HAPPENS -> AFTER.
// Usage: node build-reel-hotel-canceled.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'hotel-canceled');
const OUT = join(__dirname, 'reels', 'reel-hotel-canceled');
const OV = join(OUT, 'overlays');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OV, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
// step scene = phase badge + big title + body, matching the carousel
const step = (phase, title, body) => `
  <div class="pad">
    <div class="phase">${esc(phase)}</div>
    <div class="ans">${hl(title)}</div>
    <div class="body">${hl(body)}</div>
  </div>`;

const SEGS = [
  { photo: 'cover.png', dur: 3.0, body: `
    <div class="pad">
      <div class="kicker">if it happens &middot; 02</div>
      <div class="cv-title">${hl('Your hotel just *canceled*. Tonight.')}</div>
      <div class="cv-sub">here’s what actually helps</div>
    </div>` },
  { photo: 'q4.png', dur: 4.0, body: step('before you go', 'Save 3 backups *before* you fly.', 'Screenshot two or three nearby hotels while you’re still at home. Then a canceled room is a two-minute fix, not a meltdown.') },
  { photo: 'q1.png', dur: 3.6, body: step('when it happens', 'Screenshot *everything*.', 'The confirmation, the message, the chat. Grab it all now - screens like this have a way of vanishing.') },
  { photo: 'q2.png', dur: 4.2, body: step('when it happens', 'You *still* get your money back.', '“Non-refundable” only stops *you* from canceling. If the hotel cancels, they owe you a full refund - every time.') },
  { photo: 'q3.png', dur: 4.0, body: step('when it happens', 'Call the *platform*, not just the hotel.', 'The hotel shrugs. The app can’t. They have to find you another room - and often pay for your first night.') },
  { photo: 'q5.png', dur: 4.0, body: step('after - if the phone fails', 'Just walk into *another* hotel.', 'Late at night, a person at a front desk sorts it out faster than any helpline. Go in and ask for a room.') },
  { photo: 'end.png', dur: 3.6, body: `
    <div class="pad end">
      <div class="cv-title" style="font-size:80px">${hl('A canceled room ends a *booking* - not a trip.')}</div>
      <div class="cv-sub">save this before you need it</div>
      <div class="brand">solo travel, minus the fear</div>
    </div>` },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.62) 0%, rgba(6,29,21,.42) 38%, rgba(6,29,21,.28) 66%, rgba(6,29,21,.55) 100%)}
.pad{position:absolute;inset:0;padding:230px 120px 240px 120px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;text-align:left}
.pad.end{justify-content:center;align-items:center;text-align:center}
.hl{font-style:italic;color:#efc05a}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:28px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.phase{display:inline-block;font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.16em;font-size:32px;color:#0e3b2c;background:#efc05a;border-radius:14px;padding:18px 34px;box-shadow:0 12px 34px -14px rgba(0,0,0,.6)}
.ans{font-family:'Archivo';font-weight:800;font-size:84px;letter-spacing:-.02em;line-height:1.06;margin-top:44px;max-width:840px;text-shadow:0 3px 28px rgba(0,0,0,.75)}
.body{font-family:'Inter';font-weight:500;font-size:40px;line-height:1.5;color:#f4ecdb;margin-top:38px;max-width:820px;text-shadow:0 2px 22px rgba(0,0,0,.8)}
.cv-title{font-family:'Archivo';font-weight:800;font-size:92px;letter-spacing:-.02em;line-height:1.08;margin-top:30px;max-width:840px;text-shadow:0 3px 28px rgba(0,0,0,.75)}
.cv-sub{font-family:'Inter';font-weight:500;font-size:36px;color:#f4ecdb;margin-top:34px;text-shadow:0 2px 22px rgba(0,0,0,.8)}
.brand{font-family:'Cormorant Garamond';font-style:italic;font-size:38px;color:#efc05a;margin-top:44px;opacity:.92;text-shadow:0 2px 20px rgba(0,0,0,.7)}
</style></head><body>`;
const foot = `</body></html>`;

// 1) overlays (transparent PNGs) - dark scrim baked in so text stays readable
SEGS.forEach((s, i) => {
  const htmlPath = join(OV, `ov-${i}.html`);
  const pngPath = join(OV, `ov-${i}.png`);
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="scrim"></div>${s.body}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', i, 'ok');
});

// 2) segments: Ken Burns zoom per photo + overlay
SEGS.forEach((s, i) => {
  const photo = join(PHOTOS, s.photo);
  if (!existsSync(photo)) throw new Error('missing photo ' + photo);
  const ov = join(OV, `ov-${i}.png`);
  const out = join(OUT, `seg-${i}.mp4`);
  const frames = Math.round(30 * s.dur);
  execSync(`ffmpeg -y -loglevel error -i "${photo}" -i "${ov}" -filter_complex "[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,zoompan=z='min(1+0.0011*on,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${W}x${H}:fps=30[v];[v][1:v]overlay=0:0,format=yuv420p[out]" -map "[out]" -frames:v ${frames} -an -c:v libx264 -crf 18 -preset medium "${out}"`, { stdio: 'inherit' });
  console.log('segment', i, 'ok');
});

// 3) concat
const list = SEGS.map((_, i) => `file 'seg-${i}.mp4'`).join('\n');
writeFileSync(join(OUT, 'list.txt'), list);
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-hotel-canceled.mp4`, { stdio: 'inherit' });
console.log('DONE ->', join(OUT, 'daya-reel-hotel-canceled.mp4'));
