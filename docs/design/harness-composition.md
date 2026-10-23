# Project Harness composition

2026-10-23. Design only. [A05 native acceptance](history/architecture-a05-2026-10-23/acceptance-a05.json) · [Interview/tree](architecture-grill.md). This describes the whole harness, not just its runtime modules. No source layout or runtime implementation has been created by this document.

## Source and deployment unit — accepted A05/Q1

Each project uses a fork of the base repository containing plugin source and versioned operational assets. The fork distinguishes reusable common code from project-specific/generated assets; the target product codebase is referenced. Harness Engineering can change, check and activate local changes from this source and prepare reusable upstream contributions separately. Local use does not wait for upstream acceptance.

The repository includes source for the Paseo client/server plugin, its owning runtime services, agent instructions/definitions, workflows, harness-owned Skills/Principles, code-job handlers and evaluators. This is a source/deployment choice; exact directory names, installer/build commands and distribution of recovery artifacts remain technical design. The current eight runtime module names do not define the entire source inventory.

Illustrative source organization, not an accepted executable schema:

```text
src/           plugin UI/server, MCP adapter, owner services, native adapters
harness/       common Engineering definitions/instructions/workflows/jobs/evals
project/       project-specific/generated definitions/instructions/workflows/assets
```

Skills/Principles developed by this harness live in the fork. External pstack/matt packages are referenced by source/version rather than implicitly copied or owned. Git is for versioned source/assets and deliberate exports; active mutable settings/work/journals stay with their SQLite owners. Secrets and mutable operational databases are not made upstream assets by the fork model.

## Agent access — accepted A05/Q2

MCP is the primary access interface through which Onboarding, Harness Engineering Orchestrator, Project Orchestrator and specialists operate the harness. Its Tools call the same owning services as panel/RPC. Work still owns policy/admission/dispatch; AgentDefinitions owns catalog/bindings; Triggers owns jobs/delivery; WorkflowPrograms owns composition validity; Criteria owns criteria/evidence/Verdicts; Releases owns activation/recovery; Analytics owns sourced queries/Saved Views; Knowledge owns the learned-note lifecycle/retrieval confirmed in A09.

Tool groups can expose config/catalog, work/delegation, jobs, context/evidence, Analytics and release operations within each caller's authority. Exact names/schemas/catalog grouping are not selected by A05. The server/owner checks authenticated context and effective authority; catalog visibility is not enforcement. A Tool capable of submitting work or requesting activation does not implicitly grant that caller those rights.

CLI serves independent recovery and scripts needing it; in-process code handlers use owning Interfaces directly. Agents can still use native shell/Git/provider Tools and other MCP integrations where appropriate. This choice does not require wrapping every external Tool in the harness MCP Server. MCP transport/lifecycle, role capability binding and native enforcement require design/proof; the Onboarding smoke does not prove the enlarged V1 Tool surface.

## Self-mutation ownership — accepted A05/Q3

Harness Engineering directly improves harness-owned plugin code, workflows, instructions, Skills/Principles, job handlers, evaluators and data schema through the already agreed candidate/check/activation/recovery flow. It does not acquire authority over all machine installations because its source is writable.

External/shared pstack/matt installations, Paseo native profiles and provider/tool installations retain their own owners and configuration/update mechanisms. The harness records source/revision/refs, validates dependency compatibility and uses authorized owner paths when a change is needed. It does not silently overwrite a shared installation. Authorized native Onboarding intents remain valid; there is no new requirement for manual approval of every already-authorized local improvement.

Dependency revision selection is different from rewriting the external package. A05 does not add Skill isolation, fork Paseo, introduce a universal dependency manager or provide native APIs not yet verified.

This self-mutation boundary does not prohibit workers from changing the product codebase under an authorized project Assignment. Project-code effects keep their own scope/authority; they are not shared-installation edits or harness self-release by implication.

## Instructions, learned knowledge and worker Sessions — accepted A06

[A06 native acceptance](history/architecture-a06-2026-10-23/acceptance-a06.json) confirms versioned instruction files for agents/roles. Role/definition references identify the appropriate guidance; the harness combines it with common operating rules and Assignment context. Role responsibilities/procedure/result contracts keep their owner rather than being duplicated into native profiles. Skills/Principles retain methods and the native profile retains model/options. This does not promise that the harness can override every native/system/project instruction; exact delivery/read-path and conflict handling remain technical design.

Reusable lessons persist outside transcripts and execution journals, retaining source/evidence, scope and certainty. Hypotheses remain qualified. Notes can inform future context; changing operating instructions, Skills, Procedures or workflows from those lessons follows the agreed candidate/check/activation path. Goals, requirements and criteria retain their owners/authority. A06 does not select a vector store, knowledge schema/index, extraction cadence or physical source layout.

