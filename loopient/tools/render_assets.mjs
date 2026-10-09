// Raszteres és nyomdai eszközök generálása a vektoros forrásokból (Playwright/Chromium + ImageMagick az .ico-hoz).
// Futtatás (a build_brand.py után): node tools/render_assets.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgToPng, htmlToPng, htmlToPdf, closeBrowser } from './render-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const B = (p) => resolve(ROOT, 'brand', p);
const PUB = (p) => resolve(ROOT, 'site/public', p);
const copy = JSON.parse(readFileSync(resolve(ROOT, 'content/copy.json'), 'utf8'));
const read = (p) => readFileSync(B(p), 'utf8');
/** SVG beágyazása adott szélességgel (a magasság az arányból jön). */
const inline = (file, width, style = '') =>
  read(file).replace(/<svg ([^>]*?)width="[^"]+" height="[^"]+"/, `<svg $1width="${width}" style="display:block;height:auto;${style}"`);
const tile = (name) => `url('data:image/svg+xml;utf8,${encodeURIComponent(read(`pattern/pattern-tile-${name}.svg`))}')`;
for (const d of ['logo/png', 'favicon', 'social', 'print', 'icons/png', 'pattern']) mkdirSync(B(d), { recursive: true });
mkdirSync(PUB('brand'), { recursive: true });

const C = { orange: '#F97316', deep: '#C2410C', light: '#FDBA74', graphite: '#0F1115', ink: '#1F2330', mist: '#F5F5F7', paper: '#F9F9F8', muted: '#4B5160', subtle: '#6B7180', onDark: '#A9AEBB' };
// Nyomdai PDF-ekhez TrueType Inter (tools/otf2ttf.py) – így nem Type 3 fontként ágyazódik be.
const TTF = resolve(ROOT, 'tools/.cache');
const fontFaces = ['Regular:400', 'Medium:500', 'SemiBold:600', 'Bold:700']
  .map((x) => x.split(':'))
  .map(([n, w]) => { try { return `@font-face{font-family:InterPrint;font-weight:${w};src:url(data:font/ttf;base64,${readFileSync(`${TTF}/Inter-${n}.ttf`).toString('base64')}) format('truetype')}`; } catch { return ''; } })
  .join('');
const BASE_CSS = `${fontFaces}*{box-sizing:border-box;margin:0;padding:0}html,body{font-family:InterPrint,Inter,sans-serif;-webkit-font-smoothing:antialiased;color:${C.graphite}}`;

// ------------------------------------------------------------ logó PNG-k
const logoFiles = readdirSync(B('logo')).filter((f) => f.endsWith('.svg'));
for (const f of logoFiles) {
  const svg = read(`logo/${f}`);
  const [, , , w, h] = svg.match(/viewBox="(-?[\d.]+) (-?[\d.]+) ([\d.]+) ([\d.]+)"/).map(Number);
  const widths = f.includes('mark') || f.includes('app-icon') ? [256, 512, 1024] : f.includes('stacked') ? [600, 1200] : [600, 1200, 2400];
  for (const W of widths) {
    const H = Math.round((W * h) / w);
    await svgToPng(svg.replace(/width="[^"]+" height="[^"]+"/, `width="${W}" height="${H}"`), B(`logo/png/${f.replace('.svg', '')}-${W}.png`), W, H);
  }
}
console.log('logó PNG-k kész');

// ------------------------------------------------------------ favicon-készlet
const fav = read('favicon/favicon.svg');
for (const s of [16, 32, 48]) await svgToPng(fav.replace('width="32" height="32"', `width="${s}" height="${s}"`), B(`favicon/favicon-${s}.png`), s);
execFileSync('convert', [B('favicon/favicon-16.png'), B('favicon/favicon-32.png'), B('favicon/favicon-48.png'), B('favicon/favicon.ico')]);
const appDark = read('logo/loopient-app-icon-dark-square.svg');
const sized = (svg, s) => svg.replace(/width="1024" height="1024"/, `width="${s}" height="${s}"`);
await svgToPng(sized(appDark, 180), B('favicon/apple-touch-icon.png'), 180);
await svgToPng(sized(read('logo/loopient-app-icon-dark.svg'), 192), B('favicon/android-chrome-192x192.png'), 192);
await svgToPng(sized(read('logo/loopient-app-icon-dark.svg'), 512), B('favicon/android-chrome-512x512.png'), 512);
await svgToPng(sized(appDark, 512), B('favicon/maskable-512x512.png'), 512);
for (const m of ['black', 'white', 'orange']) await svgToPng(read(`favicon/favicon-mono-${m}.svg`).replace('width="32" height="32"', 'width="512" height="512"'), B(`favicon/favicon-mono-${m}-512.png`), 512);
console.log('favicon-készlet kész');

