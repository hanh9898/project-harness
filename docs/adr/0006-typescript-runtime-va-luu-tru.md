# TypeScript, runtime nền và ba lớp lưu trữ

Dùng TypeScript làm ngôn ngữ chính cho plugin, CLI, runtime và các hợp đồng dữ liệu để cùng làm việc với SDK Paseo và giảm lặp hợp đồng giữa nhiều ngôn ngữ. Công cụ Python/shell có thể được gọi qua adapter. Harness orchestrator dựng orchestrator dự án từ định nghĩa workflow, role, context, skill, tool, criteria và eval có version trên runtime nền của bộ, thêm code step đặc thù khi cần.

Git giữ mã và định nghĩa có version; SQLite cục bộ giữ inbox, run, checkpoint, journal và lịch sử quyết định/tiêu chí; file giữ artifact lớn được tham chiếu bằng đường dẫn cùng dấu nhận diện nội dung. Phân biệt ba loại này để tránh dùng chat/plugin memory hoặc sửa file định nghĩa thay cho trạng thái thực thi. Transaction không bao gồm tác động ngoài SQLite, nên vẫn cần đối soát với Paseo và các dịch vụ ngoài.

Process topology bản đầu được chốt tiếp tại [ADR 0007](0007-plugin-day-runtime-phuc-hoi.md): plugin dày, runtime tách module và state bền vững. Chưa chọn framework workflow hoặc driver SQLite; quy tắc repo/fork và đóng góp upstream ở bản kiến trúc tổng hợp.
