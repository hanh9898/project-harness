# T3 MCP architecture → đề xuất Onboarding MCP

Nghiên cứu 2026-10-22. **Khuyến nghị:** MCP là adapter mỏng tới owner services; Onboarding Agent dùng nó để cấu hình và dạy cách dùng bằng chat. Phạm vi native configuration **Q1** và điều kiện hoàn tất **Q2 vẫn OPEN**, chưa được người dùng chấp nhận. Không có live mutation/API test; chỉ đọc catalog, capabilities, environment identity, tài liệu và source. Không tạo agent/task/session/secret hoặc đổi cấu hình.

## 1. T3: sự kiện đã kiểm chứng

**Version evidence.** `t3_environment_read` trả `serverVersion=0.1.1`; `/Applications/T3 Code (Beta).app/Contents/Info.plist` cũng ghi `0.1.1`. Member `package.json` trong `/Applications/T3 Code (Beta).app/Contents/Resources/app.asar` ghi `t3codeCommitHash=fe27e8e3dc12`; GitHub resolve thành [fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92][installed]. Bundle `apps/server/dist/binCli-DF59J6P3.mjs` có regions `McpSessionRegistry` và `ThreadManagementService`. Đây là build evidence, không phải chứng minh binary tương đương toàn bộ source. Public main lúc đọc là [f054d1b8018721bd997d99cbb918a7b17bf098a4][main]. Các source T3 dưới đây pin **installed commit** trừ khi ghi khác.

**Boundary.** HTTP middleware resolve bearer credential, inject invocation context theo request; toolkit đăng ký schema/handler. `t3_project_update` gọi `ProjectService.update`; `t3_thread_configure` dispatch command qua `ThreadManagementService`, không tự ghi config. Luồng delegation đi tiếp xuống `OrchestratorV2`. Như vậy “thin adapter” mô tả transport boundary; application services vẫn chứa orchestration phức tạp. [HTTP:162–183,967][http], [project handler:251][project], [thread handler:182][thread], [dispatch:672][management].

**Principal/context.** Registry tạo token ngẫu nhiên, giữ hash và scope gồm environment/thread/provider instance/provider session; `requestNamespace` là provider session. Token registry nằm trong memory, kiểm liveness và có revoke. Context không tự thành project sandbox: `threadAccess` cho phép target IDs tường minh; task lookup mới kiểm task thuộc parent. Write wrappers còn kiểm live caller/mode/read-only client. [Registry:85–154,174][registry], [target resolution:128][access], [task ownership:1406][service], [write gates:75–96,203][gates].

**Discovery/contracts.** Catalog hiện tại quảng bá cùng live model catalog với composer. Capabilities handler thực sự đọc provider registry, custom/hidden models, option descriptors và adapter availability; response quan sát được có inherited options và constraints cho provider disabled. Tool definitions khai báo `parameters`, `success`, `failure`, `failureMode`; contracts giới hạn prompt/request key và chuẩn hóa compatibility input. Không thể suy security từ tên tool hoặc schema. [Capabilities:1989][service], [definitions:53][tools], [schemas:47–85][contracts].

**Identity/durability.** Delegation dùng command ID từ namespace, operation và `clientRequestId`; thiếu key thì sinh UUID. Orchestrator replay receipt đã có; EventSink commit receipt/events/projection/effect outbox trong transaction rồi publish. Đây là bảo đảm local command path đã đọc, không phải exactly-once external effect. Ngược lại, `t3_thread_configure` tạo command ID mới mỗi lần; không thấy expected revision trong handler này. Không được quy nạp rằng mọi T3 mutation chống stale hoặc retry như nhau. [Stable IDs:660,1401,2064][service], [receipt replay:11448][runtime], [transaction:268,615–674][sink], [configure:188–197][thread].

**Async/dependencies.** `delegate_task` dispatch `delegated_task.request`, trả task/child thread/run identity. Async wake và blocking wait có policy khác nhau; timeout không cancel. `task_status` phân biệt working/waiting_for_children/result_available; đọc terminal result còn acknowledge delivery, nên “query” không luôn side-effect-free. Runtime xử lý terminal updates và recovery projections khi khởi động. Child task ownership khác top-level thread creation; đây không phải API dựng dependency graph tổng quát. [Dispatch:2119–2137, status:1406–1588][service], [recovery:11649–11735][runtime], [tool descriptions:79,180][tools].

**Secrets.** `request_secret` trả status/ref, không trả value cho agent; consumer kiểm project, TTL, xóa ref trước khi trả value trong server. Đó là one-use handoff, chưa chứng minh consumption và downstream save nguyên tử: save lỗi sau consume cần recovery riêng. [Request:1978–1986][service], [consumer:183–220][secrets].

## 2. Evidence và khoảng trống

Public-main docs mô tả shared boundary nhưng không luôn là hợp đồng bản cài. Ví dụ installed `t3_thread_send` description còn mô tả requested follow-up tạo task mới trong child thread; public-main docs nói không có task-level follow-up để giữ reviewer session. Chỉ dẫn của task này yêu cầu mỗi review round dùng delegation mới. Không trộn ba nguồn thành một bảo đảm. [Installed tool:235][tools], [main docs:255][main-doc].

