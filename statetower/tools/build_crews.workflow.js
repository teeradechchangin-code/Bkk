export const meta = {
  name: 'statetower-crew',
  description: 'One State Tower subcontractor crew builds its #mesh component; Engineering, Site Operation and QC/QA review it and reject/rework up to 3 rounds',
  phases: [
    { title: 'Build', detail: 'crew authors its #mesh file' },
    { title: 'Review', detail: 'Engineering, Site Operation, QC/QA verdicts' },
    { title: 'Rework', detail: 'crew fixes rejected findings' },
  ],
}

const AGENT = 'aeec3830-98d7-4e1e-a906-1ad73f14a9e0'
const REPO = '/home/user/Bkk/statetower'
const SCRATCH = '/tmp/claude-0/-home-user-Bkk/a174dd39-5082-55b6-a22d-2d5e931b17bd/scratchpad/crews'
const MAX_ROUNDS = 3

const COMMON = `PROJECT: real-scale State Tower (lebua at State Tower, Silom / Charoen Krung, Bangkok) in the Oriverse engine as #mesh DSL, placed at world (0,0,0), ONLY Oriverse-library materials, night atmosphere of client photo 1. Building only (no neighbours).
READ FIRST (all teams): ${REPO}/docs/MASTER_BRIEF.md (Management brief - controlling: frame, template, palette, interfaces, gates), ${REPO}/src/ST_defs.weave (the shared #meshdefs already staged in the world: every footprint/height/constant you need - use the names, never re-type numbers), ${REPO}/src/ST_kit.weave (Management's facade kit #meshpart ST_KIT_BalconyFace, already staged in the world: call it, never copy or edit it), ${REPO}/docs/DOSSIER.md (Document Control dossier: OSM parts, heights, fitted cameras, facade readings).
CLIENT PHOTOS (THE PHOTOS WIN OVER PROSE) - open them with the Read tool; zoom by cropping with python3/PIL and write crops ONLY under ${SCRATCH}/ :
 photo 1 ${REPO}/reference/ref1_night.jpg (TARGET: night telephoto of the WEST face from the NW; stepped wing with pediments at LEFT = north end, dome on top, dark SW corner strip at the RIGHT edge),
 photo 2 ${REPO}/reference/ref2_day_aerial.jpg (day aerial telephoto of the same west face from the NW; corner portal with the medallion at bottom-left, podium colonnade below the tower),
 photo 3 ${REPO}/reference/ref3_street.jpg (street view: corner portal gate tower + podium on Charoen Krung),
 photo 4 ${REPO}/reference/ref4_crown_drone.jpg (dusk drone: gold dome on a white colonnaded drum with cyan/blue lights, terrace with tables, round Sky Bar with a blue ring at the tower corner next to a dark slot with a white pilaster; curved balcony bays on both faces).
Stored engine references for preview_mesh ref / playtest compare_reference: "night" (photo 1), "day" (photo 2), "street" (photo 3), "crown" (photo 4).

ORIVERSE TOOLS: load with ToolSearch, e.g. query "select:mcp__Tee_Oriverse__read_skill,mcp__Tee_Oriverse__preview_mesh,mcp__Tee_Oriverse__inspect_mesh,mcp__Tee_Oriverse__get_load_status". EVERY Oriverse call needs agent = "${AGENT}" exactly. If a call returns status "*_in_progress" with a request_id, poll mcp__Tee_Oriverse__get_load_status(agent, request_id, wait_s: 20). If the Oriverse server is briefly disconnected, wait and retry ToolSearch.
- read_skill: the server may say a skill was "already provided in this session" (another agent read it) - then call it again with force: true. mesh_dsl is the #mesh reference (7 parts: read_skill(name:"mesh_dsl", force:true) then part 2..7). Do not guess builtin names/signatures.
- preview_mesh(agent, source: <the full text of the component file>, name: "<MeshName>", ...) renders CPU contact sheets WITHOUT touching the world; the world's #meshdefs constants and ST_KIT_* parts resolve inside inline sources. Options: views (iso, iso_left, iso_back, iso_back_right, front, right, left, back, top, low), size (up to 512), ref: "night"/"day"/"street"/"crown" (pairs a REF cell), parts_log: true (numeric per-binding AABB table, authored cm), color_by: "part", lods: [0,1], fixed_bounds, figure: false (always false for this building). The views are character-relative under +X facing: "front" looks from +X toward -X (east elevation), "back" from -X (WEST elevation = the photos' face, roughly), "left" from +Y (north), "right" from -Y (south). The photos look from bearing ~310-318 deg (NW) - "iso_back_right"/"iso_back"/"back" and "left" are the closest standard views; use several.
- NOTE: ST_Rooms, ST_PodiumRooms and ST_DrumGlass use the engine shader interior_window_pbr which the CPU preview cannot draw (magenta / appearance_errors) - EXPECTED, judge them as glass (at night in-engine they show lit rooms).
- FORBIDDEN for everyone: any tool that edits the shared world (stage_new_world, patch_*, import_*, submit_*, share_game, publish_game, save_mesh_asset, sync_pending_world_from_current, revert_*, rebase_*), playtest (Management only), generate_image / flipbook / sprite generation, authoring #texture blocks or new material blocks, git commands. Only the palette slot names in MASTER_BRIEF section 3 may appear in material: arguments.

FRAME: world centimetres, Z up, +X east, +Y TRUE north, origin = Google pin. Grade z = 0. The straight 80.9 m WEST face (u = cm along WEST_DIR from WEST_SW): main block u 0-4420 (to 216 m), north strip 4420-4870 (210 m), wing 170 4870-6048, wing 160 6048-6317, wing 150 6317-8093. Podium 0-50 m everywhere below. Tower floor pitch TOWER_FH = 345.83 cm (48 floors 50 -> 216 m).`

