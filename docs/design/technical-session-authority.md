# Session authority, method selection and closed-loop delivery — T08

2026-10-23. **Engineering draft**, under T03/T05/T07 and the established delegation/lifecycle rules. F-T05/F-T06 are historical 0.12 research. The completed [beta runtime](paseo-013-beta1-runtime-delta-r7.md) and [dispatch/authority delta](paseo-013-beta1-dispatch-authority-delta-r8.md) now supply the current source baseline; exact native adapter/enforcement behavior still needs proof. This is not provider parity, a security-sandbox claim or technical T0 closure. [Technical tree](technical-design-grill.md) records the factual prerequisites.

## 1. Caller context is server-bound

An owner command receives a validated command and trusted adapter context separately. Payload scope/role/Session strings do not confer authority. The eight owners and T02 receipt/revision ordering remain.

| Entry | Proposed context binding | Limit to retain |
| --- | --- | --- |
| Agent HTTP MCP | Credential verifier → native Session, grant/generation and permitted Assignment scope | MCP transport IDs and supplied agent IDs are not authentication |
| Native plugin RPC | Registered operator method through the host's `daemon.manage` gate, bound to this deployment scope | 0.13.0-beta.1 RPC context still does not identify original caller or attest a human gesture |
| Registered code execution | Verified handler/job/execution reference and effective policy | A handler reference cannot grant arbitrary shell/path/SQL access |
| Independent recovery | Recorded activation ownership, compatible executable and private native access | Recovery is not an agent Session receiving daemon-administration credentials |

For native RPC, an implementation may use the authenticated host-operator class as a stable local principal rather than invent an individual user identity. Record the source class and unavailable original-caller attribution honestly. Start/Replace is an explicit operator command, never a mount/reconnect side effect; the scoped agent MCP catalog does not expose it. This is an engineering trust model under the existing native owner gate, not cryptographic proof of a physical click. F-T06 checks native/CLI bypass paths; scoped MCP alone does not establish whole-agent restriction.

## 2. Session credential lifecycle

The selected transport is HTTP MCP in the plugin, with a separate revocable token per Session persisted by native Paseo. The token is not stored in a reusable native profile. Harness outputs redact it; full native logging redaction remains unproved.

Proposed creation protocol:

1. Commit the operator's lifecycle request, dependencies, generation reservation and create intent. Prepare private credential material and verifier/reference under that operation, outside ordinary receipts/exports.
2. The provisional grant permits only necessary connection/bootstrap metadata. Normal owner mutations remain unavailable until actual native placement/configuration and the Session binding are established. Token possession or a title/label alone does not activate authority.
3. Create/observe the native Session, then commit the validated binding and active grant. Deliver the initial Assignment only after current prerequisites and authority checks. An uncertain create remains the same intent/grant reservation while reconciled.
4. Subsequent execution-scoped requests identify the Assignment/Attempt they concern; owners verify that reference against the credential's scope, phase and current restrictions. An old in-flight request cannot silently be applied to a newer Assignment on the same Session.
5. Replace revokes old orchestrator control generation through the established handover protocol. Worker allocations retain their original identities and applicable restrictions; they do not gain the new orchestrator's authority or lose their evidence.

Private credential staging/recovery, native create-before-prompt behavior and provisional connection semantics require tests. Avoid assuming an idempotency field proves durable native retry behavior; F-T05 follows that exact path.

Stable endpoint/grant records survive plugin reload. Reconnection restores the same source location and authorization state; an occupied or unverifiable endpoint is a blocker, not permission to send secrets to it or switch every Session to another port silently. A revoked token remains revoked after restart. A credential's filesystem secrecy is not isolation between processes sharing an OS user.

## 3. Agent definitions and method choices

Work resolves the selected Agent Definition and ordered existing native profile references through AgentDefinitions/native adapters. Role responsibilities, Instructions, entry procedure, Skills, Principle policy, Result Contract, context/evidence and granted capabilities remain distinct inputs. Provider/model/mode editing stays native-owned.

Fixed method resources selected before dispatch are recorded with source/revision evidence. Auto/hybrid Principle selection is bounded by the configured catalog/policy and recorded as a subsequent selection for that Assignment; do not pretend an unknown agent choice was pinned before it happened. Changes are append-only selection evidence, not a rewrite of the initial Assignment configuration. Exact controlled-action gating and provider resource observation remain proof obligations.

Explicit Skill names/sources guide use; inherited catalogs remain visible. A digest does not snapshot external Skill content or prove complete native-context inventory. Source drift affects the next relevant execution under the accepted recheck/checkpoint policy. Context requests use scoped Knowledge/Artifact retrieval and record used references; they do not grant broader access or copy the entire orchestrator transcript.

