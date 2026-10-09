import type { IconName } from "@/components/Icon";

// Minden szám, idő és ár ebben a fájlban kitalált – lásd TODO.md.

export const heroTasks = [
  { time: "06:00", title: "Tegnapi értékesítési riport elkészült", meta: "Elküldve a vezetőségnek", icon: "chart" },
  { time: "06:02", title: "14 bejövő számla rögzítve", meta: "Átadva a könyvelésnek", icon: "receipt" },
  { time: "06:04", title: "3 új ajánlatkérés a CRM-ben", meta: "Felelős kiosztva", icon: "users" },
  { time: "06:05", title: "Webshop-készlet szinkronizálva", meta: "212 termék frissült", icon: "sync" },
  { time: "06:07", title: "2 szerződés aláírásra vár", meta: "Emlékeztető kiküldve", icon: "doc" },
] as const satisfies ReadonlyArray<{ time: string; title: string; meta: string; icon: IconName }>;

export type ReplaceCategory = "Pénzügy" | "Értékesítés" | "Adminisztráció" | "Ügyfélkapcsolat" | "HR";

export const replaceCategories: ReadonlyArray<ReplaceCategory> = [
  "Pénzügy",
  "Értékesítés",
  "Adminisztráció",
  "Ügyfélkapcsolat",
  "HR",
];

export const replaceItems: ReadonlyArray<{ category: ReplaceCategory; title: string; body: string; saved: string }> = [
  { category: "Pénzügy", title: "Számlák kézi rögzítése", body: "A bejövő számlákat kiolvassuk az e-mailből, rögzítjük és továbbítjuk a könyvelőnek.", saved: "~4 óra/hét" },
  { category: "Pénzügy", title: "Fizetési emlékeztetők", body: "Lejárt számlákra udvarias, ütemezett emlékeztető megy – név szerint, a megfelelő hangnemben.", saved: "~2 óra/hét" },
  { category: "Pénzügy", title: "Banki egyeztetés", body: "A jóváírásokat automatikusan párosítjuk a kiállított számlákkal, csak az eltéréseket látod.", saved: "~3 óra/hét" },
  { category: "Értékesítés", title: "Ajánlatkészítés Wordben", body: "Az árajánlat sablonból, a CRM adataiból generálódik, egy kattintással küldhető.", saved: "~3 óra/hét" },
  { category: "Értékesítés", title: "Érdeklődők másolgatása", body: "A weboldalról és e-mailből érkező érdeklődők maguktól bekerülnek a CRM-be, felelőssel együtt.", saved: "~2 óra/hét" },
  { category: "Értékesítés", title: "Elfelejtett utánkövetés", body: "Ha egy ajánlatra napokig nincs válasz, a rendszer emlékeztet – vagy maga küld follow-upot.", saved: "~1 óra/hét" },
  { category: "Adminisztráció", title: "Heti riport összerakása", body: "Több forrásból gyűjtött számok egy átlátható összesítőben, minden hétfő reggel.", saved: "~3 óra/hét" },
  { category: "Adminisztráció", title: "Dokumentumok iktatása", body: "Szerződések, teljesítésigazolások a megfelelő mappába, egységes névvel, kereshetően.", saved: "~2 óra/hét" },
  { category: "Adminisztráció", title: "Adatok átvezetése táblázatok között", body: "Ugyanazt az adatot nem kell háromszor begépelni: egyszer rögzíted, mindenhol frissül.", saved: "~4 óra/hét" },
  { category: "Ügyfélkapcsolat", title: "Ismétlődő kérdések", body: "A gyakori kérdésekre azonnali, ellenőrzött válasz megy, a különleges esetek hozzád kerülnek.", saved: "~3 óra/hét" },
  { category: "Ügyfélkapcsolat", title: "Rendelésállapot-értesítők", body: "A vevő magától értesül a rendelése állapotáról – nem kell telefonon érdeklődnie.", saved: "~2 óra/hét" },
  { category: "HR", title: "Új munkatárs beléptetése", body: "Fiókok, hozzáférések, dokumentum-checklist és első heti teendők egy folyamatban.", saved: "~3 óra/fő" },
  { category: "HR", title: "Szabadságigények kezelése", body: "Igénylés, jóváhagyás, naptár és táblázat frissítése – e-mailezés nélkül.", saved: "~1 óra/hét" },
];

