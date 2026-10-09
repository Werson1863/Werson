# Weboldal-audit – tartalom, konverzió, SEO, bizalom

> **Dátum:** 2026-10-09 · **Vizsgált állapot:** `claude/loopient-repo` ág, `eb11dec` commit (v2 weboldal)
> **Módszer:** a forrás (`content/copy.json`, `site/`), a dokumentáció (`README.md`, `docs/`, `content/brand-guide.md`), a lefordított build HTML-je és a mockupok átnézése. A weboldal fájljai ebben a fázisban **nem változtak**.
> Kapcsolódó: [stratégiai javaslat](website-content-strategy.md) · [leltár](website-content-inventory.md) · [haladás](website-content-progress.md)

## 1. Összegzés (5 pont)

1. **A pozicionálás szélesebb, mint a tényleges szolgáltatási irány.** Az oldal általános „üzleti automatizálást” ígér hat területen (riportok, dokumentumok, rendszerintegráció, jóváhagyások, kommunikáció, MI-feldolgozás), 18 megnevezett eszközzel. Az Excel és a Google Sheets, ami a megadott alapirány, csak egy-egy felsorolásban szerepel.
2. **A hero nem mondja meg, mit csinál a Loopient.** A H1 a szlogen („Te döntesz. A rutin megy magától.”), ebből nem derül ki, hogy kinek szól és milyen problémát old meg; ezt csak a lead mondja el. A H1-ben nincs keresési kulcsszó.
3. **A szöveg többes szám első személyben beszél** („mi”, „dolgozunk”, „Írj nekünk”), ez csapatot sugall, a projekt szerint viszont egy alapító van. Több mondat ügyfélállományt vagy kutatási eredményt sugall (lásd 4. fejezet).
4. **Az oldal ebben az állapotban nem tud érdeklődőt fogadni.** Az e-mail és a telefonszám helykitöltő, a Resend nincs beállítva (élesben az űrlap „nincs beállítva” hibát ad), a főoldali „Írj e-mailt” gomb `mailto:[e-mail cím]` címre mutat. 47 `[TODO]` maradt.
5. **Technikailag jó az alap:** buildel, típushibátlan, statikus oldalak, rendes metaadatok, sitemap, akadálymentes komponensek, egyetlen szövegforrás (`copy.json`). A tartalmi munka a stack cseréje nélkül, főleg a `copy.json`-ban elvégezhető.

## 2. Technikai stack és korlátok

| Terület | Állapot | Mit jelent a tartalmi munkára |
|---|---|---|
| Stack | Next.js 16.4 (App Router), React 19.3, TypeScript, Tailwind v4; futásidejű függőség csak `next`/`react` | Nem cseréljük |
| Szövegforrás | Minden szöveg a `content/copy.json`-ban; `site/lib/content.ts` tölti be, `{email}`/`{phone}`/`{year}` behelyettesítéssel | A szöveg módosítása = JSON-szerkesztés; a `copy.md` generált (`node tools/build_copy_md.mjs`) |
| Szerkezet | A szekciók sorrendje és megléte a `site/app/**/page.tsx`-ben, a megjelenés a `site/components/`-ben van | Új vagy törölt szekció = kódváltozás is, nem csak szöveg |
| Kötött szerkezetek | A hero cím 3 sorra tördelt tömb (`titleLines`), a feature-sorokhoz 3 mock-UI tartozik (riport/dokumentum/szinkron), az alapelvekből 3, a lépésekből 3 van | Ha a darabszám vagy a mock tartalma változik, a komponenst is érinti |
| Helykitöltő-jelölés | A `Rich` komponens a `[…]` részeket narancs aláhúzással mutatja; `npm run todos` listázza | Jó minőségkapu: élesítés előtt 0 legyen |
| Ellenőrzés | `npm run typecheck`, `npm run build`, `npm run todos`; CI ugyanezt futtatja. Playwright-képernyőkép szkript van, de a Playwright nincs a függőségek közt | Nincs automata teszt a szövegre; vizuális ellenőrzés a Chromiummal megoldható |
| Hosting | Nyitott (Vercel vagy saját szerver, `docs/decisions.md` N1); domain nem ellenőrzött (N2) | A canonical/OG URL feltételezett (`https://loopient.hu`) |
| Mérés | Analitika opcionális, nincs beállítva; nincs konverziós esemény | **A konverzió jelenleg nem mérhető.** Az optimalizáláshoz kell legalább űrlapküldés-mérés |
| Claude Code skillek | A repóban nem volt `.claude/` mappa | A `loopient-website-copy` skill új |

**Lefuttatott ellenőrzések (2026-10-09):** `npm run typecheck` ✓ · `npm run build` ✓ (11 statikus útvonal) · `npm run todos` → **47 kitöltendő hely**.

