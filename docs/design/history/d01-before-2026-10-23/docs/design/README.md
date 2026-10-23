# Thiết kế Project Harness trên Paseo

Cập nhật: 2026-10-22. Đây là thiết kế hiện hành. Repo có tài liệu, HTML prototype và spike Paseo đã chạy thật; chưa có Project Harness hoàn chỉnh hoặc installer production.

Project Harness đi cùng một dự án và được triển khai bằng một Paseo Plugin. Onboarding Agent cấu hình khởi đầu qua native chat và MCP; sau đó người dùng khởi chạy Harness Engineering Orchestrator để dựng Project Orchestrator, rồi cả hai cùng phát triển: người dùng trao đổi nghiệp vụ trực tiếp trong chat dự án; chat harness và panel quản trị phục vụ phát triển, cấu hình và quan sát hệ thống.

Đề xuất tổ chức glossary theo domain, UI lexicon và code mapping: [glossary-architecture.md](glossary-architecture.md), kèm [nguồn khung DDD/HCI](glossary-framework-sources.md). Cấu trúc đã được xác nhận và tạo tại [GLOSSARY-MAP.md](../../GLOSSARY-MAP.md); glossary gốc giữ ngôn ngữ chung, các thuật ngữ chi tiết đã chuyển về nhóm sở hữu.

## Đọc tài liệu

| Tài liệu | Sở hữu nội dung |
| --- | --- |
| [autonomous-team-proposal.md](autonomous-team-proposal.md) | Thiết kế MAPE-K được dùng cho prototype: settings gọn, đội năng lực và principles chọn theo việc |
| [configuration-80-20-research.md](configuration-80-20-research.md) | Nghiên cứu Claude SDK/OpenCode/Pi và đề xuất config v1 còn bốn nhóm |
| [config-comparison-sources.md](config-comparison-sources.md) | Đối chiếu nguồn chính thức OpenCode/Pi, settings/definitions/runtime |
| [scope-80-20.md](scope-80-20.md) | Phạm vi V1 đã grill: lịch tổng quát, tự cập nhật toàn plugin, Analytics; gate nghiệm thu tổng thể còn chờ chốt |
| [release-policy.md](release-policy.md) | Release nhỏ, Fast/Deep path, fix-forward và recovery; phân biệt quyết định đã chốt với protocol còn mở |
| [release-execution.md](release-execution.md) | Đề xuất implementation revision/check reuse/activation/recovery, giới hạn bằng chứng và ca spike cần có |
| [Live recovery spike](../../spikes/release-paseo-live/README.md) | Reload lỗi và recovery độc lập đã thử trên plugin dùng một lần, daemon 0.11.1; giới hạn và evidence |
| [release-verification-results.md](release-verification-results.md) | 25 ca kiểm: Node/SQLite/executable và daemon riêng 0.12.0; cleanup và giới hạn end-to-end |
| [paseo-boundary.md](paseo-boundary.md) | Những chức năng dùng lại từ Paseo và phần riêng của harness |
| [architecture.md](architecture.md) | Phạm vi sản phẩm, hai orchestrator, ba vòng closed loop, runtime và lưu trữ |
| [interaction-model.md](interaction-model.md) | Ownership yêu cầu, chat, panel quản trị và phép ánh xạ planes |
| [first-run-ux.md](first-run-ux.md) | Luồng từ khởi tạo đến chat dự án, kiểm chứng và vận hành |
| [onboarding-agent.md](onboarding-agent.md) | Onboarding qua native chat với MCP cấu hình/hướng dẫn; Spawn/Open Session và các contract còn mở |
| [onboarding-contracts.md](onboarding-contracts.md) | Đề xuất MCP intents, readiness theo revision, bàn giao và Session ownership; subset đã spike, chưa là protocol sản phẩm |
| [onboarding-spike-results.md](onboarding-spike-results.md) | Onboarding MCP → config/readiness/handover → user-command Engineering Session thật; reload, idempotency, cleanup và giới hạn |
| [t3-mcp-architecture-sources.md](t3-mcp-architecture-sources.md) | Research source T3 pin theo installed commit; bài học shared commands/context/async cho onboarding MCP, phạm vi còn chờ chốt |
| [configuration.md](configuration.md) | Bốn nhóm settings, catalog đội riêng, authority và vòng đời revision |
| [prototype-spec.md](prototype-spec.md) | Định nghĩa trước khi dựng: Các surface harness và điểm bàn giao Paseo, state, flow và ma trận kiểm prototype |
| [prototype.html](prototype.html) | Prototype sản phẩm có điều hướng và state cục bộ cho mới cài, bootstrap và vận hành |
| [v1-prototype-gaps.md](v1-prototype-gaps.md) | Audit ban đầu và cập nhật coverage HTML v6 cho năm nhóm V1 |
| [prototype-checks.md](prototype-checks.md) | Kết quả kiểm UI, coverage và giới hạn của prototype |
| [modules.md](modules.md) | Năm deep modules, interface, invariant, seam và adapter |
| [verification.md](verification.md) | Điều kiện nghiệm thu, ca kiểm hợp đồng và các spike còn phải làm |
| [Claude Managed Agents](claude-managed-agents-sources.md) · [Đối chiếu HTML](managed-agents-comparison.html) | Research nguồn chính thức; key points/config/workflow và điểm giống/khác với thiết kế Agent Team, đề xuất chưa chốt |
| [agent-delegation.md](agent-delegation.md) | Vòng grill Agent Catalog/Delegation Policy; phân biệt quyết định đã chốt và các quyền còn mở |
| [research.md](research.md) | Nguồn đã khảo sát, dữ kiện tham khảo và giới hạn của bằng chứng |
| [index.html](index.html) | Tổng quan tài liệu thiết kế, catalog module/config và ví dụ tương tác |

