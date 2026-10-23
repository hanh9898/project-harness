# Kiến trúc Project Harness

Thiết kế hiện hành • 2026-10-23 • Có spike thực thi cô lập; chưa có Project Harness hoàn chỉnh. [Mục lục](README.md).

## 1. Mục tiêu và phạm vi

Repo base tạo một Project Harness cho một dự án đích, có thể gồm nhiều repo. Một bản riêng vận hành và tự cải tiến; phần dùng chung có đường đóng góp upstream bằng code, test, evidence và fixture không mang dữ liệu riêng. Dùng bản sửa local không chờ upstream; hosting/license/upstream cụ thể là cấu hình chưa chọn.

Hai orchestrator có inbox, context và vòng đời riêng, có thể hoạt động đồng thời:

- **Harness Engineering Orchestrator:** thành phần điều phối xây dựng và cải tiến Project Harness, bao gồm việc dựng Project Orchestrator. Orchestrator Agent bên trong sử dụng pstack và mattpocock Skills có version; cơ chế quản lý công việc giữ inbox, trạng thái và khả năng tiếp tục qua nhiều Agent Sessions.
- **Project Orchestrator:** thành phần điều phối công việc dự án, được Harness Engineering dựng sau Onboarding và được người dùng chủ động khởi chạy. Trạng thái Initial Project Orchestrator tiếp nhận yêu cầu và tiếp tục phát triển năng lực; không phải agent đã tồn tại trước Onboarding. Orchestrator Agent bên trong chọn/ghép workflow và giao việc trong năng lực được cấp; cơ chế thực thi quản lý công việc và kiểm kết quả.

Project Harness là toàn bộ hệ thống cho dự án, được triển khai bằng một Paseo Plugin. Hai orchestrator là thành phần bên trong hệ thống; mỗi Orchestrator Agent chỉ đảm nhiệm phần suy luận và ra quyết định. Workflow Runtime thực thi các quyết định đó theo cấu trúc, quyền, trạng thái và giới hạn đã định; thay Agent Session không xóa trạng thái công việc.

Không có Harness Engineering Orchestrator chung phục vụ đồng thời nhiều dự án. HBU là nguồn concept/công cụ được tiếp nhận có chọn lọc; hệ HBU đang vận hành không bị sửa hoặc migrate trong thiết kế này.

Chi tiết phân công native/harness tại [paseo-boundary.md](paseo-boundary.md): dùng chat/session, provider catalog, workspace, scripts và lịch agent của Paseo. Agent definitions quản lý trực tiếp trong harness, ghép native profile refs chính/fallback với skills/principles. Tạo/sửa native profile thuộc Paseo.

## 2. Trách nhiệm và interface người dùng

Chat là interface chính. Yêu cầu sản phẩm/công việc trao đổi trực tiếp với Project Orchestrator; yêu cầu phát triển harness trao đổi với Harness Engineering Orchestrator. Panel Paseo phục vụ config, inbox harness và monitor hoạt động, với liên kết tới agent/chat/evidence. Không bắt mọi yêu cầu đi qua router/chat chung hoặc form nghiệp vụ.

Ownership, phạm vi hiệu lực và channel là các trục riêng. Quy tắc nghiệp vụ lâu dài vẫn thuộc dự án. Harness có thể cải tiến phương pháp thực hiện nhưng không tự thay mục tiêu/yêu cầu nghiệp vụ. Nguồn mâu thuẫn hoặc tiêu chí chưa đánh giá được cần quyết định của người dùng; phần độc lập tiếp tục.

Chi tiết tại [interaction-model.md](interaction-model.md), hành trình tại [first-run-ux.md](first-run-ux.md).

Settings chỉ còn Agents/Limits/Actions/Automations theo [configuration.md](configuration.md). Catalog đội có version mô tả role/when-to-use/procedure/result và tham chiếu agent definition; definition tham chiếu các native profile chính/fallback và quản lý bindings Skills/Principles trong harness; provider/model/thinking/options vẫn thuộc Paseo, worker chọn principles theo policy task và giữ bundle/revision trong work. Harness cải tiến definitions qua candidate nhưng không nới authority/settings. MAPE-K dùng chung kho tri thức này, không sinh thêm orchestrator; chi tiết tại [autonomous-team-proposal.md](autonomous-team-proposal.md).

## 3. Host và các module

Bản đầu dùng TypeScript và plugin Paseo dày. Client cung cấp panel; server subprocess host runtime, keeper, reconcile, daily và các interface nghiệp vụ. Runtime tách module trong code để có thể chuyển process khi có nhu cầu; không yêu cầu một runtime service độc lập trong v1.

| Module | Trách nhiệm |
| --- | --- |
| AgentDefinitions | Agent Catalog, definition revisions, role/Skill/Principle bindings và cấu hình hợp lệ cho dispatch |
| Triggers | Trigger revisions, occurrence, missed/overlap policy, delivery vào Work |
| Work | Hai inbox, admission, execution, timers, checkpoint, supervisor và reconcile |
| WorkflowPrograms | Viết/kiểm tổ hợp năm pattern và các program của harness |
| Criteria | Scope/revision tiêu chí, evidence, baseline và verdict |
| Releases | Candidate, activation, kiểm trước/sau activation, quan sát và recovery độc lập |
| Analytics | Queries/aggregations và Saved Views từ Work/Criteria/Releases, giữ provenance và dữ liệu thiếu |

