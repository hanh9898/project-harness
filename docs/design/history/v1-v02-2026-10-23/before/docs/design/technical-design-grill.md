# Technical design continuation — Paseo 0.12

2026-10-23. Preparatory design work after [S01 architecture closure](history/architecture-a12-2026-10-23/closure-a12.json). User asked to continue; product scope and overall architecture remain settled. This file tracks technical prerequisites and future Interface/Implementation choices, not authorization to implement the full plugin or change HBU.

## Tree and dependencies

| Node | Required result | Prerequisites | Current state |
| --- | --- | --- | --- |
| T0 | Detailed design with explicit assumptions/deferrals and shared understanding | T1–T6 and resulting frontiers | Open; no closure question yet |
| T1 | Versioned Paseo 0.12 runtime/SDK/plugin/MCP capability baseline | Installed topology and pinned primary sources | **F-T01 completed + parent review**; bounded source/runtime availability, not live integration proof |
| T2 | WorkflowPrograms authoring/plan representation and execution/recovery mechanism | T1 + accepted five patterns/A09 and durable Work contracts | SDK-dependent choices wait; no new DSL/graph editor assumed |
| T3 | SQLite driver/schema/write ordering, durable identities and independent recovery coordination | T1/T2 and existing source-of-truth/fencing rules | Detailed engineering not chosen |
| T4 | Agent MCP transport, authenticated principals and owner Interface lifecycle | T1/T3, Onboarding/current owner contracts | Existing 0.11.1 spike is bounded evidence only |
| T5 | Jobs/native cadence/timers, admission/cancel/wake/Pause protocols | T1/T3/T4 and A07/A10/A11 | Keep settled product behavior; do not ask user API facts |
| T6 | Packaging, version pinning, evaluator/Analytics/release integration and proof matrix | Relevant prior nodes plus agreed V1 gate | Engineering/proof still required |

The [S02 acceptance gate](v1-acceptance-grill.md) contents are accepted V01 and mapped to VA01–VA14; explicit S02 closure remains pending. No library/driver/transport/function signature is accepted merely by appearing in this tree. Routine implementation details can be resolved under the accepted contracts; genuine trade-offs affecting user-visible behavior/cost are presented with concrete consequences.

## F-T01 — bounded 0.12 factual investigation

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-paseo-012-runtime-contracts-r1-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-paseo-012-runtime-contracts-r1-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output: [paseo-012-technical-baseline-facts-r1.md](paseo-012-technical-baseline-facts-r1.md). Status: **completed**, parent has read the full report.
- Scope: exact 0.12 package/runtime availability, plugin subprocess/SQLite feasibility, public MCP/owner-RPC options and relevant SDK/profile/result/cancellation/reconnect contracts. Primary version-pinned sources distinguish local 0.11.1 spike artifacts, installed 0.12 and deployed newer docs. No SDK-dependent question is put to the user before the facts are available.
- Read-only research: no agent/plugin/daemon/schedule mutation, installs, HBU changes, live tests or further delegation. Facts do not choose the runtime library, plan representation, storage schema or MCP transport, and do not close technical design/V1 acceptance.

### Parent review F-T01

Read the version-pinned report against A05 MCP/owner contracts, A09 task composition and A11 durable Pause. Published client/plugin/protocol 0.12.0 and their peer versions are source facts. Standalone bundled Helper reports Node 24.20.0 and exposes `node:sqlite`; shell Node 20.19.3 lacks it. Compiler `node20` syntax target is not a runtime/builtin guarantee. These observations support a possible in-process SQLite path, not a production driver/locking/migration/fencing pass; do not treat every Node 22 minor as equivalent.

The public plugin server context has RPC/hooks but no MCP Tool registration. An in-process HTTP adapter to owner Interfaces or an external stdio bridge remains implementation work. Existing low-level plugin RPC uses an internal client path and `daemon.manage`; it is not a per-agent scoped credential. Principal/session/generation authorization cannot be inferred from generic RPC input or Tool visibility. No broad daemon-management credential is granted to agents by this report.

RPC timeout/reload does not prove cancellation or durable acceptance; known A02/A07/A11 ordering/receipt/admission obligations remain. SDK idempotency-related fields require their actual scope/retention to be checked; outputSchema still requires application validation. Hooks/subscriptions do not supply durable event replay or native human Stop attribution. Existing 0.11.1 spikes stay historical; neither package availability nor the daemon upgrade establishes provider parity/onboarding/MCP recovery on 0.12.

Package/runtime pins, driver/schema, serializable plan mechanics and transport can be proposed as engineering choices within settled scope. Escalate a concrete change to supported hosts/providers, installation obligations, credential authority, retained history, authoring capability or recovery guarantees as a user decision. Next engineering work should make owner ingress/auth and the persistence/plan seams concrete before implementation; no additional product choice is invented from missing method signatures.
