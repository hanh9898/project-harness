# Technical design continuation — Paseo 0.13.0-beta.1

2026-10-23. Preparatory design work after [S01 architecture closure](history/architecture-a12-2026-10-23/closure-a12.json). User asked to continue; product scope and overall architecture remain settled. This file tracks technical prerequisites and future Interface/Implementation choices, not authorization to implement the full plugin or change HBU.

**Current native baseline:** user reports 0.13.0-beta.1 at P3403; CLI/app/local daemon match in read-only observations. [Baseline and evidence](paseo-013-beta1-baseline.md) pin `3fa625701eae6b3a07ccae18299200b1a7cf2776`. F-T01–F-T06 remain historical 0.12 investigations; F-T07/F-T08 revalidate their version-specific conclusions. T03/T05/T07 remain accepted, T0 remains open, and no live compatibility pass is inferred.

## Tree and dependencies

| Node | Required result | Prerequisites | Current state |
| --- | --- | --- | --- |
| T0 | Detailed design with explicit assumptions/deferrals and shared understanding | T1–T6 and resulting frontiers | Open; no closure question yet |
| T1 | Versioned current Paseo runtime/SDK/plugin/MCP capability baseline | Installed topology and pinned primary sources | 0.13.0-beta.1 topology/source pin observed; **F-T07/F-T08 completed and reviewed within stated bounds**; old F-T01 is historical, not beta integration proof |
| T2 | WorkflowPrograms authoring/plan representation and execution/recovery mechanism | T1 + accepted five patterns/A09 and durable Work contracts | [T04 engineering proposal](technical-workflow-execution.md): serializable composition, state transitions and recovery; not implemented or session-closed |
| T3 | SQLite driver/schema/write ordering, durable identities and independent recovery coordination | T1, accepted ownership contracts; plan-specific tables depend on T2 | [T02 engineering proposal](technical-owner-ingress.md): owner acceptance, node:sqlite candidate, transactions/receipts/journal/fencing; DDL and runtime proof remain |
| T4 | Agent MCP transport, authenticated principals and owner Interface lifecycle | T1 and durable receipt/authority contracts; exact launch protocol depends on native facts | **T03 accepted**; T08 drafts caller/grant/method/wake protocol; F-T08 rechecks dispatch/enforcement on beta; live proof remains |
| T5 | Jobs/native cadence/timers, admission/cancel/wake/Pause protocols | T1/T3/T4 and A07/A10/A11 | **T05/Q1 accepted**: Triggers-owned schedules may target code/agent/workflow when native is insufficient; timing/admission/adapter details remain engineering/proof |
| T6 | Packaging, version pinning, evaluator/Analytics/release integration and proof matrix | Relevant prior nodes plus agreed V1 gate | **T07/Q1 accepted**: prepared local directory, stable ID/path, Releases publication/native reload; exact mechanics/proof remain |

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

Both questions are independent: a startup SDK connection is needed whichever agent MCP transport is selected, and credential custody can be chosen without the bootstrap answer. These concern installation obligations/credential exposure, not questions asking the user to identify an SDK method. **Both accepted: P3251 → P3253 `ok`**, with [native question/answer evidence](history/technical-t03-2026-10-23/acceptance-t03.json). This scoped answer selects the two recommendations below; it does not close T0, configure a live connection or establish runtime proof.

The recommendation/alternative wording below records the original 0.12 decision context. The current beta baseline and F-T07/F-T08 section qualify present native API facts; they do not rewrite this acceptance.

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

## T04 — workflow execution proposal after T03

[Detailed proposal](technical-workflow-execution.md) specifies authoring helpers → validated serializable composition, Work's persisted transitions and effect intents, registered bounded expansion, execution identity, join/result applicability and restart reconciliation. It carries forward D02/D03/GA01/A09 rather than asking their questions again. New persistent behavior still uses candidate/check/activation; task-specific composition does not require a plugin release.

The proposed implementation default is a successor Run under the same Work Item when a new plan goes beyond the pinned definition's permitted expansions. It may reuse explicitly applicable results; it does not rewrite the old Run or automatically replay external effects. This does not remove the already permitted path of a recorded, compatibility-checked checkpoint migration. It is a reversible engineering default under K21, not a newly accepted domain rule.

No new material user question is substantiated by this representation alone. Exact DDL, handler/runtime compatibility, scheduling fairness, trusted RPC caller protocol, evaluator execution and release coordination still need engineering design/proof. T0 remains open; the next technical slice is Triggers/Work scheduling and resource admission, alongside the remaining MCP lifecycle details.