Thuật ngữ tại [GLOSSARY.md](../../GLOSSARY.md). Project Harness là toàn hệ thống; hai orchestrator là các thành phần điều phối, mỗi thành phần có Orchestrator Agent. Workflow Runtime thực thi workflow; Job xác định công việc, Schedule xác định khi kích hoạt; Improvement Loop khác với Agent Loop. CLI/MCP Server là interface bổ sung khi cần, không phải tên gọi khác của hệ thống. Lý do các quyết định kiến trúc tại [docs/adr](../adr/); ADR có thể giữ lịch sử và trạng thái thay thế, còn bộ tài liệu này chỉ mô tả thiết kế hiện hành.

## Cách hiểu trạng thái

Các nguyên tắc sản phẩm và mô hình tương tác đã được thống nhất. Tên module, TypeScript sketches, cấu trúc thư mục và protocol là thiết kế kỹ thuật để triển khai/kiểm chứng; chúng không phải SDK Paseo hoặc code đang chạy. Nguồn tham khảo mô tả hệ thống của nguồn đó, không chứng minh Project Harness này có cùng bảo đảm.

HTML minh họa cách sử dụng và quan sát; không kết nối daemon hoặc tạo agent, schedule, worktree hay thay đổi cấu hình thật. Mọi giới hạn/lịch xuất hiện trong ví dụ đều là dữ liệu minh họa.

Mở [prototype.html](prototype.html) để đi trọn luồng sản phẩm. Thanh kịch bản riêng cho phép nạp Mới cài, Khám phá, Vận hành, Offline, Chạm giới hạn và Update lỗi. Prototype lưu fixture/nháp trong localStorage nếu được phép; Reset dữ liệu để bắt đầu lại. Kết quả kiểm UI tại [prototype-checks.md](prototype-checks.md), tách khỏi nghiệm thu runtime.

Luồng mới cài vào chat harness ngay trên context Paseo; không có wizard thiết lập host/provider hoặc CRUD agent/lịch agent riêng. Code jobs như sync Backlog/poll PR do harness lập lịch bằng code. Xem [ranh giới](paseo-boundary.md).

Prototype v6 đã bổ sung Analytics/saved views/compare, lịch tổng quát, source binding Backlog/GitLab, cây Workflow Run và Plugin releases/recovery. Có kịch bản tương tác cho các nhóm V1; dữ liệu, lịch và cập nhật vẫn là fixture. Prototype giữ Đội năng lực và bộ settings bốn nhóm. Catalog/skill/principle được cải tiến qua candidate; work giữ bundle đã pin. Quyền/giới hạn vẫn do settings của người vận hành kiểm soát.

Agents hiện hỗ trợ tạo/sửa trực tiếp agent definitions: ordered native profile fallback, skills từ catalog đã nạp, principles auto/fixed/hybrid và role bindings. Phải tạo native Paseo profile trước; harness chọn refs chính/fallback, không lặp provider/model/thinking/mode. HTML chỉ có native profile catalog fixture; nạp SKILL.md là metadata client, chưa install/execute skill trên host.

