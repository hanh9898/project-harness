# Grill history — evidence bundle

Lưu ngày 2026-10-23 từ thread [Hướng dẫn orchestration trong T3 Code](t3-thread://v1/53d0b426-056c-4920-a3df-13786d026007), qua API đọc lịch sử của T3. Phạm vi kết thúc tại câu “Rà lại lịch sử chat và lưu lại đi. Tôi cần bằng chứng ko tin lời bạn nói” — position **2584**, item ID `turn-item:message:425366e2-b93b-4b69-b3fc-fcd9c068ecc6`.

Đã lưu **681 messages: 196 user + 485 assistant**, bao gồm commentary, qua **7 trang API liên tiếp**. Không message nào bị cắt text. Trang cuối trả `hasMore: false`; một commentary ở P2585 sau yêu cầu này được giữ trong source page nhưng loại khỏi bộ transcript có cutoff.

## Đọc và kiểm chứng

- [Decision ledger](decision-ledger.md): kết luận audit, bằng chứng theo chủ đề, câu hỏi chưa trả lời và chỗ xác nhận chưa rõ phạm vi.
- [Round-by-round record](rounds.md): từng lượt user, đầy đủ đề xuất/ngữ cảnh liên quan và câu trả lời nguyên văn. Có cả bác bỏ, đổi hướng và sửa lỗi gõ.
- [Transcript nguyên văn](transcript.md): toàn bộ messages trong phạm vi, theo position, có item/message ID và vị trí trong JSON nguồn.
- [JSONL messages](messages.jsonl): text và metadata API, thêm `exportSource` để truy ngược page/JSON pointer.
- [Round records JSON](rounds.json) và [review notes](review-notes.json): phân loại, source refs, 26 nhận định được đối chiếu.
- [Source pages](source-pages/): các structured response API, giữ nguyên trường dữ liệu và text, chỉ serialize lại JSON để lưu. Không phải bản ghi transport bytes.
- [Document comparison](document-comparison.json): trích nguyên văn các đoạn tài liệu đang so sánh, kèm số dòng và SHA-256 toàn file tại lúc audit.
- [Manifest](manifest.json), [SHA256SUMS](SHA256SUMS) và [read-only verifier](build-evidence.py): kiểm việc lưu, source pointers, thứ tự, cutoff, exact quotes và hash.

Chạy từ repo root:

```sh
python3 docs/design/grill-history/build-evidence.py --check
cd docs/design/grill-history
shasum -a 256 -c SHA256SUMS
```

`--check` không ghi lại file. Lệnh không có `--check` tái tạo các bản dẫn xuất từ source pages và review notes. Không lấy thêm chat hoặc thực hiện thao tác Paseo/T3.

## Quy tắc diễn giải

**R001–R196 là ID của sổ audit**, tương ứng mỗi message user, không phải 196 buổi grill. Lịch sử có cả học kiến thức, research, viết tài liệu, yêu cầu test, xác nhận và câu hỏi trạng thái. Không tính tất cả thành quyết định.

Một câu “ok” phải đọc cùng đề xuất cụ thể và các sửa đổi về sau. Sổ giữ toàn bộ assistant interval giữa hai lượt user; khi research/spike chen ngang nhưng có lời nhắc rõ câu hỏi đang chờ thì trỏ cả câu hỏi gốc và lời nhắc. Riêng D01 có scope ambiguity được ghi rõ, không lấy lời assistant “mình hiểu là…” làm bằng chứng độc lập của bulk approval.

Phân loại và kết luận audit là diễn giải của người rà; nguyên văn API là nguồn để người đọc tự kiểm. Tài liệu ghi “đã chốt” chỉ là một claim được so sánh, không tự chứng minh người dùng đã đồng ý. Sổ không tự thay status vocabulary trong các tài liệu/graph đã lưu.

## Giới hạn chính xác của bản lưu

- Đây là toàn bộ **view `messages` API trả về trong cutoff**, gồm user/assistant, không phải toàn bộ activity/tool timeline, reasoning hoặc transcript các child threads.
- Vị trí có thể nhảy số vì tool/activity bị view này bỏ qua; không dùng `thread.itemCount` làm số messages.
- Các phản hồi API được lấy theo trang, không phải snapshot database nguyên tử. Cutoff là một user item đã tồn tại trước khi đọc nên loại được commentary của lượt audit.
- `updatedAt` là tên trường API, không giả thành thời điểm gửi nguyên thủy. Không bịa metadata API không trả về.
- Không khẳng định khôi phục được nội dung đã bị xóa/sửa mà API không còn trả về. Không sao chép bytes attachments; refs trong message được giữ nguyên.
- Không claim lưu đầy đủ kết quả tool/research child chỉ vì parent từng báo đã hoàn tất. Bằng chứng spike/runtime phải mở artifacts riêng.
- SHA-256 giúp phát hiện thay đổi bytes của bản lưu; không phải chữ ký của T3 hoặc chứng thực độc lập về tác giả/ý nghĩa đồng ý.

Phase sản phẩm vẫn là **thiết kế**. Bundle này là hồ sơ bằng chứng và audit tài liệu; không thay đổi runtime, native profiles, agents hoặc cấu hình vận hành.
