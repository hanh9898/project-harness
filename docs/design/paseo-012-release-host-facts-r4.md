# Paseo 0.12 release-host facts — round 4

2026-10-23. **Read** = inspected contract/source; **Inference** = consequence requiring proof; **Gap** = unestablished. GitHub sources pin **cafe4b01c8522ff39560241c5deb01427dc8dc5b**. Published CLI/server/client/plugin **0.12.0** metadata matches that commit; published client/plugin declarations corroborate the surfaces below. [CLI package][cli-package] [Server package][server-package] [Client package][packages] [Plugin package][plugin-package]

Read [policy](release-policy.md), [execution](release-execution.md), [historic verification](release-verification-results.md), [grill](technical-design-grill.md), [baseline](paseo-012-technical-baseline-facts-r1.md), and Matt’s research skill/Paseo help guidance. Accepted T03/T05 and release policy remain the prerequisites. No live daemon/agent/plugin/schedule APIs, tests, installs, private configuration/credentials/transcripts, HBU changes or delegation; only this document written. Deployed `paseo.sh/llms.txt` returned unsupported Markdown content-type through web and HTTP 403 directly; newer/unversioned docs supply no 0.12 evidence here.

## 1. Installation, replacement and identity

**Read:** Public CLI supports `plugin install|add <source> [--id <runtime-id>]`, `ls`, `reload`, `enable`, `disable`, `remove`, and reviewed `update`. Directory install records the absolute daemon-host path, without copying/uploading files. Duplicate runtime IDs are rejected. `file://` Git sources clone committed content into managed version directories; npm acquisition retains production dependencies/lockfile. Local fork Git updates can select a commit with `update <id> --ref <commit>`; directory updates are skipped. `--check` previews. [CLI][cli] [Source contract][reference] [Acquisition][managed]

**Read:** Public SDK `config.patch` accepts the `plugins` map; the supplied map replaces that map. **Inference:** this permits persisting a same-ID directory path without removal; patching does not restart it, so plugin reload is separate. Plain config-file reload preserves the in-memory plugin map. There is no CLI retarget command or public SDK plugin lifecycle method; those lower-level methods live under an `internal` export. [SDK][sdk] [Config][config] [Wire][wire]

**Read:** Reload, disable/enable and managed update retain runtime ID and host settings location. Removal deletes that ID’s settings directory and managed installation; directory source remains. Reinstalling the same ID cannot recover deleted settings. Settings-version migration can rewrite settings on read. [Service][service] [Settings][settings]

## 2. Activation and directory contracts

**Read:** No source watcher/automatic source reload appears in the service/runtime/compiler paths. Explicit reload stops the old subprocess, recompiles current files and starts anew; failure leaves it failed. Daemon startup/global enable also load configured enabled sources. Managed update instead prepares/validates another directory, attempts previous-runtime restoration on startup failure, and deletes the previous managed version after success. [Service][service] [Runtime][runtime]

**Read:** Compiler canonicalizes entry/import paths; entries are `index.client.ts(x)`/`index.server.ts(x)`, with local modules constrained to `client/`, `server/`, `shared/` and valid dependencies. It bundles both entries separately using esbuild `write:false`, without TypeScript typechecking. Manifest build commands run for managed acquisition/update, not directory install/reload. Assets must accompany their package; manifest asset paths are relative. [Compiler][compiler] [Manifest][manifest] [Preparation][prep]

**Inference:** Complete, prepared version directories fit these contracts; read-only compiler output does not establish whole-tree immutability. Mutating an installed directory can activate edits on another lifecycle start, or affect runtime filesystem reads earlier. Directory rebinding and reload have no combined atomic CAS operation; no schema/recovery-artifact compatibility transaction is supplied. Managed cleanup also matters for retained recovery artifacts. **Gap:** relocation, symlink swaps, dependency/assets resolution and concurrent mutation need disposable-host proof.

## 3. What status and client refresh establish

**Read:** `ls` reports configured path/enabled/status/error and installation identity. Managed revision is current checkout `HEAD` or package version; directory identity has no revision. Managed updates check expected installation root/revision and reviewed target; these checks do not hash arbitrary working-tree contents. These are acquisition/filesystem facts, not loaded-source attestations. Runtime catalog contains only `id`, exact client-bundle string and requirements: no loaded server-source digest, whole-plugin hash, plugin instance/generation or client execution acknowledgement. [Service][service] [Acquisition][managed] [Wire][wire]

