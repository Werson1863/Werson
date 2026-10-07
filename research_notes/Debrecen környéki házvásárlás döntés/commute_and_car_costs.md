# Car commuting into Debrecen from surrounding settlements, and the real cost of commuting by car (as of October 2026)

**Read this first: how the data was gathered and what limits it**
- Every routing and geocoding service was blocked by this environment's network egress policy: router.project-osrm.org, routing.openstreetmap.de, valhalla1.openstreetmap.de, graphhopper.com, nominatim.openstreetmap.org and photon.komoot.io all returned HTTP 403 or "EGRESS_BLOCKED". **No distance or time below comes from a router.** WebFetch was blocked for every page tried (mavcsoport.hu, telex.hu, adozona.hu, autonavigator.hu), so the cited facts come from search-result snippets. Partway through, the shared web-search budget for the session ran out (limit of 200 calls). Some planned checks never ran: a verified list of large employers with addresses, a current pump-price check after 7 Sept 2026, and an explicit confirmation of the 18 Ft/km commuting rate.
- **The settlement distance and time table is therefore an ESTIMATE** built from road-network knowledge (road numbers and settlement positions, road distance, not straight-line). Assume ±10–15% error, and more than that for the BMW column. Before relying on any row, check it in Google Maps or utvonalterv.hu with "depart at 07:00 on a weekday".
- Labels used: **VERIFIED** (stated in a cited source found this session), **LIKELY** (consistent with sources or strong background knowledge, not directly confirmed this session), **ESTIMATE** (computed or approximated, method stated), **UNKNOWN**.

---

## 1. Where are the employment centres, and how are they reached?

### Takeaway
**The BMW Group Plant Debrecen is in the north-west, not the south.** It sits in the Északnyugati (Észak-Nyugati) Gazdasági Övezet, between the M35 and main road 33, and is reached through the rebuilt M35 Debrecen-Józsa junction and road 354. The southern cluster, the Déli Gazdasági Övezet (CATL, SemCorp, EcoPro) next to the airport and road 47 near Mikepércs and Sáránd, is a separate hub. The two hubs are on opposite sides of the city, so a home that suits one is poorly placed for the other.

