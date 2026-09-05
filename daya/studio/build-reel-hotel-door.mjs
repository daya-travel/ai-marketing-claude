// Reel "Seven hotel door tricks" - her.solotrip, 1080x1920, 47 s, 9 scenes.
//
// STATUS: DO NOT PUBLISH THE CURRENT OUTPUT. Scenes 1, 2 and 4 are wrong -
// the generated footage drapes cloth over the hardware instead of packing it
// into the swing bar or wedging it behind the lever, so it teaches the wrong
// thing. 24 generations, none correct; the failure repeats, it is not luck.
// The frame, the timings and the text layer are fine. Drop real phone footage
// into photos/hotel-door/clips/ as clip-hook.mp4, clip-swingbar.mp4 and
// clip-towel.mp4 and rerun - nothing else needs to change.
// See daya/content/2026-08-14-reel-04-hotel-door.md for the full writeup.
//
// Angle: the viral list is repeated everywhere, so we do not repeat it. We say
// which two of the seven do something mechanically, and why the rest are in
// your way. That is the part that gets saved.
//
// FACT BASE (checked 14.08., every claim traced to a source before it went on
// screen - no claim here was reasoned out, all of it was read):
//   - The viral list: @victorias.way, 01.10.2023, 15.6 M views, seven tips
//     (do-not-disturb sign, lock, peephole, washcloth in the swing bar,
//     ironing board, towel behind the lever, hanger). Newsweek 1833131.
//   - Swing bar defeat: a stiff flat object (do-not-disturb card, card stock,
//     thin plastic) is pushed through the door gap under the bar and slides it
//     off its knob. Documented by Fire Engineering (forcible entry training)
//     and by Toool, the lockpickers' association. Cloth packed into the slot
//     blocks the slide.
//   - Under-door tool: a hooked tool goes under the door and pulls the lever
//     down from outside. A rolled towel wedged behind the lever fills the
//     space the hook needs. Covert-entry writeup at wehackpeople.
//   - The fire objection to the ironing board is not ours - it is the top
//     criticism under the original video (Newsweek, same piece).
//   - Portable door lock: recommended by security writers as a travel layer.
//     NO PRICE ON SCREEN - we did not verify one, so we do not claim one.
//
// Photos: Higgsfield soul_2, deliberately shot-on-a-phone look, no grading.
// Scenes 1, 2 and 4 are real 5 s clips (seedance_2_5 omni_reference, 1080p);
// the rest are stills with a slow Ken Burns push.
// No audio baked in - VO goes in from ElevenLabs, see the content doc.
// Usage: node build-reel-hotel-door.mjs
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONT_CSS } from './fonts.mjs';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, 'photos', 'hotel-door');
const CLIPS = join(PHOTOS, 'clips');
const MARK = join(__dirname, 'photos', 'daya-grid', 'daya-mark-cream.png');
const OUT = join(__dirname, 'reels', 'reel-hotel-door');
const OV = join(OUT, 'overlays');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OV, { recursive: true });
const W = 1080, H = 1920, RESERVE = 87;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

// verdict badge: marigold = do this, outline = do not
const scene = (badge, kind, title, body) => `
  <div class="pad">
    <div class="badge ${kind}">${esc(badge)}</div>
    <div class="ttl">${hl(title)}</div>
    ${body ? `<div class="body">${hl(body)}</div>` : ''}
  </div>`;

