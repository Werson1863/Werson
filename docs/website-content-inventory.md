# Weboldal-tartalomleltár

> **Állapot:** 2026-10-09, `eb11dec` · Forrás: `content/copy.json` (szöveg), `site/app/**/page.tsx` (szerkezet). A szekció-azonosítók (pl. `F-01`) megegyeznek a [haladási táblában](website-content-progress.md) használtakkal.
> **Munkacsomag (MCs):** a feldolgozási sorrend száma (1 = hero … 12 = jogi), lásd a haladási táblát.
> **copy.json kulcs:** ahol a szöveg él. Ha a változtatás a szerkezetet is érinti (szekció darabszáma, új vagy törölt blokk), a „Függőség” oszlop jelzi a komponenst.

## Főoldal – `/`

| ID | Szekció | Jelenlegi fő üzenet | Cél | Jelenlegi problémák | Szükséges változtatás | CTA | SEO-szempont | Függőség | MCs | Státusz |
|---|---|---|---|---|---|---|---|---|---|---|
| F-00 | Announcement sáv (`announcement`) | „Debrecenben és környékén személyesen, máshol online dolgozunk.” | Helyi jelenlét jelzése | Többes szám (A1); nem a legfontosabb üzenet az oldal tetején | Rövidebb, a beszélő személy döntése szerint; vagy hasznosabb üzenet (pl. a következő lépés) | „Így dolgozunk” → `/#folyamat` | – | S2, F-06 | 10 | AUDITED |
| F-01 | Hero (`home.hero`) | H1: „Te döntesz. A rutin megy magától.” + riport/számla/jóváhagyás lead | Néhány másodperc alatt: kinek, milyen probléma, milyen előny, mi a következő lépés | A H1 szlogen, nem mondja meg, mit csinál a Loopient; nincs benne Excel/Táblázatok; a lead a fő irányon kívüli példákat sorol; „Kötetlen első beszélgetés” ingyenességet sugallhat (A10) | Leíró H1 (3 soros tördelés: `titleLines`), táblázat-központú lead, CTA-k a stratégia szerint | „Beszéljünk a folyamataidról” → `/kapcsolat`; „Megoldások” → `/megoldasok` | A H1 a főoldal fő témája | S1–S4 | 1 | AUDITED |
| F-02 | Hero mock „Ma reggel, automatikusan” (`home.hero.mock`) | 4 lefutott feladat (riport, számlaiktatás, webshop → számlázó, ajánlatkérés) | Szemléltetés | „Példa” címkével jelölt ✓, de 3 elemből 2 a fő irányon kívül (számlaiktatás, webshop) | Táblázat-központú példasorok, „Példa” címke marad | – | – | F-01; ikonok a meglévő készletből (`HeroMock.tsx`) | 1 | AUDITED |
| F-03 | „Mit csinálunk” – 3 terület (`home.featuresIntro`, `home.features`) | „Három terület, ahol a legtöbb idő elfolyik.” Riportok / Dokumentumok / Rendszerek | Mit csinál a Loopient | Általánosítás forrás nélkül (A4); a „Dokumentumok” terület nincs a szolgáltatási irányban; nincs problémafelvetés | Problémafelvetés a bevezetőben + 3 terület: táblázatfolyamatok, riportok, adatbevitel/összekötés. A 3 mock tartalma igazodik | – | Másodlagos témák (riport, adatbevitel) | S1, S5; a 3 mock szerkezete kötött (`ReportMock`, `DocsMock`, `SyncMock`) | 2–3 | AUDITED |
| F-04 | Tipikus folyamatok, szűrhető (`home.processes`) | 10 kártya, 5 kategória (Pénzügy, Értékesítés, Ügyfélszolgálat, HR, Működés) | Felismerés konkrét példákon | Túl sok és túl széles (HR, ügyfélszolgálat, MI); hosszú mobilon | Kb. 6 táblázat-központú példa; kategóriák egyszerűsítése vagy a szűrő elhagyása | – | Long-tail kifejezések természetesen | S5; a szűrő elhagyása kódváltozás (`ProcessFilter`) | 3 / 6 | AUDITED |
| F-05 | Integrációk (`home.integrations`) | 18 eszköz + „…és még sok más” | Megnyugtatás: a meglévő eszközökkel működik | Nem igazolt tapasztalat (A5) | Csak a ténylegesen használt eszközök; Excel és Google Táblázatok elöl | – | Eszköznevek (valós használat esetén) | S6 | 3 | AUDITED |
| F-06 | Folyamat 01–03 (`home.process`) | Felmérés → Megépítés → Átadás és gondozás | A folyamat és a feltételek megértése | Vállalt módszerek megerősítés nélkül (A11); „nyugodt hétfők” ígéret | Valós lépések, mit kap kézbe az ügyfél; határidő csak jóváhagyva | – | – | Ugyanez a blokk a Megoldásokon is (`Steps`) | 4 | AUDITED |
| F-07 | Alapelvek (`home.principles` / `brand.principles`) | „Automatizálás, emberi léptékben.” 3 elv | Megkülönböztetés, bizalom | A Rólunk oldalon is szerepel; a H2 egyezik a Rólunk H1-gyel | Rövidítés, a megkülönböztetés 3–4 pontjához igazítás; ismétlés feloldása | – | – | R-01, R-05 (`Principles`) | 2 / 5 | AUDITED |
| F-08 | Rólunk-részlet (`home.aboutTeaser`) | „Szia, Péter vagyok.” + `[TODO]` háttér | Személyes bizalom | Helykitöltő háttér és fotó | Valós háttér 1–2 mondatban | „Bővebben rólunk” → `/rolunk` | – | Fotók, R-03 | 5 | AUDITED |
| F-09 | GYIK (`home.faqIntro`, `faq`) | 8 kérdés | Ellenvetések kezelése | Ár- és időválasz `[TODO]`; nem igazolt technikai és GDPR-állítás (A7, A8); „fix ajánlat” (A9) | Valódi kérdések, csak jóváhagyott feltételekkel | – | GYIK tartalmilag hasznos; FAQ schema csak ha indokolt | S4, S7, MCs 7 | 8 | AUDITED |
| F-10 | Záró CTA (`home.cta`) | „Melyik feladatod ismétlődik minden héten?” | Konverzió | **„Írj e-mailt” → `mailto:[e-mail cím]` nem működik** | Táblázat-központú kérdés; e-mail gomb csak valós címmel | „Beszéljünk” → `/kapcsolat`; „Írj e-mailt” | – | `siteConfig.contact.email` | 9 | AUDITED |

