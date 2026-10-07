# Crochet validation — source register (checked 2026-10-07)

Access status codes:
- **BLOCKED** = DIRECT ACCESS BLOCKED (egress proxy 403 on curl and WebFetch)
- **EXTRACT** = only a search-engine extract of the page was seen (title/URL/summary written by the search tool) — NOT equivalent to direct access
- **REFUSED** = search tool refuses the domain entirely

Tier: 1 = primary · 2 = reliable secondary · 3 = discovery only.

## Direct-access attempts (all failed)
| URL | Type | Tier | Status |
|---|---|---|---|
| https://www.amazon.de/s?k=häkelset+anfänger | Amazon.de search | 1 | BLOCKED (curl 000 / WebFetch EGRESS_BLOCKED) |
| https://trends.google.com/trends/explore?geo=DE&q=häkelset | Google Trends | 1 | BLOCKED |
| https://www.facebook.com/ads/library/ | Meta Ad Library | 1 | BLOCKED |
| https://ads.tiktok.com/business/creativecenter/ | TikTok Creative Center | 1 | BLOCKED |
| https://www.reddit.com/r/crochet/ | Reddit | 1 | BLOCKED; search tool also REFUSED reddit.com |
| https://www.etsy.com/de/search?q=amigurumi+set | Etsy | 1 | BLOCKED |
| https://www.pinterest.com/ | Pinterest | 1 | BLOCKED |
| https://www.alibaba.com/ | Supplier platform | 1 | BLOCKED |
| https://thewoobles.com/ · https://www.hobbii.de/ · willywolle.de | Competitor stores | 1 | BLOCKED (proxy log: 403 policy denial) |
| web.archive.org, archive.ph, r.jina.ai, bing.com, duckduckgo.com, keepa.com, junglescout.com | Mirrors / tools | — | BLOCKED |
| api.github.com, pypi.org, registry.npmjs.org | — | — | reachable (irrelevant to research) |

