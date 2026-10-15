export const meta = {
  name: 'iconsiam-scene-qc',
  description: 'Scene-level QC loop: stage assembled ICONSIAM, judge in-engine captures vs photos, route fixes to crews, re-stage until QC accepts',
  phases: [
    { title: 'Stage', detail: 'assemble all component files, push, stage in Oriverse, capture standard views' },
    { title: 'Judge', detail: 'QC/QA (Photo A), QC/QA (Photo B), Engineering (scene integrity), Site Operation (plan conformance)' },
    { title: 'Fix', detail: 'owning crews fix routed findings in parallel' },
  ],
}

const AGENT = '9da9d0fc-b88c-45c4-beb3-beaf229a33ec'
const REPO = '/home/user/Bkk/iconsiam'
const MAX_ROUNDS = (args && args.rounds) || 3
const COMPONENTS = ['ICS_Site', 'ICS_MallMain', 'ICS_MallRiverfront', 'ICS_Crown', 'ICS_TowerMagnolias', 'ICS_TowerMandarin']

const COMMON = `PROJECT: real-scale ICONSIAM (Bangkok) in Oriverse, every component a #mesh authored in world cm and placed at (0,0,0), ONLY Oriverse-library materials (palette in ${REPO}/docs/MASTER_BRIEF.md section 3). READ FIRST: ${REPO}/docs/MASTER_BRIEF.md (incl. section 6 Management directives and section 7 open items/allowances), ${REPO}/src/ICS_defs.weave. Client photos (THE PHOTOS WIN): Photo A ${REPO}/reference/ref_skyline_dusk.jpg (dusk from across the river, camera SE of the site looking W/NW; Millennium Hilton at right is NOT ours), Photo B ${REPO}/reference/ref_aerial_river.jpg (aerial at dusk from the S/SE looking N/NNW, river on the right). Stored engine references: "skyline" (=A) and "aerial" (=B).
ORIVERSE TOOLS: load with ToolSearch ("select:mcp__Tee_Oriverse__playtest,mcp__Tee_Oriverse__get_load_status,mcp__Tee_Oriverse__preview_mesh,mcp__Tee_Oriverse__read_skill,..."). Every call needs agent = "${AGENT}". Poll *_in_progress results with mcp__Tee_Oriverse__get_load_status(request_id, wait_s: 20). read_skill may need force:true.
Component files and owners: ${COMPONENTS.map(c => `${REPO}/src/${c}.weave`).join(', ')}.`

const VIEWS = `STANDARD CAMERAS (world cm, use playtest views with environment:"full", capture_size {width:1280,height:735}):
 A  photoA_river   pos [30000,-40000,500]   look_at [0,5000,11000]  fov 46   (compare_reference "skyline")
 B  photoB_aerial  pos [20000,-30000,16000] look_at [3000,2000,2000] fov 55  (compare_reference "aerial"; you may refine this camera to better match Photo B and report the better pose)
 C  plaza_ground   pos [17000,-12000,1800]  look_at [6000,0,2000]   fov 70
 D  west_road      pos [-30000,-30000,15000] look_at [0,3000,4000] fov 55
 E  river_close    pos [19000,-2000,300]    look_at [5000,3000,4000] fov 75
 F  tower_tops     pos [25000,-15000,30000] look_at [3000,9000,26000] fov 45
Capture at most 2-4 views per playtest call (observe_sec 3). Do not edit the world.`

const STAGE_SCHEMA = {
  type: 'object',
  properties: {
    staged: { type: 'boolean' },
    revision: { type: 'number' },
    commit_sha: { type: 'string' },
    validation: { type: 'string', description: 'compile/sim result, errors verbatim' },
    capture_notes: { type: 'string', description: 'what each standard view shows; capture ids' },
  },
  required: ['staged', 'validation', 'capture_notes'],
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['accept', 'reject'] },
    score: { type: 'number' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          component: { type: 'string', enum: [...COMPONENTS, 'WORLD_LIGHTING'] },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          issue: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['component', 'severity', 'issue', 'fix'],
      },
    },
    evidence: { type: 'string' },
  },
  required: ['verdict', 'score', 'findings', 'evidence'],
}

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    component: { type: 'string' },
    resolved: { type: 'array', items: { type: 'string' } },
    not_resolved: { type: 'array', items: { type: 'string' } },
    verts: { type: 'number' },
    summary: { type: 'string' },
  },
  required: ['component', 'resolved', 'not_resolved', 'summary'],
}

const stagePrompt = round => `${COMMON}

YOU ARE: MANAGEMENT integration operator (round ${round}). Steps:
1. cd /home/user/Bkk && python3 iconsiam/tools/assemble_world.py (assembles iconsiam/world/ICONSIAM_world.weave from world/00_base.weave + src/ICS_defs.weave + the six component files + placement objects).
2. git add -A iconsiam && git commit -m "Scene QC round ${round}: assembled world" (end the message with the two lines:
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BvWvi1UKomtnGrFP8vCwXX) && git push origin claude/iconsiam-mesh-dsl-j85lrd. Get the commit SHA.
3. Read the current draft snapshot with mcp__Tee_Oriverse__pending_world_inspect(view:"summary") and stage the file with mcp__Tee_Oriverse__stage_new_world(file: {download_url: "https://raw.githubusercontent.com/teeradechchangin-code/Bkk/<SHA>/iconsiam/world/ICONSIAM_world.weave", file_id: "iconsiam-world-<short sha>", file_name: "ICONSIAM_world.weave", mime_type: "text/plain"}, expected_snapshot: <snapshot>). (Before stage_new_world you must have called read_skill(name:"weave_coding") with no part/section/search - the authoring gate.) Then mcp__Tee_Oriverse__run_pending_world to confirm it compiles and simulates.
4. If validation fails: identify the failing component file from the error, report it verbatim (do NOT edit component files yourself) and set staged=false.
5. If it passes: capture the standard cameras A-F with playtest and describe what each shows.
${VIEWS}`

