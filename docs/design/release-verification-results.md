# Release verification results

Kiểm ngày 2026-10-22. Đây là bằng chứng cho cơ chế spike, chưa là nghiệm thu Project Harness production. [Thiết kế](release-execution.md) · [Policy](release-policy.md).

## Kết quả vòng kiểm bổ sung

**25 ca đạt:** 11 ca Node cục bộ đã chạy lại, 10 ca SQLite/executable cục bộ, 4 ca trên daemon Paseo riêng. Không cộng lượt recovery 0.11.1 từ vòng trước vào con số này.

**11 ca Node:** Skill drift/missing; gộp/reuse/invalidation; không cache failure/timeout/health; một kiểm nặng tại một thời điểm; recovery giữ fixture data, từ chối schema/artifact không hợp lệ, đối soát gián đoạn và active source thay đổi. [Code và giới hạn](../../spikes/release-execution/README.md).

**10 ca SQLite/executable:** SQLite 3.49.1 thật, DB tạm, tiến trình con thật:

- Migration thêm trường giữ old reader và dữ liệu mới; gọi lại migration không áp hai lần.
- Tiến trình chết trước commit làm transaction migration rollback, giữ schema/data cũ.
- Backup SQLite đọc/restore được khi chưa có mutation mới; backup hỏng bị từ chối.
- Restore bị chặn khi có insert, update hoặc delete sau backup. Generation được trigger theo dõi trên bảng fixture, không dùng max task ID làm bằng chứng không có thay đổi.
- Schema không tương thích chặn old code; không tự restore snapshot cũ để ép code chạy.
- Đổi active recovery từ v1 sang v2 không ghi đè executable v1 của operation đang chạy; operation cũ hoàn tất bằng v1, lần gọi mới dùng v2.
- Executable syntax hợp lệ nhưng lỗi runtime bị probe từ chối; active recovery pointer không đổi.

[Code](../../spikes/release-execution/storage-recovery.test.py) · [Evidence](../../spikes/release-execution/evidence/storage-executable-summary.json).

**4 ca Paseo thật:** daemon riêng **0.12.0**, home tạm, cổng localhost riêng, relay tắt, không có plugin người dùng. Manifest của plugin thử nghiệm khai tương thích 0.12.x; không suy ra toàn plugin production đã tương thích 0.12.

- Worker restart: worker PID 33345 → 38006; plugin khởi động lại, data fixture giữ nguyên.
- Stop/start toàn daemon: watcher recovery đã chạy trước khi stop, ghi nhận 8 lần daemon không khả dụng, tự phát hiện plugin failed khi daemon lên lại rồi phục hồi về running. Không cần driver báo `fault-observed` trong ca này.
- Fallback artifact bị sửa: recovery trả blocked, không ghi đè source hay fixture data.
- Sau khi sửa fallback: operation recovery mới thành công. Không dùng retry vô hạn trong operation đã blocked.

[Suite](../../spikes/release-paseo-live/isolated-suite.mjs) · [Evidence](../../spikes/release-paseo-live/evidence/isolated-suite.json).

## Phát hiện và điều chỉnh

Home Paseo mới mặc định tắt custom plugins. Lượt chuẩn bị đầu tiên cài được nhưng không có startup receipt; đã dừng và dọn ca đó. Bật `pluginsEnabled` chỉ trong home riêng, thêm assertion plugin phải running trước khi thử fault, rồi chạy suite đạt. Không dùng install exit 0 làm bằng chứng contribution đã chạy.

Giữ guard cho restore trên toàn bộ insert/update/delete của bảng fixture. Điều này vẫn không chứng minh đã theo dõi mọi bảng hoặc external effect; production cần revision/ownership protocol phù hợp.

Watcher chịu mất kết nối có giới hạn và tự kiểm status failed trước khi đổi source. Không coi daemon không kết nối được là bằng chứng plugin hỏng để rollback.

## Dọn tài nguyên và giới hạn

Đã gỡ plugin thử nghiệm, stop daemon riêng và xóa home tạm. Host đang dùng `127.0.0.1:6767` vẫn daemon 0.11.1, worker PID **56104** như trước; HBU vẫn running. Không tạo agent, schedule, restart host chính hoặc sửa dữ liệu dự án.

Chưa có bằng chứng cho reboot/power loss của máy; fencing nhiều actor với tác động ngoài; resume Workflow Run/agent xuyên faulty update; phục hồi UI client; persistent check queue qua restart. Những phần này cần implementation tương ứng trước khi có thể kiểm end-to-end. Không có production Workflow Runtime/installer trong repo để gọi toàn bộ hệ thống đã nghiệm thu.

SQLite test là cơ chế riêng với schema fixture, chưa tích hợp vào live Paseo suite. Executable update test kiểm mô hình versioned artifacts và probe, chưa kiểm chuỗi đóng gói/phân phối executable thật. Atomic rename không phải bằng chứng fsync hay power-loss durability.

## Chạy lại

```sh
node --test spikes/release-execution/mechanisms.test.mjs
python3 spikes/release-execution/storage-recovery.test.py
python3 spikes/release-paseo-live/prepare-isolated.py
node spikes/release-paseo-live/isolated-suite.mjs
```

Hai lệnh cuối start/stop một daemon riêng và cố tình làm lỗi plugin thử nghiệm trên daemon đó. Suite yêu cầu đúng daemon 0.12.0. Home của lần đã chạy được lưu trong metadata ignored `.suite`; suite stop daemon khi kết thúc, việc xóa home sau đó cần kiểm daemon đã dừng. Script prepare từ chối home cũ còn tồn tại.
