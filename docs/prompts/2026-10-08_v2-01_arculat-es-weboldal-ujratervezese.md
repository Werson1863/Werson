# Prompt – arculat és weboldal újratervezése (v2)

- **Munkamenet:** Loopient brand és weboldal redesign (v2) · `session_01TRzLJZ8mmREvUbNuTdmqut`
- **Időpont (UTC):** 2026-10-08T23:36
- **Sorszám a munkamenetben:** 1/2

## A prompt szó szerint

````text
Szerepkör: senior brand designer + webdesigner + copywriter + frontend fejlesztő. Nyelv: magyar. Először 8 soros tervet adj, aztán dolgozz végig kérdezgetés nélkül. A végén a kész, élesíthető weboldalt és a teljes arculati csomagot add át.

CÉL
A Loopient (üzleti automatizálás, "Business automation", Debrecen és környéke, távolról is) arculatát és weboldalát tervezd újra a MÁR KIVÁLASZTOTT logóval, készíts el minden hozzá szükséges tartalmat a megfelelő formátumokban, majd told össze a kész weboldalt.

KÖTÖTT LOGÓ (nem módosítható)
- Jel: L alakú, kétpengés levélszalag. A csatolt zipben van (SVG/PNG, világos/sötét, vízszintes/egymás alatti, egyszínű, app-ikon, favicon). Ezeket használd, ne rajzold újra.
- Ha egy fájl hiányzik, a jel geometriája (100×100-as doboz):
  blade1: M43 16 C30 18 23.6 28 23.6 37 L23.6 62 C23.6 74 33 82 52 82 L50 82 C45 79 43 72 43 64 Z
  blade2: M43 64.6 L81.3 64.6 C80 76 72 82 62 82 L50 82 C45 79 43 72 43 64.6 Z
- Logószöveg: LOOPIENT (az E három vízszintes vonal), alatta BUSINESS AUTOMATION, tágan betűzve.
- Színek: narancs #F97316, mély narancs #C2410C (szöveg/link világos háttéren), világos narancs #FDBA74, grafit #0F1115, sötétszürke #1F2330, világosszürke #F5F5F7, háttér #F9F9F8. Font: Inter.
- A #F97316-ot szövegként csak sötét háttéren használd (WCAG AA).

1) MÁRKA ÉS SZÖVEG
- Márkaplatform: pozicionálás (1 mondat), ígéret, 3 alapelv, hangnem (tegező, szakszerű, emberi, nincs túlígérés), "mit mondunk / mit nem mondunk".
- Névhasználat: a Loopient helyes írása, rövidítés, jogi forma helykitöltő, alcím-variációk.
- Szlogen: 8 javaslat, 1 ajánlott indoklással.
- Bemutatkozók: 1 mondat, 50 szó, 150 szó (weboldal, LinkedIn, e-mail lábléc).
- Teljes szövegkönyv JSON és Markdown formátumban: főoldal, Megoldások, Rólunk, Kapcsolat, GYIK (8 kérdés), mikro-szövegek (gombok, hibák, űrlap-állapotok), meta title/description oldalanként.
- A kitalált számokat, árakat, ügyfélneveket jelöld [TODO]-val, ne állíts valótlant.

2) VIZUÁLIS ESZKÖZÖK (SVG + PNG, ahol értelmes)
- Favicon (ico 16/32/48), apple-touch-icon 180, android 192/512, safari-pinned-tab SVG, monokróm változatok.
- OG kép 1200×630, LinkedIn banner 1584×396, profilkép 1080×1080, e-mail aláírás-logó (2x PNG).
- Névjegykártya és levélpapír sablon (PDF, 85×55 mm, 3 mm bleed).
- Egységes ikonkészlet (24 px rács, vonalstílus): riport, dokumentum, rendszerek, jóváhagyás, idő, biztonság, integráció.
- Mintázat/háttérmotívum az L-jel formájából (hero és CTA).
- Fotók (3 db, az alapítóról, Péterről): WebP 800/1200/1600 px, reszponzív srcset, alt szöveg, arcretusálás nélkül. A színes portré a Rólunk szekcióba, a fekete-fehér a záró CTA fölé, a teljes alakos a Rólunk oldalra kerül.

