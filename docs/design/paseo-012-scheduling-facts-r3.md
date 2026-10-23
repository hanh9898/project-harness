# Paseo 0.12 scheduling facts — round 3

2026-10-23. **Read** means inspected primary contract/source; **Inference** means a consequence, not runtime proof; **Gap** means unestablished. npm client/plugin/protocol/CLI/server **0.12.0** metadata identifies commit **cafe4b01c8522ff39560241c5deb01427dc8dc5b**. Published client/plugin/protocol declarations were also inspected. All GitHub links below pin that commit; no newer deployed documentation is relied upon. [^P]

**Coverage:** read the requested technical grill, Triggers/Work sections, baseline r1 and boundary. Network/package reads only; no live operations, private configuration/transcripts, tests, installs, further delegation or HBU access. Only this report was saved. Source inspection does not establish deployed behavior.

## Native kinds

**Read:** stored targets are exclusively `agent {agentId}` and `new-agent {config}`; wire creation additionally accepts `self`, normalized to `agent`. Execution sends a prompt to an existing Session or creates a native workspace/agent. No code, command, HTTP-handler or workflow target exists in this schedule contract/executor. Managed workspace scripts have separate start/stop Tools. The internal constructor's injectable runner is not a public code-job registration Interface. [^T][^W][^E][^M]

Public cadence is five-field cron with optional IANA timezone. CLI `--every` compiles only faithfully representable presets to cron. Protocol/service retain `everyMs` as a compatibility path; it is not the advertised rolling-interval interface. No `at/once` cadence exists; `maxRuns=1`, immediate `runOnce` and CLI `--run-now` are real, distinct capabilities. [^T][^C][^D][^E]

## Access, identity and authorization

**Read:** public `PaseoApi` has no schedule methods; plugin handler/hook contexts supply that same API, with no schedule hook/manager. Lower-level `DaemonClient.schedule*` supports create/list/inspect/logs/update/pause/resume/delete/run-once through the explicitly **internal** package export. Wire schema availability is not a public SDK/plugin Interface. [^A][^X][^L][^I]

Public CLI and native MCP provide those operations for **new-agent schedules**, including history. Their schedule surfaces reject/filter heartbeats. CLI heartbeat create/update/delete requires `PASEO_AGENT_ID`; update changes cron/timezone only. MCP heartbeat create/delete requires caller-agent scope and ownership for deletion; no heartbeat inspect/logs/pause/resume/update Tool exists. Heartbeats nevertheless persist in the same native store. [^D][^H][^M][^K][^S]

Schedule RPC requires `automation.manage`; the CLI authenticates its daemon connection using password/local credentials. Native HTTP MCP is stateless: with a configured daemon password it accepts a per-daemon-run capability token or daemon-password bearer; without one it permits requests. Caller agent identity comes from a query parameter, not a distinct per-Session credential. This native mechanism does not establish T03's custom scoped-token authorization. [^U][^V][^B][^F]

Records have eight-hex-digit random schedule IDs, status and timestamps, but no configuration revision/CAS field. `updatedAt` also changes during execution. Update cannot retarget an existing-agent heartbeat. [^T][^W][^E]

## Occurrences, delivery and history

**Read:** each invoked run gets a UUID, `scheduledFor`, start/end timestamps, running/succeeded/failed status, nullable agent/workspace IDs, output/error. Automatic claim appends the run and advances its cursor in one serialized store update before execution. Heartbeat prompt text includes schedule/run IDs; new agents receive schedule/run labels. Skipped slots have no run records. [^T][^E]

MCP named creation upserts a non-completed record by normalized name plus target identity, preserving history but reactivating it. New-agent identity includes its entire target configuration. Unnamed MCP creation and ordinary CLI/wire creation mint records. Wire `requestId` correlates responses; the inspected schedule path supplies no durable request receipt, delivery acknowledgment or retry ledger. [^S][^E][^W]

Logs return the complete stored run array, ordered by start time; list/inspect/log schemas have no pagination cursor. The store has no pruning cap/TTL in the inspected implementation; deleting a schedule removes its JSON and embedded history. This is not an indefinite-retention guarantee. [^S][^E][^W]

**Gap:** no schedule-fire/run-complete plugin hook, durable event replay or consumer acknowledgment contract was found. Lifecycle hooks are best-effort, may overlap and have no replay/retry; SDK reconnect does not replay missed events. Agent timeline pagination is a different interface. [^L][^R][^G]

## Execution semantics and gaps

**Read:** an in-memory per-schedule guard prevents overlapping runs of that schedule; long-run completion advances overdue slots into the future, without queued catch-up. A busy heartbeat target fails with “already has an active run.” There is no configurable overlap/missed policy, global bounded concurrency or distributed lease in this service. [^E][^S]

