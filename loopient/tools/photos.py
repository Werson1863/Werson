#!/usr/bin/env python3
"""Fotó-pipeline: photos/source/*.jpg|png → WebP 800/1200/1600 px + manifest.

Tedd a valódi fotókat ide (fájlnév számít):
  photos/source/portrait-color.jpg   színes portré  → Rólunk szekció (főoldal) és Rólunk oldal
  photos/source/portrait-bw.jpg      portré, ebből fekete-fehér készül (vagy már ff fotó) → záró CTA fölé
  photos/source/full-body.jpg        teljes alakos → Rólunk oldal

Csak vágás (középre, a megadott képarányra), átméretezés és tömörítés történik, retusálás NEM.
Ha egy forrásfájl hiányzik, címkézett helykitöltő készül (placeholder: true a manifestben).
Futtatás: python3 tools/photos.py
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "photos" / "source"
OUT = ROOT / "photos"
PUBLIC = ROOT / "site" / "public" / "photos"
WIDTHS = (800, 1200, 1600)
FONT = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
FONT_R = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"

PHOTOS = {
    "portrait-color": {"ratio": (4, 5), "bw": False, "label": "Színes portré", "use": "Rólunk szekció"},
    "portrait-bw": {"ratio": (1, 1), "bw": True, "label": "Fekete-fehér portré", "use": "Záró CTA fölé"},
    "full-body": {"ratio": (2, 3), "bw": False, "label": "Teljes alakos fotó", "use": "Rólunk oldal"},
}


def find_source(name: str) -> Path | None:
    for ext in ("jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"):
        p = SRC / f"{name}.{ext}"
        if p.exists():
            return p
    return None


def placeholder(name: str, cfg: dict, w: int, h: int) -> Image.Image:
    """Semleges, egyértelműen jelölt helykitöltő – nem ábrázol valódi személyt."""
    bw = cfg["bw"]
    top = (236, 233, 228) if not bw else (232, 232, 232)
    bottom = (214, 208, 200) if not bw else (205, 205, 205)
    img = Image.new("RGB", (w, h), top)
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    sil = (196, 188, 178) if not bw else (186, 186, 186)
    cx = w / 2
    if name == "full-body":
        hr = w * 0.085
        hy = h * 0.2
        d.ellipse([cx - hr, hy - hr, cx + hr, hy + hr], fill=sil)
        d.rounded_rectangle([cx - w * 0.17, hy + hr * 1.25, cx + w * 0.17, h * 0.62], radius=int(w * 0.08), fill=sil)
        d.rounded_rectangle([cx - w * 0.14, h * 0.58, cx - w * 0.015, h * 0.94], radius=int(w * 0.04), fill=sil)
        d.rounded_rectangle([cx + w * 0.015, h * 0.58, cx + w * 0.14, h * 0.94], radius=int(w * 0.04), fill=sil)
    else:
        hr = w * 0.16
        hy = h * 0.40
        d.ellipse([cx - hr, hy - hr, cx + hr, hy + hr], fill=sil)
        d.ellipse([cx - w * 0.42, hy + hr * 1.15, cx + w * 0.42, h * 1.35], fill=sil)
    # címke
    f1 = ImageFont.truetype(FONT, max(18, int(w * 0.034)))
    f2 = ImageFont.truetype(FONT_R, max(14, int(w * 0.024)))
    lines = [("FOTÓ HELYE", f1), (f"{cfg['label']} – Péter", f2), (f"cseréld: photos/source/{name}.jpg", f2)]
    y = int(h * 0.06)
    for text, f in lines:
        tw = d.textlength(text, font=f)
        d.text(((w - tw) / 2, y), text, font=f, fill=(90, 84, 78) if not bw else (80, 80, 80))
        y += int(f.size * 1.5)
    return img


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for name, cfg in PHOTOS.items():
        rw, rh = cfg["ratio"]
        src = find_source(name)
        if src:
            im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
            w = min(im.width, 1600)
            im = ImageOps.fit(im, (w, int(w * rh / rw)), method=Image.LANCZOS, centering=(0.5, 0.35))
            if cfg["bw"]:
                im = ImageOps.grayscale(im).convert("RGB")
        else:
            im = placeholder(name, cfg, 1600, int(1600 * rh / rw))
        sizes = []
        for w in WIDTHS:
            if w > im.width:
                continue
            h = round(w * rh / rw)
            r = im.resize((w, h), Image.LANCZOS)
            for target in (OUT, PUBLIC):
                r.save(target / f"{name}-{w}.webp", "WEBP", quality=80, method=6)
            sizes.append(w)
        manifest[name] = {
            "src": f"/photos/{name}",
            "widths": sizes,
            "ratio": [rw, rh],
            "placeholder": src is None,
            "use": cfg["use"],
        }
        print(f"{name}: {'forrásból' if src else 'HELYKITÖLTŐ'} → {sizes}")
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
