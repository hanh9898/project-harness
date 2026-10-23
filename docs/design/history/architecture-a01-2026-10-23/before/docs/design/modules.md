> Bổ sung ranh giới 2026-10-22: [paseo-boundary.md](paseo-boundary.md) quy định nguồn Paseo sở hữu native profiles/provider catalog/native cadence/workspace; harness sở hữu agent definitions tham chiếu profile native chính/fallback và thêm skills/principles; Triggers giữ binding nguồn Paseo và lịch/runner cho code jobs của harness; không nhân đôi cùng một lịch agent.

# Thiết kế deep modules

Thiết kế interface • 2026-10-23 • [Mục lục](README.md). Các TypeScript sketches là hợp đồng của harness, không phải SDK Paseo hoặc implementation đã chạy. [verification.md](verification.md) sở hữu ca kiểm và spike.

## 1. Module ownership và depth

Chat trực tiếp là interface chính của hai orchestrator. Panel phục vụ harness config/inbox/monitor; CLI/RPC và các adapter đi qua cùng interface nghiệp vụ phù hợp. Caller không phải phối hợp SQLite, Git, provider và recovery protocol. Work phân biệt owner, scope và origin channel; không tạo router LLM chung bắt buộc.

| Module | Sở hữu | Complexity giấu khỏi caller |
| --- | --- | --- |
| Triggers | Lịch/nguồn wake, occurrence, delivery | Cron policy, revision, missed/overlap, native bindings |
| Work | Hai inbox, execution, timers, supervision | Admission, operation intent, checkpoint, reconcile |
| WorkflowPrograms | Viết/kiểm composition | Tính tương thích schema, route/join/loop, mở rộng worker |
| Criteria | Scope/revision, evidence và verdict | Resolve/freeze, evaluator bindings, so sánh baseline |
| Releases | Candidate, activation và recovery | Kiểm digest/evidence, compatibility, recovery tương thích dữ liệu |

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

Keeper nhận diện hai orchestrator theo logical owner, claim lease/fencing trước dispatch, nhận lại worker còn tồn tại và tạo session mới với handoff khi cần. Agent hết turn không đồng nghĩa cần thay thế ngay; permission, blocked, paused và budget phải được giữ đúng. Heartbeat chỉ là một đầu vào wake từ Triggers.

Retry, deadline chờ worker, decision timeout và bước “chờ đến thời điểm X” của một workflow là timer đã journal trong Work. Timer gắn work/node/attempt; hết hạn cũ không được tác động lên attempt mới. Timer tới hạn chỉ làm bước đủ điều kiện xử lý, vẫn qua admission và chính sách pause. Không dùng Triggers tạo task mới cho mỗi lần retry nội bộ.

Checkpoint chứa program/node/attempt, definition/criteria/policy revisions, operation intent và correlation, quyết định đang mở, result/artifact refs và bước tiếp theo. Context package và handoff giữ nguồn/provenance; không lấy toàn transcript làm nguồn sự thật duy nhất. Worker phải lưu evidence trước khi workspace bị archive; kết quả của session cũ về muộn không vượt fencing để ghi đè session mới.

WorkSnapshot và WorkSummary chứa origin (manual/trigger/feedback), parent/correlation, lý do blocked, desired/observed state, phiên bản và evidence refs. Traces/metrics lấy từ journal/outcome đã định danh; thời gian, retry, can thiệp và token/cost khi provider đo được có trạng thái unknown thay vì số 0 giả. Tập dữ liệu retro/eval được freeze thành artifact có phạm vi thời gian và run refs; không buộc UI hoặc agent parse log tự do để suy trạng thái.

Supervisor trong plugin không thể hồi sinh chính subprocess khi nó không được host chạy. Plugin host khởi động implementation và reconcile; cấu hình bootstrap cần nêu cơ chế khởi động lại daemon/plugin hoặc thao tác vận hành. Releases giữ executable recovery độc lập để phục hồi khi plugin không boot/mất khả năng tự sửa. Chưa chọn thêm daemon supervisor/OS service, không khẳng định heartbeat tự chữa được host chết.

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

Work + hai orchestrator → WorkflowPrograms → công cụ theo role
                                    ↓
                         Criteria → outcome / evidence
                                    ↓
                     Bàn giao trong chat tương ứng

Riêng công việc cải tiến:
  candidate + evidence → Releases → activation / monitoring
                                          ↓
                            verdict → inbox harness
