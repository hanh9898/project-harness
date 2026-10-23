# Agent catalog and delegation policy

Phỏng vấn thiết kế, 2026-10-22. [Nghiên cứu Managed Agents](claude-managed-agents-sources.md) · [Cấu hình](configuration.md) · [Glossary](../../GLOSSARY.md).

## Đã chốt — vòng 1

- Một Agent Catalog dùng chung trong một bộ Project Harness. Catalog mô tả các Agent Definitions/năng lực có thể lựa chọn; không phải danh sách Sessions đang chạy.
- Mỗi orchestrator có Delegation Policy riêng, xác định được giao việc cho Agent Definitions nào. Có trong catalog không có nghĩa mọi orchestrator đều được sử dụng.
- Ba cách dùng được phân biệt: Delegate giao phần việc cho worker và nhận Outcome; Consult xin ý kiến để bên hỏi tiếp tục chịu trách nhiệm thực hiện; Workflow để code phối hợp nhiều bước/agents, nhánh/vòng lặp và điều kiện dừng.
- Một Agent Definition có thể dùng trong nhiều cách; không tạo ba bản agent chỉ vì cách gọi khác. Cách dùng nào được phép cần biểu đạt trong policy/contract; chưa chốt schema.
- Khi thực thi, ưu tiên definitions đã đăng ký. Thiếu năng lực thì tạo yêu cầu cho Harness Engineering Orchestrator xây/sửa definition qua candidate → kiểm → activation.
- Luồng xây/sửa definition có thể tự động trong quyền đã cấp; không bắt người dùng duyệt mọi definition mới. Không dùng nó để tự tăng quyền/budget.
- Agent tạm ngoài catalog mặc định chưa được phép; chỉ mở bằng policy tường minh. Đăng ký definition mới không có nghĩa tự cấp cho mọi orchestrator quyền gọi nó.

Các quyết định này không yêu cầu chuyển sang Anthropic hosted runtime hoặc nhân đôi native Paseo profile editor. Model/mode/options vẫn thuộc native profiles, harness tham chiếu refs như đã chốt.

## Đã chốt — vòng 2

- Worker mặc định không tự tạo agent con. Nó đề xuất chia việc về orchestrator hoặc trả kế hoạch để Workflow Runtime thực hiện. Chỉ Agent Definitions được cấp quyền tường minh mới delegate tiếp; nhánh mới vẫn qua admission chung.
- Quy tắc trên không giới hạn khả năng lồng workflow bằng code. Cấu trúc composition và quyền một agent tự delegate là hai vấn đề khác nhau.
- Consult tạo ý kiến/findings/phương án; không nhận quyền sửa code dự án hoặc push/merge/release. Bên hỏi chịu trách nhiệm bước tiếp theo; muốn specialist thực hiện thay đổi thì tạo Assignment theo Delegate hoặc Workflow.
- Phạm vi Consult phải kiểm qua adapter/runtime; không xem prompt “chỉ tư vấn” là bằng chứng quyền đã bị thu hẹp. Cách kiểm với từng provider còn cần thiết kế/thử.
- V1 dùng chung giới hạn tài nguyên toàn bộ harness. Cả hai orchestrator, workers và consultations đều tính vào tài nguyên dùng chung; không tự có quota ngoài trần vì cách gọi khác.
- Slot worker phân biệt với slot orchestrator để hai orchestrator không chiếm hết chỗ thực thi. Chưa chốt số slot hoặc cơ chế giữ chỗ/chống starvation cụ thể.
- Chỉ thêm giới hạn riêng theo role khi có nhu cầu; không yêu cầu người dùng điền quota cho từng Agent Definition.

## Đã chốt — vòng 3

- Harness Engineering Orchestrator được tạo candidate sửa catalog/policy và tự áp dụng trong phạm vi quyền đã cấp. Mở rộng quyền, như cho worker delegate tiếp hoặc gọi agent có quyền cao hơn, cần quyết định của người vận hành.
- Không bắt duyệt tay từng specialist mới nếu nó vẫn nằm trong phạm vi đã cho phép. Phạm vi này cần có phép kiểm của runtime; thay tên/definition không được dùng để lách authority.
- Mỗi Assignment nhận nhiệm vụ, inputs cần thiết, quyết định liên quan, tiêu chí và cấu hình đã pin; không tự động nhận toàn bộ hội thoại orchestrator. Worker có thể yêu cầu context bổ sung.
- Đóng gói context không phải cô lập filesystem/Skill discovery; quyền truy cập vẫn cần cơ chế tương ứng và không bị nới bởi yêu cầu bổ sung context.
- Project Orchestrator thiếu specialist tạo yêu cầu liên kết sang Harness Engineering Orchestrator, chỉ rõ năng lực thiếu và công việc bị chặn; yêu cầu trùng được gộp.
- Harness Engineering Orchestrator không giải quyết được trong authority/tài nguyên hiện tại thì tạo yêu cầu quyết định cho người dùng, không trả việc qua lại giữa hai orchestrator vô hạn. Phần việc độc lập tiếp tục.

## Đã chốt — vòng 4

