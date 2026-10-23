# Nguồn đối chiếu config: OpenCode và Pi

Ngày kiểm tra: 2026-10-22. Đã đọc [configuration.md](configuration.md) và [scope-80-20.md](scope-80-20.md). Mục tiêu: cắt config cho harness một dự án, giữ hai orchestrator, code jobs và vòng cải tiến. Dưới đây phân biệt dữ kiện nguồn với đề xuất thiết kế; không phải catalog options.

## 1. Phạm vi và phiên bản

Chỉ dùng tài liệu chính thức. [badlogic/pi-mono](https://github.com/badlogic/pi-mono) thực tế chuyển hướng sang [earendil-works/pi](https://github.com/earendil-works/pi); các nguồn Pi bên dưới thuộc repo đích. Tài liệu `main` và website có thể đi trước bản cài; chưa pin release/commit, chưa chạy kiểm chứng ứng dụng hay tích hợp Paseo. Khi triển khai phải kiểm lại schema/API theo phiên bản đang dùng.

## 2. OpenCode: settings, agents, skills

[Config](https://opencode.ai/docs/config/) dùng JSON/JSONC, gộp các nguồn thay vì thay cả file. Thứ tự tăng ưu tiên: remote defaults → global → custom file → project → `.opencode` → inline → managed settings. Project override global không có nghĩa quyền cấp trên luôn là trần bất biến; managed settings mới được mô tả là không cho người dùng override. TUI có `tui.json` riêng. Bài học: hiển thị nguồn và giá trị hiệu lực, nhưng v1 không cần sao chép toàn bộ hệ kế thừa này.

[Agents](https://opencode.ai/docs/agents/) có primary/subagent; định nghĩa qua JSON hoặc Markdown frontmatter cộng prompt. `build` mặc định bật mọi tool. Mode là vai trò vận hành, không tự chứng minh ranh giới quyền: Plan hiện vẫn theo permission của shell, và cấu hình chung có thể thay đổi mặc định hạn chế của nó. Hai orchestrator của bộ nên có bindings rõ, không suy luận quyền từ tên role.

[Skills](https://opencode.ai/docs/skills/) là `SKILL.md`, có name/description để discovery, nạp nội dung khi cần; hỗ trợ thư mục OpenCode và `.agents/skills`. `permission.skill` kiểm soát việc nạp skill. Đây là định nghĩa hành vi cần version, không phải form chứa mọi bước workflow hoặc bằng chứng rằng các lệnh trong skill đã được sandbox.

[Permissions](https://opencode.ai/docs/permissions/) phân biệt `allow/ask/deny`, rule khớp cuối thắng, agent override global. Mặc định khá mở: đa số `allow`, external directory và doom loop `ask`; `.env` bị chặn đọc theo pattern mặc định. `always` trong approval áp dụng phần còn lại của session. Harness cần phân biệt policy bền vững với quyết định runtime này; không mặc định rằng merge permission chỉ có thể siết quyền.

## 3. Pi: settings, trust và code

[Configuration](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/configuration.md) tách `~/.pi/agent/settings.json` và `.pi/settings.json`; project thường chỉ nạp sau trust, ngoại lệ `sessionDir`. Credentials, models, instructions, skills và extensions có nơi riêng. `SYSTEM.md` project được trust thay bản user tương ứng, không nối hai bản; context `AGENTS.md` có discovery riêng, không phụ thuộc trust.

[Settings](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/settings.md) cho project override user, các danh sách resource được kết hợp. `defaultThinkingLevel` hiện là `medium`; `defaultTools` là read/bash/edit/write. Tool list có tên thường để replace, `+/-` để sửa selection kế thừa. Mảng rỗng chỉ tắt built-in tools, không tắt extension/SDK tools. Không nên dùng một phép deep-merge chung cho mọi field.

[Skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md) cung cấp instructions và tài nguyên; model có thể bỏ sót skill phù hợp. [Extensions](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md) là TypeScript chạy trong process, thêm tools/hooks/commands/state. Reload thay runtime. Vì vậy skill sửa prompt và extension sửa logic phải đi qua candidate/version/evidence; không coi sửa text là triển khai cải tiến đã kiểm chứng.

## 4. Product settings khác call options và runtime

[OpenCode SDK](https://opencode.ai/docs/sdk/) có `hostname`, `signal`, timeout khởi động server và inline config; inline vẫn phối hợp file config. Timeout khởi động không phải deadline công việc. Đây là options của adapter/lần gọi, không phải tất cả đều thành settings người dùng.

[Pi SDK](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md) nhận model, thinking level, tools, resource loader, settings/session managers. Chúng là điểm tiêm dependency của programmer; CLI và SDK không mặc nhiên nạp cùng built-in extensions. Session giữ conversation, queues, compaction và model/tools hiện tại; `agent_end` chưa bảo đảm hết continuation. Không chuyển các đối tượng runtime thành config editable hay coi idle là verdict thành công.

[Pi security](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md) nói trust chỉ quyết định nạp resources, không giới hạn tool access; Pi chạy theo quyền process/OS. Extension cũng có quyền đó. `allowedTools`, tool selection hoặc frontmatter `allowed-tools` không đủ bằng chứng về secure allowlist; muốn bảo đảm phải kiểm enforcement và boundary thực tế.

## 5. Đề xuất CUT 80/20 cho bộ

Theo boundary đã chọn trong tài liệu dự án, nên kế thừa Paseo qua refs: project/workspace, provider/profile/model options, credentials/connections, native tools, chat/session, approval UI và lịch agent. Đây là đề xuất ownership, chưa xác nhận capability Paseo. Thiếu enforcement cần báo chặn; không tạo checkbox giả.

Config riêng chỉ cần bốn nhóm: binding dự án; hai role bindings và skill/definition refs; quyền workflow cùng trần worker/budget/retry; code-job cadence/enabled/timeout và retro/eval refs. Workflow, handler, evaluator ở code có version; cursor, dedupe, outbox, attempts, verdict ở runtime store. Giữ revision và snapshot hiệu lực cho work; áp thay đổi cho lượt mới. Hoãn config engine đa tầng, hot migration và catalog 14 nhóm; vẫn giữ vòng candidate → kiểm → kích hoạt → quan sát → known-good.

Code jobs nên fetch/normalize/dedupe bằng code, single-flight, retry hữu hạn; poll rỗng không gọi LLM. Các quy tắc cố định này thuộc implementation v1, chưa cần thêm knobs. Pin config giúp tái lập điều kiện chạy, không khiến đầu ra LLM deterministic.
