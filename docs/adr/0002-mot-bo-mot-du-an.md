# Một bộ harness đi cùng một dự án

Đề xuất một orchestrator harness chung phục vụ nhiều dự án làm lệch mục tiêu của người dùng. Mỗi bộ gắn với một dự án đích: orchestrator phát triển harness dựng orchestrator dự án lên, rồi cả hai cùng vận hành và cải tiến trong bộ đó; khả năng tái sử dụng nằm ở repo base, không yêu cầu một bộ điều phối đa dự án.

Không đưa quản lý đồng thời nhiều dự án hoặc bắt buộc triển khai dự án thứ hai vào phạm vi nghiệm thu. Cách phân phối repo base, đóng gói đầu ra và công nghệ runtime chưa được quyết định.

Người dùng làm rõ đầu ra được dựng là chính orchestrator dự án; workflow là thành phần của orchestrator đó. Công nghệ và cách đóng gói đầu ra vẫn chưa chốt.
