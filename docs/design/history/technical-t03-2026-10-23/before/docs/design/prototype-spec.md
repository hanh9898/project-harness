# Đặc tả HTML prototype của Project Harness

Ngày: 2026-10-22. Đã sửa theo [ranh giới Paseo](paseo-boundary.md); phạm vi là prototype tương tác, không phải triển khai backend/plugin. Nguyên tắc sản phẩm theo [interaction-model.md](interaction-model.md); cấu hình theo [configuration.md](configuration.md). Bố cục, fixture và chi tiết điều khiển dưới đây là đề xuất thiết kế để review.

## 1. Mục đích và ranh giới

Prototype phải cho phép đi từ trạng thái mới cài tới vận hành, quan sát tác động của các thao tác và mở chi tiết liên quan. Đây là shell minh họa trải nghiệm trong Paseo, không tái tạo toàn bộ Paseo. Các vai trò dùng native Paseo Session; panel cung cấp hành động Spawn/Open Session/Replace Session và không trở thành form quản lý nghiệp vụ.

Tất cả dữ liệu, phản hồi chat, agent, config, schedule, eval và recovery là mô phỏng cục bộ. Không gọi LLM/daemon, chạy lệnh, đăng nhập thật, chọn file hệ thống, tạo repo/worktree hoặc publish. Không nhập secrets; kết nối chỉ dùng trạng thái và reference giả lập.

## 2. Điều hướng và màn hình

| ID | Màn hình | Trách nhiệm và tương tác bắt buộc |
| --- | --- | --- |
| L01 | Agent lifecycle — tên menu đề xuất | Ba hành động theo thứ tự Onboarding Agent → Harness Engineering Orchestrator → Project Orchestrator; readiness/blockers và bản bàn giao |
| L02 | Native Session handoff fixture | Spawn lần đầu, Open Session các lần sau; không thêm composer; điều khiển fixture tách khỏi UI sản phẩm |
| L03 | Replace Session | Thể hiện chuyển giao đang chờ đối soát, giữ Session history và assignments; không tự tạo trùng |
| O01 | Tổng quan vận hành | Trạng thái bộ, hai orchestrator, discovery/verified, hoạt động/chờ/quota/lịch và cải tiến |
| O02 | Hoạt động | Lọc trạng thái; mở chi tiết, pause/resume/cancel với desired/observed riêng |
| O03 | Chi tiết hoạt động | Timeline, checkpoints, role/config/criteria revisions, linked work/agent/chat/evidence; mô phỏng bước tiếp/kết quả |
| O04 | Phân công agent | Projection owner/role/WorkRef; mở native agents trong Paseo |
| O05 | Chi tiết assignment | Snapshot của work và tham chiếu session; mở native tools/log, không clone agent manager |
| H02 | Inbox harness | Tạo yêu cầu harness, lọc và xử lý yêu cầu; câu hỏi có evidence, ảnh hưởng và câu trả lời được ghi lại |
| C01 | Config catalog | Bốn nhóm Agents/Limits/Actions/Automations; một scope kit, profile refs, giới hạn và quyền hành động; không generic inheritance engine |
| C02 | Config draft / diff | Sửa nháp, validation/capability/expected revision, xem ảnh hưởng, kích hoạt mô phỏng và sync; hoàn tác nháp/khôi phục revision |
| T01 / T03 | Jobs & schedules | Code/agent/workflow, once/interval/cron, timezone, target, pause/run-now, overlap/missed bounded; mỗi lịch một nơi sở hữu |
| T02 | Binding policy / receipts | Sửa workflow overlap/missed với revision; delivery→WorkRef; callback giả lập để kiểm dedupe |
| I01 | Cải tiến / retro | Danh sách và yêu cầu retro; có thể kết luận thiếu evidence không tạo candidate |
| I02 | Chi tiết cải tiến | Hypothesis → baseline/eval → activation → monitoring → giữ/lùi/blocked; không thêm human approval cho mọi bước tự động |
| E01 | Evidence | Danh sách và chi tiết kết quả/nguồn/revision; liên kết work và candidate; phân biệt thiếu/bị lỗi và đủ bằng chứng |
| A01 | Lịch sử | Audit config/decision/delivery/release, lọc và liên kết đối tượng; không phải private transcript dump |
| R01 | Recovery | Host offline/reconcile; khi plugin không boot, hiển thị đường recovery companion/CLI known-good ngoài plugin, không giả panel lỗi tự chạy |

