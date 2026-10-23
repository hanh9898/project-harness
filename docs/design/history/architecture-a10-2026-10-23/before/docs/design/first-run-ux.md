# Luồng sử dụng từ khởi tạo đến closed loop

Thiết kế hiện hành • 2026-10-23 • [Mục lục](README.md). Đây là hành trình dùng chat và panel quản trị, không phải wizard nghiệp vụ. [prototype-spec.md](prototype-spec.md) định nghĩa màn hình/state trước khi dựng [prototype.html](prototype.html); installer và integration thật chưa triển khai.

## 1. Mở menu quản lý trong plugin

Plugin cung cấp một menu quản lý các bước onboarding và dựng/khởi chạy orchestrator. Tên menu **Orchestrators / Bộ điều phối** và các lifecycle actions đã chốt tại [UI glossary](../ui/GLOSSARY.md#orchestrators). Không dùng hai menu Project Chat / Harness Chat làm điểm vào bắt buộc; đây cũng không phải một router chat chung mới của plugin.

Paseo tiếp tục quản lý host/provider/project/workspace/native profiles và chat. Plugin dùng context/ref hiện có, chỉ hỏi hoặc hướng dẫn bổ sung phần thiếu; không dựng wizard cấu hình lại Paseo.

## 2. Spawn Onboarding Agent

Từ menu quản lý, người dùng chọn Onboarding Agent để spawn một Agent Session native Paseo và cấu hình khởi đầu dự án bằng hội thoại với AI. Đây là bước trước khi yêu cầu Harness Engineering Orchestrator bắt đầu dựng Project Orchestrator.

Onboarding Agent được cấp MCP Server để thiết lập mọi config cần thiết và hướng dẫn sử dụng plugin ngay trong chat, không chỉ xuất một tài liệu để người dùng nhập lại. MCP cấu hình harness và native intents qua owner API đã kiểm chứng/cấp quyền; native API thiếu thì hướng dẫn UI Paseo rồi đọc lại. Validation/state dùng chung với panel; contract/readiness checks cụ thể tại [onboarding-agent.md](onboarding-agent.md).

Onboarding tập trung vào context/cấu hình khởi đầu của bộ harness cho dự án. Yêu cầu nghiệp vụ chi tiết vẫn trao đổi với Project Orchestrator sau khi được dựng; không chuyển toàn bộ quy trình làm rõ task sản phẩm thành bước onboarding hoặc form UI.

Agent tự chọn mặc định phù hợp cho lựa chọn kỹ thuật thông thường và giải thích ngắn cấu hình đã dùng. Chỉ hỏi khi cần quyết định về mục tiêu, quyền hạn, ngân sách hoặc kết nối bên ngoài; không bắt trả lời từng trường. Người dùng có thể chỉnh qua chat hoặc Settings, trong phạm vi quyền đã cấp.

Cấu hình tối thiểu gồm repo/workspace, mục tiêu ban đầu của harness, native profile dùng cho orchestrator, nguồn Skills/Principles được phép và quyền/giới hạn tài nguyên ban đầu. Backlog, GitLab, lịch polling và agent chuyên môn có thể bổ sung sau; thiếu kết nối chỉ chặn chức năng phụ thuộc. Không bắt cấu hình mọi tính năng V1 ngay lần đầu. [Contract onboarding](onboarding-agent.md) phân biệt phạm vi đã chốt với checks chưa triển khai.

## 3. Spawn Harness Engineering Orchestrator

Sau khi onboarding hoàn tất, menu cho phép người dùng spawn Harness Engineering Orchestrator để dựng Project Orchestrator trên cấu hình/context đã chuẩn bị. Code kiểm cấu hình bắt buộc đủ để dựng; agent tóm tắt cấu hình, phần còn thiếu và hướng dẫn sử dụng, rồi menu mở nút Spawn để người dùng chủ động tiếp tục. Chat kết thúc Turn không tự đánh dấu hoàn tất; chưa đồng nhất readiness này với kiểm chứng vận hành dự án. Thứ tự check/commit/Handover/dispatch được đặc tả tại [implementation specification](onboarding-implementation.md); code production còn phải triển khai.

Harness Engineering Orchestrator vẫn là thành phần phát triển/cải tiến harness đã thiết kế. Bước onboarding không tự gộp nó với Onboarding Agent hoặc thêm một orchestrator vận hành lâu dài thứ ba.

Ở lượt dựng đầu tiên, nó khảo sát repo rồi chuẩn bị Project Orchestrator với hướng dẫn/context/công cụ, Agent Catalog ban đầu, Skills/Principles và Delegation Policy, những workflow cần cho mục tiêu ban đầu, các lịch vận hành/daily retro và cơ chế tiếp nhận cải tiến. Chỉ kích hoạt phần đủ cấu hình và nằm trong quyền đã cấp; năng lực khác bổ sung theo công việc thực tế.

## 4. Spawn Project Orchestrator

Code mở nút spawn Project Orchestrator khi đã kiểm cấu hình, các tham chiếu và công cụ bắt buộc của Project Orchestrator hợp lệ, đồng thời lưu được bản bàn giao. Các phần chưa sẵn sàng được nêu rõ; không cần chờ dựng hết mọi workflow hoặc mọi agent chuyên môn. Các checks và bàn giao theo [contracts](onboarding-contracts.md) và [implementation specification](onboarding-implementation.md); chưa có implementation production.

Người dùng mở native Agent Session để trao đổi công việc dự án. Phân biệt “đã dựng/có thể khởi chạy” với “đã kiểm chứng năng lực thực hiện công việc đại diện”; bước kiểm chứng công việc thực tế diễn ra sau khi khởi chạy.

Ba bước trên là các hành động vòng đời agent trong menu quản lý, không phải ba màn chat riêng của plugin. Lần đầu là Spawn; đã có Session thì Open Session. Tạo Session mới là hành động chuyển giao vai trò riêng: lưu bàn giao, đối soát công việc đang chạy rồi chuyển quyền điều phối. Session cũ giữ lịch sử nhưng không tiếp tục phát việc dưới vai trò đó; không mặc định hủy worker đang chạy. Protocol và enforcement còn cần triển khai/kiểm chứng.

## 5. Khám phá yêu cầu trong chat dự án

Người dùng trao đổi sản phẩm, mục tiêu, quy tắc, task và tiêu chí trực tiếp với Project Orchestrator sau bước dựng/khởi chạy. V1 khảo sát codebase hiện có từ nguồn đã cấp; luồng ý tưởng đến repo rỗng nằm ngoài V1. Project Orchestrator giữ cuộc trao đổi/context xuyên suốt, không chờ harness khám phá hết nghiệp vụ rồi mới bàn giao.

Thư mục/provider kế thừa tham chiếu từ Paseo; chỉ chọn binding còn thiếu. Việc khám phá dùng hội thoại và bản tóm tắt hiểu biết chỉnh được trong cuộc trao đổi; không bắt điền form task hoặc acceptance criterion. Chỉ hỏi điều chưa biết, lưu nguồn/revision và nêu phần còn thiếu.

## 6. Phát triển năng lực và cấu hình quyền

Project Orchestrator yêu cầu harness bổ sung workflow, skills, tools, context và evals cần thiết. Harness Engineering Orchestrator khảo sát nền kỹ thuật, dựng các năng lực và trả kết quả theo work item liên kết. Người dùng vẫn giữ đầu mối nghiệp vụ trong chat dự án; có thể chat harness để yêu cầu cải tiến.

Khi cần, panel giải thích policy của harness bằng hành động: đọc repo, sửa trong worktree, chạy kiểm thử, truy cập dịch vụ, push/tạo PR. Hệ thống đề xuất phạm vi theo nhu cầu; người dùng chỉnh trước khi chạy. Worker/thời gian/budget khi đo được và timezone/lịch retro là config có cấu trúc. Giá trị gợi ý chưa tự active.

Hệ thống tự làm trong quyền/giới hạn đã cấp. Thiếu quyền hoặc capability bắt buộc chặn phần phụ thuộc và nêu lý do; không tự tăng quyền hoặc ngân sách.

## 7. Thực hiện công việc kiểm chứng ban đầu

Project Orchestrator gợi ý 2–3 công việc đại diện, giải thích năng lực sẽ kiểm, thay đổi dự kiến và nguồn lực cần có. Người dùng chọn hoặc nhập việc khác; việc lớn được đề xuất thu nhỏ thành phần có kết quả kiểm được.

Ví dụ trong V1 là sửa một lỗi cụ thể hoặc hoàn thành một lát cắt chức năng có thể kiểm trên codebase hiện có. Đây là công việc đại diện để kiểm năng lực, không phải workflow duy nhất của harness.

Harness chuẩn bị năng lực, Project Orchestrator thực hiện trong phạm vi cô lập và bàn giao kết quả cùng evidence. Không mặc định publish/merge hoặc tạo PR thật chỉ để kiểm công cụ. Chưa đạt tiêu chí bắt buộc thì chưa công nhận năng lực tương ứng sẵn sàng; sửa và thử lại phần liên quan.

Sau khi đạt, đưa bản đã kiểm chứng và lịch được người dùng chọn vào vận hành, với trạng thái activation/sync rõ. Người dùng tiếp tục cùng chat dự án, không kể lại yêu cầu. Việc dựng hệ thống vẫn tiếp tục qua các task sau.

## 8. Làm việc thường ngày

Người dùng giao việc, làm rõ yêu cầu, bổ sung tiêu chí và trao đổi kết quả trong chat dự án. Không cần chọn pattern hoặc chia worker. Project Orchestrator chọn/ghép workflow và điều phối trong giới hạn runtime.

Panel monitor hiển thị hoạt động vận hành và điều gì cần người dùng xử lý, phân biệt đang làm/chờ/bị chặn/offline. Mỗi hoạt động mở được agent/chat/evidence; chi tiết worker/tool/log nằm sau thao tác mở sâu. Panel không thay hội thoại nghiệp vụ bằng một bảng task bắt buộc.

Thiếu năng lực tạo yêu cầu liên kết sang inbox harness. Việc độc lập tiếp tục; người dùng không phải chuyển thông tin thủ công giữa hai cuộc chat.

## 9. Cải tiến và quản trị

Người dùng trao đổi yêu cầu phát triển harness trong chat harness hoặc gửi qua inbox harness trên panel. Panel chỉnh config/quyền/giới hạn/lịch và đọc lịch sử, còn Harness Engineering Orchestrator phân tích, kiểm và áp dụng cải tiến trong phạm vi đã cấp.

Daily retro dùng outcomes/traces để chọn vấn đề, lập hypothesis, thử candidate, eval/regression và theo dõi sau activation. Có thể kết luận chưa đủ bằng chứng để đổi. Cải tiến tác động chính harness và Project Orchestrator; không tự đổi mục tiêu nghiệp vụ.

Lịch agent native được chỉnh tại Paseo, code jobs đồng bộ/polling được chỉnh tại harness; harness hiển thị nguồn đã gắn, policy xử lý workflow và delivery cùng WorkRef. “Dừng lịch” chặn lượt sau; “Dừng công việc” tác động lượt đã nhận. Không yêu cầu người dùng duyệt mọi thay đổi đã qua kiểm chứng trong quyền được cấp.

## 10. Khi có gián đoạn

| Tình huống | Người dùng thấy và làm |
| --- | --- |
| Provider/host offline | Trạng thái đã nhận/chờ và lần đối soát gần nhất; không giả báo đang chạy |
| Reload/reconnect | Trở lại đúng bộ/dự án, chat, work và checkpoint; không nhập lại hoặc tự tạo agent thay thế |
| Cần quyết định | Câu hỏi, nguồn/evidence, đề xuất và ảnh hưởng; trả lời trong chat thích hợp, có kiểm revision |
| Chạm trần | Lý do và lựa chọn tiếp tục trong quyền người dùng; không tự tăng giới hạn |
| Run/kiểm chứng lỗi | Bằng chứng, phần chưa đạt và bước xử lý; không đổi thành hoàn thành giả |
| Plugin update lỗi | Hướng dẫn dùng recovery executable độc lập với bản và dữ liệu tương thích cho operation đó; panel lỗi không là đường duy nhất |

Module ownership và ordering nằm tại [modules.md](modules.md); điều kiện nghiệm thu nằm tại [verification.md](verification.md).
