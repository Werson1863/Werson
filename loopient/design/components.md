# Loopient – komponensek

> Forrás-tokenek: `design/tokens.json` → `tokens.css` (sima CSS-változók `--lp-*`), `tailwind.theme.css` (Tailwind v4 `@theme`), `tailwind.config.snippet.js` (Tailwind v3). A weboldal implementációja: `site/components/`, az osztályok: `site/app/globals.css`.
> Szerkezeti referencia: siteinspire „Town” (középre igazított hero, termék-mockok, sávos szekciók) + „Tekt” (számozott 01–03 folyamat nagy számokkal).

## Globális szabályok

| Szabály | Megvalósítás |
|---|---|
| Egy könnyítési görbe | `--lp-ease: cubic-bezier(0.23,1,0.32,1)`; időtartam 150 / 200 / 250 ms |
| Csak transform + opacity | minden `transition` property-listával (`transform`, `opacity`), sehol `all` |
| Gomb lenyomás | `:active { transform: scale(0.97) }` |
| Hover csak egérrel | `@media (hover: hover) and (pointer: fine)` |
| Csökkentett mozgás | `prefers-reduced-motion: reduce` → animáció és átmenet ~0 ms |
| Input méret | min. 16 px (iOS nem nagyít) |
| Érintési felület | min. 44×44 px (gomb, chip, menüpont, lábléc-link mobilon) |
| `touch-action: manipulation` | a, button, input, label, summary |
| Címek | `letter-spacing: -0.03em`, `line-height: ~1.05`, `text-wrap: balance` |
| Számok | `.tabular` → `font-variant-numeric: tabular-nums` |
| Keret helyett árnyék | `--shadow-ring: 0 0 0 1px rgb(15 17 21 / .07)`, a kártyák rétegzett, átlátszó árnyékot kapnak |
| Hosszú szöveg | `.break-anywhere` → `min-width: 0; overflow-wrap: anywhere`; egyoszlopos gridek `grid-cols-1` (= `minmax(0,1fr)`) |
| Fókusz | `:focus-visible` 2 px mély narancs outline, 3 px offset; sötét/narancs alapon fehér/grafit |

## Gombok `.btn`

- Magasság 48 px (`.btn-sm`: 44 px), lekerekítés `full`, SemiBold 15 px, `white-space: nowrap`.
- **Hover:** egy `::before` réteg (currentColor / fehér) opacity 0 → 0,08; a nyíl ikon `translateX(2px)`.
- **Változatok:**
  - `btn-primary`: grafit alap, fehér szöveg. Fő CTA világos és narancs alapon.
  - `btn-secondary`: fehér alap, gyűrű-árnyék. Másodlagos művelet.
  - `btn-accent`: narancs alap, grafit szöveg. Csak sötét szekcióban.
  - `btn-outline-graphite`: másodlagos művelet narancs alapon.
  - `btn-outline-dark`: másodlagos művelet sötét alapon.
- **Állapotok:** `disabled` / `aria-disabled` → 55% opacity, nincs scale. Küldés közben a szöveg: „Küldés…”.
- **Szöveges link** `.link-arrow`: mély narancs, min. 44 px magas, hoverre aláhúzás és a nyíl +3 px.

## Kártyák `.card`

Fehér alap, `radius-lg` (20 px), `shadow-md` (gyűrű + két puha réteg). Belső tér 24–40 px. Sötét szekcióban `bg-ink` + `shadow-ring-dark`. Kiemelt (pl. „Projekt”) kártya: grafit alap, `shadow-lg`, narancs „Leggyakoribb” pill.

## Chip `.chip`

- Min. 44 px magas, `full` lekerekítés, fehér alap, gyűrű-árnyék, Medium 15 px.
- **Szűrő:** `<button aria-pressed>`; aktív = grafit alap, fehér szöveg. A csoport `role="group"` + `aria-label`; találatszám `aria-live="polite"` régióban. Mobilon vízszintesen görgethető sor.
- **Rádió-chip (űrlap):** `<label class="chip"><input type="radio" class="sr-only">`; kijelölt állapot `:has(input:checked)`, fókusz `:has(input:focus-visible)`. A nyílbillentyűs választás natív.
- **Pill** `.pill`: 26 px, állapotjelzés: `pill-wait` (narancs tint, mély narancs, pulzáló pötty), `pill-done` (zöld tint), `pill-neutral`.

## Accordion (GYIK)

`h3 > button[aria-expanded][aria-controls]` + `div[role=region][aria-labelledby][hidden]`. Több elem is nyitva lehet; az első alapból nyitva. Enter és Space nyit (natív gomb). A chevron `rotate(180deg)` 200 ms-on; a tartalom `enter` animációval (opacity + 6 px translateY) jelenik meg. Elválasztó: 10%-os grafit hajszálvonal.

