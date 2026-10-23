# Overall architecture — resumed grill

Ngày bắt đầu: 2026-10-23. Phase: **thiết kế**. Phiên S01 đang mở. [Glossary V1 đã kết thúc](glossary-v1-grill.md); closure của glossary không tự đóng architecture. Áp dụng grill-with-docs (grilling + domain-modeling), dùng vocabulary deep modules khi xét Interface/Implementation/Seam. Không triển khai runtime hoặc thay cấu hình Paseo trong phiên thiết kế này.

## Mục tiêu

Hợp nhất kiến trúc Project Harness hiện hành trên toàn bộ constituents: agents/definitions/instructions, Skills/Principles/Procedures, Tools/integrations, context/durable state, workflow execution, scheduling/events, policies/resources, verification/evaluation, observability/Analytics, improvement/release và management UI. Module ownership là một phần của scope, chưa đủ đại diện toàn hệ thống. Kiểm các quan hệ và cách vận hành giữa các phần trước shared-understanding confirmation; không lấy bản tổng hợp cũ P297 hoặc một module map để xin duyệt thay toàn bộ. Không coi TypeScript sketches là Interface đã được phê duyệt toàn bộ.

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
| A0 | Shared understanding kiến trúc toàn bộ harness hiện hành | A1–A7 + B1–B13 + xác nhận cuối | Open |
| A1 | Owner/Interface cho Agent Definitions và catalog | Existing requirements/native ownership | **Accepted A01/Q1** |
| A2 | Owner/Interface cho Analytics queries và Saved Views | Deep Analytics và Criteria nghĩa đã chốt | **Accepted A01/Q2** |
| A3 | Hợp nhất module responsibilities, data/config owners và Interface dependencies | A1/A2 + F-A01 | **Owner accepted A02/Q1**, đã đồng bộ; protocol chi tiết engineering |
| A4 | Chat/inbox → plan/composition → admission/dispatch → results/criteria | F-A01 + Work acceptance contract; payload phụ thuộc A3 | **Chat contract accepted A02/Q2**, walkthrough đã rà ở A6 |
| A5 | Schedule/integrations → delivery/reconcile; startup/reload/release/recovery | F-A01 + accepted host topology | **Startup accepted A02/Q3**, walkthrough đã rà ở A6 |
| A6 | Scenario walkthrough và đối chiếu cross-cutting requirements/authority/evidence | A3–A5 | **F-A02 completed + parent review**, không có material decision mới đủ căn cứ trong các trace |
| A7 | Tổng hợp quyết định, explicit deferrals và synchronise docs | Các nhánh đã trả lời | **Đã có current summary**, engineering/proof giữ scope riêng |
| A9 | Xác định phần thiếu/độ sâu user cần trước khi khép kiến trúc | User answer A03 | **A04 reframed:** user yêu cầu hỏi lại trên toàn bộ harness |
| A8 | Frontier rỗng trong scope và user xác nhận kết thúc | A1–A7 + A9 | **A03 đã trả lời “chưa”**; chưa xác nhận shared understanding |
| B1 | Source/deployment unit: common code, project assets và codebase đích | One plugin/one project/local improvement đã chốt | **Accepted A05/Q1** |
| B2 | Bề mặt Tools cho hai orchestrator/workers, MCP và CLI | Owner Interfaces/native boundary/A02 đã chốt | **Accepted A05/Q2** |
| B3 | Tài sản tự cải tiến thuộc bộ và dependency dùng chung bên ngoài | Full self-update + source ownership/native ownership | **Accepted A05/Q3** |
| B4 | Assembly/lifecycle của instructions, context, Skills/Principles/Procedures và result/evaluator contracts | Source/Tool boundaries, existing selected-bundle rules | **Instructions A06/Q1 và retrieval A08/Q2 accepted**; native facts đã có B10, exact assembly/diagnostics chưa là implementation |
| B7 | Tri thức đúc rút dùng lại qua tasks/Sessions | Source ownership + existing context/provenance/authority | **A06/Q2 + A07/Q3 + A08/Q1/Q3 + A09/Q1 accepted**; Knowledge sở hữu lifecycle/retrieval |
| B8 | Default Session lifecycle của workers | GA01, separate Session/Assignment identity và context contract | **Accepted A06/Q3**; concurrency/compatibility protocol chưa chọn |
| B5 | Cơ chế vận hành đầy đủ: code loop, agent reasoning, wake/schedule, execution và evidence | B1–B4/B7/B8 + accepted runtime rules | **Cycle/wake accepted A07/Q1/Q2**; exact driver protocols/native proof còn cần làm |
| B9 | Đồng bộ follow-up vocabulary/relations/CQs vào concept graph | Các nghĩa mới được chốt sau glossary snapshot | Pending: Instructions/Learned Knowledge đã có owner definitions; graph còn 155 concepts cũ |
| B10 | Native instructions/context surfaces, inherited sources và conflict visibility | Factual investigation F-A03 | **Completed + parent review**; unsupported inventory/precedence claims được loại khỏi promises, native proof còn có gaps |
| B11 | Per-task composition versus published workflow/code release | Five-pattern composition/authority/versioning đã chốt | **Accepted A09/Q2**; task plan validate/pin/run, persistent publication qua candidate |
| B6 | Onboarding bootstrap, improvement/release và management toàn bộ constituents | B1–B5/B7/B11: asset owners, authoring/execution/publication boundaries | **A10/Q1/Q2 accepted:** shipped starter assets và automation arming; initial verification/readiness giữ nguyên; coverage toàn bộ assets đang rà B13 |
| B12 | Native Stop/interrupt và quyền tự đánh thức lại orchestrator | Native initiator/cancellation facts F-A04 + A07 wake semantics | **F-A04 completed + parent review**; frontier A11: explicit Pause và phạm vi dừng |
| B13 | Cross-component coverage toàn bộ constituents sau A10 | Whole-harness scope + A01/A02/A05–A10 + F-A03/F-A04 | **F-A05 running**; phân biệt material decision với engineering/proof/documentation, không thay user quyết định hoặc đóng phiên |

