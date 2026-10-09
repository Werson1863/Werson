# Kitöltendő TODO-k élesítés előtt

Pontos lista a kódból: `cd site && npm run todos` (a szövegkönyvben és a configban maradt [TODO]/[helykitöltő] sorok). Az oldalon minden ilyen rész narancs szaggatott aláhúzással látszik.

## Te töltöd ki

- [ ] **Elérhetőségek** – `site/site.config.ts`: `[e-mail cím]`, `[telefonszám]`, céges LinkedIn URL
- [ ] **Péter LinkedIn-profilja** – `content/copy.json` → `about.founder.linkedin.href`
- [ ] **Domain** – `NEXT_PUBLIC_SITE_URL` (alapértelmezés `https://loopient.hu`, ellenőrizd)
- [ ] **E-mail szolgáltató** – Resend fiók, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, a küldő domain ellenőrzése (SPF/DKIM)
- [ ] **Péter adatai** – vezetéknév; 1–2 mondat szakmai háttér (főoldal), 3–4 mondatos bio (Rólunk); a Loopient indulásának története; székhely (ha publikus); nyelvek
- [ ] **Válaszidő** – az űrlap sikerüzenetében („1 munkanapon belül”?)
- [ ] **Árak** – felmérés (vagy „díjtalan”), projekt kiinduló ára, gondozás havidíja
- [ ] **Számok** – tipikus átfutási idők, gondozási feltételek (GYIK)
- [ ] **Integrációs lista** – csak olyan eszköz maradjon, amellyel tényleg dolgozol
- [ ] **Ügyfélnevek / referenciák** – most nincs egy sem; csak engedéllyel és valós adattal
- [ ] **Fotók** – 3 valódi kép Péterről → `photos/source/` → `python3 tools/photos.py` (lásd `photos/README.md`)
- [ ] **Eredeti logófájlok** – ha megvan a zip, `brand/logo/source/` alá; vessük össze a generált változattal
- [ ] **Hosting** – döntés: Vercel / Node.js-es szerver / osztott tárhely (lásd `docs/decisions.md` N1)

## Jogász / könyvelő

- [ ] Cégforma és teljes cégnév, székhely, cégjegyzék- vagy nyilvántartási szám, adószám, képviselő, kamarai tagság (Impresszum, levélpapír)
- [ ] Adatkezelési tájékoztató: jogalap, megőrzési idő, adatfeldolgozók (tárhely, Resend, analitika) neve és címe, hatálybalépés dátuma
- [ ] Ha lesz analitika: szolgáltató és a tájékoztató frissítése

## Kitöltés után

- [ ] `bash tools/build-all.sh`: a névjegy, a levélpapír, a social képek és a `copy.md` újragenerálása
- [ ] `cd site && npm run todos` → 0
- [ ] Deploy, majd tesztüzenet az éles űrlapról
