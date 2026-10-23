# Overall architecture — shared-understanding review

2026-10-23. Design only. **Proposed closing summary; user confirmation pending.** [Interview/tree](architecture-grill.md) · [Architecture](architecture.md) · [Module Interfaces](modules.md) · [Visual review](architecture-review.html).

## Accepted scope

One Project Harness for one existing software project, implemented as one thick Paseo Plugin. Harness Engineering Orchestrator builds the Project Orchestrator and improves both the project harness and itself through the Improvement Loop. Each orchestrator keeps its own responsibility, inbox, context and lifecycle. Code owns execution structure, authority, budgets, durability and reconciliation; agents reason at permitted decision points.

Native chat is the main interface. Onboarding configures through MCP; the user then initiates Spawn Engineering and Spawn Project. Open Session navigates; Replace Session is explicit and transfers authority while retaining worker allocations/history. Panel UI manages harness config/inbox, agent/work monitoring and deep Analytics, without another chat composer or mandatory business-task forms.

V1 retains all five composable/nested workflow patterns, a general scheduler including code jobs, real Backlog/GitLab integrations, Claude/Codex, daily retro, full plugin self-update, independent recovery and deep Analytics/Saved Views. Four settings groups remain Agents/Limits/Actions/Automations. No new service, database or settings group follows from the module map.

## Module ownership

- **AgentDefinitions:** Agent Catalog, Agent Definition revisions, role/Skill/Principle bindings and validation/resolve for dispatch. Definitions reference existing native primary/fallback profiles. Explicit Skill names/sources are required; per-agent Skill catalog isolation is not required.
- **Work:** two inboxes, Actions/Limits/per-orchestrator Delegation Policy revisions and edit Interfaces, admission, dynamic execution, Assignments/Attempts, timers, checkpoints, supervision and reconciliation. Catalog membership does not grant authority. Pinning a policy for traceability does not preserve a revoked grant.
- **WorkflowPrograms:** authoring, normalization and validation of versioned chain/route/parallel/workers/optimize compositions. Validation itself does not perform code-step I/O; Work executes the checked program.
- **Triggers:** code-job scheduling/runner, native schedule bindings, occurrence/run identity, cursor/events/outbox and delivery. Paseo retains native agent cadence; one cadence has one owner. Empty polls do not wake agents.
- **Criteria:** criteria scope/revisions, frozen evaluation inputs, evidence/baseline and Verdict. Work executes evaluator steps; Criteria does not secretly dispatch agents.
- **Releases:** candidate/check/activation journal, affected-checkpoint coordination, post-activation health and compatible independent recovery. Local improvement does not wait for upstream contribution.
- **Analytics:** sourced queries/aggregations, comparisons, drill-down and Saved Views. Source modules keep authoritative writes; Criteria retains Verdict authority. Missing measurements stay distinct from zero; a Saved View is not a frozen evaluation dataset.

Paseo remains owner of native hosts/providers/profiles, Sessions/chat, workspaces and native agent schedules. Harness adapters use verified native capabilities and fail with a specific blocker when mandatory capability is missing. All mutation callers use the owning Interface with authenticated context, authority, validation and revision checks; UI/MCP do not write store state directly.

## Execution and recovery traces

