# Project Harness — whole-system architecture review

2026-10-23. **Current synthesis proposed for shared-understanding confirmation.** The scoped choices A01/A02/A05–A11 are accepted; this review does not close the architecture session, accept the separate V1 gate, approve every TypeScript sketch or establish production capability. [Interview and evidence](architecture-grill.md) · [Composition](harness-composition.md) · [Interactive review](architecture-whole-harness-review.html).

## 1. What the user installs and owns

One project uses one fork of the base repository and one thick TypeScript Paseo Plugin. The harness is the complete project-specific system: agent definitions/instructions, methods, Tools/integrations, workflows/runtime, knowledge/state, schedules/jobs, policies, evaluators, Analytics, release/recovery and management UI. The plugin is its deployment surface; MCP, CLI and Skills are constituent/access mechanisms, not alternative names for the whole system.

The fork separates reusable common assets from project-specific/generated assets and references the target product codebase. Starter assets include Onboarding/Harness Engineering instructions and definitions, specialist presets for Observe/Retro, Investigate, Design/Plan, Implement and Verify, workflow blocks/templates and validation/eval fixtures. They are adaptable starting points, not five mandatory stages, pre-spawned workers or proof a selected model is competent.

Harness-owned assets can evolve through authorized candidate/check/activation. Installed pstack/matt packages, Paseo native profiles and external provider/Tool installations retain their owners; the harness references and checks them rather than silently overwriting machine-wide installations. Selected upstream patches enter local candidate/check/activation; local use and outbound contribution are separate work. No automatic upstream import job is implied.

## 2. Two orchestrators, with code owning continuity

**Harness Engineering Orchestrator** consumes its inbox, uses appropriate specialists/Skills/Principles, constructs the Project Orchestrator and improves the whole harness, including itself. **Project Orchestrator** handles project tasks and requirements, composes permitted workflows, delegates and evaluates results. They have separate inbox/context/lifecycle and share the kit's effective authority/resource limits.

An Orchestrator Agent performs reasoning in a native Session. Work's code-controlled lifecycle persists accepted work, governs admission/dispatch, validates structured cycle disposition and reconciles interruption. An agent's Turn ending is neither work completion nor criteria satisfaction. No outer LLM is required for timer polling/health checks, and no extra orchestrator is spawned for each event.

## 3. First use and daily operation

1. The user Spawns Onboarding in native Paseo chat. MCP Tools configure the kit through the same owners as the UI, resolve existing native profiles/installed methods, record revisions and Handover, and check the relevant readiness conditions.
2. The user Spawns Harness Engineering. It inspects the codebase, adapts starter assets and builds the initial Project Orchestrator/catalog/workflows within authority. Configured/enabled daily retro becomes eligible only when required bindings/cadence/authority are ready.
3. The user Spawns Project Orchestrator. User-selected representative work establishes the scope of operational verification; source/configuration/readiness alone is not capability proof. The project harness continues evolving through subsequent work.
4. Native chat remains the primary interface for detailed project work. The menu/panel manages lifecycle, config, harness requests, monitoring and deep Analytics. Missing capability creates linked harness work; unrelated eligible work can continue.

Fresh install/Onboarding does not start an LLM loop or real external polling. Backlog/PR polling requires connection/filter/cadence and enabled state. Restart reconciles persisted state without re-enabling disabled jobs or automatically Spawning/Replacing an orchestrator. Open Session opens the existing chat; Replace Session is a separate user action with Handover/authority transfer. Startup relies on existing Paseo/machine startup or opening Paseo, not a new OS-service promise.

## 4. Interfaces and eight owners

Agents primarily call harness MCP Tools; UI/RPC use the same owner Interfaces. Code-job handlers call those Interfaces directly. CLI supports concrete scripts and independent recovery; agents retain authorized native shell/Git/provider Tools and other MCP integrations. The MCP adapter does not become a second store or grant authority through Tool visibility.

| Owner module | Knowledge and lifecycle hidden behind its Interface |
| --- | --- |
| AgentDefinitions | Catalog/definition revisions, role/instruction/Skill/Principle bindings and valid configuration resolution; native profiles remain Paseo-owned. |
| Work | Both inboxes; Actions/Limits/Delegation Policy revisions; acceptance/receipts, admission, Assignment, dispatch, timers/checkpoints, cycle/wake, Pause/Resume and reconciliation. |
| WorkflowPrograms | Valid structure/contracts/bounds for chaining, routing, parallelization, orchestrator-workers and evaluator-optimizer; composable/nested programs and task plans. |
| Triggers | Code-job registry/cadence, source bindings, occurrences, delivery/cursors, bounded overlap/missed/catch-up policy; native cadence retains its own owner. |
| Criteria | Authoritative criteria/scope/revisions, evidence-based checks and Verdicts; an Outcome is not automatically a positive Verdict. |
| Knowledge | Sourced/scoped/qualified learned notes, history, retrieval and applicability-review lifecycle; not a second requirements or execution store. |
| Analytics | Sourced queries/comparisons/Saved Views across owner records, drill-down and missing data; no arbitrary transcript parsing or causal claims from operational comparison. |
| Releases | Candidate-specific checks, authorized activation/observation, compatible release/recovery artifacts and independent recovery when the plugin cannot boot. |

