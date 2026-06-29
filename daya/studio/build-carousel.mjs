// DAYA SOLO & SAFE carousel builder — JSON spec -> on-brand PNG slides.
// Matches her.solotrip's real cover: DAYA mark + handle top-left, START HERE / counter top-right,
// eyebrow + italic Cormorant lead + Archivo-heavy headline (gold-highlighted keywords) + gold tick
// + Inter body + small "swipe". 3:4 (1080x1440), safe zone, full-bleed photo + dusk scrim.
// Markup: *word* in any text -> gold highlight. \n -> line break.
// Usage: node build-carousel.mjs posts/<slug>.json
// Brand: daya/brand/DESIGN-SYSTEM.md  ·  Rules: daya/skills/viral-carousel/SKILL.md
// NOTE: the DAYA mark here is an SVG approximation; swap in the real logo PNG when available.
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
const handle = post.handle || 'her.solotrip';
const photosBase = join(__dirname, 'photos', slug);
const outDir = join(__dirname, 'out', slug);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const noEm = (s = '') => String(s).replace(/[—–]/g, '-'); // hard rule: hyphens only
const fmt = (s = '') => esc(noEm(s)).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>').replace(/\n/g, '<br>');
const photoUrl = (p) => { const abs = isAbsolute(p) ? p : join(photosBase, p); return existsSync(abs) ? `file://${abs}` : null; };
const tipTotal = post.slides.filter(s => s.type === 'tip').length;

// Real DAYA mark (icon glyph cropped from the brand lockup). Cream = for dark/photo slides.
const MARK = `<img class="mark" src="file://${join(__dirname, 'assets', 'daya-mark-cream.png')}">`;
const SWARR = `<svg width="42" height="18" viewBox="0 0 42 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9 H34 M27 3 L36 9 L27 15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICONS = {
  bookmark: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  send: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
};
const ctaHtml = (ctas = []) => ctas.length ? `<div class="ctas">${ctas.map((c, i) => `<div class="cta ${i === 0 ? 'fill' : 'outline'}">${ICONS[c.icon] || ''}<span>${esc(noEm(c.text))}</span></div>`).join('')}</div>` : '';

const HEAD = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600&family=Caveat:wght@600;700&display=swap" rel="stylesheet">
<style>
:root{--emerald:#0e3b2c;--emerald-mid:#1d5240;--cream:#f4ecdb;--amber:#cf8a1d;--marigold:#efc05a}
*{margin:0;box-sizing:border-box}
html,body{margin:0;padding:0;width:1080px;height:1440px;overflow:hidden;background:var(--emerald)}
.slide{width:1080px;height:1440px;position:relative;overflow:hidden;display:flex;flex-direction:column;padding:150px 140px 170px 90px;font-family:'Inter',sans-serif;color:var(--cream)}
.cream{background:var(--cream);color:var(--emerald)}
.emerald{background:var(--emerald);color:var(--cream)}
.photo{background-size:cover;background-position:center}
.scrim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(5,31,23,.74) 0%,rgba(5,31,23,.10) 24%,rgba(5,31,23,.30) 52%,rgba(5,31,23,.97) 100%)}
.z{position:relative;z-index:2}
.hl{color:var(--marigold)}
.mark{height:38px;width:auto;display:inline-block;vertical-align:middle}
.topbar{position:absolute;top:68px;left:90px;right:130px;z-index:3;display:flex;justify-content:space-between;align-items:center}
.handle-sm{font-family:'Inter';font-weight:600;letter-spacing:.01em;font-size:30px;display:inline-flex;align-items:center;gap:12px;opacity:.96}
.startlabel{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.22em;font-size:23px;color:var(--marigold)}
.counter{font-family:'Archivo';font-weight:800;letter-spacing:.16em;font-size:22px;color:var(--marigold)}
.eyebrow{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.22em;font-size:25px;color:var(--marigold)}
.lead{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:50px;line-height:1.08;margin-top:18px}
.cream .lead{color:var(--emerald-mid)}
h1{font-family:'Archivo';font-weight:800;font-size:104px;line-height:.98;letter-spacing:-.02em;margin-top:14px}
.big{font-family:'Archivo';font-weight:800;font-size:88px;line-height:1.0;letter-spacing:-.02em;margin-top:12px}
.head{font-family:'Archivo';font-weight:800;font-size:78px;line-height:1.0;letter-spacing:-.02em;margin-top:6px}
.tick{width:92px;height:7px;background:var(--marigold);border-radius:2px;margin:26px 0 0}
.cbody{font-family:'Inter';font-weight:400;font-size:35px;line-height:1.42;margin-top:24px;max-width:820px}
.cream .cbody{color:var(--emerald)}
.swipe{position:absolute;right:130px;bottom:96px;z-index:3;font-family:'Caveat';font-weight:700;font-size:50px;color:var(--cream);display:inline-flex;align-items:center;gap:8px;opacity:.92}
.endline{font-family:'Archivo';font-weight:800;font-size:92px;line-height:1.0;letter-spacing:-.02em}
.handle{font-family:'Archivo';font-weight:800;letter-spacing:.1em;font-size:30px;margin-top:44px}
.tag{font-family:'Cormorant Garamond';font-style:italic;font-size:46px;color:var(--marigold);margin-top:14px}
.ctas{display:flex;flex-direction:column;gap:18px;margin-top:36px;max-width:780px}
.cta{display:flex;align-items:center;gap:18px;padding:26px 36px;border-radius:999px;font-family:'Archivo';font-weight:800;font-size:33px;letter-spacing:.01em}
.cta.fill{background:var(--marigold);color:var(--emerald)}
.cta.outline{background:rgba(244,236,219,.07);border:2px solid rgba(244,236,219,.55);color:var(--cream)}
.cta svg{flex:none}
.fill{flex:1}
.grain{position:absolute;inset:0;z-index:4;opacity:.12;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
</style></head><body>`;
const FOOT = `</body></html>`;
const grain = `<div class="grain"></div>`;
const topbar = (right) => `<div class="topbar"><div class="handle-sm">${MARK}<span>${esc(handle)}</span></div>${right || '<span></span>'}</div>`;
const swipe = `<div class="swipe">swipe${SWARR}</div>`;

