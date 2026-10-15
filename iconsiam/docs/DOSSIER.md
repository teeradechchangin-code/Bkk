# ICONSIAM real-scale model: controlled dossier (Document Control)

| Field | Value |
|---|---|
| Document | ICONSIAM-DC-DOSSIER-001, revision A, 2026-10-14 |
| Issued by | Document Control lead |
| Merges | the reports of 4 researchers: towers, mall, OSM geometry and images |
| Geometry file | `footprints_local_m.json` (ICONSIAM-DC-FP-001 rev A), in this folder |
| Plan image | `DOSSIER_plan.png` (verified PNG, 1030×943), in this folder |
| Supersedes | `towers_footprints_local.json`, which used the UTM grid and is off true north by 0.36° (up to 1.14 m error) |

**Status legend**
- **OSM**: traced geometry from OpenStreetMap. Doc Control re-verified it against the raw Overture extract (max vertex deviation 0.07 m).
- **DERIVED**: computed by Doc Control from OSM geometry.
- **INFERRED**: estimated from photos and published figures, not stated by any source. Each INFERRED item must be calibrated against the user's photos.
- **The user's Photo A and Photo B override any prose in this dossier.**

**Access limitation (affects confidence):**
- The egress proxy refused page fetches (HTTP 403 CONNECT) for Wikipedia, CTBUH, SkyscraperPage, iconsiam.com, Wikimedia Commons/upload, OSM/Overpass and others.
- **Web figures** come from WebSearch result excerpts of the cited URLs. No page was read in full.
- **Geometry** comes from OpenStreetMap, downloaded directly as Overture Maps release 2026-09-23.1 GeoParquet (OSM snapshot 2026-09-06).

---

## 0. Source register (every number below cites one of these)

