#!/usr/bin/env bash
# Minden arculati eszköz újragenerálása a forrásokból. Futtatás: bash tools/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/build_brand.py        # logók, ikonok, mintázat, favicon SVG, site/lib/brand.generated.ts
node tools/build_tokens.mjs          # design tokenek → CSS / Tailwind
python3 tools/photos.py              # fotók → WebP 800/1200/1600 + manifest
python3 tools/otf2ttf.py             # Inter TTF a nyomdai PDF-ekhez (tools/.cache)
node tools/render_assets.mjs         # PNG-k, favicon.ico, social, névjegy, levélpapír, brand guide PDF, site/public
node tools/build_copy_md.mjs         # content/copy.json → content/copy.md
echo "Kész."
