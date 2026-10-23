"""One-shot documentation synchronization; requires the preserved pre-B9 model."""
from pathlib import Path
import copy, hashlib, json

ROOT = Path(__file__).resolve().parents[4]
D = ROOT / 'docs/design'
H = Path(__file__).resolve().parent
sha = lambda data: hashlib.sha256(data).hexdigest()
model_path = D / 'v1-concept-register.json'
assert sha(model_path.read_bytes()) == 'bdc1e584cf5e9eb3b1c8632c12ee9ae4cc4014e1327085bff01dc3c8f47ffbed', 'Apply once to the reviewed baseline only'
m = json.loads(model_path.read_text())
audit = json.loads((D / 'v1-concept-graph-audit.json').read_text())
before = copy.deepcopy(m)
sources = {}

def pin(key, path, needle):
    lines = (ROOT / path).read_text().splitlines()
    matches = [i for i, line in enumerate(lines) if needle in line]
    assert len(matches) == 1, (key, matches)
    i = matches[0]
    sid = 'SRC' + str(max(int(s['id'][3:]) for s in m['sources']) + 1).zfill(3)
    m['sources'].append({'id': sid, 'path': path, 'startLine': i+1, 'endLine': i+1, 'excerpt': lines[i], 'kind': 'accepted-architecture-followup'})
    sources[key] = sid
    return sid

for round_id in ['A06', 'A07', 'A08', 'A09', 'A10', 'A11']:
    path = f'docs/design/history/architecture-{round_id.lower()}-2026-10-23/acceptance-{round_id.lower()}.json'
    evidence = json.loads((ROOT / path).read_text())
    for decision in evidence['decisions']:
        pin(decision['id'].replace('.', ''), path, '"meaning": ' + json.dumps(decision['meaning'], ensure_ascii=False))

instruction_definition = "Versioned guidance describing an agent's operating behavior or role responsibilities, used together with applicable shared rules and the context of its Assignment."
knowledge_definition = 'Reusable observations or lessons retained with their sources, scope and degree of certainty. It is distinct from authoritative project requirements and the recorded state of execution.'
pin('instructions', 'GLOSSARY.md', instruction_definition)
pin('knowledge', 'GLOSSARY.md', knowledge_definition)
pin('pause', 'docs/ui/GLOSSARY.md', 'The action durably suspending automatic wake and new work admission for the selected logical orchestrator')
pin('resume', 'docs/ui/GLOSSARY.md', 'The action permitting a paused logical orchestrator to continue automatic processing')
pin('knowledge-module', 'docs/engineering/GLOSSARY.md', 'The Project Harness module responsible for sourced, scoped learned notes')

def refs(*keys): return [sources[k] for k in keys]
def concept(cid, name, definition, anchor, avoid, source_keys):
    x = {'id': cid, 'name': name, 'sourceName': name, 'nameStatus': 'approved', 'status': 'approved', 'type': 'concept', 'typeStatus': 'inferred', 'context': 'common', 'ownerGlossary': 'GLOSSARY.md', 'definition': definition, 'aliases': [], 'disallowedTerms': avoid, 'sourceRefs': refs(*source_keys), 'definitionLocation': 'GLOSSARY.md#'+anchor, 'critical': True, 'definitionLanguage': 'en', 'definitionKind': 'local-definition'}
    m['concepts'].append(x)
    audit['conceptTypeReview']['reviewedIds'].append(cid)
    return cid

instructions = concept('common.instructions', 'Instructions', instruction_definition, 'instructions', ['native model configuration', 'Skill or workflow by default', 'authority grant'], ['instructions', 'A06Q1'])
knowledge = concept('common.learned-knowledge', 'Learned Knowledge', knowledge_definition, 'learned-knowledge', ['transcript', 'execution journal', 'hypothesis treated as a project rule'], ['knowledge', 'A06Q2', 'A08Q1'])

