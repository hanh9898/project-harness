# Cấu hình Project Harness

Thiết kế hiện hành • 2026-10-23 • [Mục lục](README.md). Đã thu gọn theo nghiên cứu 80/20 và [danh mục agent](autonomous-team-proposal.md). Schema dưới đây là thiết kế của Project Harness; spike Paseo riêng mới kiểm một phần hợp đồng, chưa triển khai schema này.

## 1. Bốn nhóm settings

| Nhóm | Người vận hành chỉnh | Phần không đưa vào form |
| --- | --- | --- |
| Agents | Tạo/nhân bản/sửa cấu hình agent: chọn profile native chính và fallback, skills đã nạp, principle policy; bindings cho orchestrators/roles | Paseo sở hữu tạo/sửa profile native và provider/model/thinking/mode; profile phải tồn tại trong Paseo trước; onboarding có thể gọi owner API đã kiểm chứng/cấp quyền |
| Limits | Worker đồng thời toàn kit, thời gian tối đa mỗi work; budget chỉ khi đo/enforce được | Retry/backoff/quality rounds dùng defaults bounded theo program; không provider-options passthrough |
| Actions | allow/ask/deny cho push, tạo PR, merge, publish và activate verified revision | Không có nút autonomous cấp mọi quyền; native permissions vẫn cưỡng chế ở provider/host |
| Automations | Mở/chỉnh code jobs hoặc tham chiếu agent schedule/heartbeat | Không lưu cadence thứ hai trong settings; cursor/last run/next run là trạng thái đọc |

Một schema kit, không generic inheritance engine nhiều scope. Role chọn agent definition tường minh khi cần; definition phải tham chiếu các native profile đã tạo trong Paseo. Giá trị mẫu trong HTML không phải default tài nguyên/quyền của sản phẩm đã chốt. Người mới vào chat từ context Paseo, chỉ bổ sung phần thiếu và authority cần cho công việc.

## 2. Ba loại tài sản, không gộp vào settings

Agent Catalog dùng chung và Delegation Policy riêng theo orchestrator đã được chốt; phân biệt Delegate/Consult/Workflow, mặc định không tạo agent tạm ngoài catalog. Worker mặc định không delegate tiếp; Consult không nhận quyền sửa code/push/merge/release. Dùng chung trần tài nguyên và phân biệt slot orchestrator/worker, chưa bắt quota từng role. Xem [agent-delegation.md](agent-delegation.md) cho quyết định đã chốt và các hợp đồng/enforcement còn mở. Chưa chốt schema/validation cụ thể, không thêm nhóm settings thứ năm hoặc thay native profile ownership.

Editor V1 đã chốt bố cục: Delegation Policy trong cấu hình mỗi orchestrator, có allowed definitions/modes theo entry, effective constraints và validation errors; delegate tiếp/agent tạm nằm Advanced. Không nhập lại budgets chung. Agent Catalog / Danh mục agent và Delegation Policy / Chính sách giao việc đã chốt; schema/validation và enforcement còn cần thiết kế/kiểm chứng theo agent-delegation.md.

- **Settings vận hành:** quyền, trần, agent bindings và automation controls; người dùng có editor definitions trực tiếp. Thay đổi có nguồn và authority của người vận hành.
- **Catalog đội / definitions:** khi nào giao role, entry procedures, skills hỗ trợ, principle index, workflow và result/evaluator contracts. Harness đọc và cải tiến qua candidate có version; không thêm nhóm config thứ năm.
- **Runtime state:** assignments, selected bundle/principles, checkpoint, cursor, usage, evidence, verdict và observed capabilities. Chỉ đọc hoặc điều khiển đúng đối tượng, không ghi đè bằng form.

Yêu cầu nghiệp vụ và tiêu chí công việc trao đổi trực tiếp trong native chat dự án. Skills và principles có thể được phát triển theo thời gian; bỏ settings editor không có nghĩa hard-code chúng bất biến.

> **Yêu cầu Skills hiện hành:** Agent Definition chọn bộ Skills cần dùng; khi giao việc, Orchestrator Agent chỉ định tường minh tên và nguồn Skill trong instructions. Agent Session có thể thấy các Skills khác từ môi trường dùng chung. Không yêu cầu per-agent catalog isolation; không cần fork, monkey patch hoặc đổi môi trường discovery để đáp ứng yêu cầu này. Phải kiểm nguồn Skill truy cập được và đánh giá kết quả công việc.

