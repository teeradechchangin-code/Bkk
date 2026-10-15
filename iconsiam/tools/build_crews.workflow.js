export const meta = {
  name: 'iconsiam-build-crews',
  description: 'Six subcontractor crews build ICONSIAM component meshes; Engineering, Site Ops and QC/QA review each and reject/rework up to 3 rounds',
  phases: [
    { title: 'Build', detail: 'six crews author their #mesh files in parallel' },
    { title: 'Review', detail: 'Engineering, Site Operation, QC/QA verdicts per component' },
    { title: 'Rework', detail: 'crews fix rejected findings' },
  ],
}

const AGENT = '9da9d0fc-b88c-45c4-beb3-beaf229a33ec'
const REPO = '/home/user/Bkk/iconsiam'
const MAX_ROUNDS = 3

const COMMON = `PROJECT: real-scale ICONSIAM (Bangkok) in the Oriverse engine as #mesh DSL, placed at world (0,0,0), ONLY Oriverse-library materials.
READ FIRST (all teams): ${REPO}/docs/MASTER_BRIEF.md (Management brief - controlling), ${REPO}/src/ICS_defs.weave (the shared #meshdefs already staged in the world; every constant/outline you need), ${REPO}/docs/DOSSIER.md (Document Control dossier), ${REPO}/docs/site_plan_revA.png (plan, x=east y=north metres). Client photos (THE PHOTOS WIN OVER PROSE): Photo A ${REPO}/reference/ref_skyline_dusk.jpg (dusk, from across the river, camera on the east bank south-east of the site looking W/NW: mall left, Magnolias tower centre-left (taller), Mandarin Oriental tower centre-right, Millennium Hilton right = NOT ours), Photo B ${REPO}/reference/ref_aerial_river.jpg (aerial at dusk from the south/south-east looking N/NNW, river on the right). Open them with the Read tool; zoom by cropping with python3/PIL and write crops only under /tmp/claude-0/-home-user-Bkk/a1e01ade-9499-5c28-86a2-3f574976f7ec/scratchpad/crews/.

ORIVERSE TOOLS: load with ToolSearch, e.g. query "select:mcp__Tee_Oriverse__read_skill,mcp__Tee_Oriverse__preview_mesh,mcp__Tee_Oriverse__inspect_mesh,mcp__Tee_Oriverse__get_load_status". EVERY Oriverse call needs agent = "${AGENT}" exactly. If a call returns status "discovery_in_progress"/"*_in_progress" with a request_id, poll mcp__Tee_Oriverse__get_load_status(request_id, wait_s: 20).
- read_skill: the server may say a skill was "already provided in this session" (another agent read it) - then call it again with force: true. mesh_dsl is MANDATORY reading before writing or judging #mesh code (7 parts: read_skill(name:"mesh_dsl", force:true) then part 2..7). Do not guess builtin names/signatures.
- preview_mesh(agent, source: <the full text of the component file>, name: "<MeshName>", ...) renders CPU contact sheets without touching the world. Useful options: views (iso, iso_left, iso_back, iso_back_right, front, right, left, back, top, low), size (up to 512), ref: "skyline" or "aerial" (stored copies of Photo A / Photo B) to pair a REF cell, parts_log: true for a numeric per-binding AABB table (authored cm), color_by: "part", lods: [0,1], fixed_bounds, figure: false. In world-sized meshes the 180 cm figure is tiny - set figure:false.
- NOTE: materials ICS_TowerGlass, ICS_TowerGlass2, ICS_MallGlass use the engine shader interior_window_pbr which the CPU preview cannot draw (reported as appearance_errors / may show magenta). That is EXPECTED and not a defect; judge them as glass.
- FORBIDDEN for everyone in this workflow: any tool that edits the shared world (stage_new_world, patch_*, import_*, submit_*, share_game, publish_game, save_mesh_asset, sync_pending_world_from_current, revert_*), generate_image / flipbook / sprite generation, authoring #texture blocks or new material blocks. Only the material slot names in MASTER_BRIEF section 3 may appear in material: arguments.

FRAME: world centimetres, Z up, +X east, +Y north, origin = Google pin inside the mall. Grade z=0, river water z=-200. Mall south, towers north, river east (x ~ +122..+148 m).`