| ID | Source |
|---|---|
| S1 | OpenStreetMap © OSM contributors (ODbL), via Overture Maps 2026-09-23.1 https://overturemaps-us-west-2.s3.us-west-2.amazonaws.com/release/2026-09-23.1/. OSM objects: mall https://www.openstreetmap.org/way/680735864, Magnolias https://www.openstreetmap.org/way/680736465, MO Residences https://www.openstreetmap.org/way/680739268, river https://www.openstreetmap.org/relation/14038959, site https://www.openstreetmap.org/relation/15632099, tower plot https://www.openstreetmap.org/way/1190311737, basin https://www.openstreetmap.org/way/1190311738, piers https://www.openstreetmap.org/way/1125558200, /way/1125558201, /way/1125558202, /way/1125558214 |
| S2 | CTBUH Magnolias https://www.skyscrapercenter.com/building/magnolias-waterfront-residences-tower-1/14532 |
| S3 | CTBUH MO Residences https://www.skyscrapercenter.com/building/mandarin-oriental-residences-bangkok/14533 |
| S4 | CTBUH complex https://www.skyscrapercenter.com/complex/747 |
| S5 | SkyscraperPage Magnolias https://skyscraperpage.com/cities/?buildingID=99242 (its roof and spire figures cite the Thai EIA http://eiadoc.onep.go.th/) |
| S6 | Wikipedia Iconsiam https://en.wikipedia.org/wiki/Iconsiam |
| S7 | Wikipedia tallest buildings in Bangkok https://en.wikipedia.org/wiki/List_of_tallest_buildings_in_Bangkok |
| S8 | Wikipedia tallest structures in Thailand https://en.wikipedia.org/wiki/List_of_tallest_structures_in_Thailand |
| S9 | Tradelink https://m.tradelinkmedia.biz/publications/7/news/1505 ; Cranepedia https://cranepedia.com/news/linden-comansa-at-the-top-of-bangkok/ |
| S10 | Dailynews https://www.dailynews.co.th/news/4557869/ ; Brandbuffet https://www.brandbuffet.in.th/?p=182731 ; Thansettakij https://www.thansettakij.com/real-estate/660057 |
| S11 | Dextra https://www.dextragroup.com/icon-siam-complex/ |
| S12 | Hitachi https://www.hitachi.com/businesses/elevator/gallery/iconsiam/index.html |
| S13 | FazWaz Magnolias https://www.fazwaz.com/projects/thailand/bangkok/khlong-san/khlong-ton-sai/magnolias-waterfront-residences ; MQDC https://mqdc.com/magnolias |
| S14 | FazWaz MO https://www.fazwaz.com/projects/thailand/bangkok/khlong-san/khlong-ton-sai/the-residences-mandarin-oriental-bangkok |
| S15 | Khaosod English https://www.khaosodenglish.com/life/2019/08/15/heres-what-the-condo-above-iconsiam-looks-like-and-costs-photos/ |
| S16 | Thailand-Property https://www.thailand-property.com/new-home/3650/magnolias-waterfront-residences-iconsiam |
| S17 | Penetron https://www.penetron.com/news-media/media-releases/view/Built-on-Penetron-Technology-the-New-Residential-Towers-of-Bangkok/ |
| S18 | Tatler https://sg.asiatatler.com/life/the-residences-at-mandarin-oriental-bangkok-waterfront-property-luxury-apartment |
| S19 | seele project https://seele.com/project/glass-front-iconsiam-bangkok ; seele press 2017 https://seele.com/press/iconsiam-an-impressive-project-in-bangkok |
| S20 | Architizer https://architizer.com/projects/iconsiam/ |
| S21 | EngelsmannPeters https://engelsmannpeters.de/en/iconsiam-shopping-centre-glasfassade/ |
| S22 | sedak https://www.sedak.com/en/architecture/facade-glass/iconsiam-bangkok-thailand/ |
| S23 | Arup https://www.arup.com/projects/iconsiam |
| S24 | Benoy https://www.benoy.com/projects/icon-siam/ |
| S25 | BD+C https://www.bdcnetwork.com/home/news/55162198/bangkoks-latest-mega-shopping-mall-features-one-of-the-worlds-longest-pillarless-all-glass-facades |
| S26 | PR Newswire 2014 https://www.prnewswire.com/news-releases/us-154-billion-iconsiam-national-landmark-readies-to-rise-in-thailand----begins-piling-265482651.html |
| S27 | PR Newswire 2019 https://www.prnewswire.com/news-releases/bangkoks-chao-phraya-river-gets-new-landmark-attraction-with-opening-of-southeast-asias-longest-water-feature-at-iconsiam-300784965.html |
| S28 | Brandbuffet 2018 https://www.brandbuffet.in.th/2018/10/grand-opening-icon-siam-next-world-destination-nov-2018/ |
| S29 | Mall Navigator https://www.mall-navigator-bangkok.com/malls/iconsiam |
| S30 | Kupi https://kupi.com/en/explore/thailand/bangkok/iconsiam |
| S31 | FMG https://www.irisfmg.com/projects/public-areas/iconsiam-mixed-use-complex/ |
| S32 | Brand Inside https://brandinside.asia/?p=44110 |
| S33 | ICONSIAM Hall https://www.iconsiamhall.com/en/facilities ; Destination Asia https://news.destination-asia.com/iconsiam-mega-development-in-central-bangkok-to-revolutionize-event-space/ |
| S34 | EatInAsia https://eatinasia.blog/countries/thailand/iconsiam-bangkok-dining-guide ; Phuket101 https://www.phuket101.net/tasana-nakorn-terrace/ |
| S35 | eGlobalTravelMedia https://www.eglobaltravelmedia.com.au/thailands-largest-commercial-property-development-iconsiam-opens-with-dazzling-us30-million-launch/ |
| S36 | iconsiam.com https://www.iconsiam.com/th/events-activities/the-iconic-multimedia-water-features ; GoAheadNews https://www.goaheadnews.com/2022/12/iconic-multimedia-water-features.html ; TrueID https://travel.trueid.net/detail/wND829ZQq0jN |
| S37 | Destination Asia https://news.destination-asia.com/?p=14437 ; PrimeAces https://www.primeaceslimousine.com/blog/iconsiam-pier-bangkok |
| S38 | Robb Report https://robbreport.com.sg/?p=39225 |
| S39 | Thailand Magazine https://thailandmagazine.com/bangkok/shopping-malls/iconsiam/ |
| S40 | Togen https://www.togen.com.cn/article/project-review-icon-siam-retail-mall |
| S41 | LSi https://lsionline.com/news/martin-illuminates-the-bangkok-skyline |
| S42 | EOC Wisdom Hall https://www.eocengineers.com/projects/iconsiam-wisdom-hall-391/ ; EOC Apple https://www.eocengineers.com/projects/apple-iconsiam-388/ |
| S43 | Wikipedia Charoen Nakhon station https://en.wikipedia.org/wiki/Charoen_Nakhon_station |
| S44 | Condodee https://condodee.com/p/604 |
| S45 | home.co.th https://www.home.co.th/landmark/Iconsiam |
| S46 | CTBUH Icon Siam Tower (proposal) https://www.skyscrapercenter.com/building/icon-siam-tower/18531 |
| S47 | Nation Thailand https://www.nationthailand.com/life/30358261 |
| S48 | Foster + Partners https://www.fosterandpartners.com/news/apple-iconsiam-first-apple-store-in-thailand-opens |
| S49 | TAT News https://www.tatnews.org/2018/11/iconsiam-all-set-for-one-billion-baht-opening-extravaganza-on-9-11-november/ |
| S50 | skydb https://www.skydb.net/country/109871475/thailand |
| S51 | EdgeProp https://www.edgeprop.my/content/iconsiam-superlux-introduces-first-mandarin-oriental-branded-residence ; Aglaia https://www.aglaiamagazine.com/the-residences-at-mandarin-oriental-bangkok/ |
| S52 | Asia Property Awards https://www.asiapropertyawards.com/en/bangkoks-latest-luxury-landmark/ |
| S53 | Lazudi https://lazudi.com/th-en/bangkok/project/magnolias-waterfront-residences-1633 |
| DC | Doc Control computation on S1 geometry (scripts in `lead/`) |

