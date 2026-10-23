# Onboarding implementation specification

2026-10-23. Đặc tả kỹ thuật để triển khai lát cắt đầu tiên; **chưa có implementation production hoặc kết quả nghiệm thu cho protocol này**. Các quy tắc sản phẩm kế thừa [Onboarding Agent](onboarding-agent.md), [contracts](onboarding-contracts.md), [configuration](configuration.md) và owning glossaries. Types, tên command nội bộ và trạng thái lưu trữ dưới đây là đề xuất engineering, không phải API Paseo hoặc thuật ngữ UI mới.

## 1. Kết quả của lát cắt

Người dùng mở menu plugin trong project/workspace đã có, Spawn Onboarding Agent, cấu hình bằng native chat/MCP, lưu Build Readiness và Handover, rồi chủ động Spawn Harness Engineering Orchestrator. Reload/reconnect phải nhận lại đúng Session và thao tác đã ghi. Một lần bấm lại không tạo một orchestrator mới.

Điểm kết thúc kiểm được: Engineering Session nhận và xác nhận đúng Handover đã pin. Việc Engineering thực sự dựng các workflow, lịch và Project Orchestrator thuộc lát cắt tiếp theo. Menu vẫn thể hiện bước Project; nó chỉ cho Spawn khi có Launch Readiness và Handover hợp lệ do bước dựng tạo ra. Không báo đã dựng chỉ từ lời xác nhận bàn giao.

Không đổi scope V1: scheduler tổng quát, hai closed loops, Backlog/GitLab, Analytics và tự cập nhật toàn plugin vẫn bắt buộc. Lát cắt này thiết lập đường cấu hình/khởi chạy bền vững để các phần đó dùng chung.

## 2. Module và caller

Theo [A01](history/architecture-a01-2026-10-23/acceptance-a01.json) và [A09](history/architecture-a09-2026-10-23/acceptance-a09.json), bản đồ hiện hành có tám module trong [modules.md](modules.md), gồm AgentDefinitions, Analytics và Knowledge. Lifecycle/Session ownership và Tracked Operations thuộc implementation của **Work**; [A02](history/architecture-a02-2026-10-23/acceptance-a02.json) giao Work cả revisions và Interface chỉnh Actions/Limits/Delegation Policy. Cấu hình catalog/Agent Definitions và role/Skill/Principle bindings gọi **AgentDefinitions**; các cấu hình khác đi qua owner tương ứng. Readiness tổng hợp các revision/checks từ owner, không tạo thêm public Settings hoặc Onboarding module giữ bản active config riêng. Analytics phục vụ query/Saved Views, không quyết định readiness thay các owner.

| Caller / adapter | Interface được dùng | Không phải trách nhiệm của caller |
| --- | --- | --- |
| Menu client → plugin RPC | Đọc lifecycle projection; Start/Open/Replace theo quyền người dùng | Tự gọi SDK tạo agent, ghi binding, quyết định đã sẵn sàng |
| Onboarding MCP | Inspect, configure, check, complete, operation read, guidance | Tự Spawn Engineering/Project hoặc tự cấp quyền |
| Engineering MCP | Đọc/xác nhận Handover; về sau ghi kết quả dựng qua owner tương ứng | Đánh dấu build thành công chỉ bằng ack |
| Work reconciler | Tiếp tục operations đã commit, kiểm native resources và ghi projection | Suy trạng thái từ câu trả lời tự do của agent |
| Paseo adapter | Resolve context/profile, create/read/send/stop khi capability đã kiểm | Sở hữu config harness hoặc kết luận readiness |

UI/MCP dùng cùng validation, authority, receipts và revisions. Có thể tách adapter/process về sau; caller không học protocol SQLite/Paseo. MCP response và lifecycle projection chỉ trả dữ liệu cần dùng, phân trang history, dùng refs cho Artifact lớn; không đọc toàn transcript để dựng menu. Các lệnh nhận việc không đợi một Agent Turn hoàn tất.

## 3. Bootstrap, context và quyền

Trước Spawn Onboarding, resolve host/project/workspace hiện có và một native profile đã tồn tại, từ native context hoặc lựa chọn người dùng. Thiếu thì nêu dependency và dẫn tới native surface. Không tự tạo profile, chọn một host khác hoặc lấy cwd làm bằng chứng workspace đã đúng.

