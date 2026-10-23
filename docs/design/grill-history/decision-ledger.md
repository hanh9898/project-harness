# Grill decision ledger — audit từ chat gốc

Audit ngày 2026-10-23. Nguồn trực tiếp: [thread T3](t3-thread://v1/53d0b426-056c-4920-a3df-13786d026007), [bản lưu API và manifest](README.md). Bao phủ 196 lượt user đến P2584; không gọi chúng là 196 buổi grill. [Sổ từng lượt](rounds.md) giữ đầy đủ câu đề xuất và trả lời; [transcript](transcript.md) có ID nguyên gốc.

## Kết luận cần sửa so với các tổng kết trước

1. **Lịch sử hỏi–đáp trước đây chưa được lưu tập trung.** Các ADR/glossary/spec có ghi kết quả, nhưng không thay cho original conversation. Bundle này mới bổ sung bản lưu messages có source IDs và hashes.
2. **Phạm vi xác nhận D01 không đủ tường minh để nói chắc đã duyệt cả 96 mục.** Docs đang ghi approved, nhưng chat có một câu hỏi giải nghĩa chen giữa đề nghị bulk approval và câu “Ok thế theo đề xuất”. Chi tiết ngay bên dưới.
3. **Gate nghiệm thu V1 tổng hợp chưa nhận được câu trả lời xác nhận tương ứng.** Các MUST/features đã được chốt từng vòng; đây là hai phạm vi khác nhau.
4. **Các phần còn cần đặc tả kỹ thuật không tự là vòng phỏng vấn chưa xong.** Chỉ gọi một câu hỏi là chưa trả lời khi truy được câu hỏi và không có phản hồi đóng nó. Nhiều schemas/protocols vẫn là engineering design, không cần giả định phải hỏi lại mọi lựa chọn sản phẩm.
5. **D02–D05 và GA01 có cặp đề xuất–xác nhận trực tiếp.** Có thể truy nguyên phần ngữ nghĩa/policy đã chốt; không vì vậy duyệt mọi schema/cardinality hoặc chứng minh runtime.

### D01: bằng chứng và giới hạn phạm vi

Chuỗi gốc:

- [P2359](transcript.md#p-2359), assistant: “Q1 — Chốt bộ vocabulary tiếng Anh này làm chuẩn cho V1?” và dẫn bản review đầy đủ.
- [P2361](transcript.md#p-2361), user: **“Thế cái đội năng lực là cái quái gì”**. Đây là yêu cầu giải thích, không phải xác nhận D01.
- [P2365](transcript.md#p-2365), assistant: giải thích “Đội năng lực” là nhãn cũ của **Agent Catalog / Danh mục agent**, mô tả catalog cấu hình khác agent đang chạy. Không nhắc lại câu hỏi duyệt toàn bộ review ở cuối câu trả lời này.
- [P2367](transcript.md#p-2367), user: **“Ok thế theo đề xuất”**.
- [P2368](transcript.md#p-2368), assistant: **“Mình hiểu bạn đồng ý chốt bộ vocabulary theo bản review.”** Đây là diễn giải của assistant, không phải thêm một câu đồng ý của user.

[Tài liệu hiện hành, đoạn Accepted review D01](../v1-glossary-completion-plan.md#accepted-review--complete-english-vocabulary-d01-2026-10-23) ghi cả 96 mục đã được chấp nhận. [Bản trích tại lúc audit](document-comparison.json) giữ nguyên claim này và hash file. **Audit status: phạm vi đồng ý chưa rõ** — có thể user đang trở lại đề xuất bulk, cũng có thể chỉ xác nhận cách gọi/giải thích Agent Catalog. Không tự chọn một nghĩa rồi gọi đó là bằng chứng chắc chắn.

Tên Agent Catalog / Danh mục agent **có xác nhận trực tiếp riêng từ trước**: [P1785→P1787](rounds.md#r136) và [P1792→P1794](rounds.md#r137). Vì vậy scope ambiguity của D01 không đồng nghĩa tên này chưa được chốt.

Audit giữ nguyên các status/definitions đã lưu để không tự đảo quyết định. Cần xác nhận hẹp về **phạm vi bulk D01**, không mặc định phỏng vấn lại toàn bộ glossary.

### Gate V1: câu hỏi vẫn chưa có xác nhận

[P1270](transcript.md#p-1270) hỏi “Q1 — Chốt điều kiện hoàn thành V1”, kèm sáu nhóm bằng chứng. [P1272](transcript.md#p-1272) user trả lời **“Prototype có bị thiếu màn nào ở V1 ko”**. Sau đó luồng đi sang audit/sửa prototype [R102](rounds.md#r102), không có lời xác nhận tổng hợp sáu mục tương ứng.

Đối chiếu [scope §4](../scope-80-20.md#4-nghiệm-thu-v1--đề-xuất-chờ-xác-nhận): vẫn ghi “đề xuất chờ xác nhận”. Không được lấy yêu cầu sửa prototype hoặc các câu “ok” cho features trước đó làm câu trả lời của gate này.

## Các nhóm phỏng vấn đã truy nguyên

Các dòng dưới là nhóm chủ đề do audit gom để tra cứu, không phải tên/số buổi ban đầu. Mỗi R mở được nguyên đề xuất/ngữ cảnh và user reply. Đường dẫn tài liệu là nơi kết quả được ghi hiện nay; chính chat mới là bằng chứng xác nhận.

| Chủ đề | Hỏi–đáp / yêu cầu gốc | Kết luận đối chiếu | Nơi ghi hiện nay |
|---|---|---|---|
| Một bộ đi với một dự án | [R017](rounds.md#r017), [R018](rounds.md#r018) | Yêu cầu trực tiếp; bác multi-project orchestrator | [ADR0002](../../adr/0002-mot-bo-mot-du-an.md) |
| Hai orchestrator và closed loop | [R015–R021](rounds.md#r015) | Được làm rõ dần; bỏ cách hiểu cả hai chỉ là code controller | [ADR0003](../../adr/0003-harness-orchestrator-closed-loop.md) |
| Năm pattern tổ hợp/lồng | [R018](rounds.md#r018), [R021](rounds.md#r021) | Yêu cầu trực tiếp và autonomy được chốt | [Architecture](../architecture.md) |
| Tiêu chí do người dùng bổ sung | [R021–R022](rounds.md#r021) | Hai nhóm tiêu chí, tự nhiên, revision/evidence | [Criteria/config](../configuration.md) |
| Resume, worktree, quyền, results, retry/budget | [R023–R025](rounds.md#r023) | Có các cặp Q/A; detailed protocol vẫn khác policy | [ADR0005](../../adr/0005-khoi-phuc-va-co-lap-thuc-thi.md) |
| TypeScript, Git/SQLite/files | [R027](rounds.md#r027) | Đồng ý ba câu P250 | [ADR0006](../../adr/0006-typescript-runtime-va-luu-tru.md) |
| Plugin dày; self-improve/upstream; API chung | [R028–R031](rounds.md#r028) | R028 chưa chốt plugin mỏng; R029 chọn dày | [ADR0007](../../adr/0007-plugin-day-runtime-phuc-hoi.md), [ADR0008](../../adr/0008-api-chung-va-tiep-nhan-hbu.md) |
| Deep modules và closed-loop research | [R032–R034](rounds.md#r032) | Yêu cầu design/research/update; không blanket approve mọi sketch | [Modules](../modules.md) |
| First-run UX và chat chính | [R037–R042](rounds.md#r037) | Chat được chốt; early wizard/Project sơ khởi có thay thế về sau | [Interaction model](../interaction-model.md) |
| Kế thừa Paseo, code jobs khác agent jobs | [R047–R048](rounds.md#r047) | Không nhân đôi native, nhưng không bỏ code scheduler | [Paseo boundary](../paseo-boundary.md) |
| Config 80/20, specialist/Skill/Principle | [R050–R055](rounds.md#r050) | Có preference/yêu cầu trực tiếp; native profiles chọn bằng refs | [Configuration](../configuration.md) |
| Product terms, một plugin, profiles/definitions | [R065–R084](rounds.md#r065) | Có tên bị bác; các định nghĩa lần lượt được xác nhận | [Glossary map](../../../GLOSSARY-MAP.md) |
| Bỏ fork/monkey patch Skills | [R088–R090](rounds.md#r088) | User sửa lỗi gõ; dùng R090 chỉ định tường minh | [Configuration](../configuration.md) |
| V1 MUST, độ rộng và ranh giới | [R095–R100](rounds.md#r095) | Chốt scheduler, full self-update, deep Analytics; existing codebase, Backlog/GitLab, Codex/Claude | [Scope](../scope-80-20.md) |
| Nghiệm thu V1 tổng hợp | [R101](rounds.md#r101) | **Câu hỏi chưa được trả lời xác nhận** | [Scope §4](../scope-80-20.md#4-nghiệm-thu-v1--đề-xuất-chờ-xác-nhận) |
| Nhiều glossary theo scope, UI/code mappings | [R104–R107](rounds.md#r104) | Method và một số meanings đã duyệt; không kết luận đủ toàn V1 | [Glossary map](../../../GLOSSARY-MAP.md) |
| Release nhỏ, Fast/Deep, fix-forward, check reuse | [R108–R117](rounds.md#r108) | Nghiên cứu rồi chốt policy; không giữ auto-rollback cũ như mặc định cuối | [Release policy](../release-policy.md) |
| Active/Recovery và execution/analytics vocabulary | [R121–R126](rounds.md#r121) | Có Q/A trực tiếp; Assignment được làm rõ thêm GA01 | [Domain glossaries](../../../GLOSSARY-MAP.md) |
| English trước Vietnamese | [R129](rounds.md#r129) | Yêu cầu trực tiếp | [UI naming](../../ui/ui-naming-interview.md) |
| Agent Catalog/Delegation: sáu vòng | [R132–R137](rounds.md#r132) | Sáu cặp hỏi–đáp xác định được; contract chi tiết còn mở | [Agent delegation](../agent-delegation.md) |
| Onboarding menu, MCP, readiness, Replace | [R140–R146](rounds.md#r140) | Có scope/flow/authority đã chốt; user chủ động Spawn | [Onboarding](../onboarding-agent.md) |
| English UI terms và Vietnamese labels | [R153–R171](rounds.md#r153) | Ghi cả bác bỏ/bản sửa; Checkpoint giữ English | [UI glossary](../../ui/GLOSSARY.md) |
| Ontology/CQ và concept graph method | [R177](rounds.md#r177), [R179](rounds.md#r179) | Đồng ý phương pháp/review scenario, không duyệt whole graph | [Concept method](../glossary-concept-model.md) |
| D02–D05 | [R180–R185](rounds.md#r180) | Có xác nhận từng đề xuất; giới hạn ở semantics/policy | [Completion plan](../v1-glossary-completion-plan.md) |
| D01 bulk review | [R186–R187](rounds.md#r186) | **Phạm vi xác nhận chưa rõ; docs ghi rộng hơn bằng chứng chắc chắn** | [D01 record](../v1-glossary-completion-plan.md#accepted-review--complete-english-vocabulary-d01-2026-10-23) |
| GA01 Assignment identity | [R193](rounds.md#r193) | Chi tiết P2540 → user “ok” P2542 | [GA01](../v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance) |
| Hiện ở phase thiết kế | [R190](rounds.md#r190) | Yêu cầu trực tiếp, không chuyển sang production work | [README](../README.md) |

## D02–D05 và GA01: cặp nguồn chính xác

| Quyết định | Đề xuất gốc | Phản hồi user | Phạm vi đã chốt |
|---|---|---|---|
| D02 identity | [P2212](transcript.md#p-2212) | [P2214](transcript.md#p-2214) — “Ok” | Workflow Step / Step Run / Attempt |
| D02 admission và D03 join mặc định | [P2232](transcript.md#p-2232) | [P2234](transcript.md#p-2234) — “Ok” | Ghi Attempt sau admission/trước dispatch; all-required join |
| D03 branch set / failure | [P2247](transcript.md#p-2247) | [P2249](transcript.md#p-2249) — “Ok” | Chốt tập nhánh động, nhánh required thất bại và phần đang chạy |
| D03 Outcome / reuse | [P2262](transcript.md#p-2262) | [P2264](transcript.md#p-2264) — “Ok” | Partial outputs/provenance, Verdict riêng, reuse có eligibility |
| D04 Deep triggers và D05 evidence/attribution | [P2279](transcript.md#p-2279) | [P2281](transcript.md#p-2281) — “Ok” | Mandatory Deep cho cơ chế bảo vệ/quyền; evidence theo mục tiêu; shared costs |
| D04 Fix-forward boundary | [P2291](transcript.md#p-2291) | [P2293](transcript.md#p-2293) — “Ok” | Bốn điều kiện kiểm soát lỗi; otherwise pause/reconcile/recovery thích hợp |
| GA01 | [P2540](transcript.md#p-2540) | [P2542](transcript.md#p-2542) — “ok” | Actual redispatch tạo Assignment mới; mất response/continued Turns giữ identity; late results và workers qua Replace |

Các “Ok” ở bảng này được trích kèm câu hỏi đầy đủ trong [rounds](rounds.md). Chúng không duyệt thêm cardinality chưa hỏi hoặc tạo bằng chứng runtime.

## Những thay thế cần giữ trong lịch sử

- **Hai code controllers → Harness Engineering closed-loop agent có code giữ invariant:** [R016](rounds.md#r016) → [R018](rounds.md#r018)/[R021](rounds.md#r021).
- **Project xuất hiện sơ khởi trước → Onboarding rồi user Spawn Engineering rồi Project:** [R041](rounds.md#r041) → [R140](rounds.md#r140)/[R146](rounds.md#r146).
- **Bỏ mọi scheduler riêng → giữ code jobs + lịch tổng quát V1:** [R048](rounds.md#r048) → [R095–R100](rounds.md#r095).
- **Tự lùi mọi bản lỗi → fix-forward khi đủ điều kiện, compatible independent recovery khi cần:** [R098](rounds.md#r098) → [R112](rounds.md#r112)/[R117](rounds.md#r117)/[R185](rounds.md#r185).
- **Lỗi gõ về chỉ định Skill → bản sửa ngay:** [R089](rounds.md#r089) → [R090](rounds.md#r090).
- **“Khởi chạy / Mở phiên / Thay phiên” bị bác:** [R157](rounds.md#r157) → [R158](rounds.md#r158).
- **Nhãn phiên bản Q1 bị bác → bản sửa đủ nghĩa và xác nhận cả ba nhóm:** [R166](rounds.md#r166) → [R167](rounds.md#r167).
- **Assignment definition chung → allocation identity qua redispatch/retry:** [R125](rounds.md#r125) → [R193](rounds.md#r193).

## Việc còn dở, phân loại đúng

**Cần câu trả lời/phân định phạm vi trong phỏng vấn:**

1. Gate nghiệm thu V1 tổng hợp: bằng chứng chưa trả lời tại P1270→P1272.
2. D01: scope của P2367 đối với toàn bộ 96 entries. Đây là evidence ambiguity, không tự tuyên bố tất cả tên/definitions đều chưa được duyệt.

**Cần hoàn thiện thiết kế kỹ thuật; chưa có cơ sở gọi tất cả là câu hỏi user chưa trả lời:**

| Luồng | Phần còn cần làm rõ | Nguồn trạng thái tài liệu tại audit |
|---|---|---|
| Agent Catalog/Delegation | Policy schema/validation, context/result/escalation contracts, resource slots và provider enforcement; per-Session concurrency | [Agent delegation — Đang mở](../agent-delegation.md#đang-mở), [Modules GA01](../modules.md#bổ-sung-đã-chốt--ga01-allocation-identity) |
| Workflow/deep modules | Data contracts giữa modules, composition/join/reuse/invalidation và effect ownership; giữ semantics D02/D03/GA01 | [Modules](../modules.md), [Completion plan technical work](../v1-glossary-completion-plan.md) |
| Scheduler/integrations | Source delivery/cursor/outbox, overlap/catch-up/timezone/DST/races, ranh giới native cadence/code jobs | [Completion plan technical investigation](../v1-glossary-completion-plan.md), [Scope](../scope-80-20.md) |
| Self-update/recovery | Check Plan, check identity/invalidation, migration, fencing và độc lập recovery protocol | [Release policy — Engineering tiếp theo](../release-policy.md), [Release execution](../release-execution.md) |
| Analytics/Criteria | Metric formulas/availability/aggregation, data contracts và attribution implementation; policy D05 đã chốt | [Analytics glossary](../../domain/analytics/GLOSSARY.md), [Completion plan](../v1-glossary-completion-plan.md) |
| Onboarding/MCP | Review schemas/owner commands/receipts/revisions, lost-response và Replace/revocation protocol; UI/native API capabilities | [Implementation proposal](../onboarding-implementation.md), [Contracts](../onboarding-contracts.md) |

[Document comparison JSON](document-comparison.json) lưu trích đoạn có số dòng/hash để phân biệt trạng thái lúc audit với các thay đổi tương lai. Các docs có thể còn ghi chú lịch sử đã superseded; không lấy một đoạn “open” cũ để mở lại câu đã được đóng về sau.

**Không nằm trong lời kết luận “đã thiết kế xong”:** đầy đủ native capabilities, provider enforcement hoặc runtime V1. Parent chat từng báo tests/spikes pass chỉ là báo cáo trong hội thoại; cần mở artifacts/evidence tương ứng để kiểm chứng thực nghiệm. Bundle này bảo toàn lời nói và liên kết quyết định, không tạo thêm bằng chứng test.
