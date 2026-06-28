// DAYA SOLO & SAFE carousel builder — JSON spec -> on-brand PNG slides.
// Supports optional full-bleed photo backgrounds (faceless: woman from behind / landscape).
// No Canva, no external design tool. Renders with the pre-installed headless Chromium.
// Usage: node build-carousel.mjs posts/<slug>.json
// Brand source of truth: daya/brand/DESIGN-SYSTEM.md
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
const photosBase = join(__dirname, 'photos', slug);
const outDir = join(__dirname, 'out', slug);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const noEm = (s = '') => String(s).replace(/[—–]/g, '-'); // hard rule: hyphens only
const br = (s = '') => esc(noEm(s)).replace(/\n/g, '<br>');
const photoUrl = (p) => { const abs = isAbsolute(p) ? p : join(photosBase, p); return existsSync(abs) ? `file://${abs}` : null; };

const HEAD = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--emerald:#0e3b2c;--emerald-mid:#1d5240;--bg:#f4ecdb;--cream:#f4ecdb;--amber:#cf8a1d;--marigold:#efc05a}
*{margin:0;box-sizing:border-box}
/* 3:4 = 1080x1440 (best carousel size). Safe zone: text clears Instagram UI -
   180px bottom (caption), ~130px right (like/comment/share), 90px left, 150px top. */
.slide{width:1080px;height:1440px;position:relative;overflow:hidden;padding:150px 140px 180px 90px;display:flex;flex-direction:column;font-family:'Inter',sans-serif}
.cream{background:var(--bg);color:var(--emerald)}
.emerald{background:var(--emerald);color:var(--cream)}
.photo{color:var(--cream);justify-content:flex-end;background-size:cover;background-position:center}
.scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,31,23,.95) 0%,rgba(5,31,23,.62) 42%,rgba(5,31,23,.18) 100%)}
.content{position:relative;z-index:2}
.counter{position:absolute;top:70px;right:130px;z-index:3;font-family:'Archivo';font-weight:800;letter-spacing:.14em;font-size:22px;color:var(--marigold)}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.18em;font-size:26px;color:var(--amber)}
.photo .kicker{color:var(--marigold)}
.tick{width:46px;height:6px;background:var(--marigold);margin:0 0 30px}
h1{font-family:'Cormorant Garamond';font-weight:600;font-size:104px;line-height:1.02}
.big{font-family:'Cormorant Garamond';font-weight:600;font-size:88px;line-height:1.04}
.sub{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:42px;color:var(--emerald-mid);margin-top:26px}
.photo .sub{color:#e7efe7}
.num{font-family:'Archivo';font-weight:900;font-size:128px;color:var(--marigold);line-height:.85}
.head{font-family:'Cormorant Garamond';font-weight:600;font-size:74px;line-height:1.04;margin-top:18px}
.body{font-family:'Inter';font-weight:400;font-size:38px;line-height:1.42;margin-top:30px;max-width:840px}
.photo .body{color:#efe8d8}
.spacer{flex:1}
.swipe{font-family:'Archivo';font-weight:800;letter-spacing:.14em;text-transform:uppercase;font-size:22px;color:var(--marigold);position:relative;z-index:2}
.endline{font-family:'Cormorant Garamond';font-weight:600;font-size:78px;line-height:1.08}
.handle{font-family:'Archivo';font-weight:800;letter-spacing:.1em;font-size:32px;margin-top:48px}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:var(--marigold);margin-top:14px}
.grain{position:absolute;inset:0;z-index:4;opacity:.14;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
</style></head><body>`;
const FOOT = `</body></html>`;
const counter = (i, n) => `<div class="counter">${String(i).padStart(2,'0')} / ${String(n).padStart(2,'0')}</div>`;
const grain = `<div class="grain"></div>`;

function inner(slide) {
  switch (slide.type) {
    case 'cover':
      return `<div class="content"><div class="kicker">${esc(noEm(slide.kicker))}</div><div class="tick"></div><h1>${br(slide.headline)}</h1>${slide.sub?`<div class="sub">${br(slide.sub)}</div>`:''}</div>`;
    case 'credential':
      return `<div class="content"><div class="kicker">${esc(noEm(slide.kicker))}</div><div class="tick"></div><div class="big">${br(slide.text)}</div></div>`;
    case 'tip':
      return `<div class="content"><div class="num">${esc(slide.num)}</div><div class="head">${br(slide.head)}</div><div class="body">${br(slide.body)}</div></div>`;
    case 'endcard':
      return `<div class="content"><div class="endline">${br(slide.line)}</div><div class="handle">${esc(slide.handle)}</div><div class="tag">${esc(noEm(slide.tagline))}</div></div>`;
    default: throw new Error('unknown slide type: ' + slide.type);
  }
}

function render(slide, i, n) {
  const url = slide.photo ? photoUrl(slide.photo) : null;
  const isCover = slide.type === 'cover';
  if (url) {
    const swipe = isCover ? `<div class="swipe">${esc(slide.swipe||'swipe →')}</div>` : '';
    return `<div class="slide photo" style="background-image:url('${url}')">${counter(i,n)}<div class="scrim"></div><div class="spacer"></div>${inner(slide)}${swipe?`<div style="height:34px"></div>`+swipe:''}${grain}</div>`;
  }
  // no photo -> cream card (emerald endcard)
  const cls = slide.type === 'endcard' ? 'emerald' : 'cream';
  const swipe = isCover ? `<div class="spacer"></div><div class="swipe">${esc(slide.swipe||'swipe →')}</div>` : '';
  const center = isCover || slide.type === 'credential' || slide.type === 'endcard' ? `<div class="spacer"></div>` : `<div class="spacer"></div>`;
  return `<div class="slide ${cls}">${counter(i,n)}${center}${inner(slide)}${swipe||'<div class="spacer"></div>'}${grain}</div>`;
}

const n = post.slides.length;
post.slides.forEach((slide, idx) => {
  const i = idx + 1;
  const html = HEAD + render(slide, i, n) + FOOT;
  const htmlPath = join(outDir, `slide-${String(i).padStart(2,'0')}.html`);
  const pngPath = join(outDir, `slide-${String(i).padStart(2,'0')}.png`);
  writeFileSync(htmlPath, html);
  execSync(`${CHROME} --headless --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --virtual-time-budget=4000 --window-size=1080,1440 --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  console.log('rendered', basename(pngPath), slide.photo ? `(photo: ${photoUrl(slide.photo)?'ok':'MISSING '+slide.photo})` : '(no photo)');
});
console.log(`\nDone: ${n} slides -> ${outDir}`);
