# Fotók

Jelenleg **címkézett helykitöltők** vannak itt („FOTÓ HELYE”), nem valódi fotók. [TODO]

## Csere

1. Tedd a fotókat a `photos/source/` mappába, pontosan ezekkel a nevekkel (jpg/png/webp):
   | Fájl | Tartalom | Képarány | Hova kerül |
   |---|---|---|---|
   | `portrait-color.jpg` | színes portré | 4:5 | főoldal, Rólunk-részlet |
   | `portrait-bw.jpg` | portré (színes is lehet, a szkript fekete-fehérre alakítja) | 1:1 | főoldal, záró CTA fölött |
   | `full-body.jpg` | teljes alakos | 2:3 | Rólunk oldal |
2. Futtasd: `python3 tools/photos.py`
3. A szkript **csak vág** (középre, kicsit felfelé súlyozva), **méretez** és **WebP-be tömörít** (800/1200/1600 px). Retusálás, bőrsimítás, szűrő nincs.
4. A kimenet ide és a `site/public/photos/` mappába kerül, a `manifest.json` frissül (`placeholder: false`).

Forrás-tipp: legalább 1600 px széles, éles, természetes fényű kép. Az alt szövegek a `content/copy.json`-ban vannak (`about.founder.portraitAlt`, `about.founder.photoAlt`, `home.cta.photoAlt`).
