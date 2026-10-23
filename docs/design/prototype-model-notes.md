# Prototype v9: domain identities and code mapping

2026-10-22. Refactor của HTML fixture, không phải workflow runtime hoặc migration production. [Engineering glossary](../engineering/GLOSSARY.md) · [UI glossary](../ui/GLOSSARY.md).

## Model và interface

[prototype-model.js](prototype-model.js) sở hữu identity, liên kết và invariant của fixture. `createPrototypeModel(state, nextId)` trả các thao tác submit/startRun/assign, ghi Outcome, đánh giá giải quyết yêu cầu và chọn/kích hoạt/phục hồi phiên bản. Caller không tự dùng Session làm Assignment hoặc dùng Run làm Work Item. Các kiểm Node gọi cùng interface này; không tạo memory database adapter hoặc provider giả trong model.

HTML giữ model inline để vẫn mở độc lập. Chạy `node docs/design/build-prototype-model.cjs` sau khi sửa source; `--check` xác nhận source và bản nhúng khớp. Không sửa hai bản model riêng rẽ.

## Entity và vai trò

| Khái niệm | State/quan hệ thực trong fixture v9 | Surface |
| --- | --- | --- |
| Work Item | `S.workItems`, ID `request-*`, criteria revision và resolution riêng | `work-items`, `work-item/:id` |
| Workflow Run | `S.workflowRuns`, ID `run-*`, `workItemId`, trạng thái/evidence/Outcome riêng | `run/:id` |
| Assignment | `S.assignments`, ID `assignment-*`, `runId`, `sessionId`, snapshot bundle và Outcome riêng | `assignments`, `assignment/:id` |
| Agent Session | `S.agentSessions`, identity/lifecycle và provider metadata; không giữ một `activity` hoặc `bundle` thay Assignment | `session/:id`; mở native qua handoff fixture |
| Release | `S.releaseCatalog`, mỗi release có ID/version và kết quả boot/verification riêng | release details |
| Activation Target | `S.activationTargetRef` | vai trò phiên bản được chọn để kích hoạt |
| Active Release | `S.activeReleaseRef`, có thể null khi đã xác nhận không có runtime đang có hiệu lực | vai trò phiên bản đang có hiệu lực |
| Recovery Release | `S.recoverySelection`: operationId/releaseId/schemaRevision/checks | vai trò phiên bản được chọn để phục hồi |
| Release operation | `S.v1.releaseOperation`: plan/checkpoint/log/state và refs phiên bản | `releases`, `recovery` |

Không còn `S.activities`, `S.agents`, `S.release` hoặc `S.knownGood` làm alias. `lastVerifiedReleaseRef` chỉ là thông tin một bản từng đạt kiểm, không tự trở thành Recovery Release. `releaseOperation.base` là snapshot version nguồn của operation, không phải nguồn sự thật cho Active Release hoặc một Baseline Analytics mặc định. Routes `activity/:id` và `agents` còn được nhận làm compatibility navigation cho fixture cũ; chúng không tạo alias identity/state. Storage key/version chuyển sang v9, giữ nguyên key v8 cũ nhưng không migrate dữ liệu fixture đó.

## Hành vi được thể hiện

- Yêu cầu có thể chưa có Run hoặc có nhiều Runs. Hoàn tất Run chỉ ghi kết quả thực thi; giải quyết yêu cầu cần bước đánh giá riêng, criteria revision đúng và evidence scope `work-item`. Run evidence đơn lẻ không thay được đánh giá yêu cầu.
- Một Session nhận nhiều Assignments theo thời gian. Giao lượt mới không ghi đè snapshot hoặc Outcome của lượt cũ; Session đang bận không nhận thêm Assignment trong fixture này. UI có tình huống tái sử dụng Session sau Run terminal.
- `recordAssignmentOutcome` giữ kết quả worker độc lập, kể cả khi kết quả tổng hợp của Run khác kết quả một worker. Các controls cũ mô phỏng một worker theo Run vẫn có kết quả tổng hợp sinh từ trạng thái Run, được ghi rõ `source: fixture-run-propagation`; đó không phải bằng chứng worker/provider đã trả kết quả thật.
- Chọn target không thay active. Nạp thành công mới đổi active; boot fail đặt active=null, giữ target lỗi. Recovery chọn bản theo operation và schema hiện tại; phục hồi không xóa target lỗi, lịch sử hay identity công việc.
- Các nút tạo Run/đánh giá yêu cầu/tái sử dụng Session là controls dựng kịch bản, không thêm form quản lý nghiệp vụ hoặc yêu cầu người dùng tự điều phối trong sản phẩm thật.

## Kiểm chứng và giới hạn

Model được kiểm bằng Node test runner; UI bằng các browser checks riêng. Kết quả ở [prototype-checks.md](prototype-checks.md). Có kiểm receipt key conflict, owner/identity, evidence scope/revision, serialization, kết quả worker độc lập, target/active/recovery và stale schema/operation.

Vẫn chưa có SQLite runtime, actual session dispatch, leases/fencing, transactions với native API, evaluator hoặc schema compatibility probe production. `S.compatible` và bằng chứng đánh giá vẫn là controls fixture. Offline chỉ giữ snapshot đã biết; chưa có trạng thái quan sát native đầy đủ để phân biệt unknown/dead qua mọi failure mode. Pause/cancel/provider stop vẫn mô phỏng.

Chưa tách bền vững mọi Attempt/Quality Iteration, Schedule Occurrence, Artifact registry, Evaluation Trial hoặc context provenance. Agent Catalog/Delegation Policy editor vẫn có coverage riêng chưa hoàn chỉnh. Checkpoint trong Run vẫn là chuỗi mô tả; không dùng refactor này để khẳng định resume/recovery production đã được triển khai.
