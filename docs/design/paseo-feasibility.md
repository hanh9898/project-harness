# Đánh giá khả năng triển khai prototype trên Paseo

Đối chiếu ngày 2026-10-22, với prototype v5. Phần đánh giá dưới đây dựa trên tài liệu công khai và source. Kiểm chứng tiếp theo đã install/reload plugin thử nghiệm trên daemon 0.11.1; chi tiết và giới hạn tại [paseo-spike-results.md](paseo-spike-results.md). Sau khi người dùng tạo profile `test`, đã kiểm worker Codex đọc skill thật, output validation và cùng agent running qua plugin reload. Chưa có per-agent skill isolation hoặc kiểm provider khác. Không suy phiên bản host từ tài liệu online. Source đối chiếu: commit [`76b32544c6ba804b135acef86bd4ed627c654ae2`](https://github.com/getpaseo/paseo/tree/76b32544c6ba804b135acef86bd4ed627c654ae2); khả năng có trên `main` không tự chứng minh đã phát hành hoặc có trong host đang dùng.

> **Yêu cầu hiện hành về Skills:** chỉ định tường minh Skills khi giao việc là đủ; không cần giới hạn catalog riêng từng Agent Session. Không tiếp tục hướng fork, monkey patch hoặc isolation. Kết quả khảo sát API bên dưới được giữ để phân biệt khả năng có sẵn với yêu cầu đã bỏ.

## Kết luận

Paseo phù hợp làm nền tảng để triển khai kit này: giao diện plugin, native chat/profiles, thực thi agent, workspace/worktree và lịch agent đã có. Phần quyết định độ tin cậy của harness vẫn phải xây: workflow engine, hai inbox, admission, profile fallback, skill/principle binding, journal/reconcile, evaluation và promotion/recovery.

Có thể giữ concept và phần lớn hành trình của prototype. Chưa thể cam kết mọi nút của HTML có API native tương ứng, hoặc mọi provider đáp ứng cùng hợp đồng. Không dùng tỷ lệ phần trăm khả thi khi chưa có thực nghiệm.

## Ma trận đáp ứng

| Phần prototype | Paseo cung cấp | Harness phải làm / giới hạn |
|---|---|---|
| Native profile tạo trước; harness chọn chính/fallback | Profile có identity và launch settings; MCP `list_profiles`; SDK `config.get()` | Đọc `config.agentProfiles` theo host, kiểm ref, resolve settings khi dispatch. Không có `profileId` trong create-agent contract được khảo sát. Fallback do harness điều khiển. [1][2][3] |
| Tạo/sửa cấu hình agent của harness | Plugin settings screens, form components, typed/versioned settings và RPC | Definition nối refs + skills + principle policy; role bindings và validation là code harness. Host settings API có revision/atomic write nhưng không thay transaction workflow. [4] |
| Hai orchestrator, spawn workers, chat native | Create/send/wait/parent/labels; native navigation mở agent/workspace | Harness tạo hai agent và kiểm soát lifecycle/inbox. Native chat chỉ là kênh trao đổi; agent phải gọi CLI/MCP harness để nhận/nộp công việc bền vững. Hook kết thúc turn không chứng minh task đã hoàn tất. [3][4] |
| Năm pattern ghép/lồng nhau | Agent execution và SDK là primitives | Chain/route/parallel/workers/optimizer, scheduler và schema validation là runtime riêng. SDK không được xem là workflow engine cho các invariant đã thiết kế. [3] |
| Skills từ bộ đã cài, chọn theo agent | Orchestration skill management trên host; `agent.commands()` đọc skills/commands mà session đã nạp | Chưa thấy API `skills: [...]` per-agent trong create config. Cần bổ sung capability Paseo để cấp đúng bộ Skills và kiểm nguồn trên host; plugin không tự cấu hình provider. Catalog metadata chưa chứng minh skill đã được nạp. [3][5][6] |
| Principles auto/fixed/hybrid | System/developer instructions và prompt lúc tạo agent | Catalog, policy, selection log, provenance và evidence do harness xây. Việc agent thật sự áp dụng principle cần kiểm qua kết quả; checkbox không bảo đảm hành vi. [3] |
| Monitor assignments, status, logs | Agent list subscriptions, timeline, runtimeInfo/usage và openAgent | Gắn work/node/attempt với agent; persist kết quả/evidence riêng. Timeline delivery live-only và refetch sau reconnect; plugin hooks best effort. [3][4][7] |
| Daily retro và đánh thức agent | Schedules tạo agent mới; heartbeat gửi prompt cho agent hiện có | Chọn một nguồn sở hữu cadence. Binding phải đưa lượt vào đúng inbox/registry; không mặc định native scheduler biết harness definition hoặc result contract. [8] |
| Code jobs kéo Backlog/poll PR không LLM | Backend plugin chạy Node, network/process APIs | Job runner/cron library, cursor, dedupe, lease, overlap/missed policy, timeout và outbox do harness xây. Native agent schedule không phải callback runner cho code jobs. [4][8] |
| Push/PR/merge/publish allow/ask/deny | Permission requests và options tùy provider; MCP/tool config theo session | Gate ở đường thực thi có kiểm soát; ngăn đường shell/tool khác nếu muốn cưỡng chế. Không có bằng chứng về action firewall nghiệp vụ thống nhất cho mọi provider. [3][6] |
| Giới hạn worker và thời gian | Agent lifecycle/status, timeout khi chờ | Admission cap là code harness. Hết thời gian wait không hủy agent; thời hạn work cần cancel/checkpoint/reconcile riêng. [9] |
| Candidate/eval/activate/rollback | Plugin lifecycle và khả năng gọi Git/process/agent | Toàn bộ evaluation và release protocol do harness xây. Plugin reload dừng subprocess, nên updater/recovery phải tồn tại độc lập phiên bản plugin đang sửa. [4] |

## Những điểm prototype cần diễn giải chính xác

### 1. Native profile refs khả thi, nhưng cần resolver

Source native schema có `id`, `provider`, optional `model`, `modeId`, `thinkingOptionId`, `featureValues`, notes; không có system prompt trong profile. SDK config dùng `provider/model`, `modeId`, `thinkingOptionId`, `featureValues`, `systemPrompt`, `options`, MCP/tool policy. Không gửi tên profile thay model ID hoặc dịch thinking giữa providers bằng suy đoán. [2][3]

Harness lưu `{serverId, profileId}` theo thứ tự; khi dispatch đọc profile gốc, kiểm model/mode/features/capability, ghi snapshot và identity thao tác rồi tạo agent. Nếu profile không chỉ rõ model, cần policy resolve có ghi nhận bằng provider discovery hoặc yêu cầu người dùng chốt; không giả model luôn tồn tại. Profile thiếu/xóa phải hiện lỗi cấu hình tường minh.

Cần phân biệt pin **profile đã resolve** với đóng băng mọi cấu hình thực thi: provider options mặc định được deep-merge lúc launch/resume, và nguồn skills cũng có thể đổi. Muốn tái lập cần ghi effective configuration và resource revisions; snapshot profile riêng chưa đủ. [6]

### 2. Chỉ định tường minh Skills khi giao việc

Source có `AgentSkillSelection`, nhưng nó được dùng trong host-level orchestration skill management. `AgentSessionConfig` và public SDK agent config khảo sát không có per-agent skill list. Không được suy kiểu dữ liệu đó đã đáp ứng chọn pstack/matt cho từng worker. [2][5]

Checkbox thể hiện **bộ Skills cần dùng cho nhiệm vụ**. Khi dispatch, instructions chỉ định tường minh tên và nguồn Skill từ Agent Definition; kiểm nguồn truy cập được và giữ revision đã dùng. Agent vẫn có thể thấy Skills khác từ host; điều này không chặn dispatch. Nguyên tắc auto/fixed/hybrid được thể hiện trong instructions và catalog liên quan; kết quả vẫn cần bằng chứng đánh giá.

### 3. Nút mở màn hình native cần fallback điều hướng

Plugin có `navigation.openAgent` / `openWorkspace`. `openSettings(id)` trong tài liệu chỉ mở settings contribution của chính plugin, chưa xác nhận API mở thẳng Settings → host → Agents → Agent profiles hoặc Schedules. Giữ nút mở khi capability đã kiểm; nếu chưa hỗ trợ, hiển thị đường dẫn thao tác và nút quay lại. Không dùng undocumented app route hoặc dựng editor native thay thế. [4]

### 4. Closed loop bền vững là phần harness phải sở hữu

Hook/event dùng làm tín hiệu đánh thức; SQLite journal/checkpoint là nguồn trạng thái workflow. Sau startup/reconnect/reload phải reconcile agent và operation intent, không tạo lại worker ngay khi mất phản hồi. SDK source có creation identity/idempotency primitives, có thể tận dụng sau contract test; không suy ra mọi side effect exactly-once. [3][7]

Plugin dày vẫn phù hợp phạm vi v1 đã chọn: code jobs và runtime chỉ chạy khi subprocess/daemon đang hoạt động. Không được cam kết chạy 24/7 lúc máy ngủ, daemon tắt hoặc plugin failed. Màn hình Recovery trong plugin cũng không thể là đường cứu duy nhất khi plugin không khởi động được; executable known-good bên ngoài phải phục hồi được.

Tài liệu plugin hiện tại mô tả timeline row là canonical history và bảo đảm live/refetch. Nó không đủ để kết luận durability qua daemon restart. Không tiếp tục dùng khẳng định cũ “chỉ ở RAM” như một fact đã xác minh; phải kiểm storage và restart trên phiên bản đích. Dù timeline durable, nó vẫn không thay transaction workflow của harness. [4]

### 5. Quyền phải giữ được qua fallback và direct delegation

Fallback chỉ chuyển sang profile đã được cấu hình và đáp ứng cùng role/result/authority contract. Không coi lỗi quyền, lỗi schema hay effect chưa rõ là lý do thử model khác. Error taxonomy khác nhau theo provider nên cần adapter, không chỉ regex thông báo.

Mọi dispatch có kiểm soát phải đi qua harness broker. Nếu orchestrator được phép gọi native `create_agent` tùy ý hoặc worker có đường shell/network vượt gate, registry và Actions UI chỉ là hướng dẫn. Cần giới hạn tool/provider options phù hợp và kiểm đường bypass trước khi gọi đó là enforcement. Plugin bản thân là trusted, unsandboxed code; policy agent không sandbox chính plugin. [4][6]

## Spike đề nghị theo thứ tự

1. **Một native profile → một worker có skill thật.** Đọc profile từ host, resolve mọi native fields, cấp một skill pstack/matt đã cài, lấy loaded commands nếu provider hỗ trợ, kiểm evidence worker đọc/dùng skill. Làm trên từng provider v1 hỗ trợ; đồng thời kiểm profile thiếu/model optional.
2. **Chat → durable work → assignment.** Hai native sessions; harness CLI/MCP nộp work một lần, worker có structured output, runtime validate và lưu evidence. Kiểm direct spawn có bỏ qua broker được không.
3. **Primary → fallback.** Mô phỏng unavailable/rate-limit, thiếu quyền/capability và mất phản hồi sau create. Kiểm không spawn trùng, không nới quyền và work cũ không bị retarget.
4. **Reload/crash giữa lượt.** Lưu intent/checkpoint, reload plugin, reconcile worker đang chạy, khôi phục queue. Cố tình làm plugin khởi động lỗi và phục hồi qua executable bên ngoài.
5. **Hai loại lịch.** Daily qua native schedule/heartbeat; một code job trả unchanged không tạo agent, changed/delta lặp chỉ sinh một inbox item. Kiểm restart, máy ngủ, overlap và evidence trước archive worktree.
6. **UI thật trên host đích.** Implement một settings screen và panel bằng React Native; native profile picker là harness select đọc catalog; xác nhận navigation native có/không trên desktop/mobile. HTML chỉ là prototype, không phải bundle plugin dùng trực tiếp.

Tiêu chí quyết định: giữ Paseo nếu các spike đầu chứng minh được profile resolution, phương pháp/skills theo agent và durable dispatch theo contract. Chỉ xem xét fork/core contribution khi phát hiện thiếu API không thể bọc bằng public plugin/SDK; không fork chỉ để dựng lại profile editor.

## Nguồn

1. [Agent profiles](https://paseo.sh/docs/agent-profiles).
2. [Native profile schema](https://github.com/getpaseo/paseo/blob/76b32544c6ba804b135acef86bd4ed627c654ae2/packages/protocol/src/agent-profile.ts), [native profile read/write](https://github.com/getpaseo/paseo/blob/76b32544c6ba804b135acef86bd4ed627c654ae2/packages/app/src/agent-profiles/internal/use-agent-profiles.ts).
3. [SDK API](https://paseo.sh/docs/sdk/reference), [SDK source](https://github.com/getpaseo/paseo/blob/76b32544c6ba804b135acef86bd4ed627c654ae2/packages/client/src/index.ts), [MCP profiles mapping](https://paseo.sh/docs/mcp#agent-profiles).
4. [Plugin reference](https://paseo.sh/docs/plugins/reference): settings screens/persistence, lifecycle, navigation, Node backend và trust.
5. [Skills](https://paseo.sh/docs/skills), [protocol config và host skill management](https://github.com/getpaseo/paseo/blob/76b32544c6ba804b135acef86bd4ed627c654ae2/packages/protocol/src/messages.ts).
6. [Provider options](https://paseo.sh/docs/sdk/provider-options).
7. [SDK events](https://paseo.sh/docs/sdk/events).
8. [Schedules](https://paseo.sh/docs/schedules).
9. [Agent lifecycle và structured output](https://paseo.sh/docs/sdk/agents).