// ------------------------------------------------------------ ikon PNG-k (grafit és narancs, 24/48/96)
for (const f of readdirSync(B('icons')).filter((x) => x.endsWith('.svg') && x !== 'sprite.svg')) {
  for (const [col, hex] of [['graphite', C.graphite], ['orange-deep', C.deep]]) {
    for (const s of [48, 96]) {
      const svg = read(`icons/${f}`).replace('width="24" height="24"', `width="${s}" height="${s}"`).replace('stroke="currentColor"', `stroke="${hex}"`);
      await svgToPng(svg, B(`icons/png/${f.replace('.svg', '')}-${col}-${s}.png`), s);
    }
  }
}
console.log('ikon PNG-k kész');

// ------------------------------------------------------------ mintázat PNG előnézetek
for (const n of ['light', 'dark', 'orange']) {
  await htmlToPng(read(`pattern/pattern-${n}-1600x900.svg`).replace('width="1600" height="900"', 'width="1600" height="900" style="display:block"'), B(`pattern/pattern-${n}-1600x900.png`), 1600, 900);
}

// ------------------------------------------------------------ social: OG kép 1200×630
const heroLines = copy.home.hero.titleLines;
const mockRows = copy.home.hero.mock.items.slice(0, 3);
const ogHtml = `<!doctype html><html><head><style>${BASE_CSS}
body{width:1200px;height:630px;background:${C.paper};position:relative;overflow:hidden}
.pat{position:absolute;inset:0;background:${tile('light')};background-size:160px;mask-image:radial-gradient(ellipse 55% 80% at 85% 50%,#000,transparent 75%)}
.wrap{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
h1{font-size:76px;line-height:1.02;letter-spacing:-.035em;font-weight:700;margin-top:8px}
h1 span{display:block}h1 span:last-child{color:${C.deep}}
.sub{font-size:24px;color:${C.muted};font-weight:500;letter-spacing:-.01em}
.card{position:absolute;right:64px;top:170px;width:400px;background:#fff;border-radius:22px;box-shadow:0 0 0 1px rgb(15 17 21/.06),0 28px 56px -16px rgb(15 17 21/.22);overflow:hidden}
.ch{display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid rgb(15 17 21/.06);font-weight:600;font-size:17px}
.ch i{width:30px;height:30px;border-radius:9px;background:${C.graphite};display:grid;place-items:center}
.row{display:flex;align-items:center;gap:12px;padding:14px 20px;font-size:15px;font-weight:500;border-bottom:1px solid rgb(15 17 21/.05)}
.row b{font-weight:500;color:${C.subtle};width:44px;font-variant-numeric:tabular-nums}
.row span{flex:1}.p{font-size:12px;font-weight:600;padding:5px 10px;border-radius:99px;white-space:nowrap}
.w{background:#FFF1E6;color:${C.deep}}.d{background:#E9F7EE;color:#15803D}
</style></head><body><div class="pat"></div><div class="wrap">
<div>${inline('logo/loopient-horizontal-light.svg', 300)}</div>
<div><h1>${heroLines.map((l) => `<span>${l}</span>`).join('')}</h1></div>
<div class="sub">${copy.brand.descriptorHu} · ${copy.brand.area}</div></div>
<div class="card"><div class="ch"><i>${inline('logo/loopient-mark-dark.svg', 22)}</i>${copy.home.hero.mock.title}</div>
${mockRows.map((r) => `<div class="row"><b>${r.time}</b><span>${r.text}</span><em class="p ${r.tone === 'wait' ? 'w' : 'd'}" style="font-style:normal">${r.status}</em></div>`).join('')}
</div></body></html>`;
await htmlToPng(ogHtml, B('social/og-image-1200x630.png'), 1200, 630);

