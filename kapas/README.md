# Kapás – zsebhorgászszett landing page

Érdeklődésmérő (előjegyzős) landing oldal egy prémium zseb-spiccbot szetthez: 16 cm-re csukható, 1,7 m-es
bambuszmintás karbon bot faragott keményfa dobozban (Alibaba: „Ultra Light Carbon Fiber Fishing Rod Portable
Short Section Travel Set Wooden Box”).

- `index.html` – az egész oldal egy fájlban (statikus, bármilyen tárhelyre feltehető: Vercel, Netlify, GitHub Pages)
- `logo.svg` – hal sziluettes logó (kör alakú jelvény, horog + hal)
- `img/` – a gyártói hirdetés fotóiból kivágott képek. Amint van saját fotód, cseréld le őket.

## Hova mennek a feliratkozások?

Supabase, `public.kapas_waitlist` tábla. A böngésző csak **beszúrni** tud (RLS), olvasni nem;
a számláló egy `kapas_waitlist_count()` függvényen keresztül csak a darabszámot adja vissza
(10 feliratkozó alatt el van rejtve az oldalon).

Mentett mezők: e-mail, keresztnév (opcionális), színváltozat (`zold` / `natur` / `mindegy`), szándék (`megvennem` / `ajandek` / `erdekel`),
árérzet (`30k_alatt` / `30_40k` / `40_50k` / `50k_felett`), darabszám, forrás (`utm_source` vagy referrer).

Hirdetéseknél tegyél `?utm_source=facebook` (stb.) paramétert a linkre, így látod, honnan jöttek.

### Hasznos lekérdezések (Supabase → SQL Editor)

```sql
-- Összesítő
select count(*) as osszes,
       count(*) filter (where intent = 'megvennem') as megvenne,
       count(*) filter (where intent = 'ajandek')   as ajandekba,
       sum(quantity) filter (where intent <> 'erdekel') as kert_darab
from kapas_waitlist;

-- Árérzet megoszlás
select price_band, count(*) from kapas_waitlist group by 1 order by 2 desc;

-- Színváltozat
select variant, count(*) from kapas_waitlist group by 1 order by 2 desc;

-- Forrásonként
select source, count(*) from kapas_waitlist group by 1 order by 2 desc;
```

## Árazás (becslés)

| | Összeg |
|---|---|
| Gyártói ár (10–99 db) | 18 574 Ft/db |
| Szállítás | ingyenes (6 755 Ft-ig rendelésenként) |
| Vám + vámkezelési díj (becslés) | ~1 500 Ft/db |
| **Bekerülés nettó** | **~20 000 Ft/db** |

| Eladási ár (bruttó) | Nettó bevétel (27% ÁFA) | Fedezet hirdetés előtt |
|---|---|---|
| 39 990 Ft (alapító ár, első 50 db) | 31 488 Ft | ~11 500 Ft |
| 44 990 Ft (normál ár) | 35 425 Ft | ~15 400 Ft |

Ha alanyi adómentes vagy, az import ÁFA (~5 400 Ft/db) költség lesz, de az eladásnál nincs ÁFA:
44 990 Ft-nál kb. 19 600 Ft, 39 990 Ft-nál kb. 14 600 Ft marad darabonként.

A fedezetből még le kell vonni: hirdetés (egy eladás ára Meta-n könnyen 3–8 000 Ft), csomagolás,
futár, fizetési díj. Ezért 39 990 Ft alá nem érdemes menni. Az űrlap árérzet-kérdése megmutatja,
elbírja-e a piac a 44 990 Ft-ot.

## Teendő élesítés előtt

- Kérdezd meg a gyártót: mi a zöld tubus (csali vagy ragasztó?), mindkét színhez jár-e gravírozott fedél, és van-e mágneses zár.
- Az oldal magyar nyelvű útmutatót ígér, ezt el kell készíteni a csomagba.
- A fotók a gyártó hirdetéséből vannak. Kérdezd meg, használhatod-e őket, vagy fotózz sajátot a mintadarabról.
