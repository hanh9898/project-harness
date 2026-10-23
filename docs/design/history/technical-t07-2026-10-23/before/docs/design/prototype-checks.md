# Kết quả kiểm HTML prototype

Cập nhật 2026-10-22 sau thay đổi settings 80/20 và Danh mục agent. Đối tượng [prototype.html](prototype.html), theo [prototype-spec.md](prototype-spec.md). Đây là kiểm UI/state fixture, không phải nghiệm thu runtime.

## Phạm vi hiện hành

- Mới cài mở native chat harness giả lập, dùng context Paseo; không wizard host/provider/project riêng.
- Cấu hình chỉ còn Agents/Limits/Actions/Automations, typed fields và scope kit; Agents có editor definitions trực tiếp, chọn refs tới native profiles được tạo trước; không multi-scope inheritance engine hoặc provisioning form lặp.
- Danh mục agent có năm trách nhiệm worker, chi tiết when-to-use/procedures/skills/profile/result và mục lục principles. Scenario selection giải thích role/entry skill/principles và ảnh hưởng tới phép kiểm.
- Work và assignment pin bundle/contract/settings/team revision. Catalog candidate không sửa snapshot cũ hoặc authority của settings.
- Candidate eval/activation/monitoring mô phỏng xử lý allow/ask/deny, capability, compatibility, release/catalog drift và rollback.
- Code jobs có quản lý riêng; native agent schedules chỉ tham chiếu. Monitor assignment mở session Paseo thay clone tools/log manager.

## Phương pháp

Script trích từ HTML kiểm cú pháp với `node --check`; relative/local links và Markdown fences được kiểm. `html_preview` dựng HTML tự chứa, phát DOM click/input/change/submit qua controls, assertions state/rendered content và overflow. Không chạy app/backend hoặc tạo resource Paseo.

Suite chính 68 assertions đã trả `status: passed` tại 728 và 375 CSS px. Suite bổ sung 16 assertions trả pass tại 375 px (bản trước 15 assertions pass tại 728 px); bổ sung cuối kiểm nút approval stale không xuất hiện sau revoke. Suite code-jobs hồi quy 16 assertions pass tại 728 px. Kiểm không tràn ngang qua 15 routes chính/chi tiết của suite hiện hành; đã xem screenshot settings tại 728 px.

## Hành vi được kiểm ở các vòng trước v7

Các dòng monitoring/rollback/known-good dưới đây là lịch sử, không phải policy release hiện hành. Luồng v7 được kiểm riêng ở cuối tài liệu.

| Nhóm | Kết quả |
| --- | --- |
| Bốn nhóm settings; không scope selector/provisioning; Automations không copy cadence | Đạt |
| Giới hạn nguyên dương, profile chưa resolve, action không hợp lệ bị từ chối | Đạt |
| Settings draft/diff/reset/rebase/stale conflict; active/observed sync; restore tạo revision mới | Đạt |
| Chat request số worker tạo draft, không tự tăng trần; chat và settings dùng cùng đường thay đổi | Đạt |
| Role detail và scenario replay chọn Investigate/debug; principles có tình huống và tác động | Đạt |
| Poll rỗng không agent/work; thiếu skill chặn dispatch; hết slot không tự tăng worker ceiling | Đạt |
| Implement thiếu native write/test tạo quyết định trước dispatch; sửa nhỏ không ép worker thừa | Đạt |
| Work/assignment pin bundle; profile settings hoặc catalog đổi không sửa snapshot cũ | Đạt |
| Candidate eval fail giữ đội cũ; pass+allow active cho assignment mới; settings/limits không đổi | Đạt |
| Ask chờ quyết định một lần và giữ policy ask; deny chặn; đổi authority rồi recheck có kiểm | Đạt |
| Revoked authority không bị approval cũ vượt qua; candidate stale không ghi đè catalog | Đạt |
| Monitoring keep cập nhật known-good; regression rollback tương thích, incompatible bị chặn | Đạt |
| Capability thiếu chặn promotion; retro thiếu evidence không tạo candidate | Đạt |
| Work pause desired/observed, ack/resume, fail giữ evidence; offline không dispatch/reconnect không trùng agent | Đạt |
| Chat input escape/hai histories riêng; drafts qua route; v3 localStorage roundtrip giữ team/settings | Đạt |
| Jobs create/edit/timeout validation/pause; empty poll no agent; delta/callback dedupe | Đạt |
| Known-good recovery fixture; các routes được kiểm không overflow desktop/mobile | Đạt |

