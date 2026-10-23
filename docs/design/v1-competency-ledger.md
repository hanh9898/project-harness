# V1 competency traceability and answer ledger

Generated from [v1-concept-register.json](v1-concept-register.json). Register SHA-256: `215a0f227dd9345a45db63041f866248e09f11e6ddcc1b144f47e889702f9642`.

Đây là coverage ngữ nghĩa của bản draft, không phải pass runtime. `approved-sources` mô tả căn cứ của đáp án, không duyệt các proposed names/relations đi kèm. Mỗi câu có definition gaps và relation gaps độc lập; không dùng tỷ lệ phần trăm hoàn thành.

[Source audit](v1-concept-graph-audit.md) đã rà các cạnh theo nguồn. `relationGaps` liệt kê quan hệ inferred/proposed, không đồng nghĩa mỗi cạnh cần một quyết định người dùng mới; modeling frontiers được ghi riêng.


## Requirement → scenarios/CQs

| Requirement | Accepted scope / source | CQs |
| --- | --- | --- |
| REQ01 | Single-project product and ownership · [SRC260: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md) | CQ01, CQ30, CQ49, CQ55 |
| REQ02 | Native chat and staged lifecycle · [SRC261: docs/design/onboarding-agent.md:7 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md) | CQ01, CQ02, CQ03, CQ20, CQ31, CQ32, CQ45, CQ55, CQ56 |
| REQ03 | Agent profiles and sourced methods · [SRC262: docs/design/configuration.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md) | CQ04, CQ05, CQ06, CQ33, CQ48, CQ52 |
| REQ04 | Delegation and enforced authority · [SRC263: docs/design/agent-delegation.md:17](../../docs/design/agent-delegation.md) | CQ07, CQ08, CQ09, CQ34, CQ35, CQ44, CQ56 |
| REQ05 | Durable request and assignment execution · [SRC490: docs/design/scope-80-20.md:25](../../docs/design/scope-80-20.md) | CQ10, CQ11, CQ12, CQ19, CQ20, CQ21, CQ38, CQ47, CQ51, CQ52, CQ56, CQ57 |
| REQ06 | Five composable patterns · [SRC491: docs/design/scope-80-20.md:32](../../docs/design/scope-80-20.md) | CQ13, CQ14, CQ15, CQ54 |
| REQ07 | General scheduler and local-host behavior · [SRC266: docs/design/scope-80-20.md:39](../../docs/design/scope-80-20.md) | CQ16, CQ17, CQ36, CQ37, CQ55, CQ56, CQ57 |
| REQ08 | Backlog/GitLab code polling and delivery · [SRC267: docs/design/scope-80-20.md:51](../../docs/design/scope-80-20.md) | CQ18, CQ36, CQ55 |
| REQ09 | Daily closed-loop self-improvement · [SRC268: docs/design/scope-80-20.md:56](../../docs/design/scope-80-20.md) | CQ22, CQ23, CQ46, CQ53, CQ55 |
| REQ10 | Full plugin update with work continuity · [SRC269: docs/design/release-policy.md:5](../../docs/design/release-policy.md) | CQ24, CQ25, CQ26, CQ39, CQ40, CQ41, CQ46, CQ54 |
| REQ11 | Deep Analytics and honest evidence · [SRC270: docs/design/scope-80-20.md:66](../../docs/design/scope-80-20.md) | CQ27, CQ28, CQ29, CQ42, CQ43 |
| REQ12 | Independent upstream contribution · [SRC271: docs/design/scope-80-20.md:74](../../docs/design/scope-80-20.md) | CQ30 |
| REQ13 | Claude and Codex contract parity · [SRC272: docs/design/scope-80-20.md:37](../../docs/design/scope-80-20.md) | CQ05, CQ44 |
| REQ14 | Owner invariants, privacy and concurrency · [SRC492: docs/design/verification.md:50](../../docs/design/verification.md) | CQ19, CQ20, CQ21, CQ31, CQ35, CQ38, CQ45, CQ48, CQ50, CQ53 |

## Answer / mapping ledger

Definitions below are register drafts unless their owning glossary already approves the name and meaning. Absence of a code/UI mapping is explicit, not a missing invented implementation. The JSON stores every mapping record verbatim with scope and source.

<a id="cq01"></a>

### CQ01 · onboarding

Ai cấu hình khởi đầu, ai dựng, ai giải quyết yêu cầu dự án?

Onboarding configures; Engineering builds/improves; Project handles project requirements. User starts each lifecycle stage.