const PHOTO_NOTES = `Management's photo reading (verify yourself in the photos; DOSSIER section 4 has positions):
- Tower faces: cream-white; EVERY face is a grid of curved (bowed) balcony bays ~4.2 m wide, one white solid scalloped parapet band per floor (3.46 m pitch), a dark recessed window behind each balcony, thin white vertical dividers between bays (ST_KIT_BalconyFace builds exactly this). At night many rooms are lit warm (interior_window_pbr does this in-engine).
- Dark glass strips/slots: SW corner of the main block (~3 m wide, full height 50-216 m, right edge of photos 1/2); upper slot on the west face u 4000-4870 from ~178 m to the top with a slim WHITE PILASTER up its middle (photos 1, 4); lower slot in wing 150, u 6800-7500 from 50 m to ~148 m (photos 1, 2).
- The north faces above the stepped wing are seen obliquely in photos 1/2 ("upper-left section", floodlit violet-blue at night in photo 1).
- Stepped north wing: three neoclassical pediments (triangular gable over an attic storey with 3-4 tall round-arched windows between pilasters, cornice) at apex heights ~182 / 172 / 162 m stacked at the north-west end; the highest one carries a lit blue circular emblem in its tympanum (photo 1).
- Crown: terrace 216-220 m with white balustrades (Sirocco), round Sky Bar platform with a blue-lit ring at the NW corner, white colonnaded drum (~24 columns) with warm-lit glazing behind, blue LED band at the dome springing, ribbed GOLD dome, small lantern + finial to 247.2 m.
- Podium (photos 2, 3): white neoclassical base: a colonnade/arcade of tall round columns (~2 storeys) along Charoen Krung (west), ~8-9 storeys of tall round-arched windows between pilasters with string courses, a heavy cornice + balustrade at 50 m; the corner PORTAL at the north neck: a square gate tower with a giant round arch through its base, paired columns at its corners, a large circular medallion with the gold State Tower star logo above the arch, an entablature and a triangular pediment on top (~56 m).`

