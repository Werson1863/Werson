# Loopient weboldal – szekciótérkép

> Melyik szöveg melyik `copy.json` kulcsból jön, melyik komponens jeleníti meg, és milyen címszinten. Állapot: 2026-10-09, a `Werson1863/loopient` repó első verziója (forrás: `claude/loopient-repo`, `eb11dec`). Módosítás előtt mindig nézd meg az aktuális komponenst: ha eltér ettől a táblázattól, a kód az irányadó.

## Alapszabályok

- **Helyek:** a táblázatokban szereplő komponensek a `site/components/` alatt vannak, az oldalak a `site/app/` alatt. Az `archive/v1-weboldal/` alatti azonos nevű fájlok az archív v1-hez tartoznak, azokat ne módosítsd.

- **Egyetlen szövegforrás:** `content/copy.json`, amelyet a `site/lib/content.ts` tölt be. A `{email}`, `{phone}` és `{year}` helyőrzőket a `site/site.config.ts` értékei töltik ki. A komponensekben nincs szöveg, ezért a szöveget nem ott kell módosítani.
- **Típusok:** a TypeScript-típus a JSON-ból jön (`typeof copy`). Ha törölsz vagy átnevezel egy kulcsot, illetve megváltoztatod a típusát, a `typecheck` és a `build` elbukik. Új kulcsot a komponens magától nem jelenít meg.
- **`Rich`:** a folyószöveg-mezők egy része a `site/components/Rich.tsx`-en megy át. Ez minden `[...]` részt narancs, szaggatott aláhúzással jelöl. Az `npm run todos` viszont csak a `[TODO…]`, az `[e-mail cím]` és a `[telefonszám]` alakot számolja. Ezért jelölés csak `Rich`-es mezőbe kerülhet, `[TODO: …]` formában. Szögletes zárójelet egyébként ne használj a szövegben.
- **`titleLines`:** tömb; minden elem új sorban jelenik meg, a hero utolsó sora mély narancs színű.
- **A `brand.*` kulcsok egy része a weboldalon is megjelenik:** a `brand.principles` az Alapelvek szekcióban, a `brand.area` a láblécben. Ha ezeket módosítod, a márkadokumentumokra is hatással van (a `copy.md`-t újra kell generálni).

## Főoldal (`site/app/page.tsx`)

| Szekció | Komponens | `copy.json` kulcs | Címszint | `Rich` |
|---|---|---|---|---|
| Announcement sáv | `Announcement.tsx` | `announcement.text`, `announcement.link` | – | nem |
| Fejléc, menü | `SiteHeader.tsx` | `nav.*` | – | nem |
| Hero | `Hero.tsx` | `home.hero.eyebrow`, `.titleLines`, `.lead`, `.primary`, `.secondary`, `.note`, `.mock` (Példa) | H1 = `titleLines` | csak a `lead` |
| Mit csinálunk – bevezető | `SectionHeader.tsx` | `home.featuresIntro.eyebrow`, `.title`, `.lead` | H2 = `title` | csak a `lead` |
| Három terület | `FeatureRows.tsx` | `home.features[]`: `eyebrow`, `title`, `text`, `bullets`, `mock` (Példa) | H3 = `title` (H2-es méretben) | nem |
| Tipikus folyamatok | `SectionHeader.tsx` + `ProcessFilter.tsx` | `home.processes.eyebrow`, `.title`, `.lead`, szűrők és elemek | H2 = cím; H3 = elemcím | csak a `lead` |
| Integrációk | `Integrations.tsx` | `home.integrations.eyebrow`, `.title`, `.lead`, `.items[]`, `.more` (a `_todo` mező belső megjegyzés, nem jelenik meg) | H2 = `title` | csak a `lead` |
| Így dolgozunk | `Steps.tsx` | `home.process.eyebrow`, `.title`, `.lead`, `.steps[]`: `number`, `title`, `text`, `result` | H2 = cím; H3 = lépéscím | csak a `lead` |
| Alapelvek | `Principles.tsx` | `home.principles.eyebrow`, `.title` + `brand.principles[]`: `title`, `text` | H2 = cím; H3 = alapelv | nem |
| Rólunk-részlet | `AboutTeaser.tsx` | `home.aboutTeaser.*`, `about.founder.portraitAlt` | H2 | csak a `text` |
| GYIK | `Faq.tsx` | `home.faqIntro.*`, `faq.items[]`: `q`, `a` | kérdés = gomb az accordionban | csak az `a` (válasz) |
| Záró CTA | `CtaBand.tsx` | `home.cta.title`, `.text`, `.primary`, `.secondary` (`mailto:{email}`) | H2 (H1-es méretben) | csak a `text` |
| Lábléc | `Footer.tsx` | `footer.tagline` (= a szlogen), `.columns`, `.contactTitle`, `.copyright`, `.madeIn`, `brand.area`, `consent.settings` | – | csak az e-mail és a telefon |

