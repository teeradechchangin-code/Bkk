# State Tower (lebua): Master Brief (Management, rev A)

**Project:** real-scale State Tower (lebua at State Tower, Silom/Charoen Krung, Bangkok) as Oriverse `#mesh` DSL. It is placed at world (0,0,0) and uses only Oriverse-library materials.

**Scope:**
- **The building only**: podium with corner portal, tower, crown and dome. No neighbouring buildings and no city.
- **Atmosphere of client photo 1** (night): deep-blue sky, lit windows, the gold dome glowing, a blue LED ring and a violet-blue floodlit upper face.

**Inputs:**
- Document Control dossier `docs/DOSSIER.md` (ST-DC-DOSSIER-001 rev A). It includes the OSM building:part outlines, heights and fitted cameras.
- Shared constants `src/ST_defs.weave` (`#meshdefs`). They are already staged in the world.
- Shared facade kit `src/ST_kit.weave` (`#meshpart ST_KIT_BalconyFace`). It is already staged in the world.
- Client photos, stored as engine references `night`, `day`, `street` and `crown`. **The photos win over prose.**

| Engine reference | File | Content |
|---|---|---|
| `night` | `reference/ref1_night.jpg` | **Photo 1, the target.** Night telephoto from the NW: west face, stepped wing with pediments at left, dome on top. |
| `day` | `reference/ref2_day_aerial.jpg` | Photo 2. Day aerial from the NW: same face, portal at bottom-left. |
| `street` | `reference/ref3_street.jpg` | Photo 3. Street view of the corner portal and podium. |
| `crown` | `reference/ref4_crown_drone.jpg` | Photo 4. Dusk drone shot of the dome, drum, terrace and round Sky Bar. |

## 1. Frame (controlled)

- World centimetres, Z up, +X east, +Y true north.
- Origin (0,0,0) is the Google Maps pin 13.7214837 N, 100.5168931 E. It falls on the junction of the main block and the north strip.
- Grade z = 0.
- Every outline and height comes from `#meshdefs`. Never re-type a footprint; derive from the defs names.
- **West face:** one straight 80.9 m face from `WEST_SW` along `WEST_DIR`, outward `WEST_OUT`, toward the river. Photos 1 and 2 look at it from the NW.
  - Feature positions are given as `u` = cm along `WEST_DIR` from `WEST_SW`.

| u (cm) | Part |
|---|---|
| 0 – 4420 | Main block |
| 4420 – 4870 | North strip |
| 4870 – 6048 | Wing 170 |
| 6048 – 6317 | Wing 160 |
| 6317 – 8093 | Wing 150 |

## 2. Mesh template (every component)

```
#mesh ST_<Name>
budget(verts: 250000, indices: 750000);
sim_box(min: (-9000, -9000, 0), max: (9000, 9000, <top cm>));
anchor(mode: "origin");
...   // geometry authored directly in WORLD coordinates from #meshdefs
#end
#mesh ST_<Name> lod: 1 ... #end     // simple massing, <= 10 % of LOD0 verts, slots a subset of LOD0
#mesh ST_<Name> collider ... #end   // coarse boxes/prisms, <= 1000 verts
```

- Management places it: `object ST_<Name> { model = "mesh.ST_<Name>" position = (0, 0, 0) collision = mesh }`.
- Crew `#meshpart` names start with the component prefix (`POD_`, `MAIN_`, `WING_`, `CROWN_`).
- `ST_KIT_*` parts belong to Management. Call them; never copy or edit them.
- Preview without touching the world: `preview_mesh(source: <your whole file>, name: "ST_<Name>", ...)`. The world's `#meshdefs` and `ST_KIT_*` parts resolve inside inline previews.

## 3. Material palette (library textures only: no new `#texture`, no new `material` blocks)

Slots resolve in the world (`world/00_base.weave`). The base textures were imported from the Oriverse library (`import_material_asset`) or are engine built-ins.

| Slot | Library source | Use |
|---|---|---|
| ST_Facade | FacadeFinePlaster (library), cream tint | Balcony bands, fins, cornices, white tower surfaces |
| ST_FacadeShade | FacadeFinePlaster, darker cream | Soffits, recess returns, shadowed reveals |
| ST_Stone | FacadeFinePlaster, light stone | Podium and portal columns, pilasters, pediments, balustrades |
| ST_Gold | NaturalBrushedMetal (library), gold, metallic | Dome, finial, medallion star, gold trims |
| ST_DarkGlass | Built-in Glass, near-black navy | Dark recessed glass strips and slots |
| ST_Rooms | Built-in InteriorRooms + `interior_window_pbr` (lit rooms at night) | Tower window walls behind the balconies |
| ST_PodiumRooms | Built-in InteriorOffice + `interior_window_pbr` | Podium windows, portal glazing |
| ST_DrumGlass | Built-in InteriorOffice + `interior_window_pbr`, warm | Drum glazing behind the colonnade (Mezzaluna) |
| ST_DarkMetal | CMPlastic dark (library) | Railings, mullions, handrails |
| ST_Concrete | Concrete (library) | Roof slabs, plant, undersides |
| ST_BlueLED | Built-in MetalDetail, blue emissive | **Small fixtures only:** LED ring under the dome, Sky Bar bar ring, pediment emblem |
| ST_WarmLight | Built-in MetalDetail, warm emissive | **Small fixtures only:** cove strips, terrace lamp heads |

