# Local Paseo daemon upgrade — 2026-10-23

User instruction P3118 selected Paseo 0.12 as the development target and explicitly requested the daemon upgrade. [Architecture closure/authorization evidence](history/architecture-a12-2026-10-23/closure-a12.json).

Desktop-managed local host `Mac-MN-14.local`: app/CLI were already 0.12.0, while the daemon reported 0.11.1. Executed `paseo daemon restart --timeout 60 --json`. The supervisor and server identity were retained; the worker was replaced. Post-check: daemon **0.12.0**, reachable at the existing local endpoint, HTTP health `ok`, configuration bytes unchanged, and all 32 agent IDs in the immediate pre-restart snapshot remained visible. This is not proof of task-level continuity.

## Compatibility issue observed

`hbu-agent-config` was running before upgrade and is now **failed**. Its deployed manifest declares `requirements.paseo: ">=0.11.0 <0.12.0"`; daemon 0.12.0 correctly rejects it. All three agents that were running in the immediate pre-restart snapshot were observed idle afterward. No new agent prompt was sent; no HBU code or version guard was changed. HBU needs a plugin version/migration compatible with 0.12 before its automation can be considered operational again.

## Evidence and limits

[Sanitized observations](history/architecture-a12-2026-10-23/daemon-upgrade-0.12.json). Private configuration/status/agent/plugin snapshots: `/Users/hanhnt2/.paseo-upgrade-backups/daemon-0.11.1-to-0.12.0-20261023T090617Z`. The backup is local with restrictive permissions and does not constitute a full consistent snapshot of running session state. Existing 0.11.1 spike evidence remains historical; this upgrade does not prove V1/provider parity or migrate the future Project Harness implementation.

Official guidance consulted: [Updates](https://paseo.sh/docs/updates), [daemon restart and troubleshooting](https://paseo.sh/docs/troubleshooting#i-changed-configjson-but-nothing-happened). Markdown/index fetching failed with unsupported content-type/HTTP 403; the official HTML pages were read instead. Deployed migration docs include newer APIs, so they were not used to silently migrate an unrelated live plugin.