## 3. Oldalak és szekciók

| Oldal | Útvonal | Szekciók (sorrendben) |
|---|---|---|
| Főoldal | `/` | announcement sáv · hero + „Ma reggel, automatikusan” mock · 3 terület (riport/dokumentum/rendszer) mockkal · szűrhető folyamatkártyák (10 db, 5 kategória) · integrációs rács (18 eszköz) · folyamat 01–03 · alapelvek · Rólunk-részlet · GYIK (8) · záró CTA |
| Megoldások | `/megoldasok` | oldalhero + horgonychipek · 6 terület (gond / amit építünk / példák) · együttműködési modellek (Felmérés / Projekt / Gondozás, árak nélkül) · folyamat 01–03 (ismétlés) · CTA |
| Rólunk | `/rolunk` | oldalhero · „Miért Loopient?” · alapító (fotó, bio, idézet, LinkedIn, tények) · alapelvek (ismétlés) · CTA |
| Kapcsolat | `/kapcsolat` | oldalhero · űrlap · elérhetőség · „Mi történik ezután?” |
| Adatkezelés | `/adatkezeles` | vázlat, 5 fejezet, sok `[TODO]` |
| Impresszum | `/impresszum` | vázlat, szinte csak `[TODO]` |
| 404 | – | „Ez az oldal nincs a hurokban.” |
| Közös | – | fejléc (Megoldások, Rólunk, GYIK, Kapcsolat + „Beszéljünk”), lábléc (3 linkoszlop + elérhetőség), sütisáv (csak ha van analitika) |

A szekciónkénti részletek: [website-content-inventory.md](website-content-inventory.md).

## 4. Üzleti állítások: igazolt vagy ellenőrizetlen?

Igazoltnak csak azt tekintem, ami a projektfájlokban vagy a megadott üzleti kontextusban tényként szerepel.

**Igazolt (a projekt vagy a megbízó szerint):**
- A márka neve Loopient; az alapító Péter (vezetéknév nincs megadva).
- Piac: magyar kkv-k, Debrecen és környéke kiemelten.
- Szolgáltatási irány: Excel- és Google Sheets-folyamatok automatizálása, ismétlődő adminisztráció csökkentése, kézi adatbevitel és adatmozgatás kiváltása, riportautomatizálás, munkafolyamat-egyszerűsítés, indokolt esetben rendszerek összekötése.
- A vállalkozás korai validációs szakaszban van; referencia, ügyfél és publikus ár nincs.

**Ellenőrizetlen, de az oldalon tényként szerepel** (megerősítés vagy átírás kell):

| # | Állítás (hely) | Probléma |
|---|---|---|
| A1 | „mi”, „dolgozunk”, „Írj nekünk”, „csapat” jellegű többes szám (szinte mindenhol) | Csapatot sugall; egyszemélyes vállalkozásnál félrevezető lehet |
| A2 | „A legtöbb ügyfél egyetlen folyamattal kezd.” (Megoldások, együttműködés) | Meglévő ügyfélkört sugall |
| A3 | „Leggyakoribb” címke a Projekt csomagon | Statisztikát sugall |
| A4 | „Hat terület, ahol a kkv-knál a legtöbb ismétlődő munka van.” / „A legtöbb kis cégnél ugyanazok a feladatok ismétlődnek” / „Három terület, ahol a legtöbb idő elfolyik.” | Kutatási eredménynek hangzó általánosítás forrás nélkül |
| A5 | 18 megnevezett integráció (Shopify, HubSpot, Pipedrive, Billingo, n8n stb.) + „…és még sok más” | Nem igazolt, hogy ezekkel van tapasztalat; a meglévő `[TODO]` is jelzi |
| A6 | Szolgáltatások: HR-beléptetés, szabadságkérés, MI-alapú levélkategorizálás és adatkinyerés, ügyfélkommunikáció | A megadott alapirányon túlmegy; nem tudjuk, vállalható-e |
| A7 | „Minden automatizálás naplóz, és hiba esetén értesítést küld, nem áll le csendben.” | Technikai garancia |
| A8 | „A személyes adatokat a GDPR szerint kezeljük, igény esetén adatfeldolgozási megállapodást kötünk.” | Megfelelőségi állítás, jogi ellenőrzés nélkül |
| A9 | „fix ajánlatot adunk, nem óradíjas meglepetést”, „Fix ár, egyeztetett terjedelem” | Üzleti feltétel, nincs jóváhagyva |
| A10 | „Kötetlen első beszélgetés”, „Egy kötetlen beszélgetés, ahol inkább kérdezünk” | Ingyenességet sugallhat; nincs eldöntve, hogy az első beszélgetés díjtalan-e |
| A11 | Folyamat: „a te adataiddal tesztelve”, „éles adatokon kipróbálva”, „betanított csapat”, „figyeljük és karbantartjuk” | Vállalt munkamódszer; meg kell erősíteni |
| A12 | „A Loopient azért jött létre, hogy a kis cégek is hozzáférjenek ahhoz, ami a nagyoknál már alap” (Rólunk) | Eredettörténet, nincs forrása |
| A13 | „A megoldás a te fiókjaidban fut … nem függsz tőlünk” | Erős és jó ígéret, de műszakilag nem minden megoldásnál igaz (pl. ha Make/n8n előfizetés kell) |
| A14 | Mock-UI: „14 beérkező számla”, „Webshop-rendelések átvezetve a számlázóba” | „Példa” címkével jelölt, ez jó; de a tartalom a fő irányon kívül esik |
| A15 | „Személyesen: Debrecen és környéke” | Valószínűleg igaz, de meg kell erősíteni |

