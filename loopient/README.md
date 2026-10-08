# Loopient – weboldal

A Loopient (*Business automation*) magyar nyelvű céges weboldala.
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Minden oldal statikusan előrenderelt; egyedül a
kapcsolati űrlap végpontja (`/api/contact`) fut szerveroldalon.

> **Élesítés előtt:** a logók és fotók jelenleg helykitöltők, és sok szöveg/szám/ár kitalált – lásd **[TODO.md](./TODO.md)**.

## Oldalak

| Útvonal | Tartalom |
| --- | --- |
| `/` | Főoldal: announcement sáv, üveg menü, hero + mock, 3 feature-sor, „Mit váltunk ki” szűrő, integrációk, folyamat, alapelvek, rólunk, GYIK, záró CTA |
| `/megoldasok` | Területek, folyamat, árak, integrációk |
| `/rolunk` | Alapító bemutatkozás fotókkal, alapelvek, célcsoport |
| `/kapcsolat` | Űrlap + elérhetőségek |
| `/kapcsolat/koszonjuk` | Köszönőoldal JS nélküli beküldéshez (noindex) |
| `/adatvedelem` | Adatkezelési tájékoztató (váz) |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Futtatás helyben

Követelmény: Node.js 20.9+ (22 ajánlott).

```bash
cd loopient
npm install
cp .env.example .env.local      # opcionális: e-mail küldéshez
npm run dev                     # http://localhost:3000
```

- `npm run dev` / `npm run build` előtt automatikusan lefut az `npm run assets`: a logókat a
  `public/brand/` mappába másolja, a fotókból reszponzív WebP-ket készít (`public/images/team/`).
- Fejlesztői módban **Resend kulcs nélkül** is működik az űrlap: az üzenet a terminálba íródik.
- Éles build kipróbálása: `npm run build && npm start`.
- Típusellenőrzés: `npm run typecheck`.

### Hol mit cserélj

| Mit | Hol |
| --- | --- |
| E-mail, telefon, cím, cégnév, alapító | `src/config/site.ts` |
| Logók | `assets/logo/` (azonos fájlnévvel felülírni) |
| Fotók | `assets/photos/` (azonos alapnévvel felülírni, jpg/png/webp) |
| Főoldali szövegek, GYIK, integrációk | `src/content/home.ts` |
| Árak, megoldás-területek | `src/app/megoldasok/page.tsx` |
| Színek, easing, árnyékok | `src/app/globals.css` (`@theme`) |
| OG kép (1200×630) | `public/og.png` – újragenerálás: `node scripts/make-og.mjs` (Playwright kell hozzá) |

## Kapcsolati űrlap

- Mezők: név, e-mail, cég, csapatméret (chipek), üzenet, adatkezelési hozzájárulás.
- Validáció kliens- és szerveroldalon ugyanazzal a kóddal (`src/lib/contact.ts`), a szerver a mérvadó.
- Spamvédelem: rejtett honeypot mező, 3 mp-es időcsapda, IP-nkénti rate limit (5 / 10 perc). Botnak
  „sikert” mutat, de nem küld e-mailt.
- Küldés a Resend REST API-n keresztül (`src/app/api/contact/route.api.ts`), SDK nélkül.
- JS nélkül is működik: natív POST → átirányítás a köszönő- vagy hibaállapotra.

Környezeti változók (`.env.example`):

| Változó | Leírás |
| --- | --- |
| `RESEND_API_KEY` | Resend API kulcs (**titok**) |
| `CONTACT_TO_EMAIL` | Címzett(ek), vesszővel elválasztva |
| `CONTACT_FROM_EMAIL` | Feladó Resendben hitelesített domainről, pl. `Loopient weboldal <urlap@loopient.hu>` |
| `NEXT_PUBLIC_SITE_URL` | Kanonikus cím (sitemap, OG, canonical), pl. `https://loopient.hu` |

## Deploy Vercelre

1. **Resend**: regisztrálj a [resend.com](https://resend.com)-on, *Domains* → add hozzá a domaint, állítsd be
   a megadott DNS rekordokat (SPF/DKIM), majd *API Keys* → hozz létre egy *Sending access* kulcsot.
2. Töltsd fel a repót GitHubra (ez a mappa: `loopient/`).
3. [vercel.com/new](https://vercel.com/new) → *Import* a repót.
4. **Root Directory**: `loopient` (a repó gyökerében más projekt is van). A Framework Preset automatikusan
   *Next.js*; a build parancsot és a kimenetet hagyd alapértelmezésen.
5. *Environment Variables*: add meg a `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` és
   `NEXT_PUBLIC_SITE_URL` értékét (Production, és ha kell, Preview környezetre is).
6. *Deploy*. Utána *Settings → Domains*: add hozzá a `loopient.hu`-t (és `www`-t átirányításként), majd
   állítsd be a DNS-t a Vercel utasításai szerint.
7. Küldj egy tesztüzenetet az éles `/kapcsolat` oldalról, és nézd meg a Vercel *Logs* fület, ha nem érkezik meg.

CLI-vel: `npm i -g vercel`, majd a `loopient/` mappában `vercel` (preview) és `vercel --prod`.

## Statikus export (opcionális)

Ha nem Vercelre, hanem tisztán statikus tárhelyre mész:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://valami.hu/api/contact npm run build:static   # → out/
```

Ilyenkor az API route kimarad (a `*.api.ts` kiterjesztést csak a normál build kezeli route-ként), és az
űrlap a `NEXT_PUBLIC_CONTACT_ENDPOINT` címre küld. Ez egy külön hosztolt végpont legyen, amely
ugyanazt a JSON-t fogadja (pl. ugyanez a projekt Vercelen).

## Minőség – mért eredmények

Lighthouse 12.8 (`next start`, helyi gép), mobil / asztali:

| Oldal | Teljesítmény | Akadálymentesség | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 96–98 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/megoldasok` | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/rolunk` | 97 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/kapcsolat` | 97 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |

CLS mindenhol 0. Playwright-tal ellenőrizve 375 / 768 / 1440 px szélességen: nincs vízszintes
túlcsordulás és nincs konzolhiba; billentyűzetes GYIK (↑ ↓ Home End Enter Space), mobil menü (Esc),
űrlap-fókuszkezelés és hiba/siker állapotok rendben.

### Craft-szabályok a kódban

- Easing `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`), 160–250 ms; csak `transform` és `opacity`
  animálódik, sehol nincs `transition: all`.
- Gombok `:active` → `scale(0.97)`, 160 ms. Hover csak `@media (hover: hover) and (pointer: fine)` mögött
  (a Tailwind `hover:` variáns is így van felüldefiniálva).
- Hero lépcsőzetes belépő (CSS), görgetéses reveal (IntersectionObserver); `prefers-reduced-motion`
  esetén kikapcsolva, JS nélkül minden azonnal látszik.
- Címek: `letter-spacing: -0.03em`, `line-height: 1.05`; számok `tabular-nums`.
- Átlátszó, rétegzett árnyékok tömör keret helyett; sticky menü `blur(20px) saturate(180%)`.
- Mobil: min. 44 px érintési felület, 16 px-es inputok, `touch-action: manipulation`, tap-highlight
  kikapcsolva, `min-w-0` + `overflow-wrap: anywhere` a hosszú szövegeknél.
- Font: Inter variable, magyar karakterekre szűkített egyetlen 48 KB-os fájl (`src/app/fonts/`).
