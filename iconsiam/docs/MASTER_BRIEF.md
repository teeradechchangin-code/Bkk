# ICONSIAM — Master Brief (Management Level, rev A)

Project: real-scale ICONSIAM (Khlong San, Bangkok) as Oriverse `#mesh` DSL, placed at world (0,0,0), using only Oriverse-library materials.
Inputs: Document Control dossier `ICONSIAM-DC-DOSSIER-001 rev A` (`docs/DOSSIER.md`), OSM geometry (`docs/footprints_local_m.json`), the client's photos `reference/ref_skyline_dusk.jpg` (Photo A) and `reference/ref_aerial_river.jpg` (Photo B). **The photos win over any prose.**

## 1. Frame (controlled)
- World centimetres, Z up. Origin (0,0,0) = Google Maps pin 13.7268131 N, 100.5103667 E (inside the mall). +X = east, +Y = true north.
- Grade (plaza, road, ground floors) z = 0. River water surface z = -200 (world water knob `SetWaterSeaLevelCm = -200`). River bed z = -600.
- River runs N–S along x ≈ +122…+148 m (`BANK_LINE`), river is east of the site. Mall is south, towers north.
- All shared numbers/outlines live in the world's `#meshdefs` (mirrored in `src/ICS_defs.weave`). Never re-type a footprint; derive from the defs.

## 2. Mesh template (every component)
```
#mesh ICS_<Name>
budget(verts: 250000, indices: 750000);
sim_box(min: (-24000, -24000, 0), max: (24000, 24000, <top cm>));
anchor(mode: "origin");
...  // geometry authored directly in WORLD coordinates from #meshdefs
#end
#mesh ICS_<Name> lod: 1 ... #end      // simple massing, <= 10 % of LOD0 verts, same slots subset
#mesh ICS_<Name> collider ... #end    // coarse boxes/prisms, <= 1000 verts
```
Placement by Management only: `object ICS_<Name> { model = "mesh.ICS_<Name>" position = (0, 0, 0) collision = mesh }`.
`#meshpart` names must start with the component prefix (SITE_, MALL_, RIV_, CROWN_, MAG_, MO_).

## 3. Material palette (library textures only — no new `#texture`, no new `material` blocks)
| Slot | Library source | Use |
|---|---|---|
| ICS_Gold | NaturalBrushedMetal (library) tinted champagne | tower fins, frames, canopies |
| ICS_GoldRoof | NaturalBrushedMetal, richer gold | crown rim, gold accents |
| ICS_GoldPanel | NaturalBrushedMetal, satin bronze-gold | MO podium box, spandrels |
| ICS_White | NaturalPlaster (library) | white pleated facade, soffits, roof canopy |
| ICS_DarkMetal | CMPlastic (library) | mullions, handrails, posts |
| ICS_Concrete | Concrete (library) | structure, embankment, pier hulls |
| ICS_Paving | PlazaTile (library), 2.4 m tile | plaza, promenade, roof terraces |
| ICS_TowerGlass / ICS_TowerGlass2 | built-in InteriorRooms + interior_window_pbr | tower curtain walls (lit rooms at dusk) |
| ICS_MallGlass | built-in InteriorOffice + interior_window_pbr | mall curtain walls |
| ICS_SolidGlass | built-in Glass, blue-grey | opaque glazing, fins |
| ICS_Balustrade | built-in GlassTransparent, teal | balustrades, canopies (real geometry behind only) |
| ICS_ShopLit | built-in Glass, warm emissive 0.6 | lit shopfronts |
| ICS_WarmLight | built-in MetalDetail, warm emissive 1.2 | small light strips/coves |
| ICS_SignWhite / ICS_SignRed | built-in MetalDetail emissive | ICONSIAM / Siam Takashimaya lettering |
| ICS_Deck | built-in WoodDark | pier decks, boardwalk |
| ICS_Foliage | built-in Foliage | planters, lawns, tree canopies |
| ICS_Asphalt | built-in Asphalt | Charoen Nakhon Road |
| ICS_Water | built-in Water | fountain basin, pool |

## 4. Components and crews (Subcontractors & Labor)
| Mesh | Crew | Scope |
|---|---|---|
| ICS_Site | Site crew | ground slab + river embankment, River Park plaza, fountain basin, circular planters, lawns/trees, promenade railing, 4 piers + gangways + shelters, Charoen Nakhon Rd strip |
| ICS_MallMain | Main-block crew | Z4 main block to 58 m, white pleated facade (S/W/N + rounded SW corner), glass east face with floor bands, ICONSIAM + Siam Takashimaya signs, roof |
| ICS_MallRiverfront | Riverfront crew | Z1 riverside podium (20 m, pleated "krathong" glass front + 24 m glass swords, lit luxury shopfronts, SE curved glass drum, NE lobe), Z2/Z3 stepped terraces with curved balconies and teal glass balustrades, roof gardens |
| ICS_Crown | Crown crew | gold oval/boat-shaped crown on the Z4 roof (58 → 75 m), white ribbed canopy, river-facing prow with triangular glass facade |
| ICS_TowerMagnolias | South-tower crew | Magnolias Waterfront Residences: podium 27 m, 70 floors, roof 281 m, arch. top 315 m, tip 317.95 m |
| ICS_TowerMandarin | North-tower crew | Residences at Mandarin Oriental: golden podium box (~20–24 m) with roof garden/pool, 52 floors, roof 232 m, arch. top 268.7 m, tip 272.2 m |