## 4. Delegation, Consult and fallback

The current Actions/Limits/Delegation Policy is checked in addition to pinned execution history. A catalog entry is not authority. Workers default to no child delegation; explicit delegation remains within the parent Assignment restrictions and shared resources.

Consult must actually lack the accepted write/push/merge/release capabilities. Validation must consider harness MCP, native provider Tools, automatic native Paseo MCP and accessible CLI paths. Prompt wording or a preapproval list alone does not establish that property. F-T06 checks which per-agent native mappings are supported; unavailable mandatory enforcement blocks the affected role rather than weakening V1 silently.

Fallback selects the next configured native profile only when required contracts/resources/authority are compatible. Reconcile prior effects before real redispatch; then record new Attempt/Assignment with predecessor under GA01. A lower quota or another provider is not a reason to broaden permissions. Fresh worker Sessions are the normal path; compatible reuse requires settled earlier work, and cannot be inferred from idle alone.

Cross-provider continuation carries structured context/checkpoint/artifact references and explicit limits. It does not transplant opaque provider state or assume a model/profile is still available. Orchestrator Spawn/Replace stays user-controlled; worker retry is not an automatic orchestrator replacement.

## 5. Durable closed-loop delivery

Work retains each accepted event/result/request, while coalescing the need to wake one logical orchestrator. The proposed wake state has the owner/binding generation, pending input references and one outstanding controlled dispatch intent. Original signals/evidence remain individually traceable.

The supervisor reads durable pending work and native observations before sending. While the Session is busy, it accumulates pending inputs rather than creating another orchestrator or interrupting for each callback. When eligible, it records the outgoing message identity/intent before the native call. Missing response is reconciled under that intent; a new Turn or a repeated message is not guessed from text.

The agent reports its cycle disposition through a schema-validated owner call. Code checks current binding and durable remaining work to decide the next permitted action. Ending a cycle/Turn never resolves a Work Item by itself. An interrupted Turn without a valid disposition preserves pending work and native uncertainty. A native canceled event does not imply human Pause.

Native send idempotency, busy queue/steer/interrupt behavior, guard availability and concurrent human-chat races have now been inspected in F-T05 and revalidated at the beta source in F-T08. The next section applies those findings; native probes remain. This draft does not promise an unsupported expected-Turn guard or perfect serialization of arbitrary external prompts. A11's controlled scope and honest pending/confirmed observations remain.

### Current beta native adapter constraints

The [current baseline](paseo-013-beta1-baseline.md) pins both native adapter code and the following source findings; these are engineering constraints, not executed integration evidence.

- Work persists its create/send intent, native identity and exact effective payload before dispatch. Retries preserve them, including explicit effective behavior, source/server, mode, profile resolution and credential staging; they do not append newly arrived events or rematerialize current settings under an old message ID. Native create dedupe is scoped to kind/key within one Paseo home, not a caller/project. Namespacing must therefore avoid unrelated collisions.
- Distinguish native **queue admission**, provider dispatch acknowledgment, durable **Assignment acknowledgment** and validated result. On beta, an agent-originated RPC can return `queued` while its disk receipt is pending. The recipient queue is memory-backed and waits for two seconds without new enqueues, not an idle Turn. Crash or later dispatch failure can leave delivery uncertain; do not acknowledge the Work inbox or release its dispatch intent merely on that response.
- Preserve unknown outcomes for reconciliation. Same-ID completed receipt replay dedupes; pending replay remains unknown. Do not create a new Assignment, message ID or Session merely to force a resend. There is no public receipt-query/result-ack contract in the inspected source; durable scoped MCP acknowledgment/result submission must carry owner identity independently of timeline observations.
- Select a native method capable of returning the necessary status and accepting the recorded identity. High-level `agent.send()` currently discards delivery status; CLI/native MCP cannot take a caller-selected message ID. Public `@getpaseo/client/node` is a candidate entrypoint for the lower-level client, subject to import/bundling and contract proof. Source provenance fields are not authenticated Session grants.
- Do not describe native queueing as noninterrupting wake delivery. Steer may replace a Turn when unavailable; permission clearing and concurrent human input require explicit adapter handling and tests. Owner pending signals remain coalesced durably, observed busy/permissions defer controlled admission, and uncertain state does not imply idle. Exact dispatch policy remains an engineering/proof frontier.
- `agent.turn_ended.timeline` is empty. Hooks wake reconciliation; explicit history retrieval is an observation, not a durable Assignment result or permission to accept an arbitrary fixed transcript tail as complete evidence. Own acknowledgment/results and current bindings remain the completion authority.
- Revalidate Consult and no-child routes for both providers, including automatically injected native MCP, inherited provider configuration, shell/CLI/SDK and newly routed hosts. A connection permission ceiling limits that connection; it does not bind an agent's credentials or confer host isolation. Missing enforcement evidence is retained as a blocker, not declared impossible or silently removed from V1.