new_relations = []
def relation(source, predicate, target, scope, *source_keys):
    rid = 'R'+str(max(int(x['id'][1:]) for x in m['relations'])+1).zfill(3)
    row = {'id': rid, 'source': source, 'predicate': predicate, 'target': target, 'kind': 'references/uses', 'targetsPerSource': 'unknown', 'sourcesPerTarget': 'unknown', 'status': 'inferred', 'sourceRefs': refs(*source_keys), 'scope': scope}
    m['relations'].append(row); new_relations.append(row)
    audit['relationReviews'].append({'id': rid, 'disposition': 'architecture-followup-added', 'reason': 'Directed model synthesis from the scoped accepted architecture source; cardinalities remain unknown and no runtime capability is inferred.', 'sourceRefs': row['sourceRefs'], 'before': None, 'after': copy.deepcopy(row)})
    return rid

r_def = relation('common.agent-definition', 'may reference operating guidance in', instructions, 'Definition/role references select versioned instructions; native profiles and method/result ownership remain separate.', 'A06Q1')
r_inst = relation('execution.goi-context', 'may contain applicable', instructions, 'Harness-prepared context only; no complete inventory or overriding precedence of inherited provider inputs is promised.', 'A06Q1', 'A08Q2')
r_read = relation('execution.goi-context', 'may select additional sourced', knowledge, 'On-demand retrieval of permitted scoped notes; used source/revisions remain in execution selections. Not eager loading of every note.', 'A08Q2', 'A09Q1')
r_evidence = relation(knowledge, 'may cite supporting', 'execution.evidence', 'Notes retain sources and degree of certainty; not every possible source is required to be a separately registered Evidence object.', 'A06Q2', 'A07Q3')
r_retro = relation('evolution.luot-retro-hang-ngay', 'curates', knowledge, 'Daily curation combines notes with outcomes/metrics; no forced change or extra LLM Turn for every task.', 'A07Q3')
r_candidate = relation(knowledge, 'may inform a checked improvement', 'evolution.candidate', 'A note does not directly become an active instruction, workflow, requirement or authority. Persistent behavior promotion follows the candidate path.', 'A06Q2', 'A07Q3', 'A09Q2')
r_starter = relation('common.project-harness', 'ships starter operating', instructions, 'A10 base source assets include Onboarding/Engineering guidance; this does not mean every instruction is installed, bound, read or verified.', 'A10Q1')
r_arm = relation('evolution.luot-retro-hang-ngay', 'becomes eligible after the user starts', 'common.harness-engineering-orchestrator', 'Only enabled configured daily retro, with bindings/cadence/authority ready; not a rule for every Job or proof of native cadence delivery.', 'A10Q2')
r_pause = relation('execution.logical-owner', 'gates automatic processing through durable control of', 'engineering.admission', 'A11 orchestrator Pause/Resume via Work owner Interface; scope excludes arbitrary external native/manual prompts. Resume still needs current authority and readiness.', 'A11Q1')
r_keep = relation('execution.logical-owner', 'retains already-admitted worker', 'execution.assignment', 'While that orchestrator is paused, preserve current worker work/results; do not create new dispatch/progression from arriving results. No new grant or effect rollback.', 'A11Q2')
r_cycle = relation('common.orchestrator-agent', 'records structured cycle disposition through', 'engineering.mcp-server', 'Owner Tools record disposition; code checks durable pending work before continuation/wait. A Turn/cycle ending is not work or criterion completion.', 'A07Q1')
r_wake = relation('automation.source-event', 'may request coalesced automatic wake for', 'execution.logical-owner', 'Retain individual events/results/evidence while busy; coalesce wake, respect pause/admission, do not interrupt/create another orchestrator for each callback.', 'A07Q2', 'A11Q1')

new_constraints = []
def constraint(text, concepts, *source_keys):
    kid = 'K'+str(max(int(x['id'][1:]) for x in m['constraints'])+1)
    row = {'id': kid, 'text': text, 'concepts': concepts, 'status': 'approved', 'sourceRefs': refs(*source_keys)}
    m['constraints'].append(row); new_constraints.append(row)
    audit['constraintReviews'].append({'id': kid, 'disposition': 'accepted-architecture-followup-added', 'reason': 'Rule accepted within the cited architecture question; not a schema, universal native capability or runtime proof.', 'sourceRefs': row['sourceRefs'], 'before': None, 'after': copy.deepcopy(row)})
    return kid

