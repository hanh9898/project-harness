# Onboarding Agent and configuration MCP Server

Quy tắc sản phẩm đã chốt; [đặc tả implementation](onboarding-implementation.md) cập nhật ngày 2026-10-23, chưa triển khai production. [First-run flow](first-run-ux.md) · [Cấu hình](configuration.md) · [Paseo boundary](paseo-boundary.md).

## Đã chốt

- Plugin có menu quản lý vòng đời agent: spawn Onboarding Agent để cấu hình khởi đầu dự án bằng chat → onboarding hoàn tất, người dùng có thể spawn Harness Engineering Orchestrator để dựng Project Orchestrator → dựng hoàn tất, người dùng có nút spawn Project Orchestrator.
- Lần đầu là Spawn; đã có Session thì Open Session. Tạo Session mới là hành động riêng, tránh vô tình chạy trùng orchestrator cùng vai trò. Không suy ra phải archive hoặc xóa Session cũ.
- Onboarding Agent được cung cấp MCP Server để thiết lập mọi cấu hình cần thiết và hướng dẫn người dùng sử dụng plugin. Đây là caller cụ thể khiến MCP Server trở thành yêu cầu V1, không còn là transport chỉ thêm nếu sau này cần.
- Onboarding là làm việc bằng AI có công cụ cấu hình, không chỉ tạo một báo cáo hoặc yêu cầu người dùng tự nhập lại vào form. Bàn giao không dựa duy nhất vào transcript.
- Chat/session vẫn native Paseo; không dựng composer, transcript store hoặc chat router bắt buộc riêng.
- Sau nghiên cứu T3, đã chốt MCP phục vụ toàn bộ onboarding theo intent: cấu hình harness và native intents đã kiểm chứng/cấp quyền qua owner API. Native dữ liệu vẫn do Paseo sở hữu; không tạo editor/store thứ hai.
- Native API thiếu hoặc chưa được phép thì agent hướng dẫn native UI rồi đọc lại xác nhận, không tự sửa config nội bộ Paseo. Không hứa native CRUD nào đã khả dụng trước khi kiểm từng API/version.
- Code xác nhận cấu hình bắt buộc đủ để dựng hệ thống, agent tóm tắt cấu hình/phần còn thiếu và hướng dẫn sử dụng; menu mở nút Spawn Harness Engineering Orchestrator để người dùng chủ động tiếp tục. Chưa coi bước này là kiểm chứng vận hành dự án.
- Onboarding Agent tự dùng mặc định phù hợp cho lựa chọn kỹ thuật thông thường và giải thích ngắn những lựa chọn đã dùng. Hỏi người dùng về mục tiêu, quyền hạn, ngân sách hoặc kết nối bên ngoài khi cần quyết định; không hỏi lại từng trường cấu hình. Người dùng có thể chỉnh qua chat hoặc Settings; mặc định không tự mở rộng quyền đã cấp.
- Tạo Session mới cho cùng orchestrator là chuyển giao vai trò tường minh: lưu bàn giao, đối soát công việc đang chạy rồi chuyển quyền điều phối. Giữ lịch sử Session cũ nhưng không cho nó tiếp tục phát việc dưới vai trò đã chuyển; không mặc định hủy worker đang chạy. Đây là yêu cầu runtime, chưa có implementation/enforcement được kiểm chứng.

## Cấu hình onboarding tối thiểu — đã chốt

**A05 mở rộng caller của MCP:** MCP là interface chính cho cả hai orchestrator và specialists thao tác harness theo role authority, dùng cùng owner services với UI. Onboarding vẫn có nhiệm vụ/config intents riêng ở tài liệu này; không vì chung MCP mà nhận quyền Spawn/activate hoặc authority của orchestrator khác. [Composition](harness-composition.md) giữ scope và giới hạn của lựa chọn này; smoke Onboarding cũ không chứng minh đã có Tool surface đầy đủ cho mọi vai trò.

Chỉ bắt buộc thông tin đủ để Harness Engineering Orchestrator bắt đầu dựng hệ thống:

- Repo/workspace dự án.
- Mục tiêu ban đầu của harness.
- Native profile dùng cho orchestrator; các profile bổ sung có thể chọn sau.
- Nguồn Skills/Principles được phép dùng.
- Quyền và giới hạn tài nguyên ban đầu.

