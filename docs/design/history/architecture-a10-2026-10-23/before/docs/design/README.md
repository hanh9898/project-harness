# Thiết kế Project Harness trên Paseo

Cập nhật: 2026-10-23. Đây là thiết kế hiện hành. Repo có tài liệu, HTML prototype và spike Paseo đã chạy thật; chưa có Project Harness hoàn chỉnh hoặc installer production.

[Grill history — bằng chứng từ chat gốc](grill-history/README.md) lưu 681 messages đến yêu cầu audit ngày 2026-10-23, kèm đề xuất–trả lời, source IDs và hashes. [Decision ledger](grill-history/decision-ledger.md) giữ kết luận tại thời điểm audit: gate nghiệm thu V1 chưa được trả lời, phạm vi xác nhận bulk D01 lúc đó còn mơ hồ. Các xác nhận mới G01/G02 được lưu riêng bên dưới, không sửa ngược bản evidence lịch sử.

[Session closure audit theo skill](grill-session-closure-audit.md) kiểm riêng điều kiện frontier rỗng và shared understanding. Bổ sung câu hỏi kết thúc kiến trúc P297 chưa được trả lời; phân biệt phiên còn mở, nhánh đã chốt và technical design chưa được review toàn phạm vi.

[Phiên Glossary V1 / concept graph đã kết thúc](glossary-v1-grill.md) giữ design tree, dependencies và câu hỏi–trả lời từng vòng. D01 có xác nhận mới G01 tại P2720→P2722 với [API evidence/frozen review](history/glossary-v1-g01-2026-10-23/acceptance-g01.json). Sau factual exploration, parent review và đồng bộ tài liệu, user xác nhận shared understanding/kết thúc qua [G02: P2767→P2769 “ok rồi”](history/glossary-v1-g02-2026-10-23/closure-g02.json). Phạm vi ngữ nghĩa đã tổng hợp được khép; inferred/proposed/unknown, technical design, runtime proof và gate V1 giữ giới hạn riêng.

[Phiên kiến trúc tổng thể đang mở lại](architecture-grill.md) giữ accepted baseline và frontier. A01/A02 giữ nguyên; A05–A07 chốt source/MCP/instructions/worker/closed-loop behavior. [A08](history/architecture-a08-2026-10-23/acceptance-a08.json) chốt logical knowledge scope, retrieval và freshness; [A09](history/architecture-a09-2026-10-23/acceptance-a09.json) chốt Knowledge owner và task-specific composition không cần plugin release. [Composition](harness-composition.md) giữ toàn bộ constituents, với tám module runtime hiện hành. [F-A03](instructions-context-facts-r3.md) đã được parent review, giữ giới hạn native inventory/precedence/proof. Frontier A10 là shipped starter assets và automation arming; native Stop/interrupt chờ F-A04. Graph follow-up B9 vẫn còn; sau A03 “chưa”, chưa kết thúc phiên/V1 gate hoặc triển khai runtime production.

Project Harness đi cùng một dự án và được triển khai bằng một Paseo Plugin. Onboarding Agent cấu hình khởi đầu qua native chat và MCP; sau đó người dùng khởi chạy Harness Engineering Orchestrator để dựng Project Orchestrator, rồi cả hai cùng phát triển: người dùng trao đổi nghiệp vụ trực tiếp trong chat dự án; chat harness và panel quản trị phục vụ phát triển, cấu hình và quan sát hệ thống.

Đề xuất tổ chức glossary theo domain, UI lexicon và code mapping: [glossary-architecture.md](glossary-architecture.md), kèm [nguồn khung DDD/HCI](glossary-framework-sources.md). Cấu trúc đã được xác nhận và tạo tại [GLOSSARY-MAP.md](../../GLOSSARY-MAP.md); glossary gốc giữ ngôn ngữ chung, các thuật ngữ chi tiết đã chuyển về nhóm sở hữu.

## Đọc tài liệu

