// IG Reel "IF IT HAPPENS 02" - hotel cancels without warning. Reuses the
// exact 7 photos from the TikTok carousel (build-hotel-canceled.mjs) with
// a slow Ken Burns zoom per scene - zero new credits. No audio on purpose
// (trending sound or ElevenLabs VO gets added in the app, same as reel-03).
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
const chip = (label, text) => `
  <div class="mid">
    <div class="chip">${esc(label)}</div>
    <div class="line">${hl(text)}</div>
  </div>`;

const SEGS = [
  { photo: 'cover.png', dur: 2.8, body: `
    <div class="mid">
      <div class="kicker">if it happens &middot; 02</div>
      <div class="hook">Your hotel just *canceled*. Tonight.</div>
      <div class="sub">here’s what actually helps</div>
    </div>` },
  { photo: 'q1.png', dur: 2.4, body: chip('STEP 1', 'Screenshot *everything*.') },
  { photo: 'q2.png', dur: 2.6, body: chip('STEP 2', 'You *still* get your money back.') },
  { photo: 'q3.png', dur: 2.6, body: chip('STEP 3', 'Call the *platform*, not just the hotel.') },
  { photo: 'q4.png', dur: 2.6, body: chip('STEP 4', 'Save 3 backups *before* you fly.') },
  { photo: 'q5.png', dur: 2.4, body: chip('STEP 5', 'Just walk into *another* hotel.') },
  { photo: 'end.png', dur: 3.4, body: `
    <div class="mid">
      <div class="hook" style="font-size:74px">A canceled room ends a *booking* - not a trip.</div>
      <div class="sub">save this before you need it</div>
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
.hook{font-family:'Cormorant Garamond';font-weight:600;font-size:86px;line-height:1.1;color:#f4ecdb}
.hl{font-style:italic;color:#efc05a}
.sub{font-family:'Inter';font-weight:500;font-size:32px;color:#e7efe7;opacity:.92;margin-top:36px}
.chip{display:inline-block;font-family:'Archivo';font-weight:800;letter-spacing:.22em;font-size:34px;color:#0e3b2c;background:#efc05a;border-radius:14px;padding:16px 34px;margin-bottom:40px}
.line{font-family:'Archivo';font-weight:800;font-size:66px;letter-spacing:-.01em;line-height:1.14;color:#f4ecdb}
.brand{font-family:'Cormorant Garamond';font-style:italic;font-size:34px;color:#efc05a;margin-top:44px;opacity:.9}
</style></head><body>`;
const foot = `</body></html>`;

// 1) overlays (transparent PNGs)
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
  execSync(`ffmpeg -y -loglevel error -i "${photo}" -i "${ov}" -filter_complex "[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,zoompan=z='min(1+0.0014*on,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${W}x${H}:fps=30[v];[v][1:v]overlay=0:0,format=yuv420p[out]" -map "[out]" -frames:v ${frames} -an -c:v libx264 -crf 18 -preset medium "${out}"`, { stdio: 'inherit' });
  console.log('segment', i, 'ok');
});

// 3) concat
const list = SEGS.map((_, i) => `file 'seg-${i}.mp4'`).join('\n');
writeFileSync(join(OUT, 'list.txt'), list);
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-hotel-canceled.mp4`, { stdio: 'inherit' });
console.log('DONE ->', join(OUT, 'daya-reel-hotel-canceled.mp4'));