Các detail dùng cùng shell/route hoặc drawer nhưng phải có đích điều hướng và liên kết quay về. Bỏ S01–S03 wizard. Các route project/harness cũ chuyển tới điểm bàn giao native Session; không còn là hai mục menu chat bắt buộc và không chứng minh native chat integration. Route `paseo/*` chỉ là điểm bàn giao có giải thích, không là deep link đã tích hợp.

## 3. Trạng thái cục bộ tối thiểu

- Bộ: setup, discovery, verification, operational; host connected/offline; plugin healthy/failed.
- Hai orchestrator: logical owner và agent session; chat/messages theo owner, không dùng một conversation chung.
- Work: queued/running/evaluating/pausing/paused/cancelling/completed/failed/blocked/cancelled; desired state, revision, linked agents, timeline, evidence và pinned config/criteria.
- Config: active revision/values, nháp, expected revision, observed sync và history; scope kit, roles là bindings tường minh.
- Trigger: native source/cadence/timezone/enable snapshot chỉ đọc; policy của harness có revision; delivery ledger và stable occurrence → WorkRef.
- Cải tiến: proposal/evaluating/rejected/monitoring/retained/rolled-back/blocked; candidate và baseline/evidence/known-good.
- Decisions: vấn đề, scope, recommendation, trạng thái và reply; audit/evidence refs.

Lưu dữ liệu prototype trong localStorage nếu môi trường cho phép; nếu không, báo chỉ giữ trong phiên. Có reset toàn bộ dữ liệu ví dụ. Đổi route không mất chat/config draft; reload khôi phục state prototype. Không tuyên bố localStorage là thiết kế durable store production.

## 4. Flow bắt buộc

### A. Mới cài → onboarding → dựng → khởi chạy → kiểm chứng

Cài bằng Plugins Paseo → L01 → Spawn Onboarding Agent → L02 bàn giao native Session có MCP. Fixture mô phỏng lưu cấu hình tối thiểu, check theo revision rồi hoàn tất; không dựng wizard cấu hình lại Paseo. Thiếu integration không cần cho bước dựng chỉ là optional gap.

Người dùng Spawn Harness Engineering Orchestrator → fixture dựng bộ ban đầu và lưu bàn giao → code checks mở nút Spawn Project Orchestrator. Người dùng chủ động khởi chạy để trao đổi công việc chi tiết trong native chat. Chưa công nhận năng lực công việc thực tế đã kiểm chứng chỉ vì dựng xong.

Click lặp mở Session hiện có. Replace Session riêng: chờ đối soát rồi chuyển vai trò; giữ history và work. Offline, profile/tool thiếu hoặc report stale chặn bước phụ thuộc. Reload khôi phục fixture từ localStorage; không tự spawn.

### B. Công việc dự án và năng lực harness

Yêu cầu nghiệp vụ qua native Project Orchestrator Session. Yêu cầu năng lực tạo H02 linked work để Harness Engineering Orchestrator tiếp nhận; panel theo dõi hai phía. Các chat route cũ chuyển tới điểm bàn giao Session, không hiển thị composer riêng.

### C. Config

C01 sửa nháp trong scope kit → C02 validate/diff → activate mô phỏng → pending sync → reconcile. Capability thiếu, field invalid hoặc revision stale phải hiện lỗi và không kích hoạt. Run đang chạy giữ revision; config monitor có thể áp dụng ngay, profile binding/skill/tool cho lượt mới, store harness cần maintenance. Nháp giữ khi điều hướng; undo chỉ xóa nháp. Restore tạo revision mới, không xóa audit.

### D. Lịch

T03 quản lý code Job, agent và Workflow Run; cấu hình once/interval/cron, timezone, overlap/missed cap, xem history. Agent cadence do Paseo sở hữu, UI mô phỏng thao tác tới đúng nguồn và có điểm bàn giao; native refs cũ ở T02 chỉ đọc. T04 yêu cầu handler mới qua chat, kiểm rồi đăng ký. T05 nối source → inbox → Run/evidence; delta lặp không nhân đôi work. Không có cron engine/API poll thật; preview là thời điểm fixture, không kiểm parser cron/DST.

