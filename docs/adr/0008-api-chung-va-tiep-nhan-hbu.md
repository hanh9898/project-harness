# API nghiệp vụ chung và tiếp nhận HBU có chọn lọc

UI/RPC, CLI cho người dùng/agent và MCP adapter khi cần cùng gọi API nghiệp vụ của runtime, dùng chung các quy tắc trạng thái và kiểm tra quyền. Cách này giữ một nguồn hành vi cho inbox, dispatch, kết quả, tiêu chí và cải tiến, thay vì mỗi đường vào có một bộ luật thực thi riêng.

Dựng repo base mới và tiếp nhận từng concept/công cụ từ HBU sau khi xác lập hợp đồng cùng test độc lập. Quy tắc chuyên biệt HBU được giữ ở phần dự án/ví dụ; hệ HBU đang vận hành không bị sửa hoặc migrate trong công việc thiết kế này. Repo mới có thể vận hành như fork và đóng góp cải tiến dùng chung về upstream theo cấu hình, độc lập với việc dùng bản sửa local.
