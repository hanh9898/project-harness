> Bổ sung ranh giới 2026-10-22: [paseo-boundary.md](paseo-boundary.md) quy định nguồn Paseo sở hữu native profiles/provider catalog/native cadence/workspace; harness sở hữu agent definitions tham chiếu profile native chính/fallback và thêm skills/principles; Triggers giữ binding nguồn Paseo và lịch/runner cho code jobs của harness; không nhân đôi cùng một lịch agent.

# Thiết kế deep modules

Thiết kế interface • 2026-10-23 • [Mục lục](README.md). Các TypeScript sketches là hợp đồng của harness, không phải SDK Paseo hoặc implementation đã chạy. [verification.md](verification.md) sở hữu ca kiểm và spike.

## 1. Module ownership và depth

Chat trực tiếp là interface chính của hai orchestrator. Panel phục vụ harness config/inbox/monitor; CLI/RPC và các adapter đi qua cùng interface nghiệp vụ phù hợp. Caller không phải phối hợp SQLite, Git, provider và recovery protocol. Work phân biệt owner, scope và origin channel; không tạo router LLM chung bắt buộc.

| Module | Sở hữu | Complexity giấu khỏi caller |
| --- | --- | --- |
| AgentDefinitions | Agent Catalog, definition revisions, role/Skill/Principle bindings | Validation/resolve nguồn, native refs, lựa chọn bundle hợp lệ |
| Triggers | Lịch/nguồn wake, occurrence, delivery | Cron policy, revision, missed/overlap, native bindings |
| Work | Hai inbox; Actions/Limits/Delegation Policy; execution, timers, supervision | Policy revisions/enforcement, admission, operation intent, checkpoint, reconcile |
| WorkflowPrograms | Viết/kiểm composition | Tính tương thích schema, route/join/loop, mở rộng worker |
| Criteria | Scope/revision, evidence và verdict | Resolve/freeze, evaluator bindings, so sánh baseline |
| Releases | Candidate, activation và recovery | Kiểm digest/evidence, compatibility, recovery tương thích dữ liệu |
| Analytics | Queries/aggregations và Saved Views | Tổng hợp xuyên nguồn, provenance, phạm vi so sánh và missing data |

