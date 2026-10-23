# Khôi phục có đối soát và cô lập thực thi theo vai trò

Hệ thống lưu tiến độ cùng định danh mỗi lần thực thi để khôi phục sau gián đoạn; khi kết quả thao tác chưa rõ, đối soát trạng thái thực tế trước khi thử lại. Cách này ưu tiên tiếp tục từ bằng chứng đã có thay vì chạy lại toàn bộ, nhưng không giả định exactly-once với mọi dịch vụ ngoài hệ thống.

Worker ghi code dùng worktree riêng với phạm vi và đầu ra rõ ràng; worker chỉ đọc có thể chia sẻ bản nguồn cố định. Orchestrator chịu trách nhiệm tích hợp. Bộ công cụ và quyền được khai báo theo vai trò, cưỡng chế tại runtime; provider thiếu giới hạn bắt buộc thì báo thiếu capability và không chạy âm thầm với quyền rộng hơn.

Chưa chọn storage, cơ chế lease/checkpoint hoặc cách provider thực hiện từng giới hạn. Các khả năng đó phải được kiểm chứng khi chọn tích hợp.