## Evidence used (all EXTRACT unless stated)
| # | URL | Type | Tier | Evidence (as extracted) |
|---|---|---|---|---|
| 1 | https://www.amazon.de/Woobles-Anf%C3%A4nger-H%C3%A4kelset-All-One-Starterpaket/dp/B08YS42GPG | Amazon.de product | 1 (EXTRACT) | Woobles Pierre the Penguin listed on Amazon.de; 4.5★, 6,363 ratings (likely pooled across marketplaces — unverified); price €15.77 (unverified, may be a 3rd-party offer) |
| 2 | https://amazon.de/Woobles-H%C3%A4kelset-Anf%C3%A4nger-Peasy-Schritt-f%C3%BCr-Schritt-Video-Tutorials/dp/B0CVCBF2M5 | Amazon.de product | 1 (EXTRACT) | Woobles 4-piece kit: BSR #1,486 in Häkelsets, #2,282,808 Home & Kitchen; price €196.58 (implausible, likely 3rd-party) |
| 3 | https://www.amazon.de/Woobles-H%C3%A4kelset-Anf%C3%A4nger-Peasy-Schritt-f%C3%BCr-Schritt-Video-Tutorials/dp/B0DMBXK6DB | Amazon.de product | 1 (EXTRACT) | German-language Woobles listing; pre-started pieces, Easy Peasy yarn, L/R-handed videos, unlimited help (email, SMS, virtual hours) |
| 4 | https://www.amazon.de/gp/bestsellers/kitchen/2993046031 (+ product pages) | Amazon.de bestsellers | 1 (EXTRACT) | Coopay 58-pc #1 (4.4★, 257 rev., from €18.79); Coopay 73-pc #6 (4.4★, 651, €25.99); Alutaba 6-pc (4.4★, 125, from €19.99); Aeeque €20.99; TranquilHome rank #21 |
| 5 | https://www.amazon.de/TranquilHome-Schritt-F%C3%BCr-Schritt-Video-Erkl%C3%A4run-Amigurumi-Anf%C3%A4nger-Drei-Geh%C3%A4kelte/dp/B0FG6QQB8C | Amazon.de product | 1 (EXTRACT) | €23.78 (RRP €27.98); 4.2★, 368 ratings; "suitable for beginners, easy to follow" |
| 6 | https://www.amazon.de/Craft-H%C3%A4kelsets-Anf%C3%A4nger-Amigurumi-Set-Starter-H%C3%A4kelpaket/dp/B0BXB5RKT5 | Amazon.de product | 1 (EXTRACT) | Craft ID 3.7★, 98 ratings; review: instructions partly incomprehensible, errors, not for absolute beginners |
| 7 | https://www.amazon.de/Zummipals-H%C3%A4kelset-H%C3%A4kelnadel-Amigurumi-Schritt-f%C3%BCr-Schritt-Erkl%C3%A4rvideo/dp/B0GVNJK4BR | Amazon.de product | 1 (EXTRACT) | 4.8★, 41 ratings; slow-motion videos praised |
| 8 | https://www.amazon.de/MEIVINES-H%C3%A4kelset-Anf%C3%A4nger-Tutorials-Erwachsene/dp/B0FYP1VZ72 | Amazon.de product | 1 (EXTRACT) | 3.2★, 8 ratings |
| 9 | https://www.amazon.de/SusggO-81-teiliges-komplettes-H%C3%A4kelset-Amigurumi-H%C3%A4kelset/dp/B0CG9NLK7B | Amazon.de product | 1 (EXTRACT) | 4.4★, 33 ratings |
| 10 | https://www.amazon.de/Die-Bobbels-kinderleichtem-Schritt-f%C3%BCr-Schritt-Videoanleitung/dp/B0CR7V2DX2 | Amazon.de product | 1 (EXTRACT) | Die Bobbels €22.99; 3.8★, 73 ratings; mixed views on difficulty for beginners |
| 11 | https://www.amazon.de/Mewaii-H%C3%A4kelset-f%C3%BCr-Anf%C3%A4nger-Schritt-f%C3%BCr-Schritt-Videoanleitung/dp/B0DFR1D77Q | Amazon.de product | 1 (EXTRACT) | "über 40% vorgestartetem Bandgarn" — pre-started yarn copied by Chinese sellers |
| 12 | https://www.amazon.de/-/en/Crochet-Beginners-Starter-Animals-Childrens/dp/B0DHL9VQBH | Amazon.de product | 1 (EXTRACT) | "Starter Set with Video Course in German" — German video is not exclusive |
| 13 | https://www.amazon.de/TOPP-Pippi-Langstrumpf-Geburtstag-Sicherheitsaugen/dp/B0DQDK8ZYD | Amazon.de product | 1 (EXTRACT) | TOPP (frechverlag) licensed Pippi Langstrumpf Häkelset |
| 14 | https://www.diebobbels.de/ (+ /collections/alle-amigurumi-sets, /collections/garn, /products/*) | Competitor store (Shopify-style URLs) | 1 (EXTRACT) | €19.95–26.95 (many −20%); OEKO-TEX "Easy Peasy Bobbels Garn"; video + PDF; storage box "ideal als Geschenk"; gift voucher; DHL 1–3 days; Haasenglück GbR; product reviews 40–62 per kit |
| 15 | https://www.ebay.de/itm/186293225449 | eBay.de listing | 1 (EXTRACT) | Die Bobbels seller: 985 ratings, 99.1% positive |
| 16 | https://willywolle.com/products/piet-der-pinguin · /products/piet-der-pinguin-geschenke-box | Competitor store | 1 (EXTRACT) | Kit 34.00, gift box 40.00 (currency shown as $ in extract — likely €; unverified); WhatsApp/email/phone help; "Erfahrungen" page |
| 17 | https://www.instagram.com/willy.wolle/ · https://www.tiktok.com/@willywolle | Social profiles | 1 (EXTRACT) | 1,098 IG followers; 386 TikTok followers (at extract time) |
| 18 | https://www.figuredart.de/collections/amigurumi-hakeln | Competitor store (FR brand, DE site) | 1 (EXTRACT) | Amigurumi Häkelsets €21.90–30.90, QR video, beginner positioning |
| 19 | https://lieblingsgarn.de/collections/amigurumis | Yarn retailer | 1 (EXTRACT) | Amigurumi kits; free shipping from €39; 100-day returns |
| 20 | https://www.kunstpark-shop.de/diy-haekelset-fuchs-amigurumi-kit.html · https://www.sameko-design.de/page/diy-haekelset-12392 | Small DE shops | 1 (EXTRACT) | Further DE amigurumi kit sellers |
| 21 | https://www.desired.de/shopping-tipps/haekeln-lernen-fuer-nur-19-euro-... | Consumer press | 3 | "Häkeln lernen für nur 19 Euro" — consumer price anchor |
| 22 | https://nz.trustpilot.com/review/thewoobles.com | Review platform | 1 (EXTRACT) | Woobles TrustScore 2.5/5 (90 reviews): shipping delays, support, tangled yarn, unclear videos; some positive |
| 23 | https://www.wsoctv.com/news/local/mark-cuban-confirms-shark-tank-deal-with-north-carolina-startup-didnt-close/FRXVII32SNCA5LDZC4QBA5VVT4/ | News | 2 | Shark Tank S14: $450k for 6% ($7.5M valuation) verbal deal; did not close |
| 24 | https://en.wikipedia.org/wiki/The_Woobles | Encyclopedia | 2 (EXTRACT) | Founded 2020 (Justine Tiu, Adrian Zhang); pre-started kits with video |
| 25 | https://gripsintelligence.com/insights/retailers/thewoobles.com | Third-party estimate | 3 | CR 6.0–6.5%, AOV $50–75 — ESTIMATE, not fact |
| 26 | https://fashionunited.es/noticias/empresas/we-are-knitters-entra-en-liquidacion-tras-la-resolucion-de-su-concurso-de-acreedores/2025101647352 · https://finder.techleap.nl/news/feed/we-are-knitters-sold-for-914k · https://marketing4ecommerce.net/adios-a-we-are-knitters/ | Trade press | 2 | WAK: €14.9M peak revenue, €1.61M profit (pandemic); €1.65M accumulated losses; concurso May 2025; unit sold for €914k; liquidation Oct 2025; causes cited: post-pandemic normalisation, logistics and raw-material costs |
| 27 | https://open.endole.co.uk/insight/company/08332008-wool-and-the-gang-ltd · https://pomanda.com/company/08332008/wool-and-the-gang-ltd | Companies-House aggregators | 2 (EXTRACT) | Wool and the Gang: turnover down ~39% in 2024; operating loss ~£145k (2024) vs profit ~£394k (2023). Turnover figures inconsistent between extracts (£1.67M vs £2.64M) |
| 28 | https://mads.de/crochet-tok-woher-kommt-der-hype-ums-haekeln/ | Youth media | 3 | #crochet 20.6B TikTok views; mindfulness / phone-free motive |
| 29 | https://www.rankhero.com/keywords/amigurumi-häkeln · https://explodingtopics.com/topic/amigurumi | Keyword tools | 3 | "amigurumi häkeln" 8,100 monthly (global); ET "amigurumi" 368K, +257% (global) — unverified for DE |
| 30 | https://ads.tiktok.com/business/en-US/inspiration/the-woobles-reduces-costs-per-acquisition | TikTok case study | 2 (EXTRACT) | Woobles −18% CPA, −25% CPM with Spark Ads (US) |
| 31 | https://www.alibaba.com/wholesale/crochet-kit-complete-set.html (+ made-in-china, globalsources) | Supplier listings | 1 (EXTRACT) | Kit listings: $6.80/set MOQ 50 custom logo; $3.59 MOQ 10; $2.92–3.01; $5.50–6.20 MOQ 5; $0.85–0.95 MOQ 2,000 — **PRICE UNVERIFIED** (no quote) |
| 32 | https://wolle1000.de/alize-yarns/alize-velluto · https://www.wolle1000.de/farbe-80309-rosa-himalaya-dolphin-baby-100g | EU yarn retailer | 1 (EXTRACT) | Alize Velluto / Himalaya Dolphin Baby 100 g €2.50–2.75 retail (€25–27.50/kg) |
| 33 | https://schaumstoffonline.de/products/fuellwatte-1kilo · https://www.vergleich.org/fuellwatte/ | Retail | 1/3 | Füllwatte ~€10–12.29/kg |
| 34 | https://www.ebay.de/itm/186675097731 | Retail | 1 (EXTRACT) | Safety eyes 6 mm, 100 pcs ≈ €9.40 |
| 35 | https://kkverpackungen.de/250-x-150-x-150-mm-einwellige-faltschachteln | Packaging retailer | 1 (EXTRACT) | Plain folding boxes €0.33–0.34/pc at 500 |
| 36 | https://kartonplus.de/dhl-kleinpaket · https://ohn.haendlerbund.de/logistik/paketdienste/preiserhoehung-dhl-geschaeftskunden-2026 | Logistics guides | 2 | DHL Kleinpaket (≤1 kg, DE): business ~€3.20–3.50 (<1,000/yr), entry from €3.29; 2026 increases 20–25% |
| 37 | https://group.dhl.com/content/dam/deutschepostdhl/en/media-center/media-relations/documents/2025/paketpreise-international-preisuebersicht-01072025.pdf | DHL official | 1 (EXTRACT) | Päckchen to EU from €6.49–6.99 (private) — Austria shipping ≈ 2× DE |
| 38 | https://www.t-online.de/leben/aktuelles/id_100586036/stricken-und-haekeln-trendet-auf-social-media-das-ist-der-grund.html | Press citing Initiative Handarbeit | 2 | 85% of DE women do handicrafts (76% in 2021); 18–29 largest group; yarn €370M |
| 39 | https://www.etsy.com/listing/1819701232/diy-crochet-kit-forest-friends-beginners · https://www.etsy.com/listing/1040203203/crochet-kit-lalylala-ulysses-butterfly | Etsy listings | 1 (EXTRACT) | Hoooked kits with German patterns; lalylala kits ship from Germany; review counts not captured |
