# Release execution — thiết kế kỹ thuật đang làm rõ

2026-10-22. [Policy đã chốt](release-policy.md) · [Modules](modules.md) · [Bằng chứng Paseo](paseo-spike-results.md).

Đây là đề xuất implementation, chưa là khả năng Paseo đã kiểm chứng hoặc quyết định chấp nhận toàn bộ. Không triển khai plugin production trong vòng này.

## Điểm tựa và giới hạn

Spike local daemon 0.11.1 đã chứng minh một worker Codex sống qua plugin reload và plugin mới gắn lại cùng agent. [Bằng chứng bổ sung 0.12.0](release-verification-results.md) kiểm daemon stop/start bằng home riêng: watcher recovery đã chạy trước khi stop, quan sát daemon không khả dụng, phát hiện plugin failed khi daemon lên lại rồi phục hồi về running. Đây chưa là bằng chứng reboot/power loss, resume Workflow Run/agent qua faulty update hoặc giữ runtime revision cũ; không suy ra mọi provider/phiên bản có cùng hành vi. Theo [A02](history/architecture-a02-2026-10-23/acceptance-a02.json), startup V1 dựa vào Paseo/máy/người dùng, không thêm cam kết OS bootstrap riêng.

Skill Paseo Plugin mô tả reload dừng subprocess và reload lỗi để plugin ở trạng thái failed. Vì vậy lời gọi activation không thể phụ thuộc một promise trong chính subprocess được thay. Tài liệu online đã thử đọc lại trong vòng này nhưng web trả unsupported content-type, HTTP trực tiếp trả 403; chưa có xác nhận mới từ online docs. Thiết kế dựa trên bằng chứng local và skill đã đọc.

## Interface và ownership đề xuất

Giữ module Releases hiện có. Chat/panel chỉ yêu cầu activation và đọc trạng thái. Caller không tự khóa, gọi reload rồi quyết định thành công.

```ts
interface Releases {
  requestActivation(input: {
    requestId: string;
    candidateDigest: string;
    expectedActiveRevision: string;
  }): Promise<{ operationId: string }>;

  inspect(operationId: string): Promise<ActivationView>;
}
```

Đây là sketch, chưa phải SDK. Principal/quyền gắn tại adapter đã xác thực. Receipt chỉ xác nhận yêu cầu đã lưu bền vững. Cùng requestId/payload trả cùng operation; payload khác báo conflict. Sai active revision cần lập lại plan, không âm thầm áp candidate lên base khác. Lỗi trước acceptance trả lỗi có kiểu; lỗi sau acceptance xuất hiện trong ActivationView với bằng chứng và trạng thái chặn.

Releases sở hữu plan/ordering/evidence/activation/recovery. Work sở hữu pause/checkpoint/reconcile của Run; Releases yêu cầu chuẩn bị đúng phạm vi qua interface nội bộ, không sửa trực tiếp bảng Work. Hàng đợi kiểm và cơ chế dùng lại kết quả nằm trong implementation, chưa mở một module công khai mới.

## 1. Revision của Run

Phân biệt ba thứ: phiên bản runtime plugin, nội dung định nghĩa Run đã chọn, và tài nguyên ngoài harness có thể bị sửa tại chỗ.

- Đề xuất lưu nội dung bất biến của workflow và Agent Definition do harness sở hữu, có digest; Run tham chiếu bản cụ thể. Runtime hiện tại phải đọc được format của bản đó. Không hiểu việc pin definition là giữ cả runtime cũ chạy song song.
- Skill/Principle từ nguồn ngoài: ghi nguồn, đường dẫn và digest nội dung đã chọn. Chỉ ghi digest không giữ được nội dung cũ hoặc chứng minh provider chỉ đọc nội dung đó.
- Không fork/cô lập Skill. Trước bước mới hoặc resume cần đọc lại tài nguyên, kiểm digest. Nếu đổi/mất thì không âm thầm tiếp tục với nghĩa mới; chuyển sang replan hoặc chọn lại revision tại checkpoint. Policy này đã được xác nhận như ghi ở mục 2; exact protocol và bằng chứng thực thi vẫn cần kiểm.
- Native profile refs phải ghi cả thông tin effective thực sự quan sát được khi tạo agent. Không giả định Paseo giữ phiên bản bất biến cho mọi native profile hoặc cho phép tái tạo chính xác một model đã không còn khả dụng.
- Agent đang chạy có thể đọc file sau lần kiểm digest. Phát hiện drift trước dispatch không phải cơ chế snapshot/isolation, không bảo đảm tái lập hoàn toàn. Nếu nghiệp vụ cần bảo đảm mạnh hơn phải nêu thành yêu cầu riêng, không thêm provider patch ngầm.