3) DESIGN RENDSZER
- tokens.json + tokens.css + Tailwind config: színek, tipó-skála, térközök, radius, árnyék, mozgás.
- Komponensek leírása: gombok, kártyák, chip, accordion, űrlap, üvegszerű sticky menü, announcement sáv, mock-UI kártyák.
- Referencia: siteinspire.com "Town" szerkezet + "Tekt" számozott folyamat.
- Mozgás (Emil Kowalski): cubic-bezier(0.23,1,0.32,1), 150–250 ms, csak transform/opacity, soha "transition: all"; gomb :active scale(0.97); hover csak (hover:hover) and (pointer:fine) alatt; prefers-reduced-motion tiszteletben tartva; input 16 px, érintési felület min. 44 px, touch-action: manipulation; letter-spacing -0.03em és line-height ~1.05 a címeken; tabular-nums; átlátszó árnyék tömör keret helyett; sticky menü blur(20px) saturate(180%); min-w-0 és overflow-wrap:anywhere a hosszú szövegekhez.

4) OLDALTERVEK
Főoldal, Megoldások, Rólunk, Kapcsolat: mockup PNG-k 1440, 768 és 375 px szélességben.
Főoldal sorrend: announcement sáv, hero (középre igazított, nagy tördelt cím + mock-UI "Ma reggel, automatikusan"), 3 feature-sor mock-UI-val (riport jóváhagyás-kapcsolóval, dokumentumok "Rád vár" jelzéssel, rendszerek szinkronja), szűrhető folyamat-kártyák, integrációk rács, számozott folyamat 01–03, sötét "Alapelveink", Rólunk-részlet fotóval, GYIK, narancs záró CTA, sötét footer.

5) A KÉSZ WEBOLDAL
- Stack: Next.js (App Router) + TypeScript + Tailwind, Vercelre deployolható, minimális függőség.
- A fenti szövegkönyvből és eszközökből építsd, ne duplikáld a szöveget a kódban (content mappából töltse be).
- Magyar SEO: title/description, OG kép, sitemap, robots, schema.org Organization, canonical, lang="hu".
- Kapcsolat: működő űrlap (név, e-mail, cég, csapatméret-chipek, üzenet), szerveroldali validáció, honeypot, küldés Resend-en át (kulcs env változóban), sikeres/hibás állapot. Az elérhetőségek helykitöltők egy config fájlban: [e-mail cím], [telefonszám].
- Süti/adatvédelem: Adatkezelési tájékoztató és Impresszum oldal vázlata [TODO] jelöléssel, GDPR-barát űrlap-hozzájárulás. Analitika csak hozzájárulással.
- Minőség: Lighthouse 95+ (teljesítmény, akadálymentesség, SEO), billentyűzettel is használható menü és accordion, látható fókuszállapot.
- Ellenőrzés: Playwright screenshot 375, 768 és 1440 px-en, javítsd, ami elcsúszik.

6) ÁTADÁS
Mappaszerkezet:
/brand (logo, icons, social, print) · /photos · /content (copy.json, copy.md, brand-guide.md) · /design (tokens.json, tokens.css, tailwind snippet, components.md) · /mockups · /site (a Next.js projekt) · README.md (mi mire való, futtatás, Vercel deploy lépések).
Készíts 1 oldalas brand-guide PDF-et is: logó, védőtér, minimális méret, színek, tipó, tiltott használat, hangnem.
A végén adj [TODO]-listát arról, amit nekem kell kitöltenem: elérhetőségek, ügyfélnevek, árak, jogi szövegek, domain, e-mail szolgáltató kulcs.
````
