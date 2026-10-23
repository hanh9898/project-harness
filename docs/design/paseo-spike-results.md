# Kết quả spike Paseo: profile → skill → reload

Kiểm ngày 2026-10-22 trên host `Mac-MN-14.local`, daemon Desktop-managed `0.11.1`, CLI `0.12.0`; SDK/plugin package ghim `0.11.1`. Code tại [spikes/paseo-contract](../../spikes/paseo-contract/README.md); [bản tóm tắt bằng chứng](../../spikes/paseo-contract/evidence/live-summary.json) giữ IDs, timestamps và policy đã quan sát.

## Kết luận hiện hành

Luồng **native profile → worker thật → đọc skill thật → plugin reload trong khi worker chạy → reconcile kết quả** đã thực hiện được với một profile Codex. Đây là bằng chứng cho nền tảng thực thi v1, chưa là workflow engine production hoặc chứng minh mọi provider đều hỗ trợ tương đương.

Bước cuối thu kết quả bằng lệnh reconcile tường minh. Plugin startup đã gắn lại đúng agent đang chạy; chưa có controller tự tiếp nhận completion liên tục sau đó. Không gọi spike này là closed loop tự vận hành hoàn chỉnh.

## Kết quả

| Kiểm tra | Kết quả | Bằng chứng và giới hạn |
|---|---|---|
| Đọc native profile | Pass | Profile `test`, ID `agent_profile_mvj6g8mc_6xmhwd3zwgd`, do người dùng tạo trong Paseo; không tạo/sửa native profile bằng harness |
| Native settings được áp dụng | Pass | Runtime và provider trace đều `codex / gpt-5.6-luna`, thinking `low` |
| Giới hạn role read-only | Có bằng chứng policy | Native profile giữ `full-access`; per-agent options thu hẹp. Trace Codex ghi `sandbox_policy: read-only`, `approval_policy: never`; chưa thử hành vi bypass |
| Đọc skill thật | Pass | Timeline có shell tool-call `sed` đọc file `codebase-design/SKILL.md`, exit 0 |
| Output/evidence | Pass ở round 2 | Parse + Zod + exact path/quote + SHA-256 source; không suy ra nội dung đánh giá luôn đúng |
| Reload khi worker đang chạy | Pass | Agent `034b9569-6b13-4206-a3e6-3686d9b4a615` running trước và sau reload; plugin PID `1839 → 8107` |
| Gắn lại sau reload | Pass | Startup log `SPIKE_LOAD 5`, `SPIKE_RECONCILE` với cùng agent ID và `observedStatus: running`; không tạo worker thay thế |
| Kết luận work | Pass | Reconcile tường minh sau completion lưu `completed`; native final timestamp `06:50:31.679Z` UTC |
| Gửi lại cùng request | Pass | `native-skill-r2` trả lại work completed cùng agent ID; không gọi create lần nữa |
| Tests | 8/8 pass | Filesystem tạm thật, Paseo API scripted; cộng kiểm live riêng, không nhập nhằng hai loại |
| Dọn tài nguyên | Đã thực hiện | Remove plugin thử nghiệm, archive hai workspace thử nghiệm; giữ native profile `test` và plugin HBU |

## Phát hiện từ lần thử đầu

Round 1 giữ lại ở `.spike/round1-work.json`, trạng thái `invalid`. Worker thực sự đọc skill nhưng final text bắt đầu bằng separator Markdown `---`, khiến `JSON.parse` trực tiếp thất bại. Câu trích dẫn còn bỏ `**` trong nguồn nên cũng không đạt exact evidence contract.

Đã sửa parser của spike chỉ chấp nhận các wrapper định dạng được khai báo (separator đầu hoặc JSON code fence), không tìm JSON tùy ý trong prose. Thêm test reject văn bản thừa; siết prompt để giữ nguyên Markdown khi trích dẫn và trả một JSON object. Không sửa evidence nguồn hay hạ điều kiện quote/hash. Round 2 là một experiment request mới, giữ nguyên thất bại round 1 để truy vết. Kết quả round 2 là JSON thuần và quote nguyên văn hợp lệ.

Điều này chứng minh cần validate kết quả trong harness, kể cả khi truyền `outputSchema`; không xem agent idle hoặc có schema là work thành công.

## Giới hạn quan trọng: skill được giao khác skill được cô lập

`agent.commands()` trả **70 commands, gồm 68 skills**, trong đó có `mattpocock-skills:codebase-design`. Khảo sát tiếp theo xác định prompt ban đầu chỉ có metadata 47 skills; 21 skills explicit-only vẫn nằm trong catalog commands. Không có bằng chứng toàn bộ nội dung 68 skills được nạp. Xem [skill-origins.md](skill-origins.md). Agent được giao đường dẫn một skill và đã đọc/vận dụng nó, nhưng vẫn khám phá được bộ skills rộng hơn trên host.

Vì vậy chưa có bằng chứng rằng checkbox “chọn skills cho agent” sẽ giới hạn catalog provider chỉ còn các skill được chọn. Nếu đó là yêu cầu của sản phẩm, cần loader/discovery/isolation adapter riêng, rồi kiểm từng provider. Không tự đổi yêu cầu này thành “chỉ đưa lời khuyên trong prompt”. Principle policy auto/fixed/hybrid chưa được thử trong spike này.

Mode badge của native session vẫn là `full-access`, trong khi trace thực thi ghi sandbox read-only do options override. UI monitor nên phân biệt native profile mode và effective role constraints; không chỉ đọc nhãn mode để kết luận quyền thực thi.

## Chưa được chứng minh

- Fallback profiles, Claude hoặc provider khác.
- Skill catalog isolation; automatic principle selection và chất lượng cải tiến.
- Daemon restart, máy ngủ, mất kết nối giữa side effect và response, stale lock/fencing hay SQLite recovery.
- Worktree isolation, job schedules, Actions bypass và tự cập nhật/rollback plugin lỗi.
- UI contribution trên desktop/mobile; hiện mới typecheck và load runtime plugin.

## Dấu vết cục bộ

`.spike/` bị ignore: `probe.json`, `round1-work.json`, `result-diagnostic.json`, `work.json`, `round2-before-reload.json`, `round2-after-reload.json`, `round2-reload.json`, `round2-evidence.json`, `round2-provider-policy.json`, `live-plugin-logs.json`, `plugin-loads.json`. Raw timeline có nội dung skill, không đưa toàn bộ vào báo cáo. Không ghi secrets hoặc toàn bộ daemon config.

Trước khi người dùng tạo profile, các kiểm live chỉ gồm SDK read và reload với work rỗng (PID `93545 → 94651`). Các kết luận pending lúc đó đã được thay bằng bằng chứng live round 2 ở trên. Startup log có Electron codesign stderr nhưng plugin vẫn ready; chưa chẩn đoán warning hệ thống đó.