const CREWS = [
  {
    key: 'podium', mesh: 'ST_Podium', prefix: 'POD_', top: 6000,
    scope: `ST_Podium - Podium crew. Build the podium on PODIUM_FP from z = 0 to PODIUM_TOP (50 m) and the corner portal on the north neck (PODIUM_FP vertices (1793,5696) (1027,7757) (-793,7089) (-18,5009)). (1) WEST face on Charoen Krung (edge (-888,4684) -> (-4272,-3265)) and the NORTH faces (both seen in photos 2/3): a monumental base colonnade of tall round white columns (ST_Stone, ~1.2-1.4 m diameter, ~10-12 m tall, ~6 m spacing, with bases and capitals) standing in front of a recessed, darker arcade wall with glazed shopfronts (ST_PodiumRooms) - photo 2 shows ~7-8 columns along the visible length right of the portal; above it ~8-9 storeys of tall round-arched windows (ST_PodiumRooms glazing in white ST_Stone surrounds, use arch_frame or extrude_shape with arched holes, keep it efficient with arrays) grouped in vertical bays between flat pilasters, horizontal string courses every few storeys, and a heavy projecting cornice + balustrade/parapet at 50 m (ST_Facade/ST_Stone). (2) PORTAL: a square gate tower on the neck, top PORTAL_TOP (~56 m, calibrate against photos 2/3): giant round arch passing through its base (photo 3: arch opening ~9-10 m wide, ~20-24 m tall, open so the road/plaza reads through it), paired giant columns/pilasters at its corners, a big circular medallion (~8 m diameter, white disc framed by a moulded ring) above the arch carrying the gold State Tower star-flower logo (ST_Gold, 5-6 rounded petals/star in relief - draw with svg_shape or star_profile; no fake text needed, a few thin bars may suggest the "State Tower Bangkok" lettering), entablature, and a triangular pediment on top. Faces of the portal: at least the north (street corner) and west faces carry the arch + medallion, as in photos 2/3. (3) EAST and SOUTH faces (not in photos): same vocabulary, simpler: pilasters + arched-window grid, no colonnade. (4) Podium roof at 50 m: concrete roof slab (ST_Concrete) with a white parapet; leave the tower footprints clear above 50 m (the tower crews start at z 4998). Do NOT build anything above 50 m except the portal. Collider: PODIUM_FP prism (+ the portal) <= 1000 verts. LOD1: prism + portal block with the same slot subset. Keep LOD0 under ~150k verts.`,
  },
  {
    key: 'main', mesh: 'ST_TowerMain', prefix: 'MAIN_', top: 22000,
    scope: `ST_TowerMain - Main-block crew. Build the MAIN block on MAIN_FP from z 4998 (2 cm into the podium roof) to MAIN_ROOF (216 m) and the NORTH STRIP on STRIP210_FP from z 4998 to STRIP210_TOP (210 m). (1) Solid cores: extrude offset_polygon(footprint, delta: -(BALC_D + 30)) (or similar) so the kit's window walls are the visible skin; close the tops with roof slabs. (2) Facades: call part(ST_KIT_BalconyFace, ax, ay, bx, by, z0: PODIUM_TOP, floors, fh: TOWER_FH) for every exposed straight run, walking each footprint in its CCW order (outside on the right). MAIN_FP runs: west NW->SW, south SW->SE, SE chamfer, east, (north face is covered by the strip up to 210 m; above 210 m the main block's north face is exposed for 1-2 floors - finish it with a kit run or a parapet wall). STRIP210_FP: its west end (u 4420-4870), its north face east part (3439,-897)->(1253,21) full height, and its north face west part (1253,21)->(-1970,1376) ONLY above WING170_TOP (the wing covers it below 170 m); its east end. 48 floors on the main block, 46 on the strip (+ parapet to 210 m). (3) Dark glass: SW corner strip ~STRIP_W wide full height (shorten the west and south runs ~150 cm at the SW corner and fill the recessed corner with ST_DarkGlass set back ~1 m); the upper slot on the west face u UPPER_SLOT_U0..UPPER_SLOT_U1 from UPPER_SLOT_Z0 to the top: ST_DarkGlass recessed ~1 m with a slim white ST_Facade pilaster (~70 cm wide, projecting) up its middle - below UPPER_SLOT_Z0 the balcony bays continue across. Check against photos 1/2/4 and calibrate the slot extents if the photos disagree. (4) Roofs: main roof slab top at 21600 (ST_Concrete) with a white balustrade/parapet (~1.2 m) along the whole main-roof perimeter; the Crown crew builds the dome terrace (ROOFDECK_FP, 216-220 m) ON your slab - do not build inside ROOFDECK_FP above 21600; a few small roof plant boxes on the east part of the main roof are fine. Strip roof at 21000 = a terrace with a white balustrade. (5) Do NOT build the wing (WING*_FP), the podium, or anything of the crown. Collider: core prisms (<= 1000 verts). LOD1: core prisms with ST_Facade + ST_Rooms (<= 10% of LOD0). Keep LOD0 under ~160k verts (the kit is ~35 verts per bay per floor).`,
  },
  {
    key: 'wing', mesh: 'ST_TowerWing', prefix: 'WING_', top: 19000,
    scope: `ST_TowerWing - Wing crew. Build the stepped north wing: WING170_FP from z 4998 to WING170_TOP (170 m), WING160_FP to WING160_TOP (160 m), WING150_FP to WING150_TOP (150 m), each with its pediment ensemble on top. (1) Solid cores: extrude offset_polygon(footprint, delta: -(BALC_D + 30)) per part (or one combined core per height), roofs closed. (2) Facades: part(ST_KIT_BalconyFace, ...) on every exposed straight run (walk each footprint in its CCW order, outside on the right): the collinear west faces (u 4870-6048, 6048-6317, 6317-8093), the faceted north ends, the east sides; where a lower part abuts a taller part, the taller part's face is exposed only ABOVE the lower roof (e.g. WING170 north edge above 160 m, WING160 north edge above 150 m). Edges shared with the main crew's north strip (the line (1253,21)-(-1970,1376)) are internal - do not build there. Floors: (top - PODIUM_TOP) / TOWER_FH rounded down, + parapet. (3) Lower dark slot on the west face u LOWER_SLOT_U0..LOWER_SLOT_U1 from PODIUM_TOP to LOWER_SLOT_Z1: recessed ST_DarkGlass (~1 m back) - the kit run is split around it (photos 1/2 show it continuous to ~148 m). (4) Pediment ensemble (identity detail - photos 1/2): each step roof carries a neoclassical attic storey (~6-8 m) with 3-4 tall round-arched windows (ST_DarkGlass/ST_Rooms in ST_Stone surrounds) between pilasters, a cornice, and a triangular pediment (gable) above with a moulded raking cornice; apex heights ~182 m (on wing 170), ~172 m (on wing 160) and ~162 m (on wing 150) - PED_H = 1200 above each roof. Photos 1/2 show the three gables facing west (toward the NW camera) stacked/staggered at the north-west end; study both photos (crop and zoom!) and reproduce their widths, staggering and silhouette as seen from the NW; add matching gables on the north faces only if the photos support it. The highest pediment's tympanum carries a circular emblem disc (~3 m) in ST_BlueLED (lit blue in photo 1). Roofs: ST_Concrete with white balustrades. (5) Do NOT build the main block, the north strip, the podium or the crown. Collider: core prisms (<= 1000 verts). LOD1: prisms + simple gables (<= 10% of LOD0). Keep LOD0 under ~90k verts.`,
  },
  {
    key: 'crown', mesh: 'ST_Crown', prefix: 'CROWN_', top: 25000,
    scope: `ST_Crown - Crown crew. Build everything on top of the main roof inside ROOFDECK_FP from z 21598 up, plus the Sky Bar: (1) Dome terrace storey ROOFDECK_FP 21598 -> ROOFDECK_TOP (220 m): a 4 m storey (white ST_Facade walls with ST_DrumGlass glazing bands, slightly inset), its roof = the open-air Sirocco terrace at 22000 (ST_Concrete or a pale paving look with ST_FacadeShade) edged by white balustrades (ST_Stone, ~1.1 m, balusters can be suggested by a rail + posts), a few terrace details (tables are optional; keep cheap). (2) Sky Bar (photo 4): a round platform r SKYBAR_R centred at SKYBAR_C, cantilevered off the main block's NW corner at terrace level (~216-220 m), with a glass/metal balustrade (ST_DarkMetal rail, thin), the circular island bar in its middle (counter ring with a thin ST_BlueLED band - photo 4 blue ring), and a short stair/ramp linking it to the terrace; it must visibly attach to the tower (embed 2 cm). (3) Drum (photos 1, 4): circular stylobate on the terrace at DOME_C, a ring of ~24 white classical columns (ST_Stone, base + shaft + capital, ~1.0-1.2 m diameter) at radius ~DRUM_R - 0.6 m, from DRUM_BASE to ~DRUM_TOP - 1.5 m, a glazed cylindrical wall behind them (ST_DrumGlass, r ~DRUM_R - 2.5 m) and an entablature/cornice ring up to DRUM_TOP (overhang to ~DRUM_R + 0.4 m). (4) LED band DRUM_TOP -> LED_BAND_TOP: thin ring of ST_BlueLED panels separated by white mullions (photo 1: blue band of panels at the dome springing). (5) GOLD dome (ST_Gold): lathe_z from r DOME_R at LED_BAND_TOP to the crown DOME_TOP (near-hemispherical, slightly flattened - match photo 1), with ~24-32 subtle meridian ribs (thin gold ribs proud of the shell) - smooth and high-quality silhouette (32-64 segments). (6) Lantern + finial: small gold lantern/drum + spire with an orb, tip exactly DOME_TIP (247.2 m). (7) Lighting: you may add up to 8 emitter(...) sockets (warm interior glow in the drum, uplights grazing the dome) - modest intensities; Management owns all other lights. (8) Do NOT build the main roof slab or its perimeter parapet (main crew), nor anything outside ROOFDECK_FP except the Sky Bar. Collider: terrace prism + drum cylinder (<= 1000 verts). LOD1: terrace + drum + dome (<= 10% of LOD0). Keep LOD0 under ~80k verts.`,
  },
]

