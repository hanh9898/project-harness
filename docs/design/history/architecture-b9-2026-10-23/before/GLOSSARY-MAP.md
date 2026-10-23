# Glossary Map

Cấu trúc tài liệu đã được xác nhận ngày 2026-10-22: một glossary chung, bốn nhóm nghĩa nghiệp vụ và hai bộ từ dành cho UI/engineering. Đây là tổ chức ngôn ngữ; không xác nhận bốn services, databases hoặc bounded contexts triển khai riêng. Các entry chưa được chốt tiếp tục ở hồ sơ phỏng vấn, không lẫn với định nghĩa được xác nhận.

## Glossaries

- [Common Language](GLOSSARY.md): sản phẩm, hai orchestrator, cấu hình agent và khái niệm dùng chung.
- [Execution](docs/domain/execution/GLOSSARY.md): yêu cầu, workflow, Run, Agent Session/Turn/Loop, Assignment, Attempt/Quality Iteration/Outcome, Checkpoint và Artifact/Evidence.
- [Automation](docs/domain/automation/GLOSSARY.md): Job, Schedule, Schedule Occurrence và Job Run.
- [Evolution](docs/domain/evolution/GLOSSARY.md): yêu cầu phát triển harness, inbox, daily retro, Improvement Loop, Candidate, Release, Activation, Activation Target, Active Release và Recovery Release.
- [Analytics](docs/domain/analytics/GLOSSARY.md): Metric, Observation, Evaluation Trial, Verdict, Operational Analysis, Controlled Evaluation, Baseline, Comparison và Saved View.
- [UI Language](docs/ui/GLOSSARY.md): nhãn hiển thị ánh xạ về domain terms; phân biệt observed với confirmed.
- [Engineering Language](docs/engineering/GLOSSARY.md): interface kỹ thuật và ánh xạ identifiers; phân biệt prototype, proposed và implemented.

## Quan hệ giữa các nhóm

- Automation kích hoạt công việc; đích có thể là code, agent hoặc một Workflow Run. Schedule Occurrence có thể bị skip/gom/xếp chờ; Job Run có thể chạy thủ công. Job Run không đồng nhất với Workflow Run hoặc Agent Session.
- Execution cung cấp kết quả và bằng chứng để Analytics quan sát/đánh giá; chi tiết event/API trao đổi chưa là quyết định của glossary.
- Evolution dùng phản hồi vận hành và kết quả đánh giá để cải tiến harness, bao gồm workflow và chính plugin.
- UI và Engineering tham chiếu các định nghĩa nghiệp vụ; không tạo hai nghĩa khác nhau chỉ vì khác layer.
- Native Paseo/Backlog/GitLab giữ tên và nghĩa bên ngoài của chúng; nếu dịch vào khái niệm local phải ghi mapping tường minh.

## Cách sử dụng

Đọc Common Language rồi glossary liên quan công việc; làm UI đọc thêm UI Language, đặt tên API/type đọc thêm Engineering Language. Mỗi định nghĩa có một nơi sở hữu, nơi khác dẫn link. Từ chưa chốt hoặc identifier fixture không được tự nâng thành tên chuẩn. Canonical names dùng tiếng Anh; các tên tiếng Việt được giữ nguyên từ vòng trước cho tới khi chốt English equivalent.

## Trạng thái coverage hiện tại

English vocabulary V1 đã được chấp nhận ngày 2026-10-23. Cả 155 concept IDs có canonical English name và definitionLocation trong glossary sở hữu: 132 local definitions và 23 contextual references. Các nghĩa không tạo thêm service/database/entity chỉ vì có tên trong register.

Phạm vi 96 mục D01 đã có xác nhận hiện tại riêng ở [G01: Q1 P2720 → “ok” P2722](docs/design/history/glossary-v1-g01-2026-10-23/acceptance-g01.json). Câu trả lời mới chốt names/definitions/owners và giữ aliases/nhãn đã duyệt; lịch sử scope ambiguity trước đó được bảo toàn. [Phiên concept model](docs/design/glossary-v1-grill.md) đã kết thúc qua xác nhận riêng [G02: P2767 → “ok rồi” P2769](docs/design/history/glossary-v1-g02-2026-10-23/closure-g02.json), trong phạm vi ngữ nghĩa/mô hình tham chiếu đã tổng hợp; không tự chốt mọi graph cardinality hoặc runtime proof.

[English review đã chốt](docs/design/v1-vocabulary-review.md), [record tương tác](docs/design/v1-vocabulary-review.html), [concept register](docs/design/v1-concept-register.json), [graph](docs/design/v1-concept-graph.html), [CQ ledger](docs/design/v1-competency-ledger.md) và [acceptance/follow-up](docs/design/v1-glossary-completion-plan.md).

Tên UI Agent Catalog / Danh mục agent đã chốt; nhãn cũ chỉ còn trong lịch sử hoặc danh sách tên tránh dùng. IDs, aliases và anchors cũ vẫn truy được. UI labels có glossary riêng; không tự dịch toàn bộ thuật ngữ nội bộ thành nhãn màn hình.

Vocabulary acceptance khác với việc phê duyệt mọi graph type/cardinality, schema hay chứng minh runtime. Những quan hệ inferred/proposed và giới hạn fixture/spike vẫn được nêu rõ để tiếp tục kiểm chứng.