A1/A2 độc lập và đã chốt. Tám module hiện hành sau A09 không tự phê duyệt mọi Interface/ordering trong modules.md. Chúng nằm trong cùng plugin, không tự sinh process/database/settings group mới. A02/Q1–Q3 cũng độc lập: quyết định receipt/acceptance không cần biết policy payload; nghĩa vụ startup không phụ thuộc cách nộp task. Chi tiết plan/protocol sau các lựa chọn này thuộc các vòng phụ thuộc tiếp theo.

Sau reframe A04, B1–B3 độc lập và là frontier mới: cách phân source không quyết định agent gọi Tool qua transport nào; quyền tự sửa tài sản do bộ sở hữu không phụ thuộc cách source được chia repo. B4–B6 là branches kiểm phần còn thiếu, không khẳng định mọi câu hỏi trong đó còn mở hoặc mọi implementation choice phải user quyết. A8 chỉ trở lại sau coverage toàn bộ phạm vi đã làm rõ.

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
- Không có câu hỏi user đang chờ ở A01/A02. Parent review đã đưa A03/Q1; user trả lời “chưa”, nên frontier hiện là làm rõ phần thiếu ở A04. Không mở lại các quyết định chỉ vì thiếu implementation proof hoặc tự diễn giải phần thiếu thay user.

### Parent review F-A02

Đã đối chiếu 11 traces: bootstrap/Replace, chat commit, nested patterns/identity/join, escalation, code polling/delivery, shared limits/revocation, retry/fallback/late result, retro/Analytics, release/recovery, host restart và local/upstream. Các quy tắc cần cho lựa chọn module/ownership/flow đều có accepted baseline/A01/A02; không tìm thêm material architecture alternative cần user quyết trong phạm vi rà này. Không suy kết luận từ số lượng trace hoặc chỉ từ lời subagent.

Các D findings đã xử lý: release-execution nêu đúng bounded daemon 0.12.0 evidence; startup/verification được qualify theo A02; code-job TS sketch được ghi rõ chỉ minh họa subset, không cắt once/bounded parallel/bounded catch-up khỏi V1. Report đọc song song lúc parent đang đồng bộ nên các pending wording/line refs của report là snapshot quan sát, không phải trạng thái hiện hành. Không sửa ngược báo cáo để che lịch sử.