---

## 1. Frame and placement (for all build teams)

**Origin**
- (0, 0, 0) is the Google Maps pin from the user's link: 13.7268131 N, 100.5103667 E. The user asked for the model at 0 0 0.
- The pin lies inside the mall footprint, 18 m east and 12 m north of the mall centroid (S1, DC).

**Axes**
- x = east, y = north (true north), z = up, all in metres.
- Engineering must map these to Oriverse's axis convention.

**Projection**
- Equirectangular about the origin: x = (lon − 100.5103667) × 108,140.5; y = (lat − 13.7268131) × 110,574.
- Error is under 0.1 m within 500 m of the origin (DC).

**Ground and water**
- Ground z = 0 is the plaza and road grade. INFERRED: the site is treated as flat.
- Water surface z ≈ −2.0 m. INFERRED; the river is tidal (`tidal=yes`, S1). See open questions.

**Riverfront orientation**
- The bank runs at bearing 356.1°. The outward normal toward the water is **bearing 86.1°**, so the riverfront faces east and slightly north (S1 fit over y = −105…157, max deviation 1.7 m).
- The river is **205 m wide** opposite the mall (x 142.4 → 347.5 at y = 0) (S1).

**Superseded frame**
- The towers researcher's file used the UTM 47N grid. Grid convergence here is 0.36°, which displaces vertices by up to 1.14 m (DC comparison).
- Use only `footprints_local_m.json`.

---

## 2. Controlled key numbers

