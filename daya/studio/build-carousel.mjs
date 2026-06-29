// DAYA SOLO & SAFE carousel builder — JSON spec -> on-brand PNG slides.
// 3:4 (1080x1440), safe-zone, full-bleed photo backgrounds, faceless.
// Layout follows her.solotrip's real carousels: handle top-left, counter top-right,
// eyebrow top, headline bottom. No external design tool — headless Chromium renders.
// Usage: node build-carousel.mjs posts/<slug>.json
// Brand: daya/brand/DESIGN-SYSTEM.md  ·  Carousel rules: daya/skills/viral-carousel/SKILL.md
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, basename, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = process.argv[2];
if (!specPath) { console.error('usage: node build-carousel.mjs posts/<slug>.json'); process.exit(1); }
const post = JSON.parse(readFileSync(specPath, 'utf8'));
const slug = post.slug || basename(specPath).replace(/\.json$/, '');
const handle = post.handle || '→ her.solotrip';
const photosBase = join(__dirname, 'photos', slug);
const outDir = join(__dirname, 'out', slug);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const noEm = (s = '') => String(s).replace(/[—–]/g, '-'); // hard rule: hyphens only
const br = (s = '') => esc(noEm(s)).replace(/\n/g, '<br>');
const photoUrl = (p) => { const abs = isAbsolute(p) ? p : join(photosBase, p); return existsSync(abs) ? `file://${abs}` : null; };
const tipTotal = post.slides.filter(s => s.type === 'tip').length;

const HEAD = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--emerald:#0e3b2c;--emerald-mid:#1d5240;--cream:#f4ecdb;--amber:#cf8a1d;--marigold:#efc05a}
*{margin:0;box-sizing:border-box}
html,body{margin:0;padding:0;width:1080px;height:1440px;overflow:hidden;background:var(--emerald)}
/* 3:4 = 1080x1440 (best carousel size). Safe zone clears Instagram UI:
   ~150 top, 140 right, 180 bottom, 90 left. */
.slide{width:1080px;height:1440px;position:relative;overflow:hidden;display:flex;flex-direction:column;padding:150px 140px 180px 90px;font-family:'Inter',sans-serif;color:var(--cream)}
.cream{background:var(--cream);color:var(--emerald)}
.emerald{background:var(--emerald);color:var(--cream)}
.photo{background-size:cover;background-position:center}
.scrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(5,31,23,.80) 0%,rgba(5,31,23,.12) 27%,rgba(5,31,23,.20) 54%,rgba(5,31,23,.97) 100%)}
.z{position:relative;z-index:2}
.topbar{position:absolute;top:70px;left:90px;right:130px;z-index:3;display:flex;justify-content:space-between;align-items:center}
.handle-sm{font-family:'Archivo';font-weight:800;letter-spacing:.12em;font-size:24px;opacity:.95}
.counter{font-family:'Archivo';font-weight:800;letter-spacing:.16em;font-size:22px;color:var(--marigold)}
.eyebrow{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.2em;font-size:26px;color:var(--marigold)}
.cream .eyebrow{color:var(--amber)}
.tick{width:46px;height:6px;background:var(--marigold);margin:24px 0 0}
h1{font-family:'Cormorant Garamond';font-weight:600;font-size:112px;line-height:1.0}
.sub{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:44px;margin-top:24px;opacity:.97}
.cream .sub{color:var(--emerald-mid)}
.swipe{font-family:'Archivo';font-weight:800;letter-spacing:.14em;text-transform:uppercase;font-size:22px;color:var(--marigold);margin-top:36px}
.big{font-family:'Cormorant Garamond';font-weight:600;font-size:96px;line-height:1.03}
.num{font-family:'Archivo';font-weight:900;font-size:116px;color:var(--marigold);line-height:.85}
.head{font-family:'Cormorant Garamond';font-weight:600;font-size:80px;line-height:1.02;margin-top:12px}
.body{font-family:'Inter';font-weight:400;font-size:38px;line-height:1.42;margin-top:28px;max-width:860px}
.endline{font-family:'Cormorant Garamond';font-weight:600;font-size:84px;line-height:1.08}
.handle{font-family:'Archivo';font-weight:800;letter-spacing:.1em;font-size:32px;margin-top:46px}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:42px;color:var(--marigold);margin-top:14px}
.fill{flex:1}
.grain{position:absolute;inset:0;z-index:4;opacity:.13;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
</style></head><body>`;
const FOOT = `</body></html>`;
const grain = `<div class="grain"></div>`;
const topbar = (counter) => `<div class="topbar"><div class="handle-sm">${esc(handle)}</div>${counter ? `<div class="counter">${esc(counter)}</div>` : '<div></div>'}</div>`;

function render(slide) {
  const url = slide.photo ? photoUrl(slide.photo) : null;
  const cls = url ? 'photo' : (slide.type === 'endcard' ? 'emerald' : 'cream');
  const style = url ? ` style="background-image:url('${url}')"` : '';
  const scrim = url ? `<div class="scrim"></div>` : '';
  let inner = '';
  switch (slide.type) {
    case 'cover':
      inner = `${topbar('')}<div class="z"><div class="eyebrow">${esc(noEm(slide.kicker))}</div><div class="tick"></div></div><div class="fill"></div>` +
        `<div class="z"><h1>${br(slide.headline)}</h1>${slide.sub ? `<div class="sub">${br(slide.sub)}</div>` : ''}<div class="swipe">${esc(slide.swipe || 'swipe →')}</div></div>`;
      break;
    case 'credential':
      inner = `${topbar('')}<div class="z"><div class="eyebrow">${esc(noEm(slide.kicker))}</div><div class="tick"></div></div><div class="fill"></div>` +
        `<div class="z"><div class="big">${br(slide.text)}</div></div>`;
      break;
    case 'tip':
      inner = `${topbar(`${slide.num} / ${String(tipTotal).padStart(2, '0')}`)}<div class="fill"></div>` +
        `<div class="z"><div class="num">${esc(slide.num)}</div><div class="head">${br(slide.head)}</div><div class="body">${br(slide.body)}</div></div>`;
      break;
    case 'endcard':
      inner = `<div class="fill"></div><div class="z"><div class="endline">${br(slide.line)}</div><div class="handle">${esc(slide.handle)}</div><div class="tag">${esc(noEm(slide.tagline))}</div></div><div class="fill"></div>`;
      break;
    default: throw new Error('unknown slide type: ' + slide.type);
  }
  return `<div class="slide ${cls}"${style}>${scrim}${inner}${grain}</div>`;
}

const n = post.slides.length;
post.slides.forEach((slide, idx) => {
  const i = idx + 1;
  const html = HEAD + render(slide) + FOOT;
  const htmlPath = join(outDir, `slide-${String(i).padStart(2, '0')}.html`);
  const pngPath = join(outDir, `slide-${String(i).padStart(2, '0')}.png`);
  writeFileSync(htmlPath, html);
  // Headless Chromium reserves a constant ~87px below content, so render at
  // 1440+87=1527 then crop the tail -> exact 1080x1440, no emerald/white band.
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=4000 --window-size=1080,1527 --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,1080,1440)).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('rendered', basename(pngPath), slide.photo ? (photoUrl(slide.photo) ? '(photo ok)' : `(photo MISSING ${slide.photo})`) : '(no photo)');
});
console.log(`\nDone: ${n} slides -> ${outDir}`);
