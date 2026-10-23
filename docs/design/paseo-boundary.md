# Ranh giới Paseo và harness

Baseline 2026-10-22; follow-up 2026-10-23: T03 đã chốt kết nối SDK một lần, T05 đã chốt ngoại lệ ownership lịch khi native không đủ contract. Đây là thiết kế dựa trên docs/source, chưa là integration pass. [Mục lục](README.md).

## Nguyên tắc

Paseo sở hữu môi trường chạy và giao diện session. Harness sở hữu agent definitions phong phú hơn native profile, theo yêu cầu người dùng. Harness bổ sung workflow bền vững và vòng cải tiến. Một chức năng có sẵn chỉ có một nơi quản lý; harness lưu reference và snapshot cần cho execution, không dựng bản CRUD hoặc nguồn active config thứ hai.

## Giữ ở Paseo, bỏ khỏi harness

| Chức năng đã có | Bỏ khỏi UI/implementation harness | Harness sử dụng / bổ sung |
| --- | --- | --- |
| Host, kết nối local/remote, daemon, provider đang cấu hình | Native host/provider manager hoặc login wizard thứ hai | Đọc context host được chọn; riêng T03 đã chấp nhận thiết lập SDK connection một lần cho plugin trên host đó, với xác thực riêng tư nếu cần |
| Projects và workspaces | Form đăng ký lại project, nhập lại path mặc định | Gắn kit với project/workspace hiện có; nếu chưa xác định được thì hỏi trong chat harness hoặc chọn một tham chiếu đã có |
| Worktree, setup/teardown, scripts/services trong `paseo.json` | Worktree manager, cấu hình worktree root/scripts/ports thứ hai | Yêu cầu workspace cô lập qua Paseo; pin nguồn/base, phối hợp admission/integration và giữ evidence trước archive |
| Agent profiles native: provider/model/mode/thinking/features/notes | Login/provider installation hoặc runtime mới | Paseo sở hữu profile native; tạo/sửa qua native UI hoặc owner API đã kiểm chứng/cấp quyền trong onboarding. Profile tồn tại trước khi definition tham chiếu chính/fallback và thêm skills/principles; không sao chép editor hoặc store provider/model/mode/thinking |
| Agent sessions, chat/timeline, tool calls, approvals và lifecycle | Chat composer/transcript store/log viewer/agent manager thứ hai | Hai orchestrator là hai session Paseo; monitor assignment/workflow và mở session để trao đổi hoặc xem chi tiết |
| Native schedules/heartbeats đáp ứng contract được chọn | Form CRUD hoặc active calendar trùng với cùng lịch Paseo | Giữ native owner và binding đã kiểm; Triggers được sở hữu Schedule của harness Job khi native không đủ contract theo T05 |
| Editor, diff/PR, terminal, browser và script controls | Những màn hình tương đương | Mở surface Paseo theo ngữ cảnh; harness chỉ giữ kết quả/evidence/revision cần kết luận workflow |
| Cài/bật/tắt/reload/update plugin và backend logs | Plugin manager hoặc host diagnostics thứ hai | Candidate/eval/activation policy và recovery state riêng của harness; thực hiện lifecycle qua Paseo |
| Native runtime permissions/provider options | Bộ approval UI hoặc credential store thứ hai | Policy hành động của workflow/role; dịch policy xuống native enforcement, không cấp quyền vượt host; thiếu khả năng thì chặn |