| Item | Controlled value | Status / source |
|---|---|---|
| Mall footprint area | 33,786 m², 33 vertices | OSM (S1) |
| Mall length along river | **212.6 m** (bbox 212.0; min-rect 209.4) | DERIVED (S1, DC) |
| Mall depth, river to road | **228.0 m** (bbox 232.0; min-rect 230.0) | DERIVED (S1, DC) |
| Mall developed river facade length | 306.4 m. Matches the published ~300 m pleated glass front (S19, S22) | DERIVED (DC) |
| Mall above-ground floors | **10** (G, M, 1–8) | see conflict C6 |
| Mall main roof | **58.0 m** | INFERRED (C7) |
| Gold crown top | **70.0 m** | INFERRED, low confidence |
| Riverside podium roof / glass top | **20.0 m / 24.0 m** | S20, S19, S21 (C8) |
| Riverfront facing (outward normal) | **86.1°** bearing | S1, DC |
| South tower | **Magnolias Waterfront Residences**: 70 floors above ground plus 2 basements; roof **281 m**; architectural top 315 m; **tip 317.95 m** | S2, S5, S10, S1 (C1, C2) |
| North tower | **The Residences at Mandarin Oriental, Bangkok**: 52 floors; roof **232 m (INFERRED)**; architectural top 268.7 m; **tip 272.2 m** | S3, S1, S6 (C3–C5) |
| Tower centroids (OSM outlines) | Magnolias (11.8, 76.1); MO (59.3, 117.9); 63.3 m apart at bearing 48.7° | S1, DC |
| River Park plaza | 10,252 m², derived. Published figure ~10,000 m² (S35) | DERIVED (DC) |

---

## 3. Conflict register (values, sources, decision)

