# UI Language

UI lexicon ánh xạ nhãn hiển thị về thuật ngữ có nơi sở hữu nghĩa riêng. Các nhãn hiện có bên dưới là quan sát từ prototype, không tự trở thành nhãn chuẩn đã được người dùng duyệt.

[Glossary Map](../../GLOSSARY-MAP.md)

## Quy ước UI đã xác nhận

- Chốt glossary/tên UI bằng tiếng Anh trước: English term, nghĩa và phạm vi, domain reference, nơi dùng và từ tránh. Sau đó mới chốt Vietnamese equivalent; không suy ngược English term từ nhãn tiếng Việt đã nghĩ trước.
- UI tiếng Việt là lựa chọn hiển thị; English terms chuẩn dùng trong tooltip/chi tiết khi cần đối chiếu. Tên riêng như Paseo, GitLab và tên Skill giữ nguyên.
- Duyệt theo thứ tự menu/tên màn hình → đối tượng/hành động → trạng thái/thông báo. Mỗi nhãn ghi nghĩa tham chiếu, nơi dùng, từ tránh và trạng thái xác nhận.
- Chỉ đồng bộ HTML sau khi nhãn tương ứng được chốt. Chốt nghĩa nghiệp vụ không tự chốt nhãn UI hoặc chứng minh fixture đã mô hình hóa đúng đối tượng.
- [ui-naming-interview.md](ui-naming-interview.md) ghi vòng chốt English UI terms trước. Vòng đề xuất menu tiếng Việt trước đó chưa được duyệt và được thay bằng thứ tự English trước → Vietnamese equivalent sau; chưa sửa HTML.
- Project Chat / Harness Chat không được dùng làm hai menu bắt buộc. Menu quản lý cho phép spawn Onboarding Agent → sau onboarding, spawn Harness Engineering Orchestrator để dựng → sau khi dựng, spawn Project Orchestrator. Tên menu Orchestrators / Bộ điều phối đã chốt; một số tên khác còn chưa chốt; Spawn/Open Session và chuyển giao Replace Session đã chốt hành vi. HTML v8 mô phỏng luồng quản lý ba vai trò và native Session handoff, chưa nối API thật.

## Nghĩa tham chiếu