1. **Bootstrap:** native context/profile → Onboarding MCP → owner config revisions → Readiness/Handover → user Spawn Engineering → built Project Orchestrator → user Spawn Project. A receipt/report is not proof of completed construction or production readiness.
2. **Chat acceptance:** native conversation → orchestrator interpretation → owner Tool → durable Receipt/reference → acknowledgement. Crash before owner commit has no accepted-work guarantee; commit with lost response reconciles the same request identity. Conversation is not automatically converted into tasks.
3. **Execution:** Work accepts before planning; WorkflowPrograms checks composition, AgentDefinitions resolves valid definitions and Criteria freezes relevant revisions. Work admits, records Attempt/allocation intent and dispatches through Paseo/tools under current authority. Dynamic plan expansion and all five patterns remain permitted within pinned templates/bounds.
4. **Result and continuation:** validate structured result/evidence, retain per-Assignment and aggregate Outcomes, then Criteria concludes on the correct evidence/revisions. Turn end is not completion. Retry, quality revision and late-result applicability preserve D02/D03/GA01 identities and fencing.
5. **Escalation:** missing capability blocks dependent project work and creates linked/deduplicated harness work. Engineering builds a candidate within granted authority; insufficient permission/resources goes to a user decision. Independent work can continue.
6. **Polling and schedules:** Triggers runs versioned code handlers, commits cursor/events/outbox, then delivers deltas to Work. Empty polls create no agent work; delivery after uncertain response reconciles the stable key. Once/interval/cron/timezone, bounded overlap and bounded missed-run policies remain required despite partial Interface sketches.
7. **Shared authority/resources:** Work owns effective policy; Work/Triggers/Releases apply it at relevant execution boundaries. Revoke checks happen before subsequent actions. Cross-owner reservations/transactions and native enforcement need engineering/proof; independent recovery cannot require a live Work subprocess.
8. **Improvement:** sourced Work/Criteria/Releases data → Analytics/retro → hypothesis/candidate → evaluation → authorized Fast/Deep checks → activation → new-runtime health → continued observation. Mandatory Deep and the bounded Fix-forward rules remain those already accepted; no universal heavy check or blind rollback is introduced.
9. **Update/recovery:** Releases records intent and starts the versioned independent executable before reload. Work prepares only affected checkpoints/admission. The executable observes health and performs compatible recovery when necessary; code rollback does not imply old SQLite restore. Offline/online writer transfer and ambiguous external effects require fencing/reconciliation.
10. **Host restart:** no plugin execution while the host is down. Existing Paseo/machine/operator startup precedes automatic Work/Triggers reconciliation and supported missed policy. V1 adds no separate unattended OS bootstrap obligation. An activation watcher surviving daemon stop/start is not machine-reboot proof.
11. **Upstream:** a separate authorized work item extracts reusable code/tests/evidence without private project content; its PR outcome neither activates local code nor changes project goals.

Git retains versioned code/definitions/Skills/Principles/templates and intentional exports; SQLite owns active mutable revisions and durable work/journals/decisions/trigger state; artifact files retain large identified evidence/context. Intent is recorded before effects. External effects are outside the local transaction; uncertain outcomes reconcile before retry, without an exactly-once promise.

## Explicit engineering work remaining

- Runtime representation/interpreter/framework and the complete typed Interface schemas for all five patterns, policies and schedules; partial TS sketches do not cut required behavior.
- SQLite schema/driver, operation journals, cross-owner transactions/reservations, leases/fencing, effect correlation and migration compatibility.
- Native Tool transport/authentication/credential reattachment, scheduler bridge/occurrence evidence, provider enforcement, structured results, cancel/timeout/fallback and startup integration contracts on the target host.
- Packaging/installer and independent executable distribution/recovery; integrated failure scenarios and production resume.
- Analytics metric formulas/freshness, provenance/attribution, query bounds and real-data coverage; resource budgets/slots only where measurable/enforceable.

These are unfinished technical-design/proof branches with owners in the documents; this summary does not approve every old method/payload or preselect an unverified API. A failed capability investigation must reopen the affected decision with evidence rather than silently lower the requirement. Deployment-specific upstream/license/host settings are not inferred from HBU.

## Evidence and closure boundary

[A01 native evidence](history/architecture-a01-2026-10-23/acceptance-a01.json) accepts AgentDefinitions/Analytics. [A02 native evidence](history/architecture-a02-2026-10-23/acceptance-a02.json) accepts policy ownership, receipt-based chat acceptance and startup obligation. [R1](architecture-frontier-audit-r1.md) and [R2](architecture-scenario-audit-r2.md) are bounded factual audits, not user answers. Parent review found no further material architecture choice justified within these traces after synchronization.

This review does not claim exhaustive formal coverage, that all source pins/provider capabilities were independently audited, production feasibility, implementation, test pass or aggregate V1 acceptance. UI fixtures and isolated spikes retain their recorded limits. The overall architecture session stays open until the user explicitly confirms shared understanding of this current summary. Glossary closure, detailed engineering sessions and the separate aggregate V1 acceptance gate keep their own scope.
