# Onboarding MCP and lifecycle contracts

2026-10-22. Đề xuất triển khai các quyết định trong [onboarding-agent.md](onboarding-agent.md); tên tools và types dưới đây chưa phải API đã triển khai. [Spike disposable](onboarding-spike-results.md) đã kiểm subset config/check/handover và native Sessions; chưa triển khai toàn bộ protocol hoặc UI. Dùng chung owner services với UI. Không suy ra Paseo có native CRUD tương ứng trước khi kiểm từng API/version.

## MCP surface

| Proposed tool | Input chính | Kết quả / quy tắc |
| --- | --- | --- |
| `onboarding_inspect` | section?, cursor? | Context đã bind, config revision, capabilities thật, phần thiếu, operations đang dở. Không chứa secrets hoặc mặc định tải transcript. |
| `onboarding_configure` | requestId, expectedRevision, intent | Intent có schema hữu hạn; validate/authorize tại owner service. Trả receipt sau khi lưu; native effect dài trả operation đang chờ, chưa báo thành công. |
| `onboarding_check` | target: harness-build hoặc project-launch | Report theo config/dependency revisions: checks, blockers, optional gaps, evidence refs. Không tự hoàn tất onboarding hoặc spawn agent. |
| `onboarding_complete` | requestId, reportId, expectedRevision | Kiểm lại report và dependencies hiện hành, lưu bản bàn giao cùng trạng thái đủ điều kiện dựng. Report cũ trả conflict; không tự spawn Harness Engineering Orchestrator. |
| `operation_read` | operationId | Trạng thái đã ghi, refs và lý do chưa xác định; timeout không đồng nghĩa thất bại hay đã hủy. |
| `guidance_read` | topic, cursor? | Hướng dẫn đúng plugin version/context; cách dùng, nơi config thuộc về, bước tiếp theo. |

Intent union gồm bind project/workspace, đặt mục tiêu, chọn native profile refs, bind nguồn Skills/Principles, cấu hình Agent Definitions/Delegation Policy, giới hạn/quyền, integrations và automations. Mỗi nhánh có schema riêng; không cho arbitrary path/value, shell hoặc SQL. Native intent chỉ có khi owner adapter đã được kiểm chứng và người gọi có quyền. Không có API thì trả blocker và hướng dẫn native UI, rồi đọc lại xác nhận.

Binding project/host/workspace/role/principal đến từ phiên đã được server xác thực; caller không tự nâng vai trò bằng payload. Cùng requestId và payload trả receipt cũ; khác payload trả conflict. Chỉ retry native effect sau khi đối soát kết quả mơ hồ. Native API và SQLite không nằm trong một transaction.

## Hai điều kiện sẵn sàng

**Harness build:** project/workspace hợp lệ; mục tiêu đã lưu; profile cần cho bước dựng resolve được; nguồn Skills/Principles truy cập được trong quyền đã cấp; giới hạn/quyền có giá trị và đủ cho tác vụ dựng dự kiến. Thiếu quyền ghi chỉ chặn phần dựng cần ghi, không tự xin quyền vượt phạm vi. Integration chưa dùng là optional gap, không phải blocker toàn bộ.

**Project launch:** cấu hình Project Orchestrator và những refs/công cụ bắt buộc hợp lệ; catalog/policy/workflow ban đầu đã validate theo phạm vi cần dùng; bản bàn giao đã lưu. Agent chuyên môn/workflow/integration chưa cần được ghi là chưa sẵn sàng, không ép dựng toàn bộ trước khi mở chat. Chưa kết luận năng lực giải quyết task thực tế đã được kiểm chứng.

Mỗi check trả `pass | blocked | unknown`, reason, scope và evidence refs. Unknown ở điều kiện bắt buộc chặn bước phụ thuộc. Agent tự báo xong hoặc kết thúc Turn không tạo pass. Khi người dùng bấm Spawn, code kiểm lại revisions/capabilities và trạng thái role trước khi dispatch; report cũ không cấp quyền khởi chạy mãi mãi.

## Bàn giao và trạng thái bền vững

Bản bàn giao lưu ngoài transcript: project/workspace refs, mục tiêu và nguồn, config/definition/policy revisions, Skills/Principles refs, giới hạn/quyền hiện hành, đầu ra dựng và evidence refs, optional gaps/blockers, linked operations/work và bước tiếp theo. Chỉ lưu secret references thích hợp, không chép giá trị secret. Summary hỗ trợ đọc hiểu, không thay checkpoint/operation journal.

UI/MCP đọc cùng state. Hoàn tất onboarding chỉ mở hành động Spawn; người dùng chủ động khởi chạy. Reload/reconnect đọc lại receipts và đối soát native sessions trước khi tạo mới. Thay đổi cấu hình sau check làm report cũ hết giá trị cho dependency đã đổi.

## Session ownership và chuyển giao

Server giữ active role binding cho từng vai trò orchestrator, revision và operation identity. Spawn cần giữ chỗ bền vững trước tác động native; mất response thì tìm/đối soát session theo operation identity trước retry. Không hứa exactly-once nếu native API thiếu idempotency.

Replace Session chuẩn bị handover, chặn dispatch mới từ role cũ, đối soát assignments/effects, tạo/nhận lại session thay thế rồi chuyển binding qua revision check. Giữ history và assignments đang chạy; không mặc định cancel workers. Command từ session cũ bị owner service từ chối theo binding hiện hành. Việc ngăn shell/effect trực tiếp ngoài owner service phụ thuộc native enforcement; nếu không bảo đảm được phải dừng session cũ trước khi kích hoạt session mới. Khi gián đoạn, giữ role ở trạng thái đang chuyển và reconcile, không mở hai bên cùng điều phối.

## Việc cần spike

Bootstrap MCP vào Onboarding Session; discovery/native profile read-write theo version; context/auth binding; secrets flow; pending permission; create response bị mất; stale check; plugin reload khi operation chờ; Replace Session và stale-role dispatch. Đây là công việc kỹ thuật cần kiểm chứng, không phải câu hỏi bắt người dùng đoán API.
