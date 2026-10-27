# Kapás – zsebhorgászszett landing page

Érdeklődésmérő (előjegyzős) landing oldal egy prémium mini horgászbot szetthez.

- `index.html` – az egész oldal egy fájlban (statikus, bármilyen tárhelyre feltehető: Vercel, Netlify, GitHub Pages)
- `logo.svg` – hal sziluettes logó (kör alakú jelvény, horog + hal)

## Hova mennek a feliratkozások?

Supabase, `public.kapas_waitlist` tábla. A böngésző csak **beszúrni** tud (RLS), olvasni nem;
a számláló egy `kapas_waitlist_count()` függvényen keresztül csak a darabszámot adja vissza
(10 feliratkozó alatt el van rejtve az oldalon).

Mentett mezők: e-mail, keresztnév (opcionális), szándék (`megvennem` / `ajandek` / `erdekel`),
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

-- Forrásonként
select source, count(*) from kapas_waitlist group by 1 order by 2 desc;
```

## Árazás (becslés)

| | Összeg |
|---|---|
| Gyártói ár (10–99 db) | 18 574 Ft/db |
| Szállítás + vám (becslés, ~3,7% vám) | ~4 000 Ft/db |
| **Bekerülés nettó** | **~22 600 Ft/db** |

| Eladási ár (bruttó) | Nettó bevétel (27% ÁFA) | Fedezet hirdetés előtt |
|---|---|---|
| 39 990 Ft (alapító ár, első 50 db) | 31 488 Ft | ~8 900 Ft |
| 44 990 Ft (normál ár) | 35 425 Ft | ~12 800 Ft |

Ha alanyi adómentes vagy, az import ÁFA (~6 100 Ft/db) költség lesz, de az eladásnál nincs ÁFA:
44 990 Ft-nál kb. 16 000 Ft, 39 990 Ft-nál kb. 11 000 Ft marad darabonként.

A fedezetből még le kell vonni: hirdetés (egy eladás ára Meta-n könnyen 3–8 000 Ft), csomagolás,
futár, fizetési díj. Ezért 39 990 Ft alá nem érdemes menni. Az űrlap árérzet-kérdése megmutatja,
elbírja-e a piac a 44 990 Ft-ot.

## Teendő élesítés előtt

- A méreteket és a doboz tartalmát (`index.html`, „A dobozban” és „Adatok” rész) igazítsd a gyártói adatlaphoz.
- Ha már lesz valódi termékfotó, cseréld le vele a rajzolt illusztrációt.