Backlog, GitLab, lịch polling và các agent chuyên môn được bổ sung theo nhu cầu. Thiếu kết nối nào thì chặn chức năng phụ thuộc kết nối đó, không chặn toàn bộ onboarding nếu bước dựng không cần nó. Đây là cấu hình theo giai đoạn, không cắt giảm phạm vi tính năng V1 đã chốt.

Các mục trên là phạm vi bắt buộc đã chốt; validation/readiness và revision protocol được đặc tả tại [onboarding-implementation.md](onboarding-implementation.md); schema executable và giá trị mặc định có căn cứ còn phải triển khai/kiểm. Không bắt người dùng chọn lại binding đã có và đã xác minh.

## Lượt dựng đầu tiên — đã chốt

Harness Engineering Orchestrator khảo sát repo trong phạm vi đã cấp rồi dựng bộ khởi đầu phù hợp với mục tiêu onboarding:

- Project Orchestrator với hướng dẫn, context và công cụ.
- Agent Catalog ban đầu, bindings Skills/Principles và Delegation Policy.
- Những workflow cần cho mục tiêu ban đầu.
- Các lịch vận hành, daily retro và cơ chế tiếp nhận yêu cầu cải tiến.

Chỉ kích hoạt phần đủ cấu hình và nằm trong quyền đã cấp. Những năng lực khác được bổ sung dần từ công việc thực tế; không cần chờ dựng hết mọi workflow hoặc mọi agent chuyên môn.

Code chỉ mở nút Spawn Project Orchestrator khi đã kiểm cấu hình, các tham chiếu và công cụ bắt buộc của Project Orchestrator hợp lệ, đồng thời bản bàn giao đã được lưu. Phần chưa sẵn sàng phải được nêu rõ. Agent tự báo dựng xong không thay các kiểm tra này.

