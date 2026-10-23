# Owner commands, persistence and agent access — Paseo 0.12

2026-10-23. **Engineering proposal T02**, within the architecture closed at A12 and the first-V1 gate closed at V02. This is a detailed design draft, not implemented code, a new product-scope decision or a provider capability pass. [Technical design tree](technical-design-grill.md) tracks unresolved prerequisites. English terms retain their [owning glossary](../../GLOSSARY-MAP.md) meanings.

## 1. Design seam

UI/RPC, agent MCP and a recovery/script caller cross the appropriate owning module's Interface. The eight module owners in [modules.md](modules.md) remain; there is no new public Settings, Store, Kernel or catch-all command module. Authentication, transport validation and error serialization belong to adapters. Acceptance, current authority, revision checks, idempotency and mutation ordering belong to the owner implementation and are exercised by its Interface tests.

Deleting the transport must leave the owner contract usable. Deleting the owner must make its invariants reappear in several callers: that is the depth being designed. A thin transport does not mean unauthenticated input can choose its own principal.

| Caller | Entry and response | Authority source |
| --- | --- | --- |
| User in plugin UI | Typed RPC to the corresponding owner; short receipt or paged observation | A trusted host/UI invocation path whose actual caller guarantees must be established; ordinary payload fields are insufficient |
| Onboarding / orchestrator / worker | Intent MCP Tools to that owner's permitted subset | Credential mapped server-side to the native Session, scope, Assignment where applicable, and current authority generation |
| Code job | Registered handler result and direct internal owner Interface | Bound handler, job revision, effective policy and execution claim |
| Independent recovery | Narrow recovery protocol, outside the failed plugin | Recorded activation ownership, compatible known recovery executable and durable policy; no unrestricted agent administration credential |

[T08](technical-session-authority.md) specifies the proposed caller/grant lifecycle and records the native operator attribution limit. Native dispatch and role-enforcement facts remain prerequisites; no generic RPC role field is trusted.

No adapter exposes SQL, arbitrary path/value patch, arbitrary shell, a role-claim field or a generic call-any-owner Tool. Existing native Tools remain separately available within their actual authority. The MCP catalog is usability, not proof of enforcement of those native effects.

## 2. Command acceptance and replay

The following is harness pseudocode, not a Paseo SDK signature. Each owner still presents its domain-specific methods; the common algorithm is internal implementation.

```ts
async function acceptOwnerMutation(trustedContext, input) {
  const command = validateAndCanonicalize(input);
  return sqlite.immediate(() => {                 // synchronous local work only
    const authority = requireCurrentAuthority(trustedContext, command);
    requireCurrentRuntimeWriter();

    const previous = findRequest({
      scope: authority.scope,
      principal: authority.principal,
      command: command.kind,
      requestId: command.requestId,
    });
    if (previous) {
      requireSamePayloadDigest(previous, command); // else IdempotencyConflict
      return previous.receipt;                    // not a newly computed receipt
    }

    requireExpectedRevisions(command);
    const accepted = ownerAccept(command, authority);
    // Owner state, reservations, operation intents, receipt and durable wake
    // are committed together. No network or asynchronous LLM work here.
    return persistAcceptedChange(accepted);
  });
}
```

Required ordering and errors:

1. Authenticate the connection and validate the typed command. Inside the write transaction, check current authorization/revocation and writer ownership again; do not rely on a snapshot read before an `await`.
2. Request identity is `(harness scope, principal, command kind, requestId)` plus a versioned canonical payload digest. Same identity and payload returns the original committed receipt; a different payload conflicts. Transport connection IDs and MCP JSON-RPC IDs are not durable request identities.
3. A new request checks expected revisions and prerequisites. The owner commits its local state/change, needed reservation, receipt, operation intent and durable pending work in one local transaction. No response acknowledging durable acceptance precedes commit.
4. `InvalidInput`, `Forbidden`, `RevisionConflict`, `IdempotencyConflict`, `DependencyChanged` and `StorageUnavailable` precede acceptance. Failure after acceptance is recorded against the existing operation/work identity and observed there. A transport timeout is not proof of rejection or cancellation.
5. Replay still checks current authority. The saved receipt is not an access bypass after revocation. Subsequent `read` returns the current projection, which may differ from the state when that receipt was issued.

The input can include permitted task/target references; those references never grant access. Unknown fields are rejected by the versioned input schema. Mutations that require native I/O are durably accepted for execution, not held open waiting for a provider Turn.

## 3. SQLite implementation proposal

Use one local SQLite database for active mutable state and journal, with owner-specific tables and migrations. Sharing a transaction is not permission for callers to edit another owner's tables. Git remains the source for versioned code/assets; artifact content stays outside SQLite behind references/digests. No second editable copy of native profiles or native schedules is introduced.

