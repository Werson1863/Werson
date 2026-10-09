# Prompt – weboldal megtervezese es epitese

- **Munkamenet:** Loopient weboldal tervezés (v1) · `session_01Rx4E8HHNZNnZz1p1UWRyA4`
- **Időpont (UTC):** 2026-10-08T23:13:16.499652Z
- **Sorszám a munkamenetben:** 1/5

## A prompt szó szerint

````text
Tervezd meg és told össze a KÉSZ, élesíthető weboldalt a Loopient nevű magyar üzleti automatizálási cégnek (slogen: "Business automation"). Nyelv: magyar. Először 5 soros tervet adj, utána építs, kérdezgetés nélkül.

MÁRKA
- Narancs #F97316 (kiemelés), #C2410C (szöveg/link világos háttéren), #FDBA74 (világos), grafit #0F1115, sötétszürke #1F2330, világosszürke #F5F5F7, oldalháttér #F9F9F8. Font: Inter.
- Logó: /assets/logo/ mappában (vízszintes világos/sötét SVG, jel, favicon). Ezt használd, ne rajzold újra.
- Fotók: /assets/photos/ (3 db az alapítóról, Péterről: színes portré, teljes alakos, fekete-fehér portré). A bézs öltöny és barna nyakkendő passzol a narancs palettához. Hero-ba ne tedd, a "Rólunk / Ki áll mögötte" szekcióban használd: portré + rövid bemutatkozás, a fekete-fehér a CTA vagy a footer felett. WebP-re konvertálva, reszponzív srcset, lazy-load, alt szöveggel.

STACK
Next.js (App Router) + TypeScript + Tailwind, statikusan exportálható. Vercelre deployolható. Semmi felesleges függőség.

OLDALAK
Főoldal, Megoldások, Rólunk, Kapcsolat. Magyar SEO (title, description, OG kép, sitemap, robots, schema.org Organization).

FŐOLDAL FELÉPÍTÉSE (Town + Tekt referencia a siteinspire.com-ról)
1. Sötét announcement sáv: ingyenes konzultáció.
2. Üvegszerű, görgetéskor fent maradó menü (backdrop-blur), "Kérj ajánlatot" gomb.
3. Hero: középre igazított, nagy, tördelt cím: "Hatékonyabb folyamatok. Több idő a lényegesre." + két CTA + alatta mock-UI kártya "Ma reggel, automatikusan".
4. Három feature-sor mock-UI kártyákkal (riportok jóváhagyás-kapcsolóval, dokumentumok "Rád vár" jelzéssel, rendszerek szinkronja).
5. "Mit váltunk ki" szűrő-chipek + kártyák.
6. Integrációk rács (táblázatok, e-mail, webshop, számlázás, ERP, üzenetküldők).
7. Számozott folyamat 01–03.
8. Sötét "Alapelveink" 4 kártya.
9. Rólunk-részlet a fotóval.
10. GYIK (accordion, billentyűzettel is működik).
11. Narancs záró CTA + sötét footer.

MOZGÁS ÉS CRAFT (Emil Kowalski szabályai)
- Easing: cubic-bezier(0.23,1,0.32,1), 150–250 ms. Csak transform és opacity animálj, soha "transition: all".
- Gombok :active állapotban scale(0.97), 160 ms.
- Hover csak @media (hover:hover) and (pointer:fine) mögött.
- Hero belépő animáció lépcsőzve, görgetésre finom reveal. prefers-reduced-motion esetén kikapcsolva.
- Címek letter-spacing -0.03em, line-height ~1.05; számok tabular-nums.
- Árnyék átlátszó, ne tömör keret. Sticky menü blur(20px) saturate(180%).
- Mobilon: min. 44 px érintési felület, input 16 px, touch-action: manipulation, tap-highlight kikapcsolva, min-w-0 és overflow-wrap:anywhere a hosszú szövegekhez.

KAPCSOLAT
Működő űrlap (név, e-mail, cég, csapatméret chipek, üzenet) szerveroldali validációval, spam-védelemmel (honeypot), e-mail küldéssel Resend-en át (a kulcs env változó). Sikeres/hibás állapot. Az elérhetőségek helykitöltők: [e-mail cím], [telefonszám], gyűjtsd őket egy config fájlba.

MINŐSÉG
Lighthouse 95+ (teljesítmény, akadálymentesség, SEO), WCAG AA kontraszt, látható fókuszállapot, sötét/világos témához nem kell kapcsoló. Ellenőrizd 375 px, 768 px és 1440 px szélességen böngészőben (Playwright screenshot), javítsd, ami elcsúszik.

A kitalált szövegeket (számok, árak, GYIK-válaszok) jelöld egy TODO-listában, hogy később kicserélhessem a valósra. Végén: futtatási útmutató és Vercel deploy lépések.
````