// LinkedIn borító 1584×396 – a bal alsó sarkot a profilkép takarja, ezért a szöveg jobbra kerül
const liHtml = `<!doctype html><html><head><style>${BASE_CSS}
body{width:1584px;height:396px;background:${C.graphite};position:relative;overflow:hidden;color:#fff}
.pat{position:absolute;inset:0;background:${tile('dark')};background-size:160px;mask-image:linear-gradient(90deg,#000 0%,transparent 60%)}
.t{position:absolute;right:96px;top:50%;transform:translateY(-50%);text-align:right}
h1{font-size:64px;line-height:1.04;letter-spacing:-.035em;font-weight:700}h1 span{display:block}h1 span:last-child{color:${C.orange}}
p{margin-top:18px;font-size:22px;color:${C.onDark};font-weight:500}
.bar{position:absolute;left:0;right:0;bottom:0;height:8px;background:${C.orange}}
</style></head><body><div class="pat"></div><div class="t"><h1><span>${copy.brand.slogan.split('. ')[0]}.</span><span>${copy.brand.slogan.split('. ')[1]}</span></h1>
<p>${copy.brand.descriptorHu} · ${copy.brand.area}</p></div><div class="bar"></div></body></html>`;
await htmlToPng(liHtml, B('social/linkedin-banner-1584x396.png'), 1584, 396);

// Profilkép 1080×1080 (kör alakú vágásra optimalizálva) – sötét és narancs változat
for (const [name, bg, b1, b2] of [['dark', C.graphite, C.orange, C.light], ['orange', C.orange, '#FFFFFF', C.graphite], ['light', C.paper, C.orange, C.deep]]) {
  const svg = read('logo/loopient-app-icon-dark-square.svg')
    .replace(`fill="${C.graphite}"`, `fill="${bg}"`)
    .replace(/fill="#F97316"/, `fill="${b1}"`)
    .replace(/fill="#FDBA74"/, `fill="${b2}"`)
    .replace('width="1024" height="1024"', 'width="1080" height="1080"');
  await svgToPng(svg, B(`social/profile-${name}-1080.png`), 1080);
}

// E-mail aláírás-logó: 2x PNG (megjelenítés 200×39 px), fehér és átlátszó háttérrel
const hz = read('logo/loopient-horizontal-light.svg');
const [, , , hw, hh] = hz.match(/viewBox="(-?[\d.]+) (-?[\d.]+) ([\d.]+) ([\d.]+)"/).map(Number);
const sigW = 400, sigH = Math.round((sigW * hh) / hw);
await svgToPng(hz.replace(/width="[^"]+" height="[^"]+"/, `width="${sigW}" height="${sigH}"`), B('social/email-signature-logo@2x.png'), sigW, sigH);
await htmlToPng(`<html><body style="margin:0;background:#fff;padding:0">${hz.replace(/width="[^"]+" height="[^"]+"/, `width="${sigW}" height="${sigH}" style="display:block"`)}</body></html>`, B('social/email-signature-logo-white@2x.png'), sigW, sigH);
writeFileSync(
  B('social/email-signature.html'),
  `<!-- Loopient e-mail aláírás. A logót töltsd fel a webre (pl. https://DOMAIN/brand/email-signature-logo@2x.png), és cseréld az src-t. -->
<table cellpadding="0" cellspacing="0" style="font-family:Inter,Arial,sans-serif;color:#0F1115;font-size:14px;line-height:1.45">
  <tr><td style="padding-bottom:10px"><img src="email-signature-logo-white@2x.png" width="200" height="${Math.round(sigH / 2)}" alt="Loopient – Business automation" style="display:block;border:0"></td></tr>
  <tr><td><strong>Péter [TODO: vezetéknév]</strong> · Alapító</td></tr>
  <tr><td style="color:#4B5160">[e-mail cím] · [telefonszám]</td></tr>
  <tr><td style="color:#4B5160">${copy.brand.descriptorHu} · ${copy.brand.area}</td></tr>
  <tr><td style="padding-top:8px;color:#C2410C;font-weight:600">${copy.brand.slogan}</td></tr>
</table>
`,
);
console.log('social képek kész');

