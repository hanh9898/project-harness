# Glossary coverage audit — còn thiếu trước khi triển khai tiếp

2026-10-22. Audit chỉ đọc thiết kế hiện hành, bảy glossary và code spike/prototype. Không phải một vòng xác nhận tên mới; các tên ứng viên dưới đây là đề xuất để phỏng vấn. Không thay định nghĩa glossary bằng schema, enum hoặc workflow spec.

## Kết luận

Chưa đủ glossary để chuyển sang triển khai toàn plugin. Các vòng gần đây tập trung mạnh vào UI labels và ba cặp entity của fixture; chưa phủ hết ngôn ngữ vận hành, workflow authoring, automation, quyền/cấu hình và engineering mechanisms.

Đếm các headers định nghĩa `**Term**` trong bảy file hiện tại: Common 21; Execution 18; Automation 4; Evolution 12; Analytics 9; UI 79; Engineering 2. Đây là số entry headers, không phải số khái niệm độc lập hay tỷ lệ hoàn thiện. Engineering có nhiều identifier mappings nhưng chỉ có định nghĩa riêng CLI và MCP Server; mapping không thay glossary cơ chế.

## Các nhóm thiếu và thứ tự làm rõ

| Ưu tiên / nhóm | Khoảng trống cần xử lý | Nơi sở hữu nghĩa dự kiến | Bằng chứng đang dùng |
| --- | --- | --- | --- |
| P0 — Onboarding và bàn giao | Onboarding, Handover, Readiness Report; phân biệt đủ để dựng, đủ để khởi chạy và đã kiểm chứng vận hành | Common hoặc Execution, cần chốt owner trước khi thêm | [Onboarding contracts](onboarding-contracts.md#hai-điều-kiện-sẵn-sàng), [spike Report/Handover/Binding](../../spikes/onboarding-mcp/server/owner.ts) |
| P0 — Identity và quyền giữ vai trò | Logical Owner, Role Binding, Active Role Binding; khác Agent Role, agent ID và quyền được cấp | Common/Execution; enforcement mechanisms thuộc Engineering | [Session ownership](onboarding-contracts.md#session-ownership-và-chuyển-giao), [spike State.roles](../../spikes/onboarding-mcp/server/owner.ts) |
| P0 — Quyền và năng lực | Capability, Authority, Permission, Effective Permissions, Budget/Limit; không đồng nhất “làm được”, “được phép” và “còn tài nguyên” | Common; mappings native ở Engineering | [Configuration](configuration.md#4-quyền-và-giới-hạn), [Delegation policy](agent-delegation.md#đã-chốt--vòng-4) |
| P0 — Hợp đồng xử lý một yêu cầu | Request ID / Idempotency Key, Operation, Receipt, Operation Intent, Reconciliation; phân biệt nhận bền vững, dispatch, đã áp dụng và đã đối soát | Engineering, tham chiếu domain Work Item/Run | [Work interface/invariants](modules.md#3-module-work--vòng-đời-công-việc-bền-vững), [MCP intents](onboarding-contracts.md#mcp-surface) |
| P1 — Workflow composition | Workflow Pattern, năm pattern, Workflow Step/Node, Step Run, Execution Plan; route/branch/join, điều kiện dừng và worker unit động | Execution; interpreter/SDK mappings ở Engineering | [Architecture patterns](architecture.md#5-workflow-và-kết-quả), [WorkflowPrograms](modules.md#4-module-workflowprograms--viết-và-kiểm-composition), [fixture tree](prototype.html) |
| P1 — Agent contract và tài sản phương pháp | Delegation Mode; Delegate/Consult/Workflow hiện có nghĩa tại UI; Procedure, Entry Skill, Result Contract, Context Package, Operating Rules và Principle Selection cần owner domain rõ | Common/Execution; UI giữ nhãn và links | [Agent config](configuration.md#3-agent-definition-nguồn-và-role), [delegation modes](agent-delegation.md), [UI fields](../ui/GLOSSARY.md#result-contract) |
| P1 — Automation và nguồn sự kiện | Trigger, Trigger Binding, Source Event, Delivery, Handler, Cursor, Overlap Policy, Missed Occurrence Policy; phân biệt nguồn, lịch, sự kiện, lần giao và lần thực thi | Automation; outbox/receipt lưu trữ thuộc Engineering | [Triggers](modules.md#2-module-triggers--từ-nguồn-paseo-đến-công-việc-bền-vững), [architecture timers](architecture.md#6-trigger-và-timer) |
| P1 — Cấu hình có phiên bản | Config Revision, Effective Configuration, Snapshot, Pinned Revision, Source Drift; khác Definition Revision, native defaults và cấu hình được agent thực sự dùng | Common/Execution; snapshot/digest protocol thuộc Engineering | [Config lifecycle](configuration.md#5-vòng-đời-settings-và-catalog), [spike dependencyDigest](../../spikes/onboarding-mcp/server/owner.ts) |
| P1 — Điều khiển và phục hồi runtime | Admission, Retry, Timeout, Deadline, Cancellation, Interruption; cơ chế journal/outbox/lease/fencing, recovery executable và quan sát desired/observed state | Engineering, dựa domain states đã chốt | [Work supervisor/timers](modules.md#supervisor-timer-và-context-thuộc-work), [release execution](release-execution.md) |
| P2 — Cải tiến và đánh giá | Hypothesis, Experiment, Evaluation Suite/Dataset, Feedback, Regression, Fix-forward; candidate khác experiment, eval failure khác inability to evaluate; công thức chỉ số vẫn là spec riêng | Evolution/Analytics | [Improvement Loop](architecture.md#4-ba-vòng-closed-loop), [release policy](release-policy.md), [Criteria](modules.md#5-module-criteria--tiêu-chí-revision-và-kết-luận) |

Nơi sở hữu trên là hướng tổ chức tài liệu, không thêm service/database/entity cho mỗi danh từ. Không cần định nghĩa lại mọi từ kỹ thuật phổ biến; chỉ đưa vào Engineering khi cách dùng cục bộ ảnh hưởng quyền, thứ tự, phục hồi hoặc cách caller hiểu kết quả.

## Tên còn không theo English-first

Có nghĩa tiếng Việt đã được ghi trước đây nhưng chưa chốt English canonical name cho:

- Common: Lõi harness; Tiêu chí đánh giá; Tiêu chí kết quả dự án; Tiêu chí vận hành harness; Yêu cầu quyết định.
- Execution: Yêu cầu công việc dự án; Công việc kiểm chứng ban đầu; Gói context; Nguồn yêu cầu dự án.
- Evolution: Yêu cầu phát triển harness; Inbox harness; Lượt retro hằng ngày.

UI **Harness Inbox** và các nhãn đã duyệt không tự đổi owner term của Evolution. Khi chốt tên domain cần giữ anchors/aliases cũ và sửa mappings, không tự suy English term từ bản dịch.

## Từ có nguy cơ nhiều nghĩa

- **Binding**: liên kết role ↔ Session trong spike; liên kết profile/definition trong config; liên kết source ↔ target trong automation. Cần qualify theo nghĩa, không tạo một schema Binding chung chỉ vì trùng tên.
- **Role**: trách nhiệm của agent khác giá trị role để xác thực caller trong spike. Agent Role không tự cấp Authority.
- **Owner**: hai orchestrator chịu trách nhiệm công việc khác data owner/service sở hữu cấu hình, khác principal được xác thực.
- **Ready**: đủ cấu hình, đủ năng lực API, đã nạp runtime và đã thực hiện được công việc thật là các điều kiện khác nhau.
- **Result / Outcome / Verdict / Receipt**: kết quả thực thi, kết luận đánh giá và xác nhận tiếp nhận không được dùng thay nhau.
- **Source / Context**: nguồn yêu cầu, nguồn Skill, nguồn event và thông tin được phép đọc không phải một loại đối tượng duy nhất.

## Chưa đầy đủ ở UI và code

UI đã chốt nhiều menu/actions/states nhưng thông báo lỗi, trạng thái unknown/unavailable/missing, form validation, scope quyền, hạn mức và ownership explanations chưa được rà theo toàn bộ luồng. Không mở vòng duyệt từng câu chữ chung; chốt trước những từ có thể làm thay đổi cách người dùng hiểu quyền/kết quả.

Engineering có mapping tốt hơn sau v9 nhưng còn thiếu mapping cho spike thật: `Owner`, `Binding`, `Report`, `Handover`, `State.receipts`, `dependencyDigest`, `revision`, `roles`, MCP catalogs và native adapter. Các public types trong modules.md vẫn là sketches; không đánh dấu implemented chỉ vì có type cùng tên trong spike.

UI lexicon hiện phải diễn giải thêm một số nghĩa như Result Contract/Principle Selection/Delegation modes vì domain owner chưa có entry đủ cụ thể. Cần chuyển phần nghĩa phù hợp về owner đã chốt rồi để UI dẫn link; không coi một label đã được duyệt là đã phủ đủ domain concept.

## Điều kiện kết thúc vòng glossary

1. Mỗi thuật ngữ quan trọng xuất hiện trong thiết kế V1 có owner definition đã chốt, hoặc được ghi rõ là từ phổ thông/external term/proposal chưa dùng làm contract.
2. English canonical name, scope, quan hệ và từ tránh rõ ràng; bản dịch/nhãn UI được duyệt riêng khi thật sự hiển thị.
3. Từ nhiều nghĩa được qualify; native Paseo terms có mapping local và không bị đổi nghĩa ngầm.
4. Identifier quan trọng của thiết kế/spike/prototype có mapping observed/proposed/implemented/legacy, ghi đúng phạm vi bằng chứng.
5. Domain meaning không chứa state-transition protocol; protocol/schema không tự đóng vai glossary.
6. Khi dùng một từ để quyết định quyền, readiness, retry, completion hoặc release, người đọc không phải suy nghĩa từ tên biến hay transcript.

Chưa đạt các điều kiện trên. Không dùng số lượng entries hoặc các kiểm UI v9 để công nhận glossary hoàn tất.
