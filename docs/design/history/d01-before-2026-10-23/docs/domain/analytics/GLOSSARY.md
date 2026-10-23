# Analytics

Ngôn ngữ về quan sát và đánh giá hiệu quả vận hành. Các mục bên dưới đã chốt tên và nghĩa; công thức Metric và quy tắc đánh giá chi tiết nằm trong đặc tả riêng.

[Glossary Map](../../../GLOSSARY-MAP.md) · [Ngôn ngữ chung](../../../GLOSSARY.md)

## Language

<a id="metric"></a>

**Metric**:
Đại lượng được định nghĩa rõ cách tính, đơn vị và phạm vi đo. Metric khác với một giá trị cụ thể được ghi nhận trong vận hành.
_Avoid_: Observation, một con số thiếu định nghĩa đo

<a id="observation"></a>

**Observation**:
Một ghi nhận thực tế, có nguồn và thời điểm, có thể chứa giá trị Metric hoặc sự kiện vận hành. Observation không tự chứng minh nguyên nhân của thay đổi được quan sát.
_Avoid_: Metric, Verdict, bằng chứng nhân quả mặc định

<a id="evaluation-trial"></a>

**Evaluation Trial**:
Một lượt đánh giá một phiên bản trên tập đầu vào, tiêu chí và điều kiện được xác định. So sánh baseline với candidate cần các Trials đủ tương thích; một Trial đạt chưa chứng minh cải tiến hiệu quả với mọi công việc.
_Avoid_: chỉ một lượt agent trả lời, mọi Workflow Run mặc định, so sánh vận hành bất kỳ

<a id="verdict"></a>

**Verdict**:
Kết luận đánh giá dựa trên Evidence và phiên bản tiêu chí xác định, nêu rõ đối tượng và phạm vi kết luận; “chưa đủ căn cứ” là kết luận hợp lệ. Verdict không tự cấp quyền Activation hoặc ra lệnh rollback.
_Avoid_: trạng thái agent idle/completed, quyền Activation, lệnh rollback

<a id="quan-sat-van-hanh"></a>
<a id="operational-analysis"></a>

**Operational Analysis**:
Phân tích dữ liệu công việc đã diễn ra để mô tả chất lượng, thời gian, chi phí và các dấu hiệu thay đổi giữa các phiên bản. Sự khác biệt giữa các nhóm việc không tự chứng minh phiên bản mới gây ra thay đổi đó.
_Avoid_: đánh giá có kiểm soát, bằng chứng nhân quả mặc định

<a id="anh-gia-co-kiem-soat"></a>
<a id="controlled-evaluation"></a>

**Controlled Evaluation**:
So sánh các phiên bản trên cùng tập việc và tiêu chí trong điều kiện đánh giá được xác định, dùng làm căn cứ quyết định giữ hoặc lùi thay đổi. Khi chưa đủ dữ liệu hoặc điều kiện so sánh không khớp, kết quả phải giữ là chưa đủ căn cứ.
_Avoid_: chỉ so sánh số liệu vận hành trước/sau, khẳng định hiệu quả cho mọi công việc

<a id="baseline"></a>

**Baseline**:
Mốc tham chiếu được xác định rõ để đối chiếu, có thể là một phiên bản hoặc kết quả đánh giá của phiên bản đó trong điều kiện cụ thể. Baseline không mặc định là Active Release hay Recovery Release.
_Avoid_: Active Release mặc định, Recovery Release mặc định, mốc so sánh không rõ phiên bản/điều kiện

<a id="comparison"></a>

**Comparison**:
Phép đối chiếu các đối tượng trên Metric, phạm vi và điều kiện được nêu rõ. Comparison có thể dùng dữ liệu vận hành hoặc Controlled Evaluation; bản thân việc so sánh chưa chứng minh quan hệ nhân quả.
_Avoid_: Controlled Evaluation mặc định, kết luận nhân quả mặc định, Verdict

<a id="saved-view"></a>

**Saved View**:
Cấu hình cách xem Analytics đã lưu, gồm Metric, bộ lọc, cách nhóm và lựa chọn so sánh. Saved View không phải bản sao dữ liệu hay kết quả đánh giá cố định; mở lại có thể thấy dữ liệu mới theo cùng cấu hình.
_Avoid_: data snapshot, Evaluation Trial, báo cáo kết quả bất biến

<a id="attribution-policy"></a>

**Attribution Policy**:
Quy tắc gắn chi phí được ghi nhận với công việc hoặc đối tượng có thể truy được nguồn, đồng thời phân biệt phần dùng chung và phần chưa đo được. Chi phí dùng chung chưa phân bổ vẫn được giữ riêng và chỉ tính một lần trong tổng; phân bổ ước tính phải nêu rõ phương pháp và nguồn dữ liệu.
_Avoid_: chia đều mặc định, tổng cộng trùng chi phí, chi phí chưa đo được là số không
