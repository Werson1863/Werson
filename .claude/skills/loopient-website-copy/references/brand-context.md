# Loopient – márkakontextus a szövegíró skillhez

> **Ez nem újabb márkaleírás.** A márkaplatform, a hangnem, a névhasználat és a szlogenek forrása a Loopient-projekt `content/brand-guide.md` fájlja, a weboldal minden szövegéé a `content/copy.json`. Ez a fájl csak azt rögzíti, ami ott nincs benne: a megbízói brief többletét, a brief és a projekt közötti eltérések kezelését, és a jelenlegi szöveg ellenőrizendő állításait.
>
> Állapot: 2026-10-09, a `Werson1863/loopient` repó első verziója (forrás: a `Werson` repó `claude/loopient-repo` ága, `eb11dec`). A projektfájlok ennél frissebbek lehetnek; ellentmondás esetén a projekt aktuális, ellenőrizhető adata az irányadó (SKILL.md 0. pont).

## 1. Források a projektben

| Kérdés | Forrás (a Loopient-gyökérhez képest) |
|---|---|
| Pozicionálás, ígéret, alapelvek, célközönség | `content/brand-guide.md` 1. pont, illetve `copy.json` → `brand` |
| Hangnem, „mondjuk / nem mondjuk”, írási szabályok | `content/brand-guide.md` 2. pont |
| Névírás (Loopient / LOOPIENT), alcím-variációk | `content/brand-guide.md` 3. pont |
| Szlogen és szlogenjavaslatok | `content/brand-guide.md` 4. pont, `copy.json` → `brand.slogan`, `brand.slogans` |
| A weboldal minden szövege, a title és a description | `content/copy.json` (olvasható, generált változat: `content/copy.md`) |
| Miért döntöttünk így (tegezés, egyetlen szövegforrás, nincs kitalált szám) | `docs/decisions.md` |
| Mi hiányzik még (ár, átfutás, elérhetőség, Péter adatai, jogi adatok) | `docs/TODO.md`, illetve a `site` mappában az `npm run todos` parancs |
| Elérhetőségek, domain | `site/site.config.ts`, `site/.env.example` |
| Melyik szöveg hol és hogyan jelenik meg | `references/site-map.md` (ebben a skillben) |

## 2. A megbízói brief többlete

Ezek a projektfájlokban nem vagy csak részben szerepelnek. Tartalmi irányként használd őket, a projekt szabályaival összhangban.

**Értékajánlat:** „Kevesebb kézi munka. Kevesebb ismétlődő adminisztráció. Több idő az üzletre.” Tartalmi irány, nem kötelező szó szerinti szöveg és nem a szlogen helyettesítője (lásd 3. pont).

**Piac:** magyarországi kis- és középvállalkozások, kezdetben különösen Debrecen és környéke. A projektben ugyanez szerepel: 1–50 fős cégek vezetői és irodavezetői, Debrecenben személyesen, máshol online.

**Szolgáltatási irány a brief szerint:**

- üzleti folyamatok automatizálása, az ismétlődő adminisztráció csökkentése;
- Excel- és Google Sheets-megoldások;
- riportautomatizálás;
- a manuális adatmozgatás kiváltása;
- indokolt esetben üzleti rendszerek összekapcsolása.

**Lehetséges ügyfélproblémák.** Ezek feltételezések, nem kutatási eredmények. Soha ne állítsd, hogy minden vállalkozás vagy a legtöbb vállalkozás ezekkel küzd.

- rendszeresen kézzel frissített táblázatok;
- ugyanazon adatok ismételt rögzítése;
- időigényes heti vagy havi riportok;
- e-mailekből, számlákból és fájlokból történő manuális adatgyűjtés;
- hibalehetőségekkel terhelt adminisztráció;
- nehezen átlátható vagy egyetlen munkatárstól függő folyamatok.

**Márkakarakter:** prémium és letisztult; modern és intelligens; megbízható és emberközeli; üzletileg gondolkodó; szakmailag felkészült, de közérthető.

**Üzleti szakasz:** korai validáció és ügyfélszerzés. Nincs igazolt referencia, ügyfélszám, eredményszám, csapat vagy vállalati múlt. A szöveg ezt ne takarja el, és ne is hangsúlyozza feleslegesen; a hitelesség forrása a módszer, az alapító és az őszinteség.

## 3. Eltérések a brief és a projekt között, és a kezelésük

