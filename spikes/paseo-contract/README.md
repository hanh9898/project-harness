# Paseo contract spike

Thử nghiệm riêng, chưa là runtime sản phẩm. Dependency `@getpaseo/client` và `@getpaseo/plugin` ghim `0.11.1`, khớp daemon local đã kiểm. CLI trên máy là `0.12.0`; không nâng cấp/restart daemon để chạy spike.

## Đã kiểm

- Public SDK kết nối daemon và đọc native profiles qua `config.get()`.
- Plugin server/client typecheck được theo package `0.11.1`.
- Install và reload plugin server thật; PID mới đọc được startup records lưu trên đĩa.
- Tám tests dùng filesystem thật tạm và scripted adapter cho API Paseo: resolver, missing ref/model, intent ordering, submit lặp, unknown creation outcome, evidence/source drift và reconcile agent cũ.

## Kết quả live và giới hạn

Đã chạy profile native `test` trên Codex: worker đọc skill thật, round 2 trả output qua validation, cùng agent running trước/sau plugin reload. Tóm tắt tại [evidence/live-summary.json](evidence/live-summary.json). Session vẫn thấy 68 skills; chưa có skill isolation. UI contribution mới typecheck, chưa xác nhận màn hình trên desktop/mobile. Xem [báo cáo](../../docs/design/paseo-spike-results.md) để phân biệt các kết quả live và tests scripted.

## Chạy lại

Từ thư mục này:

```sh
npm ci
npm run typecheck
npm test
npm run probe
```

Tạo native profile trong Paseo → Settings → host đích → Agents → Agent profiles trước. Dùng `probe` lấy ID; không nhập model/provider vào harness hoặc tự tạo profile thay người dùng.

```sh
npm run run -- --profile '<native-profile-id>' --skill '/absolute/path/to/SKILL.md' --cwd '/absolute/project/path' --request 'native-skill-r1'
npm run reconcile
```

Lệnh run trả sau khi create được ghi nhận, không chờ agent. Chỉ reconcile lại sau khi session kết thúc hoặc để thử khôi phục. Một journal chỉ chứa một work. Gửi lại cùng request trả work cũ; request khác bị conflict. Không xóa journal của việc chưa đối soát để retry.

Plugin `harness-contract-spike` dùng endpoint local và đường dẫn checkout trong `server/paths.ts`; đây là cấu hình của thử nghiệm một máy. Sau typecheck có thể install/reload đúng plugin này để thử recovery. Plugin không tự tạo agent hoặc profile khi startup; reconcile đọc journal hiện có. Sau thử nghiệm, plugin đã được remove khỏi daemon, source được giữ tại đây.

## Giới hạn có chủ đích

- JSON journal ghi atomic và fsync file, lock fail-closed; không phải SQLite, không cam kết durability khi mất điện, fencing phân tán hoặc stale-lock recovery. Lock còn sau crash phải điều tra trước thao tác thủ công.
- Primary native profile bắt buộc có model trong spike; thiếu thì báo lỗi, không auto-discover ngầm. Không có fallback thực trong bản này.
- Adapter role chỉ hỗ trợ Claude/Codex, thêm các ràng buộc read-only tương ứng; trace Codex đã xác nhận policy read-only, chưa kiểm bypass hoặc Claude. Những options này thu hẹp role, không là native profile editor.
- Worker được yêu cầu đọc một `SKILL.md` thật qua path. Quotation/hash validation kiểm được nguồn bằng chứng nhưng không chứng minh provider chỉ nạp đúng bộ skill đã chọn, hay agent đánh giá đúng.
- `prepared/unresolved` không tự create lại. Điều tra bằng creation identity/correlation chưa được triển khai tự động. Không gọi đây là exactly-once.
- Reconcile chỉ nhận kết quả structured từ agent cũ; timeout không cancel. Chưa làm lifecycle worker cleanup, activation, rollback hay migration production.
- Startup records và trạng thái thử nghiệm nằm trong `.spike/` bị ignore. Không ghi toàn bộ daemon config hoặc secrets vào báo cáo.