### E. Cải tiến

H01/H02/retro → I02. Eval fail giữ bản cũ; eval pass kiểm quyền activation allow/ask/deny, capability/compatibility/revision và kiểm sau activation. Kiểm bắt buộc đạt thì release đạt, tiếp tục quan sát mà không có cửa sổ monitoring cố định. Regression khoanh vùng được đi fix-forward; plugin không boot/mất khả năng tự sửa mới recovery độc lập. Retro không đủ dữ liệu có kết luận inconclusive.

### F. Gián đoạn

Offline giữ snapshot/nháp, chặn dispatch/activation, báo lần đối soát; reconnect nhận lại work/agents thay vì tạo trùng. Lỗi chức năng tạo việc sửa, giữ dữ liệu hiện tại. Plugin không boot mở R01 companion độc lập; schema không tương thích chặn recovery code, không tự restore backup cũ làm mất việc mới.

## 5. Quy tắc tương tác

- Mọi nút nghiệp vụ có hành vi cục bộ xác định; thao tác chưa mô phỏng phải được disable và giải thích, không để nút giả im lặng.
- Action mô phỏng được ghi rõ. Không dùng một spinner rồi tự báo hệ thật thành công. Kết quả chạy, sync và eval do thao tác kịch bản chuyển trạng thái xác định, không phụ thuộc timer ngẫu nhiên.
- Trạng thái rỗng/loading/chờ/lỗi/thành công phải có thông điệp và bước tiếp phù hợp. Loading được mô phỏng bằng trạng thái đang xử lý có nút tiến bước, không dùng chờ dài.
- Nội dung nhập được render như text. Không dán input trực tiếp vào HTML. Secrets không có input giá trị thật.
- Điều hướng hash và liên kết đối tượng giữ context; form dùng label, validation theo field, focus rõ và có bố cục mobile không tràn ngang.
- Nút thao tác work và schedule có nghĩa riêng. Provider idle không tự completed; result thiếu evidence không pass; pause desired chưa là paused observed.

## 6. Scenario controls cho review

Thanh prototype riêng, phân biệt với sản phẩm: Mới cài; Khám phá dự án; Đang vận hành; Host offline; Chạm giới hạn; Plugin update lỗi; Reset dữ liệu. Chọn scenario thay fixture có giải thích, không âm thầm sửa config đang review. Các điều khiển tiến bước/eval/result/duplicate delivery được gắn nhãn mô phỏng.

## 7. Ma trận kiểm prototype

| Ca | Màn hình / hành vi |
| --- | --- |
| PT01 | Fresh vào L01, chưa tự spawn agent; không wizard/kết nối provider |
| PT02 | Project/workspace fixture kế thừa; onboarding → dựng → khởi chạy có checks/bàn giao; native APIs còn cần spike |
| PT03 | L02 bàn giao native Session không composer; Open không tạo trùng, Replace giữ history; state survive reload |
| PT04 | Thiếu quyền chặn chạy thử, yêu cầu linked và đúng đích config |
| PT05 | Verification fail không operational; pass có evidence và pinned revisions |
| PT06 | Work pause/cancel desired/observed và resume đúng; không mất history |
| PT07 | Agent/activity/evidence mở chéo đúng đối tượng và chủ trì chat |
| PT08 | Inbox tạo request, filter/claim/decision và reply không làm hoàn thành giả |
| PT09 | Config bốn nhóm, typed fields, profile refs, limits/actions, draft/diff/conflict/sync/restore |
| PT10 | Không có CRUD lịch agent native; bàn giao native, sửa policy không đổi cadence; duplicate callback giữ WorkRef |
| PT11 | Eval fail không activate; kiểm trước/sau đạt thì release đạt; regression đi fix-forward |
| PT12 | Retro thiếu evidence không tạo cải tiến giả |
| PT13 | Offline chặn effect mới, reconnect không tạo thêm work/agent |
| PT14 | Update fail dùng companion; migration incompatible không rollback code mù |
| PT15 | Audit/config revision giữ liên kết/history; localStorage bị chặn có thông báo |
| PT16 | Desktop/mobile, keyboard/focus, không overflow; không network hoặc action thật |