const BUILD_SCHEMA = {
  type: 'object',
  properties: {
    mesh_name: { type: 'string' },
    file_path: { type: 'string' },
    verts: { type: 'number' },
    indices: { type: 'number' },
    lod1_verts: { type: 'number' },
    collider_verts: { type: 'number' },
    bounds_cm: { type: 'string', description: 'baked out min/max from parts_log' },
    warnings: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string', description: 'what was built, key dimensions, deviations from the brief and why, how each finding was resolved (rework)' },
  },
  required: ['mesh_name', 'file_path', 'verts', 'indices', 'summary', 'warnings'],
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['accept', 'reject'] },
    score: { type: 'number', description: '0-10' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          issue: { type: 'string' },
          fix: { type: 'string', description: 'concrete, actionable fix (code-level when possible)' },
        },
        required: ['severity', 'issue', 'fix'],
      },
    },
    evidence: { type: 'string', description: 'what you previewed/measured (views, numbers)' },
  },
  required: ['verdict', 'score', 'findings', 'evidence'],
}

const fileOf = c => `${REPO}/src/${c.mesh}.weave`

const builderPrompt = c => `${COMMON}

YOU ARE: SUBCONTRACTORS & LABOR - ${c.mesh} crew. Work systematically, in order, to AAA real-world quality.
${PHOTO_NOTES}

YOUR ASSIGNMENT (Management work order):
${c.scope}

RULES:
- If ${fileOf(c)} already exists (an earlier interrupted attempt), read it and continue/improve it instead of starting blind.
- Write ONLY the file ${fileOf(c)} containing: optional #meshpart blocks (names start with ${c.prefix}), then "#mesh ${c.mesh}", then "#mesh ${c.mesh} lod: 1", then "#mesh ${c.mesh} collider". No #meshdefs, no #texture, no material blocks, no objects, no lights except what your work order allows. Use the shared constants from #meshdefs and the ST_KIT_* parts by name - they are already in the world and visible to your inline previews.
- Template inside "#mesh ${c.mesh}": budget(verts: 250000, indices: 750000); sim_box(min: (-9000, -9000, 0), max: (9000, 9000, ${c.top})); anchor(mode: "origin"); then geometry authored in WORLD coordinates. (sim_box must stay centred on x=0,y=0 with min z 0 so the placement point is the world origin.) Variants (lod/collider) have no sim_box/anchor/budget.
- Workflow: read mesh_dsl fully first (all 7 parts); read the brief, defs, kit and dossier; inspect the photos (Read the jpgs; crop/zoom the regions relevant to your component with python3 PIL into ${SCRATCH}/${c.key}/); block out the primary masses first and check parts_log numbers against the defs; then preview against the references (ref "night" and "day", plus "street"/"crown" where relevant; views e.g. back, iso_back_right, left, iso, top; size 512; figure:false) and compare; fix gross proportion errors before detail; then add the identity details; re-preview after every significant edit; check lods:[0,1] and the collider stats line. Iterate until you would be proud to ship it.
- Avoid z-fighting (keep >= 5 cm between parallel coplanar faces), floating parts (embed 1-2 cm), degenerate/self-intersecting polygons. Stay within the vert budget in your work order.
- Final answer: the structured summary (numbers from your last preview).`

