# Execution

Ngôn ngữ về yêu cầu, thực thi workflow và phiên làm việc của agent. Các định nghĩa được chuyển nguyên nghĩa từ glossary gốc.

[Glossary Map](../../../GLOSSARY-MAP.md) · [Ngôn ngữ chung](../../../GLOSSARY.md)

## Language


<a id="work-item"></a>

**Work Item**:
Một yêu cầu cần giải quyết, được theo dõi từ lúc tiếp nhận tới kết quả cuối. Một Work Item có thể chưa có Workflow Run hoặc có nhiều Workflow Runs xử lý toàn bộ hay một phần yêu cầu; kết quả một Run không tự quyết định Work Item đã được giải quyết.
_Avoid_: Workflow Run, Agent Turn, Activity như một entity nghiệp vụ

<a id="yeu-cau-cong-viec-du-an"></a>

**Yêu cầu công việc dự án**:
Yêu cầu về sản phẩm, công việc hoặc kết quả cần đạt của dự án, được người dùng trao đổi trực tiếp với Project Orchestrator. Phạm vi có thể là một công việc hoặc quy tắc dự án lâu dài.
_Avoid_: yêu cầu cấu hình harness, mọi yêu cầu đều qua inbox harness

<a id="cong-viec-kiem-chung-ban-au"></a>

**Công việc kiểm chứng ban đầu**:
Một công việc đại diện do người dùng chọn để chứng minh hệ thống thực hiện được nhu cầu của dự án trước khi hoàn tất thiết lập. Kết quả có tiêu chí và bằng chứng; năng lực chưa được kiểm chứng vẫn được phân biệt rõ.
_Avoid_: demo cấu hình, kiểm tra kết nối công cụ

<a id="agent-session"></a>

**Agent Session**:
Một phiên làm việc của agent, có lịch sử hội thoại và ngữ cảnh riêng, có thể tiếp tục qua nhiều lượt trao đổi. Một Workflow Run có thể sử dụng nhiều Sessions của orchestrator và workers.
_Avoid_: Agent Definition, Agent Turn, Workflow Run

<a id="agent-turn"></a>

**Agent Turn**:
Một lượt agent xử lý đầu vào, có thể gồm nhiều lần gọi model và Tools trước khi trả lời hoặc dừng xử lý. Việc kết thúc Turn không tự xác định Workflow Run đã hoàn thành.
_Avoid_: Agent Session, Workflow Run, một lần gọi model riêng lẻ

<a id="agent-loop"></a>

**Agent Loop**:
Vòng xử lý trong đó model quyết định hành động, gọi Tools khi cần, nhận kết quả rồi tiếp tục cho tới khi trả lời hoặc dừng. Vòng này diễn ra trong một Agent Turn và không đồng nhất với vòng cải tiến harness.
_Avoid_: Improvement Loop, Schedule, toàn bộ Workflow Run

<a id="workflow"></a>

**Workflow**:
Một luồng công việc có cấu trúc và quy tắc thực thi xác định, có thể ghép các pattern prompt chaining, routing, parallelization, orchestrator-workers và evaluator-optimizer theo thứ tự, song song hoặc lồng nhau. Các quyết định của agent bên trong luồng được thực hiện trong phạm vi mà cấu trúc và quy tắc đó cho phép.
_Avoid_: skill điều phối, một prompt dài

<a id="workflow-definition"></a>

**Workflow Definition**:
Bản mô tả luồng thực thi, gồm các bước, điều kiện rẽ nhánh, chạy song song, vòng lặp và quy tắc dừng. Definition xác định cách phối hợp công việc và cách kết quả của một bước ảnh hưởng tới bước tiếp theo.
_Avoid_: Workflow Run, Skill hướng dẫn một công việc, phiên chat

<a id="workflow-run"></a>

**Workflow Run**:
Một lần thực hiện Workflow Definition với đầu vào cụ thể để xử lý toàn bộ hoặc một phần Work Item, có định danh, trạng thái, kết quả và bằng chứng riêng. Kết quả của Run được đánh giá theo đúng các tiêu chí đã áp dụng cho nó; Run hoàn thành không tự xác định Work Item đã được giải quyết.
_Avoid_: Workflow Definition, lượt chat của agent

<a id="assignment"></a>

**Assignment**:
Một lần giao phần việc cụ thể cho một agent, gắn nhiệm vụ, context, tiêu chí và cấu hình đã chọn. Một Agent Session có thể nhận nhiều Assignments; giao việc chưa đồng nghĩa agent đã thực thi hoặc đạt yêu cầu.
_Avoid_: Agent Session, Agent Definition, kết quả đã đạt mặc định

