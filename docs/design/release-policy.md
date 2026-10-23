# Release policy

Thiết kế đang được phỏng vấn, cập nhật 2026-10-22. Chưa có runtime production; prototype v7 đã đồng bộ policy mới, vẫn chỉ là fixture. Cơ sở: [Product Development Flow](release-flow-framework-sources.md), với [HBU](hbu-fast-release-sources.md) là tham khảo thực tế, không phải policy được sao chép toàn bộ.

## Đã xác nhận

- Phát hành theo từng thay đổi nhỏ; không gom thay đổi chỉ để chờ một đợt release lớn.
- Fast path dành cho thay đổi có phạm vi ảnh hưởng hẹp, hiểu rõ, dễ sửa; kiểm tra trực tiếp liên quan trước khi đưa vào dùng.
- Deep path dành cho bản lớn hoặc thay đổi có thể làm mất trạng thái, lặp tác động ngoài, sai quyền hay hỏng cơ chế tự cập nhật. Kích thước diff không đủ quyết định mức kiểm chứng.
- Harness Engineering Orchestrator đề xuất đường đi và lý do. Code bắt buộc Deep path khi thay đổi các cơ chế bảo vệ đã chốt tại mục bổ sung cuối trang; cách phát hiện bằng code còn cần thiết kế.
- Không mặc định chạy toàn bộ kiểm tra mỗi đêm. Kiểm sâu khi có bản lớn, thay đổi thuộc Deep path hoặc bằng chứng vận hành cần điều tra. Daily retro đọc dữ liệu trước và đề xuất kiểm tra bổ sung khi có lý do.
- Code giữ mức kiểm tối thiểu bắt buộc và giới hạn tài nguyên; agent chọn kiểm tra bổ sung theo phần bị ảnh hưởng, kèm lý do.
- Kết quả kiểm gắn với đúng phiên bản code; có thể dùng lại khi đầu vào liên quan không đổi. Chưa thiết kế cache identity, invalidation hoặc cơ chế chứng minh đầu vào không đổi.
- Chưa đặt số giây/token cố định; cần đo chi phí thực tế trước khi chốt ngân sách.
- Chỉ ngừng admission và chờ checkpoint đối với công việc bị ảnh hưởng bởi cập nhật. Thay đổi không ảnh hưởng Run hiện tại được áp dụng ngay; chưa xác định được phạm vi ảnh hưởng thì hoãn activation để làm rõ.
- Mặc định fix-forward cho lỗi còn kiểm soát được: ghi nhận lỗi, chặn chức năng bị ảnh hưởng và tạo việc sửa ưu tiên cao. Bốn điều kiện đã chốt tại mục bổ sung Fix-forward cuối trang; probes và enforcement cụ thể còn cần thiết kế/kiểm chứng.
- Nếu plugin không khởi động được hoặc mất khả năng tự sửa, dùng recovery độc lập để khôi phục bản chạy được gần nhất. Không yêu cầu quy trình rollback đầy đủ cho mọi patch; protocol khôi phục và tương thích dữ liệu còn cần thiết kế.
- Không backup toàn bộ mỗi patch. Trước thay đổi dữ liệu không tương thích hoặc khó đảo ngược, bắt buộc có backup đã xác minh đọc lại được. Ưu tiên migration tương thích; kiểm khả năng đọc backup chưa chứng minh khôi phục toàn hệ thống thành công.

### Kiểm tra, revision và đo lường