Đánh giá khả thi với public API và source Paseo: [paseo-feasibility.md](paseo-feasibility.md). Phân biệt chức năng native, phần harness phải xây và các contract cần spike; bằng chứng live hiện giới hạn ở spike trên daemon 0.11.1 bên dưới.

Kết quả kiểm trên daemon local 0.11.1: [paseo-spike-results.md](paseo-spike-results.md), kèm [code spike](../../spikes/paseo-contract/README.md). Đã kiểm SDK, worker Codex đọc skill thật, output validation và reload khi worker đang chạy; chưa kiểm skill isolation.

Nguồn 68 skills và phân biệt catalog/prompt/content: [skill-origins.md](skill-origins.md).

Khảo sát English terminology trước vòng phỏng vấn glossary: [industry-terms-map.md](industry-terms-map.md), kèm [nguồn về orchestration](industry-terms-orchestration-sources.md). Vòng phỏng vấn thuật ngữ đã hoàn tất; GLOSSARY.md là nguồn nghĩa được chốt cho dự án, còn các trang nghiên cứu giữ cách dùng của nguồn tham khảo.

Prototype **v7** đồng bộ policy release nhỏ: Fast/Deep path, checkpoint theo phạm vi, backup có điều kiện, fix-forward, recovery độc lập và hoàn tất khi kiểm bắt buộc đạt. [Release policy](release-policy.md) là nguồn quyết định; HTML vẫn mô phỏng, không chạy các spike trên host khi bấm nút. Suite UI v7 đạt 57 assertions ở 375/728 px; các kết quả v6 được giữ như lịch sử.

First-run flow đã điều chỉnh theo menu quản lý vòng đời agent: Onboarding Agent → người dùng spawn Harness Engineering Orchestrator để dựng → người dùng spawn Project Orchestrator. Không giữ Project Chat/Harness Chat thành menu bắt buộc. [first-run-ux.md](first-run-ux.md) là luồng hiện hành; HTML v9 đã mô phỏng bước onboarding/launch và tách các identity/quan hệ; native integration của menu vẫn chưa triển khai.

Prototype hiện hành **v9**: [model notes](prototype-model-notes.md), [model source](prototype-model.js) và [engineering glossary](../engineering/GLOSSARY.md). Work Items/Runs và Assignments/Sessions có identity riêng; release target/active/recovery có refs riêng. Bằng chứng UI/Node nằm tại [prototype-checks.md](prototype-checks.md); không suy thành workflow runtime production.

Trạng thái từ vựng: **chưa đủ glossary để coi thiết kế ngôn ngữ đã hoàn tất**. [Coverage audit](glossary-coverage.md) ghi các khoảng trống domain/UI/engineering và English canonical names còn thiếu; nhãn UI đã duyệt và model fixture v9 không thay thế phần này.

Đề xuất cách hoàn thiện glossary theo mô hình thay vì danh sách từ: [glossary-concept-model.md](glossary-concept-model.md) — ontology engineering, graph quan hệ và 30 competency questions ban đầu truy vết V1. Chưa phải tuyên bố glossary đã đầy đủ hoặc xác nhận thêm domain terms.

Bản thiết kế concept model V1 để review: [register JSON](v1-concept-register.json) → [graph/register browser](v1-concept-graph.html), [51-CQ trace/answer ledger](v1-competency-ledger.md), [completion plan và conflicts](v1-glossary-completion-plan.md), [validation](v1-concept-validation.md). Đây là draft theo phương pháp ontology/CQ đã được chấp nhận cho lượt làm việc này; không thay nghĩa glossary đã duyệt hoặc chứng nhận runtime V1.

D02–D05 đã chốt policy ngữ nghĩa qua các vòng review trong completion plan. D01 còn chờ review bộ tên/định nghĩa/owners: [bản English đầy đủ](v1-vocabulary-review.md), [HTML tìm/lọc](v1-vocabulary-review.html), [manifest](v1-vocabulary-review.json) và [source audit](v1-vocabulary-audit-r2.md), phủ đủ 96 pending concept IDs. Giữ nguyên glossary đã duyệt và nhãn UI trong lúc draft này chưa được chấp nhận.