Các E/F branches có owner ở [bản tổng hợp](architecture-review.md#explicit-engineering-work-remaining): engine/typed Interfaces; storage/journal/fencing/reservations; native Tool/scheduler/provider contracts; packaging/recovery integration; Analytics formulas/freshness/attribution. Chúng chưa được triển khai/kiểm chứng hoặc ngầm duyệt toàn bộ. Nếu phát hiện bất khả thi ảnh hưởng hợp đồng đã chốt, mở lại đúng nhánh với evidence. Rà này không phải formal completeness proof, độc lập re-audit mọi source pin hoặc production capability test.

## Vòng A03 — đã trả lời, chưa đạt shared understanding

**Q1 — Bản tổng hợp hiện hành đã phản ánh đúng và đủ cách hiểu để kết thúc phiên kiến trúc tổng thể chưa?**

Đề xuất: **đồng ý** với [architecture-review.md](architecture-review.md): một plugin/hai orchestrator, bảy module và ownership, native boundary, chat Receipt, workflow execution, schedules/escalation, shared authority, Improvement Loop và compatible recovery/startup như đã tổng hợp. [Visual review](architecture-review.html) chỉ minh họa cùng kiến trúc, không là runtime proof.

Phạm vi kết thúc là kiến trúc tổng thể ở mức module/responsibility/Interface responsibilities và luồng phối hợp. Typed schemas, algorithms/protocols, engine, API capabilities, packaging và integration/acceptance tests còn là technical-design/proof work được ghi rõ; không coi mọi sketch trước đây đã approved. Gate nghiệm thu V1 là quyết định riêng vẫn chưa trả lời. Nếu user thấy bản tổng hợp thiếu một nhánh kiến trúc cụ thể, frontier được mở theo nhánh đó trước khi kết thúc.

**User answer A03: `chưa` — P2895**, trả lời câu kết thúc ở P2893. [Nguyên văn/API evidence](history/architecture-a03-2026-10-23/response-a03.json). **Session S01 remains open; shared understanding chưa được xác nhận.** A01/A02 không bị hủy; user chưa nêu phần nào thiếu hoặc mức chi tiết nào chưa đạt. Không ghi closure, không tự gắn lý do cho câu trả lời và không bắt đầu production implementation.

Kết luận bounded audit không đủ để thay xác nhận của user về độ đầy đủ/cách hiểu. Câu hỏi kết thúc áp dụng điều kiện của [grilling/SKILL.md](</Users/hanhnt2/.codex/plugins/cache/mattpocock/mattpocock-skills/1.3.1/skills/productivity/grilling/SKILL.md>): “the user confirms you have reached a shared understanding.”

## Vòng A04 — làm rõ phần thiếu trước khi tiếp tục

**Q1 — Bạn muốn đi sâu vào cách hệ thống thực sự vận hành trước khi chốt?**

Đề xuất: bắt đầu bằng một kịch bản nhận việc, đi rõ inbox → thành phần đánh thức orchestrator → agent chọn workflow/subagents → runtime thực thi → kết quả → vòng tiếp theo; chỉ rõ đoạn nào chạy trong plugin server, agent Session và MCP Tools, kèm Interfaces/sequence thay vì chỉ liệt kê module. Sau câu trả lời mới xác định các nhánh phụ cần grill. Nếu user thiếu phần khác, dùng mô tả đó để tính lại tree; không coi đề xuất này đã được chấp nhận.

**A04 superseded by explicit reframe, không diễn giải thành “yes”.** User hỏi `harness gồm những gì bạn biết ko` ở P2906. Assistant trình bày 11 nhóm constituents ở P2907; user yêu cầu `Ok thế giờ hỏi lại đi` ở P2909. [Evidence](history/architecture-a04-reframe-2026-10-23/reframe-a04.json) giữ câu hỏi cũ, challenge, giải thích và yêu cầu tiếp tục. Vòng mới phải phỏng vấn toàn bộ harness; không chỉ xin đóng module map hoặc dùng bounded audit để gạt các branch kiến trúc cụ thể thành engineering mặc nhiên đã ủy quyền. A01/A02 vẫn giữ; chưa có technical acceptance mới.

## Vòng A05 — source, Tool surface và tài sản tự cải tiến

### Q1 — Mỗi Project Harness là một repo có đủ source để tự sửa?

Đề xuất: **đồng ý**. Dự án dùng một bản fork repo base, chứa source plugin và các tài sản vận hành như agent instructions/definitions, workflow, Skills/Principles riêng, code-job handlers và evaluators. Phần dùng chung và phần theo dự án có ranh giới thư mục/module rõ trong cùng repo; codebase sản phẩm là repo đích riêng được tham chiếu. Plugin được build/cài từ source đó để Harness Engineering có đường sửa → kiểm → áp dụng và tách contribution upstream. Đây là source/deployment model đề xuất, không mặc định lệnh installer đã được kiểm hay copy pstack/matt vào repo.

Alternative: phần dùng chung là dependency phát hành riêng, repo dự án chỉ chứa project assets; sửa phần dùng chung phải có fork/override/release path rõ. One-plugin topology và self-update đầy đủ giữ nguyên ở cả hai phương án.

### Q2 — MCP là interface chính cho agent điều khiển harness?

Đề xuất: **đồng ý**. Onboarding, hai orchestrator và specialists được cấp harness Tools cần cho vai trò qua MCP, dùng chung owner services với UI. Tool groups có thể gồm config/catalog, work/delegation, jobs, context/evidence, queries và release theo authority. Server/owner vẫn kiểm quyền; không dựa vào việc ẩn Tool để coi đã enforce.

CLI phục vụ recovery và automation/scripts cần thiết; code handlers gọi Interface nội bộ trong runtime. Native shell/Git/provider Tools và các MCP integrations khác vẫn dùng khi phù hợp; không gom mọi công cụ thành MCP facade mới. Agent Tool transport ngoài Onboarding là lựa chọn đang hỏi, chưa là API/catalog đã implement.

Alternative: CLI hoặc Tool adapter khác là interface chính cho các orchestrator, MCP chỉ dùng Onboarding. Dù chọn gì, không nhân đôi owner invariants hoặc tạo active state thứ hai.

### Q3 — Tự cải tiến chỉ sửa trực tiếp tài sản do Project Harness sở hữu?

Đề xuất: **đồng ý**. Harness Engineering tự cải tiến source plugin, workflows, instructions, Skills/Principles riêng, handlers/evaluators và schema của bộ qua quy trình checks/activation đã chốt. pstack/matt được cài từ nguồn dùng chung, native Paseo profiles và provider/tool installations là dependencies có owner bên ngoài; harness lưu refs/source/revision, không tự ghi đè cài đặt dùng chung toàn máy.

Cần thay dependency thì đi đúng owner/update/configuration path trong authority đã cấp, đồng thời kiểm compatibility; native Onboarding intents đã được phép không bị hủy. Đây là boundary cho direct self-mutation, không cấm phát triển Skill riêng hoặc nâng binding/dependency revision. Không tự thêm phê duyệt tay cho mọi cải tiến local.

Alternative: cho harness quản lý trực tiếp cả selected dependencies dùng chung; cần xác định phạm vi ảnh hưởng/ownership riêng, không suy ra từ quyền sửa plugin.

**User answer A05:** `q1: ok q2: ok q3: ok` — **P2920**, trả lời vòng ở P2918. [Native API evidence](history/architecture-a05-2026-10-23/acceptance-a05.json) giữ nguyên văn và item IDs. **Cả ba accepted** theo wording đã hỏi: fork repo đủ source/tài sản, MCP là agent interface chính, direct self-mutation giới hạn tài sản harness sở hữu và dependency owner paths. Không phê duyệt exact directory/installer/Tool schemas, không biến MCP visibility thành enforcement, không hủy native Onboarding intents hoặc mở quyền sửa shared installations. Codebase sản phẩm được tham chiếu; không suy thêm số repo/path bắt buộc từ sketch trước câu hỏi.

Đã đồng bộ [harness-composition.md](harness-composition.md), architecture/modules/configuration và phạm vi MCP trong Onboarding. A01/A02 giữ nguyên. Giới hạn self-mutation không cấm worker sửa codebase sản phẩm theo Assignment/quyền. MCP Server vẫn mang nghĩa access interface đã có; A05 mở rộng caller/phạm vi sử dụng, không định nghĩa một domain entity mới hoặc một process bắt buộc. Chưa thay source layout, thêm Tool executable hoặc chạy live operations.

## Vòng A06 — instructions, tri thức dùng lại và worker Sessions

B4/B7/B8 độc lập: việc lưu instruction assets không quyết định bài học có được đúc rút vào knowledge hay không; worker fresh/reuse là default lifecycle, không cần quyết định cách retrieval trước. Task context/provenance, role/procedure/result distinctions, native profiles, explicit Skill refs và Principles auto/fixed/hybrid đã chốt, không hỏi lại. Các câu này là lựa chọn product/architecture; không hỏi user đoán cách SDK inject system prompt.

### Q1 — Mỗi agent/role có hướng dẫn vận hành riêng trong repo?

Ví dụ Reviewer có hướng dẫn review, Engineering có hướng dẫn closed loop/retro. Đề xuất: **có**. Hướng dẫn là file có version trong repo fork, role/definition tham chiếu đúng phần sở hữu; harness ghép với luật vận hành chung và context của Assignment khi giao việc. Responsibilities/procedure/result contract tiếp tục thuộc role, không chép thành bản thứ hai trong native profile. Skills/Principles giữ phương pháp chuyên môn; native Paseo profile giữ model/options. Không hứa override mọi provider/system/project instruction; adapter/read-path và cách phát hiện mâu thuẫn cần thiết kế theo capability.

Alternative: chỉ dùng instructions trong Skills và task prompt, không có instruction asset riêng cho agent/role. Trade-off là operating behavior của orchestrator/specialist phải được biểu đạt/kiểm ở các nguồn đó. Chưa chọn thay user.

### Q2 — Agent được lưu bài học dùng lại qua nhiều tasks/Sessions?

Ví dụ một lần sửa lỗi phát hiện nguyên nhân lặp hoặc một cách kiểm hiệu quả. Đề xuất: **có kho tri thức đúc rút dùng lại**, tách transcript và execution journal. Agent có thể ghi notes có nguồn/evidence, phạm vi và mức chắc chắn; giả thuyết không tự thành sự thật hoặc luật dự án. Những notes đó có thể làm context tham khảo cho việc sau.

Nâng bài học thành operating instructions/Skills/Procedure/workflow cần candidate/check/activation đã chốt; thay mục tiêu/yêu cầu/criteria vẫn qua đúng owner/authority. Không tạo một bản active criteria/project truth thứ hai. Exact knowledge file/schema/index/retrieval và trigger đúc rút để vòng phụ thuộc tiếp theo, không mặc định phải là vector database hoặc generic Memory framework.

Alternative: chỉ lưu artifacts/journal/quyết định hiện có, để orchestrator tự tìm lại khi cần, chưa có đường đúc rút knowledge riêng. Trade-off là nhẹ hơn nhưng khó tái sử dụng bài học có cấu trúc. Câu này hỏi persistent learned-knowledge capability, không hỏi lại durable execution state vốn đã bắt buộc.

### Q3 — Worker bắt đầu phần việc mới bằng Session mới theo mặc định?

Đề xuất: **đồng ý**. Khi giao một phần việc mới, mặc định tạo worker Session mới với đúng context/bundle; clarification và các Turns tiếp tục cùng Assignment giữ Session hiện có. Session orchestrator vẫn có vòng đời native và user Open/Replace riêng. Retry/fallback vẫn theo GA01, reconcile trước redispatch, không suy timeout là worker đã dừng; default này không viết lại identity hay buộc mọi retry cùng cách chọn Session.

Reuse worker Session có thể mở bằng policy rõ khi role/config/context phù hợp, không suy ra được reuse bất kỳ chỉ vì agent idle. Fresh mặc định giảm context tích tụ/khó phân nguồn nhưng tốn thêm khởi tạo/nạp context. Chưa quyết concurrency per Session hoặc số slot từ lựa chọn default này.

Alternative: ưu tiên reuse idle worker Sessions tương thích. Khi đó phải kiểm compatibility/context cleanup/provenance trước giao phần việc mới; không cho caller tự bỏ qua Work admission.

**User answer A06:** `ok` — **P2938**, trả lời ba đề xuất ở P2936. [Native evidence](history/architecture-a06-2026-10-23/acceptance-a06.json) giữ nguyên văn và IDs. **Cả ba accepted**: instructions có version, kho bài học dùng lại có source/scope/certainty, fresh worker Session cho phần việc mới theo mặc định. Không phê duyệt exact schemas/paths/knowledge index, native injection/enforcement, worker pool, số slot/concurrency hoặc thay đổi GA01/Spawn/Replace.

Đã ghi WHAT meanings của [Instructions](../../GLOSSARY.md#instructions) và [Learned Knowledge](../../GLOSSARY.md#learned-knowledge) vào owning common glossary, cập nhật composition/modules/configuration/architecture. Chưa tạo instruction assets/knowledge store/worker implementation thật. Model 155 concepts giữ nguyên snapshot, B9 ghi follow-up integration để không tự nhận current graph đã bao phủ hai nghĩa mới.

## Vòng A07 — lượt điều phối, sự kiện và vòng học

Ba câu độc lập: completion contract của một lượt không quyết định policy gom wake; policy wake không quyết định lúc rút bài học. Không hỏi lại code giữ authority/durability, hai inbox, daily retro hay explicit MCP đã được chốt. “Lượt điều phối” ở đây mô tả một lần orchestrator xử lý việc/sự kiện; chưa đặt identity/schema hoặc đồng nhất nó với một Turn, Step Run hay Quality Iteration.

### Q1 — Kết thúc lượt điều phối bằng trạng thái có cấu trúc qua MCP?

Đề xuất: **đồng ý**. Orchestrator ghi trạng thái/ý định qua owner Tool, ví dụ còn việc làm tiếp, chờ worker, chờ người hoặc đã xử lý xong lượt. Runtime kiểm trạng thái bền vững/work còn chờ để quyết định đánh thức tiếp hoặc đợi; không suy hoàn thành lượt từ câu chat cuối hay marker tự do. Kết thúc lượt không đồng nghĩa Work Item/Workflow Run đạt tiêu chí. Missing/mơ hồ không bị coi là idle/thành công; cần đối soát bounded theo authority/budget đã chốt.

Tên Tool, state enum, identity/transaction, stale-inbox revision và correlation chưa được chốt bởi câu hỏi này. Đây là contract giữa agent reasoning và code driver, không thêm một orchestrator hoặc yêu cầu LLM chạy liên tục.

Alternative: runtime suy tiếp bước từ native lifecycle và nội dung output hội thoại, rồi cố đối chiếu với Work. Trade-off là ít explicit agent protocol hơn nhưng completion/wait ambiguity phải được giải quyết bằng cách khác. Không ngầm chọn regex như HBU.

### Q2 — Sự kiện tự động đến lúc orchestrator bận được xếp hàng và gom wake?

Ví dụ năm workers báo kết quả gần nhau. Đề xuất: **đồng ý**. Giữ từng event/result/delivery với identity và evidence trong inbox/state; gom nhu cầu wake thành một lượt xử lý đang chờ cho đúng logical owner. Mặc định để lượt hiện tại đi tới điểm kết thúc/chờ thích hợp, không tự interrupt cho mỗi callback hoặc Spawn orchestrator khác. Khi đủ điều kiện/admission thì đánh thức tiếp; pause/permission/budget vẫn có hiệu lực.

Gom wake không gộp mất work items/results hoặc bỏ qua thay đổi mới. Chat và thao tác interrupt của người dùng vẫn native; lifecycle/fencing và race “event vừa đến khi agent sắp ngủ” cần protocol/proof. Không mặc định native send có queue/dedupe/replay semantics chưa kiểm.

Alternative: sự kiện mới có thể interrupt ngay theo priority policy. Nếu chọn, cần scope/priority/admission cụ thể; chưa mở auto-interrupt chỉ vì nhận callback.

### Q3 — Ghi bài học trong công việc, tuyển chọn/cải tiến ở daily retro?

Đề xuất: **đồng ý**. Agent đang làm task ghi note ngắn khi có phát hiện đáng giữ, kèm nguồn/evidence và uncertainty; không buộc mọi task có bài học hoặc thêm một lượt LLM chỉ để điền note. Daily retro xem các notes cùng outcomes/metrics, gộp trùng, kiểm căn cứ và đề xuất candidate khi có lý do. Việc đọc note sau này không tự biến nó thành rule/criteria hoặc operating instruction.

Candidate cải tiến vẫn qua checks/activation theo Fast/Deep, authority và compatibility đã chốt; không thêm gate duyệt tay mặc định. Exact triggers, file/index/query, retention và cách xử lý note cũ là branches tiếp theo. Daily không thay luồng sửa blocker/cải tiến khẩn cấp đã được phép.

Alternative: chỉ daily retro đúc rút lessons từ journal/artifacts, hoặc thêm knowledge-extraction job riêng sau mỗi task. Câu hỏi chọn mặc định cost/cadence, không hủy learned-knowledge capability A06.

**User answer A07:** `ok` — **P2955**, trả lời ba đề xuất ở P2953. [Native evidence](history/architecture-a07-2026-10-23/acceptance-a07.json) giữ nguyên văn và IDs. **Cả ba accepted**: structured cycle disposition qua MCP, preserve events/results nhưng coalesce wake khi bận, note trong task và daily curation/candidate. Không phê duyệt exact Tool/state enum/cycle identity/native send semantics, knowledge schema/retention hoặc production proof. A02 startup, user Spawn/Replace, GA01 và Fast/Deep/authority vẫn giữ nguyên.

Đã cập nhật composition/architecture/modules. A07 chốt behavior/contract; chưa đặt một domain entity hay identity mới cho “lượt điều phối”, không đồng nhất với Turn/Step Run/Quality Iteration. Không thêm Tool/state machine/auto-wake/job thật. Context/knowledge ownership/retrieval/freshness, bootstrap/eval và model coverage còn theo dõi trước closing.

## Factual exploration F-A03 — native instructions/context

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aharness-instructions-context-facts-r3-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aharness-instructions-context-facts-r3-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output: [instructions-context-facts-r3.md](instructions-context-facts-r3.md). Status: **completed**, đã đọc toàn báo cáo.
- Scope: official/versioned Paseo context/instruction/Tool inputs, inherited project/user/provider sources, bounded inventory/precedence claims, knowledge read-on-demand through MCP and mechanical versus semantic conflict detection. Chỉ facts có nguồn/test scope; không chọn policy hay sửa existing docs, không live mutations/tests.
- A08/Q1–Q3 là product defaults không phụ thuộc vào khả năng inject/override system instructions nên hỏi ngay. Những câu downstream về native source precedence/visibility chờ facts; không hỏi user đoán API. Nguồn dự án/quyền bắt buộc và quyết định khi nguồn mâu thuẫn vẫn giữ quy tắc đã chốt.

### Parent review F-A03

Đã đọc report, đối chiếu boundary với smoke evidence đã giữ và A05–A08. File reads được chỉ định và Tool trả handover durable có bằng chứng Codex smoke; đó không phải generic MCP resource discovery, automatic link dereference hay proof mọi provider. SDK/source declarations và unversioned docs là facts đọc, không nâng thành installed-host/live proof. Report phân rõ local 0.11.1, source release commit 0.12.0 và docs đọc ngày 2026-10-23.

Paseo guidance được thêm vào môi trường có provider/project/user/native inputs; không có bằng chứng complete effective-instruction inventory hoặc universal precedence. Fresh worker Session không có nghĩa môi trường trống. Vì vậy context tối thiểu A08 chỉ áp cho phần harness chuẩn bị, không mở lại yêu cầu Skill isolation đã bỏ. Mechanical ref/digest/revision checks không tự giải semantic conflicts. Existing authority/source-of-requirement/decision rules vẫn giữ; chưa tự đặt một priority engine cho provider inputs.

Không có thêm lựa chọn user về SDK capability từ báo cáo; owner knowledge và publication boundary vẫn là architecture decisions riêng. Exact delivery/read evidence, context size/compaction/errors, credential lifecycle/provider parity và diagnostics còn là engineering/contract-proof work. Source-policy mới nếu xuất hiện mâu thuẫn cụ thể sẽ được hỏi với tình huống/evidence, không tự coi đã approved hoặc hỏi lại mọi quyết định cũ.

## Vòng A08 — knowledge scope, retrieval và freshness

Ba câu độc lập: logical scope không quyết định eager/progressive loading; progressive retrieval không quyết định cách xử lý notes có source drift. Chúng không chọn database/schema hay một settings inheritance engine. Scope `harness`/`project` ở đây là phạm vi tri thức trong cùng một bộ cho một dự án, không phải hai platform/multi-project contexts mới.

### Q1 — Một kho tri thức logic, phân scope harness và project?

Đề xuất: **đồng ý**. Bài học về vận hành/phương pháp harness có scope harness; bài học về codebase/nghiệp vụ dự án có scope project. Giữ source, owner và quyền đọc/chỉnh; hai orchestrator tra cứu phần được phép qua cùng Interface, không tự duy trì hai bản sao của cùng note. Nghiệp vụ/yêu cầu/criteria vẫn có owner và nguồn authoritative riêng, không trở thành note chỉ vì được nhắc trong đó.

Physical file/store/module owner chưa được chốt từ logical model này; kiến thức dự án vẫn private theo quyền hiện hành, contribution upstream chỉ lấy phần được phép tái sử dụng. Alternative: hai kho tách biệt, trao đổi có chủ đích bằng references; cần giải quyết nguồn chung và trùng/đổi bản mà không bắt người dùng sao chép context.

### Q2 — Harness chuẩn bị context tối thiểu và cho agent đọc tri thức khi cần?

Đề xuất: **đồng ý**. Gói đầu vào chứa instructions/luật chung được chọn, nhiệm vụ, quyết định/tiêu chí bắt buộc và nguồn cần thiết; phần Learned Knowledge được cung cấp qua mục lục/search/read Tools theo task. Agent lấy thêm nội dung phù hợp thay vì mặc định nhét toàn bộ kho vào mỗi lượt. Nội dung đã dùng giữ source/revision trong execution trace/context selections.

Lựa chọn chỉ áp vào context harness chuẩn bị; không hứa xóa/inventory hết native/project/provider inputs hoặc cô lập Skill discovery. Explicit Skill source refs, required procedure resources và auto/fixed/hybrid Principles giữ nguyên. Exact query/index/chunk/token budget và binding vào native Session là engineering/capability work. Alternative: nạp sẵn toàn bộ knowledge nhỏ đã chọn theo role/scope, phải quản lý kích thước/độ mới nếu mở rộng.

### Q3 — Notes có nguồn đổi/mâu thuẫn phải được đánh dấu và kiểm lại trước khi dùng mặc định?

Đề xuất: **đồng ý**. Khi phát hiện source liên quan đã đổi, evidence không còn phù hợp hoặc note bị phản bác/mâu thuẫn, giữ note và history nhưng đánh dấu cần kiểm lại, loại khỏi phần tự nạp mặc định. Vẫn tra cứu lịch sử có trạng thái/source khi cần điều tra. Sau applicability check trên nguồn hiện tại, ghi kết luận/revision mới thay vì sửa ngược history hoặc xóa evidence cũ.

Source drift không tự chứng minh nội dung sai; nó tạo nhu cầu kiểm applicability. Không hứa code tự phát hiện mọi mâu thuẫn ngữ nghĩa; agent/checker có thể phát hiện và nộp evidence. Đây là note retrieval/curation policy, không tự vô hiệu mục tiêu/criteria authoritative và không bắt mọi lần kiểm note chạy Deep release. Alternative: trả cả notes nghi ngờ trong retrieval mặc định với qualification rõ, để agent tự đánh giá mỗi lần.

**User answer A08:** `ok` — **P2972**, trả lời ba đề xuất ở P2970. [Native evidence](history/architecture-a08-2026-10-23/acceptance-a08.json) giữ nguyên văn và IDs. **Cả ba accepted**: logical Harness/Project scope, progressive retrieval cho context harness chuẩn bị và applicability recheck/exclusion khỏi automatic default loading cho notes có source drift/contested. Không chốt physical store/schema/index/module owner, complete native inventory/isolation hoặc automatic semantic contradiction detection.

Đã cập nhật composition/modules/architecture; WHAT meaning của Learned Knowledge giữ nguyên, A08 thêm lifecycle/retrieval behavior chứ không tạo entity mới. Chưa tạo knowledge store/index/tool/UI hoặc active policy implementation. F-A03 đã hoàn thành/parent review bên trên; không đặt priority cho provider system messages từ lựa chọn context này.

## Vòng A09 — knowledge owner và publication boundary

Hai câu độc lập. Knowledge lifecycle owner không quyết định task plan phải release hay không; publication boundary không quyết định owner của learned notes. B6 bootstrap/starter-asset/evaluator contracts đi tiếp sau các lựa chọn này để khớp các owner/capabilities thực sự cần chuẩn bị. Không hỏi lại workflow có tổ hợp được hay self-update có đủ phần hay không.

### Q1 — Kho tri thức có module Knowledge sở hữu Interface riêng?

Đề xuất: **đồng ý**. Module **Knowledge** sở hữu learned-note lifecycle: ghi/đọc/tìm kiếm theo scope/authority, source/revision/history, qualification, trạng thái cần kiểm lại và kết quả recheck. Work giữ execution/context snapshots, AgentDefinitions giữ agent/Skill/Principle bindings, Criteria giữ authoritative criteria/Verdicts; Knowledge không thay các owner đó. MCP, daily retro và Work dùng cùng Interface, không tự đọc/ghi nhiều nguồn rồi suy nguồn hiện hành.

Đây là owner cho capability A06–A08, không phải generic Memory framework, một service/database mới hoặc UI CRUD bắt buộc. Physical storage và method/schema vẫn cần thiết kế. Alternative: vòng đời learned notes nằm trong implementation của Work với seam nội bộ rõ; cần chứng minh callers không tự thực hiện scope/provenance/freshness protocol.

### Q2 — Ghép kế hoạch theo task từ các khối đã đăng ký được chạy sau validation, không cần release plugin?

Ví dụ Project Orchestrator cần ghép route → parallel review → sửa/đánh giá từ các bước/roles/Tools đã có. Đề xuất: **đồng ý**. Kế hoạch riêng của task được WorkflowPrograms kiểm cấu trúc/contracts/bounds, Work ghi/pin version và thực thi trong quyền hiện hành. Không phải sửa và phát hành plugin chỉ vì tổ hợp khác. Output/criteria validation và các effect permissions vẫn bắt buộc.

Đăng ký composition thành workflow tái sử dụng, hoặc thêm/sửa code step, Tool, Skill hay hành vi vận hành dùng lâu dài thì đi candidate/check/activation như đã chốt. Không chạy chuỗi code tự sinh chưa được kiểm như một cách lách release. Exact run-scoped definition representation/storage/identity và published references còn cần thiết kế; dynamic expansion vẫn theo bounds và các quy tắc pin/checkpoint đã có.

Alternative: chỉ chạy published workflow definitions có sẵn; tổ hợp mới luôn phải được harness đăng ký/phát hành trước. Trade-off là publication boundary đơn giản hơn nhưng tăng vòng chờ cho kế hoạch chỉ dùng một task. Hai lựa chọn đều phải giữ đủ năm patterns/dynamic workers và authority; không ngầm cắt flexibility để tránh thiết kế execution contract.

**User answer A09:** `đồng ý` tại **P2988**, trả lời cả hai đề xuất ở **P2986**. [Native evidence](history/architecture-a09-2026-10-23/acceptance-a09.json) giữ nguyên văn, IDs và API page. **Q1/Q2 accepted:** Knowledge là module owner; task-specific composition được validate/pin/run trong quyền hiện hành, publication lâu dài đi qua candidate/check/activation. P2994 `Tiếp tục` yêu cầu tiếp tục phiên, không bổ sung một acceptance khác.

Đã đồng bộ architecture, modules, composition, configuration và tên module trong engineering glossary; hiện có tám module trong cùng plugin. Chưa tạo implementation, chọn method/schema/backend hoặc đổi graph/source identity semantics; architecture và gate V1 vẫn mở. [Baseline snapshots](history/architecture-a09-2026-10-23/baseline.json) giữ bản trước sửa. B9 còn phải đồng bộ follow-up concepts/relations/CQs sau snapshot glossary.

## Factual exploration F-A04 — native Stop/interrupt

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aorchestrator-native-stop-pause-facts-r4-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aorchestrator-native-stop-pause-facts-r4-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output: [orchestrator-stop-pause-facts-r4.md](orchestrator-stop-pause-facts-r4.md). Status: **completed**, parent đã đọc toàn report. Chỉ đọc primary docs/source và viết memo; không chạy live operations, tests, tạo Session/schedule hoặc thay host config.
- Scope: native Stop/send-interrupt so với SDK/MCP/CLI cancel; event initiator/reason/correlation, delivery/replay, ảnh hưởng thực sự tới lịch/admission và wake tới quanh thời điểm dừng. Phân biệt local 0.11.1, upstream pinned 0.12.0 và docs không version.
- Quyết định product còn mở: user Stop có cần chặn automatic wake tới Resume hay không. Không suy `idle`/`canceled` luôn là ý định dừng tự động của user. Facts report không tự chốt policy hoặc chứng minh installed-host capability. A10 không phụ thuộc kết quả này nên đã được hỏi/chốt trước.

### Parent review F-A04

Đã đọc report và đối chiếu A07 wake/A02 startup/current native boundary. Pinned 0.12.0 source cho thấy Stop gửi cancel request; interruption/prompt replacement/reload cũng có thể kết thúc bằng canceled. Local 0.11.1 terminal hook/types không có reliable human initiator/cancel-request correlation. Hook live best-effort và refetch transcript không tự khôi phục durable, attributed Stop intent. Nút Stop không tự chỉnh native schedule/heartbeat hay Work admission. Đây là inspected contracts/source, không phải live proof host/provider hoặc universal absence claim.

Hệ quả có căn cứ: không hứa mọi lần native Stop đều trở thành logical Pause bền vững chỉ bằng cách nghe canceled/idle. Explicit owner control có receipt là thiết kế khả thi cần kiểm; native cancellation acknowledgement không chứng minh worker/effect đã dừng hoặc undo. A11 hỏi operating behavior và phạm vi Pause, không giao user đoán API. Provider settlement, cadence coordination, authorization/order với wake đang bay và delivery qua reload là engineering/proof gaps, chưa được report giải quyết.

## Vòng A10 — starter assets và thời điểm jobs bắt đầu chạy

Hai lựa chọn độc lập: tài sản được ship sẵn không quyết định thời điểm bật automations; lifecycle arming không quyết định phải sinh lại catalog cho từng dự án. Giữ existing first-run/verification gates, ownership native cadence và bốn settings groups; không hỏi lại có cần daily retro, five patterns hoặc native profile editor hay không.

### Q1 — Repo base cung cấp sẵn catalog chuyên gia, workflow mẫu và bộ kiểm dùng chung?

Đề xuất: **đồng ý**. Ship versioned instructions/definitions cho Onboarding và Harness Engineering, cùng starter presets theo các trách nhiệm Observe/Retro, Investigate, Design/Plan, Implement, Verify; reusable blocks/workflow templates và validation/eval fixtures đi cùng. Đây là tài sản trong repo base để tái sử dụng/cải tiến, không phải tất cả đều được sinh lại từ đầu cho mỗi dự án. Các nhóm trách nhiệm đã có trong autonomous-team proposal; lựa chọn mới ở đây là đóng gói thành starter assets cụ thể.

Onboarding bind tới native profiles có sẵn và Skills/Principles đã cài; chưa đủ binding thì asset chưa runnable. Harness Engineering khảo sát dự án, chọn/chỉnh các tài sản đó, dựng Project Orchestrator và bổ sung chuyên gia/workflows riêng. Không tạo native profile trùng, đóng cứng models, spawn sẵn mọi worker hoặc bắt mọi task qua năm vai. Năm nhóm không phải số tối ưu đã được chứng minh; fixtures không tự chứng minh model/profile mới đã qua live verification. Dependency chưa dùng không chặn việc độc lập đủ điều kiện.

Alternative: repo base chỉ có builder/runtime, sinh catalog/templates/fixtures phần lớn từ đầu cho từng dự án. Ít starter assets phải bảo trì, đổi lại tăng công bootstrap và mức biến thiên cần kiểm lại. Exact tên/file tree/fixture schema là engineering sau lựa chọn này.

### Q2 — Jobs chỉ được tự chạy sau khi đúng giai đoạn đã được người dùng khởi động và cấu hình đủ?

Đề xuất: **đồng ý**. Mới cài/đang Onboarding chưa tự chạy LLM loop hoặc poll Backlog/GitLab thật; code load/reconcile/health phục vụ plugin vẫn hoạt động. Onboarding trình cấu hình cadence/enabled state để người dùng biết. Khi user Spawn Harness Engineering và bindings/quyền/lịch cần thiết đã đủ, daily retro đã được bật mới được arm; không đòi người dùng duyệt lại từng lượt đã được cấp quyền. Code jobs kéo task/rà PR chỉ poll khi connection/filter/cadence và enabled state đã cấu hình đủ.

Reload/restart đối soát và tiếp tục enabled state đã lưu; không tự bật lại job bị pause/disable hoặc tự Spawn/Replace orchestrator. Bật job vẫn chịu authority/admission/budget và capability thực sự có; việc đã nhận được giữ durable, không mất chỉ vì native Session chưa sẵn. Đây là operating default trong startup đã chốt A02, không hứa OS launcher hoặc cron capability chưa kiểm. Sự khác biệt native Stop với logical Pause chờ F-A04/B12, không tự gộp vào câu này.

Alternative: cấu hình đủ vẫn không arm khi user Spawn Engineering; người dùng phải bật thủ công riêng từng automation lần đầu. Các lượt sau vẫn dùng enabled state bền vững. Chi tiết executor/cadence bridge và fault tests là engineering, không giao user đoán SDK.

**User answer A10:** `ok` tại **P3021**, trả lời cả hai đề xuất ở **P3019**. [Native evidence](history/architecture-a10-2026-10-23/acceptance-a10.json) giữ nguyên văn, IDs và API page. **Q1/Q2 accepted:** shipped starter assets và stage/config/enabled-state arming. Đã đồng bộ composition, architecture, configuration, first-run UX, specialist proposal và acceptance cần kiểm. Chưa tạo source presets, scheduler, eval runner hoặc test runtime; exact packaging/bridges vẫn cần engineering/proof. [Before snapshots](history/architecture-a10-2026-10-23/baseline.json) giữ bản trước sửa; architecture và gate V1 vẫn mở.

## Factual exploration F-A05 — whole-kit coverage sau A10

- Task: `node:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aharness-whole-kit-coverage-facts-r5-20261023`.
- Child: `thread:delegated-task:command%3Amcp%3A8bec9096-70b2-40c9-a8b9-91d1f5f4fbac%3Adelegate-task%3Aharness-whole-kit-coverage-facts-r5-20261023`.
- Provider/model/options: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Output dự kiến: `harness-whole-kit-coverage-facts-r5.md`. Status tại lúc ghi: **running**. Chỉ khảo sát tài liệu/evidence và viết memo, không tests/live operations/config changes/delegation.
- Scope: trace agents/definitions/instructions, methods, Tools/integrations, context/knowledge/state, workflows, scheduling/events, policies/resources, evals, Analytics, evolution/release/dependencies, management/packaging. Mỗi trace giữ assets/owner/boundary, phân material choice với engineering/proof/documentation. Không lấy tám module làm bằng chứng coverage toàn hệ thống; không suy architecture closure hoặc V1 acceptance. A11 độc lập với audit này nên hỏi ngay; B9 graph follow-up vẫn pending.

## Vòng A11 — Stop và Pause của closed loop

Hai câu độc lập trên nền pause/admission đã có: Q1 chọn tín hiệu/interface có ý nghĩa dừng bền vững; Q2 chọn phạm vi dừng, dù control được kích hoạt bằng đường nào. F-A04 đã đủ để không hứa native human attribution chưa có; native execution/enforcement vẫn cần proof. User chưa trả lời cả hai.

### Q1 — Giữ Stop native cho Turn cancellation, dùng explicit Pause/Resume để dừng tự điều phối bền vững?

Đề xuất: **đồng ý**. Stop của Paseo tiếp tục yêu cầu ngắt lượt hiện tại; không tự coi canceled/idle là logical Pause, nên một event/lịch hợp lệ sau đó vẫn có thể wake lại theo policy. Muốn ngừng automatic wake/admission thì dùng Pause/Resume của logical orchestrator qua owner Interface chung cho UI/MCP. Pause ghi durable intent/state và trả Receipt; Work kiểm nó trước automatic wake/dispatch, không suy từ prose hoặc native terminal status.

Đây là điều khiển closed loop của harness, không phải native Stop/profile/chat editor thứ hai. UI phân requested/pending/observed nếu native cancel hoặc cadence coordination chưa được xác nhận; chỉ cam kết chặn admission/automatic wake thuộc quyền kiểm soát, không hứa chặn mọi native/manual prompt ngoài harness. Đối với native cadence được bind, adapter phải phối hợp đúng owner/capability và thể hiện thiếu khả năng rõ; không coi canceled hook là pause acknowledgement. Resume có authority, không tự xóa pause sau reload hoặc event mới.

Alternative: yêu cầu native Stop cũng đặt durable logical Pause. Với inspected contracts chưa có reliable durable interception/attribution, cần capability thay đổi/bổ sung được kiểm chứng trước khi hứa; không lặng lẽ gắn mọi cancellation vào user intent. Q1 không tự thêm fork/monkeypatch hoặc approve một implementation workaround.

### Q2 — Pause một orchestrator giữ các workers đang chạy và tiếp nhận sự kiện, chỉ chặn tự điều phối/giao việc mới của bên đó?

Đề xuất: **đồng ý**. Pause chặn automatic wake và admission/giao việc mới do orchestrator đó sở hữu, kể cả progression mở chặng mới; workers đã nhận việc được tiếp tục phần đang chạy, kết quả/evidence/events giữ durable chờ Resume. Code jobs độc lập đã bật có thể tiếp tục nhận/dedupe vào inbox; orchestrator còn lại không tự bị pause. Không tạo worker/lượt mới chỉ vì kết quả tới lúc paused. Separate work cancellation, job disable và toàn-kit controls vẫn là thao tác có scope riêng.

Đây là default Pause scope, không cấp worker thêm quyền hoặc cho đã-revoke authority tiếp tục có hiệu lực. Không bảo đảm mọi worker đang chờ clarification sẽ hoàn tất khi không còn điều phối. Active native Turn interruption, in-flight effects, resource occupancy và desired/observed trạng thái vẫn cần xử lý/hiển thị đúng; Pause không tự undo tác động ngoài.

Alternative: Pause một orchestrator còn gửi yêu cầu ngắt các workers liên quan và dừng jobs liên kết. Giảm hoạt động tiếp diễn, nhưng mất phần đang làm và phức tạp hóa khôi phục; vẫn không đảm bảo hủy effects đã xảy ra. Chi tiết cancel/checkpoint/reconcile không được giải quyết bằng đổi nhãn Pause.

**User answers A11: đang chờ cả hai.** Bản recommendation chưa là accepted UI/control contract; chưa thêm glossary nghĩa mới hoặc thay đổi prototype.

## Quy tắc tiếp tục/kết thúc

Sau mỗi câu trả lời: ghi nguyên văn với source ID khi API có, recompute tree/frontier và đồng bộ quyết định liên quan. Facts của audit không tự là acceptance. Câu hỏi phụ thuộc prerequisite chưa settled để vòng sau; hỏi toàn frontier sẵn sàng mỗi vòng. Không mở lại một nhánh đã chốt nếu chưa có mâu thuẫn/yêu cầu mới cụ thể. Khi mọi nhánh trong scope đã được thăm, không còn giả định ngầm hoặc câu hỏi chưa trả lời, mới trình bản tổng hợp kiến trúc hiện hành để user xác nhận kết thúc.