- Fast path trước activation: kiểm bản thay đổi nạp/build được và chạy kiểm tra trực tiếp liên quan. Kiểm bắt buộc thất bại hoặc chưa chạy xong thì chưa activation; hết thời gian kiểm không phải đạt.
- Sau activation: kiểm plugin khởi động, kết nối được và chức năng vừa thay đổi hoạt động. Kiểm resume khi thay đổi ảnh hưởng việc tiếp tục Run.
- Run đang chạy giữ revision đã chọn; Run mới dùng revision mới. Chỉ chuyển Run hiện tại vì lý do cụ thể và tại checkpoint tương thích. Áp dụng cho workflow, Agent Definitions, Skills và Principles do harness quản lý; không yêu cầu chạy song song hai runtime plugin. Cách lưu nội dung và khả năng áp dụng pin revision qua Paseo/provider còn cần kiểm chứng, không mặc định refs tới file mutable là đủ.
- Mỗi release ghi thời gian chờ/kiểm/activation, chi phí agent, thời gian các lệnh kiểm, kết quả kiểm, lỗi sau activation và thời gian sửa/recovery. Chỉ ghi chi phí thực sự thu được, không suy diễn số liệu thiếu thành số không.
- Daily retro dùng dữ liệu để đề xuất điều chỉnh kiểm tra và ngân sách; không tự hạ mức kiểm bắt buộc chỉ để release nhanh hơn.

### Deep path và lỗi sau activation

- Deep path chọn bộ kiểm theo ảnh hưởng: trạng thái/migration kiểm tương thích dữ liệu và phục hồi; scheduler/tác động ngoài kiểm chống trùng, chạy chồng và tiếp tục sau gián đoạn; quyền kiểm thao tác được phép/bị cấm; self-update/runtime kiểm reload, tiếp tục công việc và recovery độc lập.
- Chạy toàn bộ kiểm tra khi thay đổi xuyên nhiều phần hoặc chưa khoanh vùng được ảnh hưởng. Deep path không mặc định đồng nghĩa toàn bộ test suite cho mọi thay đổi.
- Kiểm sau activation thất bại được ghi nhận là đã activation nhưng kiểm chứng chưa đạt. Chặn công việc phụ thuộc chức năng lỗi; phần xác định không bị ảnh hưởng tiếp tục chạy. Chưa khoanh vùng được lỗi thì tạm dừng admission toàn bộ. Sau đó fix-forward hoặc recovery theo policy; reload xong không tự chứng minh release đạt.
- Mỗi lần chỉ một activation thay đổi plugin. Khi kiểm sau activation chưa đạt, ưu tiên bản sửa/recovery và hoãn activation cải tiến không liên quan. Agent vẫn có thể nghiên cứu, viết code và chuẩn bị candidate song song.

### Tài nguyên kiểm tra và kết thúc kiểm chứng

- Dùng chung một hàng đợi kiểm tra. Cùng kiểm tra, cùng phiên bản và cùng đầu vào liên quan thì gộp yêu cầu hoặc dùng lại kết quả đạt. Đầu vào thay đổi hoặc chưa chứng minh tương đương thì chạy lại. Không suy ra cache hit chỉ từ tên test hay diff nhỏ.
- Mặc định chỉ một lượt kiểm nặng chạy cùng lúc; kiểm nhẹ có thể song song trong giới hạn host. Cách phân loại nặng/nhẹ và thực thi giới hạn còn cần thiết kế/đo.
- Diễn tập recovery khi cơ chế recovery, cách đóng gói, migration hoặc hợp đồng khởi động thay đổi. Patch thông thường xác nhận công cụ recovery và bản phục hồi tương thích vẫn sẵn dùng, không lặp toàn bộ diễn tập.
- Release được ghi nhận đạt khi các kiểm bắt buộc trước/sau activation đều đạt. Không yêu cầu thời gian quan sát cố định cho mọi patch.
- Tiếp tục thu lỗi vận hành sau khi release đạt. Lỗi phát hiện muộn liên kết với release nghi vấn; chỉ xác nhận nguyên nhân khi có bằng chứng. Chưa có dữ liệu quan sát không đồng nghĩa không có lỗi.

### Lựa chọn implementation đã chốt