Server bind context đã xác thực gồm scope của Project Harness, native refs, principal, Session ID và quyền thực tế. Agent không gửi các trường này để tự nhận vai trò. Credential MCP riêng theo Session, có thể thu hồi; endpoint URL/port không phải identity. Harness loại secret khỏi receipts, Handover, transcript, export và log. [T03](history/technical-t03-2026-10-23/acceptance-t03.json) chọn HTTP MCP với token trong config riêng từng Session, được Paseo lưu như native Session JSON; không đặt trong native profile dùng chung. Native-log redaction, reload và provider interoperability vẫn phải kiểm; không sao chép bearer dùng chung theo role của spike thành production.

Onboarding được thay các cấu hình nằm trong quyền đã cấp. Quyền mở rộng hoặc ngân sách mới cần nguồn quyết định của người dùng được owner xác minh; câu agent viết “người dùng đã đồng ý” không tự tạo grant. Không thêm một approval cho mọi thao tác cấu hình thông thường đã được cấp quyền.

Onboarding Agent là helper ban đầu, có Session reference riêng. **Orchestrator Session Binding** chỉ gắn hai Orchestrator Responsibilities: Harness Engineering và Project. Việc lưu Session Onboarding không tạo trách nhiệm orchestrator thứ ba.

## 4. Dữ liệu tối thiểu và revision

Config khởi đầu tham chiếu những tài sản đã có, theo [configuration.md](configuration.md):

| Trường logic | Validation bắt buộc |
| --- | --- |
| Project/workspace binding | Đúng host và project đích đã có codebase; đọc lại native refs và root được cấp |
| Initial goal | Nội dung không rỗng, có nguồn; đủ xác định phạm vi dựng ban đầu |
| Engineering Agent Definition | Definition revision, ordered native profile refs; entry Skill và result contract tương ứng hợp lệ |
| Skill/Principle sources | Catalog/nguồn trên đúng host, truy cập được trong quyền đã cấp; Skill được nêu rõ tên và nguồn; Principle mode hợp lệ |
| Limits/Actions | Giá trị hợp schema, không vượt grant; đủ cho phần dựng dự kiến; trần/budget không đo hoặc enforce được phải hiện unavailable |

Native profile cho Onboarding được chọn trước khi Session tồn tại; profile/definition của Engineering phải đủ trước Build Readiness. Project definition có thể được dựng sau. Backlog/GitLab, lịch polling và specialists chưa dùng là optional gaps. Thiếu một dependency bắt buộc chỉ chặn bước phụ thuộc; không lấy các giới hạn hai Sessions/180 giây của smoke làm default sản phẩm.

Settings có `configRevision`; mỗi orchestrator binding có `bindingRevision` và authority generation riêng. Runtime writer có fencing token riêng. Các số này có mục đích khác nhau: sửa setting không đồng nghĩa thay Session; thay Session không xóa một Assignment đang chạy.

Readiness Report ghi target, config revision, các definition/policy/resource revisions, native fingerprints an toàn, adapter/plugin contract version, observed time và từng check/evidence. Handover tham chiếu report cùng dependency set/digest. Digest dùng representation được chuẩn hóa và có version; không hash raw JSON có thứ tự trường tùy ý hoặc nội dung secret.

Native config không có revision đáng tin thì fingerprint từ các trường liên quan đã whitelist; trạng thái không đọc được là `unknown`, không tái sử dụng cache như quan sát mới. Profile snapshots là evidence/pinned execution input; Paseo vẫn sở hữu native config active.

## 5. Interface và idempotency

MCP surface chi tiết tại [onboarding-contracts.md](onboarding-contracts.md). Internal command envelope dùng chung giữa RPC/MCP gồm `requestId`, schema version, expected revisions của tài sản bị sửa và payload có schema hữu hạn. Trusted caller context được adapter bind riêng. Unknown fields, arbitrary path/value patch, shell và SQL bị từ chối.

Các lệnh lifecycle đề xuất cho menu:

```ts
// Sketch của Work; không phải các methods SDK Paseo.
start({ requestId, stage, expectedBindingRevision, handoverRef? });
open({ stage });
replace({ requestId, responsibility, expectedBindingRevision, handoverRef });
readLifecycle({ after?, limit });
readOperation({ operationId });
```