## 3. Agent definition, nguồn và role

Agent Definition của harness gồm identity/revision, name/when-to-use, ordered native profile references (chính, rồi fallback), skills được chọn từ catalog, principleMode `auto | fixed | hybrid` và principles cố định/bắt buộc. Đây là cấu hình trực tiếp trong nhóm Agents, native profile phải tồn tại tại Paseo trước khi lưu reference; onboarding có thể tạo/sửa qua owner API đã kiểm chứng/cấp quyền, không có editor/store provider/model/thinking/mode thứ hai.

Cấu hình chỉ lưu profile refs theo host, không lưu bản active provider/model/options thứ hai. Khi dispatch, resolve và pin snapshot native profile vào work; profile sửa sau đó chỉ tác động lượt mới. Native ref bị mất/xóa phải chặn dù còn fallback khác, để người vận hành sửa cấu hình tường minh.

Mỗi role dùng một definition; model/skills/principles không bị chép thành bản thứ hai trong role. Role vẫn giữ trách nhiệm, procedure và result contract. Entry skill của procedure phải có trong definition; thiếu thì chặn, không fallback sang prompt tự chế. Native profile catalog lấy từ đúng host Paseo khi triển khai; không suy provider từ tên model hoặc chuyển mọi options giữa provider như thể chúng tương đương.

Fallback xét đúng thứ tự khi candidate tạm unavailable/rate-limited; từng candidate phải đủ capability/quyền/skill loader/output contract và budget. Không fallback để vượt deny, sửa schema hoặc bỏ skill bắt buộc. Không candidate hợp lệ thì chờ/blocked. Việc chuyển model sau effect mơ hồ cần reconcile trước retry, không chạy lại task mù quáng. Preview HTML chỉ mô phỏng availability, chưa thực thi retry/fallback thật.

Skills/principles có catalog nguồn và revision. Người dùng chọn từ bộ đã nạp, không nhập tên tự do để giả đã cài. Bản tích hợp thật phải đăng ký/đọc thư mục trên host Paseo; prototype dùng file input đọc metadata `SKILL.md` trên client, không upload hoặc cài skill lên remote host. Không lưu toàn bộ nội dung vào fixture. Nguồn đổi làm definition cần revalidate; bundle cũ giữ metadata/revision đã pin.

Principles auto: worker chọn theo task trong catalog. Fixed: dùng phần người dùng chọn, có thể rỗng. Hybrid: phần được chọn là bắt buộc rồi worker chọn thêm theo task. Không quota 3–8; core operating rules về quyền/bằng chứng/chất lượng luôn áp dụng. Lựa chọn automatic trong HTML là fixture xác định, không có LLM reasoning thật.

## 4. Quyền và giới hạn

Actions phải được kiểm trước hành động bằng runtime/native enforcement thực sự. `allowedTools`, prompt/skill catalog hoặc role name không tự thành security boundary. Catalog candidate không được thay settings/authority hoặc nới trần.

Harness Engineering Orchestrator có thể tự áp candidate catalog/Delegation Policy trong phạm vi đã cấp; thay đổi mở rộng quyền delegation cần quyết định người vận hành. Specialist mới trong phạm vi được phép không mặc định phải duyệt tay. [agent-delegation.md](agent-delegation.md) giữ các quyết định chi tiết, gồm context theo Assignment và escalation có liên kết/chống trùng.

`activateVerifiedRevision=allow`: tự áp bản đủ evidence/capability/compatibility trong phạm vi đã cấp. `ask`: giữ candidate, tạo yêu cầu quyết định cho lần activation. `deny`: không active; chỉ người có quyền thay authority mới mở được đường đó. Approval một lần không đổi policy `ask` thành `allow`.

Thiếu native scope đọc/ghi/test thì chặn work phụ thuộc và hỏi đúng lúc qua luồng Paseo/decision; không có provisioning form bắt buộc. Giảm trần tác động admission mới, quan sát/giải thích phần đang chạy. Timeout không có nghĩa đã thu hồi effect. Budget không có dữ liệu/enforcement thì báo unavailable, không input con số giả.

## 5. Vòng đời settings và catalog