**Read:** Status is only `running|disabled|failed`; enabled-but-absent means failed, including during restart. While reload queues, reads can show the previous state. Ready follows contribution initialization, not functional/data compatibility checks. [Runtime][runtime] [Lifecycle contract][reference]

**Read:** Catalog-change events fetch the catalog and force replacement for the changed ID, even with identical bundle text. Client disposal clears its QueryClient and registrations; reevaluation creates new state. Unchanged other bundles can be preserved. Evaluation errors stay client-local. **Gap:** no daemon proof that every connected/offline client refreshed or rendered successfully. [Sync][sync] [Registry][registry]

## 4. Independent recovery access and limits

**Read:** CLI lifecycle requests reach the daemon-owned service independently of plugin RPC/contribution success. Global plugins and the plugin’s own switch must both allow starts. Plugin management, catalog, logs and RPC require `daemon.manage`; this is administrative authority, not a scoped Session MCP token. CLI selects an explicit home/endpoint, resolves native authentication and checks feature flags. The SDK’s accepted T03 connection is separate from native CLI credential discovery. SDK integration requires Node 22+; plugin subprocess uses the daemon executable. Compatibility requirements are checked separately against daemon and client app versions; these semver checks do not establish schema/executable compatibility. Compiler `node20` syntax targeting does not select the executable or its built-ins. [CLI gate][gate] [Connection][connection] [Authorization][auth] [SDK quickstart][quickstart] [Runtime][runtime] [Requirements][requirements]

**Read:** Initialization deadline is 30s; shutdown escalates after 2s then another 2s. Default correlated-client RPC timeout is 60s. Lifecycle work is serialized; preparation has no imposed timeout. A timed-out request does not prove its queued action was cancelled. **Gap:** independent execution does not guarantee recovery while the daemon, authentication or lifecycle queue is unavailable. [Runtime][runtime] [Client transport][transport] [Preparation][prep] [Service][service]

## 5. Existing probes and remaining proof

**Read:** Public SDK `connect()` completes after server identification; `getConnectionState()` reports connectivity. CLI `daemon status --json` exposes daemon identity/version and worker information; `plugin ls/logs` expose plugin state/errors. `/api/health` returns only status/timestamp. None proves the loaded whole plugin. Typed plugin RPC registration and client `useRpc` support application-defined probes, but there is no built-in release/schema compatibility handshake or standalone public-SDK plugin-RPC method. [SDK][sdk] [Daemon status][status] [Health][health] [Plugin contract][contract] [RPC reference][reference]

**Inference:** existing RPC or the accepted HTTP adapter can carry application-defined release/schema probes, but plugin-reported identity needs candidate binding; a failed plugin cannot answer.

**Gap:** disposable tests must establish candidate-to-loaded server/client/assets identity, UI cache/reconnect refresh, same-ID path switching/settings preservation, lost-reply reconciliation, bounded recovery with unavailable daemon/stuck preparation, and compatible settings/data/executable recovery. No new private API is assumed.

## Historic tests — separate evidence

[Recorded verification](release-verification-results.md): 0.11.1 recovery and separate 0.12.0 isolated-daemon stop/start recovery fixtures; watcher started before failure. They do not establish host reboot/power loss, whole-plugin/UI identity, Workflow Run resume, multi-actor fencing or production schema compatibility. No tests rerun here.

## Primary source URLs

[cli-package]: https://registry.npmjs.org/@getpaseo/cli/0.12.0
[server-package]: https://registry.npmjs.org/@getpaseo/server/0.12.0
[packages]: https://registry.npmjs.org/@getpaseo/client/0.12.0
[plugin-package]: https://registry.npmjs.org/@getpaseo/plugin/0.12.0
[cli]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/plugin/index.ts#L123
[reference]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/plugins/reference.md
[managed]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/managed-source.ts#L124
[sdk]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/index.ts#L466
[config]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/daemon-config-store.ts#L349
[wire]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/messages.ts
[service]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/index.ts
[settings]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/settings/index.ts#L103
[runtime]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/runtime.ts
[compiler]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/compiler.ts#L386
[manifest]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/manifest.ts
[prep]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/preparation.ts
[sync]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/app/src/plugins/catalog-sync.tsx#L31
[registry]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/app/src/plugins/registry.ts#L39
[gate]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/plugin/shared.ts
[connection]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/utils/client.ts#L172
[auth]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/authorization/operation-permissions.ts#L127
[quickstart]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/quickstart.md#L15
[requirements]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/plugin-requirements.ts#L22
[transport]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/daemon-client.ts#L1052
[status]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/daemon/status.ts#L51
[health]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L799
[contract]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/contracts.ts

