// DAYA SOLO & SAFE carousel builder — JSON spec -> 8 on-brand PNG slides.
// No Canva, no external design tool. Renders with the pre-installed headless Chromium.
// Usage: node build-carousel.mjs posts/<slug>.json
// Brand source of truth: daya/brand/DESIGN-SYSTEM.md
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = process.argv[2];
if (!specPath) { console.error('usage: node build-carousel.mjs posts/<slug>.json'); process.exit(1); }
const post = JSON.parse(readFileSync(specPath, 'utf8'));
const slug = post.slug || basename(specPath).replace(/\.json$/, '');
const outDir = join(__dirname, 'out', slug);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const br = (s = '') => esc(s).replace(/\n/g, '<br>');
// Hard rule: hyphens only, never em-dashes — guard against accidental — in any spec text.
const noEmDash = (s = '') => String(s).replace(/[—–]/g, '-');

const HEAD = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--emerald:#0e3b2c;--emerald-mid:#1d5240;--bg:#f4ecdb;--cream:#f4ecdb;--amber:#cf8a1d;--marigold:#efc05a}
*{margin:0;box-sizing:border-box}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;padding:96px 90px;display:flex;flex-direction:column;font-family:'Inter',sans-serif}
.cream{background:var(--bg);color:var(--emerald)}
.emerald{background:var(--emerald);color:var(--cream)}
.counter{position:absolute;top:64px;right:90px;font-family:'Archivo';font-weight:800;letter-spacing:.14em;font-size:22px;color:var(--marigold)}
.kicker{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.18em;font-size:26px;color:var(--amber)}
.tick{width:46px;height:6px;background:var(--marigold);margin:0 0 30px}
h1{font-family:'Cormorant Garamond';font-weight:600;font-size:104px;line-height:1.02}
.big{font-family:'Cormorant Garamond';font-weight:600;font-size:88px;line-height:1.04}
.sub{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:42px;color:var(--emerald-mid);margin-top:26px}
.num{font-family:'Archivo';font-weight:900;font-size:128px;color:var(--marigold);line-height:.85}
.head{font-family:'Cormorant Garamond';font-weight:600;font-size:74px;line-height:1.04;margin-top:18px}
.body{font-family:'Inter';font-weight:400;font-size:38px;line-height:1.42;margin-top:30px;max-width:820px}
.spacer{flex:1}
.swipe{font-family:'Archivo';font-weight:800;letter-spacing:.14em;text-transform:uppercase;font-size:22px;color:var(--marigold)}
.endline{font-family:'Cormorant Garamond';font-weight:600;font-size:78px;line-height:1.08}
.handle{font-family:'Archivo';font-weight:800;letter-spacing:.1em;font-size:32px;margin-top:48px}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;color:var(--marigold);margin-top:14px}
.grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
</style></head><body>`;
const FOOT = `</body></html>`;
const counter = (i, n) => `<div class="counter">${String(i).padStart(2,'0')} / ${String(n).padStart(2,'0')}</div>`;
const grain = `<div class="grain"></div>`;

function render(slide, i, n) {
  const c = counter(i, n);
  switch (slide.type) {
    case 'cover':
      return `<div class="slide cream">${c}<div class="spacer"></div><div class="kicker">${esc(noEmDash(slide.kicker))}</div><div class="tick"></div><h1>${br(noEmDash(slide.headline))}</h1>${slide.sub?`<div class="sub">${br(noEmDash(slide.sub))}</div>`:''}<div class="spacer"></div><div class="swipe">${esc(slide.swipe||'swipe →')}</div>${grain}</div>`;
    case 'credential':
      return `<div class="slide cream">${c}<div class="spacer"></div><div class="kicker">${esc(noEmDash(slide.kicker))}</div><div class="tick"></div><div class="big">${br(noEmDash(slide.text))}</div><div class="spacer"></div>${grain}</div>`;
    case 'tip':
      return `<div class="slide cream">${c}<div class="spacer"></div><div class="num">${esc(slide.num)}</div><div class="head">${br(noEmDash(slide.head))}</div><div class="body">${br(noEmDash(slide.body))}</div><div class="spacer"></div>${grain}</div>`;
    case 'endcard':
      return `<div class="slide emerald">${c}<div class="spacer"></div><div class="endline">${br(noEmDash(slide.line))}</div><div class="handle">${esc(slide.handle)}</div><div class="tag">${esc(noEmDash(slide.tagline))}</div><div class="spacer"></div>${grain}</div>`;
    default:
      throw new Error('unknown slide type: ' + slide.type);
  }
}

const n = post.slides.length;
post.slides.forEach((slide, idx) => {
  const i = idx + 1;
  const html = HEAD + render(slide, i, n) + FOOT;
  const htmlPath = join(outDir, `slide-${String(i).padStart(2,'0')}.html`);
  const pngPath = join(outDir, `slide-${String(i).padStart(2,'0')}.png`);
  writeFileSync(htmlPath, html);
  execSync(`${CHROME} --headless --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --virtual-time-budget=3500 --window-size=1080,1350 --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  console.log('rendered', pngPath);
});
console.log(`\nDone: ${n} slides -> ${outDir}`);
