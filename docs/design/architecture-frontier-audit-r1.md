# Overall architecture frontier — factual audit R1

2026-10-23. Bounded, local-source research; design only. Alternatives below are unselected. References are repository-relative; transcript positions refer to `docs/design/grill-history/messages.jsonl` unless specified otherwise.

## Evidence boundary

P297 requested overall architecture closure; P299 invoked codebase-design instead. P336 explicitly called the module design a proposal; P373 requested updates, and P381 introduced Triggers. None is wholesale approval of today's interfaces. Conversely, Glossary V1 is closed: D01 P2720→P2722 and session P2767→P2769 (`docs/design/glossary-v1-grill.md:54–81`). Older D01 ambiguity reports are historical, not current frontier.

Carry forward one project/one plugin, native profile references, chat-first, thick TypeScript plugin, Git/SQLite/artifacts, five patterns, generalized scheduling, full self-update and deep Analytics (`docs/design/architecture.md:7–42`, `docs/design/scope-80-20.md:23–88`). D02–D05/GA01 remain accepted. Overall V1 acceptance is a separate unanswered gate, P1270→P1272 (`docs/design/scope-80-20.md:90–99`), not an architecture choice here.

The five-module sketch covers scheduling/integration delivery through Triggers, execution/lifecycle through Work, composition through WorkflowPrograms, assessment through Criteria and self-update through Releases. Integrations remain adapters, not omitted product scope (`docs/design/scope-80-20.md:51–54`). Catalog/configuration and Analytics are mandatory responsibilities without equally explicit owner interfaces. That is a coverage gap in the sketch, not evidence that V1 needs any particular module count.

## Candidate frontier roots

### A. Catalog/configuration ownership is incomplete

**Accepted:** shared Agent Catalog, separate Delegation Policies, four settings groups, operator edits versus harness candidates, native ownership and immutable execution selections (`docs/design/agent-delegation.md:7–48`; `docs/design/configuration.md:5–24,30–68`).

**Trace:** panel/Onboarding MCP → “owner” validation → SQLite settings/active references plus Git definitions → receipt/revision and pinned bundle. But configuration's owner list assigns admission to Work and procedure structure to WorkflowPrograms without assigning Catalog/Definition/Policy mutation ownership (`docs/design/configuration.md:64–68`). Onboarding explicitly calls “existing” settings/definition owners without identifying them (`docs/design/onboarding-implementation.md:15,39–58`). The five-module inventory does not name those mutation owners (`docs/design/modules.md:11–21`).

**Remaining alternatives:** distribute typed ownership among Work, WorkflowPrograms and Releases, documenting one authoritative mutation path per asset; or introduce a focused Catalog/configuration module with those modules consuming revisions. Neither implies a fifth settings group or generic Settings module.

**Blocks/dependencies:** owner interfaces for onboarding, catalog editing/candidates, policy validation and consistent activation. Existing accepted asset distinctions suffice to examine this now; schemas follow. This merits overall architecture review because it determines the external seam used by several callers and where authority-changing invariants live, rather than merely naming a database table.

### B. Analytics has producers but no complete read owner

**Accepted:** deep filtering/grouping/comparisons, Saved Views, evidence drill-down, unavailable measurements and observation/evaluation separation (`docs/design/scope-80-20.md:66–72`; P1244→P1246, P1249→P1251). Saved View is query/presentation configuration, not a frozen dataset (`docs/domain/analytics/GLOSSARY.md:77–83`).

**Trace:** Work journal/outcomes → identified traces/metrics and frozen eval artifacts (`docs/design/modules.md:160`); Criteria → evidence/baseline/verdict (`docs/design/modules.md:182–192`); Releases → activation/check costs (`docs/design/release-policy.md:25`). Analytics panel/retro → **unspecified aggregate/query and Saved View owner** → drill-down evidence. Work read/list provide work projections, not the promised cross-domain queries (`docs/design/modules.md:146`). Telemetry query is currently described as internal implementation (`docs/design/modules.md:294`).

**Remaining alternatives:** extend existing module read interfaces and assemble Analytics behind an explicitly owned internal query implementation; or establish an Analytics module owning queries/projections/Saved Views while source modules retain authoritative writes and Criteria retains verdicts.

**Blocks/dependencies:** panel/RPC queries, saved-view persistence and retro's historical input contract. Source semantics are settled, so this ownership choice is independent of A. Architecture review is warranted for cross-module read dependencies and locality; SQL, metric formulas, indexes and refresh mechanisms are subsequent engineering.

### C. Native conversation → accepted durable work

