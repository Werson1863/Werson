# Archívum

## v1-weboldal

Az első Loopient weboldal-változat, változatlanul, referenciának.

- **Munkamenet:** „Loopient weboldal tervezés”, 2026-10-08 23:13 – 2026-10-09 00:07 (UTC)
- **Eredeti hely:** `Werson1863/Werson` repó, `claude/loopient-website` ág (utolsó commit `2743c33`)
- **Prompt és beszélgetés:** [`docs/prompts/2026-10-08_v1-01_…`](../docs/prompts/) · [`docs/conversations/2026-10-08_v1_weboldal-tervezes.md`](../docs/conversations/2026-10-08_v1_weboldal-tervezes.md)
- **Ami benne van:** Next.js 16 + Tailwind, `src/` alatti tartalom TypeScript-fájlokban, „loop” gyűrűs CSS/SVG háttér, üveghatású gombok, statikus export lehetőség (`npm run build:static`), saját TODO-lista (`TODO.md`).
- **Fontos:** az `assets/logo/` és `assets/photos/` fájljai **helykitöltők** (a fájlokban jelölve), nem a valódi logó és nem valódi fotók.
- **Miért archív:** a v2 (repó gyökere) a kötött L-jeles logóval, teljes arculati csomaggal, külön szövegkönyvvel (`content/copy.json`) és design tokenekkel váltotta. Ötletek, amelyek a v1-ből még átvehetők: statikus export mód, FAQPage schema, köszönőoldal (`/kapcsolat/koszonjuk`), a „loop” gyűrűs hero-animáció.

Futtatás (ha meg akarod nézni): `cd archive/v1-weboldal && npm install && npm run dev`.
