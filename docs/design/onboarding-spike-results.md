# Kết quả spike Onboarding MCP

Kiểm ngày 2026-10-22, kết thúc lượt live thành công lúc 21:27 giờ Việt Nam. Đã chạy vertical slice bằng **hai native Paseo Sessions thật**: Onboarding ghi config qua MCP → code kiểm readiness/lưu handover → driver mô phỏng lệnh Spawn do người dùng chủ động → Harness Engineering đọc và xác nhận đúng bàn giao. Đây là smoke disposable, chưa dựng Project Orchestrator hoặc nghiệm thu Project Harness production.

[Code và cách chạy lại](../../spikes/onboarding-mcp/README.md) · [Live evidence](../../spikes/onboarding-mcp/evidence/live.json) · [Discovery](../../spikes/onboarding-mcp/evidence/discovery.json) · [Cleanup](../../spikes/onboarding-mcp/evidence/cleanup.json).

## Versions và native context đã đọc

- Host `Mac-MN-14.local`, daemon Desktop-managed **0.11.1**, `127.0.0.1:6767`; CLI **0.12.0**. Không restart/nâng cấp host chính; worker PID giữ **56104**.
- `@getpaseo/client` và `@getpaseo/plugin` **0.11.1**, MCP SDK **1.32.1**, Node **22.16.0**; npm lockfile ghim dependency tree. Node mặc định của shell ban đầu là 20.19.3, thiếu global WebSocket nên probe đầu không kết nối được; đổi sang Node 22, không sửa daemon.
- Public `config.get()` xác nhận profile **test**, ID `agent_profile_mvj6g8mc_6xmhwd3zwgd`, `codex/gpt-5.6-luna`, thinking `low`, native mode `full-access`. Hai session có runtime readback đúng model/thinking đó. Không tạo/sửa profile.
- Public native handles cung cấp project `prj_08681ba4e1bb62f0`, workspace disposable `wks_1cdba013584be0bb`; cả hai Sessions nằm trong workspace này. `projectRoot` tham chiếu shared project, còn cwd thực thi là `spikes/onboarding-mcp/.run/workspace`. Đây không phải chạy workflow trên repo sản phẩm.