## Űrlap

- Címke felül (SemiBold 15 px), kötelező mező mély narancs `*` (a képernyőolvasó a `required`-et olvassa).
- Mező `.field`: 48 px min., `radius-sm`, belső gyűrű-árnyék (nem border), 16 px szöveg. Hiba: `aria-invalid="true"` → 1,5 px piros gyűrű; hibaszöveg `aria-describedby`-jal kötve.
- **Állapotok:** alap → küldés („Küldés…”, gomb tiltva) → *invalid* (összegző `role="alert"` doboz + mezőhibák, a fókusz az első hibás mezőre ugrik, az értékek megmaradnak) → *error* (szerver/küldési hiba, alternatív e-mail cím) → *success* (`role="status"` zöld panel, „Újabb üzenet küldése”).
- Védelem: honeypot mező (képernyőolvasó elől rejtve), 2,5 s-os időcsapda, IP-alapú rate limit, szerveroldali validáció. JS nélkül is beküldhető (Server Action).
- GDPR: kötelező hozzájárulás-checkbox linkkel az Adatkezelési tájékoztatóra.

## Üvegszerű sticky menü `.glass`

64 px magas, `position: sticky; top: 0`, háttér `rgb(249 249 248 / .72)` + `backdrop-filter: blur(20px) saturate(180%)`, alul 1 px átlátszó árnyékvonal. Támogatás hiányában 97%-os tömör háttér. Desktopon középen a menüpontok (`aria-current="page"`), jobbra a „Beszéljünk” gomb. Mobilon menügomb (`aria-expanded`, `aria-controls`): a panel alatta nyílik, fókusz az első linkre, Esc bezár és visszaadja a fókuszt, linkre kattintva bezár.

## Announcement sáv

40 px, grafit alap, on-dark-muted szöveg, világos narancs link nyíllal. Egy mondat, nem bezárható (nem zavaró). Mobilon tördelődik, a pötty eltűnik.

## Mock-UI kártyák

Termékszerű illusztrációk, **mindig „Példa” jelöléssel**, mert az adataik nem állítások.
- Keret (`MockCard`): fejléc a grafit négyzetbe tett jellel, címmel, alcímmel és „Példa” pill-lel.
- **Hero – „Ma reggel, automatikusan”:** idővonal-lista (idő tabular, ikon-kör, szöveg, állapot pill; mobilon pötty/pipa ikon `role="img"` + `aria-label`).
- **Riport:** mini oszlopdiagram (utolsó oszlop narancs), 3 KPI-csempe, **jóváhagyás-kapcsoló** (`button[role=switch][aria-checked]`, a gomb 44 px érintési felület; a gomb translateX, a narancs réteg opacity). Kikapcsolva a szöveg: „Jóváhagyás nélkül megy ki…”.
- **Dokumentumok:** fájllista, a „Rád vár” sor narancs tint háttérrel és pulzáló pöttyel. Hosszú fájlnév ellipszissel, `title`-ben a teljes név.
- **Rendszerek:** három csomópont, köztük vonalon mozgó adatpontok (`translateX` 0 → 100%), zöld „Szinkronizálva” sáv és napló.
- A mock mögött `bg-mist` lemez (mobilon kisebb kifutással, a szekció `overflow-x: clip`).

## Szekció-minták

| Minta | Leírás |
|---|---|
| Hero | középre igazított, eyebrow pill → Display cím soronként tördelve, az utolsó sor mély narancs → lead → 2 gomb → apró megjegyzés → mock-UI, mögötte halvány L-mintázat radiális maszkkal |
| Feature-sor | 2 oszlop, váltakozó oldal; eyebrow, H2 méretű cím, lead, pipás lista |
| Szűrhető kártyák | chip-sor + 1/2/3 oszlopos kártyarács |
| Integrációk | 2/3/6 oszlopos csemperács, csak szöveg (nincs harmadik fél logója) |
| Számozott folyamat | 3 oszlop, 2 px grafit felső vonal, 56–96 px mély narancs szám (Tekt) |
| Alapelvek | grafit szekció, sötét mintázat, 3 ink kártya ikonnal |
| Záró CTA | narancs, lekerekített blokk (`radius-2xl`), narancs mintázat, grafit szöveg; felül a fekete-fehér portré körben, 6 px paper gyűrűvel |
| Lábléc | grafit, logó (dark), szlogen, 3 link-oszlop + elérhetőség, alsó sor jogi infóval és süti-beállítással (ha van analitika) |