| Téma | Brief | Projekt | Kezelés |
|---|---|---|---|
| Névírás | LOOPIENT | Folyó szövegben „Loopient”; a LOOPIENT csak a logóban (`brand-guide.md` 3. pont) | „Loopient”-et írj. Ha a felhasználó a csupa nagybetűt kéri, előbb jelezd, hogy ez a márka-útmutatót módosítja. |
| Megszólítás | Nincs meghatározva | Tegező (`decisions.md` T4) | Tegezz. |
| Értékajánlat és szlogen | „Kevesebb kézi munka…” | Szlogen: „Te döntesz. A rutin megy magától.” (a hero főcíme is ez) | A kettő összhangban van: a szlogen a kontrollt, a brief értékajánlata a hasznot mondja. A brief irányát a leadben, az alcímekben és a szolgáltatásleírásokban érvényesítsd. Szlogen- vagy főcímcsere csak a felhasználó döntésével. |
| Szolgáltatási kör | Excel/Sheets, riport, adatmozgatás, indokolt esetben rendszer-összekötés | Hat terület: riportok; dokumentum- és számlakezelés; rendszerek összekötése; jóváhagyási folyamatok; ügyfél- és csapatkommunikáció; MI-vel támogatott feldolgozás (`copy.json` → `solutions.areas`). Integrációs lista Make-kel és n8n-nel. | Ha olyan területen dolgozol, amely a briefben nem szerepel (jóváhagyások, kommunikáció, MI, HR-folyamatok, konkrét integrációk), jelezd `[ELLENŐRIZENDŐ]`-ként, hogy a Loopient valóban vállalja-e. Az Excel/Sheets-hangsúly a projektben gyengébb; ha releváns, erősítsd, de ne ígérj olyat, amit a brief sem igazol. |
| Többes szám („mi”) | Ne sugalljon nem létező csapatot | A szöveg többes szám első személyben szól („megépítjük”, „dolgozunk”), közben a Rólunk-szöveg egyetlen alapítót mutat be („Szia, Péter vagyok.”) | **Nyitott döntés, a felhasználóé.** Addig maradj a meglévő „mi” hangnál, de ne írj kifejezett csapatállítást („csapatunk”, „kollégáink”, „szakértőink”). Ha a szekció szempontjából lényeges, jelezd a kérdést. |

## 4. Ellenőrizendő állítások a jelenlegi szövegben

Ezek a 2026-10-09-i `copy.json`-ban szerepelnek, és a SKILL.md 4. pontja szerint igazolásra szorulnak. Ha az érintett szekción dolgozol, jelezd őket, és javasolj igazolható megfogalmazást. Más szekcióban magadtól ne írd át őket. Előbb mindig ellenőrizd, hogy a szöveg még változatlan-e.

| Kulcs | Állítás | Miért szorul ellenőrzésre |
|---|---|---|
| `solutions.engagement.lead` | „A legtöbb ügyfél egyetlen folyamattal kezd.” | Meglévő ügyfélkört és megfigyelt gyakoriságot sugall. |
| `solutions.engagement.featuredLabel` | „Leggyakoribb” (a Projekt kártyán) | Ügyféladatokon alapuló gyakoriságot sugall. |
| `home.featuresIntro.title`, `home.featuresIntro.lead` | „ahol a legtöbb idő elfolyik”, „A legtöbb kis cégnél ugyanazok a feladatok ismétlődnek” | Általánosítás, kutatási eredményként hat. |
| `solutions.hero.titleLines`, `solutions.hero.lead` | „Hat terület, ahol a kis- és középvállalkozásoknál a legtöbb ismétlődő munka van.” | Általánosítás, kutatási eredményként hat. |
| `faq.items[5].a` | „A személyes adatokat a GDPR szerint kezeljük, igény esetén adatfeldolgozási megállapodást kötünk.” | Nem igazolt adatvédelmi és GDPR-megfelelőségi állítás. |
| `faq.items[4].a` | „Minden automatizálás naplóz, és hiba esetén értesítést küld, nem áll le csendben.” | Minden megoldásra vonatkozó működési ígéret, és ide tartozik a gondozás is (`[TODO]`). |
| `faq.items[2].a` | „A felmérés után fix ajánlatot adunk” | Árazási feltétel; a felhasználónak kell megerősítenie. |
| `home.integrations.items`, `faq.items[1].a` | Konkrét eszközök (például Számlázz.hu, Billingo, Shopify, HubSpot, Make, n8n) | Nem igazolt integrációk; a projektben már van rá `[TODO]`. |
| `solutions.areas[5]`, `faq.items[6]` | MI-vel támogatott feldolgozás | A brief nem említi, ezért ellenőrizd, hogy a szolgáltatás valóban elérhető-e. |
| `home.cta.secondary.href` | `mailto:{email}` („Írj e-mailt”) | Az e-mail-cím még helykitöltő (`site.config.ts`), így ez a CTA jelenleg nem működik. |

## 5. Működési állapot, amelyre a szöveg nem építhet

- **Elérhetőség:** az e-mail-cím és a telefonszám helykitöltő (`site/site.config.ts`). E-mailes vagy telefonos CTA-t csak valós adat megadása után tekints működőnek.
- **Kapcsolati űrlap:** a küldéshez Resend-kulcs és címzett kell (`site/.env.example`). Az, hogy a szöveg kész, nem jelenti, hogy a küldés működik. Ezt csak éles teszt igazolja.
- **Hiányzó adatok** (`docs/TODO.md`): árak (felmérés, projekt, gondozás), átfutási idők, gondozási feltételek, válaszidő, Péter vezetékneve és szakmai háttere, a Loopient indulásának története, valódi fotók, a domain (`loopient.hu`) megerősítése, a cégforma és a jogi adatok.
- **Referenciák:** jelenleg egy sincs, és szándékosan nincs (`decisions.md` T2).