- Workflow/Agent Definition do harness quản lý giữ nội dung bất biến. Với Skill nguồn ngoài, ghi nguồn/digest và kiểm lại trước bước mới cần dùng; drift thì dừng bước để replan hoặc chọn revision tại checkpoint. Không fork/cô lập Skill; kiểm drift không phải bảo đảm snapshot hay tái lập hoàn toàn.
- V1 chỉ gộp/dùng lại kết quả kiểm khi cùng candidate, cùng check, cùng đầu vào và môi trường liên quan. Candidate khác chạy lại. Health sau activation luôn kiểm mới theo runtime instance/operation.
- Recovery là executable nhỏ đi cùng plugin, chạy ngoài subprocess plugin và khởi chạy trước reload. Bản đang bảo vệ activation không bị thay trong chính operation đó. Cách chạy độc lập và cập nhật executable cần spike; không thêm cloud service.

## Luồng thực thi tổng hợp

Đây là thứ tự nghiệp vụ tổng hợp từ các quyết định đã chốt, chưa phải API hoặc state machine triển khai.

1. Xác định candidate và tập đầu vào cụ thể; đề xuất Fast/Deep path và phạm vi ảnh hưởng.
2. Code áp luật bắt buộc để chọn đường và bộ kiểm; xếp hàng/gộp/dùng lại kiểm tra khi chứng minh đủ điều kiện.
3. Hoàn tất kiểm bắt buộc trước activation. Không đạt hoặc chưa xong thì chưa activation.
4. Chờ quyền activation duy nhất; xác nhận đầu vào và bằng chứng vẫn áp dụng được sau khi chờ. Nếu candidate đã đổi thì quay lại kiểm phần bị ảnh hưởng.
5. Chuẩn bị công việc bị ảnh hưởng tại checkpoint và backup dữ liệu khi bắt buộc; phạm vi chưa rõ thì hoãn. Xác nhận recovery sẵn dùng và tương thích.
6. Activation rồi chạy kiểm bắt buộc sau activation; chưa kết luận đạt chỉ vì reload thành công.
7. Đạt thì ghi nhận kết quả và tiếp tục quan sát. Không đạt thì chặn phạm vi bị ảnh hưởng, ưu tiên fix-forward hoặc recovery; chưa rõ phạm vi thì dừng admission toàn bộ.
8. Daily retro dùng kết quả và chi phí để đề xuất cải tiến; không mặc định phát sinh release hoặc chạy toàn bộ kiểm tra.

## Thiết kế kỹ thuật tiếp theo

Đề xuất chi tiết và bằng chứng cần kiểm tại [release-execution.md](release-execution.md). Các lựa chọn implementation trong tài liệu đó chưa mặc định được chấp nhận chỉ vì policy đã chốt.

- Check plan: nhận diện vùng ảnh hưởng, chọn bộ kiểm và mô tả lý do, đầu vào, giới hạn. Chưa chốt cấu trúc dữ liệu/API.
- Check identity: phiên bản code, nội dung lệnh kiểm, dependencies, cấu hình và môi trường liên quan; chỉ dùng lại khi có thể chứng minh phù hợp. Cần thiết kế invalidation và kết quả phụ thuộc dịch vụ ngoài.
- Activation: journal bền vững, quyền thực thi duy nhất qua restart, xử lý mất phản hồi, tránh dùng kết quả kiểm của candidate cũ. Không coi mutex trong bộ nhớ là đủ.
- Revision: kiểm chứng nội dung workflow/agent/skill/principle đã pin có thể được dùng lại cho Run qua Paseo mà không dựa vào file mutable hoặc giả định skill isolation.
- Recovery: executable độc lập plugin, lựa chọn bản tương thích với dữ liệu hiện tại, khôi phục không replay tác động ngoài. Không mặc định rollback code sửa được migration dữ liệu.
- Measurement: đo chi phí/latency thực tế trước khi đặt ngưỡng; định nghĩa cách nhận biết kiểm nặng và dữ liệu thiếu.

## Đang mở