| # | Item | Values found (source) | Decision and reason |
|---|---|---|---|
| C1 | Magnolias height | 315 m architectural (S2, S7 table); 316.1 m = 1,037 ft spire from EIA (S5); 317.95 m (S10, S1 tag); 318 m "incl. pinnacle" (S6, S9); 315 m planned (S11) | **Tip 317.95 m; architectural top 315 m.** Several sources (S10 ×3, S1, S6, S9) agree within 0.05 m on 317.95–318, though they may not be independent. The EIA figure (316.1 m) lies inside the spread. The ~3 m above 315 m is INFERRED to be a lightning rod or finial. |
| C2 | Magnolias floors / roof | 70 floors (S2, S5, S7, S12); 73 floors (Dailynews, S10); roof 922 ft = 281 m (S5, from EIA); climbing crane finished at 287 m (S9) | **70 floors; roof 281 m.** 73 is a single outlier. The crane at 287 m is consistent with a 281 m roof. Spire/crown is 281 → 317.95 m, i.e. about 37 m (DC). |
| C3 | MO height | 268.7 m architectural (S3); 269 m (S4, S9, S50); 272 m (S6); 272.2 m (S1 tag); 280 m planned (S11) | **Tip 272.2 m; architectural top 268.7 m.** The gap to the tip (3.5 m) mirrors Magnolias' 315 → 317.95 m (2.95 m), so it is INFERRED to be the same kind of rod. 280 m was a pre-completion figure. |
| C4 | MO floors | 52 (S3, S12, S18, S1); 49 (S50); 51 (one listing) | **52.** Majority of sources, including CTBUH and OSM. |
| C5 | MO roof | No source found | **232 m INFERRED, range 223–241.** Low end: 52 floors at ~4.1 m (3.2 m ceilings, S14) plus lobby. High end: Magnolias' roof-to-tip ratio 281/317.95 × 272.2 = 240.6 m. The towers researcher gave 230–235 m. |
| C6 | Mall storeys | building:levels=8 (S1); "eight retail levels plus F&B" (S24); "9-storey pavilion" (S23); "10-storey" (S25); "11-story" (S30); floor labels G, UG, M, 1–8 (S29) | **10 above-ground levels (G, M, 1–8).** Cross-check: FMG GFA 336,390 m² (S31) ÷ footprint 33,786 m² = 9.96 average floors (DC). |
| C7 | Mall roof height | Not published anywhere reachable | **58 m INFERRED.** Basis: podium G/M/1 = 20 m (S20), plus 7 floors (2F–8F) at about 5.5 m. The mall researcher gave 50–58 m. Site Ops must calibrate it against Photo A, using Magnolias roof = 281 m as the scale. |
| C8 | Riverside glass height | 15.5 m glass + 6 m above roof (seele 2017, S19 press); hung from the ceiling at 20 m (S20); fins up to 24 m, 4 m above roof (S19 project); "swords" 24 m × 1.1 m (S21) | **Podium roof 20 m; glass balustrade top 24 m.** Three later sources agree; the 2017 figures are superseded. |
| C9 | River frontage | 400 m (developer, S27); walkway ~500 m (S45); OSM bank from Pier 1 to the north edge of the tower plot = 295.3 m including jogs (straight N–S span 269 m); bank alongside mall 212.8 m (DC on S1) | **Use OSM geometry.** 400 m and 500 m are promotional figures and cannot be fitted to the mapped bank. |
| C10 | Fountain length | ">400 m" (S36 iconsiam.com, S27); "about 240 m" (S36 TrueID); OSM basin 101.7 × 13.9 m, 960 m² (S1 w1190311738) | **Model the OSM basin.** INFERRED: the show fountain is a jet line along the basin and river edge. 400 m cannot fit on 295 m of bank (C9). Jets reach up to 35 m (mall researcher). |
| C11 | Site area | 50 rai = 80,000 m² (S26); 55 rai = 88,000 m² (S32); 46,888.4 m² (S31) | **OSM total 78,414 m²** = ICONSIAM ring 51,684 + tower plot 19,113 + ICS ring 7,617 (S1, DC). This matches 50 rai to within 2%. FMG's figure is probably a single parcel. |
| C12 | GFA | 750,000 m² (S26, S25); 725,000 m² (S24); 336,390 m² (S31) | **750,000 m² for the whole phase 1**, which includes the towers. 336,390 m² is mall-only (INFERRED). These figures do not drive geometry. |
| C13 | Photo B camera direction | Brief: "looking roughly south-west/west, river on the right" | **INFERRED: camera south/south-east of the site, looking north-north-west.** With the river on the right (east) and the towers behind the mall (north), a south-west view is geometrically impossible. Two researchers reached this independently. The image content wins. |
| C14 | Magnolias units | 379 (S5, S13); 300 (S6); 444 or 525 (listings) | **379.** 525 is the complex total: 379 + 146 (S4). Not geometry-critical. |
| C15 | Magnolias structure | "All-Steel" (one search excerpt); reinforced concrete implied by 800,000+ rebar couplers (S11), Doka formwork (S2) and Penetron concrete sealer (S17) | **Reinforced concrete (INFERRED).** |
| C16 | Towers' local coordinates | towers researcher (UTM grid) vs OSM researcher (true north) | **True north (OSM researcher).** Doc Control re-verified it against the raw data. |
| C17 | Hilton / G2 station positions | Hilton at (−6, +201) from AroundUs; G2 at (−160, −47) ±30 m from Wikipedia coordinates (S43) | **Use OSM:** Hilton centroid (66.8, 206.9); G2 node (−140.3, −38.8) (S1). Both are context only. |
| C18 | Highest outdoor terrace | 6F "highest outdoor level facing the water" (S34); 7F viewpoint (blogs) | Two terrace steps are modelled, at 5F and 6F (Z2, Z3). A 7F viewpoint can be a balcony detail. |

---

## 4. Sanity checks of the OSM geometry against the photos