## Giới hạn

Role/procedure/skills/profile/principles và lý do chọn là fixture viết sẵn, không có selector LLM hoặc discovery thật. Có tên principle và impact text không chứng minh agent thực sự đã áp dụng hoặc cải thiện chất lượng. Độc lập review là hợp đồng/workflow minh họa, chưa là agent review thực đã chạy.

Candidate chỉ minh họa sửa hợp đồng Investigate trong catalog; không là editor definitions/code/skills đầy đủ. Eval/pass/fail/monitoring do control kịch bản, không gọi evaluator/test runner thật. Không tuyên bố latency/cost/outcome improvements đã đo.

Actions và capability guards chỉ điều khiển state cục bộ, chưa cưỡng chế provider/shell/MCP/host. Work deadline và budget thật, SQLite/journal/outbox/lease, scheduler/API polling/Git/worktree, plugin reload/recovery protocol và native navigation vẫn cần [verification.md](verification.md). Provider login/host controls/sessions dùng Paseo, không dựng lại để bù thiếu tích hợp.

LocalStorage v5 chỉ lưu fixture; không là production store/transcript. Kiểm roundtrip không thay crash recovery hoặc kiểm mở lại runtime. Dữ liệu fixture v2/v3 trước thay đổi agent definitions không được migrate sang v5, tránh mang schema cũ thành cấu hình mới.

Không kết luận đã kiểm mọi tổ hợp role/provider/state, full cron semantics, accessibility hoặc usability với người dùng thật. Prototype phục vụ review hành trình và ownership trước implementation.

## Kiểm bổ sung: native profile trước, harness composition sau

Bản v5 bỏ editor provider/model/thinking/mode. Suite raw-model editor v4 đã lỗi thời, không dùng làm bằng chứng cho bản hiện tại. LocalStorage v5 dùng fixture mới; không migrate cấu hình raw-model v4 thành native profile refs giả.

Các ca kiểm hiện hành: chỉ chọn native profile có sẵn, primary/fallback refs, validation thiếu/trùng, empty catalog hướng dẫn mở Paseo, fallback availability, deny không fallback, snapshot cũ bất biến khi native profile đổi, skills/principles và role bindings. Suite native-profile có 27 assertions pass ở 728 và 375 px. Hồi quy suite đội 68 assertions và code jobs 16 assertions pass ở 728 px; suite import nguồn 16 assertions cũng pass sau khi đổi sang native refs. Các kiểm tra chạy bằng script trong HTML preview, không phải tích hợp Paseo thật.

Catalog native profile/availability chỉ là fixture đọc, chưa có discovery, navigation hoặc dispatch thật qua Paseo. Import SKILL.md chỉ đọc metadata client; không install/execute trên host. Các kết quả kiểm hồi quy jobs/team trước đây là lịch sử của v4, chưa thay bằng chứng kiểm tích hợp production.


## Kiểm sau đồng bộ glossary — 2026-10-22

Đã cập nhật tên Project Harness, Harness Engineering Orchestrator, Project Orchestrator và Initial Project Orchestrator trong MD/HTML; làm rõ Orchestrator Agent, Workflow Runtime và giới hạn Skills riêng từng agent. Giữ các resource IDs, route IDs và schema fixture v5; không thay giao thức runtime hoặc ADR lịch sử.

Kiểm cú pháp JavaScript của ba HTML pass; liên kết tương đối trong docs/design không có đích thiếu. Browser kiểm 12 routes ở kịch bản vận hành pass. `html_preview` kiểm hai kịch bản mới cài/vận hành × 12 routes tại 375 và 728 CSS px: mỗi kích thước 24 lượt render pass, không route thiếu hoặc tràn ngang. Trang resources hiển thị rõ capability gap per-agent skill isolation. Đây là kiểm render/thuật ngữ, không phải chạy lại toàn bộ suite hành vi trước đó hoặc nghiệm thu capability Paseo.


## Prototype V1 v6 — sau vòng grill 2026-10-22

Đã bổ sung năm nhóm coverage: Analytics/saved views/compare; lịch tổng quát; Plugin releases/recovery; cây Workflow Run; chi tiết nguồn Backlog/GitLab. Fixture storage key chuyển sang v6; giữ nguyên dữ liệu v5 cũ, không migrate hoặc chạm production state.