Hai module bổ sung được chốt ở [A01](history/architecture-a01-2026-10-23/acceptance-a01.json); trách nhiệm/Interface ở [§11](#11-module-agentdefinitions--catalog-và-cấu-hình-agent) và [§12](#12-module-analytics--truy-vấn-và-saved-views). Đây là module trong cùng plugin, không phải process/store/settings group mới. [A02](history/architecture-a02-2026-10-23/acceptance-a02.json) chốt Work sở hữu revisions và Interface chỉnh Actions/Limits/Delegation Policy, receipt trước chat acknowledgement và startup dựa vào Paseo hiện có. Các method/schema/protocol sketches vẫn cần thiết kế chi tiết và kiểm chứng.

Một module có depth khi bỏ nó sẽ khiến invariant/ordering/recovery lan ra nhiều caller. Interface gồm type, quyền, lỗi, cấu hình, ordering và cách chờ; không đo depth bằng số method. Internal seam cho dependencies thực sự biến đổi; không tạo Store/EventBus/Memory framework chỉ để mock.

Work giữ timer thuộc run/node/attempt; Triggers giữ thời điểm nộp việc mới hoặc wake. Keeper, artifacts/context và traces nằm trong implementation sở hữu invariant, chưa tách thêm module công khai.

## 2. Module Triggers — từ nguồn Paseo đến công việc bền vững

**Caller:** Harness Engineering Orchestrator, panel quản lý binding/policy, CLI; adapter nguồn native nhận callback/wake. Không sở hữu form tạo lịch agent Paseo; sở hữu quản lý lịch và runner code jobs.

**Seam:** gắn nguồn kích hoạt với code handler hoặc agent program/inbox/logical owner; che correlation, dedupe và giao việc bền vững. Caller không phải biết thứ tự ghi receipt và Work.

```ts
type CodeJobSpec = {
  handler: { name: string; revision: string }; // handler đã đăng ký, không shell tùy ý
  trigger: { kind: "cron"; expression: string; timezone: string }
         | { kind: "interval"; everyMs: number };
  inputs: ArtifactRef[];
  enabled: boolean;
  timeoutMs: number;
  overlap: "skip" | "queueOne";
  missed: "skip" | "coalesce";
};
interface Triggers {
  saveJob(input: {
    requestId: string; id: string; expectedRevision: number | null;
    spec: CodeJobSpec;
  }): Promise<BindingReceipt>;
  controlJob(input: {
    requestId: string; id: string; expectedRevision: number;
    action: "pause" | "resume" | "runOnce";
  }): Promise<BindingReceipt>;
  bind(input: {
    requestId: string;
    id: string;
    expectedRevision: number | null;
    source: { kind: "paseo-schedule" | "paseo-heartbeat"; ref: string };
    target: { owner: "harness" | "project"; program: ProgramRef };
    policy: {
      overlap: "skip" | "queueOne" | "queueAll";
      missed: "skip" | "latest" | "all";
    };
  }): Promise<BindingReceipt>;
  read(id: string, after?: Cursor): Promise<BindingView>;
}
```

Sketch trên minh họa một phần Interface, không cắt phạm vi lịch V1. One-time schedule, chạy song song có giới hạn và bounded catch-up trong [scope](scope-80-20.md#bộ-quản-lý-lịch-tổng-quát) vẫn bắt buộc; schema/validation và native adapter cần mở đủ theo hợp đồng đã chốt. Không coi các union minh họa này là bộ policy V1 hoàn chỉnh hoặc capability đã chứng minh.

### Interface ngoài types

- Receipt xác nhận binding/policy của harness đã commit; không xác nhận native schedule đã chạy. `requestId` có idempotency và expected revision chống sửa stale.
- Với nguồn native, cadence/timezone/enable thuộc Paseo; `BindingView` chỉ đọc snapshot/fingerprint nguồn và cảnh báo drift. Không mirror chúng thành editable active policy trong SQLite.
- Adapter resolve đúng host/source/target, kiểm authority/capability và revalidate trước nhận lượt. Sửa/xóa source native không xóa work/evidence cũ.
- Callback có occurrence/correlation đã kiểm được mới giao Work bằng stable key. Delivery accepted sau Work commit; mất phản hồi đối soát receipt trước retry. Không hứa exactly-once effect.
- `overlap` là workflow admission, không khẳng định native engine có cùng semantics. `missed` chỉ nhận khi adapter chứng minh có đủ occurrence evidence; thiếu thì `UnsupportedPolicy`, không bỏ option hoặc tự dựng cron bù.
- Pause native source chặn các lượt sau theo hợp đồng đã kiểm; Work.control tác động work đã nhận. Nếu cần tắt binding riêng thì retirement có revision, không bí mật đổi lịch gốc.
- Native heartbeat hướng tới existing session, còn workflow wake hướng logical owner. Session bị thay phải reconcile/rebind theo API thực; không tạo orchestrator thứ hai chỉ vì timer tới hạn.
- Lỗi typed: source missing/drift, unsupported policy, forbidden, revision conflict, unavailable. Read phân trang receipts/history; không chờ agent hoặc đọc toàn transcript.

### Implementation và adapter

SQLite giữ source references, code-job definitions/revisions, cursor/run/lease, policy, receipt/outbox và WorkRef. Paseo giữ cấu hình lịch agent gốc; harness scheduler chỉ chạy code jobs nó sở hữu, không scan phát lại lịch Paseo. Reconcile xử lý pending receipt, source drift, code jobs bị ngắt và work đang có; timer deadline/retry thuộc Work.

Production Paseo adapter và scripted adapter ở internal seam; không suy từ UI lịch rằng SDK đã đủ identity/replay. Chỉ thêm event source khi có nhu cầu và hợp đồng nguồn đã kiểm. Host tắt thì plugin không chạy; heartbeat không thay startup/recovery.

Code-job handler trả `{ outcome: "unchanged" | "changed", cursor, events, evidence }` theo schema đã đăng ký. `unchanged` không nộp agent work. Event identity theo nguồn/object/change revision, không dùng timestamp poll; delta trùng qua nhiều kỳ không tạo task mới. Cursor/normalized events/outbox commit nguyên tử nếu cùng store; API ngoài không nằm trong transaction. Handler crash/timeout giữ cursor đã commit, retry bounded và không gọi LLM để tự đoán trạng thái.

**Deletion test:** bỏ module sẽ đẩy correlation, receipt/dedupe, source drift và workflow admission về caller. Module có depth khi che các luật này, không phải khi bọc `paseo schedule create`.

## 3. Module Work — vòng đời công việc bền vững

**Caller:** chat binding của hai orchestrator, CLI người dùng/agent, panel quản trị qua RPC; MCP adapter cho các thao tác được cấp trong onboarding/role tương ứng, với [lifecycle implementation specification](onboarding-implementation.md).

**Seam:** caller nộp một công việc hoặc điều khiển công việc hiện có, nhận receipt/snapshot đã commit. Caller không ghi state, điều khiển worker SDK hoặc tự gọi checkpoint/reconcile.

Sketch TypeScript dưới đây là interface đề xuất của harness, không phải SDK Paseo:

```ts
type WorkOwner = "harness" | "project";
type WorkRef = { owner: WorkOwner; id: string };

type Control =
  | { kind: "pause" }
  | { kind: "resume" }
  | { kind: "cancel" }
  | {
      kind: "answer";
      decisionId: string;
      expectedDecisionRevision: number;
      answer: string;
    };

interface Work {
  submit(input: {
    requestId: string;
    to: WorkOwner;
    intent: string;
    inputs: ArtifactRef[];
  }): Promise<WorkReceipt>;

  read(ref: WorkRef): Promise<WorkSnapshot>;
  list(query: WorkQuery): Promise<Page<WorkSummary>>;

  control(input: {
    requestId: string;
    ref: WorkRef;
    expectedRevision: number;
    action: Control;
  }): Promise<ControlReceipt>;
}
```

Chọn bốn method thay vì ép về ba để `read` và `list` có shape rõ. Interface thật còn gồm bốn biến thể control, schemas, lỗi và các quy tắc dưới đây; không gọi nó nhỏ chỉ dựa vào con số bốn.

### Operating policy Interface — A02 đã chốt owner

Work sở hữu revisions và Interface đọc/chỉnh Actions, Limits và Delegation Policy riêng của hai orchestrator. Surface chỉnh policy tách khỏi `Work.control` cho một work item; không biến `Control` thành command union chứa mọi cấu hình. UI/RPC và agent Tools trong quyền được cấp gọi cùng owner validation, expected revision và audit. AgentDefinitions cung cấp catalog/definition hợp lệ, không tự cấp quyền sử dụng.

Work áp dụng effective policy tại admission và trước hành động. Triggers/Releases dùng cùng policy hiện hành qua protocol phối hợp; không giữ active policy thứ hai. Shared policy không buộc recovery offline gọi một Work subprocess đã chết: code recovery phải đọc/kiểm được durable policy và ownership phù hợp. Chọn schema, transaction, reservations và cơ chế writer fencing vẫn là engineering/proof work.

Run/Assignment giữ policy revision để truy vết; việc mở rộng quyền áp cho lượt mới. Thu hồi quyền phải kiểm ở hành động tiếp theo theo [agent-delegation.md](agent-delegation.md); pin revision không giữ một grant đã bị thu hồi. Harness candidate không tự nới quyền/budget; native enforcement vẫn cần kiểm từng provider. Các quy tắc này giữ nghĩa đã chốt, không hứa chỉ có Tool allowlist là đủ chặn shell/native effects.

### Native chat acceptance — A02 đã chốt

Orchestrator diễn giải hội thoại và gọi Tool qua Work cho task mới; thay quyết định/config dùng đúng owner Interface. Chỉ thông báo đã nhận/ghi nhận sau Receipt bền vững cùng reference. Transcript còn giữ hội thoại, nhưng message xuất hiện tại Paseo chưa chứng minh runtime đã nhận work. Agent dừng trước owner commit thì chưa có work acceptance; commit xong nhưng response/ack mất thì đối soát cùng request identity, không submit lại bằng key mới. A02 không yêu cầu adapter tự thu mọi message trước diễn giải; transport/correlation và Tool delivery là phần cần kiểm tiếp.

### Invariant và ordering

- `submit` trả sau khi ghi bền vững công việc và nhu cầu đánh thức xử lý, không đợi agent hoặc hứa đã dispatch.
- `requestId` có scope theo caller và thao tác. Cùng id/payload trả receipt cũ; khác payload báo conflict. Scope cụ thể phải có trong hợp đồng transport.
- Principal đã được xác minh được bind tại adapter/composition root. `to` chỉ chọn inbox, không cấp quyền. Caller không tự gửi role đặc quyền để được tin.
- Nhận task và dựng plan là hai giai đoạn. Chọn definition/tiêu chí/role revision rồi pin trước thực thi; không bắt `submit` chờ LLM để lập toàn bộ plan.
- Chia việc động ghi thành phần mở rộng của plan trong journal, được kiểm theo policy/giới hạn đã pin. Không dùng chữ “pin” để cấm pattern orchestrator-workers.
- `pause` chặn admission mới. Snapshot phân biệt yêu cầu pause với việc worker thực sự đã dừng/checkpoint; không hứa interrupt tức thời với mọi provider.
- `cancel` giữ artifact và trạng thái side effect cần đối soát. Resume hoặc answer không tự biến kết quả thành đạt tiêu chí.
- Revision cũ, decision đã đóng hoặc reply không thuộc work item bị từ chối. Điều khiển retry không sửa kết quả terminal đã công nhận.
- `completed` cần kết quả hợp schema và bằng chứng đạt tiêu chí bắt buộc. Turn kết thúc, lời agent báo xong và kết quả đạt là các dữ kiện khác nhau.

### Lỗi, quan sát và thời gian chờ

Input/quyền/revision/store không khả dụng là lỗi tại interface. Sau khi đã nhận việc, lỗi provider, thiếu capability, budget hoặc cần người quyết định được giữ thành trạng thái có lý do; timeout của caller không tự hủy việc.

`read`/`list` đọc projection đã commit, có pagination và reference tới artifact; không gọi provider hoặc tải cả transcript để dựng một hàng UI. Chưa có cam kết latency số học trước đo thực tế. Live event chỉ thông báo đọc lại; cursor/snapshot recovery là hợp đồng của Work, không làm caller học cursor SDK Paseo.

### Implementation được giấu

Work giữ transaction/claim, admission, execution intent, retries, worker correlation, checkpoint, reconcile, status projection và điều kiện terminal. Logic dự án nằm trong workflow được dựng; nội dung skill/retro nằm ở orchestrator harness. Work không chứa rule HBU, nội dung evaluator từng dự án hoặc logic publish GitHub.

### Supervisor, timer và context thuộc Work

Keeper nhận diện hai orchestrator theo logical owner, claim lease/fencing trước dispatch và nhận lại worker/native binding còn tồn tại. Tạo hoặc thay Session orchestrator phải qua Spawn/Replace do người dùng chủ động, Handover và chuyển authority theo [onboarding implementation §9](onboarding-implementation.md#9-replace-session-và-authority); mất binding không tự cấp quyền tạo bản thay thế. Worker redispatch vẫn theo admission và GA01. Agent hết turn không đồng nghĩa cần thay thế ngay; permission, blocked, paused và budget phải được giữ đúng. Heartbeat chỉ là một đầu vào wake từ Triggers.

Retry, deadline chờ worker, decision timeout và bước “chờ đến thời điểm X” của một workflow là timer đã journal trong Work. Timer gắn work/node/attempt; hết hạn cũ không được tác động lên attempt mới. Timer tới hạn chỉ làm bước đủ điều kiện xử lý, vẫn qua admission và chính sách pause. Không dùng Triggers tạo task mới cho mỗi lần retry nội bộ.

Checkpoint chứa program/node/attempt, definition/criteria/policy revisions, operation intent và correlation, quyết định đang mở, result/artifact refs và bước tiếp theo. Context package và handoff giữ nguồn/provenance; không lấy toàn transcript làm nguồn sự thật duy nhất. Worker phải lưu evidence trước khi workspace bị archive; kết quả của session cũ về muộn không vượt fencing để ghi đè session mới.

WorkSnapshot và WorkSummary chứa origin (manual/trigger/feedback), parent/correlation, lý do blocked, desired/observed state, phiên bản và evidence refs. Traces/metrics lấy từ journal/outcome đã định danh; thời gian, retry, can thiệp và token/cost khi provider đo được có trạng thái unknown thay vì số 0 giả. Tập dữ liệu retro/eval được freeze thành artifact có phạm vi thời gian và run refs; không buộc UI hoặc agent parse log tự do để suy trạng thái.

Supervisor trong plugin không thể hồi sinh chính subprocess khi nó không được host chạy. A02 chọn startup Paseo/máy hiện có hoặc thao tác mở Paseo, rồi plugin tự reconcile; V1 không thêm một OS bootstrap riêng tự bật host sau mọi crash/reboot. Releases giữ executable recovery độc lập cho activation khi plugin không boot/mất khả năng tự sửa. Executable được khởi chạy trước reload không chứng minh tự sống qua reboot. Timer/missed jobs được đối soát khi executor trở lại, không ghi nhận như đã chạy lúc host tắt.

**Deletion test:** bỏ Work sẽ làm quyền, ordering và recovery xuất hiện lại trong chat/CLI/panel và hai orchestrator. Nếu implementation chỉ forward trong khi caller vẫn tự phối hợp các bước, module còn shallow.

## 4. Module WorkflowPrograms — viết và kiểm composition

**Caller:** Harness Engineering Orchestrator khi dựng/cải tiến Project Orchestrator; runtime khi chuẩn bị một plan. Người dùng giao task không phải caller của combinator.

**Interface:** các composition `chain`, `route`, `parallel`, `workers`, `optimize`, cùng thao tác kiểm/chuẩn hóa definition thành program có version và diagnostics. Một composition được chứa composition khác. Đây là interface riêng cho việc viết chương trình, không là tập command điều khiển từng node đang chạy.

**Implementation:** kiểm input/output schema, nhánh route, dependency, cách join, loop/stop policy, template worker, role/capability requirements và giới hạn độ mở rộng. TypeScript giúp tác giả, còn dữ liệu qua process/file vẫn validate runtime. Không giả định toàn bộ chương trình là DAG thuần.

Module thuần in-process trong phần kiểm/chuẩn hóa; không cần dựng adapter hoặc module riêng cho mỗi loại pattern. I/O của code step được runtime thực thi theo quyền, không diễn ra lúc chỉ validate definition. Không thực thi chuỗi mã do agent trả về như một cách bỏ qua quá trình kiểm/phát hành code step.

Daily retro, research định kỳ và cải tiến là program được version hóa trong `harness/`, dùng cùng pattern/composition và Work như task khác. Program cải tiến tạo hypothesis và candidate, chạy eval, đề nghị activation rồi theo dõi. Triggers chỉ nộp task template hoặc wake; không chứa prompt điều khiển riêng toàn bộ vòng cải tiến.

**Deletion test:** nếu bỏ module, rules composition xuất hiện trong builder, dispatcher và test fixtures; module có leverage. Nếu chỉ là năm wrapper quanh SDK, nó chưa giữ đúng complexity.

## 5. Module Criteria — tiêu chí, revision và kết luận

**Caller:** Project Orchestrator làm rõ tiêu chí dự án; Harness Engineering Orchestrator làm rõ tiêu chí vận hành; panel quản trị cho config phù hợp; Work pin criteria và xử lý evidence.

**Interface đề xuất:** chỉnh một tiêu chí với revision kỳ vọng; đọc catalog/lịch sử; resolve/freeze tập tiêu chí theo scope; kết luận từ tập tiêu chí đã freeze cùng bằng chứng đánh giá. Không cho caller viết trực tiếp một cờ `passed` vào DB.

**Implementation:** scope toàn dự án/workflow/task, mandatory/optimization, revision và bật/tắt, provenance diễn giải, evaluator/rubric bindings, trạng thái chưa đánh giá được, xác minh evidence và aggregate kết quả. Tiêu chí/config được chỉnh qua chat hoặc panel có một nguồn hiện hành trong SQLite; Git giữ schema/evaluator/mẫu và export có chủ đích.

Evaluator cần LLM hoặc tool được Work chạy như một phần workflow, rồi trả evidence có định danh. Criteria kết luận trên đúng evidence/revision đã nhận, không tạo một vòng dispatch ngầm gọi ngược Work. Phải phân biệt input hợp schema với nội dung đánh giá đáng tin; cần contract/live tests cho evaluator thực.

Đổi tiêu chí không viết lại kết luận cũ. Mâu thuẫn hoặc thiếu phép kiểm đủ tin tạo yêu cầu quyết định; task đang chạy vẫn giữ revision đã pin trừ chuyển tại checkpoint đã ghi nhận.

Baseline/eval evidence phải nhận diện dataset/suite, trial, environment, program/model/skills/tool revisions, criteria và grader revision. Criteria phân biệt verdict bắt buộc với mục tiêu tối ưu; so sánh candidate/baseline có thể trả `inconclusive` khi thiếu hoặc không tương thích bằng chứng. Một lần pass hay score tự chấm cao hơn không tự chứng minh cải tiến; cỡ mẫu, grader calibration và ngưỡng là policy có version.

**Deletion test:** bỏ Criteria sẽ làm UI, evaluator và daily retro tự cài scope, override và cách kết luận khác nhau. Không tạo generic repository interface cho từng bảng chỉ để mock.

## 6. Module Releases — candidate, kích hoạt và phục hồi

[Release policy](release-policy.md) và [release-execution.md](release-execution.md) sở hữu thiết kế release hiện hành: Fast/Deep path, checkpoint theo ảnh hưởng, fix-forward và recovery độc lập.

**Caller:** orchestrator harness khi cải tiến, UI đọc kết quả, CLI phục hồi khi plugin mới không khởi động.

**Interface đề xuất:** ghi nhận candidate có digest; kích hoạt candidate với bằng chứng kiểm chứng và expected-active revision; đọc trạng thái thao tác; phục hồi từ bản đã kiểm chứng. Không đưa promotion/recovery vào `Work.control`.

**Implementation:** buộc evidence khớp đúng candidate, kiểm tương thích definition/store, ghi intent trước khi reload, giữ nhận diện bản đã kiểm chứng và đường khởi động CLI độc lập plugin đang lỗi. Receipt của activate xác nhận thao tác đã nhận bền vững, không giả định promise sống qua reload subprocess.

Khôi phục mã không tự khôi phục SQLite; migration cần đường tương thích/backup/phục hồi được chứng minh. CLI online và offline recovery phải có điều kiện sở hữu/fencing để không cùng ghi khi runtime khác còn active. Bằng chứng spike và các giới hạn tại [release-verification-results.md](release-verification-results.md); chưa có protocol production đầy đủ.

Cải tiến local và contribution upstream là công việc riêng qua Work. Module này không buộc chờ upstream hoặc mặc định thêm adapter GitHub khi chưa chọn đích.

Candidate có liên kết hypothesis, baseline, eval/regression evidence và phạm vi thay đổi (code/skill/workflow/tool binding). Kiểm bắt buộc trước/sau activation đạt thì release đạt, không có monitoring gate cố định. Tiếp tục quan sát qua Work/Triggers khi cần; lỗi khoanh vùng được đi fix-forward, không boot/mất khả năng tự sửa mới recovery độc lập. Không chạy rollback mù nếu migration store hoặc side effect đã làm bản cũ không tương thích.

**Deletion test:** bỏ Releases làm worker/CLI/plugin callback tự giữ protocol “kiểm gì rồi đổi bản nào”, đặc biệt khi bản mới lỗi. Module phải giấu protocol đó, không chỉ gọi `plugin reload`.

## 7. Luồng phối hợp và bề mặt công cụ của agent

```text
Chat dự án ───────────────────────→ Work(owner=project)
Chat / panel phía harness ─────────→ Work(owner=harness)
Schedule / heartbeat / event → Triggers → Work

Work chuẩn bị thực thi:
  ← WorkflowPrograms: program đã kiểm
  ← AgentDefinitions: definition revision / bundle hợp lệ
  ← Criteria: criteria revisions đã freeze
Work → admission / Assignment → Paseo adapter / công cụ theo role
Work nhận result / evidence → Criteria kết luận → Work giữ Outcome
                                                ↓
                                  Bàn giao trong chat tương ứng

Riêng công việc cải tiến:
  candidate + evidence → Releases → activation / monitoring
                                          ↓
                            verdict → inbox harness

Work / Criteria / Releases → dữ liệu có nguồn → Analytics
                                             ↓
                             dashboard / Saved Views / retro
```

Task thủ công có thể đi thẳng Work; không bắt mọi caller tạo trigger. Theo A02, native chat đi qua orchestrator diễn giải → owner Tool → Receipt trước acknowledgement, không mặc định có message adapter capture mọi hội thoại. Hai orchestrator nhận context riêng; runtime giữ vòng thực thi, vận hành và dữ liệu để vòng cải tiến có đầu vào. Triggers giao việc qua Work; Work dùng program, definition/bundle và criteria đã kiểm/pin, không gọi ngược Triggers. WorkflowPrograms kiểm composition, Work mới thực thi Tools. Releases nhận candidate/evidence; Work chạy code step gọi Releases trong quyền đã cấp. Analytics đọc dữ liệu có nguồn, không gọi lại các module để thay Outcome/Verdict hoặc tự dispatch agent. Composition root nối các Interface/ports và wake, tránh import vòng; không chứa luật nghiệp vụ.

Ví dụ giả mã cho daily, không phải lời gọi SDK đã kiểm chứng:

```ts
await triggers.bind({
  requestId: "bind:daily-retro:v1",
  id: "daily-retro",
  expectedRevision: null,
  source: { kind: "paseo-schedule", ref: selectedNativeSchedule },
  target: { owner: "harness", program: dailyRetroProgram },
  policy: { overlap: "queueOne", missed: "skip" },
});
// Cadence/timezone chỉnh tại Paseo; occurrence identity cần contract test.
// Adapter giao Work sau khi resolve callback; code jobs dùng runner riêng, không phát lại lịch Paseo.
```

Ví dụ chỉ gắn nguồn, không tự tạo lịch thật. Harness Engineering Orchestrator được cấp công cụ quản lý trigger và cải tiến; Project Orchestrator chỉ được dùng tập cần thiết, gửi yêu cầu năng lực mới về inbox harness. Không cấp quyền đổi lịch hệ thống, release hoặc criteria bắt buộc chỉ vì agent gọi được CLI/MCP.

Bindings CLI/RPC/MCP chuyển thao tác sang đúng interface sở hữu; skills pstack/matt hướng dẫn cách ra quyết định, không cài timer hoặc thay transaction. Theo [A05](history/architecture-a05-2026-10-23/acceptance-a05.json), MCP là interface chính cho Onboarding, hai orchestrator và specialists thao tác harness theo authority. UI/MCP dùng cùng owner services; adapter không nhân đôi invariant hoặc cho agent ghi trực tiếp store. CLI phục vụ recovery/scripts; code handlers gọi Interface nội bộ. Native Tools và integrations ngoài harness không mặc định phải bọc lại thành MCP Tools của bộ.

## 8. Dependencies và vị trí seam

| Dependency | Category | Cách dùng/kiểm |
| --- | --- | --- |
| Composition, policy, chuẩn hóa/kết luận | In-process | Kiểm trực tiếp qua interface module, không adapter. |
| SQLite | Local-substitutable | DB thật tạm trong test, cùng transaction/query như production; không MemoryStore giả định. |
| Artifact filesystem và Git | Local-substitutable | Thư mục/repo Git tạm; không mock chuỗi lời gọi shell để thay bằng chứng hành vi. |
| Paseo SDK/provider lifecycle | True external | Internal seam với production adapter và scripted test adapter; cần contract/live tests để kiểm giả định về daemon/provider. |
| Paseo scheduler/event delivery | True external | Production binding và scripted adapter tại internal seam của Triggers; kiểm mất/trùng/lệch revision, rồi thử native thật. Không mặc định có SDK schedule method khi chưa kiểm. |
| Clock | Internal dependency khi thời gian thực sự biến đổi | Fake clock cho due time, retry, lease, daily và máy ngủ; không dùng sleep dài. |
| Plugin reload/process lifecycle | External host | Callback start/stop gắn implementation; fake host phục vụ fault test và thử reload thật sau. |

Composition root nhận cấu hình bộ, repo roots, store/artifact roots, role/skill bindings, budget và lịch; tạo rồi inject các adapter thật. Caller nghiệp vụ không truyền SQLite connection, provider SDK hay clock mỗi lần submit.

Bootstrap còn nhận timezone, nguồn trigger được phép, queue bounds, retention và bindings cho startup Paseo/recovery hiện có. Theo A02, không thêm một cấu hình dịch vụ OS riêng như yêu cầu V1 mặc định. Mutable trigger revisions ở SQLite; cấu hình/mẫu trong Git chỉ trở thành active qua thao tác có revision. Không sao chép policy vào cả skill, plugin callback và CLI.

Catalog config chi tiết tại [configuration.md](configuration.md). Mỗi field/binding chỉ rõ module owner, scope, inheritance, capability, active revision và apply mode. Chat/panel/CLI dùng cùng validation, expected revision và diagnostics. Run pin effective config; thay model/skill/tool/program mặc định tác động lượt mới, còn trần/quyền bị siết cần admission/enforcement có trạng thái quan sát rõ. Change set nhiều nhóm phải có activation/compatibility protocol, không giao caller tự ghi từng module rồi dispatch với config lai. Schema metadata tại composition root không thay invariant trong module hoặc sinh thêm Settings god module.

Internal seam của adapter không tự trở thành phần interface công khai của module. Một adapter chưa đủ lý do tạo seam; ở Paseo đã có hai nhu cầu cụ thể: production SDK và scripted adapter để tái tạo lỗi/mất phản hồi. Không dựng Store plugin, transport framework hay MCP adapter giả trước khi có biến thể dùng thật.

## 9. Bố cục và locality

```text
src/
  agent-definitions/ # catalog, revisions, bindings, validation/resolve
  triggers/      # source bindings, policy, receipt/delivery
  work/          # interface + implementation vòng đời công việc
  workflows/     # interface tác giả và kiểm composition
  criteria/      # revision, scope, evaluator bindings, verdict
  releases/      # candidate, activation và recovery độc lập plugin
  analytics/     # queries/aggregations, provenance, Saved Views
  paseo/         # adapter thật tại internal seam runtime cần
  plugin/        # UI/RPC và host lifecycle
  cli/           # adapter commands + entrypoint recovery
harness/         # closed loop, role/skill bindings và retro
project/         # Project Orchestrator được dựng
```

Đây là cách tổ chức module trước; chưa cần mỗi thư mục thành package publish riêng. Types/schema ở cạnh interface sở hữu chúng; chỉ chia sẻ vocabulary thật sự chung, tránh một `contracts` package thành nơi mọi module phụ thuộc mọi payload.

Work đổi retry không làm UI biết thêm protocol. WorkflowPrograms đổi kiểm composition không đòi sửa CLI. Criteria đổi cách resolve scope không lan vào daily prompt. Releases đổi protocol activation không bắt worker tự gọi các bước Git/DB/reload. Đó là locality cần đo trong review sau này.

Triggers đổi source adapter không làm daily skill học lại receipt/dedupe. Xóa một native schedule không được xóa work history; Work đổi keeper không làm caller giữ raw agent ID. AgentDefinitions đổi cách resolve nguồn không bắt editor/dispatcher tự ghép bundle. Analytics đổi tổng hợp không bắt UI/daily tự join dữ liệu. Artifact/journal storage và telemetry collection vẫn thuộc implementation của nguồn; Analytics sở hữu truy vấn/tổng hợp và Saved Views theo A01. Không mở generic Memory, EventBus hay Metrics framework.

## 10. Lát cắt triển khai và phần chưa xác minh

Lát cắt đầu tiên hiện hành: [Onboarding MCP → config → readiness/Handover → user Spawn Engineering → reconnect/reconcile](onboarding-implementation.md). Work sở hữu lifecycle operations, stage reservations, Orchestrator Session Binding và Actions/Limits/Delegation Policy revisions theo A02; AgentDefinitions là owner của catalog/definition revisions và agent bindings theo A01. Menu RPC/MCP dùng cùng Interface, không tạo nguồn config active thứ hai. Analytics là owner queries/Saved Views cho các lát cắt đọc tiếp theo.

Sau khi lát cắt này đạt bằng chứng tích hợp, mở Work submit/read với project execution, source Paseo/Backlog/GitLab qua Triggers, rồi daily/eval và Releases monitoring. Five-pattern runtime, scheduler tổng quát và Analytics vẫn thuộc V1; thứ tự này không cắt chúng khỏi scope. Chưa có runtime production hoặc job thật.

Test qua interface với SQLite/FS/Git thật tạm, scripted Paseo adapter và fake clock. Live contract tests mới kiểm chứng được provider/scheduler/host thật. Xem [verification.md](verification.md) và [research.md](research.md).

## Bổ sung đã chốt — GA01 allocation identity

Work giữ một Assignment cho mỗi lần giao agent work cụ thể. Khi retry/fallback được phép thực sự redispatch, tạo Assignment mới và giữ predecessor; retry kỹ thuật giữ Step Run và tạo Attempt mới. Session có thể tái sử dụng, nhưng Assignment đã giao không bị đổi recipient tại chỗ. Trường hợp mất response hoặc tiếp tục qua nhiều Turns giữ identity cũ để đối soát. Không ép code-only Attempts có Assignment hoặc đồng nhất Assignment/Attempt/Turn.

Late results ghi dưới Assignment/Attempt gốc, chỉ reuse sau kiểm applicability/Evidence; thay Session orchestrator giữ nguyên các worker allocations đang chạy. Quy tắc đã chốt tại [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance), chưa phải schema/implementation runtime hoặc quyết định concurrency per Session.

## 11. Module AgentDefinitions — catalog và cấu hình agent

**Đã chốt A01:** một owner cho Agent Catalog, Agent Definition revisions và role/Skill/Principle bindings; cung cấp cấu hình hợp lệ cho lần giao việc. **Caller:** editor Agents/catalog qua UI/RPC, Onboarding MCP trong quyền được cấp, Harness Engineering khi xây candidate, Work khi chuẩn bị dispatch.

**Interface cần cung cấp:** đọc/catalog và lịch sử revisions; tạo/sửa/nhân bản definitions/bindings bằng validation và expected revision; resolve một revision cùng các nguồn/native profile refs thành lựa chọn hợp lệ cho dispatch. Đây là phạm vi trách nhiệm đã duyệt; tên method, payload, transaction và diagnostics cụ thể chưa được duyệt như API production.

Interface che cách kiểm nguồn Skills/Principles, native references, entry-procedure requirements, nguyên tắc fixed/auto/hybrid và drift. Resolve không tự tạo native profile hoặc dispatch agent. Work ghi lựa chọn/bundle vào execution state, giữ admission/Assignment và kiểm quyền hiện hành; có definition hợp lệ không tự có quyền dùng nó. Paseo tiếp tục sở hữu provider/model/profile gốc; thiếu native ref hoặc nguồn bắt buộc tạo lỗi có lý do, không âm thầm tự chế cấu hình thay thế.

Người vận hành sửa qua validation/revision trong quyền của mình. Harness tự cải tiến catalog/definitions qua candidate, Criteria/evidence và Releases theo policy hiện hành. Module không mở thêm đường activation hoặc tự nới quyền. Theo A02, Work là owner của Delegation Policy, Actions và Limits; AgentDefinitions không sở hữu các policy này chỉ vì chúng tham chiếu definition.

**Deletion test:** bỏ module sẽ khiến editor, MCP và Work lặp lại validation/resolve/binding revision hoặc tự ghép bundle khác nhau. Catalog là cấu hình năng lực, không phải danh sách Sessions sống; không tạo discovery/runtime state store thứ hai.

## 12. Module Analytics — truy vấn và Saved Views

**Đã chốt A01:** owner queries/aggregations xuyên Work, Criteria và Releases, cùng Saved Views. **Caller:** dashboard qua UI/RPC; daily retro và agent có quyền đọc qua cùng logic truy vấn. A05 chọn MCP cho agent thao tác harness; exact Tool/transport contract và authority vẫn cần thiết kế, không mở toàn quyền MCP cho mọi agent.

**Interface cần cung cấp:** truy vấn có filter/group/time scope, so sánh các phiên bản trong phạm vi dữ liệu tương thích, drill-down tới nguồn/evidence; đọc/lưu/sửa Saved View có revision. UI/agent không nhận arbitrary SQL hoặc phải tự parse transcript. Tên method/schema, công thức metrics, độ mới dữ liệu và giới hạn truy vấn còn cần thiết kế/đo.

Module nguồn giữ authoritative writes: Work giữ trạng thái/Outcome/usage, Criteria giữ tiêu chí/evidence/Verdict, Releases giữ activation/check/recovery evidence. Analytics chỉ đọc các nguồn/projections đã định danh; không dispatch evaluation, sửa Verdict hay suy thành công từ số liệu thiếu. Kết quả phải giữ provenance, scope/revisions và trạng thái missing/unavailable, phân biệt quan sát vận hành với đánh giá có kiểm soát. Saved View lưu cách truy vấn/trình bày, không thay artifact dataset đã freeze để làm eval.

**Deletion test:** bỏ module sẽ đẩy joins, scope/provenance và xử lý missing vào dashboard, daily retro và từng caller. Có thể dùng cùng SQLite và adapters hiện hành; không mặc định thêm telemetry service, database hoặc collection framework.