A delayed active tick executes one stored due slot and skips intervening slots. Startup marks an interrupted running record failed, may archive its new-agent workspace, and advances overdue cursors beyond restart time without executing them. Resume computes the next future occurrence. No retry/backoff or missed-occurrence journal appears. [^E]

Pause persists `paused` and clears `nextRunAt`; it does not cancel the current run. Manual run-once remains allowed while paused, awaits execution, and does not advance cadence/recompute completion. Automatic completion limits count finished runs, including failures and manual history; completed records reject resume/run-once. Archived/missing heartbeat targets complete the schedule; startup sweeps orphaned targets. No logical-owner Session replacement/rebinding exists. [^E][^B]

Cron defaults to UTC, validates zones through `Intl`, and scans future UTC minutes using localized fields; day-of-month/day-of-week are conjunctive, with a 366-day search horizon. Updating cron without timezone preserves an existing timezone. [^C][^E]

**Inference:** native pause is not logical Work Pause; independent enabled ingestion and logical-owner admission require their separately accepted contracts. Native IDs/claiming do not prove Work acceptance or exactly-once external effects.

**Gap / contract probes, not executed:** establish supported unattended plugin heartbeat inspect/control/history; authorized caller/host identity; lost create/run-once response and named-upsert reactivation; crash between claim, prompt delivery and history update; pause/claim/manual-run races; busy target and cross-schedule contention; archive/Replace Session handling; DST gaps/folds, clock jumps and restart boundaries; large-history/deletion behavior. No performance claim follows.

**Ownership-relevant facts:** finite native agent cadence, immediate run-once, per-schedule single-flight and native run history already exist. No native code-job scheduler was verified. These facts neither select an architecture nor close T5.

## Source URL list

[^P]: npm 0.12.0 metadata: [client](https://registry.npmjs.org/@getpaseo/client/0.12.0), [plugin](https://registry.npmjs.org/@getpaseo/plugin/0.12.0), [protocol](https://registry.npmjs.org/@getpaseo/protocol/0.12.0), [cli](https://registry.npmjs.org/@getpaseo/cli/0.12.0), [server](https://registry.npmjs.org/@getpaseo/server/0.12.0). Published declaration archives: [client](https://registry.npmjs.org/@getpaseo/client/-/client-0.12.0.tgz), [plugin](https://registry.npmjs.org/@getpaseo/plugin/-/plugin-0.12.0.tgz), [protocol](https://registry.npmjs.org/@getpaseo/protocol/-/protocol-0.12.0.tgz).

[^T]: [Schedule types and stored records](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/schedule/types.ts#L7).

[^W]: [Wire schemas](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/schedule/rpc-schemas.ts#L27); [session request handlers](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/session/schedule/schedule-session.ts#L67).

[^E]: [Native schedule service, claims, execution and recovery](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/schedule/service.ts#L268).

[^M]: [Pinned native MCP reference, workspace scripts and scheduling surfaces](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/mcp.md#L116).

[^C]: [Cadence/timezone computation](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/schedule/cron.ts#L26); [five-field parser](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/schedule/cron-expression.ts#L107).

[^D]: [Pinned CLI documentation](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/schedules-cli.md#L65); [preset compilation](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/schedule/shared.ts#L299); [new-agent-only CLI guard](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/schedule/shared.ts#L53).

[^A]: [Public SDK API](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/index.ts#L486); [public connection configuration](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/index.ts#L81).

[^X]: [Client package exports, internal paths](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/package.json#L11).

[^L]: [Plugin context](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/contracts.ts#L9); [lifecycle event/before-hook union](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/lifecycle.ts#L47).

[^I]: [Internal schedule client methods](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/daemon-client.ts#L6109).

[^H]: [CLI heartbeat caller and ownership checks](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/heartbeat/index.ts#L35).

[^K]: [Native MCP schedule and heartbeat implementations](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L2640); [heartbeat ownership guard](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L929).

[^S]: [Native JSON store, identity matching, serialized mutation and deletion](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/schedule/store.ts#L12).

[^U]: [Schedule RPC permission mapping](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/authorization/operation-permissions.ts#L162).

[^V]: [CLI connection credential resolution](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/utils/client.ts#L181).

[^B]: [Native MCP token creation](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L650); [stateless route and caller parameter](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L1467); [archive callback](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L1373).

[^F]: [Native MCP request authentication](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/auth.ts#L128).

[^R]: [Pinned hook delivery contract](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/plugins/reference.md#L838).

[^G]: [Pinned SDK reconnect/event contract](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/events.md#L65).

