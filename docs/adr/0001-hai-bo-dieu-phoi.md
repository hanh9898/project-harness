---
status: superseded by ADR-0003
---

# Hai bộ điều phối có trách nhiệm và vòng đời riêng

Repo base cần vừa phục vụ công việc dự án vừa xây dựng, cải tiến chính năng lực harness; gộp hai trách nhiệm vào một LLM điều phối sẽ làm lẫn trạng thái, hàng việc và quyền quyết định tiến luồng. Người dùng đã chọn hai orchestrator có controller bằng code: orchestrator dự án phụ trách công việc dự án, orchestrator phát triển harness phụ trách cải tiến lõi và phần chuyên biệt của harness dự án; LLM thực hiện nhiệm vụ bên trong những luồng đó. Hai bên có hàng việc và vòng đời riêng, được chạy đồng thời; chỉ công việc phụ thuộc lỗi harness phải chờ bản sửa.

Quyết định này chưa chọn công nghệ controller, nơi lưu trạng thái hoặc cơ chế phát hành. Thay đổi riêng của dự án không tự động trở thành thay đổi của lõi. Phạm vi một bộ cho một dự án được làm rõ tại [ADR 0002](0002-mot-bo-mot-du-an.md).

Phần cả hai orchestrator là controller bằng code đã được thay thế bởi [ADR 0003](0003-harness-orchestrator-closed-loop.md). Hai trách nhiệm, hàng việc riêng và khả năng hoạt động đồng thời được giữ lại.