## Megoldások – `/megoldasok`

| ID | Szekció | Jelenlegi fő üzenet | Cél | Jelenlegi problémák | Szükséges változtatás | CTA | SEO-szempont | Függőség | MCs | Státusz |
|---|---|---|---|---|---|---|---|---|---|---|
| M-01 | Oldalhero + horgonychipek (`solutions.hero`) | „Ahol a legtöbb idő elmegy, ott kezdjük.” | Áttekintés | „Hat terület, ahol a kkv-knál a legtöbb…” általánosítás (A4) | A szolgáltatási irányt kimondó H1 és lead | Horgonyok a területekre | H1: fő szolgáltatási téma | M-02 | 3 | AUDITED |
| M-02 | 6 terület (`solutions.areas`) | Riportok, Dokumentumok, Rendszerek, Jóváhagyások, Kommunikáció, MI | Részletes szolgáltatások | Fő irányon kívüli területek (A6); nincs üzleti előny és konkrét példa a struktúrában | 3–4 terület; mindegyiknél probléma → mit csinál → előny → példa. ⚠ Az „előny” mező új adatmező = kis komponensmódosítás | – | Másodlagos témák | S5; lábléc horgonylinkjei (`footer.columns[1]`) | 3 | AUDITED |
| M-03 | Együttműködés / árazás (`solutions.engagement`) | Felmérés / Projekt / Gondozás, ár `[TODO]`, „Leggyakoribb” címke | Feltételek | Árak nélkül csomagok; „Leggyakoribb” (A3); „A legtöbb ügyfél…” (A2); „fix ár” (A9) | A jóváhagyott üzleti feltételek szerint; addig a menet leírása ár nélkül | – | – | S7 | 7 | AUDITED |
| M-04 | Folyamat 01–03 (ismétlés) | Mint F-06 | Folyamat | Ugyanaz a blokk, mint a főoldalon | Marad (közös forrás), vagy kiegészül a feltételekkel | – | – | F-06 | 4 | AUDITED |
| M-05 | CTA (`solutions.cta`) | „Nem találod a saját folyamatodat?” | Konverzió | Rendben; „Gyakori kérdések” másodlagos CTA | Igazítás a fő CTA-hoz | „Beszéljünk”; „Gyakori kérdések” → `/#gyik` | – | – | 9 | AUDITED |