| Check | Result |
|---|---|
| Are the towers north of the mall? | **PASS.** Tower centroids are at y = 76 and 118. The mall's main block ends at y ≈ 21 east of x = −8 and wraps west of Magnolias up to y = 107 (S1). Charoen Nakhon Road numbering supports this order: Hilton 123 < Magnolias 215 < ICONSIAM 299 (S44). |
| Is the taller tower on the left in Photo A (east bank looking west)? | **PASS.** Magnolias (x = 11.8, y = 76.1) is south-west of MO (59.3, 117.9), so it appears on the left. The Hilton (y = 207) is furthest right (S1). |
| Does the mall length agree with the river frontage? | **PASS.** Mall extent along the bank is 212.6 m against 212.8 m of bank beside it. The developed river face of 306.4 m matches seele's ~300 m glass front (S19) (DC). |
| Do the towers have slender ~30–45 m plates? | **FAIL for the raw OSM outlines.** Their minimum rectangles are 78.1 × 53.4 m (3,186 m²) and 67.1 × 46.1 m (2,172 m²) (S1). A 3,186 m² plate × 70 floors = 223,000 m², which cannot hold 379 units (S13: 203 one-beds of 60–79 m²). **Disposition:** the OSM outlines are kept as podium/base outlines. INFERRED shafts are fitted inside them: Magnolias 48 × 32 m, 1,504 m²; MO 46 × 30 m, 1,351 m² (see §6). |
| Golden podium box at the base of the right tower in Photo B | **PASS.** Looking north, the right-hand (eastern) tower is MO, whose OSM outline includes its podium. MO's River Clubhouse is on floors 4–5 (S15). |
| River Park plaza size | **PASS.** Derived plaza is 10,252 m² against ~10,000 m² published (S35). Its width is 28–56 m (S1, DC). |
| Podium plus terraces vs ICONLUXE floor area | **PASS (INFERRED).** Zones Z1+Z2+Z3 total 7,424 m² × 3 podium floors ≈ 22,300 m², against ICONLUXE's 25,000 m² (S28). |
| Piers | **PASS.** OSM maps 3 main pontoons: Pier 1 (south, floating), Pier 2 (centre) and Pier 4 (north, ferry ref N2/1), plus 1 small pier and 2 shelter roofs (S1). Sources describe "a private pier and two public piers" (S37). |
| Missing components | OSM has **no building:part** for any ICONSIAM building (S1). The height zones, crown and tower shafts are therefore all INFERRED (§5, §6). The circular planters in Photo B are not mapped; place them from the photo. |

---

## 5. Mall (ICONSIAM main building + ICONLUXE riverside podium)

**Footprint (OSM, S1)**
- Way w680735864@18, tagged name=ICONSIAM, building:levels=8, with no height tag.
- 33,786 m², 33 vertices, wound CCW. Centroid (−18.0, −12.0).
- Edges are rotated about 4° CCW from the cardinal axes, parallel to Charoen Nakhon Road and the Gold Line (95.5°).
- Facade lengths: south 131.9 m; west ~188 m; north 87.5 m.
- The footprint has a notch at the north-east where Magnolias stands, 8.1 m from the mall.

**Height zones**
- All zones are INFERRED and tile the OSM outline exactly.
- They are bands parallel to the bank, with u = x·cos3.9° + y·sin3.9°.

| Zone | Rule | Area | Roof z | Basis |
|---|---|---|---|---|
| Z1 riverside podium (ICONLUXE, floors G/M/1, pleated glass) | u > 70, plus the NE lobe north of the main block | 4,116 m² | 20.0 m, glass balustrade to 24.0 m | S20, S19, S21 |
| Z2 terrace step A (~5F river-view dining) | 55 < u ≤ 70 | 1,673 m² | 36.5 m | INFERRED from S34 |
| Z3 terrace step B (~6F Tasana Nakorn open-air terrace) | 40 < u ≤ 55 | 1,635 m² | 42.0 m | INFERRED from S34 |
| Z4 main block (10 levels) | u ≤ 40 | 26,361 m² | 58.0 m | INFERRED (C7) |

**Gold crown (INFERRED, low confidence on position, size and shape)**
- Placement: an oval centred at (9, −32), 60 m E–W × 100 m N–S, rotated 3.9°, rising from 58 m to **70 m**. It is placed as close to the river as fits inside Z4.
- Supporting evidence:
  - a "krathong" shape at the top (S39);
  - aluminium honeycomb roof panels of 2.2 × 3.4 m "set in an arc" (S40);
  - the lighting brief accentuates "gold and white" (S41).
- Wisdom Hall, the museum at the top, has a triangular cable-net facade 20 m tall pinned to the "roof prow" (S42). INFERRED: this sits at the river-facing tip of the crown.
- Site Ops must match the crown's shape to Photo A ("golden swooping curved roof crown") and Photo B ("golden oval roof structure").