- The CPU preview cannot draw `interior_window_pbr`. ST_Rooms, ST_PodiumRooms and ST_DrumGlass show magenta / "appearance_errors" there; that is expected and not a defect.
- **Emissive slots never cover glazing or large surfaces.** Floodlighting of the dome and facades comes from Management's engine lights (`world/10_lights.weave`). Crews do not add lights, except the Crown crew, which may use up to 8 `emitter(...)` sockets for the drum glow.

## 4. Components and crews (Subcontractors & Labor)

| Mesh | Crew | Top (cm) | Scope |
|---|---|---|---|
| ST_Podium | Podium crew | 6000 | `PODIUM_FP` 0 → 50 m and the corner portal at the north neck |
| ST_TowerMain | Main-block crew | 22000 | `MAIN_FP` 50 → 216 m and `STRIP210_FP` 50 → 210 m, roofs, parapets, dark strips |
| ST_TowerWing | Wing crew | 19000 | `WING170_FP`, `WING160_FP` and `WING150_FP` with their pediments, roofs and the lower dark slot |
| ST_Crown | Crown crew | 25000 | Dome terrace (`ROOFDECK_FP` 216 → 220 m), Sky Bar platform, colonnaded drum, LED band, gold dome, lantern and finial |

**Interfaces:**
- **Podium / tower parts:** the podium owns everything up to z = 50 m. The tower parts start at z = 50 m on the podium roof and embed 2 cm (z0 = 4998).
- **Main / wing:** ST_TowerMain owns the north strip. ST_TowerWing starts at its north face, the line (1253,21)–(-1970,1376) etc. per the defs, with no overlap.
- **Main roof / crown:** ST_TowerMain owns the main roof slab at 216 m and its edge parapets outside `ROOFDECK_FP`. ST_Crown owns everything inside and above `ROOFDECK_FP` from 216 m up, plus the Sky Bar.

## 5. Teams and gates

1. **Management:** this brief, the world shell (palette, night lighting, engine lights, cameras), integration, final acceptance and delivery.
2. **Engineering & Technical:** infrastructure correctness. Covers:
   - coordinates vs defs, heights and the template
   - budgets, LOD and collider
   - closed, non-floating geometry with no z-fighting (≥ 5 cm between coplanar faces)
   - palette-only materials and bake warnings
3. **Site Operation:** conformance to this brief, the dossier and the work order. Every scope item must be present, in the right place and orientation, with nothing outside scope and clean interfaces.
4. **QC/QA:** visual quality vs photos 1–4 (photo 1 is the target). Checks silhouette, proportions, rhythm, identity details, materials and AAA finish. Finds defects and anything that should not be there. **Rejects and sends back** until the target is met.
5. **Document Control:** dossier, OSM outlines, references, fitted cameras. Done, rev A.
6. **Subcontractors & Labor:** the four crews above. They build only in `statetower/src/ST_<Mesh>.weave`, preview with `preview_mesh(source: …)`, and never edit the shared world.

**Acceptance:**
- A component passes only when Engineering, Site Operation and QC/QA all accept, with no blocker and no major finding.
- After 3 rework rounds, open items go to Management, which rules, fixes or carries them into scene QC. They are logged, not hidden.
- Then **scene QC** in the engine at CAM_NIGHT / CAM_DAY (dossier §3) against `night` / `day`. The loop continues until QC/QA accepts.

## 6. Management log: component acceptance and rulings

**ST_TowerWing: ACCEPTED in round 1.** Engineering, Site Operation and QC/QA all accepted.
- Budget:

  | Variant | Verts |
  |---|---|
  | LOD0 | 59,262 |
  | LOD1 | 4,570 |
  | Collider | 294 |

- **D1 (ruling on crew deviations).** The crew measured photos 1 and 2 through the fitted cameras. The 1.6× foreshortening difference between the two photos shows that the three neoclassical pediments face **north**, not west. Management accepts this:
  - The pediments face north.
  - Pediment apexes are 164.7 / 174.3 / 187.0 m; PED_H is superseded for the wing.
  - The top attic of wing 170 has balcony-bay sides up to a 180 m cornice.
- The crew declared its photo constants locally in `WING_Pavilions`.
- The north strip's north facade between 167.5 m and 180 m is hidden behind the top attic. This is accepted as an interface: no overlap, so no change is required of the main crew.

**D2: #meshdefs rev B (Crown QC/QA round 2, findings routed to Management).** QC/QA measured photos 1 and 2 using the drum cornice as the scale. The dome is 9.4 m tall (H/W 0.33), not 12 m. The LED band is ~2.5 m. The lantern + finial is ~5 m.