A worker begins new work in a fresh Session by default. Clarification and further Turns continuing the same Assignment retain the existing Session. Explicit compatible-reuse policy can permit otherwise; an idle worker alone is not evidence of compatibility. Orchestrators keep their separate native Open/Replace lifecycle. Retry/fallback still obey GA01 and reconciliation; this default does not make every retry a new Session or change execution identities, slot counts or per-Session concurrency.

The common glossary defines [Instructions](../../GLOSSARY.md#instructions) and [Learned Knowledge](../../GLOSSARY.md#learned-knowledge). B9 integrates these meanings into the 157-concept model with CQ52–CQ57, conservative directed relations and scoped constraints. The original 155 concepts/CQ01–CQ51 and their runtime evidence remain preserved; a documentation update is not runtime verification.

## Closed-loop completion, wake and learning cadence — accepted A07

[A07 native acceptance](history/architecture-a07-2026-10-23/acceptance-a07.json) confirms that each orchestrator records its cycle disposition through owner MCP Tools: further work, waiting for a worker/person, or the cycle processed. Runtime reconciles durable work/state before continuing or waiting. Final chat prose or a marker is not the completion oracle; a completed orchestration cycle does not establish work completion or criterion satisfaction. Exact state names, Tool schema, cycle identity and interrupted-cycle recovery remain technical design.

Automatic events arriving while the orchestrator is busy retain their individual identities/results/evidence, while their wake needs are coalesced for the logical owner. The default allows the current cycle to finish/reach an appropriate wait boundary, then continues under admission; it does not interrupt for every callback or create another orchestrator. Pause/authority/resource limits and the user's native interrupt remain applicable. Native send semantics, durable wake ordering, missed/duplicate signals and the event-arriving-at-sleep-boundary race still need implementation/proof.

Agents can record short useful learned notes during existing task work, with sources/evidence and uncertainty. A task need not produce a lesson or spend an extra LLM Turn on one. Daily retro curates notes together with outcomes/metrics, consolidates duplicates, checks support and proposes improvement candidates when justified. Candidate checks/activation follow the existing Fast/Deep/authority/compatibility rules; urgent blocker handling is not delayed until daily. Reading a note does not turn it into an operating rule or project requirement.

## Knowledge scope, retrieval and freshness — accepted A08

[A08 native acceptance](history/architecture-a08-2026-10-23/acceptance-a08.json) selects one logical learned-knowledge collection with Harness/Project scope and source/owner/access metadata. Both orchestrators retain their separate Session contexts while querying allowed knowledge through a common Interface. This does not create two projects, an inheritance engine or a second source of active goals/criteria. A09 assigns its owner to Knowledge; physical storage/index/schema remain technical design.

Harness-prepared initial context includes applicable instructions/shared rules, the task, required decisions/criteria and necessary sources. Additional learned knowledge is retrieved through index/search/read Tools as needed; used content retains source/revision in the execution trace/context selection. This applies to content the harness prepares, not removal or exhaustive inventory of native/project/provider context. Explicit Skill refs and auto/fixed/hybrid Principles remain as agreed.

If relevant sources change or a note is contested/no longer supported, preserve note/history and mark it for applicability recheck, excluding it from automatic default loading. Historical investigation can still retrieve it with qualification/source. Source-byte changes do not by themselves establish a wrong lesson. Verification records a new conclusion/revision; this does not rewrite old history, invalidate authoritative requirements or impose a Deep release for every note check.

## Instruction/context facts — bounded F-A03

[The completed factual memo](instructions-context-facts-r3.md) distinguishes retained smoke evidence from SDK/source contracts and inference. Explicit file reads and an owner MCP Tool returning durable handover content have bounded Codex smoke evidence. A complete inventory of inherited instructions, universal provider/source precedence, generic MCP resource discovery and automatic semantic-conflict detection remain unsupported claims. A fresh worker Session still inherits its native environment.

This supports explicit read-on-demand design without claiming every reference was read or every inherited source was observed. Mechanical reference/digest/revision checks and semantic judgment have different limits. Existing project-requirement ownership, mandatory authority/checks and decision handling for observed conflicts remain in force; F-A03 does not select a hidden precedence policy or remove native inputs. Exact version/provider delivery, diagnostics, budgets and compaction behavior need engineering/contract proof.

## Knowledge owner and composition/publication boundary — accepted A09

[A09 native acceptance](history/architecture-a09-2026-10-23/acceptance-a09.json) assigns learned-note recording/read/search, scope/authority, source/revision/history, qualification and applicability-review lifecycle to module Knowledge. MCP, daily retro and runtime use the same owner Interface. Work retains execution/context snapshots, AgentDefinitions its agent bindings and Criteria criteria/Verdicts. The module does not create a service/database or mandatory CRUD UI; its detailed Interface/storage still needs design.

Project Orchestrator can combine registered blocks/roles/Tools into a task-specific composition. WorkflowPrograms validates structure/contracts/bounds, Work pins the plan version and enforces current authority before execution. A different task plan does not require plugin release. Output/criteria/effect checks remain mandatory; this is not execution of unverified generated code or ad hoc privilege escalation.

Registering a reusable workflow or changing persistent code steps, Tools, Skills or operating behavior follows candidate/check/activation. Exact run-scoped composition representation/identity and published-definition references are not chosen by A09. Both preserve reproducibility/source/version, allowed dynamic expansion and checkpoint compatibility; there is no blanket requirement for a Git commit/plugin reload per task plan.

## Starter assets and automation arming — accepted A10

[A10 native acceptance](history/architecture-a10-2026-10-23/acceptance-a10.json) confirms that the base ships versioned Onboarding/Harness Engineering instructions and definitions, starter specialist presets for Observe/Retro, Investigate, Design/Plan, Implement and Verify, reusable workflow blocks/templates and corresponding validation/eval fixtures. Engineering reuses/adapts them to construct the Project Orchestrator and project-specific capabilities. These are source assets, not pre-spawned Sessions or a mandatory five-role pipeline. Exact file layout and role count remain revisable engineering choices.

Onboarding binds pre-existing native profiles and installed Skills/Principles through their owners. An unbound preset is not runnable; shipped fixtures do not prove any chosen provider/model works. Missing dependencies only block dependent work, retaining existing capability/authority and initial-verification gates. Shared pstack/matt installations remain external references under A05.

Fresh installation/Onboarding does not start an LLM loop or real Backlog/GitLab polling. Plugin load/reconcile/health code can operate. Enabled daily retro becomes eligible after user Spawn Engineering and required bindings, cadence and authority are ready. Polling code jobs require configured connection/filter/cadence and enabled state. Previously authorized recurring executions do not need per-run approval.

Restart/reload reconciles persisted enabled/disabled state, without re-enabling disabled jobs or automatically spawning/replacing an orchestrator. Native agent cadence retains Paseo ownership; this does not establish an unverified scheduler bridge or OS-startup guarantee. Retained work is distinct from an available Session. Native Stop versus logical Pause remains a separate decision.

## Native Stop facts — bounded F-A04

[The completed source/declaration audit](orchestrator-stop-pause-facts-r4.md) found native Stop cancellation separate from schedules/heartbeats and harness admission. The inspected terminal events do not provide reliable human-initiator/request correlation; cancellation also occurs on interruption/reload. Best-effort hooks do not establish durable Stop-intent recovery or shared ordering with Work admission. This is read evidence, not a new live test or a universal API inventory.

A11 accepts explicit Work Pause/Resume, keeping native Stop as a separate Turn interruption request. There is no native Stop-to-Pause promise. Owner control through a durable Receipt is architecturally distinguishable from a native canceled event. Exact bridge/acknowledgement, provider settlement and wake races still require engineering/contract proof.

## Orchestrator Pause/Resume — accepted A11

[A11 native acceptance](history/architecture-a11-2026-10-23/acceptance-a11.json) confirms durable logical-orchestrator Pause/Resume via the shared Work owner Interface for UI/MCP. Pause blocks automatic wake and new work admission under that orchestrator until an authorized Resume; canceled/idle, a new event, opening chat or reload does not set or clear it implicitly. Native Stop remains a request to interrupt the current Turn, after which future eligible events/cadence may wake the unpaused agent.

Already-running workers retain their admitted work, results/evidence/events are kept, and independent enabled ingestion jobs may continue into the inbox. The other orchestrator is outside that pause scope. Results reaching the paused side cannot trigger new dispatch/progression. Worker cancellation, job disabling and whole-kit stop are separate scoped controls; current authority revocation still applies to running work.

This is a harness control, not a duplicate native Stop or native schedule editor. Coordination with bound native cadence must use its owner/capability and show pending versus confirmed truthfully. The contract does not promise control of arbitrary manual/native prompts outside the harness, immediate cancellation/undo of effects or a new native interception API. Detailed protocol, active Turn behavior, ordering and provider enforcement remain engineering/proof work. [UI meanings](../ui/GLOSSARY.md#pause-orchestrator) are scoped English controls; localized labels/presentation remain UI copy/design work.

## Selected upstream patch — trace of existing contracts

This walkthrough applies A05 source ownership and the existing release policy; it does not establish an automatic base-update discovery/import job. When an authorized upstream patch is selected for local use, Harness Engineering records linked work/source revisions, reviews the common/project diff and conflicts against the current fork, and prepares a local candidate. Project customizations and active authority are inputs to compatibility/checks, not permission to overwrite local changes blindly.

Required checks follow Fast/Deep classification and evidence reuse for the actual candidate/dependencies. Releases activates only under current authority/compatibility, with independent recovery prepared for the operation where required. Existing work retains pinned versions or follows the accepted compatible checkpoint path. Unresolved conflict or missing evidence blocks that change, not unrelated eligible work. Contribution in the other direction remains separately scoped work without private project state; local use does not wait for upstream acceptance.

Exact upstream discovery cadence, merge tooling, release packaging and installer/update transport remain engineering or an additional requested product behavior. They are not silently supplied by the source-fork choice.

## Asset visibility through existing owner views

This maps existing config/monitor/evidence requirements to their owners. The words below describe different observations, not a new shared status enum, an exhaustive native-source inventory or an extra asset-management screen. Source-present, bound, selected, checked and active must not be reported as equivalent.

| Asset | Owner-backed observation and existing read path |
| --- | --- |
| Agent instructions/definitions and method refs | Agents/catalog shows definition/bindings and source issues; Work detail shows the pinned selected bundle and recorded reads/context; complete native input inventory is not promised. |
| Workflow blocks/templates and a task plan | WorkflowPrograms supplies registered/validated composition identity; Work detail shows the pinned plan, actual execution and outcome evidence. A template in source is not a completed Run. |
| Code jobs and native cadence bindings | Automations reads the correct owner configuration and observed state, last observation/error/receipt and linked work; a binding alone does not establish delivery or executor availability. |
| Learned notes | Knowledge retrieval returns source/scope/qualification/history; execution trace identifies notes actually selected. An accessible note is not an active operating rule or requirement; a CRUD screen is not required. |
| Evaluators, fixtures and capability checks | Work/Criteria evidence identifies the exercised version, criteria and supported scope; Analytics preserves missing data and comparison limits. Shipped fixtures do not prove a profile or capability passed. |
| Plugin/recovery artifacts and selected releases | Releases detail/recovery guidance distinguishes candidate/source identity, checks, activation/observed version and data/recovery compatibility for the operation. Source files do not establish an installed independent executable. |

UI/MCP read the same owning Interfaces; native details open through supported Paseo surfaces rather than invented links. Exact projections/schema/navigation, distribution and verification of installed artifacts remain engineering/proof. [F-A05](harness-whole-kit-coverage-facts-r5.md) records the bounded coverage audit; these walkthroughs do not themselves approve new decisions. B9 synchronization has its own [evidence/validation](history/architecture-b9-2026-10-23/review-b9.json).

## Remaining composition branches

Starter assets/arming are settled by A10; native Stop/explicit Pause and its scope are settled by A11. The parent-reviewed F-A05 matrix traces 11 constituent areas. Selected upstream change and cross-asset visibility walkthroughs above address documentation gaps using existing contracts. B9 graph/CQ synchronization is complete within its documented source scope; [current whole-harness synthesis](architecture-whole-harness-review.md) awaits shared-understanding confirmation. Context delivery, actual evaluation, release/dependency distribution, projections and installation still require detailed engineering/proof. Existing explicit Skill refs, Principles, bounded delegation/context and pinned bundles are not reopened by these branches.

Detailed orchestration/wake mechanisms, context retrieval/continuation, evaluator integration and installation/recovery protocols are not proved by a document trace. A03 was not confirmed historically; the newer [A12 synthesis](history/architecture-a12-2026-10-23/closure-a12.json) subsequently closed overall architecture S01, and [V02](history/v1-v02-2026-10-23/closure-v02.json) closed the separate V1 gate-definition session. Neither closure is runtime proof or technical T0 closure.

## Scoped follow-ups — T03/T05

[T03](history/technical-t03-2026-10-23/acceptance-t03.json) selects one-time public SDK connection setup and direct HTTP MCP with separate scoped native-persisted Session tokens. [T05](history/technical-t05-acceptance-2026-10-23/acceptance-t05.json) allows Triggers to own a harness Schedule targeting code, agent work or a workflow when native cadence cannot meet the required contract. Adequate native cadence retains its owner; each Schedule has one owner without replay by a second engine. Work retains authority/resources/Pause and execution. These are scoped amendments after A12, not a new runtime service, another native profile manager or automatic migration of existing schedules. Exact protocols/proof remain in [technical design](technical-design-grill.md).

## Scoped follow-up — T07

[T07 accepted](history/technical-t07-2026-10-23/acceptance-t07.json): V1 self-update uses a prepared local native-plugin installation with stable runtime ID/path. Fork source and checked snapshots are distinct; Releases coordinates publication/native reload while data, credentials and the operation-pinned independent Recovery Executable stay outside replaced source. The base supplies the initial prepared artifact. Exact filesystem/native compatibility is unproved; this does not add a service, migrate an existing installation, or require a manual release approval for each authorized patch. Native managed-update behavior remains separate from the selected data-aware release/recovery protocol.
