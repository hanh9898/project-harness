# Thu gọn config theo nghiên cứu harness

Ngày khảo sát: 2026-10-22. Kết luận đề xuất cho một bộ harness trên Paseo, một dự án, hai orchestrator và code jobs. Đây là nghiên cứu/phạm vi đề xuất; chưa là schema đã triển khai, không chứng minh API của phiên bản cài trên host. Không thay runtime bằng Claude Agent SDK chỉ vì dùng nó làm đối chiếu.

> Bổ sung sau khảo sát HBU: [autonomous-team-proposal.md](autonomous-team-proposal.md) làm rõ role/profile bindings chưa đủ; cần catalog đội có entry procedures, results và principle selection theo việc. Bốn nhóm settings không thay thế tài sản definitions này.

> Điều chỉnh sản phẩm: editor agent definitions đầy đủ nằm trong harness theo yêu cầu người dùng, thay đề xuất chỉ giữ Paseo profile refs. Nghiên cứu nguồn vẫn có giá trị; configuration.md là thiết kế hiện hành.

## 1. Học gì từ những harness khác

| Hệ | Dữ kiện từ tài liệu chính thức | Bài học áp dụng — suy luận thiết kế |
| --- | --- | --- |
| Claude Agent SDK | Session nhận `options`, có defaults; cấu hình gồm model/cwd, permission controls, limits, settings sources. [Configure your agent](https://code.claude.com/docs/en/agent-sdk/configuration) | Tách options dành cho lập trình viên khỏi settings cần cho người dùng. Không ánh xạ mỗi field SDK thành một form |
| Claude skills/subagents | Skills là filesystem artifacts `SKILL.md`; subagents có definitions bằng code hoặc Markdown. [Skills](https://code.claude.com/docs/en/agent-sdk/skills), [Subagents](https://code.claude.com/docs/en/agent-sdk/subagents) | Skills, prompts, role definitions nằm trong repo/version; harness sửa qua công việc phát triển, không cần bảng CRUD tương ứng |
| OpenCode | JSON/JSONC và nhiều nguồn settings; agent definitions hỗ trợ JSON hoặc Markdown, model/prompt/permissions/steps. [Config](https://opencode.ai/docs/config/), [Agents](https://opencode.ai/docs/agents/) | Có thể nhiều khả năng mà không cần nhiều màn hình. Mô hình precedence phức tạp có thật, nhưng chưa phải thứ bộ một dự án cần sao chép |
| Pi | Settings có defaults cho model/thinking, tools, compaction, retry, resources và UI. Project settings override; resource lists có semantics riêng. [Settings reference](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/settings.md) | Các thông số thấp như compaction/retry/cache/display có thể giữ default; chỉ mở override khi có lỗi hoặc nhu cầu cụ thể |
| Paseo | Agent profile gói provider/model/mode/thinking/features; thay profile không cập nhật agent đã chạy. [Agent profiles](https://paseo.sh/docs/agent-profiles) | Chỉ lưu role → profile reference, resolve và pin snapshot. Không tạo model/provider editor thứ hai |
| Paseo schedules | Schedule tạo agent mới; heartbeat gửi vào session đã có. [Schedules](https://paseo.sh/docs/schedules) | Lịch agent tham chiếu native; code-job schedules cần schema riêng của harness |

Không có số liệu tần suất sử dụng options của người dùng trong nghiên cứu này. 80/20 là quyết định phạm vi theo ownership, mức tác động và nhu cầu hiện tại, không là kết luận thống kê về thị trường.

## 2. Quy tắc để một trường được vào config v1

Chỉ đưa vào nếu người vận hành cần chọn giữa các giá trị hợp lệ, giá trị khác nhau có ảnh hưởng thực, và không có nơi khác đang sở hữu. Nếu thuộc Paseo thì giữ reference; thuộc logic/phương pháp thì giữ trong code/skills; thuộc kết quả chạy thì chỉ đọc.

Ít config không có nghĩa ít kiểm soát: các invariant vẫn phải được code thực thi. Field ẩn không được âm thầm nới quyền hoặc tài nguyên. Config thay đổi có validation/revision; work pin snapshot. Với v1, ưu tiên áp dụng cho lượt mới thay hot-edit run đang chạy.

## 3. Đề xuất chỉ bốn nhóm config

### A. Agents — role/profile bindings

- Profile cho harness orchestrator và project orchestrator.
- Worker/reviewer profile overrides chỉ khi thực sự cần; bộ có definitions mặc định được kiểm.

Không lặp model/provider/reasoning/mode. Chọn profile Paseo; adapter resolve đúng host và kiểm capability trước chạy. Reference syntax/ID cụ thể phải kiểm SDK; ví dụ bên dưới không phải contract native. Profile không tự định nghĩa toàn bộ workflow role, skill package hoặc quyền nghiệp vụ của harness.

### B. Limits — giới hạn thực thi

- Max concurrent workers của cả bộ, không chỉ mỗi run.
- Max elapsed minutes cho mỗi work; hạch toán theo durable work, không reset vô hạn khi đổi session/retry.
- Spend cap tùy chọn chỉ khi adapter đo/enforce được phạm vi đã công bố; không làm con số giả cho gói subscription hoặc usage thiếu dữ liệu.

Retry kỹ thuật, backoff, quality rounds có giới hạn trong code/program mặc định. Chỉ xuất override nâng cao khi ca sử dụng chứng minh cần. Không mang mọi `maxTurns` provider thành config chuẩn đa provider.

### C. Actions — quyền cho hành động quan trọng

Chỉ hiển thị các quyền người dùng thực sự cần quyết: push/tạo PR, merge/publish và kích hoạt bản cải tiến đã kiểm chứng. Mỗi action có `allow | ask | deny` nếu enforcement hỗ trợ; không dùng một nút “autonomous” hàm ý cấp mọi quyền.

Read/edit/test constraints nền nằm trong role definitions và provider/host controls đã cấp. Actions không cấp thêm quyền vượt chúng; native provider mode cũng không tự cho phép publish theo policy workflow. `activateVerifiedRevision` chỉ áp candidate đạt kiểm và tương thích trong phạm vi đã cấp, không cho tự sửa mục tiêu hay nâng trần.

Claude SDK `allowedTools` là preapproval, không là allowlist loại bỏ mọi tool khác; skills list cũng không ngăn agent đọc file bằng công cụ khác. Phải map policy xuống enforcement thật, không suy từ tên field. [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions), [Skills](https://code.claude.com/docs/en/agent-sdk/skills).

### D. Automations — code jobs và native references

Code job: handler đăng ký, input/source reference, lịch kèm timezone và enabled. Cursor, last run, lỗi, next run là trạng thái chỉ đọc. Timeout/retry/overlap/missed bắt đầu bằng defaults theo handler có kiểm, không thêm mọi knob vào form thường dùng. Override nâng cao chỉ khi có nhu cầu; chưa được cấu hình không có nghĩa không có trần.

Agent schedule/heartbeat như daily retro: giữ reference và mở native Paseo để chỉnh cadence, tránh hai nguồn lịch. Daily retro program/evaluator/criteria là definitions của repo. Lịch cụ thể thay đổi được; protocol cải tiến không phải một bộ form phải điền.

## 4. Ví dụ chỉ ghi phần người dùng override

Đây là YAML giả mã của schema đề xuất, không phải config Paseo/Claude SDK hoặc default đã chọn:

```yaml
agents:
  harnessProfile: planning
  projectProfile: development

limits:
  maxConcurrentWorkers: 2
  maxWorkMinutes: 30

actions:
  createPR: allow
  merge: ask
  publish: ask
  activateVerifiedRevision: allow

automations:
  jobs:
    - id: backlog-sync
      handler: backlog.sync
      inputRef: backlog-main
      cron: "*/5 * * * *"
      timezone: Asia/Ho_Chi_Minh
      enabled: true
  agentScheduleRefs:
    dailyRetro: native-schedule-ref
```

Job input reference vẫn cần nguồn đúng dự án và credential mechanism đã cấp; không giấu domain/project filters vào default mơ hồ. Secret không nằm trong YAML/chat. Nếu chưa có configured integration thì hỏi nguồn còn thiếu, không tự dựng kết nối mới.

## 5. Xử lý catalog 14 nhóm hiện tại

| Nhóm cũ | Xử lý v1 |
| --- | --- |
| Kit/project/workspace | Resolve từ Paseo; xem read-only. Chỉ chọn binding khi thiếu |
| Repos/isolation | Project references và role/workflow definitions; không form worktree manager |
| Models/roles | Agents chỉ còn profile references |
| Skills/instructions | Files/manifest có version, harness quản lý bằng công việc |
| Tools/integrations | Dùng native controls; input/source refs hoặc adapter definition khi cần |
| Permissions/autonomy | Actions cho quyết định quan trọng; enforcement nền vẫn giữ |
| Execution | Limits; program-specific controls ở workflow code |
| Context | Provider defaults + versioned handoff strategy, chưa có UI knobs |
| Jobs/triggers | Automations, phân biệt executor code/agent |
| Evals | Criteria/evaluator definitions + evidence, không settings platform |
| Improvements/releases | Repo program + action authority + lịch retro; chưa cần release-policy editor |
| Observability | Read-only monitor/native links; không config metrics framework |
| Storage/recovery | Default paths + known-good metadata, advanced maintenance khi cần |
| Fork/upstream | Git remote/branch/PR thông thường; yêu cầu qua chat harness |

Không xóa capability khi bỏ nhóm config. Chuyển chúng về đúng owner/default/definition; harness orchestrator vẫn có thể phát triển chúng theo thời gian.

## 6. Quyết định đề xuất

Thu từ 14 nhóm settings xuống bốn nhóm trên. Người mới không cần điền đủ bốn nhóm: kế thừa context, chọn profile khi chưa có binding, xác nhận quyền/trần cần cho hành động; jobs và lịch bổ sung theo nhu cầu. Luôn xem được effective settings và nguồn kế thừa, nhưng không phải mọi giá trị xem được đều chỉnh được.

Bỏ generic multi-scope config engine ở v1; dùng schema một kit, explicit role bindings và defaults kiểm được. Chỉ mở advanced overrides khi gặp nhu cầu thật. Không mở provider options passthrough tùy ý từ UI rồi coi là cấu hình portable.

Nghiên cứu chỉ đọc docs, không chạy SDK/provider/Paseo. Prototype đã được cập nhật còn bốn nhóm settings và catalog đội theo autonomous-team-proposal.md; mục mapping 14 nhóm giữ lại để giải thích phần đã cắt. Nguồn bổ sung OpenCode/Pi tại [config-comparison-sources.md](config-comparison-sources.md).