## Rólunk – `/rolunk`

| ID | Szekció | Jelenlegi fő üzenet | Cél | Jelenlegi problémák | Szükséges változtatás | CTA | SEO-szempont | Függőség | MCs | Státusz |
|---|---|---|---|---|---|---|---|---|---|---|
| R-01 | Oldalhero (`about.hero`) | „Automatizálás, emberi léptékben.” | Ki áll mögötte | A H1 egyezik az alapelvek H2-jével; az eredet-mondat nem igazolt (A12) | Személyes, valós H1 és lead | – | „Péter, Loopient, Debrecen” | S2 | 5 | AUDITED |
| R-02 | Miért Loopient? (`about.story`) | Név jelentése + `[TODO]` eredettörténet | Gondolkodásmód | Helykitöltő | Valós indulási történet, vagy csak a névmagyarázat és a munkamód | – | – | Megbízói adat | 5 | AUDITED |
| R-03 | Alapító (`about.founder`) | Név `[TODO]`, bio `[TODO]`, idézet, LinkedIn `[TODO]` | Bizalom | Szinte minden helykitöltő; fotó helykitöltő | Valós név, háttér, eszközök, LinkedIn, fotó | LinkedIn (ha van) | – | Fotók, megbízói adat | 5 | AUDITED |
| R-04 | Hol és hogyan (`about.facts`) | Debrecen, online, nyelv `[TODO]` | Gyakorlati tények | Helykitöltők | Megerősített tények | – | Helyi jelzés | – | 5 | AUDITED |
| R-05 | Alapelvek (ismétlés) | Mint F-07 | – | Ismétlés | Megtartás vagy csere „Hogyan dolgozom” blokkra | – | – | F-07 | 5 | AUDITED |
| R-06 | CTA (`about.cta`) | „Ismerkedjünk meg.” | Konverzió | „Kötetlen beszélgetés” (A10) | A fő CTA-feltételek szerint | „Beszéljünk” → `/kapcsolat` | – | S4 | 9 | AUDITED |

## Kapcsolat – `/kapcsolat`

| ID | Szekció | Jelenlegi fő üzenet | Cél | Jelenlegi problémák | Szükséges változtatás | CTA | SEO-szempont | Függőség | MCs | Státusz |
|---|---|---|---|---|---|---|---|---|---|---|
| K-01 | Oldalhero (`contact.hero`) | „Beszéljünk a folyamataidról.” | Konverzió | „kötetlen beszélgetés” (A10); többes szám | Mit írjon, mi történik utána | – | – | S2, S4 | 9 | AUDITED |
| K-02 | Űrlap (`contact.form`) | Név, e-mail, cég, csapatméret, üzenet, hozzájárulás | Érdeklődő | „Írj nekünk” (A1); az üzenetmező súgója nem segít, mit írjon | Segítő súgó (pl. melyik táblázat, milyen gyakran); mezők változatlanok | „Üzenet küldése” | – | Server Action, Resend env | 9 | AUDITED |
| K-03 | Űrlapállapotok (`contact.states`, `contact.errors`) | Siker / hiba / validáció | Visszajelzés | Válaszidő `[TODO]`; hibaüzenetben helykitöltő e-mail | Valós válaszidő; működő cím | – | – | `siteConfig` | 9 | AUDITED |
| K-04 | Elérhetőség (`contact.details`) | E-mail, telefon, terület | Közvetlen kapcsolat | Helykitöltők, link nélkül | Valós adatok | mailto / tel | – | `siteConfig` | 9 | AUDITED |
| K-05 | Mi történik ezután? (`contact.next`) | 3 lépés | Bizonytalanság csökkentése | „rövid, priorizált javaslatot küldünk” – vállalás megerősítés nélkül | Csak valós lépések | – | – | S4, F-06 | 9 | AUDITED |
| K-06 | Értesítő e-mail (`contact.email`) | A beérkező üzenet sablonja | Belső | Rendben | – | – | – | – | 9 | AUDITED |

## Közös elemek