| Tài liệu | Sở hữu nội dung |
| --- | --- |
| [autonomous-team-proposal.md](autonomous-team-proposal.md) | Thiết kế MAPE-K được dùng cho prototype: settings gọn, danh mục agent và principles chọn theo việc |
| [configuration-80-20-research.md](configuration-80-20-research.md) | Nghiên cứu Claude SDK/OpenCode/Pi và đề xuất config v1 còn bốn nhóm |
| [config-comparison-sources.md](config-comparison-sources.md) | Đối chiếu nguồn chính thức OpenCode/Pi, settings/definitions/runtime |
| [scope-80-20.md](scope-80-20.md) | Phạm vi V1 đã grill: lịch tổng quát, tự cập nhật toàn plugin, Analytics; gate nghiệm thu tổng thể còn chờ chốt |
| [release-policy.md](release-policy.md) | Release nhỏ, Fast/Deep path, fix-forward và recovery; phân biệt quyết định đã chốt với protocol còn mở |
| [release-execution.md](release-execution.md) | Đề xuất implementation revision/check reuse/activation/recovery, giới hạn bằng chứng và ca spike cần có |
| [Live recovery spike](../../spikes/release-paseo-live/README.md) | Reload lỗi và recovery độc lập đã thử trên plugin dùng một lần, daemon 0.11.1; giới hạn và evidence |
| [release-verification-results.md](release-verification-results.md) | 25 ca kiểm: Node/SQLite/executable và daemon riêng 0.12.0; cleanup và giới hạn end-to-end |
| [paseo-boundary.md](paseo-boundary.md) | Những chức năng dùng lại từ Paseo và phần riêng của harness |
| [architecture.md](architecture.md) | Phạm vi sản phẩm, hai orchestrator, ba vòng closed loop, runtime và lưu trữ |
| [harness-composition.md](harness-composition.md) | Toàn bộ source/tài sản, fork/deployment model, MCP cho agents và ranh giới dependencies/self-mutation đã chốt A05 |
| [architecture-review.md](architecture-review.md) / [HTML](architecture-review.html) | Đề nghị tổng hợp trước reframe A04; user chưa xác nhận kết thúc tại A03. Current whole-harness frontier ở architecture-grill/composition, không lấy snapshot cũ thay bản hiện hành |
| [interaction-model.md](interaction-model.md) | Ownership yêu cầu, chat, panel quản trị và phép ánh xạ planes |
| [first-run-ux.md](first-run-ux.md) | Luồng từ khởi tạo đến chat dự án, kiểm chứng và vận hành |
| [onboarding-agent.md](onboarding-agent.md) | Onboarding qua native chat với MCP cấu hình/hướng dẫn; Spawn/Open Session và các contract còn mở |
| [onboarding-contracts.md](onboarding-contracts.md) | MCP intents, readiness, Handover và Session ownership dùng chung UI/MCP; chưa là API production |
| [onboarding-implementation.md](onboarding-implementation.md) | Đặc tả lát cắt đầu tiên: owner commands, receipts/revisions, create/send ordering, reconnect/Replace và OB01–OB14 |
| [onboarding-spike-results.md](onboarding-spike-results.md) | Onboarding MCP → config/readiness/handover → user-command Engineering Session thật; reload, idempotency, cleanup và giới hạn |
| [t3-mcp-architecture-sources.md](t3-mcp-architecture-sources.md) | Research source T3 pin theo installed commit; bài học shared commands/context/async cho onboarding MCP, phạm vi còn chờ chốt |
| [configuration.md](configuration.md) | Bốn nhóm settings, catalog đội riêng, authority và vòng đời revision |
| [prototype-spec.md](prototype-spec.md) | Định nghĩa trước khi dựng: Các surface harness và điểm bàn giao Paseo, state, flow và ma trận kiểm prototype |
| [prototype.html](prototype.html) | Prototype sản phẩm có điều hướng và state cục bộ cho mới cài, bootstrap và vận hành |
| [v1-prototype-gaps.md](v1-prototype-gaps.md) | Audit ban đầu và cập nhật coverage HTML v6 cho năm nhóm V1 |
| [prototype-checks.md](prototype-checks.md) | Kết quả kiểm UI, coverage và giới hạn của prototype |
| [Concept graph source audit](v1-concept-graph-audit.md) · [Before/after register](v1-concept-graph-audit.json) | Rà relations/cardinalities/ownership/constraints; sửa phạm vi và nguồn; GA01 đã chốt: redispatch tạo Assignment mới; giữ identity khi mất response/tiếp tục Turns |
| [modules.md](modules.md) | Năm deep modules, interface, invariant, seam và adapter |
| [verification.md](verification.md) | Điều kiện nghiệm thu, ca kiểm hợp đồng và các spike còn phải làm |
| [Claude Managed Agents](claude-managed-agents-sources.md) · [Đối chiếu HTML](managed-agents-comparison.html) | Research nguồn chính thức; key points/config/workflow và điểm giống/khác với thiết kế Agent Team, đề xuất chưa chốt |
| [agent-delegation.md](agent-delegation.md) | Vòng grill Agent Catalog/Delegation Policy; phân biệt quyết định đã chốt và các quyền còn mở |
| [research.md](research.md) | Nguồn đã khảo sát, dữ kiện tham khảo và giới hạn của bằng chứng |
| [index.html](index.html) | Tổng quan tài liệu thiết kế, catalog module/config và ví dụ tương tác |