**Facades (for choosing textures from the Oriverse library)**
- **Z1 river face:** clear glass, pleated in a zigzag, with vertical glass fins.
  - 333 panes and 333 fins; panes up to 16 × 3.2 m; 5,300 m² in total (S19).
  - 120 glass "swords" 24 m tall in 3 zones (S21).
  - The facade reads as "three glass krathongs" over 300 m (S38).
  - The ground floor carries luxury shopfronts (Photo A).
  - The roof garden sits on top of the podium (S48).
- **Z2 and Z3:** stepped glass terraces with curved balconies (Photo B).
- **Z4 south, west and north faces:** white pleated / diamond-shaped aluminium panels.
  - These cover "most of the envelope" (S23); the concept is "vertical pleats" from a Thai pleated shawl (S47).
  - The "ICONSIAM" logo goes on the white box visible from the river (Photo A). It sits at the south-west of the block: left in Photo A, left in Photo B.
  - Siam Takashimaya red lettering is also on the white block (Photo A).
- **Crown:** gold.

**Programme notes (no geometry impact)**
- SookSiam is on G: 15,000–16,000 m² (mall researcher).
- ICONSIAM Hall is on 7F–8F, about 12,000 m², with 2,700–3,000 seats (S33).
- The Pinnacle Hall is on 8F (S29).
- Apple's river facade has 18 panels 10.6 m tall (S42).
- The mall opened on 9 November 2018 (S49).

**Do NOT model**
- "Icon Siam Tower" (459 m) is a proposal only (S46).
- ICS (west of the road), the Millennium Hilton and the BTS station are context only.

---

## 6. Towers

**Magnolias Waterfront Residences (south tower, taller)**
- **Base outline (OSM, w680736465@10):**
  - 3,186 m², 14 vertices; minimum rectangle 78.1 × 53.4 m with its long axis at 101° CCW from east.
  - OSM tags: height 317.95, levels 70 (S1).
  - Podium top 27 m (INFERRED): facilities are on floor 6 (S16).
- **Shaft (INFERRED):**
  - Chamfered rectangle 48 × 32 m with 4 m chamfers, axis 99°, centre (11.0, 69.5), 1,504 m².
  - It fits inside the OSM outline with a 3.3 m margin.
  - It sits 11.8 m from the mall and 108 m from the water (DC).
- **Heights:** roof 281 m (S5); architectural top 315 m (S2); tip 317.95 m (S10, S1).
- **Floor-to-floor:** average 281 m ÷ 70 ≈ 4.0 m (INFERRED); ceilings are 3.0 m minimum (S13).
- **Facade:** gold vertical fins and frames (photos); silver, gold and rose-gold palette (S17); balconies with heat reduction (S52).
- **Crown:** taper and spire mast from 281 m to 317.95 m (photos).
- **Architect:** Urban Architects (S5). **Contractor:** Italian-Thai (S11). **Completed:** 2018–2019 (S2, S6).

**The Residences at Mandarin Oriental, Bangkok (north tower, nearer the river)**
- **Base outline (OSM, w680739268@9):**
  - 2,172 m², 12 vertices; minimum rectangle 67.1 × 46.1 m with its long axis at 46° CCW from east.
  - OSM tags: height 272.2, levels 52 (S1).
  - Podium top 24 m (INFERRED): lobby on floor 1, River Clubhouse with infinity pool on floors 4–5 (S15). This is the golden podium box in Photo B.
- **Shaft (INFERRED):**
  - Chamfered rectangle 46 × 30 m with 4 m chamfers, axis 49.1°, centre (59.7, 114.1), 1,351 m².
  - It fits inside the OSM outline with a 0.9 m margin.
  - It sits 49.6 m from the water. The gap between the two shafts is 17.5 m (DC).
- **Heights:** roof 232 m (INFERRED, C5); architectural top 268.7 m (S3); tip 272.2 m (S1).
- **Plan basis:** 4 units per floor on floors 6–42; Sky Pavilion on 36; penthouses from 43 (S15, S14). Ceilings 3.2 m, 6.4 m in duplexes (S14).
- **Facade:** "graceful lines" inspired by a boat journey on the Chao Phraya (S18); gold fins (photos).
- **Design consultant:** Foster + Partners (S18). **Contractor:** Italian-Thai (S11). **Completed:** 2019 (S3).

