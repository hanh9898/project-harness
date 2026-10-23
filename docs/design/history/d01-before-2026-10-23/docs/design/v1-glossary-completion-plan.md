# Project Harness V1 — coherent draft and completion plan

2026-10-22. Bản thiết kế toàn phạm vi để review, **chưa phải glossary cuối cùng**. Bản draft ban đầu không sửa production/runtime, native config hoặc các owning definitions đã duyệt; những phần được xác nhận trong các vòng review được ghi tại cuối trang và chuyển về owning glossary. Phương pháp ontology/competency questions đã được người dùng chấp nhận trong brief hiện tại; nội dung đề xuất của mô hình này chưa vì thế được chấp nhận.

## Read / review

- [Register JSON](v1-concept-register.json) là nguồn draft có thẩm quyền cho các views mới: stable concept/relation/constraint IDs, owner, status, nameStatus, exact source excerpts/line ranges, cardinality, mappings và pending decisions.
- [Graph/register browser](v1-concept-graph.html): global overview tổng hợp cạnh thật theo nhóm nghĩa; tám focused views và node neighborhoods; tất cả concepts, directed relations, constraints, questions, mappings và nguồn đọc được/search/filter được.
- [Requirement/CQ/answer/mapping ledger](v1-competency-ledger.md): 14 nhóm requirement → 51 tình huống/CQs → concepts/relations/constraints → owning definitions/UI/code mappings. CQ01–CQ30 giữ câu hỏi ban đầu; CQ31–CQ50 rà thêm stale state, mất quyền, race, update và failure; CQ51 truy vết điều kiện tái sử dụng kết quả một phần vừa chốt.
- [Validation](v1-concept-validation.md): kiểm tham chiếu và giới hạn kiểm chứng. Chạy `python3 docs/design/build-v1-concept-views.py --check`; không cài dependency. HTML template chỉ trình bày, JSON chứa model; regenerate bằng cùng lệnh không có `--check` sau khi sửa register.