// Scene lengths are not guessed - they come from running silencedetect over
// the ElevenLabs voiceover (clips/vo-elevenlabs.mp3, 44.93 s) and cutting on
// its pauses, so every cut lands where the voice takes a breath. Redo the
// detection if the voiceover is ever re-recorded:
//   ffmpeg -i clips/vo-elevenlabs.mp3 -af silencedetect=noise=-35dB:d=0.40 -f null -
const SEGS = [
  { src: 'clip-hook.mp4', still: '01-hook.png', dur: 4.02, body: `
    <div class="pad">
      <div class="kicker">her.solotrip</div>
      <div class="cv-ttl">${hl('Seven hotel door tricks are going around.')}</div>
      <div class="cv-sub">${hl('*Only two* of them actually work.')}</div>
    </div>` },
  { src: 'clip-swingbar.mp4', still: '22-swingbar-b.png', dur: 4.18,
    body: scene('this one works', 'yes', 'Wrap a washcloth around the *swing bar*.', '') },
  // pre-cropped (see photos/hotel-door): the full plate puts the swing bar so
  // high that a centred Ken Burns crop cuts it off, and the bar is the point.
  { src: '33-swingbar-crop.png', dur: 6.76,
    body: scene('this one works', 'yes', 'Why it matters.', 'A stiff card pushed through the door gap can slide that bar off its knob. Wrap cloth around it and the card cannot move it.') },
  { src: 'clip-towel.mp4', still: '04-towel-a.png', dur: 4.24,
    body: scene('this one works', 'yes', 'Roll a towel and wedge it *behind the handle*.', '') },
  { src: '25-towel-c.png', dur: 6.13,
    body: scene('this one works', 'yes', 'Why it matters.', 'There is a tool that slides under the door and hooks the handle down from outside. The towel fills the space it needs.') },
  { src: '31-ironing-c.png', dur: 5.67,
    body: scene('skip this one', 'no', 'The ironing board across the door.', 'At three in the morning, in the dark, it stands between you and the way out.') },
  { src: '31-ironing-c.png', dur: 5.55, z0: 1.094, body: `
    <div class="pad">
      <div class="ttl" style="margin-top:0">${hl('If you cannot open *your own door* in two seconds, it is not safety.')}</div>
    </div>` },
  { src: '07-lock.png', dur: 6.18,
    body: scene('worth buying', 'yes', 'A *portable door lock*.', 'It fits in a pocket and comes off in one second.') },
  // Endcard is a solid brand card, not the photo. On the photo the cream mark
  // landed on the woman's white shirt and read as a print on it - checked the
  // rendered frame, that is not a guess. Emerald also matches how the carousels
  // close, so the sign-off looks the same across formats.
  { src: '32-end-c.png', dur: 4.27, body: `
    <div class="solid"></div>
    <div class="pad end">
      <div class="kicker" style="position:absolute;top:150px;left:0;right:0;text-align:center">her.solotrip</div>
      <div class="cv-ttl" style="font-size:84px">${hl('Save this before your *next hotel*.')}</div>
      <div class="body" style="text-align:center;max-width:760px">DAYA checks in at the times you pick. If you do not answer, she tells the people you chose.</div>
      <div class="lockup">
        ${existsSync(MARK) ? `<img src="file://${MARK}">` : ''}
        <span>Daya</span>
      </div>
    </div>` },
];

const head = `<!doctype html><html><head><meta charset="utf-8">
<style>
${FONT_CSS}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f4ecdb}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg, rgba(6,29,21,.72) 0%, rgba(6,29,21,.4) 34%, rgba(6,29,21,.3) 60%, rgba(6,29,21,.68) 100%)}
.pad{position:absolute;inset:0;padding:250px 110px 430px 110px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;text-align:left}
.pad.end{justify-content:center;align-items:center;text-align:center}
.hl{font-style:italic;color:#efc05a}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.26em;font-size:28px;color:#efc05a;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.badge{display:inline-block;font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.16em;font-size:31px;border-radius:14px;padding:18px 34px;box-shadow:0 12px 34px -14px rgba(0,0,0,.6)}
.badge.yes{color:#0e3b2c;background:#efc05a}
.badge.no{color:#f4ecdb;background:rgba(6,29,21,.55);border:3px solid #f4ecdb}
.ttl{font-family:'Archivo';font-weight:800;font-size:82px;letter-spacing:-.02em;line-height:1.06;margin-top:42px;max-width:850px;text-shadow:0 3px 28px rgba(0,0,0,.8)}
.body{font-family:'Inter';font-weight:500;font-size:40px;line-height:1.48;color:#f4ecdb;margin-top:36px;max-width:830px;text-shadow:0 2px 22px rgba(0,0,0,.85)}
.cv-ttl{font-family:'Archivo';font-weight:800;font-size:92px;letter-spacing:-.02em;line-height:1.07;margin-top:26px;max-width:860px;text-shadow:0 3px 28px rgba(0,0,0,.8)}
.cv-sub{font-family:'Inter';font-weight:600;font-size:44px;color:#f4ecdb;margin-top:34px;text-shadow:0 2px 22px rgba(0,0,0,.85)}
.solid{position:absolute;inset:0;background:linear-gradient(160deg,#0a2b20 0%,#0e3b2c 46%,#14503c 100%)}
.lockup{display:flex;align-items:center;gap:28px;margin-top:56px}
.lockup img{height:88px}
.lockup span{font-family:'Cormorant Garamond';font-weight:600;text-transform:uppercase;letter-spacing:.2em;font-size:54px;color:#f4ecdb;line-height:1}
.wm{position:absolute;top:96px;left:110px;font-family:'Archivo';font-weight:800;letter-spacing:.16em;font-size:26px;color:#efc05a;opacity:.9;text-shadow:0 2px 18px rgba(0,0,0,.8)}
</style></head><body>`;
const foot = `</body></html>`;

