# Paseo 0.12 technical baseline: bounded facts, round 1

2026-10-23. **Read** = inspected source/package contract; **Observed** = standalone runtime/module inspection; **Inference** = consequence requiring implementation proof; **Gap** = unestablished. A12 architecture and A11 Stop/Pause remain accepted; technical design and V1 acceptance remain open.

Read [architecture](architecture.md), [whole-harness review](architecture-whole-harness-review.md), [modules](modules.md), [onboarding implementation](onboarding-implementation.md), [verification](verification.md), all four spike READMEs, [context facts r3](instructions-context-facts-r3.md) and [Stop facts r4](orchestrator-stop-pause-facts-r4.md). No tests, installs, upgrades, daemon/provider/plugin/agent/schedule operations or subdelegation occurred. Only this document was written. HBU's rejected `>=0.11.0 <0.12.0` range remains untouched; [upgrade evidence](paseo-daemon-upgrade-0.12.md) is separate.

## 1. Published baseline and runtime

**Read:** npm currently publishes **0.12.0** for [client](https://registry.npmjs.org/@getpaseo/client/0.12.0), [plugin](https://registry.npmjs.org/@getpaseo/plugin/0.12.0) and [protocol](https://registry.npmjs.org/@getpaseo/protocol/0.12.0); it is each package's only stable 0.12 version. All three report `gitHead: cafe4b01c8522ff39560241c5deb01427dc8dc5b`; their `package.json` files omit `engines`. Plugin peers require client/protocol **0.12.0**, Zod `^4.4.3`, React `~19.1.0` and React Native `>=0.81.5`. This is availability, not a dependency selection or compatibility test.

The [pinned SDK quickstart](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/quickstart.md) requires **Node 22+**. Missing `engines` does not establish Node 20 support. `/Applications/Paseo.app/Contents/Resources/app.asar`, parsed without extraction, contains Desktop/client/plugin/protocol/server/CLI packages at **0.12.0**; spike dependencies remain **0.11.1**. Unversioned deployed docs were consulted but are not the 0.12 contract; links below pin the release source or runtime version.

Historical onboarding/contract passes stay 0.11.1. The [separate 0.12 recovery suite](release-verification-results.md) proves only its recorded fixture scenarios, not SQLite integration, onboarding parity or V1.

## 2. Plugin runtime and SQLite feasibility

**Read:** server plugins are trusted, unsandboxed Node subprocesses. The [runtime](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/runtime.ts#L233) uses `child_process.fork()` without a custom executable. The [compiler](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/compiler.ts#L386) produces CommonJS, Node-platform code targeting `node20` syntax; this target neither supplies built-ins nor overrides SDK requirements. The [bundle evaluator](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/bundle-evaluator.ts#L13) forwards ordinary server imports to Node `require`. Packaged JavaScript confirms these paths.

**Observed:** executing only `process.versions` and `require('node:sqlite')` export inspection, without opening any database, returned:

- Shell Node **20.19.3**: `ERR_UNKNOWN_BUILTIN_MODULE`.
- `/usr/local/bin/node` **22.16.0**: `DatabaseSync`, `StatementSync`, `constants`, `backup`; experimental warning.
- Bundled Paseo Helper, located by the [local CLI wrapper](/Applications/Paseo.app/Contents/Resources/bin/paseo) and invoked with `ELECTRON_RUN_AS_NODE=1`: Electron **44.2.0**, Node **24.20.0**; those exports plus `Session`. The main executable returned the same versions/availability. No Paseo entrypoint was loaded; this did not inspect a running daemon/plugin.

**Read:** [Node 22.16 SQLite](https://nodejs.org/download/release/v22.16.0/docs/api/sqlite.html) was added at 22.5 and unflagged at 22.13, remaining experimental. [Node 24.20](https://nodejs.org/download/release/v24.20.0/docs/api/sqlite.html) labels it **release candidate, stability 1.2**. `DatabaseSync` and statements execute synchronously; `exec`, prepared statements, read-only opening and backup exist. API options differ by version, so “Node 22+” alone is insufficient as a SQLite contract.

**Inference:** in-process SQLite without installing a native addon is feasible on the inspected bundled runtime. This is not a plugin SQLite pass or a driver choice. **Gaps:** exact production runtime floor, event-loop blocking bounds, locking/busy policy, transaction/migration/backup behavior and fencing with independent recovery. These still need implementation evidence.

## 3. Harness MCP and owner RPC

**Read:** the published [server context](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/contracts.ts) registers RPC handlers, settings, providers, usage sources and lifecycle hooks. It has **no MCP Tool registration API**. `agent.create` hooks can inject MCP configurations; the [0.12 protocol](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/agent-types.ts#L18) represents stdio, HTTP and SSE, subject to provider support. Plugin RPC is not automatically an agent Tool.

**Inference:** an HTTP MCP adapter can live in the plugin subprocess and call owner Interfaces directly. A separate stdio adapter can bridge to owner RPC. Neither implies another durable store or permanent service. The plugin subprocess's own stdin is ignored; stdout/stderr are captured logs and host protocol uses IPC, so they are not an available MCP stdio endpoint.

**Read:** [RPC implementation](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/plugin-process.ts#L495) validates input/output. Handler context exposes `{ paseo }`, not authenticated harness principal/Session/generation or a cancellation signal. Hooks additionally receive an `AbortSignal`. The subprocess owns the SDK connection; teardown disposes it and invokes cleanup. Runtime RPC timeout is **30 seconds**; timeout does not cancel an ordinary handler. Shutdown allows two seconds before SIGTERM, then two before SIGKILL. Durable acceptance therefore cannot depend on a pending RPC surviving reload.

The exported lower-level `DaemonClient.invokePluginRpc()` exists under an **`internal`** package path; [authorization](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/authorization/operation-permissions.ts#L127) requires `daemon.manage`. It is not a scoped agent credential. **Gaps:** adapter authentication, receipt/request identity, reload reattachment and startup reconciliation's SDK acquisition; setup context itself has no `paseo` field. No transport is selected here.

## 4. SDK primitives for durable owners

**Read:** [profiles](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/agent-profile.ts) remain native launch bundles without a system-prompt field. [SDK](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/index.ts) provides administrative `config.get/patch`, provider discovery and workspace-bound agent creation. No profile-reference argument replaces resolving and materializing the selected native bundle.

[Pinned hooks](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/plugins/reference.md#ordering-and-returned-values) transform creation config except `cwd`; session-open hooks modify environment only. Ordering is deterministic, without automatic deep merge; launch environment overrides are not persisted.

Creation accepts `idempotencyKey`, `agentId`, `clientMessageId`, labels and `outputSchema`; send accepts `messageId` and steer/interrupt behavior, but no `outputSchema`. Fields alone do not prove retry scope/retention. [Structured output](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/agents.md#request-structured-output) still requires application validation. `run/waitForFinish` return idle/permission/error/timeout; timeout does not cancel. High-level handles have no cancel method; lower-level `cancelAgent(agentId)` has no expected-Turn guard. A11 durable Pause remains separate.

[Turn hooks](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/lifecycle.ts) carry nullable Turn IDs and completed/failed/canceled outcomes, without human Stop attribution. Hooks are best-effort, overlapping and unreplayed. [SDK reconnect](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/events.md) restores live observations; history requires explicit epoch/sequence pagination and replacement handling. These primitives do not supply Work's durable receipts, admission or fencing.

## 5. Decision boundary

**Routine engineering:** package/runtime pins, SQLite driver/schema/transaction mechanics, versioned plan representation/interpreter and MCP transport are implementation seams under accepted contracts. None requires re-deciding SQLite ownership, five-pattern composition or native managers.

**Material user decisions:** alternatives that change supported hosts/providers, installation obligations, authority/credential exposure, retained history, workflow authoring capability or recovery guarantees. Escalate those concrete tradeoffs when evidenced; do not silently weaken accepted behavior. No library, driver or IR is chosen, technical design is not closed, and independent V1 acceptance questions can proceed while SDK-dependent seams await proof.
