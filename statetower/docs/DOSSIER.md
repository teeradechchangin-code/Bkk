# State Tower (lebua at State Tower): Document Control dossier

Doc ID ST-DC-DOSSIER-001, rev A, 2026-10-16. Issued by Document Control.

**Subject:** State Tower, 1055 Silom Rd, Bang Rak, Bangkok. It stands at the corner of Silom Rd and Charoen Krung Rd. The tower holds lebua hotel and Tower Club, Sirocco / Sky Bar and Mezzaluna.

**Model origin:** the Google Maps pin from the client's link, 13.7214837 N, 100.5168931 E.

**Status legend:**

| Tag | Meaning |
|---|---|
| **OSM** | Traced geometry and tags from OpenStreetMap. |
| **SRC** | A published figure. |
| **PHOTO** | Measured on the client's photos through a fitted camera. |
| **INFERRED** | Estimate; QC calibrates it against the photos. |

**The client's photos win over all prose.**

## 0. Source register

| ID | Source |
|---|---|
| S1 | OpenStreetMap © OSM contributors (ODbL 1.0), via Overture Maps release 2026-09-23.1 (`theme=buildings`, types `building` and `building_part`), read as GeoParquet over HTTPS. Objects: building w25805374 "State Tower"; parts w443580771 (podium, h 50 m), w376802720 (main block, 50–216 m), w376802719 (north strip, 50–210 m), w376802721 (wing, 50–170 m), w376802722 (wing, 50–160 m), w376802714 (wing, 50–150 m), w376802718 (dome terrace, 216–220 m), w376802715 (dome, 220–247.2 m, `roof:shape=dome`, `building:levels=68`). |
| S2 | CTBUH Skyscraper Center, State Tower (skyscrapercenter.com/bangkok/state-tower/902): architectural height 247.2 m (811 ft), 68 floors, completed 2001, gross floor area ~330,000 m². |
| S3 | Wikipedia EN/TH "State Tower": 247 m, 68 floors, architect Rangsan Torsuwan (Rangsan Architecture), construction from 1991, formerly Royal Charoen Krung Tower. |
| S4 | lebua.com venue pages, listed in the table after this register. |
| S5 | businesstraveller.com / thailandmagazine.com: the Sky Bar is a circular island bar on a round platform jutting over the edge, with colour-changing LEDs; the gold dome is lit at sunset. |
| S6 | timeout.com / sygic: identical curved balconies on every unit, neoclassical balustrades, white/cream building. |
| P1 | Client photo 1, `reference/ref1_night.jpg` (stored engine reference **night**). Night telephoto of the west face. **Target atmosphere.** |
| P2 | Client photo 2, `reference/ref2_day_aerial.jpg` (reference **day**). Day aerial telephoto of the west face, portal at bottom-left. |
| P3 | Client photo 3, `reference/ref3_street.jpg` (reference **street**). Street-level view of the corner portal and podium on Charoen Krung. |
| P4 | Client photo 4, `reference/ref4_crown_drone.jpg` (reference **crown**). Dusk drone shot of the dome, drum colonnade, terrace and round Sky Bar at the tower corner. |

lebua.com venue pages (S4):

| Floor | Venue |
|---|---|
| 51–52 | Breeze |
| 51, 53–59 | Tower Club |
| 63 | Sirocco / Sky Bar, open-air terrace at the foot of the dome |
| 64 | Distil |
| 65 | Mezzaluna, double-height windows in the drum |
| 67 | The State Room inside the dome: 28.8 m diameter, 16 m ceiling |

The egress proxy refused page fetches (HTTP 403) for Wikipedia, CTBUH, OSM and Overpass, so S2–S6 come from search-result summaries. The geometry in S1 was downloaded directly.

## 1. Geometry

**Frame:**
- Local metres from the pin: equirectangular, x = (lon − 100.5168931) · 108,123 and y = (lat − 13.7214837) · 110,574.
- Error is below 0.1 m inside 300 m.
- +x is east, +y is true north, z is up.

