// DAYA SOS Lockscreen Pack - 6 phone wallpapers with an emergency phrase per language.
// On-brand (emerald/cream/marigold + grain). No DAYA logo (not public yet). HTML -> PNG.
// Usage: node build-lockscreens.mjs
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'out', 'sos-lockscreens');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
const W = 1080, H = 2340, RESERVE = 87; // headless reserves ~87px; render taller then crop

const cards = [
  { id: '01-english', lang: 'ENGLISH', dir: 'ltr', text: 'I need help.\nPlease call the police.', gloss: '' },
  { id: '02-espanol', lang: 'ESPAÑOL', dir: 'ltr', text: 'Necesito ayuda.\nPor favor, llamen a la policía.', gloss: 'I need help. Please call the police.' },
  { id: '03-francais', lang: 'FRANÇAIS', dir: 'ltr', text: "J'ai besoin d'aide.\nAppelez la police, s'il vous plaît.", gloss: 'I need help. Please call the police.' },
  { id: '04-italiano', lang: 'ITALIANO', dir: 'ltr', text: 'Ho bisogno di aiuto.\nChiamate la polizia, per favore.', gloss: 'I need help. Please call the police.' },
  { id: '05-deutsch', lang: 'DEUTSCH', dir: 'ltr', text: 'Ich brauche Hilfe.\nBitte rufen Sie die Polizei.', gloss: 'I need help. Please call the police.' },
  { id: '06-arabic', lang: 'العربية', dir: 'rtl', text: 'أحتاج إلى مساعدة.\nمن فضلكم اتصلوا بالشرطة.', gloss: 'I need help. Please call the police.' },
];

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const br = (s = '') => esc(s).replace(/\n/g, '<br>');

const head = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Archivo:wght@700;800&family=Inter:wght@400;500&family=Noto+Sans+Arabic:wght@500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#0e3b2c}
.wrap{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:radial-gradient(120% 80% at 50% 88%, #1d5240 0%, #0e3b2c 45%, #06251b 100%);display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:0 96px 300px;text-align:center;color:#f4ecdb}
.eyebrow{font-family:'Archivo';font-weight:800;text-transform:uppercase;letter-spacing:.28em;font-size:34px;color:#efc05a;margin-bottom:44px}
.sos{font-family:'Cormorant Garamond';font-weight:600;font-size:98px;line-height:1.12}
.sos.rtl{font-family:'Noto Sans Arabic';font-weight:600;font-size:92px;line-height:1.5;direction:rtl}
.gloss{font-family:'Inter';font-weight:400;font-size:40px;line-height:1.4;color:#bcd2c4;margin-top:48px}
.rule{width:70px;height:5px;background:#efc05a;border-radius:2px;margin:64px 0 40px}
.hint{font-family:'Inter';font-weight:500;font-size:36px;color:#e7efe7;opacity:.9}
.brand{position:absolute;bottom:120px;left:0;right:0;text-align:center;font-family:'Cormorant Garamond';font-style:italic;font-size:38px;color:#efc05a;opacity:.85}
.grain{position:absolute;inset:0;opacity:.13;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
</style></head><body>`;
const foot = `</body></html>`;

cards.forEach((c) => {
  const html = head + `<div class="wrap"><div class="eyebrow">${esc(c.lang)}</div>` +
    `<div class="sos ${c.dir === 'rtl' ? 'rtl' : ''}">${br(c.text)}</div>` +
    (c.gloss ? `<div class="gloss">${esc(c.gloss)}</div>` : '') +
    `<div class="rule"></div><div class="hint">Show this screen to someone who can help.</div>` +
    `<div class="brand">solo travel, minus the fear</div><div class="grain"></div></div>` + foot;
  const htmlPath = join(outDir, `${c.id}.html`);
  const pngPath = join(outDir, `sos-${c.id}.png`);
  writeFileSync(htmlPath, html);
  execSync(`${CHROME} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --default-background-color=FF0E3B2C --virtual-time-budget=4000 --window-size=${W},${H + RESERVE} --screenshot=${pngPath} "file://${htmlPath}"`, { stdio: 'ignore' });
  execSync(`python3 -c "from PIL import Image; Image.open('${pngPath}').crop((0,0,${W},${H})).save('${pngPath}')"`, { stdio: 'ignore' });
  console.log('rendered', `sos-${c.id}.png`);
});
console.log('Done ->', outDir);