k_inst = constraint('Versioned instructions selected by role/definition are combined with applicable shared rules and Assignment context. Native profile options and method/result contracts retain their owners; this does not establish universal native instruction inventory or precedence.', [instructions, 'common.agent-definition', 'execution.assignment', 'execution.goi-context', 'common.paseo-agent-profile'], 'A06Q1', 'A08Q2')
k_session = constraint('New worker work uses a fresh Session by default; clarification/continued Turns of the same Assignment retain its Session. Reuse for different work requires an explicit compatibility policy. This does not change GA01 retry/redispatch identities or orchestrator Open/Replace.', ['execution.assignment', 'execution.agent-session', 'execution.agent-turn'], 'A06Q3')
k_note = constraint('Learned notes retain source, scope and certainty outside transcript/execution history, with Harness/Project logical scope and authority-aware retrieval. They do not become authoritative requirements, criteria or grants. Knowledge owns their lifecycle; Work retains execution/context snapshots.', [knowledge, 'execution.goi-context', 'execution.work-item', 'execution.nguon-yeu-cau-du-an', 'common.tieu-chi-anh-gia'], 'A06Q2', 'A08Q1', 'A09Q1')
k_fresh = constraint('Contested or source-drifted notes keep qualified history and are excluded from automatic default loading until applicability recheck records a new conclusion/revision. Drift alone does not prove a false lesson; this does not invalidate authoritative requirements or force every note through Deep release.', [knowledge, 'engineering.source-drift', 'execution.pinned-revision', 'execution.evidence'], 'A08Q3')
k_cycle = constraint('Orchestrators record structured cycle disposition through owner MCP Tools; runtime checks durable state before continue/wait. Individual events/results survive coalesced wake while busy; no marker/text oracle, per-callback interrupt or extra orchestrator is implied. Cycle/Turn completion is not Work completion.', ['common.orchestrator-agent', 'engineering.mcp-server', 'automation.source-event', 'execution.logical-owner', 'execution.agent-turn', 'execution.work-item'], 'A07Q1', 'A07Q2')
k_retro = constraint('Useful notes can be recorded during existing work without a mandatory lesson or extra LLM Turn per task. Daily retro curates with outcomes/metrics and proposes evidence-backed candidates when justified; urgent blockers need not wait for daily.', [knowledge, 'evolution.luot-retro-hang-ngay', 'evolution.candidate', 'execution.outcome'], 'A07Q3')
k_plan = constraint('Task-specific composition from registered blocks/roles/Tools validates contracts/structure/authority/bounds and pins its plan before execution, without plugin release. Reusable registration or persistent code/Tool/Skill/operating behavior changes require candidate/check/activation; arbitrary unverified generated code is not a bypass.', ['execution.execution-plan', 'execution.workflow-definition', 'execution.workflow-step', 'common.project-orchestrator', 'evolution.candidate', 'evolution.activation'], 'A09Q2')
k_start = constraint('The base ships versioned Onboarding/Engineering instructions/definitions, starter specialist presets, workflow blocks/templates and validation/eval fixtures. Onboarding binds existing native profiles/installed methods; Engineering adapts them. Five responsibility presets are not a mandatory pipeline, pre-spawned workers or universal capability proof.', ['common.project-harness', instructions, 'common.onboarding-agent', 'common.harness-engineering-orchestrator', 'common.agent-catalog', 'common.paseo-agent-profile', 'common.skill'], 'A10Q1')
k_arm = constraint('Fresh install/Onboarding does not start an LLM loop or real external polling. Enabled daily retro is eligible after user Spawn Engineering with bindings/cadence/authority ready; code polling needs connection/filter/cadence/enabled. Restart preserves disabled state without automatic Spawn/Replace; authorized recurring runs need no per-run approval.', ['common.onboarding-agent', 'common.harness-engineering-orchestrator', 'evolution.luot-retro-hang-ngay', 'automation.job', 'automation.native-cadence'], 'A10Q2')
k_pause = constraint('Explicit durable orchestrator Pause blocks controlled automatic wake/new admission until authorized Resume via the shared Work owner Interface. Native Stop only requests Turn interruption; canceled/idle does not establish human Pause, and event/reload/Open Session does not Resume. Native cadence coordination must show pending/confirmed truthfully.', ['execution.logical-owner', 'engineering.admission', 'engineering.cancellation', 'execution.agent-turn', 'automation.native-cadence', 'engineering.observed-state'], 'A11Q1')
k_scope = constraint('Pause affects only that orchestrator automatic wake/new admissions/progression. Running workers/results/evidence/events, independent enabled ingestion jobs and the other orchestrator are retained. Worker cancellation, job disable and whole-kit controls have separate scope; revoked authority and existing effect uncertainty remain applicable.', ['execution.logical-owner', 'execution.assignment', 'execution.outcome', 'execution.evidence', 'automation.source-event', 'automation.job', 'common.effective-authority'], 'A11Q2')

