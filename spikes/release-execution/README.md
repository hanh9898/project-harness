# Release execution — local fault spike

Throwaway correctness spike, 2026-10-22. No dependencies beyond Node with `node:test`; no Paseo operations, provider calls, jobs or installed-plugin changes. All test files live in OS temporary directories and are removed afterwards.

Run from repo root:

```sh
node --test spikes/release-execution/mechanisms.test.mjs
```

Result: **11/11 tests passed**. Tested behavior:

- Skill file unchanged/changed/missing is distinguishable against a recorded content digest. This is a detector, not a complete Work admission integration or skill isolation.
- Concurrent identical cacheable checks execute once; successful result is reused within the process.
- Candidate/check/input/environment changes cause execution again. Failure, timeout or thrown error is not cached as success.
- Health and non-cacheable checks run fresh. Heavy checks serialize using a deterministic barrier test, without timing-based assertions.
- A separate Node recovery executable works even when the simulated plugin executable crashes; restored code starts and current application-data bytes are preserved.
- Incompatible schema, modified fallback artifact and unrelated active release cause recovery to refuse without replacing active source.
- Recovery reconciles an operation interrupted after source switch but before journal completion. This test initially failed because recovery treated the already-restored pointer as drift; the implementation now recognizes the `recovering` phase plus the expected fallback digest.

## Limits

The cache/queue is in memory, not SQLite; restart durability, cross-process deduplication and persistent heavy-check ownership are not implemented. Identity inputs must be supplied accurately by the caller; the spike does not discover dependencies or fingerprint the entire host. All values used in identity tests are JSON-compatible.

Recovery uses an atomic-renamed JSON source pointer and JSON application data under one-actor assumptions. It does not install/reload an actual Paseo plugin, fence competing actors, fsync journals, apply migrations, restore backups, prove recovery-launcher survival across plugin/host restart, or prove auto-update of the recovery executable. It records schema readability from fixture metadata rather than verifying real application schema compatibility.

The recovery child is invoked after a simulated failed startup; the production requirement to launch the protecting process before reload remains untested. No claim is made that these 11 tests establish production-safe self-update.

Design: [release-execution.md](../../docs/design/release-execution.md). Next external spike: a disposable Paseo plugin, with independent recovery started before deliberately failing reload; verify same plugin ID, actual loaded source, current data preservation and recovery status visible outside failed plugin UI.

## Follow-up: SQLite and executable update

`python3 spikes/release-execution/storage-recovery.test.py` runs **10 additional passing tests** with real temporary SQLite databases and subprocesses: additive/idempotent migration; process death before commit; readable/restorable backup; refusal of corrupt backup and restore over new inserts/updates/deletes; incompatible schema; recovery v1 completing while v2 becomes default; broken executable probe refusing pointer change.

This is a local mechanism test, not a live plugin migration. Generation tracking covers only the fixture work table; offline restore assumes exclusive ownership and does not track external effects. Executable version-switch behavior is a model, not a production packaging/update chain. [Evidence](evidence/storage-executable-summary.json) · [Current verification report](../../docs/design/release-verification-results.md). The historical next external spike above has now been performed, including a separate 0.12.0 daemon; consult the report for current coverage.
