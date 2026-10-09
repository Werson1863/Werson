// Közös renderelő: SVG/HTML → PNG/PDF a Playwright Chromiummal.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
    try { return require(p); } catch {}
  }
  throw new Error('Playwright nem található (npm i -D playwright).');
}
const { chromium } = loadPlaywright();

let browser;
export async function getBrowser() {
  if (!browser) browser = await chromium.launch();
  return browser;
}
export async function closeBrowser() { if (browser) await browser.close(); browser = undefined; }

/** SVG fájl (vagy string) → PNG adott méretben, átlátszó háttérrel. */
export async function svgToPng(svg, out, width, height = width) {
  const markup = svg.trim().startsWith('<') ? svg : readFileSync(svg, 'utf8');
  const html = `<!doctype html><html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:${width}px;height:${height}px}</style></head><body>${markup}</body></html>`;
  return htmlToPng(html, out, width, height, { transparent: true });
}

/** HTML string vagy fájl → PNG. */
export async function htmlToPng(htmlOrFile, out, width, height, { transparent = false, fullPage = false, scale = 1 } = {}) {
  const b = await getBrowser();
  const page = await b.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  if (htmlOrFile.endsWith('.html') && !htmlOrFile.includes('<')) await page.goto(pathToFileURL(htmlOrFile).href);
  else await page.setContent(htmlOrFile, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, omitBackground: transparent, fullPage });
  await page.close();
}

/** HTML → PDF pontos lapmérettel (mm). */
export async function htmlToPdf(htmlOrFile, out, widthMm, heightMm) {
  const b = await getBrowser();
  const page = await b.newPage();
  if (htmlOrFile.endsWith('.html') && !htmlOrFile.includes('<')) await page.goto(pathToFileURL(htmlOrFile).href);
  else await page.setContent(htmlOrFile, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, width: `${widthMm}mm`, height: `${heightMm}mm`, printBackground: true, preferCSSPageSize: true });
  await page.close();
}