## 6. Pause and recovery

Explicit Pause commits through Work and blocks that logical owner's controlled future wake/admission/progression. Results already in flight and independent enabled ingestion can still be recorded. Resume is explicit and subject to current authority/resources; opening chat, receiving an event or restarting does not clear Pause.

Before a controlled effect, recheck applicable generation/revocation, operation/execution identity and current policy. Local fencing blocks stale commits but does not undo external effects. Durable acceptance, native receipt/delivery, execution Outcome and Criteria Verdict remain separate facts.

## 7. Proposed native dispatch protocol

This protocol is internal to **Work**. Its callers continue using domain commands and receipts; UI, MCP, Triggers and workflow authors do not coordinate native create/send steps themselves. The native adapter is an internal seam with an actual external dependency and a scripted fault adapter, not a ninth public module. Proposed field names below are implementation details, not new glossary/UI terms.

### Frozen intent and native entrypoints

Before native I/O, persist the recipient host/Session reference when known, operation identity, applicable authority/binding revision, immutable canonical request digest, and selected inputs. For Assignment dispatch this includes Attempt/Assignment; an orchestrator wake instead references its logical binding, generation and pending cycle input. Do not require every wake to create a Work Item, Workflow Run or Assignment.

Use separate intent records for workspace placement where needed, Session creation, and prompt delivery. Creation uses the supported workspace-first placement. Session creation carries no initial work prompt; binding, configuration readback and grant activation precede task delivery. An uncertain workspace/create stage must be resolved before issuing a different create key. Scope native keys by deployment and operation, since native creation dedupe spans callers in one Paseo home.

The proposed runtime entrypoint is the public `@getpaseo/client/node` factory for the plugin-owned host connection. Keep its connection/permissions and lifecycle behind the adapter. Source availability does not prove bundling, authorization or production compatibility; do not use an internal import if the supported export meets the same contract. The adapter must receive/retain caller-selected native identities and return the actual native submission classification. High-level `agent.send()` alone cannot provide that classification.

Runtime-originated delivery must not impersonate a worker to obtain a different native send default. Persist the actual provenance and explicit effective behavior/mode before submission. A registered agent-originated send and a runtime-originated send can use different native paths; neither source field supplies authentication.

### Submission and owner acceptance remain separate

| Stage / observation | Work continuation |
| --- | --- |
| Intent committed, no native submission yet | Recheck applicable authority, logical Pause, claim and dependencies; then submit outside the SQLite transaction |
| Recipient observed busy or waiting for permission | Retain pending input and reservation; defer automatic wake rather than enqueue another controlled request |
| Recipient observation unavailable/stale | Reobserve or report blocker; missing fields are not confirmed idle or absence of permissions |
| Native returns queued | Record queue admission only; retain pending owner input and outstanding delivery identity |
| Native acknowledges dispatch | Record that observation; do not infer Assignment acknowledgment, new Turn identity or result completion |
| Scoped agent submits valid acknowledgment | Commit the matching Assignment/input acknowledgment under current applicable authority; it can establish receipt even when the native response was lost |
| Valid structured result or cycle disposition arrives | Validate original identity, source, contract and applicability; result acceptance/progression follows the owning Work/Criteria rules |
| Disconnect, timeout or ambiguous native failure | Preserve the same intent and unknown outcome; reconcile without redispatching under a new identity |
| Proven rejection before any native effect | Record the known failure; release or retry only according to the existing admission/retry policy, not a generic catch block |

Observed-idle admission reduces interference but is not an atomic idle/Turn guard. A public send can still race with external human input or a permission request; explicit steer can fall back to replacement. Do not label this a strict noninterrupting path or claim arbitrary manual/native calls are serialized by Work. The exact automatic-wake mapping requires the bounded permission/busy/race probe before selection; an unsupported required behavior blocks that path. Agent permission resolution is not inferred from a wake request.

The Assignment entry procedure acknowledges the exact input/result-contract reference through the scoped owner MCP path. Onboarding reuses `handover_acknowledge` for the additional Handover-specific receipt; it does not become proof the harness has been built. An acknowledgment is an application protocol, not a transaction with filesystem/provider effects. Harness-controlled action Tools can require it; native direct actions still depend on the role-enforcement proof below.

### Reconciliation ordering