Thuật ngữ tại [GLOSSARY.md](../../GLOSSARY.md). Project Harness là toàn hệ thống; hai orchestrator là các thành phần điều phối, mỗi thành phần có Orchestrator Agent. Workflow Runtime thực thi workflow; Job xác định công việc, Schedule xác định khi kích hoạt; Improvement Loop khác với Agent Loop. CLI/MCP Server là interface truy cập, không phải tên gọi khác của hệ thống; MCP có caller V1 cụ thể là Onboarding Agent, recovery executable độc lập vẫn bắt buộc. Lý do các quyết định kiến trúc tại [docs/adr](../adr/); ADR có thể giữ lịch sử và trạng thái thay thế, còn bộ tài liệu này chỉ mô tả thiết kế hiện hành.

## Cách hiểu trạng thái

Các nguyên tắc sản phẩm và mô hình tương tác đã được thống nhất. Tên module, TypeScript sketches, cấu trúc thư mục và protocol là thiết kế kỹ thuật để triển khai/kiểm chứng; chúng không phải SDK Paseo hoặc code đang chạy. Nguồn tham khảo mô tả hệ thống của nguồn đó, không chứng minh Project Harness này có cùng bảo đảm.

HTML minh họa cách sử dụng và quan sát; không kết nối daemon hoặc tạo agent, schedule, worktree hay thay đổi cấu hình thật. Mọi giới hạn/lịch xuất hiện trong ví dụ đều là dữ liệu minh họa.

Mở [prototype.html](prototype.html) để đi trọn luồng sản phẩm. Thanh kịch bản riêng cho phép nạp Mới cài, Khám phá, Vận hành, Offline, Chạm giới hạn và Update lỗi. Prototype lưu fixture/nháp trong localStorage nếu được phép; Reset dữ liệu để bắt đầu lại. Kết quả kiểm UI tại [prototype-checks.md](prototype-checks.md), tách khỏi nghiệm thu runtime.

Luồng mới cài mở Onboarding Agent từ menu Orchestrators / Bộ điều phối trên context Paseo; không có wizard thiết lập host/provider hoặc CRUD agent/lịch agent riêng. Code jobs như sync Backlog/poll PR do harness lập lịch bằng code. Xem [ranh giới](paseo-boundary.md).

Prototype v6 đã bổ sung Analytics/saved views/compare, lịch tổng quát, source binding Backlog/GitLab, cây Workflow Run và Plugin releases/recovery. Có kịch bản tương tác cho các nhóm V1; dữ liệu, lịch và cập nhật vẫn là fixture. Prototype giữ Danh mục agent và bộ settings bốn nhóm. Catalog/skill/principle được cải tiến qua candidate; work giữ bundle đã pin. Quyền/giới hạn vẫn do settings của người vận hành kiểm soát.

Agents hiện hỗ trợ tạo/sửa trực tiếp agent definitions: ordered native profile fallback, skills từ catalog đã nạp, principles auto/fixed/hybrid và role bindings. Phải tạo native Paseo profile trước; harness chọn refs chính/fallback, không lặp provider/model/thinking/mode. HTML chỉ có native profile catalog fixture; nạp SKILL.md là metadata client, chưa install/execute skill trên host.

