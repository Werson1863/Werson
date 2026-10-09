# Loopient – márkaplatform és arculati útmutató

> v1.0 · Az egyoldalas nyomtatható összefoglaló: `brand/loopient-brand-guide.pdf`.
> A weboldal minden szövege a `content/copy.json`-ban van; ez a dokumentum a döntéseket és a szabályokat rögzíti.

## 1. Márkaplatform

**Pozicionálás (1 mondat)**
A Loopient a Debrecen környéki és távoli kis- és középvállalkozásoknak építi meg azokat az automatizálásokat, amelyek leveszik a csapat válláról az ismétlődő adminisztrációt, a meglévő rendszereikre építve, érthetően átadva.

**Ígéret**
Kevesebb kézi másolgatás, több idő arra, ami tényleg a te munkád. Csak azt automatizáljuk, aminek kézzelfogható haszna van, és úgy adjuk át, hogy értsd és irányítsd.

**Három alapelv**
1. **Előbb értjük, aztán építünk.** Felmérés nélkül nem javaslunk eszközt. Megmondjuk azt is, mit *nem* érdemes automatizálni.
2. **Az ember a hurokban marad.** Ahol döntés kell, ott jóváhagyási pont van. A rendszer előkészít, te döntesz. (Ez a név gondolata: *loop*, azaz hurok.)
3. **Átlátható és átadható.** A megoldás a te fiókjaidban fut, dokumentálva. Nincs bezártság.

**Kinek szól:** 1–50 fős vállalkozások vezetőinek és irodavezetőinek, akiknek a hétből órákat visz el a riportkészítés, a számlák és dokumentumok rendezése, és az adatok átvezetése egyik rendszerből a másikba.

## 2. Hangnem

| Tulajdonság | Ez azt jelenti | Példa |
|---|---|---|
| **Tegező** | Közvetlen, partneri, de nem haverkodó. | „Írd le röviden, mi visz el sok időt.” |
| **Szakszerű** | Pontos szavak, konkrét példák, nincs ködösítés. | „Webshop-rendelések átvezetve a számlázóba.” |
| **Emberi** | Rövid mondatok, hétköznapi szókincs, a hasznot mondjuk, nem a technológiát. | „Nyugodt hétfők.” |
| **Nincs túlígérés** | Csak ellenőrizhető állítás. Számot csak valós adatból. | „A felmérésen őszintén megmondjuk, ha nálad nem éri meg.” |

### Mit mondunk / mit nem mondunk

| Mondjuk ✓ | Nem mondjuk ✕ |
|---|---|
| „leveszi a válladról az ismétlődő munkát” | „100%-os automatizálás” |
| „a meglévő rendszereidre építünk” | „forradalmasítjuk a vállalkozásod” |
| „megmondjuk, mi éri meg, és mi nem” | „az MI mindent megold helyetted” |
| „ahol döntés kell, ott te döntesz” | „soha többé nem kell hozzányúlnod” |
| „fix ajánlat a felmérés után” | „garantált megtérülés X nap alatt” |
| konkrét folyamatnevek (számla, riport, ajánlatkérés) | zsargon magyarázat nélkül (hiperautomatizáció, RPA-stack, workflow orchestration) |
| „példa” jelölés minden illusztratív adaton | kitalált ügyfélnév, kitalált eredményszám |

**Írási szabályok:** magyar idézőjel („…”), gondolatjel helyett lehetőleg vessző vagy új mondat, számok `tabular-nums`-szal és ezres tagolással szóközzel (4 280 000 Ft). Gombszöveg: ige vagy rövid felszólítás („Beszéljünk”, „Üzenet küldése”). Kitalált szám, ár, ügyfélnév csak `[TODO]` jelöléssel kerülhet anyagba.

## 3. Névhasználat

- **Helyes:** Loopient (nagy L, a többi kisbetű, egy szó).
- **Csak a logóban:** LOOPIENT, csupa nagybetűvel, az E három vízszintes vonal. Folyó szövegben soha ne utánozd a ≡ jelet.
- **Helytelen:** LoopIent, Loop-ient, Loopiant, loopient (kivéve domain/felhasználónév), LOOPIENT folyó szövegben.
- **Rövidítés:** nincs. Szűk helyen a jel önmagában áll a szó helyett.
- **Jogi forma:** „Loopient [TODO: cégforma, pl. Kft. / egyéni vállalkozó]”. Első említéskor jogi szövegben a teljes név, utána „Loopient”.
- **Alcím-variációk:**
  - *Business automation*: a logóban, nemzetközi felületen.
  - *Üzleti automatizálás*: magyar alcím, metaadatok.
  - *Üzleti automatizálás · Debrecen és távolról*: helyi kommunikáció, hero eyebrow.
  - *Automatizálás kis- és középvállalkozásoknak*: hirdetés, LinkedIn.