Chưa kiểm toàn bộ provider injection/reconnect/revocation, crash windows, remote authentication hay payload-conflict semantics. Readiness flags không chứng minh thực thi thành công. Catalog descriptions hữu ích cho intent/help discovery; chưa xác minh một T3 help service tổng quát. Version `0.1.1` tự nó không nhận diện commit. Các kết luận bảo mật/durability ở trên giới hạn đúng code path đã đọc.

## 3. Mượn gì, không sao chép gì

Mượn intent tools, typed receipts/errors, live capability discovery, context injection và shared command boundary. Mượn phân biệt accepted/completed/observed, timeout/cancel và task/session identity. Không sao chép toàn catalog T3, provider runtime, scheduler hoặc một event platform mới.

Harness đã có expected revision, request identity, principal binding, reconcile và module ownership trong thiết kế [Work](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/modules.md:130). Đây là invariant cần tái sử dụng khi triển khai, không phải runtime đã chứng minh. Native profile refs/Skills/Principles và Delegation Policy riêng từng orchestrator vẫn theo [configuration](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/configuration.md:30), [delegation](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/agent-delegation.md:5), [Glossary](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/GLOSSARY.md:25).

Generic unrestricted `config.patch(path,value)` nhỏ về số tool nhưng đẩy schema, ordering, authority và recovery sang LLM; dễ sửa nhầm runtime/native state. Chọn một số intent tools với discriminated union theo owner. Không xây JSON patch engine, arbitrary SQL/file writer hay change-set framework tổng quát. Chỉ thêm action khi có caller thật và invariant rõ.

## 4. Kiến trúc và hội thoại end-to-end đề xuất

Một plugin/một project: native chat → MCP adapter → owner commands dùng chung với panel → existing settings/work/release state. Adapter bind principal, host/project/workspace/session/role từ context đáng tin; input không được tự nhận role đặc quyền. Config mutations dùng validation, authority, expected revision và audit chung; không có MCP config store. Điều này nối tiếp [onboarding](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/onboarding-agent.md:7), [module boundary](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/modules.md:250).

Luồng cụ thể đề xuất:

1. Menu **Spawn Onboarding Agent** mở native Session đã gắn MCP. Agent đọc scope/capabilities/config, hỏi phần thiếu: “Dự án này dùng profile nào, cho phép sửa và test tới đâu?” Không yêu cầu nhập lại provider editor.
2. Agent phát hiện thiếu native profile. Theo lựa chọn Q1, gọi owner API được cấp hoặc hướng dẫn tạo tại Paseo. Profile native tồn tại trước khi lưu Agent Definition; đọc lại đúng host, chọn refs chính/fallback rồi Skills/Principles.
3. Agent giải thích diff, lưu binding/limits/actions qua commands. Revision conflict thì đọc lại và hỏi phần mâu thuẫn; mất response thì reconcile cùng operation identity, không save mù.
4. Agent dạy ngay cách Open Session, gửi yêu cầu dự án, xem inbox/monitor, chỉnh config/schedules/analytics/releases; dùng guidance versioned và ví dụ theo project, lưu tiến độ ngoài transcript.
5. Kiểm readiness trả blockers/evidence theo revision. Cách công nhận hoàn tất còn Q2; không cho LLM tự đặt `ready=true`.
6. Khi completion được công nhận, menu cho **Spawn Harness Engineering Orchestrator** để build Project Orchestrator; build đạt mới hiện Spawn Project Orchestrator. Đã có Session thì **Open Session**; tạo Session mới là hành động riêng. Hai orchestrator dùng chung Agent Catalog, policy riêng; không thêm orchestrator thường trực thứ ba, provider fork hoặc Skill isolation. [First-run](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/first-run-ux.md:11).

## 5. Small contracts theo intent

**proposed harness API, not actual T3/Paseo API** — các tên dưới đây là đề xuất, chưa triển khai:

- `onboarding.inspect({section?,cursor?})`: scope đã bind, effective refs/revisions, missing dependencies và capabilities; chỉ đọc, có pagination.
- `harness.configure({requestId,expectedRevision,action})`: union hữu hạn cho project binding, Agent Definition, orchestrator policy, limits/actions, automation binding; owner schemas validate. Trả diff/receipt, không nhận arbitrary path.
- `onboarding.check({configRevision})`: blockers/warnings/evidence, build eligibility tách operational verification; không tự hoàn tất.
- `onboarding.complete({requestId,expectedRevision,evidenceRefs})`: chỉ bật sau khi chốt Q2; owner kiểm lại prerequisites và authority.
- `operation.read({operationId})`: accepted/running/blocked/succeeded/failed/unknown, desired/observed revisions, retry guidance.
- `guidance.read({topic,version?})`: cách dùng, owner boundary, prerequisites và next actions; không chứa secret.

Mutation receipt gồm `operationId`, `requestId`, scope, committed revision và status; accepted không hứa effect hoàn tất. Error có `code`, field diagnostics, current revision, `retryable`, operation ref; phân biệt validation/conflict/denied/unavailable/ambiguous. Request key scope theo principal/project/intent; cùng key khác payload phải conflict. Dùng journal/receipts hiện hữu; notification chỉ nhắc đọc lại operation, có cursor/reconnect, không là nguồn duy nhất.