## 5. CTA-k és kapcsolatfelvétel

| CTA | Hol | Cél | Működik? |
|---|---|---|---|
| „Beszéljünk” | fejléc, mobilmenü, CTA-sávok | `/kapcsolat` | Link ✓ – de az űrlap élesben nem küld (Resend nincs beállítva) |
| „Beszéljünk a folyamataidról” | hero | `/kapcsolat` | Link ✓ |
| „Megoldások” | hero (másodlagos) | `/megoldasok` | ✓ |
| „Így dolgozunk” | announcement | `/#folyamat` | ✓ (horgony a főoldalon) |
| „Írj e-mailt” | főoldali záró CTA | `mailto:[e-mail cím]` | **✕ nem működik** (helykitöltő cím) |
| „Gyakori kérdések” | Megoldások CTA | `/#gyik` | ✓ |
| „Bővebben rólunk” | Rólunk-részlet | `/rolunk` | ✓ |
| E-mail / telefon | lábléc | helykitöltőnél `/kapcsolat`-ra esik vissza | Részben ✓ (jó tartalék) |
| E-mail / telefon | Kapcsolat oldalsáv | link nélkül, helykitöltő szöveg | ✕ nincs valós adat |
| LinkedIn | Rólunk | `[TODO]`, linkként nem jelenik meg | ✕ |
| Űrlap | `/kapcsolat` | Server Action → Resend | Fejlesztői módban naplóz; **élesben hibát ad, amíg nincs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`**. A sikerüzenetben `[TODO]` válaszidő. |

**Az űrlap technikailag rendben van** (validáció, honeypot, időcsapda, rate limit, JS nélkül is megy). A gond a konfiguráció és a szöveg, nem a kód.

## 6. Tartalmi és konverziós problémák

1. **Nincs elsődleges célügyfél.** „Kis- és középvállalkozások, 1–50 fő” a teljes piac, nem szegmens. A szöveg mindenkihez szól, így senkinek sem pontosan.
2. **A probléma és a megoldás nem a saját nyelvén szól.** A célközönség valószínűleg úgy fogalmaz, hogy „minden héten órákig rakom össze a táblázatot”, nem úgy, hogy „rendszerintegráció”. Az oldal a megoldás kategóriáival beszél (riport, dokumentum, rendszer), nem a felismerhető helyzettel.
3. **Ismétlődések.** Az alapelvek a főoldalon és a Rólunk oldalon is szerepelnek; a folyamat a főoldalon és a Megoldásokon is; a Rólunk H1 („Automatizálás, emberi léptékben.”) megegyezik az alapelvek H2-jével; a „jó automatizálás csendes” gondolat háromszor fordul elő.
4. **A főoldal hosszú, sok a döntési pont:** 10 folyamatkártya szűrővel, 18 integráció, 8 GYIK. Korai szakaszban a kevesebb, de konkrétabb példa hitelesebb.
5. **Nincs bizonyíték, és nincs helyette más bizalomépítő elem.** Referencia nincs (ez így helyes), de nincs olyan sem, ami pótolná: konkrét, szemléltető „előtte / utána” példa, a munkamódszer kézzelfogható részletei (mit kapsz kézbe), az alapító valós szakmai háttere.
6. **A következő lépés feltételei tisztázatlanok:** mennyi ideig tart az első beszélgetés, mibe kerül, mit kell előkészíteni, mikor jön válasz.
7. **A Rólunk oldal helykitöltőkre épül:** fotó, bio, eredettörténet, LinkedIn mind hiányzik. Ez a legfontosabb bizalmi oldal egy egyszemélyes szolgáltatásnál.
8. **Az árazási szekció három csomagot mutat ár nélkül,** „Leggyakoribb” címkével. Árak nélkül a csomagstruktúra inkább kérdést kelt, mint választ ad.

## 7. SEO

| Terület | Megállapítás |
|---|---|
| Title / description | Minden oldalon van, egyediek. A Rólunk title-ben kétszer szerepel a márka („Rólunk – Péter és a Loopient \| Loopient”). Egyik sem tartalmazza az Excel / Google Táblázatok kifejezést, pedig ez a fő szolgáltatás. |
| H1 | Oldalanként pontosan egy ✓. A főoldali H1 a szlogen, nincs benne tartalmi kulcsszó. |
| Címsor-hierarchia | Rendben (H1 → H2 → H3). Apróság: a lábléc oszlopcímei H2-ként jelennek meg minden oldalon; a folyamatlépések H3-ja „01 . Felmérés” formában olvasódik fel. |
| Keresési szándék | Az oldal a „üzleti automatizálás” általános kifejezésre van hangolva. A szolgáltatási irányhoz közelebbi témák (Excel-automatizálás, Google Sheets-automatizálás, riportkészítés automatizálása, adatbevitel kiváltása, Debrecen) nem kapnak saját szöveget. Keresési volument nem becslek; ehhez Search Console- vagy kulcsszóeszköz-adat kell. |
| Belső linkek | A fő útvonalak összekötöttek. A Megoldások horgonyai a láblécből is elérhetők. |
| Képek alt-szövegei | Mind megvan (0 alt nélküli kép). A fotók jelenleg helykitöltők. |
| Strukturált adat | `Organization` schema; a helykitöltő elérhetőséget helyesen kihagyja. Később megfontolható a `ProfessionalService`/`LocalBusiness`, ha lesz valós cím. |
| Sitemap / robots / canonical | Megvan; a domain feltételezett. A sitemap `lastModified` a build ideje (apróság). |
| OG-kép | Egy közös kép minden oldalra; elfogadható. |

## 8. Bizalom és jogi tartalom

- **Fotók:** mindhárom helykitöltő („FOTÓ HELYE”). Egyszemélyes szolgáltatásnál a valódi arc a legerősebb bizalmi elem.
- **Adatkezelési tájékoztató és impresszum:** vázlat, a cégforma, a székhely, az adószám, a jogalap, a megőrzési idő és az adatfeldolgozók hiányoznak. A tárhelyszolgáltató Vercelként szerepel, pedig a hosting még nincs eldöntve. **Jogi szakértő ellenőrzése szükséges**; a weboldal jogi megfelelőségét ez az audit nem állapítja meg.
- **GDPR-állítás a GYIK-ben** (A8): amíg nincs jogilag ellenőrizve, ne szerepeljen tényként.
- **Az MI-használatról szóló GYIK** jó irányú (emberi ellenőrzés, szolgáltató megnevezése), de csak akkor maradjon, ha ez valós szolgáltatás.

## 9. Mobil

A 375 px-es mockupon a hero olvasható, a CTA-k teljes szélességűek, az érintési felületek ≥ 44 px. A README szerint 375/768/1440 px-en nincs vízszintes túlcsordulás. A főoldal mobilon nagyon hosszú (a mockup kb. 14 000 px magas), elsősorban a 10 folyamatkártya és a 18 integráció miatt.

## 10. Ami jól működik (megtartandó)

- A hangnem alapjai: tegező, rövid mondatok, „Mit mondunk / mit nem mondunk” tábla, a túlígérés tiltása.
- Az „ember a hurokban” gondolat: a név jelentéséhez kötött, megkülönböztető és hiteles.
- A „megmondjuk, mit nem érdemes automatizálni” őszinteség.
- A „Példa” címke minden mock-UI-n.
- A `[TODO]` láthatósága és a `npm run todos` minőségkapu.
- Az egyetlen szövegforrás (`copy.json`).

## 11. Megerősítésre váró tények (a stratégiához és a szövegekhez)

1. Egyedül dolgozol, vagy van csapat / alvállalkozó? (Ez dönti el, hogy „én” vagy „mi” hangon beszél az oldal.)
2. Péter vezetékneve, szakmai háttere: milyen területen, milyen eszközökkel (Excel, Power Query, VBA, Google Apps Script, Make, n8n, API-k) van valós tapasztalat?
3. Mely szolgáltatásokat tudod ténylegesen teljesíteni most? (Különösen: MI-alapú feldolgozás, CRM/webshop-integráció, HR-folyamatok.)
4. Az első beszélgetés díjtalan? Hány perc, online vagy személyes?
5. Árazási modell (fix projektár, óradíj, csomag), és ha van, kiinduló ár.
6. Van-e olyan korábbi munka (akár saját vagy korábbi munkahelyi), amit anonimizálva, engedéllyel be lehet mutatni?
7. Elérhetőség: e-mail, telefon, domain, válaszidő.
8. Cégforma és jogi adatok (impresszumhoz).
9. Hosting: Vercel vagy saját szerver (a jogi szöveget is érinti).
