# Mô hình tương tác và ownership yêu cầu

Thiết kế hiện hành • 2026-10-23 • [Mục lục](README.md).

## 1. Native chat và menu quản lý vòng đời agent

Người dùng chat trực tiếp trong Agent Session native Paseo; plugin không bắt buộc đi qua hai mục Project Chat / Harness Chat và không xây chat composer riêng. Menu quản lý dẫn quá trình: spawn Onboarding Agent để cấu hình ban đầu qua chat → onboarding xong cho phép spawn Harness Engineering Orchestrator để dựng Project Orchestrator → dựng xong có nút spawn Project Orchestrator.

Đó là ba hành động khởi chạy theo vòng đời, không phải ba loại màn chat. Đề xuất một chat router chung thay cho hai mục chat cũng không phải yêu cầu đã chốt. Đã có Session thì Open Session; tạo Session thay thế là Replace Session tường minh với Handover và chuyển authority. [Implementation specification](onboarding-implementation.md) quy định receipt, revision và reconcile; chưa có menu tích hợp production.

Hai orchestrator vẫn có trách nhiệm/inbox riêng như thiết kế: yêu cầu nghiệp vụ chi tiết với Project Orchestrator; dựng/cải tiến harness với Harness Engineering Orchestrator. Project thiếu năng lực thì tạo yêu cầu liên kết sang inbox harness; người dùng không sao chép yêu cầu thủ công giữa Sessions. Panel quản lý cấu hình, yêu cầu harness và quan sát; không nhận bắt buộc mọi task dự án.

## 2. Trách nhiệm và channel là hai trục độc lập

| Đối tượng thay đổi | Chủ trì | Kênh thường dùng |
| --- | --- | --- |
| Mục tiêu và quy tắc sản phẩm | Project Orchestrator | Chat dự án và nguồn yêu cầu đã chỉ định |
| Task, kế hoạch, tiêu chí và kết quả cụ thể | Project Orchestrator | Chat dự án |
| Năng lực, công cụ, workflow và phương pháp vận hành | Harness Engineering Orchestrator | Chat/inbox harness |
| Config, quyền, giới hạn và lịch vận hành | Quản trị harness trong quyền được cấp | Panel hoặc chat harness |

Phạm vi một task hay lâu dài là trục riêng. “Khách được đổi trả trong 30 ngày” vẫn là yêu cầu dự án dù áp dụng lâu dài. “Bổ sung công cụ browser” là yêu cầu harness. Mục tiêu bảo mật thuộc dự án có thể dẫn tới yêu cầu harness bổ sung security-review workflow; hai work item liên kết, không đổi chủ trì nghiệp vụ.

Chat diễn giải ý định và làm rõ yêu cầu; thao tác panel chỉnh giá trị có cấu trúc. Cả hai phải qua quyền, validation và revision của cùng interface sở hữu; UI không có quyền cao hơn chat. Quyết định lưu owner, scope, nguồn và revision khi cần; transcript không thay durable state.

## 3. Phép ánh xạ management / control / data planes

Khung tham chiếu phân biệt quản trị/quan sát, quyết định điều khiển và workload. Áp dụng vào Project Harness:

- **Management plane:** panel và interface quản trị cho config, quyền/giới hạn, schedule, inbox harness, monitor agent/run và evidence.
- **Control plane của Project Harness:** Harness Engineering Orchestrator và runtime dựng/duy trì/cải tiến năng lực; agent ra quyết định, code giữ invariant và recovery.
- **Project work plane:** workload dự án, tương ứng data plane trong phép so sánh. Project Orchestrator điều phối workflow/workers, vẫn chủ động ra quyết định trong phạm vi được cấp.

“Project work plane” là tên trong phép ánh xạ này. Planes không phải process/package, cũng không tương ứng một-một với orchestrator hoặc chat/UI. Các module phục vụ nhiều trách nhiệm; không sinh thêm module chỉ để khớp tên plane. Nguồn tại [research.md](research.md).

## 4. Phạm vi panel

Chat là native session Paseo; panel không triển khai composer/transcript, agent/log manager hoặc CRUD lịch agent native. Harness quản lý code jobs và lifecycle của công việc mình sở hữu. [paseo-boundary.md](paseo-boundary.md) quy định nơi quản lý duy nhất. Monitor giữ assignment và evidence của workflow, mở native surface để xem chi tiết.

Panel hỗ trợ:

- Quản lý bốn nhóm Agents/Limits/Actions/Automations theo [configuration.md](configuration.md); context/runtime kế thừa Paseo; agent definition editor trực tiếp thuộc Agents của harness. Danh mục agent là catalog có version để xem role/procedures/skills/principles và đề nghị cải tiến, agent definition editor là phần quản trị cần có; không thêm editor cho mọi workflow/evaluator/artifact.
- Gửi/theo dõi yêu cầu phía harness và mở chat liên quan.
- Monitor hoạt động: ai điều phối, worker hoạt động, bổ sung công cụ, chờ quyền/tài nguyên, chạm trần, retro và cải tiến đang theo dõi.
- Mở chi tiết agent, tool call, log, revision và evidence; điều khiển pause/resume/cancel đúng đối tượng.

Mặc định nhìn theo hoạt động vận hành, có liên kết agent/chat. Không dựng CRUD screen cho mọi yêu cầu nghiệp vụ, acceptance criterion hoặc quyết định sản phẩm. Tiến độ nghiệp vụ và thảo luận kết quả tiếp tục trong chat dự án.

Settings v1 có một scope kit và tìm kiếm; field hiện effective value, revision, quyền đổi, capability và ảnh hưởng. Chọn binding/version cho workflow/skill/code, hoặc mở chat harness để thay đổi definition; không biến mọi artifact sinh ra thành field chỉnh trực tiếp. Runtime usage/checkpoint/capability observed không là config để người dùng ghi đè.

## 5. Sửa yêu cầu và xử lý blocker

Project Orchestrator làm rõ thay đổi nghiệp vụ trong chat, phân biệt phạm vi task/project và thời điểm áp dụng. Run giữ revision đã pin; nếu chuyển thì tại checkpoint có kiểm tương thích, lịch sử và kiểm lại phần bị ảnh hưởng. Không âm thầm đổi tiêu chí hoặc viết lại verdict cũ.

Câu hỏi cần người quyết định có vấn đề cụ thể, nguồn/evidence, phương án đề xuất và công việc bị ảnh hưởng. Phần độc lập tiếp tục. Thiếu capability tạo yêu cầu liên kết sang harness; vượt quyền/giới hạn không tự được cấp chỉ vì agent đề nghị.