### F-T03 — native scheduling prerequisites

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-native-schedules-facts-r3-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Atechnical-native-schedules-facts-r3-20261023`.
- Verified selection: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`. Status: **completed + parent review**; output [paseo-012-scheduling-facts-r3.md](paseo-012-scheduling-facts-r3.md).
- Bounded questions: actual native trigger/target kinds, public access paths, occurrences/delivery/history/replay, overlap/missed/restart/timezone behavior and gaps. In particular, do not assume code jobs are absent from native 0.12 or duplicate an available native capability.
- Read-only pinned primary sources; CLI help/version allowed. No live schedule/agent/plugin/daemon operations, private configuration/transcript reads, tests, installs, HBU changes or further delegation. This is factual prerequisite work, not a new accepted schedule policy or a request for user API facts.

### Parent review F-T03

Read the full report, the stored schedule/target contracts, public SDK surface and CLI new-agent guard. Independently read native due claiming, manual run-once, restart recovery and overdue-cursor advancement at the pinned 0.12 commit. [Review record](history/technical-t05-2026-10-23/review-t05.json) retains digest, exact primary URLs and proof limits.

Native timing/history already exist; they must not be rebuilt as a second active source. But configurable bounded overlap/missed behavior, logical Pause/Session rebinding and Work admission are not supplied by those primitives. `maxRuns=1`/immediate run-once is not an at-instant schedule. Public SDK setup accepted at T03 does not magically add schedule/heartbeat methods. Existing source histories are not an acknowledged durable Work delivery stream.

V1 already says reuse native when adequate. The stronger blanket mapping in `paseo-boundary.md`/`modules.md`—all agent cadence native, harness scheduler code-only—cannot be assumed sufficient after F-T03. The resulting frontier concerns which schedules the harness may own, not whether the user still wants the already accepted V1 feature set.

## T05 — scheduling ownership exception

[Detailed engineering proposal](technical-scheduling.md) separates native sources, harness-owned occurrence selection, Work admission, Job completion, logical Pause, clocks and restart. **T05/Q1 accepted at P3308 → P3310 `đồng ý`**, with [native evidence](history/technical-t05-acceptance-2026-10-23/acceptance-t05.json). The ownership exception is selected; exact implementation and native capability proof are not. No live schedule is migrated by this answer.

### Q1 — Allow Triggers-owned schedules for agent/workflow Jobs when native contracts are insufficient?

**Accepted recommendation:** keep native schedules native where their actual contract suffices. When a harness Job requires once/interval, bounded catch-up/parallelism or controlled logical-owner wake that native 0.12 cannot provide, let Triggers own its Schedule and deliver through Work, even if the target uses an agent or workflow. Each Schedule still has one owner, without a second engine replaying that cadence. This does not decide how many distinct Schedules a Job may have. Native Agent Sessions/profiles/runtime remain Paseo-owned; this is not another provider/profile editor or permanent scheduler service.

Example: a retro requiring one coalesced activation after downtime and no automatic wake during Engineering Pause can be a Triggers-owned Job delivering through Work. Backlog polling remains code-only until changes justify agent work. Do not build a native schedule and a harness replay calendar for the same Job.

This narrows an earlier ownership assumption in the accepted whole-system packet, with a newly pinned factual reason. It does not migrate existing native schedules automatically. Existing native binding requires verified control/delivery capability; unsupported heartbeat observation/Pause is a blocker, not a passing claim. The follow-up updates current ownership documentation and graph provenance; canonical glossary definitions already distinguish Job, Schedule and native cadence and retain their meanings.

Alternative: extend Paseo's native scheduling/control contracts first and make the full V1 dependency explicit. Keeping the code-only harness scheduler while claiming all native policies work is not a viable implementation of the existing gate. Private-API adoption, a maintained Paseo change and reduced V1 behavior are not silently authorized.

**User answer T05/Q1:** `đồng ý` at **P3310**, answering **P3308**. [Acceptance record](history/technical-t05-acceptance-2026-10-23/acceptance-t05.json) preserves exact question/answer and scope. This closes the ownership frontier from F-T03. Timer math, parser/library selection, DDL, adapter wiring and fair queue parameters remain engineering work; native capabilities are factual investigation/proof. T0 remains open; no runtime/V1 pass follows.

## T06 — evaluation, Analytics and release coordination

[Engineering draft](technical-evaluation-release.md) connects frozen criteria/evaluator execution, scoped Verdicts, query/Saved View provenance, check reuse and source activation/recovery. It preserves Fast/Deep economics, bounded V1 improvement proof, narrow containment, state compatibility and independent recovery. This is protocol design under existing policy, not acceptance of exact schemas/native methods or a claim that old code/DB snapshots can always be restored.