## 6. Native Paseo resources: lựa chọn vẫn mở

Ownership và đường thao tác là hai trục. Ranh giới hiện có cấm duplicate native editor/state; nó không tự trả lời Q1 về gọi owner APIs bằng chat. [Boundary](/Users/hanhnt2/.t3/scratch/2026-10-21-h-ng-d-n-orchestration-6d026007/docs/design/paseo-boundary.md:7). Paseo docs xác nhận profile lưu theo host, notes được tools cung cấp; SDK mô tả tạo/reference agent, không đủ bằng chứng profile CRUD. [Profiles][p-profiles], [SDK agents][p-agents].

Ba phương án:

- **Native read + guided write:** agent đọc catalog/context khi có API, hướng dẫn native UI cho phần ghi; xác minh refs rồi tiếp tục. Ít quyền hơn nhưng gián đoạn chat.
- **Owner API bridge:** khi API/version hỗ trợ và người dùng cấp quyền, MCP gọi intent native qua Paseo SDK/MCP hiện hữu; native owner validate/store. Không mirror model/options. Cần kiểm riêng profile/provider/project/schedule APIs; thiếu thì trả capability unavailable, không bịa method.
- **Hybrid, khuyến nghị để thảo luận:** tự cấu hình phần harness và native intents đã xác minh; phần còn lại hướng dẫn native UI rồi reconcile. Không coi đây là chấp nhận “plugin-only”.

Paseo MCP docs có agent/workspace operations và cảnh báo catalog filtering không là security boundary khi agent có shell. Không suy từ đó rằng có profile-create hoặc provider-login API. [MCP reference][p-mcp]. Không thêm provider fork hoặc thu hẹp Skill discovery để giải bài toán onboarding.

## 7. Bootstrap/lifecycle/security và quyết định còn lại

Bootstrap MCP phải có trước chat cấu hình: trusted plugin start đăng ký endpoint/commands; management action tạo Session và bind credential. Paseo docs có hook inject `mcpServers`, phụ thuộc provider support; chưa kiểm trên bản cài. Backend plugin trusted/unsandboxed, nên role filtering cần runtime enforcement thực, không chỉ prompt. [Plugin reference][p-plugin].

Ưu tiên plugin-hosted local transport; sidecar tăng isolation vận hành nhưng thêm supervisor/auth/reconnect. Chưa chọn HTTP hay stdio trước integration spike. Reload làm mất connection/token thì rebind, đọc durable operation và reconcile; host chết không thể được chính plugin hồi sinh. Không tự tạo Session thay thế khi reconnect. Native write và harness commit không có transaction chung: lưu intent, kiểm observed owner state trước retry. Secret input phải private qua owner facility đã xác minh, reference scoped/TTL, redaction và recovery cho consume-before-save; chưa hứa Paseo có T3-style secret card.

**Cần người dùng chốt:** Q1 chọn phạm vi native read/write và quyền theo intent; Q2 chọn completion do người dùng xác nhận, deterministic checks, hay cả hai. Khuyến nghị Q2 kết hợp checks và xác nhận đã hiểu bàn giao, tách config-ready/build-ready/operationally-verified; vẫn là đề xuất. Sau đó chốt bootstrap transport, API compatibility, replacement Session protocol và recovery tests. Không biến nghiên cứu này thành cấu hình active.

[installed]: https://github.com/pingdotgg/t3code/commit/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92
[main]: https://github.com/pingdotgg/t3code/commit/f054d1b8018721bd997d99cbb918a7b17bf098a4
[http]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/McpHttpServer.ts#L162
[project]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/toolkits/project/handlers.ts#L251
[thread]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/toolkits/thread/handlers.ts#L182
[management]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/orchestration-v2/ThreadManagementService.ts#L672
[registry]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/McpSessionRegistry.ts#L85
[access]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/threadAccess.ts#L128
[service]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/OrchestratorMcpService.ts#L1989
[gates]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/McpToolAccess.ts#L75
[tools]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/mcp/toolkits/orchestrator/tools.ts#L53
[contracts]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/packages/contracts/src/orchestratorMcp.ts#L47
[runtime]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/orchestration-v2/Orchestrator.ts#L11448
[sink]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/orchestration-v2/EventSink.ts#L615
[secrets]: https://github.com/pingdotgg/t3code/blob/fe27e8e3dc12dcbb108e9a28fd9b8cb65f34ae92/apps/server/src/secrets/SecretRequests.ts#L183
[main-doc]: https://github.com/pingdotgg/t3code/blob/f054d1b8018721bd997d99cbb918a7b17bf098a4/docs/orchestration-v2/orchestrator-mcp-server.md#L255
[p-profiles]: https://paseo.sh/docs/agent-profiles
[p-agents]: https://paseo.sh/docs/sdk/agents
[p-mcp]: https://paseo.sh/docs/mcp
[p-plugin]: https://paseo.sh/docs/plugins/reference#change-configuration-and-inject-an-mcp-server