const JUDGES = [
  { key: 'qcA', title: 'QC/QA — Photo A (river skyline)', duty: 'Compare cameras A and E (and others as useful) with Photo A side by side (compare_reference "skyline"). Judge composition, massing/proportions of every component as seen from the river, silhouettes (white pleated block, gold crown prow, terraces, podium, both towers with spines/spires/tops, golden podium box), materials and the dusk lighting mood. Reject until a viewer would recognise ICONSIAM from this angle.' },
  { key: 'qcB', title: 'QC/QA — Photo B (aerial)', duty: 'Compare camera B (refine it until the framing matches Photo B) and C/D with Photo B (compare_reference "aerial"). Judge the white block wrap and rounded corner, crown drum, curved terraces, curved glass podium, plaza layout (planters, promenade, basin, piers), landscaping density, tower bases. Reject until a viewer would recognise ICONSIAM from the air.' },
  { key: 'eng', title: 'ENGINEERING & TECHNICAL — scene integrity', duty: 'Use the captures plus close views of every interface: gaps/overlaps/duplicated geometry between components, z-fighting, floating parts, holes, wrong heights where components meet (Z1/Z2/Z3 vs Z4, crown on roof, towers vs plaza, piers vs bank vs water at z=-200), collision sanity, and performance (playtest frame stats; flag anything heavy). Report each finding against the owning component.' },
  { key: 'siteops', title: 'SITE OPERATION — plan conformance', duty: 'Verify against MASTER_BRIEF (incl. section 6 directives) and docs/site_plan_revA.png: everything is at the right place at real scale around (0,0,0), river to the east, mall south, towers north, nothing missing from the scope list, nothing extra, interfaces follow D5. Use a top-down view (pos [0,0,90000] look_at [0,1,0] with ortho_half_h_cm ~20000) to check the plan.' },
]

const judgePrompt = (j, round, stage) => `${COMMON}

YOU ARE: ${j.title} (scene review round ${round}). READ-ONLY: never edit files or the world.
The integrator staged the assembled world and reported:
${stage}
${VIEWS}
YOUR DUTY: ${j.duty}
Every finding must name the owning component (or WORLD_LIGHTING for sky/sun/fog/water knobs in world/00_base.weave) and give a concrete fix. verdict "accept" only with no blocker/major findings.`

const fixPrompt = (comp, round, findings) => `${COMMON}

YOU ARE: SUBCONTRACTORS & LABOR — ${comp} crew, SCENE QC rework round ${round}. The scene review board rejected the integrated world; findings routed to your component are below. Edit ONLY ${REPO}/src/${comp}.weave (for WORLD_LIGHTING edit ONLY the #adjuster block in ${REPO}/world/00_base.weave). Read mesh_dsl first (read_skill(name:"mesh_dsl", force:true) + parts 2..7) before editing #mesh code. Preview your component with preview_mesh(source: <file text>, name: "${comp}", ref "skyline"/"aerial", parts_log) to prove each fix; keep the template (budget, sim_box centred at 0,0 min z 0, anchor origin), lod: 1 and collider variants, palette-only materials, and do not regress accepted aspects. Do not touch the world.
FINDINGS:
${findings}
Final answer: the structured report.`

let lastJudges = []
for (let round = 1; round <= MAX_ROUNDS; round++) {
  phase('Stage')
  const stage = await agent(stagePrompt(round), { label: `stage:r${round}`, phase: 'Stage', schema: STAGE_SCHEMA })
  if (!stage || !stage.staged) {
    log(`round ${round}: staging failed - ${stage ? stage.validation : 'agent died'}`)
    return { status: 'stage_failed', round, stage, lastJudges }
  }
  const stageText = JSON.stringify(stage)
  phase('Judge')
  const judges = (await parallel(JUDGES.map(j => () =>
    agent(judgePrompt(j, round, stageText), { label: `${j.key}:scene:r${round}`, phase: 'Judge', schema: JUDGE_SCHEMA })
      .then(v => v ? { team: j.key, ...v } : null)))).filter(Boolean)
  lastJudges = judges
  log(`scene round ${round}: ${judges.map(v => `${v.team}=${v.verdict}(${v.score})`).join(', ')}`)
  if (judges.length === JUDGES.length && judges.every(v => v.verdict === 'accept')) {
    return { status: 'accepted', round, stage, judges }
  }
  if (round === MAX_ROUNDS) {
    log(`scene QC not accepted after ${MAX_ROUNDS} rounds - escalating to Management`)
    return { status: 'escalated', round, stage, judges }
  }
  const byComp = {}
  for (const v of judges) for (const f of (v.findings || [])) {
    if (f.severity === 'minor' && judges.some(x => x.verdict === 'reject') && false) continue
    ;(byComp[f.component] = byComp[f.component] || []).push(`[${v.team.toUpperCase()} ${f.severity}] ${f.issue} -> FIX: ${f.fix}`)
  }
  phase('Fix')
  await parallel(Object.entries(byComp).map(([comp, list]) => () =>
    agent(fixPrompt(comp, round, list.join('\n')), { label: `fix:${comp}:r${round}`, phase: 'Fix', schema: FIX_SCHEMA })))
}