### F-T04 — native host activation prerequisites

- Task: `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-release-host-facts-r4-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-release-host-facts-r4-20261023`.
- Verified selection: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`. Status: **completed + parent review**; output [paseo-012-release-host-facts-r4.md](paseo-012-release-host-facts-r4.md).
- Scope: supported 0.12 plugin source/update/reload paths, ID/settings continuity, watch/auto-reload, loaded server/client identity and refresh, independent recovery access and gaps. Source facts are checked before proposing native lifecycle methods or asking a material user tradeoff.
- Read-only pinned source/package/documentation, CLI help/version allowed. No private configuration/transcript reads, live APIs, tests, installs, HBU changes, production code or further delegation. No promise that server health alone proves complete UI/runtime activation.

### Parent review F-T04

Read the full report, then independently read native source update/removal, the public CLI directory install/reload route, config-map replacement and app catalog refresh. The [review record](history/technical-t06-2026-10-23/review-t06.json) preserves report digest, primary sources and scope. Native directory and managed acquisition are distinct; SDK connectivity at T03 does not imply a high-level lifecycle or loaded-whole-plugin attestation method.

The report substantiates an install/update choice because native managed update has behavior outside the existing data-aware release/recovery ordering. Directory publication is a viable design candidate, not a proven atomic filesystem/native transaction. No private SDK import, symlink assumption, broad plugins-map patch or remove/reinstall is selected as a hidden shortcut. UI observations remain separate from native server status; no all-clients acknowledgment requirement is invented.

## T07 — self-update deployment path

### Q1 — Install the self-updating V1 plugin from its prepared local deployment directory?

**Accepted recommendation:** install once through Paseo with a stable runtime ID/path. The fork remains source; Releases prepares a checked snapshot, publishes only its own deployment files and requests native reload. Keep SQLite/credentials and the operation-pinned Recovery Executable outside replaced source. Reuse prepared dependencies and affected checks for small patches; no additional permanent service or manual approval for every patch is introduced.

This selects the installation/self-update mechanism. [T07 proposal](technical-plugin-deployment.md) makes the paths, lifecycle roles, evidence and failure constraints reviewable. It does not prescribe an untested atomic directory swap or silently convert an existing managed installation. Source/controller compatibility and native UI/backend probes still require verification.

Alternative: use native managed Git/npm updates, with a separately designed migration/recovery/artifact-retention policy compatible with that native controller. Do not silently substitute it for the already accepted Fix-forward and data-aware independent recovery behavior.

**User answer T07/Q1:** `ok` at **P3364**, answering **P3362**. [Native acceptance evidence](history/technical-t07-2026-10-23/acceptance-t07.json) retains exact records and scope. The installation/update choice is accepted; filesystem publication, typecheck/build commands, dependency reuse, marker protocol, adapter wiring and proof fixtures remain engineering work. Existing release/evaluation policy stays accepted; T0 remains open.

## T08 — Session authority and native delivery

[Draft protocol](technical-session-authority.md) details trusted caller context, provisional/active/revoked Session grants, bounded method selection, fallback/Consult requirements and durable coalesced orchestrator wake. It retains current native operator-attribution limits and distinguishes application authority from OS-user isolation. No new domain meaning or physical-human attestation is claimed.

### F-T05 — native create/send semantics

- Task: `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-dispatch-facts-r5-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-dispatch-facts-r5-20261023`.
- Verified selection: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`. Status: **completed**, parent read the report and independently inspected selected primary create/receipt/prompt/projection sources. Output: [0.12 dispatch facts](paseo-012-dispatch-facts-r5.md). Beta adapter selection waits for F-T08.
- Scope: actual retention/scope/conflict of create/message identities, accepted/delivered/run distinctions, busy behavior/guards and reconcile observations under concurrent native chat. No native API facts are asked of the user.

### F-T06 — per-agent native tool/role enforcement