## 4. Szlogen

Ajánlott: **„Te döntesz. A rutin megy magától.”**
Indoklás: két rövid mondat. Az első a kontrollt mondja ki (az ember a hurokban, ez a márka alapelve és a név gondolata), a második a hasznot. Tegező, nem ígér számot, és a hero-tól az e-mail aláírásig mindenhol elfér. A két fél külön is használható (pl. „A rutin megy magától.” mint alcím).

További javaslatok: „Ami ismétlődik, az menjen magától.” · „Automatizálás, emberi léptékben.” · „Kevesebb kattintás. Több munkaidő.” · „Ismétlődő munka helyett működő folyamatok.” · „A rendszereid végre beszélnek egymással.” · „Te maradsz a hurokban. A rutin nem.” · „Zárd rövidre a rutint.”

## 5. Bemutatkozók

A szövegek a `content/copy.json` → `brand.bios` alatt vannak, olvasható formában a `content/copy.md`-ben.

| Hossz | Hol használd |
|---|---|
| 1 mondat (`oneSentence`) | e-mail lábléc, profil-alcím, sajtóközlemény vége |
| ~50 szó (`fiftyWords`) | LinkedIn „Névjegy” rövid, partnerlisták, ajánlatok fejléce |
| ~150 szó (`hundredFiftyWords`) | weboldal, LinkedIn céges oldal „Áttekintés” |
| LinkedIn címsor (`linkedinHeadline`) | személyes és céges LinkedIn |

## 6. Logó

**Kötött elem, nem módosítható.** A jel egy L alakú, kétpengés levélszalag (100×100-as doboz, a geometria a `tools/build_brand.py`-ban). A szóvédjegy az Inter Bold körvonalaiból készült, az E három azonos vízszintes vonal; alatta a BUSINESS AUTOMATION tágan betűzve, pontosan a szóvédjegy szélességében.

| Változat | Fájl | Mikor |
|---|---|---|
| Vízszintes | `brand/logo/loopient-horizontal-*.svg` | alapértelmezett: weboldal fejléc, dokumentumok |
| Egymás alatti | `brand/logo/loopient-stacked-*.svg` | négyzetes felületek, névjegy előlap, borítók |
| Csak jel | `brand/logo/loopient-mark-*.svg` | favicon, avatar, kis méret, vízjel |
| Szóvédjegy | `brand/logo/loopient-wordmark(-only)-*.svg` | ha a jel már szerepel a felületen |
| App-ikon | `brand/logo/loopient-app-icon-*.svg` | telefonos ikon, közösségi profil |

**Színváltozatok:** `light` (világos alapra: narancs + mély narancs penge, grafit szöveg) · `dark` (sötét alapra: narancs + világos narancs penge, fehér szöveg) · `mono-black` · `mono-white` · `mono-orange` (mély narancs). Egyszínű változatban a két penge egy formává olvad; ez szándékos.

**Védőtér:** minden oldalon legalább **x**, ahol x a LOOPIENT betűk magassága. A csak-jel változatnál x = a jel szélességének fele.

**Minimális méret:** vízszintes logó 120 px / 30 mm széles · tagline nélkül 90 px / 22 mm · csak jel 16 px / 5 mm. 120 px alatt a tagline olvashatatlan, ott a tagline nélküli vagy a csak-jel változatot használd.

**Tiltott:** torzítás, forgatás, átszínezés a palettán kívüli színre, árnyék/kontúr/színátmenet, a pengék szétszedése vagy átrendezése, zajos fotóra vagy narancs alapra helyezés (narancs alapon a `mono-white` vagy a `dark` változat menjen grafit kártyán), az E „javítása” valódi E betűre.

## 7. Színek

