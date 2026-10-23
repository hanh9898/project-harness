# Project Harness composition

2026-10-23. Design only. [A05 native acceptance](history/architecture-a05-2026-10-23/acceptance-a05.json) · [Interview/tree](architecture-grill.md). This describes the whole harness, not just its runtime modules. No source layout or runtime implementation has been created by this document.

## Source and deployment unit — accepted A05/Q1

Each project uses a fork of the base repository containing plugin source and versioned operational assets. The fork distinguishes reusable common code from project-specific/generated assets; the target product codebase is referenced. Harness Engineering can change, check and activate local changes from this source and prepare reusable upstream contributions separately. Local use does not wait for upstream acceptance.

The repository includes source for the Paseo client/server plugin, its owning runtime services, agent instructions/definitions, workflows, harness-owned Skills/Principles, code-job handlers and evaluators. This is a source/deployment choice; exact directory names, installer/build commands and distribution of recovery artifacts remain technical design. The seven runtime module names do not define the entire source inventory.

Illustrative source organization, not an accepted executable schema:

```text
src/           plugin UI/server, MCP adapter, owner services, native adapters
harness/       common Engineering definitions/instructions/workflows/jobs/evals
project/       project-specific/generated definitions/instructions/workflows/assets
```

Skills/Principles developed by this harness live in the fork. External pstack/matt packages are referenced by source/version rather than implicitly copied or owned. Git is for versioned source/assets and deliberate exports; active mutable settings/work/journals stay with their SQLite owners. Secrets and mutable operational databases are not made upstream assets by the fork model.

## Agent access — accepted A05/Q2

MCP is the primary access interface through which Onboarding, Harness Engineering Orchestrator, Project Orchestrator and specialists operate the harness. Its Tools call the same owning services as panel/RPC. Work still owns policy/admission/dispatch; AgentDefinitions owns catalog/bindings; Triggers owns jobs/delivery; WorkflowPrograms owns composition validity; Criteria owns criteria/evidence/Verdicts; Releases owns activation/recovery; Analytics owns sourced queries/Saved Views.

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

The common glossary now defines [Instructions](../../GLOSSARY.md#instructions) and [Learned Knowledge](../../GLOSSARY.md#learned-knowledge). The existing 155-concept graph remains its earlier reference snapshot; follow-up integration of these two meanings/relations is tracked in the architecture tree rather than claimed complete.

## Closed-loop completion, wake and learning cadence — accepted A07

[A07 native acceptance](history/architecture-a07-2026-10-23/acceptance-a07.json) confirms that each orchestrator records its cycle disposition through owner MCP Tools: further work, waiting for a worker/person, or the cycle processed. Runtime reconciles durable work/state before continuing or waiting. Final chat prose or a marker is not the completion oracle; a completed orchestration cycle does not establish work completion or criterion satisfaction. Exact state names, Tool schema, cycle identity and interrupted-cycle recovery remain technical design.

Automatic events arriving while the orchestrator is busy retain their individual identities/results/evidence, while their wake needs are coalesced for the logical owner. The default allows the current cycle to finish/reach an appropriate wait boundary, then continues under admission; it does not interrupt for every callback or create another orchestrator. Pause/authority/resource limits and the user's native interrupt remain applicable. Native send semantics, durable wake ordering, missed/duplicate signals and the event-arriving-at-sleep-boundary race still need implementation/proof.

Agents can record short useful learned notes during existing task work, with sources/evidence and uncertainty. A task need not produce a lesson or spend an extra LLM Turn on one. Daily retro curates notes together with outcomes/metrics, consolidates duplicates, checks support and proposes improvement candidates when justified. Candidate checks/activation follow the existing Fast/Deep/authority/compatibility rules; urgent blocker handling is not delayed until daily. Reading a note does not turn it into an operating rule or project requirement.

## Knowledge scope, retrieval and freshness — accepted A08

[A08 native acceptance](history/architecture-a08-2026-10-23/acceptance-a08.json) selects one logical learned-knowledge collection with Harness/Project scope and source/owner/access metadata. Both orchestrators retain their separate Session contexts while querying allowed knowledge through a common Interface. This does not create two projects, an inheritance engine or a second source of active goals/criteria. Physical storage/index/schema and the owning module are not chosen by that logical model.

Harness-prepared initial context includes applicable instructions/shared rules, the task, required decisions/criteria and necessary sources. Additional learned knowledge is retrieved through index/search/read Tools as needed; used content retains source/revision in the execution trace/context selection. This applies to content the harness prepares, not removal or exhaustive inventory of native/project/provider context. Explicit Skill refs and auto/fixed/hybrid Principles remain as agreed.

If relevant sources change or a note is contested/no longer supported, preserve note/history and mark it for applicability recheck, excluding it from automatic default loading. Historical investigation can still retrieve it with qualification/source. Source-byte changes do not by themselves establish a wrong lesson. Verification records a new conclusion/revision; this does not rewrite old history, invalidate authoritative requirements or impose a Deep release for every note check.

## Instruction/context facts — bounded F-A03

[The completed factual memo](instructions-context-facts-r3.md) distinguishes retained smoke evidence from SDK/source contracts and inference. Explicit file reads and an owner MCP Tool returning durable handover content have bounded Codex smoke evidence. A complete inventory of inherited instructions, universal provider/source precedence, generic MCP resource discovery and automatic semantic-conflict detection remain unsupported claims. A fresh worker Session still inherits its native environment.

This supports explicit read-on-demand design without claiming every reference was read or every inherited source was observed. Mechanical reference/digest/revision checks and semantic judgment have different limits. Existing project-requirement ownership, mandatory authority/checks and decision handling for observed conflicts remain in force; F-A03 does not select a hidden precedence policy or remove native inputs. Exact version/provider delivery, diagnostics, budgets and compaction behavior need engineering/contract proof.

## Remaining composition branches

A09 asks who owns the learned-note lifecycle/Interface and when a task-specific composition needs a release. Context delivery diagnostics/source handling, bootstrap seed assets, evaluator integration and release/dependency distribution still need full tracing. Existing explicit Skill refs, Principles, bounded delegation/context and pinned bundles are not reopened by these branches.

Detailed orchestration/wake mechanisms, context retrieval/continuation, bootstrap seed assets, evaluator integration, dependency/release distribution and management visibility must be traced across these assets before asking for architecture closure again. A03 was not confirmed; neither A05 nor this file closes the session or the aggregate V1 acceptance gate.