All outlines are in `src/ST_defs.weave` (cm, CCW).

| Part | OSM | Height (m) | Plan | Status |
|---|---|---|---|---|
| Podium | w443580771 | 0 → 50 | 6,972 m². Long west side on Charoen Krung (bearing 203°). A 19 m × 22 m neck at the north tip reaches the Silom / Charoen Krung corner: this is the **portal**. | OSM |
| Main block | w376802720 | 50 → 216 | 3,254 m². West face 44.2 m (bearing 203°, faces 293° = toward the river). South face 79.3 m, east 34.1 m + 15.2 m chamfer, north 61.5 m. | OSM |
| North strip | w376802719 | 50 → 210 | 269 m². A 4.5 m-deep strip along the full north face of the main block. | OSM |
| Wing 170 | w376802721 | 50 → 170 | 556 m² | OSM |
| Wing 160 | w376802722 | 50 → 160 | 244 m². A 2.7 m strip. | OSM |
| Wing 150 | w376802714 | 50 → 150 | 418 m². Faceted north end. | OSM |
| Dome terrace | w376802718 | 216 → 220 | 1,443 m², 22-vertex outline over the west half of the main roof | OSM |
| Dome | w376802715 | 220 → 247.2 | 16-gon, centre (−3.48, −21.04), r = 17.35 m. This is the outer ring of the drum terrace. | OSM |

- The west faces of the main block, the north strip and the three wing parts are **collinear**: one straight 80.9 m face from the SW corner (−38.79, −31.07) to the wing's north end (−7.08, 43.39). Document Control checked this; every vertex lies on the line within 2 cm.
- Photos 1 and 2 both look at this face from the north-west.

## 2. Heights and levels

| Item | Value | Status |
|---|---|---|
| Finial tip (architectural height) | 247.2 m | SRC S2 = OSM S1 |
| Floors | 68 above ground. SkyscraperPage says 63 and Travel Weekly 67; overruled. | SRC S2/S3 |
| Podium roof | 50 m, 11 storeys (arcade plus about 9 storeys of arched windows, P2) | OSM; storeys INFERRED |
| Tower floors | 48 storeys from 50 to 216 m, floor-to-floor 3.458 m. P2 rows measure 3.3–3.5 m. Floor 63 (Sirocco) is the 216–220 m terrace. | DERIVED |
| Main roof / north strip roof | 216 / 210 m | OSM |
| Wing roofs | 170 / 160 / 150 m | OSM |
| Wing pediment apexes | about 182 / 172 / 162 m. P2 silhouette through the fitted camera: OSM roof + ~12 m pediment. | PHOTO |
| Drum | colonnade 220 → ~230.5 m, outer radius ~16 m. P1 width 30 m; State Room inside is 28.8 m. | PHOTO / INFERRED |
| LED band | 230.5 → 232.5 m: blue ring at the dome springing (P1, P4) | PHOTO |
| Gold dome | base radius ~14.2 m (P1 width 28 m), crown ~244.5 m, ribbed | PHOTO / INFERRED |
| Lantern + finial | to 247.2 m | SRC |
| Portal top | ~56 m. P3 shows the pediment above the podium cornice. | INFERRED |

## 3. Photo calibration (fitted cameras, engine `fit_reference_camera`, world cm)

Landmarks used:
- finial tip
- SW roof corner and SW corner at the podium top
- NW and NE roof corners of the main block
- north end of the west face at the podium top

The OSM massing reprojects within 10 px (P2, 867 px wide) and 14 px (P1, 1024 px tall). Both are telephoto shots from the north-west.

| Photo | Fitted pose |
|---|---|
| P2 (day) | pos (−95690, 76003, 26962), look_at (−58718, 46704, 22000), vfov 16.0°, 867×768. Bearing 309°, ~1.2 km. |
| P1 (night) | pos (−183846, 200000, 16419), look_at (−107167, 114592, 14740), vfov 6.07°, stored 681×1024. Bearing 318°, ~2.7 km. |