function render(slide) {
  const url = slide.photo ? photoUrl(slide.photo) : null;
  const cls = url ? 'photo' : (slide.type === 'endcard' ? 'emerald' : 'cream');
  const style = url ? ` style="background-image:url('${url}')"` : '';
  const scrim = url ? `<div class="scrim"></div>` : '';
  const lead = slide.lead || slide.sub;
  let inner = '';
  switch (slide.type) {
    case 'cover':
      inner = `${topbar(`<div class="startlabel">${esc(noEm(slide.label || 'START HERE'))}</div>`)}<div class="fill"></div>` +
        `<div class="z"><div class="eyebrow">${esc(noEm(slide.kicker))}</div>${lead ? `<div class="lead">${fmt(lead)}</div>` : ''}` +
        `<h1>${fmt(slide.headline)}</h1><div class="tick"></div>${slide.body ? `<div class="cbody">${fmt(slide.body)}</div>` : ''}</div>${swipe}`;
      break;
    case 'credential':
      inner = `${topbar('')}<div class="fill"></div>` +
        `<div class="z"><div class="eyebrow">${esc(noEm(slide.kicker))}</div>${lead ? `<div class="lead">${fmt(lead)}</div>` : ''}` +
        `<div class="big">${fmt(slide.text)}</div><div class="tick"></div></div>`;
      break;
    case 'tip':
      inner = `${topbar(`<div class="counter">${slide.num} / ${String(tipTotal).padStart(2, '0')}</div>`)}<div class="fill"></div>` +
        `<div class="z"><div class="eyebrow">STEP ${esc(slide.num)}</div><div class="head">${fmt(slide.head)}</div><div class="tick"></div>` +
        `<div class="cbody">${fmt(slide.body)}</div></div>`;
      break;
    case 'endcard':
      inner = `${topbar(`<div class="startlabel">${esc(noEm(slide.label || 'SOLO, MINUS THE FEAR'))}</div>`)}<div class="fill"></div>` +
        `<div class="z">${lead ? `<div class="lead">${fmt(lead)}</div>` : ''}<div class="big">${fmt(slide.headline || slide.line)}</div><div class="tick"></div>${ctaHtml(slide.ctas)}</div>`;
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
  execSync(`${CHROME} --headless=new --no-sandbox --user-data-dir=/tmp/daya-chrome-cache --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=4000 --window-size=1080,1527 --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,1080,1440)).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('rendered', basename(pngPath), slide.photo ? (photoUrl(slide.photo) ? '(photo ok)' : `(photo MISSING ${slide.photo})`) : '(no photo)');
});
console.log(`\nDone: ${n} slides -> ${outDir}`);