// ------------------------------------------------------------ nyomda: névjegykártya 85×55 mm + 3 mm kifutó
const mm = (v) => `${v}mm`;
const cardCss = `${BASE_CSS}@page{size:91mm 61mm;margin:0}body{width:91mm}
.p{width:91mm;height:61mm;position:relative;overflow:hidden;page-break-after:always}
.safe{position:absolute;inset:${mm(3 + 4)}}`;
const cardHtml = `<!doctype html><html><head><style>${cardCss}
.f{background:${C.paper}}.f .pat{position:absolute;inset:0;background:${tile('light')};background-size:22mm;mask-image:radial-gradient(ellipse 70% 70% at 100% 100%,#000,transparent 70%)}
.f .safe{display:flex;align-items:center;justify-content:center}
.b{background:${C.graphite};color:#fff}.b .pat{position:absolute;inset:0;background:${tile('dark')};background-size:22mm;mask-image:linear-gradient(225deg,#000,transparent 55%)}
.b .safe{display:flex;flex-direction:column;justify-content:space-between}
.n{font-size:12pt;font-weight:700;letter-spacing:-.02em}.r{font-size:7pt;color:${C.onDark};margin-top:1mm}
.c{font-size:7pt;line-height:1.55;color:#fff}.c span{color:${C.orange}}
.s{font-size:7.5pt;font-weight:600;color:${C.orange};letter-spacing:-.01em}
</style></head><body>
<div class="p f"><div class="pat"></div><div class="safe">${inline('logo/loopient-stacked-light.svg', '34mm')}</div></div>
<div class="p b"><div class="pat"></div><div class="safe">
<div><div class="n">Péter [TODO]</div><div class="r">Alapító · ${copy.brand.descriptorHu}</div></div>
<div class="c"><div><span>E</span>&nbsp; [e-mail cím]</div><div><span>T</span>&nbsp; [telefonszám]</div><div><span>W</span>&nbsp; [TODO: domain]</div><div><span>A</span>&nbsp; Debrecen</div></div>
<div style="display:flex;justify-content:space-between;align-items:flex-end"><div class="s">${copy.brand.slogan}</div>${inline('logo/loopient-mark-dark.svg', '9mm')}</div>
</div></div></body></html>`;
writeFileSync(B('print/business-card.html'), cardHtml);
await htmlToPdf(cardHtml, B('print/loopient-nevjegykartya-85x55-3mm-kifuto.pdf'), 91, 61);
execFileSync('pdftoppm', ['-png', '-r', '300', B('print/loopient-nevjegykartya-85x55-3mm-kifuto.pdf'), B('print/business-card-preview')]);