export const integrations: ReadonlyArray<{ title: string; icon: IconName; tools: string[] }> = [
  { title: "Táblázatok", icon: "table", tools: ["Excel", "Google Táblázatok", "Airtable"] },
  { title: "E-mail", icon: "mail", tools: ["Gmail", "Outlook", "Microsoft 365"] },
  { title: "Webshop", icon: "cart", tools: ["Shopify", "WooCommerce", "UNAS", "ShopRenter"] },
  { title: "Számlázás", icon: "receipt", tools: ["Számlázz.hu", "Billingo", "NAV Online Számla"] },
  { title: "ERP és CRM", icon: "layers", tools: ["SAP Business One", "Microsoft Dynamics", "HubSpot", "Pipedrive"] },
  { title: "Üzenetküldők", icon: "chat", tools: ["Slack", "Microsoft Teams", "WhatsApp Business", "Viber"] },
];

export const processSteps = [
  {
    n: "01",
    title: "Felmérés",
    body: "Egy 30 perces beszélgetés és egy rövid folyamatfelmérés után pontosan látod, mit érdemes automatizálni, mennyi időt nyersz vele, és mennyibe kerül.",
    meta: "1 hét",
  },
  {
    n: "02",
    title: "Építés és tesztelés",
    body: "A meglévő rendszereidre építünk, valós adatokon tesztelünk, és csak a jóváhagyásod után élesítünk. Nem kell semmit lecserélned.",
    meta: "1–3 hét",
  },
  {
    n: "03",
    title: "Üzemeltetés és finomhangolás",
    body: "Figyeljük a futásokat, hiba esetén szólunk és javítunk. Havonta átnézzük veled, mit lehet még egyszerűsíteni.",
    meta: "folyamatos",
  },
] as const;

export const principles: ReadonlyArray<{ icon: IconName; title: string; body: string }> = [
  { icon: "ruler", title: "Először a folyamat, aztán az eszköz", body: "Nem eszközt adunk el. Előbb megértjük, hogyan dolgoztok, és csak azt automatizáljuk, aminek valóban értelme van." },
  { icon: "eye", title: "Átlátható működés", body: "Minden futás naplózva van. Bármikor látod, mi történt, mikor és miért – nincs fekete doboz." },
  { icon: "shield", title: "Adatbiztonság alapból", body: "GDPR-megfelelés, minimális hozzáférések, EU-s adattárolás és adatfeldolgozói szerződés minden projekthez." },
  { icon: "handshake", title: "Nálatok marad a kontroll", body: "A fiókok, hozzáférések és a dokumentáció a tiétek. Ha egyszer továbblépnétek, semmi nem ragad nálunk." },
];

export const faqs: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Mekkora cégnek éri meg az automatizálás?",
    a: "Már egy 3–5 fős csapatnál is, ha van olyan feladat, amit valaki hetente többször, ugyanúgy megcsinál. Jellemzően ott térül meg leggyorsabban, ahol adatot másolnak egyik helyről a másikra, vagy rendszeresen összeraknak egy riportot.",
  },
  {
    q: "Mennyibe kerül egy automatizálás?",
    a: "Egy egyszerűbb folyamat automatizálása jellemzően 150 000 Ft + áfától indul, összetettebb projektekre a felmérés után fix árajánlatot adunk. Az opcionális üzemeltetési és támogatási díj havi 25 000 Ft + áfától érhető el.",
  },
  {
    q: "Mennyi idő alatt készül el?",
    a: "Egy jól körülhatárolt folyamat általában 1–3 hét alatt élesíthető. A felmérés után pontos ütemtervet kapsz, mérföldkövekkel.",
  },
  {
    q: "Le kell cserélnünk a meglévő rendszereinket?",
    a: "Nem. Az automatizmusokat a már használt eszközeitekre építjük – táblázatok, e-mail, számlázó, webshop, CRM. Új szoftvert csak akkor javaslunk, ha az valóban egyszerűbbé teszi a dolgotokat.",
  },
  {
    q: "Mi történik, ha egy automatizmus hibára fut?",
    a: "Minden futást figyelünk. Hiba esetén azonnal értesítést kapunk, és a legtöbb problémát még azelőtt javítjuk, hogy észrevennétek. Ahol kell, a rendszer emberi jóváhagyást kér, mielőtt bármit kiküldene.",
  },
  {
    q: "Biztonságban vannak az adataink?",
    a: "Igen. Csak a feladathoz feltétlenül szükséges hozzáféréseket kérjük, az adatokat EU-s szervereken kezeljük, és minden ügyféllel adatfeldolgozói szerződést kötünk a GDPR szerint.",
  },
  {
    q: "Mi van, ha később változik a folyamatunk?",
    a: "Az automatizmusokat úgy építjük, hogy könnyen módosíthatók legyenek, és mindegyikhez közérthető dokumentációt adunk. Üzemeltetési szerződés mellett a kisebb módosításokat is mi végezzük el.",
  },
];
