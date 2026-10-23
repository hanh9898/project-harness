# Disposable Onboarding MCP vertical slice

Runnable experiment, not the production Project Harness. The actual native-session evidence and limitations are in [onboarding-spike-results.md](../../docs/design/onboarding-spike-results.md). No git checkout metadata exists in this workspace; dependencies are pinned by `package-lock.json`.

`index.server.ts` injects a role-specific HTTP MCP through public `server.before('agent.create')`. It preserves other MCP entries and adds exact `toolPolicy.preapproved` rules for this MCP only. Its subprocess hosts a stateless Streamable HTTP adapter with separate random bearer credentials for onboarding, engineering and the deterministic driver. A stable loopback port and private credentials survive plugin reload within one experiment.

`server/owner.ts` owns validation, authority bounds, revision checks, dependency hashes, mutation receipts, readiness, saved handover, role bindings and reconciliation. Both MCP and driver call it; neither maintains another config. `server/journal.ts` uses exclusive lock, file fsync and atomic rename. A crash leaving a lock fails closed. There is no distributed fencing or power-loss durability claim.

The host/profile is read using public `config.get()`. Only its safe selected fields are used; no native config writes or credential copies. `agents.create()` creates the first native session; `workspaces.ref(id).agents.create()` places Engineering in the pinned workspace. Sessions start idle, so workspace/project refs can be saved before the first smoke prompt. Native creation identity and labels are journaled before creation. An unresolved creation intent is searched by labels; zero matches fails closed rather than retrying. Dispatch is also journaled before send, but ambiguous delivery is not automatically retried.

Minimum harness config is finite and strict: goal, existing native profile reference, assigned Skills and Principles source references and fixed limits (two role sessions, 180-second wait per smoke turn, no project writes). Native project/workspace refs are bound by the owner from returned native handles. Optional Backlog/GitLab/polling/specialists do not block this smoke. `check` and `complete` pin config revision and dependency hash; Engineering Spawn rechecks the handover. Readiness is only build-ready for this smoke. The real Engineering agent must read the handover via MCP and acknowledge the exact config, revision and digest; an idle session alone is never success.

MCP tools are this spike's implementation subset, not a claim about built-in Paseo tools or the entire proposed protocol:

- Common: `onboarding_inspect`, `guidance_read`, `onboarding_check`, `handover_read`.
- Onboarding: `onboarding_configure`, `onboarding_complete`.
- Engineering: `handover_acknowledge`.

Spawn/dispatch is driver-only, simulating an explicit user button. There is no Project Orchestrator build, scheduler, Replace Session, custom composer or profile editor. `guidance_read` returns native UI guidance for profile writes, which this adapter does not expose; it does not assert that all public native configuration APIs are unavailable.

## Reproduce on the tested host

Read the code before installation. This driver intentionally refuses other host/daemon versions; adapting those guards requires checking the corresponding public SDK contract. It uses the already-enabled primary daemon because the existing native profile is host-owned. An isolated home would have no such profile reference; no public import preserving the same host identity was verified. It does not initialize or enable plugins on a user's disabled host, restart the primary daemon, or touch HBU.

On this Mac, `/usr/local/bin/node` is Node 22.16.0. The shell's initial Node 20 lacks the WebSocket API needed by the Paseo client. Use Node >=22.16 explicitly:

```sh
export PATH=/usr/local/bin:$PATH
cd spikes/onboarding-mcp
npm ci --ignore-scripts
npm test
npm run prepare:live
npm run typecheck
npm run live
# Inspect evidence/live.json, then always clean this experiment:
npm run cleanup
```

`prepare:live` discovers the daemon, checks only the global `pluginsEnabled` field locally and reads the profile through the public SDK. It resolves `test` by name, preserves its native ID/values and creates private `.run/bootstrap.json` (0600) and a disposable `.run/workspace`. It rewrites `server/location.ts` with this checkout's state directory so the plugin's bundled entry has an explicit owner path. No secrets are in generated TypeScript. The sources currently assigned are `mattpocock-skills:codebase-design` at its explicit `SKILL.md` path and this project's `docs/design/paseo-boundary.md` as Principles. Their real paths/hashes are pinned. Adjust these explicit source paths in the driver for another authorized installation.

`live` typechecks before install/reload, requires `running`, creates at most one session per role for this run, runs Onboarding, reloads only this plugin after handover, resumes MCP calls in the same Onboarding session, and issues the explicit Engineering Spawn. Three bounded turns are expected (Onboarding, reconnect readback, Engineering). Each wait is capped at 180 seconds; on that deadline the driver archives its own agent. Timeout does not otherwise imply completion. On any failure, inspect `evidence/live.json`, do **not** rerun `live` or delete a pending intent to retry, and run cleanup. A transport failure during send may need label reconciliation before cleanup; no exactly-once dispatch is claimed.

`live` saves sanitized native tool-call evidence through the capture step. To recapture before cleanup:

```sh
node --import tsx driver/main.ts capture
```

Raw native session configs and transcripts are not exported. `.run*`, `node_modules` and downloaded `.local-docs` are ignored. Never print bootstrap, authentication headers, environment variables or the whole daemon config. Generated bearer values are local spike credentials, not copied provider secrets. Scope is enforced at this MCP adapter, but agents retain native shell/tools; role fencing against a malicious agent is not established.

## Cleanup and another experiment

`cleanup` searches only this run's role labels, archives only matching agents and checks for unrelated active agents before archiving the created workspaces. It removes only `project-harness-onboarding-mcp-spike`, verifies the primary worker PID and selected native profile values stayed unchanged, and records HBU's status. It then deletes the private bootstrap. Archived native sessions remain history; the automatic native project record may remain in the catalog because project deletion was not verified through this SDK. this does not claim their internal serialized MCP settings were erased. Removing the endpoint makes its old credentials inactive.

After successful cleanup, preserve `.run` under a distinct ignored name before a fresh `prepare:live`, for example `mv .run .run-completed-20261022`. The driver refuses an existing bootstrap or state. Earlier failed rounds here are preserved as `.run-round1` and `.run-round2`; their redacted evidence is retained. Do not move/delete a run with active or unresolved resources as a retry mechanism. The currently retained `.run` is also already cleaned. No background watcher or daemon remains from this spike.

Tests use real temporary files and one real HTTP/MCP protocol case, with a scripted Paseo adapter. Actual native integration is separately recorded in `evidence/live.json`; unit/API simulations are not counted as native proof. A real lost native creation response, daemon restart, concurrent owners, power loss, native profile CRUD, catalog isolation, UI rendering and production workflow operation remain untested.
