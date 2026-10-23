# Evolution

Language for developing, verifying and improving Project Harness. It includes harness work, release decisions, containment and compatible recovery.

[Glossary Map](../../../GLOSSARY-MAP.md)

Canonical English names and definitions were accepted on 2026-10-23. Existing Vietnamese wording and aliases are retained; UI labels remain separately scoped.

## Language

<a id="yeu-cau-phat-trien-harness"></a>
<a id="harness-development-request"></a>

**Harness Development Request**:
A request to build, change or improve the harness's capabilities or operation, led by the Harness Engineering Orchestrator. It does not itself change project goals or business rules.

_Vietnamese wording (retained)_: Yêu cầu xây dựng, thay đổi hoặc cải tiến năng lực và cách vận hành của bộ harness, do Harness Engineering Orchestrator chủ trì. Nó không tự thay đổi mục tiêu hay quy tắc nghiệp vụ dự án.
_Aliases_: Yêu cầu phát triển harness
_Avoid_: task sản phẩm, yêu cầu nghiệp vụ

<a id="inbox-harness"></a>
<a id="harness-inbox"></a>

**Harness Inbox**:
The work inbox for build, repair and improvement requests addressed to the Harness Engineering Orchestrator. It is separate from the Project Orchestrator's product work queue.

_Vietnamese wording (retained)_: Hộp nhận công việc dành cho Harness Engineering Orchestrator, gồm yêu cầu xây dựng, sửa lỗi và cải tiến. Đây là hàng việc tách biệt với công việc sản phẩm của Project Orchestrator.
_Aliases_: Inbox harness, Hộp thư harness
_Avoid_: backlog sản phẩm, inbox chung không phân vai

<a id="luot-retro-hang-ngay"></a>
<a id="daily-retro"></a>

**Daily Retro**:
A daily review of the Harness Engineering Orchestrator's operation and the project workflows it builds, seeking improvements supported by operating evidence.

_Vietnamese wording (retained)_: Lượt đánh giá hoạt động của Harness Engineering Orchestrator và workflow dự án do nó dựng, nhằm tìm các thay đổi cải tiến dựa trên bằng chứng vận hành.
_Aliases_: Lượt retro hằng ngày
_Avoid_: báo cáo tiến độ ngày, nhắc agent tiếp tục

<a id="improvement-loop"></a>

**Improvement Loop**:
The feedback cycle of observing harness operation, identifying a problem, proposing a change, investigating and evaluating it, and applying or discarding it before observing again. Daily Retro supports this cycle but a periodic retro alone does not constitute improvement.

_Vietnamese wording (retained)_: Vòng cải tiến harness dựa trên phản hồi vận hành: quan sát, xác định vấn đề, đề xuất thay đổi, thử nghiệm, đánh giá rồi áp dụng hoặc loại bỏ trước khi tiếp tục quan sát. Daily retro là một công việc phục vụ vòng này; việc chạy retro định kỳ tự nó chưa tạo thành vòng cải tiến.
_Avoid_: Agent Loop, chỉ riêng daily retro, tự động áp dụng mọi đề xuất

<a id="candidate"></a>

**Candidate**:
A specific proposed change submitted for verification before a decision to apply it. Creating or passing checks for a Candidate does not by itself apply that change.

_Vietnamese wording (retained)_: Một thay đổi cụ thể được đưa ra để kiểm chứng trước khi quyết định áp dụng. Candidate không mặc định đã được áp dụng chỉ vì được tạo ra hoặc đã kiểm đạt.
_Avoid_: Release đang hoạt động, thay đổi đã được áp dụng mặc định

<a id="release"></a>

**Release**:
An identified version of Project Harness specifying the code and resources that belong together. It may represent a small change and exist before activation; being a Release does not imply a major version or deep verification.

_Vietnamese wording (retained)_: Một bản phát hành có định danh của Project Harness, xác định tập code và tài nguyên đi cùng nhau. Release có thể ứng với một thay đổi nhỏ và tồn tại trước khi được đưa vào sử dụng; tên Release không tự hàm ý bản lớn hoặc đã kiểm sâu.
_Avoid_: Candidate, phiên bản đang hoạt động mặc định, chỉ một kết quả kiểm thử

<a id="activation"></a>

**Activation**:
The act of putting a version into effect. For plugin updates the activated object is a Release; creating it or passing checks does not by itself activate it.

_Vietnamese wording (retained)_: Thao tác đưa một phiên bản vào hiệu lực. Trong cập nhật plugin, đối tượng được kích hoạt là Release; kiểm đạt hoặc tạo Release chưa đồng nghĩa đã activation.
_Avoid_: kiểm thử đạt, tạo Release, mọi phiên bản đã có đều đang hoạt động

