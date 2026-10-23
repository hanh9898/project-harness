# V1 acceptance — resumed interview S02

2026-10-23. Design phase. Overall architecture S01 is [closed at A12](history/architecture-a12-2026-10-23/closure-a12.json); V01 accepts the first-V1 gate contents below. **S02 is closed at [V02: P3187 → P3189](history/v1-v02-2026-10-23/closure-v02.json).** Development target: Paseo 0.12; the local daemon has been upgraded, with the separate [HBU plugin incompatibility](paseo-daemon-upgrade-0.12.md) retained. No migration of that live plugin or full production implementation is authorized by this interview.

## Baseline and source of the unanswered gate

[Scope §4](scope-80-20.md#4-nghiệm-thu-v1--đề-xuất-chờ-xác-nhận) originally proposed six evidence groups. The original question at [P1270](grill-history/transcript.md#p-1270) was followed by a prototype-coverage question at [P1272](grill-history/transcript.md#p-1272), not acceptance; V01 supplies the new scoped acceptance. Feature scope, native ownership, Fast/Deep release policy, one target project, Claude/Codex and the architecture follow-ups remain settled. This round confirms the aggregate first-V1 evidence gate, not a reduced feature set or a full suite for every incremental patch.

## Design tree

| Node | Decision/obligation | Prerequisites | State |
| --- | --- | --- | --- |
| V0 | Shared understanding and closure of aggregate V1 acceptance | V1/V2 and any resulting material frontier, explicit closing confirmation | **Closed V02/Q1** |
| V1 | Six groups of evidence for first V1 on Paseo 0.12, one project | Accepted product scope and A12 target | **Accepted V01/Q1** |
| V2 | Sufficient evidence of self-improvement for first V1 | Improvement Loop/evidence/quality meanings and short-release economics already settled | **Accepted V01/Q2** |
| V3 | Concrete acceptance matrix with traceable artifacts and proof levels | V1/V2 answers | **Mapped VA01–VA14**; all remain unexecuted for full V1, exact datasets/probes are engineering |
| V4 | Actual execution/measurement and provider parity | Detailed technical design and implementation | Future engineering/proof, not a user factual question |

V1 and V2 are independent: the evidence groups can be accepted while the sufficiency of improvement evidence is debated. V2 concerns first-V1 proof; it does not impose a controlled evaluation or waiting period on every later patch.

## V01 — ready frontier

### Q1 — Adopt the six-group evidence gate for first V1?

Recommendation: **yes**, on one existing project and Paseo 0.12. Retain the already accepted requirements:

1. Fresh plugin + existing native profiles → Onboarding chat/MCP → user Spawn Harness Engineering → user Spawn Project, without the user writing workflow code.
2. Real work from chat/Backlog to worker execution, validated result and evidence; real GitLab comment ingestion/handling within authority, no duplicate work on repeated polling.
3. All five patterns verified, at least one actual composed/nested workflow, and Claude/Codex dispatch, Skills/Principles, structured result, compatible fallback and continuation under the accepted contracts.
4. General scheduling for code jobs/agent work/workflow: once/interval/cron/timezone, overlap/missed policies and host interruption/reconciliation. Native cadence retains its owner; unsupported behavior is not marked passed.
5. An evidence-backed self-improvement change activated; self-update capability exercised with UI/runtime/data-schema changes and an intentionally failed-update case proving independent compatible recovery/work continuity. No requirement to combine every category into one release or apply Deep checks to every future patch.
6. Deep Analytics on real operational records, Saved Views, comparison/drill-down to evidence, missing-data truth and separation of operational observation from controlled evaluation.

Fixtures and isolated 0.11.1 spikes cannot substitute for the corresponding 0.12 live/contract evidence. Acceptance is scoped to the tested input/capabilities, not universal operation. Mandatory failure/authority/reload cases remain in verification; the six groups organize them rather than replacing them.

Alternative: retain provisional evidence priorities and negotiate the aggregate first-V1 gate later. This is not permission to silently cut the already accepted MUST features.

### Q2 — Demonstrate improvement in a bounded controlled case rather than require weeks of positive live trends before V1?

Recommendation: **yes**. At least one first-V1 case shows the harness loop observe an actual/controlled defect, form and implement a change, check the relevant before/after behavior against the same criterion, and activate it within authority. For example, duplicate-event handling fails before the fix and passes after it, with source/version/evidence retained. A human need not manually implement the patch for the harness.

This proves the bounded loop/change outcome, not sustained cost/quality gains across arbitrary live work. Dashboard/retro retains missing/inconclusive judgments when real operational data is insufficient. No fixed multi-day observation period, forced daily improvement, self-reported LLM quality score or baseline trial for every patch is introduced. Later incremental changes still follow the accepted Fast/Deep and candidate-specific evidence policy.

Alternative: require a defined pilot duration and sufficiently supported positive operational trend before first-V1 acceptance. That needs metric, workload and observation-window decisions and may delay short projects; it must not infer causation from incomparable tasks.

**User answer V01:** `ok` at **P3170**, answering both recommendations at **P3168**. [Native evidence](history/v1-v01-2026-10-23/acceptance-v01.json) retains exact question/answer, IDs and API page. **Q1/Q2 accepted**: six first-V1 evidence groups and a bounded controlled improvement case, without a mandatory multi-week trend. This is acceptance of the gate contents, not execution/readiness/V1 pass or S02 closure.

Scope §4 and verification are synchronized; [VA01–VA14 matrix](v1-acceptance-matrix.md) maps every group to evidence level and current unexecuted status. Original detailed Interface/OB cases and provider/recovery obligations remain. No new vocabulary meaning or ADR is needed: this narrows an acceptance criterion using existing Evidence/Controlled Evaluation/Verdict meanings, without changing them. [Before snapshots](history/v1-v01-2026-10-23/baseline.json) preserve the former pending gate.

There is no further material gate choice substantiated by mapping these accepted requirements. Technical design, native capability, metric/dataset/threshold choices and execution remain separate work; implementation incompatibility must return with evidence rather than silently cut the gate. The remaining S02 frontier is explicit shared-understanding confirmation below.

## V02 — shared understanding and closure

### Q1 — Confirm the gate/matrix scope and close S02?

Recommendation: **yes**. The six accepted groups and VA01–VA14 evidence mapping define when first V1 on Paseo 0.12/one project can be accepted, including a bounded improvement case and truthful missing/inconclusive live conclusions. The matrix organizes already accepted obligations; passing evidence still has to be produced. S02 closure does not select SDK/SQLite/interpreter/MCP protocols, close technical design, implement the product or declare V1 passed. Later patches retain Fast/Deep policy.

Alternative: identify a specific missing/ambiguous first-V1 acceptance criterion and continue that branch. Do not reopen all feature scope or treat every unrun test as an unanswered user decision.

**User answer V02:** `Ok đi tiếp` at **P3189**, answering the closing question at **P3187**. [Native evidence](history/v1-v02-2026-10-23/closure-v02.json) retains the exact records and scope. **S02 is closed.** The next work is detailed technical design for Paseo 0.12; no VA case is marked passed and no implementation protocol is accepted by this scoped closure. The preceding pending wording records the state before this answer.
