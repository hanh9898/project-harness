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

## Remaining composition branches

Closed-loop cycle completion/wake semantics, the timing of knowledge extraction/curation, context retrieval and instruction conflict/precedence details are not all selected by A06. Existing role/procedure/result distinctions, explicit Skill source instructions, auto/fixed/hybrid Principles, bounded delegation/context and pinned bundles stay accepted.

Detailed orchestration/wake mechanisms, context retrieval/continuation, bootstrap seed assets, evaluator integration, dependency/release distribution and management visibility must be traced across these assets before asking for architecture closure again. A03 was not confirmed; neither A05 nor this file closes the session or the aggregate V1 acceptance gate.