new_mappings = [
 {'id':'UI.pause-orchestrator','kind':'ui','name':'Pause (Orchestrator)','record':'Pause is the explicitly requested durable suspension of one logical orchestrator automatic wake/new admission. Native Stop, Pause Work and Pause Schedule retain their own scope. English name/meaning accepted in A11; localized labels/presentation and control implementation are not proved.','status':'approved','evidenceScope':'English control scope only; no production control/native cadence proof','sourceRefs':refs('pause','A11Q1','A11Q2'),'targetLinks':['../ui/GLOSSARY.md#pause-orchestrator'],'concepts':['execution.logical-owner','engineering.admission','execution.assignment']},
 {'id':'UI.resume-orchestrator','kind':'ui','name':'Resume (Orchestrator)','record':'Resume permits automatic processing under current authority/readiness/limits. Open Session, events or reload do not implicitly Resume. English name/meaning accepted in A11; localized labels/presentation and runtime implementation remain separate.','status':'approved','evidenceScope':'English control scope only; no provider/admission enforcement proof','sourceRefs':refs('resume','A11Q1'),'targetLinks':['../ui/GLOSSARY.md#resume-orchestrator'],'concepts':['execution.logical-owner','engineering.admission','common.effective-authority']},
 {'id':'CODE.Knowledge','kind':'engineering','name':'Knowledge module','record':'A09 assigns sourced/scoped learned-note lifecycle, history/qualification/recheck and retrieval to Knowledge. Work owns execution/context snapshots, AgentDefinitions bindings and Criteria authoritative criteria/Verdicts. This is a module seam/name in one plugin; no method/schema, service/database or implemented identifier is implied.','status':'approved','evidenceScope':'Accepted architecture owner/name only; design, not implemented API','sourceRefs':refs('knowledge-module','A09Q1'),'targetLinks':['GLOSSARY.md#knowledge-module'],'concepts':[knowledge,'execution.goi-context','common.agent-definition','common.tieu-chi-anh-gia']}
]
m['mappings'].extend(new_mappings)

def cq(number, scenario, question, answer, reqs, cs, rs, ks, maps, *source_keys):
    rid = 'CQ'+str(number)
    all_concepts = set(cs)
    for rel in m['relations']:
        if rel['id'] in rs: all_concepts.update([rel['source'],rel['target']])
    row = {'id':rid,'scenario':scenario,'question':question,'answer':answer,'concepts':sorted(all_concepts),'constraints':ks,'semanticCoverage':'approved-sources','decisions':[],'origin':'Accepted architecture A06–A11 follow-up; original CQ01–CQ51 preserved.','relations':rs,'requirements':reqs,'sourceRefs':refs(*source_keys),'mappings':maps,'definitionGaps':[],'relationGaps':[r for r in rs if next(x for x in m['relations'] if x['id']==r)['status'] in ['inferred','proposed']],'runtimeEvidence':{'level':'unproved-v1','note':'Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.'}}
    m['questions'].append(row)
    for req in m['requirements']:
        if req['id'] in reqs: req['questions'].append(rid)