Kiểm tương tác qua DOM browser: **35 assertions pass**, sau đó lặp cùng hành vi qua `html_preview` tại **375 và 728 CSS px**, mỗi kích thước kiểm thêm **20 routes** không missing/overflow. Lượt kiểm guard bổ sung **6 assertions pass**: activation ask, dừng admission, revoke quyền trước reload, giữ baseline/tiếp tục work khi activation bị chặn, offline không tạo lượt và có thông báo. Cú pháp JavaScript của ba HTML pass. Đã xem screenshot Analytics 728 px và release detail 375 px; schedule editor 375 px render không có lỗi console.

Các hành vi được kiểm gồm: fresh thiếu dữ liệu; nạp mẫu có nguồn; save/load view và nhóm theo model; cost thiếu không thành 0; controlled trial không có thì chưa kết luận; evidence không thiếu metadata; handler request/fail/pass/register/schedule; workflow interval và agent once đúng owner; parallel cap/catchup bounded; empty poll/delta dedupe/source permission; bước lồng/join/dynamic unit theo worker ceiling; quality iteration khác technical retry; candidate fail/defer/checkpoint/backup/reload/health failure; restore failure giữ maintenance; code/store phục hồi cùng agent identities; healthy candidate thành known-good.

Không chạy lại toàn bộ suite v5. Các kết quả này chỉ kiểm UI/state fixture v6, không chứng minh native API, scheduler, provider enforcement, polling integration, tự cập nhật hoặc migration/recovery thật. Cron chỉ kiểm hình thức và hiển thị một số thời điểm mẫu ở mốc cố định; chưa kiểm parser cron đầy đủ hoặc DST. Các số liệu Analytics và trial là dữ liệu minh họa, không là kết quả đo production. Màn T03 dùng ownership native/harness mô phỏng, chưa nối SDK để quản lý native schedules.

## Prototype v7 — release nhỏ theo policy mới

Đã đổi storage key sang v7; không migrate state fixture v6. Fast/Deep path, checkpoint theo owner/phạm vi, backup chỉ cho kịch bản schema khó đảo ngược, hoãn khi chưa rõ ảnh hưởng. Health sau activation kiểm mới; không đợi monitoring cố định. Lỗi chức năng đi fix-forward, lỗi không boot đi companion độc lập; schema không tương thích chặn recovery, không restore store cũ tự động. Catalog regression cũng không tự rollback.

[Script kiểm browser](prototype-release-checks.js) đạt **57 assertions tại 375 và 728 CSS px**, gồm render/không overflow trên 12 routes. Browser desktop 1280 px đã đạt 43 assertions ở bản trung gian; kết quả cuối dùng suite 57 ở hai kích thước trên. Kiểm cú pháp JS pass. Đã xem screenshot release detail 728 px; scenario selectors giữ đúng scope candidate sau render. Không chạy lại toàn bộ suite agents/scheduler/Analytics cũ.

Các nhánh kiểm mới: Fast path không backup/checkpoint toàn bộ; partial admission và không advance Run bị chặn; hoãn/reclassify unknown impact; backup fail giữ baseline; authority ask/deny/revoke, baseline/compatibility drift trước reload; lỗi muộn giữ code/data và tạo việc sửa; một activation trong khi sửa; fix-forward tôn trọng authority; recovery giữ data metadata, compatibility chặn; catalog regression/fix không tự rollback.

Các kết quả này là UI fixture. [25 ca kiểm runtime/spike](release-verification-results.md) là bằng chứng riêng, không biến HTML thành plugin đã nối Paseo. Companionship UI ngoài plugin lỗi chỉ được mô phỏng; chưa có native recovery screen production.

## Prototype v8 — onboarding/lifecycle

Đã thêm menu quản lý ba bước Onboarding Agent → Harness Engineering Orchestrator → Project Orchestrator; bỏ hai mục chat bắt buộc. Các route chat cũ mở điểm bàn giao native Session, không hiện composer riêng. Tên menu còn là đề xuất. Điều khiển fixture mô phỏng MCP config/check/complete, build handover và Replace Session; không gọi daemon/provider.

