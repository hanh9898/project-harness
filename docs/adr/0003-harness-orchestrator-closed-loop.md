# Harness orchestrator là agent closed loop

Người dùng làm rõ harness orchestrator kế thừa concept HBU: plugin Paseo tích hợp một agent closed loop nhận việc qua inbox, dùng pstack và mattpocock skills, có job hằng ngày và daily retro để cải tiến harness cùng workflow dự án. Vì vậy thay giả định "cả hai orchestrator đều là controller bằng code" bằng ranh giới: LLM điều phối công việc phát triển harness, code cung cấp hạ tầng trạng thái, thao tác, kiểm chứng và giới hạn thực thi; hệ workflow dự án có cấu trúc và quy tắc thực thi xác định.

Giữ nguyên hai trách nhiệm điều phối, hai hàng việc/vòng đời riêng và khả năng chạy đồng thời trong một bộ cho một dự án. Hệ workflow dự án phải hỗ trợ năm pattern prompt chaining, routing, parallelization, orchestrator-workers và evaluator-optimizer, có thể ghép tuần tự, song song và lồng nhau. Thẩm quyền chọn/ghép và quy tắc áp dụng thay đổi được chốt tiếp tại [ADR 0004](0004-tu-chu-workflow-va-cai-tien.md).
