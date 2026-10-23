# Overall architecture — resumed grill

Ngày bắt đầu: 2026-10-23. Phase: **thiết kế**. Phiên S01 đang mở. [Glossary V1 đã kết thúc](glossary-v1-grill.md); closure của glossary không tự đóng architecture. Áp dụng grill-with-docs (grilling + domain-modeling), dùng vocabulary deep modules khi xét Interface/Implementation/Seam. Không triển khai runtime hoặc thay cấu hình Paseo trong phiên thiết kế này.

## Mục tiêu

Hợp nhất kiến trúc Project Harness hiện hành; xác định module ownership, Interface và luồng phối hợp/các điểm cần khôi phục; kiểm đủ yêu cầu V1 trước khi trình shared-understanding confirmation. Không lấy bản tổng hợp cũ P297 để xin duyệt sau khi thiết kế đã thay đổi. Không coi những TypeScript sketches trước đó là một Interface đã được phê duyệt toàn bộ.

## Accepted baseline — giữ nguyên

Nguồn: [architecture](architecture.md), [scope](scope-80-20.md), [ADRs](../adr/), [chat evidence](grill-history/decision-ledger.md), [glossary closure](history/glossary-v1-g02-2026-10-23/closure-g02.json).

- Một Project Harness đi cùng một dự án có codebase, triển khai bằng một Paseo Plugin. Harness Engineering dựng/cải tiến harness gồm Project Orchestrator; hai bên có context/inbox/lifecycle riêng và cùng chịu authority/budget.
- Chat native là interface chính; menu Onboarding → user Spawn Engineering → user Spawn Project; native Paseo profiles/Session/workspace/cadence giữ ownership đã chốt.
- TypeScript, plugin dày, module trong code; Git/SQLite/artifact files và independent recovery executable. Không mặc định thêm cloud/multi-host/service.
- Five-pattern composition, generalized scheduling, Backlog/GitLab, Claude/Codex, full plugin self-update, daily retro và deep Analytics thuộc V1. Gate nghiệm thu V1 tổng hợp là quyết định riêng, chưa được đóng trong phiên Glossary.
- Agent Definition tham chiếu native primary/fallback profiles, Skills và Principles; four settings groups giữ nguyên; không fork/monkey patch/isolate Skill catalog theo agent.
- D02–D05/GA01 và labels/definitions đã duyệt giữ nguyên. Những chi tiết native/API cần điều tra là facts, không giao user đoán.

## Factual exploration F-A01

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aarchitecture-overall-frontier-facts-r1-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aarchitecture-overall-frontier-facts-r1-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output: [architecture-frontier-audit-r1.md](architecture-frontier-audit-r1.md), hoàn thành và đã được parent đọc. Báo cáo mô tả baseline trước A01; các line refs là tại thời điểm khảo sát.
- Scope: đối chiếu accepted baseline với năm module sketches, ownership của catalog/config/Analytics, flow giữa native chat và durable work, runtime composition, admission/effects, lifecycle/startup/recovery. Chỉ facts/source-backed alternatives, không quyết thay user, không sửa existing docs.
- Parent review: A/B xác nhận hai owner thiếu trong bản cũ; A01 đã chốt AgentDefinitions/Analytics, còn operating-policy mutation ownership chưa nằm trong câu trả lời đó. C/D là hai quyết định về acceptance trong chat và nghĩa vụ startup. Framework/interpreter, journals/transactions, native enforcement/concurrency và OS launcher là engineering/factual work, không dùng chúng để mở lại D02/GA01 hoặc yêu cầu user đoán SDK facts. Xung đột sơ đồ WorkflowPrograms → Tools và keeper tự thay orchestrator đã được sửa theo ownership/Replace đã chốt. Giới hạn daemon/reboot evidence giữ nguyên; stale release-evidence wording là việc đồng bộ evidence riêng.

## Design tree và dependencies