| Constant | Old | New |
|---|---|---|
| LED_BAND_TOP | 23250 | **23300** |
| DOME_TOP | 24450 | **24240** |
| SKYBAR_C | (-2350,1150) | **(-2232,1012)** |
| SKYBAR_R | 750 | **460** |

- The tip stays at 247.2 m.
- Photo 4 shows the Sky Bar platform about as wide as the 8.7 m upper slot it sits above. Photo 1's rim is 7.3–8 m.
- Applied to `src/ST_defs.weave` and the staged world. Crews re-derive from the defs; no local overrides.
- ST_TowerMain's roof balustrade follows SKYBAR_R automatically.

**ST_TowerMain: ACCEPTED in round 2.**

| Variant | Verts |
|---|---|
| LOD0 | 110,408 |
| LOD1 | 3,728 |
| Collider | 188 |

**D3: #meshdefs rev C and rulings on the main crew's requests.**
- **Upper slot (accepted).** The main crew counted 8 bay columns between the SW strip and the upper slot in photos 1 and 2. The slot now runs from u 3617 to 4447 and from 177.9 m up. A white cap band sits at the strip-roof floor line, with a dark top storey and a white post above it. The white pilaster is at u 4032.
  - Constants: UPPER_SLOT_U0 3617, UPPER_SLOT_U1 4447, UPPER_SLOT_Z0 17790.
- **Sky Bar re-centred.** Photos 1 and 4 show the Sky Bar rim capping the slot pilaster, with the platform as wide as the slot. SKYBAR_C moves to **(-2391, 642)**: u 4032, 1 m proud of the west face. The R 460 disc then spans the 8.3 m slot.
  - ST_TowerMain's roof balustrade cut-out and ST_Crown's Sky Bar both re-derive from SKYBAR_C.
- **NE strip-corner dark glass (accepted).** Photo 1 shows the band dark from 50 to 210 m directly under the strip ring. Dossier section 4 is amended.
- **Embeds (accepted).**
  - Kit datums and glazing at 4982–4994 sit inside ST_Podium's solid plinth.
  - The main crew's w_wb tail is 11 cm inside WING170_FP, behind the junction fins.
  - Neither is visible.

**ST_Crown: ESCALATED after 3 rounds (round 3: QC/QA, Engineering and Site Operation all rejected, 4/10).** Management's own D3 re-centring of the Sky Bar made the crew's stair-head derivation degenerate. The stair axis became nearly parallel to the terrace edge v17→v16 (wp ≈ −0.13). Under rev C the collider polygon self-intersects (compile blocker), and stray cheek and landing geometry appears.

**D4: Crown rulings, then continued rework (rounds 4–5).**
- **(a) Colonnade height (QC r3 major).**
  - DRUM_BASE stays 22000: the OSM dome part starts at 220 m on the 216–220 m terrace storey (sourced).
  - The entablature becomes a **fixed ~270 cm** (photo 1: 11 px). It is decoupled from the drum height, so the columns gain ~30 cm.
  - The remaining ~1 m by which photo 1's colonnade reads taller is a **logged deviation**. Photo 1's "foot" reading includes the terrace balustrade band below the column bases.
- **(b) Crown accepted deviations.** rc = DRUM_R − 110 is accepted. ent_h becomes the fixed value in (a).
- **(c) Robustness requirement.** The Sky Bar stays centred on the slot pilaster (D3). ST_Crown must bake cleanly and look right for any SKYBAR_C within 3 m of the defs value:
  - Guard terrace edges near-parallel to the stair axis (|w| < 0.35).
  - Clamp gaps, cheek starts and landing apexes to their edges.
  - Build the collider edge barrier from per-run boxes, never from one concatenated polygon.
  - Never extrapolate past the adjacent ROOFDECK_FP vertices.
- **(d) Interface rules.**
  - ST_TowerMain builds nothing above MAIN_ROOF:
    - inside ROOFDECK_FP;
    - within SKYBAR_R + 10 of SKYBAR_C;
    - inside the Crown's stair corridor (a ≤ 4 m band from the nearest ROOFDECK_FP vertex to the Sky Bar circle, over the main roof slab).
  - The Sky Bar soffit exists only outside offset(MAIN_FP, −60), plus under the cantilever and inside the main cornice-ring band.
  - ST_TowerMain's slot post and top storey are capped by its own ring and slab, independent of the Crown.

**D5: Client time-box (client instruction): 3 hours from about 07:52 UTC; deliver what is done.**
- **Until ~09:50 UTC:** crews and reviewers continue (Podium round 2/3, Crown rounds 4/5).
- **~09:50 UTC:** Management takes the best current file of every component, accepted or not.
- **~09:50 – 10:40 UTC:** final integration at (0,0,0), scene QC against photo 1 (CAM_NIGHT) and photo 2, Management lighting fixes, `submit_pending_world` to the client's editor, final commit and push.
- Open findings are logged in this brief, not hidden.
