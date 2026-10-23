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

## 7. Required proof and remaining frontier

Use real temporary SQLite/private files plus scripted native faults for provisional grants, spoofed context, stale generation/Assignment, revoke-before-replay, permission changes, duplicate wake, lost create/send response, pause/result races and endpoint restoration. Actual Claude/Codex cases must demonstrate role enforcement, native MCP/CLI scope, busy delivery and compatible fallback. Trace to VA02/VA04/VA05/VA07/VA13/VA14 and OB03–OB13; source inspection alone does not pass them.

No tests or live operations ran for this draft. No new material user choice is assumed here. The dispatch/enforcement factual findings can expose a genuine supported-path tradeoff; only then ask the user. T0 remains open.
