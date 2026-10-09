// Build előtti asset-lépés (npm run assets / predev / prebuild):
//  1. assets/logo/*.svg  -> public/brand/   (+ 32 px és 180 px PNG ikon a jelből)
//  2. assets/photos/*    -> public/images/team/<név>-<szélesség>.webp  (reszponzív srcset)
//  3. src/generated/photos.json – méretek és szélességek a <Photo> komponensnek
import { mkdir, readdir, copyFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logoSrc = path.join(root, "assets/logo");
const photoSrc = path.join(root, "assets/photos");
const brandOut = path.join(root, "public/brand");
const photoOut = path.join(root, "public/images/team");
const manifestOut = path.join(root, "src/generated/photos.json");

// A fotók azonosítója -> forrásfájl alapneve (kiterjesztés nélkül) az assets/photos mappában.
const PHOTOS = {
  portrait: { file: "peter-portre-szines" },
  fullBody: { file: "peter-teljes-alakos" },
  portraitBw: { file: "peter-portre-ff", grayscale: true },
};
const WIDTHS = [400, 640, 960, 1280, 1600];
const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"];

async function isFresh(src, out) {
  if (!existsSync(out)) return false;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return b.mtimeMs >= a.mtimeMs;
}

async function logos() {
  await mkdir(brandOut, { recursive: true });
  const files = (await readdir(logoSrc)).filter((f) => f.endsWith(".svg"));
  await Promise.all(files.map((f) => copyFile(path.join(logoSrc, f), path.join(brandOut, f))));
  const mark = ["favicon.svg", "logo-mark.svg"].map((f) => path.join(logoSrc, f)).find(existsSync);
  if (mark) {
    await sharp(mark, { density: 600 }).resize(32, 32).png().toFile(path.join(brandOut, "favicon-32.png"));
    await sharp(mark, { density: 600 })
      .resize(180, 180, { fit: "contain", background: "#F97316" })
      .flatten({ background: "#F97316" })
      .png()
      .toFile(path.join(brandOut, "apple-touch-icon.png"));
  }
  console.log(`[assets] logók: ${files.join(", ")}`);
}

async function photos() {
  await mkdir(photoOut, { recursive: true });
  await mkdir(path.dirname(manifestOut), { recursive: true });
  const available = await readdir(photoSrc);
  const manifest = {};

  for (const [id, { file, grayscale }] of Object.entries(PHOTOS)) {
    const src = available.find((f) => path.parse(f).name === file && EXTS.includes(path.extname(f).toLowerCase()));
    if (!src) {
      throw new Error(
        `[assets] Hiányzó fotó: assets/photos/${file}.(jpg|png|webp). Elérhető fájlok: ${available.join(", ") || "–"}`,
      );
    }
    const srcPath = path.join(photoSrc, src);
    const img = sharp(srcPath).rotate(); // EXIF szerinti forgatás
    const meta = await img.metadata();
    const oriented = (meta.orientation ?? 1) >= 5;
    const width = oriented ? meta.height : meta.width;
    const height = oriented ? meta.width : meta.height;
    const widths = WIDTHS.filter((w) => w < width).concat(width > WIDTHS.at(-1) ? [] : [width]);
    const sizes = [...new Set(widths)].sort((a, b) => a - b);

    const { dominant } = await sharp(srcPath).resize(32).stats();
    const toHex = (n) => n.toString(16).padStart(2, "0");
    let placeholder = `#${toHex(dominant.r)}${toHex(dominant.g)}${toHex(dominant.b)}`;
    if (grayscale) {
      const l = Math.round(0.299 * dominant.r + 0.587 * dominant.g + 0.114 * dominant.b);
      placeholder = `#${toHex(l)}${toHex(l)}${toHex(l)}`;
    }

    await Promise.all(
      sizes.map(async (w) => {
        const out = path.join(photoOut, `${file}-${w}.webp`);
        if (await isFresh(srcPath, out)) return;
        let pipeline = sharp(srcPath).rotate().resize({ width: w, withoutEnlargement: true });
        if (grayscale) pipeline = pipeline.grayscale();
        await pipeline.webp({ quality: 78, effort: 5 }).toFile(out);
      }),
    );

    manifest[id] = { base: `/images/team/${file}`, width, height, widths: sizes, placeholder };
    console.log(`[assets] ${id}: ${src} -> ${sizes.join(", ")} px WebP`);
  }
  await writeFile(manifestOut, JSON.stringify(manifest, null, 2) + "\n");
}

await logos();
await photos();