// Levélpapír A4 + 3 mm kifutó (216×303 mm)
const lhHtml = `<!doctype html><html><head><style>${BASE_CSS}@page{size:216mm 303mm;margin:0}
body{width:216mm;height:303mm;position:relative;background:#fff;overflow:hidden}
.pat{position:absolute;right:0;top:0;width:90mm;height:70mm;background:${tile('light')};background-size:24mm;mask-image:radial-gradient(ellipse 100% 100% at 100% 0%,#000,transparent 70%)}
.bar{position:absolute;left:0;top:0;bottom:0;width:${mm(3 + 5)};background:${C.orange}}
.head{position:absolute;left:${mm(3 + 22)};top:${mm(3 + 18)}}
.meta{position:absolute;right:${mm(3 + 20)};top:${mm(3 + 22)};text-align:right;font-size:8pt;line-height:1.6;color:${C.muted}}
.body{position:absolute;left:${mm(3 + 22)};right:${mm(3 + 20)};top:${mm(3 + 62)};font-size:10pt;line-height:1.6;color:${C.subtle}}
.body p{margin-bottom:5mm}.ph{color:${C.deep}}
.foot{position:absolute;left:${mm(3 + 22)};right:${mm(3 + 20)};bottom:${mm(3 + 14)};display:flex;justify-content:space-between;gap:8mm;border-top:.3mm solid ${C.mist};padding-top:4mm;font-size:7pt;line-height:1.55;color:${C.muted}}
.foot b{color:${C.graphite};font-weight:600}
</style></head><body><div class="pat"></div><div class="bar"></div>
<div class="head">${inline('logo/loopient-horizontal-light.svg', '62mm')}</div>
<div class="meta">Debrecen, [TODO: dátum]<br>Iktatószám: [TODO]</div>
<div class="body"><p class="ph">[Címzett neve]<br>[Cég]<br>[Cím]</p><p><b style="color:${C.graphite}">Tárgy: [Tárgy]</b></p><p class="ph">[Levél szövege – Inter Regular 10 pt, 1,6 sorköz, balra zárt.]</p><p class="ph">Üdvözlettel:<br>Péter [TODO]<br>Alapító</p></div>
<div class="foot"><div><b>${copy.brand.legalName.replace(/\[TODO[^\]]*\]/, '[TODO: cégforma]')}</b><br>Székhely: [TODO: cím]<br>Adószám: [TODO] · Cégjegyzékszám: [TODO]</div>
<div style="text-align:right">[e-mail cím] · [telefonszám]<br>[TODO: domain]<br><span style="color:${C.deep};font-weight:600">${copy.brand.slogan}</span></div></div>
</body></html>`;
writeFileSync(B('print/letterhead.html'), lhHtml);
await htmlToPdf(lhHtml, B('print/loopient-levelpapir-A4-3mm-kifuto.pdf'), 216, 303);
execFileSync('pdftoppm', ['-png', '-r', '90', '-singlefile', B('print/loopient-levelpapir-A4-3mm-kifuto.pdf'), B('print/letterhead-preview')]);
console.log('nyomdai sablonok kész');

