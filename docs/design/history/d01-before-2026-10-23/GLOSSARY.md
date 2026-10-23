# Project Harness — Common Language

Ngôn ngữ chung của sản phẩm; chỉ ghi các nghĩa đã xác nhận. Dùng [GLOSSARY-MAP.md](GLOSSARY-MAP.md) để tìm glossary theo nhóm nghiệp vụ, nhãn UI và cách gọi trong code.

## Language

<a id="onboarding-agent"></a>

**Onboarding Agent**:
Agent được cấp MCP Tools để thiết lập cấu hình khởi đầu dự án/harness và hướng dẫn sử dụng plugin qua hội thoại native Paseo, trước bước khởi chạy Harness Engineering Orchestrator để dựng Project Orchestrator. Vai trò này khác công việc nghiệp vụ chi tiết do Project Orchestrator chủ trì.
_Avoid_: Project Orchestrator, Harness Engineering Orchestrator mặc định, wizard form bắt buộc

<a id="agent-catalog"></a>

**Agent Catalog**:
Catalog dùng chung của Project Harness mô tả các Agent Definitions và năng lực có thể lựa chọn. Nó không phải danh sách Agent Sessions đang chạy và không tự cấp quyền sử dụng mọi definition cho mọi orchestrator.
_Avoid_: danh sách agent đang chạy, quyền delegation mặc định

<a id="delegation-policy"></a>

**Delegation Policy**:
Policy của một orchestrator xác định Agent Definitions nó được sử dụng và các cách sử dụng được phép. Delegation Policy khác mô tả năng lực trong Agent Catalog và không tự thay thế authority hay giới hạn thực thi.
_Avoid_: Agent Catalog, mọi agent có trong catalog đều được phép gọi, tool permissions của provider

<a id="paseo-agent-profile"></a>

**Paseo Agent Profile**:
Profile native do Paseo quản lý, tập hợp các thiết lập khởi chạy agent như provider, model, thinking, mode và các tùy chọn được hỗ trợ.
_Avoid_: Agent Definition, bộ Skills hoặc Principles của agent

<a id="agent-role"></a>

**Agent Role**:
Trách nhiệm được giao cho agent, xác định loại công việc nó tiếp nhận, tình huống được giao việc và kết quả phải bàn giao. Thay đổi cấu hình thực thi không tự thay đổi trách nhiệm của Role.
_Avoid_: Agent Definition, Paseo Agent Profile, model hoặc bộ Skills

<a id="agent-definition"></a>

**Agent Definition**:
Cấu hình agent do Paseo Plugin của dự án quản lý, tham chiếu các Paseo Agent Profile theo thứ tự chính và fallback, đồng thời chỉ định Skills và chính sách chọn Principles. Skills được nêu tường minh khi giao việc, không yêu cầu giới hạn catalog của Agent Session. Các thiết lập provider/model được lấy từ profile native được tham chiếu.
_Avoid_: Paseo Agent Profile, một agent đang chạy, bản sao cấu hình provider/model native

<a id="skill"></a>

**Skill**:
Gói hướng dẫn, phương pháp và tài nguyên giúp agent biết cách thực hiện một loại công việc. Skill có thể kèm scripts, references hoặc assets; việc đọc hướng dẫn và thực thi hành động là các hoạt động khác nhau.
_Avoid_: Tool, chỉ riêng một lệnh thực thi

<a id="principle"></a>

**Principle**:
Nguyên tắc định hướng cách agent suy luận, lựa chọn và đánh giá quyết định. Principle cung cấp căn cứ ra quyết định, còn Skill cung cấp phương pháp thực hiện công việc; việc đóng gói một Principle thành Skill không làm mất sự phân biệt về vai trò này.
_Avoid_: Tool, đồng nhất Principle với toàn bộ quy trình của một Skill

<a id="tool"></a>

**Tool**:
Khả năng agent có thể gọi để thực hiện một hành động hoặc lấy kết quả từ môi trường. CLI command, MCP tool hoặc interface khác có thể cung cấp cách gọi khả năng đó.
_Avoid_: Skill, đồng nhất Tool với riêng MCP server hoặc CLI

<a id="workflow-runtime"></a>

**Workflow Runtime**:
Thành phần thực thi workflow theo cấu trúc và quy tắc đã định, chịu trách nhiệm chuyển bước, phối hợp chạy song song, lưu điểm tiếp tục, thử lại và khôi phục. Trong dự án này, Workflow Runtime nằm bên trong Paseo Plugin và thực hiện các quyết định của agent trong phạm vi workflow cho phép.
_Avoid_: Orchestrator Agent, Workflow Definition, mặc định là một CLI, MCP server hoặc tiến trình riêng

<a id="project-orchestrator"></a>

**Project Orchestrator**:
Thành phần đảm nhiệm điều phối công việc của dự án bên trong Project Harness, gồm Orchestrator Agent cùng cơ chế quản lý hàng việc và thực thi workflow. Thành phần này có hàng việc và vòng đời riêng, không đồng nhất với phiên làm việc của agent bên trong.
_Avoid_: Project Harness, Orchestrator Agent, toàn bộ hệ thống được tạo ra cho dự án

