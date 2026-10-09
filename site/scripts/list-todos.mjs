// Kilistázza a szövegkönyvben és a configban maradt [TODO] / [helykitöltő] részeket.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['../content/copy.json', 'site.config.ts', '.env.example'];
let n = 0;
for (const f of files) {
  readFileSync(resolve(root, f), 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/\[(TODO[^\]]*|e-mail cím|telefonszám)\]/g)) {
      n++;
      console.log(`${f}:${i + 1}  ${m[0]}`);
    }
  });
}
console.log(`\n${n} kitöltendő hely.`);