## Megoldások (`site/app/megoldasok/page.tsx`)

| Szekció | `copy.json` kulcs | Címszint | `Rich` |
|---|---|---|---|
| Oldalfejléc (`PageHero.tsx`) | `solutions.hero.eyebrow`, `.titleLines`, `.lead` | H1 = `titleLines` | csak a `lead` |
| Hat terület | `solutions.areas[]`: `id`, `icon`, `title`, `problem`, `solution`, `examples`; címkék: `solutions.labels`. Az `id` horgony (a lábléc linkjei is használják), ne változtasd meg. | H2 = terület címe (H3-as méretben) | nem |
| Együttműködés | `solutions.engagement.eyebrow`, `.title`, `.lead`, `.featuredLabel`, `.items[]`: `title`, `text`, `price`, `points` | H2 = cím; H3 = csomag | a `lead` és a `price` |
| Így dolgozunk | `Steps.tsx` → `home.process.*` (közös a főoldallal: a módosítás mindkét oldalon megjelenik) | H2 + H3 | csak a `lead` |
| CTA | `solutions.cta.*` → `CtaBand.tsx` | H2 | csak a `text` |

## Rólunk (`site/app/rolunk/page.tsx`)

| Szekció | `copy.json` kulcs | Címszint | `Rich` |
|---|---|---|---|
| Oldalfejléc | `about.hero.*` | H1 | csak a `lead` |
| Miért Loopient? | `about.story.*` (bekezdéstömb) | H2 | igen, bekezdésenként |
| Alapító | `about.founder.name`, `.role`, `.bio`, `.quote`, `.photoAlt`, `.linkedin` | H2 = név | a `name`, a `bio` és a `linkedin.href`. A `quote` köré a komponens teszi ki a „…” jelet, ezért a szövegbe ne írj idézőjelet. |
| Hol és hogyan | `about.facts.title`, `.items[]`: `label`, `value` | H3 | a `value` |
| Alapelvek | `Principles.tsx` (közös a főoldallal) | H2 + H3 | nem |
| CTA | `about.cta.*` | H2 | csak a `text` |

## Kapcsolat (`site/app/kapcsolat/page.tsx`)

| Szekció | `copy.json` kulcs | Címszint | `Rich` |
|---|---|---|---|
| Oldalfejléc | `contact.hero.*` | H1 | csak a `lead` |
| Űrlap | `contact.form.*` (címkék, súgók, csapatméret-chipek, hozzájárulás, gomb) | H2 = `form.title` | nem |
| Űrlapállapotok | `contact.states.*` (siker, hiba, validáció, `notConfigured`) | H2 = `successTitle` | a `successText` és a megjelenített hibaüzenet |
| Hibaüzenetek | `contact.errors.*` (a `site/lib/contact.ts` validációja használja) | – | nem |
| Elérhetőség | `contact.details.*` (a `{email}` és a `{phone}` a configból jön) | H2 | a `value` |
| Mi történik ezután? | `contact.next.title`, `.steps[]` (számozott lista) | H2 | nem |

## Oldalszintű és egyéb szövegek

| Mi | `copy.json` kulcs | Megjegyzés |
|---|---|---|
| Title és description | `meta.pages.<home, solutions, about, contact, privacy, imprint, notFound>` | `site/lib/metadata.ts`. A főoldal címe abszolút; a többi oldal címe után a `meta.titleTemplate` hozzáfűzi a „ | Loopient” végződést. Ugyanez a szöveg megy az OG és a Twitter metaadatokba is. |
| OG-kép alt szövege | `meta.ogImageAlt` | – |
| 404 | `micro.notFound.*` | – |
| Gombok, akadálymentességi szövegek | `micro.buttons.*`, `micro.a11y.*` | Közös, több komponens használja: módosítás előtt keress rá a használatukra. |
| Süti-sáv | `consent.*` | Csak beállított analitika esetén jelenik meg. |
| Jogi oldalak | `legal.privacy`, `legal.imprint` | Vázlat, jogász ellenőrzi. Szövegírási célból ne módosítsd. |
| Márkaszövegek | `brand.*` (bemutatkozók, szlogenek) | A nyomdai és social anyagok forrása is (`tools/render_assets.mjs`). Módosítás után azokat is újra kell generálni. Ezt jelezd, és ne futtasd kérés nélkül. |
