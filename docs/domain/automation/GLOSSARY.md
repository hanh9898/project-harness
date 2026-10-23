# Automation

Language for eligible work, schedules, source changes and delivery. A scheduled occurrence, a Job Run and an agent execution have distinct meanings.

[Glossary Map](../../../GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="job"></a>

**Job**:
Work activated for a defined purpose, such as task synchronization, pull-request checking or a retrospective. A Job may execute code or use an agent and does not inherently require an Agent Session.

_Vietnamese wording (retained)_: Công việc có thể được kích hoạt để thực hiện một mục đích xác định, như đồng bộ task, kiểm tra PR hoặc chạy retro. Job có thể thực hiện bằng code hoặc giao cho agent, không mặc định cần một Agent Session.
_Avoid_: Schedule, mặc định là một agent hoặc Workflow Run

<a id="schedule"></a>

**Schedule**:
A rule determining when a Job becomes due, such as an interval or a time of day. The Schedule determines timing while the Job determines the work.

_Vietnamese wording (retained)_: Quy tắc xác định thời điểm kích hoạt Job, như theo khoảng thời gian hoặc một giờ trong ngày. Schedule xác định khi nào kích hoạt; Job xác định công việc cần thực hiện.
_Avoid_: Job, Agent Session, toàn bộ cơ chế thực thi công việc

<a id="job-run"></a>

**Job Run**:
An execution of a Job, activated by a schedule or manually. A successful Job Run need not create a Work Item or Workflow Run, as with a synchronization that finds no new data.

_Vietnamese wording (retained)_: Một lần thực hiện Job, được kích hoạt theo lịch hoặc thủ công. Job Run thành công không mặc định tạo Work Item hoặc Workflow Run, chẳng hạn một lượt đồng bộ không tìm thấy dữ liệu mới.
_Avoid_: Job, Schedule Occurrence, Workflow Run

<a id="schedule-occurrence"></a>

**Schedule Occurrence**:
A due occurrence under a Schedule's rule. Policy may skip, coalesce or queue it, so it is distinct from an executed Job Run; a manual Job Run needs no scheduled Occurrence.

_Vietnamese wording (retained)_: Một lượt đến hạn theo quy tắc của Schedule. Occurrence có thể bị bỏ qua, gom hoặc xếp chờ theo policy nên không đồng nhất với một Job Run được thực hiện; Job Run thủ công không cần Occurrence từ lịch.
_Avoid_: Job Run, Schedule, một công việc chắc chắn đã được thực hiện

<a id="trigger"></a>

**Trigger**:
A time, event or manual condition under which a Job or other work target becomes eligible for activation.

<a id="trigger-binding"></a>

**Trigger Binding**:
A revisioned association between an identified activation source and a harness work target, together with the supported delivery and admission policies.

<a id="source-event"></a>

**Source Event**:
An identified source object or change normalized from an integration for downstream processing, with identity independent of the time it was polled.

<a id="delivery"></a>
<a id="work-delivery"></a>

**Work Delivery**:
The tracked handoff of a source activation or change to durable harness work, whose acceptance is distinct from execution of that work.
_Aliases_: Delivery

<a id="job-handler"></a>
<a id="code-job-handler"></a>

**Code Job Handler**:
Registered, versioned code that performs a Job using validated inputs and reports its result and relevant source progress or evidence.
_Aliases_: Job Handler

<a id="overlap-policy"></a>

**Overlap Policy**:
The per-Job rule for activations that arrive while an earlier execution is still running, allowing skipped new work, one queued execution or bounded parallel execution.

<a id="missed-occurrence-policy"></a>

**Missed Occurrence Policy**:
The per-Job rule for due occurrences missed while execution was unavailable, allowing skips, one coalesced execution or bounded catch-up.

<a id="integration"></a>

**Integration**:
An authorized connection and adapter for an external task or code-review source used by the harness, with Backlog tasks and GitLab merge requests and comments in V1.

<a id="native-cadence"></a>
<a id="paseo-cadence"></a>

**Paseo Cadence**:
The native Paseo-owned timing, timezone and enablement of an agent schedule or heartbeat referenced by the harness.
_Aliases_: Native Cadence

## Contextual references

These established technical terms are included for their use in this harness. Their notes do not create independent domain entities or require a separate glossary record.

<a id="cursor"></a>
<a id="source-cursor"></a>

- **Source Cursor** — A committed marker of progress in an integration source stream. It records source progress without by itself establishing downstream work delivery.
_Aliases_: Cursor