const reworkPrompt = (c, round, findings) => `${COMMON}

YOU ARE: SUBCONTRACTORS & LABOR - ${c.mesh} crew, REWORK round ${round}. QC/QA, Engineering or Site Operation REJECTED the current version of ${fileOf(c)}. Fix EVERY blocker and major finding below (and minors where cheap) by editing that file in place, then re-preview to prove each fix. Do not regress accepted aspects. If a finding contradicts the brief/defs/photos, keep the brief/photos and explain why in your summary.
${PHOTO_NOTES}

ORIGINAL WORK ORDER:
${c.scope}

FINDINGS TO RESOLVE:
${findings}

Same rules as before: only edit ${fileOf(c)}; the template (budget / sim_box centred at 0,0 with min z 0 / anchor origin) must remain; palette-only materials; read mesh_dsl (force:true) before editing; preview with ref "night"/"day" (and "street"/"crown" where relevant), parts_log, lods:[0,1]. Final answer: the structured summary, listing how each finding was resolved.`

const REVIEWERS = [
  {
    key: 'eng', title: 'ENGINEERING & TECHNICAL',
    duty: `You verify the structural/infrastructure correctness of the component: (a) the template (budget, sim_box centred at x=0,y=0 with min z=0, anchor origin) and file conventions (#meshpart prefix, lod: 1 and collider variants present, no #texture/material/#meshdefs/objects); (b) coordinates: run preview_mesh parts_log:true and compare every major binding's bounds with the #meshdefs footprints/heights it should follow (tolerance +/-50 cm in plan, +/-30 cm in height unless the work order allows calibration) - real scale, correct world position and orientation; (c) bake diagnostics/warnings (W_FLOATING_PART, W_DANGLING_END, winding etc. - use preview_mesh diagnostics), closed solids, no z-fighting coplanar faces, no degenerate geometry, kit runs walked in CCW order (balconies face OUTWARD - check a top view or face_orientation shading); (d) budgets: LOD0 verts within the work order, LOD1 <= ~10% of LOD0, collider <= 1000 verts and sensible; (e) ONLY palette material slots (MASTER_BRIEF section 3); emissive slots only on small fixtures. Read mesh_dsl (force:true) as needed for syntax facts. Reject on any blocker/major.`,
  },
  {
    key: 'siteops', title: 'SITE OPERATION',
    duty: `You verify the work follows the plan and the assignment: go through the work order line by line and check each required item exists in the file AND appears in the previews (use a top view against the defs footprints, and parts_log); check positions/extents/heights against #meshdefs and the dossier; check nothing outside the crew's scope was built (owners: podium 0-50 m + portal = ST_Podium; main block + north strip + main roof slab/parapet = ST_TowerMain; wings 170/160/150 + pediments = ST_TowerWing; dome terrace, Sky Bar, drum, dome = ST_Crown) and that this component will interface cleanly with its neighbours (no overlaps into their volumes, 2 cm embeds at shared levels, no gaps at shared edges). Reject if any required item is missing, misplaced, or out of scope.`,
  },
  {
    key: 'qc', title: 'QC/QA',
    duty: `You control quality against the client's photos: preview the component with ref "night" and ref "day" (and "street"/"crown" where they show this component) in several views (back, iso_back_right, left, iso, low; size 512; figure:false), and open the photos directly (crop/zoom the region of this component with python3 PIL into ${SCRATCH}/qc/). Judge silhouette, proportions, rhythm (balcony bays/floors, columns, arches), identity details (curved balcony bands, dark slots and the white pilaster, pediments with arched windows and the blue emblem, colonnade, portal arch + medallion + pediment, colonnaded drum, blue LED band, ribbed gold dome, Sky Bar ring - whatever applies to this component), material assignment/colour realism, and overall AAA finish. Hunt for defects and for anything that should NOT be in the work (stray geometry, wrong-scale items, fake text, clutter, z-fighting, holes, inward-facing balconies). If it is not yet a convincing, recognisable, high-quality match for the photos, REJECT with precise, prioritised, actionable fixes. Be strict but fair: accept only when a client would recognise this part of State Tower.`,
  },
]

