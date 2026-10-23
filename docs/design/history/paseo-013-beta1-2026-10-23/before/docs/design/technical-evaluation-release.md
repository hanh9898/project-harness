# Criteria, Analytics and Releases coordination — T06

2026-10-23. **Engineering proposal**, following T03/T05 and the existing Fast/Deep, evidence and recovery decisions. This connects the eight module owners without changing their ownership. F-T04 has been parent-reviewed; [T07](technical-plugin-deployment.md) selects the prepared local directory path through its scoped acceptance. [Technical tree](technical-design-grill.md) keeps remaining proof. No runtime implementation or live operations are performed here.

## 1. Interfaces and responsibilities

| Module | Caller gets | Implementation responsibility |
| --- | --- | --- |
| Criteria | Frozen applicable criteria and a scoped assessment/Verdict | Criterion/evaluator revisions, evidence applicability, mandatory versus optimization judgments |
| Work | Receipt and observable evaluation/work execution | Admission, evaluator Assignments/code execution, results, context, native effects and reconciliation |
| Analytics | Paged queries, comparisons, drill-down and revisioned Saved Views | Consistent source scope/provenance, metric availability, compatible populations and attribution |
| Releases | Accepted activation operation and its observations | Candidate/check identity, source activation ordering, compatibility and independent recovery |
| Knowledge | Qualified learned notes and retrieval | Scope/source/recheck lifecycle; no implicit publication or model loop |

These Interfaces include rights, revision/precondition checks, errors and ordering. They do not expose arbitrary SQL, let a caller write `passed=true`, or require UI/MCP callers to implement the cross-owner transaction protocol. Pipeline coordination lives in the relevant owning implementation and versioned workflow, not another public Kernel module.

## 2. Evaluation execution

Criteria resolves and freezes the criterion/evaluator references applicable to the requested work/change. A controlled comparison additionally identifies dataset/cases, baseline/candidate, inputs and environment. Frozen references do not make mutable external Skills immutable; source/digest drift retains its existing checkpoint/replan behavior.

Work runs the identified code/agent evaluators as recorded execution through the same admission, authority, resources and result validation as other work. Criteria never dispatches a hidden LLM call while answering a read or assessment. Schema validation establishes shape; a grader's result must support the actual criterion/claim. A self-reported model score alone does not establish improvement.

Assessment commits against the frozen criteria and exact result/evidence inputs. Changed scope/criteria are new revisions, not an overwrite of a previous Verdict. Missing evidence, incompatible comparisons or insufficient support produce the applicable blocked/inconclusive conclusion. Business Outcome, quality Verdict, activation health and request resolution remain distinct.

The first-V1 bounded improvement case from V01 is sufficient for that gate only within its tested scope. This protocol does not require a new baseline trial, weeks of monitoring, a fixed sample count or the full V1 suite for every incremental patch. Bug fixes need reproductions/related checks; broader quality/cost claims need a supported comparison under the accepted policy.

## 3. Analytics and daily retro

Analytics reads committed owner records/projections and references their revisions and observation times. Queries/Saved Views have typed filters/grouping, result limits, pages and drill-down references; no transcript parsing or provider request is hidden inside a dashboard read. A view definition is not a frozen evaluation dataset. Reproducible evidence records the selected source IDs/range/revisions or artifact rather than only a mutable Saved View name.

Each metric definition identifies units, population, time basis, available coverage and source. Missing provider usage is not zero cost. Direct usage attribution requires actual correlation; ambiguous shared Session usage remains shared/unallocated, and totals count source usage once. Parallel latency is not silently added into wall-clock time or assigned the cost attribution formula. Formula/threshold changes require revisioned definitions and honest comparison limits.

Daily retro is scheduled work, eligible under A10/T05. It queries outcomes, failures, evidence and qualified learned notes, then may propose a candidate. It can conclude that no change is supported. Operational observations do not become controlled causal evidence merely because the dashboard draws a comparison. Promotion of a lesson into reusable Instructions/Skill/workflow still uses the relevant candidate/check/activation path.

## 4. Candidate and check identity

Stage the candidate separately from the active plugin source. Record immutable source/artifact identities, dependency/contract versions, change scope, expected active base, check plan and evidence. F-T04's source findings do not make live-directory editing safe; [T07](technical-plugin-deployment.md) specifies the proposed staging/publication path and its unresolved proofs.

Mandatory checks follow the accepted Fast/Deep impact policy. Storage/recovery, effect deduplication, authority, activation or self-repair mechanisms require Deep; a small diff does not bypass that classification. Ordinary narrow changes use affected checks. Authorized improvements do not require an extra manual approval for every release, and an agent cannot expand its grant/budget by editing a candidate.