**Accepted:** native chat directly with each orchestrator, distinct responsibilities/inboxes, common owner interfaces, durable state outside transcripts (`docs/design/interaction-model.md:7–24`). Work proposes durable submit receipts and separates acceptance from planning (`docs/design/modules.md:87–135`).

**Trace:** user → native Session → **unspecified chat binding** → Work submit → receipt/journal → admission/Assignments/evidence. Architecture explicitly leaves chat-to-work binding open (`docs/design/architecture.md:108`); verification asks how chat decisions become durable without another form (`docs/design/verification.md:77`). Onboarding create/send/Handover protocol covers initial lifecycle delivery, not ordinary project chat ingestion (`docs/design/onboarding-implementation.md:110–126`).

**Remaining alternatives:** orchestrator interprets conversation and explicitly submits actionable work/decisions through owner tools; or a native-message adapter durably records correlated input before orchestrator interpretation, with subsequent promotion into work. Neither means every conversational message is a task or introduces a shared chat router.

**Blocks/dependencies:** acknowledgement semantics, missed-message reconciliation, dedupe and retaining responsibility when a Turn ends before recording work. The user-level issue is what native chat acknowledgement guarantees about work acceptance; transport methods/capabilities are research facts. This root does not require the final workflow representation. Exact command payloads depend on A and later execution design.

### D. Startup obligation beyond an activation watcher

**Accepted:** plugin-hosted runtime; reload recovery from durable state; independent executable launched before reload, retained for its operation (`docs/adr/0007-plugin-day-runtime-phuc-hoi.md:3–5`; `docs/design/release-policy.md:43–47`, P1492→P1494).

**Trace:** plugin startup → composition root → Work/Triggers reconcile; activation → Releases → outside executable → reload/health/recovery evidence. Internal keeper cannot restart its own dead host; startup mechanism remains unchosen (`docs/design/modules.md:162,233,268`; `docs/design/architecture.md:76,96,108`).

**Remaining alternatives:** rely on Paseo/operator startup, then reconcile; or provide an explicitly managed local bootstrap that resumes operations after host restart. An activation watcher already running before daemon restart does not demonstrate reboot recovery (`docs/design/release-verification-results.md:25–26,44–46`).

**Blocks/dependencies:** deployment/runbook and unattended recovery claims. Clarifying the desired restart obligation is user-level architecture; choosing an OS launcher is engineering after capability research. This is conditional: do not reopen thick-plugin topology or infer an unattended reboot promise from “resume when host returns.”

## Important engineering branches, not additional first-round user choices

**Runtime composition versus executing TypeScript.** Accepted: runtime foundation plus generated definitions/custom code steps (P250→P252; `docs/adr/0006-typescript-runtime-va-luu-tru.md:3`). WorkflowPrograms validates composition; Work executes; validation performs no code-step I/O (`docs/design/modules.md:150,168–176`). Remaining alternatives are normalized programs interpreted by Work versus versioned executable TS using durable runtime operations. Either must retain five-pattern/dynamic composition and checkpoint/effect guarantees. Framework/interpreter is explicitly unselected (`docs/design/architecture.md:66,108`). This blocks runtime implementation but is delegated engineering unless feasibility would alter accepted authoring/resume behavior. The `WorkflowPrograms → tools` diagram (`docs/design/modules.md:221`) needs alignment with textual ownership, not a new product decision.

**Admission/effect ordering and lifecycle conflicts.** D02 already fixes admission → record Attempt → dispatch (P2232→P2234); GA01 fixes redispatch identity (P2540→P2542). Triggers owns code-handler cursor/event/outbox (`docs/design/modules.md:77–81`); Work owns admission/intents; Releases owns activation with Work checkpoint coordination (`docs/design/release-execution.md:29–31,57–73`). Engineering must choose module-owned operation journals coordinated by admission versus common operation machinery internal to these owners, including recovery writer fencing. In either design, map code-job execution and release/check reservations into shared limits, then persist each owner's intent before its external effect; an offline recovery executable cannot depend on a live Work subprocess. Exact cross-owner claims/transactions are unspecified. This blocks safe effects, not another vote on D02. Generic keeper session creation (`docs/design/modules.md:154`) conflicts with explicit Replace/authority rules (`docs/design/onboarding-implementation.md:147–161`): preserve accepted user-initiated replacement; reconcile the sketch. SDK enforcement, per-Session concurrency, slots, schema cardinalities and measured budgets remain engineering/proof work, not independently justified frontier questions.

**Evidence maintenance:** `docs/design/release-execution.md:9` still says daemon restart is unproven, superseded by the bounded 0.12.0 evidence at `docs/design/release-verification-results.md:23–28`. This is clerical evidence reconciliation. It neither proves reboot recovery nor production resume/fencing. No live validation was performed for this audit.
