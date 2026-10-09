// tokens.json → tokens.css, Tailwind v4 @theme, Tailwind v3 config-részlet, és a weboldal témafájlja.
// Futtatás: node tools/build_tokens.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(readFileSync(resolve(root, 'design/tokens.json'), 'utf8'));
const v = (x) => (typeof x === 'object' && x !== null && '$value' in x ? x.$value : x);
const header = '/* GENERÁLT FÁJL – forrás: design/tokens.json, generátor: tools/build_tokens.mjs */\n';

const colors = {};
for (const group of Object.values(t.color)) for (const [k, x] of Object.entries(group)) colors[k] = v(x);

// ---- tokens.css: sima CSS-változók, bármilyen stackhez
const cssVars = [];
for (const [k, x] of Object.entries(colors)) cssVars.push(`--lp-color-${k}: ${x};`);
cssVars.push(`--lp-font-sans: ${v(t.font.family.sans)};`, `--lp-font-mono: ${v(t.font.family.mono)};`);
for (const [k, x] of Object.entries(t.type)) {
  cssVars.push(`--lp-text-${k}: ${x.size};`, `--lp-text-${k}-lh: ${x.lineHeight};`, `--lp-text-${k}-ls: ${x.letterSpacing};`, `--lp-text-${k}-weight: ${x.weight};`);
}
for (const [k, x] of Object.entries(t.space)) cssVars.push(`--lp-space-${k}: ${x};`);
for (const [k, x] of Object.entries(t.radius)) cssVars.push(`--lp-radius-${k}: ${x};`);
for (const [k, x] of Object.entries(t.shadow)) cssVars.push(`--lp-shadow-${k}: ${x};`);
cssVars.push(`--lp-ease: ${v(t.motion.ease)};`);
for (const [k, x] of Object.entries(t.motion.duration)) cssVars.push(`--lp-duration-${k}: ${x};`);
cssVars.push(`--lp-press-scale: ${t.motion['press-scale']};`);
for (const [k, x] of Object.entries(t.layout)) cssVars.push(`--lp-${k}: ${x};`);

const tokensCss = `${header}:root {\n  ${cssVars.join('\n  ')}\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :root { --lp-duration-fast: 0ms; --lp-duration-base: 0ms; --lp-duration-slow: 0ms; }\n}\n`;
writeFileSync(resolve(root, 'design/tokens.css'), tokensCss);

// ---- Tailwind v4 @theme
const theme = [
  '--color-*: initial;',
  '--color-transparent: transparent;',
  '--color-current: currentColor;',
  ...Object.entries(colors).map(([k, x]) => `--color-${k}: ${x};`),
  `--font-sans: ${v(t.font.family.sans)};`,
  `--font-mono: ${v(t.font.family.mono)};`,
  ...Object.entries(t.type).flatMap(([k, x]) => [
    `--text-${k}: ${x.size};`,
    `--text-${k}--line-height: ${x.lineHeight};`,
    `--text-${k}--letter-spacing: ${x.letterSpacing};`,
    `--text-${k}--font-weight: ${x.weight};`,
  ]),
  ...Object.entries(t.radius).map(([k, x]) => `--radius-${k}: ${x};`),
  ...Object.entries(t.shadow).map(([k, x]) => `--shadow-${k}: ${x};`),
  `--ease-brand: ${v(t.motion.ease)};`,
  `--container-site: ${t.space.container};`,
  '--breakpoint-sm: 40rem;', '--breakpoint-md: 48rem;', '--breakpoint-lg: 64rem;', '--breakpoint-xl: 80rem;',
];
const themeCss = `${header}@theme {\n  ${theme.join('\n  ')}\n}\n`;
writeFileSync(resolve(root, 'design/tailwind.theme.css'), themeCss);

// a weboldal: @theme + :root változók egy fájlban
mkdirSync(resolve(root, 'site/app'), { recursive: true });
writeFileSync(resolve(root, 'site/app/theme.generated.css'), `${themeCss}\n${tokensCss.replace(header, '')}`);

// ---- Tailwind v3 config-részlet (ha valaki régebbi Tailwindot használ)
const v3 = {
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', ...colors },
    fontFamily: { sans: v(t.font.family.sans).split(', '), mono: v(t.font.family.mono).split(', ') },
    fontSize: Object.fromEntries(Object.entries(t.type).map(([k, x]) => [k, [x.size, { lineHeight: x.lineHeight, letterSpacing: x.letterSpacing, fontWeight: String(x.weight) }]])),
    borderRadius: t.radius,
    boxShadow: t.shadow,
    extend: {
      transitionTimingFunction: { brand: v(t.motion.ease) },
      transitionDuration: Object.fromEntries(Object.entries(t.motion.duration).map(([k, x]) => [k, x])),
      maxWidth: { site: t.space.container },
    },
  },
};
writeFileSync(
  resolve(root, 'design/tailwind.config.snippet.js'),
  `// GENERÁLT FÁJL – Tailwind v3 kompatibilis részlet. Használat: module.exports = { ...require('./tailwind.config.snippet.js'), content: [...] }\nmodule.exports = ${JSON.stringify(v3, null, 2)};\n`,
);
console.log('Tokenek legenerálva:', Object.keys(colors).length, 'szín,', Object.keys(t.type).length, 'tipó-szint.');
