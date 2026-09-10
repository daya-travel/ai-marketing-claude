// Shared brand fonts for all slide builders, embedded as base64 data URIs.
// Chrome headless can't reach fonts.googleapis.com through the agent proxy
// (TLS interception → handshake fail), so network fonts silently fall back
// to Times. Import FONT_CSS and drop it into <style> instead of the
// <link href="fonts.googleapis.com"> tag. Files live in fonts/*.woff2
// (latin subset only - our content is English).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FONTS = join(dirname(fileURLToPath(import.meta.url)), 'fonts');
const b64 = (f) => readFileSync(join(FONTS, f)).toString('base64');
const face = (family, style, weight, file) => `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url(data:font/woff2;base64,${b64(file)}) format('woff2')}`;

export const FONT_CSS = [
  face('Archivo', 'normal', 700, 'archivo-700.woff2'),
  face('Archivo', 'normal', 800, 'archivo-800.woff2'),
  face('Cormorant Garamond', 'normal', 600, 'cormorant-600.woff2'),
  face('Cormorant Garamond', 'italic', 500, 'cormorant-i500.woff2'),
  face('Cormorant Garamond', 'italic', 600, 'cormorant-i600.woff2'),
  face('Inter', 'normal', 400, 'inter-400.woff2'),
  face('Inter', 'normal', 500, 'inter-500.woff2'),
  face('Caveat', 'normal', 600, 'caveat-600.woff2'),
].join('\n');
