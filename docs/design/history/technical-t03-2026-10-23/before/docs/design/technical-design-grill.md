# Technical design continuation — Paseo 0.12

2026-10-23. Preparatory design work after [S01 architecture closure](history/architecture-a12-2026-10-23/closure-a12.json). User asked to continue; product scope and overall architecture remain settled. This file tracks technical prerequisites and future Interface/Implementation choices, not authorization to implement the full plugin or change HBU.

## Tree and dependencies

| Node | Required result | Prerequisites | Current state |
| --- | --- | --- | --- |
| T0 | Detailed design with explicit assumptions/deferrals and shared understanding | T1–T6 and resulting frontiers | Open; no closure question yet |
| T1 | Versioned Paseo 0.12 runtime/SDK/plugin/MCP capability baseline | Installed topology and pinned primary sources | **F-T01 completed + parent review**; bounded source/runtime availability, not live integration proof |
| T2 | WorkflowPrograms authoring/plan representation and execution/recovery mechanism | T1 + accepted five patterns/A09 and durable Work contracts | Next plan/interpreter design; no new user DSL/graph editor assumed |
| T3 | SQLite driver/schema/write ordering, durable identities and independent recovery coordination | T1, accepted ownership contracts; plan-specific tables depend on T2 | [T02 engineering proposal](technical-owner-ingress.md): owner acceptance, node:sqlite candidate, transactions/receipts/journal/fencing; DDL and runtime proof remain |
| T4 | Agent MCP transport, authenticated principals and owner Interface lifecycle | T1 and durable receipt/authority contracts; exact launch protocol depends on native facts | F-T02 completed + parent review; **T03/Q1–Q2 open** for startup connection and credential custody, [T02 candidate](technical-owner-ingress.md#5-agent-mcp-transport-and-identity) remains provisional |
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
- Status: **completed + parent review**. Output: [paseo-012-mcp-auth-facts-r2.md](paseo-012-mcp-auth-facts-r2.md), bounded read-only source research into native Claude/Codex HTTP MCP credential/config delivery, plugin-RPC caller trust, supported SDK startup acquisition and versioned local HTTP MCP authentication requirements.
- No live operations, tests, installs, production implementation, HBU edits or further delegation. Source/API facts are not questions for the user. The facts substantiate the two choices below; technical T0 remains open.

### Parent review F-T02

Read the full report, then independently read pinned plugin setup/RPC implementation, public SDK connection configuration, MCP configuration types and native serialization/storage. [Review record](history/technical-t02-2026-10-23/review-t02.json) preserves report digest, sources, limits and the proposed decision frontier.

1. Native per-Session `mcpServers` is supported as a configuration path; literal HTTP headers and stdio environment values are persisted with the agent. There is no public HTTP secret-reference field in the inspected 0.12 union. This proves storage behavior, not an observed leak or live provider interoperability. A Session-specific credential must not be put in a reusable native profile.
2. Setup receives no public SDK accessor; the internally connected SDK is supplied only to invoked hooks/RPCs. Waiting for such a call is not guaranteed startup reconcile. A standalone public client with explicit connection parameters is a supported design candidate, with additional one-time setup. Internal IPC interception/undocumented ambient credentials are not substituted silently.
3. Host plugin RPC is gated by `daemon.manage`, not human-gesture attestation. Its handler does not identify the originating user/agent. Keep daemon-administration credentials out of agent MCP grants; do not claim a role field or `useRpc` alone proves who clicked a button. A physical-human attestation feature is not introduced by this finding. The detailed trusted-caller protocol remains to be specified under the accepted explicit-user lifecycle contract.
4. Wire MCP Session IDs do not authenticate native Sessions. The reported newer 2026 specification is not assumed supported by either provider; pin/negotiation tests must establish the actual revision. Local custom bearer pairing is not the standardized OAuth flow, and HTTP Origin/host/auth requirements remain applicable.

## T03 — ready decision frontier after F-T02

Both questions are independent: a startup SDK connection is needed whichever agent MCP transport is selected, and credential custody can be chosen without the bootstrap answer. These are changes to installation obligations/credential exposure, not questions asking the user to identify an SDK method. Answers are **pending**. No production configuration, prototype screen, accepted glossary meaning or requirement has been changed to assume agreement.

### Q1 — Allow one-time explicit runtime connection setup on the selected host?

**Recommendation: yes.** Keep the plugin on unmodified Paseo 0.12. During plugin setup, select/confirm this daemon's SDK endpoint and supply authentication privately if required. Persist the non-secret connection reference and private authentication material outside chat/export, so the plugin's own public SDK client can reconnect and reconcile at startup without waiting for a UI action or new agent Turn. Recheck daemon identity/version and close the connection on plugin shutdown.

This is one connection for the existing host, not a new host/provider/profile manager, permanent service, repeated restart wizard or another always-running process. Initial connection does not arm jobs, Spawn/Replace Sessions or resume paused orchestration. Missing/revoked credentials block native-dependent work truthfully; local durable records remain readable where safe. The exact private storage/delivery mechanism and host support require verification; no default port or absence of a password is assumed.

Alternative: require a supported Paseo setup/ready SDK accessor before promising automatic startup reconciliation. That could mean waiting for an upstream API or separately approving a maintained Paseo change; neither is an existing 0.12 public feature. Delaying reconciliation until the next RPC/hook would weaken A02 and is not silently substituted.

### Q2 — Use direct HTTP MCP with each Session's scoped credential persisted by Paseo?

**Recommendation: yes**, keeping the proposed HTTP MCP endpoint in the plugin server. Generate a separate revocable credential for each created Session; authorize through owner scope/Assignment/generation and store a verifier/revocation record in harness state. Deliver the credential in that Session's MCP headers, **not** in the reusable native profile or prompt. Paseo's native Session JSON will retain that literal header without field-level encryption; treat it and relevant native backups as secret-bearing data. The credential is not the daemon password or an administrative SDK credential.

Harness receipts, Handover, UI projections, logs, exports and evidence redact/exclude the value. Redaction of arbitrary downstream provider/daemon logs has not been proven and must not be promised. Reload continuity and Claude/Codex behavior require actual 0.12 checks before a pass. Shared OS-user file access is not a per-agent security sandbox.

Alternative: bundle a stdio MCP helper launched by each provider, with only a non-secret grant reference in the native MCP configuration; it retrieves the credential from private host storage and forwards to the same owner endpoint. This adds per-client processes, IPC and reconnect/packaging work; it does not inherently isolate agents sharing the same OS-user access. It does not require an extra user-installed tool if packaged correctly. Its credential-reference semantics and full live behavior are not yet proven. OAuth/provider-native configuration patches and Skill isolation are not implied by either choice.

### Questions that remain downstream

After T03, finalize endpoint/credential lifecycle, startup client ownership and the trusted lifecycle-command path with their actual limits. WorkflowPrograms plan representation, local transaction DDL, timing/batch sizes, SDK method wiring and test fixtures remain engineering work. Do not expand the interview with a new question for each internal function, guess a native capability, or close T0 from this factual review.
