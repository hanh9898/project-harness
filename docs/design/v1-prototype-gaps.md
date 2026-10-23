# Đối chiếu prototype với phạm vi V1

Ngày 2026-10-22. Đọc trực tiếp prototype.html, prototype-spec.md và scope-80-20.md. Đây là rà coverage của UI/flows trong HTML, không phải live test hoặc kết luận khả thi API Paseo. Các điều kiện nghiệm thu tổng thể trong scope vẫn chờ xác nhận cuối; những năng lực người dùng đã chốt từng vòng được dùng để rà.

## Cập nhật coverage sau sửa prototype v6

Năm nhóm thiếu ban đầu bên dưới đã được bổ sung ở mức UI/flow fixture:

- AN01–AN03: Analytics, saved views, so sánh quan sát/controlled trial, thiếu dữ liệu và Run/evidence drill-down.
- T03–T05: lịch code/agent/workflow, once/interval/cron, bounded policies, handler request/check/register và Backlog/GitLab binding/delta/error/dedupe.
- RL01–RL03: phạm vi candidate toàn plugin, checkpoint/defer, backup/migration/reload, health/resume, known-good và recovery companion có nhánh restore lỗi.
- O03: bước lồng, parallel/join, worker unit động theo trần, attempt/quality iteration và links agent/evidence.

Các mục bên dưới giữ mô tả trước khi sửa để truy vết. Không còn coi chúng là danh sách màn chưa được dựng. Giới hạn còn lại: dữ liệu mô phỏng, cron preview chỉ các mẫu hiển thị, native schedule handoff chưa nối API, không có evaluator/provider/scheduler/update thật. Xem prototype-checks.md cho kiểm UI sau sửa.

## 1. Thiếu nhóm màn Analytics

Prototype chưa có route Analytics, metric explorer, saved views hoặc màn so sánh phiên bản. overviewView chỉ có bốn thẻ đếm/trạng thái, danh sách work và link; không đáp ứng dashboard phân tích sâu.

Cần thiết kế: tổng quan phân tích, view explorer với lọc/nhóm/chỉ số/khoảng thời gian, tạo/sửa/lưu view, so sánh vận hành và đánh giá có kiểm soát, drill-down tới Run/evidence; trạng thái thiếu dữ liệu/chưa đủ căn cứ. Có thể dùng chung route với tabs/detail, không bắt mỗi chức năng là một trang riêng.

## 2. Jobs & schedules có nhưng thiếu hành vi lịch tổng quát

schedulesView mới có form code Job: tên, hai handlers fixture, cron, hai timezone, timeout; overlap skip/missed coalesce là text cố định. nativeSourcesView có refs/delivery và policy riêng, bàn giao cadence sang Paseo. Đây chưa là một nơi quản lý đủ code Job, công việc agent và Workflow Run.

Cần mở rộng: chọn loại executor/target, once/interval/cron, timezone, preview thời điểm chạy, overlap/missed bounded theo Job, hàng lượt chờ/chạy bù, lịch sử lần chạy có trạng thái/lỗi/evidence. Job handler mới được tạo qua chat cần flow liên kết yêu cầu → candidate/check → đăng ký → cấu hình lịch; không cần code editor trong form. Dùng lại surface native khi phù hợp và hiển thị nơi sở hữu, không clone cùng một lịch.

## 3. Cải tiến/recovery có nhưng thiếu cập nhật toàn plugin

improvementsView có hypothesis/baseline/candidate, eval pass/fail, authority, monitoring và verdict; candidate fixture cụ thể chủ yếu đổi role catalog. recoveryView có plugin không boot, known-good và compatibility toggle. Chưa mô tả đủ flow cập nhật UI/runtime/schema.

Cần mở rộng chi tiết candidate/release: phạm vi file/component thay đổi, kết quả kiểm, ảnh hưởng Run đang có, dừng admission → checkpoint/hoãn → backup/migration → reload → health/resume checks → monitoring. Mỗi bước cần trạng thái và bằng chứng. Recovery companion cần tiến trình tự phục hồi code/dữ liệu, kết quả phục hồi Run và lỗi khôi phục, không chỉ nút mô phỏng thành công. Companion nằm ngoài plugin lỗi.

## 4. Chi tiết Run có nhưng chưa thể hiện workflow tổ hợp

activityView có trạng thái tổng, revisions, checkpoint, timeline, bundle, links agents/evidence; chưa có cấu trúc thực thi đủ để theo dõi nhánh route, các bước song song/join, worker động, workflow lồng và các vòng evaluator-optimizer.

Cần mở rộng O03 bằng cây/bảng bước thực thi có parent/attempt/iteration, trạng thái/blocker/kết quả và links; không yêu cầu graph editor hoặc màn nhập yêu cầu nghiệp vụ.

## 5. Thiếu chi tiết liên kết và vận hành integration

Backlog/GitLab hiện xuất hiện qua hai code handlers fixture. Chưa có view đủ về binding Backlog project/GitLab repo-MR, trạng thái truy cập, cursor/sync, comment nguồn → inbox → Run và lỗi nguồn.

Cần đưa chi tiết vào Job detail/config thích hợp, dùng references tới kết nối/quyền có sẵn; thiếu phần nào hỏi qua chat. Đây không phải yêu cầu dựng login/secret manager hoặc trang integrations độc lập trùng Paseo.

## 6. Những phần đã có nền và không cần dựng lại

Native chat handoff, overview/work list, Agent Definitions với ordered native profile fallback, Skills/Principles, role catalog, config diff/revision, inbox/decision, evidence/audit và offline/recovery mock đã có. Cần nối thêm flow/state nêu trên; không dựng profile editor/provider settings/native agent manager hoặc contribution UI riêng.

## 7. Tài liệu cần theo prototype mới

prototype-spec.md và prototype-checks.md vẫn mô tả phạm vi prototype cũ: cron code Jobs, native schedule handoff và candidate/recovery đơn giản. Cần cập nhật spec/coverage khi thiết kế các phần thiếu. Không dùng kết quả kiểm prototype trước đây để khẳng định các năng lực V1 mới đã có.

## Cập nhật v7 — release policy

Các mô tả RL01–RL03 về dừng mọi việc/backup mọi patch/auto restore store/monitoring gate phía trên là lịch sử v6. V7 đã thay bằng Fast/Deep path, checkpoint theo ảnh hưởng, backup có điều kiện, fix-forward và recovery độc lập khi plugin không boot. [Spec hiện hành](prototype-spec.md) · [57 assertions UI](prototype-checks.md) · [Bằng chứng runtime riêng](release-verification-results.md).

## Cập nhật v9 — các điểm gộp model đã xử lý trong fixture

Work Item/Workflow Run và Assignment/Session có arrays/IDs/quan hệ riêng, request resolution tách Run completion. Release target/active/recovery không còn chung một scalar. [Model notes](prototype-model-notes.md) ghi identifier hiện hành và giới hạn. Đây là sửa dữ liệu thực của prototype, chưa phải workflow runtime production; các mô tả “còn gộp” ở kết quả v8 là lịch sử.