Các kiểm trên chỉ dành cho prototype UI, không thay [verification.md](verification.md) của runtime. HTML phải bao phủ màn hình và transitions được liệt kê; các semantics chưa dựng phải được ghi rõ là giới hạn, không tự đánh dấu đầy đủ.

## Bổ sung code jobs

Prototype phải phân biệt code job và agent schedule. Job Backlog/PR có form name/handler/cron/timezone/timeout, pause/resume và nút fixture poll rỗng/có delta. Poll không tạo agent; delta lặp giữ event identity. Bảng run/event thể hiện inbox đích. Không có scheduler hoặc API poll thật trong HTML. Code-job cadence được chỉnh tại harness; agent-schedule cadence vẫn chỉnh tại Paseo.

## Cập nhật được chốt: danh mục agent và settings 80/20

Theo [autonomous-team-proposal.md](autonomous-team-proposal.md), thêm màn hình Danh mục agent (D01) và chi tiết role (D02): năm trách nhiệm worker, when-to-use, entry procedures, skills phụ, profile đã resolve và kết quả bắt buộc. Principles là mục lục dùng theo tình huống; không checkbox mỗi task hoặc quota 3–8. Đây là catalog có version do harness cải tiến, không thêm nhóm settings thứ năm.

D03 mô phỏng lựa chọn theo task: replay bug, thiết kế mơ hồ, sửa nhỏ, tài liệu và poll rỗng. Hiển thị lý do role/procedure/profile, skills đã chọn, principles do worker chọn trong fixture, ảnh hưởng tới quyết định và cấu trúc workflow. Mọi lựa chọn là fixture xác định, không giả LLM reasoning. Poll rỗng không tạo agent/work; dispatch thiếu skill/capability hoặc hết slot không được tạo agent. Work/assignment giữ bundle/revision đã pin dù catalog đổi.

Settings chỉ có Agents (profile refs), Limits (worker/time), Actions (allow/ask/deny cho push/PR/merge/publish/activate verified revision), Automations (tóm tắt và mở code jobs/native sources đã có, không lưu cadence lần hai). Context, tools, skills, principles, eval và release strategy không là editable settings catalog. Quyền đọc/ghi/test nền quan sát được và hỏi theo work còn thiếu; không lặp form provisioning. Budget không đo/enforce được hiển thị unavailable, không input giả.

Từ Danh mục agent gửi yêu cầu trong chat hoặc tạo candidate fixture: chỉ đổi hợp đồng/phương pháp của role, giữ authority. Eval fail không activate; pass kiểm quyền activation. `allow` kích hoạt trong fixture, `ask` chờ quyết định tường minh, `deny` giữ candidate chưa active. Catalog conflict hoặc capability thiếu chặn activation; snapshot work cũ không đổi. Kiểm sau activation đạt thì hoàn tất release và tiếp tục quan sát. Regression tạo việc fix-forward, không tự lùi catalog; không ghi đè revision mới hơn.

Ca kiểm thêm: exactly bốn nhóm settings; không scope selector; numeric/action/profile validation; role details và nguyên tắc theo task; không agent cho empty poll; capability/admission guard; bundle pin; catalog candidate fail/pass/ask/deny/conflict/rollback và không tăng quyền/trần; desktop/mobile; giữ các hành vi jobs/inbox/work/recovery đang có.

## Cập nhật: agent definition editor trực tiếp

Người dùng yêu cầu tạo/sửa agent ngay trong harness vì Paseo profile chưa đủ. Agents trong settings quản lý **agent definitions của harness**, native profile phải tạo/sửa ở Paseo trước. Harness không chỉnh provider/model/thinking/mode; native profile catalog thật phải được resolve từ đúng host, HTML chỉ dùng fixture có nhãn.

