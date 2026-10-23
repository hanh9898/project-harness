# Engineering Language

Local technical language and mappings to observed code. A contextual reference does not by itself require a separate domain entity, service or storage record.

[Glossary Map](../../GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="cli"></a>

**CLI**:
A command-line interface through which users or scripts call Project Harness functions from a terminal. It is an access interface introduced for a concrete need rather than the harness itself.

_Vietnamese wording (retained)_: Interface dòng lệnh cho phép người dùng hoặc script gọi các chức năng của Project Harness từ terminal. CLI là một cách truy cập chức năng và chỉ được bổ sung khi có nhu cầu tương ứng.
_Avoid_: toàn bộ Project Harness, Workflow Runtime, thành phần bắt buộc mặc định

<a id="mcp-server"></a>

**MCP Server**:
A component exposing Project Harness capabilities as Tools through Model Context Protocol. It is an access interface; V1 uses it for the Onboarding Agent's configuration and usage-guidance needs.

_Vietnamese wording (retained)_: Thành phần cung cấp các chức năng của Project Harness dưới dạng Tools qua Model Context Protocol để agent có thể gọi. MCP Server là một cách cung cấp quyền truy cập chức năng và chỉ được bổ sung khi có nhu cầu tương ứng.
_Avoid_: toàn bộ Project Harness, Skill, thành phần bắt buộc mặc định

<a id="source-drift"></a>

**Source Drift**:
A detected difference between a resource's current source or dependency identity and the version previously checked or selected for work.

<a id="operation"></a>
<a id="tracked-operation"></a>

**Tracked Operation**:
A durably tracked request for an action whose acceptance, progress and actual effects can remain distinguishable across interruption or uncertain responses.
_Aliases_: Operation

<a id="operation-intent"></a>

**Operation Intent**:
A durable description of an intended action and its correlation to the responsible operation, distinguishable from evidence that the action actually took effect.

<a id="receipt"></a>

**Receipt**:
An acknowledgement that the particular acceptance or change declared by an interface has been durably recorded. Its meaning is limited to that declared stage rather than proving downstream execution or readiness.

<a id="reconciliation"></a>

**Reconciliation**:
Assessment of recorded intent and observations from the resource owner to establish what happened and whether work can safely continue.

<a id="admission"></a>
<a id="execution-admission"></a>

**Execution Admission**:
The code-controlled decision permitting new execution under the current pause state, resource limits, required capabilities and effective authority.
_Aliases_: Admission

<a id="run-timer"></a>

**Run Timer**:
A durable due-time associated with existing work, a step or an Attempt, whose meaning remains tied to that execution context.

<a id="operation-journal"></a>

**Operation Journal**:
A durable history of execution or operation intent, progress and observations that supports reconciliation and continuation after interruption.

<a id="recovery-executable"></a>

**Recovery Executable**:
The small recovery program packaged with the plugin but able to run outside its subprocess, including while that plugin cannot boot.

<a id="data-compatibility"></a>

**Data Compatibility**:
The ability of a selected release or recovery program to operate safely with the current data format, retained work and relevant recorded effects.

## Contextual references

These established technical terms are included for their use in this harness. Their notes do not create independent domain entities or require a separate glossary record.

<a id="idempotency-key"></a>

- **Idempotency Key** — A caller- and operation-scoped request identity used to recognize repeated submissions of the same intent. In this design, matching payloads refer back to the prior receipt, while a conflicting payload is a conflict.

<a id="retry"></a>

- **Retry** — Another permitted execution after a technical failure, distinct from a revision in response to quality feedback. A retry of step execution creates a new Attempt within the same Step Run.

<a id="timeout"></a>

- **Timeout** — The expiry of the permitted waiting period for a response or result. It does not establish that the worker stopped or that its effects were undone.

<a id="cancellation"></a>

- **Cancellation** — A request to stop selected work, distinguishable from confirmation that the stop has taken effect. Prior effects, artifacts and history remain relevant to reconciliation.

<a id="interruption"></a>

- **Interruption** — A disruption of execution or communication, such as disconnection, process reload or crash, that can leave the state of work or effects uncertain.

<a id="outbox"></a>

- **Outbox** — Pending delivery records retained with local source progress so delivery can be resumed or reconciled without losing an accepted change.

<a id="lease"></a>

- **Lease** — A time-bounded claim on dispatch or operation responsibility that does not itself prove an earlier holder can no longer cause effects.

<a id="fencing"></a>

- **Fencing** — Enforcement that rejects commands from superseded responsibility holders or execution attempts at the boundary where effects are accepted.

<a id="observed-state"></a>

- **Observed State** — The state of a resource supported by an observation at an identified time and scope, including uncertainty when a required fact has not been established.

<a id="desired-state"></a>

- **Desired State** — The requested target state of controlled work or a resource, distinct from what has actually been observed.

<a id="unknown"></a>

- **Unknown** — A qualification indicating that a required fact has not been established by available evidence.

<a id="backup"></a>

- **Backup** — A saved copy of data whose readability has been verified for the relevant preservation purpose. Its existence does not establish successful system restoration or authorize replacing current data.

<a id="deadline"></a>

- **Deadline** — A time boundary for waiting for a response or for the eligibility of an execution step. Reaching it can trigger timeout handling without proving that work or external effects have stopped.

## Ánh xạ code đang quan sát

- [Work Item](../domain/execution/GLOSSARY.md#work-item) / [Workflow Run](../domain/execution/GLOSSARY.md#workflow-run): prototype v9 dùng `S.workItems` và `S.workflowRuns` với identity riêng; `workflowRun.workItemId` là liên kết nhiều Runs về một yêu cầu. Model `submit`, `startRun`, `resolve` ở [prototype-model.js](../design/prototype-model.js) giữ phân biệt kết quả Run và giải quyết yêu cầu; routes `work-items`, `work-item/:id`, `run/:id`. Chỉ là fixture, chưa là store/runtime production.
- [Agent Definition](../../GLOSSARY.md#agent-definition): `S.agentDefinitions`, `definitionById`, `resolveDefinition` trong prototype. Property `profile` trong bundle còn có thể gây nhầm với native profile; chưa đổi identifier trong vòng này.
- [Paseo Agent Profile](../../GLOSSARY.md#paseo-agent-profile): `NATIVE_PROFILES` và `profileRefs` là fixture; native resolver thật đã khảo sát riêng ở spike.
- [Schedule](../domain/automation/GLOSSARY.md#schedule): `S.v1.schedules` gộp cadence, target, counters và history cho UI fixture; không lấy cấu trúc đó làm mô hình entity production.

- [Job Run](../domain/automation/GLOSSARY.md#job-run): records `job-run-*` trong `S.v1.schedules[*].history` và `v1RunSchedule()` là fixture theo dõi lượt thực hiện; `runId` liên kết tới một Workflow Run nếu có, không phải identity của Job Run.
- [Schedule Occurrence](../domain/automation/GLOSSARY.md#schedule-occurrence): fixture missed hiện chỉ đếm lượt và ghi một history row tổng hợp, chưa có identity riêng đủ cho mỗi Occurrence. Thuật ngữ đã chốt không chứng minh code đã hiện thực mô hình.

- [Candidate](../domain/evolution/GLOSSARY.md#candidate) / [Release](../domain/evolution/GLOSSARY.md#release) / [Activation](../domain/evolution/GLOSSARY.md#activation): `S.v1.releaseOperation` là tiến trình cập nhật, còn `S.releaseCatalog` giữ Release identity/version. `activationTargetRef` và `activeReleaseRef` là vai trò khác nhau; candidate content/identity vẫn chưa được tách hoàn toàn thành một registry production.
- [Activation Target](../domain/evolution/GLOSSARY.md#activation-target): `S.activationTargetRef` trỏ Release đã chọn, tách khỏi `S.activeReleaseRef`. `selectActivation` không tự nạp bản mới. `S.v1.releaseOperation.targetReleaseRef` pin target của operation fixture; chưa là production schema.
- [Active Release](../domain/evolution/GLOSSARY.md#active-release): prototype v9 dùng `S.activeReleaseRef` trỏ `S.releaseCatalog`, có thể null khi boot fail. Target lỗi không được đặt làm active; bản cũ đã dừng cũng không còn active. Offline vẫn giữ snapshot, chưa mô hình hóa đầy đủ observability native. Không còn biến `S.release` dùng chung.
- [Recovery Release](../domain/evolution/GLOSSARY.md#recovery-release): `S.recoverySelection` giữ operationId/releaseId/schemaRevision và kết quả kiểm fixture. `selectRecovery`/`recover` từ chối operation/schema cũ; `S.lastVerifiedReleaseRef` không tự cấp lựa chọn phục hồi. Predicate tương thích vẫn mô phỏng, chưa có probe native/production.
- [Checkpoint](../domain/execution/GLOSSARY.md#checkpoint): `a.checkpoint` trong prototype v7 là chuỗi mô tả; `r.checkpoints` giữ status/chuỗi để mô phỏng pause/resume. Đây chưa là Checkpoint đủ dữ liệu đối soát/tiếp tục; chưa có production schema. Không coi đổi tên field hoặc lưu một dòng tóm tắt là đã triển khai resume an toàn.
- [Artifact](../domain/execution/GLOSSARY.md#artifact): thiết kế `ArtifactRef` và các file log/patch/report trong spike gần nghĩa này; registry/reference contract production chưa triển khai. Digest nhận diện nội dung không tự là kết luận đúng.
- [Evidence](../domain/execution/GLOSSARY.md#evidence): `S.evidence`/`v1NewEvidence` chứa bản ghi fixture và refs, chưa chứng minh nội dung hỗ trợ tiêu chí thật. Spike Codex có validate path/quote/hash riêng; kết quả đó không chứng minh mọi kết luận agent đều đúng. Production cần liên kết nhận định, scope/criteria revision và Artifact sources, chưa chốt tên schema/type.
- [Metric](../domain/analytics/GLOSSARY.md#metric): các key `quality`, `cost`, `minutes`, `retries`, `interventions` trong Analytics fixture chưa là đầy đủ Metric specification; cách tính, đơn vị, phạm vi và xử lý missing cần đặc tả riêng.
- [Observation](../domain/analytics/GLOSSARY.md#observation): `S.v1.telemetry` chứa số liệu mẫu, không phải Observation từ vận hành thật. Startup receipts và kết quả lệnh có nguồn/thời điểm trong spike là ghi nhận thực nghiệm cho phạm vi ca kiểm đó; không suy ra số liệu production.
- [Evaluation Trial](../domain/analytics/GLOSSARY.md#evaluation-trial): `controlledTrial`/action `v1-trial` trong prototype gộp minh họa so sánh baseline/candidate thành một evidence ref, chưa có identity/result riêng cho từng Trial như mô hình đã chốt.
- [Verdict](../domain/analytics/GLOSSARY.md#verdict): `outcome`, `status` và nhãn keep/regression trong fixture dùng ở nhiều cấp, chưa là schema Verdict production. Proposed record cần nhận diện đối tượng, scope, criteria revision và Evidence refs; không đồng nhất với agent/work lifecycle hoặc authority.
- [Attempt](../domain/execution/GLOSSARY.md#attempt) / [Quality Iteration](../domain/execution/GLOSSARY.md#quality-iteration): node `attempt`/`iteration` trong cây Run fixture và các action `v1-step-retry`/`v1-step-revise` thể hiện hai counters riêng. Chưa có identity/lịch sử bền vững cho từng Attempt hoặc Quality Iteration; counter tăng không chứng minh đã có runtime retry/quality loop production.
- [Outcome](../domain/execution/GLOSSARY.md#outcome): `workflowRun.outcome` và `assignment.outcome` là kết quả riêng ở v9; ghi kết quả worker không bị kết quả tổng hợp Run ghi đè. Controls cũ mô phỏng một worker có nguồn `fixture-run-propagation`. Các field `outcome` trong evidence/trial fixtures vẫn có semantics cũ cần rà riêng; không rename tất cả thành Verdict.
- [Assignment](../domain/execution/GLOSSARY.md#assignment) / [Agent Session](../domain/execution/GLOSSARY.md#agent-session): v9 dùng `S.assignments` và `S.agentSessions`. Assignment có `runId`, `sessionId`, bundle snapshot và Outcome riêng; Session không giữ một `activity`/`bundle` làm nguồn trạng thái giao việc. Một Session có nhiều Assignments theo thời gian. `assign`/`recordAssignmentOutcome` và routes `assignment/:id`, `session/:id` thể hiện quan hệ; provider dispatch/fencing vẫn chưa triển khai.
- [Operational Analysis](../domain/analytics/GLOSSARY.md#operational-analysis) / [Controlled Evaluation](../domain/analytics/GLOSSARY.md#controlled-evaluation): `S.v1.analytics.mode` dùng `observed`/`controlled` làm view selector. Đổi selector không tạo nguồn dữ liệu hay biến quan sát thành đánh giá có kiểm soát; production query/evaluation contracts chưa triển khai.
- [Baseline](../domain/analytics/GLOSSARY.md#baseline): `r.base` và `i.baseline`/`i.oldRelease` có vai trò khác nhau trong fixtures release/improvement. Không coi mọi field `base` là Baseline đánh giá hoặc đổi chúng thành một recovery ref; cần kiểm đúng đối tượng tham chiếu trước khi đặt tên production.
- [Comparison](../domain/analytics/GLOSSARY.md#comparison): Analytics fixture có chế độ observed/controlled và lựa chọn revision, chưa có comparison identity hoặc hợp đồng đầy đủ về dataset/criteria/environment. Hiển thị chênh lệch không tự là Verdict về hiệu quả candidate.
- [Saved View](../domain/analytics/GLOSSARY.md#saved-view): `S.v1.views[*].filters` và actions `v1-view-save`/`v1-view-load` lưu cấu hình view cục bộ. Đây không là snapshot dữ liệu hay kết quả Evaluation Trial; persistence/query production chưa triển khai.

## Model source và phạm vi hiện tại

[prototype-model-notes.md](../design/prototype-model-notes.md) ghi schema/relations, interface, cách đồng bộ model inline và các giới hạn v9. Các identifier trên là implementation của fixture đã kiểm, chưa là hợp đồng persistence/API production.

## Quy tắc tên code

Nghĩa nghiệp vụ lấy từ glossary sở hữu. Tên type/field/API/event đề xuất phải ghi proposed, kèm identifier hiện có và đường dẫn khi có code; chưa có code thì không ghi implemented. Cơ chế kỹ thuật mới chỉ thêm định nghĩa khi đã làm rõ cách dùng cục bộ. Không coi tên biến phát sinh trong prototype là quyết định thuật ngữ.