Engine-safe QC cameras use the same line of sight, pulled in to ≤ 700 m because of the far plane:

| Camera | Pos | Look_at | vfov | Capture |
|---|---|---|---|---|
| CAM_NIGHT | (−48284, 49015, 13456) | (−1524, −3065, 12434) | 23.4° | 800×1200 |
| CAM_DAY | (−54718, 43535, 21464) | (−153, 296, 14142) | 27.7° | 868×768 |

## 4. Facade readings (P1, P2, P4)

Positions are given as metres along the west face from the SW corner, through the fitted cameras.

- **Balcony bays:** every face carries curved (bowed) balcony bays. Each balcony has a white solid parapet band per floor, a dark recessed window behind, and thin white vertical dividers between bays. P2 counts 15.7 bays over 66 m, so a bay is ~4.2 m. One row per floor, 3.3–3.5 m pitch.
- **SW corner:** a dark glass strip ~3 m wide, full height 50–216 m. It is the right edge of P1 and P2.
- **Upper dark slot (rev C):** u 36.2–44.5 m along (8 bay columns north of the SW strip), from 177.9 m to a white cap band at the north-strip roof line (~209 m), then a dark top storey split by a white post up to the main cornice. A slim white pilaster runs up its middle at u 40.3 m (P1, P2, P4). The round Sky Bar sits above it, capping the pilaster (P1, P4).
- **NE corner of the north strip:** dark glass band from 50 to 210 m (P1, rev C).
- **Lower dark slot:** ~68–75 m along, inside wing 150, from the podium (50 m) to ~148 m (P1, P2).
- **North faces above the steps:** seen obliquely in P1 and P2 as the "upper-left" section. In P1 it is floodlit blue/violet.
- **Wing pediments:** the three steps carry neoclassical pediments. Each has a triangular gable over an attic storey with 3–4 tall round-arched windows between pilasters and a cornice. The top pediment's tympanum holds a lit **blue circular emblem** (P1).
- **Dome:**
  - Gold ribbed dome on a white colonnaded drum with ~24 columns.
  - Warm-lit glazing behind the columns (Mezzaluna).
  - Blue LED ring at the springing.
  - Small lantern and finial.
  - At night the dome glows gold, floodlit from the drum cornice (P1).
- **Terrace:** at 216–220 m, white balustrades and Sirocco tables (P4). A round Sky Bar platform with a blue-lit bar ring sits at the tower corner next to the dark slot with the white pilaster (P4); Document Control places it at the main block's NW corner, INFERRED.
- **Podium (P2, P3):**
  - Base: a white neoclassical colonnade of tall round columns, ~2 storeys.
  - Above: ~8–9 storeys of tall arched-top windows between pilasters, string courses and a heavy cornice at 50 m.
  - Corner portal at the north neck: a square gate tower with a giant round arch through its base, flanked by paired columns.
  - Above the arch, a large circular medallion with the gold State Tower star logo, the "State Tower Bangkok" lettering and a triangular pediment.

## 5. Conflict register

| # | Item | Values found | Decision |
|---|---|---|---|
| C1 | Floors | 68 (S2, S3, OSM); 67; 63 | **68.** |
| C2 | Floor of Sirocco | 63 (most sources); 64 (one lebua page) | **63 = 216–220 m terrace.** |
| C3 | Dome diameter | OSM ring 34.7 m; State Room inner 28.8 m; P1 drum ~30 m and dome ~28 m | **Drum r 16 m, dome r 14.2 m.** The OSM ring is the terrace railing. |
| C4 | Main block width | Document Control's first web-only estimate was 80–90 × 45–55 m | **Superseded by OSM S1.** |
| C5 | Sky Bar position | OSM terrace outline has a round bump at the east; P4 and S5 put the round bar at a corner over the river side, next to the dark slot | **NW corner (INFERRED).** QC checks it against P4. |
