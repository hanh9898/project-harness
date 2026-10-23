# Evolution

Ngôn ngữ về phát triển và cải tiến Project Harness. Phạm vi này bao gồm công việc của Harness Engineering Orchestrator.

[Glossary Map](../../../GLOSSARY-MAP.md) · [Ngôn ngữ chung](../../../GLOSSARY.md)

## Language

<a id="yeu-cau-phat-trien-harness"></a>

**Yêu cầu phát triển harness**:
Yêu cầu xây dựng, thay đổi hoặc cải tiến năng lực và cách vận hành của bộ harness, do Harness Engineering Orchestrator chủ trì. Nó không tự thay đổi mục tiêu hay quy tắc nghiệp vụ dự án.
_Avoid_: task sản phẩm, yêu cầu nghiệp vụ

<a id="inbox-harness"></a>

**Inbox harness**:
Hộp nhận công việc dành cho Harness Engineering Orchestrator, gồm yêu cầu xây dựng, sửa lỗi và cải tiến. Đây là hàng việc tách biệt với công việc sản phẩm của Project Orchestrator.
_Avoid_: backlog sản phẩm, inbox chung không phân vai

<a id="luot-retro-hang-ngay"></a>

**Lượt retro hằng ngày**:
Lượt đánh giá hoạt động của Harness Engineering Orchestrator và workflow dự án do nó dựng, nhằm tìm các thay đổi cải tiến dựa trên bằng chứng vận hành.
_Avoid_: báo cáo tiến độ ngày, nhắc agent tiếp tục

<a id="improvement-loop"></a>

**Improvement Loop**:
Vòng cải tiến harness dựa trên phản hồi vận hành: quan sát, xác định vấn đề, đề xuất thay đổi, thử nghiệm, đánh giá rồi áp dụng hoặc loại bỏ trước khi tiếp tục quan sát. Daily retro là một công việc phục vụ vòng này; việc chạy retro định kỳ tự nó chưa tạo thành vòng cải tiến.
_Avoid_: Agent Loop, chỉ riêng daily retro, tự động áp dụng mọi đề xuất


<a id="candidate"></a>

**Candidate**:
Một thay đổi cụ thể được đưa ra để kiểm chứng trước khi quyết định áp dụng. Candidate không mặc định đã được áp dụng chỉ vì được tạo ra hoặc đã kiểm đạt.
_Avoid_: Release đang hoạt động, thay đổi đã được áp dụng mặc định

<a id="release"></a>

**Release**:
Một bản phát hành có định danh của Project Harness, xác định tập code và tài nguyên đi cùng nhau. Release có thể ứng với một thay đổi nhỏ và tồn tại trước khi được đưa vào sử dụng; tên Release không tự hàm ý bản lớn hoặc đã kiểm sâu.
_Avoid_: Candidate, phiên bản đang hoạt động mặc định, chỉ một kết quả kiểm thử

<a id="activation"></a>

**Activation**:
Thao tác đưa một phiên bản vào hiệu lực. Trong cập nhật plugin, đối tượng được kích hoạt là Release; kiểm đạt hoặc tạo Release chưa đồng nghĩa đã activation.
_Avoid_: kiểm thử đạt, tạo Release, mọi phiên bản đã có đều đang hoạt động

<a id="activation-target"></a>

**Activation Target**:
Release được chọn làm đích của một lần Activation. Nó chưa mặc định đã được runtime nạp hoặc đang có hiệu lực.
_Avoid_: Active Release mặc định, Release đã kiểm chứng đạt mặc định

<a id="active-release"></a>

**Active Release**:
Release đã được runtime nạp và đang có hiệu lực; trạng thái này không tự chứng minh các kiểm tra bắt buộc đã đạt. Release mới không khởi động được chỉ là Activation Target, còn Release cũ đã dừng cũng không được gọi là đang active.
_Avoid_: Activation Target, bản gần nhất từng chạy, Release đã kiểm chứng đạt mặc định

<a id="recovery-release"></a>

**Recovery Release**:
Release được chọn để phục hồi cho một operation cụ thể, đã kiểm khả năng khởi động và tương thích với dữ liệu hiện tại. Nó không nhất thiết là Release ngay trước đó hoặc mọi bản từng chạy tốt.
_Avoid_: Known-good Release, bản trước đó mặc định, backup dữ liệu

<a id="fast-path"></a>

**Fast path**:
Đường phát hành dành cho thay đổi có phạm vi ảnh hưởng hẹp, hiểu rõ và dễ sửa, với mức kiểm chứng trực tiếp liên quan tới thay đổi.
_Avoid_: không kiểm thử, mọi diff nhỏ

<a id="deep-path"></a>

**Deep path**:
Đường phát hành cần kiểm chứng sâu hơn, dành cho bản lớn hoặc thay đổi có khả năng gây hậu quả lớn tới trạng thái, tác động ngoài, quyền hay khả năng tự cập nhật.
_Avoid_: chỉ dựa số dòng thay đổi, kiểm toàn bộ theo lịch mặc định

<a id="fix-forward"></a>

**Fix-forward**:
Cách xử lý một lỗi còn kiểm soát được bằng thay đổi sửa tiếp theo, trong khi chức năng bị lỗi được chặn và trạng thái liên quan được giữ để chẩn đoán. Fix-forward đòi hỏi đường chẩn đoán và sửa lỗi còn hoạt động; nó không tự khôi phục dữ liệu hoặc cho phép tiếp tục chức năng đã xác định bị lỗi.
_Avoid_: tiếp tục chạy chức năng lỗi, tự rollback mọi patch, phục hồi dữ liệu mặc định