- [Agent Definition](../../GLOSSARY.md#agent-definition): đối tượng được chỉnh trong editor agent của harness.
- [Paseo Agent Profile](../../GLOSSARY.md#paseo-agent-profile): đối tượng native được tạo/sửa tại Paseo.
- [Work Item](../domain/execution/GLOSSARY.md#work-item): yêu cầu được theo dõi tới kết quả cuối.
- [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run): một lần thực hiện workflow.
- [Checkpoint](../domain/execution/GLOSSARY.md#checkpoint), [Artifact](../domain/execution/GLOSSARY.md#artifact), [Evidence](../domain/execution/GLOSSARY.md#evidence): phân biệt trạng thái tiếp tục, tài nguyên có phiên bản và căn cứ cho nhận định/kết luận.
- [Attempt](../domain/execution/GLOSSARY.md#attempt), [Quality Iteration](../domain/execution/GLOSSARY.md#quality-iteration), [Outcome](../domain/execution/GLOSSARY.md#outcome): phân biệt lượt thực thi, vòng sửa theo đánh giá và kết quả thực tế.
- [Schedule](../domain/automation/GLOSSARY.md#schedule): quy tắc thời điểm kích hoạt.
- [Activation Target](../domain/evolution/GLOSSARY.md#activation-target), [Active Release](../domain/evolution/GLOSSARY.md#active-release), [Recovery Release](../domain/evolution/GLOSSARY.md#recovery-release): phân biệt bản định kích hoạt, bản thực sự có hiệu lực và bản dùng phục hồi cho operation cụ thể.
- [Metric](../domain/analytics/GLOSSARY.md#metric), [Observation](../domain/analytics/GLOSSARY.md#observation), [Evaluation Trial](../domain/analytics/GLOSSARY.md#evaluation-trial), [Verdict](../domain/analytics/GLOSSARY.md#verdict): phân biệt đại lượng đo, ghi nhận thực tế, lượt đánh giá và kết luận.
- [Assignment](../domain/execution/GLOSSARY.md#assignment): lần giao phần việc cho agent; không đồng nhất với Agent Session.
- [Operational Analysis](../domain/analytics/GLOSSARY.md#operational-analysis) / [Controlled Evaluation](../domain/analytics/GLOSSARY.md#controlled-evaluation): hai kiểu phân tích, khác với một Observation hoặc Evaluation Trial riêng lẻ.
- [Baseline](../domain/analytics/GLOSSARY.md#baseline), [Comparison](../domain/analytics/GLOSSARY.md#comparison), [Saved View](../domain/analytics/GLOSSARY.md#saved-view): mốc tham chiếu, phép đối chiếu và cấu hình cách xem đã lưu.

## Language


<a id="orchestrators"></a>

**Orchestrators**:
The management entry for preparing, starting, opening and replacing the Project Harness's two orchestrators. It includes the Onboarding Agent as an initial setup action without classifying it as a third orchestrator.
_Avoid_: Agent Catalog, all native Paseo agents, Project Chat / Harness Chat as mandatory navigation

Domain references: [Harness Engineering Orchestrator](../../GLOSSARY.md#harness-engineering-orchestrator), [Project Orchestrator](../../GLOSSARY.md#project-orchestrator), [Onboarding Agent](../../GLOSSARY.md#onboarding-agent). Scope: lifecycle management menu/screen. Status: English name/scope and Vietnamese label **Bộ điều phối** confirmed. Prototype v8 route `lifecycle` now uses `Bộ điều phối`.

<a id="work-items"></a>

**Work Items**:
The screen listing requests tracked by the Project Harness, their progress, blockers and results, with links to the Workflow Runs handling each request. One Work Item may be handled by multiple Workflow Runs.
_Avoid_: Activities as an entity name, Workflow Runs as a synonym for requests

Domain references: [Work Item](../domain/execution/GLOSSARY.md#work-item), [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: request monitoring list/detail. Status: English name/scope and Vietnamese label **Yêu cầu công việc** confirmed. Prototype v9 route `work-items` uses `Yêu cầu công việc`; request/run identity and resolution are separate in the fixture model.

<a id="assignments"></a>

**Assignments**:
The screen listing specific portions of work assigned to agents, including assignee, scope, progress, results and links to native Agent Sessions. One Session may receive multiple Assignments.
_Avoid_: Agent Profiles, native agent manager, Agent Sessions as a synonym for assigned work

Domain references: [Assignment](../domain/execution/GLOSSARY.md#assignment), [Agent Session](../domain/execution/GLOSSARY.md#agent-session). Scope: assignment monitoring list/detail; work is still delegated through chat/orchestration. Status: English name/scope and Vietnamese label **Việc đã giao** confirmed. Prototype v9 route `assignments` uses `Việc đã giao`; Assignment identity/history and Session references are separate in the fixture model.

<a id="agent-catalog"></a>

**Agent Catalog**:
The screen for managing reusable Agent Definitions and their capabilities, including roles, when-to-use guidance, procedures, Skills, Principles and result contracts. It describes available capabilities rather than currently running Agent Sessions.
_Avoid_: Agent Team as the accepted label, Active Agents, native Paseo Agent Profile editor

Domain reference: [Agent Catalog](../../GLOSSARY.md#agent-catalog), [Agent Definition](../../GLOSSARY.md#agent-definition). Scope: catalog navigation/screen. Status: English name/scope and Vietnamese label **Danh mục agent** confirmed. Observed prototype: sidebar v8 uses `Danh mục agent`, route `team`; một số nội dung màn vẫn giữ nhãn cũ.

<a id="delegation-policy"></a>

**Delegation Policy**:
The configuration section for an orchestrator's permitted Agent Definitions and the allowed Delegate, Consult and Workflow modes for each definition. Its editor shows effective constraints and validation errors; further delegation and temporary agents are Advanced options.
_Avoid_: Agent Catalog, model/provider settings, a new top-level settings group

Domain reference: [Delegation Policy](../../GLOSSARY.md#delegation-policy). Scope: orchestrator configuration. Status: English name/scope, V1 editor content and Vietnamese label **Chính sách giao việc** confirmed. No implemented editor in prototype yet.

<a id="delegate-mode"></a>

**Delegate**:
A mode that assigns a specific portion of work to an agent and receives its Outcome. It is distinct from asking for advice or using the agent within a code-coordinated workflow.
_Avoid_: Consult, permission to delegate further by default

Scope: delegation mode. Vietnamese label: **Giao việc**. Status: English meaning and Vietnamese label confirmed. Domain reference: [Assignment](../domain/execution/GLOSSARY.md#assignment); policy details: [agent-delegation.md](../design/agent-delegation.md).

<a id="consult-mode"></a>

**Consult**:
A mode that requests advice, findings or options while the caller remains responsible for carrying out the work. It does not assign authority to modify project code or push, merge or release changes.
_Avoid_: Delegate, authorization to implement advice

Scope: delegation mode. Vietnamese label: **Tham vấn**. Status: English meaning and Vietnamese label confirmed; provider enforcement not yet implemented. Policy details: [agent-delegation.md](../design/agent-delegation.md).

<a id="workflow-mode"></a>

**Workflow**:
A mode that permits an Agent Definition to be used within a workflow coordinated by code. This mode alone does not authorize the worker to start workflows or delegate further.
_Avoid_: permission to start a workflow, permission to delegate further

Scope: allowed mode in Delegation Policy; not a new domain definition of Workflow. Vietnamese label: **Trong luồng công việc**. Status: English meaning and Vietnamese label confirmed. Domain reference: [Workflow](../domain/execution/GLOSSARY.md#workflow).

<a id="activity"></a>

**Activity**:
Cách gọi tổng quát trên UI cho hoạt động đang được quan sát, không phải tên một entity nghiệp vụ riêng. Khi cần nói tới yêu cầu hoặc lượt thực thi cụ thể, dùng Work Item hoặc Workflow Run theo nghĩa tương ứng.
_Avoid_: synonym mặc định của Work Item, synonym mặc định của Workflow Run

<a id="spawn"></a>

**Spawn**:
The lifecycle action that creates and starts the first native Agent Session for a selected role when its readiness conditions are met. If that role already has a Session, the normal action opens the existing Session instead.
_Avoid_: Resume, Replace Session, creating another active orchestrator on every click

Scope: lifecycle management action. Status: English name/meaning and contextual Vietnamese labels confirmed: **Thiết lập dự án** (Onboarding Agent), **Dựng harness** (Harness Engineering Orchestrator), **Bắt đầu làm việc** (Project Orchestrator). Behavior: [Onboarding Agent](../design/onboarding-agent.md).

<a id="open-session"></a>

**Open Session**:
The action that opens the native Paseo Agent Session already associated with a selected role.
_Avoid_: Spawn, Resume, Replace Session

Scope: lifecycle management action. Status: English name/meaning and Vietnamese label **Mở cuộc trò chuyện** confirmed. Opening the Session does not itself request new work or resume paused execution.

<a id="replace-session"></a>

**Replace Session**:
An explicit action that transfers an orchestrator role from its current Agent Session to a new Agent Session while retaining the previous Session's history and continuity of current work.
_Avoid_: Open Session, spawning an additional active orchestrator for the same role, deleting chat history

Scope: lifecycle management action. Status: English name/meaning and Vietnamese label **Chuyển sang cuộc trò chuyện mới** confirmed. Behavior contract: [onboarding-agent.md](../design/onboarding-agent.md). Runtime implementation and enforcement are not yet verified.


<a id="overview"></a>

**Overview**:
The screen summarizing the current operating status of the Project Harness and project, blockers and next actions.
_Avoid_: historical analytics, a new workflow state

References: [Project Harness](../../GLOSSARY.md#project-harness). Scope: navigation/screen, route `overview`. Status: English name/scope and Vietnamese label **Tổng quan** confirmed. No claim of runtime implementation follows from naming approval.

<a id="analytics"></a>

**Analytics**:
The screen for exploring historical metrics, operational comparisons and controlled evaluations.
_Avoid_: Overview, treating missing observations as zero

References: [Metric](../domain/analytics/GLOSSARY.md#metric), [Operational Analysis](../domain/analytics/GLOSSARY.md#operational-analysis), [Controlled Evaluation](../domain/analytics/GLOSSARY.md#controlled-evaluation). Scope: navigation/screen, route `analytics`. Status: English name/scope and Vietnamese label **Phân tích** confirmed. No claim of runtime implementation follows from naming approval.

<a id="harness-inbox"></a>

**Harness Inbox**:
The screen for requests, operational signals and decisions addressed to the Harness Engineering Orchestrator.
_Avoid_: project task backlog, mandatory project requirements form

References: [Harness Inbox](../domain/evolution/GLOSSARY.md#inbox-harness), [Harness Engineering Orchestrator](../../GLOSSARY.md#harness-engineering-orchestrator). Scope: navigation/screen, route `inbox`. Status: English name/scope and Vietnamese label **Hộp thư harness** confirmed. No claim of runtime implementation follows from naming approval.

<a id="settings"></a>

**Settings**:
The screen for harness-specific configuration, bindings, policies and resource limits. Native Paseo resources remain owned by Paseo.
_Avoid_: native provider/profile editor, duplicate native configuration store

References: [Delegation Policy](../../GLOSSARY.md#delegation-policy), [Agent Definition](../../GLOSSARY.md#agent-definition); ownership: [Paseo boundary](../design/paseo-boundary.md). Scope: navigation/screen, route `config`. Status: English name/scope and Vietnamese label **Cấu hình** confirmed. No claim of runtime implementation follows from naming approval.

<a id="jobs-and-schedules"></a>

**Jobs & Schedules**:
The screen for job definitions and their activation timing across code, agent and workflow execution, with the owning source identified.
_Avoid_: Schedule as a synonym for Job, a second copy of native cadence

References: [Job](../domain/automation/GLOSSARY.md#job), [Schedule](../domain/automation/GLOSSARY.md#schedule). Scope: navigation/screen, route `schedules`. Status: English name/scope and Vietnamese label **Tác vụ và lịch chạy** confirmed. No claim of runtime implementation follows from naming approval.

<a id="improvements"></a>

**Improvements**:
The screen for improvement requests and experiments, including hypotheses, evidence and verdicts.
_Avoid_: Releases, automatic approval of every proposal

References: [Improvement Loop](../domain/evolution/GLOSSARY.md#improvement-loop), [Verdict](../domain/analytics/GLOSSARY.md#verdict). Scope: navigation/screen, route `improvements`. Status: English name/scope and Vietnamese label **Cải tiến** confirmed. No claim of runtime implementation follows from naming approval.

<a id="releases"></a>

**Releases**:
The screen for versioned plugin changes and their verification and activation outcomes.
_Avoid_: Candidate as an already active Release, Improvements

References: [Release](../domain/evolution/GLOSSARY.md#release), [Candidate](../domain/evolution/GLOSSARY.md#candidate), [Activation](../domain/evolution/GLOSSARY.md#activation). Scope: navigation/screen, route `releases`. Status: English name/scope and Vietnamese label **Bản phát hành** confirmed. No claim of runtime implementation follows from naming approval.

<a id="recovery"></a>

**Recovery**:
The screen for failure status, compatibility, and recovery progress or guidance. Its presence does not imply that an unbootable plugin can recover itself.
_Avoid_: automatic database rollback, previous version as automatically compatible

References: [Recovery Release](../domain/evolution/GLOSSARY.md#recovery-release); behavior: [Release policy](../design/release-policy.md). Scope: navigation/screen, route `recovery`. Status: English name/scope and Vietnamese label **Phục hồi** confirmed. No claim of runtime implementation follows from naming approval.

<a id="evidence"></a>

**Evidence**:
The screen for inspecting sourced, versioned and scoped evidence used to support claims and evaluate results.
_Avoid_: all artifacts as proven evidence, transcript dump

References: [Evidence](../domain/execution/GLOSSARY.md#evidence), [Artifact](../domain/execution/GLOSSARY.md#artifact). Scope: navigation/screen, route `evidence`. Status: English name/scope and Vietnamese label **Bằng chứng** confirmed. No claim of runtime implementation follows from naming approval.

<a id="audit-log"></a>

**Audit Log**:
The screen listing recorded changes to configuration, authority, decisions and system lifecycle.
_Avoid_: chat history, every tool log, a new domain event store

References: [Decision Request](../../GLOSSARY.md#yeu-cau-quyet-inh); scope: [First-run flow](../design/first-run-ux.md). Scope: navigation/screen, route `history`. Status: English name/scope and Vietnamese label **Nhật ký thay đổi** confirmed. No claim of runtime implementation follows from naming approval.


<a id="pause-work"></a>

**Pause Work**:
The action requesting that the selected work pause; receipt of the request is distinct from observed execution having paused.
_Avoid_: Pause Schedule, immediate termination of every agent

References: [Work Item](../domain/execution/GLOSSARY.md#work-item), [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: UI action. Status: English name/scope and Vietnamese label **Tạm dừng công việc** confirmed.

<a id="resume-work"></a>

**Resume Work**:
The action requesting continuation of selected paused work within current authority and limits.
_Avoid_: Open Session, Resume Schedule, declaring work completed

References: [Work Item](../domain/execution/GLOSSARY.md#work-item), [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: UI action. Status: English name/scope and Vietnamese label **Tiếp tục công việc** confirmed.

<a id="cancel-work"></a>

**Cancel Work**:
The action requesting cancellation of selected work while retaining history and effects already committed.
_Avoid_: undo all effects, Pause Schedule, delete history

References: [Work Item](../domain/execution/GLOSSARY.md#work-item), [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: UI action. Status: English name/scope and Vietnamese label **Hủy công việc** confirmed.

<a id="run-now"></a>

**Run Now**:
The action requesting one manual execution without changing the configured schedule cadence.
_Avoid_: Resume Schedule, guaranteed immediate execution despite admission limits

References: [Job Run](../domain/automation/GLOSSARY.md#job-run), [Schedule](../domain/automation/GLOSSARY.md#schedule). Scope: UI action. Status: English name/scope and Vietnamese label **Chạy ngay** confirmed.

<a id="pause-schedule"></a>

**Pause Schedule**:
The action suspending future activations from a schedule without cancelling work already admitted.
_Avoid_: Pause Work, Cancel Work

References: [Schedule](../domain/automation/GLOSSARY.md#schedule). Scope: UI action. Status: English name/scope and Vietnamese label **Tạm dừng lịch** confirmed.

<a id="resume-schedule"></a>

**Resume Schedule**:
The action re-enabling future activations from a paused schedule under its configured timing and missed-occurrence policy.
_Avoid_: Resume Work, Run Now, unbounded catch-up

References: [Schedule](../domain/automation/GLOSSARY.md#schedule), [Schedule Occurrence](../domain/automation/GLOSSARY.md#schedule-occurrence). Scope: UI action. Status: English name/scope and Vietnamese label **Bật lại lịch** confirmed.

<a id="review-changes"></a>

**Review Changes**:
The configuration action validating a draft and showing its differences and expected impact before application.
_Avoid_: Apply Changes, new configuration already active

References: [Configuration](../design/configuration.md). Scope: UI action. Status: English name/scope and Vietnamese label **Xem thay đổi** confirmed.

<a id="apply-changes"></a>

**Apply Changes**:
The action applying a valid configuration revision within granted authority. It does not imply that running Sessions immediately use the new configuration.
_Avoid_: instant synchronization of every Session, permission escalation

References: [Configuration](../design/configuration.md). Scope: UI action. Status: English name/scope and Vietnamese label **Áp dụng thay đổi** confirmed.

<a id="discard-draft"></a>

**Discard Draft**:
The action discarding unapplied configuration edits while retaining the current active configuration.
_Avoid_: rollback active configuration, erase audit history

References: [Configuration](../design/configuration.md). Scope: UI action. Status: English name/scope and Vietnamese label **Bỏ bản nháp** confirmed.


<a id="run-queued"></a>

**Queued**:
A Workflow Run accepted for execution and waiting for admission or resources.
_Avoid_: Running, not received

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đang chờ chạy** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-running"></a>

**Running**:
A Workflow Run whose execution is in progress.
_Avoid_: provider idle as completion

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đang thực hiện** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-paused"></a>

**Paused**:
A Workflow Run whose execution has acknowledged a pause and requires a resume request to continue.
_Avoid_: Pausing, Pause Schedule

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đã tạm dừng** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-blocked"></a>

**Blocked**:
A Workflow Run missing a required condition or dependency, with the blocking reason identified.
_Avoid_: Paused, Failed without a terminal outcome

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Bị chặn** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-pausing"></a>

**Pausing**:
A Workflow Run with a pause requested but not yet acknowledged as paused.
_Avoid_: Paused, all workers already stopped

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đang tạm dừng** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-cancelling"></a>

**Cancelling**:
A Workflow Run with cancellation requested but not yet acknowledged as cancelled.
_Avoid_: Cancelled, all side effects undone

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đang hủy** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-completed"></a>

**Completed**:
A Workflow Run that has met its mandatory completion checks. This status alone does not resolve its parent Work Item or establish a Verdict for broader capabilities.
_Avoid_: provider turn ended, all project requirements satisfied

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Hoàn tất** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-failed"></a>

**Failed**:
A Workflow Run that ended unsuccessfully, retaining its outcome, evidence and failure reasons.
_Avoid_: Blocked as an automatic terminal failure

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Thất bại** confirmed. State transitions remain owned by runtime specifications, not this lexicon.

<a id="run-cancelled"></a>

**Cancelled**:
A Workflow Run whose cancellation has taken effect, retaining history and prior effects.
_Avoid_: deleted history, all effects reversed

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: Workflow Run execution state label only. Status: English name/scope and Vietnamese label **Đã hủy** confirmed. State transitions remain owned by runtime specifications, not this lexicon.


<a id="resolved"></a>

**Resolved** (Work Item resolution):
A Work Item whose required outcome has been established against its applicable criteria. Completion of one linked Workflow Run alone does not establish resolution.
_Avoid_: Workflow Run Completed, all requests resolved by one successful Turn

Domain reference: [Work Item](../domain/execution/GLOSSARY.md#work-item). Scope: Work Item resolution only. Status: English name/scope and Vietnamese label **Đã giải quyết** confirmed. This mapping does not create a new state machine or change runtime transitions.

<a id="schedule-enabled"></a>

**Enabled** (Schedule enablement):
A Schedule permitting future activations under its configured timing and policy.
_Avoid_: Job Run is running, guaranteed execution while host is offline

Domain reference: [Schedule](../domain/automation/GLOSSARY.md#schedule). Scope: Schedule enablement only. Status: English name/scope and Vietnamese label **Đang bật** confirmed. This mapping does not create a new state machine or change runtime transitions.

<a id="schedule-paused"></a>

**Paused** (Schedule enablement):
A Schedule whose future activations are suspended, without cancelling work already admitted.
_Avoid_: Workflow Run Paused, Cancel Work

Domain reference: [Schedule](../domain/automation/GLOSSARY.md#schedule). Scope: Schedule enablement only. Status: English name/scope and Vietnamese label **Đã tạm dừng** confirmed. This mapping does not create a new state machine or change runtime transitions.

<a id="verdict-passed"></a>

**Passed** (evaluation Verdict):
An evaluation Verdict supported by sufficient evidence that the evaluated subject meets its mandatory criteria within the stated scope and criteria revision.
_Avoid_: Workflow Run Completed, permission to activate

Domain reference: [Verdict](../domain/analytics/GLOSSARY.md#verdict). Scope: evaluation Verdict only. Status: English name/scope and Vietnamese label **Đạt** confirmed. This mapping does not create a new state machine or change runtime transitions.

<a id="verdict-failed"></a>

**Failed** (evaluation Verdict):
An evaluation Verdict supported by evidence that the evaluated subject does not meet its mandatory criteria within the stated scope and criteria revision.
_Avoid_: Workflow Run Failed, missing checks as proof that criteria failed

Domain reference: [Verdict](../domain/analytics/GLOSSARY.md#verdict). Scope: evaluation Verdict only. Status: English name/scope and Vietnamese label **Không đạt** confirmed. This mapping does not create a new state machine or change runtime transitions.

<a id="verdict-inconclusive"></a>

**Inconclusive** (evaluation Verdict):
An evaluation Verdict with insufficient evidence to conclude whether the evaluated subject meets its criteria within the stated scope and criteria revision.
_Avoid_: Passed, Failed, no reason or evidence required

Domain reference: [Verdict](../domain/analytics/GLOSSARY.md#verdict). Scope: evaluation Verdict only. Status: English name/scope and Vietnamese label **Chưa đủ căn cứ** confirmed. This mapping does not create a new state machine or change runtime transitions.


<a id="workflow-run"></a>

**Workflow Run**:
The detail object representing one execution of a Workflow Definition, separate from the Work Item it handles.
_Avoid_: Work Item, chat Turn

Domain reference: [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run). Scope: detail object/field label. Status: English meaning and display label **Lượt chạy workflow** confirmed.

<a id="job-run"></a>

**Job Run**:
The detail object representing one execution of a Job, triggered manually or by a Schedule.
_Avoid_: Job definition, Schedule

Domain reference: [Job Run](../domain/automation/GLOSSARY.md#job-run). Scope: detail object/field label. Status: English meaning and display label **Lượt chạy tác vụ** confirmed.

<a id="outcome"></a>

**Outcome**:
The actual execution result, including outputs, errors and remaining work.
_Avoid_: Verdict, automatic evidence that criteria passed

Domain reference: [Outcome](../domain/execution/GLOSSARY.md#outcome). Scope: detail object/field label. Status: English meaning and display label **Kết quả thực hiện** confirmed.

<a id="verdict"></a>

**Verdict**:
A scoped evaluation conclusion based on evidence and an identified criteria revision.
_Avoid_: Outcome, permission to activate or roll back

Domain reference: [Verdict](../domain/analytics/GLOSSARY.md#verdict). Scope: detail object/field label. Status: English meaning and display label **Kết luận đánh giá** confirmed.

<a id="artifact"></a>

**Artifact**:
A referenceable, versioned resource used as an input or produced as an output.
_Avoid_: automatically Evidence, output resources only

Domain reference: [Artifact](../domain/execution/GLOSSARY.md#artifact). Scope: detail object/field label. Status: English meaning and display label **Tài nguyên** confirmed.

<a id="checkpoint"></a>

**Checkpoint**:
Saved execution state sufficient to reconcile and determine continuation after interruption.
_Avoid_: chat summary only, permission to replay every prior effect

Domain reference: [Checkpoint](../domain/execution/GLOSSARY.md#checkpoint). Scope: detail object/field label. Status: English meaning and display label **Checkpoint** confirmed. Keep the English word unchanged; the proposed Vietnamese replacement was rejected.


<a id="activation-target"></a>

**Activation Target**:
The Release selected for an Activation, not necessarily loaded or in effect.
_Avoid_: Active Release, successfully activated by selection alone

Domain reference: [Activation Target](../domain/evolution/GLOSSARY.md#activation-target). Scope: detail object/field label. Status: English meaning and Vietnamese label **Phiên bản được chọn để kích hoạt** confirmed.

<a id="active-release"></a>

**Active Release**:
The Release actually loaded and in effect; this alone does not establish that mandatory checks have passed.
_Avoid_: selected pointer, failed-to-boot target, previously running but stopped version

Domain reference: [Active Release](../domain/evolution/GLOSSARY.md#active-release). Scope: detail object/field label. Status: English meaning and Vietnamese label **Phiên bản đang có hiệu lực** confirmed.

<a id="recovery-release"></a>

**Recovery Release**:
The Release selected for a particular recovery operation after boot and current-data compatibility checks.
_Avoid_: automatically previous version, every historically working release

Domain reference: [Recovery Release](../domain/evolution/GLOSSARY.md#recovery-release). Scope: detail object/field label. Status: English meaning and Vietnamese label **Phiên bản được chọn để phục hồi** confirmed.

<a id="attempt"></a>

**Attempt**:
One execution attempt for a step with its particular input and request; technical retry creates a new Attempt.
_Avoid_: Quality Iteration, guaranteed successful execution

Domain reference: [Attempt](../domain/execution/GLOSSARY.md#attempt). Scope: detail object/field label. Status: English meaning and Vietnamese label **Lần thực thi** confirmed.

<a id="quality-iteration"></a>

**Quality Iteration**:
A revision cycle driven by evaluation feedback; it may include multiple execution Attempts.
_Avoid_: technical retry as automatically a quality revision

Domain reference: [Quality Iteration](../domain/execution/GLOSSARY.md#quality-iteration). Scope: detail object/field label. Status: English meaning and Vietnamese label **Vòng hiệu chỉnh** confirmed.

<a id="metric"></a>

**Metric**:
A defined measurement with its calculation, unit and scope.
_Avoid_: Observation, arbitrary number without defined meaning

Domain reference: [Metric](../domain/analytics/GLOSSARY.md#metric). Scope: detail object/field label. Status: English meaning and Vietnamese label **Chỉ số** confirmed.

<a id="observation"></a>

**Observation**:
A sourced recording of a measurement at an identified time and scope.
_Avoid_: Metric definition, missing data as zero

Domain reference: [Observation](../domain/analytics/GLOSSARY.md#observation). Scope: detail object/field label. Status: English meaning and Vietnamese label **Ghi nhận** confirmed.

<a id="evaluation-trial"></a>

**Evaluation Trial**:
One evaluation of a version on explicit inputs, criteria and conditions.
_Avoid_: all Workflow Runs, proof of universal effectiveness

Domain reference: [Evaluation Trial](../domain/analytics/GLOSSARY.md#evaluation-trial). Scope: detail object/field label. Status: English meaning and Vietnamese label **Lượt đánh giá** confirmed.


<a id="baseline"></a>

**Baseline**:
An explicitly identified reference version or evaluation result used for comparison under stated conditions.
_Avoid_: automatically Active Release or Recovery Release

Domain reference: [Baseline](../domain/analytics/GLOSSARY.md#baseline). Scope: Analytics detail/control label. Status: English meaning and Vietnamese label **Mốc tham chiếu** confirmed.

<a id="comparison"></a>

**Comparison**:
A comparison of identified subjects on stated metrics, scope and conditions. It does not alone establish causation.
_Avoid_: automatically Controlled Evaluation or Verdict

Domain reference: [Comparison](../domain/analytics/GLOSSARY.md#comparison). Scope: Analytics detail/control label. Status: English meaning and Vietnamese label **So sánh** confirmed.

<a id="saved-view"></a>

**Saved View**:
A saved Analytics viewing configuration, including metrics, filters, grouping and comparison choices. It does not freeze the underlying data or evaluation results.
_Avoid_: data snapshot, immutable report

Domain reference: [Saved View](../domain/analytics/GLOSSARY.md#saved-view). Scope: Analytics detail/control label. Status: English meaning and Vietnamese label **Chế độ xem đã lưu** confirmed.

<a id="operational-analysis"></a>

**Operational Analysis**:
Analysis using observations collected during actual operation, with relevant context and limitations.
_Avoid_: Controlled Evaluation, causal proof by comparison alone

Domain reference: [Operational Analysis](../domain/analytics/GLOSSARY.md#operational-analysis). Scope: Analytics detail/control label. Status: English meaning and Vietnamese label **Phân tích vận hành** confirmed.

<a id="controlled-evaluation"></a>

**Controlled Evaluation**:
Evaluation under explicitly defined inputs, criteria and conditions for assessing a subject or comparing versions.
_Avoid_: all operational comparisons, every Workflow Run

Domain reference: [Controlled Evaluation](../domain/analytics/GLOSSARY.md#controlled-evaluation). Scope: Analytics detail/control label. Status: English meaning and Vietnamese label **Đánh giá có kiểm soát** confirmed.

<a id="candidate"></a>

**Candidate**:
A specific proposed change being verified before a decision to apply it.
_Avoid_: an already active Release

Domain reference: [Candidate](../domain/evolution/GLOSSARY.md#candidate). Scope: evolution detail/action label. Status: English meaning and Vietnamese label **Thay đổi đề xuất** confirmed.

<a id="activation"></a>

**Activation**:
The action bringing a version into effect, separate from checks passing or the Release being created.
_Avoid_: test pass, Release creation

Domain reference: [Activation](../domain/evolution/GLOSSARY.md#activation). Scope: evolution detail/action label. Status: English meaning and Vietnamese label **Kích hoạt** confirmed.


<a id="agent-definition"></a>

**Agent Definition**:
A harness-owned reusable agent configuration referencing ordered native Paseo profiles, selected Skills and a Principle selection policy.
_Avoid_: native Paseo Agent Profile, running Session, duplicated provider settings

Domain reference: [Agent Definition](../../GLOSSARY.md#agent-definition). Scope: agent configuration object/field label. Status: English meaning and display label **Cấu hình agent** confirmed. Preserve proper names of installed Skill/Principle entries.

<a id="paseo-agent-profile"></a>

**Paseo Agent Profile**:
A native Paseo profile containing supported agent launch settings such as provider, model, thinking and mode.
_Avoid_: Agent Definition, Skill or Principle bundle

Domain reference: [Paseo Agent Profile](../../GLOSSARY.md#paseo-agent-profile). Scope: agent configuration object/field label. Status: English meaning and display label **Profile Paseo** confirmed. Preserve proper names of installed Skill/Principle entries.

<a id="skill"></a>

**Skill**:
A package of guidance, methods and resources for performing a type of work.
_Avoid_: Tool, merely an executable command

Domain reference: [Skill](../../GLOSSARY.md#skill). Scope: agent configuration object/field label. Status: English meaning and display label **Skill** confirmed. Preserve proper names of installed Skill/Principle entries.

<a id="principle"></a>

**Principle**:
Guidance for reasoning, choosing and evaluating decisions.
_Avoid_: Tool, the complete procedure of a Skill

Domain reference: [Principle](../../GLOSSARY.md#principle). Scope: agent configuration object/field label. Status: English meaning and display label **Nguyên tắc** confirmed. Preserve proper names of installed Skill/Principle entries.


<a id="primary-profile"></a>

**Primary Profile**:
The first native Paseo profile reference selected for an Agent Definition.
_Avoid_: a duplicated model/provider configuration

References: [Agent Definition](../../GLOSSARY.md#agent-definition), [Paseo Agent Profile](../../GLOSSARY.md#paseo-agent-profile). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Profile chính** confirmed.

<a id="fallback-profiles"></a>

**Fallback Profiles**:
Ordered alternative native profile references eligible under the configured fallback, capability and authority contract.
_Avoid_: arbitrary fallback model, bypassing permission or required capabilities

References: [Agent Definition](../../GLOSSARY.md#agent-definition); [Configuration](../design/configuration.md). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Profile dự phòng** confirmed.

<a id="principle-selection"></a>

**Principle Selection**:
The agent configuration policy determining how Principles are selected for work.
_Avoid_: permission to omit core operating rules

References: [Principle](../../GLOSSARY.md#principle); [Configuration](../design/configuration.md). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Cách chọn nguyên tắc** confirmed.

<a id="principle-automatic"></a>

**Automatic**:
The Principle Selection mode in which the worker selects Principles from the catalog according to the task.
_Avoid_: no principles applied, ignoring core operating rules

References: [Configuration](../design/configuration.md). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Agent tự chọn** confirmed.

<a id="principle-fixed"></a>

**Fixed**:
The Principle Selection mode using the configured Principle list.
_Avoid_: exemption from core operating rules

References: [Configuration](../design/configuration.md). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Danh sách cố định** confirmed.

<a id="principle-hybrid"></a>

**Hybrid**:
The Principle Selection mode combining configured mandatory Principles with additional task-selected Principles.
_Avoid_: automatic removal of mandatory entries

References: [Configuration](../design/configuration.md). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Kết hợp** confirmed.

<a id="when-to-use"></a>

**When to Use**:
The field describing situations where an Agent Definition is suitable for selection.
_Avoid_: permission grant, mandatory routing rule by itself

References: [Agent Definition](../../GLOSSARY.md#agent-definition), [Agent Role](../../GLOSSARY.md#agent-role). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Khi nào nên dùng** confirmed.

<a id="result-contract"></a>

**Result Contract**:
The field specifying the required structure, content and evidence of returned work.
_Avoid_: free-form final message as automatically sufficient, proof of completion by the existence of a schema

References: [Outcome](../domain/execution/GLOSSARY.md#outcome), [Evidence](../domain/execution/GLOSSARY.md#evidence). Scope: Agent Definition field/mode. Status: English name/scope and Vietnamese label **Yêu cầu đầu ra** confirmed.

## Nhãn quan sát trong prototype v6

- `Sửa cấu hình agent` / `Tạo cấu hình agent` → Agent Definition; màn `definitions/*`. Chưa chốt nhãn chuẩn hoặc bản dịch EN.
- `Profile native` → Paseo Agent Profile; editor chỉ chọn reference và hiển thị thiết lập native.
- `Hoạt động` / `Workflow Run` → đang dùng cho các đối tượng trong `S.activities`; đã chốt Work Item khác Workflow Run và Activity chỉ là tên tổng quát trên UI. Prototype chưa tách hai đối tượng theo mô hình này.
- `Jobs & triggers` / `Jobs & schedules` → cùng route `schedules`; cần chốt nhãn menu chung.
- `Đạt tiêu chí` ← helper `badge(completed)` dùng cho work; không tự áp cùng nhãn cho lịch hoặc lượt Job.

- `Candidate cập nhật toàn plugin` / `Plugin releases` / `Bắt đầu cập nhật` → lần lượt liên quan [Candidate](../domain/evolution/GLOSSARY.md#candidate), [Release](../domain/evolution/GLOSSARY.md#release) và [Activation](../domain/evolution/GLOSSARY.md#activation). Những nhãn này đang có trong prototype; chưa xác nhận chúng thay thế được ba tên chuẩn ở mọi surface.

## Quy tắc entry khi chốt nhãn

Activation Target / Active Release / Recovery Release đã chốt nhãn lần lượt **Phiên bản được chọn để kích hoạt / Phiên bản đang có hiệu lực / Phiên bản được chọn để phục hồi**. Các đề xuất rút gọn trước đây đã bị bác bỏ; không dùng chúng thay nhãn đã chốt. Prototype v7 vẫn có `Active`, `Baseline`, `bản phục hồi`; khi plugin không boot, không dùng nhãn Active cho target hoặc bản cũ đã dừng. Prototype v9 đã tách refs target/active và lựa chọn recovery theo operation/schema; native compatibility/observability vẫn chưa triển khai.

Checkpoint / Artifact / Evidence đã chốt nghĩa nghiệp vụ và nhãn hiển thị lần lượt **Checkpoint / Tài nguyên / Bằng chứng**. Không dùng các đề xuất cũ “Điểm tiếp tục”, “Trạng thái đã lưu” hoặc “Tài nguyên đầu ra” thay nhãn đã chốt. Việc đặt nhãn không chứng minh snapshot hoặc artifact fixture đáp ứng contract runtime.

Metric / Observation / Evaluation Trial / Verdict đã chốt nghĩa và canonical English names. Prototype dùng `quality`, `Chi phí`, `Thời gian`, `Controlled trial` và nhãn kết quả ở nhiều surface; đã chốt nhãn VI Metric / Observation / Evaluation Trial / Verdict tại các entries phía trên; công thức và nội dung còn cần kiểm riêng. Số liệu fixture không trở thành Observation thực chỉ vì đặt trong màn Analytics; nút tạo trial mô phỏng chưa tạo Evaluation Trial thật. Hiển thị Verdict phải gắn đối tượng/phạm vi, không lấy trạng thái completed chung thay kết luận.

Attempt / Quality Iteration / Outcome đã chốt nghĩa. Cây Run của prototype v7 hiển thị `attempt` và `vòng`; đây là nhãn observed cho các counters fixture. Khi hiển thị kết quả, phân biệt Outcome do lượt thực thi trả về với Verdict theo tiêu chí; không dùng “Đạt” chỉ vì worker trả kết quả. Outcome / Attempt / Quality Iteration đã chốt nhãn **Kết quả thực hiện / Lần thực thi / Vòng hiệu chỉnh**; dạng trình bày chi tiết chưa đồng bộ đầy đủ.

Assignment đã chốt; prototype v9 dùng `S.assignments` và `S.agentSessions` riêng, hỗ trợ nhiều lần giao việc trên cùng Session. Nhãn `Phân công agent` / `S.agents` là quan sát lịch sử trước refactor. Operational Analysis / Controlled Evaluation đã chốt canonical names, giữ nghĩa của hai mục tiếng Việt cũ; nhãn Analytics `observed`/`controlled` là fixture observed, không chứng minh có dữ liệu vận hành hoặc đánh giá thật.

Baseline / Comparison / Saved View đã chốt nghĩa. Các controls baseline/candidate, so sánh trước/sau và save/load view trên Analytics là observed fixture. Khi trình bày Baseline phải cho biết đó là phiên bản hay kết quả đánh giá; không ngầm đồng nhất với bản đang chạy hoặc bản phục hồi. Saved View lưu cách xem, không hứa giữ nguyên tập dữ liệu/kết luận ở lần mở sau. Nhãn VI **Mốc tham chiếu / So sánh / Chế độ xem đã lưu** đã chốt tại các entries phía trên; các controls HTML vẫn cần đồng bộ.

Mỗi mapping ghi term ID và link nghĩa, object/surface, nhãn EN/VI, tooltip khi cần, từ tránh dùng và trạng thái observed/proposed/confirmed. UI label không định nghĩa lại domain concept. Quy tắc chuyển trạng thái và điều kiện verdict nằm trong spec, không nhét vào lexicon.