// 1) overlays (transparent PNG per scene, scrim baked in so text stays legible)
SEGS.forEach((s, i) => {
  const htmlPath = join(OV, `ov-${i}.html`);
  const pngPath = join(OV, `ov-${i}.png`);
  // @her.solotrip watermark on every scene except cover (has its own kicker) and endcard
  const wm = i === 0 || i === SEGS.length - 1 ? '' : `<div class="wm">@her.solotrip</div>`;
  writeFileSync(htmlPath, head + `<div class="wrap"><div class="scrim"></div>${s.body}${wm}</div>` + foot);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=00000000 --virtual-time-budget=5000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('overlay', i, 'ok');
});

// 2) segments. Video scenes keep their own motion, stills get a slow push.
SEGS.forEach((s, i) => {
  // Each clip falls back to the still it was animated from, so the reel still
  // builds on a machine that only has the photos.
  let isClip = s.src.endsWith('.mp4');
  let src = isClip ? join(CLIPS, s.src) : join(PHOTOS, s.src);
  if (isClip && !existsSync(src)) {
    console.warn('no clip', s.src, '- falling back to still', s.still);
    isClip = false;
    src = join(PHOTOS, s.still);
  }
  if (!existsSync(src)) throw new Error('missing source ' + src);
  const ov = join(OV, `ov-${i}.png`);
  const out = join(OUT, `seg-${i}.mp4`);
  const frames = Math.round(30 * s.dur);
  // z0 lets two consecutive scenes on the SAME photo (the ironing board beat)
  // carry the zoom on instead of snapping back to the start.
  const z0 = s.z0 ?? 1.0;
  const vf = isClip
    ? `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=30[v]`
    : `[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,zoompan=z='${z0}+0.00055*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${W}x${H}:fps=30[v]`;
  execSync(`ffmpeg -y -loglevel error ${isClip ? '' : '-loop 1'} -i "${src}" -i "${ov}" -filter_complex "${vf};[v][1:v]overlay=0:0,format=yuv420p[out]" -map "[out]" -frames:v ${frames} -an -c:v libx264 -crf 18 -preset medium -r 30 "${out}"`, { stdio: 'inherit' });
  console.log('segment', i, 'ok');
});

// 3) concat -> CLEAN cut (no audio, for a trending sound or a re-recorded VO)
writeFileSync(join(OUT, 'list.txt'), SEGS.map((_, i) => `file 'seg-${i}.mp4'`).join('\n'));
execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy daya-reel-hotel-door-CLEAN.mp4`, { stdio: 'inherit' });

// 4) same cut with the ElevenLabs voiceover laid under it. The video runs a
// little past the last word on purpose so the endcard is readable at the end.
const VO = join(CLIPS, 'vo-elevenlabs.mp3');
if (existsSync(VO)) {
  // The voice is 44.9 s and the cut is 47.0 s, so the tail gets padded with
  // silence and the endcard survives. apad needs an explicit whole_dur here -
  // `-af apad -shortest` never terminates, it spins forever writing silence.
  const total = SEGS.reduce((a, s) => a + s.dur, 0).toFixed(2);
  execSync(`cd "${OUT}" && ffmpeg -y -loglevel error -i daya-reel-hotel-door-CLEAN.mp4 -i "${VO}" -c:v copy -c:a aac -b:a 192k -af apad=whole_dur=${total} -t ${total} -map 0:v:0 -map 1:a:0 daya-reel-hotel-door-VO.mp4`, { stdio: 'inherit' });
  console.log('DONE ->', join(OUT, 'daya-reel-hotel-door-VO.mp4'));
}
console.log('DONE ->', join(OUT, 'daya-reel-hotel-door-CLEAN.mp4'));
