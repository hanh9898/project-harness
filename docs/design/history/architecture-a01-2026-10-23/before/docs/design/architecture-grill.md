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
- Output: `docs/design/architecture-frontier-audit-r1.md` (đang chạy).
- Scope: đối chiếu accepted baseline với năm module sketches, ownership của catalog/config/Analytics, flow giữa native chat và durable work, runtime composition, admission/effects, lifecycle/startup/recovery. Chỉ facts/source-backed alternatives, không quyết thay user, không sửa existing docs.
- Running exploration là prerequisite chưa settled cho các câu hỏi phụ thuộc nó. Hai câu A01 dưới đây dựa trên quan sát trực tiếp các Interface hiện có; các nhánh flow/failure/protocol khác chờ audit, không hỏi user SDK facts.

## Design tree và dependencies

| Node | Cần đạt | Dependencies | State |
|---|---|---|---|
| A0 | Shared understanding kiến trúc tổng thể hiện hành | A1–A7 + xác nhận cuối | Open |
| A1 | Owner/Interface cho Agent Definitions và catalog | Existing requirements/native ownership | **Frontier A01/Q1** |
| A2 | Owner/Interface cho Analytics queries và Saved Views | Deep Analytics và Criteria nghĩa đã chốt | **Frontier A01/Q2** |
| A3 | Hợp nhất module responsibilities, data/config owners và Interface dependencies | A1/A2 + F-A01 | Pending |
| A4 | Chat/inbox → plan/composition → admission/dispatch → results/criteria | F-A01 + A3 | Pending |
| A5 | Schedule/integrations → delivery/reconcile; startup/reload/release/recovery | F-A01 + các owner liên quan | Pending |
| A6 | Scenario walkthrough và đối chiếu cross-cutting requirements/authority/evidence | A3–A5 | Pending |
| A7 | Tổng hợp quyết định, explicit deferrals và synchronise docs | Các nhánh đã trả lời | Pending |
| A8 | Frontier rỗng trong scope và user xác nhận kết thúc | A1–A7 | Pending |

A1/A2 độc lập: chọn owner Agent Definitions không quyết định ai sở hữu Analytics. Tên/chia năm module cũ là proposal để kiểm; câu trả lời hai câu này không tự phê duyệt mọi Interface/ordering trong modules.md. Module mới nếu được chọn vẫn là module trong cùng plugin, không tự sinh process/database/settings group mới.

## Quan sát hiện tại cho A01

[modules.md](modules.md) hiện có Interface sketches của Triggers, Work, WorkflowPrograms, Criteria và Releases. Work giấu lifecycle/durability/admission; WorkflowPrograms giấu composition; Criteria giấu criteria/evidence/Verdict; Releases giấu activation/recovery. [Configuration §6](configuration.md#6-lưu-trữ-và-owner) phân Git definitions và SQLite mutable settings/active refs, nhưng chưa có Interface riêng làm owner trọn vòng Agent Definition/catalog cho UI/MCP/dispatch. Quyết định cần chốt là đặt Interface này thành module riêng hay thuộc implementation của module hiện có; không phải hỏi lại native profile ownership.

Analytics/Saved Views là hành vi V1 đã chốt. Work.read/list được mô tả cho trạng thái/tiến độ đã commit; Criteria sở hữu kết luận đánh giá. Chưa có Interface tổng hợp truy vấn/saved views xuyên dữ liệu Work/Criteria/Releases. Quyết định là module chuyên biệt hay đặt read side đó trong module hiện có; không hỏi lại formulas, counts hoặc deep Analytics có thuộc V1 không.

## Vòng A01 — frontier hiện tại

### Q1 — Agent Definitions/catalog có module sở hữu riêng?

Khi bạn sửa Reviewer qua UI hoặc Onboarding MCP, rồi orchestrator chọn Reviewer để giao việc, có đồng ý để một module **AgentDefinitions** sở hữu catalog, definition revisions, role/Skill/Principle bindings và việc cung cấp cấu hình hợp lệ cho lần giao việc không?

Đề xuất: **đồng ý, tách module AgentDefinitions**. UI/MCP và runtime dùng cùng Interface của module này; Work vẫn sở hữu admission, Assignment và native Session dispatch. Profile/provider/model gốc tiếp tục thuộc Paseo.

Alternative: đặt chức năng này trong implementation của Work, với owner nội bộ rõ. Trade-off là ít module công khai hơn nhưng Work chứa thêm vòng đời definition/config và callers sửa cấu hình phải đi qua Interface đó. Không tự chọn một trong hai khi user chưa trả lời.

### Q2 — Analytics có module riêng để cung cấp dữ liệu cho dashboard/retro?

Khi dashboard hoặc daily retro cần so sánh chi phí/chất lượng theo workflow, agent, phiên bản và Saved Views, có đồng ý để module **Analytics** cung cấp Interface truy vấn và lưu cách xem, dựa trên dữ liệu có nguồn từ Work/Criteria/Releases không?

Đề xuất: **đồng ý, tách module Analytics**. Criteria tiếp tục sở hữu tiêu chí và Verdict; Analytics tổng hợp/trình dữ liệu, giữ provenance và trạng thái thiếu dữ liệu. UI và agent dùng cùng logic truy vấn.

Alternative: giữ read models/queries trong Work và Criteria, tổ chức Interface truy vấn bên trong các module đó. Trade-off phải chứng minh caller không tự join/suy diễn nhiều nguồn và trách nhiệm Saved Views rõ. Không đẩy arbitrary SQL hoặc transcript parsing ra caller.

**User answers A01: đang chờ.** Đây là đề xuất kiến trúc mới ở cấp module/Interface, chưa là implementation hoặc thay đổi glossary đã chấp nhận. Khi được chốt sẽ ghi owner/engineering mapping tương ứng, ADR chỉ khi đáp ứng điều kiện trade-off/khó đảo ngược/cần context của domain-modeling.

## Quy tắc tiếp tục/kết thúc

Sau mỗi câu trả lời: ghi nguyên văn với source ID khi API có, recompute tree/frontier và đồng bộ quyết định liên quan. Facts của audit không tự là acceptance. Câu hỏi phụ thuộc prerequisite chưa settled để vòng sau; hỏi toàn frontier sẵn sàng mỗi vòng. Không mở lại một nhánh đã chốt nếu chưa có mâu thuẫn/yêu cầu mới cụ thể. Khi mọi nhánh trong scope đã được thăm, không còn giả định ngầm hoặc câu hỏi chưa trả lời, mới trình bản tổng hợp kiến trúc hiện hành để user xác nhận kết thúc.