- Assignment giữ policy revision đã chọn; thay đổi mở rộng quyền chỉ áp cho lượt mới. Khi người vận hành thu hồi quyền, runtime kiểm lại trước hành động tiếp theo và chặn phần không còn được phép.
- Provider không hỗ trợ thu hẹp quyền giữa phiên thì cần dừng hoặc chuyển phiên phù hợp; không hứa thu hồi tác động đã xảy ra. Cách thực hiện cần kiểm adapter, không mặc định native API đã đáp ứng.
- Kết quả về sau timeout/giao lại vẫn được giữ cùng Evidence để đối soát, nhưng không tự ghi đè Assignment/Attempt hiện hành. Trước retry/fallback phải kiểm tác động thực tế của lượt cũ.
- Timeout là hết khả năng chờ theo hạn, không chứng minh worker đã dừng. Identity của Assignment/Attempt và ownership khi nhận kết quả phải được implementation kiểm.
- Worker được delegate tiếp chỉ giao phần việc/quyền trong phạm vi Assignment cha và chọn từ definitions được phép, vẫn tính ngân sách chung. Runtime phải kiểm effective quyền của agent con, không chỉ dựa quyền mặc định trong definition.
- Agent cha tổng hợp Outcome; orchestrator vẫn chịu trách nhiệm giải quyết yêu cầu và đánh giá kết quả. Delegation không tăng authority hoặc tạo quota ngoài trần.

## Đã chốt — vòng 5

- Mỗi entry trong Delegation Policy chỉ rõ Agent Definition được phép dùng và modes được phép. Có trong allowlist không mặc định được dùng đủ Delegate/Consult/Workflow.
- Cùng một definition có thể được policy của các caller cho phép dùng khác nhau. Modes của từng entry không tự cấp tool permissions hoặc quyền delegate tiếp.
- Tên UI tiếng Anh **Agent Catalog** đã chốt thay cho đề xuất Agent Team: màn quản lý Agent Definitions/năng lực, role, when-to-use, procedures, Skills, Principles và result contract.
- Delegation Policy chỉnh theo từng orchestrator trong phần cấu hình của nó, tách khỏi catalog năng lực chung. Nhãn VI đã chốt ở vòng 6 bên dưới.
- Editor V1 hiển thị chính: allowed Agent Definitions; modes theo definition; bản tóm tắt quyền/giới hạn hiệu lực và lỗi cấu hình.
- Quyền delegate tiếp và tạo agent tạm nằm trong Advanced. Budgets dùng cấu hình chung, không yêu cầu nhập lại cho từng policy/definition. Chưa khẳng định adapter đã hỗ trợ các tùy chọn Advanced.

## Đã chốt — vòng 6: Vietnamese equivalents

- Agent Catalog → **Danh mục agent**.
- Delegation Policy → **Chính sách giao việc**.
- Delegate → **Giao việc**; Consult → **Tham vấn**; Workflow (mode) → **Trong luồng công việc**.
- Workflow mode cho phép dùng agent trong program điều phối, không tự cấp quyền để worker khởi tạo workflow hoặc delegate tiếp. UI Language sở hữu mapping nhãn và phạm vi.

## Đang mở

- Schema/validation cho allowed definitions và modes; điều kiện thực thi delegate tiếp.
- Cưỡng chế Consult trên provider/host; cách phân slot và đo/enforce từng loại tài nguyên.
- Nơi lưu/pin/evaluate policy và cách nhận diện thay đổi mở rộng authority; protocol revoke/stop/chuyển phiên theo provider.
- Chi tiết context/result contract và identity của yêu cầu bổ sung/escalation; lưu/đối soát kết quả về muộn.
- Tooltip/state labels của editor; schema/implementation tương ứng với các nhãn đã chốt.

## Quan hệ với runtime và UI

Workflow Runtime vẫn giữ cấu trúc thực thi, admission, durability và Evidence/Verdict. Việc tên Consult/Delegate xuất hiện trong instructions không tự cưỡng chế quyền. Chưa có triển khai/API Paseo hoặc ca kiểm cho policy mới.

Không thêm nhóm settings thứ năm. Editor theo phần chính/Advanced như vòng 5, Delegation Policy thuộc cấu hình của orchestrator. HTML chưa đổi theo các quyết định delegation này; prototype hiện chưa có Delegation Policy runtime thật. Tên UI Agent Catalog và nhãn VI Danh mục agent đã chốt; Delegation Policy và các modes cũng có nhãn VI ở vòng 6. UI hiện chưa được đồng bộ.

## Đã chốt — GA01: Assignment identity

[Quyết định GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance) xác định Assignment là một lần giao việc cụ thể. Retry/fallback thực sự giao lại việc tạo Assignment mới, ngay cả trên cùng Session; retry kỹ thuật có Attempt mới trong cùng Step Run. Giữ liên kết predecessor, recipient, cấu hình/quyền được ghi nhận và Outcome riêng; quyền hiệu lực vẫn được kiểm theo grant/revocation hiện hành.

Mất response chỉ tiếp tục đối soát cùng Attempt/Assignment. Clarification hoặc các Turns tiếp theo vẫn cùng Assignment. Kết quả muộn giữ identity gốc, không tự ghi đè lượt mới; reuse phải đáp ứng K57. Replace Session orchestrator không tự đổi/cancel/rebind các worker Assignments đang chạy. GA01 đóng phần identity này; schema, concurrency và native enforcement vẫn là thiết kế/kiểm chứng tiếp theo.