### Cited Findings
- VERIFIED: the BMW Debrecen plant is in the Northwestern Economic Zone. The zone is bordered by the M35 motorway and main road 33, lies a few km from Debrecen, and covers 620 ha, of which the BMW Group investment area is 400 ha. — [DIF Debrecen – Észak-Nyugati Gazdasági Övezet](https://dif2.fmfejlesztes.hu/en/northwestern-economic-zone/) (via search snippet)
- VERIFIED: an M35 junction for road 354 was opened temporarily at the end of December to give the BMW plant its motorway link. The full cloverleaf junction opened in January 2022. The Debrecen-Józsa interchange at M35 km 33+200 was rebuilt from a trumpet into a cloverleaf, with work starting in February 2021. — [magyarepitok.hu](https://magyarepitok.hu/utepites/2020/07/elrajtolt-a-debreceni-bmw-gyar-autopalyacsomopontjanak-a-kozbeszerzese); [dehir.hu – M35 csomópont](https://www.dehir.hu/debrecen/ilyen-lesz-az-uj-es-az-atepitett-csomopont-az-m35-os-autopalya-debreceni-szakaszan/2021/02/08/); [origo.hu](https://origo.hu/gazdasag/20210201-debreceni-bmw-gyar-uj-csomopont.html)
- VERIFIED: road 354 was rebuilt to improve access to Józsa and the North-West Economic Zone. — [dehir.hu 2020-07-30](https://dehir.hu/debrecen/atepitik-a-354-es-fout-tengelyet-konnyebb-lesz-elerni-jozsat-es-az-eszak-nyugati-gazdasagi-ovezetet/2020/07/30/)
- VERIFIED: four-lane roads with three-lane roundabouts surround the BMW site. Raw-material supply traffic goes through the northern Józsa exit, while finished cars leave mostly by rail. Road 354 is being extended to the factory gate and road 33 is being widened to four lanes. A logistics centre for 250 trucks is planned in the NW zone so that trucks no longer cross the city. This comes from a 2022 article, so the build status in 2026 is LIKELY rather than verified. — [telex.hu 2022-10-27](https://telex.hu/g7/2022/10/27/fogytan-az-iparterulet-debrecenben-hova-mennek-a-bmw-beszallitok) (via search snippet)
- VERIFIED: CATL's Debrecen plant, its second European site, covers a planned 221 ha with 100 GWh/yr capacity in the Debrecen Southern Economic Zone (Déli Gazdasági Övezet). The zone is bordered by the Debrecen International Airport to the north, main road 47 to the east, main road 481 (the southern bypass) to the south and the Tócó stream to the west. The Debrecen–Sáránd–Nagykereki railway runs along its western edge. Three battery plants are being built in the zone: CATL, SemCorp (separator film) and EcoPro (cathode). — search snippets from [debreciner.hu](https://debreciner.hu/cikk/12320_debrecen_es_kornyeke_is_celpontja_az_nagyhatalmi), [CATL environmental report, debrecen.hu](https://www.debrecen.hu/assets/media/file/hu/50614/03_catl_ippc_2mod_24_0617_anonim.pdf), [atlatszo.hu](https://atlatszo.hu/kornyezet/2023/01/03/debrecen-es-kornyeke-is-celpontja-az-akkumulatorgyarto-nagyhatalmi-torekveseknek/)
- VERIFIED: a new "Nyugati határút" (western boundary road) is being built in the Déli Gazdasági Övezet. Phase 1 links the 481 southern bypass to the industrial area near the Inpark building. Once both phases are finished, plants in the zone will be reachable directly from the 481, taking traffic off road 47. — [dehir.hu 2025-03-12](https://dehir.hu/debrecen/uj-utat-epitenek-a-deli-gazdasagi-ovezetben-igy-csokkenhet-a-forgalom-a-47-esen/2025/03/12/)
- VERIFIED: a 2023 article reported a workers' hostel being built near the CATL battery plant at Mikepércs. — [telex.hu 2023-09-29](https://telex.hu/belfold/2023/09/29/debrecen-mikepercs-akkumulatorgyar-munkasszallo-vendegmunkas-polgarmester-catl)

**Hub list with approximate coordinates (all coordinates ESTIMATE, from map knowledge, ±1 km)**

| # | Hub | Approx. location / access | Status of the location |
|---|---|---|---|
| 1 | Belváros, Kossuth tér | ~47.531 N, 21.627 E | LIKELY |
| 2 | **BMW Group Plant Debrecen (ÉNy-i Gazdasági Övezet)** | NW edge of the city, between the M35 and road 33, ~8–10 km NW of the centre (≈47.59 N, 21.54 E). Access from M35 exit "Debrecen-Józsa" / road 354, or from road 33 | Zone: VERIFIED; coordinates: ESTIMATE |
| 3 | Debrecen International Airport (Mikepércsi út) | ~5–6 km S of centre (≈47.489 N, 21.615 E) | LIKELY |
| 4 | Déli Gazdasági Övezet (CATL, SemCorp, EcoPro) | S of the airport, W of road 47, N of the 481 bypass, ≈10–12 km S of centre, on the Mikepércs boundary | Boundaries: VERIFIED |
| 5 | Mikepércsi út / southern industrial area (older plants such as National Instruments, Krones, Continental) | Along Mikepércsi út (road 47 city section) and Határ út, S/SW of centre | Company list and positions: UNKNOWN (not verified, search budget ran out) |
| 6 | Western industrial area / Határ út / Kishegyesi út (e.g. FAG/Schaeffler) | W/SW of the city, near road 4 (Budai út / Debrecen-nyugat) | UNKNOWN (not verified) |
| 7 | North: Nagyerdő (University of Debrecen and Clinical Centre, Nagyerdei krt.), Pallagi út (Teva) | N of centre, ~2–4 km | LIKELY from background knowledge, not verified this session |
| 8 | Böszörményi út companies / Józsa side | NW radial road toward road 35 | UNKNOWN |

The brief listed BD, Jabil, IT Services Hungary, BT, Diehl, Richter and Hörmann. None of these could be verified this session, so they are recorded as UNKNOWN (see Gaps).

### Inferences
- Commuters to BMW should prefer settlements to the N, NW and W: Hajdúböszörmény, Balmazújváros, Hajdúdorog and Hajdúnánás via the M35, or Hajdúsámson, Bocskaikert and Hajdúhadház via the northern city edge. Southern and eastern settlements (Mikepércs, Sáránd, Hosszúpályi, Derecske, Berettyóújfalu) have to cross the city or loop round on the M35. That loop is probably 25–60 km, depending on where the settlement is.
- Mikepércs, Sáránd, Hajdúbagos, Derecske, Hosszúpályi, Ebes and Hajdúszovát are best placed for CATL, the Déli Gazdasági Övezet and the airport. Once the Nyugati határút is finished, the 481 + M35 corridor serves the zone without road 47.

### Gaps
- No verified street addresses or coordinates for most hub companies: National Instruments, Continental, Krones, FAG/Schaeffler, Teva, Richter, IT Services Hungary, BT, Diehl, BD and Jabil. Whether BD, Jabil, Diehl or Hörmann even have Debrecen sites was not confirmed. Search budget exhausted.
- Exact BMW gate coordinates and whether road 33 is now four lanes in 2026: UNKNOWN.

---

## 2. Distance and drive time from each settlement to the city centre, BMW and the southern zone

### Takeaway
Every row is an ESTIMATE, because no router could be reached; see the method notes. Most settlements are 11–35 km and 15–40 min off-peak from Kossuth tér. The far ring (Hajdúnánás, Nádudvar, Püspökladány, Berettyóújfalu, Pocsaj, Kismarja) is 38–48 km and 35–50 min. For BMW, north-west settlements are 15–35 km. Southern and eastern ones are typically 25–55 km, because they must cross the city or loop round on the M35.

### Cited Findings
- VERIFIED: Hajdúszoboszló is about 20 km from Debrecen. Hajdúböszörmény can be reached by car on the M35 or on road 35, and is 17.2 km away by rail. — search snippets for [virail](https://www.virail.it/treni-hajduszoboszlo-debrecen) and [rome2rio](https://www.rome2rio.com/s/Hajd%C3%BAszov%C3%A1t/Debrecen)
- No other settlement-level road distances could be sourced this session. Routing APIs and WebFetch were blocked and the search budget ran out.

**Method for the ESTIMATE table**
- Route choice: the main road used from each settlement, from knowledge of the Hungarian national road network.
- Distances run along those roads, from the settlement centre to Kossuth tér, to the BMW site (NW zone, via M35/354 or road 33) and to the Déli Gazdasági Övezet (CATL gate area, via road 47 or 481).
- Off-peak times assume 70–80 km/h average on main roads outside towns and 25–35 km/h for the last 3–5 km inside Debrecen.
- Peak times add a city-entry congestion penalty, explained in section 3: **morning (06:45–08:00) +20–35% on city-centre trips and +10–20% on BMW/southern-zone trips that use the M35 or 481; afternoon (15:00–17:00) +15–25% / +10–15%**. TomTom publishes no Debrecen figure (see section 3), so these percentages are an assumption, not a measurement.

| Settlement | Main route to centre | → Centre km / off-peak min | → Centre AM-peak min | → Centre PM-peak min | → BMW (NW) km / off-peak min (route) | → Déli GÖ / CATL km / min |
|---|---|---|---|---|---|---|
| Mikepércs | 47 | 11 / 15 | 19–21 | 18–19 | 25–28 / 25 (481 → M35 N → Józsa) | 4–6 / 7 |
| Ebes | 4 | 14 / 16 | 20–22 | 19–20 | 22–25 / 20 (4 → M35 N) | 14–16 / 16 (4 → M35 → 481) |
| Hajdúsámson | 471 | 14 / 18 | 22–24 | 21–22 | 18–22 / 22 (via N city edge / Józsa) | 20–23 / 28 |
| Bocskaikert | 4 | 14 / 16 | 20–22 | 19–20 | 17–20 / 20 (4 → Józsa → 354) | 22–25 / 28 |
| Sáránd | 47 | 18 / 20 | 25–27 | 23–25 | 30–33 / 28 (47/481 → M35 N) | 7–9 / 10 |
| Hajdúhadház | 4 | 18 / 19 | 24–26 | 22–24 | 21–24 / 23 | 26–29 / 30 |
| Hajdúbagos | 47 (via Sáránd) | 20 / 23 | 28–31 | 26–28 | 32–36 / 32 | 9–12 / 13 |
| Hajdúböszörmény | 35 or M35 | 20–21 / 22 | 27–30 | 25–27 | **15–19 / 15** (M35 S → Józsa) | 30–33 / 28 (M35 → 481) |
| Vámospércs | 48 | 21 / 21 | 26–28 | 24–26 | 32–36 / 38 (cross city or 481 → M35) | 22–25 / 28 |
| Hosszúpályi | 4808 → 47 (via Mikepércs) | 22 / 24 | 30–32 | 28–30 | 34–38 / 35 | 14–17 / 18 |
| Hajdúszoboszló | 4 (or M35) | 21–23 / 22 | 27–30 | 25–28 | 26–30 / 22 (4 → M35 N) | 20–24 / 20 |
| Téglás | 4 | 22 / 22 | 27–30 | 25–28 | 25–28 / 26 | 30–33 / 33 |
| Derecske | 47 (or M35) | 23–25 / 25 | 31–34 | 29–31 | 34–38 / 30 (M35 N) | 13–16 / 16 |
| Nyírmártonfalva | 471 via Hajdúsámson | 22–24 / 26 | 32–35 | 30–32 | 27–31 / 30 | 30–34 / 36 |
| Monostorpályi | via Hosszúpályi / 47 | 24–26 / 27 | 33–36 | 31–34 | 36–40 / 38 | 17–20 / 21 |
| Hajdúszovát | 4810 → 4 (or → 47) | 24–26 / 27 | 33–36 | 31–34 | 30–34 / 30 | 18–22 / 23 |
| Balmazújváros | 33 | 25–27 / 27 | 32–35 | 30–33 | **18–21 / 18** (33 straight to NW zone) | 32–36 / 33 (33 → M35 → 481) |
| Nyíradony | 471 via Hajdúsámson | 26 / 27 | 33–36 | 31–34 | 30–34 / 32 | 34–38 / 38 |
| Nagyhegyes | 3315/33 or via Ebes/4 | 26–28 / 28 | 34–37 | 32–35 | 22–26 / 23 (33 to NW zone) | 26–30 / 27 |
| Konyár | 47 / Derecske | 29–31 / 31 | 38–41 | 36–38 | 40–44 / 37 | 20–23 / 23 |
| Tépe | via Derecske, 47 | 29–31 / 31 | 38–41 | 36–38 | 40–44 / 36 | 20–23 / 23 |
| Létavértes | 4808 via Hosszúpályi | 30 / 32 | 39–42 | 37–40 | 42–46 / 42 | 22–26 / 26 |
| Nyírábrány | 48 | 30–31 / 30 | 36–40 | 35–38 | 42–46 / 45 | 32–35 / 37 |
| Újfehértó | 4 | 31–33 / 30 | 36–40 | 35–38 | 34–37 / 33 | 40–43 / 40 |
| Bagamér | 48 → 4807 via Vámospércs | 31–33 / 33 | 40–44 | 38–41 | 42–46 / 45 | 30–34 / 35 |
| Álmosd | via Hosszúpályi | 32–34 / 35 | 42–46 | 40–43 | 44–48 / 45 | 24–28 / 29 |
| Hajdúdorog | 35 via Hajdúböszörmény (or M35) | 32–34 / 33 | 40–44 | 38–41 | **27–30 / 25** (M35) | 42–45 / 38 |
| Esztár | 47 → Derecske–Konyár | 37–40 / 38 | 46–50 | 44–47 | 46–50 / 42 | 28–31 / 31 |
| Pocsaj | 47 / Konyár or Létavértes | 38–41 / 40 | 48–53 | 46–50 | 48–52 / 45 | 29–33 / 33 |
| Kaba | 4 | 35–37 / 33 | 40–44 | 38–41 | 38–42 / 32 (4 → M35) | 33–36 / 31 |
| Berettyóújfalu | M35 (or 47) | 38–42 / 35–40 | 44–50 | 42–47 | 48–55 / 38 (M35 all the way) | 30–34 / 26 (M35 → 481) |
| Nádudvar | 3405 → 4 via Hajdúszoboszló | 38–41 / 40 | 47–52 | 45–49 | 40–44 / 38 | 36–40 / 37 |
| Hajdúnánás | 35/M35 via Hajdúdorog | 40–42 / 38 | 46–51 | 44–48 | **33–37 / 30** (M35) | 48–52 / 43 |
| Kismarja | via Pocsaj / Létavértes | 42–45 / 45 | 54–60 | 52–56 | 52–56 / 50 | 34–38 / 38 |
| Püspökladány | 4 | 46–48 / 42 | 50–56 | 48–53 | 50–54 / 42 (4 → M35) | 46–50 / 42 |

Notes on the table:
- **Airport hub (#3):** take the CATL/Déli GÖ figure minus about 3–5 km for southern settlements, or the centre figure minus about 0–2 km for northern ones. ESTIMATE.
- **Western hub (#6: Határ út, Kishegyesi út, Budai út side):** settlements on road 4 West (Ebes, Hajdúszoboszló, Kaba, Püspökladány, Nádudvar, Nagyhegyes) save about 3–5 km against the centre figure. Eastern and northern settlements add about 3–6 km. ESTIMATE.
- **Northern hub (#7: Nagyerdő / university clinics):** for settlements on road 4 North (Bocskaikert, Hajdúhadház, Téglás, Újfehértó) and 471 (Hajdúsámson, Nyíradony), take the centre figure minus about 2–3 km. Southern settlements add 2–3 km and pass through the Nagyerdei körút / Kassai út corridor. ESTIMATE.

### Inferences
- Within about 25 minutes off-peak of BMW: Hajdúböszörmény, Balmazújváros, Bocskaikert, Hajdúsámson, Hajdúhadház, Nagyhegyes, Ebes, Hajdúszoboszló and Hajdúdorog. Mikepércs, Sáránd and Derecske are close to the city but, at roughly 25–35 min, sit on the "wrong side" for BMW.
- Within about 20 minutes of the CATL/southern zone: Mikepércs, Sáránd, Hajdúbagos, Hosszúpályi, Derecske, Ebes and Hajdúszoboszló.

### Gaps
- None of the distances or times are router-verified. Each needs a Google Maps or utvonalterv.hu check, ideally the "typical traffic" estimate for a Tuesday at 07:00 and 16:00. Error is likely ±10–15%, with the largest errors for the BMW column and the small south-eastern villages (Esztár, Kismarja, Pocsaj, Tépe, Bagamér).
- Which M35 sections around Debrecen need a toll (megyei matrica, the county vignette) or are free: UNKNOWN. This matters for the BMW loop routes.

---

## 3. Peak-hour congestion and known bottlenecks in Debrecen

### Takeaway
No published congestion index for Debrecen was found; TomTom's index does not appear to list the city. The bottlenecks below come from local news: road 47 (Mikepércs roundabout, morning peak), Kassai út (road 4 inside the city, frequent accidents) and Nagyerdei körút (works). Shift changes at BMW and CATL, and buses retimed to them, add new peaks around the industrial zones.

### Cited Findings
- VERIFIED: traffic regularly backs up at the Mikepércs roundabout in the morning peak, and traffic on road 47 is heavy. A new road in the Déli Gazdasági Övezet is meant to relieve the 47. — [dehir.hu 2025-03-12](https://dehir.hu/debrecen/uj-utat-epitenek-a-deli-gazdasagi-ovezetben-igy-csokkenhet-a-forgalom-a-47-esen/2025/03/12/)
- VERIFIED: on 29–30 August 2026 a crash at km 8 of road 47 between Debrecen and Mikepércs closed the road completely, with several people injured. Bus lines 4420 and 4430 had to detour. An earlier crash in May 2024 caused a "gigadugó" (huge jam) on the same stretch. Road 47 has no parallel alternative until the Nyugati határút is finished. — [haon.hu 2026-08](https://www.haon.hu/helyi-kozelet/2026/08/baleset-teljes-utzar-debrecen-mikepercs); [dehir.hu 2026-08-29](https://dehir.hu/eletmod/egymasnak-utkozott-ket-auto-a-47-es-fouton-az-egyik-kocsi-felborult/2026/08/29/); [dehir.hu 2024-05-23](https://www.dehir.hu/bulvar/baleset-okoz-gigadugot-a-47-esen-debrecen-es-mikepercs-kozott/2024/05/23/); [police.hu](https://www.police.hu/hu/hirek-es-informaciok/utinfo/baleseti-hirek/megszunt-az-utlezaras-mikepercs-tersegeben)
- VERIFIED: road 4 runs through the city as Kassai út. A crash at the Kemény Zsigmond utca junction (road 4, km 228) caused lane closures. A separate incident on Acsádi út delayed buses by 15–20 minutes. Temporary restrictions on Nagyerdei körút between Martinovics utca and Hadházi út were reported in 2023. — [debrecen4u.hu](https://debrecen4u.hu/?p=257331), [debrecen4u.hu](https://debrecen4u.hu/?p=251840) (via search snippets)
- VERIFIED: TomTom's Traffic Index covers 500+ cities and measures congestion as the percentage increase in travel time over free flow. No Debrecen figure turned up in search, so a measured value for the city is UNKNOWN. — [TomTom Area Analytics FAQ](https://developer.tomtom.com/area-analytics/documentation/product-information/faq)
- VERIFIED: from 24 August 2026 MÁV-Volán started several new bus routes in the Debrecen area and retimed others to BMW's new shift pattern. Some morning and afternoon BMW buses on the Álmosd–Hosszúpályi–Mikepércs–Debrecen route now also run at weekends, and new Debrecen–Álmosd buses match the shift changes. — [MÁV-csoport press release](https://www.mavcsoport.hu/mav-csoport/bovul-debreceni-terseg-autobuszos-kozlekedese-bmw-gyar-uj-muszakrendjehez-igazodva) (via search snippet)

### Inferences
- ESTIMATE of peak windows: morning 06:30–08:00, with factory shift traffic around 05:30–06:00 and 13:30–14:30 near BMW and CATL; afternoon 15:00–17:00. Expect a congestion penalty of +20–35% on city-entry segments (Kassai út, Budai út / road 4 West, Mikepércsi út / road 47, Böszörményi út, Nagyerdei körút) and +10–20% for trips mostly on the M35 or 481. The basis is typical values for mid-size European cities, not Debrecen measurements.
- Commuters from the M35 corridor (Hajdúböszörmény, Hajdúdorog, Hajdúnánás) to BMW avoid the city bottlenecks altogether. Their peak penalty is probably the smallest of any group.
- Southern commuters (Mikepércs, Sáránd, Hosszúpályi) depend on road 47, which has a recurring Mikepércs roundabout queue and full closures after crashes. Treat that as a reliability risk.

### Gaps
- No measured peak travel times (no TomTom or Google typical-traffic data could be reached).
- Status in October 2026 of the Nyugati határút phases and of the road 33 four-lane widening: UNKNOWN.
- No sources were found on any "Déli elkerülő" extension or a full Debrecen ring road beyond the existing 481 bypass and M35.

---

## 4. Public transport alternatives

### Takeaway
Rail is competitive only on main line 100 (Hajdúszoboszló, Kaba, Püspökladány to the west; Hajdúhadház, Téglás, Újfehértó to the north) and partly on line 109 (Hajdúdorog, Hajdúnánás). The branch lines 105 (Nyírábrány) and 106 (Sáránd–Nagykereki) are slow, at 40–60 km/h. Volánbusz (MÁV-Volán) covers every settlement, and since August 2026 it has added BMW shift buses.

### Cited Findings
- VERIFIED: lines 105, 106, 108, 109 and 110 leave Debrecen's main station. Line 105 Debrecen–Nyírábrány is 31 km, single-track, non-electrified, 40–60–80 km/h, with passenger trains every 2 hours. Line 106 Debrecen–(Sáránd)–Nagykereki is 53 km, single-track, non-electrified, max 60 km/h. Line 109 Debrecen–Tiszalök is 64 km, max 60 km/h, and serves Hajdúdorog and Hajdúnánás. — [hu.wikipedia: Debrecen–Nyírábrány](https://hu.wikipedia.org/wiki/Debrecen%E2%80%93Ny%C3%ADr%C3%A1br%C3%A1ny-vas%C3%BAtvonal); [hu.wikipedia: Debrecen–Nagykereki](https://hu.wikipedia.org/wiki/Debrecen%E2%80%93Nagykereki-vas%C3%BAtvonal); [hu.wikipedia: Debrecen–Tiszalök](https://hu.wikipedia.org/wiki/Debrecen%E2%80%93Tiszal%C3%B6k-vas%C3%BAtvonal) (via search snippets)
- VERIFIED: the MÁV line 100 timetable covers [Budapest–]Szolnok–Debrecen–Nyíregyháza(–Záhony) and serves Püspökladány, Kaba, Hajdúszoboszló, Hajdúhadház, Téglás and Újfehértó. — [MÁV line 100 timetable PDF](https://www.mavcsoport.hu/sites/default/files/upload/page/100_vonali-menetrend-0610.pdf)
- VERIFIED: Volánbusz line numbers: 4445 Debrecen–Hajdúszoboszló; 4446 Debrecen–Hajdúszoboszló–Nádudvar–Püspökladány; 4447 Debrecen–Hajdúszoboszló–Nádudvar; 4460/4464 Debrecen–(Bodaszőlő)–Hajdúböszörmény; 4466 Debrecen–Hajdúdorog–Hajdúnánás; 4477 Balmazújváros–Nagyhegyes–Hajdúszoboszló–Debrecen; 4491 Hajdúnánás–Hajdúdorog–Újfehértó. Lines 4420 and 4430 run on road 47 through Mikepércs. — [MÁV 4445](https://www.mavcsoport.hu/mav-szemelyszallitas/belfoldi-utazas/vonali-menetrendek/letoltes/20250101/4445); [MÁV 4466](https://www.mavcsoport.hu/mav-szemelyszallitas/belfoldi-utazas/vonali-menetrendek/letoltes/20250101/4466); [MÁV 4460](https://www.mavcsoport.hu/mav-szemelyszallitas/belfoldi-utazas/vonali-menetrendek/letoltes/20250621/4460); [haon.hu 2026-08](https://www.haon.hu/helyi-kozelet/2026/08/baleset-teljes-utzar-debrecen-mikepercs)
- VERIFIED (headline only): a 2025 MÁV investment linked to CATL brought rail-replacement buses on Debrecen–Nagykereki (line 106). — [economx.hu 2025-10-02](https://www.economx.hu/gazdasag/2025/10/02/mav-beruhazas-potlobusz-debrecen-nagykereki-catl-817049/)
- VERIFIED: BMW shift buses run from 24 August 2026 (Álmosd–Hosszúpályi–Mikepércs–Debrecen–BMW, plus new Debrecen–Álmosd services). — [MÁV-csoport](https://www.mavcsoport.hu/mav-csoport/bovul-debreceni-terseg-autobuszos-kozlekedese-bmw-gyar-uj-muszakrendjehez-igazodva)

### Inferences
- LIKELY, from background knowledge and not checked against the 2026 timetable: Debrecen to Hajdúszoboszló by train takes about 12–18 min, to Kaba about 20–25 min, and to Püspökladány about 25–35 min (IC fastest). Debrecen to Hajdúhadház is about 12–15 min, Téglás about 15–20 min and Újfehértó about 20–30 min. By bus, Hajdúböszörmény is about 30–35 min, Hajdúnánás about 50–70 min and Balmazújváros about 40–50 min. Debrecen station (Petőfi tér) is about 1.5–2 km from Kossuth tér, connected by tram 1. Reaching BMW or CATL from the station needs a change to a city or factory bus.
- Under the commuting rule, the mandatory employer contribution for public transport passes is 86% of the season ticket (bérlet) price. LIKELY, from background knowledge of 39/2010 Korm. rendelet §3. That makes bus or rail almost free for the employee, a large gap against the cost of a car (section 6).

### Gaps
- Exact 2026 timetable journey times and frequencies: not retrieved, because mavcsoport.hu and menetrendek.hu were blocked.
- Station lists for lines 106, 108 and 110: UNKNOWN. In particular, whether Derecske, Konyár or Létavértes lie on line 106 was not checked.

---

## 5. Fuel prices and official per-km norms in 2026

### Takeaway
The NAV prices for October 2026 are **605 Ft/l for 95 petrol and 681 Ft/l for diesel**. Pump averages in early September 2026 were about 617 and 697 Ft/l. NAV's general vehicle cost norm (általános személygépkocsi-normaköltség) is **15 Ft/km**, paid on top of fuel. The employer's commuting reimbursement for travel by own car under 39/2010 Korm. rendelet is **18 Ft/km**, tax-free, and is mandatory only in specific cases.

### Cited Findings
- VERIFIED: NAV prices applicable 1–31 October 2026: 95 petrol 605 Ft/l, diesel 681 Ft/l, mix 660 Ft/l, LPG 356 Ft/l, CNG 850 Ft/kg (HÉ 2026/41). NAV calculates each month's figure from the average consumer price at three domestic fuel retailers on the 1st of the previous month. — [adozona.hu – NAV közlemény HÉ 2026/41](https://adozona.hu/jogtar/4223_NAV_kozlemeny_HE_2026_41_2026_oktober_1_je); [roadrecord.hu NAV üzemanyagár 2026. október](https://www.roadrecord.hu/kikuldetesi-rendelveny-sajat-gepkocsihoz/nav-uzemanyagar-uzemanyag-norma/)
- VERIFIED: on 7 September 2026 the average pump price was about 617 Ft/l for 95 petrol and 697 Ft/l for diesel, based on holtankoljak.hu data. — [autonavigator.hu](https://www.autonavigator.hu/autosvilag_hirei/tovabb-csokken-mindket-uzemanyag-ara-ime-a-varhato-atlagarak) (via search snippet; the article date is from the snippet). Pump prices after 7 Sept could not be checked (UNKNOWN).
- VERIFIED: for business trips (kiküldetési rendelvény) in an own car, the tax-free reimbursement is (km/100 × NAV consumption norm × NAV fuel price) + km × 15 Ft/km. The 15 Ft/km covers maintenance, repair and wear, not fuel. — [roadrecord.hu – kiküldetés elszámolása 2026](https://www.roadrecord.hu/kikuldetesi-rendelveny-sajat-gepkocsihoz/kikuldetes-elszamolasa/); [roadrecord – általános normaköltség](https://www.roadrecord.hu/altalanos-szemelygepkocsi-normakoltseg/); [NAV information booklet 08](https://nav.gov.hu/pfile/file?path=%2Fugyfeliranytu%2Fnezzen-utana%2Finf_fuz%2Frejtett%2FInformacios-fuzetek---Aktualis%2F08_A-gepjarmuvek-uzemeltetesevel-kapcsolatos-koltsegek-elszamolasa)
- VERIFIED (current employer policies cite it): under 39/2010 (II.26.) Korm. rendelet §4(1), an employee authorised to commute by own car is entitled to **18 Ft/km**. Employers may also authorise it at their discretion beyond the mandatory cases. — [SZTE szabályzat 6/2023](https://u-szeged.hu/szabalyzatok/6-2023-vi-02-sz); [SZTE 2/2023](https://music.u-szeged.hu/karunkrol/szabalyzatok/2-2023-sz-kancellari)
- CONFLICT: a search snippet from adozona.hu tag pages gives 15 Ft/km for commuting by own car and 9 Ft/km for commuting from outside the town boundary. These are older figures, LIKELY from before 2023, and are superseded by the 18 Ft/km in 2023+ employer rules. — [adozona.hu tag pages](https://adozona.hu/cimke/munk%c3%a1ba+j%c3%a1r%c3%a1s/13)
- VERIFIED: a 2026 NAV booklet on vehicle costs exists (mezohir.hu, 15 Feb 2026). — [mezohir.hu](https://mezohir.hu/2026/02/15/mezogazdasag-nav-gepjarmukoltseg-elszamolas/)

### Inferences
- LIKELY, background knowledge of 60/1992 Korm. rendelet: the NAV consumption norms (alapnorma) for petrol cars are 7.6 l/100 km up to 1000 cm³, 8.6 for 1001–1500, 9.5 for 1501–2000, 11.4 for 2001–3000 and 13.3 above 3000. For diesel they are 5.7 up to 1500, 6.7 for 1501–2000, 7.6 for 2001–3000 and 9.5 above 3000. These are deliberately generous compared with what a modern car really uses.
- ESTIMATE: kiküldetés-equivalent rate for a 1.4 l petrol car = 8.6 × 6.05 + 15 ≈ **67 Ft/km**. For a 1.6 diesel it is 6.7 × 6.81 + 15 ≈ **61 Ft/km**. This is the tax-free rate when the employer sends someone on a business trip. It does **not** apply to ordinary commuting, which gets 18 Ft/km.
- LIKELY: the 18 Ft/km is mandatory only in specific cases: no public transport between home and workplace, or a timetable that doesn't fit the shift, or the employee's disability, among others. Otherwise the employer's mandatory contribution is 86% of the season ticket price. Many Debrecen-area factory employers also run free company buses, so whether a commuter actually receives 18 Ft/km must be checked employer by employer.

### Gaps
- Explicit confirmation that the 39/2010 rate is still 18 Ft/km in 2026 with no 2025–26 change, and the exact legal list of mandatory cases, were not re-verified. adozona.hu and njt.hu were blocked and the search budget ran out.
- Pump prices for October 2026 (holtankoljak.hu): UNKNOWN beyond the 7 Sept snippet.

---

## 6. Full cost per km of a typical used compact car, and monthly commuting cost

### Takeaway
For a used petrol compact (≈10 years old, 6.5 l/100 km, ~15,000 km/yr), fuel alone costs about **40 Ft/km**. The variable cost (fuel + tyres + servicing/repairs + mileage depreciation) is about **70 Ft/km**, with a range of 60–85. Full cost including insurance, tax, vignette and time-based depreciation is about **90–95 Ft/km**. A 30 km one-way commute therefore costs about 48,000 Ft/month in fuel, 85,000 in variable cost and 110,000 in full cost. The 18 Ft/km reimbursement, where paid, offsets only about a quarter of the variable cost.

### Cited Findings
- VERIFIED: compulsory third-party liability insurance (KGFB) for a car costs on average roughly 30–70 thousand Ft/year (80,000+ in Budapest). Another source gives an average of about 62,000 Ft/year. Typical cost shares: depreciation and financing 30–40%, fuel 20–30%, insurance, tax and registration 10–15%, service and repair 10–15%, tyres, parking and other 5–10%. Mechanic hourly rates are 15,000–22,000 Ft. One example: 6.5 l/100 km × 12,000 km/yr ≈ 430,000 Ft/yr in fuel at 600–650 Ft/l. — [simplebiztositas.hu](https://simplebiztositas.hu/mennyibe-kerul-az-auto-fenntartasa-igy-szamolj-realisan/); [biztositas.hu KGFB](https://www.biztositas.hu/kotelezo-biztositas); [K&H](https://www.kh.hu/biztositas/cikkek/auto/mennyibe-kerul-az-auto-fenntartasa); [berkalkulator.com TCO](https://berkalkulator.com/auto-teljes-koltseg-kalkulator) (via search snippets; the exact attribution of each figure to each site is uncertain because the snippet was a combined summary)
- VERIFIED: NAV fuel price for October 2026 is 605 Ft/l (95). The pump average on 7 Sept 2026 was about 617 Ft/l. — sources in section 5.

### Cost model (ESTIMATE; all assumptions stated)

**Assumptions**
- Car: used petrol compact, for example a 1.4–1.6 l VW Golf, Opel Astra, Toyota Auris or Škoda Octavia class, 8–12 years old, worth about 3.5–4.5 M Ft.
- Fuel use: 6.5 l/100 km (sensitivity 7.0). Mixed commute driving, partly through the city in peak hours.
- Fuel price: 610 Ft/l, between the NAV 605 and the pump 617 (sensitivity 650).
- Mileage: about 15,000 km/yr. A 30 km one-way commute alone accounts for about 13,000 km/yr.

| Component | Basis (ESTIMATE) | Ft/km |
|---|---|---|
| Fuel | 6.5 l × 6.10 Ft/l per 100 km (7.0 l → 42.7; at 650 Ft/l → 42.3) | **≈ 40** |
| Tyres | one set of mid-range summer + winter tyres, ~120–160k Ft per set, each set lasting ~40k km, plus fitting/swap ~15k/yr | **≈ 4** (3–6) |
| Servicing and repairs | 200–350k Ft/yr for a ~10-year-old compact (oil service, brakes, filters, timing belt amortised, unexpected repairs) ÷ 15,000 km | **≈ 15** (13–23) |
| Mileage-related depreciation | ~10%/yr of 4 M Ft ≈ 400k/yr; about half is driven by mileage | **≈ 12** (10–16) |
| **Variable (marginal) cost** | sum | **≈ 71** (60–85) |
| Fixed costs spread per km | KGFB ~60k (VERIFIED range 30–70k); vehicle tax ~20–40k (ESTIMATE, depends on kW and age); county vignette ~6k (UNKNOWN exact 2026 price); MOT/other ~10–15k; time-based depreciation ~200k → about 300–320k/yr ÷ 15,000 km | **≈ 21** |
| **Full cost** | variable + fixed (casco excluded; casco would add about 100–200k/yr, ≈ 7–13 Ft/km) | **≈ 92** (80–105) |

**Official yardsticks**
- Employer commuting reimbursement, 39/2010: **18 Ft/km**.
- Kiküldetés (business-trip) equivalent, 1.4 petrol: **≈ 67 Ft/km**.
- NAV amortisation norm: **15 Ft/km** (paid on top of fuel).

**Monthly cost: 20 workdays, round trip (monthly km = one-way km × 2 × 20)**

| One-way km | Monthly km | Fuel only (≈39.7 Ft/km) | Variable cost (≈71 Ft/km) | Full cost (≈92 Ft/km) | Reimbursement at 18 Ft/km | Net variable after reimbursement (≈53 Ft/km) | Kiküldetés-equivalent (≈67 Ft/km), reference only |
|---|---|---|---|---|---|---|---|
| 10 | 400 | 15,860 | 28,400 | 36,800 | 7,200 | 21,200 | 26,800 |
| 20 | 800 | 31,720 | 56,800 | 73,600 | 14,400 | 42,400 | 53,600 |
| 30 | 1,200 | 47,580 | 85,200 | 110,400 | 21,600 | 63,600 | 80,400 |
| 40 | 1,600 | 63,440 | 113,600 | 147,200 | 28,800 | 84,800 | 107,200 |
| 50 | 2,000 | 79,300 | 142,000 | 184,000 | 36,000 | 106,000 | 134,000 |
| 60 | 2,400 | 95,160 | 170,400 | 220,800 | 43,200 | 127,200 | 160,800 |

All figures are Ft per month, ESTIMATE.

### Inferences
- **Each extra 10 km of one-way distance costs about 28,000 Ft/month in variable cost**, or about 37,000 Ft/month in full cost. Over a year (11 working months) that is roughly 310,000–400,000 Ft. Over a 20-year mortgage it amounts to several million Ft, which is a fair trade-off to weigh against cheaper house prices further out. ESTIMATE.
- With two commuting cars, or one car bought only for commuting, the full-cost column applies. When an existing car simply drives more, the variable column is the right one.
- The cost of time is not included: each extra 10 km one-way adds about 16–20 min a day round trip in peak hours, roughly 6 hours a month. ESTIMATE.
- A public transport pass with the 86% employer contribution, or a free factory shuttle (BMW/CATL shift buses), can cut the monthly commuting cost to near zero for the employee. That matters most for settlements on line 100 or with direct shift buses: Hajdúszoboszló, Kaba, Püspökladány, Hajdúhadház, Téglás, Újfehértó, and Álmosd–Hosszúpályi–Mikepércs.

### Gaps
- Exact 2026 county vignette price and vehicle tax rates were not verified (UNKNOWN). Their per-km effect is small (about 2–3 Ft/km).
- No 2026 Hungarian survey of used-car maintenance cost per km was found. The servicing and depreciation figures are model assumptions.
- Diesel variant not fully modelled. At 5.5 l/100 km × 690 Ft/l, diesel fuel costs about 38 Ft/km, essentially the same as petrol at current prices, but servicing (DPF, injectors) is usually higher. ESTIMATE.
