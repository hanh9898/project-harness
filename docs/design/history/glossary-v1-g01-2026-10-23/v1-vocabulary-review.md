# Project Harness V1 — English vocabulary review

Accepted on 2026-10-23. This record preserves the original 96-entry review scope. Definitions now live in their owning glossaries; graph types/cardinalities, new UI translations and runtime proof are separate.

English names and definitions come first. Existing Vietnamese names/anchors remain aliases; no new Vietnamese UI translations are proposed here.

The 23 external/general terms receive contextual reference notes at their documented owner, rather than automatically becoming domain entities or independent glossary records.

[Interactive review](v1-vocabulary-review.html) · [Source manifest](v1-vocabulary-review.json) · [Source audit](v1-vocabulary-audit-r2.md) · [Current concept graph](v1-concept-graph.html)

## Naming changes

| Earlier draft name | Canonical English name |
| --- | --- |
| Role Binding | Orchestrator Session Binding |
| Logical Owner | Orchestrator Responsibility |
| Procedure | Agent Procedure |
| Operating Rules | Core Operating Rules |
| Delivery | Work Delivery |
| Cursor | Source Cursor |
| Job Handler | Code Job Handler |
| Native Cadence | Paseo Cadence |
| Operation | Tracked Operation |
| Admission | Execution Admission |

## Common

Owner: [GLOSSARY.md](../../GLOSSARY.md).

<a id="common-loi-harness"></a>

### Harness Core

The shared foundation of harness capabilities that excludes rules specific to the target project. A change serving a project's own rules does not automatically belong to this foundation.

