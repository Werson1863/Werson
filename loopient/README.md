# Loopient – arculat és weboldal

Üzleti automatizálás · Debrecen és távolról. **Szlogen:** *Te döntesz. A rutin megy magától.*

Ez a mappa a teljes arculati csomag és az élesíthető weboldal. A logó geometriája kötött: a megadott pengékből, az Inter Bold körvonalaiból (az E három vízszintes vonal) generáljuk, nem rajzoltuk újra.

## Mappaszerkezet

```
loopient/
├─ brand/                      arculati eszközök
│  ├─ logo/                    SVG: vízszintes, egymás alatti, csak jel, wordmark, app-ikon
│  │  └─ png/                  PNG 600/1200/2400 (lockupok), 256/512/1024 (jel, ikon)
│  ├─ favicon/                 favicon.ico (16/32/48), favicon.svg (sötét módot is kezel),
│  │                           apple-touch-icon 180, android 192/512, maskable 512,
│  │                           safari-pinned-tab.svg, monokróm változatok
│  ├─ icons/                   19 vonalikon (24 px rács) SVG + sprite.svg + png/ (48/96, grafit és narancs)
│  ├─ pattern/                 L-jel „hurok” mintázat: csempék (light/dark/orange) + 1600×900 SVG/PNG
│  ├─ social/                  OG 1200×630, LinkedIn borító 1584×396, profilkép 1080 (3 változat),
│  │                           e-mail aláírás-logó @2x (átlátszó + fehér), email-signature.html
│  ├─ print/                   névjegykártya PDF (85×55 + 3 mm kifutó, 2 oldal), levélpapír PDF (A4 + 3 mm),
│  │                           előnézeti PNG-k, HTML-forrás
│  ├─ loopient-brand-guide.pdf 1 oldalas brand guide (A4 fekvő) + brand-guide-preview.png
├─ photos/                     Péter fotói WebP 800/1200/1600 + manifest.json (jelenleg HELYKITÖLTŐK, lásd photos/README.md)
├─ content/
│  ├─ copy.json                A TELJES SZÖVEGKÖNYV – a weboldal innen tölt (egyetlen forrás)
│  ├─ copy.md                  ugyanez olvasható formában (generált)
│  └─ brand-guide.md           márkaplatform, hangnem, névhasználat, szlogenek, logó/szín/tipó szabályok
├─ design/
│  ├─ tokens.json              design tokenek (forrás)
│  ├─ tokens.css               CSS-változók (--lp-*), bármilyen stackhez
│  ├─ tailwind.theme.css       Tailwind v4 @theme
│  ├─ tailwind.config.snippet.js  Tailwind v3 részlet
│  └─ components.md            komponensek: gombok, kártyák, chip, accordion, űrlap, sticky menü, mock-UI
├─ mockups/                    oldaltervek (valódi render): főoldal, megoldások, rólunk, kapcsolat × 1440 / 768 / 375 px
├─ site/                       Next.js (App Router) + TypeScript + Tailwind v4 weboldal
└─ tools/                      generátorok (lásd lent)
```

## A weboldal

**Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4. Futásidejű függőség csak `next`, `react`, `react-dom`; a Resend-hívás sima `fetch`, nincs SDK.

**Oldalak:** `/` · `/megoldasok` · `/rolunk` · `/kapcsolat` · `/adatkezeles` · `/impresszum` · 404 · `sitemap.xml` · `robots.txt` · `manifest.webmanifest`

**Tartalom:** minden szöveg a `content/copy.json`-ból jön (`site/lib/content.ts`), a kódban nincs duplikált szöveg. Az elérhetőségek a `site/site.config.ts`-ben vannak. A `[TODO]` és `[helykitöltő]` részeket az oldal láthatóan, narancs szaggatott aláhúzással jelöli, hogy élesítés előtt egyik se maradjon benne.

**Benne van:**
- Magyar SEO: `lang="hu"`, oldalankénti title/description, canonical, OG/Twitter kép, sitemap, robots, schema.org `Organization` (a helykitöltő elérhetőség nem kerül bele).
- Kapcsolati űrlap: név, e-mail, cég, csapatméret-chipek, üzenet, GDPR-hozzájárulás. Szerveroldali validáció (Server Action), honeypot, időcsapda, IP-alapú rate limit, küldés Resend-en, siker/hiba/validációs állapotok. JS nélkül is működik.
- Süti/analitika: a sütisáv csak akkor jelenik meg, ha be van állítva analitika, és a script **csak hozzájárulás után** töltődik be; a lábléc „Süti-beállítások” gombja újranyitja.
- Akadálymentesség: skip link, billentyűzettel kezelhető mobilmenü (Esc, fókusz-visszaadás) és accordion, látható fókuszállapot, `aria-pressed` szűrők, `role="switch"`, élő régiók, AA kontraszt.
- Mozgás: egyetlen görbe `cubic-bezier(0.23,1,0.32,1)`, 150–250 ms, csak transform/opacity, `prefers-reduced-motion` tiszteletben tartva.

### Futtatás helyben

```bash
cd loopient/site
npm install
cp .env.example .env.local      # opcionális; fejlesztői módban kulcs nélkül az üzenet a konzolra kerül
npm run dev                     # http://localhost:3000
npm run build && npm start      # éles build
npm run typecheck
npm run todos                   # kilistázza a még kitöltendő [TODO]-kat
```

