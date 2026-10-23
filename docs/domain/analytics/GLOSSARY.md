# Analytics

Language for operating observations, evaluation and traceable attribution. Metric formulas, schemas and grading protocols belong in their specifications.

[Glossary Map](../../../GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="metric"></a>

**Metric**:
A quantity with a defined calculation, unit and measurement scope. It is distinct from a particular recorded value.

_Vietnamese wording (retained)_: Đại lượng được định nghĩa rõ cách tính, đơn vị và phạm vi đo. Metric khác với một giá trị cụ thể được ghi nhận trong vận hành.
_Avoid_: Observation, một con số thiếu định nghĩa đo

<a id="observation"></a>

**Observation**:
A sourced and time-identified record of an actual measurement or operating event. It does not by itself establish the cause of an observed change.

_Vietnamese wording (retained)_: Một ghi nhận thực tế, có nguồn và thời điểm, có thể chứa giá trị Metric hoặc sự kiện vận hành. Observation không tự chứng minh nguyên nhân của thay đổi được quan sát.
_Avoid_: Metric, Verdict, bằng chứng nhân quả mặc định

<a id="evaluation-trial"></a>

**Evaluation Trial**:
An evaluation of a version using identified inputs, criteria and conditions. Comparing Baseline with Candidate requires sufficiently compatible Trials; one passing Trial does not establish improvement for all work.

_Vietnamese wording (retained)_: Một lượt đánh giá một phiên bản trên tập đầu vào, tiêu chí và điều kiện được xác định. So sánh baseline với candidate cần các Trials đủ tương thích; một Trial đạt chưa chứng minh cải tiến hiệu quả với mọi công việc.
_Avoid_: chỉ một lượt agent trả lời, mọi Workflow Run mặc định, so sánh vận hành bất kỳ

<a id="verdict"></a>

**Verdict**:
An Evidence-based assessment identifying the evaluated subject, scope and criterion version, including Inconclusive when warranted. It does not itself grant Activation authority or command a rollback.

_Vietnamese wording (retained)_: Kết luận đánh giá dựa trên Evidence và phiên bản tiêu chí xác định, nêu rõ đối tượng và phạm vi kết luận; “chưa đủ căn cứ” là kết luận hợp lệ. Verdict không tự cấp quyền Activation hoặc ra lệnh rollback.
_Avoid_: trạng thái agent idle/completed, quyền Activation, lệnh rollback

<a id="operational-analysis"></a>
<a id="quan-sat-van-hanh"></a>

**Operational Analysis**:
Analysis of completed work to describe quality, time, cost and signs of change between versions. Differences between work groups do not by themselves establish that a new version caused the change.

_Vietnamese wording (retained)_: Phân tích dữ liệu công việc đã diễn ra để mô tả chất lượng, thời gian, chi phí và các dấu hiệu thay đổi giữa các phiên bản. Sự khác biệt giữa các nhóm việc không tự chứng minh phiên bản mới gây ra thay đổi đó.
_Avoid_: đánh giá có kiểm soát, bằng chứng nhân quả mặc định

<a id="controlled-evaluation"></a>
<a id="anh-gia-co-kiem-soat"></a>

**Controlled Evaluation**:
Comparison of versions on identified shared work and criteria under defined evaluation conditions, informing whether a change should be retained or reversed. Insufficient data or incompatible conditions leaves the conclusion Inconclusive.

_Vietnamese wording (retained)_: So sánh các phiên bản trên cùng tập việc và tiêu chí trong điều kiện đánh giá được xác định, dùng làm căn cứ quyết định giữ hoặc lùi thay đổi. Khi chưa đủ dữ liệu hoặc điều kiện so sánh không khớp, kết quả phải giữ là chưa đủ căn cứ.
_Avoid_: chỉ so sánh số liệu vận hành trước/sau, khẳng định hiệu quả cho mọi công việc

<a id="baseline"></a>

**Baseline**:
An explicitly identified reference for comparison, such as a version or its evaluation result under particular conditions. It is not inherently the Active Release or Recovery Release.

_Vietnamese wording (retained)_: Mốc tham chiếu được xác định rõ để đối chiếu, có thể là một phiên bản hoặc kết quả đánh giá của phiên bản đó trong điều kiện cụ thể. Baseline không mặc định là Active Release hay Recovery Release.
_Avoid_: Active Release mặc định, Recovery Release mặc định, mốc so sánh không rõ phiên bản/điều kiện

<a id="comparison"></a>

**Comparison**:
A comparison of identified subjects on stated Metrics, scope and conditions. It may use operational data or Controlled Evaluation, but comparison alone does not establish causation.

_Vietnamese wording (retained)_: Phép đối chiếu các đối tượng trên Metric, phạm vi và điều kiện được nêu rõ. Comparison có thể dùng dữ liệu vận hành hoặc Controlled Evaluation; bản thân việc so sánh chưa chứng minh quan hệ nhân quả.
_Avoid_: Controlled Evaluation mặc định, kết luận nhân quả mặc định, Verdict

<a id="saved-view"></a>

**Saved View**:
Saved Analytics query and presentation settings, including Metrics, filters, grouping and comparison choices. It is not a frozen dataset or evaluation result; reopening it may show newer data under the same settings.

_Vietnamese wording (retained)_: Cấu hình cách xem Analytics đã lưu, gồm Metric, bộ lọc, cách nhóm và lựa chọn so sánh. Saved View không phải bản sao dữ liệu hay kết quả đánh giá cố định; mở lại có thể thấy dữ liệu mới theo cùng cấu hình.
_Avoid_: data snapshot, Evaluation Trial, báo cáo kết quả bất biến

<a id="check-result"></a>

**Check Result**:
The sourced outcome of a particular check on an identified Candidate and relevant inputs and environment. A post-activation health result also concerns the particular runtime instance and operation checked.

<a id="evaluation-dataset"></a>

**Evaluation Dataset**:
An identified, frozen collection of evaluation inputs with their provenance and scope, retained as an Artifact for particular evaluations.

<a id="metric-availability"></a>

**Metric Availability**:
The availability of an actual measurement for a Metric in a particular observation scope. A real numeric zero is distinct from data that is missing or cannot be measured.

<a id="attribution-policy"></a>

**Attribution Policy**:
The rule associating recorded costs with traceable work or subjects while distinguishing shared and unmeasured portions. Unallocated shared costs remain separate and are counted once in totals; estimated allocations state their method and data source.

_Vietnamese wording (retained)_: Quy tắc gắn chi phí được ghi nhận với công việc hoặc đối tượng có thể truy được nguồn, đồng thời phân biệt phần dùng chung và phần chưa đo được. Chi phí dùng chung chưa phân bổ vẫn được giữ riêng và chỉ tính một lần trong tổng; phân bổ ước tính phải nêu rõ phương pháp và nguồn dữ liệu.
_Avoid_: chia đều mặc định, tổng cộng trùng chi phí, chi phí chưa đo được là số không

## Contextual references

These established technical terms are included for their use in this harness. Their notes do not create independent domain entities or require a separate glossary record.

<a id="regression"></a>

- **Regression** — An evidence-supported worsening relative to an identified reference and applicable criteria under sufficiently comparable conditions.

<a id="evaluation-suite"></a>

- **Evaluation Suite** — An identified set of evaluation cases with the criteria and grading arrangements used to assess them.

<a id="evaluation-environment"></a>

- **Evaluation Environment** — The identified conditions relevant to an Evaluation Trial, including applicable program, model, Skill, tool and grader revisions that affect comparability.

<a id="evaluation-case"></a>

- **Evaluation Case** — A defined evaluation task or input situation with applicable criteria, used as an individual case within an evaluation suite.