<a id="attempt"></a>

**Attempt**:
Một lần thử thực thi một Step Run với đầu vào, yêu cầu và định danh riêng; sự tồn tại của Attempt chưa chứng minh worker đã bắt đầu hoặc hoàn thành. Thử lại sau lỗi kỹ thuật tạo Attempt mới, không mặc định tạo vòng sửa chất lượng mới.
_Avoid_: Quality Iteration, yêu cầu bị chặn trước khi được phép thực thi, toàn bộ Workflow Run, Agent Turn mặc định

<a id="quality-iteration"></a>

**Quality Iteration**:
Một vòng sửa kết quả theo phản hồi đánh giá. Mỗi Quality Iteration có thể cần nhiều Attempts và khác với thử lại sau lỗi kỹ thuật.
_Avoid_: Attempt, technical retry, một lần gọi model mặc định

<a id="outcome"></a>

**Outcome**:
Kết quả thực tế của một lượt thực thi, gồm đầu ra, lỗi, phần việc còn lại và các căn cứ liên quan; Outcome tổng hợp giữ tham chiếu tới kết quả từng nhánh và phiên bản đầu vào/tiêu chí áp dụng. Outcome chưa tự là Verdict đánh giá kết quả đó theo tiêu chí; worker tự báo xong chưa thay được Verdict.
_Avoid_: Verdict, kết luận đạt tiêu chí mặc định, trạng thái agent idle

<a id="checkpoint"></a>

**Checkpoint**:
Trạng thái thực thi đã lưu, đủ để đối soát và xác định cách tiếp tục công việc sau gián đoạn. Nó không chỉ là bản tóm tắt của agent và không có nghĩa mọi thao tác trước đó được phép chạy lại.
_Avoid_: bản tóm tắt hội thoại, cho phép replay mọi tác động trước đó

<a id="artifact"></a>

**Artifact**:
Một đầu ra hoặc tài nguyên có thể tham chiếu và xác định phiên bản, như patch, báo cáo, log hoặc ảnh chụp. Sự tồn tại của Artifact không tự chứng minh một nhận định hoặc tiêu chí đã đạt.
_Avoid_: Evidence mặc định, kết luận đạt mặc định

<a id="evidence"></a>

**Evidence**:
Thông tin được dùng làm căn cứ cho một nhận định hoặc kết luận, gắn với nguồn, phiên bản và phạm vi đánh giá. Evidence có thể tham chiếu một hoặc nhiều Artifacts; nội dung phải hỗ trợ đúng nhận định hoặc tiêu chí đang xét.
_Avoid_: mọi Artifact mặc định, lời agent tự báo thành công không có căn cứ

<a id="goi-context"></a>

**Gói context**:
Phần ngữ cảnh được chọn cho một vai trò và bước thực thi, gồm nhiệm vụ, nguồn liên quan, quyết định, artifact đầu vào và tiêu chí đánh giá. Mỗi gói giữ dấu nguồn và phiên bản để truy vết hoặc bàn giao.
_Avoid_: toàn bộ lịch sử chat, prompt không rõ nguồn

<a id="nguon-yeu-cau-du-an"></a>

**Nguồn yêu cầu dự án**:
Nguồn được người dùng chỉ định làm căn cứ cho mục tiêu và yêu cầu dự án. Quyết định cải tiến cách thực thi của harness không tự thay thế yêu cầu trong những nguồn này.
_Avoid_: thiết kế harness, giả định chưa được xác nhận

<a id="workflow-step"></a>

**Workflow Step**:
Một bước trong Workflow Definition, có thể được đi tới nhiều lần trong cùng một Workflow Run. Workflow Step mô tả vị trí trong luồng, không phải một lần thực thi cụ thể.
_Avoid_: Step Run, Attempt

<a id="step-run"></a>

**Step Run**:
Một lần Workflow Run đi tới một Workflow Step, có định danh riêng và có thể gồm nhiều Attempts khi thử lại do lỗi kỹ thuật. Quay lại cùng Workflow Step sau một vòng sửa kết quả tạo Step Run mới.
_Avoid_: Workflow Step, Attempt, toàn bộ Quality Iteration

<a id="join-policy"></a>

**Join Policy**:
Quy tắc xác định những nhánh cần chờ, khi nào danh sách nhánh đã chốt và điều kiện để tổng hợp hoặc tiếp tục một bước workflow. Join Policy phân biệt việc có đủ kết quả bắt buộc với kết luận chất lượng và quy định cách xử lý nhánh thất bại.
_Avoid_: Verdict, kết quả một worker, trạng thái toàn bộ Work Item