```

Task thủ công có thể đi thẳng Work; không bắt mọi caller tạo trigger. Hai orchestrator nhận context riêng; runtime giữ vòng thực thi, vận hành và dữ liệu để vòng cải tiến có đầu vào. Không tạo vòng phụ thuộc import: Triggers dùng Work qua interface giao việc; Work dùng definition/policy/evidence đã pin, không gọi ngược Triggers. Releases nhận candidate/evidence; Work chạy các code step gọi Releases khi được cấp quyền. Composition root host các module, lập lịch reconcile và nối các wake; không chứa luật nghiệp vụ.

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

Bindings CLI/RPC/MCP chuyển thao tác sang đúng interface sở hữu; skills pstack/matt hướng dẫn cách ra quyết định, không cài timer hoặc thay transaction. MCP Server có caller V1 là Onboarding Agent để cấu hình và hướng dẫn plugin; adapter mới không nhân đôi invariant hoặc cho agent ghi trực tiếp store.

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

Bootstrap còn nhận timezone, nguồn trigger được phép, queue bounds, retention và host startup/recovery configuration. Mutable trigger revisions ở SQLite; cấu hình/mẫu trong Git chỉ trở thành active qua thao tác có revision. Không sao chép policy vào cả skill, plugin callback và CLI.

Catalog config chi tiết tại [configuration.md](configuration.md). Mỗi field/binding chỉ rõ module owner, scope, inheritance, capability, active revision và apply mode. Chat/panel/CLI dùng cùng validation, expected revision và diagnostics. Run pin effective config; thay model/skill/tool/program mặc định tác động lượt mới, còn trần/quyền bị siết cần admission/enforcement có trạng thái quan sát rõ. Change set nhiều nhóm phải có activation/compatibility protocol, không giao caller tự ghi từng module rồi dispatch với config lai. Schema metadata tại composition root không thay invariant trong module hoặc sinh thêm Settings god module.

Internal seam của adapter không tự trở thành phần interface công khai của module. Một adapter chưa đủ lý do tạo seam; ở Paseo đã có hai nhu cầu cụ thể: production SDK và scripted adapter để tái tạo lỗi/mất phản hồi. Không dựng Store plugin, transport framework hay MCP adapter giả trước khi có biến thể dùng thật.

## 9. Bố cục và locality

```text
src/
  triggers/      # source bindings, policy, receipt/delivery
  work/          # interface + implementation vòng đời công việc
  workflows/     # interface tác giả và kiểm composition
  criteria/      # revision, scope, evaluator bindings, verdict
  releases/      # candidate, activation và recovery độc lập plugin
  paseo/         # adapter thật tại internal seam runtime cần
  plugin/        # UI/RPC và host lifecycle
  cli/           # adapter commands + entrypoint recovery
harness/         # closed loop, role/skill bindings và retro
project/         # Project Orchestrator được dựng
```

Đây là cách tổ chức module trước; chưa cần mỗi thư mục thành package publish riêng. Types/schema ở cạnh interface sở hữu chúng; chỉ chia sẻ vocabulary thật sự chung, tránh một `contracts` package thành nơi mọi module phụ thuộc mọi payload.

Work đổi retry không làm UI biết thêm protocol. WorkflowPrograms đổi kiểm composition không đòi sửa CLI. Criteria đổi cách resolve scope không lan vào daily prompt. Releases đổi protocol activation không bắt worker tự gọi các bước Git/DB/reload. Đó là locality cần đo trong review sau này.

Triggers đổi source adapter không làm daily skill học lại receipt/dedupe. Xóa một native schedule không được xóa work history; Work đổi keeper không làm caller giữ raw agent ID. Artifact/journal storage và telemetry query là implementation nội bộ hiện tại, chưa mở thêm generic Memory, EventBus hay Metrics module.

## 10. Lát cắt triển khai và phần chưa xác minh

Lát cắt đầu tiên hiện hành: [Onboarding MCP → config → readiness/Handover → user Spawn Engineering → reconnect/reconcile](onboarding-implementation.md). Work sở hữu lifecycle operations, stage reservations và Orchestrator Session Binding; settings/definitions giữ owner và active revisions hiện có. Menu RPC/MCP dùng cùng interface; không thêm public module hoặc một nguồn config active thứ hai.

Sau khi lát cắt này đạt bằng chứng tích hợp, mở Work submit/read với project execution, source Paseo/Backlog/GitLab qua Triggers, rồi daily/eval và Releases monitoring. Five-pattern runtime, scheduler tổng quát và Analytics vẫn thuộc V1; thứ tự này không cắt chúng khỏi scope. Chưa có runtime production hoặc job thật.

Test qua interface với SQLite/FS/Git thật tạm, scripted Paseo adapter và fake clock. Live contract tests mới kiểm chứng được provider/scheduler/host thật. Xem [verification.md](verification.md) và [research.md](research.md).

## Bổ sung đã chốt — GA01 allocation identity

Work giữ một Assignment cho mỗi lần giao agent work cụ thể. Khi retry/fallback được phép thực sự redispatch, tạo Assignment mới và giữ predecessor; retry kỹ thuật giữ Step Run và tạo Attempt mới. Session có thể tái sử dụng, nhưng Assignment đã giao không bị đổi recipient tại chỗ. Trường hợp mất response hoặc tiếp tục qua nhiều Turns giữ identity cũ để đối soát. Không ép code-only Attempts có Assignment hoặc đồng nhất Assignment/Attempt/Turn.

Late results ghi dưới Assignment/Attempt gốc, chỉ reuse sau kiểm applicability/Evidence; thay Session orchestrator giữ nguyên các worker allocations đang chạy. Quy tắc đã chốt tại [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance), chưa phải schema/implementation runtime hoặc quyết định concurrency per Session.
