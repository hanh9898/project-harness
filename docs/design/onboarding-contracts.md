# Onboarding MCP and lifecycle contracts

2026-10-23. Hợp đồng để triển khai các quyết định trong [onboarding-agent.md](onboarding-agent.md); tên tools và types dưới đây chưa phải API production. [Implementation specification](onboarding-implementation.md) sở hữu thứ tự commit/effect, idempotency, freshness, Session ownership và ma trận OB01–OB14. [Spike disposable](onboarding-spike-results.md) đã kiểm subset config/check/handover và native Sessions; chưa triển khai toàn bộ protocol hoặc UI. MCP/UI gọi cùng owner interfaces; không suy ra Paseo có native CRUD tương ứng trước khi kiểm từng API/version.

## MCP surface

| Proposed tool | Input chính | Kết quả / quy tắc |
| --- | --- | --- |
| `onboarding_inspect` | section?, cursor? | Context đã bind, config revision, capabilities thật, phần thiếu, operations đang dở. Không chứa secrets hoặc mặc định tải transcript. |
| `onboarding_configure` | requestId, expectedRevision, intent | Intent có schema hữu hạn; validate/authorize tại owner service. Trả receipt sau khi lưu; native effect dài trả operation đang chờ, chưa báo thành công. |
| `onboarding_check` | target: harness-build hoặc project-launch | Report theo config/dependency revisions: checks, blockers, optional gaps, evidence refs. Không tự hoàn tất onboarding hoặc spawn agent. |
| `onboarding_complete` | requestId, reportId, expectedRevision | Kiểm lại report và dependencies hiện hành, lưu bản bàn giao cùng trạng thái đủ điều kiện dựng. Request mới dùng report cũ trả conflict; replay trả receipt trước theo quy tắc idempotency bên dưới. Không tự spawn Harness Engineering Orchestrator. |
| `operation_read` | operationId | Trạng thái đã ghi, refs và lý do chưa xác định; timeout không đồng nghĩa thất bại hay đã hủy. |
| `guidance_read` | topic, cursor? | Hướng dẫn đúng plugin version/context; cách dùng, nơi config thuộc về, bước tiếp theo. |
| `handover_read` | handoverRef | Engineering đọc bản bàn giao đã pin cho Assignment của Session hiện hành; không đọc tùy ý scope khác. |
| `handover_acknowledge` | requestId, assignmentId, handoverRef, digest | Kiểm Session/binding generation, Assignment và đúng digest/revision; lưu ack bền vững. Chỉ chứng minh đã nhận đúng bàn giao. |

Hai Tools cuối dành cho Engineering theo quyền đã bind; không tự làm nó có quyền cấu hình như Onboarding. Lát cắt đầu tiên chưa expose tool dựng toàn bộ Project Orchestrator. MCP không có Spawn/Replace; các thao tác đó đi từ menu **Orchestrators / Bộ điều phối** qua RPC đã xác thực người dùng.

Intent union gồm bind project/workspace, đặt mục tiêu, chọn native profile refs, bind nguồn Skills/Principles, cấu hình Agent Definitions/Delegation Policy, giới hạn/quyền, integrations và automations. Mỗi nhánh có schema riêng; không cho arbitrary path/value, shell hoặc SQL. Native intent chỉ có khi owner adapter đã được kiểm chứng và người gọi có quyền. Không có API thì trả blocker và hướng dẫn native UI, rồi đọc lại xác nhận.

Binding project/host/workspace/principal và Session authority đến từ phiên đã được server xác thực; caller không tự nâng vai trò bằng payload. Sau kiểm quyền hiện hành, cùng requestId/payload trả receipt cũ trước khi xét expected revision cho request mới; khác payload trả conflict. Replay không thực hiện effect lại hoặc chứng nhận readiness hiện tại. Chỉ retry native effect sau khi đối soát kết quả mơ hồ. Native API và SQLite không nằm trong một transaction; không giữ DB lock qua native I/O.

## Hai điều kiện sẵn sàng