- Requirements: REQ01, REQ02. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.onboarding-agent` → [Onboarding Agent](../../GLOSSARY.md) (approved; name approved); `common.harness-engineering-orchestrator` → [Harness Engineering Orchestrator](../../GLOSSARY.md) (approved; name approved); `common.project-orchestrator` → [Project Orchestrator](../../GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved); `common.orchestrator-agent` → [Orchestrator Agent](../../GLOSSARY.md) (approved; name approved); `common.initial-project-orchestrator` → [Initial Project Orchestrator](../../GLOSSARY.md) (approved; name approved); `common.onboarding` → [Onboarding](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R004` Project Harness → contains project responsibility → Project Orchestrator; `R005` Project Harness → contains engineering responsibility → Harness Engineering Orchestrator; `R006` Project Orchestrator → contains reasoning role → Orchestrator Agent; `R007` Harness Engineering Orchestrator → contains reasoning role → Orchestrator Agent; `R008` Initial Project Orchestrator → is initial state of → Project Orchestrator; `R009` Harness Engineering Orchestrator → builds and improves → Project Harness; `R016` Onboarding Agent → performs → Onboarding
- Constraints: K01, K02, K03, K45
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R004, R005, R006, R007, R008, R009, R016
- UI mappings: UI.orchestrators, UI.overview, UI.harness-inbox
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC324: GLOSSARY.md:14](../../GLOSSARY.md), [SRC337: GLOSSARY.md:118](../../GLOSSARY.md), [SRC334: GLOSSARY.md:94](../../GLOSSARY.md), [SRC340: GLOSSARY.md:144](../../GLOSSARY.md), [SRC335: GLOSSARY.md:102](../../GLOSSARY.md), [SRC336: GLOSSARY.md:110](../../GLOSSARY.md), [SRC394: GLOSSARY.md:197](../../GLOSSARY.md), [SRC236: docs/design/first-run-ux.md:27 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/first-run-ux.md), [SRC146: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md), [SRC149: docs/design/onboarding-agent.md:7 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC256: docs/design/interaction-model.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/interaction-model.md), [SRC001: GLOSSARY.md:9 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC011: GLOSSARY.md:69 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC012: GLOSSARY.md:75 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC013: GLOSSARY.md:81 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC014: GLOSSARY.md:87 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC017: GLOSSARY.md:105 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq02"></a>

### CQ02 · onboarding

Đủ cấu hình để dựng khác đủ khởi chạy và đã kiểm chứng vận hành ở đâu?

Build-ready, launch-ready and operational verification have separate scopes; report recheck gates dependent action, not all future work.

- Requirements: REQ02. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.readiness-report` → [Readiness Report](../../GLOSSARY.md) (approved; name approved); `common.build-readiness` → [Build Readiness](../../GLOSSARY.md) (approved; name approved); `common.launch-readiness` → [Launch Readiness](../../GLOSSARY.md) (approved; name approved); `common.operational-verification` → [Operational Verification](../../GLOSSARY.md) (approved; name approved); `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R019` Readiness Report → assesses configuration for → Build Readiness; `R020` Readiness Report → assesses configuration for → Launch Readiness; `R021` Readiness Report → depends on → Configuration Revision
- Constraints: K04, K05
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R019, R020, R021
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: OBS.01, OBS.03, OBS.04, OBS.06
- Sources: [SRC395: GLOSSARY.md:202](../../GLOSSARY.md), [SRC396: GLOSSARY.md:207](../../GLOSSARY.md), [SRC397: GLOSSARY.md:212](../../GLOSSARY.md), [SRC398: GLOSSARY.md:217](../../GLOSSARY.md), [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC154: docs/design/onboarding-contracts.md:30 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC151: docs/design/onboarding-agent.md:20 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC152: docs/design/onboarding-agent.md:43 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC153: docs/design/first-run-ux.md:53 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/first-run-ux.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq03"></a>

### CQ03 · onboarding

Handover chuyển dữ liệu gì, có tự chuyển quyền điều phối hay thay Checkpoint không?

Handover preserves refs/revisions/gaps/evidence outside transcript; does not itself switch role authority or replace Checkpoint.

- Requirements: REQ02. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `execution.handover` → [Handover](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.checkpoint` → [Checkpoint](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.goi-context` → [Context Package](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R026` Handover → carries continuity information described by → Context Package
- Constraints: K05, K28
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R026
- UI mappings: UI.checkpoint
- Code mappings: CODE.11, OBS.02, OBS.04
- Sources: [SRC399: docs/domain/execution/GLOSSARY.md:166](../../docs/domain/execution/GLOSSARY.md), [SRC400: docs/domain/execution/GLOSSARY.md:172](../../docs/domain/execution/GLOSSARY.md), [SRC358: docs/domain/execution/GLOSSARY.md:122](../../docs/domain/execution/GLOSSARY.md), [SRC361: docs/domain/execution/GLOSSARY.md:147](../../docs/domain/execution/GLOSSARY.md), [SRC154: docs/design/onboarding-contracts.md:30 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC200: docs/design/onboarding-contracts.md:38 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC035: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC038: docs/domain/execution/GLOSSARY.md:108 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq04"></a>

### CQ04 · agent config

Một agent được chọn bằng role, definition, native profile hay Session?

Role specifies responsibility/procedure/contract; definition selects profiles/methods; Session is the running conversation.

- Requirements: REQ03. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.agent-role` → [Agent Role](../../GLOSSARY.md) (approved; name approved); `common.agent-definition` → [Agent Definition](../../GLOSSARY.md) (approved; name approved); `common.paseo-agent-profile` → [Paseo Agent Profile](../../GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.procedure` → [Agent Procedure](../../GLOSSARY.md) (approved; name approved); `common.entry-skill` → [Entry Skill](../../GLOSSARY.md) (approved; name approved); `common.agent-catalog` → [Agent Catalog](../../GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R035` Agent Catalog → describes registered → Agent Definition; `R043` Agent Role → selects → Agent Definition; `R044` Agent Role → specifies → Agent Procedure; `R045` Agent Procedure → requires → Entry Skill; `R048` Agent Definition → references ordered primary/fallback → Paseo Agent Profile; `R233` Project Harness → maintains the shared → Agent Catalog; `R234` Project Harness → owns harness-managed → Agent Definition
- Constraints: K06, K07, K09
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R035, R043, R044, R045, R233, R234
- UI mappings: UI.assignments, UI.agent-catalog, UI.settings, UI.agent-definition, UI.paseo-agent-profile, UI.primary-profile, UI.fallback-profiles, UI.when-to-use
- Code mappings: CODE.02, CODE.03, CODE.20, OBS.07
- Sources: [SRC328: GLOSSARY.md:46](../../GLOSSARY.md), [SRC329: GLOSSARY.md:54](../../GLOSSARY.md), [SRC327: GLOSSARY.md:38](../../GLOSSARY.md), [SRC348: docs/domain/execution/GLOSSARY.md:42](../../docs/domain/execution/GLOSSARY.md), [SRC411: GLOSSARY.md:271](../../GLOSSARY.md), [SRC412: GLOSSARY.md:277](../../GLOSSARY.md), [SRC325: GLOSSARY.md:22](../../GLOSSARY.md), [SRC147: docs/design/paseo-boundary.md:7](../../docs/design/paseo-boundary.md), [SRC169: docs/design/configuration.md:34 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC165: docs/design/configuration.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC002: GLOSSARY.md:15 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC004: GLOSSARY.md:27 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC005: GLOSSARY.md:33 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC006: GLOSSARY.md:39 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC025: docs/domain/execution/GLOSSARY.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC237: docs/design/agent-delegation.md:47](../../docs/design/agent-delegation.md), [SRC340: GLOSSARY.md:144](../../GLOSSARY.md), [SRC480: docs/design/architecture.md:28](../../docs/design/architecture.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq05"></a>

### CQ05 · agent config

Primary unavailable thì fallback khi nào; thiếu quyền hoặc output contract có được fallback không?

Ordered fallback only for temporary availability/rate limit and fully eligible candidates; never bypass missing refs/deny/required contracts.

- Requirements: REQ03, REQ13. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.agent-definition` → [Agent Definition](../../GLOSSARY.md) (approved; name approved); `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `execution.result-contract` → [Result Contract](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.reconciliation` → [Reconciliation](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R064` Effective Authority → is checked independently of → Capability
- Constraints: K07, K08
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R064
- UI mappings: UI.agent-catalog, UI.settings, UI.agent-definition, UI.primary-profile, UI.fallback-profiles, UI.when-to-use, UI.result-contract
- Code mappings: CODE.02
- Sources: [SRC329: GLOSSARY.md:54](../../GLOSSARY.md), [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC413: docs/domain/execution/GLOSSARY.md:185](../../docs/domain/execution/GLOSSARY.md), [SRC446: docs/engineering/GLOSSARY.md:52](../../docs/engineering/GLOSSARY.md), [SRC169: docs/design/configuration.md:34 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC006: GLOSSARY.md:39 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq06"></a>

### CQ06 · agent config

Đổi profile/Skill/Principle/policy khi đang chạy thì việc nào dùng bản nào?

New work resolves new revisions. Existing work retains selected revisions; revoked rights checked next action; external source drift blocks affected step.

- Requirements: REQ03. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved); `execution.effective-configuration` → [Effective Configuration](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.source-drift` → [Source Drift](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R053` Assignment → selects frozen → Effective Configuration; `R057` Effective Configuration → pins → Configuration Revision; `R058` Assignment → retains selected → Pinned Revision; `R060` Source Drift → requires revalidation of resources referenced by → Pinned Revision
- Constraints: K14, K21
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R053, R057, R058, R060
- UI mappings: UI.assignments, UI.delegate-mode
- Code mappings: CODE.20, OBS.01, OBS.03, OBS.06, OBS.07
- Sources: [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC417: docs/domain/execution/GLOSSARY.md:191](../../docs/domain/execution/GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC419: docs/engineering/GLOSSARY.md:30](../../docs/engineering/GLOSSARY.md), [SRC354: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/ga01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC031: docs/domain/execution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC169: docs/design/configuration.md:34 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq07"></a>

### CQ07 · quyền

Một tool có thể gọi được có nghĩa agent được phép gọi không?

Callable Tool establishes ability only; current permission/authority and native enforcement independently determine whether action is allowed.

- Requirements: REQ04. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.tool` → [Tool](../../GLOSSARY.md) (approved; name approved); `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved); `common.permission` → [Permission](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R063` Permission → constrains → Effective Authority; `R064` Effective Authority → is checked independently of → Capability
- Constraints: K12, K14
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R063, R064
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC332: GLOSSARY.md:78](../../GLOSSARY.md), [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC404: GLOSSARY.md:232](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md), [SRC009: GLOSSARY.md:57 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC159: docs/design/configuration.md:50 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq08"></a>

### CQ08 · quyền

Ai được mở rộng quyền, giới hạn hoặc delegate tiếp; con có quyền gì so với cha?

Worker delegation defaults off, explicit grants remain parent-subset and shared budget; expansion requires operator decision.

- Requirements: REQ04. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.delegation-policy` → [Delegation Policy](../../GLOSSARY.md) (approved; name approved); `common.delegation-mode` → [Delegation Mode](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `common.resource-limit` → [Resource Limit](../../GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.delegate` → [Delegate](../../GLOSSARY.md) (approved; name approved); `common.workflow-mode` → [Workflow Mode](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R039` Delegation Policy → permits modes per definition → Delegation Mode; `R040` Delegate → is permitted-use value of → Delegation Mode; `R042` Workflow Mode → is permitted-use value of → Delegation Mode; `R061` Delegation Policy → constrains → Effective Authority; `R065` Execution Admission → enforces shared → Resource Limit; `R066` Execution Admission → checks current → Effective Authority; `R151` Execution Admission → gates new execution of → Assignment
- Constraints: K11, K13
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R039, R040, R042, R061, R065, R066, R151
- UI mappings: UI.assignments, UI.delegation-policy, UI.delegate-mode, UI.settings
- Code mappings: CODE.20, OBS.07
- Sources: [SRC326: GLOSSARY.md:30](../../GLOSSARY.md), [SRC407: GLOSSARY.md:247](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC406: GLOSSARY.md:242](../../GLOSSARY.md), [SRC354: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/ga01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC447: docs/engineering/GLOSSARY.md:58](../../docs/engineering/GLOSSARY.md), [SRC408: GLOSSARY.md:252](../../GLOSSARY.md), [SRC410: GLOSSARY.md:264](../../GLOSSARY.md), [SRC237: docs/design/agent-delegation.md:47](../../docs/design/agent-delegation.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC003: GLOSSARY.md:21 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC031: docs/domain/execution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC161: docs/design/configuration.md:52 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC162: docs/design/agent-delegation.md:9](../../docs/design/agent-delegation.md), [SRC164: docs/design/agent-delegation.md:59](../../docs/design/agent-delegation.md), [SRC194: docs/design/modules.md:137 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq09"></a>

### CQ09 · quyền

Thu hồi quyền giữa lượt chạy tác động lên hành động kế tiếp và tác động đã xảy ra ra sao?

Recheck next action; stop/replace if provider cannot narrow live rights. Past effects persist; stale binding cannot dispatch.

- Requirements: REQ04. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.permission` → [Permission](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.fencing` → [Fencing](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.operation` → [Tracked Operation](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R034` Orchestrator Session Binding → guards stale dispatch through → Fencing; `R063` Permission → constrains → Effective Authority; `R153` Fencing → rejects stale commands from → Orchestrator Session Binding
- Constraints: K14, K28
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R034, R063, R153
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: OBS.01, OBS.02
- Sources: [SRC404: GLOSSARY.md:232](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC400: docs/domain/execution/GLOSSARY.md:172](../../docs/domain/execution/GLOSSARY.md), [SRC456: docs/engineering/GLOSSARY.md:115](../../docs/engineering/GLOSSARY.md), [SRC442: docs/engineering/GLOSSARY.md:36](../../docs/engineering/GLOSSARY.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md), [SRC200: docs/design/onboarding-contracts.md:38 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC159: docs/design/configuration.md:50 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC189: docs/design/onboarding-contracts.md:13 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq10"></a>

### CQ10 · execution

Một yêu cầu có nhiều Runs; kết quả nào đủ để resolve toàn bộ yêu cầu?

A request may need several Runs. Resolution needs request-scope evidence and criteria; Run completion alone does not resolve it.

- Requirements: REQ05. Semantic answer: **relation-draft**; runtime: **fixture-only** — Prototype identities/controls checked; no production persistence, dispatch/evaluation/compatibility probe.
- Concepts / definition mapping: `execution.work-item` → [Work Item](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.tieu-chi-anh-gia` → [Evaluation Criterion](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R069` Work Item → handled by → Workflow Run; `R073` Work Item → evaluated against → Evaluation Criterion; `R112` Verdict → evaluates request resolution → Work Item; `R113` Verdict → evaluated against pinned → Evaluation Criterion; `R114` Verdict → uses → Evidence; `R226` Workflow Run → evaluated against pinned → Evaluation Criterion
- Constraints: K15, K20
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R073, R112, R113, R114, R226
- UI mappings: UI.work-items, UI.improvements, UI.evidence, UI.pause-work, UI.resume-work, UI.cancel-work, UI.run-queued, UI.run-running, UI.run-paused, UI.run-blocked, UI.run-pausing, UI.run-cancelling, UI.run-completed, UI.run-failed, UI.run-cancelled, UI.resolved, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.workflow-run, UI.verdict, UI.result-contract
- Code mappings: CODE.01, CODE.13, CODE.17, OBS.07
- Sources: [SRC345: docs/domain/execution/GLOSSARY.md:14](../../docs/domain/execution/GLOSSARY.md), [SRC353: docs/domain/execution/GLOSSARY.md:82](../../docs/domain/execution/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC360: docs/domain/execution/GLOSSARY.md:138](../../docs/domain/execution/GLOSSARY.md), [SRC341: GLOSSARY.md:153](../../GLOSSARY.md), [SRC239: docs/design/glossary-concept-model.md:45](../../docs/design/glossary-concept-model.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC018: GLOSSARY.md:111 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC022: docs/domain/execution/GLOSSARY.md:12 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC030: docs/domain/execution/GLOSSARY.md:60 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC037: docs/domain/execution/GLOSSARY.md:102 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq11"></a>

### CQ11 · execution

Một Session nhận nhiều Assignments; Outcome từng phần và Outcome tổng hợp liên quan thế nào?

A Session can receive multiple Assignments over time; concurrency is not decided here. Each actual permitted retry/fallback redispatch creates a new Assignment, even on the same Session, with separate selected configuration, recipient and Outcome history. Technical retry uses a new Attempt in the same Step Run. Continued Turns or uncertain response retain identity. Run aggregation references branch Outcomes/evidence and a separate scoped Verdict; eligible prior results may be reused under K57 without overwriting history or automatically resolving the Work Item.

- Requirements: REQ05. Semantic answer: **approved-sources**; runtime: **fixture-only** — Prototype identities/controls checked; no production persistence, dispatch/evaluation/compatibility probe.
- Concepts / definition mapping: `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `execution.artifact` → [Artifact](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R100` Assignment → issued to one recipient → Agent Session; `R101` Assignment → may belong to workflow execution → Workflow Run; `R105` Assignment → returns own → Outcome; `R106` Workflow Run → returns aggregate → Outcome; `R110` Outcome → supported by → Evidence; `R111` Verdict → evaluates → Outcome; `R229` Outcome → aggregate references source → Outcome; `R230` Outcome → references inputs/outputs as → Artifact; `R235` Attempt → may dispatch agent work through → Assignment; `R236` Assignment → may reference the prior redispatch allocation → Assignment
- Constraints: K16, K20, K55, K56, K57, K62, K63
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R101
- UI mappings: UI.work-items, UI.assignments, UI.delegate-mode, UI.pause-work, UI.resume-work, UI.cancel-work, UI.run-queued, UI.run-running, UI.run-paused, UI.run-blocked, UI.run-pausing, UI.run-cancelling, UI.run-completed, UI.run-failed, UI.run-cancelled, UI.workflow-run, UI.outcome, UI.result-contract
- Code mappings: CODE.01, CODE.19, CODE.20, OBS.07
- Sources: [SRC485: docs/design/v1-glossary-completion-plan.md:201](../../docs/design/v1-glossary-completion-plan.md), [SRC486: docs/design/v1-glossary-completion-plan.md:203](../../docs/design/v1-glossary-completion-plan.md), [SRC487: docs/design/v1-glossary-completion-plan.md:205](../../docs/design/v1-glossary-completion-plan.md), [SRC488: docs/domain/execution/GLOSSARY.md:90](../../docs/domain/execution/GLOSSARY.md), [SRC348: docs/domain/execution/GLOSSARY.md:42](../../docs/domain/execution/GLOSSARY.md), [SRC354: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/ga01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC357: docs/domain/execution/GLOSSARY.md:114](../../docs/domain/execution/GLOSSARY.md), [SRC353: docs/domain/execution/GLOSSARY.md:82](../../docs/domain/execution/GLOSSARY.md), [SRC308: docs/design/v1-glossary-completion-plan.md:113 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC309: docs/design/v1-glossary-completion-plan.md:117 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC310: docs/design/v1-glossary-completion-plan.md:119 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC307: docs/design/v1-glossary-completion-plan.md:109 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC240: docs/design/prototype-model-notes.md:30](../../docs/design/prototype-model-notes.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC025: docs/domain/execution/GLOSSARY.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC030: docs/domain/execution/GLOSSARY.md:60 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC031: docs/domain/execution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC034: docs/domain/execution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC359: docs/domain/execution/GLOSSARY.md:130](../../docs/domain/execution/GLOSSARY.md), [SRC360: docs/domain/execution/GLOSSARY.md:138](../../docs/domain/execution/GLOSSARY.md)
- Decision records: GA01 (approved)

- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.

<a id="cq12"></a>

### CQ12 · execution

Lỗi kỹ thuật, phản hồi chất lượng và thiếu quyền tạo Attempt, Iteration hay blocked state?

Accepted: each visit has its own Step Run; technical retry creates a new Attempt in that Step Run, while quality-driven return creates a new Step Run. Rejection before admission creates no Attempt. Once permitted, record the Attempt before dispatch; lost response retains it for reconciliation and proves neither start nor non-execution. Quality Iteration remains distinct. Accepted GA01: an actual agent-work redispatch also creates a new Assignment, even when the Session is reused; continued Turns or a lost response do not.

- Requirements: REQ05. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.quality-iteration` → [Quality Iteration](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.retry` → [Retry](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R095` Step Run → contains execution attempts → Attempt; `R096` Quality Iteration → may require multiple → Attempt; `R098` Retry → creates new → Attempt; `R235` Attempt → may dispatch agent work through → Assignment; `R236` Assignment → may reference the prior redispatch allocation → Assignment
- Constraints: K17, K29, K51, K52, K62, K63
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R096
- UI mappings: UI.attempt, UI.quality-iteration
- Code mappings: CODE.18
- Sources: [SRC485: docs/design/v1-glossary-completion-plan.md:201](../../docs/design/v1-glossary-completion-plan.md), [SRC486: docs/design/v1-glossary-completion-plan.md:203](../../docs/design/v1-glossary-completion-plan.md), [SRC487: docs/design/v1-glossary-completion-plan.md:205](../../docs/design/v1-glossary-completion-plan.md), [SRC488: docs/domain/execution/GLOSSARY.md:90](../../docs/domain/execution/GLOSSARY.md), [SRC355: docs/domain/execution/GLOSSARY.md:98](../../docs/domain/execution/GLOSSARY.md), [SRC356: docs/domain/execution/GLOSSARY.md:106](../../docs/domain/execution/GLOSSARY.md), [SRC448: docs/engineering/GLOSSARY.md:91](../../docs/engineering/GLOSSARY.md), [SRC427: docs/domain/execution/GLOSSARY.md:239](../../docs/domain/execution/GLOSSARY.md), [SRC447: docs/engineering/GLOSSARY.md:58](../../docs/engineering/GLOSSARY.md), [SRC301: docs/design/v1-glossary-completion-plan.md:93 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC302: docs/design/v1-glossary-completion-plan.md:97 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC300: docs/design/v1-glossary-completion-plan.md:85 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC299: docs/domain/execution/GLOSSARY.md:126 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC241: docs/design/glossary-concept-model.md:75](../../docs/design/glossary-concept-model.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md), [SRC032: docs/domain/execution/GLOSSARY.md:72 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC033: docs/domain/execution/GLOSSARY.md:78 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC178: docs/design/glossary-coverage.md:19 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/glossary-coverage.md), [SRC194: docs/design/modules.md:137 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC195: docs/design/modules.md:156 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: GA01 (approved)

- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.

<a id="cq13"></a>

### CQ13 · composition

Năm pattern nối tiếp/lồng/song song nhau có Step identity và kiểu đầu vào/đầu ra thế nào?

All five patterns compose recursively with validated input/output, branch and stop rules. Authoring is versioned code, not a required graph editor. Accepted identity: each visit to a Workflow Step within a Workflow Run creates a distinct Step Run; technical retries remain Attempts of that visit.

- Requirements: REQ06. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.workflow-pattern` → [Workflow Pattern](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-step` → [Workflow Step](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.execution-plan` → [Execution Plan](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-definition` → [Workflow Definition](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.prompt-chaining` → [Prompt Chaining](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.routing` → [Routing](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow` → [Workflow](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.workflow-runtime` → [Workflow Runtime](../../GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R076` Workflow Definition → describes → Workflow; `R077` Workflow Definition → contains → Workflow Step; `R078` Workflow Step → may use a composition described by → Workflow Pattern; `R079` Workflow Step → may contain nested → Workflow Step; `R080` Workflow Pattern → composes with → Workflow Pattern; `R081` Prompt Chaining → is pattern value of → Workflow Pattern; `R082` Routing → is pattern value of → Workflow Pattern; `R086` Workflow Runtime → executes → Execution Plan; `R088` Execution Plan → references selected → Workflow Definition; `R089` Execution Plan → records permitted dynamic work for → Workflow Step; `R094` Step Run → executes → Workflow Step; `R093` Workflow Run → contains execution of → Step Run; `R095` Step Run → contains execution attempts → Attempt
- Constraints: K18, K19, K51
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R076, R077, R078, R079, R080, R081, R082, R086, R088, R089
- UI mappings: UI.workflow-mode
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC420: docs/domain/execution/GLOSSARY.md:201](../../docs/domain/execution/GLOSSARY.md), [SRC426: docs/domain/execution/GLOSSARY.md:231](../../docs/domain/execution/GLOSSARY.md), [SRC427: docs/domain/execution/GLOSSARY.md:239](../../docs/domain/execution/GLOSSARY.md), [SRC428: docs/domain/execution/GLOSSARY.md:247](../../docs/domain/execution/GLOSSARY.md), [SRC352: docs/domain/execution/GLOSSARY.md:74](../../docs/domain/execution/GLOSSARY.md), [SRC421: docs/domain/execution/GLOSSARY.md:206](../../docs/domain/execution/GLOSSARY.md), [SRC422: docs/domain/execution/GLOSSARY.md:211](../../docs/domain/execution/GLOSSARY.md), [SRC351: docs/domain/execution/GLOSSARY.md:66](../../docs/domain/execution/GLOSSARY.md), [SRC333: GLOSSARY.md:86](../../GLOSSARY.md), [SRC300: docs/design/v1-glossary-completion-plan.md:85 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC298: docs/domain/execution/GLOSSARY.md:120 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC299: docs/domain/execution/GLOSSARY.md:126 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC242: docs/design/architecture.md:66 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC174: docs/design/architecture.md:62 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC010: GLOSSARY.md:63 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC028: docs/domain/execution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC029: docs/domain/execution/GLOSSARY.md:54 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC171: docs/design/architecture.md:56 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC172: docs/design/architecture.md:60 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC173: docs/design/architecture.md:61 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC177: docs/design/modules.md:166 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC178: docs/design/glossary-coverage.md:19 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/glossary-coverage.md), [SRC179: docs/design/modules.md:136 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC355: docs/domain/execution/GLOSSARY.md:98](../../docs/domain/execution/GLOSSARY.md), [SRC353: docs/domain/execution/GLOSSARY.md:82](../../docs/domain/execution/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq14"></a>

### CQ14 · composition

Parallel join biết chờ nhánh nào khi có worker động và một nhánh lỗi?

Accepted: dynamically added branches are validated and recorded within policy until the set is closed; successful join requires closure and valid results from all required branches. Completion of existing workers alone is insufficient. Required technical failure after retry allowance keeps the join from proceeding; by default already-running branches finish within admitted limits and each Outcome is retained. Fail-fast/quorum require explicit declaration. Post-closure discoveries use another recorded expansion or processing iteration. A valid report identifying quality defects is not the same as missing required output.

- Requirements: REQ06. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.parallelization` → [Parallelization](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.orchestrator-workers` → [Orchestrator-Workers](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.join-policy` → [Join Policy](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.execution-plan` → [Execution Plan](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R090` Parallelization → requires → Join Policy
- Constraints: K13, K19, K29, K53, K54, K55
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): none
- UI mappings: UI.outcome, UI.result-contract
- Code mappings: CODE.19
- Sources: [SRC423: docs/domain/execution/GLOSSARY.md:216](../../docs/domain/execution/GLOSSARY.md), [SRC424: docs/domain/execution/GLOSSARY.md:221](../../docs/domain/execution/GLOSSARY.md), [SRC429: docs/domain/execution/GLOSSARY.md:252](../../docs/domain/execution/GLOSSARY.md), [SRC428: docs/domain/execution/GLOSSARY.md:247](../../docs/domain/execution/GLOSSARY.md), [SRC357: docs/domain/execution/GLOSSARY.md:114](../../docs/domain/execution/GLOSSARY.md), [SRC304: docs/domain/execution/GLOSSARY.md:132 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC305: docs/design/v1-glossary-completion-plan.md:103 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC306: docs/design/v1-glossary-completion-plan.md:107 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC307: docs/design/v1-glossary-completion-plan.md:109 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC301: docs/design/v1-glossary-completion-plan.md:93 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC303: docs/design/v1-glossary-completion-plan.md:99 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC174: docs/design/architecture.md:62 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md), [SRC034: docs/domain/execution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC175: docs/design/architecture.md:63 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC179: docs/design/modules.md:136 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq15"></a>

### CQ15 · composition

Evaluator-optimizer dừng khi đạt, hết budget hoặc inconclusive khác nhau thế nào?

Optimizer stops by applicable criteria or a bounded stopping condition; budget exhaustion and Inconclusive do not mean success. Stop Condition and Outcome meanings are accepted; exact wire statuses and result schemas belong in the execution protocol rather than a new glossary definition.

- Requirements: REQ06. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.evaluator-optimizer` → [Evaluator-Optimizer](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.stop-condition` → [Stop Condition](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.quality-iteration` → [Quality Iteration](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `common.resource-limit` → [Resource Limit](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R091` Evaluator-Optimizer → requires → Stop Condition
- Constraints: K19, K20
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R091
- UI mappings: UI.improvements, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict, UI.quality-iteration
- Code mappings: CODE.17, CODE.18
- Sources: [SRC425: docs/domain/execution/GLOSSARY.md:226](../../docs/domain/execution/GLOSSARY.md), [SRC430: docs/domain/execution/GLOSSARY.md:260](../../docs/domain/execution/GLOSSARY.md), [SRC356: docs/domain/execution/GLOSSARY.md:106](../../docs/domain/execution/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC406: GLOSSARY.md:242](../../GLOSSARY.md), [SRC174: docs/design/architecture.md:62 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC033: docs/domain/execution/GLOSSARY.md:78 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC161: docs/design/configuration.md:52 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC176: docs/design/architecture.md:64 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq16"></a>

### CQ16 · lịch

Job, Schedule, Occurrence, Job Run và Workflow Run khác nhau thế nào?

Job describes work; Schedule timing; Occurrence due time; Job Run execution (including manual); Workflow Run one possible downstream execution.

- Requirements: REQ07. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `automation.job` → [Job](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.schedule` → [Schedule](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.schedule-occurrence` → [Schedule Occurrence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.job-run` → [Job Run](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `automation.job-handler` → [Code Job Handler](../../docs/domain/automation/GLOSSARY.md) (approved; name approved)
- Directed relations: `R120` Job → timed by → Schedule; `R121` Schedule → has due times → Schedule Occurrence; `R122` Job Run → executes → Job; `R123` Job Run → may correspond to → Schedule Occurrence; `R126` Job → may execute code via → Code Job Handler; `R128` Job Run → may start → Workflow Run
- Constraints: K22, K25
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R120, R121, R122, R123, R126, R128
- UI mappings: UI.work-items, UI.jobs-and-schedules, UI.pause-work, UI.resume-work, UI.cancel-work, UI.run-now, UI.pause-schedule, UI.resume-schedule, UI.run-queued, UI.run-running, UI.run-paused, UI.run-blocked, UI.run-pausing, UI.run-cancelling, UI.run-completed, UI.run-failed, UI.run-cancelled, UI.schedule-enabled, UI.schedule-paused, UI.workflow-run, UI.job-run
- Code mappings: CODE.01, CODE.04, CODE.05, CODE.06, OBS.07
- Sources: [SRC363: docs/domain/automation/GLOSSARY.md:14](../../docs/domain/automation/GLOSSARY.md), [SRC364: docs/domain/automation/GLOSSARY.md:22](../../docs/domain/automation/GLOSSARY.md), [SRC366: docs/domain/automation/GLOSSARY.md:38](../../docs/domain/automation/GLOSSARY.md), [SRC365: docs/domain/automation/GLOSSARY.md:30](../../docs/domain/automation/GLOSSARY.md), [SRC353: docs/domain/execution/GLOSSARY.md:82](../../docs/domain/execution/GLOSSARY.md), [SRC437: docs/domain/automation/GLOSSARY.md:69](../../docs/domain/automation/GLOSSARY.md), [SRC243: docs/design/scope-80-20.md:39](../../docs/design/scope-80-20.md), [SRC245: docs/design/glossary-concept-model.md:51](../../docs/design/glossary-concept-model.md), [SRC030: docs/domain/execution/GLOSSARY.md:60 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC040: docs/domain/automation/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC041: docs/domain/automation/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC042: docs/domain/automation/GLOSSARY.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC043: docs/domain/automation/GLOSSARY.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC183: docs/design/modules.md:81 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq17"></a>

### CQ17 · lịch

Callback lặp, overlap hoặc host tắt tạo bao nhiêu work; policy do ai sở hữu?

Deduped Delivery and shared admission prevent duplicate work; overlap/missed policy per Job; stopped host does no work; native policies need occurrence evidence. T05 explicitly permits Triggers-owned schedules targeting agent/workflow work when native cannot meet the contract, while Work keeps authority/resources/Pause and each Schedule retains one owner. Target type alone does not determine ownership; existing native sources are not automatically migrated.

- Requirements: REQ07. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `automation.delivery` → [Work Delivery](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.job` → [Job](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.overlap-policy` → [Overlap Policy](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.missed-occurrence-policy` → [Missed Occurrence Policy](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.trigger-binding` → [Trigger Binding](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.native-cadence` → [Paseo Cadence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved); `automation.schedule` → [Schedule](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R124` Job → governed by → Overlap Policy; `R125` Job → governed by → Missed Occurrence Policy; `R131` Trigger Binding → may reference native source cadence → Paseo Cadence; `R132` Trigger Binding → may select a Job target → Job; `R249` Project Harness → may own a schedule when native contracts are insufficient → Schedule
- Constraints: K22, K23, K24, K25, K75
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R124, R125, R131, R132
- UI mappings: UI.jobs-and-schedules
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC435: docs/domain/automation/GLOSSARY.md:62](../../docs/domain/automation/GLOSSARY.md), [SRC363: docs/domain/automation/GLOSSARY.md:14](../../docs/domain/automation/GLOSSARY.md), [SRC438: docs/domain/automation/GLOSSARY.md:75](../../docs/domain/automation/GLOSSARY.md), [SRC439: docs/domain/automation/GLOSSARY.md:80](../../docs/domain/automation/GLOSSARY.md), [SRC433: docs/domain/automation/GLOSSARY.md:51](../../docs/domain/automation/GLOSSARY.md), [SRC441: docs/domain/automation/GLOSSARY.md:91](../../docs/domain/automation/GLOSSARY.md), [SRC243: docs/design/scope-80-20.md:39](../../docs/design/scope-80-20.md), [SRC244: docs/design/modules.md:70 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC183: docs/design/modules.md:81 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC245: docs/design/glossary-concept-model.md:51](../../docs/design/glossary-concept-model.md), [SRC040: docs/domain/automation/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC182: docs/design/modules.md:64 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC184: docs/design/modules.md:69 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC185: docs/design/scope-80-20.md:43](../../docs/design/scope-80-20.md), [SRC186: docs/design/scope-80-20.md:44](../../docs/design/scope-80-20.md), [SRC188: docs/design/paseo-boundary.md:53 · snapshot](../../docs/design/history/technical-t05-acceptance-2026-10-23/before/docs/design/paseo-boundary.md), [SRC514: docs/design/history/technical-t05-acceptance-2026-10-23/acceptance-t05.json:32](../../docs/design/history/technical-t05-acceptance-2026-10-23/acceptance-t05.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq18"></a>

### CQ18 · lịch

Poll không có thay đổi có tạo agent không; có delta thì cursor/event/work gắn nhau thế nào?

Unchanged poll invokes no agent; changed source identity flows through committed cursor/events/outbox to durable Work acceptance. Cursor alone is not Delivery receipt.

- Requirements: REQ08. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `automation.job-handler` → [Code Job Handler](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.cursor` → [Source Cursor](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.source-event` → [Source Event](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `engineering.outbox` → [Outbox](../../docs/engineering/GLOSSARY.md) (approved; name approved); `automation.delivery` → [Work Delivery](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `engineering.receipt` → [Receipt](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.work-item` → [Work Item](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `automation.trigger` → [Trigger](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.integration` → [Integration](../../docs/domain/automation/GLOSSARY.md) (approved; name approved)
- Directed relations: `R133` Integration → produces normalized → Source Event; `R134` Code Job Handler → may read a source through → Integration; `R135` Code Job Handler → reports progress for runtime to commit as → Source Cursor; `R136` Source Event → conveyed by → Work Delivery; `R137` Work Delivery → may be accepted for new or existing → Work Item; `R138` Work Delivery → tracked by → Receipt; `R139` Code Job Handler → reports changes for runtime to retain in → Outbox; `R140` Outbox → retains → Work Delivery
- Constraints: K24, K26, K46
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R133, R134, R135, R136, R137, R138, R139, R140
- UI mappings: UI.work-items, UI.pause-work, UI.resume-work, UI.cancel-work, UI.resolved
- Code mappings: CODE.01, OBS.01, OBS.05, OBS.07
- Sources: [SRC437: docs/domain/automation/GLOSSARY.md:69](../../docs/domain/automation/GLOSSARY.md), [SRC436: docs/domain/automation/GLOSSARY.md:101](../../docs/domain/automation/GLOSSARY.md), [SRC434: docs/domain/automation/GLOSSARY.md:56](../../docs/domain/automation/GLOSSARY.md), [SRC454: docs/engineering/GLOSSARY.md:107](../../docs/engineering/GLOSSARY.md), [SRC435: docs/domain/automation/GLOSSARY.md:62](../../docs/domain/automation/GLOSSARY.md), [SRC444: docs/engineering/GLOSSARY.md:47](../../docs/engineering/GLOSSARY.md), [SRC345: docs/domain/execution/GLOSSARY.md:14](../../docs/domain/execution/GLOSSARY.md), [SRC432: docs/domain/automation/GLOSSARY.md:46](../../docs/domain/automation/GLOSSARY.md), [SRC440: docs/domain/automation/GLOSSARY.md:85](../../docs/domain/automation/GLOSSARY.md), [SRC183: docs/design/modules.md:81 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC192: docs/design/modules.md:133 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC187: docs/design/scope-80-20.md:53](../../docs/design/scope-80-20.md), [SRC022: docs/domain/execution/GLOSSARY.md:12 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC181: docs/design/paseo-boundary.md:43](../../docs/design/paseo-boundary.md), [SRC184: docs/design/modules.md:69 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC191: docs/design/modules.md:132 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq19"></a>

### CQ19 · gián đoạn

Mất response tạo Session thì hệ thống đã biết gì và khi nào được retry?

Receipt/intent establishes only recorded stage. Lost create/send reply is unknown until native reconciliation; no blind retry. Spike local loss simulation exists, native loss remains untested. Keep the same Attempt/Assignment while reconciling the ambiguous effect; only a permitted actual redispatch creates new identities under GA01.

- Requirements: REQ05, REQ14. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `engineering.operation` → [Tracked Operation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.operation-intent` → [Operation Intent](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.receipt` → [Receipt](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.reconciliation` → [Reconciliation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.unknown` → [Unknown](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.operation-journal` → [Operation Journal](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R142` Tracked Operation → records → Operation Intent; `R144` Tracked Operation → acknowledged at declared stage by → Receipt; `R145` Tracked Operation → recorded in → Operation Journal; `R146` Reconciliation → compares intent of → Tracked Operation; `R217` Receipt → reports stage of → Tracked Operation; `R235` Attempt → may dispatch agent work through → Assignment; `R236` Assignment → may reference the prior redispatch allocation → Assignment
- Constraints: K26, K27, K62, K63
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R142, R144, R145, R146, R217
- UI mappings: UI.assignments
- Code mappings: CODE.20, OBS.01, OBS.05, OBS.07
- Sources: [SRC485: docs/design/v1-glossary-completion-plan.md:201](../../docs/design/v1-glossary-completion-plan.md), [SRC486: docs/design/v1-glossary-completion-plan.md:203](../../docs/design/v1-glossary-completion-plan.md), [SRC487: docs/design/v1-glossary-completion-plan.md:205](../../docs/design/v1-glossary-completion-plan.md), [SRC488: docs/domain/execution/GLOSSARY.md:90](../../docs/domain/execution/GLOSSARY.md), [SRC442: docs/engineering/GLOSSARY.md:36](../../docs/engineering/GLOSSARY.md), [SRC443: docs/engineering/GLOSSARY.md:42](../../docs/engineering/GLOSSARY.md), [SRC444: docs/engineering/GLOSSARY.md:47](../../docs/engineering/GLOSSARY.md), [SRC446: docs/engineering/GLOSSARY.md:52](../../docs/engineering/GLOSSARY.md), [SRC459: docs/engineering/GLOSSARY.md:127](../../docs/engineering/GLOSSARY.md), [SRC348: docs/domain/execution/GLOSSARY.md:42](../../docs/domain/execution/GLOSSARY.md), [SRC453: docs/engineering/GLOSSARY.md:69](../../docs/engineering/GLOSSARY.md), [SRC192: docs/design/modules.md:133 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC025: docs/domain/execution/GLOSSARY.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC189: docs/design/onboarding-contracts.md:13 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC190: docs/design/onboarding-agent.md:78 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC191: docs/design/modules.md:132 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC199: docs/design/modules.md:150 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: GA01 (approved)

- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.

<a id="cq20"></a>

### CQ20 · gián đoạn

Reload hoặc Replace Session giữ công việc và quyền điều phối bằng những quan hệ nào?

Reload reads durable work/receipts and reconciles native Sessions; explicit Replace transfers current responsibility with Handover and enforceable authority checks while retaining workers/history. A saved binding or SQLite lease alone does not fence native tools or in-flight effects; unsupported native revocation requires a confirmed stop before transfer. Replacing the orchestrator Session does not itself cancel or rebind running worker Assignments. A worker redispatch follows GA01 and creates a new allocation.

- Requirements: REQ02, REQ05, REQ14. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.logical-owner` → [Orchestrator Responsibility](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.handover` → [Handover](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.checkpoint` → [Checkpoint](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.fencing` → [Fencing](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.reconciliation` → [Reconciliation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.lease` → [Lease](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R029` Orchestrator Responsibility → has history of → Orchestrator Session Binding; `R031` Orchestrator Session Binding → represents → Orchestrator Responsibility; `R034` Orchestrator Session Binding → guards stale dispatch through → Fencing; `R152` Lease → claims dispatch responsibility for → Orchestrator Responsibility; `R153` Fencing → rejects stale commands from → Orchestrator Session Binding
- Constraints: K05, K27, K28, K62, K63
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R029, R031, R034, R152, R153
- UI mappings: UI.checkpoint
- Code mappings: CODE.11, OBS.02, OBS.04
- Sources: [SRC485: docs/design/v1-glossary-completion-plan.md:201](../../docs/design/v1-glossary-completion-plan.md), [SRC486: docs/design/v1-glossary-completion-plan.md:203](../../docs/design/v1-glossary-completion-plan.md), [SRC487: docs/design/v1-glossary-completion-plan.md:205](../../docs/design/v1-glossary-completion-plan.md), [SRC488: docs/domain/execution/GLOSSARY.md:90](../../docs/domain/execution/GLOSSARY.md), [SRC400: docs/domain/execution/GLOSSARY.md:172](../../docs/domain/execution/GLOSSARY.md), [SRC401: docs/domain/execution/GLOSSARY.md:179](../../docs/domain/execution/GLOSSARY.md), [SRC399: docs/domain/execution/GLOSSARY.md:166](../../docs/domain/execution/GLOSSARY.md), [SRC358: docs/domain/execution/GLOSSARY.md:122](../../docs/domain/execution/GLOSSARY.md), [SRC456: docs/engineering/GLOSSARY.md:115](../../docs/engineering/GLOSSARY.md), [SRC446: docs/engineering/GLOSSARY.md:52](../../docs/engineering/GLOSSARY.md), [SRC455: docs/engineering/GLOSSARY.md:111](../../docs/engineering/GLOSSARY.md), [SRC154: docs/design/onboarding-contracts.md:30 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC200: docs/design/onboarding-contracts.md:38 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC035: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC156: docs/design/modules.md:154 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: GA01 (approved)

- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.

<a id="cq21"></a>

### CQ21 · gián đoạn

Timeout, cancel và interruption có chứng minh worker ngừng hoặc effects được thu hồi không?

Timeout/cancel/interruption do not prove stop or reversal. Keep late results for evidence/reconcile; stale execution cannot overwrite current Attempt.

- Requirements: REQ05, REQ14. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `engineering.timeout` → [Timeout](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.cancellation` → [Cancellation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.interruption` → [Interruption](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.reconciliation` → [Reconciliation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-loop` → [Agent Loop](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.deadline` → [Deadline](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R108` Agent Turn → contains → Agent Loop; `R155` Timeout → requires effect checks by → Reconciliation; `R156` Cancellation → requires effect checks by → Reconciliation; `R157` Interruption → requires continuation checks by → Reconciliation; `R221` Timeout → indicates reaching → Deadline
- Constraints: K29, K30
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R108, R155, R156, R157, R221
- UI mappings: UI.outcome, UI.attempt, UI.result-contract
- Code mappings: CODE.18, CODE.19
- Sources: [SRC449: docs/engineering/GLOSSARY.md:95](../../docs/engineering/GLOSSARY.md), [SRC450: docs/engineering/GLOSSARY.md:99](../../docs/engineering/GLOSSARY.md), [SRC451: docs/engineering/GLOSSARY.md:103](../../docs/engineering/GLOSSARY.md), [SRC355: docs/domain/execution/GLOSSARY.md:98](../../docs/domain/execution/GLOSSARY.md), [SRC357: docs/domain/execution/GLOSSARY.md:114](../../docs/domain/execution/GLOSSARY.md), [SRC446: docs/engineering/GLOSSARY.md:52](../../docs/engineering/GLOSSARY.md), [SRC349: docs/domain/execution/GLOSSARY.md:50](../../docs/domain/execution/GLOSSARY.md), [SRC350: docs/domain/execution/GLOSSARY.md:58](../../docs/domain/execution/GLOSSARY.md), [SRC476: docs/engineering/GLOSSARY.md:135](../../docs/engineering/GLOSSARY.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md), [SRC195: docs/design/modules.md:156 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC026: docs/domain/execution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC027: docs/domain/execution/GLOSSARY.md:42 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC032: docs/domain/execution/GLOSSARY.md:72 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC034: docs/domain/execution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC196: docs/design/agent-delegation.md:41](../../docs/design/agent-delegation.md), [SRC197: docs/design/modules.md:138 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC198: docs/design/verification.md:31 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/verification.md), [SRC294: docs/design/modules.md:156 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq22"></a>

### CQ22 · cải tiến

Retro tạo hypothesis/experiment hay Candidate; khi nào không cần thay đổi?

Retro observes first and may conclude no change. Hypothesis explains expected change; Experiment tests; Candidate is the proposed change, not the experiment.

- Requirements: REQ09. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.luot-retro-hang-ngay` → [Daily Retro](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.improvement-loop` → [Improvement Loop](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.hypothesis` → [Hypothesis](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.experiment` → [Experiment](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.feedback` → [Feedback](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.inbox-harness` → [Harness Inbox](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.principle` → [Principle](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R161` Daily Retro → serves → Improvement Loop; `R162` Improvement Loop → uses sourced → Feedback; `R163` Improvement Loop → may form → Hypothesis; `R164` Experiment → tests → Hypothesis; `R166` Improvement Loop → may produce → Candidate
- Constraints: K31, K42
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R161, R162, R163, R164, R166
- UI mappings: UI.harness-inbox, UI.improvements, UI.releases, UI.candidate, UI.principle, UI.principle-selection
- Code mappings: CODE.07
- Sources: [SRC369: docs/domain/evolution/GLOSSARY.md:35](../../docs/domain/evolution/GLOSSARY.md), [SRC370: docs/domain/evolution/GLOSSARY.md:44](../../docs/domain/evolution/GLOSSARY.md), [SRC460: docs/domain/evolution/GLOSSARY.md:147](../../docs/domain/evolution/GLOSSARY.md), [SRC461: docs/domain/evolution/GLOSSARY.md:151](../../docs/domain/evolution/GLOSSARY.md), [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC431: docs/domain/evolution/GLOSSARY.md:116](../../docs/domain/evolution/GLOSSARY.md), [SRC368: docs/domain/evolution/GLOSSARY.md:25](../../docs/domain/evolution/GLOSSARY.md), [SRC331: GLOSSARY.md:70](../../GLOSSARY.md), [SRC247: docs/design/scope-80-20.md:59](../../docs/design/scope-80-20.md), [SRC203: docs/design/modules.md:192 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC008: GLOSSARY.md:51 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC045: docs/domain/evolution/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC046: docs/domain/evolution/GLOSSARY.md:23 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC047: docs/domain/evolution/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC180: docs/design/architecture.md:50 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/architecture.md), [SRC202: docs/design/glossary-coverage.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/glossary-coverage.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq23"></a>

### CQ23 · cải tiến

Candidate kiểm đạt có tự được activation không; ai cấp quyền và pin evidence thế nào?

Passing the verification required for the change goal does not grant activation authority. Check candidate/base versions, capability and compatibility under allow/ask/deny; a one-time approval remains operation-scoped. This does not require a full controlled Evaluation Trial for every small patch.

- Requirements: REQ09. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `analytics.check-result` → [Check Result](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `common.yeu-cau-quyet-inh` → [Decision Request](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R178` Activation → requires matching → Check Result; `R183` Activation → requires current → Effective Authority
- Constraints: K32, K37
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R178, R183
- UI mappings: UI.improvements, UI.releases, UI.audit-log, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict, UI.candidate, UI.activation
- Code mappings: CODE.07, CODE.17
- Sources: [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC469: docs/domain/analytics/GLOSSARY.md:88](../../docs/domain/analytics/GLOSSARY.md), [SRC344: GLOSSARY.md:183](../../GLOSSARY.md), [SRC159: docs/design/configuration.md:50 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md), [SRC021: GLOSSARY.md:129 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq24"></a>

### CQ24 · release

UI/runtime/schema/skills/jobs cùng cập nhật ra sao khi còn Runs đang làm?

Self-update covers whole plugin; pin work revisions, pause affected work at compatible Checkpoints, defer unknown impact; data change may require backup. No required dual-runtime topology. T07 selects a prepared local installation with stable ID/path and Releases-controlled publication/native reload; mutable data, credentials and operation-pinned recovery stay outside replaced source. This selects deployment, not a proven atomic filesystem/native update or a whole-plugin/UI pass.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.paseo-plugin` → [Paseo Plugin](../../GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `execution.checkpoint` → [Checkpoint](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.data-compatibility` → [Data Compatibility](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.backup` → [Backup](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved); `execution.artifact` → [Artifact](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.recovery-executable` → [Recovery Executable](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R118` Checkpoint → references selected → Pinned Revision; `R177` Backup → may be required before a data-changing → Activation
- Constraints: K21, K33, K39, K76
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R118, R177
- UI mappings: UI.releases, UI.checkpoint, UI.activation
- Code mappings: CODE.07, CODE.11
- Sources: [SRC339: GLOSSARY.md:136](../../GLOSSARY.md), [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC358: docs/domain/execution/GLOSSARY.md:122](../../docs/domain/execution/GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC467: docs/engineering/GLOSSARY.md:79](../../docs/engineering/GLOSSARY.md), [SRC466: docs/engineering/GLOSSARY.md:131](../../docs/engineering/GLOSSARY.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC248: docs/design/scope-80-20.md:60](../../docs/design/scope-80-20.md), [SRC207: docs/design/release-policy.md:18](../../docs/design/release-policy.md), [SRC016: GLOSSARY.md:99 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC035: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC205: docs/design/release-policy.md:70](../../docs/design/release-policy.md), [SRC515: docs/design/history/technical-t07-2026-10-23/acceptance-t07.json:32](../../docs/design/history/technical-t07-2026-10-23/acceptance-t07.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq25"></a>

### CQ25 · release

Bản được chọn không boot thì bản nào đang active, bản nào được chọn để recovery?

Selection target differs from actual active. Boot failure may leave no active runtime. Recovery selected per operation/current data, not automatically last verified. Unknown observation differs from confirmed null.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **fixture-only** — Prototype identities/controls checked; no production persistence, dispatch/evaluation/compatibility probe.
- Concepts / definition mapping: `evolution.release` → [Release](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.activation-target` → [Activation Target](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.active-release` → [Active Release](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.recovery-release` → [Recovery Release](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `engineering.observed-state` → [Observed State](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.unknown` → [Unknown](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R150` Unknown → qualifies incomplete → Observed State; `R169` Release → fills target role → Activation Target; `R170` Release → fills actual runtime role → Active Release; `R171` Release → fills compatible recovery role → Recovery Release
- Constraints: K35, K40
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R150, R169, R170, R171
- UI mappings: UI.releases, UI.recovery, UI.activation-target, UI.active-release, UI.recovery-release
- Code mappings: CODE.07, CODE.08, CODE.09, CODE.10, OBS.07
- Sources: [SRC372: docs/domain/evolution/GLOSSARY.md:60](../../docs/domain/evolution/GLOSSARY.md), [SRC374: docs/domain/evolution/GLOSSARY.md:76](../../docs/domain/evolution/GLOSSARY.md), [SRC375: docs/domain/evolution/GLOSSARY.md:84](../../docs/domain/evolution/GLOSSARY.md), [SRC376: docs/domain/evolution/GLOSSARY.md:92](../../docs/domain/evolution/GLOSSARY.md), [SRC457: docs/engineering/GLOSSARY.md:119](../../docs/engineering/GLOSSARY.md), [SRC459: docs/engineering/GLOSSARY.md:127](../../docs/engineering/GLOSSARY.md), [SRC250: docs/design/release-policy.md:32](../../docs/design/release-policy.md), [SRC253: docs/design/prototype-model-notes.md:32](../../docs/design/prototype-model-notes.md), [SRC049: docs/domain/evolution/GLOSSARY.md:42 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC051: docs/domain/evolution/GLOSSARY.md:54 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC052: docs/domain/evolution/GLOSSARY.md:60 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC053: docs/domain/evolution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC201: docs/design/modules.md:160 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq26"></a>

### CQ26 · release

Lỗi nhỏ đi fix-forward, lỗi không thể tự sửa đi recovery dựa vào khái niệm và phạm vi nào?

Fix-forward requires evidenced impact scope, ability to block affected work/effects, readable necessary state with relevant integrity checks passing, and a working authorized diagnostic/repair path. If not established, pause at the necessary scope and reconcile; unknown scope stops all new admission. Unbootable/lost-self-repair invokes independent recovery compatible with current data; no automatic old-DB restore. Exact probes/enforcement remain engineering work.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.fix-forward` → [Fix-forward](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.recovery-operation` → [Recovery Operation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `engineering.recovery-executable` → [Recovery Executable](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.data-compatibility` → [Data Compatibility](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.backup` → [Backup](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.cli` → [CLI](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R175` Recovery Operation → uses independent → Recovery Executable; `R211` CLI → can expose independent → Recovery Executable
- Constraints: K38, K39, K61
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R175, R211
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC463: docs/domain/evolution/GLOSSARY.md:121](../../docs/domain/evolution/GLOSSARY.md), [SRC464: docs/domain/evolution/GLOSSARY.md:129](../../docs/domain/evolution/GLOSSARY.md), [SRC465: docs/engineering/GLOSSARY.md:74](../../docs/engineering/GLOSSARY.md), [SRC467: docs/engineering/GLOSSARY.md:79](../../docs/engineering/GLOSSARY.md), [SRC466: docs/engineering/GLOSSARY.md:131](../../docs/engineering/GLOSSARY.md), [SRC388: docs/engineering/GLOSSARY.md:14](../../docs/engineering/GLOSSARY.md), [SRC319: docs/domain/evolution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC320: docs/design/v1-glossary-completion-plan.md:137 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC321: docs/design/release-policy.md:90](../../docs/design/release-policy.md), [SRC252: docs/design/release-policy.md:17](../../docs/design/release-policy.md), [SRC207: docs/design/release-policy.md:18](../../docs/design/release-policy.md), [SRC065: docs/engineering/GLOSSARY.md:13 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/engineering/GLOSSARY.md), [SRC204: docs/design/release-policy.md:16](../../docs/design/release-policy.md), [SRC205: docs/design/release-policy.md:70](../../docs/design/release-policy.md), [SRC206: docs/design/release-policy.md:47](../../docs/design/release-policy.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq27"></a>

### CQ27 · analytics

Một số 0 khác thiếu dữ liệu hoặc không đo được ở đâu?

Zero is a measured value; missing/unavailable remains explicit rather than zero. Cost attribution now distinguishes traceable direct cost, measured shared cost and unmeasured data; shared totals count each cost once. Concrete units/formulas and provider availability capture still require engineering contracts, not an unresolved D05 product choice.

- Requirements: REQ11. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `analytics.metric` → [Metric](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.observation` → [Observation](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.metric-availability` → [Metric Availability](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.operational-analysis` → [Operational Analysis](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R186` Observation → records value of → Metric; `R187` Observation → records → Metric Availability; `R188` Operational Analysis → uses actual → Observation
- Constraints: K41, K60
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R186, R187, R188
- UI mappings: UI.analytics, UI.metric, UI.observation, UI.operational-analysis
- Code mappings: CODE.14, CODE.15, CODE.21
- Sources: [SRC379: docs/domain/analytics/GLOSSARY.md:14](../../docs/domain/analytics/GLOSSARY.md), [SRC380: docs/domain/analytics/GLOSSARY.md:22](../../docs/domain/analytics/GLOSSARY.md), [SRC473: docs/domain/analytics/GLOSSARY.md:98](../../docs/domain/analytics/GLOSSARY.md), [SRC383: docs/domain/analytics/GLOSSARY.md:47](../../docs/domain/analytics/GLOSSARY.md), [SRC317: docs/design/v1-glossary-completion-plan.md:133 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC210: docs/design/scope-80-20.md:72](../../docs/design/scope-80-20.md), [SRC056: docs/domain/analytics/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC057: docs/domain/analytics/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC060: docs/domain/analytics/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq28"></a>

### CQ28 · analytics

So sánh observations có đủ kết luận candidate tốt hơn không; suite/case/environment là gì?

Operational comparison is descriptive; improvement claims need Baseline/Candidate Trials with sufficiently compatible inputs, criteria, conditions and grader. Accepted minimum evidence follows change goal: reproduce the bug and related behavior; representative/prior failure cases for changed agent/workflow behavior; controlled comparison for improvement claims. No universal repeat count is set; insufficient evidence is Inconclusive and mandatory release checks still apply. Suite/dataset/case/environment definitions are now accepted in their owning glossary.

- Requirements: REQ11. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `analytics.comparison` → [Comparison](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.controlled-evaluation` → [Controlled Evaluation](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-trial` → [Evaluation Trial](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-suite` → [Evaluation Suite](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-dataset` → [Evaluation Dataset](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-environment` → [Evaluation Environment](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.baseline` → [Baseline](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.regression` → [Regression](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-case` → [Evaluation Case](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R189` Controlled Evaluation → uses comparable → Evaluation Trial; `R190` Evaluation Trial → may use frozen inputs from → Evaluation Dataset; `R191` Evaluation Trial → may reference an identified → Evaluation Suite; `R192` Evaluation Trial → runs under → Evaluation Environment; `R194` Evaluation Trial → supports scoped → Verdict; `R195` Comparison → compares against → Baseline; `R197` Controlled Evaluation → supports → Comparison; `R199` Regression → supported by → Verdict; `R222` Evaluation Suite → groups → Evaluation Case; `R223` Evaluation Case → uses identified input from → Evaluation Dataset
- Constraints: K42, K59
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R189, R190, R191, R192, R194, R195, R197, R199, R222, R223
- UI mappings: UI.analytics, UI.improvements, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict, UI.evaluation-trial, UI.baseline, UI.comparison, UI.controlled-evaluation
- Code mappings: CODE.16, CODE.17, CODE.21, CODE.22, CODE.23
- Sources: [SRC386: docs/domain/analytics/GLOSSARY.md:72](../../docs/domain/analytics/GLOSSARY.md), [SRC384: docs/domain/analytics/GLOSSARY.md:56](../../docs/domain/analytics/GLOSSARY.md), [SRC381: docs/domain/analytics/GLOSSARY.md:30](../../docs/domain/analytics/GLOSSARY.md), [SRC471: docs/domain/analytics/GLOSSARY.md:118](../../docs/domain/analytics/GLOSSARY.md), [SRC470: docs/domain/analytics/GLOSSARY.md:93](../../docs/domain/analytics/GLOSSARY.md), [SRC472: docs/domain/analytics/GLOSSARY.md:122](../../docs/domain/analytics/GLOSSARY.md), [SRC385: docs/domain/analytics/GLOSSARY.md:64](../../docs/domain/analytics/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC462: docs/domain/analytics/GLOSSARY.md:114](../../docs/domain/analytics/GLOSSARY.md), [SRC477: docs/domain/analytics/GLOSSARY.md:126](../../docs/domain/analytics/GLOSSARY.md), [SRC316: docs/design/v1-glossary-completion-plan.md:131 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC318: docs/design/release-policy.md:82](../../docs/design/release-policy.md), [SRC203: docs/design/modules.md:192 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC058: docs/domain/analytics/GLOSSARY.md:23 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC061: docs/domain/analytics/GLOSSARY.md:43 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC062: docs/domain/analytics/GLOSSARY.md:49 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC063: docs/domain/analytics/GLOSSARY.md:55 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC201: docs/design/modules.md:160 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC295: docs/design/modules.md:192 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq29"></a>

### CQ29 · analytics

Saved View mở lại có giữ cùng dữ liệu và Verdict không?

Saved View stores metric/filter/group/time/comparison choices, not data or Verdict; current data may change, fixed evaluation inputs remain separately identified artifacts.

- Requirements: REQ11. Semantic answer: **approved-sources**; runtime: **fixture-only** — Prototype identities/controls checked; no production persistence, dispatch/evaluation/compatibility probe.
- Concepts / definition mapping: `analytics.saved-view` → [Saved View](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.observation` → [Observation](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.evaluation-dataset` → [Evaluation Dataset](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.comparison` → [Comparison](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R201` Saved View → may configure → Comparison; `R202` Saved View → queries current → Observation
- Constraints: K43
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R201, R202
- UI mappings: UI.improvements, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict, UI.observation, UI.comparison, UI.saved-view
- Code mappings: CODE.15, CODE.17, CODE.23, CODE.24
- Sources: [SRC387: docs/domain/analytics/GLOSSARY.md:80](../../docs/domain/analytics/GLOSSARY.md), [SRC380: docs/domain/analytics/GLOSSARY.md:22](../../docs/domain/analytics/GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC470: docs/domain/analytics/GLOSSARY.md:93](../../docs/domain/analytics/GLOSSARY.md), [SRC386: docs/domain/analytics/GLOSSARY.md:72](../../docs/domain/analytics/GLOSSARY.md), [SRC254: docs/design/glossary-concept-model.md:54](../../docs/design/glossary-concept-model.md), [SRC057: docs/domain/analytics/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC063: docs/domain/analytics/GLOSSARY.md:55 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC064: docs/domain/analytics/GLOSSARY.md:61 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC201: docs/design/modules.md:160 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq30"></a>

### CQ30 · local/upstream

Cải tiến local và contribution upstream có chung quyền, release và kết quả không?

Upstream work has independent scope/authority/result from local self-update; PR acceptance does not gate local activation.

- Requirements: REQ01, REQ12. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.upstream-contribution` → [Upstream Contribution](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.loi-harness` → [Harness Core](../../GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R183` Activation → requires current → Effective Authority; `R204` Upstream Contribution → may extract reusable → Harness Core; `R205` Upstream Contribution → requires independently checked → Effective Authority
- Constraints: K44
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R183, R204, R205
- UI mappings: UI.releases, UI.candidate, UI.activation
- Code mappings: CODE.07
- Sources: [SRC474: docs/domain/evolution/GLOSSARY.md:139](../../docs/domain/evolution/GLOSSARY.md), [SRC338: GLOSSARY.md:127](../../GLOSSARY.md), [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC255: docs/design/scope-80-20.md:78](../../docs/design/scope-80-20.md), [SRC015: GLOSSARY.md:93 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC211: docs/design/scope-80-20.md:76](../../docs/design/scope-80-20.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq31"></a>

### CQ31 · Lifecycle / stale readiness

Config or native dependency changes between check and Spawn: which stage blocks and what is rechecked?

Revalidate required revisions/dependencies and role binding immediately before user-requested dispatch; unrelated optional gaps do not block build.

- Requirements: REQ02, REQ14. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `common.readiness-report` → [Readiness Report](../../GLOSSARY.md) (approved; name approved); `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R021` Readiness Report → depends on → Configuration Revision
- Constraints: K03, K04, K05, K07
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R021
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: OBS.01, OBS.02, OBS.03, OBS.06
- Sources: [SRC395: GLOSSARY.md:202](../../GLOSSARY.md), [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC400: docs/domain/execution/GLOSSARY.md:172](../../docs/domain/execution/GLOSSARY.md), [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC149: docs/design/onboarding-agent.md:7 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-agent.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC154: docs/design/onboarding-contracts.md:30 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC169: docs/design/configuration.md:34 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq32"></a>

### CQ32 · Native owner/API failure

Native API lacks a permitted configuration intent: does onboarding mirror the data or guide and read back?

Report blocker for dependent operation, guide native UI, read back through verified owner adapter; do not mutate internal config or duplicate active store.

- Requirements: REQ02. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `engineering.mcp-server` → [MCP Server](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.native-paseo` → [Native Paseo](../../GLOSSARY.md) (approved; name approved); `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved); `common.authority` → [Authority](../../GLOSSARY.md) (approved; name approved); `common.paseo-agent-profile` → [Paseo Agent Profile](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R012` Native Paseo → owns native profile data → Paseo Agent Profile; `R214` MCP Server → routes intents to owners enforcing → Authority
- Constraints: K06, K50
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R012, R214
- UI mappings: UI.paseo-agent-profile, UI.primary-profile
- Code mappings: CODE.03, OBS.06
- Sources: [SRC389: docs/engineering/GLOSSARY.md:22](../../docs/engineering/GLOSSARY.md), [SRC392: GLOSSARY.md:312](../../GLOSSARY.md), [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC403: GLOSSARY.md:227](../../GLOSSARY.md), [SRC327: GLOSSARY.md:38](../../GLOSSARY.md), [SRC147: docs/design/paseo-boundary.md:7](../../docs/design/paseo-boundary.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC004: GLOSSARY.md:27 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC066: docs/engineering/GLOSSARY.md:19 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/engineering/GLOSSARY.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC158: docs/design/configuration.md:46 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq33"></a>

### CQ33 · Source drift / method choice

External Skill changes or entry Skill is missing; can fallback or automatic Principles silently replace it?

Missing mandatory entry/source blocks; external drift pauses affected step for replan/checkpoint selection. Principle modes never bypass core rules or Skill contract.

- Requirements: REQ03. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.skill` → [Skill](../../GLOSSARY.md) (approved; name approved); `common.entry-skill` → [Entry Skill](../../GLOSSARY.md) (approved; name approved); `engineering.source-drift` → [Source Drift](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.principle-selection` → [Principle Selection](../../GLOSSARY.md) (approved; name approved); `common.operating-rules` → [Core Operating Rules](../../GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R046` Entry Skill → qualifies use of → Skill; `R060` Source Drift → requires revalidation of resources referenced by → Pinned Revision
- Constraints: K08, K09, K10, K21
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R046, R060
- UI mappings: UI.skill, UI.principle-selection
- Code mappings: OBS.03
- Sources: [SRC330: GLOSSARY.md:62](../../GLOSSARY.md), [SRC412: GLOSSARY.md:277](../../GLOSSARY.md), [SRC419: docs/engineering/GLOSSARY.md:30](../../docs/engineering/GLOSSARY.md), [SRC415: GLOSSARY.md:289](../../GLOSSARY.md), [SRC414: GLOSSARY.md:283](../../GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC165: docs/design/configuration.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC167: docs/design/configuration.md:42 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC007: GLOSSARY.md:45 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq34"></a>

### CQ34 · Escalation / dependency

Missing specialist blocks one project branch: who receives work, who decides authority, and can independent work continue?

Deduplicated linked request to Engineering; unsatisfied authority/resource becomes user Decision Request; no endless handback and independent work continues.

- Requirements: REQ04. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.yeu-cau-cong-viec-du-an` → [Project Work Request](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `evolution.yeu-cau-phat-trien-harness` → [Harness Development Request](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.yeu-cau-quyet-inh` → [Decision Request](../../GLOSSARY.md) (approved; name approved); `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved); `execution.work-item` → [Work Item](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R068` Harness Development Request → may require → Decision Request; `R070` Project Work Request → may be tracked as → Work Item; `R071` Harness Development Request → may be tracked as → Work Item; `R209` Decision Request → may block the dependent part of → Work Item
- Constraints: K13, K49
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R068, R070, R071, R209
- UI mappings: UI.work-items, UI.audit-log, UI.pause-work, UI.resume-work, UI.cancel-work, UI.resolved
- Code mappings: CODE.01, OBS.07
- Sources: [SRC346: docs/domain/execution/GLOSSARY.md:23](../../docs/domain/execution/GLOSSARY.md), [SRC367: docs/domain/evolution/GLOSSARY.md:15](../../docs/domain/evolution/GLOSSARY.md), [SRC344: GLOSSARY.md:183](../../GLOSSARY.md), [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC345: docs/domain/execution/GLOSSARY.md:14](../../docs/domain/execution/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC259: docs/design/agent-delegation.md:33](../../docs/design/agent-delegation.md), [SRC021: GLOSSARY.md:129 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC022: docs/domain/execution/GLOSSARY.md:12 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC023: docs/domain/execution/GLOSSARY.md:18 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC044: docs/domain/evolution/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq35"></a>

### CQ35 · Permission / spoofed caller

Can a caller payload or temporary specialist extend authority, evade Consult or shared resource limits?

Trusted adapter binds caller scope; policy entry/mode and effective authority enforced at native boundary. Temporary agents default off, no definition rename bypass.

- Requirements: REQ04, REQ14. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.authority` → [Authority](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `common.delegation-policy` → [Delegation Policy](../../GLOSSARY.md) (approved; name approved); `common.consult` → [Consult](../../GLOSSARY.md) (approved; name approved); `common.resource-limit` → [Resource Limit](../../GLOSSARY.md) (approved; name approved); `engineering.mcp-server` → [MCP Server](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R061` Delegation Policy → constrains → Effective Authority; `R062` Authority → constrains → Effective Authority; `R214` MCP Server → routes intents to owners enforcing → Authority
- Constraints: K11, K12, K13, K50
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R061, R062, R214
- UI mappings: UI.delegation-policy, UI.consult-mode, UI.settings
- Code mappings: OBS.06
- Sources: [SRC403: GLOSSARY.md:227](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC326: GLOSSARY.md:30](../../GLOSSARY.md), [SRC409: GLOSSARY.md:258](../../GLOSSARY.md), [SRC406: GLOSSARY.md:242](../../GLOSSARY.md), [SRC389: docs/engineering/GLOSSARY.md:22](../../docs/engineering/GLOSSARY.md), [SRC237: docs/design/agent-delegation.md:47](../../docs/design/agent-delegation.md), [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC003: GLOSSARY.md:21 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC066: docs/engineering/GLOSSARY.md:19 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/engineering/GLOSSARY.md), [SRC158: docs/design/configuration.md:46 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC161: docs/design/configuration.md:52 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq36"></a>

### CQ36 · Schedule / edit and pause race

Callback from old Job revision, manual runOnce replay and pause race: which accepted work remains and which admission is blocked?

Revision/idempotency define acceptance; already accepted work is preserved, pause affects new admission, Job pause does not silently cancel agent work. Exact race linearization is engineering design.

- Requirements: REQ07, REQ08. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `automation.job` → [Job](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.job-run` → [Job Run](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.delivery` → [Work Delivery](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `engineering.idempotency-key` → [Idempotency Key](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R122` Job Run → executes → Job
- Constraints: K23, K24, K26, K30
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R122
- UI mappings: UI.jobs-and-schedules, UI.run-now, UI.job-run
- Code mappings: CODE.05, OBS.01, OBS.05, OBS.06
- Sources: [SRC363: docs/domain/automation/GLOSSARY.md:14](../../docs/domain/automation/GLOSSARY.md), [SRC365: docs/domain/automation/GLOSSARY.md:30](../../docs/domain/automation/GLOSSARY.md), [SRC435: docs/domain/automation/GLOSSARY.md:62](../../docs/domain/automation/GLOSSARY.md), [SRC445: docs/engineering/GLOSSARY.md:87](../../docs/engineering/GLOSSARY.md), [SRC447: docs/engineering/GLOSSARY.md:58](../../docs/engineering/GLOSSARY.md), [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC244: docs/design/modules.md:70 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC183: docs/design/modules.md:81 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC192: docs/design/modules.md:133 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC195: docs/design/modules.md:156 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC040: docs/domain/automation/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC042: docs/domain/automation/GLOSSARY.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC184: docs/design/modules.md:69 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC194: docs/design/modules.md:137 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq37"></a>

### CQ37 · Clock / downtime

Cron timezone/DST or host sleep spans due times: what can be recovered without fabricating Occurrences or running two schedules?

Apply explicit bounded missed policy only with sufficient source evidence; code-job owner tracks its due times, native source unsupported policy is reported. Clock/DST implementation remains unproved.

- Requirements: REQ07. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `automation.schedule` → [Schedule](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.schedule-occurrence` → [Schedule Occurrence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.missed-occurrence-policy` → [Missed Occurrence Policy](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.native-cadence` → [Paseo Cadence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `engineering.unknown` → [Unknown](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R121` Schedule → has due times → Schedule Occurrence
- Constraints: K22, K23, K25
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R121
- UI mappings: UI.jobs-and-schedules, UI.run-now, UI.pause-schedule, UI.resume-schedule, UI.schedule-enabled, UI.schedule-paused
- Code mappings: CODE.04, CODE.06
- Sources: [SRC364: docs/domain/automation/GLOSSARY.md:22](../../docs/domain/automation/GLOSSARY.md), [SRC366: docs/domain/automation/GLOSSARY.md:38](../../docs/domain/automation/GLOSSARY.md), [SRC439: docs/domain/automation/GLOSSARY.md:80](../../docs/domain/automation/GLOSSARY.md), [SRC441: docs/domain/automation/GLOSSARY.md:91](../../docs/domain/automation/GLOSSARY.md), [SRC459: docs/engineering/GLOSSARY.md:127](../../docs/engineering/GLOSSARY.md), [SRC243: docs/design/scope-80-20.md:39](../../docs/design/scope-80-20.md), [SRC244: docs/design/modules.md:70 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC245: docs/design/glossary-concept-model.md:51](../../docs/design/glossary-concept-model.md), [SRC041: docs/domain/automation/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC043: docs/domain/automation/GLOSSARY.md:30 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/automation/GLOSSARY.md), [SRC186: docs/design/scope-80-20.md:44](../../docs/design/scope-80-20.md), [SRC188: docs/design/paseo-boundary.md:53 · snapshot](../../docs/design/history/technical-t05-acceptance-2026-10-23/before/docs/design/paseo-boundary.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq38"></a>

### CQ38 · Timer / pause / retry

A stale timeout fires after retry while Run is paused: can it mutate the new Attempt or dispatch?

Timer identity includes originating attempt; stale timer cannot affect replacement, due timer still passes admission/pause policy. This scenario has an Attempt-scoped timer; timers waiting on existing work or a decision need not have an Attempt.

- Requirements: REQ05, REQ14. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `engineering.run-timer` → [Run Timer](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.retry` → [Retry](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.desired-state` → [Desired State](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.work-item` → [Work Item](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.yeu-cau-quyet-inh` → [Decision Request](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R098` Retry → creates new → Attempt; `R154` Run Timer → may target a particular → Attempt; `R231` Run Timer → may be scoped to existing → Work Item; `R232` Run Timer → may schedule waiting on a → Decision Request
- Constraints: K29, K30
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R154, R231, R232
- UI mappings: UI.attempt
- Code mappings: CODE.18
- Sources: [SRC452: docs/engineering/GLOSSARY.md:64](../../docs/engineering/GLOSSARY.md), [SRC355: docs/domain/execution/GLOSSARY.md:98](../../docs/domain/execution/GLOSSARY.md), [SRC448: docs/engineering/GLOSSARY.md:91](../../docs/engineering/GLOSSARY.md), [SRC447: docs/engineering/GLOSSARY.md:58](../../docs/engineering/GLOSSARY.md), [SRC458: docs/engineering/GLOSSARY.md:123](../../docs/engineering/GLOSSARY.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md), [SRC195: docs/design/modules.md:156 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC032: docs/domain/execution/GLOSSARY.md:72 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC194: docs/design/modules.md:137 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC201: docs/design/modules.md:160 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC345: docs/domain/execution/GLOSSARY.md:14](../../docs/domain/execution/GLOSSARY.md), [SRC344: GLOSSARY.md:183](../../GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq39"></a>

### CQ39 · Release / check reuse

Candidate changes while waiting for activation: can old check pass or a post-reload health result be reused?

Revalidate exact candidate/check/inputs/environment; new candidate reruns. Post-activation health fresh for runtime/operation, pending is not pass.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.check-plan` → [Check Plan](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `analytics.check-result` → [Check Result](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `engineering.operation` → [Tracked Operation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `analytics.evaluation-environment` → [Evaluation Environment](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R178` Activation → requires matching → Check Result; `R179` Candidate → has risk-based → Check Plan
- Constraints: K34, K35, K37
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R178, R179
- UI mappings: UI.releases, UI.candidate, UI.activation
- Code mappings: CODE.07, OBS.01
- Sources: [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC468: docs/domain/evolution/GLOSSARY.md:134](../../docs/domain/evolution/GLOSSARY.md), [SRC469: docs/domain/analytics/GLOSSARY.md:88](../../docs/domain/analytics/GLOSSARY.md), [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC442: docs/engineering/GLOSSARY.md:36](../../docs/engineering/GLOSSARY.md), [SRC472: docs/domain/analytics/GLOSSARY.md:122](../../docs/domain/analytics/GLOSSARY.md), [SRC249: docs/design/release-policy.md:12](../../docs/design/release-policy.md), [SRC250: docs/design/release-policy.md:32](../../docs/design/release-policy.md), [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC189: docs/design/onboarding-contracts.md:13 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC208: docs/design/release-policy.md:66](../../docs/design/release-policy.md), [SRC203: docs/design/modules.md:192 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq40"></a>

### CQ40 · Release / concurrent failure

After health fails, may an unrelated activation proceed or a concurrent candidate still be prepared?

One activation; failed health prioritizes repair/recovery, defers unrelated activation, allows preparation. Contain known affected work; unknown scope halts all new admission.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.active-release` → [Active Release](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `analytics.check-result` → [Check Result](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `evolution.fix-forward` → [Fix-forward](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R173` Activation → may establish observed → Active Release; `R178` Activation → requires matching → Check Result
- Constraints: K35, K36, K38
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R173, R178
- UI mappings: UI.releases, UI.active-release, UI.candidate, UI.activation
- Code mappings: CODE.07, CODE.09, OBS.07
- Sources: [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC375: docs/domain/evolution/GLOSSARY.md:84](../../docs/domain/evolution/GLOSSARY.md), [SRC469: docs/domain/analytics/GLOSSARY.md:88](../../docs/domain/analytics/GLOSSARY.md), [SRC447: docs/engineering/GLOSSARY.md:58](../../docs/engineering/GLOSSARY.md), [SRC463: docs/domain/evolution/GLOSSARY.md:121](../../docs/domain/evolution/GLOSSARY.md), [SRC250: docs/design/release-policy.md:32](../../docs/design/release-policy.md), [SRC251: docs/design/release-policy.md:33](../../docs/design/release-policy.md), [SRC252: docs/design/release-policy.md:17](../../docs/design/release-policy.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC052: docs/domain/evolution/GLOSSARY.md:60 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC194: docs/design/modules.md:137 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC204: docs/design/release-policy.md:16](../../docs/design/release-policy.md), [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq41"></a>

### CQ41 · Recovery / data and executor

Old code booted historically but current schema differs; can it be Recovery Release and may activation replace its protector?

Compatibility must be checked now per recovery operation; no automatic old DB restore. Recovery executable protecting operation stays unchanged; verify backup when required.

- Requirements: REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.recovery-release` → [Recovery Release](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.recovery-operation` → [Recovery Operation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `engineering.recovery-executable` → [Recovery Executable](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.data-compatibility` → [Data Compatibility](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.backup` → [Backup](../../docs/engineering/GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R174` Recovery Operation → selects operation-scoped → Recovery Release; `R175` Recovery Operation → uses independent → Recovery Executable; `R176` Recovery Release → evaluated against current → Data Compatibility; `R177` Backup → may be required before a data-changing → Activation
- Constraints: K38, K39, K40
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R174, R175, R176, R177
- UI mappings: UI.releases, UI.recovery, UI.recovery-release, UI.activation
- Code mappings: CODE.07, CODE.10, OBS.07
- Sources: [SRC376: docs/domain/evolution/GLOSSARY.md:92](../../docs/domain/evolution/GLOSSARY.md), [SRC464: docs/domain/evolution/GLOSSARY.md:129](../../docs/domain/evolution/GLOSSARY.md), [SRC465: docs/engineering/GLOSSARY.md:74](../../docs/engineering/GLOSSARY.md), [SRC467: docs/engineering/GLOSSARY.md:79](../../docs/engineering/GLOSSARY.md), [SRC466: docs/engineering/GLOSSARY.md:131](../../docs/engineering/GLOSSARY.md), [SRC373: docs/domain/evolution/GLOSSARY.md:68](../../docs/domain/evolution/GLOSSARY.md), [SRC252: docs/design/release-policy.md:17](../../docs/design/release-policy.md), [SRC207: docs/design/release-policy.md:18](../../docs/design/release-policy.md), [SRC253: docs/design/prototype-model-notes.md:32](../../docs/design/prototype-model-notes.md), [SRC050: docs/domain/evolution/GLOSSARY.md:48 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC053: docs/domain/evolution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC205: docs/design/release-policy.md:70](../../docs/design/release-policy.md), [SRC206: docs/design/release-policy.md:47](../../docs/design/release-policy.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq42"></a>

### CQ42 · Analytics / attribution

How do agent/workflow/Skill/model filters drill to actual evidence while missing costs and mixed revisions remain visible?

Observations retain source/scope/time and selected revisions; Saved View configures a query. Cost is directly attributed only when traceable, otherwise measured shared cost stays separate and totals count it once. Direct/shared/unmeasured remain visible; future estimates declare method/source. Concrete usage capture, Metric formulas and filters require engineering proof; no causal credit or parallel-time formula is implied.

- Requirements: REQ11. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `analytics.observation` → [Observation](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.metric` → [Metric](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `analytics.metric-availability` → [Metric Availability](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `analytics.saved-view` → [Saved View](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `analytics.attribution-policy` → [Attribution Policy](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R058` Assignment → retains selected → Pinned Revision; `R186` Observation → records value of → Metric; `R187` Observation → records → Metric Availability; `R200` Saved View → selects → Metric; `R202` Saved View → queries current → Observation; `R224` Observation → associated using → Attribution Policy; `R225` Attribution Policy → associates measurement to → Assignment
- Constraints: K21, K41, K43, K60
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R058, R186, R187, R200, R202
- UI mappings: UI.assignments, UI.delegate-mode, UI.analytics, UI.evidence, UI.metric, UI.observation, UI.saved-view, UI.result-contract
- Code mappings: CODE.13, CODE.14, CODE.15, CODE.20, CODE.24, OBS.07
- Sources: [SRC380: docs/domain/analytics/GLOSSARY.md:22](../../docs/domain/analytics/GLOSSARY.md), [SRC379: docs/domain/analytics/GLOSSARY.md:14](../../docs/domain/analytics/GLOSSARY.md), [SRC473: docs/domain/analytics/GLOSSARY.md:98](../../docs/domain/analytics/GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC387: docs/domain/analytics/GLOSSARY.md:80](../../docs/domain/analytics/GLOSSARY.md), [SRC360: docs/domain/execution/GLOSSARY.md:138](../../docs/domain/execution/GLOSSARY.md), [SRC354: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/ga01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC478: docs/domain/analytics/GLOSSARY.md:103](../../docs/domain/analytics/GLOSSARY.md), [SRC313: docs/domain/analytics/GLOSSARY.md:67 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC317: docs/design/v1-glossary-completion-plan.md:133 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC210: docs/design/scope-80-20.md:72](../../docs/design/scope-80-20.md), [SRC254: docs/design/glossary-concept-model.md:54](../../docs/design/glossary-concept-model.md), [SRC031: docs/domain/execution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC037: docs/domain/execution/GLOSSARY.md:102 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC056: docs/domain/analytics/GLOSSARY.md:11 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC057: docs/domain/analytics/GLOSSARY.md:17 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC064: docs/domain/analytics/GLOSSARY.md:61 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC296: docs/design/scope-80-20.md:68](../../docs/design/scope-80-20.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq43"></a>

### CQ43 · Criteria / conflict and revision

Criteria conflict or cannot be evaluated, then are edited: what happens to current work and historical conclusions?

Create scoped Decision Request, continue independent work. Preserve historical criteria/Verdicts and pinned work; migrate only by explicit compatible Checkpoint.

- Requirements: REQ11. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.tieu-chi-anh-gia` → [Evaluation Criterion](../../GLOSSARY.md) (approved; name approved); `common.tieu-chi-ket-qua-du-an` → [Project Outcome Criterion](../../GLOSSARY.md) (approved; name approved); `common.tieu-chi-van-hanh-harness` → [Harness Operating Criterion](../../GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved); `common.yeu-cau-quyet-inh` → [Decision Request](../../GLOSSARY.md) (approved; name approved); `execution.checkpoint` → [Checkpoint](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.nguon-yeu-cau-du-an` → [Project Requirement Source](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.decision` → [Decision](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R113` Verdict → evaluated against pinned → Evaluation Criterion; `R207` Project Outcome Criterion → is criterion specialization of → Evaluation Criterion; `R208` Harness Operating Criterion → is criterion specialization of → Evaluation Criterion; `R218` Decision → answers → Decision Request
- Constraints: K15, K20, K21, K49
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R113, R218
- UI mappings: UI.improvements, UI.audit-log, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict, UI.checkpoint
- Code mappings: CODE.11, CODE.17
- Sources: [SRC341: GLOSSARY.md:153](../../GLOSSARY.md), [SRC342: GLOSSARY.md:163](../../GLOSSARY.md), [SRC343: GLOSSARY.md:173](../../GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC344: GLOSSARY.md:183](../../GLOSSARY.md), [SRC358: docs/domain/execution/GLOSSARY.md:122](../../docs/domain/execution/GLOSSARY.md), [SRC362: docs/domain/execution/GLOSSARY.md:157](../../docs/domain/execution/GLOSSARY.md), [SRC475: GLOSSARY.md:300](../../GLOSSARY.md), [SRC239: docs/design/glossary-concept-model.md:45](../../docs/design/glossary-concept-model.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC259: docs/design/agent-delegation.md:33](../../docs/design/agent-delegation.md), [SRC018: GLOSSARY.md:111 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC019: GLOSSARY.md:117 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC020: GLOSSARY.md:123 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC021: GLOSSARY.md:129 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC035: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC039: docs/domain/execution/GLOSSARY.md:114 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC293: docs/design/modules.md:139 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq44"></a>

### CQ44 · Provider / enforcement mismatch

Claude supports a call but cannot enforce a mandatory Consult boundary that Codex can: is prompt compliance sufficient?

No. Both providers must satisfy the same contract including native enforcement; unsupported mandatory capability blocks, no silent broader fallback. Provider verification is still required.

- Requirements: REQ04, REQ13. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.capability` → [Capability](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `common.consult` → [Consult](../../GLOSSARY.md) (approved; name approved); `common.paseo-agent-profile` → [Paseo Agent Profile](../../GLOSSARY.md) (approved; name approved); `execution.result-contract` → [Result Contract](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.skill` → [Skill](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R064` Effective Authority → is checked independently of → Capability
- Constraints: K08, K12, K47
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R064
- UI mappings: UI.consult-mode, UI.paseo-agent-profile, UI.skill, UI.primary-profile, UI.result-contract
- Code mappings: CODE.03
- Sources: [SRC402: GLOSSARY.md:222](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC409: GLOSSARY.md:258](../../GLOSSARY.md), [SRC327: GLOSSARY.md:38](../../GLOSSARY.md), [SRC413: docs/domain/execution/GLOSSARY.md:185](../../docs/domain/execution/GLOSSARY.md), [SRC330: GLOSSARY.md:62](../../GLOSSARY.md), [SRC157: docs/design/configuration.md:38 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC163: docs/design/agent-delegation.md:21](../../docs/design/agent-delegation.md), [SRC257: docs/design/scope-80-20.md:37](../../docs/design/scope-80-20.md), [SRC004: GLOSSARY.md:27 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC007: GLOSSARY.md:45 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq45"></a>

### CQ45 · Native chat / privacy and controls

Do user chat edits and panel edits use different authority/state; can export include secrets or arbitrary native data writes?

Same owner validation/expected revisions and authority; bound intents only, secrets references rather than values; native chat remains main interaction.

- Requirements: REQ02, REQ14. Semantic answer: **relation-draft**; runtime: **partial-spike** — Disposable build-ready/readback/reload smoke; local scripted ambiguous creation. Native lost-response/in-flight reload, Replace Session, shell fencing and production work not proved.
- Concepts / definition mapping: `engineering.mcp-server` → [MCP Server](../../docs/engineering/GLOSSARY.md) (approved; name approved); `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved); `common.authority` → [Authority](../../GLOSSARY.md) (approved; name approved); `common.native-paseo` → [Native Paseo](../../GLOSSARY.md) (approved; name approved); `engineering.operation` → [Tracked Operation](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R214` MCP Server → routes intents to owners enforcing → Authority
- Constraints: K45, K50
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R214
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: OBS.01, OBS.06
- Sources: [SRC389: docs/engineering/GLOSSARY.md:22](../../docs/engineering/GLOSSARY.md), [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC403: GLOSSARY.md:227](../../GLOSSARY.md), [SRC392: GLOSSARY.md:312](../../GLOSSARY.md), [SRC442: docs/engineering/GLOSSARY.md:36](../../docs/engineering/GLOSSARY.md), [SRC256: docs/design/interaction-model.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/interaction-model.md), [SRC193: docs/design/onboarding-contracts.md:18 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC066: docs/engineering/GLOSSARY.md:19 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/engineering/GLOSSARY.md), [SRC147: docs/design/paseo-boundary.md:7](../../docs/design/paseo-boundary.md), [SRC158: docs/design/configuration.md:46 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC189: docs/design/onboarding-contracts.md:13 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq46"></a>

### CQ46 · Economic release / quality

Small diff touches permission enforcement, while daily retro has no regression evidence: which path and checks apply?

Changes to authority enforcement, including authority-expanding configuration, require Deep path despite small diff. Protective persistence/effect/activation/recovery/self-repair changes also trigger Deep; narrow UI/Skill/schedule edits may remain Fast when protection is unchanged. Code enforces mandatory checks/budget; no automatic full nightly suite or change on every retro. Detection/probes still need engineering proof.

- Requirements: REQ09, REQ10. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `evolution.deep-path` → [Deep path](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.fast-path` → [Fast path](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.check-plan` → [Check Plan](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.luot-retro-hang-ngay` → [Daily Retro](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.resource-limit` → [Resource Limit](../../GLOSSARY.md) (approved; name approved); `analytics.verdict` → [Verdict](../../docs/domain/analytics/GLOSSARY.md) (approved; name approved)
- Directed relations: `R180` Check Plan → documents checks for → Fast path; `R181` Check Plan → documents checks for → Deep path
- Constraints: K31, K34, K37, K58
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R180, R181
- UI mappings: UI.improvements, UI.verdict-passed, UI.verdict-failed, UI.verdict-inconclusive, UI.verdict
- Code mappings: CODE.17
- Sources: [SRC378: docs/domain/evolution/GLOSSARY.md:108](../../docs/domain/evolution/GLOSSARY.md), [SRC377: docs/domain/evolution/GLOSSARY.md:100](../../docs/domain/evolution/GLOSSARY.md), [SRC468: docs/domain/evolution/GLOSSARY.md:134](../../docs/domain/evolution/GLOSSARY.md), [SRC369: docs/domain/evolution/GLOSSARY.md:35](../../docs/domain/evolution/GLOSSARY.md), [SRC406: GLOSSARY.md:242](../../GLOSSARY.md), [SRC382: docs/domain/analytics/GLOSSARY.md:38](../../docs/domain/analytics/GLOSSARY.md), [SRC315: docs/design/v1-glossary-completion-plan.md:129 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC318: docs/design/release-policy.md:82](../../docs/design/release-policy.md), [SRC247: docs/design/scope-80-20.md:59](../../docs/design/scope-80-20.md), [SRC249: docs/design/release-policy.md:12](../../docs/design/release-policy.md), [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md), [SRC046: docs/domain/evolution/GLOSSARY.md:23 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC054: docs/domain/evolution/GLOSSARY.md:72 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC055: docs/domain/evolution/GLOSSARY.md:78 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC059: docs/domain/analytics/GLOSSARY.md:29 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/analytics/GLOSSARY.md), [SRC161: docs/design/configuration.md:52 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC208: docs/design/release-policy.md:66](../../docs/design/release-policy.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq47"></a>

### CQ47 · Evidence / workspace lifecycle

Worker workspace is archived before aggregation: what must remain to support completion or late-result reconciliation?

Preserve artifacts/evidence with provenance before archive. Aggregate and worker Outcomes retain identities, current attempt/role fencing governs acceptance of late results. Retention period is not yet a product decision. GA01 keeps a late result under its original Assignment/Attempt; it cannot silently overwrite the redispatched allocation, and any reuse must pass K57.

- Requirements: REQ05. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.workspace` → [Workspace](../../GLOSSARY.md) (approved; name approved); `execution.artifact` → [Artifact](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.fencing` → [Fencing](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.step-run` → [Step Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.attempt` → [Attempt](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R105` Assignment → returns own → Outcome; `R110` Outcome → supported by → Evidence; `R115` Evidence → references → Artifact
- Constraints: K16, K20, K29, K48, K62, K63
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R115
- UI mappings: UI.assignments, UI.delegate-mode, UI.evidence, UI.outcome, UI.artifact, UI.result-contract
- Code mappings: CODE.12, CODE.13, CODE.19, CODE.20, OBS.07
- Sources: [SRC485: docs/design/v1-glossary-completion-plan.md:201](../../docs/design/v1-glossary-completion-plan.md), [SRC486: docs/design/v1-glossary-completion-plan.md:203](../../docs/design/v1-glossary-completion-plan.md), [SRC487: docs/design/v1-glossary-completion-plan.md:205](../../docs/design/v1-glossary-completion-plan.md), [SRC488: docs/domain/execution/GLOSSARY.md:90](../../docs/domain/execution/GLOSSARY.md), [SRC393: GLOSSARY.md:316](../../GLOSSARY.md), [SRC359: docs/domain/execution/GLOSSARY.md:130](../../docs/domain/execution/GLOSSARY.md), [SRC360: docs/domain/execution/GLOSSARY.md:138](../../docs/domain/execution/GLOSSARY.md), [SRC357: docs/domain/execution/GLOSSARY.md:114](../../docs/domain/execution/GLOSSARY.md), [SRC354: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/ga01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC456: docs/engineering/GLOSSARY.md:115](../../docs/engineering/GLOSSARY.md), [SRC240: docs/design/prototype-model-notes.md:30](../../docs/design/prototype-model-notes.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC246: docs/design/agent-delegation.md:40](../../docs/design/agent-delegation.md), [SRC258: docs/design/agent-delegation.md:31](../../docs/design/agent-delegation.md), [SRC031: docs/domain/execution/GLOSSARY.md:66 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC034: docs/domain/execution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC036: docs/domain/execution/GLOSSARY.md:96 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC037: docs/domain/execution/GLOSSARY.md:102 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC148: docs/design/paseo-boundary.md:15](../../docs/design/paseo-boundary.md), [SRC200: docs/design/onboarding-contracts.md:38 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md)
- Decision records: GA01 (approved)

- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.

<a id="cq48"></a>

### CQ48 · Config / concurrent direct edit

User directly edits Definition while harness Candidate uses an older base: can either overwrite active state or expand rights?

Expected revision detects conflict; candidate drift requires rebase/recheck. User edit applies to new work; harness self-edit still uses candidate/eval and cannot widen authority.

- Requirements: REQ03, REQ14. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.agent-definition` → [Agent Definition](../../GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `common.configuration-revision` → [Configuration Revision](../../GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R215` Agent Definition → may be selected by → Configuration Revision; `R216` Candidate → may reference a configuration base through → Configuration Revision
- Constraints: K14, K21, K32
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R215, R216
- UI mappings: UI.agent-catalog, UI.settings, UI.releases, UI.candidate, UI.agent-definition, UI.primary-profile, UI.fallback-profiles, UI.when-to-use
- Code mappings: CODE.02, CODE.07, OBS.01, OBS.06
- Sources: [SRC329: GLOSSARY.md:54](../../GLOSSARY.md), [SRC371: docs/domain/evolution/GLOSSARY.md:52](../../docs/domain/evolution/GLOSSARY.md), [SRC416: GLOSSARY.md:295](../../GLOSSARY.md), [SRC405: GLOSSARY.md:237](../../GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC238: docs/design/agent-delegation.md:38](../../docs/design/agent-delegation.md), [SRC170: docs/design/release-policy.md:45](../../docs/design/release-policy.md), [SRC159: docs/design/configuration.md:50 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md), [SRC006: GLOSSARY.md:39 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC048: docs/domain/evolution/GLOSSARY.md:36 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/evolution/GLOSSARY.md), [SRC160: docs/design/agent-delegation.md:42](../../docs/design/agent-delegation.md), [SRC168: docs/design/configuration.md:56 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/configuration.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq49"></a>

### CQ49 · Product scope / bootstrap examples

Does a first-run example for an empty repo expand V1 into idea-to-product scaffolding or multi-project operation?

No. Current V1 targets one existing software project with potentially many repositories. Older broad examples do not change accepted scope.

- Requirements: REQ01. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `common.project` → [Project](../../GLOSSARY.md) (approved; name approved); `common.repository` → [Repository](../../GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved); `execution.cong-viec-kiem-chung-ban-au` → [Initial Verification Work](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R001` Project Harness → serves → Project; `R002` Project → includes → Repository
- Constraints: K02, K04
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R001, R002
- UI mappings: UI.overview
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC390: GLOSSARY.md:192](../../GLOSSARY.md), [SRC391: GLOSSARY.md:308](../../GLOSSARY.md), [SRC340: GLOSSARY.md:144](../../GLOSSARY.md), [SRC347: docs/domain/execution/GLOSSARY.md:33](../../docs/domain/execution/GLOSSARY.md), [SRC146: docs/design/scope-80-20.md:17](../../docs/design/scope-80-20.md), [SRC150: docs/design/onboarding-contracts.md:26 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC017: GLOSSARY.md:105 · snapshot](../../docs/design/history/d01-before-2026-10-23/GLOSSARY.md), [SRC024: docs/domain/execution/GLOSSARY.md:24 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq50"></a>

### CQ50 · Model / glossary ownership

Can approved UI label or spike field alone establish an approved local concept definition or runtime guarantee?

No. English names and owning definitions are accepted, while graph relation/type provenance and observed UI/code evidence remain separately scoped. Neither an approved label nor a spike identifier proves a runtime guarantee; source review does not create deployment evidence.

- Requirements: REQ14. Semantic answer: **relation-draft**; runtime: **unproved-v1** — Design requirement and conceptual answer only; no complete production behavior proof.
- Concepts / definition mapping: `execution.result-contract` → [Result Contract](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.role-binding` → [Orchestrator Session Binding](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.receipt` → [Receipt](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.checkpoint` → [Checkpoint](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `engineering.operation` → [Tracked Operation](../../docs/engineering/GLOSSARY.md) (approved; name approved)
- Directed relations: `R117` Checkpoint → references pending → Tracked Operation; `R144` Tracked Operation → acknowledged at declared stage by → Receipt; `R217` Receipt → reports stage of → Tracked Operation
- Constraints: K05, K20, K26
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R117, R144, R217
- UI mappings: UI.checkpoint, UI.result-contract
- Code mappings: CODE.11, OBS.01, OBS.02, OBS.05
- Sources: [SRC413: docs/domain/execution/GLOSSARY.md:185](../../docs/domain/execution/GLOSSARY.md), [SRC400: docs/domain/execution/GLOSSARY.md:172](../../docs/domain/execution/GLOSSARY.md), [SRC444: docs/engineering/GLOSSARY.md:47](../../docs/engineering/GLOSSARY.md), [SRC358: docs/domain/execution/GLOSSARY.md:122](../../docs/domain/execution/GLOSSARY.md), [SRC442: docs/engineering/GLOSSARY.md:36](../../docs/engineering/GLOSSARY.md), [SRC154: docs/design/onboarding-contracts.md:30 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC166: docs/design/modules.md:140 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC192: docs/design/modules.md:133 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md), [SRC035: docs/domain/execution/GLOSSARY.md:90 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC155: docs/design/onboarding-contracts.md:36 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC189: docs/design/onboarding-contracts.md:13 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/onboarding-contracts.md), [SRC191: docs/design/modules.md:132 · snapshot](../../docs/design/history/onboarding-before-2026-10-23/docs/design/modules.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq51"></a>

### CQ51 · Partial-result reuse

Code Review finished but Security Review failed: when can later processing reuse the completed review, and what if code or criteria changed?

Reuse only after checking applicability of relevant code, scope and criteria and availability of its Evidence. Record the source Outcome in new processing and keep old history unchanged. Assess changed dependencies to rerun affected work; prior completion or matching step names is insufficient. This does not relax same-candidate release checks or fresh post-activation health.

- Requirements: REQ05. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Accepted semantic reuse rule only. No production dependency identity, invalidation, artifact retention or live reuse protocol is proved.
- Concepts / definition mapping: `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.artifact` → [Artifact](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `common.tieu-chi-anh-gia` → [Evaluation Criterion](../../GLOSSARY.md) (approved; name approved)
- Directed relations: `R106` Workflow Run → returns aggregate → Outcome; `R110` Outcome → supported by → Evidence; `R229` Outcome → aggregate references source → Outcome; `R230` Outcome → references inputs/outputs as → Artifact
- Constraints: K15, K37, K56, K57
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): none
- UI mappings: UI.workflow-run, UI.outcome, UI.evidence
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC353: docs/domain/execution/GLOSSARY.md:82](../../docs/domain/execution/GLOSSARY.md), [SRC357: docs/domain/execution/GLOSSARY.md:114](../../docs/domain/execution/GLOSSARY.md), [SRC360: docs/domain/execution/GLOSSARY.md:138](../../docs/domain/execution/GLOSSARY.md), [SRC359: docs/domain/execution/GLOSSARY.md:130](../../docs/domain/execution/GLOSSARY.md), [SRC418: docs/domain/execution/GLOSSARY.md:196](../../docs/domain/execution/GLOSSARY.md), [SRC341: GLOSSARY.md:153](../../GLOSSARY.md), [SRC308: docs/design/v1-glossary-completion-plan.md:113 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC309: docs/design/v1-glossary-completion-plan.md:117 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC310: docs/design/v1-glossary-completion-plan.md:119 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/design/v1-glossary-completion-plan.md), [SRC209: docs/design/release-policy.md:46](../../docs/design/release-policy.md), [SRC034: docs/domain/execution/GLOSSARY.md:84 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md), [SRC037: docs/domain/execution/GLOSSARY.md:102 · snapshot](../../docs/design/history/d01-before-2026-10-23/docs/domain/execution/GLOSSARY.md)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq52"></a>

### CQ52 · Instructions, methods and worker context

A new task follows an idle worker Session: which instructions and knowledge are supplied, and does idle alone justify reusing the Session?

Role/definition references select versioned instructions, combined with shared rules and Assignment context. Harness-prepared context includes mandatory task/criteria sources; permitted learned notes are retrieved as needed with used source/revisions. Fresh Session is the default for new work; continued Turns of one Assignment retain it. Different-work reuse requires explicit compatibility. Native discovery/inherited inputs are not erased or exhaustively inventoried.

- Requirements: REQ03, REQ05. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `common.agent-definition` → [Agent Definition](../../GLOSSARY.md) (approved; name approved); `common.instructions` → [Instructions](../../GLOSSARY.md) (approved; name approved); `common.learned-knowledge` → [Learned Knowledge](../../GLOSSARY.md) (approved; name approved); `execution.agent-session` → [Agent Session](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.goi-context` → [Context Package](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R237` Agent Definition → may reference operating guidance in → Instructions; `R238` Context Package → may contain applicable → Instructions; `R239` Context Package → may select additional sourced → Learned Knowledge
- Constraints: K64, K65, K66
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R237, R238, R239
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: CODE.Knowledge
- Sources: [SRC494: docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json:31](../../docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json), [SRC495: docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json:36](../../docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json), [SRC496: docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json:41](../../docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json), [SRC501: docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json:36](../../docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json), [SRC503: docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json:31](../../docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq53"></a>

### CQ53 · Learning, drift and operating authority

A project note has a changed source and daily retro wants to reuse it as an operating rule: what remains retrievable, and who can make it active?

Keep the sourced/scoped/qualified note and history, mark applicability recheck and exclude it from default automatic loading until a new conclusion is recorded. Drift alone does not prove the note wrong. Knowledge owns retrieval/history; Work retains execution snapshots and authoritative requirements/criteria keep their owners. Daily retro curates alongside outcomes/metrics; promotion to persistent instructions/Skills/workflows is an authorized checked candidate, not a note edit or mandatory daily patch.

- Requirements: REQ09, REQ14. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `common.learned-knowledge` → [Learned Knowledge](../../GLOSSARY.md) (approved; name approved); `common.tieu-chi-anh-gia` → [Evaluation Criterion](../../GLOSSARY.md) (approved; name approved); `engineering.source-drift` → [Source Drift](../../docs/engineering/GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.luot-retro-hang-ngay` → [Daily Retro](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.nguon-yeu-cau-du-an` → [Project Requirement Source](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.pinned-revision` → [Pinned Revision](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R240` Learned Knowledge → may cite supporting → Evidence; `R241` Daily Retro → curates → Learned Knowledge; `R242` Learned Knowledge → may inform a checked improvement → Candidate
- Constraints: K66, K67, K69
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R240, R241, R242
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: CODE.Knowledge
- Sources: [SRC495: docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json:36](../../docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json), [SRC499: docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json:41](../../docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json), [SRC500: docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json:31](../../docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json), [SRC502: docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json:41](../../docs/design/history/architecture-a08-2026-10-23/acceptance-a08.json), [SRC503: docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json:31](../../docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json), [SRC504: docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json:36](../../docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq54"></a>

### CQ54 · Task composition versus publication

Project Orchestrator needs a new routing/parallel-review/optimization composition for one task: must Engineering release the plugin first?

No: compose registered blocks/roles/Tools, validate structure/contracts/current authority/bounds, pin the plan and execute through Work. All five patterns remain composable/nestable and dynamic work remains bounded. Reusable registration or persistent code/Tool/Skill/behavior changes follow candidate/check/activation. Task-specific representation/identity and interpreter are engineering work; no arbitrary generated code bypass or relaxed evidence/permission rule is implied.

- Requirements: REQ06, REQ10. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `common.project-orchestrator` → [Project Orchestrator](../../GLOSSARY.md) (approved; name approved); `common.workflow-runtime` → [Workflow Runtime](../../GLOSSARY.md) (approved; name approved); `evolution.activation` → [Activation](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `evolution.candidate` → [Candidate](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved); `execution.execution-plan` → [Execution Plan](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-definition` → [Workflow Definition](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-run` → [Workflow Run](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.workflow-step` → [Workflow Step](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R086` Workflow Runtime → executes → Execution Plan; `R087` Workflow Run → uses → Execution Plan; `R088` Execution Plan → references selected → Workflow Definition; `R089` Execution Plan → records permitted dynamic work for → Workflow Step
- Constraints: K70
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R086, R087, R088, R089
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC504: docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json:36](../../docs/design/history/architecture-a09-2026-10-23/acceptance-a09.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq55"></a>

### CQ55 · Starter assets and automation arming

After first install, are presets already running, and what makes daily retro or a Backlog/PR poll eligible after bootstrap or restart?

Base source ships Onboarding/Engineering definitions/instructions, starter specialists, templates/blocks and fixtures. Onboarding binds existing profiles/methods; Engineering adapts assets rather than pre-spawning all roles. No LLM loop or real polling during fresh install/Onboarding. Enabled daily becomes eligible after user Spawn Engineering plus bindings/cadence/authority; code polls need connection/filter/cadence/enabled. Restart preserves disabled state and does not Spawn/Replace. Configured/source-present does not prove capability; initial scoped verification remains required.

- Requirements: REQ01, REQ02, REQ07, REQ08, REQ09. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `automation.job` → [Job](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.native-cadence` → [Paseo Cadence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `common.agent-catalog` → [Agent Catalog](../../GLOSSARY.md) (approved; name approved); `common.agent-definition` → [Agent Definition](../../GLOSSARY.md) (approved; name approved); `common.harness-engineering-orchestrator` → [Harness Engineering Orchestrator](../../GLOSSARY.md) (approved; name approved); `common.instructions` → [Instructions](../../GLOSSARY.md) (approved; name approved); `common.onboarding-agent` → [Onboarding Agent](../../GLOSSARY.md) (approved; name approved); `common.operational-verification` → [Operational Verification](../../GLOSSARY.md) (approved; name approved); `common.paseo-agent-profile` → [Paseo Agent Profile](../../GLOSSARY.md) (approved; name approved); `common.project-harness` → [Project Harness](../../GLOSSARY.md) (approved; name approved); `common.skill` → [Skill](../../GLOSSARY.md) (approved; name approved); `evolution.luot-retro-hang-ngay` → [Daily Retro](../../docs/domain/evolution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R243` Project Harness → ships starter operating → Instructions; `R244` Daily Retro → becomes eligible after the user starts → Harness Engineering Orchestrator; `R237` Agent Definition → may reference operating guidance in → Instructions
- Constraints: K71, K72, K64
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R243, R244, R237
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC505: docs/design/history/architecture-a10-2026-10-23/acceptance-a10.json:31](../../docs/design/history/architecture-a10-2026-10-23/acceptance-a10.json), [SRC506: docs/design/history/architecture-a10-2026-10-23/acceptance-a10.json:36](../../docs/design/history/architecture-a10-2026-10-23/acceptance-a10.json), [SRC494: docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json:31](../../docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq56"></a>

### CQ56 · Native Stop versus durable orchestrator Pause

The user pauses one orchestrator while a worker is running and a PR event arrives; what stops, what persists, and can reload or native canceled implicitly resume it?

Explicit owner Pause durably blocks controlled automatic wake/new admissions/progression for that logical orchestrator until authorized Resume. Native Stop only requests Turn interruption and canceled/idle cannot identify durable user intent. Preserve running workers/results/evidence/events; independent enabled ingestion and the other orchestrator may continue. No new dispatch from the paused side, no implicit Resume on event/reload/Open Session, no effect undo. Show native coordination pending/confirmed truthfully; external native/manual prompts and actual enforcement remain capability/proof limits.

- Requirements: REQ02, REQ04, REQ05, REQ07. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `automation.job` → [Job](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.native-cadence` → [Paseo Cadence](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `automation.source-event` → [Source Event](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `common.effective-authority` → [Effective Authority](../../GLOSSARY.md) (approved; name approved); `engineering.admission` → [Execution Admission](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.cancellation` → [Cancellation](../../docs/engineering/GLOSSARY.md) (approved; name approved); `engineering.observed-state` → [Observed State](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.evidence` → [Evidence](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.logical-owner` → [Orchestrator Responsibility](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.outcome` → [Outcome](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R245` Orchestrator Responsibility → gates automatic processing through durable control of → Execution Admission; `R246` Orchestrator Responsibility → retains already-admitted worker → Assignment
- Constraints: K73, K74
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R245, R246
- UI mappings: UI.pause-orchestrator, UI.resume-orchestrator
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC507: docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json:41](../../docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json), [SRC508: docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json:46](../../docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

<a id="cq57"></a>

### CQ57 · Cycle disposition and coalesced wake

An orchestrator Turn ends while workers are pending and several callbacks arrive: what determines continuation without losing results or spawning another orchestrator?

The agent records structured cycle disposition through owner MCP Tools. Code reconciles durable work/pending state before continue/wait; chat prose/marker and Turn completion are not Work completion. Keep each event/result/evidence identity while coalescing automatic wake for the busy logical owner; no per-callback interruption or replacement Session. Existing pause, authority/resource limits and explicit user lifecycle remain applicable. Wake ordering/reload and native delivery require protocol proof.

- Requirements: REQ05, REQ07. Semantic answer: **approved-sources**; runtime: **unproved-v1** — Scoped design acceptance and source-backed synthesis only. Existing isolated Codex file/MCP read smoke is not proof of full retrieval, provider parity, durable control or end-to-end V1.
- Concepts / definition mapping: `automation.source-event` → [Source Event](../../docs/domain/automation/GLOSSARY.md) (approved; name approved); `common.orchestrator-agent` → [Orchestrator Agent](../../GLOSSARY.md) (approved; name approved); `engineering.mcp-server` → [MCP Server](../../docs/engineering/GLOSSARY.md) (approved; name approved); `execution.agent-turn` → [Agent Turn](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.assignment` → [Assignment](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.logical-owner` → [Orchestrator Responsibility](../../docs/domain/execution/GLOSSARY.md) (approved; name approved); `execution.work-item` → [Work Item](../../docs/domain/execution/GLOSSARY.md) (approved; name approved)
- Directed relations: `R247` Orchestrator Agent → records structured cycle disposition through → MCP Server; `R248` Source Event → may request coalesced automatic wake for → Orchestrator Responsibility
- Constraints: K68, K73
- Definition/name gaps: none within this question scope
- Inferred/proposed relations (source audit separate): R247, R248
- UI mappings: No existing scoped UI mapping; do not create a label merely for this node.
- Code mappings: No observed identifier mapping; design-only.
- Sources: [SRC497: docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json:31](../../docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json), [SRC498: docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json:36](../../docs/design/history/architecture-a07-2026-10-23/acceptance-a07.json), [SRC507: docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json:41](../../docs/design/history/architecture-a11-2026-10-23/acceptance-a11.json)
- Decision records: No additional product decision recorded for this question; source/model/protocol status remains separately scoped.