---

## 7. River, bank, piers, River Park

**Riverbank (OSM r14038959@9)**
- Site-side west bank: 50 vertices, 855.7 m, ordered south to north.
- It steps 27 m riverward at y ≈ −108, the south end of the ICONSIAM embankment.
- A clipped water polygon covering both banks (80 vertices) is included for the water surface (S1).

**Piers (S1)**

| Pier | OSM way | Area | Centroid | Notes |
|---|---|---|---|---|
| Pier 1 (south, floating) | w1125558200 | 853 m² | (159.7, −92.8) | ferry stop at (174.0, −106.6); shelter roof w1125558204, 237 m² |
| Pier 2 (centre) | w1125558201 | 1,095 m² | (159.3, −21.6) | ferry stop at (160.8, −20.6) |
| Pier 4 (north) | w1125558202 | 1,021 m² | (152.7, 79.5) | ferry ref N2/1 at (154.4, 82.5); shelter roof w1125558203, 214 m² |
| Small pier | w1125558214 | 160 m² | — | — |

- Other mapped elements: pontoon 1B at (165.4, −67.4); a 49.6 m footbridge (w1125558211); the pier centre lines.
- Pier decks: INFERRED about +0.5 m above water (floating).

**River Park (S1)**
- Plaza polygon, derived: 10,252 m², 41 vertices.
- Water basin: w1190311738, 960 m², with a fountain node at (131, −11).
- Curved promenade path: w722854228, 164.5 m.
- Path to the towers: w722854229.
- Circular planters (Photo B) are not mapped; Site Ops places them from the photo.

---

## 8. Reference images

**Released: verified downloadable or readable PNGs (checked with PIL)**
1. `doccontrol/DOSSIER_plan.png`: 1030×943 controlled plan, with OSM geometry and the INFERRED zones, shafts and crown.
2. `doccontrol/imgref/iconsiam_siteplan_overture.png`: 1680×1680 at 2 px/m, ±420 m around the origin.
3. `doccontrol/osm_fp/iconsiam_osm_plan.png`: 845×704 OSM footprint plan.

The governing visual references remain the user's **Photo A** and **Photo B**.

**Not released: unverified (uncontrolled)**
- The images researcher listed 15 Wikimedia Commons files, for example `Iconsiam_at_Day.jpg`, `Iconsiam_Skyscrapers.jpg` and `Magnolias_Waterfront_Residences_Iconsiam.jpg`.
- Their upload URLs were constructed from MD5 hashes, not downloaded, because the proxy returned 403 for upload.wikimedia.org.
- They are listed in `imgref/iconsiam_image_refs.json` with `verified_download: false`.
- **Do not use them until a fetch outside this sandbox returns HTTP 200 image/\*.**

---

## 9. Open questions (owners)
See the `open_questions` list in the hand-off. In summary:
- Mall roof and crown heights and the crown's shape (Site Ops, from Photo A).
- Tower shaft plates and the MO roof height (Engineering).
- Water level (Engineering).
- Fountain length (QC).
- Photo B direction (Management).
- Image verification (Doc Control, outside the sandbox).
- Oriverse axis mapping (Engineering).

## 10. File register (all in `/tmp/claude-0/-home-user-Bkk/a1e01ade-9499-5c28-86a2-3f574976f7ec/scratchpad/doccontrol/`)
- **Controlled:**
  - `DOSSIER.md` (this file)
  - `footprints_local_m.json` (controlled geometry, rev A; full, including context layers)
  - `footprints_local_m_core.json` (core subset handed off: mall, zones, crown, towers, riverbank, piers, River Park)
  - `DOSSIER_plan.png`
- **Working:**
  - `lead/` (Doc Control scripts: verify, fit, build, plot)
  - `osm_fp/` (OSM researcher: summary, raw Overture extracts, scripts)
  - `imgref/` (images researcher)
  - `mall_notes.md`
- **Superseded:** `towers_footprints_local.json`, `towers_geom.txt`
