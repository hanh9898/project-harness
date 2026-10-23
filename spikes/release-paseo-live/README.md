# Paseo live recovery spike

Disposable experiment, not production self-update. Run on **2026-10-22**, daemon **0.11.1**, host `127.0.0.1:6767` (`Mac-MN-14.local` from earlier host discovery). See [structured evidence](evidence/live-summary.json).

## Result

**Pass:** recovery executable launched before a failed real plugin reload restored the same plugin ID to `running`. The launcher had already exited before the fault. Recovery did not depend on the failed plugin's RPC or UI.

1. Typechecked and installed only `harness-release-recovery-spike-20261022`; initial plugin PID **490**.
2. Started independent Node recovery PID **511** through launcher PID **510**. Verified readiness at `12:00:12.567Z` and launcher exit before faulty reload.
3. Typechecked a candidate whose contribution function deliberately throws. Real `paseo plugin reload` exited **1**, and `plugin ls` reported **failed** with `INTENTIONAL_DISPOSABLE_RELEASE_SPIKE_FAILURE`.
4. Test driver durably signaled `fault-observed`. Recovery independently checked actual failed status, candidate/fallback digests and fixture schema; restored fallback source and reloaded the same ID.
5. Recovered plugin PID **619**, boot receipt `12:00:17.220Z`; independent recovery reported `running` at `12:00:17.611Z`.
6. Byte hash of current fixture application data remained unchanged. Its schema, committed-work marker and counter were not restored from an older backup.
7. Removed disposable plugin. Existing plugin IDs, source paths, enabled flags and statuses matched the pre-experiment snapshot. No daemon restart, agent launch, schedule change or HBU source update occurred.

The observed timestamps describe this run, not a latency SLO or benchmark. Recovery result is recorded on disk outside plugin UI.

## Run and inspect

```sh
node spikes/release-paseo-live/run.mjs
```

**This command installs, intentionally breaks, recovers and removes a disposable plugin on the hard-coded local host.** It refuses an existing plugin with the same ID and a reused `.spike` directory containing watcher/result evidence. For another run, inspect previous evidence and verify that recovery has exited before preparing a fresh run directory; do not treat old ready/result files as new proof.

Uses existing dependencies from `../paseo-contract/node_modules` via a local symlink, avoiding a second package install. The earlier package versions are pinned there. Generated `index.server.ts` embeds only paths into this experiment's `.spike`; neither file is a distributable plugin implementation. The runtime entry is typechecked before install and before deliberate runtime failure. An initial generated-string syntax error was rejected by typecheck before install, corrected, and the successful live experiment then ran.

Raw startup receipts, activation journal and fixture data remain under ignored `.spike/`; the compact evidence summary is retained in `evidence/`. The journal uses temp-file/rename writes; no fsync or power-loss durability guarantee is made.

## What this does not prove

- No competing actor/fencing, daemon restart, host sleep or reboot.
- No migration, SQLite restore or real production application-data preservation. Data is a JSON fixture owned only by this plugin experiment.
- No existing agent or Workflow Run continuation through this faulty update.
- No automatic startup-failure diagnosis: driver signals the observed fault, while recovery independently verifies actual failed status before changing source.
- No self-update of recovery executable, failed recovery retry, or recovery of client UI contributions.
- Watcher runs for one bounded operation; it is not a permanent service. Boundaries/timeouts are experiment values, not approved production budgets.
- Cleanup observation checks plugin configuration/status, not absence of every possible effect in other plugins.

Design and remaining work: [release-execution.md](../../docs/design/release-execution.md).

## Follow-up on isolated daemon 0.12.0

`prepare-isolated.py` creates a separate temporary home/localhost endpoint with relay disabled and custom plugins enabled; `isolated-suite.mjs` uses only that daemon. **4/4 cases passed:** worker restart, full daemon stop/start with independently detected failure/recovery, blocked invalid fallback, then successful recovery from a fresh operation. [Evidence](evidence/isolated-suite.json) · [Full report](../../docs/design/release-verification-results.md).

The watcher now supports an explicit per-operation state directory and optional bounded auto-detection, tolerating daemon unavailability without treating it as plugin failure. This supersedes the automatic-diagnosis/daemon-restart gaps for the narrow tested scenarios, not the other limitations of the earlier 0.11.1 run. The disposable daemon was stopped and its home removed; the main daemon was not restarted.
