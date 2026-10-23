# Nguồn skills của worker Paseo/Codex

Đối chiếu session thử nghiệm `01a1625f-ec72-7dd1-87dd-b5b69114208e`, Codex CLI `0.163.0`, ngày 2026-10-22. Không tạo agent mới hoặc thay cấu hình discovery để khảo sát này.

Nguồn bằng chứng: `agent.commands()` đã lưu trong round2-evidence; developer skill catalog/alias roots trong native archived session; `SKILL.md`, plugin manifests và `agents/openai.yaml` trên máy. [Mapping đủ 68 skills](../../spikes/paseo-contract/evidence/skill-origins.json) ghi tên, đường dẫn, nhóm nguồn và việc có trong prompt ban đầu hay không.

> **Quyết định mới nhất — 2026-10-22:** người dùng bỏ yêu cầu per-agent skill isolation. Chỉ định tường minh Skills khi giao việc là đủ; giữ catalog kế thừa. Dừng hướng fork, monkey patch và spike hook/env. Các phần khảo sát bên dưới là bằng chứng tham khảo, không còn là blocker hoặc kế hoạch triển khai hiện hành.

## Nguồn của catalog 68 skills

| Nhóm | Số | Đường dẫn thực tế | Ghi chú |
|---|---:|---|---|
| Codex system | 5 | `~/.codex/skills/.system/*/SKILL.md` | imagegen, openai-docs, skill-creator, skill-installer, review-agent |
| Matt Pocock plugin | 27 | `~/.codex/plugins/cache/mattpocock/mattpocock-skills/1.3.1/skills/` | Gồm `codebase-design` đã chọn. Manifest `.claude-plugin/plugin.json` khai đúng 27 skill directories; các thư mục in-progress/misc khác trong cache không được tính |
| OpenAI templates plugin | 20 | `~/.codex/plugins/cache/openai-curated-remote/openai-templates/0.1.1/skills/` | Các artifact-template-*; manifest trỏ `./skills/` |
| OpenAI curated plugins khác | 10 | `~/.codex/plugins/cache/openai-curated-remote/` | pages 4 (0.1.23), plugin-management 1 (0.1.0), sites 2 (1.1.1), work-pets 3 (0.1.6) |
| Paseo user skills | 6 | `~/.agents/skills/` | paseo, paseo-advisor, paseo-committee, paseo-handoff, paseo-help, paseo-plugin |

Như vậy **67 skill còn lại**, ngoài `codebase-design`, gồm 26 Matt + 5 system + 20 templates + 10 curated + 6 Paseo.

Không có skill từ repo spike trong mapping; mọi đường dẫn được đối chiếu đều nằm ở user/system/plugin cache. Catalog này cũng không có pstack hoặc principle-*; điều đó không chứng minh pstack chưa được cài ở nơi khác cho provider khác.

## Catalog không đồng nghĩa toàn bộ nội dung đã vào prompt

- Public Paseo `agent.commands()` trả 70 commands: 68 kind=skill và 2 command khác.
- Native developer message ban đầu có **47 skill metadata entries**, với tên/description/path và alias roots. Đây là catalog gợi ý, không phải nội dung đầy đủ của 47 SKILL.md.
- **21 skill còn lại**: 20 templates + review-agent. Tất cả có `policy.allow_implicit_invocation: false` trong `agents/openai.yaml`; chúng không có trong catalog metadata của prompt ban đầu, nhưng vẫn có trong kết quả commands.
- Tool trace chỉ chứng minh worker thực sự đọc file `codebase-design/SKILL.md` trong lượt thử; không có bằng chứng worker đọc trọn tất cả 68 files.