| Node | Cần đạt | Dependencies | State |
|---|---|---|---|
| A0 | Shared understanding kiến trúc tổng thể hiện hành | A1–A7 + xác nhận cuối | Open |
| A1 | Owner/Interface cho Agent Definitions và catalog | Existing requirements/native ownership | **Accepted A01/Q1** |
| A2 | Owner/Interface cho Analytics queries và Saved Views | Deep Analytics và Criteria nghĩa đã chốt | **Accepted A01/Q2** |
| A3 | Hợp nhất module responsibilities, data/config owners và Interface dependencies | A1/A2 + F-A01 | **Owner accepted A02/Q1**, đã đồng bộ; protocol chi tiết engineering |
| A4 | Chat/inbox → plan/composition → admission/dispatch → results/criteria | F-A01 + Work acceptance contract; payload phụ thuộc A3 | **Chat contract accepted A02/Q2**, walkthrough đã rà ở A6 |
| A5 | Schedule/integrations → delivery/reconcile; startup/reload/release/recovery | F-A01 + accepted host topology | **Startup accepted A02/Q3**, walkthrough đã rà ở A6 |
| A6 | Scenario walkthrough và đối chiếu cross-cutting requirements/authority/evidence | A3–A5 | **F-A02 completed + parent review**, không có material decision mới đủ căn cứ trong các trace |
| A7 | Tổng hợp quyết định, explicit deferrals và synchronise docs | Các nhánh đã trả lời | **Đã có current summary**, engineering/proof giữ scope riêng |
| A8 | Frontier rỗng trong scope và user xác nhận kết thúc | A1–A7 | **Frontier A03/Q1: shared-understanding confirmation**, chưa trả lời |

A1/A2 độc lập và đã chốt. Bảy module hiện hành không tự phê duyệt mọi Interface/ordering trong modules.md. Chúng nằm trong cùng plugin, không tự sinh process/database/settings group mới. A02/Q1–Q3 cũng độc lập: quyết định receipt/acceptance không cần biết policy payload; nghĩa vụ startup không phụ thuộc cách nộp task. Chi tiết plan/protocol sau các lựa chọn này thuộc các vòng phụ thuộc tiếp theo.

## Quan sát baseline trước A01