<a id="orchestrator-agent"></a>

**Orchestrator Agent**:
Agent đảm nhiệm phần suy luận và ra quyết định bên trong một orchestrator, như làm rõ yêu cầu, lập kế hoạch và giao việc. Trong dự án này, cả Project Orchestrator và Harness Engineering Orchestrator đều có Orchestrator Agent; trạng thái công việc không chỉ nằm trong Agent Session của nó.
_Avoid_: toàn bộ orchestrator, Workflow Run, cơ chế thực thi workflow

<a id="initial-project-orchestrator"></a>

**Initial Project Orchestrator**:
Trạng thái ban đầu của Project Orchestrator, được dựng để tiếp nhận và khám phá yêu cầu trực tiếp với người dùng rồi phát triển thêm năng lực qua harness. Đây vẫn là cùng vai trò chủ trì công việc dự án, không phải một orchestrator thứ ba.
_Avoid_: demo agent, Project Orchestrator đã kiểm chứng mọi năng lực

<a id="harness-engineering-orchestrator"></a>

**Harness Engineering Orchestrator**:
Thành phần bên trong Project Harness điều phối việc xây dựng, kiểm chứng và cải tiến chính harness đó, bao gồm việc dựng Project Orchestrator. Nó gồm Orchestrator Agent cùng cơ chế quản lý và thực thi công việc phát triển harness, sử dụng phản hồi vận hành cùng các lượt retro để tổ chức cải tiến.
_Avoid_: orchestrator chung, Project Orchestrator

<a id="loi-harness"></a>

**Lõi harness**:
Phần năng lực nền không mang các quy tắc chuyên biệt của dự án đích. Một thay đổi phục vụ quy tắc riêng của dự án không mặc nhiên trở thành thay đổi của lõi.
_Avoid_: Project Harness, bộ quy tắc dự án

<a id="paseo-plugin"></a>

**Paseo Plugin**:
Phần mở rộng của Paseo dùng để triển khai Project Harness trong dự án này.
_Avoid_: Harness Plugin như một loại thành phần riêng, một platform riêng mặc định

<a id="project-harness"></a>

**Project Harness**:
Hệ thống được xây dựng cho một dự án cụ thể, gồm Project Orchestrator, Harness Engineering Orchestrator, cùng các workflow, tools, skills và năng lực liên quan. Đây là toàn bộ hệ thống đầu ra được tạo cho dự án, bao gồm cả khả năng thực hiện công việc lẫn phát triển cách thực hiện.
_Avoid_: Project Orchestrator, một agent riêng lẻ, chỉ riêng bộ skills

<a id="tieu-chi-anh-gia"></a>

**Tiêu chí đánh giá**:
Một yêu cầu hoặc mục tiêu có phạm vi áp dụng và cách đánh giá rõ ràng, dùng để đánh giá kết quả dự án hoặc hiệu quả vận hành harness. Tiêu chí có thể được làm rõ và thay đổi trong trao đổi với bên chủ trì tương ứng; kết quả cũ giữ lại tiêu chí đã dùng khi đánh giá.
_Avoid_: lời nhắc không được theo dõi, chỉ số mặc định bất biến

<a id="tieu-chi-ket-qua-du-an"></a>

**Tiêu chí kết quả dự án**:
Tiêu chí xác định sản phẩm hoặc công việc dự án phải đạt điều gì, áp dụng cho toàn dự án hoặc một workflow/task cụ thể.
_Avoid_: tiêu chí hiệu quả harness, yêu cầu vận hành không phân biệt với đầu ra

<a id="tieu-chi-van-hanh-harness"></a>

**Tiêu chí vận hành harness**:
Tiêu chí đánh giá hiệu quả điều phối, gồm chất lượng vận hành, thời gian, chi phí và mức cần người can thiệp, với phạm vi áp dụng được xác định.
_Avoid_: tiêu chí nghiệm thu sản phẩm, chỉ số tối ưu không gắn mục tiêu

<a id="yeu-cau-quyet-inh"></a>

**Yêu cầu quyết định**:
Một vấn đề cần người dùng chốt để phần việc liên quan có thể tiếp tục, kèm câu hỏi cụ thể, bằng chứng và phương án đề xuất. Quyết định được lưu cùng bối cảnh công việc.
_Avoid_: thông báo tiến độ, lỗi đã tự xử lý

## Các định nghĩa đã chuyển

- [Execution](docs/domain/execution/GLOSSARY.md): yêu cầu dự án, Workflow/Definition/Run, Agent Session/Turn/Loop và context.
- [Automation](docs/domain/automation/GLOSSARY.md): Job và Schedule.
- [Evolution](docs/domain/evolution/GLOSSARY.md): yêu cầu/inbox harness, daily retro và Improvement Loop.
- [Engineering](docs/engineering/GLOSSARY.md): CLI và MCP Server.