// ------------------------------------------------------------ 1 oldalas brand guide (A4 fekvő)
const swatches = [
  ['Narancs', C.orange, 'Fő márkaszín, felületek, jel. Szövegként csak sötét háttéren.', '#0F1115'],
  ['Mély narancs', C.deep, 'Szöveg, link, fókusz világos háttéren (AA).', '#fff'],
  ['Világos narancs', C.light, 'Kiemelés sötét háttéren, 2. penge (sötét).', '#0F1115'],
  ['Grafit', C.graphite, 'Szöveg, sötét szekciók, elsődleges gomb.', '#fff'],
  ['Sötétszürke', C.ink, 'Kártyák sötét szekcióban.', '#fff'],
  ['Világosszürke', C.mist, 'Másodlagos felület.', '#0F1115'],
  ['Háttér', C.paper, 'Oldal háttere.', '#0F1115'],
];
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
const tone = copy.brand;
const guideHtml = `<!doctype html><html><head><style>${BASE_CSS}@page{size:297mm 210mm;margin:0}
body{width:297mm;height:210mm;background:${C.paper};padding:11mm 12mm;font-size:7.4pt;line-height:1.45;color:${C.graphite};overflow:hidden}
h1{font-size:19pt;letter-spacing:-.03em;line-height:1}h2{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:${C.deep};margin-bottom:2.5mm;font-weight:700}
.top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6mm}
.top p{color:${C.muted};font-size:8pt}
.g{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,.95fr);gap:4.5mm}.g>div{align-content:start;min-width:0}
.box{background:#fff;border-radius:3mm;padding:4mm;box-shadow:0 0 0 .25mm rgb(15 17 21/.08)}
.dk{background:${C.graphite};color:#fff}
.row{display:flex;gap:4mm;align-items:center}
.sw{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:1.5mm}
.sw div{border-radius:2mm;height:15mm;padding:1.3mm;overflow-wrap:anywhere;display:flex;flex-direction:column;justify-content:flex-end;font-size:6pt;line-height:1.25;box-shadow:inset 0 0 0 .25mm rgb(15 17 21/.08)}
.sw b{font-size:6.6pt}
.muted{color:${C.muted}}
.cs{position:relative;padding:7mm;border:.3mm dashed ${C.deep};display:inline-block;background:#fff}
.cs i{position:absolute;font-style:normal;font-size:6pt;color:${C.deep};font-weight:700}
.dont{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm}
.dont div{background:#fff;border-radius:2mm;height:17mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1mm;position:relative;overflow:hidden;box-shadow:0 0 0 .25mm rgb(15 17 21/.08)}
.dont small{font-size:5.6pt;color:${C.muted};position:absolute;bottom:1mm;left:0;right:0;text-align:center}
.dont div::after{content:'✕';position:absolute;top:.8mm;right:1.5mm;color:#B91C1C;font-weight:700;font-size:7pt}
ul{padding-left:3.5mm}li{margin-bottom:.6mm}
.say{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.say b{display:block;margin-bottom:1mm}
.t1{font-size:22pt;font-weight:700;letter-spacing:-.035em;line-height:1}
</style></head><body>
<div class="top"><div class="row">${inline('logo/loopient-horizontal-light.svg', '62mm')}</div><div style="text-align:right"><h1>Brand guide – röviden</h1><p>v1.0 · ${tone.slogan}</p></div></div>
<div class="g">
<div style="display:grid;gap:5mm">
  <div class="box"><h2>Logó</h2><div class="row" style="gap:4mm">${inline('logo/loopient-horizontal-light.svg', '40mm')}<div class="dk" style="padding:2.5mm;border-radius:2mm">${inline('logo/loopient-horizontal-dark.svg', '32mm')}</div>${inline('logo/loopient-stacked-light.svg', '15mm')}</div>
  <p class="muted" style="margin-top:2.5mm">A jel (L alakú, kétpengés levélszalag) és a LOOPIENT szóvédjegy kötött; ne rajzold újra. Az E három vízszintes vonal. Változatok: vízszintes, egymás alatti, csak jel, egyszínű (grafit, fehér, mély narancs).</p></div>
  <div class="box"><h2>Védőtér és minimális méret</h2><div class="row" style="gap:6mm;align-items:flex-start">
  <div class="cs"><i style="top:1.5mm;left:50%">x</i><i style="left:1.5mm;top:45%">x</i>${inline('logo/loopient-horizontal-light.svg', '34mm')}</div>
  <div><p><b>Védőtér:</b> minden oldalon legalább <b>x</b> = a LOOPIENT betűk magassága. Ebbe semmi nem kerülhet.</p>
  <p style="margin-top:1.5mm"><b>Minimális méret:</b> vízszintes logó 120 px / 30 mm széles; tagline nélkül 90 px / 22 mm; csak jel 16 px / 5 mm. Ez alatt a csak-jel változatot használd.</p></div></div></div>
  <div class="box"><h2>Tiltott használat</h2><div class="dont">
  <div>${inline('logo/loopient-horizontal-light.svg', '24mm', 'transform:scaleX(1.35)')}<small>Ne torzítsd</small></div>
  <div>${inline('logo/loopient-horizontal-light.svg', '24mm', 'transform:rotate(-12deg)')}<small>Ne forgasd</small></div>
  <div>${inline('logo/loopient-horizontal-light.svg', '24mm', 'filter:hue-rotate(150deg)')}<small>Ne színezd át</small></div>
  <div>${inline('logo/loopient-horizontal-light.svg', '24mm', 'filter:drop-shadow(1mm 1mm .6mm rgb(0 0 0/.5))')}<small>Ne adj effektet</small></div>
  <div style="background:${C.orange}">${inline('logo/loopient-horizontal-light.svg', '24mm')}<small style="color:${C.graphite}">Ne tedd zajos/narancs alapra</small></div>
  <div><span style="color:${C.orange};font-weight:600;font-size:8pt">Narancs szöveg</span><small>#F97316 szöveg világos alapon</small></div>
  </div></div>
</div>
<div style="display:grid;gap:5mm;align-content:start">
  <div class="box"><h2>Színek</h2><div class="sw">${swatches.map(([, h, , t]) => `<div style="background:${h};color:${t}"><b>${h}</b></div>`).join('')}</div>
  <ul style="margin-top:2.5mm">${swatches.map(([n, h, u]) => `<li><b>${n}</b> ${h} · RGB ${hexToRgb(h)} – <span class="muted">${u}</span></li>`).join('')}</ul></div>
  <div class="box"><h2>Tipográfia – Inter</h2><div class="t1">Te döntesz.</div><p class="muted" style="margin:1mm 0 2.5mm">Címek: Bold 700, betűköz −0,03 em, sorköz ~1,05</p>
  <p style="font-size:9pt">Szövegtörzs: Regular 400, 16 px, sorköz 1,6. Kiemelés: SemiBold 600.</p>
  <p style="margin-top:2mm;font-size:6.5pt;letter-spacing:.14em;font-weight:600;text-transform:uppercase;color:${C.deep}">Eyebrow · SemiBold · +0,14 em · nagybetű</p>
  <p class="muted" style="margin-top:2mm">Számok: tabular-nums. Minimum 16 px input-szöveg weben.</p></div>
</div>
<div style="display:grid;gap:5mm;align-content:start">
  <div class="box dk"><h2 style="color:${C.light}">Hangnem</h2><p style="font-size:9pt;font-weight:600">Tegező, szakszerű, emberi. Nincs túlígérés.</p>
  <p style="color:${C.onDark};margin-top:1.5mm">${tone.positioning}</p></div>
  <div class="box"><h2>Mit mondunk / mit nem</h2><div class="say">
  <div><b style="color:#15803D">Mondjuk ✓</b><ul><li>„leveszi a válladról”</li><li>„a meglévő rendszereidre építünk”</li><li>„megmondjuk, mi éri meg, és mi nem”</li><li>„ahol döntés kell, ott te döntesz”</li><li>konkrét példák, ellenőrizhető állítások</li></ul></div>
  <div><b style="color:#B91C1C">Nem mondjuk ✕</b><ul><li>„100%-os automatizálás”</li><li>„forradalmasítjuk a céged”</li><li>„az MI mindent megold”</li><li>„garantált megtérülés X nap alatt”</li><li>szakzsargon magyarázat nélkül</li></ul></div></div></div>
  <div class="box"><h2>Alapelvek</h2><ol style="padding-left:3.5mm">${tone.principles.map((p) => `<li><b>${p.title}.</b> <span class="muted">${p.text}</span></li>`).join('')}</ol></div>
  <div class="box" style="padding:3mm 4mm"><p><b>Névhasználat:</b> Loopient (nagy L, egybe). Csupa nagybetű csak a logóban. Nem rövidítjük.</p></div>
</div></div></body></html>`;
writeFileSync(B('brand-guide.html'), guideHtml);
await htmlToPdf(guideHtml, B('loopient-brand-guide.pdf'), 297, 210);
execFileSync('pdftoppm', ['-png', '-r', '120', '-singlefile', B('loopient-brand-guide.pdf'), B('brand-guide-preview')]);
console.log('brand guide PDF kész');