- Nội dung cụ thể các bộ kiểm và cách phát hiện/quy lỗi vận hành muộn.
- Cơ chế giữ/chuyển revision cho Run, promotion và migration protocol.
- Phát hiện phạm vi ảnh hưởng, thực thi điều kiện Fix-forward/Recovery bằng probes và protocol recovery độc lập.
- Phạm vi nhạy cảm, budget và cache identity; cách thu số liệu và xử lý dữ liệu thiếu.

Policy này thay thế yêu cầu cũ về dừng mọi Run và tự rollback cho mọi activation lỗi. [Phạm vi V1](scope-80-20.md) đã cập nhật phần tương ứng; prototype v7 đã đồng bộ policy; protocol kỹ thuật và tích hợp production vẫn cần hoàn thiện. Không diễn giải fix-forward thành tiếp tục chạy chức năng đã xác định bị lỗi.

## Bổ sung đã xác nhận — vùng bảo vệ và bằng chứng đánh giá

Deep path bắt buộc khi thay đổi cơ chế lưu/khôi phục trạng thái, chống lặp tác động ngoài, thực thi quyền, activation/recovery hoặc khả năng tự sửa. Cấu hình mở rộng quyền cũng thuộc diện này. Thay UI, nội dung Skill hoặc lịch chạy có thể đi Fast path khi xác định được ảnh hưởng hẹp và các cơ chế bảo vệ vẫn giữ nguyên; không coi mọi self-update đều là Deep path. Cách ánh xạ thay đổi tới cơ chế và kiểm tra bắt buộc vẫn phải thiết kế/kiểm chứng, không dùng nhận định của agent thay cho enforcement bằng code.

Bằng chứng tối thiểu chọn theo mục tiêu: sửa lỗi cần kiểm tái hiện lỗi và hành vi liên quan; đổi hành vi agent/workflow cần các ca đại diện và ca từng thất bại trong phạm vi bị ảnh hưởng; khẳng định cải thiện chất lượng/chi phí cần so Baseline với Candidate trên đầu vào, tiêu chí và điều kiện đủ tương thích. Chưa đặt số lượt chạy cố định. Thiếu căn cứ giữ Verdict là Inconclusive; các kiểm tra bắt buộc theo release policy vẫn áp dụng. Việc thiếu bằng chứng cho tuyên bố cải thiện không được chuyển thành tuyên bố đã cải thiện chỉ vì chức năng nạp/chạy được.

Các bổ sung này chốt policy ngữ nghĩa; không yêu cầu mọi patch chạy so sánh toàn bộ Baseline/Candidate, không thay quy tắc reuse release check và không tự chứng minh tương thích hoặc an toàn vận hành.

## Bổ sung đã xác nhận — điều kiện Fix-forward

Chỉ coi lỗi là còn kiểm soát được để Fix-forward khi đủ bốn điều kiện: khoanh được phạm vi ảnh hưởng bằng bằng chứng; chặn được công việc và tác động ngoài thuộc phạm vi lỗi; trạng thái cần thiết còn đọc được và các kiểm tra toàn vẹn liên quan đạt; đường chẩn đoán/sửa lỗi vẫn hoạt động với quyền cần thiết. Ví dụ bộ kéo Backlog lỗi nhưng có thể tắt riêng, inbox còn nguyên và workflow khác không bị ảnh hưởng thì được sửa tiếp bằng Fix-forward.

Chưa đủ điều kiện thì tạm dừng admission theo phạm vi cần thiết và đối soát trước; phạm vi chưa rõ vẫn dừng toàn bộ admission theo policy hiện hành. Plugin không khởi động hoặc mất khả năng tự sửa dùng Recovery độc lập, tương thích dữ liệu hiện tại. Không suy từ việc chưa đủ điều kiện Fix-forward rằng được tự restore dữ liệu cũ. Các probes, effect boundary, quyền thực thi và kiểm toàn vẹn cụ thể vẫn phải thiết kế/kiểm chứng.