[A01: P2813 → P2815](history/architecture-a01-2026-10-23/acceptance-a01.json) chốt hai module AgentDefinitions và Analytics. AgentDefinitions cung cấp definitions/bindings hợp lệ; Work giữ admission, Assignment và dispatch; Paseo giữ native profiles/provider/model. Analytics không thay quyền kết luận của Criteria hoặc quyền ghi của module nguồn. Bảy module là bản đồ trách nhiệm hiện hành; method/schema trong các sketches vẫn cần thiết kế và kiểm chứng. Ownership của Actions/Limits và Delegation Policy được hỏi riêng tại [A02](architecture-grill.md#vòng-a02--frontier-tiếp-theo), không tự chuyển hết sang AgentDefinitions.

Chat/CLI/RPC/MCP và panel gọi cùng interface sở hữu nghiệp vụ; permission/principal được bind tại adapter. MCP Server là yêu cầu V1 cho Onboarding Agent thiết lập cấu hình và hướng dẫn sử dụng plugin qua chat; quy tắc tại [onboarding-agent.md](onboarding-agent.md), contracts và thứ tự triển khai tại [onboarding-implementation.md](onboarding-implementation.md); chưa là runtime production. Recovery executable phải hoạt động khi plugin mới không khởi động. Thiết kế interface tại [modules.md](modules.md).

## 4. Ba vòng closed loop

**Thực thi:** nhận việc → chọn/ghép workflow → hành động → kiểm outcome → tiếp tục hoặc bàn giao. Agent ra quyết định tại các điểm được phép; code giữ cấu trúc, quyền, trạng thái và giới hạn.

**Vận hành:** quan sát agent/runtime → đối soát → nhận lại worker/binding còn tồn tại → tiếp tục. Tạo/thay Session orchestrator đi qua Spawn/Replace do người dùng chủ động, có Handover và chuyển authority theo [onboarding-implementation.md](onboarding-implementation.md#9-replace-session-và-authority). Trạng thái permission, paused, blocked và budget không bị coi nhầm là agent chết. Supervisor dùng code; không cần gọi LLM cho mỗi kiểm tra timer/sức khỏe.

**Improvement Loop:** outcomes/traces/feedback → hypothesis → candidate → eval/regression so với baseline → activation → monitoring → giữ/lùi/chưa đủ kết luận. Daily retro là một Job phục vụ vòng này; không bắt buộc tạo thay đổi khi thiếu bằng chứng. Chất lượng/yêu cầu là điều kiện bắt buộc; thời gian, chi phí và can thiệp là mục tiêu tối ưu.

Agent Loop là vòng model → Tools → kết quả → tiếp tục hoặc dừng trong một Agent Turn. Nó khác với ba vòng ở trên. Agent Session có thể chứa nhiều Turns; một Workflow Run có thể phối hợp nhiều Sessions. Kết thúc Turn không đồng nghĩa Run đạt tiêu chí.

Harness tự áp dụng cải tiến sau kiểm chứng trong quyền/giới hạn đã cấp. Run giữ definition/criteria revision; chỉ chuyển tại checkpoint có kiểm tra tương thích và lịch sử. Local improvement và contribution upstream là công việc riêng. Closed loop có thể chờ sự kiện và thay session; không đòi LLM chạy liên tục hoặc cùng một conversation mãi.

## 5. Workflow và kết quả

| Pattern | Hợp đồng |
| --- | --- |
| Prompt chaining | Đầu ra đã kiểm của bước trước khớp đầu vào bước sau |
| Routing | Quyết định chọn trong các nhánh hợp lệ |
| Parallelization | Có admission, join và cách xử lý nhánh lỗi |
| Orchestrator-workers | Chia việc động trong template, capability và giới hạn đã pin |
| Evaluator-optimizer | Có tiêu chí, feedback, trần vòng lặp và điều kiện dừng |

Pattern ghép tuần tự, song song, lồng nhau. Biểu diễn phải hỗ trợ loop và số worker động, không ép DAG thuần. Definition/code step được version hóa và kiểm trước thực thi. Chọn framework/interpreter sau spike theo hợp đồng này.

Agent kết thúc turn, workflow dừng và kết quả đạt tiêu chí là các dữ kiện riêng. Kết quả có cấu trúc gồm outcome, artifacts, evidence và vấn đề còn lại; không lấy marker hoặc lời agent tự báo làm bằng chứng thành công. Retry lỗi kỹ thuật và vòng sửa chất lượng có giới hạn riêng; hết giới hạn giữ evidence và gửi vấn đề sang harness hoặc người quyết định.

## 6. Trigger và timer

Job xác định công việc cần thực hiện; Schedule xác định thời điểm kích hoạt Job. Triggers phân biệt nguồn kích hoạt với executor. Agent schedule/heartbeat dùng Paseo; code jobs định kỳ như pull Backlog hoặc poll PR comments do harness lập lịch và chạy bằng handler có version, không gọi LLM cho mỗi tick. Trigger có thể là cron/interval/event/thủ công; executor có thể là code hoặc agent.

Mỗi job có đúng một nơi sở hữu cadence/enable. Harness không clone lịch agent của Paseo, nhưng cần registry/runner cho code jobs của chính nó. Poll rỗng không tạo/wake agent. Khi có delta, code chuẩn hóa, dedupe và commit cursor/event/outbox, rồi giao inbox theo authority; runtime admission mới quyết định khi nào agent xử lý.

Code jobs cần stable run identity, lease/overlap, timeout/retry/backoff/rate limit và missed policy phù hợp; mặc định sync có thể gom một lượt sau downtime. Native missed/correlation vẫn phải spike, không giả định được bảo đảm như local code job. Scheduler implementation và host startup chưa chốt; plugin tắt thì jobs trong plugin cũng dừng.

Retry/deadline/decision timeout của một work item thuộc Work, gắn node/attempt để timer cũ không tác động attempt mới. Khi runtime/host tắt, timer chỉ tiếp tục sau restart; heartbeat không thay được host startup/recovery.

## 7. Tiêu chí, nguồn và context

Tiêu chí kết quả dự án do Project Orchestrator làm rõ trong chat; tiêu chí vận hành harness do Harness Engineering Orchestrator chủ trì, có UI config thích hợp. Phân biệt mandatory với optimization và scope project/workflow/task. Thêm/sửa/bật tắt tạo revision; kết quả cũ giữ tiêu chí đã dùng. Thiếu phép kiểm hoặc yêu cầu mâu thuẫn tạo câu hỏi có evidence, đề xuất và phần việc bị ảnh hưởng.

Context package theo role/bước giữ nguồn và revision, nhiệm vụ, decisions, input artifacts và criteria. Tiến độ và quyết định phải được lưu để session sau tiếp tục. Eval evidence nhận diện dataset/trial/environment, model/skill/tool/program và grader revisions; so sánh thiếu căn cứ có thể inconclusive.

## 8. Lưu trữ và recovery

- **Git:** mã, workflow, skills, role/tool definitions, evaluator/schema/templates và các bản xuất có chủ đích.
- **SQLite:** work/inbox, journal, checkpoint, decisions, criteria/config revisions, trigger occurrence/outbox và durable timers.
- **Artifact files:** dữ liệu lớn, báo cáo, log, context snapshot; DB giữ reference/digest.

SQLite là nguồn active revisions cho mutable runtime config/criteria dù thay qua chat hay panel. Mẫu/export trong Git không tự active. Driver và schema chi tiết còn cần thiết kế/kiểm chứng.

Ghi intent/correlation trước effect. Local transaction không bao gồm Paseo/Git/dịch vụ ngoài; mất phản hồi phải reconcile trước retry, không hứa exactly-once side effect. Paseo events chỉ đánh thức; startup/reconnect/refetch đối soát lại trạng thái đã lưu.

Reload dừng runtime trong plugin subprocess. Supervisor nội bộ không tự hồi sinh host đã chết; bootstrap phải có đường khởi động lại và executable recovery độc lập. Rollback code không tự rollback DB; migration cần khả năng tương thích hoặc backup/restore đã chứng minh. Recovery writer và runtime writer cần ownership/fencing.

## 9. Quyền và tài nguyên

Mỗi role chọn agent definition tham chiếu native profiles, skills và quyền; khám phá capability rồi lưu cấu hình đã dùng. Thiếu capability bắt buộc thì chặn phần phụ thuộc, không âm thầm chạy quyền rộng. Skills, MCP catalog hoặc prompt không thay cưỡng chế native tools/shell/provider.

Worker ghi dùng worktree riêng, có phạm vi file/đầu ra; worker đọc có thể chia sẻ nguồn cố định. Orchestrator chịu trách nhiệm tích hợp. Người dùng cấu hình giới hạn worker/thời gian/ngân sách hoặc quota khi đo được; chưa đo thì báo unknown. Chạm trần thì chờ/tạm dừng, không tự nâng.

## 10. Kiểm chứng và quyết định kỹ thuật còn mở

[verification.md](verification.md) sở hữu acceptance và spike. [research.md](research.md) giữ nguồn tham khảo, tách dữ kiện khỏi suy luận.

Chưa chọn installer/packaging cụ thể, SDK/provider pin, framework/interpreter, SQLite driver/schema, chat-to-work binding, native scheduler bridge, host supervisor và protocol migration/recovery. Lựa chọn phải đáp ứng hợp đồng đã chốt; phát hiện bất khả thi phải trở lại quyết định liên quan thay vì âm thầm hạ yêu cầu.

Policy release hiện hành tại [release-policy.md](release-policy.md): không mặc định dừng mọi Run, backup mọi patch hoặc tự rollback mọi lỗi. [Bằng chứng kiểm](release-verification-results.md) phân biệt daemon 0.11.1/0.12.0 và cơ chế SQLite/executable cục bộ; chưa nghiệm thu end-to-end Project Harness production.
