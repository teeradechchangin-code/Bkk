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
