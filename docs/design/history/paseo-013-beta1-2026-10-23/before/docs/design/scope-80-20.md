# Phạm vi V1 — Project Harness trên Paseo

Cập nhật 2026-10-23 sau V02. Các năng lực và ranh giới bên dưới đã được xác nhận từng vòng; nội dung gate được chấp nhận V01 và phiên S02 đã kết thúc V02. Chưa triển khai đầy đủ V1. Tài liệu này thay các đề xuất cắt giảm cũ, không tự chứng minh capability Paseo.

## Điều chỉnh đang được làm rõ — vòng release nhỏ 2026-10-22

Đã xác nhận hai đường Fast path/Deep path theo mức ảnh hưởng, không mặc định kiểm toàn bộ mỗi đêm, và code giữ mức kiểm tối thiểu/budget trong khi agent chọn kiểm bổ sung. Chỉ tạm dừng công việc bị ảnh hưởng; mặc định fix-forward khi lỗi còn kiểm soát được, recovery độc lập khi plugin không khởi động hoặc mất khả năng tự sửa; backup trước thay đổi dữ liệu không tương thích/khó đảo ngược. Xem [Release policy](release-policy.md) cho quyết định hiện hành và các câu hỏi còn mở.

Người dùng yêu cầu: “Vòng lặp release ở đây là với từng thay đổi nhỏ luôn. Và chỉ có bản lớn mới đc kiểm tra kỹ càng”. Hiểu là: không chờ một bản phát hành hoàn chỉnh hoặc chạy bộ kiểm sâu cho mỗi thay đổi nhỏ; ưu tiên thời gian đưa cải tiến vào sử dụng và chi phí kiểm phù hợp dự án ngắn.

Đã tham khảo HBU ADR 0010 và code phát hành/kiểm ngày/kiểm đêm. HBU hiện dùng fix-forward-v1, cài main lên LIVE rồi startup/smoke, kiểm rộng riêng một lượt đêm; không giữ backup phiên bản hoặc tự rollback. Đây là facts của HBU, không tự trở thành quyết định áp dụng toàn bộ cho Project Harness.

Các mục checkpoint/backup/migration/health/recovery bên dưới đã điều chỉnh theo loại thay đổi; không phải mọi bản sửa nhỏ đều qua cùng đường kiểm nặng. Protocol, tiêu chí phát hiện ảnh hưởng và phạm vi kiểm cụ thể còn cần chốt. Prototype v7 đã đồng bộ policy mới; các hành vi vẫn là fixture. Active/Known-good chưa được thêm vào glossary trong vòng này.

## 1. Mục tiêu

Một Paseo Plugin triển khai Project Harness cho một dự án phần mềm đã có codebase, có thể gồm nhiều repo. Harness Engineering Orchestrator dựng Project Orchestrator, tiếp tục phát triển chính harness và các workflow phục vụ dự án. Native chat là interface chính; panel dành cho cấu hình, inbox harness, giám sát và phân tích.

Người dùng mô tả nhu cầu qua chat, không phải viết TypeScript để có Project Harness đầu tiên. Harness Engineering Orchestrator dựng, kiểm thử và cập nhật code workflow; code có thể xem và sửa. Không khóa lõi vào quy trình hoặc tên riêng HBU.

## 2. Những năng lực phải có

### Hai orchestrator và thực thi công việc

- Hai thành phần điều phối có inbox, context và vòng đời riêng, mỗi thành phần có Orchestrator Agent.
- Project Orchestrator tiếp nhận yêu cầu nghiệp vụ trực tiếp; thiếu năng lực tạo yêu cầu liên kết sang Harness Engineering Orchestrator.
- Workflow Runtime quản lý admission, trạng thái bền vững, checkpoint, giới hạn, kết quả, evidence và reconcile.
- Turn kết thúc không đủ để kết luận Run thành công; thao tác mất phản hồi phải đối soát trước khi thử lại.

### Workflow và cấu hình agent

- Đủ năm pattern: prompt chaining, routing, parallelization, orchestrator-workers và evaluator-optimizer; ghép tuần tự, song song và lồng nhau bằng code có version/test.
- Không yêu cầu graph editor hoặc ngôn ngữ workflow riêng trong V1.
- Người dùng tạo/nhân bản/sửa Agent Definitions, chọn native Paseo Agent Profile chính/fallback, Skills và principle policy auto/fixed/hybrid.
- Native profiles được tạo/sửa tại Paseo trước; không nhân đôi provider/model/thinking/mode editor.
- Skills được chỉ định tường minh tên và nguồn khi giao việc; giữ catalog kế thừa. Không cần skill isolation, fork hoặc monkey patch Paseo.
- Nghiệm thu cả Codex và Claude: giao việc, Skills/Principles, structured result, resume và fallback giữa profiles đáp ứng capability/quyền/contract.