Các nguồn phương pháp được giữ trong [method proposal](glossary-concept-model.md): [Noy/McGuinness](https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html), [Grüninger/Fox](https://www.eil.utoronto.ca/wp-content/uploads/enterprise-modelling/papers/gruninger-ijcai95.pdf), [Evans](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf). Đây là adaptation cho tài liệu khái niệm, không phải ontology reasoner hay chứng minh completeness theorem. Tinh thần deep modules được áp dụng qua explanatory leverage và locality of meaning; không coi “deep glossary” là phương pháp đã được Matt định nghĩa.

## Cách đánh giá đủ cho V1

Đối chiếu ngược từng nhóm hành vi đã chốt trong scope, configuration, delegation, onboarding, release policy và verification. Mỗi nhóm phải có tình huống thành công và biến thể có ảnh hưởng tới identity, quyền, reload, update hoặc kết luận. Mỗi câu phải có đáp án có nguồn, concept IDs, directed relation path, constraints, owner definition và mapping hoặc gap tường minh. Register hiện phủ toàn bộ 155 critical concepts bằng ít nhất một CQ, không có concept cô lập; đây là kiểm inventory/traceability của draft, không chứng nhận mọi suy luận đã được duyệt.

Không lấy số node/edge, số glossary headers hay số test UI làm phần trăm hoàn thành. `approved-sources` chỉ nói đáp án cốt lõi đã có nguồn; `definitionGaps` và `relationGaps` vẫn ghi độc lập. `inferred` là phép tổng hợp có căn cứ; `proposed` chưa là domain fact được chốt; `open` là lựa chọn thật sự chưa quyết. Một concept có meaning đã duyệt nhưng English canonical name đề xuất vẫn giữ `status=approved`, `nameStatus=proposed`. Vai trò release giữ là role có thời gian/phạm vi operation, không phải subtype Release.

Không có CQ nào chỉ dựa code mà thiếu nguồn nghĩa: code identifiers được ghi ở mappings với evidence scope. Những bằng chứng hiện có gồm fixture v9 và subset onboarding spike. Lost native create/send response, in-flight reload, Replace Session/stale-role enforcement, complete provider parity, scheduler/integrations/analytics production và full update/recovery của sản phẩm **chưa được chứng minh**. Các spike release riêng có báo cáo trong repo; không biến chúng thành bằng chứng V1 tích hợp qua mô hình này. Semantic model coverage và runtime implementation proof là hai trục khác nhau.

## Coherent paths và các phân biệt tối thiểu

Một user request đi tới Work Item, có thể chưa có hoặc có nhiều Runs. Mỗi Run chọn definition/criteria/config revisions, runtime thực thi plan và bước; Assignment đưa phần việc/context/contract tới agent; Session có nhiều Assignments qua thời gian. Outcome worker và Outcome tổng hợp giữ identity riêng. Evidence theo đúng đối tượng/phạm vi/criteria revision mới hỗ trợ Verdict; hoàn tất một Run không tự resolve request.

Nguồn lịch/event/thủ công làm Job đủ điều kiện; Schedule Occurrence không là Job Run. Job Run thực thi code/agent/workflow, có thể không tạo work mới. Poll unchanged không gọi agent. Source Event identity → committed cursor/outbox → Delivery → Work receipt phải giải thích được crash/replay mà không hứa exactly-once effect. Native cadence và code-job cadence có owner riêng, mỗi lịch một nguồn active duy nhất. Run Timer cho retry/deadline thuộc công việc hiện có.

Onboarding → scoped readiness/handover → người dùng Spawn Engineering → dựng ban đầu → launch readiness → người dùng Spawn Project → representative-work verification. Handover không là Checkpoint hoặc quyền điều phối. Role Binding nối trách nhiệm bền vững với Session hiện tại; Replace cần đối soát, chuyển quyền và enforcement thực, không chỉ prompt.

Observations/feedback → retro có thể không đổi gì, hoặc hình thành Hypothesis/Experiment/Candidate → comparable Trial/Verdict → kiểm authority/capability/compatibility → Activation → post-check/observations. Target, actual Active và operation-scoped Recovery là ba vai trò khác nhau. Fix-forward chứa lỗi rồi sửa; recovery độc lập khi không boot/mất tự sửa, kiểm tương thích dữ liệu hiện tại. Saved View không đóng băng observations. Contribution upstream là work độc lập với local activation.

## Những gì có thể tổng hợp mà không hỏi lại

Không mở lại một-project/một-plugin/hai-orchestrators, native-chat lifecycle, primary/ordered fallback refs, Skills có tên/nguồn, Principle modes, five-pattern composition, chung admission/budgets, child authority subset, Consult không ghi, scheduler tổng quát, Backlog/GitLab, host-off, toàn-plugin update, retro, Analytics, Claude/Codex và local/upstream độc lập. Các constraints tương ứng đã có trong register.

Không đổi nhãn UI đã confirmed, đặc biệt **Checkpoint**. Không suy canonical English name từ nhãn VI. 12 nghĩa VI-only được giữ alias/sourceName, kèm English name đề xuất cho review theo nhóm. UI có 79 entry records được giữ nguyên, gồm các scoped states/actions; chúng không sinh thêm 79 domain entities. 31 engineering mapping records bảo toàn giới hạn fixture/sketch/spike; chưa map được thì ledger nói rõ design-only.

## Actual decisions — review theo nhóm, không phỏng vấn từng label

| ID | Câu cần chốt / recommended default | Alternatives / dependency |
| --- | --- | --- |
| D01 | Chờ review theo nhóm qua [English vocabulary review](v1-vocabulary-review.md) và [HTML](v1-vocabulary-review.html): đủ 96 pending IDs, gồm 73 mục vocabulary cục bộ và 23 contextual references. | 10 tên được định danh thêm để tránh nhập nhằng; giữ IDs/aliases/anchors/UI labels. Source audit không tìm thấy quyết định sản phẩm mới; chưa đưa draft vào owning glossaries trước khi được chấp nhận. |
| D02 | **Đã chốt:** mỗi visit có Step Run riêng; retry kỹ thuật tạo Attempt mới trong cùng Step Run. Bị chặn trước khi được phép thực thi chưa tạo Attempt; được phép thì ghi Attempt trước dispatch; mất response giữ Attempt để đối soát. | Quy tắc đã duyệt, protocol lưu bền vững/correlation/reconcile và proof runtime còn phải triển khai. Không suy từ thiếu response rằng chưa thực thi. CQ12/13/38. |
| D03 | **Đã chốt:** all-required, đóng tập nhánh động, xử lý nhánh bắt buộc lỗi; Outcome tổng hợp giữ kết quả từng nhánh, lỗi/phần còn thiếu và căn cứ có phiên bản. Dùng lại kết quả khi nguồn, phạm vi, tiêu chí liên quan còn phù hợp và Evidence còn truy cập được; ghi rõ nguồn và giữ lịch sử cũ. | Schema, cache identity/invalidation và proof runtime còn là việc engineering. Quy tắc dùng lại review không nới release-policy V1: Candidate khác chạy lại; health sau activation luôn kiểm mới. CQ11/14/15/21/47/51. |
| D04 | **Đã chốt:** vùng bắt buộc Deep path và điều kiện Fix-forward: khoanh phạm vi bằng bằng chứng, chặn được việc/effects thuộc lỗi, state đọc được/kiểm toàn vẹn liên quan đạt, đường chẩn đoán/sửa còn hoạt động với quyền cần thiết. | Thiếu điều kiện thì dừng admission theo phạm vi và đối soát; không boot/mất tự sửa dùng independent compatible recovery. Cách phát hiện/probes/protocol còn là engineering; không tự restore DB cũ. CQ24/26/39–41/46. |
| D05 | **Đã chốt policy:** bằng chứng theo mục tiêu sửa lỗi/đổi hành vi/khẳng định cải thiện; so sánh đủ tương thích; thiếu căn cứ là Inconclusive. Chi phí có nguồn gán trực tiếp; phần shared chưa phân bổ giữ riêng, tổng chỉ tính một lần; phần chưa đo được hiển thị rõ. | Công thức Metric, nhận diện usage, số mẫu/ngân sách dựa số đo và provider coverage là thiết kế/proof engineering. Không thêm số lượt cố định hoặc phân bổ ước tính ngầm. CQ27/28/42/43. |

**Frontier hiện tại: D01 — rà và tổng hợp vocabulary theo các paths của toàn V1.** D02–D05 đã chốt policy ngữ nghĩa, gồm điều kiện Fix-forward; không vì thế tự duyệt mọi English name/definition/relationship hoặc coi runtime đã được chứng minh. Phần tiếp theo là phân loại những chỗ chỉ cần tổng hợp từ nguồn đã chốt, những tên/ranh giới cần review và những câu hỏi kỹ thuật cần điều tra. Không mở lại các quyết định D02–D05 chỉ để phỏng vấn từng label.

## Engineering investigation — không phải user interview

Kỹ thuật phải chọn/kiểm native APIs/version, provider authority enforcement, lost-response correlation, leases/fencing, scheduler source evidence/DST/races, immutable content/pinned revision application, effect reconciliation và independent recovery. Các schema, transport tool names, storage layout, library/interpreter, retention, installer và thresholds đo được vẫn là thiết kế/proof cần làm sau review mô hình. Quy tắc sản phẩm đã chốt không tự biến thành native capability.

Cụ thể: kiểm definition/profile/source drift; stale dependency trước Spawn; effective authority ở effect boundary (kể cả shell); old-session dispatch; outbox replay sau Work commit; clock/missed/overlap; late Attempt results; update không mất work; compatibility với dữ liệu hiện tại; backup-readable khác full restore; measurement unavailable khác zero. Không chạy live operations trong task này.

## Contradictions / supersession cần xử lý có chủ đích

Register `conflicts` F01–F10 ghi exact sources và cách đọc, giữ lại lịch sử thay vì sửa hàng loạt:

- First-run còn ví dụ empty/new repo; scope V1 hiện hành là existing codebase. Không tự thêm scope mới.
- Architecture shorthand nói definition quản lý model; configuration/boundary quy định chỉ native profile refs và required snapshots.
- Interaction-model còn đánh dấu reopen/new-session chưa quyết; onboarding/UI đã chốt Open và Replace.
- README nói interview thuật ngữ xong; audit và bản draft này xác nhận glossary chưa hoàn tất.
- Modules sketches còn thiếu once/bounded parallel/catch-up và có options cũ; không dùng sketch làm giới hạn product.
- Verification có known-good/rollback wording cũ; release-policy/Evolution định nghĩa recovery theo operation và current data, không rollback DB mặc định.
- UI v6 observed notes còn nói `S.activities` chưa tách; v9 source/notes đã tách. UI introductory “observed” không phủ nhận confirmed từng entry.
- Method page còn ghi chưa được chấp nhận; brief hiện tại chấp nhận cách làm, không chấp nhận mọi đề xuất của draft.

Engineering glossary MCP Server vẫn dùng câu “chỉ bổ sung khi có nhu cầu”/avoid bắt buộc mặc định; nhu cầu V1 cụ thể đã được chốt ở onboarding-agent. Đọc đây là định nghĩa transport tổng quát, không kết luận MCP optional trong scope hiện tại.

## Exit và sequencing

1. Review mô hình/các paths như một whole draft; xác nhận hoặc sửa D01 theo nhóm, rồi D02/D03 bằng scenario liên hoàn.
2. Chỉ khi accepted, chuyển definitions ngắn về glossary sở hữu; giữ aliases/anchors và update mapping references. Protocol/state machines vẫn ở spec.
3. Chốt D04/D05 theo scope/risk và dữ liệu đo, không bịa thresholds. Đồng bộ các mâu thuẫn tài liệu theo nguồn hiện hành và lịch sử đã ghi.
4. Với mỗi CQ, bỏ gap chỉ khi đã có meaning/name/relation quyết định rõ; design-only mappings được ghi rõ, không tạo label/schema giả chỉ để làm đầy ô.
5. Sau semantic review, thiết kế/kiểm các protocol qua interface và native provider/host thật. Nghiệm thu V1 tổng thể ở scope §4 vẫn là đề xuất chờ xác nhận; model này không tự duyệt acceptance gate.

## Browser verification record

T3 `html_preview` đã chạy ở 1100 px và 375 px. Browser smoke thực thi search, status filter, focused graph, node inspection, CQ trace links và reset; console không có lỗi. Bổ sung kiểm không tràn chiều ngang toàn trang, graph cuộn ngang riêng trên mobile. Đã kiểm screenshot và sửa layout mobile. Các smoke này chỉ chứng minh standalone browser hoạt động, không chứng minh sản phẩm/runtime.

Parent review: đã chạy lại `build-v1-concept-views.py --check` đạt và preview/smoke 728 px không lỗi. Đã chỉnh breakpoint layout để graph chiếm đủ chiều ngang ở khung chat 728 px; graph mobile vẫn cuộn riêng. Không thay register, nghĩa đã duyệt hoặc các quyết định còn mở.

## Accepted review — execution identity, 2026-10-22

Người dùng xác nhận Q1 về ba cấp Workflow Step → Step Run → Attempt. Workflow Step là bước trong định nghĩa; mỗi lần Workflow Run đi tới bước đó tạo Step Run riêng. Retry do lỗi kỹ thuật tạo Attempt mới trong cùng Step Run; quay lại bước Review sau khi sửa code theo phản hồi tạo Step Run mới. Workflow Step và Step Run là English canonical names đã được xác nhận; chưa đặt thêm nhãn hiển thị tiếng Việt.

Ví dụ đã duyệt: Review lần đầu có Step Run #1, Attempt #1 timeout rồi Attempt #2 thử lại. Sau khi evaluator yêu cầu sửa code và workflow quay lại Review, tạo Step Run #2 với Attempt #1. Lịch sử các lần review được giữ riêng, kết quả đến muộn vẫn truy được đúng Attempt gốc.

Phạm vi xác nhận không bao gồm thời điểm cấp Attempt identity, admission bị từ chối, giao việc mất response, join của nhánh động hoặc quy tắc tổng hợp Outcome. D02 còn mở ở ranh giới admission/dispatch; không coi phần identity đã chốt là proof runtime hoặc xác nhận toàn bộ D02/D03.

## Accepted review — Attempt boundary and default join, 2026-10-22

Vòng tiếp theo, người dùng xác nhận cả Q1 và Q2. Những cập nhật dưới đây đóng phần admission/dispatch còn mở của D02 và chốt mặc định join của D03; ghi chú còn mở ở vòng execution identity bên trên là lịch sử tại thời điểm đó.

Q1: bị chặn trước khi được phép thực thi, như thiếu quyền hoặc hết ngân sách, chỉ ghi lý do chặn và chưa tạo Attempt. Khi được phép thực thi, ghi Attempt trước khi gửi việc cho worker. Đã gửi nhưng mất phản hồi thì giữ Attempt đó để đối soát; thiếu phản hồi không chứng minh worker chưa chạy. Có Attempt là đã ghi nhận một lần thử, chưa chứng minh worker bắt đầu hoặc hoàn thành. Quy tắc ghi trước dispatch đã chốt; transaction, operation correlation và reconciliation cụ thể vẫn là công việc engineering chưa được chứng minh.

Q2: mặc định all-required, chờ đủ kết quả hợp lệ của mọi nhánh bắt buộc trước khi chuyển sang đánh giá tổng hợp. Code Review trả trước trong khi Security Review bắt buộc còn chạy thì chưa đi tiếp. Đủ kết quả chưa đồng nghĩa đạt chất lượng; một review hợp lệ có thể chỉ ra lỗi. Workflow được khai báo cách khác, như quorum hoặc fail-fast; không tự đổi quy tắc vì một nhánh chậm hoặc lỗi.

Phạm vi xác nhận chưa bao gồm thời điểm đóng tập nhánh động, cách xử lý nhánh bắt buộc thất bại/cancel, Outcome tổng hợp hoặc điều kiện giải quyết Work Item. Join Policy vẫn là English canonical name đề xuất cho nhóm nghĩa này; chưa đặt nhãn tiếng Việt hoặc chứng nhận thực thi V1.

## Accepted review — dynamic join and required-branch failure, 2026-10-22

Người dùng xác nhận cả Q1 về Join Policy và Q2 về nhánh bắt buộc thất bại. Join Policy là English canonical name đã xác nhận; owning definition ngắn ở Execution glossary, chưa thêm nhãn hiển thị tiếng Việt. Phần còn mở về tên và hai quy tắc này ở vòng trước được thay thế bởi xác nhận tại vòng này.

Q1: danh sách nhánh động có giai đoạn được bổ sung và giai đoạn đã chốt. Runtime kiểm tra, ghi nhận nhánh được bổ sung trong phạm vi cho phép. Chỉ tổng hợp khi danh sách đã chốt và đủ kết quả bắt buộc; các worker hiện có trả hết chưa chứng minh danh sách đã đủ. Việc mới phát hiện sau khi chốt được ghi nhận thành một lượt mở rộng hoặc vòng xử lý tiếp theo, không âm thầm sửa tập nhánh đang tổng hợp.

Q2: khi một nhánh bắt buộc lỗi hạ tầng và hết lượt retry, mặc định cho các nhánh khác đang chạy hoàn tất trong giới hạn đã cấp, giữ riêng mọi Outcome, rồi ghi nhận bước tổng hợp không đủ kết quả bắt buộc để đi tiếp. Không bỏ qua nhánh lỗi hoặc biến kết quả một phần thành thành công. Workflow muốn dừng các nhánh khác ngay khi có lỗi phải khai báo fail-fast tường minh. Một báo cáo review hợp lệ có thể chỉ ra lỗi chất lượng; trường hợp đó khác việc không lấy được báo cáo bắt buộc.

Hợp đồng Outcome tổng hợp và điều kiện tái sử dụng review đã xong chưa được quyết định ở vòng này. Quy tắc Work Item có thể cần nhiều Runs và Run hoàn thành chưa tự resolve yêu cầu đã được xác nhận trước đó, không mở lại. Việc đóng danh sách đồng thời với kết quả đến, pause/cancel, kết quả muộn và enforcement vẫn cần protocol/kiểm chứng kỹ thuật; chưa có proof runtime từ vòng review này.

## Accepted review — aggregate Outcome and result reuse, 2026-10-22

Người dùng xác nhận cả Q1 về Outcome tổng hợp và Q2 về dùng lại kết quả nhánh đã xong. Hai quyết định này đóng phần còn mở về ngữ nghĩa trong D03; các ghi chú còn mở ở những vòng trước là lịch sử tại thời điểm đó, không phải frontier hiện hành.

Q1: Outcome tổng hợp thể hiện ba nhóm: đã thực hiện được gì, có tham chiếu tới Outcome và đầu ra từng nhánh; còn thiếu hoặc thất bại gì, gồm nhánh lỗi/kết quả bắt buộc thiếu/phần cần xử lý tiếp; căn cứ gồm Artifacts, Evidence và phiên bản đầu vào/tiêu chí liên quan. Verdict là kết luận chất lượng riêng, gắn với Outcome được đánh giá. Lượt chạy chưa giải quyết xong yêu cầu vẫn giữ được kết quả thực tế và phần còn lại.

Q2: được dùng lại Code Review khi kiểm tra được rằng code, phạm vi và tiêu chí liên quan vẫn phù hợp, đồng thời Evidence còn truy cập được; khi đó xử lý tiếp Security Review còn thiếu. Nếu code hoặc tiêu chí đổi, kiểm tra phần bị ảnh hưởng để quyết định phần phải chạy lại. Lượt xử lý mới ghi rõ kết quả được dùng lại và nguồn của nó; lịch sử kết quả cũ giữ nguyên. Điều kiện dùng lại cần được kiểm tra, không suy từ việc từng chạy đạt hoặc tên bước giống nhau.

Ranh giới áp dụng: đây là quy tắc dùng lại kết quả công việc/review trong workflow, không thay thế giới hạn riêng của release-policy V1: chỉ gộp/dùng lại release check trong cùng Candidate/check/đầu vào/môi trường liên quan; Candidate khác chạy lại; health sau activation luôn kiểm mới. Đây là đối chiếu với policy đã duyệt, không phải quyết định mới được thêm vào câu trả lời của người dùng.

D02 và D03 đã chốt ngữ nghĩa. Schema kết quả, dependency identity, kiểm tính phù hợp, invalidation, dữ liệu lưu bền vững và proof runtime vẫn phải thiết kế/kiểm chứng. Không mở lại quy tắc Work Item cần tiêu chí/bằng chứng đúng phạm vi trước khi resolve, không coi vòng này là hoàn tất toàn bộ glossary hoặc nghiệm thu V1.

## Accepted review — protective mechanisms, evaluation evidence and cost attribution, 2026-10-22

Người dùng xác nhận cả Q1/Q2/Q3. Q1 chốt nhóm cơ chế bắt buộc Deep path; Q2 chốt bằng chứng theo mục tiêu thay đổi; Q3 xác nhận English canonical name Attribution Policy và quy tắc phân bổ chi phí. D05 đóng về policy ngữ nghĩa; D04 chỉ còn ranh giới lỗi còn kiểm soát được. Phân loại nêu trong register không tự duyệt các English names/definitions mới của D01.

Q1: bắt buộc Deep path khi thay đổi cơ chế lưu/khôi phục trạng thái, chống lặp tác động ngoài, thực thi quyền, activation/recovery hoặc khả năng tự sửa; áp dụng cả cấu hình mở rộng quyền. Thay UI, nội dung Skill hoặc lịch chạy vẫn có thể Fast path khi xác định được ảnh hưởng hẹp và cơ chế bảo vệ giữ nguyên. Cách phát hiện bằng code cần thiết kế riêng.

Q2: sửa lỗi cần kiểm tái hiện và hành vi liên quan; đổi hành vi agent/workflow thêm các ca đại diện và ca từng thất bại trong phần bị ảnh hưởng; tuyên bố cải thiện chất lượng/chi phí cần so Baseline/Candidate trên đầu vào, tiêu chí và điều kiện đủ tương thích. Không đặt số lượt chạy cố định lúc này. Thiếu căn cứ giữ Verdict Inconclusive và vẫn áp dụng bộ kiểm bắt buộc của release policy.

Q3: chỉ gán trực tiếp chi phí khi truy được nguồn. Phần chưa phân bổ giữ ở nhóm chi phí dùng chung, tổng chỉ tính một lần. Dashboard phân biệt phần trực tiếp, dùng chung và chưa đo được; phân bổ ước tính có thể bổ sung sau cùng phương pháp và nguồn dữ liệu. Quy tắc đã xác nhận ở đây là cost attribution; không tự mở rộng thành công thức phân bổ thời gian chạy song song hoặc quy kết nhân quả chất lượng.

Nội dung này được đưa vào release policy và owning glossary Analytics; chưa thay labels UI, công thức, thresholds, provider adapter hoặc runtime. Các thuật ngữ Evaluation Suite/Dataset/Case/Environment và Metric Availability vẫn cần D01 tổng hợp/review tên và definition, dù các policy liên quan đã chốt.

## Accepted review — Fix-forward containment, 2026-10-22

Người dùng xác nhận Q1 về khi nào lỗi được coi là còn kiểm soát được để Fix-forward. Bốn điều kiện cùng bắt buộc: khoanh được phạm vi ảnh hưởng bằng bằng chứng; chặn được công việc và tác động ngoài thuộc phạm vi lỗi; trạng thái cần thiết còn đọc được, kiểm toàn vẹn liên quan đạt; đường chẩn đoán/sửa lỗi còn hoạt động với quyền cần thiết. Ví dụ Backlog poller lỗi nhưng tắt riêng được, inbox nguyên và workflow khác không bị ảnh hưởng thì Fix-forward được áp dụng.

Chưa đủ điều kiện thì tạm dừng admission theo phạm vi cần thiết và đối soát trước. Khi plugin không khởi động hoặc mất khả năng tự sửa, dùng Recovery độc lập và tương thích dữ liệu hiện tại theo policy đã chốt. Không có quyền tự restore dữ liệu cũ chỉ vì một điều kiện Fix-forward chưa đạt; unknown scope vẫn theo quy tắc dừng admission toàn bộ đã chốt trước đó.

Fix-forward là English canonical name được xác nhận qua vòng này; owning definition ngắn ở Evolution. D04 đóng về policy ngữ nghĩa, D02–D05 không còn lựa chọn sản phẩm mở trong phạm vi các câu hỏi đã ghi. D01 vocabulary/owner review và technical investigation/proof vẫn còn; không coi phần đã chốt là hoàn tất glossary hoặc runtime V1.

## Parent review — D01 draft ready for grouped review, 2026-10-23

[Manifest](v1-vocabulary-review.json) và [audit](v1-vocabulary-audit-r2.md) của subagent phủ đúng 96/96 pending concept IDs ở snapshot được ghi trong manifest: 12 nghĩa đã chốt nhưng thiếu English names và 84 đề xuất chưa có owning definition. Parent đã kiểm lại exact coverage, IDs/references, độ dài định nghĩa và snapshot ban đầu. Không có material meaning question mới; việc chấp nhận bộ tên/định nghĩa/owners vẫn là D01 còn mở.

Bản đọc đầy đủ tại [English review MD](v1-vocabulary-review.md), bản tìm/lọc/đối chiếu tại [review HTML](v1-vocabulary-review.html); sinh lại bằng build-v1-vocabulary-review.py. 23 từ kỹ thuật phổ thông có contextual definitions và owner tham chiếu, không tự sinh thêm domain entities hoặc bắt buộc mỗi từ một glossary record. Chưa thêm bản dịch UI tiếng Việt; alias và anchors cũ được giữ trong manifest.

Parent đã thu hẹp các cạnh R024/R070/R099/R132/R143/R180/R181 theo nguồn thực; R164/R165/R222/R223 giữ rõ là modeling proposals. Sửa kiểm HTML lỗi thời đòi đúng 50 CQs khi mô hình đã có 51. HTML graph dùng bảng chuỗi lặp để nằm trong giới hạn inline preview; kiểm lossless bằng JavaScript xác nhận mọi trường và giá trị của register được khôi phục đầy đủ.

Validation register và generated views đạt. English review đã preview/smoke ở 728/375 px: search, class/owner filter, definition detail và reset đạt, không console errors. Graph sau sửa đã preview/smoke lại ở 728/375 px: search/status/focused view/inspector/CQ trace/reset đạt, không console errors. Những kiểm này chỉ xác nhận tài liệu tương tác hoạt động, không chứng minh runtime hoặc tự chấp nhận D01.
