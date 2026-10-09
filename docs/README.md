# Loopient – dokumentáció és munkatörténet

Minden, ami a Loopientről eddig született: promptok szó szerint, beszélgetések, döntések, nyitott kérdések.

## Tartalom

| Mappa / fájl | Mi van benne |
|---|---|
| [`prompts/`](prompts/) | Minden prompt szó szerint, időrendben (`ÉÉÉÉ-HH-NN_vX-NN_téma.md`) |
| [`conversations/`](conversations/) | Beszélgetésenként: promptok + Claude válaszai, a munka menete, eredmények |
| [`decisions.md`](decisions.md) | Döntésnapló: mit miért választottunk, és mi van még nyitva |
| [`TODO.md`](TODO.md) | Élesítés előtt kitöltendő tételek, felelőssel |
| [`../CHANGELOG.md`](../CHANGELOG.md) | Verziók |

## Idővonal (UTC)

| Időpont | Esemény | Részletek |
|---|---|---|
| 2026-10-08 23:08 | UI/UX Pro Max design skill telepítése a `Werson` repóba | Általános tervezési segédlet (nem Loopient-specifikus, ezért itt nincs másolata). Forrás: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| 2026-10-08 23:13 | **v1** – első weboldal (prompt) | [prompt](prompts/2026-10-08_v1-01_weboldal-megtervezese-es-epitese.md) |
| 2026-10-08 23:36 | **v2** – arculat és weboldal újratervezése a kiválasztott L-jeles logóval (prompt) | [prompt](prompts/2026-10-08_v2-01_arculat-es-weboldal-ujratervezese.md) |
| 2026-10-08 23:44 | v1 kész: Next.js oldal helykitöltő logóval és fotókkal | [beszélgetés](conversations/2026-10-08_v1_weboldal-tervezes.md) |
| 2026-10-08 23:51 | v1: képernyőképek kérése | „Mutasd az oldalt” |
| 2026-10-08 23:54 | v1: „Felejtsük el a Vercelt” | a v1 README hosting-semleges lett |
| 2026-10-08 23:55 | v1: háttérdíszítés és üveggombok kérése | 00:04-re kész |
| 2026-10-09 00:07 | v1: „Hogy tudom megnézni?”, válasz: helyi futtatás vagy privát előnézet | nyitva maradt |
| 2026-10-09 00:16 | v2 kész: arculati csomag, szövegkönyv, design rendszer, weboldal | [beszélgetés](conversations/2026-10-08_v2_arculat-es-weboldal.md) |
| 2026-10-09 00:2x | Külön `loopient` repó kérése; ez a repó | [prompt](prompts/2026-10-09_v2-02_github-repo-letrehozasa.md) |

A v1 és a v2 munkamenet részben párhuzamosan futott (23:36 és 00:07 között).

## Munkamenetek

| Munkamenet | Azonosító | Eredeti ág | Ebben a repóban |
|---|---|---|---|
| Loopient weboldal tervezés (v1) | `session_01Rx4E8HHNZNnZz1p1UWRyA4` | `Werson1863/Werson` · `claude/loopient-website` | `archive/v1-weboldal/` |
| Loopient brand és weboldal redesign (v2) | `session_01TRzLJZ8mmREvUbNuTdmqut` | `Werson1863/Werson` · `claude/loopient-brand-site` | a repó gyökere |

## Ami nincs itt (és miért)

- **A „csatolt zip”** a kiválasztott logóval: egyik munkamenetben sem érkezett meg, ezért nincs mit archiválni. A v2 logó a promptban megadott pengegeometriából készült. Ha megvan az eredeti, tedd a `brand/logo/source/` alá.
- **Valódi fotók Péterről:** egyik munkamenetben sem voltak; mindkét verzió helykitöltőt használ.
- **claude.ai-os (nem Claude Code-os) beszélgetések**, például ahol a logót kiválasztottátok: ezekhez nincs hozzáférésem. Ha vannak, másold be őket a `conversations/` mappába ugyanilyen formában.