These are code modules in the same plugin, not eight services/databases. Interface sketches do not settle every method/schema or coordination protocol.

## 5. Four operating traces

**Task execution:** native chat → agent interpretation → owner Tool commits acceptance/Receipt → choose/compose registered blocks → validate/pin plan, criteria and bundle → admission/worker Assignment → native execution → structured result/Evidence → Criteria Verdict → continue/bound quality revision or hand back. A task-specific composition needs no plugin release; publishing reusable/persistent behavior follows candidate/check/activation. Missing/uncertain effects are reconciled before retry; GA01 and late-result applicability remain unchanged.

**Non-agent automation:** a code job polls Backlog or PR comments → normalize/dedupe → commit source progress plus durable delivery → proper inbox → coalesced eligible wake. Empty polling does not call an LLM. Triggers owns code-job cadence; Paseo owns bound agent schedules/heartbeats; Work owns retry/deadline timers. Once/interval/cron/timezone and bounded overlap/missed/catch-up remain V1, subject to actual bridge capability.

**Learning and improvement:** useful in-task note with evidence/uncertainty → Knowledge → daily retro plus outcomes/Analytics → consolidate/check applicability → hypothesis/candidate when justified → relevant Fast/Deep checks → authorized activation → observations and keep/fix-forward/compatible recovery/inconclusive. No mandatory lesson/extra LLM Turn per task, forced daily patch, Deep gate for every note or universal baseline trial for every small change.

**Pause and recovery:** explicit durable Pause blocks controlled automatic wake/new admission for one orchestrator; already-running workers and independent enabled ingestion retain progress/results/events, and the other orchestrator is unaffected. Native Stop requests Turn interruption and does not set logical Pause. Resume needs authority/admission; event/reload/Open Session does not Resume. Native cadence coordination shows pending versus confirmed truthfully. Cancellation/job disable/whole-kit stop have separate scope; no undo of external effects is implied.

## 6. Context, authority and stored truth

Versioned instructions and mandatory rules/task/criteria enter the harness-prepared context; further learned knowledge uses scoped index/search/read retrieval. Selected sources/revisions remain traceable. Source drift/contestation marks notes for recheck, removes them from default automatic loading and preserves qualified history. A source-byte change does not establish a wrong lesson; promotion into instructions/Skills/workflows uses the candidate path.

Native primary/fallback profile references select model/options from Paseo. Explicit Skill names/sources and auto/fixed/hybrid Principles govern chosen methods; discovery can still expose inherited Skills. There is no isolation/fork/monkeypatch promise or universal native instruction inventory/precedence. New worker work defaults to a fresh Session; same-Assignment continuation retains it, compatible reuse is explicit, and retry/redispatch keeps established identities.

Git owns versioned source/assets; SQLite owners hold active mutable revisions and durable execution/operation history; large artifacts use references/digests. Context snapshots, learned knowledge and authoritative criteria are distinct. Intent precedes external effects, local transactions do not include Paseo/Git/external services, and live events only wake reconciliation. Authority/limits are checked at admission and before effects; old snapshots do not preserve revoked grants. Consult/delegation limits and native enforcement remain applicable.

## 7. Evidence and the remaining boundary

[Whole-kit audit](harness-whole-kit-coverage-facts-r5.md) traces 11 constituent areas; [composition](harness-composition.md) maps selected upstream changes and installed/bound/selected/checked/active observations to existing owner views. [Graph/CQ ledger](v1-competency-ledger.md) records conceptual coverage with relationship/provenance/runtime limits kept separate. The earlier A03 review remains historical and was not accepted as whole-harness closure.

Installer/build/distribution, SDK/provider pins, interpreter, schema/transactions, MCP auth/transport, scheduler bridge, wake/cancel/fencing protocols, metrics/evaluator datasets/calibration, installed recovery artifact coordination, UI projections/localization and provider parity still need engineering/contract proof. Existing isolated spikes do not establish end-to-end production V1. If implementation reveals an incompatible requirement, return to the affected decision rather than silently reducing scope.

[B9 synchronization/validation](history/architecture-b9-2026-10-23/review-b9.json) is recorded: new meanings and CQ52–CQ57 are integrated while original records/runtime evidence remain unchanged. Shared-understanding confirmation concerns this architecture scope and explicit engineering deferrals. It does not implement the product, accept the separate aggregate V1 gate or turn every inferred graph edge into an approved invariant.
