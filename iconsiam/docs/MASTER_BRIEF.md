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
| ICS_ShopLit | built-in InteriorOffice + interior_window_pbr, warm tint, roomH 6.5, **no emission** (D9) | ground-floor shopfronts, lobbies, crown drum glazing |
| ICS_WarmLight | built-in MetalDetail, warm emissive 1.2 | small light fixtures only: thin strips/coves/lamp heads (D9: never as glazing or large panels) |
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
- **D8 Crown placement (MallMain accepted r3; SiteOps/QC finding):** the crown draft sits ~11 m too far south. The prow tip and the crown stem must sit near y = -15 … -20.5 m (river-facing prow above the ICONSIAM river logo at y ≈ -15 m), keep the stem back face ≥ 50 cm clear of MallMain's river-logo strip (MallMain occupies a 0.75 m strip east of u = 40 above 41.7 m), stay inside Z4_FP and sit on the Z4 roof (58 m) without floating or burying. Integration note: the user's locked `grid` object was lowered 10 cm (top z = -10) so it no longer z-fights with the plaza slab.

## 7. Crew phase close-out → scene QC (Management, rev C)
Accepted by Engineering + Site Operation + QC/QA: ICS_Site (r2), ICS_MallMain (r3), ICS_TowerMagnolias (r2), ICS_TowerMandarin (r2).
Escalated after 3 rounds (carried into scene QC):
- **ICS_Crown** — placement fixed by Management (CROWN_C rev B = (-750,-2250); MallMain STEM_Y = -1906). Still open: QC major "prow composition vs Photo A" (raise the Wisdom Hall triangle ~4.5 m: sill ~56 m, apex ~71 m; rim band on the flanks ~1.6x too deep; bolder primary fin rhythm; LOD1 drum should stay ShopLit) and the engine lint W_LOFT_WINDING on the rim lofts (verify face orientation; earlier rounds found inside-out rims).
- **ICS_MallRiverfront** — QC 8 and SiteOps 8.5 accepted r3; Engineering major still open: the Z2 south-tongue corner Z2_FP[0] (7460,-9820) cuts through the teal balustrade/upstand/handrail at 25.5 m and 31 m (sweep rail/hand/upst/cove directly along the hull stations instead of resample_path spacing 250); minors: grade coplanar posts (start z -5), k=4 member ends inside MallMain's 0.75 m strip east of u=40.
Management allowances (rulings): thin projections (canopies, fins, copings) may extend up to ±2 m beyond the #meshdefs outlines; the crown bow zone (u 40–41 m east of the Z4 river face, z ≥ 50.4 m, within the bow span) is approved; LOD1 switch distance must be beyond the Photo A viewpoint (~350 m).