const PHOTO_NOTES = `Management's photo reading (verify yourself in the photos):
Photo A: left = big WHITE block with sweeping folded/pleated bands (warm light in the folds), small white ICONSIAM logo at its top-left and red lettering below it; above the mid-left of the mall a GOLD-rimmed swooping crown that rises from left (west) to a sharp prow on the right (east) with a lit glass facade and white radiating fins under the prow; the main glass block shows lit floors and a white serif ICONSIAM logo on the upper glass face, with stacked terrace bands with greenery stepping down toward the river; a low 2-3 storey riverside podium with gold-lit luxury shopfronts along the water ending (right) in a bright gold-lit glass pavilion; a low GOLDEN box at the base of the right tower; both towers dark blue-grey glass with champagne-gold vertical frames, a central gold vertical spine running up into a thin spire mast, stepped/slanted tops, scattered lit windows.
Photo B: left = very tall white block with horizontal curving folded bands and a rounded corner toward the camera; top-left a big elliptical GOLD-rimmed crown drum with a white canopy and a white sail/prow on its east side; centre = ~5 curving terrace levels with teal glass balustrades, lit restaurants and plants, ICONSIAM logo on the top terrace; lower centre a big curved two-storey glass drum and a long curved gold-lit podium wrapping the plaza; plaza = large paved River Park with a row of ~5 circular planters near the mall, an event stage, a curved promenade, a long dark linear water feature along the river edge, piers with white roofs and floating pontoons; towers behind: Magnolias (left) with a gold vertical band, Mandarin Oriental (right) with a GOLDEN podium box topped by a green roof terrace; trees around the tower bases.`

