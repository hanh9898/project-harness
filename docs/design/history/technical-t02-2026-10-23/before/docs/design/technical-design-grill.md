# Technical design continuation — Paseo 0.12

2026-10-23. Preparatory design work after [S01 architecture closure](history/architecture-a12-2026-10-23/closure-a12.json). User asked to continue; product scope and overall architecture remain settled. This file tracks technical prerequisites and future Interface/Implementation choices, not authorization to implement the full plugin or change HBU.

## Tree and dependencies

| Node | Required result | Prerequisites | Current state |
| --- | --- | --- | --- |
| T0 | Detailed design with explicit assumptions/deferrals and shared understanding | T1–T6 and resulting frontiers | Open; no closure question yet |
| T1 | Versioned Paseo 0.12 runtime/SDK/plugin/MCP capability baseline | Installed topology and pinned primary sources | **F-T01 completed + parent review**; bounded source/runtime availability, not live integration proof |
| T2 | WorkflowPrograms authoring/plan representation and execution/recovery mechanism | T1 + accepted five patterns/A09 and durable Work contracts | Next plan/interpreter design; no new user DSL/graph editor assumed |
| T3 | SQLite driver/schema/write ordering, durable identities and independent recovery coordination | T1, accepted ownership contracts; plan-specific tables depend on T2 | [T02 engineering proposal](technical-owner-ingress.md): owner acceptance, node:sqlite candidate, transactions/receipts/journal/fencing; DDL and runtime proof remain |
| T4 | Agent MCP transport, authenticated principals and owner Interface lifecycle | T1 and durable receipt/authority contracts; exact launch protocol depends on native facts | [T02 candidate](technical-owner-ingress.md#5-agent-mcp-transport-and-identity); F-T02 checks HTTP credential delivery, UI caller trust and SDK startup |
| T5 | Jobs/native cadence/timers, admission/cancel/wake/Pause protocols | T1/T3/T4 and A07/A10/A11 | Keep settled product behavior; do not ask user API facts |
| T6 | Packaging, version pinning, evaluator/Analytics/release integration and proof matrix | Relevant prior nodes plus agreed V1 gate | Engineering/proof still required |

The [S02 acceptance gate](v1-acceptance-grill.md) contents are accepted V01 and mapped to VA01–VA14; [V02](history/v1-v02-2026-10-23/closure-v02.json) explicitly closes S02 and continues technical design. No library/driver/transport/function signature is accepted merely by appearing in this tree. Routine implementation details can be resolved under the accepted contracts; genuine trade-offs affecting user-visible behavior/cost are presented with concrete consequences.

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

## T02 — owner ingress and durable commands

[Detailed proposal](technical-owner-ingress.md) makes the transport/owner seam, transaction acceptance, scoped replay, records, external-effect recovery and proposed SQLite path reviewable. The local owner contract can be specified independently of the WorkflowPrograms plan representation; only plan-specific execution tables wait for T2. These are engineering proposals under accepted behavior, not user acceptance of every method/table or implementation evidence.

Proposed HTTP MCP lives in the plugin server and calls owners directly. It must not use an internal `daemon.manage` client as a per-agent credential. Per-Session authentication, explicit user lifecycle intent, reload continuity, redaction and current authority are prerequisites, not assumed guarantees. No extra permanent service, hidden provider patch, Skill isolation or native-profile editor is introduced.

### F-T02 — factual prerequisites for finalizing the MCP adapter

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-mcp-auth-facts-r2-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-mcp-auth-facts-r2-20261023`.
- Selection verified from returned task: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`.
- Status: running. Bounded read-only source research, output target `paseo-012-mcp-auth-facts-r2.md`: native Claude/Codex HTTP MCP credential/config delivery, plugin-RPC caller trust, supported SDK startup acquisition, versioned local HTTP MCP authentication requirements.
- No live operations, tests, installs, production implementation, HBU edits or further delegation. Source/API facts are not questions for the user. No material new choice is justified before these prerequisites are resolved; technical T0 remains open.
