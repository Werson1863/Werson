// Teljes oldalas képernyőképek 375 / 768 / 1440 px-en → ../mockups, és vízszintes túlcsordulás-ellenőrzés.
// Használat: npm run build && npm start (másik terminálban), majd: npm run screenshots
// BASE_URL env-vel más címre is futtatható.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
    try { return require(p); } catch {}
  }
  throw new Error('Playwright szükséges: npm i -D playwright');
})();

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../../mockups');
const PAGES = [['fooldal', '/'], ['megoldasok', '/megoldasok'], ['rolunk', '/rolunk'], ['kapcsolat', '/kapcsolat']];
const WIDTHS = (process.env.WIDTHS || '1440,768,375').split(',').map(Number);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let problems = 0;
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: w < 800 ? 2 : 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const bad = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed') {
          if (!el.closest('[class*="overflow-x-auto"], [class*="overflow-hidden"], [aria-hidden="true"], .absolute')) bad.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
        }
      }
      return { scroll: document.documentElement.scrollWidth > vw, bad: bad.slice(0, 5) };
    });
    if (overflow.scroll || overflow.bad.length) {
      problems++;
      console.warn(`⚠ ${name} @${w}px túlcsordulás`, overflow);
    }
    // A fullPage mód Chromiumban torzíthatja a vw-alapú méreteket, ezért a viewportot nyújtjuk a teljes magasságra;
    // így a lazy-load képek is betöltődnek.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: w, height });
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}/${name}-${w}.png` });
    await page.setViewportSize({ width: w, height: 900 });
    console.log(`✓ ${name}-${w}.png`);
  }
  await ctx.close();
}
await browser.close();
if (problems) process.exitCode = 1;
