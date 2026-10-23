# Local plugin deployment and activation probes — T07 proposal

2026-10-23. **[T07/Q1 accepted](history/technical-t07-2026-10-23/acceptance-t07.json)** at P3362 → P3364. The installation/deployment path is selected under the whole-plugin self-update policy; exact mechanics below remain engineering proposals, not a live install, completed implementation or native capability proof. [F-T04](paseo-012-release-host-facts-r4.md) supplies pinned facts; [T06](technical-evaluation-release.md) owns the surrounding evaluation/activation protocol.

**Runtime rebase:** current native target is [Paseo 0.13.0-beta.1](paseo-013-beta1-baseline.md). Earlier 0.12 sources and decisions retain their historical scope. Accepted behavior and module ownership remain; exact beta adapters, runtime capabilities and live integration still require proof.

## 1. Why select a deployment path?

Paseo supports directory installs, while managed Git/npm update has its own restoration and old-version cleanup behavior. Remove also deletes the runtime ID's host settings. Separately, a public `config.patch({plugins: ...})` replaces that map and does not itself reload the plugin. These native operations are not a compatibility transaction for harness data, recovery artifacts or unrelated plugin configuration. See F-T04's service/config/CLI sources.

**Selected T07/Q1:** install the self-updating V1 plugin from a prepared local deployment directory on the selected daemon host, with a stable runtime ID/path. Harness Releases stages/publishes its own artifacts and requests native reload. Git remains the fork's source of truth; native Paseo still owns install/enable/disable/reload and Sessions. No additional permanent process or Paseo fork is required.

Alternative: make native managed Git/npm update the release mechanism. Its behavior would require compatible migrations and retained recovery artifacts across the native restoration/cleanup window, and a coherent policy for two release controllers. That needs a separate design; do not silently treat the native updater as our existing data-aware recovery protocol.

## 2. Proposed layout and first installation

Illustrative host paths, not new UI fields or fixed defaults:

```text
fork/                       versioned source and candidate worktrees
deployment/plugin/          stable directory installed once in Paseo
deployment/releases/<id>/   prepared candidate / retained compatible artifacts
data/                       SQLite, artifacts and private connection references
recovery/<id>/              operation-pinned executable outside replaced source
```

The prepared directory contains the manifest, both entries, permitted client/server/shared modules, dependencies and assets expected by the native compiler. Preparation performs required build/typechecks before activation; a native directory reload is not a build/typecheck substitute. Reuse compatible prepared dependencies and candidate-specific checks rather than reinstalling all packages or running the full V1 gate for every patch.

The base deliverable must supply a prepared bootstrap snapshot for this first installation; the user is not asked to write workflow code or manually assemble dependencies to obtain the initial harness. Artifact packaging/runtime compatibility remains an implementation proof obligation. Any additional unavoidable user provisioning discovered during that work must be made explicit instead of being hidden behind “prepared directory.”

Initial setup uses the public native directory-install route with an explicit runtime ID. Ongoing patches retain that ID and configured path. Releases does not remove/reinstall the plugin as an update strategy or repeatedly rewrite the whole native plugins map. An existing managed installation is not silently converted. Local improvement and upstream contribution remain separate work; pulling upstream can produce a new checked local candidate without waiting for upstream publication.

## 3. Publication and independent recovery

Candidate work does not edit the active deployment tree. Source, data and the running Recovery Executable have distinct paths/lifetimes. Mutable state and private credentials stay outside the directory being published.

Before publication, Releases verifies candidate identity, affected-work readiness and an available compatible recovery artifact; it starts the independent driver as already required. Every filesystem/native effect has an intent and observable pre/post condition. Only harness-owned deployment paths are writable through this protocol; external Skills/Paseo/provider installations are not candidate publication targets.

The directory publisher must prove complete snapshot publication and retained artifact/resource compatibility. Do not assume a symlink swap survives canonical-path checks, that moving files is atomic across platforms, or that old code never reads files while a source directory changes. Use a tested filesystem procedure with interruption recovery, and bind runtime resource reads to retained release identities. An unproven mixed/partial source state blocks reload/continuation and is reconciled by the independent driver.

Request reload for this ID using a verified public native path. An unavailable daemon, native lifecycle queue or authentication is a recovery blocker; the driver is not an out-of-band way to force the daemon to cooperate. Global/per-plugin disablement and concurrent native administration must be reobserved and honored under the actual capabilities. Do not claim native CAS or request cancellation that the host does not supply.

A small patch still follows Fast/Deep impact policy. Publication/recovery mechanisms themselves require Deep checks. The design does not impose release tags, a full package rebuild, full backups or a fixed observation period for every patch. The publisher and artifact reuse need measurements/proof before performance claims.

## 4. Loaded identity and health evidence

Native path/version/status and application startup markers are different observations. A directory source has no native immutable revision, and platform running/ready status is not the harness's compatibility Verdict. Use the following proposed records, with their provenance exposed:

- Prepared build manifest: candidate/source/dependency/assets identities and expected client/server protocol contracts, tied to the checks that actually ran.
- Server startup observation: activation operation, release/build identity, fresh runtime instance, data compatibility and writer ownership. A marker must be bound to the prepared artifact/source observations; a copied version string alone is insufficient.
- Client observation: that client's evaluated build/contract and relevant mounted-view/probe results via the supported typed UI/RPC path. Identify it as application evidence, not daemon attestation or proof that every view/client rendered.
- Actual changed behavior: independent relevant Interface/UI/integration checks. Those supply the bounded claim; markers do not replace them.

F-T04 establishes client catalog refresh behavior but no universal connected/offline-client acknowledgment. Keep UI/backend states and freshness separate. With no UI observation, report that dimension as unknown/pending where relevant; do not demand every offline client approve a release or turn server health into a whole-plugin UI pass. Whether a check is mandatory comes from the candidate's accepted check plan. Unrelated eligible work is not globally stopped merely because an unrelated client is offline.

Existing Sessions and older client bundles can still hold old contracts. Keep supported MCP/RPC/plan/handler contracts compatible or apply a recorded compatible checkpoint path; newly added capability is not assumed visible in a running provider. Old UI flags cannot override owner-side current authority/revisions/Pause. Unsupported refresh or incompatibility is a blocker for the affected operation, not automatic orchestrator Replace.

## 5. Native facts versus remaining proof

Source inspection found explicit source reload rather than an automatic directory watcher. That does not make in-place edits safe: later lifecycle starts or resource reads can observe them. Package/daemon compatibility checks also do not prove schema/runtime/artifact compatibility.

Disposable-host proof must cover fixed-path directory publication, assets/dependency relocation, same-ID settings preservation, source change with lost reload response, old resource consumers, server/client marker binding, UI refresh failure, API compatibility, interrupted publication, disabled/unavailable daemon and compatible recovery. Use real temporary FS/SQLite plus scripted faults first, followed by the appropriately authorized beta native cases. Previous fixtures retain their original limits.

No tests or live operations ran for this proposal. T07/Q1 accepts the install/update mechanism only. Exact filesystem publisher, source/marker evidence, native-command adapter and bounded failure behavior remain technical implementation/proof; T0 is open.