A-D01 danh sách definitions có tên/when-to-use, profile native chính/fallback, skill/principle policy, revision, tạo/nhân bản/sửa. A-D02 editor gồm name/description, chọn native profile chính; thêm/bỏ/đổi thứ tự native profile fallback; xem provider/model/thinking/mode chỉ đọc; skill multi-select từ catalog đã nạp; principles auto/fixed/hybrid với danh sách chọn. Không có ô secret hoặc shell tùy ý. Save có validation/expected revision, áp cho lượt mới; session/work cũ giữ snapshot.

Nguồn skills/principles có inventory và input chọn thư mục SKILL.md riêng từng loại. HTML đọc metadata cục bộ qua file input, không upload, không execute và không giả gọi daemon scan. Nguồn fixture tách rõ nguồn người dùng vừa nạp. Metadata có name/source/revision/description; resource đổi không được âm thầm đổi bundle đã pin, definition cần revalidate nếu source drift.

A-D03 preview effective bundle và fallback: điều khiển fixture primary unavailable/rate-limit để xem chọn candidate tiếp; không fallback vì bị deny hoặc thiếu skill/capability. Principles fixed do người dùng chọn; auto do worker chọn trong catalog; hybrid giữ phần bắt buộc và bổ sung theo task. Mọi lựa chọn auto là fixture xác định trong HTML, không gọi LLM. Core operating rules/authority không bị policy principles tắt.

Role trong Danh mục agent chọn definition trực tiếp, có nút tạo/sửa. Settings bindings cho hai orchestrator/worker/reviewer cũng chọn definitions này. Không giữ hai bản cấu hình model/skills ở role và definition. Native profiles là prerequisite; thiếu profile thì mở surface Paseo để tạo trước, không dựng lại profile CRUD.

Ca kiểm bổ sung: create/clone/edit definitions, name/candidate/duplicate/ref/version validation; không có editor provider/model/options; native refs thiếu/trùng bị chặn; fallback reorder/removal/cross-provider và all-unavailable; selected skill/entry guard; fixed/auto/hybrid; nạp metadata files/invalid/duplicate/drift; role binding và settings binding; pin old work; candidate guard sau registry drift; offline/no authority widening; desktop/mobile.


## Phạm vi prototype V1 sau grill — 2026-10-22

Bản HTML tiếp theo trả lời: người vận hành có quản lý được lịch tổng quát, phân tích outcomes, theo dõi workflow tổ hợp và quan sát cập nhật toàn plugin mà vẫn giao yêu cầu qua chat không? Tất cả số liệu và tiến trình là fixture điều khiển được, không là bằng chứng hệ thống thật đã thực hiện.

- **AN01 Analytics:** chỉ số chất lượng/thời gian/chi phí/retries/can thiệp; lọc thời gian, phiên bản, provider/agent/workflow/Skill; nhóm theo đối tượng; bảng/biểu đồ; mở Run/evidence; thiếu dữ liệu không đổi thành số 0.
- **AN02 Saved views:** tạo/sửa/lưu/xóa view gồm tên, chỉ số, bộ lọc, nhóm và khoảng thời gian; lưu fixture cục bộ.
- **AN03 Compare:** tách quan sát vận hành và đánh giá có kiểm soát; cùng bộ việc/tiêu chí hoặc báo chưa đủ căn cứ; xem thử nghiệm và evidence.
- **T03 Scheduler:** một danh sách code Job, agent và Workflow Run với nguồn sở hữu rõ; editor once/interval/cron, timezone, target, timeout, bounded overlap/missed policy; preview lịch fixture, bật/tắt/chạy ngay, run history/detail. Native cadence vẫn bàn giao Paseo, không lưu hai bản active.
- **T04 Job handler mới:** gửi yêu cầu qua chat harness → candidate handler → kiểm fail/pass → đăng ký → chọn handler để tạo lịch. Không có code editor hoặc shell tùy ý trong form.
- **T05 Integration detail:** Backlog/GitLab source binding dùng connection reference; trạng thái đồng bộ/cursor/lỗi; poll rỗng không gọi agent, event lặp không tạo work trùng; nguồn → inbox/Run/evidence; không nhận token.
- **RL01 Releases:** candidate UI/runtime/schema/Job/integration/Skills/definitions; Fast/Deep path theo policy và ảnh hưởng, check plan/evidence, authority/revision. Controls chọn phạm vi/ảnh hưởng là fixture dựng kịch bản, không là form bắt buộc của người vận hành mỗi release.
- **RL02 Update:** kiểm trước activation → checkpoint chỉ phạm vi bị ảnh hưởng hoặc hoãn nếu chưa rõ → backup khi thay đổi dữ liệu khó đảo ngược → reload → kiểm health mới và resume khi liên quan. Đạt thì release đạt ngay; lỗi khoanh vùng được chặn phạm vi và fix-forward, chưa khoanh vùng thì dừng admission toàn bộ. Một activation tại một thời điểm, ưu tiên sửa khi bản hiện tại kiểm chưa đạt.
- **RL03 Recovery companion:** executable ngoài plugin không boot, phục hồi code chỉ khi đọc được dữ liệu hiện tại; giữ WorkRefs, không tự restore store cũ. Recovery không tương thích/lỗi giữ blocked và bằng chứng. Kiểm recovery sẵn dùng trước activation; diễn tập khi cơ chế liên quan thay đổi.
- **O03 mở rộng:** cây thực thi có chaining, routing, parallel/join, workers động, workflow lồng, evaluator-optimizer; có attempt/iteration, checkpoint, blocker, agent/evidence links; kiểm fail/revise/đạt theo scope, không graph editor.

