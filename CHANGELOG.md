# Változásnapló

## v2.0.0 – 2026-10-09 · arculat és weboldal újratervezése

- Teljes arculati csomag a kötött L-jelből: logó-lockupok (vízszintes, egymás alatti, jel, wordmark, app-ikon) 5 színváltozatban, SVG + PNG
- Favicon-készlet (ico 16/32/48, SVG sötét móddal, apple-touch 180, android 192/512, maskable, safari-pinned-tab, monokróm)
- 19 vonalikon (24 px rács), L-jel „hurok” mintázat, social képek (OG, LinkedIn borító, profilkép, e-mail aláírás)
- Névjegykártya és levélpapír PDF 3 mm kifutóval; 1 oldalas brand guide PDF
- Márkaplatform, hangnem, névhasználat, 8 szlogen, bemutatkozók; teljes szövegkönyv (JSON + MD)
- Design tokenek (JSON, CSS, Tailwind v4/v3), komponensleírás
- Next.js 16 weboldal: Főoldal, Megoldások, Rólunk, Kapcsolat, Adatkezelés, Impresszum, 404; SEO, Resend-űrlap, hozzájárulás-alapú analitika
- Mockupok 375/768/1440 px-en; Lighthouse ≥ 95 minden oldalon

## v1.0.0 – 2026-10-09 · első weboldal (archív)

- Next.js weboldal helykitöltő logóval és fotókkal, „loop” gyűrűs háttér, üveggombok
- Archiválva: `archive/v1-weboldal/`

## Repó – 2026-10-09

- Külön `loopient` repó: a v2 a gyökérben, a v1 archívumban, minden prompt és beszélgetés a `docs/` alatt
- CI: típusellenőrzés és build minden pushra