- Task: `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-role-tools-facts-r6-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-role-tools-facts-r6-20261023`.
- Verified selection: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`. Status: **completed**, parent has read the report; full independent source audit is not claimed. Output: [0.12 role/tool facts](paseo-012-role-tools-facts-r6.md). Beta revalidation is F-T08.
- Scope: supported per-agent native MCP/tool restriction versus provider-global settings, actual merge/injection paths, sandbox/preapproval limitations, native CLI/operator access and Consult/no-child-delegation enforcement.

Both are bounded source/package investigations pinned to 0.12. No live operations, tests, installs, private configuration/transcripts, HBU access or further delegation. Missing implementation/proof is not automatically a new user decision, but a capability conflict affecting authority or the required V1 behavior cannot be silently downgraded. T0 remains open while these prerequisites are investigated.

## F-T07 / F-T08 — revalidation after the user's beta update

Both rounds compare old `cafe4b01c8522ff39560241c5deb01427dc8dc5b` with beta `3fa625701eae6b3a07ccae18299200b1a7cf2776`. Selection returned for each: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`. Scope is read-only public source/package research: no live operations, tests, private data/HBU reads or further delegation.

- **F-T07 completed; parent read report and selected Node-factory/export/lifecycle sources.** Task `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-013-runtime-delta-r7-20261023`; [runtime delta report](paseo-013-beta1-runtime-delta-r7.md). Public Node factory exposes more native methods; startup caller/credential gaps, scheduling policy and deployment limits persist. Turn-ended hook timeline is empty and must not be used as a result payload. Exact imports/bundling and current SQLite/provider behavior remain unverified.
- **F-T08 completed; parent read report and selected delivery/receipt/RPC sources.** Task `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-013-dispatch-authority-delta-r8-20261023`; [dispatch/authority delta report](paseo-013-beta1-dispatch-authority-delta-r8.md). Agent-originated sends now queue after two seconds without new recipient enqueues; this is memory-backed, not recipient-idle admission. Queued acknowledgement may leave a pending durable receipt after a crash, and high-level send discards delivery status. Permission clearing/steer fallback and host-routing authority need bounded verification. No complete Consult/no-child enforcement or durable noninterrupting delivery pass is established.

Engineering follow-ups: refresh exact package/UI/create signatures; choose the supported Node factory after contract proof; use hooks only as signals with explicit evidence retrieval; preserve immutable native request identity and distinguish queued/dispatch/owner acceptance in T08; verify effective Consult/no-child capabilities across native MCP, provider Tools, CLI and host-routing paths. These facts do not reopen settled meanings, authorize runtime mutations or close T0/V1.

## T08 continuation — internal protocol and effective authority

[Session authority §7–§9](technical-session-authority.md#7-proposed-native-dispatch-protocol) now details the engineering protocol: separate workspace/create/send effects, immutable identities/effective payload, internal native seam, queue/dispatch/owner acknowledgment separation, identity-preserving reconciliation, and applicable-generation rules for paused/replaced orchestrators and worker results. Effective role checks cover owner MCP plus provider/native/inherited/CLI/host routes. These are proposals under existing meanings, not newly accepted public commands or runtime proof.

### F-T09 — supported enforcement candidates

- Task: `node:delegated-task:command%3Amcp%3Ac87c1d23-c8c3-4f09-b8be-6d3eacf404e8%3Adelegate-task%3Atechnical-013-enforcement-feasibility-r9-20261023`.
- Selection returned: `codex` / `gpt-6.1-sol`, `reasoningEffort=xhigh`, `serviceTier=default`; **completed**. Parent read the report; its upstream comparisons have not all been independently repeated. Output: [enforcement candidates and precise gaps](paseo-013-beta1-enforcement-feasibility-r9.md).
- New bounded question after F-T08: identify a concrete supported per-Session Consult/no-child recipe, or the exact unestablished control, for each required provider. Check project writes/push/merge/release versus legitimate scratch output, inherited/native MCP, direct subagents and daemon CLI/network access. Propose the smallest discriminating disposable-fixture probes. Do not repeat the old inventory, infer impossibility from absence, weaken V1 or select new deployment obligations.
- Public pinned source research only; no live calls/tests, private data/HBU reads, installs, runtime mutations or further delegation. Factual/practical prerequisites stay distinct from a material user decision. No new ready material question has yet been substantiated; T0 remains open.

Parent disposition: retain the Claude supported-channel candidate with inherited-hook/MCP/binary checks still required. Record Codex's distinct `multi_agent_v2` versus `multi_agent` gap only against the pinned upstream 0.143.0 comparator; it is not an installed-binary finding or an impossibility result. Exact provider versions and discriminating fixture checks precede any deployment/policy tradeoff. No candidate has passed, no new scope/authority choice is inferred, and no probes were run. [Bounded review record](history/technical-enforcement-r9-review-2026-10-23/review.json) preserves the report/task and these limits. Setup-matt-pocock-skills is a separate active request awaiting its issue-tracker choice; this research completion does not answer that question or authorize setup writes.