Reuse a passing release check only for the same candidate/check/inputs/relevant environment identity. Changed identity runs the check again; failed/unknown/timeout is not a cached pass. Native/live-dependent checks require their proper observation, and post-activation startup/health belongs to the newly loaded instance. A durable check queue deduplicates work and reconciles uncertain old processes before releasing capacity or rerunning.

Run-scoped composition from registered blocks remains outside plugin release. Editing a mutable setting within existing user authority is not automatically an executable-code deployment. Reusable behavior and harness-owned code/resource changes retain their candidate lifecycle; native profiles and external method installations keep their owners.

## 5. Activation operation

Proposed ordering, with a short local commit before each external effect:

1. Releases accepts the request with expected active revision, authorized principal and candidate/check references. The receipt identifies this operation, not a completed reload.
2. Claim exclusive activation ownership, then recheck current base, evidence identity, authority and policy. Concurrent changes conflict instead of silently rebasing the candidate.
3. Work prepares the affected scope at recorded Checkpoints and blocks incompatible new progression. Narrow changes need not stop unrelated workers; unknown impact follows the existing broader-admission containment rule. Results already in flight retain their identities.
4. Establish artifact/plan/schema/runtime compatibility, including any migration and candidate-specific backup requirement. A digest without the necessary readable/executable artifact is insufficient.
5. Start and verify the compatible independent Recovery Executable before replacing/reloading the plugin. Pin that executable and its protocol for this operation; do not overwrite the running recovery driver with the candidate.
6. Record activation/source-change intent and perform the supported native lifecycle action under the selected deployment path. Lost response triggers source/runtime reconciliation, not blind reinstall/reload. F-T04 establishes public lifecycle and ID/settings facts; T07/Q1 selects the path, while exact adapter/publication proof remains.
7. The new runtime reports a versioned startup handshake linked to this operation and claims the proper writer generation. Establish actual loaded source/instance and run mandatory startup/affected checks. Endpoint/credential references and pending work survive; no automatic orchestrator Spawn/Replace or Resume occurs.
8. Record observed active state and verified readiness separately. An activation target is not proof it loaded; a failed plugin is not shown as active merely because an older release used to work. If UI and backend observations differ or UI loading is not observed, report their actual states rather than a whole-plugin pass.
9. Resume eligible affected work only after the relevant mandatory checks. Contained defects use bounded Fix-forward under the existing four conditions; boot/self-repair failure uses independent compatible recovery.

This is a durable protocol, not a promise that the plugin subprocess survives its own reload. A startup marker must be linked to verified artifacts/native observations; inventing a version string is not native load proof. Supported marker/observation and UI refresh mechanisms are factual/probe prerequisites.

## 6. Data and recovery coordination

Store migration has an identified plan, preconditions and compatibility ranges for active/recovery readers and writers. Acquire the necessary writer ownership before migration; lease expiry or a new local fencing number alone does not prove an old executor stopped causing native effects. Do not hold a database transaction across native reload or provider I/O.

Use transactional migrations where their effects actually fit one local transaction. Multi-file/native operations need their own intents and pre/post checks. Live SQLite backup must use a verified consistent procedure, not a naked copy of the database file while WAL writes continue. Backup scope remains candidate-specific, not mandatory for every small patch.

Rollback of code does not roll back committed data/effects. Recovery selects a known artifact compatible with current state, not blindly the previous version. Where new writes make an old snapshot unsafe, preserve them and use a verified compatible recovery/forward repair; do not restore the entire old database automatically. If neither compatible continuation nor bounded containment is established, stop further affected effects and expose the blocker through recovery independent of the failed plugin UI.

A connected recovery process has the native privileges it needs privately; those credentials are not agent MCP tokens. Offline/online writers share a documented ownership protocol. Restart relies on the accepted Paseo/machine/user startup path; running a recovery watcher before reload is not proof of surviving reboot or a new OS bootstrap guarantee.

## 7. Verification and frontier

Use owner Interface tests with real temporary SQLite/FS/Git and scripted native faults for stale evidence/base, duplicate activation, uncertain reload, in-flight results, writer competition, migration incompatibility, missing artifacts and mixed UI/backend observations. Use actual 0.12 disposable integration for source/ID/settings preservation, loaded server/client identity, endpoint continuity and independent recovery. Existing isolated 0.11.1 and bounded 0.12 spikes retain their original limits.

These obligations trace to VA08–VA14 plus existing release/OB cases. No new test pass, indefinite retention policy, mandatory monitoring gate or whole-system benchmark is introduced. F-T04 has been parent-reviewed and T07/Q1 accepted; exact mechanics and native/source/marker compatibility still need proof. Technical T0 remains open.