| Név | HEX | RGB | Használat |
|---|---|---|---|
| Narancs | `#F97316` | 249 115 22 | Fő márkaszín: jel, CTA-felület, kiemelés. **Szövegként csak sötét háttéren** (grafiton 6,7:1). |
| Mély narancs | `#C2410C` | 194 65 12 | Szöveg, link, fókuszgyűrű, eyebrow világos háttéren (paper-en 4,9:1, AA). |
| Világos narancs | `#FDBA74` | 253 186 116 | Kiemelés és link sötét háttéren, a jel 2. pengéje sötét változatban. |
| Grafit | `#0F1115` | 15 17 21 | Fő szövegszín, sötét szekciók, elsődleges gomb. |
| Sötétszürke | `#1F2330` | 31 35 48 | Kártyák sötét szekcióban. |
| Világosszürke | `#F5F5F7` | 245 245 247 | Másodlagos felület, mock-UI belső mezők. |
| Háttér | `#F9F9F8` | 249 249 248 | Oldal háttere. |

Kiegészítő (UI) tokenek: muted `#4B5160`, subtle `#6B7180`, on-dark-muted `#A9AEBB`, line `#E7E7EA`, orange-tint `#FFF1E6`, success `#15803D`, danger `#B91C1C`. Teljes lista: `design/tokens.json`.

**Arányok:** ~70% háttér/fehér, ~20% grafit, ~10% narancs. A narancs a cselekvés színe, ne szórd szét.
**Narancs alapon a szöveg grafit** (6,7:1). Fehér szöveg narancson nem megfelelő (2,8:1).

## 8. Tipográfia – Inter

| Szint | Méret | Vastagság | Sorköz | Betűköz |
|---|---|---|---|---|
| Display | 44 → 92 px (fluid) | Bold 700 | 1,02 | −0,035 em |
| H1 | 36 → 64 px | Bold 700 | 1,05 | −0,03 em |
| H2 | 30 → 50 px | Bold 700 | 1,05 | −0,03 em |
| H3 | 22 → 26 px | SemiBold 600 | 1,15 | −0,02 em |
| Lead | 17 → 20 px | Regular 400 | 1,55 | – |
| Törzs | 16 px | Regular 400 | 1,6 | – |
| Eyebrow | 12 px, NAGYBETŰ | SemiBold 600 | 1,3 | +0,14 em |

Számok mindig `tabular-nums`. A weboldal saját hostingról, woff2-ben tölti az Intert (latin + magyar ékezetek). Licenc: SIL OFL 1.1.

## 9. Ikonok

Egységes vonalikon-készlet, `brand/icons/` (SVG + PNG 48/96 grafit és mély narancs, `sprite.svg`):
24 px rács, 2 px margó, 1,5 px vonal, kerek végek és sarkok, `currentColor`.
Alapkészlet: **riport, dokumentum, rendszerek, jóváhagyás, idő, biztonság, integráció**, továbbá szinkron, beérkező, csapat, üzenet, e-mail, telefon, helyszín, nyilak, pipa, lenyitás, menü, bezárás. A menü ikon szándékosan a logó E-jét idézi.

## 10. Mintázat

Négy L-jel, 90°-onként elforgatva, sarokkal kifelé: zárt keret, azaz „hurok” (`brand/pattern/`). Mindig halványan (10–32% átlátszóság) és maszkolva (radiális vagy lineáris elhalványítás) használd, sosem szöveg alatt teljes erővel.
- `pattern-tile-light`: hero, aloldal-fejlécek (paper alapon)
- `pattern-tile-dark`: sötét szekciók, lábléc
- `pattern-tile-orange`: narancs CTA

## 11. Fotó

Három fotó Péterről (`photos/`), retusálás nélkül, természetes fényben:
- **Színes portré** (4:5): főoldali Rólunk-részlet.
- **Fekete-fehér portré** (1:1): a záró CTA fölé, kör alakban.
- **Teljes alakos** (2:3): Rólunk oldal.

Stílus: nyugodt háttér (iroda, fal, Debrecen-közeli helyszín), egyenes tekintet vagy munka közben, nincs stock-hatás. A pipeline csak vág, méretez és WebP-be tömörít (800/1200/1600 px).

## 12. Mozgás

Egyetlen görbe: `cubic-bezier(0.23, 1, 0.32, 1)`, 150–250 ms. Csak `transform` és `opacity` animál, `transition: all` soha. Gomb lenyomásra `scale(0.97)`. Hover csak egeres eszközön (`(hover: hover) and (pointer: fine)`). `prefers-reduced-motion` esetén minden mozgás kikapcsol. Részletek: `design/components.md`.