| ID | Szekció | Jelenlegi fő üzenet | Cél | Jelenlegi problémák | Szükséges változtatás | CTA | SEO-szempont | Függőség | MCs | Státusz |
|---|---|---|---|---|---|---|---|---|---|---|
| N-01 | Fejléc navigáció (`nav`) | Megoldások · Rólunk · GYIK · Kapcsolat + „Beszéljünk” | Tájékozódás, konverzió | Rendben; a „Rólunk” egyszemélyes vállalkozásnál vitatható | A beszélő személy döntése szerint (pl. „Rólam”), rövid címkék | „Beszéljünk” → `/kapcsolat` | Belső linkek | S2 | 10 | AUDITED |
| N-02 | Lábléc (`footer`) | Szlogen, 3 linkoszlop, elérhetőség | Tájékozódás | A „Megoldások” oszlop a régi horgonyokra mutat; oszlopcímek H2-ként | Horgonyok frissítése M-02 után | E-mail/telefon (tartalék: `/kapcsolat`) | – | M-02 | 10 | AUDITED |
| N-03 | Sütisáv (`consent`) | Csak ha van analitika | Megfelelés | – | Ha lesz analitika, a szöveg az adatkezeléssel együtt | – | – | J-01 | 12 | AUDITED |
| N-04 | 404 (`micro.notFound`) | „Ez az oldal nincs a hurokban.” | Visszavezetés | Rendben | – | Főoldal, Megoldások | noindex ✓ | – | 10 | AUDITED |
| N-05 | Mikroszövegek (`micro`) | Gombok, a11y | – | Rendben | Csak ha a CTA-k változnak | – | – | – | 10 | AUDITED |

## SEO-metaadatok

| ID | Elem | Állapot | Probléma | Szükséges változtatás | MCs | Státusz |
|---|---|---|---|---|---|---|
| S-01 | Title/description oldalanként (`meta.pages`) | Mind megvan | Nincs fő szolgáltatási kifejezés; Rólunk title-ben dupla márka | Oldalankénti fő téma (stratégia 10. fejezet) | 11 | AUDITED |
| S-02 | Alapértelmezett meta, OG alt (`meta`) | Megvan | A szlogenre épül | Igazítás | 11 | AUDITED |
| S-03 | Strukturált adat (`layout.tsx`) | `Organization` | `description` a meta-ból jön ✓ | Szövegfüggő, automatikusan követi | 11 | AUDITED |
| S-04 | Címsor-hierarchia | Rendben | Lábléc H2-k; „01 . Felmérés” felolvasás | Kis komponensjavítás, külön jóváhagyással | 11 | AUDITED |

## Jogi tartalom

| ID | Elem | Állapot | Probléma | Szükséges változtatás | MCs | Státusz |
|---|---|---|---|---|---|---|
| J-01 | Adatkezelési tájékoztató (`legal.privacy`) | Vázlat | Sok `[TODO]`; Vercel tárhelyként, pedig a hosting nyitott | **Jogi szakértő**; a szövegíró csak a helykitöltőket és az ellentmondásokat jelzi | 12 | BLOCKED |
| J-02 | Impresszum (`legal.imprint`) | Vázlat | Szinte csak `[TODO]` | Cégadatok a megbízótól | 12 | BLOCKED |

## Márkaszövegek a weboldalon kívül

| ID | Elem | Megjegyzés | MCs | Státusz |
|---|---|---|---|---|
| B-01 | `brand.positioning`, `brand.promise`, `brand.bios`, `brand.slogans` (`copy.json`) + `content/brand-guide.md` 1. fejezet | A weboldal közvetlenül nem mindet jeleníti meg, de a LinkedIn- és e-mail-szövegek innen jönnek. Jóváhagyott stratégia után frissíteni, hogy ne legyen két pozicionálás | 1 után | AUDITED |

## A kiinduló listából hiányzó szekciók

| Szekció | Van? | Javaslat |
|---|---|---|
| Problémafelvetés | Nincs külön | **Kell** (az olvasói út 2. lépése). Új komponens nélkül megoldható: az F-03 bevezetője és/vagy az F-04 példái vállalják. Ha külön blokkot szeretnél, az kódváltozás. |
| Referenciák / esettanulmányok | Nincs | **Most ne legyen** külön szekció. Valós, engedélyezett eset nélkül üres vagy kitalált lenne. Helyette jól jelölt szemléltető példák (F-04, M-02). |
| Árazás külön oldal | Nincs (M-03 a Megoldásokon) | Nem kell külön oldal; a feltételek a Megoldásokon és a GYIK-ben. |
| Blog / tudásbázis | Nincs | Most nem; validáció és keresési adatok után. |
