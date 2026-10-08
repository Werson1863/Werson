# TODO – kicserélendő helykitöltők és kitalált tartalmak

Minden alábbi tétel **kitalált vagy ideiglenes**. Élesítés előtt cseréld valósra.

## 0. Hiányzó márka-assetek (a repóban nem voltak meg)

- [ ] **Logók** – `assets/logo/`: a jelenlegi 4 SVG **helykitöltő**. Írd felül azonos névvel a valódiakkal:
  - `logo-horizontal-on-light.svg` – vízszintes logó világos háttérre (menü)
  - `logo-horizontal-on-dark.svg` – vízszintes logó sötét háttérre (footer)
  - `logo-mark.svg` – a jel (schema.org logó)
  - `favicon.svg` – favicon (ebből készül a 32 px-es PNG és az apple-touch-icon is)
  - Ha más a fájlnév vagy a méretarány, írd át: `src/config/site.ts` → `logo` (`width`/`height` = a viewBox aránya).
- [ ] **Fotók** – `assets/photos/`: a 3 JPG **helykitöltő sziluett**. Írd felül (jpg/png/webp is jó):
  - `peter-portre-szines.*` – színes portré (Főoldal „Ki áll mögötte”, Rólunk)
  - `peter-teljes-alakos.*` – teljes alakos (Rólunk)
  - `peter-portre-ff.*` – fekete-fehér portré (narancs záró CTA, minden oldal alján)
  - A build automatikusan WebP-t és srcset-et generál (`npm run assets`). Ajánlott forrásméret: min. 1600 px széles.
  - A portrék 4:5, a teljes alakos 2:3 arányban, középre vágva jelennek meg – álló fotó az ideális.
- [ ] **OG kép** (`public/og.png`) – a logócsere után generáld újra: `node scripts/make-og.mjs`.

## 1. Elérhetőségek – `src/config/site.ts`

- [ ] `contact.email` – `[e-mail cím]`
- [ ] `contact.phone` – `[telefonszám]`, és `contact.phoneHref` (pl. `+36301234567`, különben nem kattintható)
- [ ] `contact.address` – `[cím]`
- [ ] `contact.hours` – „Hétfő–péntek, 9:00–17:00” (kitalált)
- [ ] `legalName` – cégnév cégformával (pl. Loopient Kft.)
- [ ] `founder.name` – teljes név (most csak „Péter”), `founder.role`
- [ ] `social.linkedin` – ha van
- [ ] `NEXT_PUBLIC_SITE_URL` – végleges domain (alapértelmezés: `https://loopient.hu`)

## 2. Kitalált számok és idők

**Főoldal – hero mock** (`src/content/home.ts` → `heroTasks`, `src/components/mock/HeroMock.tsx`)
- [ ] 14 számla, 3 ajánlatkérés, 212 termék, 2 szerződés, időpontok 06:00–06:07
- [ ] „≈ 2 óra 40 perc kézi munka megspórolva”

**Feature mockok** (`src/components/mock/*.tsx`) – minta cégnevek (Kovács és Társa Bt., Nagy Logisztika Kft., Duna Webshop), rendelés- és számlaszámok, „0 hiba az elmúlt 30 napban”.

**„Mit váltunk ki” kártyák** (`src/content/home.ts` → `replaceItems`) – minden „~X óra/hét” érték.

**Folyamat** (`processSteps`) – „1 hét”, „1–3 hét”.

**Megoldások oldal** (`src/app/megoldasok/page.tsx` → `areas[].result`)
- [ ] „akár heti 6–8 óra”, „akár heti 3–5 óra”, „akár 30%-kal gyorsabb válaszidő”, „akár heti 2–4 óra”, „akár 90%-kal kevesebb kézi rögzítés”, „akár heti 3–6 óra”

**Rólunk** (`src/app/rolunk/page.tsx` → `facts`) – „10+ év”, „40+ automatizált folyamat”, „1 nap”.
- [ ] „Jellemzően 3–100 fős cégekkel dolgozunk” és a 4 célcsoport.

## 3. Kitalált árak – `src/app/megoldasok/page.tsx` → `packages`, és a GYIK

- [ ] Felmérés: Ingyenes, 30 perc
- [ ] Egy folyamat: **150 000 Ft-tól + áfa**, 1–3 hét, 30 nap ingyenes hibajavítás
- [ ] Üzemeltetés: **25 000 Ft-tól + áfa / hó**
- [ ] A „Legnépszerűbb” címke

## 4. Kitalált szövegek

- [ ] **GYIK válaszok** – mind a 7 (`src/content/home.ts` → `faqs`). Az ár- és időadatok a 3. ponttal együtt változnak. (A GYIK a schema.org FAQPage-be is bekerül.)
- [ ] **Alapító bemutatkozás** – Főoldal `AboutTeaser` (`src/components/home/Sections.tsx`) és Rólunk oldal („Pályám nagy részét…”).
- [ ] **Alapelvek** (`principles`) – főleg az „EU-s adattárolás” és „adatfeldolgozói szerződés minden projekthez” állítások: csak akkor maradjanak, ha igazak.
- [ ] Integrációk listája (`integrations`) – csak olyan eszközt hagyj, amivel tényleg dolgoztok.
- [ ] „Egy munkanapon belül válaszolunk” ígéret (több helyen).
- [ ] **Adatkezelési tájékoztató** (`src/app/adatvedelem/page.tsx`) – általános váz, **jogásszal véglegesítendő** (adatkezelő adatai, megőrzési idő, adatfeldolgozók).

## 5. Élesítés

- [ ] Resend: domain hitelesítése, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` beállítása Vercelen
- [ ] Egy valódi tesztüzenet küldése az éles űrlapról
- [ ] Google Search Console: domain igazolás, `sitemap.xml` beküldése