**Harness build:** project/workspace hợp lệ; mục tiêu đã lưu; profile cần cho bước dựng resolve được; nguồn Skills/Principles truy cập được trong quyền đã cấp; giới hạn/quyền có giá trị và đủ cho tác vụ dựng dự kiến. Thiếu quyền ghi chỉ chặn phần dựng cần ghi, không tự xin quyền vượt phạm vi. Integration chưa dùng là optional gap, không phải blocker toàn bộ.

**Project launch:** cấu hình Project Orchestrator và những refs/công cụ bắt buộc hợp lệ; catalog/policy/workflow ban đầu đã validate theo phạm vi cần dùng; bản bàn giao đã lưu. Agent chuyên môn/workflow/integration chưa cần được ghi là chưa sẵn sàng, không ép dựng toàn bộ trước khi mở chat. Chưa kết luận năng lực giải quyết task thực tế đã được kiểm chứng.

Mỗi check trả `pass | blocked | unknown`, reason, scope và evidence refs. Unknown ở điều kiện bắt buộc chặn bước phụ thuộc. Agent tự báo xong hoặc kết thúc Turn không tạo pass. Khi người dùng bấm Spawn, code kiểm lại revisions/capabilities và trạng thái role trước khi dispatch; report cũ không cấp quyền khởi chạy mãi mãi.

## Bàn giao và trạng thái bền vững

Bản bàn giao lưu ngoài transcript: project/workspace refs, mục tiêu và nguồn, config/definition/policy revisions, Skills/Principles refs, giới hạn/quyền hiện hành, đầu ra dựng và evidence refs, optional gaps/blockers, linked operations/work và bước tiếp theo. Chỉ lưu secret references thích hợp, không chép giá trị secret. Summary hỗ trợ đọc hiểu, không thay checkpoint/operation journal.

UI/MCP đọc cùng state. Hoàn tất onboarding chỉ mở hành động Spawn; người dùng chủ động khởi chạy. Reload/reconnect đọc lại receipts và đối soát native Sessions trước khi tạo mới. Thay đổi cấu hình sau check làm report cũ hết giá trị cho dependency đã đổi. Initial dispatch cần send intent/Assignment riêng; mất send response không được tự gửi lại prompt. Open Session không dispatch hoặc đòi report cũ còn đủ để đọc chat.

## Session ownership và chuyển giao

Server giữ Orchestrator Session Binding cho hai Orchestrator Responsibilities, với binding revision/authority generation và operation identity. Onboarding có helper Session reference riêng, không thành orchestrator thứ ba. Spawn giữ chỗ bền vững trước tác động native; mất response thì tìm/đối soát Session theo operation identity trước retry. Native labels và SQLite fencing không tự ngăn native effect trùng; không hứa exactly-once.

Replace Session chuẩn bị handover, chặn dispatch mới từ role cũ, đối soát assignments/effects, tạo/nhận lại session thay thế rồi chuyển binding qua revision check. Giữ history và assignments đang chạy; không mặc định cancel workers. Command từ session cũ bị owner service từ chối theo binding hiện hành. Việc ngăn shell/effect trực tiếp ngoài owner service phụ thuộc native enforcement; nếu không bảo đảm được phải dừng session cũ trước khi kích hoạt session mới. Khi gián đoạn, giữ role ở trạng thái đang chuyển và reconcile, không mở hai bên cùng điều phối.

## Bằng chứng và việc cần spike

Bootstrap MCP, đọc native profile, check/handover subset, reload giữa các bước và Engineering ack đã có bằng chứng trong spike 0.11.1. Còn phải kiểm per-Session auth/credential flow, Claude/Codex enforcement, create/send response bị mất, concurrent edits/starts, in-flight reload, Replace Session và stale-role dispatch. Native write intents chưa được adapter spike cung cấp; không kết luận toàn bộ public API thiếu writes. Theo dõi đúng lớp bằng chứng tại [implementation specification §10](onboarding-implementation.md#10-acceptance-matrix-cho-implementation).