**Driver candidate:** bundled `node:sqlite`, using only the tested common API subset needed by the plugin and its independent recovery executable. The [0.12 baseline](paseo-012-technical-baseline-facts-r1.md) inspected Node 24.20.0 in the local packaged helper; shell Node 20 lacks this built-in. Therefore package syntax targeting `node20` is not our runtime capability check. Runtime/version enforcement, database behavior and recovery execution still need proof before this candidate becomes a supported implementation. Do not add an arbitrary user's shell Node requirement or silently exclude another previously supported host.

Proposed database setup: foreign keys enabled, WAL journal, `synchronous=FULL`, a bounded busy wait, short `BEGIN IMMEDIATE` writes and prepared statements. These are engineering defaults to validate, not a durability benchmark result. No network request, agent wait, Git operation, large file read or model invocation holds a write transaction. Synchronous database work needs bounded batches and measured event-loop delay before choosing query/page/busy limits.

| Internal record family | Owner and invariant |
| --- | --- |
| Revisioned configuration/assets and active references | AgentDefinitions, Work, Triggers, Criteria, Knowledge, Releases and Analytics each own their relevant revisions; optimistic concurrency on mutation |
| Command receipts | Shared transaction plumbing records the accepting owner, scoped identity, canonical digest and immutable receipt; it is not an extra business owner |
| Work Items, Runs, Step Runs, Attempts and Assignments | Work owns execution identities and references to pinned definitions/criteria/resources; an Assignment can exist outside a Workflow Run |
| Operations, effects and observations | The responsible owner records intent before each external effect and retains outcome uncertainty; native observations are not inferred from missing local rows |
| Runtime claims and action reservations | Work/Triggers/Releases enforce the same effective policy; database fencing distinguishes owners but does not cancel an old native request |
| Schedule occurrences, source cursors and pending delivery | Triggers commits normalized source events/cursor/delivery with accepted work when local atomicity applies; unchanged polling does not invoke an LLM |
| Results, evidence links, execution context and history | Respective owners retain revisions/provenance; Analytics reads committed projections and source references, not native transcripts as its state machine |
| Agent credential records | Work lifecycle binds identity/generation and revocation; secret material has a private storage protocol separate from exported domain records |

Exact DDL, indexes, schema-version compatibility and credential storage format remain implementation work. Unique constraints must enforce receipt identity, occurrence/event identity and the reservations that actually prohibit concurrent effects. A numeric row revision alone does not enforce those invariants.

This proposal uses transactional state plus a journal/outbox. It does **not** require rebuilding every table by replaying all events, prescribe a new retention policy, or delete old work/results. A live SQLite backup must use a validated backup/checkpoint procedure; copying the database file alone is not the recovery protocol. Migration/backup obligations remain candidate-specific under Fast/Deep, with independent compatible recovery.

## 4. Effects, restart and fencing

After acceptance, the executor claims due work and revalidates its writer generation, current authority, pause, capacity and the pinned dependencies. It then records the particular external-effect identity and calls the native adapter outside the database transaction. A definitive response/observation is committed only while the claim remains applicable.

| Interruption | Required continuation |
| --- | --- |
| Before acceptance commit | No success receipt exists; repeat the same request identity, subject to current rights |
| After commit, before caller receives receipt | Return the saved receipt for the repeated identity; do not create another operation |
| Before/after native create/send with an uncertain response | Reconcile recorded intent with authoritative native observations; absence from a partial/eventual list is not proof it never happened |
| Reload while a command/effect is in flight | New runtime reads committed state and fences obsolete local writers; it does not assume the old network request was canceled |
| Lease expiry while an old executor may still act | Establish old-executor/effect settlement before admitting a conflicting effect; fencing only the next SQLite commit is insufficient |
| Late worker result after timeout/retry/Replace | Retain it under its original Assignment/Attempt and applicability; do not overwrite the selected new result or restore old authority |

Native idempotency fields are used only with a proven scope/retention contract. The design promises durable tracking, deduplication and reconciliation, not exactly-once external effects. Explicit Pause blocks the controlled future admission/progression described by A11; it does not discard accepted results, undo effects or infer a user command from native Stop.

## 5. Agent MCP transport and identity

**Selected at [T03/Q2](history/technical-t03-2026-10-23/acceptance-t03.json):** an HTTP MCP adapter hosted inside the plugin server subprocess, calling owner Interfaces directly. This keeps the accepted single-plugin deployment and avoids granting agents an administrative daemon key to invoke an internal plugin-RPC method. It introduces no independent permanent server or second durable store. A plugin reload can interrupt this endpoint; its restoration and owner receipts, rather than a long-lived transport connection, must provide continuity.

The following are constraints, not demonstrated 0.12 capabilities:

