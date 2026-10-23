# Agent Team và Claude Managed Agents — nguồn đối chiếu

Kiểm tra: **2026-10-22**. Chỉ dùng tài liệu chính thức Anthropic; đây là nghiên cứu, không phải kết quả chạy API.

## 1. Đúng sản phẩm

**Claude Managed Agents** là hosted, configurable agent harness trên Claude Platform: Anthropic vận hành agent loop, tool execution infrastructure và session state. Hiện là beta, dùng header `managed-agents-2026-04-01`; MCP tunnels và dreaming có research-preview access riêng. Không được hiểu thành tên mới của Claude Code. [Overview](https://platform.claude.com/docs/en/managed-agents/overview).

Ba sản phẩm cần tách:

- **Claude Code subagents**: worker chuyên biệt trong Claude Code, có context, system prompt, tools và permissions riêng. [Subagents](https://code.claude.com/docs/en/sub-agents).
- **Claude Code agent teams**: nhiều Claude Code instances, team lead, shared tasks và messaging trực tiếp; experimental, mặc định tắt. [Agent teams](https://code.claude.com/docs/en/agent-teams).
- **Claude Agent SDK**: thư viện Python/TypeScript nhúng Claude Code trong process do bên tích hợp vận hành; khác Managed Agents do Anthropic host. Không chuyển các SDK hooks sang Managed Agents bằng suy đoán. [SDK overview](https://code.claude.com/docs/en/agent-sdk/overview).

## 2. Facts đã xác minh

### Data model và config

**Agent** là cấu hình tái sử dụng: model, system, tools, MCP servers, skills; **Environment** mô tả nơi thực thi; **Session** là instance thực hiện công việc; **Events** là giao tiếp và lịch sử. Task trong mô tả không mặc nhiên là một persistent Task entity độc lập. [Core concepts](https://platform.claude.com/docs/en/managed-agents/overview).

Agent có version; update dùng `version` cho optimistic concurrency, mismatch trả 409. `ant apply` đồng bộ file khai báo và lưu identity vào `claude-lock.json`. Session có thể pin agent version hoặc dùng creation-time overrides. Sau khi tạo, chỉ `tools` và `mcp_servers` đổi được giữa session; model/system/skills không đổi như vậy. [Agent setup](https://platform.claude.com/docs/en/managed-agents/agent-setup), [Sessions](https://platform.claude.com/docs/en/managed-agents/sessions), [Session operations](https://platform.claude.com/docs/en/managed-agents/session-operations).

### Hierarchy và orchestration

Managed Agents có ba cơ chế: **subagents**, **dynamic workflows**, **advisor**. Subagents báo về primary agent, delegation sâu một cấp, tối đa 25 child threads cùng tồn tại kể cả idle. Predefined agents có config riêng; inline agents được tạo lúc giao việc. `multiagent_20261001` mặc định bật subagents/workflows và inline agents; có thể giới hạn bằng predefined lists. [Multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration).

Dynamic workflow là chương trình Claude viết, server chạy nền: fan-out, truyền kết quả, chọn nhánh và lặp. Các agents dùng chung session sandbox files. Run không lồng run; mặc định tối đa 10 open runs/session, lifetime 24 giờ; mức 64 threads hoạt động/run được ghi rõ không phải API guarantee. Code workflow và result trả về chương trình không tự hiện đầy đủ trong API quan sát. [Workflow runs](https://platform.claude.com/docs/en/managed-agents/workflow-runs).

### Tools, Skills, MCP và quyền

Skills gắn qua `skills` với version cụ thể hoặc `latest`; cũng có discovery `.claude/skills` từ mounted GitHub repository. Đây là hướng dẫn/resources, không tự tạo security boundary. [Skills](https://platform.claude.com/docs/en/managed-agents/skills).

MCP tách declaration khỏi authentication: Agent giữ server name/URL và matching `mcp_toolset`; Session tham chiếu vault credentials. Secrets không phải nội dung reusable definition. [MCP connector](https://platform.claude.com/docs/en/managed-agents/mcp-connector).

Permission policies là `always_allow`, `always_ask`, `auto`; agent toolset mặc định allow, MCP toolsets mặc định ask. Policy này điều khiển server-executed tools; **custom tools do ứng dụng thực thi và tự kiểm quyền**. [Permission policies](https://platform.claude.com/docs/en/managed-agents/permission-policies).

Cloud Environment là config dùng chung nhưng mỗi Session có sandbox container riêng. Context tách riêng giữa agents không đồng nghĩa filesystem tách riêng. Self-hosted sandbox chỉ chuyển tool execution/files/network sang hạ tầng của bạn; Anthropic vẫn chạy agent và nhận tool inputs/results. [Cloud environments](https://platform.claude.com/docs/en/managed-agents/environments), [Self-hosted sandboxes](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes).

### Durability, lifecycle và human input

Session history/state lưu server-side. Thiết kế kỹ thuật tách durable session log, harness và sandbox để harness có thể khởi động lại từ log; các tên interface trong bài kiến trúc không tự là public API. [Engineering explanation](https://www.anthropic.com/research/managed-agents).

Reconnect: mở stream trước → list history → tail stream, bỏ event IDs đã thấy. Khi tool cần trả lời, `requires_action` cùng `event_ids` nhận diện blockers; ứng dụng trả `user.custom_tool_result` hoặc `user.tool_confirmation`. [Event stream](https://platform.claude.com/docs/en/managed-agents/events-and-streaming).

Session `idle` có thể vẫn còn open workflow run; `terminated` cũng không phải nhãn thành công. `user.interrupt` không kết thúc workflow run. Primary stream là condensed view; đọc thread stream để điều tra worker. [Session operations](https://platform.claude.com/docs/en/managed-agents/session-operations), [Session threads](https://platform.claude.com/docs/en/managed-agents/session-threads).

Lifecycle integration có SSE và webhooks. Webhook trả type/ID để fetch resource; có duplicate, không bảo đảm thứ tự, retry hữu hạn rồi có thể mất. Vì vậy callback không thay durable reconciliation. Không thấy căn cứ coi Claude Code `PreToolUse`/`PostToolUse` hooks là Managed Agents API. [Webhooks](https://platform.claude.com/docs/en/managed-agents/webhooks).

### Scheduling, limits và evaluation

Scheduled deployment tạo sessions theo cron/timezone, độ phân giải phút; deployment-run record giữ cả lỗi tạo session. Pause không dừng session đã chạy; unpause không backfill missed triggers. Chưa thấy policy overlap/queue-one được cam kết trong trang này. [Scheduled deployments](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments).

Budget dùng public list cost, chặn model requests mới khi đạt trần; requests đang chạy vẫn hoàn tất nên có overshoot. Endpoint limits hiện là create 300 và read 1.200 requests/phút/organization, cộng giới hạn model/spend. Không dùng các số này làm default Paseo. [Budgets](https://platform.claude.com/docs/en/managed-agents/budgets), [Reference](https://platform.claude.com/docs/en/managed-agents/reference).

**Outcomes** dùng rubric và grader context riêng để feedback/iterate. Console có timeline theo thread, transcript/tool results, JSON events, usage/cost. Đây là quan sát và đánh giá artifact; chưa chứng minh controlled A/B evaluation hoặc an toàn self-update plugin. [Define outcomes](https://platform.claude.com/docs/en/managed-agents/define-outcomes), [Observability](https://platform.claude.com/docs/en/managed-agents/session-observability).

**Dreams** đọc memory store và 1–100 session transcripts để tạo store mới, giữ nguyên input; output cần review trước khi dùng. Đây là memory curation, không phải cơ chế release code/schema/UI của harness. [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams).

## 3. Đối chiếu với thiết kế của ta — diễn giải

Đã đọc [proposal](autonomous-team-proposal.md), [configuration](configuration.md), [modules](modules.md), [80/20](scope-80-20.md), [UI interview](../ui/ui-naming-interview.md), [Common Language](../../GLOSSARY.md).

Giống nhau: reusable definition tách runtime instance, specialist delegation, chương trình điều phối, durable state, human input và feedback. Agent Team của ta vẫn là **tên UI đề xuất**, mô tả catalog năng lực, không phải Claude Code team hay danh sách sessions đang chạy.

Khác nhau: ta là một Paseo plugin cho một dự án, hai orchestrators có ownership riêng; native profiles sở hữu provider/model/options. Harness Agent Definitions bổ sung role/procedure/Skills/Principles và ordered profile fallback. Managed Agent gom model vào config riêng; không thấy tương đương trực tiếp cho principle policy hay fallback đa provider. Không nên dựng thêm native-profile editor.

Ta cần năm pattern composable, code kiểm admission/durability/results, schedules và code polling; Managed workflows động không tự thay hợp đồng đó. Ta giữ inherited skill catalog, không provider fork/skill isolation. Daily retro cải tiến cả plugin, release nhỏ Fast/Deep path, fix-forward/recovery vượt phạm vi Dreams.

## 4. Ưu tiên áp dụng theo 80/20 — khuyến nghị

Xếp hạng theo giá trị sớm; trạng thái là so với thiết kế, chưa phải implementation pass:

1. **Đã có:** pin effective bundle/revisions cho mỗi Run; giữ expected revision khi sửa. Lấy versioning làm bằng chứng tái hiện, không tạo config engine tổng quát. Nguồn: Agent setup/Sessions.
2. **Cần bổ sung contract test:** reconnect stream-before-history, dedupe và restore blockers; kiểm crash/replay thay vì chỉ happy path. Nguồn: Event stream.
3. **Đã có, cần kiểm:** tách turn/session status khỏi verdict; UI chỉ báo đạt khi Criteria có evidence, kể cả workflow đã `completed`. Nguồn: Session operations/Workflow runs.
4. **Cần cụ thể hóa adapter:** matrix tools × execution owner × permission enforcement; secret references tách khỏi definition/export. Custom tool phải kiểm tại host. Nguồn: MCP connector/Permission policies.
5. **Đã có:** trigger receipt và reconciliation; thêm acceptance case webhook đảo thứ tự/mất và deployment không tạo được session. Giữ code polling rỗng không gọi model. Nguồn: Webhooks/Scheduled deployments.
6. **Đã có:** rubric rõ, reviewer context riêng, freeze dataset/candidate/grader revisions; small release chỉ kiểm theo ảnh hưởng và mức tối thiểu. Không coi self-score là chứng minh cải tiến. Nguồn: Outcomes/Observability.
7. **Chưa đáng áp dụng V1:** cloud control plane, dynamic workflow API và Dreams như dependency mới. Mượn ý tưởng output candidate độc lập, giữ native Paseo và Releases hiện có. Nguồn: Self-hosted sandboxes/Dreams.

## 5. Ví dụ workflow và config

Ví dụ harness đề xuất: GitLab polling thấy comment mới → dedupe/Work receipt → Project Orchestrator route Investigate → pin definition/profile/skill sources → worker tái hiện → Implement → Verify độc lập → Criteria kết luận. Nếu lỗi thuộc harness, gửi work liên kết sang Harness Engineering Orchestrator. Release nhỏ kiểm regression/smoke theo ảnh hưởng; tool effect mất phản hồi phải reconcile trước fallback. Đây là **harness pseudocode bằng lời**, không phải Managed Agents/Paseo API.

Ví dụ dưới có cú pháp Python được docs xác nhận, chỉ minh họa pin config; không được thực thi trong nghiên cứu:

```python
pinned_session = client.beta.sessions.create(
    agent={"type": "agent", "id": agent.id, "version": 1},
    environment_id=environment.id,
)
```

`client`, `agent`, `environment` đã được tạo trước; lời gọi chưa gửi nhiệm vụ. Nguồn sở hữu: [Start a session — pin version](https://platform.claude.com/docs/en/managed-agents/sessions).

## 6. Ambiguities và giới hạn

Đây là snapshot docs beta, không xác minh entitlement, SDK compatibility hay SLA thực tế. Chưa kiểm live API, native Paseo contracts, scheduling overlap, cross-provider fallback hoặc migration/recovery. Không tìm thấy bằng chứng Managed Agents cung cấp mô hình hai orchestrators, Principle selection, toàn bộ năm pattern dưới interface như ta, hay self-release toàn plugin; đây là khoảng trống đối chiếu, không phải kết luận sản phẩm không thể làm. Các URL trong từng đoạn là nguồn chính xác; không dùng mirror, bài cộng đồng hoặc marketing claim để suy thêm capability.

## 7. Đối chiếu bổ sung sau khi đọc nguồn — đề xuất chưa chốt

Parent đã mở lại Overview, Agent setup, Multiagent orchestration, Workflow runs và các trang permission/events/outcomes. Phần dưới bổ sung các điểm có giá trị cho Agent Team; không thay đổi glossary hoặc requirements.

**Delegation policy là tài sản riêng với catalog.** Catalog nói có những specialists nào; policy nói orchestrator nào được gọi những specialists nào, bằng cách nào. Managed Agents có hai lists độc lập cho subagents và workflows, cùng switch inline agents; inline mặc định bật. Khi tắt inline, list tương ứng cần có ít nhất một agent. References được pin khi create/update cấu hình; session hiện tại giữ setting cũ. [Predefined and inline agents](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#predefined-and-inline-agents).

Áp dụng đề xuất: giữ Team Catalog, thêm policy nhỏ theo từng orchestrator để xác định allowed Agent Definitions và cách dùng delegate/workflow/consult. Mặc định ưu tiên definition đã đăng ký; thiếu specialist thì tạo candidate qua Harness Engineering Orchestrator. Không cần mặc định thêm một form tools/model nữa hoặc cấm mọi thay đổi động; temporary definition nếu được cho phép vẫn phải qua validation, authority, budgets và pin trước dispatch. Đây là thiết kế local, không phải config/API Paseo đã có.

**Worker và advisor giải quyết hai nhu cầu.** Worker nhận phần việc và bàn giao kết quả; advisor góp ý để primary tiếp tục thực hiện. Managed advisor là cơ chế riêng, không phải subagent; advice có thể bị redacted tùy model/policy, nên không mặc định client đọc được nó. [Advisor](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#give-the-session-an-advisor). Áp dụng local có thể là consultation với worker giới hạn quyền, nhưng đó không phải bảo đảm API advisor native của Paseo. Không bật thêm một advisor đắt cho mọi task nhỏ.

**Dynamic workflow là program, không chỉ prompt điều phối.** Nó có thể fan-out, truyền kết quả và tự xử lý nhánh/vòng lặp; primary vẫn có thể trao đổi với người dùng trong lúc program chạy. Managed Agents không có approval gate bắt buộc trước khi bắt đầu mỗi run. [Workflow runs](https://platform.claude.com/docs/en/managed-agents/workflow-runs). Với harness của ta, giữ agent soạn/chọn workflow → validate và pin → runtime execute theo authority đã cấp. Không copy cơ chế thực thi code sinh động thành mặc định bỏ validation. Giới hạn “run không lồng run” của Managed Agents không đồng nghĩa program không ghép được patterns; lồng composition và lồng runtime Run là hai vấn đề khác nhau.

**Config 80/20.** Các cấu hình đã có vẫn giữ: native profile refs/fallback, Skill refs, principle policy, role/procedure/result contract. Phần đáng xem xét thêm chỉ là allowed specialists, delegation modes và inline-definition policy; version locking/effective config, secret resolution và event recovery nên do implementation xử lý. Environment/tool requirements gắn role contract, kiểm adapter đáp ứng, không giả định cho người dùng thêm checkbox là có enforce. Không cần copy default model, giới hạn thread hay permission defaults của Anthropic.

**Ví dụ đề xuất:** Project Orchestrator nhận issue → chọn Investigate trong catalog được phép → giữ context/output contract riêng → runtime phối hợp Implement và Verify khi hợp lý → rubric/Evidence tạo Verdict → bàn giao. Vấn đề thuộc năng lực harness tạo Work Item liên kết sang Harness Engineering Orchestrator; chỉnh Agent Definition/Skill/workflow thành candidate, kiểm theo release policy, áp cho Run mới. Không tạo lại cả đội cho một sửa đổi nhỏ; fan-out chỉ khi phần việc đủ độc lập và có lợi ích.

Kết luận đối chiếu: catalog đội agent của ta gần với agent definitions cộng delegation policy của Managed Agents hơn là toàn bộ hosted product. Chưa dùng tên “Managed Agents” để đổi tên UI của ta: chữ managed trong nguồn này bao hàm hạ tầng Anthropic vận hành. Hai orchestrators, native Paseo profiles đa provider, principle policy và tự phát hành code/UI/schema vẫn là phạm vi riêng của thiết kế này.