OpenAI Docs mô tả Codex discovery từ repo/user/admin/system và skills qua plugin. Policy `allow_implicit_invocation: false` tắt chọn ngầm nhưng vẫn cho explicit invocation: [Build skills](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills), [Invocation policy](https://learn.chatgpt.com/docs/build-skills#optional-metadata).

## Ý nghĩa với harness

Worker do Paseo khởi chạy vẫn dùng môi trường skills/plugins của Codex trên host. Spike chỉ giao thêm một skill cụ thể trong prompt, chưa thiết lập catalog riêng cho worker. Vì thế không nên quy 67 skill còn lại cho plugin harness hoặc xem chúng là native profile fields.

Nếu yêu cầu là catalog độc lập cho mỗi agent, cần kiểm riêng việc cấu hình/discovery theo process/provider và tránh sửa global config dùng chung giữa các agent. Chưa thực hiện thay đổi nào để disable/uninstall skill trong khảo sát này. Cần phân biệt bốn lớp trong thiết kế: skill được phát hiện, metadata đưa vào prompt, skill được giao cho task, nội dung skill thực sự đã đọc.

## Kiểm riêng bản Paseo 0.12.0

Đã kiểm package npm phát hành `@getpaseo/client`, `@getpaseo/plugin`, `@getpaseo/protocol` phiên bản **0.12.0**, cùng `gitHead` là `cafe4b01c8522ff39560241c5deb01427dc8dc5b`. Không dùng docs main làm bằng chứng duy nhất cho phiên bản này.

- `PaseoAgentConfig` trong package client vẫn chỉ có provider, mode/thinking/features, options, systemPrompt, toolPolicy và mcpServers; không có skill allowlist hoặc inherit-skills switch.
- `AgentSessionConfigSchema` của protocol tại commit phát hành cũng không có skill selection per-agent.
- Có request tên `agent.skills.save_selection.request`, nhưng payload là requestId/selection/confirmedRemovals, không có agentId; controller hội tụ bộ skills cài đặt dùng chung. Tên `agent.skills` không chứng minh session-level filtering.
- Do đó public contract 0.12.0 chưa đáp ứng “chỉ load skills inject cho từng agent, không cấu hình tầng provider”. Đây là kiểm package/source; chưa nâng daemon hoặc chạy live test 0.12.0.

Nguồn cố định: [SDK 0.12.0](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/client/src/index.ts), [protocol 0.12.0](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/messages.ts), [skill installation controller](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/orchestration-skills/internal/controller.ts).


## Monkey patch và extension points không cần fork

Khảo sát 2026-10-22. Người dùng xác định không fork Paseo cho phần Skills. Đã đọc docs plugin hiện hành và source/package 0.12.0 tại commit `cafe4b01c8522ff39560241c5deb01427dc8dc5b`; chưa sửa daemon, provider config, plugin đang chạy hoặc tạo agent thử nghiệm.

- **Không có public monkey-patch API để thay Skill loader của provider tích hợp.** Plugin server chạy trong subprocess qua `fork()`; context cung cấp SDK, hooks và registrations, không cung cấp đối tượng provider đang chạy trong daemon. Monkey patch module trong plugin process không tự thay module trong daemon process. Đây là kết luận về ranh giới process từ source, không phải tuyên bố plugin không thể sửa file trên host.
- **Không thể đăng ký đè `codex` hoặc `claude` bằng plugin provider.** `buildProviderRegistry()` từ chối ID trùng built-in với lỗi `conflicts with a built-in provider`. `registerProvider()` cho phép thêm provider mới, không phải decorator cho provider có sẵn. Đây không phải giải pháp giữ nguyên native profile/provider và chỉ sửa Skill selection.
- **Có hook trước khi chạy.** `before("agent.create")` cho phép sửa public config và env; `before("agent.session_open")` cho phép sửa env theo agent ID, provider, cwd và reason `create/resume/refresh/import`. Hook sau hữu ích để áp lại policy khi resume; environment overrides không được lưu cùng agent config nên policy phải được lưu riêng và tính lại. Hook không nhận/thay Skill catalog hoặc provider transport.
- **Hướng không fork cần spike:** dùng hook `agent.session_open` để cấp môi trường discovery riêng cho Agent Session. Hook/env là contract Paseo; cách chọn home/config/discovery vẫn phụ thuộc provider. Chưa chứng minh chặn hết user/system/plugin/repo Skills hoặc giữ đúng auth/resume khi đổi môi trường. Nếu yêu cầu loại trừ cả cơ chế phụ thuộc provider thì hook này chưa đáp ứng.
- Sửa bundle trên đĩa hoặc preload code vào daemon là patch ngoài public extension contract; chưa khảo sát cách triển khai và không tự áp dụng. Không coi đó là capability được Paseo hỗ trợ.

Đề xuất trước khi bỏ yêu cầu isolation (không tiếp tục): spike hook/env với một provider: hai Sessions dùng hai bộ Skills khác nhau; đối chiếu catalog và prompt, không chỉ commands UI; kiểm resume/refresh; xác nhận Skills của agent khác và cấu hình dùng chung không đổi. Đây là đề xuất kiểm chứng, chưa phải kết quả đạt hoặc thay đổi kiến trúc đã chốt.

Nguồn: [Plugin hooks và process boundary](https://paseo.sh/docs/plugins/reference#before-hooks), [provider plugin contract](https://paseo.sh/docs/plugins/providers), [fork plugin worker](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/runtime.ts#L234), [built-in ID conflict](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/provider-registry.ts#L924), [public context](https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/plugin/src/server/contracts.ts).