const reviewPrompt = (c, r, round, buildSummary) => `${COMMON}

YOU ARE: ${r.title} reviewer for component ${c.mesh} (review round ${round}). You are READ-ONLY: never edit any repo file; never edit the world.
${PHOTO_NOTES}

THE WORK ORDER THE CREW RECEIVED:
${c.scope}

THE CREW'S OWN REPORT:
${buildSummary}

FILE UNDER REVIEW: ${fileOf(c)} (read it; preview it with preview_mesh(source: <file text>, name: "${c.mesh}", ...)).

YOUR DUTY: ${r.duty}

Return the structured verdict. Findings must be concrete and actionable (what, where, by how much, how to fix). verdict "accept" only if there is no blocker and no major finding.`

async function runCrew(c) {
  const history = []
  let report = await agent(builderPrompt(c), { label: `crew:${c.key}:build`, phase: 'Build', schema: BUILD_SCHEMA })
  if (!report) { log(`${c.mesh}: build agent failed`); return { mesh: c.mesh, status: 'build_failed', history } }
  for (let round = 1; round <= MAX_ROUNDS; round++) {
    const summary = JSON.stringify(report)
    const reviews = await parallel(REVIEWERS.map(r => () =>
      agent(reviewPrompt(c, r, round, summary), { label: `${r.key}:${c.key}:r${round}`, phase: 'Review', schema: REVIEW_SCHEMA })
        .then(v => v ? { team: r.key, ...v } : null)))
    const got = reviews.filter(Boolean)
    const rejects = got.filter(v => v.verdict === 'reject')
    history.push({ round, report, reviews: got.map(v => ({ team: v.team, verdict: v.verdict, score: v.score, findings: v.findings })) })
    log(`${c.mesh} round ${round}: ${got.map(v => `${v.team}=${v.verdict}(${v.score})`).join(', ')}`)
    if (got.length === REVIEWERS.length && rejects.length === 0) {
      return { mesh: c.mesh, status: 'accepted', rounds: round, final_report: report, history }
    }
    if (round === MAX_ROUNDS) {
      log(`${c.mesh}: NOT accepted after ${MAX_ROUNDS} rounds - escalating to Management with open findings`)
      return { mesh: c.mesh, status: 'escalated', rounds: round, final_report: report, history }
    }
    const findings = got.flatMap(v => (v.findings || []).map(f => `[${v.team.toUpperCase()} ${f.severity}] ${f.issue} -> FIX: ${f.fix}`)).join('\n')
    const next = await agent(reworkPrompt(c, round, findings), { label: `crew:${c.key}:rework${round}`, phase: 'Rework', schema: BUILD_SCHEMA })
    if (next) report = next
  }
}

const SELECTED = (args && args.crews) ? args.crews : CREWS.map(c => c.key)
log(`crews in this run: ${SELECTED.join(', ')}`)
const results = await pipeline(CREWS.filter(c => SELECTED.includes(c.key)), c => runCrew(c))
return results