- Concept ID: common.loi-harness
- Review class: naming-choice
- Aliases to preserve: Lõi harness
- Review-time scope note: Preserve the existing loi-harness anchor and Vietnamese name; no new component or package boundary is implied.
- Sources: [SRC015: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:93](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="common-tieu-chi-anh-gia"></a>

### Evaluation Criterion

A requirement or objective with an explicit scope and method of evaluation, used to assess project results or harness operation. Earlier evaluations retain the criterion version under which they were made.

- Concept ID: common.tieu-chi-anh-gia
- Review class: naming-choice
- Aliases to preserve: Tiêu chí đánh giá
- Review-time scope note: This is a translation of an accepted meaning, not approval of a new evaluation policy.
- Sources: [SRC018: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:111](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="common-tieu-chi-ket-qua-du-an"></a>

### Project Outcome Criterion

An Evaluation Criterion stating what a project's product or work must achieve within a project, workflow or task scope.

- Concept ID: common.tieu-chi-ket-qua-du-an
- Review class: naming-choice
- Aliases to preserve: Tiêu chí kết quả dự án
- Review-time scope note: Outcome here does not restrict criteria to the Outcome record or introduce a new acceptance gate.
- Sources: [SRC019: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:117](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="common-tieu-chi-van-hanh-harness"></a>

### Harness Operating Criterion

An Evaluation Criterion for orchestration effectiveness, including operating quality, time, cost or the need for human intervention within a stated scope.

- Concept ID: common.tieu-chi-van-hanh-harness
- Review class: naming-choice
- Aliases to preserve: Tiêu chí vận hành harness
- Review-time scope note: No metric formula, fixed target or automatic cost-quality trade-off is introduced.
- Sources: [SRC020: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:123](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="common-yeu-cau-quyet-inh"></a>

### Decision Request

A specific issue requiring the user's decision before dependent work can continue, accompanied by evidence and a recommended course. The decision is retained with its work context.

- Concept ID: common.yeu-cau-quyet-inh
- Review class: naming-choice
- Aliases to preserve: Yêu cầu quyết định
- Review-time scope note: A Decision Request is the unresolved issue; Decision is its recorded answer.
- Sources: [SRC021: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:129](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="common-project"></a>

### Project

The single existing software project served by a Project Harness, potentially spanning several repositories.

- Concept ID: common.project
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Older first-run examples involving empty or new repositories are historical, outside this V1 scope.
- Sources: [SRC146: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md), [SRC260: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md)

<a id="common-repository"></a>

### Repository

A version-controlled code repository belonging to the target project. Several repositories can belong to the same Project without requiring separate Project Harnesses.

- Concept ID: common.repository
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Use a contextual reference under the proposed owner, rather than a new repository manager or lifecycle.
- Sources: [SRC146: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md), [SRC260: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md)

<a id="common-native-paseo"></a>

### Native Paseo

The host product that owns native projects, workspaces, profiles, agent sessions and their management interfaces. Project Harness references those resources and adds its own work coordination and improvement capabilities.

- Concept ID: common.native-paseo
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Native Paseo is contextual wording; preserve the proper name Paseo and do not duplicate its configuration editor or active store.
- Sources: [SRC147: docs/design/paseo-boundary.md:7](../../docs/design/paseo-boundary.md), [SRC148: docs/design/paseo-boundary.md:15](../../docs/design/paseo-boundary.md), [SRC188: docs/design/paseo-boundary.md:53](../../docs/design/paseo-boundary.md)

<a id="common-workspace"></a>

### Workspace

A native Paseo execution context referenced by harness work and associated with the project's code and runtime resources.

- Concept ID: common.workspace
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Architecture.md:102 specifies isolated worktrees for writing workers; that execution rule does not redefine every Workspace as a writable worktree.
- Sources: [SRC148: docs/design/paseo-boundary.md:15](../../docs/design/paseo-boundary.md)

<a id="common-onboarding"></a>

### Onboarding

The initial configuration and usage guidance provided through native Paseo conversation before the user starts the harness build stage.

- Concept ID: common.onboarding
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Completion makes the next Spawn action available; it does not automatically start another stage or establish project competence.
- Sources: [SRC149: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:7](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC261: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:7](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC154: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:30](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="common-readiness-report"></a>

### Readiness Report

A scoped assessment of required checks, blockers, optional gaps and evidence against identified configuration and dependency revisions. Its conclusion concerns a named build or launch stage rather than general project competence.

- Concept ID: common.readiness-report
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Additional local support: onboarding-contracts.md:11-12 and 22-26; concrete checks and report protocol remain proposed.
- Sources: [SRC150: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:26](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="common-build-readiness"></a>

### Build Readiness

The condition in which the required project context, configuration, capabilities, authority and limits are sufficient for the intended initial harness build.

- Concept ID: common.build-readiness
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: SRC151 alone pins only the minimum-config introduction and repo/workspace bullet; fuller support is onboarding-agent.md:20-30 and onboarding-contracts.md:22. No new readiness schema is approved.
- Sources: [SRC151: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:20](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC150: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:26](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC159: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:50](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-launch-readiness"></a>

### Launch Readiness

The condition in which the Project Orchestrator's required configuration, references and tools are valid and its handover is saved, sufficient to offer user-initiated launch.

- Concept ID: common.launch-readiness
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Optional unused capabilities remain visible gaps; launch still requires current checks when the user chooses Spawn.
- Sources: [SRC152: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:43](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md)

<a id="common-operational-verification"></a>

### Operational Verification

An evidence-based demonstration that a selected representative project task meets its applicable criteria within a stated capability scope.

- Concept ID: common.operational-verification
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: SRC153 pins task selection rather than its pass condition; SRC024 supplies criteria, evidence and the limit on capability claims.
- Sources: [SRC153: docs/design/history/onboarding-before-2026-10-23/docs/design/first-run-ux.md:53](../../docs/design/history/onboarding-before-2026-10-23/docs/design/first-run-ux.md), [SRC024: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:24](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC152: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:43](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md)

<a id="common-capability"></a>

### Capability

An ability actually supported by a host, provider, tool or integration that is needed to fulfill the requested work contract. Availability of that ability does not establish permission to use it.

- Concept ID: common.capability
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: This execution sense differs from a verified project capability described by Operational Verification.
- Sources: [SRC157: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:38](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-authority"></a>

### Authority

The scope granted to a caller for making decisions and causing actions on behalf of the project or harness. A role name, catalog entry or accessible tool does not by itself grant that scope.

- Concept ID: common.authority
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Keep separate from responsibility, data ownership and technical capability; no authentication protocol is specified.
- Sources: [SRC158: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:46](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC193: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:18](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="common-permission"></a>

### Permission

Authorization for a particular action under the applicable allow, ask or deny policy and native enforcement. Approval for one action does not by itself broaden standing authority.

- Concept ID: common.permission
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Allow does not override a native denial; unavailable enforcement is a blocker, not implicit authorization.
- Sources: [SRC159: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:50](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC158: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:46](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md)

<a id="common-effective-authority"></a>

### Effective Authority

The authority usable for a particular action after the caller's granted scope, parent Assignment restrictions, current policies and revocations are taken into account.

- Concept ID: common.effective-authority
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: This is a derived action-scoped boundary, not a second source of authority or a promise of mid-session enforcement support.
- Sources: [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md), [SRC158: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:46](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-resource-limit"></a>

### Resource Limit

An applicable ceiling on shared harness execution resources, such as concurrency, elapsed work time or measurable spending. The limit's scope includes relevant orchestrators, workers and consultations.

- Concept ID: common.resource-limit
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Spending ceilings require real measurement and enforcement; no default numeric budgets are proposed.
- Sources: [SRC161: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:52](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md)

<a id="common-delegation-mode"></a>

### Delegation Mode

A permitted way of using an Agent Definition under a caller's Delegation Policy: Delegate, Consult or Workflow. A mode describes the use of the definition without independently granting tool permissions or further delegation.

- Concept ID: common.delegation-mode
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: The mode labels and Vietnamese equivalents are already confirmed; this review supplies the domain owner definition.
- Sources: [SRC162: docs/design/agent-delegation.md:9](../../docs/design/agent-delegation.md), [SRC237: docs/design/agent-delegation.md:47](../../docs/design/agent-delegation.md), [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md), [SRC164: docs/design/agent-delegation.md:59](../../docs/design/agent-delegation.md)

<a id="common-delegate"></a>

### Delegate

The permitted-use mode in which a specific portion of work is assigned to an agent and its Outcome is returned.

- Concept ID: common.delegate
- Review class: source-backed-normalization
- Aliases to preserve: Giao việc
- Review-time scope note: Preserve Delegate and Giao việc; no further delegation authority follows from choosing this mode.
- Sources: [SRC162: docs/design/agent-delegation.md:9](../../docs/design/agent-delegation.md), [SRC072: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:76](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="common-consult"></a>

### Consult

The permitted-use mode for requesting advice, findings or options while the caller retains responsibility for carrying out the work. It grants no authority to modify project code or push, merge or release changes.

- Concept ID: common.consult
- Review class: source-backed-normalization
- Aliases to preserve: Tham vấn
- Review-time scope note: Preserve Consult and Tham vấn; a prompt saying consult does not prove permissions were narrowed.
- Sources: [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md), [SRC073: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:84](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="common-workflow-mode"></a>

### Workflow Mode

The permitted-use mode in which an Agent Definition can participate in a workflow coordinated by code. It does not by itself authorize the worker to start workflows or delegate further.

- Concept ID: common.workflow-mode
- Review class: source-backed-normalization
- Aliases to preserve: Workflow, Trong luồng công việc
- Review-time scope note: Keep the confirmed UI label Workflow and Trong luồng công việc in mode scope; Workflow Mode is explanatory domain wording.
- Sources: [SRC164: docs/design/agent-delegation.md:59](../../docs/design/agent-delegation.md), [SRC074: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:92](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md), [SRC162: docs/design/agent-delegation.md:9](../../docs/design/agent-delegation.md)

<a id="common-procedure"></a>

### Agent Procedure

The role-associated method for performing a kind of agent work, described by its entry instructions and required result. It is distinct from a running workflow or the Skill package that carries guidance.

- Concept ID: common.procedure
- Review class: naming-choice
- Aliases to preserve: Procedure
- Review-time scope note: Configuration.md:36 associates procedure and result contract with the role; it does not define an independent procedure registry or lifecycle.
- Sources: [SRC165: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:36](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-entry-skill"></a>

### Entry Skill

A Skill required as the entry guidance for an Agent Procedure and included in the Agent Definition selected for that procedure.

- Concept ID: common.entry-skill
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Missing entry guidance blocks that procedure; Skills remain explicitly named and sourced, with no discovery isolation or invented prompt fallback.
- Sources: [SRC165: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:36](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-operating-rules"></a>

### Core Operating Rules

The always-applicable rules governing authority, evidence and quality across agent work, independent of the selected task-specific Principles.

- Concept ID: common.operating-rules
- Review class: naming-choice
- Aliases to preserve: Operating Rules
- Review-time scope note: Core here means mandatory guidance, not Harness Core as a separate implementation unit.
- Sources: [SRC167: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:42](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-principle-selection"></a>

### Principle Selection

The policy for selecting task-specific Principles using Automatic, Fixed or Hybrid selection while retaining the Core Operating Rules.

- Concept ID: common.principle-selection
- Review class: source-backed-normalization
- Aliases to preserve: Cách chọn nguyên tắc
- Review-time scope note: Preserve Principle Selection and Cách chọn nguyên tắc; the confirmed mode labels and Vietnamese equivalents remain unchanged.
- Sources: [SRC167: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:42](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC140: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:627](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="common-configuration-revision"></a>

### Configuration Revision

An identified version of harness-owned configuration, distinguishable from earlier and later edits. Existing work retains its selected configuration rather than silently adopting a later edit.

- Concept ID: common.configuration-revision
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: The proposed graph type value does not settle whether this is a reference, retained content or a storage record; native profile ownership remains Paseo's.
- Sources: [SRC168: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:56](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="common-decision"></a>

### Decision

A recorded answer to a Decision Request, retained with the relevant work context and revision. It resolves that issue without automatically expanding standing authority.

- Concept ID: common.decision
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: SRC293 alone only rejects stale or unrelated replies; the fuller response meaning is supported by SRC021 and SRC159. R218/R219 remain proposed links, not a new universal decision record schema.
- Sources: [SRC293: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:139](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC021: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:129](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC159: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:50](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

## Execution

Owner: [docs/domain/execution/GLOSSARY.md](../../docs/domain/execution/GLOSSARY.md).

<a id="execution-yeu-cau-cong-viec-du-an"></a>

### Project Work Request

A request about a project's product, work or required outcome, discussed directly with the Project Orchestrator. Its scope may be a particular task or an enduring project rule.

- Concept ID: execution.yeu-cau-cong-viec-du-an
- Review class: naming-choice
- Aliases to preserve: Yêu cầu công việc dự án
- Review-time scope note: Do not infer from R070 that every enduring project rule already has Work Item identity or a lifecycle.
- Sources: [SRC023: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:18](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)

<a id="execution-cong-viec-kiem-chung-ban-au"></a>

### Initial Verification Work

A representative project task selected by the user to establish an initial capability against explicit criteria and evidence. Capabilities outside that task's verified scope remain unverified.

- Concept ID: execution.cong-viec-kiem-chung-ban-au
- Review class: naming-choice
- Aliases to preserve: Công việc kiểm chứng ban đầu
- Review-time scope note: The task is user-selected; no real publish, merge or PR is required merely to exercise a tool.
- Sources: [SRC024: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:24](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)

<a id="execution-goi-context"></a>

### Context Package

A sourced selection of task context for an agent role and execution step, including relevant decisions, input artifacts and evaluation criteria. Its source and revision information supports traceability and handover.

- Concept ID: execution.goi-context
- Review class: naming-choice
- Aliases to preserve: Gói context
- Review-time scope note: Context selection does not grant access or isolate filesystem and Skill discovery.
- Sources: [SRC038: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:108](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)

<a id="execution-nguon-yeu-cau-du-an"></a>

### Project Requirement Source

A source designated by the user as a basis for project goals and requirements. Improvements to harness execution methods do not by themselves replace requirements from that source.

- Concept ID: execution.nguon-yeu-cau-du-an
- Review class: naming-choice
- Aliases to preserve: Nguồn yêu cầu dự án
- Review-time scope note: Keep separate from Skill provenance, an automation source and a source revision used as Evidence.
- Sources: [SRC039: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:114](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)

<a id="execution-handover"></a>

### Handover

Durable context and continuity information for the next responsible agent session or lifecycle stage, including relevant work, decisions, revisions and evidence. It supports continuity without itself conferring authority or replacing saved execution state.

- Concept ID: execution.handover
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A readable summary alone is insufficient; preserve Checkpoint and its confirmed UI label unchanged.
- Sources: [SRC154: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:30](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="execution-role-binding"></a>

### Orchestrator Session Binding

A revisioned association between a persistent orchestrator responsibility and its current native Agent Session, with distinguishable history across session replacements.

- Concept ID: execution.role-binding
- Review class: naming-choice
- Aliases to preserve: Role Binding
- Review-time scope note: Retain Role Binding as a scoped draft alias; Active Role Binding denotes the current association, not a separate concept. Spike type Binding is observed code, not the canonical generic schema.
- Sources: [SRC155: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:36](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="execution-logical-owner"></a>

### Orchestrator Responsibility

The persistent responsibility for either project-work orchestration or harness engineering, independent of which Agent Session currently carries it.

- Concept ID: execution.logical-owner
- Review class: naming-choice
- Aliases to preserve: Logical Owner
- Review-time scope note: Logical Owner remains a scoped draft alias. The proposed owner glossary describes execution continuity; it does not establish a new bounded context.
- Sources: [SRC156: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:154](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC155: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:36](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC011: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:69](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC014: docs/design/history/d01-before-2026-10-23/GLOSSARY.md:87](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)

<a id="execution-result-contract"></a>

### Result Contract

The requirements for the content, structure and supporting evidence of returned work. Satisfying its structural requirements alone does not establish that the work meets its evaluation criteria.

- Concept ID: execution.result-contract
- Review class: source-backed-normalization
- Aliases to preserve: Yêu cầu đầu ra
- Review-time scope note: Preserve Result Contract and the confirmed UI label Yêu cầu đầu ra; contract detail remains a specification concern.
- Sources: [SRC166: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:140](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC145: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:667](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="execution-effective-configuration"></a>

### Effective Configuration

The resolved native profile and harness-owned method and policy selections identified for a particular work execution. It records what that work selected rather than a second editable source of native provider settings.

- Concept ID: execution.effective-configuration
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Source pinning alone does not prove what a provider actually loaded; selected policy is also subject to current revocations.
- Sources: [SRC169: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:34](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC168: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:56](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md)

<a id="execution-pinned-revision"></a>

### Pinned Revision

A particular revision retained as the identified basis for a work execution. Its use carries the source or retained-content evidence appropriate to that resource, without implying that an external mutable Skill has been snapshotted.

- Concept ID: execution.pinned-revision
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: External Skills are checked for drift without fork or isolation; a changed source can require replan or a recorded compatible revision transition.
- Sources: [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC169: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:34](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="execution-workflow-pattern"></a>

### Workflow Pattern

A reusable structure for coordinating workflow steps and bounded agent decisions, with a contract for sequencing, routing, parallel work, dynamic work division or iterative evaluation.

- Concept ID: execution.workflow-pattern
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: SRC171 and SRC265 alone entail no pattern contract; the added table and composition excerpts provide support. No new framework or DSL is implied.
- Sources: [SRC171: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:56](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC172: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:60](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC173: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:61](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC174: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:62](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC175: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:63](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC176: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:64](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC242: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:66](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="execution-prompt-chaining"></a>

### Prompt Chaining

A Workflow Pattern in which the checked output of one step supplies a compatible input to a later step.

- Concept ID: execution.prompt-chaining
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A pattern is a reusable control structure; no new execution identity or standalone service is implied.
- Sources: [SRC172: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:60](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="execution-routing"></a>

### Routing

A Workflow Pattern in which a bounded decision selects among the branches permitted by the workflow.

- Concept ID: execution.routing
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Routing does not grant permission to invent unauthorized branches or bypass admission.
- Sources: [SRC173: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:61](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="execution-parallelization"></a>

### Parallelization

A Workflow Pattern with branches that can execute concurrently under shared admission limits and an explicit Join Policy.

- Concept ID: execution.parallelization
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: D03 remains fixed: closed branch set, all-required by default, bounded collection after required failure, separate aggregate Outcome and quality Verdict.
- Sources: [SRC174: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:62](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC304: docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md:132](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC306: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:107](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC307: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:109](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC309: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:117](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md)

<a id="execution-orchestrator-workers"></a>

### Orchestrator-Workers

A Workflow Pattern in which work portions are determined dynamically within a selected template, required capabilities and resource limits.

- Concept ID: execution.orchestrator-workers
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: This pattern does not imply permission for every worker to delegate further or a third persistent orchestrator.
- Sources: [SRC175: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:63](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC263: docs/design/agent-delegation.md:17](../../docs/design/agent-delegation.md), [SRC179: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:136](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="execution-evaluator-optimizer"></a>

### Evaluator-Optimizer

A Workflow Pattern in which evaluation feedback guides revisions of a result within defined criteria, iteration limits and stopping conditions.

- Concept ID: execution.evaluator-optimizer
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Stopping because evidence or resources are insufficient does not establish a Passed Verdict.
- Sources: [SRC176: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:64](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="execution-execution-plan"></a>

### Execution Plan

The selected execution structure for a particular Workflow Run, including recorded dynamic expansions permitted by its chosen definition and policies.

- Concept ID: execution.execution-plan
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Workflow Step, Step Run and Attempt keep their accepted identities; R099 is not a universal claim that every Step Run dispatches an agent.
- Sources: [SRC179: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:136](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC192: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:133](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC242: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:66](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="execution-stop-condition"></a>

### Stop Condition

A workflow rule identifying when an evaluation-and-revision loop must end, whether because its criteria are met or further permitted evaluation or revision is exhausted.

- Concept ID: execution.stop-condition
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: No new fixed iteration counts, thresholds or mandatory sample sizes are proposed.
- Sources: [SRC176: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:64](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

## Automation

Owner: [docs/domain/automation/GLOSSARY.md](../../docs/domain/automation/GLOSSARY.md).

<a id="automation-trigger"></a>

### Trigger

A time, event or manual condition under which a Job or other work target becomes eligible for activation.

- Concept ID: automation.trigger
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A trigger does not itself prove admission, agent dispatch or work completion.
- Sources: [SRC181: docs/design/paseo-boundary.md:43](../../docs/design/paseo-boundary.md), [SRC266: docs/design/scope-80-20.md:39](../../docs/design/scope-80-20.md)

<a id="automation-trigger-binding"></a>

### Trigger Binding

A revisioned association between an identified activation source and a harness work target, together with the supported delivery and admission policies.

- Concept ID: automation.trigger-binding
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: SRC182 covers the binding receipt, not the association endpoints; fuller support is modules.md:27 and 46-61. R132 must not require every binding target to be a Job.
- Sources: [SRC182: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:64](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC184: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:69](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC188: docs/design/paseo-boundary.md:53](../../docs/design/paseo-boundary.md)

<a id="automation-source-event"></a>

### Source Event

An identified source object or change normalized from an integration for downstream processing, with identity independent of the time it was polled.

- Concept ID: automation.source-event
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Source Event is not Schedule Occurrence; source identity can exist before delivery or downstream Work acceptance.
- Sources: [SRC183: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:81](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="automation-delivery"></a>

### Work Delivery

The tracked handoff of a source activation or change to durable harness work, whose acceptance is distinct from execution of that work.

- Concept ID: automation.delivery
- Review class: naming-choice
- Aliases to preserve: Delivery
- Review-time scope note: Keep delivery identity separate from transport retries; the cited text does not decide a per-attempt delivery-record schema or promise exactly-once effects.
- Sources: [SRC184: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:69](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC191: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:132](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="automation-cursor"></a>

### Source Cursor

A committed marker of progress in an integration source stream. It records source progress without by itself establishing downstream work delivery.

- Concept ID: automation.cursor
- Review class: external-general-term
- Aliases to preserve: Cursor
- Review-time scope note: Keep the source-stream context with the owner reference; no standalone Cursor entity or shared cursor schema is proposed.
- Sources: [SRC183: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:81](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="automation-job-handler"></a>

### Code Job Handler

Registered, versioned code that performs a Job using validated inputs and reports its result and relevant source progress or evidence.

- Concept ID: automation.job-handler
- Review class: naming-choice
- Aliases to preserve: Job Handler
- Review-time scope note: An unchanged poll needs no agent work; handler registration is not arbitrary shell entry.
- Sources: [SRC183: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:81](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC188: docs/design/paseo-boundary.md:53](../../docs/design/paseo-boundary.md)

<a id="automation-overlap-policy"></a>

### Overlap Policy

The per-Job rule for activations that arrive while an earlier execution is still running, allowing skipped new work, one queued execution or bounded parallel execution.

- Concept ID: automation.overlap-policy
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Support for a native source must be demonstrated; overlap policy for accepted work does not assert identical native scheduler semantics.
- Sources: [SRC185: docs/design/scope-80-20.md:43](../../docs/design/scope-80-20.md), [SRC184: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:69](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC288: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:37](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="automation-missed-occurrence-policy"></a>

### Missed Occurrence Policy

The per-Job rule for due occurrences missed while execution was unavailable, allowing skips, one coalesced execution or bounded catch-up.

- Concept ID: automation.missed-occurrence-policy
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Native application depends on sufficient occurrence evidence; no unsupported replay or second scheduler is implied.
- Sources: [SRC186: docs/design/scope-80-20.md:44](../../docs/design/scope-80-20.md), [SRC184: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:69](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="automation-integration"></a>

### Integration

An authorized connection and adapter for an external task or code-review source used by the harness, with Backlog tasks and GitLab merge requests and comments in V1.

- Concept ID: automation.integration
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A configured connection does not independently grant every action on that service.
- Sources: [SRC187: docs/design/scope-80-20.md:53](../../docs/design/scope-80-20.md)

<a id="automation-native-cadence"></a>

### Paseo Cadence

The native Paseo-owned timing, timezone and enablement of an agent schedule or heartbeat referenced by the harness.

- Concept ID: automation.native-cadence
- Review class: naming-choice
- Aliases to preserve: Native Cadence
- Review-time scope note: Code-job cadence remains harness-owned; the native timing reference is not another scheduler service.
- Sources: [SRC188: docs/design/paseo-boundary.md:53](../../docs/design/paseo-boundary.md)

## Evolution

Owner: [docs/domain/evolution/GLOSSARY.md](../../docs/domain/evolution/GLOSSARY.md).

<a id="evolution-yeu-cau-phat-trien-harness"></a>

### Harness Development Request

A request to build, change or improve the harness's capabilities or operation, led by the Harness Engineering Orchestrator. It does not itself change project goals or business rules.

- Concept ID: evolution.yeu-cau-phat-trien-harness
- Review class: naming-choice
- Aliases to preserve: Yêu cầu phát triển harness
- Review-time scope note: A linked capability request may unblock project work without transferring ownership of its requirements.
- Sources: [SRC044: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:11](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md)

<a id="evolution-inbox-harness"></a>

### Harness Inbox

The work inbox for build, repair and improvement requests addressed to the Harness Engineering Orchestrator. It is separate from the Project Orchestrator's product work queue.

- Concept ID: evolution.inbox-harness
- Review class: naming-choice
- Aliases to preserve: Inbox harness, Hộp thư harness
- Review-time scope note: Keep Inbox harness as the existing domain alias and Hộp thư harness as the confirmed UI label; this is not a new universal inbox.
- Sources: [SRC045: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:17](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC081: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:147](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="evolution-luot-retro-hang-ngay"></a>

### Daily Retro

A daily review of the Harness Engineering Orchestrator's operation and the project workflows it builds, seeking improvements supported by operating evidence.

- Concept ID: evolution.luot-retro-hang-ngay
- Review class: naming-choice
- Aliases to preserve: Lượt retro hằng ngày
- Review-time scope note: Daily is the review's intended cadence, not a guarantee of execution while the host is off or a mandatory nightly full suite.
- Sources: [SRC046: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:23](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC047: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:29](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC180: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:50](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="evolution-feedback"></a>

### Feedback

Sourced information about execution or evaluation that can inform diagnosis, revision or improvement.

- Concept ID: evolution.feedback
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A retro may use Feedback and conclude that no change is justified.
- Sources: [SRC180: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:50](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="evolution-hypothesis"></a>

### Hypothesis

A testable proposed explanation or expected effect of an improvement, informed by feedback and observations.

- Concept ID: evolution.hypothesis
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Keep proposed explanations distinct from established causes and accepted project requirements.
- Sources: [SRC180: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:50](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)

<a id="evolution-experiment"></a>

### Experiment

A planned investigation of a hypothesis using identified work, conditions and evaluation evidence. It concerns how a proposed effect is investigated, rather than the Candidate change itself.

- Concept ID: evolution.experiment
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: SRC084 supports use on the Improvements screen only. R164 and R165 remain proposed model links, not proof of a required Experiment record or one-to-many Trial relationship.
- Sources: [SRC202: docs/design/history/d01-before-2026-10-23/docs/design/glossary-coverage.md:24](../../docs/design/history/d01-before-2026-10-23/docs/design/glossary-coverage.md), [SRC180: docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md:50](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC084: docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md:171](../../docs/design/history/d01-before-2026-10-23/docs/ui/GLOSSARY.md)

<a id="evolution-recovery-operation"></a>

### Recovery Operation

An operation to restore runnable harness code through an independent recovery path, using a release compatible with current data and retained work.

- Concept ID: evolution.recovery-operation
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: D04 is closed; no failed Fix-forward condition independently authorizes data restore, and an old working release is not automatically compatible.
- Sources: [SRC205: docs/design/release-policy.md:70](../../docs/design/release-policy.md), [SRC053: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:66](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC320: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:137](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC321: docs/design/release-policy.md:90](../../docs/design/release-policy.md)

<a id="evolution-check-plan"></a>

### Check Plan

The candidate-specific selection of required and justified additional checks, with the affected scope, inputs, limits and reasons identified.

- Concept ID: evolution.check-plan
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: D04/D05 remain approved: code owns mandatory minima, goals determine evidence, and Deep is targeted by risk; R180/R181 do not prove the plan itself is the authority choosing a path.
- Sources: [SRC208: docs/design/release-policy.md:66](../../docs/design/release-policy.md), [SRC249: docs/design/release-policy.md:12](../../docs/design/release-policy.md), [SRC315: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:129](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC316: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:131](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md)

<a id="evolution-upstream-contribution"></a>

### Upstream Contribution

Separately authorized work to extract, verify and propose reusable harness improvements to an upstream project. Its acceptance is independent of applying improvements locally.

- Concept ID: evolution.upstream-contribution
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Upstream destination and hosting remain unspecified; contribution work does not permit forking Paseo to isolate Skills.
- Sources: [SRC211: docs/design/scope-80-20.md:76](../../docs/design/scope-80-20.md)

## Analytics

Owner: [docs/domain/analytics/GLOSSARY.md](../../docs/domain/analytics/GLOSSARY.md).

<a id="analytics-regression"></a>

### Regression

An evidence-supported worsening relative to an identified reference and applicable criteria under sufficiently comparable conditions.

- Concept ID: analytics.regression
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Inability to evaluate is Inconclusive rather than a demonstrated regression; a score change alone establishes neither improvement nor deterioration.
- Sources: [SRC203: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:192](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC316: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:131](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md)

<a id="analytics-check-result"></a>

### Check Result

The sourced outcome of a particular check on an identified Candidate and relevant inputs and environment. A post-activation health result also concerns the particular runtime instance and operation checked.

- Concept ID: analytics.check-result
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Release-check reuse stays within the same Candidate, check and relevant inputs/environment; health is fresh after activation. A Check Result may support Evidence without automatically becoming a quality Verdict.
- Sources: [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md), [SRC311: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:121](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md)

<a id="analytics-evaluation-dataset"></a>

### Evaluation Dataset

An identified, frozen collection of evaluation inputs with their provenance and scope, retained as an Artifact for particular evaluations.

- Concept ID: analytics.evaluation-dataset
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Freeze identifies retained inputs and run/time scope; it does not claim a completely reproducible provider, environment or all future trials.
- Sources: [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC203: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:192](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="analytics-evaluation-suite"></a>

### Evaluation Suite

An identified set of evaluation cases with the criteria and grading arrangements used to assess them.

- Concept ID: analytics.evaluation-suite
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Cases specify tasks; Dataset supplies inputs; a grader assesses evidence against criteria. Grader is referenced vocabulary, with no separate concept ID in this register, and its output is not automatically a trustworthy Verdict. R222/R223 are proposed modeling, not specified containment cardinalities.
- Sources: [SRC203: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:192](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="analytics-evaluation-environment"></a>

### Evaluation Environment

The identified conditions relevant to an Evaluation Trial, including applicable program, model, Skill, tool and grader revisions that affect comparability.

- Concept ID: analytics.evaluation-environment
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: A grading mechanism and its revision are part of the assessment conditions, distinct from the input case and from the final Verdict; fixed repetitions and universal determinism are not inferred.
- Sources: [SRC203: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:192](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="analytics-metric-availability"></a>

### Metric Availability

The availability of an actual measurement for a Metric in a particular observation scope. A real numeric zero is distinct from data that is missing or cannot be measured.

- Concept ID: analytics.metric-availability
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: No new provider measurement support or estimated-allocation formula is implied; D05's traceable, shared and unmeasured cost categories remain unchanged.
- Sources: [SRC210: docs/design/scope-80-20.md:72](../../docs/design/scope-80-20.md), [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC313: docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md:67](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC317: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:133](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md)

<a id="analytics-evaluation-case"></a>

### Evaluation Case

A defined evaluation task or input situation with applicable criteria, used as an individual case within an evaluation suite.

- Concept ID: analytics.evaluation-case
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: SRC295 never names a case. Local support for representative and previously failing cases is SRC316/SRC318; case-level IDs and R222/R223 are still proposed, not accepted production structure.
- Sources: [SRC295: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:192](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC316: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:131](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC318: docs/design/release-policy.md:82](../../docs/design/release-policy.md)

## Engineering

Owner: [docs/engineering/GLOSSARY.md](../../docs/engineering/GLOSSARY.md).

<a id="engineering-source-drift"></a>

### Source Drift

A detected difference between a resource's current source or dependency identity and the version previously checked or selected for work.

- Concept ID: engineering.source-drift
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Compare external Skill drift with stale readiness dependencies; neither observation establishes exact provider content isolation.
- Sources: [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC154: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:30](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC157: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:38](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)

<a id="engineering-operation"></a>

### Tracked Operation

A durably tracked request for an action whose acceptance, progress and actual effects can remain distinguishable across interruption or uncertain responses.

- Concept ID: engineering.operation
- Review class: naming-choice
- Aliases to preserve: Operation
- Review-time scope note: SRC189 identifies operation reads; SRC190 and SRC191 supply durable intent and acceptance. Tracking a native operation does not itself provide native idempotency.
- Sources: [SRC189: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:13](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC190: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:78](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC191: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:132](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-operation-intent"></a>

### Operation Intent

A durable description of an intended action and its correlation to the responsible operation, distinguishable from evidence that the action actually took effect.

- Concept ID: engineering.operation-intent
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: No transaction across SQLite and native or external APIs is implied.
- Sources: [SRC190: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md:78](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md)

<a id="engineering-receipt"></a>

### Receipt

An acknowledgement that the particular acceptance or change declared by an interface has been durably recorded. Its meaning is limited to that declared stage rather than proving downstream execution or readiness.

- Concept ID: engineering.receipt
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Qualify the interface and stage in use: work-acceptance receipt, binding-change receipt or activation-acceptance receipt; no universal payload is proposed.
- Sources: [SRC191: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:132](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC182: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:64](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-idempotency-key"></a>

### Idempotency Key

A caller- and operation-scoped request identity used to recognize repeated submissions of the same intent. In this design, matching payloads refer back to the prior receipt, while a conflicting payload is a conflict.

- Concept ID: engineering.idempotency-key
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Request identity and external effect correlation need not be the same identifier; R143 cannot guarantee native exactly-once effects.
- Sources: [SRC192: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:133](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-reconciliation"></a>

### Reconciliation

Assessment of recorded intent and observations from the resource owner to establish what happened and whether work can safely continue.

- Concept ID: engineering.reconciliation
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: The glossary names the responsibility; the reconciliation protocol remains engineering work.
- Sources: [SRC193: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:18](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md)

<a id="engineering-admission"></a>

### Execution Admission

The code-controlled decision permitting new execution under the current pause state, resource limits, required capabilities and effective authority.

- Concept ID: engineering.admission
- Review class: naming-choice
- Aliases to preserve: Admission
- Review-time scope note: D02 remains approved: no Attempt for a pre-admission block; an admitted Attempt is recorded before dispatch and retained for uncertain-response reconciliation.
- Sources: [SRC194: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:137](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC302: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:97](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC161: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:52](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC157: docs/design/history/d01-before-2026-10-23/docs/design/configuration.md:38](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md)

<a id="engineering-retry"></a>

### Retry

Another permitted execution after a technical failure, distinct from a revision in response to quality feedback. A retry of step execution creates a new Attempt within the same Step Run.

- Concept ID: engineering.retry
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Reconcile uncertain effects before retry or fallback; an unanswered dispatch is not proof that nothing ran.
- Sources: [SRC195: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:156](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC300: docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md:85](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md)

<a id="engineering-timeout"></a>

### Timeout

The expiry of the permitted waiting period for a response or result. It does not establish that the worker stopped or that its effects were undone.

- Concept ID: engineering.timeout
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Keep timeout handling distinct from cancellation, a failed quality Verdict and permission revocation.
- Sources: [SRC196: docs/design/agent-delegation.md:41](../../docs/design/agent-delegation.md)

<a id="engineering-cancellation"></a>

### Cancellation

A request to stop selected work, distinguishable from confirmation that the stop has taken effect. Prior effects, artifacts and history remain relevant to reconciliation.

- Concept ID: engineering.cancellation
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: No implicit rollback, deletion of evidence or new cancellation entity is proposed.
- Sources: [SRC197: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:138](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-interruption"></a>

### Interruption

A disruption of execution or communication, such as disconnection, process reload or crash, that can leave the state of work or effects uncertain.

- Concept ID: engineering.interruption
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Treat missing live events as missing knowledge; do not infer that a worker or effect disappeared.
- Sources: [SRC198: docs/design/history/d01-before-2026-10-23/docs/design/verification.md:31](../../docs/design/history/d01-before-2026-10-23/docs/design/verification.md), [SRC154: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:30](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)

<a id="engineering-run-timer"></a>

### Run Timer

A durable due-time associated with existing work, a step or an Attempt, whose meaning remains tied to that execution context.

- Concept ID: engineering.run-timer
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: Timer expiry still depends on admission and pause policy; host-off execution is not promised.
- Sources: [SRC195: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:156](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-operation-journal"></a>

### Operation Journal

A durable history of execution or operation intent, progress and observations that supports reconciliation and continuation after interruption.

- Concept ID: engineering.operation-journal
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: The original pin lists Work responsibilities; modules.md:136 and 158-160 additionally describe journaled expansion and continuation state.
- Sources: [SRC199: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:150](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC179: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:136](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC195: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:156](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-outbox"></a>

### Outbox

Pending delivery records retained with local source progress so delivery can be resumed or reconciled without losing an accepted change.

- Concept ID: engineering.outbox
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Atomic commitment is possible only within the same local store; external API effects are outside that transaction.
- Sources: [SRC183: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:81](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-lease"></a>

### Lease

A time-bounded claim on dispatch or operation responsibility that does not itself prove an earlier holder can no longer cause effects.

- Concept ID: engineering.lease
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: No lease duration, storage schema or single-process-lock guarantee is inferred.
- Sources: [SRC156: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:154](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-fencing"></a>

### Fencing

Enforcement that rejects commands from superseded responsibility holders or execution attempts at the boundary where effects are accepted.

- Concept ID: engineering.fencing
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Prompt-only ownership is insufficient; direct shell or native effects require real enforcement or stopping the old session.
- Sources: [SRC200: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:38](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC195: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:156](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-observed-state"></a>

### Observed State

The state of a resource supported by an observation at an identified time and scope, including uncertainty when a required fact has not been established.

- Concept ID: engineering.observed-state
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Absence of a current observation is not proof of absence or numerical zero.
- Sources: [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-desired-state"></a>

### Desired State

The requested target state of controlled work or a resource, distinct from what has actually been observed.

- Concept ID: engineering.desired-state
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: No common desired-state database or new control service is implied.
- Sources: [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-unknown"></a>

### Unknown

A qualification indicating that a required fact has not been established by available evidence.

- Concept ID: engineering.unknown
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: A required unknown readiness check blocks dependent launch; unknown measurement is not zero; an evaluation may therefore remain Inconclusive.
- Sources: [SRC150: docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md:26](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC201: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:160](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)

<a id="engineering-recovery-executable"></a>

### Recovery Executable

The small recovery program packaged with the plugin but able to run outside its subprocess, including while that plugin cannot boot.

- Concept ID: engineering.recovery-executable
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: It is started before reload and the copy protecting an activation is not replaced during that operation; full V1 runtime proof is unchanged.
- Sources: [SRC206: docs/design/release-policy.md:47](../../docs/design/release-policy.md)

<a id="engineering-backup"></a>

### Backup

A saved copy of data whose readability has been verified for the relevant preservation purpose. Its existence does not establish successful system restoration or authorize replacing current data.

- Concept ID: engineering.backup
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: Required before incompatible or hard-to-reverse data changes, not before every patch; no generic restore workflow is added.
- Sources: [SRC207: docs/design/release-policy.md:18](../../docs/design/release-policy.md)

<a id="engineering-data-compatibility"></a>

### Data Compatibility

The ability of a selected release or recovery program to operate safely with the current data format, retained work and relevant recorded effects.

- Concept ID: engineering.data-compatibility
- Review class: source-backed-normalization
- Aliases to preserve: none
- Review-time scope note: A prior pass or readable backup alone does not establish compatibility with the current state.
- Sources: [SRC205: docs/design/release-policy.md:70](../../docs/design/release-policy.md), [SRC053: docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md:66](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md)

<a id="engineering-deadline"></a>

### Deadline

A time boundary for waiting for a response or for the eligibility of an execution step. Reaching it can trigger timeout handling without proving that work or external effects have stopped.

- Concept ID: engineering.deadline
- Review class: external-general-term
- Aliases to preserve: none
- Review-time scope note: This does not introduce a new expiry entity, fixed timeout duration or guarantee of instantaneous cancellation.
- Sources: [SRC294: docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md:156](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC196: docs/design/agent-delegation.md:41](../../docs/design/agent-delegation.md)

## Parent review and validation

The review manifest preserves its original register snapshot e541e7fe7b5a9694b360dd1ab71fa7fdbaabcb037d08db9f675414f4c2a91389. Parent validation also checked accepted names/definitions and references against the current register 7d77c2042f4db51ac2235bd7634314332671b4e35f4ffa03bfd4dab0c851ca41.

Source-backed editorial corrections narrowed R024/R070/R099/R132/R143/R180/R181. R164/R165/R222/R223 remain explicitly optional modeling proposals. These corrections do not introduce a new product decision or approve all inferred relations, types or cardinalities.

D01–D05 are accepted within their recorded vocabulary/policy scopes. Contextual references do not create new domain entities; native APIs, schemas and runtime evidence remain separate.
