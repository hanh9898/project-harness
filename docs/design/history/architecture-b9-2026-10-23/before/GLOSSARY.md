# Project Harness — Common Language

Shared product language for one Project Harness. Each definition is owned here or by the linked execution, automation, evolution, analytics or engineering glossary.

[Glossary Map](GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="onboarding-agent"></a>

**Onboarding Agent**:
An agent given MCP Tools to configure the project's initial harness settings and explain plugin usage through native Paseo conversation before the user starts Harness Engineering. It handles initial setup rather than the detailed project work owned by the Project Orchestrator.

_Vietnamese wording (retained)_: Agent được cấp MCP Tools để thiết lập cấu hình khởi đầu dự án/harness và hướng dẫn sử dụng plugin qua hội thoại native Paseo, trước bước khởi chạy Harness Engineering Orchestrator để dựng Project Orchestrator. Vai trò này khác công việc nghiệp vụ chi tiết do Project Orchestrator chủ trì.
_Avoid_: Project Orchestrator, Harness Engineering Orchestrator mặc định, wizard form bắt buộc

<a id="agent-catalog"></a>

**Agent Catalog**:
The Project Harness's shared catalog of reusable Agent Definitions and selectable capabilities. It describes available configurations rather than running Agent Sessions and does not itself authorize every orchestrator to use every definition.

_Vietnamese wording (retained)_: Catalog dùng chung của Project Harness mô tả các Agent Definitions và năng lực có thể lựa chọn. Nó không phải danh sách Agent Sessions đang chạy và không tự cấp quyền sử dụng mọi definition cho mọi orchestrator.
_Avoid_: danh sách agent đang chạy, quyền delegation mặc định, Đội năng lực (retired label), Agent Team as the accepted product label

<a id="delegation-policy"></a>

**Delegation Policy**:
An orchestrator's policy specifying the Agent Definitions it may use and the permitted modes of use. It is separate from capability descriptions in the Agent Catalog and does not replace authority or execution limits.

_Vietnamese wording (retained)_: Policy của một orchestrator xác định Agent Definitions nó được sử dụng và các cách sử dụng được phép. Delegation Policy khác mô tả năng lực trong Agent Catalog và không tự thay thế authority hay giới hạn thực thi.
_Avoid_: Agent Catalog, mọi agent có trong catalog đều được phép gọi, tool permissions của provider

<a id="paseo-agent-profile"></a>

**Paseo Agent Profile**:
A native Paseo-managed profile containing supported agent launch settings such as provider, model, thinking, mode and related options.

_Vietnamese wording (retained)_: Profile native do Paseo quản lý, tập hợp các thiết lập khởi chạy agent như provider, model, thinking, mode và các tùy chọn được hỗ trợ.
_Avoid_: Agent Definition, bộ Skills hoặc Principles của agent

<a id="agent-role"></a>

**Agent Role**:
A responsibility assigned to an agent, identifying the kind of work it accepts, when it should receive that work and the result it must return. Changing execution configuration does not by itself change the Role's responsibility.

_Vietnamese wording (retained)_: Trách nhiệm được giao cho agent, xác định loại công việc nó tiếp nhận, tình huống được giao việc và kết quả phải bàn giao. Thay đổi cấu hình thực thi không tự thay đổi trách nhiệm của Role.
_Avoid_: Agent Definition, Paseo Agent Profile, model hoặc bộ Skills

<a id="agent-definition"></a>

**Agent Definition**:
A project-plugin-managed agent configuration referencing ordered primary and fallback Paseo Agent Profiles, selected Skills and a Principle Selection policy; native profiles supply provider and model settings. Skills are explicitly named when work is assigned without requiring an isolated Skill catalog for the Agent Session.

_Vietnamese wording (retained)_: Cấu hình agent do Paseo Plugin của dự án quản lý, tham chiếu các Paseo Agent Profile theo thứ tự chính và fallback, đồng thời chỉ định Skills và chính sách chọn Principles. Skills được nêu tường minh khi giao việc, không yêu cầu giới hạn catalog của Agent Session. Các thiết lập provider/model được lấy từ profile native được tham chiếu.
_Avoid_: Paseo Agent Profile, một agent đang chạy, bản sao cấu hình provider/model native

<a id="skill"></a>

**Skill**:
A package of instructions, methods and resources for a kind of agent work, potentially including scripts, references or assets. Reading its guidance is distinct from executing an action.

_Vietnamese wording (retained)_: Gói hướng dẫn, phương pháp và tài nguyên giúp agent biết cách thực hiện một loại công việc. Skill có thể kèm scripts, references hoặc assets; việc đọc hướng dẫn và thực thi hành động là các hoạt động khác nhau.
_Avoid_: Tool, chỉ riêng một lệnh thực thi

<a id="principle"></a>

**Principle**:
A rule of thought used to reason, choose and evaluate decisions. A Principle supplies decision guidance while a Skill supplies a method; packaging a Principle as a Skill does not remove that distinction.

_Vietnamese wording (retained)_: Nguyên tắc định hướng cách agent suy luận, lựa chọn và đánh giá quyết định. Principle cung cấp căn cứ ra quyết định, còn Skill cung cấp phương pháp thực hiện công việc; việc đóng gói một Principle thành Skill không làm mất sự phân biệt về vai trò này.
_Avoid_: Tool, đồng nhất Principle với toàn bộ quy trình của một Skill

<a id="tool"></a>

**Tool**:
A callable capability through which an agent performs an action or obtains a result from its environment. A CLI command, MCP tool or another interface can expose that capability.

_Vietnamese wording (retained)_: Khả năng agent có thể gọi để thực hiện một hành động hoặc lấy kết quả từ môi trường. CLI command, MCP tool hoặc interface khác có thể cung cấp cách gọi khả năng đó.
_Avoid_: Skill, đồng nhất Tool với riêng MCP server hoặc CLI

<a id="workflow-runtime"></a>

**Workflow Runtime**:
The component that executes workflows under defined structure and rules, coordinating transitions, parallel work, continuation, retries and recovery. In this project it is part of the Paseo Plugin and carries out agent decisions within the workflow's permitted scope.

_Vietnamese wording (retained)_: Thành phần thực thi workflow theo cấu trúc và quy tắc đã định, chịu trách nhiệm chuyển bước, phối hợp chạy song song, lưu điểm tiếp tục, thử lại và khôi phục. Trong dự án này, Workflow Runtime nằm bên trong Paseo Plugin và thực hiện các quyết định của agent trong phạm vi workflow cho phép.
_Avoid_: Orchestrator Agent, Workflow Definition, mặc định là một CLI, MCP server hoặc tiến trình riêng

<a id="project-orchestrator"></a>

**Project Orchestrator**:
The component within Project Harness responsible for coordinating project work, consisting of an Orchestrator Agent and work-queue and workflow-execution mechanisms. It has its own work lifecycle and is distinct from its agent's current Session.

_Vietnamese wording (retained)_: Thành phần đảm nhiệm điều phối công việc của dự án bên trong Project Harness, gồm Orchestrator Agent cùng cơ chế quản lý hàng việc và thực thi workflow. Thành phần này có hàng việc và vòng đời riêng, không đồng nhất với phiên làm việc của agent bên trong.
_Avoid_: Project Harness, Orchestrator Agent, toàn bộ hệ thống được tạo ra cho dự án

<a id="orchestrator-agent"></a>

**Orchestrator Agent**:
The agent responsible for reasoning and decisions within an orchestrator, including clarifying requirements, planning and delegation. Both orchestrators contain an Orchestrator Agent, while durable work state is not confined to that agent's Session.

_Vietnamese wording (retained)_: Agent đảm nhiệm phần suy luận và ra quyết định bên trong một orchestrator, như làm rõ yêu cầu, lập kế hoạch và giao việc. Trong dự án này, cả Project Orchestrator và Harness Engineering Orchestrator đều có Orchestrator Agent; trạng thái công việc không chỉ nằm trong Agent Session của nó.
_Avoid_: toàn bộ orchestrator, Workflow Run, cơ chế thực thi workflow

<a id="initial-project-orchestrator"></a>

**Initial Project Orchestrator**:
The initial state of the Project Orchestrator, prepared to receive and explore project requirements directly with the user and gain capabilities through harness development. It remains the same project-work responsibility rather than a third orchestrator.

_Vietnamese wording (retained)_: Trạng thái ban đầu của Project Orchestrator, được dựng để tiếp nhận và khám phá yêu cầu trực tiếp với người dùng rồi phát triển thêm năng lực qua harness. Đây vẫn là cùng vai trò chủ trì công việc dự án, không phải một orchestrator thứ ba.
_Avoid_: demo agent, Project Orchestrator đã kiểm chứng mọi năng lực

<a id="harness-engineering-orchestrator"></a>

**Harness Engineering Orchestrator**:
The component within Project Harness responsible for building, verifying and improving that harness, including constructing the Project Orchestrator. It combines an Orchestrator Agent with harness-development work management and execution, informed by operating feedback and retrospectives.

_Vietnamese wording (retained)_: Thành phần bên trong Project Harness điều phối việc xây dựng, kiểm chứng và cải tiến chính harness đó, bao gồm việc dựng Project Orchestrator. Nó gồm Orchestrator Agent cùng cơ chế quản lý và thực thi công việc phát triển harness, sử dụng phản hồi vận hành cùng các lượt retro để tổ chức cải tiến.
_Avoid_: orchestrator chung, Project Orchestrator

<a id="loi-harness"></a>
<a id="harness-core"></a>

**Harness Core**:
The shared foundation of harness capabilities that excludes rules specific to the target project. A change serving a project's own rules does not automatically belong to this foundation.

_Vietnamese wording (retained)_: Phần năng lực nền không mang các quy tắc chuyên biệt của dự án đích. Một thay đổi phục vụ quy tắc riêng của dự án không mặc nhiên trở thành thay đổi của lõi.
_Aliases_: Lõi harness
_Avoid_: Project Harness, bộ quy tắc dự án

<a id="paseo-plugin"></a>

**Paseo Plugin**:
The Paseo extension used to implement Project Harness in this project.

_Vietnamese wording (retained)_: Phần mở rộng của Paseo dùng để triển khai Project Harness trong dự án này.
_Avoid_: Harness Plugin như một loại thành phần riêng, một platform riêng mặc định

<a id="project-harness"></a>

**Project Harness**:
The system built for one project, including the Project Orchestrator, Harness Engineering Orchestrator and their workflows, tools, skills and related capabilities. It supports both doing project work and developing how that work is performed.

_Vietnamese wording (retained)_: Hệ thống được xây dựng cho một dự án cụ thể, gồm Project Orchestrator, Harness Engineering Orchestrator, cùng các workflow, tools, skills và năng lực liên quan. Đây là toàn bộ hệ thống đầu ra được tạo cho dự án, bao gồm cả khả năng thực hiện công việc lẫn phát triển cách thực hiện.
_Avoid_: Project Orchestrator, một agent riêng lẻ, chỉ riêng bộ skills

<a id="tieu-chi-anh-gia"></a>
<a id="evaluation-criterion"></a>

**Evaluation Criterion**:
A requirement or objective with an explicit scope and method of evaluation, used to assess project results or harness operation. Earlier evaluations retain the criterion version under which they were made.

_Vietnamese wording (retained)_: Một yêu cầu hoặc mục tiêu có phạm vi áp dụng và cách đánh giá rõ ràng, dùng để đánh giá kết quả dự án hoặc hiệu quả vận hành harness. Tiêu chí có thể được làm rõ và thay đổi trong trao đổi với bên chủ trì tương ứng; kết quả cũ giữ lại tiêu chí đã dùng khi đánh giá.
_Aliases_: Tiêu chí đánh giá
_Avoid_: lời nhắc không được theo dõi, chỉ số mặc định bất biến

<a id="tieu-chi-ket-qua-du-an"></a>
<a id="project-outcome-criterion"></a>

**Project Outcome Criterion**:
An Evaluation Criterion stating what a project's product or work must achieve within a project, workflow or task scope.

_Vietnamese wording (retained)_: Tiêu chí xác định sản phẩm hoặc công việc dự án phải đạt điều gì, áp dụng cho toàn dự án hoặc một workflow/task cụ thể.
_Aliases_: Tiêu chí kết quả dự án
_Avoid_: tiêu chí hiệu quả harness, yêu cầu vận hành không phân biệt với đầu ra

<a id="tieu-chi-van-hanh-harness"></a>
<a id="harness-operating-criterion"></a>

**Harness Operating Criterion**:
An Evaluation Criterion for orchestration effectiveness, including operating quality, time, cost or the need for human intervention within a stated scope.

_Vietnamese wording (retained)_: Tiêu chí đánh giá hiệu quả điều phối, gồm chất lượng vận hành, thời gian, chi phí và mức cần người can thiệp, với phạm vi áp dụng được xác định.
_Aliases_: Tiêu chí vận hành harness
_Avoid_: tiêu chí nghiệm thu sản phẩm, chỉ số tối ưu không gắn mục tiêu

<a id="yeu-cau-quyet-inh"></a>
<a id="decision-request"></a>

**Decision Request**:
A specific issue requiring the user's decision before dependent work can continue, accompanied by evidence and a recommended course. The decision is retained with its work context.

_Vietnamese wording (retained)_: Một vấn đề cần người dùng chốt để phần việc liên quan có thể tiếp tục, kèm câu hỏi cụ thể, bằng chứng và phương án đề xuất. Quyết định được lưu cùng bối cảnh công việc.
_Aliases_: Yêu cầu quyết định
_Avoid_: thông báo tiến độ, lỗi đã tự xử lý

<a id="project"></a>

**Project**:
The single existing software project served by a Project Harness, potentially spanning several repositories.

<a id="onboarding"></a>

**Onboarding**:
The initial configuration and usage guidance provided through native Paseo conversation before the user starts the harness build stage.

<a id="readiness-report"></a>

**Readiness Report**:
A scoped assessment of required checks, blockers, optional gaps and evidence against identified configuration and dependency revisions. Its conclusion concerns a named build or launch stage rather than general project competence.

<a id="build-readiness"></a>

**Build Readiness**:
The condition in which the required project context, configuration, capabilities, authority and limits are sufficient for the intended initial harness build.

<a id="launch-readiness"></a>

**Launch Readiness**:
The condition in which the Project Orchestrator's required configuration, references and tools are valid and its handover is saved, sufficient to offer user-initiated launch.

<a id="operational-verification"></a>

**Operational Verification**:
An evidence-based demonstration that a selected representative project task meets its applicable criteria within a stated capability scope.

<a id="capability"></a>

**Capability**:
An ability actually supported by a host, provider, tool or integration that is needed to fulfill the requested work contract. Availability of that ability does not establish permission to use it.

<a id="authority"></a>

**Authority**:
The scope granted to a caller for making decisions and causing actions on behalf of the project or harness. A role name, catalog entry or accessible tool does not by itself grant that scope.

<a id="permission"></a>

**Permission**:
Authorization for a particular action under the applicable allow, ask or deny policy and native enforcement. Approval for one action does not by itself broaden standing authority.

<a id="effective-authority"></a>

**Effective Authority**:
The authority usable for a particular action after the caller's granted scope, parent Assignment restrictions, current policies and revocations are taken into account.

<a id="resource-limit"></a>

**Resource Limit**:
An applicable ceiling on shared harness execution resources, such as concurrency, elapsed work time or measurable spending. The limit's scope includes relevant orchestrators, workers and consultations.

<a id="delegation-mode"></a>

**Delegation Mode**:
A permitted way of using an Agent Definition under a caller's Delegation Policy: Delegate, Consult or Workflow. A mode describes the use of the definition without independently granting tool permissions or further delegation.

<a id="delegate"></a>

**Delegate**:
The permitted-use mode in which a specific portion of work is assigned to an agent and its Outcome is returned.
_Aliases_: Giao việc

<a id="consult"></a>

**Consult**:
The permitted-use mode for requesting advice, findings or options while the caller retains responsibility for carrying out the work. It grants no authority to modify project code or push, merge or release changes.
_Aliases_: Tham vấn

<a id="workflow-mode"></a>

**Workflow Mode**:
The permitted-use mode in which an Agent Definition can participate in a workflow coordinated by code. It does not by itself authorize the worker to start workflows or delegate further.
_Aliases_: Workflow, Trong luồng công việc

<a id="procedure"></a>
<a id="agent-procedure"></a>

**Agent Procedure**:
The role-associated method for performing a kind of agent work, described by its entry instructions and required result. It is distinct from a running workflow or the Skill package that carries guidance.
_Aliases_: Procedure

<a id="entry-skill"></a>

**Entry Skill**:
A Skill required as the entry guidance for an Agent Procedure and included in the Agent Definition selected for that procedure.

<a id="operating-rules"></a>
<a id="core-operating-rules"></a>

**Core Operating Rules**:
The always-applicable rules governing authority, evidence and quality across agent work, independent of the selected task-specific Principles.
_Aliases_: Operating Rules

<a id="principle-selection"></a>

**Principle Selection**:
The policy for selecting task-specific Principles using Automatic, Fixed or Hybrid selection while retaining the Core Operating Rules.
_Aliases_: Cách chọn nguyên tắc

<a id="configuration-revision"></a>

**Configuration Revision**:
An identified version of harness-owned configuration, distinguishable from earlier and later edits. Existing work retains its selected configuration rather than silently adopting a later edit.

<a id="decision"></a>

**Decision**:
A recorded answer to a Decision Request, retained with the relevant work context and revision. It resolves that issue without automatically expanding standing authority.

## Contextual references

These established technical terms are included for their use in this harness. Their notes do not create independent domain entities or require a separate glossary record.

<a id="repository"></a>

- **Repository** — A version-controlled code repository belonging to the target project. Several repositories can belong to the same Project without requiring separate Project Harnesses.

<a id="native-paseo"></a>

- **Native Paseo** — The host product that owns native projects, workspaces, profiles, agent sessions and their management interfaces. Project Harness references those resources and adds its own work coordination and improvement capabilities.

<a id="workspace"></a>

- **Workspace** — A native Paseo execution context referenced by harness work and associated with the project's code and runtime resources.

## Other owning glossaries

- [Execution](docs/domain/execution/GLOSSARY.md)
- [Automation](docs/domain/automation/GLOSSARY.md)
- [Evolution](docs/domain/evolution/GLOSSARY.md)
- [Analytics](docs/domain/analytics/GLOSSARY.md)
- [Engineering](docs/engineering/GLOSSARY.md)
- [UI Language](docs/ui/GLOSSARY.md)

## Architecture follow-up — A06

The meanings below were confirmed in [A06](docs/design/history/architecture-a06-2026-10-23/acceptance-a06.json). Their detailed lifecycle belongs in the design documents; adding this language does not create a storage record or module. The earlier 155-concept graph is a prior scope snapshot; incorporation of these follow-up terms is tracked in the [architecture tree](docs/design/architecture-grill.md).

<a id="instructions"></a>

**Instructions**:
Versioned guidance describing an agent's operating behavior or role responsibilities, used together with applicable shared rules and the context of its Assignment.

_Vietnamese_: Hướng dẫn vận hành.
_Avoid_: native model configuration, a Skill or workflow by default, authority grant

<a id="learned-knowledge"></a>

**Learned Knowledge**:
Reusable observations or lessons retained with their sources, scope and degree of certainty. It is distinct from authoritative project requirements and the recorded state of execution.

_Vietnamese_: Tri thức đúc rút dùng lại.
_Avoid_: transcript, execution journal, an unconfirmed hypothesis treated as a project rule
