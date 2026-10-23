# Triggers and Work scheduling — T05 proposal

2026-10-23. Detailed design draft for Paseo 0.12. **T05/Q1 is pending**: extending harness-owned schedules beyond code jobs when native cadence cannot satisfy the required contract. No schedule ownership, live configuration or accepted glossary meaning is changed by this document. [Technical interview](technical-design-grill.md) records the frontier; [F-T03 research](paseo-012-scheduling-facts-r3.md) separates source facts from runtime proof.

## 1. Facts and the ownership decision

Pinned 0.12 source supports agent/new-agent targets, cron/timezone, finite runs, immediate run-once and history. It does not provide code/workflow targets or an at-instant cadence. Its overlap guard is per schedule; restart skips overdue slots. Configurable bounded catch-up/global admission and logical-owner rebinding are not supplied. Public SDK schedule methods are absent; CLI schedule operations primarily cover new-agent targets, while heartbeat controls are narrower. These are source findings, not live contract passes. See the report's primary links.

The accepted V1 scope requires once/interval/cron, bounded overlap/missed policies, shared admission and explicit orchestrator Pause. The earlier unconditional statement “agent schedule = Paseo, harness scheduler = code only” is therefore insufficient as an implementation assumption. The narrower accepted principle—use native when adequate, one owner per schedule—can be retained by the proposal below.

**Recommendation, awaiting T05/Q1:** native sources retain their native owner and verified semantics. A harness-managed Job requiring stronger semantics can have its Schedule owned by Triggers even when its target is agent work or a Workflow Run. That Schedule submits through Work; it does not create a second native schedule for the same Job. No extra permanent process or native profile editor is required.

Alternative: extend Paseo's native scheduling contracts first, then depend on that supported capability. Do not silently cut V1, implement private native APIs as if public, or mirror/replay a native calendar in SQLite to pretend it has different semantics.

## 2. Responsibilities under the proposal

| Owner | Records and behavior |
| --- | --- |
| Paseo | Existing native cadence/enablement/target/history; harness keeps references and observations only |
| Triggers | Harness-owned Job/Schedule revisions, due occurrences, overlap/missed selection, source cursor/events and durable delivery |
| Work | Effective authority/resources, logical Pause, accepted work, execution/Attempt/Assignment, Run Timers and recovery |
| Analytics | Queries from these owners; source/availability and distinct occurrence, Job Run, delivery and agent-execution counts |

No callback is treated as a durable acknowledgment. Native binding is eligible only when the needed identity, observation and control capabilities are verified. Missing heartbeat inspection/pause/rebinding remains a blocker, not a reason to spawn another orchestrator or claim Pause succeeded. Ordinary native jobs outside controlled Work do not inherit harness admission guarantees merely by appearing in the monitor.

## 3. Due times and policy

For harness-owned schedules, persist the selected rule/revision and evaluation basis. Once uses an absolute instant; interval uses an explicit anchor and period; cron uses a pinned parser contract and IANA timezone. Store due instants in UTC with enough timezone/offset information to explain them. Parser choice, DST gap/fold behavior, clock-jump handling and preview equivalence need engineering verification. Do not assume the native parser and a library interpret all expressions identically.

Occurrence identity includes Job, Schedule revision and due instant. Manual Run Now has its own request identity and does not need a scheduled occurrence. An already accepted due occurrence does not change identity after a configuration edit or restart.

- **Overlap:** skip the new activation, retain one pending activation, or permit parallel execution up to a declared bound. Queues and active reservations are durable; a lease expiring alone does not establish that an old execution stopped.
- **Missed:** skip, coalesce one execution, or bounded catch-up. Persist the selected interval/cursor and policy decision so another startup does not choose it again. Coalescing records the covered occurrences/range; it does not invent a successful execution for every missed tick.
- **Bounds:** finite batch/window/count limits prevent an unbounded restart storm. Large skipped ranges can be summarized rather than creating one row per minute. Exact defaults are implementation choices to validate under the existing Limits policy.

Backlog/PR polling keeps the accepted default of no overlap and one coalesced execution after downtime. It reads changes from a source cursor rather than replaying the same API request for every missed wall-clock slot. Disabling/re-enabling a Job does not retroactively turn its disabled interval into authorized catch-up work.

## 4. Durable activation and completion