cq(52,'Instructions, methods and worker context','A new task follows an idle worker Session: which instructions and knowledge are supplied, and does idle alone justify reusing the Session?',
   'Role/definition references select versioned instructions, combined with shared rules and Assignment context. Harness-prepared context includes mandatory task/criteria sources; permitted learned notes are retrieved as needed with used source/revisions. Fresh Session is the default for new work; continued Turns of one Assignment retain it. Different-work reuse requires explicit compatibility. Native discovery/inherited inputs are not erased or exhaustively inventoried.',
   ['REQ03','REQ05'],[instructions,knowledge,'common.agent-definition','execution.goi-context','execution.assignment','execution.agent-session','execution.agent-turn'],[r_def,r_inst,r_read],[k_inst,k_session,k_note],['CODE.Knowledge'],'A06Q1','A06Q2','A06Q3','A08Q2','A09Q1')
cq(53,'Learning, drift and operating authority','A project note has a changed source and daily retro wants to reuse it as an operating rule: what remains retrievable, and who can make it active?',
   'Keep the sourced/scoped/qualified note and history, mark applicability recheck and exclude it from default automatic loading until a new conclusion is recorded. Drift alone does not prove the note wrong. Knowledge owns retrieval/history; Work retains execution snapshots and authoritative requirements/criteria keep their owners. Daily retro curates alongside outcomes/metrics; promotion to persistent instructions/Skills/workflows is an authorized checked candidate, not a note edit or mandatory daily patch.',
   ['REQ09','REQ14'],[knowledge,'execution.evidence','engineering.source-drift','execution.pinned-revision','execution.nguon-yeu-cau-du-an','common.tieu-chi-anh-gia','execution.outcome'],[r_evidence,r_retro,r_candidate],[k_note,k_fresh,k_retro],['CODE.Knowledge'],'A06Q2','A07Q3','A08Q1','A08Q3','A09Q1','A09Q2')
cq(54,'Task composition versus publication','Project Orchestrator needs a new routing/parallel-review/optimization composition for one task: must Engineering release the plugin first?',
   'No: compose registered blocks/roles/Tools, validate structure/contracts/current authority/bounds, pin the plan and execute through Work. All five patterns remain composable/nestable and dynamic work remains bounded. Reusable registration or persistent code/Tool/Skill/behavior changes follow candidate/check/activation. Task-specific representation/identity and interpreter are engineering work; no arbitrary generated code bypass or relaxed evidence/permission rule is implied.',
   ['REQ06','REQ10'],['common.project-orchestrator','execution.execution-plan','execution.workflow-definition','execution.workflow-step','execution.workflow-run','common.workflow-runtime','evolution.candidate','evolution.activation'],['R086','R087','R088','R089'],[k_plan],[], 'A09Q2')
cq(55,'Starter assets and automation arming','After first install, are presets already running, and what makes daily retro or a Backlog/PR poll eligible after bootstrap or restart?',
   'Base source ships Onboarding/Engineering definitions/instructions, starter specialists, templates/blocks and fixtures. Onboarding binds existing profiles/methods; Engineering adapts assets rather than pre-spawning all roles. No LLM loop or real polling during fresh install/Onboarding. Enabled daily becomes eligible after user Spawn Engineering plus bindings/cadence/authority; code polls need connection/filter/cadence/enabled. Restart preserves disabled state and does not Spawn/Replace. Configured/source-present does not prove capability; initial scoped verification remains required.',
   ['REQ01','REQ02','REQ07','REQ08','REQ09'],['common.project-harness',instructions,'common.onboarding-agent','common.harness-engineering-orchestrator','common.agent-catalog','common.agent-definition','common.paseo-agent-profile','common.skill','automation.job','automation.native-cadence','common.operational-verification'],[r_starter,r_arm,r_def],[k_start,k_arm,k_inst],[], 'A10Q1','A10Q2','A06Q1')
cq(56,'Native Stop versus durable orchestrator Pause','The user pauses one orchestrator while a worker is running and a PR event arrives; what stops, what persists, and can reload or native canceled implicitly resume it?',
   'Explicit owner Pause durably blocks controlled automatic wake/new admissions/progression for that logical orchestrator until authorized Resume. Native Stop only requests Turn interruption and canceled/idle cannot identify durable user intent. Preserve running workers/results/evidence/events; independent enabled ingestion and the other orchestrator may continue. No new dispatch from the paused side, no implicit Resume on event/reload/Open Session, no effect undo. Show native coordination pending/confirmed truthfully; external native/manual prompts and actual enforcement remain capability/proof limits.',
   ['REQ02','REQ04','REQ05','REQ07'],['execution.logical-owner','engineering.admission','engineering.cancellation','execution.agent-turn','execution.assignment','execution.outcome','execution.evidence','automation.source-event','automation.job','automation.native-cadence','common.effective-authority','engineering.observed-state'],[r_pause,r_keep],[k_pause,k_scope],['UI.pause-orchestrator','UI.resume-orchestrator'],'A11Q1','A11Q2')