Settings: `nháp → validate/diff → activate revision → reconcile/observed`. Một kit có revision, expected revision chống stale edit; chat/panel đi cùng invariant. Run đang chạy giữ snapshot, mặc định thay đổi áp cho lượt mới. Restore tạo revision mới và giữ audit.

Người vận hành lưu trực tiếp definition qua validation/expected revision và chủ động chọn binding; áp cho lượt mới. Harness tự sửa definitions/catalog vẫn qua candidate/eval, không được lợi dụng editor để tự tăng authority.

Catalog: `candidate → eval/regression → kiểm authority/capability/compatibility → activate → monitor → giữ/lùi/inconclusive`. Candidate phải dựa đúng catalog/release hiện hành; drift thì rebase/recheck thay vì ghi đè. Role bundle của work cũ không bị catalog mới sửa ngầm. Rollback chỉ theo bản tương thích, không tự đảo DB migration hoặc ghi đè release mới hơn.

Không cài config change-set/migration engine tổng quát ở v1. Thay đổi store/host hoặc native provider có đường quản trị/maintenance đúng nơi sở hữu, không hot-edit bằng settings của harness.

## 6. Lưu trữ và owner

Git giữ definitions/templates/skills/principles và catalog đội có version. SQLite dự kiến giữ mutable settings revisions, work/checkpoint/decision, receipts/cursors và active definition references. Artifacts lớn có reference/digest; secrets không nằm trong export/chat/log.

AgentDefinitions giữ Agent Catalog, definition revisions, role/Skill/Principle bindings và validation/resolve cấu hình agent. Work giữ admission, selected execution bundles, Assignment và dispatch; Triggers giữ code-job registry/delivery và source refs; WorkflowPrograms giữ cấu trúc procedure/program hợp lệ; Criteria giữ evidence/verdict; Releases giữ activation/monitoring/recovery. Analytics giữ queries/aggregations và Saved Views từ dữ liệu có nguồn, không thay authoritative writes của các owner trên. Hai owner mới đã được chốt tại [A01](history/architecture-a01-2026-10-23/acceptance-a01.json); không thêm Settings god module hoặc nhóm settings thứ năm.

[A02](history/architecture-a02-2026-10-23/acceptance-a02.json) chốt **Work** sở hữu revisions và Interface chỉnh **Actions, Limits, Delegation Policy** riêng theo orchestrator. UI/chat/Onboarding Tools gọi cùng validation/authority/revision; Triggers/Releases dùng cùng effective policy, không có active authority thứ hai. Recovery độc lập đọc được durable policy/ownership khi Work subprocess không sống. Work kiểm quyền ở admission và trước hành động; thu hồi quyền không bị vô hiệu bởi snapshot cũ. AgentDefinitions tiếp tục sở hữu cấu hình năng lực/catalog. Schema/coordination/native enforcement còn cần thiết kế và kiểm chứng.

[A05](history/architecture-a05-2026-10-23/acceptance-a05.json) chọn một fork repo base chứa source/tài sản harness, MCP là interface chính cho agent gọi cùng owners với UI, và direct self-mutation giới hạn trong tài sản harness sở hữu. Nguồn pstack/matt dùng chung, native profiles/provider/tool installations giữ owner riêng; cập nhật qua đúng owner path trong quyền đã cấp. Không tạo settings group mới hoặc copy native options/Skills bên ngoài thành nguồn active thứ hai. Xem [composition](harness-composition.md).

[A06](history/architecture-a06-2026-10-23/acceptance-a06.json) bổ sung instructions có version trong repo và refs ở role/definition; tri thức đúc rút có nguồn/phạm vi/mức chắc chắn, tách transcript/journal; fresh worker Session cho phần việc mới theo mặc định, reuse chỉ theo policy tương thích. Đây không phải nhóm settings mới, không thêm prompt/model editor native hoặc cho form ghi đè runtime state. Nâng bài học thành operating instructions/Skill/workflow vẫn qua candidate/check/activation; learned notes không thành active criteria hoặc quyền mới.

[A09](history/architecture-a09-2026-10-23/acceptance-a09.json) giao learned-note lifecycle/query cho Knowledge, còn Work giữ execution/context snapshots. Task-specific composition dùng registered blocks có thể validate/pin/run mà không release plugin; đăng ký tái sử dụng hoặc thay persistent code/Tool/Skill/behavior vẫn theo candidate/check/activation. Không biến một task plan thành active settings hoặc thêm nhóm thứ năm.