1. A short local transaction checks Job/Schedule revision, enablement and due cursor, then records occurrence selection/pending activation. The cursor and selection commit together.
2. Triggers and Work coordinate local reservations/admission against current authority, logical Pause and shared resources. Failure to admit records a waiting/blocking reason; it does not manufacture a Step Attempt.
3. Before execution, commit Job Run and the relevant code-effect intent or Work delivery. Native/network I/O happens outside the transaction. A work receipt proves acceptance, not completion.
4. Code handlers return validated progress/events/evidence. Cursor, normalized events, deliveries and local state commit consistently; an empty poll does not call an LLM. Stable source/object/change identity, rather than poll time, deduplicates work.
5. For agent/workflow targets, link the actual tracked execution and keep overlap reservations until its declared completion/settlement condition. Sending a prompt or receiving a receipt is not that condition. A code poll may finish after committing delivery while the separate downstream agent work continues.

This is an internal coordination protocol, not a public SQL/queue interface. Ambiguous external responses reconcile under the same operation identity before conflicting retry. Timeout and a local “failed” record do not prove the external execution has stopped.

## 5. Pause, Run Now and capacity

Job pause stops future automatic eligibility; Work Pause stops the logical orchestrator's controlled new wake/admission/progression. Independent enabled ingestion and accepted worker results remain available as specified by A11. Native Stop is not a substitute for either control.

Proposed manual Run Now is a separate authenticated request, subject to authority, resource and applicable logical Pause checks. It does not Resume the Job/owner or move the recurring cursor as a side effect. The native source's actual manual behavior remains distinct. No UI button can promise unsupported native control.

Work retains the shared resource ledger. Code polls consume bounded code/network capacity without consuming an LLM worker slot. Agent work and consultations use the existing shared worker limits; orchestrator capacity remains distinguishable. A pending timeout still reserves uncertain external execution until reconciliation establishes whether replacement capacity is safe.

Aging/fair rotation among eligible work can prevent repeated polling or a busy inbox from starving the other orchestrator; control commands are short local owner operations, not tasks waiting for an LLM slot. Exact fairness/batch/timeout parameters need measurement, not a new per-Agent Definition quota form.

## 6. Native sources and migration limits

Use verified public native operations through an internal adapter; CLI is a candidate where the public SDK lacks a method. Its host/version/authentication, response-loss and output contracts must be tested. Do not use an internal client export without explicitly treating it as a separate compatibility choice.

Native run IDs and labels are observations, not Work receipts. Native snapshots/fingerprints are not native CAS revisions; `updatedAt` is not a reliable configuration revision. Preserve source state/history already observed without pretending a complete occurrence history exists. Unsupported pagination/heartbeat observation remains an availability limit.

Do not recreate/upsert a native schedule on reconnect just to obtain a reference; that can change state. Do not delete it as history cleanup. Session replacement requires actual target-control support, not relabeling the old heartbeat. A native source and a replacement harness-owned source must never both keep firing unnoticed: explicit migration needs source disable/settlement evidence and separate intents before target activation. If that cannot be established, block the migration.

No native configuration is migrated merely by accepting the proposed ownership exception. Existing native sources keep their owner; the new path is for explicitly configured harness Jobs whose contract needs it.

## 7. Interruption example and proof

Host stops during Backlog polling. On return, reconcile the interrupted effect before advancing its cursor; select one coalesced activation for the missed interval. Duplicate task changes produce one durable delivery. If Project Orchestrator is paused, ingest can commit to its inbox while no new Project dispatch occurs. Resume later allows Work admission within current rights/capacity. A separate native heartbeat cannot be reported as safely bridged unless its actual wake/control behavior meets that contract.

Required Interface cases use real temporary SQLite/FS, scripted adapters and fake time: due selection versus revision/pause races; coalesced restart twice; bounded catch-up; uncertain old execution; source-cursor/event dedupe; Run Now without implicit Resume; held reservations while blocked; and result arrival during logical Pause. Native 0.12 cases separately cover supported CLI controls, missed/restart behavior, history, lost responses and target replacement. These trace to VA03/VA06/VA07/VA13/VA14. No tests or live schedule operations ran for this draft.

T05/Q1 is the single substantiated ownership frontier. Parser choice, DDL, clock arithmetic, adapter wiring and queue parameters are engineering/proof work after the owning path is selected. Technical T0 remains open.
