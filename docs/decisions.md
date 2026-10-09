# Döntésnapló

Formátum: döntés → indok → következmény. A nyitott kérdések a lap alján.

## Márka

| # | Döntés | Indok | Hol |
|---|---|---|---|
| D1 | A jel a promptban megadott két penge (100×100 doboz), változtatás nélkül | A logó kiválasztott és kötött; a zip nem érkezett meg | `tools/build_brand.py`, `brand/logo/` |
| D2 | A szóvédjegy Inter Bold körvonalakból, az E három azonos vonal; a BUSINESS AUTOMATION pontosan a szóvédjegy szélességére betűzve | A prompt leírása szerint; körvonalazva nem függ telepített fonttól | `brand/logo/*wordmark*` |
| D3 | Pengeszínek: világos alapon narancs + mély narancs, sötét alapon narancs + világos narancs; egyszínű változatban a pengék összeolvadnak | Kontraszt mindkét háttéren; egyszínű nyomtatásnál nem lehet két árnyalat | `content/brand-guide.md` §6 |
| D4 | Ajánlott szlogen: „Te döntesz. A rutin megy magától.” | Kontroll + haszon, a „loop” (ember a hurokban) gondolat; nincs túlígérés | `content/copy.json` → `brand.slogans` |
| D5 | Mintázat: négy L sarokkal kifelé = zárt keret („hurok”) | Az első, szélkerékszerű változat nem a márkát idézte | `brand/pattern/` |
| D6 | A menü ikon a logó E-jére rímel (három azonos vonal) | Finom márkaelem a felületen | `brand/icons/menu.svg` |
| D7 | Narancs alapon grafit szöveg, sosem fehér | Fehér narancson 2,8:1 (nem AA), grafit 6,7:1 | `design/tokens.json` |

## Tartalom

| # | Döntés | Indok |
|---|---|---|
| T1 | Egyetlen szövegforrás: `content/copy.json`; a `copy.md` ebből generálódik | Ne csússzon szét a kód és a dokumentum |
| T2 | Ügyfélnév, ár, eredményszám nincs kitalálva; a [TODO]-k az oldalon láthatóan jelölve | Ne állítsunk valótlant (prompt-kérés) |
| T3 | A mock-UI kártyák „Példa” jelölést kapnak, a fájlnevekben nincs cégnév | A példaadat ne tűnjön referenciának |
| T4 | Tegező hangnem | Prompt-kérés; partneri viszony kis cégekkel |

## Technika

| # | Döntés | Indok |
|---|---|---|
| W1 | Next.js 16 App Router + Tailwind v4, futásidejű függőség csak next/react | „Minimális függőség” |
| W2 | Resend sima `fetch`-csel, SDK nélkül | Egy függőséggel kevesebb |
| W3 | Saját hostolású Inter woff2 (latin + magyar ékezetek), `next/font/local` | Nincs külső fontkérés, gyorsabb mobil LCP, a build hálózat nélkül is megy |
| W4 | A sütisáv csak akkor jelenik meg, ha van analitika; a script csak hozzájárulás után töltődik | GDPR; analitika nélkül fölösleges sávot mutatni |
| W5 | Hero cím és lead belépő animáció nélkül | Az opacity-animáció késleltette az LCP-t és rontotta a kontrasztmérést |
| W6 | Nyomdai PDF-ekben TrueType Inter (OTF→TTF konverzió) | A Chromium a CFF-alapú fontot Type 3-ként ágyazta be |
| W7 | Mockupok = a valódi oldal képernyőképei | Mindig egyeznek a megvalósítással, szkripttel frissíthetők |

## Nyitott kérdések

| # | Kérdés | Háttér | Javaslat |
|---|---|---|---|
| N1 | **Hol fusson az oldal: Vercel vagy saját tárhely?** | A v1-ben „Felejtsük el a Vercelt”, a későbbi v2 prompt viszont Vercel-deployt kért. A kód nem függ a Verceltől. | Ha Node.js-es szerver/VPS: `npm run build && npm start` + nginx/Caddy. Ha osztott PHP-tárhely: statikus export + külön űrlapfogadó (a v1-ben volt rá terv). Ha Vercel: README lépések. |
| N2 | Domain: `loopient.hu` a tiéd? | Az alapértelmezés feltételezés. | Ellenőrizni, regisztrálni. |
| N3 | Hogyan nézed meg az oldalt? | A v1 végén két lehetőség maradt nyitva: helyi futtatás vagy privát előnézeti link. | Deploy után az éles URL megoldja. |
| N4 | Cégforma (Kft. / egyéni vállalkozó) | Jogi szövegek, impresszum, levélpapír függ tőle. | Könyvelővel egyeztetni. |