<a id="activation-target"></a>

**Activation Target**:
The Release selected as the target of an Activation. Selection does not establish that the runtime has loaded it or that it is in effect.

_Vietnamese wording (retained)_: Release được chọn làm đích của một lần Activation. Nó chưa mặc định đã được runtime nạp hoặc đang có hiệu lực.
_Avoid_: Active Release mặc định, Release đã kiểm chứng đạt mặc định

<a id="active-release"></a>

**Active Release**:
The Release actually loaded and in effect in the runtime, without implying that all mandatory checks have passed. A new Release that failed to boot is only a target, while a stopped earlier Release is no longer active.

_Vietnamese wording (retained)_: Release đã được runtime nạp và đang có hiệu lực; trạng thái này không tự chứng minh các kiểm tra bắt buộc đã đạt. Release mới không khởi động được chỉ là Activation Target, còn Release cũ đã dừng cũng không được gọi là đang active.
_Avoid_: Activation Target, bản gần nhất từng chạy, Release đã kiểm chứng đạt mặc định

<a id="recovery-release"></a>

**Recovery Release**:
The Release selected for a particular recovery operation after checking bootability and compatibility with current data. It need not be the immediately preceding Release or any version that once ran successfully.

_Vietnamese wording (retained)_: Release được chọn để phục hồi cho một operation cụ thể, đã kiểm khả năng khởi động và tương thích với dữ liệu hiện tại. Nó không nhất thiết là Release ngay trước đó hoặc mọi bản từng chạy tốt.
_Avoid_: Known-good Release, bản trước đó mặc định, backup dữ liệu

<a id="fast-path"></a>

**Fast path**:
The release path for a narrow, understood and readily correctable change, using verification directly relevant to its effects.

_Vietnamese wording (retained)_: Đường phát hành dành cho thay đổi có phạm vi ảnh hưởng hẹp, hiểu rõ và dễ sửa, với mức kiểm chứng trực tiếp liên quan tới thay đổi.
_Avoid_: không kiểm thử, mọi diff nhỏ

<a id="deep-path"></a>

**Deep path**:
The release path requiring deeper verification for a major version or a change with potentially significant effects on state, external actions, authority or self-update capability.

_Vietnamese wording (retained)_: Đường phát hành cần kiểm chứng sâu hơn, dành cho bản lớn hoặc thay đổi có khả năng gây hậu quả lớn tới trạng thái, tác động ngoài, quyền hay khả năng tự cập nhật.
_Avoid_: chỉ dựa số dòng thay đổi, kiểm toàn bộ theo lịch mặc định

<a id="feedback"></a>

**Feedback**:
Sourced information about execution or evaluation that can inform diagnosis, revision or improvement.

<a id="fix-forward"></a>

**Fix-forward**:
Repair of a contained failure through a subsequent corrective change while the affected capability is blocked and relevant state is retained for diagnosis. It requires a functioning diagnostic and repair path and does not itself restore data or permit continued use of the known-broken capability.

_Vietnamese wording (retained)_: Cách xử lý một lỗi còn kiểm soát được bằng thay đổi sửa tiếp theo, trong khi chức năng bị lỗi được chặn và trạng thái liên quan được giữ để chẩn đoán. Fix-forward đòi hỏi đường chẩn đoán và sửa lỗi còn hoạt động; nó không tự khôi phục dữ liệu hoặc cho phép tiếp tục chức năng đã xác định bị lỗi.
_Avoid_: tiếp tục chạy chức năng lỗi, tự rollback mọi patch, phục hồi dữ liệu mặc định

<a id="recovery-operation"></a>

**Recovery Operation**:
An operation to restore runnable harness code through an independent recovery path, using a release compatible with current data and retained work.

<a id="check-plan"></a>

**Check Plan**:
The candidate-specific selection of required and justified additional checks, with the affected scope, inputs, limits and reasons identified.

<a id="upstream-contribution"></a>

**Upstream Contribution**:
Separately authorized work to extract, verify and propose reusable harness improvements to an upstream project. Its acceptance is independent of applying improvements locally.

## Contextual references

These established technical terms are included for their use in this harness. Their notes do not create independent domain entities or require a separate glossary record.

<a id="hypothesis"></a>

- **Hypothesis** — A testable proposed explanation or expected effect of an improvement, informed by feedback and observations.

<a id="experiment"></a>

- **Experiment** — A planned investigation of a hypothesis using identified work, conditions and evaluation evidence. It concerns how a proposed effect is investigated, rather than the Candidate change itself.