Management decisions overriding the dossier where the photos disagree:
- Tower plates: Photo A shows each tower ~65–75 m wide seen from the river (height/width ≈ 3.7–4 for Magnolias to its 281 m roof). The dossier's slender 48×32 m INFERRED shafts are too thin; build the towers on their OSM outlines (`MAG_FP`, `MO_FP`) inset ~2–5 m, with balconies/fins out to the outline.
- Mall roof 58 m and crown top 75 m (photo ratio check suggests the white block and crown are taller than 58 m; crown crew calibrates against Photos A/B).
- Site datum: plaza z = 0, water z = -200; floating pier decks z ≈ -150.

## 5. Teams and gates
1. Management — this brief, integration, final acceptance, delivery.
2. Engineering & Technical — infrastructure correctness: coordinates vs defs, heights, template, budgets, LOD/collider, closed/non-floating geometry, no z-fighting, palette-only materials, bake warnings.
3. Site Operation — conformance to this brief and the site plan: every scope item present, in the right place and orientation, nothing outside scope.
4. QC/QA — visual quality vs Photos A/B: silhouette, proportions, identity details, materials, AAA finish; finds defects and anything that should not be there. **Rejects and sends back** until the target is met.
5. Document Control — dossier, footprints, references (done, rev A).
6. Subcontractors & Labor — the six crews above; build only in `iconsiam/src/<Mesh>.weave`, preview with `preview_mesh(source: …)`, never edit the shared world.

Acceptance: a component passes only when Engineering, Site Operation and QC/QA all accept (max 3 rework rounds per component; anything left open is logged, not hidden).

## 6. Management directives — rev B (binding for all rework rounds and reviews)
Issued after the first in-engine integration of all six first drafts (full complex staged at (0,0,0), dusk lighting).
- **D1 Circular planters (scope ruling):** the row of circular planters in Photo B sits on the riverside podium roof deck, so it belongs to **ICS_MallRiverfront** (Z1 roof garden). **ICS_Site must not build anything on top of or inside any building footprint (MALL_FP, MAG_FP, MO_FP)**; the Site crew keeps only ground-level (z ≈ 0) landscaping, plaza, promenade, basin, piers and road. Riverfront keeps one clean planter row; reviewers must not ask both crews to delete it.
- **D2 Ground materials (in-scene finding):** from above, ICS_Concrete over the large land slab reads almost black and dominates Photo B's viewpoint. Site: plaza, promenade and the tower-plot hardscape → ICS_Paving; lawns/beds → ICS_Foliage; ICS_Concrete only for the embankment wall, kerbs and pier hulls; roads ICS_Asphalt. Pier pontoon decks may use ICS_Concrete/ICS_White (the real pontoons read light grey/white with white roofs); keep ICS_Deck for boardwalk strips only.
- **D3 White pleated block (in-scene finding):** in-engine it reads as a plain box with thin stripes. Photos A/B show deep, bold folded bands (each fold projecting ~1.5–3 m), sweeping diagonally on the river-facing end, a rounded SW corner, and warm light lines in the folds. Make the folds read at 300 m distance.
- **D4 Crown (in-scene finding):** in-engine it reads as a flat low dish. Photo A shows a gold rim that sweeps up to a high, sharp east prow (top ≈ 75 m) with the triangular lit glass face below it; Photo B shows a big elliptical gold-rimmed drum. The silhouette must be legible from across the river.
- **D5 Interfaces:** Z1 roof (z = 20 m) and everything above Z1/Z2/Z3 footprints = Riverfront; Z4 incl. its roof = MallMain (except the crown); crown sits on the Z4 roof; towers own everything inside MAG_FP/MO_FP. Neighbouring crews must not duplicate geometry across these lines.
- **D6 Towers vs Photo A:** keep the visible sky gap between the two towers seen from the river (Photo A); in-engine the OSM-outline massing already gives the right height/width ratio for Magnolias — do not make the shafts wider than their OSM outlines.
- **D7 Tower sign-offs (after both tower crews were accepted):** Magnolias uses the true 70-floor pitch (FH = MAG_FLOOR_H = 4.0 m; palette ICS_TowerGlass roomH = 4.0); Mandarin Oriental palette ICS_TowerGlass2 roomH = 4.3, roomOffsetZ = 2.5. The 65–75 m width reading of rev A is withdrawn: Photo A is horizontally stretched; accepted plates are ~54 m (Magnolias) and ~51 m (MO) wide as seen from the river, with a ~17 m sky gap. MO south-west block roof 248 m (outside dossier C5) is approved because QC matched it to Photo A. The Magnolias podium pool belongs to ICS_TowerMagnolias.