// ------------------------------------------------------------ webes másolatok a site/public-ba
const pub = [
  ['favicon/favicon.ico', 'favicon.ico'], ['favicon/favicon.svg', 'favicon.svg'], ['favicon/safari-pinned-tab.svg', 'safari-pinned-tab.svg'],
  ['favicon/apple-touch-icon.png', 'apple-touch-icon.png'], ['favicon/android-chrome-192x192.png', 'android-chrome-192x192.png'],
  ['favicon/android-chrome-512x512.png', 'android-chrome-512x512.png'], ['favicon/maskable-512x512.png', 'maskable-512x512.png'],
  ['social/og-image-1200x630.png', 'og.png'], ['logo/png/loopient-mark-light-512.png', 'brand/loopient-mark-512.png'],
  ['social/email-signature-logo@2x.png', 'brand/email-signature-logo@2x.png'],
  ['pattern/pattern-tile-light.svg', 'brand/pattern-tile-light.svg'], ['pattern/pattern-tile-dark.svg', 'brand/pattern-tile-dark.svg'],
  ['pattern/pattern-tile-orange.svg', 'brand/pattern-tile-orange.svg'],
];
for (const [from, to] of pub) copyFileSync(B(from), PUB(to));
console.log('site/public frissítve');
await closeBrowser();
