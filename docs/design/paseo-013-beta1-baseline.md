# Current Paseo baseline — 0.13.0-beta.1

2026-10-23. User reports the completed update at **P3403**. Read-only local observations confirm the CLI, installed Desktop application and default local daemon declare **0.13.0-beta.1**. The daemon is desktop-managed on `Mac-MN-14`, reachable locally at `127.0.0.1:6767`, server ID `srv_-iiRgPCwc4-X`. This identifies the inspected host; it does not describe every remote host connected in the app.

## Evidence and source identity

- [Exact user steering](history/paseo-013-beta1-2026-10-23/runtime-steering.json), backed by the saved native API page.
- [CLI and daemon observation](history/paseo-013-beta1-2026-10-23/local-observation.json), with selected status fields and commands.
- [Installed application and official package metadata](history/paseo-013-beta1-2026-10-23/package-observation.json).
- All five official `@getpaseo/{client,plugin,protocol,server,cli}@0.13.0-beta.1` package records pin **`3fa625701eae6b3a07ccae18299200b1a7cf2776`**. Matching declared versions does not attest that installed application bytes equal those sources.
- [Before snapshots and hashes](history/paseo-013-beta1-2026-10-23/baseline.json) preserve the preceding current documents. Historical acceptance records and the concept register are unchanged.

No install, restart, provider run, plugin mutation or live integration test was performed for this baseline.

## Consequences for the ongoing design

New native compatibility evidence must target this exact beta. The original A12 runtime request and V01 acceptance were made against 0.12; those question/answer records and 0.11.1/0.12 spikes retain their historical scope. This version update changes neither the V1 evidence groups nor their unexecuted status.

Accepted **T03** (explicit startup connection and per-Session HTTP MCP credentials), **T05** (conditional Schedule ownership), and **T07** (prepared local deployment directory) remain selected. Version-specific facts must be rechecked before choosing exact native adapters. No new product decision follows merely from the version number.

[F-T07 runtime delta](paseo-013-beta1-runtime-delta-r7.md) has completed. Its source findings include:

- Public `@getpaseo/client/node` now exports `createHostClient`; the returned client exposes more native operations than the high-level facade. Revisit blanket claims that schedule/plugin operations require an internal import. Import, bundling and host behavior still need contract proof.
- Plugin setup still has no SDK accessor or MCP Tool registry, and RPC context still does not attest an originating individual user/Session. T03's startup and credential obligations remain.
- `agent.turn_ended.timeline` is always empty. Treat the hook as a wake signal; obtain required evidence through explicit retrieval or durable owner result submission. A fixed transcript tail is not complete Turn evidence.
- Scheduling policy/target limits and directory reload/source-identity limits remain in the inspected source. T05/T07 are not superseded.
- Package/UI exports and workspace-first creation changed. Current plugin/recovery SQLite availability remains unverified; old Node observations do not supply a beta runtime pass.

[F-T08 dispatch/authority delta](paseo-013-beta1-dispatch-authority-delta-r8.md) has also completed. Agent-originated sends now enter a per-recipient two-second quiet queue; quiet means no new queued input, not recipient idle. The queue is memory-backed. A queued receipt can precede dispatch and leave a durable receipt pending after a crash. High-level `agent.send()` discards the low-level delivery status. None of these establishes durable noninterrupting wake delivery, message-specific completion or authenticated Session authority. Per-connection permission ceilings and new host routing also do not establish Consult/no-child enforcement.

Both reports are tracked in the [technical tree](technical-design-grill.md). They inform the native adapter and bounded probes before finalizing T08. Neither constitutes a live Claude/Codex or whole-plugin compatibility pass. Technical **T0 remains open**.
