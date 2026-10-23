# Plugin dày với runtime có thể phục hồi

Bản đầu dùng plugin Paseo dày để giảm số thành phần phải cài và vận hành cho một bộ đi cùng một dự án. Server plugin chứa inbox, keeper, runtime workflow, SQLite/checkpoint/reconcile, daily job và RPC/hooks; runtime được tách module trong code để có thể chuyển process sau này.

Plugin reload sẽ dừng subprocess, vì vậy trạng thái quan trọng phải lưu ngoài bộ nhớ; khởi động lại phải tìm lại agent/task, đối soát và tiếp tục từ trạng thái đã lưu. Cần đường phục hồi qua CLI hoặc bản đã kiểm chứng khi bản plugin mới không khởi động được. Reload, khôi phục và cập nhật thất bại phải được kiểm thử trước nghiệm thu; hành vi agent/provider qua các tình huống này chưa được xác minh thực nghiệm.
