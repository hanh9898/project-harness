# Execution

Language for project requests, workflow execution and agent continuity. Definitions describe meaning; execution protocols and state transitions belong in specifications.

[Glossary Map](../../../GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="work-item"></a>

**Work Item**:
A request tracked from receipt through its eventual resolution. A Work Item may have no Workflow Run or several Runs handling all or part of it; a Run's outcome does not by itself resolve the request.

_Vietnamese wording (retained)_: Một yêu cầu cần giải quyết, được theo dõi từ lúc tiếp nhận tới kết quả cuối. Một Work Item có thể chưa có Workflow Run hoặc có nhiều Workflow Runs xử lý toàn bộ hay một phần yêu cầu; kết quả một Run không tự quyết định Work Item đã được giải quyết.
_Avoid_: Workflow Run, Agent Turn, Activity như một entity nghiệp vụ

<a id="yeu-cau-cong-viec-du-an"></a>
<a id="project-work-request"></a>

**Project Work Request**:
A request about a project's product, work or required outcome, discussed directly with the Project Orchestrator. Its scope may be a particular task or an enduring project rule.

_Vietnamese wording (retained)_: Yêu cầu về sản phẩm, công việc hoặc kết quả cần đạt của dự án, được người dùng trao đổi trực tiếp với Project Orchestrator. Phạm vi có thể là một công việc hoặc quy tắc dự án lâu dài.
_Aliases_: Yêu cầu công việc dự án
_Avoid_: yêu cầu cấu hình harness, mọi yêu cầu đều qua inbox harness

<a id="cong-viec-kiem-chung-ban-au"></a>
<a id="initial-verification-work"></a>

**Initial Verification Work**:
A representative project task selected by the user to establish an initial capability against explicit criteria and evidence. Capabilities outside that task's verified scope remain unverified.

_Vietnamese wording (retained)_: Một công việc đại diện do người dùng chọn để chứng minh hệ thống thực hiện được nhu cầu của dự án trước khi hoàn tất thiết lập. Kết quả có tiêu chí và bằng chứng; năng lực chưa được kiểm chứng vẫn được phân biệt rõ.
_Aliases_: Công việc kiểm chứng ban đầu
_Avoid_: demo cấu hình, kiểm tra kết nối công cụ

<a id="agent-session"></a>

**Agent Session**:
An agent's working session with its own conversation history and context, continuing across multiple Turns. A Workflow Run can use several orchestrator and worker Sessions.

_Vietnamese wording (retained)_: Một phiên làm việc của agent, có lịch sử hội thoại và ngữ cảnh riêng, có thể tiếp tục qua nhiều lượt trao đổi. Một Workflow Run có thể sử dụng nhiều Sessions của orchestrator và workers.
_Avoid_: Agent Definition, Agent Turn, Workflow Run

<a id="agent-turn"></a>

**Agent Turn**:
An agent's processing of an input, potentially involving several model and Tool calls before it responds or stops. Ending a Turn does not establish that the Workflow Run is complete.

_Vietnamese wording (retained)_: Một lượt agent xử lý đầu vào, có thể gồm nhiều lần gọi model và Tools trước khi trả lời hoặc dừng xử lý. Việc kết thúc Turn không tự xác định Workflow Run đã hoàn thành.
_Avoid_: Agent Session, Workflow Run, một lần gọi model riêng lẻ

<a id="agent-loop"></a>

**Agent Loop**:
The model-driven loop of choosing actions, calling Tools, receiving results and continuing until a response or stop. It occurs within an Agent Turn and is distinct from the harness Improvement Loop.

_Vietnamese wording (retained)_: Vòng xử lý trong đó model quyết định hành động, gọi Tools khi cần, nhận kết quả rồi tiếp tục cho tới khi trả lời hoặc dừng. Vòng này diễn ra trong một Agent Turn và không đồng nhất với vòng cải tiến harness.
_Avoid_: Improvement Loop, Schedule, toàn bộ Workflow Run

<a id="workflow"></a>

**Workflow**:
A structured flow of work governed by execution rules, composing Prompt Chaining, Routing, Parallelization, Orchestrator-Workers and Evaluator-Optimizer patterns sequentially, concurrently or recursively. Agent decisions occur within the structure and bounds that flow permits.

_Vietnamese wording (retained)_: Một luồng công việc có cấu trúc và quy tắc thực thi xác định, có thể ghép các pattern prompt chaining, routing, parallelization, orchestrator-workers và evaluator-optimizer theo thứ tự, song song hoặc lồng nhau. Các quyết định của agent bên trong luồng được thực hiện trong phạm vi mà cấu trúc và quy tắc đó cho phép.
_Avoid_: skill điều phối, một prompt dài

<a id="workflow-definition"></a>

**Workflow Definition**:
The description of an execution flow, including steps, branch conditions, parallel work, loops and stopping rules. It defines coordination and how a step's result affects subsequent work.

_Vietnamese wording (retained)_: Bản mô tả luồng thực thi, gồm các bước, điều kiện rẽ nhánh, chạy song song, vòng lặp và quy tắc dừng. Definition xác định cách phối hợp công việc và cách kết quả của một bước ảnh hưởng tới bước tiếp theo.
_Avoid_: Workflow Run, Skill hướng dẫn một công việc, phiên chat

<a id="workflow-run"></a>

**Workflow Run**:
An identified execution of a Workflow Definition with specific inputs, state, Outcome and Evidence, handling all or part of a Work Item. Its result is assessed against the applicable criteria; completing the Run does not by itself resolve the Work Item.

_Vietnamese wording (retained)_: Một lần thực hiện Workflow Definition với đầu vào cụ thể để xử lý toàn bộ hoặc một phần Work Item, có định danh, trạng thái, kết quả và bằng chứng riêng. Kết quả của Run được đánh giá theo đúng các tiêu chí đã áp dụng cho nó; Run hoàn thành không tự xác định Work Item đã được giải quyết.
_Avoid_: Workflow Definition, lượt chat của agent

<a id="assignment"></a>

**Assignment**:
A specific allocation of work to an agent with identified task, context, criteria, selected configuration and authority, distinct from proof of execution or satisfaction. It can span several Turns; each permitted retry or fallback that redispatches the work creates a new Assignment even if the same Session is reused.

_Vietnamese wording (retained)_: Một lần giao phần việc cụ thể cho một agent, gắn nhiệm vụ, context, tiêu chí và cấu hình đã chọn. Một Agent Session có thể nhận nhiều Assignments; giao việc chưa đồng nghĩa agent đã thực thi hoặc đạt yêu cầu.
_Avoid_: Agent Session, Agent Definition, kết quả đã đạt mặc định

<a id="attempt"></a>

**Attempt**:
An identified try to execute a Step Run with specific inputs and requirements; its existence alone proves neither worker start nor completion. Technical retry creates another Attempt without by itself creating a Quality Iteration.

_Vietnamese wording (retained)_: Một lần thử thực thi một Step Run với đầu vào, yêu cầu và định danh riêng; sự tồn tại của Attempt chưa chứng minh worker đã bắt đầu hoặc hoàn thành. Thử lại sau lỗi kỹ thuật tạo Attempt mới, không mặc định tạo vòng sửa chất lượng mới.
_Avoid_: Quality Iteration, yêu cầu bị chặn trước khi được phép thực thi, toàn bộ Workflow Run, Agent Turn mặc định

<a id="quality-iteration"></a>

**Quality Iteration**:
A revision cycle responding to evaluation feedback. Each Quality Iteration may involve several Attempts and differs from retrying a technical failure.

_Vietnamese wording (retained)_: Một vòng sửa kết quả theo phản hồi đánh giá. Mỗi Quality Iteration có thể cần nhiều Attempts và khác với thử lại sau lỗi kỹ thuật.
_Avoid_: Attempt, technical retry, một lần gọi model mặc định

<a id="outcome"></a>

**Outcome**:
The actual result of an execution, including outputs, errors, remaining work and supporting material; an aggregate Outcome references branch results and the relevant input and criterion versions. It is distinct from a quality Verdict, and a worker's completion claim does not replace that assessment.

_Vietnamese wording (retained)_: Kết quả thực tế của một lượt thực thi, gồm đầu ra, lỗi, phần việc còn lại và các căn cứ liên quan; Outcome tổng hợp giữ tham chiếu tới kết quả từng nhánh và phiên bản đầu vào/tiêu chí áp dụng. Outcome chưa tự là Verdict đánh giá kết quả đó theo tiêu chí; worker tự báo xong chưa thay được Verdict.
_Avoid_: Verdict, kết luận đạt tiêu chí mặc định, trạng thái agent idle

<a id="checkpoint"></a>

**Checkpoint**:
Saved execution state sufficient for reconciliation and determining how work can continue after interruption. It is more than an agent summary and does not authorize replaying every earlier effect.

_Vietnamese wording (retained)_: Trạng thái thực thi đã lưu, đủ để đối soát và xác định cách tiếp tục công việc sau gián đoạn. Nó không chỉ là bản tóm tắt của agent và không có nghĩa mọi thao tác trước đó được phép chạy lại.
_Avoid_: bản tóm tắt hội thoại, cho phép replay mọi tác động trước đó

<a id="artifact"></a>

**Artifact**:
A referenceable input or output with an identifiable version, such as a patch, report, log or screenshot. Its existence does not by itself establish a claim or satisfy a criterion.

_Vietnamese wording (retained)_: Một đầu ra hoặc tài nguyên có thể tham chiếu và xác định phiên bản, như patch, báo cáo, log hoặc ảnh chụp. Sự tồn tại của Artifact không tự chứng minh một nhận định hoặc tiêu chí đã đạt.
_Avoid_: Evidence mặc định, kết luận đạt mặc định

<a id="evidence"></a>

**Evidence**:
Information supporting a claim or conclusion, identified by source, version and assessment scope. It may reference several Artifacts and must support the particular claim or criterion being assessed.

_Vietnamese wording (retained)_: Thông tin được dùng làm căn cứ cho một nhận định hoặc kết luận, gắn với nguồn, phiên bản và phạm vi đánh giá. Evidence có thể tham chiếu một hoặc nhiều Artifacts; nội dung phải hỗ trợ đúng nhận định hoặc tiêu chí đang xét.
_Avoid_: mọi Artifact mặc định, lời agent tự báo thành công không có căn cứ

<a id="goi-context"></a>
<a id="context-package"></a>

**Context Package**:
A sourced selection of task context for an agent role and execution step, including relevant decisions, input artifacts and evaluation criteria. Its source and revision information supports traceability and handover.

_Vietnamese wording (retained)_: Phần ngữ cảnh được chọn cho một vai trò và bước thực thi, gồm nhiệm vụ, nguồn liên quan, quyết định, artifact đầu vào và tiêu chí đánh giá. Mỗi gói giữ dấu nguồn và phiên bản để truy vết hoặc bàn giao.
_Aliases_: Gói context
_Avoid_: toàn bộ lịch sử chat, prompt không rõ nguồn

<a id="nguon-yeu-cau-du-an"></a>
<a id="project-requirement-source"></a>

**Project Requirement Source**:
A source designated by the user as a basis for project goals and requirements. Improvements to harness execution methods do not by themselves replace requirements from that source.

_Vietnamese wording (retained)_: Nguồn được người dùng chỉ định làm căn cứ cho mục tiêu và yêu cầu dự án. Quyết định cải tiến cách thực thi của harness không tự thay thế yêu cầu trong những nguồn này.
_Aliases_: Nguồn yêu cầu dự án
_Avoid_: thiết kế harness, giả định chưa được xác nhận

<a id="handover"></a>

**Handover**:
Durable context and continuity information for the next responsible agent session or lifecycle stage, including relevant work, decisions, revisions and evidence. It supports continuity without itself conferring authority or replacing saved execution state.

<a id="role-binding"></a>
<a id="orchestrator-session-binding"></a>

**Orchestrator Session Binding**:
A revisioned association between a persistent orchestrator responsibility and its current native Agent Session, with distinguishable history across session replacements.
_Aliases_: Role Binding

<a id="logical-owner"></a>
<a id="orchestrator-responsibility"></a>

**Orchestrator Responsibility**:
The persistent responsibility for either project-work orchestration or harness engineering, independent of which Agent Session currently carries it.
_Aliases_: Logical Owner

<a id="result-contract"></a>

**Result Contract**:
The requirements for the content, structure and supporting evidence of returned work. Satisfying its structural requirements alone does not establish that the work meets its evaluation criteria.
_Aliases_: Yêu cầu đầu ra

<a id="effective-configuration"></a>

**Effective Configuration**:
The resolved native profile and harness-owned method and policy selections identified for a particular work execution. It records what that work selected rather than a second editable source of native provider settings.

<a id="pinned-revision"></a>

**Pinned Revision**:
A particular revision retained as the identified basis for a work execution. Its use carries the source or retained-content evidence appropriate to that resource, without implying that an external mutable Skill has been snapshotted.

<a id="workflow-pattern"></a>

**Workflow Pattern**:
A reusable structure for coordinating workflow steps and bounded agent decisions, with a contract for sequencing, routing, parallel work, dynamic work division or iterative evaluation.

<a id="prompt-chaining"></a>

**Prompt Chaining**:
A Workflow Pattern in which the checked output of one step supplies a compatible input to a later step.

<a id="routing"></a>

**Routing**:
A Workflow Pattern in which a bounded decision selects among the branches permitted by the workflow.

<a id="parallelization"></a>

**Parallelization**:
A Workflow Pattern with branches that can execute concurrently under shared admission limits and an explicit Join Policy.

<a id="orchestrator-workers"></a>

**Orchestrator-Workers**:
A Workflow Pattern in which work portions are determined dynamically within a selected template, required capabilities and resource limits.

<a id="evaluator-optimizer"></a>

**Evaluator-Optimizer**:
A Workflow Pattern in which evaluation feedback guides revisions of a result within defined criteria, iteration limits and stopping conditions.

<a id="workflow-step"></a>

**Workflow Step**:
A step in a Workflow Definition that may be visited more than once in a Workflow Run. It identifies a position in the flow rather than a particular execution.

_Vietnamese wording (retained)_: Một bước trong Workflow Definition, có thể được đi tới nhiều lần trong cùng một Workflow Run. Workflow Step mô tả vị trí trong luồng, không phải một lần thực thi cụ thể.
_Avoid_: Step Run, Attempt

<a id="step-run"></a>

**Step Run**:
An identified visit by a Workflow Run to a Workflow Step, potentially containing several Attempts for technical retries. Returning to the same step after a result-revision cycle creates a new Step Run.

_Vietnamese wording (retained)_: Một lần Workflow Run đi tới một Workflow Step, có định danh riêng và có thể gồm nhiều Attempts khi thử lại do lỗi kỹ thuật. Quay lại cùng Workflow Step sau một vòng sửa kết quả tạo Step Run mới.
_Avoid_: Workflow Step, Attempt, toàn bộ Quality Iteration

<a id="execution-plan"></a>

**Execution Plan**:
The selected execution structure for a particular Workflow Run, including recorded dynamic expansions permitted by its chosen definition and policies.

<a id="join-policy"></a>

**Join Policy**:
The rule identifying which branches to await, when their set is closed and the conditions for aggregating or continuing a workflow step. It distinguishes required-result availability from quality assessment and defines branch-failure handling.

_Vietnamese wording (retained)_: Quy tắc xác định những nhánh cần chờ, khi nào danh sách nhánh đã chốt và điều kiện để tổng hợp hoặc tiếp tục một bước workflow. Join Policy phân biệt việc có đủ kết quả bắt buộc với kết luận chất lượng và quy định cách xử lý nhánh thất bại.
_Avoid_: Verdict, kết quả một worker, trạng thái toàn bộ Work Item

<a id="stop-condition"></a>

**Stop Condition**:
A workflow rule identifying when an evaluation-and-revision loop must end, whether because its criteria are met or further permitted evaluation or revision is exhausted.