[modules.md](modules.md) hiện có Interface sketches của Triggers, Work, WorkflowPrograms, Criteria và Releases. Work giấu lifecycle/durability/admission; WorkflowPrograms giấu composition; Criteria giấu criteria/evidence/Verdict; Releases giấu activation/recovery. [Configuration §6](configuration.md#6-lưu-trữ-và-owner) phân Git definitions và SQLite mutable settings/active refs, nhưng chưa có Interface riêng làm owner trọn vòng Agent Definition/catalog cho UI/MCP/dispatch. Quyết định cần chốt là đặt Interface này thành module riêng hay thuộc implementation của module hiện có; không phải hỏi lại native profile ownership.

Analytics/Saved Views là hành vi V1 đã chốt. Work.read/list được mô tả cho trạng thái/tiến độ đã commit; Criteria sở hữu kết luận đánh giá. Chưa có Interface tổng hợp truy vấn/saved views xuyên dữ liệu Work/Criteria/Releases. Quyết định là module chuyên biệt hay đặt read side đó trong module hiện có; không hỏi lại formulas, counts hoặc deep Analytics có thuộc V1 không.

## Vòng A01 — đã trả lời

### Q1 — Agent Definitions/catalog có module sở hữu riêng?

Khi bạn sửa Reviewer qua UI hoặc Onboarding MCP, rồi orchestrator chọn Reviewer để giao việc, có đồng ý để một module **AgentDefinitions** sở hữu catalog, definition revisions, role/Skill/Principle bindings và việc cung cấp cấu hình hợp lệ cho lần giao việc không?

Đề xuất: **đồng ý, tách module AgentDefinitions**. UI/MCP và runtime dùng cùng Interface của module này; Work vẫn sở hữu admission, Assignment và native Session dispatch. Profile/provider/model gốc tiếp tục thuộc Paseo.

Alternative: đặt chức năng này trong implementation của Work, với owner nội bộ rõ. Trade-off là ít module công khai hơn nhưng Work chứa thêm vòng đời definition/config và callers sửa cấu hình phải đi qua Interface đó. Không tự chọn một trong hai khi user chưa trả lời.

### Q2 — Analytics có module riêng để cung cấp dữ liệu cho dashboard/retro?

Khi dashboard hoặc daily retro cần so sánh chi phí/chất lượng theo workflow, agent, phiên bản và Saved Views, có đồng ý để module **Analytics** cung cấp Interface truy vấn và lưu cách xem, dựa trên dữ liệu có nguồn từ Work/Criteria/Releases không?

Đề xuất: **đồng ý, tách module Analytics**. Criteria tiếp tục sở hữu tiêu chí và Verdict; Analytics tổng hợp/trình dữ liệu, giữ provenance và trạng thái thiếu dữ liệu. UI và agent dùng cùng logic truy vấn.

Alternative: giữ read models/queries trong Work và Criteria, tổ chức Interface truy vấn bên trong các module đó. Trade-off phải chứng minh caller không tự join/suy diễn nhiều nguồn và trách nhiệm Saved Views rõ. Không đẩy arbitrary SQL hoặc transcript parsing ra caller.

**User answer:** `Ok theo suggest'` tại **P2815**, trả lời cả hai đề xuất ở **P2813**. Bằng chứng native IDs, nguyên văn và API page: [acceptance-a01.json](history/architecture-a01-2026-10-23/acceptance-a01.json). Kết quả: **Q1 accepted, Q2 accepted** trong phạm vi trách nhiệm/Interface đã hỏi; không duyệt tất cả method/schema, operating policies, runtime proof hoặc kết thúc phiên.

Đã đồng bộ architecture/module inventory, configuration owners và hai tên module trong engineering glossary. Giữ bốn settings groups và các live source pins của concept register. [Baseline snapshots](history/architecture-a01-2026-10-23/baseline.json) giữ bản trước sửa. Không thêm ADR: các seam hiện là thiết kế có thể điều chỉnh, chưa có thêm quyết định khó đảo ngược đáp ứng đủ ba tiêu chí của domain-modeling.

<a id="a02"></a>
## Vòng A02 — đã trả lời

### Q1 — Work sở hữu cấu hình quyền và giới hạn thực thi?

Reviewer có trong catalog, nhưng Project Orchestrator chỉ được Consult; người vận hành giảm số worker hoặc thu hồi quyền push. Có đồng ý để **Work sở hữu revisions và Interface chỉnh Actions, Limits, Delegation Policy của hai orchestrator**, đồng thời áp dụng chúng tại admission và trước hành động?

Đề xuất: **đồng ý**. AgentDefinitions sở hữu năng lực/definitions/bindings; Work sở hữu quyền được sử dụng và trần thực thi. Các đường thực thi của Triggers/Releases dùng cùng policy hiện hành theo protocol phối hợp, không tự giữ bản quyền active thứ hai; recovery offline phải đọc được policy/durable state và kiểm ownership mà không cần Work subprocess sống. Harness không được tự nới authority bằng candidate. Đây là module ownership, chưa quyết schema/transaction hoặc native enforcement đã được chứng minh.

Alternative: module policy chuyên biệt cung cấp Interface cho Work/Triggers/Releases. Trade-off là thêm seam/vòng đời config cần điều phối; không tự thêm module đó hoặc dồn quyền vào catalog khi chưa có câu trả lời.

### Q2 — Chỉ xác nhận đã nhận việc trong chat sau receipt bền vững?

Người dùng nói “sửa lỗi checkout” trong native chat. Có đồng ý để orchestrator diễn giải, gọi Tool qua **Work.submit** cho việc mới hoặc Interface owner cho quyết định/cấu hình đang sửa, rồi chỉ xác nhận đã ghi nhận khi nhận được **Receipt**?

Đề xuất: **đồng ý**. Lời xác nhận có work/operation reference; phần thảo luận không tự thành task. Tin xuất hiện trong native chat chưa có nghĩa runtime đã nhận trách nhiệm thực thi. Nếu agent dừng trước thao tác ghi nhận, chưa có cam kết durable Work cho yêu cầu đó. Mất response của owner Tool được đối soát bằng request identity trước retry.

Alternative: adapter ghi bền vững mọi correlated input trước khi agent diễn giải rồi mới chuyển thành work; phải điều tra native capture/replay/correlation trước khi hứa không mất đầu vào. Cả hai giữ native chat làm interface chính, không cần thêm chat composer/form nghiệp vụ.

### Q3 — V1 dựa vào startup Paseo, rồi plugin tự reconcile?

Sau reboot, jobs và Work chỉ chạy khi Paseo host và plugin được khởi động. Có đồng ý **dùng cơ chế khởi động hiện có của Paseo/máy hoặc thao tác mở Paseo; plugin tự reconcile khi được host chạy lại**, đồng thời giữ executable recovery độc lập cho từng activation?

Đề xuất: **đồng ý**. V1 cam kết tiếp tục từ durable state sau khi host/plugin chạy lại; chưa cam kết một bootstrap OS riêng tự bật Paseo sau mọi crash/reboot. Executable đã chạy trước activation vẫn chịu trách nhiệm reload/health/recovery của operation đó; điều này không chứng minh nó tự tồn tại qua reboot. Các missed/overlap policies chỉ xử lý khi executor chạy lại, không giả vờ job đã chạy lúc host tắt.

Alternative: đưa nghĩa vụ unattended bootstrap sau crash/reboot vào V1; khi đó cần factual research và spike cơ chế launcher/ownership tương ứng, không mặc định có API Paseo. Không đổi topology plugin dày chỉ vì chọn nghĩa vụ này.

**User answer:** `Ok` tại **P2854**, trả lời cả ba đề xuất ở **P2852**. Bằng chứng native item IDs, nguyên văn và API page: [acceptance-a02.json](history/architecture-a02-2026-10-23/acceptance-a02.json). **Q1/Q2/Q3 accepted** trong phạm vi đã hỏi. Không phê duyệt method/schema/enforcement chưa kiểm, không thêm OS bootstrap/capture mọi native messages, không tự đóng kiến trúc hoặc gate V1.

Đã đồng bộ architecture/modules/configuration, interaction model, onboarding owners và yêu cầu verification. Không thêm glossary entry mới: A02 chốt ownership/protocol nghĩa đã có, không tạo domain concept mới hoặc sửa vocabulary 155 concepts đã duyệt. Bản release-execution đã cập nhật giới hạn bằng chứng daemon 0.12.0 từ kết quả có sẵn, không chạy spike mới.

## Factual exploration F-A02 — scenario coverage

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aarchitecture-scenario-coverage-facts-r2-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aarchitecture-scenario-coverage-facts-r2-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output: [architecture-scenario-audit-r2.md](architecture-scenario-audit-r2.md). Status: **completed**, đã đọc toàn báo cáo.
- Brief: giữ nguyên A01/A02 và các quyết định cũ; đi qua onboarding/Spawn/Replace, chat trước/sau commit, năm pattern/dynamic workers, escalation, code polling/cursor/outbox, shared admission/revoke, late results/retry/fallback, daily/Analytics, Fast/Deep activation/recovery, host startup/missed jobs và local/upstream. Chỉ báo material unchosen decisions có source; tách engineering/capability gaps khỏi frontier quyết định.
- Không có câu hỏi user đang chờ ở A01/A02. Frontier sau parent review là A03/Q1 bên dưới; không mở lại các quyết định chỉ vì thiếu implementation proof.

### Parent review F-A02

Đã đối chiếu 11 traces: bootstrap/Replace, chat commit, nested patterns/identity/join, escalation, code polling/delivery, shared limits/revocation, retry/fallback/late result, retro/Analytics, release/recovery, host restart và local/upstream. Các quy tắc cần cho lựa chọn module/ownership/flow đều có accepted baseline/A01/A02; không tìm thêm material architecture alternative cần user quyết trong phạm vi rà này. Không suy kết luận từ số lượng trace hoặc chỉ từ lời subagent.

Các D findings đã xử lý: release-execution nêu đúng bounded daemon 0.12.0 evidence; startup/verification được qualify theo A02; code-job TS sketch được ghi rõ chỉ minh họa subset, không cắt once/bounded parallel/bounded catch-up khỏi V1. Report đọc song song lúc parent đang đồng bộ nên các pending wording/line refs của report là snapshot quan sát, không phải trạng thái hiện hành. Không sửa ngược báo cáo để che lịch sử.

Các E/F branches có owner ở [bản tổng hợp](architecture-review.md#explicit-engineering-work-remaining): engine/typed Interfaces; storage/journal/fencing/reservations; native Tool/scheduler/provider contracts; packaging/recovery integration; Analytics formulas/freshness/attribution. Chúng chưa được triển khai/kiểm chứng hoặc ngầm duyệt toàn bộ. Nếu phát hiện bất khả thi ảnh hưởng hợp đồng đã chốt, mở lại đúng nhánh với evidence. Rà này không phải formal completeness proof, độc lập re-audit mọi source pin hoặc production capability test.

## Vòng A03 — chờ xác nhận shared understanding

**Q1 — Bản tổng hợp hiện hành đã phản ánh đúng và đủ cách hiểu để kết thúc phiên kiến trúc tổng thể chưa?**

Đề xuất: **đồng ý** với [architecture-review.md](architecture-review.md): một plugin/hai orchestrator, bảy module và ownership, native boundary, chat Receipt, workflow execution, schedules/escalation, shared authority, Improvement Loop và compatible recovery/startup như đã tổng hợp. [Visual review](architecture-review.html) chỉ minh họa cùng kiến trúc, không là runtime proof.

Phạm vi kết thúc là kiến trúc tổng thể ở mức module/responsibility/Interface responsibilities và luồng phối hợp. Typed schemas, algorithms/protocols, engine, API capabilities, packaging và integration/acceptance tests còn là technical-design/proof work được ghi rõ; không coi mọi sketch trước đây đã approved. Gate nghiệm thu V1 là quyết định riêng vẫn chưa trả lời. Nếu user thấy bản tổng hợp thiếu một nhánh kiến trúc cụ thể, frontier được mở theo nhánh đó trước khi kết thúc.

**User answer A03: đang chờ. Session S01 remains open.** Chưa ghi closure hoặc bắt đầu production implementation. Câu hỏi này áp dụng điều kiện của [grilling/SKILL.md](</Users/hanhnt2/.codex/plugins/cache/mattpocock/mattpocock-skills/1.3.1/skills/productivity/grilling/SKILL.md>): “the user confirms you have reached a shared understanding.”

## Quy tắc tiếp tục/kết thúc

Sau mỗi câu trả lời: ghi nguyên văn với source ID khi API có, recompute tree/frontier và đồng bộ quyết định liên quan. Facts của audit không tự là acceptance. Câu hỏi phụ thuộc prerequisite chưa settled để vòng sau; hỏi toàn frontier sẵn sàng mỗi vòng. Không mở lại một nhánh đã chốt nếu chưa có mâu thuẫn/yêu cầu mới cụ thể. Khi mọi nhánh trong scope đã được thăm, không còn giả định ngầm hoặc câu hỏi chưa trả lời, mới trình bản tổng hợp kiến trúc hiện hành để user xác nhận kết thúc.