## 2. Dùng lại kết quả kiểm

Đề xuất triển khai đơn giản trước: cùng candidate chính xác thì gộp yêu cầu trùng và dùng lại kết quả đạt. Chưa cache xuyên candidate dựa trên suy đoán dependency graph.

Đã xác nhận sau vòng phỏng vấn: phát hiện Skill drift trước bước mới, chỉ reuse checks cùng candidate/inputs/environment, và executable recovery độc lập được khởi chạy trước reload. Các protocol chi tiết bên dưới vẫn là thiết kế cần kiểm chứng.

Check identity gồm candidate digest, phiên bản check/lệnh, inputs/config/dependencies liên quan và môi trường đã nhận diện được. Lưu trạng thái, exit/result, thời gian, identity và evidence. Kết quả lỗi/timeout không biến thành đạt do cache.

Kiểm phụ thuộc trạng thái live hoặc dịch vụ ngoài không mặc định dùng lại. Startup/health sau activation phải gắn operation và runtime instance mới; không dùng health của lần trước. Nếu sau này muốn cache xuyên candidate, cần khai báo và chứng minh đầy đủ tập đầu vào của check.

Một hàng đợi bền vững gộp check có cùng identity; một slot cho kiểm nặng mặc định. Restart phải đối soát tiến trình kiểm cũ trước khi giải phóng slot hoặc chạy lại. Cache miss là tốn thêm thời gian kiểm, không phải lý do chặn vô hạn khi còn có thể chạy lại an toàn.

## 3. Activation và recovery

Đề xuất có một executable recovery nhỏ đi cùng plugin, chạy ngoài subprocess plugin. Trong một lần activation nó theo dõi journal, gọi Paseo qua adapter và tiếp nhận kết quả startup; không thêm cloud service hoặc một sản phẩm CLI quản trị đầy đủ. Cách khởi chạy tách rời và tự tiếp tục sau host restart cần spike, chưa được chứng minh.

Journal ghi intent trước mỗi tác động ngoài, với operationId/candidate/expected base, bước đã hoàn tất và evidence. Chỉ một actor sở hữu activation; chống hai actor tiếp tục cùng operation sau restart. Không dùng lock đã hết hạn làm bằng chứng actor cũ chắc chắn đã ngừng tác động.

Thứ tự đề xuất:

1. Chốt candidate bất biến, check plan và bằng chứng đúng digest.
2. Giữ quyền activation; kiểm lại active revision và dữ liệu liên quan sau thời gian chờ.
3. Work đưa phạm vi bị ảnh hưởng tới checkpoint; chuẩn bị backup nếu policy yêu cầu. Chưa rõ ảnh hưởng thì hoãn.
4. Xác minh executable recovery, bản phục hồi và tương thích schema; ghi intent trước khi chuyển nguồn plugin/reload.
5. Reload đúng plugin ID; đối soát trạng thái nguồn/bản thực sự được nạp nếu phản hồi bị mất. Không retry reload hoặc migration mù.
6. Kiểm startup/kết nối và chức năng thay đổi; chỉ tiếp tục công việc phụ thuộc sau các kiểm bắt buộc phù hợp.
7. Đạt thì ghi kết quả. Lỗi khoanh vùng được thì chặn phần đó và tạo việc fix-forward; lỗi khiến plugin không thể khởi động/tự sửa thì recovery độc lập.

Bản phục hồi cần còn artifact khởi động được và đọc được schema dữ liệu hiện tại. Không chọn chỉ vì nó từng pass. Không tự restore toàn bộ DB cũ nếu có thể làm mất work/effect đã commit sau backup. Khi không có đường phục hồi tương thích đã kiểm chứng, dừng thao tác có thể làm hỏng thêm và báo blocker qua đường recovery độc lập; cần thiết kế cách hiển thị khi UI plugin không chạy.

Executable recovery cũng có thể được cập nhật, nhưng không tự ghi đè bản đang thực hiện activation. Đề xuất giữ bản đã kiểm chứng cho operation hiện tại; thay bản dùng cho operation sau bằng một bước có kiểm chứng và recovery. Protocol cụ thể đang mở.

## Bằng chứng cần có trước khi gọi là triển khai được