### Bộ quản lý lịch tổng quát

- Một nơi quản lý lịch cho code Job, công việc agent và Workflow Run: tạo/sửa, bật/tắt, chạy ngay, lịch sử.
- Lịch một lần, interval và cron có timezone.
- Policy chạy chồng theo Job: bỏ lượt mới, giữ một lượt chờ hoặc chạy song song có giới hạn.
- Policy bỏ lỡ theo Job: bỏ qua, gom một lượt hoặc chạy bù có giới hạn.
- Polling Backlog/PR mặc định không chạy chồng và gom một lượt sau downtime.
- Dùng lại native Paseo schedules/heartbeats khi đáp ứng; mỗi lịch chỉ có một nơi sở hữu. Phải kiểm API native, không mặc định mọi hành vi trong UI đã có API.
- Người dùng yêu cầu hành vi Job mới qua chat; Harness Engineering Orchestrator xây handler, kiểm thử và đăng ký. UI không bắt người dùng nhập code vào form.
- Jobs chạy trên host Paseo; host tắt thì Jobs ngừng. Khi hoạt động lại, xử lý missed policy; không có dịch vụ cloud chạy thay host trong V1.
- Code polling giữ cursor, stable change identity, dedupe và pending delivery bền vững. Poll rỗng không gọi agent.

### Integrations

- Backlog làm nguồn task; GitLab làm nguồn merge request và comment. Tích hợp chạy thật.
- Adapter kết nối tách khỏi Workflow Runtime. Tracker/forge khác bổ sung sau qua Harness Engineering Orchestrator.

### Improvement Loop và tự cập nhật toàn plugin

- Quan sát outcomes/feedback → xác định vấn đề → candidate → kiểm thử/evaluation → activation → quan sát → giữ/lùi/chưa đủ căn cứ.
- Daily retro là Job phục vụ vòng cải tiến, không bắt buộc mỗi lượt phải tạo thay đổi.
- Có thể tự cập nhật UI, Workflow Runtime, Jobs, integrations, Skills, definitions và schema dữ liệu; không giới hạn self-improvement ở instructions.
- Tự kiểm và kích hoạt trong quyền/giới hạn đã cấp; không tự nới authority hoặc budget.
- Chỉ ngừng admission và chờ checkpoint cho công việc bị ảnh hưởng. Không ảnh hưởng Run hiện tại thì áp dụng ngay; chưa rõ ảnh hưởng hoặc thiếu đường tiếp tục an toàn thì hoãn và báo lý do, không replay effect mù quáng.
- Có recovery độc lập khi plugin không khởi động hoặc mất khả năng tự sửa. Không backup toàn bộ mỗi patch; trước thay đổi dữ liệu không tương thích/khó đảo ngược phải có backup đã xác minh đọc lại được, ưu tiên migration tương thích.
- Lỗi còn kiểm soát được xử lý fix-forward: ghi nhận, chặn chức năng bị ảnh hưởng và ưu tiên sửa. Lỗi làm plugin không khởi động/mất khả năng tự sửa thì recovery về bản chạy được gần nhất. Rollback code không mặc định là rollback dữ liệu. Kiểm bắt buộc trước/sau activation và protocol recovery còn cần chốt.

### Dashboard phân tích sâu

- Điểm chậm/chặn; kết quả theo agent, workflow, Skill và model; chi phí, thời gian, retries, mức cần người can thiệp; hiệu quả các cải tiến.
- Lọc theo thời gian/đối tượng/phiên bản, so sánh trước/sau, mở sâu tới Run/evidence.
- Tạo/lưu view: chỉ số, bộ lọc, nhóm, khoảng thời gian và phiên bản so sánh. Dùng các dạng bảng/biểu đồ có sẵn; chưa cần trình thiết kế bố cục kéo thả.
- Phân biệt quan sát vận hành với đánh giá có kiểm soát trên cùng tập việc và tiêu chí. Không suy ra quan hệ nhân quả từ các nhóm việc khác nhau.
- Chưa thu được dữ liệu thì hiển thị thiếu; không giả số, không kết luận khi chưa đủ căn cứ.

### Contribution upstream

