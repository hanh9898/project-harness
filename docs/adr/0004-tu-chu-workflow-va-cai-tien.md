# Tự chủ chọn workflow và áp dụng cải tiến có kiểm chứng

Orchestrator dự án được chọn và ghép các pattern theo từng task trong phạm vi năng lực, công cụ và giới hạn do harness orchestrator thiết lập; cấu trúc phải được kiểm tra trước khi chạy, còn yêu cầu năng lực mới đi vào inbox harness. Cách này giữ khả năng thích ứng theo task mà không giao cho orchestrator dự án quyền thay đổi không giới hạn hệ thống tạo ra nó.

Harness orchestrator tự triển khai, kiểm chứng và áp dụng cải tiến khi đạt tiêu chí, cho cả chính nó và orchestrator dự án; không yêu cầu người duyệt mặc định cho từng cải tiến. Công việc đang chạy giữ định nghĩa hiện tại; chuyển sang bản sửa khi cần tại checkpoint, có ghi nhận trạng thái và thay đổi.

Chất lượng và yêu cầu dự án là điều kiện bắt buộc; thời gian, chi phí và mức can thiệp là mục tiêu tối ưu. Mỗi cải tiến có giả thuyết, phép kiểm và bằng chứng theo dõi. Người dùng quản lý tiêu chí qua UI; tiêu chí phân biệt kết quả dự án với vận hành harness, có phạm vi toàn dự án hoặc workflow/task. Tiêu chí được nhập bằng ngôn ngữ tự nhiên để harness đề xuất cách kiểm; người dùng được thêm, sửa, bật/tắt, xem lịch sử và bằng chứng, còn mỗi kết quả giữ lại phiên bản tiêu chí đã dùng. Cách hiện thực checkpoint và xử lý tiêu chí chưa kiểm được vẫn chưa chốt.