[A10](history/architecture-a10-2026-10-23/acceptance-a10.json) chốt shipped starter presets/templates/fixtures là versioned assets; Onboarding bind native profiles và installed Skills/Principles, không sinh provider config thứ hai. Fresh install/Onboarding chưa tự bật LLM loop/external polling. Enabled daily retro đủ điều kiện sau user Spawn Engineering và đủ bindings/quyền/cadence; polling jobs cần connection/filter/cadence và enabled state. Reload/restart giữ trạng thái đã lưu, không bật lại jobs bị tắt hoặc tự Spawn/Replace orchestrator. Cadence native vẫn thuộc Paseo; exact bridge/verification chưa được chứng minh từ quyết định này.

[A11](history/architecture-a11-2026-10-23/acceptance-a11.json) chốt explicit orchestrator Pause/Resume là durable Work control, không thêm settings group hoặc thay Stop native. Pause ngăn automatic wake/new admission của bên đó; vẫn giữ workers/results/events, independent ingestion jobs và hoạt động bên còn lại. Job enable/cadence vẫn do owner cũ quản lý; event/reload không tự Resume. Requested/observed/pending cần rõ khi phải phối hợp native cadence; không dựa canceled/idle để suy user intent.

## 7. Prototype và giới hạn

[prototype.html](prototype.html) có bốn nhóm settings, typed validation, draft/diff/conflict/sync/restore; Danh mục agent có role details, scenario selection, immutable bundle snapshots và candidate lifecycle với allow/ask/deny. [prototype-checks.md](prototype-checks.md) ghi kiểm UI; [verification.md](verification.md) giữ yêu cầu runtime.

Các native profile/skill catalogs, reasoning, eval và quyền trong HTML chỉ là fixture cục bộ. Không có discovery/enforcement/inference thật, native navigation API, scheduler hay Git/SQLite. Nguồn nghiên cứu tại [configuration-80-20-research.md](configuration-80-20-research.md); catalog 14 nhóm cũ chỉ còn là mapping lịch sử trong nghiên cứu, không scope UI hiện hành.

## T03 — deployment connection và Session MCP credentials

[T03 accepted](history/technical-t03-2026-10-23/acceptance-t03.json): plugin có thiết lập kết nối SDK một lần tới daemon hiện có, dùng public client cho startup/reconnect/reconcile. Endpoint/reference/trạng thái là deployment data; xác thực được cấp riêng tư nếu cần và không đi vào chat/export hoặc ordinary settings JSON. Bốn nhóm Agents/Limits/Actions/Automations giữ nguyên; không dựng native host/provider/profile manager thứ hai.

HTTP MCP nằm trong plugin server. Mỗi Session có token giới hạn quyền/có thể thu hồi; Paseo lưu header đó trong native Session JSON. Agent Definitions chỉ giữ native profile refs và methods/policy, không giữ token của Session cụ thể. Harness giữ verifier/binding/revocation và lọc secret khỏi receipts/Handover/UI projections/log/export/evidence. Mật khẩu daemon dùng cho SDK không được cấp cho agent. Native encryption/logging/interoperability không tự được chứng minh từ lựa chọn storage; xem [T02](technical-owner-ingress.md).

## T05 — ownership lịch có điều kiện

[T05 đã chốt](history/technical-t05-acceptance-2026-10-23/acceptance-t05.json): Automations tham chiếu native source khi đáp ứng contract; Triggers được sở hữu Schedule của harness Job nhắm code/agent/workflow khi native không đủ. Timing/overlap/missed thuộc Triggers; quyền/tài nguyên/logical Pause và dispatch thuộc Work. Mỗi Schedule có một owner; không tạo active calendar thứ hai cho cùng lịch native. Không tự migrate nguồn cũ hoặc kết luận mọi heartbeat API đã đủ.

Bốn nhóm settings giữ nguyên. UI cho biết nguồn sở hữu, chỉ sửa cadence/config ở owner tương ứng và giữ native profile/provider ở Paseo. HTML v9 chưa chứng minh lựa chọn nguồn theo contract hoặc các failure states mới; xem [prototype specification](prototype-spec.md#t05-follow-up--conditional-schedule-ownership).