## 8. Client directive D9 — no glowing glass (Management, rev D, binding for scene QC)
The client reviewed the dusk screenshots: the ground-floor glass glowed unnaturally. Ruling:
- **D9 Glazing is ordinary glass.** ICS_ShopLit is now the same non-emissive interior-window glass as the upper floors (palette change done by Management in world/00_base.weave). No crew may use an emissive material (ICS_WarmLight, ICS_SignRed/White) as glazing, glass panels or large surfaces; emissive stays only on small fixtures (cove strips, lamp heads, signage letters). Reviewers must not ask for "emissive shopfronts" — the warm dusk glow of the shopfronts is lit by real engine lights.
- **Engine lights are Management-owned.** `world/10_lights.weave` (generated by `tools/gen_lights.py`, appended by `tools/assemble_world.py`) holds the warm `pointLight`s in front of the Z1 river and north shopfronts (z 4.5 m, 3 m outside the Z1 outline, ~11 m pitch). Crews must not add lights inside their #mesh files; findings about shopfront brightness are routed to WORLD_LIGHTING and fixed by tuning that file / the generator.
- **D10 Tower glass palette (scene QC r1, QC-A + QC-B majors):** both towers read copper/orange; the photos show blue-grey glass with gold only on vertical blades/edges. Management changed ICS_TowerGlass and ICS_TowerGlass2 to tint #8E9CAA, glassTint #2C4256 (roomH/offsets unchanged). Tower crews keep ICS_Gold for spine blades, edge fins, mast/crown and the podium only.
- **D11 Context ground (scene QC r1, SiteOps major + QC minors, "island" look):** ICS_Site may add ONE cheap context ground apron outside SITE_A_FP/TOWER_PLOT_FP (single extrude per side, top z = 0, ICS_Foliage/ICS_Asphalt, no detail, same quad in LOD1 and the collider) out to about x = -600 m and y = +/-500 m on the site (west) bank only, following BANK_LINE extended north/south along the OSM riverbank. Do not build anything east of the river edge (the Photo A camera stands on the water/far side). Keep it inside the template sim_box (raise the budget only as needed).
- **D12 Rulings on scene QC r1 escalations:** (a) CROWN_TOP raised 75.0 -> 77.0 m (#meshdefs rev C). The Crown crew showed the stern rim needs ~76 m to clear MallMain's white parapet from camera A, and both photos read taller than the dossier's low-confidence 75 m. Only ICS_Crown derives from CROWN_TOP. (b) MallMain fold direction: the photos win, so every band keeps the same fold direction (no alternating bands); reviewers must not ask for alternation again. (c) D9 holds: Riverfront correctly declined emissive glazing; shopfront brightness belongs to world/10_lights.weave and the #adjuster.

## 9. Management rev E — scene QC round 2 rulings (D13)
Palette / lights / scope items routed to Management by QC-A and QC-B r2; already applied in world/00_base.weave and tools/gen_lights.py:
- **Palette:** ICS_Paving tint #B0C0E0 (neutralises the beige base to grey) (light grey, was terracotta at dusk); ICS_Water tint #2A3242 (dark basin); ICS_Balustrade tint #6F8E8C (less cyan); ICS_GoldRoof brightened (#E8C878, metallic 0.6, roughness 0.28) for the crown rim; towers ICS_TowerGlass/2 tint (= mullion/spandrel frame colour in interior_window_pbr) #4A5058 and glassTint #1E2833 so both read as a matched dark navy pair; ICS_MallGlass glassTint #4E4A3E and ICS_ShopLit glassTint #5E5240 so lit rooms read amber. Note for reviewers: in interior_window_pbr `tint` is the FRAME colour, not the room colour; warm frames make the towers copper again (D10).
- **Engine lights (D9 rows, 59 pointLights, no shadows):** shopfronts intensity 40 -> 70; new warm rows under the Z1 roof edge (z 18.5 m), Z2 (35 m) and Z3 (40.5 m) river faces every 15 m; 6 lights 1.5 m outside the crown rim's river half at z = CROWN_TOP - 6.5 m; 6 lights in front of the MO gold podium box (SE/NE faces, z 9 m). White-block uplights were declined: point/spot falloff cannot wash a 58 m wall without hot spots at the base; the fold WarmLight lines and the darker fog/ground handle the lilac cast.
- **Crown:** the crew may use ICS_GoldRoof (existing slot, now brightened) on the rim band, soffit and canopy-ring fascias. Do not change CROWN_TOP or the rim depth again (D12).
- **Site sim_box exception (D11 conflict):** ICS_Site alone may use sim_box min (-60000,-50000,-600) max (24000,50000,1400) for the plain context apron (single extrudes, top z 0, west bank only, same quads in LOD1 and the collider, nothing east of the river edge).
- **Camera A2 adopted** for Photo A reviews (fitted vantage, Photo A is stretched): pos [24811,-11401,400] look_at [-9270,21179,16400] fov 71. Keep camera A for distance/LOD checks. Camera B-refined adopted for Photo B: pos [18500,-16500,10000] look_at [2000,3500,2000] fov 55.
- **Sky:** SetSkyboxStarIntensity = 0 is Management's (already in the #adjuster); the WORLD_LIGHTING crew owns the rest of the #adjuster (fog/ground colour, haze, exposure, sun disc).
- **D14 Site size limit (Management integration check after Site r2):** the engine clamps a static-collidable object to 500 m per axis; the D13 Site box (1200 x 1000 m) squashed the whole ICS_Site mesh into 500 x 500 m. D13's Site sim_box exception is WITHDRAWN: ICS_Site stays inside sim_box (-24000,-24000,0)..(24000,24000,1600) (Management clipped BANK_S/BANK_N/BANK_SC/BANK_NC, XW/YS/YN and the road RA back to +/-240 m; every other Site r2 fix is kept). The context land beyond +/-240 m is Management-owned: `world/20_context.weave` (8 cube tiles <= 500 m, ICS_Foliage, top z -3, east edges stepped along the OSM bank), appended by assemble_world.py. No crew may build a mesh larger than 480 m per axis.
- **D15 Scene QC r3 close-out (time-boxed by the client: deliver what is done):** r3 verdicts QC-A reject 7.1, QC-B accept 7.5, ENG accept 8.5, SiteOps accept 8.5. Management applied the quick world-level fixes before delivery: calm darker river (reflection 0.5, amplitude 1.2 cm, steepness 0.1, wavelength 25 m), brighter blue-hour sky (skybox exposure 1.1, saturation 1.2), SetExposure 0.25, neutral sky light #b6bccc, sun rotation 195, haze 0.6, tower glassTint #2A3848, crown rim wash lights (8) and brighter/higher MO box lights; context tiles stepped along the OSM bank with no seam notch, and Charoen Nakhon Rd continued as asphalt strips. Open crew items carried forward (not done): MallMain diagonal fold taper and white roof deck/canopy, Crown two-tier gold cap, Riverfront extra terrace tiers, MO spine-blade balcony ticks and Gold box faces, Site light pontoon decks, LibPlaster/LibConcrete 1024 -> 512 for web texture headroom.