- Revision: Run cũ tiếp tục dùng definition cũ; Skill nguồn đổi thì phát hiện trước bước cần đọc lại; không tuyên bố skill isolation.
- Checks: cùng identity chỉ chạy một lần, thay input chạy lại; health của runtime cũ không được tái sử dụng; restart không nhân đôi kiểm đang chạy.
- Activation: reload làm RPC mất phản hồi vẫn xác định đúng trạng thái; hai yêu cầu cạnh tranh không cùng chuyển nguồn plugin.
- Recovery: plugin cố tình không khởi động, executable độc lập vẫn khôi phục được; giữ dữ liệu hiện tại tương thích; migration không tương thích không bị rollback code mù.
- Tài nguyên: đo riêng chi phí chuẩn bị/check/reload/reconcile; không dựng benchmark toàn hệ thống cho mỗi patch.

Kiểm qua SQLite/thư mục/Git repo tạm thật và scripted Paseo adapter cho lỗi có thể tái lập; sau đó thử plugin dùng một lần trên host thật với phạm vi được cho phép. Chưa chạy thêm live operation trong vòng thiết kế này.

## Kết quả spike cục bộ

[Code và hướng dẫn](../../spikes/release-execution/README.md): 11/11 ca kiểm Node đạt, không gọi Paseo. Đã kiểm detector Skill drift; gộp/reuse check cùng identity, invalidation và một slot kiểm nặng trong một process; recovery bằng executable Node riêng với plugin mô phỏng lỗi, giữ dữ liệu hiện tại, từ chối schema/artifact không phù hợp và đối soát gián đoạn sau chuyển source.

Ca gián đoạn sau đổi source ban đầu phát hiện lỗi: journal chưa ghi hoàn tất khiến recovery nhận nhầm bản đã phục hồi là drift. Đã sửa để đối soát phase `recovering` và digest fallback trước khi hoàn tất journal; vẫn từ chối source không liên quan.

Đây chưa phải SQLite queue bền vững hoặc giữ definition cũ trọn vòng Run. Bằng chứng recovery Paseo thật bổ sung bên dưới; không cập nhật prototype UI để giả rằng toàn bộ khả năng đã chạy được.

## Kết quả recovery trên Paseo thật

[Code/hướng dẫn](../../spikes/release-paseo-live/README.md) và [evidence](../../spikes/release-paseo-live/evidence/live-summary.json), 2026-10-22, local daemon 0.11.1:

- Plugin dùng một lần chạy ở PID 490; watcher recovery độc lập PID 511 đã sẵn sàng trước lỗi, launcher PID 510 đã thoát.
- Candidate typecheck đạt nhưng contribution cố tình ném lỗi. Reload trả exit 1, plugin đúng ID chuyển `failed`.
- Driver báo fault đã quan sát; executable recovery tự kiểm status/source/schema fixture, phục hồi nguồn rồi reload cùng ID về `running`, PID mới 619.
- Hash dữ liệu fixture trước/sau trùng; executable không restore dữ liệu cũ. Ghi kết quả recovery ra file độc lập UI plugin.
- Đã gỡ plugin thử nghiệm; plugin có sẵn giữ cùng ID/path/enabled/status.

Đã chứng minh được recovery không phụ thuộc subprocess plugin bị lỗi, với launcher đã thoát và watcher chạy trước faulty reload. Chưa chứng minh tự phát hiện lỗi hoàn toàn, fencing nhiều actor, host/daemon restart, migration/SQLite thực, tiếp tục Workflow Run, client UI recovery hay tự cập nhật executable recovery. Chưa có ngân sách thời gian production được suy ra từ một lượt đo.

## Vòng kiểm bổ sung

[Release verification results](release-verification-results.md) bổ sung 25 ca đạt: 11 ca Node chạy lại, 10 ca SQLite/executable với DB/process thật trong môi trường tạm và 4 ca Paseo trên daemon riêng 0.12.0. Đã kiểm worker restart, stop/start toàn daemon với watcher tự phát hiện lỗi và chịu mất kết nối, fallback bị sửa bị từ chối, operation mới retry thành công. SQLite/migration và executable update hiện là kiểm cơ chế cục bộ, chưa tích hợp vào live plugin self-update. Các giới hạn của lượt 0.11.1 ở trên là lịch sử; trạng thái bằng chứng hiện hành lấy từ báo cáo bổ sung. Chưa kiểm host reboot, resume Run/agent, client UI, persistent queue hoặc fencing nhiều actor.