- Có thể yêu cầu Harness Engineering Orchestrator tách phần dùng chung, chuẩn bị thay đổi, kiểm thử và tạo PR theo quyền.
- Chưa cần màn hình contribution riêng hoặc hệ thống tự động gửi mọi cải tiến local lên upstream.
- Tự cập nhật Project Harness không phụ thuộc upstream có nhận thay đổi hay không. Fork/PR trong ngữ cảnh contribution không có nghĩa fork Paseo để nạp Skills.

## 3. Ranh giới V1 đã chốt

- Một dự án phần mềm đã có codebase; luồng ý tưởng → repo rỗng → dựng nền sản phẩm để sau.
- Backlog và GitLab; chưa cam kết sẵn mọi tracker/forge.
- Codex và Claude; provider khác chưa cam kết trước khi kiểm cùng hợp đồng.
- Chạy trên host Paseo; chưa có dịch vụ cloud thực thi thay host tắt.
- Chưa có graph editor, ngôn ngữ workflow riêng, dashboard kéo thả hoặc contribution UI riêng.
- Dùng chat/session/workspace/native profile và native agent cadence của Paseo khi thích hợp, không dựng lại UI chức năng đã có.
- MCP Server có caller V1 cụ thể: Onboarding Agent dùng Tools để thiết lập cấu hình cần thiết và hướng dẫn plugin qua chat; xem [onboarding-agent.md](onboarding-agent.md). CLI quản trị khác chỉ bổ sung khi có nhu cầu, recovery độc lập vẫn bắt buộc. Không phát hành framework/store/event bus tổng quát chỉ để đủ sơ đồ module.

<a id="4-nghiệm-thu-v1--đề-xuất-chờ-xác-nhận"></a>

## 4. Nghiệm thu V1 — nội dung gate đã chốt V01

1. Từ plugin mới cài và native profiles có sẵn, người dùng cung cấp context dự án; Harness Engineering Orchestrator dựng Project Orchestrator mà người dùng không viết workflow code.
2. Một công việc thật đi từ chat hoặc Backlog qua workflow/workers, kiểm kết quả và bàn giao evidence; luồng GitLab nhận và xử lý comment mới đúng quyền, không tạo việc trùng khi polling lặp.
3. Cả năm pattern có kiểm chứng, cùng ít nhất một workflow tổ hợp chạy thật. Codex/Claude, fallback và resume được kiểm theo hợp đồng đã chốt.
4. Code Job, công việc agent và Workflow Run được quản lý lịch; once/interval/cron/timezone cùng overlap/missed policy được kiểm, gồm trường hợp host gián đoạn.
5. Improvement Loop tạo và áp dụng thay đổi có bằng chứng. Tự cập nhật code plugin được kiểm bằng thay đổi UI, runtime và schema dữ liệu; có ca bản cập nhật lỗi để chứng minh recovery độc lập và trạng thái tiếp tục được bảo toàn.
6. Dashboard dùng dữ liệu vận hành thật, lưu view và drill-down tới evidence; phân biệt quan sát với đánh giá có kiểm soát, hiển thị thiếu dữ liệu khi chưa có.

Các mục này là yêu cầu nghiệm thu, chưa là test pass. SDK, scheduler implementation, storage schema và migration protocol vẫn cần thiết kế/kiểm chứng; không đổi yêu cầu sản phẩm chỉ vì spike chưa có capability.

[V01: P3168 → P3170](history/v1-v01-2026-10-23/acceptance-v01.json) chấp nhận sáu nhóm trên cho first V1, target Paseo 0.12 trên một dự án. Có thể thu bằng chứng qua các thay đổi nhỏ; không yêu cầu dồn tất cả vào một release hoặc chạy full gate cho mọi patch. Existing Fast/Deep policy và các kiểm bắt buộc giữ nguyên.

V01/Q2 chốt ít nhất một ca có kiểm soát chứng minh harness quan sát vấn đề → tự sửa → kiểm trước/sau cùng tiêu chí/điều kiện liên quan → activation trong quyền. Không bắt chờ nhiều tuần xu hướng live để nghiệm thu V1; lợi ích rộng hơn về chất lượng/chi phí chỉ kết luận khi đủ evidence, nếu thiếu giữ inconclusive. [Acceptance matrix](v1-acceptance-matrix.md) ánh xạ 14 evidence bundles và giới hạn lớp kiểm. [S02 đã closed tại V02](history/v1-v02-2026-10-23/closure-v02.json); sản phẩm chưa được nghiệm thu chỉ từ acceptance của gate.