Đánh giá khả thi với public API và source Paseo: [paseo-feasibility.md](paseo-feasibility.md). Phân biệt chức năng native, phần harness phải xây và các contract cần spike; bằng chứng live hiện giới hạn ở spike trên daemon 0.11.1 bên dưới.

Kết quả kiểm trên daemon local 0.11.1: [paseo-spike-results.md](paseo-spike-results.md), kèm [code spike](../../spikes/paseo-contract/README.md). Đã kiểm SDK, worker Codex đọc skill thật, output validation và reload khi worker đang chạy; chưa kiểm skill isolation.

Nguồn 68 skills và phân biệt catalog/prompt/content: [skill-origins.md](skill-origins.md).

Khảo sát English terminology trước vòng phỏng vấn glossary: [industry-terms-map.md](industry-terms-map.md), kèm [nguồn về orchestration](industry-terms-orchestration-sources.md). English vocabulary V1 đã được chấp nhận ngày 2026-10-23; các owning glossaries là nguồn nghĩa được chốt, còn các trang nghiên cứu giữ cách dùng của nguồn tham khảo.

Prototype **v7** đồng bộ policy release nhỏ: Fast/Deep path, checkpoint theo phạm vi, backup có điều kiện, fix-forward, recovery độc lập và hoàn tất khi kiểm bắt buộc đạt. [Release policy](release-policy.md) là nguồn quyết định; HTML vẫn mô phỏng, không chạy các spike trên host khi bấm nút. Suite UI v7 đạt 57 assertions ở 375/728 px; các kết quả v6 được giữ như lịch sử.

First-run flow đã điều chỉnh theo menu quản lý vòng đời agent: Onboarding Agent → người dùng spawn Harness Engineering Orchestrator để dựng → người dùng spawn Project Orchestrator. Không giữ Project Chat/Harness Chat thành menu bắt buộc. [first-run-ux.md](first-run-ux.md) là luồng hiện hành; HTML v9 đã mô phỏng bước onboarding/launch và tách các identity/quan hệ; native integration của menu vẫn chưa triển khai.

Prototype hiện hành **v9**: [model notes](prototype-model-notes.md), [model source](prototype-model.js) và [engineering glossary](../engineering/GLOSSARY.md). Work Items/Runs và Assignments/Sessions có identity riêng; release target/active/recovery có refs riêng. Bằng chứng UI/Node nằm tại [prototype-checks.md](prototype-checks.md); không suy thành workflow runtime production.

Trạng thái từ vựng: **English vocabulary V1 đã chốt**. [Glossary Map](../../GLOSSARY-MAP.md) dẫn tới definitions/owners; [coverage](glossary-coverage.md) nêu phạm vi đã phủ và giới hạn proof. Graph relations/types và runtime contracts vẫn có trạng thái riêng.

Đề xuất cách hoàn thiện glossary theo mô hình thay vì danh sách từ: [glossary-concept-model.md](glossary-concept-model.md) — ontology engineering, graph quan hệ và 30 competency questions ban đầu truy vết V1. Chưa phải tuyên bố glossary đã đầy đủ hoặc xác nhận thêm domain terms.

Bản thiết kế concept model V1 để review: [register JSON](v1-concept-register.json) → [graph/register browser](v1-concept-graph.html), [51-CQ trace/answer ledger](v1-competency-ledger.md), [acceptance/follow-up và conflicts](v1-glossary-completion-plan.md), [validation](v1-concept-validation.md). Đây là draft theo phương pháp ontology/CQ đã được chấp nhận cho lượt làm việc này; không thay nghĩa glossary đã duyệt hoặc chứng nhận runtime V1.

D01–D05 đã chốt trong phạm vi vocabulary/policy đã review. [English record](v1-vocabulary-review.md), [HTML](v1-vocabulary-review.html) và [manifest](v1-vocabulary-review.json) lưu bộ 96 mục vừa chấp nhận; [audit](v1-vocabulary-audit-r2.md) là nghiên cứu trước acceptance. Owning glossaries hiện giữ định nghĩa English; UI labels và giới hạn fixture/runtime vẫn có scope riêng.