Nguồn: [Workspaces](https://paseo.sh/docs/workspaces.md), [Worktrees](https://paseo.sh/docs/worktrees.md), [Agent profiles](https://paseo.sh/docs/agent-profiles.md), [Schedules](https://paseo.sh/docs/schedules.md), [Plugin quickstart](https://paseo.sh/docs/plugins.md), [SDK agents](https://paseo.sh/docs/sdk/agents.md), [Configuration](https://paseo.sh/docs/configuration.md). Phần cột cuối là thiết kế harness, không phải bảo đảm Paseo đã cung cấp.

## Phần riêng cần giữ

- Hai logical orchestrator, inbox riêng và bootstrap/handoff; không yêu cầu thêm một ứng dụng chat.
- Workflow compositions, structured outcomes, admission, retry kỹ thuật và vòng sửa chất lượng.
- Durable work/journal/checkpoint/decision, correlation/reconcile, evidence và tiêu chí có revision.
- Ràng buộc vận hành của harness: budgets, quyền hành động, role/profile/skill/program bindings.
- Thử nghiệm, eval/baseline, daily retro, activation/monitoring/verdict và contribution upstream.
- Monitor tổng hợp quan hệ workflow → work → agent/workspace; thao tác điều khiển cả workflow không đồng nghĩa stop một agent.
- Lịch sử thay đổi phần harness sở hữu, dữ liệu/backup/recovery của chính harness.

## Luồng mới cài

Cài bằng Plugins Paseo → menu quản lý Spawn Onboarding Agent với MCP cấu hình/hướng dẫn qua native chat → code kiểm readiness cấu hình → người dùng Spawn Harness Engineering Orchestrator để dựng → dựng đạt thì người dùng Spawn Project Orchestrator. Có Session thì Open Session, tạo Session mới là thao tác riêng. Owner API native được phép dùng khi đã kiểm chứng/cấp quyền; nếu thiếu thì hướng dẫn native UI rồi xác nhận lại. Không có editor/store native thứ hai.

Không mặc định mọi host API tự đưa đủ context. Adapter phải resolve và xác nhận binding; thiếu provider thì hướng tới cấu hình Paseo. Quyền được hỏi khi cần hành động; cấu hình host/provider có sẵn không hàm ý được phép ghi/publish. Năng lực thực thi vẫn cần kiểm chứng bằng công việc đại diện.

## Hai trục: nguồn kích hoạt và cách thực thi

Nguồn kích hoạt là cron/interval/event/thủ công. Cách thực thi là code job hoặc agent work. Có cron không hàm ý phải gọi LLM.

| Loại | Nơi sở hữu lịch | Thực thi |
| --- | --- | --- |
| Native agent schedule / heartbeat đáp ứng contract được chọn | Paseo | Native tạo agent/gửi vào Session; harness chỉ nhận bridge đã kiểm đủ identity/control/delivery |
| Schedule của harness Job cần contract native chưa cung cấp | Triggers | Code handler đã đăng ký hoặc giao agent/workflow qua Work; authority/resources/Pause vẫn được kiểm |
| Timer của run | Work | Retry/deadline/decision timeout gắn attempt, không tạo việc mới tùy ý |

Ví dụ code jobs: kéo task mới từ Backlog; kiểm comment mới của các PR đang theo dõi; sync metadata; kiểm dependency/service; gom metrics. Poll rỗng chỉ cập nhật trạng thái và không đánh thức agent. Khi có thay đổi, ghi event và delivery vào đúng inbox; code lọc/dedupe/routing, agent xử lý phần cần diễn giải hoặc quyết định.

Với nguồn Paseo, cadence/timezone/enable thuộc Paseo, harness giữ binding/snapshot/receipt. Với Schedule do Triggers sở hữu, registry/cadence/enable/history thuộc harness dù target là code, agent hoặc workflow. Mỗi Schedule chỉ có một owner, không có hai engine phát lại cùng cadence. Panel quản lý phần harness sở hữu và bàn giao native source về đúng owner.

Scheduler của harness dùng thư viện lịch/backend phù hợp trong implementation, không tự viết parser cron hoặc khởi tạo agent để chạy lệnh cố định. Job cần identity, overlap/missed bounds, claim, timeout/retry, rate limit và durable delivery; code integrations thêm cursor/dedupe và commit events trước ghi tiến độ đã nhận. External API/local DB không có transaction chung; code handlers có version/allowlist, không là ô nhập shell tùy ý.

Không giả native có `missed=all/latest`; chỉ nhận binding đáp ứng contract đã kiểm. Schedules của harness giữ policy tường minh; code polls mặc định coalesce một lượt sau restart theo nguồn/cursor. Plugin/host dừng thì không có lượt thực thi cho tới khi khởi động lại, trừ một external runner được chọn riêng; V1 không tự thêm dịch vụ đó.

Agent definitions sửa trực tiếp trong harness được validate/pin cho lượt mới; native schedules sửa từ Paseo được đối soát. Native profile có sẵn là điều kiện để lưu/dispatch cấu hình agent; catalog chỉ đọc từ đúng host. Snapshot của run cũ giữ nguyên; một bản cache read-only không là nguồn cấu hình active thứ hai. In-app navigation cần prototype API host thật; HTML chỉ mô phỏng bàn giao, không bịa deep link.

## Khác biệt UI sau rà soát

Bỏ S01–S03 wizard native cũ, danh sách/chi tiết agent độc lập và CRUD lịch tạo agent trùng với Paseo. Giữ quản lý code jobs, assignment và binding/policy/delivery; chat trong HTML chỉ minh họa surface Paseo bên ngoài plugin. Config không quản lý lại host/provider/worktree; T03 bổ sung prerequisite SDK connection một lần, không dựng host manager thứ hai. Agent Definition chỉ chọn native profile refs chính/fallback, Skills và Principles; provider/model/options sửa ở Paseo. Các điểm bàn giao Paseo có nhãn rõ; không tuyên bố đã nối API.

## Source follow-up 0.12 — T05 đã chốt

[F-T03](paseo-012-scheduling-facts-r3.md) xác nhận native cadence/history hiện có và các contract/API gaps. [T05/Q1 được chấp nhận](history/technical-t05-acceptance-2026-10-23/acceptance-t05.json) thay blanket mapping “mọi lịch agent đều native” bằng ownership có điều kiện nêu trên. Native vẫn là owner của source đã chọn; không tự chuyển lịch cũ hoặc nhân đôi active scheduler. [T05 design](technical-scheduling.md) giữ protocol/proof còn mở; source pins của đoạn baseline đã thay được lưu tại snapshot trước acceptance để không sửa ngược bằng chứng.

[T03 acceptance](history/technical-t03-2026-10-23/acceptance-t03.json) đã cho phép runtime SDK connection một lần và HTTP MCP với token riêng từng Session, được native Paseo lưu. Hạn chế native-log redaction, provider/reload proof và prerequisite chưa có trong HTML v9 được giữ rõ trong [T02](technical-owner-ingress.md) và [prototype specification](prototype-spec.md#t03-follow-up--runtime-connection-prerequisite).