1. Recover local committed intent, claim, native key/message ID and frozen request, then check applicable current authority and writer fencing. Do not re-resolve mutable profiles, credentials, payloads or defaults into the old request identity.
2. Read durable owner acknowledgments/results and native observations. A matching acknowledgment can confirm delivery; an idle Session, terminal Turn, timeline tail or missing Session cannot establish that the work never ran.
3. Where supported and safe, same-ID native replay retains the exact effective request. Completed receipt replay dedupes; pending receipt replay remains unknown and does not reconstruct a lost in-memory queue. No automatic new-ID escape is permitted.
4. If evidence cannot resolve delivery/effects, retain the blocker and references for the established escalation path. Timeout alone does not release occupied capacity or authorize fallback. A permitted actual redispatch later creates the new Attempt/Assignment required by GA01; it does not rewrite the uncertain predecessor.
5. Commit acknowledgment, result selection or next admissible progression only after rechecking the relevant identity/revision. Keep incoming evidence whose originating allocation is still applicable; do not use the newest unrelated orchestrator generation as a blanket rejection rule for worker results.

An acknowledgment received after explicit Pause may be recorded without waking/progressing that paused owner. An old replaced orchestrator cannot regain control through a late acknowledgment; existing worker Assignments retain their own identity and applicable grants. Duplicate valid acknowledgments are idempotent. A revoked caller cannot replay a previous response to authorize another action.

## 8. Proposed effective authority checks

AgentDefinitions resolves declared capability requirements and method inputs; **Work** determines effective permission for the concrete use. Intersect the operator's current grants, pinned parent/Assignment restrictions, allowed definition/mode, current revocations and relevant resource limits. Incompatible capabilities block admission or require an already configured compatible fallback. Consult mode cannot acquire Delegate's write authority by reusing the same definition.

| Capability path | Required enforcement and evidence |
| --- | --- |
| Harness MCP commands | Session grant plus applicable Assignment/binding and owner checks; deny unknown/mismatched requests before effects |
| Provider filesystem/shell/network tools | Supported per-Session native options and actual effective behavior on project and disposable remote fixtures; Tool descriptions/preapproval are insufficient |
| Automatically injected or inherited MCP | Effective provider/native configuration must preserve the required role; an empty map is not evidence of removal |
| Native child creation, provider subagents, CLI/SDK, registered hosts | Exercise each reachable route relevant to the role; catalog hiding or a parent label alone does not enforce no-child authority |
| Permission changes and fallback | Recheck the selected provider/profile and inherited configuration; an approval prompt is not a denial, and changing provider must not broaden authority |

Consult denies **project code changes and push/merge/release**. This does not automatically forbid scratch files needed for findings or provider operation. Workers without child permission may propose a decomposition to their orchestrator; nested code-controlled workflow execution still remains available under its own authority.

The effective configuration is a projection for this Session, not a duplicate editable native profile or a new settings group. Sensitive native configuration, host credentials and unneeded transcript content are not placed in the evidence bundle. Inherited Skills remain visible as accepted; restricting a role does not reopen Skill isolation.

**F-T09 completed:** [supported-configuration research](paseo-013-beta1-enforcement-feasibility-r9.md) supplies a Claude candidate through supported `extraArgs` built-in selection/strict MCP and explicit denials. Effective inherited settings/hooks and binary behavior remain unverified. The Codex read-only/network candidate does not yet establish no-child enforcement: the inspected upstream **0.143.0 comparator** distinguishes `multi_agent_v2` from `multi_agent`/Collab, while the pinned Paseo schema exposes the former and rejects the latter. This is a precise schema/comparator gap, not proof about the installed executable or impossibility of every supported route.

Keep both recipes as candidates until transformed configuration and actual fixture effects are checked. Confirm exact provider executable versions first, then distinguish launcher/schema composition from real sandbox/tool enforcement, including inherited MCP/hooks, direct subagents and CLI/daemon transports. Consult may use scoped scratch artifacts; the Codex scratch-workspace variant remains unselected and must not silently change native placement. No material user decision is justified by the present evidence. No container, OS-user separation, provider patch or native-profile mutation is silently added; full Consult/no-child proof and T0 remain open.

## 9. Required proof and remaining frontier

Use real temporary SQLite/private files plus scripted native faults for provisional grants, spoofed context, stale generation/Assignment, revoke-before-replay, permission changes, duplicate wake, lost create/send response, pause/result races and endpoint restoration. Actual Claude/Codex cases must demonstrate role enforcement, native MCP/CLI scope, busy delivery and compatible fallback. Trace to VA02/VA04/VA05/VA07/VA13/VA14 and OB03–OB13; source inspection alone does not pass them.

No tests or live operations ran for this draft. No new material user choice is assumed here. The dispatch/enforcement factual findings can expose a genuine supported-path tradeoff; only then ask the user. T0 remains open.
