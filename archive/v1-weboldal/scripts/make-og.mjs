// Egyszeri segédszkript: public/og.png (1200×630) legenerálása Playwrighttal.
// Futtatás (logó- vagy szövegcsere után): npx -y playwright@1.56.1 --version && node scripts/make-og.mjs
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(process.env.PLAYWRIGHT_PATH ?? "/opt/node22/lib/node_modules/playwright"));
}

const logo = await readFile(path.join(root, "assets/logo/logo-horizontal-on-dark.svg"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0F1115;color:#fff;font-family:Inter,sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;right:-200px;top:-260px;width:820px;height:820px;border-radius:50%;background:radial-gradient(closest-side,rgba(249,115,22,.55),rgba(249,115,22,0))}
  .wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .logo svg{height:52px;width:auto}
  h1{font-size:76px;font-weight:600;letter-spacing:-0.035em;line-height:1.02;max-width:900px}
  h1 span{color:#FDBA74}
  .row{display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#A3A8B8;font-weight:500}
  .pill{background:#F97316;color:#0F1115;padding:12px 22px;border-radius:999px;font-weight:600}
</style></head><body><div class="glow"></div><div class="wrap">
<div class="logo">${logo.replace(/<!--.*?-->/s, "")}</div>
<h1>Hatékonyabb folyamatok.<br><span>Több idő a lényegesre.</span></h1>
<div class="row"><span>Business automation · loopient.hu</span><span class="pill">Ingyenes konzultáció</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public/og.png") });
await browser.close();
console.log("public/og.png kész");