[Onboarding checks](prototype-onboarding-checks.js): **27 assertions pass ở 375 và 728 CSS px**. [Release regression checks](prototype-release-checks.js): **57 assertions pass ở cả hai kích thước**, gồm render/không overflow trên 12 routes. Kiểm cú pháp JS pass. Đã xem preview 728 px. Bản trung gian cũng được kiểm ở 1280 px; kết quả cuối được báo theo hai kích thước trên.

Các ca mới gồm thứ tự Spawn, click lặp chỉ Open, profile/công cụ thiếu, report stale, host offline, cấu hình tối thiểu không cần integrations, lưu bàn giao, không tự đánh dấu năng lực thực tế đã verified, chờ đối soát khi thay Session, giữ Session history/work và hiển thị Session trong monitor fixture. Đã reload trang thật ở 375 px: Session `fixture-session-013` và counter 14 được giữ nguyên, không spawn thêm. Đã sửa lỗi loader v7 trước đó kiểm nhầm version 6 khiến state bị reset khi reload; v8 kiểm đúng version 8.

Chưa kiểm provider/native API, authority fencing, worker tiếp tục thật, lỗi giữa các bước chuyển giao, bootstrap MCP hoặc vận hành scheduler. Chỉ lưu localStorage fixture, không chứng minh durability SQLite. Handover fixture dùng metadata tối giản; không giả đầy đủ journal/checkpoint production.

## Prototype v9 — domain identities và release roles

[Model notes](prototype-model-notes.md) ghi phạm vi, source và cách build inline. **13 Node model tests đạt** bằng `node --test docs/design/prototype-model.test.cjs`. Cùng interface model được gọi từ HTML; `node docs/design/build-prototype-model.cjs --check` xác nhận không có hai implementation khác nhau. Kiểm cú pháp JavaScript pass.

Browser ở **375 và 728 CSS px**: **27 onboarding + 57 release regression + 29 model assertions = 113 assertions tại mỗi kích thước**, gồm các detail mới và không overflow. Các scripts: [onboarding](prototype-onboarding-checks.js), [release](prototype-release-checks.js), [model](prototype-model-checks.js). Đã xem preview 728 px; trường hợp yêu cầu chưa giải quyết nhưng có Run completed được thể hiện đúng. Các bản model/source đã chỉnh cuối giữ nguyên cả ba bộ kiểm.

Đã reload trang thật ở 375 px, so sánh đầy đủ dãy Work Item/Run/Assignment/Session IDs và target/active/recovery refs trước/sau: giống hệt, không tạo thêm entity. Storage v9 dùng key riêng, không migrate hoặc xóa key v8 cũ. Không dùng kiểm JSON serialization làm bằng chứng durability SQLite.

Ca mới: yêu cầu không có Run, một yêu cầu nhiều Runs, Run completed không tự resolve, đánh giá yêu cầu có scope/revision/evidence riêng, một Session nhận nhiều Assignments không mất snapshot/outcomes, worker Outcome khác kết quả tổng hợp Run, active có thể chưa verified, target lỗi không active, stopped runtime không active, recovery selection theo operation/schema và giữ identity công việc.

Các controls vẫn là fixture. Chưa có evaluator, native runtime, compatibility probe, provider stop/fencing hoặc storage transaction production; assignment kết quả của controls cũ có nguồn `fixture-run-propagation`. Attempt/Quality Iteration, Occurrence/Artifact/Trial registries và Checkpoint đủ để resume còn chưa triển khai bền vững.

## T03 follow-up — prototype gap

The [T03 runtime connection prerequisite](prototype-spec.md#t03-follow-up--runtime-connection-prerequisite) was accepted after the existing HTML v9 checks. **Not implemented or tested in HTML**: connection/auth metadata states, blocking Spawn before initial connection, reference persistence/reconnect, and retaining disabled jobs/Pause/lifecycle identities. Native MCP token persistence/redaction is separately unverified runtime behavior. Earlier fixture pass counts do not include these obligations. Only the specification and design documents changed in this follow-up.

## T05 follow-up — prototype gap

[Conditional schedule ownership](prototype-spec.md#t05-follow-up--conditional-schedule-ownership) is accepted in design, not fully represented or tested in HTML v9. Missing proof includes source choice by required contract, harness-owned agent/workflow cadence versus native handoff, unsupported native binding states, and uncertain migration without duplicate activation. Existing schedule target/form fixtures do not establish these semantics or native Pause/catch-up/admission. No new UI pass is claimed.