`stage` chỉ chọn Onboarding/Engineering/Project trong scope đã bind; không cấp quyền. `start` cần một thao tác người dùng đã xác thực và prerequisite đúng stage. MCP cấu hình không expose `start` hoặc `replace`. `open` trả Session reference hiện có, không chạy lại prompt và không đòi cấu hình cũ vẫn đủ để cho người dùng đọc chat.

Một mutation được nhận khi **cùng transaction SQLite** ghi thay đổi/operation intent, receipt và durable pending work cần xử lý. Trả receipt sau commit. Bước thuần local có thể hoàn tất tại commit; native effect chỉ được nhận để xử lý. Receipt không chứng minh agent đã được tạo hoặc nhận prompt.

Lifecycle projection giữ riêng Session ref, current binding revision, operation ref/phase, readiness target/report, observation time và initial Assignment delivery/ack. Binding đã có nhưng ack chưa về vẫn mở được chat; menu không báo bước dựng hoàn tất. Khi một start/replace còn pending, browser theo dõi cùng operation thay vì tạo request thay thế. Tên các phase lưu trữ không tự trở thành nhãn UI; dùng các lifecycle labels đã duyệt trong [UI glossary](../ui/GLOSSARY.md#orchestrators).

Thứ tự nhận command:

1. Xác thực principal/scope và quyền hiện hành, validate/canonicalize input.
2. Tra idempotency key theo `(scope, principal, command, requestId)`. Cùng payload trả receipt đã commit; khác payload trả `IdempotencyConflict`.
3. Với request mới, kiểm expected revisions, current authority, prerequisites và giữ chỗ cho operation.
4. Commit receipt/intent trước I/O ngoài. Không giữ transaction/DB lock qua network, chờ agent hoặc đọc file lớn.

Replay trả **receipt của lần nhận trước**, kể cả config đã đổi sau đó; UI đọc projection hiện tại để biết readiness/operation còn hiệu lực không. Replay không thực hiện lại effect và không bỏ qua thu hồi quyền hiện hành. Khi không biết request trước đã commit hay chưa, dùng lại request ID, không sinh một request mới để thử vận may.

Lỗi trước acceptance: `InvalidInput`, `Forbidden`, `RevisionConflict`, `IdempotencyConflict`, `DependencyChanged`, `StorageUnavailable`. Sau acceptance, thiếu capability, provider offline hoặc kết quả mơ hồ nằm trong Tracked Operation/projection kèm reason và evidence. Timeout/disconnect của caller không tự hủy operation.

## 6. Check → Handover → Start

`check(target)` thu observations ngoài write transaction, rồi lưu report gắn đúng revisions nếu state vẫn khớp. Nếu state đổi khi đang check, bỏ kết luận vừa tính và báo conflict. Check có ba kết quả `pass | blocked | unknown`; unknown ở điều kiện bắt buộc chặn bước đó.

| Check | Harness build | Project launch |
| --- | --- | --- |
| Context | Project/workspace/root resolve đúng quyền | Cùng context hoặc thay đổi đã ghi nhận hợp lệ |
| Agent configuration | Engineering definition/native refs/entry resources hợp lệ | Project definition/native refs/instructions và required tools hợp lệ |
| Authority/capability | Đủ cho phần dựng dự kiến; không giả quyền ghi/test | Đủ cho phạm vi launch; capability chưa có chặn phần phụ thuộc |
| Program/catalog | Hướng dẫn/phương pháp dựng và result contract hợp lệ | Catalog/policy/programs bắt buộc cho mục tiêu ban đầu đã validate |
| Limits | Có thể admit bước dựng trong giới hạn đã cấp | Có thể admit lượt launch trong giới hạn đã cấp |
| Handover | Lưu cấu hình, mục tiêu, refs, gaps và bước tiếp | Lưu đầu ra dựng, refs/evidence, gaps và bước tiếp |

`onboarding_complete` là finalize cho **Harness build**: reobserve dependencies cần thiết, kiểm report/config vẫn khớp, rồi commit Handover bất biến cùng receipt. Không tự Spawn hoặc đổi report cũ. Engineering chuẩn bị Project launch qua cùng quy tắc finalize của owner; tool authoring cho toàn bộ bước dựng nằm ngoài lát cắt này.

Handover không cấp quyền và không thay **Checkpoint**. Nội dung gồm source stage, context, goal, config/definition/policy/resource refs, limits/grants refs, report/dependency fingerprints, kết quả/evidence/operations/work còn liên quan, gaps và next step. Chỉ lưu credential references được phép khi cần, không lưu secret value. Bản mới có identity/revision riêng, bản cũ giữ để truy vết.

Khi người dùng bấm Start, runtime revalidate config, report, Handover và native dependencies; không tin nút đã enabled trong browser. Nếu đã có Session hiện hành, trả reference để Open; config drift không được biến một lần bấm thành tạo Session thay thế. Nếu đang có start/replace chưa rõ kết quả, trả operation đó.

Không có transaction giữa SQLite và native owner. Đổi native profile/resource sau check vẫn có thể xảy ra: runtime resolve snapshot ngay trước create, read back native placement/effective config sau create, và kiểm lại dependencies liên quan trước dispatch. Drift không tương thích thì giữ Session chưa được giao việc và báo blocker. Nếu provider/adapter không chứng minh được một capability hoặc cách áp pinned input bắt buộc, không công nhận check đó pass. Quan sát trước/sau không phải cam kết atomic pin mọi trạng thái native.

## 7. Start và dispatch: thứ tự bền vững

Start có hai effect riêng: tạo/nhận lại native Session và giao initial Assignment. Mỗi effect có identity, input digest và outcome riêng. Một Agent Turn kết thúc không hoàn tất thay cho hai effect này.

| Bước | Trạng thái đã commit trước effect / hành động | Điều kiện tiếp tục |
| --- | --- | --- |
| S1 | Request, chosen refs, Handover, reservation cho stage và create intent | Chỉ một operation chưa kết thúc giữ reservation của stage |
| S2 | Runtime claim với fencing token; revalidate quyền/prerequisites | Không giữ SQLite transaction khi gọi Paseo |
| S3 | Create native Session chưa giao initial task; gắn operation correlation | Native idempotency chỉ dùng theo capability đã kiểm |
| S4 | Lưu Session ID ngay khi nhận; readback host/project/workspace/effective config | Sai placement/config thì blocked; không gửi prompt |
| S5 | CAS binding revision, gắn current Session/authority generation; ghi initial Assignment và send intent | Onboarding dùng helper reference, hai orchestrator dùng Orchestrator Session Binding |
| S6 | Gửi initial Assignment gồm Handover ref/digest, resources và result contract đã pin | Không gửi lần hai khi kết quả send chưa rõ |
| S7 | Ghi bằng chứng native đã nhận; Session đọc/xác nhận Handover qua owner | Ack kiểm digest/revision và Session binding hiện hành |

S1/S5/S7 là local commits riêng, không giả tất cả nằm trong một transaction. Trước send phải ghi Attempt khi Assignment đã được admit, theo D02. Reconcile cùng effect mơ hồ vẫn giữ Attempt và Assignment đó. Theo [GA01 đã chốt](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance), retry/fallback được phép và thực sự giao lại việc tạo Attempt và Assignment mới, kể cả trên cùng Session; Assignment mới liên kết lần giao trước. Với retry kỹ thuật của một Workflow Step, Attempt mới thuộc cùng Step Run. Không suy rằng mọi Assignment ngoài workflow đều phải có Step Run; representation lifecycle cụ thể vẫn thuộc thiết kế kỹ thuật. Agent hỏi thêm/tiếp tục qua nhiều Turns không tự là redispatch. Ack xác nhận đã nhận đúng Handover, chưa chứng minh Engineering dựng xong hoặc Project đã thực hiện thành công task.

Runtime không coi `send()` trả về là đã xử lý nội dung. Khi native response chỉ chứng minh đã nhận, ghi đúng mức bằng chứng đó và chờ ack. Native idle không thay ack. Provider có thể chờ permission; không tạo Session khác để vượt trạng thái này.

## 8. Reload, reconnect và kết quả mơ hồ

Startup/reconnect, signal live và lượt kiểm định kỳ đều đánh thức reconcile. Nguồn sự thật là operations/bindings/Assignments đã commit; mất signal không làm mất việc. Client đọc snapshot mới sau reconnect rồi mới nối lịch sử từ cursor hợp lệ. Readiness trong projection luôn nêu thời điểm quan sát và pending checks; offline không biến thành ready.

| Điểm gián đoạn | Reconcile phải làm | Tuyệt đối không suy ra |
| --- | --- | --- |
| Commit trước create, chưa biết đã gọi native chưa | Đọc operation; kiểm owner/runtime cũ và correlation | Chưa có Session ID nghĩa là chưa tạo |
| Create đã xảy ra, response/commit mất | Tìm đầy đủ các trang theo correlation; kiểm scope/config | Kết quả list rỗng tạm thời đủ để create lại |
| Có đúng một Session khớp | Nhận lại ID, kiểm placement/config, tiếp tục cùng operation | Session cùng title bất kỳ là cùng operation |
| Nhiều Session khớp | Giữ blocked, lưu các refs, đối soát quyền/effects | Tự chọn một bên rồi cho cả hai tiếp tục |
| Send response mất hoặc thiếu ack | Đọc bằng chứng delivery/Turn/result qua adapter; kiểm ack theo Assignment | Agent idle hoặc list không có kết quả nghĩa là được gửi lại |
| Reload sau binding/ack commit | Attach đúng Session; dựng projection từ state | Mỗi lần reload cần agent hoặc initial prompt mới |

Chỉ retry create/send nếu có bằng chứng effect chưa được nhận, hoặc native contract idempotency **cho chính effect đó** đã kiểm đủ scope/key/payload/retention. Passing một `idempotencyKey` vào SDK không chứng minh semantics; labels chỉ giúp tra cứu, không ngăn tạo trùng. Không có bằng chứng thì giữ trạng thái cần đối soát, nêu lý do và đường xử lý.

Lease hết hạn chưa chứng minh network request cũ đã dừng. Fencing trong SQLite ngăn writer cũ commit nhưng không tự ngăn nó gây effect trên Paseo. Owner mới cần đối soát/khống chế runtime cũ và native effects trước khi thử lại; không đạt thì chặn effect mới. Không hứa exactly-once.

MCP endpoint có thể đổi khi reload; adapter phải chứng minh cách reattach/rebind credential cho Session cũ. Không có capability đó thì hiện blocker và hướng dẫn phục hồi; không tự spawn Session khác. Plugin reload không được dùng để làm mất dấu operation đang chờ.

## 9. Replace Session và authority

Open Session chỉ điều hướng. Replace Session là command riêng, cần đúng expected binding revision, Handover và quyền của người dùng. Archive/mất native Session hiện hành không tự mở quyền tạo bản thay thế.

Thứ tự Replace:

1. Commit replacement operation, Handover và trạng thái chuyển giao; chặn admission quản lý mới từ Session cũ cho responsibility đó.
2. Đối soát Assignments/effects đã nhận. Worker đang chạy giữ identity, pinned scope và evidence; không mặc định cancel hoặc chạy lại.
3. Thu hồi quyền phát việc của Session cũ ở owner interfaces và kiểm effect paths ngoài owner, gồm native tools/shell. Nếu không enforce được revocation ở đó, phải chứng minh Session cũ đã dừng trước khi cấp quyền cho Session mới. Stop response chưa đủ nếu hiệu ứng cũ còn mơ hồ.
4. Tạo/nhận lại Session mới qua cùng S1–S4; nó chưa có authority điều phối.
5. CAS binding sang generation mới; commit initial Assignment/handover intent, rồi dispatch/ack như S6–S7.

Mỗi command điều phối từ agent kiểm current Session ID + authority generation ở owner; credential hết hiệu lực không được tái dùng chỉ vì role string giống nhau. Worker kết thúc muộn được ghi dưới Assignment/Attempt gốc và kiểm tính áp dụng; nó không phục hồi authority cho orchestrator cũ hoặc ghi đè kết quả mới.

Gián đoạn ở bất kỳ bước nào giữ operation đang chuyển và reconcile. Không tự tái kích hoạt Session cũ sau khi đã revoke chỉ vì tạo Session mới lỗi. Giữ lịch sử; archive là tác động native riêng cần policy/quyền tương ứng.

## 10. Acceptance matrix cho implementation

Các dòng dưới đây **chưa pass production**. Local tests chạy qua cùng owner interface với SQLite/FS thật tạm, scripted Paseo adapter và fake clock khi cần; không dùng mock-memory store làm bằng chứng durability. Live tests dùng plugin/Session disposable, scope được cấp và evidence đã lọc. Không cần chạy lại live chỉ vì sửa tài liệu.

| ID | Tình huống / kết quả bắt buộc | Bằng chứng cần có |
| --- | --- | --- |
| OB01 | Context/profile thiếu: chỉ rõ dependency; không tạo native resource ngoài lựa chọn | Local + native context/menu |
| OB02 | Config đủ tối thiểu, integrations chưa dùng: build checks pass và ghi gaps | Local; smoke cũ chỉ chứng minh subset |
| OB03 | UI/MCP sửa cùng revision; một bên conflict, không mất thay đổi | Local concurrency qua interface |
| OB04 | Replay configure/complete sau revision mới trả receipt cũ; payload khác conflict; quyền bị revoke không gây effect mới | Local restart + auth |
| OB05 | Goal/profile/Skill/grant đổi giữa check, complete và start: report/Handover cũ không mở launch | Local race + native readback |
| OB06 | Commit rồi crash trước/sau create: nhận lại đúng Session hoặc giữ unresolved; không retry mù | SQLite reopen + live fault injection |
| OB07 | Lost send/ack: không tạo Assignment hoặc Turn trùng; thiếu bằng chứng phải chờ đối soát | Scripted + live correlation |
| OB08 | Nhấn Start lặp hoặc hai client cùng bấm: một reservation; Open đúng Session | Local concurrency + menu thật |
| OB09 | Reload khi mutation/create/send đang dở; credential reattach; giữ IDs/receipts | Live in-flight reload |
| OB10 | Native create đặt sai workspace/config hoặc profile drift: không dispatch | Local + native placement/config |
| OB11 | Replace bị ngắt; Session cũ gửi command/shell; worker cũ trả kết quả muộn | Local + native enforcement trên Claude/Codex |
| OB12 | Restart/reconnect mất event, list phân trang/duplicate, lease cũ còn request: reconcile không mở hai owner | Local + native restart/fault injection |
| OB13 | Inspect/export/error/log không lộ credential; principal/context giả bị từ chối | Local transport/auth + evidence review |
| OB14 | Engineering ack đúng digest sau user Start; Project action vẫn chưa cho launch khi chưa dựng/check đủ | Local + native menu/2 Sessions |

## 11. Bằng chứng hiện có và thứ tự triển khai

[Spike 2026-10-22](onboarding-spike-results.md) đã kiểm config/check/complete subset, hai native Sessions, duplicate Spawn qua owner, reload giữa các bước và Engineering ack đúng Handover. Đây là Codex/daemon 0.11.1; không suy thành parity Claude hoặc contract daemon 0.12.0. Spike không kiểm mất create/send response, in-flight reload, Replace, multi-writer fencing hoặc menu thật.

Không copy nguyên owner spike: nó giữ file lock khi await native I/O; credential chia theo role, không gắn authority generation; replay `complete` recheck state trước trả receipt; send intent chưa có protocol xác minh delivery khi response mất. Đây là chỗ implementation mới phải đáp ứng các hợp đồng trên, không đổi bằng chứng lịch sử thành fail/pass mới. Source spike và evidence được giữ nguyên.

Thứ tự làm code:

1. Owner commands + SQLite transaction/receipts/revisions/reservations; kiểm OB02–OB05/OB08/OB13 qua interface.
2. Production Paseo adapter và scripted adapter: create/send correlation, context/config readback, ambiguous effects và reconciliation; kiểm OB06/OB07/OB10/OB12.
3. Menu/RPC + MCP vào cùng owner; native navigation, per-Session credentials và reload; kiểm OB01/OB09/OB14.
4. Replace/revocation/enforcement và Claude/Codex parity; kiểm OB11 và lặp lại các ca native liên quan trên versions được chọn.

Lát cắt hoàn tất khi các ca thuộc phạm vi này có evidence đúng lớp và không còn giả native capability. Trước đó chỉ gọi là implementation đang kiểm. SQLite driver/schema DDL, transport credential storage, native navigation methods và provider/version pins được chọn trong bước code/probe; không bắt người dùng đoán những chi tiết đó hoặc tạo một thư viện orchestration tổng quát trước khi có caller.