Képernyőképek (mockupok frissítése és túlcsordulás-ellenőrzés):
```bash
npm i -D playwright@1.56.1      # egyszer (vagy globális playwright)
npm run build && npm start &    # majd:
npm run screenshots             # → ../mockups/*-1440.png, *-768.png, *-375.png
```

### Mérések (helyi éles build, Lighthouse 13)

| Oldal | Mobil (telj. / akad. / BP / SEO) | Desktop |
|---|---|---|
| Főoldal | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Megoldások | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Rólunk | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Kapcsolat | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Adatkezelés | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

A Playwright-ellenőrzés 375, 768 és 1440 px-en egyik oldalon sem talált vízszintes túlcsordulást.

### Deploy a Vercelre

1. Push a repót GitHubra, majd Vercelen: **Add New → Project → Import** a repóra.
2. **Root Directory:** `loopient/site`. A Framework Preset automatikusan Next.js.
3. Hagyd bekapcsolva: **„Include files outside the root directory in the Build Step”** (alapértelmezés). Kell, mert az oldal a `../content` és `../photos` mappából olvas.
4. **Environment Variables** (Production + Preview):
   | Változó | Érték |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://[TODO: domain]` |
   | `RESEND_API_KEY` | Resend API kulcs [TODO] |
   | `CONTACT_TO_EMAIL` | ahová az üzenetek érkezzenek (vesszővel több cím is lehet) |
   | `CONTACT_FROM_EMAIL` | ellenőrzött Resend-domainről, pl. `Loopient weboldal <urlap@domain.hu>` |
   | `NEXT_PUBLIC_ANALYTICS_SRC` / `_DOMAIN` | opcionális, pl. Plausible; üresen nincs analitika és sütisáv sem |
5. **Deploy.** Utána **Settings → Domains**: add hozzá a domaint, és állítsd be a DNS-t a Vercel útmutatója szerint.
6. Resend: **Domains → Add domain**, majd a megadott SPF/DKIM DNS-rekordok felvétele, hogy a `CONTACT_FROM_EMAIL` domainje ellenőrzött legyen.
7. Élesítés előtt: `npm run todos` → nulla [TODO], valódi fotók (`photos/README.md`), jogi szövegek ellenőrizve.

## Generátorok (`tools/`)

Minden eszköz forrásból újragenerálható: `bash tools/build-all.sh` (Python 3 + `pip install fonttools pillow brotli`, Node 20+, Playwright Chromium, ImageMagick, poppler-utils).

| Szkript | Mit csinál |
|---|---|
| `build_brand.py` | logó-lockupok, favicon SVG, ikonkészlet, mintázat, `site/lib/brand.generated.ts` |
| `build_tokens.mjs` | `tokens.json` → `tokens.css`, Tailwind v4/v3, `site/app/theme.generated.css` |
| `photos.py` | fotók → WebP 800/1200/1600 + manifest (helykitöltő, ha nincs forrás) |
| `otf2ttf.py` | Inter TrueType a nyomdai PDF-ekhez (beágyazott CID TrueType, nem Type 3) |
| `render_assets.mjs` | PNG-k, favicon.ico, social képek, névjegy, levélpapír, brand guide PDF, `site/public` másolatok |
| `build_copy_md.mjs` | `copy.json` → `copy.md` |

## Kitöltendő [TODO]-lista

**Elérhetőségek** (`site/site.config.ts`): `[e-mail cím]`, `[telefonszám]`, céges LinkedIn URL; Péter LinkedIn-profilja (`copy.json` → `about.founder.linkedin.href`); a névjegyen és a levélpapíron is (`tools/render_assets.mjs`, majd újragenerálás).

**Domain:** `NEXT_PUBLIC_SITE_URL` (alapértelmezés: `https://loopient.hu`, ellenőrizd, hogy a tiéd-e), a névjegy és a levélpapír „W” sora.

**E-mail szolgáltató:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, a küldő domain ellenőrzése a Resendben.

**Személyes adatok és szöveg:** Péter vezetékneve; szakmai háttér (főoldali Rólunk-részlet, Rólunk oldal bio, 150 szavas bemutatkozó); a Loopient indulásának története; székhely (ha publikus); nyelvek; a válaszidő az űrlap sikerüzenetében.

**Árak és számok:** felmérés díja (vagy „díjtalan”), projekt kiinduló ára, gondozás havidíja, tipikus átfutási idők, gondozási feltételek (GYIK és Megoldások).

**Ügyfélnevek és referenciák:** jelenleg nincs egy sem az oldalon (szándékosan). Ha lesz, csak engedéllyel és valós adattal. Ellenőrizd az integrációs listát is: csak olyan eszköz maradjon benne, amellyel tényleg dolgozol.

**Jogi szövegek** (`copy.json` → `legal`, jogász ellenőrizze): cégforma és teljes cégnév, székhely, cégjegyzék-/nyilvántartási szám, adószám, képviselő, kamarai tagság; adatkezelés jogalapja, megőrzési idő, adatfeldolgozók (Vercel, Resend, analitika) neve és címe, hatálybalépés dátuma.

**Fotók:** 3 valódi fotó Péterről (`photos/README.md`).

**Analitika** (opcionális): szolgáltató kiválasztása, `NEXT_PUBLIC_ANALYTICS_SRC`, és az adatkezelési tájékoztató frissítése.
