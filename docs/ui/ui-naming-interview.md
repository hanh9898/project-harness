# UI naming interview

## Confirmed authoring order

Define the English UI term, meaning/scope and domain reference first. Confirm the corresponding Vietnamese label afterwards. Vietnamese is the display-language choice, not the source from which English terms are reverse-translated. Preserve proper names and Skill names.

Review navigation/screens → objects/actions → states/messages. Update HTML only after the corresponding label is confirmed. [UI Language](GLOSSARY.md) owns accepted entries; proposals remain here. English UI terms describe surfaces and reuse domain concepts, not a separate set of domain entities.

The previous Vietnamese-first navigation proposal was not accepted. It has been superseded by this interview order; no HTML labels were changed from it.

## Confirmed screen names and Vietnamese equivalents

**Orchestrators**, **Work Items** and **Assignments** have confirmed English names/scopes. Their owning UI definitions are [Orchestrators](GLOSSARY.md#orchestrators), [Work Items](GLOSSARY.md#work-items) and [Assignments](GLOSSARY.md#assignments). Vietnamese equivalents **Bộ điều phối**, **Yêu cầu công việc** and **Việc đã giao** are also confirmed respectively; no approval is inferred for other screen names.

Observed v8 routes: `lifecycle`, `activities`, `agents`. Labels alone did not fix the model. Prototype v9 subsequently separated Work Items/Runs and Assignments/Sessions; see the engineering glossary for current identifiers.

### Agent Catalog — English confirmed

The accepted name replaces the earlier Agent Team proposal. Definition and scope are owned by [UI Language](GLOSSARY.md#agent-catalog). It manages available Agent Definitions/capabilities rather than active sessions.

Observed fixture: route `team`; sidebar v8 uses **Danh mục agent**, while some screen content retains older labels. Vietnamese label confirmed; full HTML synchronization remains incomplete.

### Delegation Policy — English confirmed

An orchestrator-specific configuration section; definition and accepted editor scope are owned by [UI Language](GLOSSARY.md#delegation-policy). Each allowed definition has its own allowed modes. Effective constraints/errors are visible; further delegation and temporary agents are Advanced options. No repeated budget form.

Vietnamese label **Chính sách giao việc** confirmed. Mode labels Delegate → **Giao việc**, Consult → **Tham vấn**, Workflow → **Trong luồng công việc** confirmed; UI Language owns their scope/definitions.

## Confirmed Vietnamese equivalents — catalog/policy round

The following English names/scopes and Vietnamese equivalents are **confirmed**; other screen names are recorded separately:

- Agent Catalog → Danh mục agent.
- Delegation Policy → Chính sách giao việc.
- Delegate → Giao việc.
- Consult → Tham vấn.
- Workflow (mode) → Trong luồng công việc. This mode permits use within program orchestration; the label must not imply that the worker has authority to start workflows or delegate further.

## Agent lifecycle management — flow and English menu name confirmed

Project Chat and Harness Chat are withdrawn as proposed standalone navigation entries. The plugin instead provides one management menu with these lifecycle actions:

1. Spawn an **Onboarding Agent**: a native Paseo chat for initial project/harness configuration.
2. Once onboarding is complete, enable spawning the **Harness Engineering Orchestrator** to build the Project Orchestrator.
3. Once that build is complete, provide a button to spawn the **Project Orchestrator**.

No plugin-owned chat composer or mandatory chat router is implied. First launch uses Spawn; an existing Session uses Open Session. Starting a new Session is a separate explicit role handover: preserve handover/history, reconcile current work, then transfer coordination authority; the old Session cannot continue dispatching under that role. This behavior is confirmed; the replacement protocol/enforcement remains unimplemented. **Replace Session** is the accepted English action name for this handover; the confirmed Vietnamese label is **Chuyển sang cuộc trò chuyện mới**. Onboarding Agent receives an MCP Server to configure all necessary settings and guide plugin usage, choosing routine technical defaults and asking about material project/authority/budget/integration decisions. MCP scope via verified owner APIs and code-checked setup readiness are confirmed. The English menu name Orchestrators is confirmed. Its Vietnamese equivalent Bộ điều phối is also confirmed; remaining action labels and exact readiness/hand-off contracts still need review. [First-run flow](../design/first-run-ux.md) owns the journey.

## Confirmed Vietnamese equivalents — lifecycle/work round

English names/scopes were confirmed first. Confirmed labels, applied to navigation/headings in HTML; semantic fixture gaps remain explicit:

- Orchestrators → **Bộ điều phối**. The menu covers the two orchestrators and their initial onboarding action.
- Work Items → **Yêu cầu công việc**. Tracks requests and their outcomes, not individual execution runs.
- Assignments → **Việc đã giao**. Tracks portions assigned to agents, not the native Session list.

## Remaining navigation scope

English names/scopes for all current navigation entries are confirmed. Navigation names and Vietnamese equivalents are confirmed. Review object/action labels next, then states/messages. Existing route IDs do not decide accepted labels.

## Remaining review

- Confirm Vietnamese equivalents for accepted English UI terms.
- Define object/action labels, then state/message labels, using the same English-first order.
- Record domain references, observed labels, approved labels and implementation gaps explicitly.
- Preserve chat as the main interface and keep native Paseo-owned management in Paseo.

## Confirmed English navigation

Names/scopes below are confirmed. Owning definitions are in [UI Language](GLOSSARY.md); Vietnamese navigation equivalents below are now confirmed and synchronized to the prototype navigation; detailed action/state labels remain under review.

- **Overview**: current harness/project operating status, blockers and next actions.
- **Analytics**: historical metrics, operational comparisons and controlled evaluations.
- **Harness Inbox**: requests, signals and decisions addressed to Harness Engineering Orchestrator; not the project's task backlog.
- **Settings**: harness configuration, bindings, policies and limits; native resources remain owned by Paseo.
- **Jobs & Schedules**: job definitions and timing for code, agent and workflow execution, with explicit source ownership.
- **Improvements**: improvement requests/experiments, hypotheses, evidence and verdicts.
- **Releases**: versioned plugin changes and their checks/activation outcomes.
- **Recovery**: failure state, compatibility and recovery progress/guidance; not an assertion that a failed plugin can recover itself.
- **Evidence**: source/version/scoped support for claims and evaluations.
- **Audit Log**: recorded configuration, authority, decision and lifecycle changes; not chat transcripts or every tool log.

## Confirmed Vietnamese navigation labels

Confirmed and applied to navigation; some deeper content still contains observed legacy labels:

- Overview → Tổng quan.
- Analytics → Phân tích.
- Audit Log → Nhật ký thay đổi.
- Settings → Cấu hình.
- Jobs & Schedules → Tác vụ và lịch chạy.
- Improvements → Cải tiến.
- Releases → Bản phát hành.
- Recovery → Phục hồi.
- Evidence → Bằng chứng.
- Harness Inbox → Hộp thư harness.

## Vietnamese lifecycle actions — first proposal rejected

English actions/behavior remain confirmed. The user rejected all three proposed Vietnamese labels: Spawn → Khởi chạy, Open Session → Mở phiên, Replace Session → Thay phiên. Do not apply those labels or infer that the lifecycle behavior itself was rejected.

## Confirmed lifecycle actions by user intent

Confirmed and synchronized to lifecycle buttons in HTML:

- First launch labels depend on the role: Onboarding Agent → **Thiết lập dự án**; Harness Engineering Orchestrator → **Dựng harness**; Project Orchestrator → **Bắt đầu làm việc**. These are contextual labels for the existing Spawn action, not three new runtime operations. First launch still creates/starts the corresponding native Session with its intended task; a label does not mark that task complete.
- Open Session → **Mở cuộc trò chuyện**. Opens the existing native chat; does not resume execution automatically.
- Replace Session → **Chuyển sang cuộc trò chuyện mới**. Explanation must state that context/current work is handed over, history retained and old coordination authority revoked according to the replacement contract.

The proposal changes display labels only; English canonical actions and existing authority/readiness/hand-over contracts remain unchanged.

## Confirmed English execution/schedule/config action names

English names/scopes and Vietnamese labels below are confirmed. No new controls or authority are granted by these names.

- **Pause Work / Resume Work / Cancel Work**: request pause, continuation or cancellation of the selected work; requested state differs from observed execution state, and cancellation does not undo committed effects.
- **Run Now / Pause Schedule / Resume Schedule**: request one manual execution, suspend future scheduled triggers, or re-enable future triggers. Pausing a schedule does not cancel work already admitted; Run Now does not change cadence.
- **Review Changes / Apply Changes / Discard Draft**: validate and inspect the draft/diff/impact, apply an authorized valid revision, or remove unapplied edits. Apply is not a guarantee that running sessions immediately use the new configuration; Discard does not revert active configuration.

## Confirmed Vietnamese execution/schedule/config actions

Confirmed; corresponding existing prototype buttons are synchronized, with simulation notices retained:

- Pause Work → Tạm dừng công việc.
- Resume Work → Tiếp tục công việc.
- Cancel Work → Hủy công việc.
- Run Now → Chạy ngay.
- Pause Schedule → Tạm dừng lịch.
- Resume Schedule → Bật lại lịch.
- Review Changes → Xem thay đổi.
- Apply Changes → Áp dụng thay đổi.
- Discard Draft → Bỏ bản nháp.

## Confirmed English execution state labels

Confirmed labels for Workflow Run execution status; not a replacement for Work Item resolution, provider lifecycle, Schedule enablement or evaluation Verdict. Existing machine behavior is not changed by label approval. Vietnamese equivalents below are confirmed.

- Queued: accepted, waiting for admission/resources.
- Running: execution in progress.
- Paused: execution has acknowledged a pause; new execution needs resume.
- Blocked: a required dependency or condition is missing, with reason shown.
- Pausing: pause requested, not yet acknowledged as paused.
- Cancelling: cancellation requested, not yet acknowledged as cancelled.
- Completed: the Run met its mandatory completion checks; not automatically resolution of its parent Work Item or a Verdict for wider capabilities.
- Failed: the Run ended unsuccessfully, retaining outcome/evidence and reasons.
- Cancelled: cancellation took effect; history and prior effects are retained.

## Confirmed Vietnamese execution state labels

Confirmed. Applied to the root Workflow Run status in the prototype; no global badge-helper rename. Existing step and other-entity badges remain separate legacy mappings:

- Queued → Đang chờ chạy.
- Running → Đang thực hiện.
- Paused → Đã tạm dừng.
- Blocked → Bị chặn.
- Pausing → Đang tạm dừng.
- Cancelling → Đang hủy.
- Completed → Hoàn tất.
- Failed → Thất bại.
- Cancelled → Đã hủy.

## Confirmed English scoped state labels

English labels/scopes and Vietnamese equivalents below are confirmed. These do not introduce new domain states or transitions by themselves:

- **Resolved** (Work Item): its required outcome has been established against its applicable criteria; not inferred from one Run completing.
- **Enabled / Paused** (Schedule): future triggers are enabled or suspended; neither describes a currently executing Job Run.
- **Passed / Failed / Inconclusive** (evaluation Verdict): mandatory criteria met / not met / insufficient evidence to conclude; only for the evaluated subject, criteria revision and scope. Unknown or unperformed checks are not a pass or proof of failure.

## Confirmed Vietnamese scoped state labels

Confirmed; HTML synchronization must remain scoped to the corresponding entity, with no global badge rename:

- Resolved (Work Item) → Đã giải quyết.
- Enabled (Schedule) → Đang bật.
- Paused (Schedule) → Đã tạm dừng.
- Passed (Verdict) → Đạt.
- Failed (Verdict) → Không đạt.
- Inconclusive (Verdict) → Chưa đủ căn cứ.

These labels must use scope-specific mappings; do not change a shared `completed`/`failed` helper across all entities.

## Confirmed detail-object labels

Canonical English concepts and meanings are already defined in the domain glossaries. Confirmed UI equivalents; individual HTML detail fields still require synchronization:

- Workflow Run → Lượt chạy workflow: one execution of a workflow, separate from its Work Item.
- Job Run → Lượt chạy tác vụ: one job execution, separate from its Schedule.
- Outcome → Kết quả thực hiện: actual outputs, errors and remaining work of an execution.
- Verdict → Kết luận đánh giá: criterion/evidence-based scoped conclusion.
- Artifact → Tài nguyên: versioned referenceable input or output; not automatically Evidence.
- Checkpoint → **Checkpoint** (keep unchanged; “Trạng thái đã lưu” rejected): saved execution state sufficient for reconciliation/continuation; not merely a chat summary or guarantee that every effect can be replayed.

## Confirmed release/execution/measurement labels — revised release wording

The user rejected Q1's proposed release labels: Activation Target → Bản định kích hoạt; Active Release → Bản đang dùng; Recovery Release → Bản dùng phục hồi. Do not apply them. English concepts remain unchanged. The revised Q1 below and Q2 (Attempt/Quality Iteration), Q3 (Metric/Observation/Evaluation Trial) have subsequently all been confirmed.

Confirmed revised Q1 labels:

- Activation Target → **Phiên bản được chọn để kích hoạt**: the selected target; not necessarily loaded or successfully activated.
- Active Release → **Phiên bản đang có hiệu lực**: actually loaded/in effect; does not imply all verification passed.
- Recovery Release → **Phiên bản được chọn để phục hồi**: selected for this recovery operation with compatibility checks, not automatically the previous release.

These are roles of releases at a point in an operation, not three mutually exclusive kinds of release. The same version may fill more than one role when appropriate. Do not silently abbreviate the approved labels. Individual HTML fields remain to synchronize.

Confirmed Q2/Q3 labels:

- Attempt → Lần thực thi.
- Quality Iteration → Vòng hiệu chỉnh.
- Metric → Chỉ số.
- Observation → Ghi nhận (sourced observation at a specified time/scope).
- Evaluation Trial → Lượt đánh giá.

## Confirmed comparison/evolution detail labels

Canonical English meanings and Vietnamese equivalents below are confirmed. Individual HTML fields still require synchronization:

- Baseline → Mốc tham chiếu.
- Comparison → So sánh.
- Saved View → Chế độ xem đã lưu (configuration, not a frozen dataset).
- Operational Analysis → Phân tích vận hành.
- Controlled Evaluation → Đánh giá có kiểm soát.
- Candidate → Thay đổi đề xuất (not necessarily a full Release).
- Activation → Kích hoạt (bringing a version into effect, separate from checks passing).

## Confirmed agent configuration labels

English concepts/meaning and display labels below are confirmed. Owning UI definitions are in UI Language; native resources remain Paseo-owned:

- Agent Definition → Cấu hình agent: harness-owned definition, referencing ordered native profiles, Skills and Principle policy; not an active Session.
- Paseo Agent Profile → Profile Paseo: native profile managed by Paseo; no duplicate provider/model editor.
- Skill → Skill: preserve installed Skill names.
- Principle → Nguyên tắc: guidance for reasoning/decisions; preserve the individual library entry's proper name.

## Confirmed English agent configuration fields

English field/mode names, scope and Vietnamese labels below are confirmed. These name existing configuration behavior rather than adding new settings:

- **Primary Profile**: the first native profile reference used for the agent definition.
- **Fallback Profiles**: ordered alternative native profile refs eligible only under the existing fallback/capability/authority contract; not fallback to arbitrary models.
- **Principle Selection**: the policy choosing which Principles apply. Modes **Automatic** (worker chooses by task from the catalog), **Fixed** (use the configured list), **Hybrid** (configured mandatory entries plus task-selected entries). Core operating rules still apply in every mode.
- **When to Use**: situations where the agent definition is suitable for selection.
- **Result Contract**: the required structure/content/evidence of returned work, not merely a free-form final message or proof that requirements have already been met.

## Confirmed Vietnamese agent configuration fields

Confirmed; existing corresponding editor fields are synchronized. Result Contract does not acquire a new editor solely because its label was approved:

- Primary Profile → Profile chính.
- Fallback Profiles → Profile dự phòng (ordered list).
- Principle Selection → Cách chọn nguyên tắc.
- Automatic → Agent tự chọn.
- Fixed → Danh sách cố định.
- Hybrid → Kết hợp (mandatory configured list plus task-selected entries).
- When to Use → Khi nào nên dùng.
- Result Contract → Yêu cầu đầu ra (structure/content/evidence required).