Đủ điều kiện khởi chạy không đồng nghĩa đã kiểm chứng giải quyết công việc thực tế. Việc kiểm chứng năng lực tiếp tục bằng công việc đại diện sau khi khởi chạy, theo [first-run flow](first-run-ux.md#7-thực-hiện-công-việc-kiểm-chứng-ban-đầu). Danh mục kiểm tra và cơ chế lưu bàn giao được đặc tả tại [implementation specification](onboarding-implementation.md); chưa triển khai production.

Chi tiết tools, readiness và bàn giao: [onboarding-contracts.md](onboarding-contracts.md). Đây là đề xuất protocol để triển khai, chưa phải API đã chạy.

## Thiết kế MCP đang đề xuất

MCP Server là adapter tới các interface nghiệp vụ hiện có; validation, authority, expected revision và audit dùng chung với UI. Không cấp quyền ghi trực tiếp SQLite/file bất kỳ hoặc giữ một nguồn config active khác chỉ vì đi qua MCP.

Nhóm chức năng đề xuất: khám phá các cấu hình có thể thiết lập và phần còn thiếu; đọc cấu hình/effective refs; validate và ghi cấu hình qua module sở hữu; kiểm readiness; đọc hướng dẫn dùng plugin và trạng thái các bước dựng/khởi chạy. Proposed Tools và contracts tại [onboarding-contracts.md](onboarding-contracts.md); schema executable và adapter/transport lifecycle chưa được triển khai, các native capabilities còn phải kiểm.

Theo ranh giới đã có, config của harness gồm bindings/context dự án, Agent Definitions/profile refs/Skills/Principles, quyền/giới hạn được cấp và automation/integration bindings khi cần. Native host/provider/profile vẫn do Paseo sở hữu; MCP được thao tác native intents qua owner API đã kiểm chứng/cấp quyền, không thay native editor/store. Không đưa secret vào chat, source export hoặc phản hồi tool.

## Engineering còn phải triển khai/kiểm chứng

[Implementation specification](onboarding-implementation.md) đã mô tả minimum config, caller context, receipt/revision ordering, readiness/Handover, create/send reconciliation và Replace authority. Đây là đề xuất kỹ thuật để làm code, không phải vòng hỏi lại quy tắc sản phẩm.

- Chọn schema executable/SQLite DDL và thực hiện owner commands qua cùng interface cho MCP/UI.
- Kiểm native intents/API/version, context/readback, per-Session credentials và ghi nhận quyền người dùng bằng đường xác thực.
- Kiểm create/send correlation khi mất phản hồi, in-flight reload và native navigation từ menu thật.
- Thực thi Replace/revocation trên Claude/Codex, gồm effect paths ngoài owner và worker trả kết quả muộn.
- Nối các owner cho toàn bộ config V1 khi mở rộng sau minimum slice; không thêm native config mirror.

Đã chạy [spike Onboarding MCP](onboarding-spike-results.md) disposable: native Onboarding ghi config/readiness/handover qua MCP, reload giữ Session, driver mô phỏng user Spawn và native Harness Engineering xác nhận đúng bàn giao. Đây là một subset smoke, chưa là API/installer sản phẩm, UI management menu hoặc toàn bộ protocol bên dưới. Prototype HTML v9 vẫn chỉ là fixture UI, không phải bằng chứng tích hợp.

## Kiến trúc sau nghiên cứu T3 MCP — phạm vi đã chốt, protocol đang thiết kế

[Nghiên cứu nguồn pin theo commit](t3-mcp-architecture-sources.md) cho thấy T3 dùng tool handlers gọi application services/command paths; không phải mỗi tool tự giữ một bản config. Không suy ra mọi tool T3 đều có idempotency hoặc expected revision giống nhau.

Q1 đã chốt: MCP phủ toàn bộ nhu cầu onboarding theo intent, thay vì giới hạn vào “plugin-only”. Phân biệt nơi sở hữu dữ liệu và đường thao tác: native resource vẫn do Paseo validate/lưu; Onboarding Agent có thể cấu hình qua API owner được xác minh và cấp quyền. Không tạo native config mirror hoặc thêm provider editor riêng.

Luồng thiết kế để triển khai các quyết định đã chốt; không phải API đã chạy:

1. Menu Spawn tạo native Session đã gắn MCP với context đáng tin: project/host/workspace/role và principal. Agent đọc khả năng thực của adapter, config/revisions và phần thiếu; không tự nhập role đặc quyền trong tool payload.
2. Agent hỏi phần chưa biết, dùng intent tools đọc/validate/thiết lập cấu hình. Config harness gọi module sở hữu dùng chung với UI; native intents gọi owner API Paseo khi đã kiểm được khả năng và được cấp quyền.
3. Native API không có hoặc không được phép thì trả rõ capability/permission blocker và hướng dẫn native UI, sau đó đọc lại để xác nhận. Không sửa file config nội bộ Paseo hoặc giả lập API chỉ để hứa tự động hóa mọi bước.
4. Ghi intent/receipt cho thao tác dài hoặc có tác động ngoài; kết quả mất phản hồi thì đọc operation và đối soát trạng thái owner, không tự lặp thao tác. MCP và UI không có transaction chung với native API bên ngoài.
5. Agent dùng hướng dẫn theo version/plugin state để giải thích cách tiếp tục và vận hành. Cấu hình/bàn giao lưu ngoài transcript; hướng dẫn trong chat không phải nguồn state duy nhất.

Nhóm tool đề xuất theo intent: inspect scope/capabilities/config; cấu hình Agent Definitions/policy hoặc limits/actions/automations qua owner tương ứng; kiểm readiness; đọc operation; đọc hướng dẫn. Contract kỹ thuật theo [onboarding-contracts.md](onboarding-contracts.md); không coi tên/schema sketch là API production. Không dùng arbitrary path/value patch làm quyền sửa mọi thứ và không dựng một settings/change-set engine tổng quát.

Q2 đã chốt: code kiểm các cấu hình bắt buộc cho bước dựng, trả blockers theo revision; agent tóm tắt phần đã thiết lập, phần còn thiếu và hướng dẫn bước tiếp. Người dùng chủ động bấm Spawn Harness Engineering Orchestrator khi bước đó đủ điều kiện. Không đồng nhất config-ready/build-ready với operationally-verified và không bắt một bài kiểm “đã đọc hướng dẫn”. **Q1/Q2 đã được xác nhận; tool schemas, readiness checks cụ thể và provider/native API contracts chưa triển khai.**