const CREWS = [
  {
    key: 'site', mesh: 'ICS_Site', prefix: 'SITE_', top: 1200,
    scope: `ICS_Site — Site crew. Build: (1) ground slab: land from x=-20000 east to the river bank (BANK_LINE) for y in [-16190, 19550], top at z=0, bottom at RIVER_BED_Z, with a vertical concrete river embankment wall along BANK_LINE from z=-600 to z=+110 (parapet/railing height) and a dark-metal + teal-glass promenade railing on top; (2) River Park plaza paving over PLAZA_FP (ICS_Paving; keep it flush - slab top at z=0, do not stack coplanar faces; use a 2-5 cm raised paving slab or paint faces), concrete elsewhere; (3) the riverside fountain basin BASIN_FP sunk ~60 cm with ICS_Water surface at -30 and a stone/concrete rim, plus a row of small jet nozzles; (4) the row of ~5 circular planters (6-9 m diameter, 60-80 cm high rims, ICS_Foliage beds, a small tree in each) placed where Photo B shows them, plus lawns/hedge beds and ~25 simple trees (trunk + layered canopy) around the tower plot and along the promenade; (5) the four piers PIER1_FP, PIER2_FP, PIER4_FP, PIER_SMALL_FP as floating pontoon decks (top z=-150, 80 cm thick, ICS_Deck top, ICS_Concrete hull) with sloped gangways from the bank (z=0) to the decks and the two shelter roofs PIER_SHELTER1_FP / PIER_SHELTER2_FP (white roofs ~3.5 m above deck on slim posts); (6) Charoen Nakhon Road: a 4-lane asphalt strip parallel to the mall west facade at x ~ -16000..-12900 (bearing 354 deg, i.e. rotated 3.9-5.5 deg like the mall west edge) with 3 m sidewalks and white lane-marking strips as thin geometry. Collider: the land slab top + pier decks + gangways as coarse boxes/prisms. LOD1: slab + basin + piers only. Keep LOD0 under ~80k verts.`,
  },
  {
    key: 'mallmain', mesh: 'ICS_MallMain', prefix: 'MALL_', top: 6500,
    scope: `ICS_MallMain — Main-block crew. Build the Z4 main block (Z4_FP) from z=0 to Z4_ROOF (58 m) with parapets to WHITE_PARAPET_TOP (62 m) on the white sides. South, west and north faces (and the notch faces near Magnolias): the iconic WHITE PLEATED facade (ICS_White) - stacked horizontal folded bands that bulge outward in a chevron/zigzag section and sweep/curve (study Photo A left and Photo B left closely: count the bands, their tilt and how they wrap a ROUNDED south-west corner), with thin warm light lines (ICS_WarmLight) in the folds; the lowest ~6-8 m can be glazed entrances. East (river) face of Z4 above the terraces (x ~ +38..+46 m, the u=40 line): glass curtain wall ICS_MallGlass with floor slab bands every MALL_FLOOR_UP above a MALL_FLOOR_G ground storey, dark mullions, and the white serif "ICONSIAM" logo (text_mesh, a Google serif font such as font.google.Cinzel, ICS_SignWhite, letters ~3.5-4 m high) facing east at ~z 44-48 m near y -10 m (Photo A shows it centred above the terraces). Also a small "ICONSIAM" logo near the top of the white block's south-west area and red "SIAM TAKASHIMAYA" lettering (ICS_SignRed) below it facing south/south-east as in Photo A. Roof: flat roof with parapet, some plant/MEP boxes (leave the crown area for the crown crew: CROWN_FP region). Do NOT build Z1/Z2/Z3 (riverfront crew) or the crown. Collider: Z4 extrusion. LOD1: Z4 extrusion with white/glass slots. Keep LOD0 under ~120k verts.`,
  },
  {
    key: 'riverfront', mesh: 'ICS_MallRiverfront', prefix: 'RIV_', top: 4800,
    scope: `ICS_MallRiverfront — Riverfront crew. Build Z1 (Z1_FP, riverside podium G/M/1, roof Z1_ROOF 20 m), Z2 (Z2_FP, roof Z2_ROOF 36.5 m) and Z3 (Z3_FP, roof Z3_ROOF 42 m). Z1 river face (the long east perimeter of Z1_FP from (7680,-9800) round to (10980,5100)): the "three glass krathongs" pleated glass front - zig-zag folded clear glass panes (~3.2 m wide, 16 m tall, ICS_SolidGlass / ICS_MallGlass behind) hung from the 20 m roof, with vertical glass fins/"swords" (ICS_SolidGlass, ~1.1 m deep) rising to Z1_FIN_TOP (24 m) as the roof-garden balustrade; ground-floor luxury shopfronts (ICS_ShopLit glazing in ICS_Gold portal frames with dark canopies, warm cove lights ICS_WarmLight) along the river; at the south end a big CURVED two-storey glass drum (Photo B lower centre) and at the north-east lobe (x 56..111 m, y 22..51 m) a curved bright gold-lit glass pavilion facing the plaza/river. Z1 roof: roof garden (ICS_Foliage beds, ICS_Paving walkways). Z2 and Z3 and the floor edges between 20 m and 42 m: Photo B's ~5 levels of CURVED, scalloped terrace balconies stepping back toward the main block - slab edges with soffits (ICS_White), teal glass balustrades ICS_Balustrade with dark handrails, recessed lit restaurant glazing ICS_MallGlass, potted plants. Do NOT build Z4 (main-block crew), the crown, the plaza or the piers. Collider: Z1/Z2/Z3 extrusions. LOD1: the three extrusions. Keep LOD0 under ~150k verts.`,
  },
  {
    key: 'crown', mesh: 'ICS_Crown', prefix: 'CROWN_', top: 8000,
    scope: `ICS_Crown — Crown crew. Build the GOLD crown that sits on the Z4 roof (base CROWN_BASE 58 m, top CROWN_TOP 75 m): Photo B shows a large elliptical drum with a thick golden rim band (ICS_GoldRoof) and a white curved canopy roof inside (ICS_White ribs/panels); Photo A (from the river) shows the rim sweeping up from the west (low) to a sharp PROW at the east end, with white radiating ribs/fins under the prow and a triangular glass facade (Wisdom Hall, ~20 m tall cable-net glass, ICS_SolidGlass with ICS_WarmLight glow strips) facing the river. Shape it like a Thai krathong / boat: a lofted/swept rim along an oval plan (start from CROWN_FP and CROWN_C - INFERRED, low confidence: calibrate position, size and heights against BOTH photos relative to the white block, the Z4 roof and Magnolias, and keep it inside Z4_FP). Include the supporting drum/glass walls between the Z4 roof and the canopy so it does not float. Only the crown - nothing else. Collider: a coarse oval prism. LOD1: simplified rim + canopy. Keep LOD0 under ~70k verts.`,
  },
  {
    key: 'magnolias', mesh: 'ICS_TowerMagnolias', prefix: 'MAG_', top: 32000,
    scope: `ICS_TowerMagnolias — South-tower crew. Magnolias Waterfront Residences: podium to MAG_PODIUM_TOP (27 m) on MAG_FP; tower shaft of 70 floors (MAG_FLOOR_H ~4.0 m) to the main roof MAG_ROOF (281 m), architectural top MAG_ARCH_TOP (315 m), spire tip MAG_TIP (317.95 m). Management decision: Photo A shows the tower ~65-75 m wide from the river (roof-height / apparent width ~3.7-4) - build the shaft on MAG_FP inset ~2-4 m (offset_polygon), NOT the slender MAG_SHAFT_INF. Facade: blue-grey glass ICS_TowerGlass with champagne-gold vertical frames/pilasters (ICS_Gold) and thin gold floor-edge bands (ICS_GoldPanel), recessed balcony slots, and the central recessed vertical gold "spine" that splits the facade and continues above the roof as the spire mast (Photo A). Top: stepped/slanted crown as in Photo A (the south/left part highest with a sloped edge, stepping down to the north/right), crown framing to MAG_ARCH_TOP and a thin mast to MAG_TIP. Only this tower. Collider: podium prism + shaft prism. LOD1: podium + shaft + crown prisms (<10k verts). Keep LOD0 under ~150k verts (use arrays/grid_array, not per-window boxes).`,
  },
  {
    key: 'mandarin', mesh: 'ICS_TowerMandarin', prefix: 'MO_', top: 28000,
    scope: `ICS_TowerMandarin — North-tower crew. The Residences at Mandarin Oriental: a GOLDEN podium box on MO_FP (ICS_GoldPanel with a fine vertical/diamond relief, top ~20-24 m - Photo A suggests ~18-20 m, MO_PODIUM_TOP is 24 m INFERRED; calibrate) with a green roof terrace (ICS_Foliage) and an infinity pool (ICS_Water) on top as Photo B shows; tower shaft of 52 floors (MO_FLOOR_H ~4.3 m) to MO_ROOF (232 m INFERRED), architectural top MO_ARCH_TOP (268.7 m), spire tip MO_TIP (272.2 m). Management decision: Photo A shows the shaft ~60-70 m wide from the river; build the shaft on MO_FP inset ~4-6 m (offset_polygon), NOT the slender MO_SHAFT_INF; the long axis runs ~46 deg (NE). Facade: glass ICS_TowerGlass2, champagne-gold vertical fins (ICS_Gold), a central vertical gold spine continuing into the spire mast, thin gold floor bands; sloped/stepped top as in Photo A. Only this tower. Collider: podium + shaft prisms. LOD1 < 10k verts. Keep LOD0 under ~130k verts.`,
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
    summary: { type: 'string', description: 'what was built, key dimensions, deviations from the brief and why' },
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

YOU ARE: SUBCONTRACTORS & LABOR — ${c.mesh} crew. Work systematically and to AAA real-world quality.
${PHOTO_NOTES}

YOUR ASSIGNMENT (Management work order):
${c.scope}

RULES:
- If ${fileOf(c)} already exists (an earlier interrupted attempt), read it and continue/improve it instead of starting blind.
- Write ONLY the file ${fileOf(c)} containing: optional #meshpart blocks (names start with ${c.prefix}), then "#mesh ${c.mesh}", then "#mesh ${c.mesh} lod: 1", then "#mesh ${c.mesh} collider". No #meshdefs, no #texture, no material blocks, no objects. Use the shared constants from #meshdefs (see src/ICS_defs.weave) by name - they are already in the world and visible to your inline previews.
- Template inside "#mesh ${c.mesh}": budget(verts: 250000, indices: 750000); sim_box(min: (-24000, -24000, 0), max: (24000, 24000, ${c.top})); anchor(mode: "origin"); then geometry authored in WORLD coordinates. (sim_box must stay centred on x=0,y=0 with min z 0 so the placement point is the world origin.) Variants (lod/collider) have no sim_box/anchor/budget.
- Workflow: read mesh_dsl fully first; inspect the photos (Read the jpgs; crop/zoom regions relevant to your component with python3 PIL into the scratchpad crews dir); block out primary masses first and check parts_log numbers against the defs; then preview with ref "skyline" and "aerial" (views such as iso, front, right, top, iso_left, low; figure:false) and compare; fix gross proportion errors before detail; then add identity details; re-preview after every significant edit; check lods:[0,1] and the collider stats line ("collider if collision=mesh"). Iterate until you would be proud to ship it.
- Avoid z-fighting (keep >= 5 cm between parallel coplanar faces), floating parts (embed 1-2 cm), degenerate/self-intersecting polygons. Keep within the vert budget in your work order.
- Final answer: the structured summary (numbers from your last preview).`

const reworkPrompt = (c, round, findings) => `${COMMON}

YOU ARE: SUBCONTRACTORS & LABOR — ${c.mesh} crew, REWORK round ${round}. QC/QA, Engineering or Site Operation REJECTED the current version of ${fileOf(c)}. Fix EVERY blocker and major finding below (and minors where cheap) by editing that file in place, then re-preview to prove each fix. Do not regress accepted aspects.
${PHOTO_NOTES}

ORIGINAL WORK ORDER:
${c.scope}

FINDINGS TO RESOLVE:
${findings}

Same rules as before: only edit ${fileOf(c)}; template (budget/sim_box centred at 0,0 min z 0/anchor origin) must remain; palette-only materials; read mesh_dsl (force:true) before editing; preview with ref "skyline"/"aerial", parts_log, lods:[0,1]. Final answer: the structured summary, listing how each finding was resolved.`

const REVIEWERS = [
  {
    key: 'eng', title: 'ENGINEERING & TECHNICAL',
    duty: `You verify the structural/infrastructure correctness of the component: (a) the template (budget, sim_box centred at x=0,y=0 with min z=0, anchor origin) and file conventions (#meshpart prefix, lod: 1 and collider variants present); (b) coordinates: run preview_mesh parts_log:true and compare every major binding's bounds with the #meshdefs footprints/heights it should follow (tolerance ±1 m in plan, ±0.5 m in height unless the work order allows calibration) - real scale, correct world position, correct orientation (river east, x ~ +122..+148 m); (c) bake diagnostics/warnings (W_FLOATING_PART, W_DANGLING_END, etc. - use preview_mesh diagnostics), closed solids, no z-fighting coplanar faces, no degenerate geometry; (d) budgets: LOD0 verts/indices within the work order, LOD1 <= ~10% of LOD0, collider <= 1000 verts and sensible for walking; (e) ONLY palette material slots used (MASTER_BRIEF section 3), no #texture/material blocks. Reject on any blocker/major.`,
  },
  {
    key: 'siteops', title: 'SITE OPERATION',
    duty: `You verify the work follows the plan and the assignment: go through the work order line by line and check each required item exists in the file AND appears in the previews (use top view vs docs/site_plan_revA.png, and parts_log); check positions/extents against the site plan and #meshdefs; check nothing outside the crew's scope was built (other crews own: site/plaza/piers, Z4 main block, Z1-Z3 riverfront, crown, Magnolias, Mandarin Oriental) and that this component will interface cleanly with its neighbours (no overlaps into their volumes, contacts at shared edges). Reject if any required item is missing, misplaced, or out of scope.`,
  },
  {
    key: 'qc', title: 'QC/QA',
    duty: `You control quality against the client's photos: preview the component with ref "skyline" and ref "aerial" (several views incl. iso, iso_left, front, top, low; size 512; figure:false), and also open the photos directly (crop/zoom the region of this component). Judge silhouette, proportions, massing rhythm, identity details (pleats, terraces, crown prow, tower spines/tops, golden podium, piers, planters ... whatever applies to this component), material assignment/colour realism, and overall AAA finish. Hunt for defects and for anything that should NOT be in the work (stray geometry, wrong-scale items, fake text, clutter, z-fighting, gaps). If it is not yet a convincing, recognisable, high-quality match for the photos, REJECT with precise, prioritised, actionable fixes. Be strict but fair: accept only when a client would recognise this component of ICONSIAM.`,
  },
]

const reviewPrompt = (c, r, round, buildSummary) => `${COMMON}

YOU ARE: ${r.title} reviewer for component ${c.mesh} (review round ${round}). You are READ-ONLY: never edit any file; never edit the world.
${PHOTO_NOTES}

THE WORK ORDER THE CREW RECEIVED:
${c.scope}

THE CREW'S OWN REPORT:
${buildSummary}

FILE UNDER REVIEW: ${fileOf(c)} (read it; preview it with preview_mesh(source: <file text>, name: "${c.mesh}", ...)). Read mesh_dsl (force:true) if you need syntax facts.

YOUR DUTY: ${r.duty}

Return the structured verdict. Findings must be concrete and actionable (what, where, by how much, how to fix). verdict "accept" only if there is no blocker and no major finding.`

async function runCrew(c) {
  const history = []
  phase('Build')
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
