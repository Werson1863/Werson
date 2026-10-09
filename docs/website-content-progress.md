# Weboldal-tartalomfejlesztés – haladás

> Frissítve: 2026-10-09 · Munkafolyamat: `.claude/skills/loopient-website-copy/SKILL.md` · Kapcsolódó: [audit](website-audit.md) · [stratégia](website-content-strategy.md) · [leltár](website-content-inventory.md)

**Státuszok:** NOT STARTED · AUDITED · DRAFT READY · AWAITING APPROVAL · APPROVED · IMPLEMENTED · VERIFIED · BLOCKED
**Szabály:** egy szekció csak akkor lehet VERIFIED, ha a szövegét a megbízó kifejezetten jóváhagyta, implementálva lett, és a build, a típusellenőrzés és a diff ellenőrzése lefutott. A hallgatás nem jóváhagyás.

## 0. Kapu: stratégia

| Elem | Státusz | Jóváhagyva | Nyitott kérdés |
|---|---|---|---|
| Audit (`docs/website-audit.md`) | VERIFIED | – (tájékoztató) | – |
| Tartalomstratégia (`docs/website-content-strategy.md`) | AWAITING APPROVAL | ✕ | S1–S9 döntések |
| Skill (`.claude/skills/loopient-website-copy/SKILL.md`) | IMPLEMENTED | – | A stratégia jóváhagyása után a skill hangnem-fejezetét a döntésekhez kell igazítani (S2) |

**Amíg a stratégia nem APPROVED, egyetlen szekció sem léphet DRAFT READY fölé.**

## 1. Szekciók feldolgozási sorrendben

| MCs | ID | Szekció | Státusz | Jelenlegi probléma | Javasolt változtatás | Szöveg jóváhagyva | Implementálva | Ellenőrizve | Nyitott kérdés |
|---|---|---|---|---|---|---|---|---|---|
| 1 | F-01, F-02 | Főoldali hero + mock | AUDITED | A H1 a szlogen; nem derül ki, mit csinál a Loopient | Leíró H1, táblázat-központú lead és mock | ✕ | ✕ | ✕ | S1, S3, S4 |
| 2 | F-03 (bevezető), F-07 | Problémafelvetés és értékajánlat | AUDITED | Nincs problémafelvetés; forrás nélküli általánosítás | „Ha ismerős…” helyzetek, értékajánlat | ✕ | ✕ | ✕ | S1 |
| 3 | F-03, F-04, F-05, M-01, M-02 | Szolgáltatások | AUDITED | Túl széles, nem igazolt területek és eszközök | 3–4 terület a szolgáltatási irány szerint | ✕ | ✕ | ✕ | S5, S6 |
| 4 | F-06, M-04 | Munkafolyamat | AUDITED | Megerősítetlen vállalások | Valós lépések és kimenetek | ✕ | ✕ | ✕ | Valós munkamód, határidők |
| 5 | F-08, R-01…R-05 | Bemutatkozás | AUDITED | Helykitöltő háttér, fotó, eredet; többes szám | Valós háttér, „én” hang (ha jóváhagyva) | ✕ | ✕ | ✕ | S2, Péter adatai, fotók |
| 6 | F-04, M-02 (példák) | Referenciák, példák | AUDITED | Nincs valós bizonyíték | Jelölt szemléltető példák; referencia csak engedéllyel | ✕ | ✕ | ✕ | Van-e bemutatható korábbi munka? |
| 7 | M-03 | Árazás és ajánlat | BLOCKED | Árak nélküli csomagok, „Leggyakoribb” | Az együttműködés menete ár nélkül, amíg nincs döntés | ✕ | ✕ | ✕ | Árazási modell (S7) |
| 8 | F-09 | GYIK | AUDITED | `[TODO]` válaszok, nem igazolt garancia és GDPR-állítás | Csak jóváhagyott feltételek | ✕ | ✕ | ✕ | Függ a 4. és 7. lépéstől |
| 9 | F-10, M-05, R-06, K-01…K-06 | Kapcsolat és CTA-k | AUDITED | `mailto:[e-mail cím]`; űrlap élesben nem küld; válaszidő hiányzik | Valós elérhetőség, egyértelmű következő lépés | ✕ | ✕ | ✕ | E-mail, telefon, válaszidő, Resend (S4) |
| 10 | F-00, N-01, N-02, N-04, N-05 | Navigáció és lábléc | AUDITED | Régi horgonyok a 3. lépés után; „Rólunk” vs. „Rólam” | Rövid, következetes címkék | ✕ | ✕ | ✕ | S2 |
| 11 | S-01…S-04 | SEO-metaadatok | AUDITED | Nincs fő szolgáltatási kifejezés | Oldalankénti fő téma | ✕ | ✕ | ✕ | Domain (N2) |
| 12 | J-01, J-02, N-03 | Jogi és adatkezelési tartalom | BLOCKED | Vázlat, sok `[TODO]`; hosting nyitott | Jogi szakértő; a szövegíró csak jelez | ✕ | ✕ | ✕ | Cégadatok, hosting (N1, N4) |
| – | B-01 | Márkaszövegek (`brand.*`, brand guide) | AUDITED | Eltérő pozicionálás a stratégiától | Igazítás a jóváhagyott stratégiához | ✕ | ✕ | ✕ | S1 |

## 2. Megerősítésre váró tények

| # | Tény | Melyik szekciót blokkolja | Válasz |
|---|---|---|---|
| T1 | Egyedül dolgozol? (én / mi hang) | Minden | – |
| T2 | Péter vezetékneve, szakmai háttere, eszköztapasztalata | 3, 5 | – |
| T3 | Ténylegesen vállalható szolgáltatások (MI, CRM/webshop, HR?) | 3, 6, 8 | – |
| T4 | Az első beszélgetés: díjtalan? hossza? online / Debrecen? | 1, 9 | – |
| T5 | Árazási modell, kiinduló ár | 7, 8 | – |
| T6 | Bemutatható korábbi munka (engedéllyel) | 6 | – |
| T7 | E-mail, telefon, domain, válaszidő | 9, 11 | – |
| T8 | Cégforma, jogi adatok, hosting | 12 | – |
| T9 | Valódi fotók | 5 | – |

## 3. Napló

| Dátum | Esemény |
|---|---|
| 2026-10-09 | Audit, stratégiai javaslat, leltár, haladási tábla és skill elkészült. A weboldal fájljai nem változtak. Ellenőrzés: `typecheck` ✓, `build` ✓, `todos` = 47. |