Đã fetch `llms.txt`, quickstart, plugin reference, publishing, SDK/agents/reference hiện hành trước khi sửa plugin. Kết hợp với declarations **0.11.1** và thao tác thật để phân biệt docs deployed với version cài: [plugin injection/toolPolicy](https://paseo.sh/docs/plugins/reference.md), [SDK agents/workspace placement](https://paseo.sh/docs/sdk/agents.md), [SDK reference](https://paseo.sh/docs/sdk/reference.md), [MCP SDK HTTP example](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.x/src/examples/server/simpleStreamableHttp.ts). Metadata/hash của bản docs đã tải nằm trong [verification.json](../../spikes/onboarding-mcp/evidence/verification.json).

Ưu tiên daemon riêng đã được cân nhắc. Native profile có ownership theo host; không kiểm được public import nào giữ nguyên profile reference trên home khác. Vì host chính đã bật `pluginsEnabled=true` và task cho phép dùng nó trong trường hợp này, spike chỉ cài plugin riêng `project-harness-onboarding-mcp-spike`. Không sao chép credentials/profile vào home riêng, không đổi global switch hoặc HBU.

## Đã chạy thật

Lượt thành công: `onboarding-ebeeb9e4-a7f9-43b1-bd4a-3e7d9196f840`. Chín nhóm assertions live đạt, không cộng các lượt thử lặp vào số này:

1. Typecheck trước install; plugin catalog trả `running`, endpoint của plugin hoạt động.
2. Thiếu config bắt buộc khiến owner/check báo blocker, lệnh Spawn Engineering bị từ chối. Kiểm này chạy code owner thật, không gọi LLM để quyết định pass.
3. Spawn Onboarding lặp trả cùng session `4e66b5c4-e28c-4dee-8eba-f2dc7dc1b2cd`.
4. Onboarding thật gọi `guidance_read`, `onboarding_inspect`, `onboarding_configure`, `onboarding_check`, `onboarding_complete`. Config revision **1**, handover lưu ngoài transcript. Native timeline có các MCP calls `completed`, shell đọc đúng Skill/Principles với exit **0**.
5. Owner thật từ chối completion với expected revision **0** sau khi config đã ở **1**. Không sửa native profile/source thật để tạo ca âm.
6. Reload duy nhất plugin của spike: subprocess PID **95930 → 98140**. Startup đối soát đúng session cũ; config/handover giữ nguyên, Spawn lặp không tạo session mới. Reload nằm giữa bước lưu bàn giao và lệnh Spawn Engineering, không phải khi native create/commit đang chạy.
7. Chính Onboarding Session cũ gọi lại `onboarding_inspect` và `handover_read` thành công sau reload; endpoint/bearer ổn định trong lượt này. Không tạo Onboarding thay thế hoặc dựa vào lifecycle event để suy completion.
8. Driver gửi lệnh Spawn Engineering tường minh. Session `ffcfe6a4-1792-4b57-a4d6-dd6085a3188a` nhận digest đã pin, đọc toàn bộ handover bằng MCP, gọi `handover_acknowledge` với **đúng config/revision/digest**. Owner validate, lưu audit `acknowledge-exact-handover` lúc `14:27:14.607Z`. Digest cả lượt: `dbd58ea98a429dd4d426310f26510c65b9ab43eca7e25cf5aa1242add906f4ce`.
9. Spawn Engineering lặp trả cùng ID; native list theo run label chỉ có **hai** Sessions. Handover không đổi. Không có Project Orchestrator, lịch hoặc loop được tạo.

Assigned Skill là **mattpocock-skills:codebase-design**, đường dẫn thật có trong evidence. Principles là **docs/design/paseo-boundary.md** của dự án. Hash nguồn được lưu. Không fork/monkey patch hoặc thu hẹp inherited user skill catalog. Lượt này không đếm lại catalog provider, nên không suy số skills được nạp từ spike trước.

Native profile mode badge vẫn `full-access`; per-session options yêu cầu shell `read-only`, approval `never`, web search disabled. Lượt này không thử bypass sandbox; không dùng nhãn mode làm bằng chứng fencing. Native preapproval chỉ áp dụng những tên tool MCP cụ thể đã được task ủy quyền.

## Local, scripted và chưa kiểm

**13 ca local đạt** trong [TAP](../../spikes/onboarding-mcp/evidence/local-tests.tap): filesystem tạm thật; một ca HTTP/MCP client/server thật; Paseo adapter được script giả lập. Các ca bao phủ mandatory config và optional gaps, receipt replay/payload conflict, revision cũ, source drift, missing native profile, reload qua owner mới, unknown creation outcome/reconcile/fail-closed, strict authority schema, exact handover acknowledgement, role-specific MCP catalog/auth, API placement vào workspace đã pin và từ chối workspace bị đổi.

Đây không phải 13 ca daemon live. Ca HTTP xác nhận driver và MCP dùng chung owner/state; không chứng minh chống agent có shell đọc local credentials. Sau live, thêm guard reconcile workspace và phục hồi context từ native handle trong nhánh mất create receipt; nhánh này chỉ kiểm local. Không tuyên bố lost-response native đã đạt.

Chưa kiểm: mất response thật giữa native create và SDK receipt; lost send acknowledgement; reload đúng lúc mutation/creation đang dở; daemon restart/power loss; nhiều owner/concurrency/fencing; profile/provider CRUD hoặc private secret flow; Replace Session/stale-role dispatch; UI button/Desktop/mobile; production installer, scheduler hay Project Orchestrator build/operation. Tool catalog filtering và prompt không là security boundary đối với native shell/tools.

Adapter không expose native writes: trả guidance dùng **Paseo Settings → Agents → Agent profiles**, rồi đọc lại profile qua owner API. Điều này là phạm vi adapter, không khẳng định mọi public native write API đều thiếu. `operation_read` và toàn bộ intents trong proposal chưa được triển khai. Build-ready chỉ có giá trị đối với cấu hình/fingerprint đã check, không là operationally verified hoặc atomic snapshot chung với native daemon.

## Hai thất bại được giữ lại

- [Round 1](../../spikes/onboarding-mcp/evidence/round1-blocked.json): native agent đọc nguồn nhưng MCP trả `MCP tool call requires approval, but approval policy is never`. State giữ revision 0, không giả báo thành công. Sửa bằng public `toolPolicy.preapproved` cho exact tools của MCP này; giữ approval `never` và native profile. Đã cleanup trước lượt mới.
- [Round 2](../../spikes/onboarding-mcp/evidence/round2-placement-blocked.json): Onboarding/reload/reconnect đạt nhưng `agents.create({cwd})` tạo workspace mới cho Engineering. Guard từ chối `WORKSPACE_BINDING_MISMATCH`; session idle chưa được dispatch. Cleanup tìm session qua run/role labels khi receipt chưa ghi đầy đủ, archive đúng nó; không retry mù. Sửa sang `workspaces.ref(id).agents.create(...)`, ghi native ID sớm và thêm regression check. Đây là thất bại placement có response, **không phải** test mất transport response.

[Round 1 cleanup](../../spikes/onboarding-mcp/evidence/round1-cleanup.json) · [Round 2 cleanup](../../spikes/onboarding-mcp/evidence/round2-cleanup.json). Tổng các lượt đã tạo năm Sessions thử nghiệm, tất cả đã archive. Chỉ lượt cuối là end-to-end pass; không cộng partial passes để gọi hai lượt trước thành công.

## Cleanup và bước tiếp

Đã remove plugin riêng, archive hai Sessions và workspace của lượt cuối, xóa private bootstrap credentials. HBU vẫn `running`, worker chính vẫn **56104**, selected native profile values không đổi. Các lượt trước cũng đã cleanup. Giữ source, dependency lock, evidence đã lọc và ignored durable state để kiểm tra; không xuất raw auth config/env/headers/transcripts. Archived Sessions và native project record có thể còn trong history/catalog; không sửa internal state để xóa chúng và không hứa xóa serialized MCP settings nội bộ. Endpoint đã gỡ nên bearer cũ không hoạt động.

Chạy lại theo [README](../../spikes/onboarding-mcp/README.md). Driver từ chối run/state cũ; chỉ chuyển thư mục `.run` đã cleanup sang tên lưu trữ rồi prepare lượt mới. Khi timeout, không suy completion hoặc tự retry; đối soát labels và cleanup tài nguyên của đúng run.

Bước kỹ thuật tiếp theo: dùng owner interface của slice này trong action/menu quản lý thật của plugin, bind native project/workspace đã chọn và profile ref từ context; giữ user-initiated Spawn và revision/dependency recheck. Sau đó mới kiểm transport-loss/in-flight reload và enforcement riêng. Không cần dựng thêm chat composer hoặc native provider/profile editor.
