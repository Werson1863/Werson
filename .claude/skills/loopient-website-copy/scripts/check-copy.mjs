#!/usr/bin/env node
// Loopient szövegkönyv-ellenőrző (függőség nélkül).
// Használat: node check-copy.mjs <copy.json> [<eredeti copy.json>]
// - JSON-érvényesség
// - szerkezet-összevetés az eredetivel: törölt kulcs, típusváltozás (hiba), új kulcs, elemszám (figyelmeztetés / infó)
// - jelölések: [ELLENŐRIZENDŐ…] fájlban hiba; egyéb [...] figyelmeztetés; [TODO…] darabszám
// - kerülendő fordulatok, LOOPIENT folyó szövegben, egyenes idézőjel (figyelmeztetés, kézzel nézd át)
// Kilépési kód: 0 = nincs hiba, 1 = hiba, 2 = hibás hívás.
import { readFileSync } from 'node:fs';

const [, , currentPath, basePath] = process.argv;
if (!currentPath) {
  console.error('Használat: node check-copy.mjs <copy.json> [<eredeti copy.json>]');
  process.exit(2);
}

function load(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`HIBA: ${path} nem olvasható vagy nem érvényes JSON: ${e.message}`);
    process.exit(1);
  }
}

const errors = [];
const warnings = [];
const info = [];
const kind = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);
const join = (path, key) => (path ? `${path}.${key}` : key);

// strict = false: új tömbelem az első meglévő elemhez mérve; az eltérés itt csak figyelmeztetés.
function compare(before, after, path, strict = true) {
  const report = strict ? errors : warnings;
  const kb = kind(before);
  const ka = kind(after);
  if (kb !== ka) {
    report.push(`${path}: típusváltozás (${kb} → ${ka})`);
    return;
  }
  if (ka === 'array') {
    if (before.length !== after.length) info.push(`${path}: elemszám ${before.length} → ${after.length}`);
    after.forEach((el, i) => {
      if (i < before.length) compare(before[i], el, `${path}[${i}]`, strict);
      else if (before.length) compare(before[0], el, `${path}[${i}] (új elem)`, false);
    });
    return;
  }
  if (ka === 'object') {
    for (const k of Object.keys(before)) {
      if (!(k in after)) report.push(`${join(path, k)}: ${strict ? 'kulcs törölve' : 'hiányzó kulcs (a meglévő elemekhez képest)'}`);
    }
    for (const k of Object.keys(after)) {
      if (k in before) compare(before[k], after[k], join(path, k), strict);
      else warnings.push(`${join(path, k)}: új kulcs (a komponens csak akkor jeleníti meg, ha kódban is használják)`);
    }
  }
}

const AVOID = [
  /forradalm/i, /innovatív/i, /end-to-end/i, /maximaliz/i, /a jövő\b/i, /új dimenzió/i, /\b100 ?%/,
  /garantál/i, /piacvezető/i, /egyedülálló/i, /világszínvonal/i, /hiperautomatiz/i, /orchestration/i,
  /\bRPA\b/, /csapatunk/i, /kollégáink/i, /szakértőink/i, /elégedett ügyfel/i, /ügyfeleink/i,
  /éve[sn]? tapasztalat/i, /évnyi tapasztalat/i,
];
let todoCount = 0;

function scan(value, path) {
  if (kind(value) === 'array') return value.forEach((v, i) => scan(v, `${path}[${i}]`));
  if (kind(value) === 'object') return Object.entries(value).forEach(([k, v]) => scan(v, join(path, k)));
  if (typeof value !== 'string' || path === '_info' || path.startsWith('legal.')) return;

  for (const m of value.matchAll(/\[[^\]]*\]/g)) {
    if (/^\[ELLENŐRIZENDŐ/i.test(m[0])) errors.push(`${path}: ${m[0]} – fájlban [TODO: …] formában szerepeljen (SKILL.md 4. pont)`);
    else if (/^\[TODO/.test(m[0])) todoCount++;
    else if (!/^\[(e-mail cím|telefonszám)\]$/.test(m[0])) warnings.push(`${path}: ${m[0]} – a Rich minden [...] részt kitöltendőként jelöl, de a todos-szkript nem számolja`);
  }
  for (const re of AVOID) {
    const m = value.match(re);
    if (m) warnings.push(`${path}: kerülendő vagy ellenőrizendő kifejezés: „${m[0]}”`);
  }
  if (/LOOPIENT/.test(value)) warnings.push(`${path}: LOOPIENT folyó szövegben – „Loopient” a helyes (brand-guide 3. pont)`);
  if (value.includes('"')) warnings.push(`${path}: egyenes idézőjel – magyar idézőjelet („…”) használj`);
}

const current = load(currentPath);
if (basePath) compare(load(basePath), current, '');
scan(current, '');

const print = (title, list) => {
  if (!list.length) return;
  console.log(`\n${title} (${list.length}):`);
  for (const line of list) console.log(`  - ${line}`);
};
console.log(`Ellenőrzött fájl: ${currentPath}${basePath ? ` · összevetve: ${basePath}` : ' · szerkezet-összevetés nélkül'}`);
print('HIBA', errors);
print('Figyelmeztetés (kézzel nézd át)', warnings);
print('Infó', info);
console.log(`\n[TODO] jelölések: ${todoCount} · Eredmény: ${errors.length ? 'HIBÁS' : 'rendben'}`);
process.exit(errors.length ? 1 : 0);