- A loopback endpoint/port is a location, not an identity. Validate host/origin/transport requirements from the chosen MCP specification. A remote client is not implicitly trusted because native chat can connect remotely.
- Give each native Session a revocable, unguessable credential mapped server-side to scope, Session and authority generation; worker access additionally resolves its current Assignment restrictions. Do not reuse the historical spike's bearer shared by role.
- MCP transport Session IDs and JSON-RPC request IDs do not authenticate a native Agent Session. Do not accept a payload's `sessionId`, `role` or `generation` as proof.
- A credential prepared before native creation cannot authorize normal configuration/effects until the reserved Session is created, observed and durably bound. Create-unknown reconciliation retains the same reservation; it does not mint replacement authority blindly.
- On reload, live valid Sessions must be able to reconnect without forced Spawn/Replace. Endpoint binding and credential revocation must survive reload. Do not assume a dynamic new port is patched into an already running provider automatically.
- Harness prompts, receipts, Handover, ordinary logs, exports and evidence must exclude secret values. **T03/Q2 accepts** delivering the scoped per-Session token in HTTP MCP headers and its resulting persistence in Paseo's native Session JSON. The shared native profile never receives that Session's token. This does not establish encryption, comprehensive native-log redaction or provider live/reload tests. The alternative stdio helper was not selected.
- Read/write grants are checked at owners and before controlled effects. Shared config access does not grant `start`/`replace`; those menu actions require authenticated explicit user intent under the established lifecycle contract.

The [baseline facts](paseo-012-technical-baseline-facts-r1.md) establish that the public plugin context does not register MCP Tools directly, and the internal daemon RPC path requires `daemon.manage`. [F-T02](paseo-012-mcp-auth-facts-r2.md) additionally establishes that setup has no public SDK accessor, whereas a standalone public SDK client accepts explicit connection parameters. **T03/Q1 accepts one-time runtime connection setup** for that public client. Do not intercept private plugin IPC or assume undocumented environment credentials/default endpoints.

Host plugin RPC proves daemon-level authorization, not the originating principal or a physical human gesture. The detailed trusted caller path must respect this limit; agent configuration MCP does not expose Spawn/Replace or receive an administrative credential. Actual provider authentication, reconnect and negotiated MCP revision remain unverified. The [T03 record](technical-design-grill.md#t03--ready-decision-frontier-after-f-t02) retains the chosen paths, alternatives and source limits.

### Runtime client lifecycle — engineering proposal under T03

One plugin-owned public SDK client serves the native adapter; creating a second client for each owner or job is unnecessary. Synchronous contribution registers RPC/hooks/settings and returns cleanup; asynchronous initialization opens durable state, validates the saved connection/daemon identity, acquires writer ownership and connects/subscribes/reconciles. Local observations can report initialization or connection blockers while native-dependent actions wait. A connected runtime does not arm disabled jobs, Resume paused owners or Spawn/Replace Sessions.

Connection parameters are deployment data for the existing host, not a fifth business settings group. Authentication uses private host storage/delivery; ordinary settings/receipts expose a reference and state, not the value. Details must be checked on supported hosts. A handler's temporary `{ paseo }` is not treated as a permanent startup accessor or retained across reload. Shutdown stops new admission, settles short local commits and closes listeners/subscriptions/client within the host lifecycle; interruption of outstanding I/O remains an operation-reconciliation case.

The endpoint location is persisted and restored for existing Sessions. An occupied/unavailable endpoint creates a blocker; choosing a new port is not silent recovery unless reattachment of existing native configurations is supported and verified. Authentication rechecks the bound Session/generation/Assignment and current revocation at owner acceptance and before controlled effects. Native possession of a token maps to that grant; it is not OS-process attestation or isolation from other processes with the same user's file access.

## 6. Verification and remaining design work

Verification crosses the owner's Interface with a temporary real SQLite database and artifact directory. The native seam has production and scripted Paseo adapters; fake clock is limited to actual timer/lease cases. Do not replace SQLite durability with a memory-store mock or treat live package availability as a passing test.

| Proof | Existing requirement |
| --- | --- |
| Duplicate/concurrent commands, stale revisions, changed payload, revoke-before-replay, commit-then-response-loss | OB02–OB05/OB08/OB13; VA02/VA13/VA14 |
| Reload during create/send/mutation, bound identity and credential continuity, stale writer and late results | OB06–OB10; VA07/VA13 |
| Claude/Codex actual MCP configuration, credential redaction and current authority enforcement | OB09/OB13; VA05/VA14 |
| WAL/locking/bounded writes and independent recovery with current schema | VA09/VA10/VA13; candidate-specific Fast/Deep checks |

No new runtime tests were run for this document. Existing evidence retains its original version/scope. F-T02 has been parent-reviewed and **T03/Q1–Q2 are accepted**; lifecycle/storage details above remain engineering proposals to verify. [T04](technical-workflow-execution.md) supplies the next WorkflowPrograms/Work execution proposal; scheduling/release/Analytics coordination remains. No extra material question is inferred merely from method/table sketches; T0 detailed-design closure remains open.