Các route cũ cho Agent Definitions, native profile handoff, config/inbox/evidence/audit và chat được giữ. Fixture v6 dùng storage key riêng; không migrate fixture v5 hoặc chạm production state. Không dựng lại provider profile editor hay native chat.

## Policy release hiện hành — prototype v7

[Release policy](release-policy.md) sở hữu các quyết định đã chốt; [release-execution.md](release-execution.md) sở hữu implementation/spike. Bản v7 thay thế luồng release nặng mặc định của v6. Không có nightly full suite mặc định hoặc monitoring gate cố định. Shared check queue/cache và drift detector có spike riêng, chưa là công cụ runtime chạy trong HTML. Candidate chưa được activate giữ nguyên baseline; Run cũ giữ revision, không đồng nghĩa nguồn Skill ngoài bất biến. Kết quả kiểm UI xem [prototype-checks.md](prototype-checks.md).

## Prototype v8 — onboarding và lifecycle

Quyết định đã chốt ở [onboarding-agent.md](onboarding-agent.md); protocol đề xuất ở [onboarding-contracts.md](onboarding-contracts.md). HTML dùng storage key v8 và không migrate fixture cũ. Menu dùng Orchestrators / Bộ điều phối; Work Items / Yêu cầu công việc và Assignments / Việc đã giao đã chốt tên. Hai màn sau vẫn nêu giới hạn fixture vì dữ liệu chưa tách đúng các entity. Agent Catalog / Danh mục agent là nhãn đã chốt và dùng thống nhất cho catalog.

Các nút fixture mô phỏng MCP results/readiness/build/handover. Không gọi native APIs, không thực hiện quyền role fencing và không chứng minh mọi config CRUD. Các thiếu hụt semantic Work Item/Run, Assignment/Session, release targets của bản trước vẫn còn.

## Prototype v9 — identity và relations đã tách

[Model notes](prototype-model-notes.md) là nguồn mapping hiện tại. Work Item/Workflow Run, Assignment/Session và ba vai trò release đã có state riêng trong fixture; không tiếp tục dùng giới hạn v8 “còn gộp” làm mô tả hiện hành. Danh sách yêu cầu và danh sách giao việc dùng routes `work-items`/`assignments`, có các detail `work-item/:id`, `run/:id`, `assignment/:id`, `session/:id`. Tạo và đánh giá công việc qua controls kịch bản; interface sản phẩm chính vẫn chat native.

Mới cài chưa có yêu cầu/Run/Assignment/Session. Một yêu cầu có thể có nhiều Runs; Run completed không tự resolve yêu cầu. Session nhận nhiều Assignments có history/outcomes riêng. Target chưa nạp không active; boot fail active=null; recovery giữ selection theo operation/schema, không mặc định bản trước. Các assertions này chỉ chứng minh state/interaction của fixture, không là production runtime.