cq(57,'Cycle disposition and coalesced wake','An orchestrator Turn ends while workers are pending and several callbacks arrive: what determines continuation without losing results or spawning another orchestrator?',
   'The agent records structured cycle disposition through owner MCP Tools. Code reconciles durable work/pending state before continue/wait; chat prose/marker and Turn completion are not Work completion. Keep each event/result/evidence identity while coalescing automatic wake for the busy logical owner; no per-callback interruption or replacement Session. Existing pause, authority/resource limits and explicit user lifecycle remain applicable. Wake ordering/reload and native delivery require protocol proof.',
   ['REQ05','REQ07'],['common.orchestrator-agent','engineering.mcp-server','automation.source-event','execution.logical-owner','execution.agent-turn','execution.work-item','execution.assignment'],[r_cycle,r_wake],[k_cycle,k_pause],[], 'A07Q1','A07Q2','A11Q1')

assert m['questions'][:len(before['questions'])] == before['questions'], 'Original CQs changed'
assert m['concepts'][:len(before['concepts'])] == before['concepts'], 'Original meanings changed'
assert m['relations'][:len(before['relations'])] == before['relations'], 'Original relation audit changed'
m['architectureFollowup'] = {'rounds':['A06','A07','A08','A09','A10','A11'],'report':'docs/design/history/architecture-b9-2026-10-23/review-b9.json','scope':'Accepted meanings/rules and conservative source-backed relations; no closure, new deployment units or runtime evidence upgrade.'}
raw = json.dumps(m, ensure_ascii=False, indent=2)+'\n'
model_path.write_text(raw)
audit['reviewedRegisterSha256'] = sha(raw.encode())
audit.setdefault('architectureFollowups',[]).append({'rounds':['A06','A07','A08','A09','A10','A11'],'concepts':[instructions,knowledge],'relations':[r['id'] for r in new_relations],'constraints':[k['id'] for k in new_constraints],'questions':['CQ'+str(i) for i in range(52,58)],'meaning':'Scoped accepted follow-up and inferred relation additions; original review records and runtime evidence remain unchanged.'})
(D/'v1-concept-graph-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
with (D/'v1-concept-graph-audit.md').open('a') as out:
    out.write('\n## Architecture follow-up B9 — A06–A11\n\nOriginal inventory above is historical. This follow-up adds Instructions/Learned Knowledge and CQ52–CQ57, plus scoped Pause/Resume UI mappings and the Knowledge module mapping. It does not add a UI bounded context, service or database. All original 155 concepts, CQ01–CQ51, relation statuses and runtime evidence are preserved. New relation cardinalities stay unknown/inferred; accepted constraints retain narrow question scope.\n\n')
    for r in new_relations:
        out.write(f'<a id="{r["id"].lower()}"></a>\n\n**{r["id"]}**: {r["source"]} → {r["predicate"]} → {r["target"]}. Inferred; unknown / unknown. Sources: '+', '.join(r['sourceRefs'])+'. '+r['scope']+'\n\n')
    out.write('Added accepted constraints: '+', '.join(k['id'] for k in new_constraints)+'. Exact per-record rationale/source/after data is in the audit JSON. [Follow-up evidence and validation](history/architecture-b9-2026-10-23/review-b9.json). No runtime proof or architecture closure is inferred.\n')
summary={'conceptsAdded':[instructions,knowledge],'relationsAdded':[r['id'] for r in new_relations],'constraintsAdded':[k['id'] for k in new_constraints],'questionsAdded':['CQ'+str(i) for i in range(52,58)],'mappingsAdded':[x['id'] for x in new_mappings],'sourcesAdded':len(m['sources'])-len(before['sources']),'registerSha256':sha(raw.encode()),'originalRecordsUnchanged':True}
(H/'delta-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False))
