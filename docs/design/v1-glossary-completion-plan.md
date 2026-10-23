# Project Harness V1 — vocabulary acceptance and remaining engineering

Bản draft khởi đầu ngày 2026-10-22; vocabulary D01 được chấp nhận ngày 2026-10-23. Owning glossaries hiện giữ English definitions đã duyệt; các ghi chú draft bên dưới là lịch sử từng vòng. Bản draft ban đầu không sửa production/runtime, native config hoặc các owning definitions đã duyệt; những phần được xác nhận trong các vòng review được ghi tại cuối trang và chuyển về owning glossary. Phương pháp ontology/competency questions đã được người dùng chấp nhận trong brief hiện tại; nội dung đề xuất của mô hình này chưa vì thế được chấp nhận.

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
| D01 | **Đã chốt 2026-10-23:** bộ English names/definitions/owners của 96 mục review, gồm 73 mục vocabulary và 23 contextual references; đã chuyển về owning glossaries. | Giữ IDs/aliases/anchors, nhãn UI đã duyệt và code symbols quan sát. Không tự phê duyệt mọi graph type/cardinality, schema hoặc proof runtime. |
| D02 | **Đã chốt:** mỗi visit có Step Run riêng; retry kỹ thuật tạo Attempt mới trong cùng Step Run. Bị chặn trước khi được phép thực thi chưa tạo Attempt; được phép thì ghi Attempt trước dispatch; mất response giữ Attempt để đối soát. | Quy tắc đã duyệt, protocol lưu bền vững/correlation/reconcile và proof runtime còn phải triển khai. Không suy từ thiếu response rằng chưa thực thi. CQ12/13/38. |
| D03 | **Đã chốt:** all-required, đóng tập nhánh động, xử lý nhánh bắt buộc lỗi; Outcome tổng hợp giữ kết quả từng nhánh, lỗi/phần còn thiếu và căn cứ có phiên bản. Dùng lại kết quả khi nguồn, phạm vi, tiêu chí liên quan còn phù hợp và Evidence còn truy cập được; ghi rõ nguồn và giữ lịch sử cũ. | Schema, cache identity/invalidation và proof runtime còn là việc engineering. Quy tắc dùng lại review không nới release-policy V1: Candidate khác chạy lại; health sau activation luôn kiểm mới. CQ11/14/15/21/47/51. |
| D04 | **Đã chốt:** vùng bắt buộc Deep path và điều kiện Fix-forward: khoanh phạm vi bằng bằng chứng, chặn được việc/effects thuộc lỗi, state đọc được/kiểm toàn vẹn liên quan đạt, đường chẩn đoán/sửa còn hoạt động với quyền cần thiết. | Thiếu điều kiện thì dừng admission theo phạm vi và đối soát; không boot/mất tự sửa dùng independent compatible recovery. Cách phát hiện/probes/protocol còn là engineering; không tự restore DB cũ. CQ24/26/39–41/46. |
| D05 | **Đã chốt policy:** bằng chứng theo mục tiêu sửa lỗi/đổi hành vi/khẳng định cải thiện; so sánh đủ tương thích; thiếu căn cứ là Inconclusive. Chi phí có nguồn gán trực tiếp; phần shared chưa phân bổ giữ riêng, tổng chỉ tính một lần; phần chưa đo được hiển thị rõ. | Công thức Metric, nhận diện usage, số mẫu/ngân sách dựa số đo và provider coverage là thiết kế/proof engineering. Không thêm số lượt cố định hoặc phân bổ ước tính ngầm. CQ27/28/42/43. |

**Trạng thái hiện tại:** D01–D05 đã chốt trong phạm vi vocabulary/policy đã review. 155 concept IDs có tên English, định nghĩa sở hữu hoặc contextual reference và provenance. Phần còn lại là kiểm tra các quan hệ còn ở mức suy luận/đề xuất và thiết kế/kiểm chứng protocol; không mở lại tên đã chốt hoặc coi tài liệu là runtime V1.

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


## Accepted review — complete English vocabulary D01, 2026-10-23

Sau phần giải thích rằng “Đội năng lực” là nhãn cũ của Agent Catalog / Danh mục agent, người dùng trả lời “Ok thế theo đề xuất”, chấp nhận bộ vocabulary theo bản review đã trình bày. Phạm vi chấp nhận là English canonical names, concise definitions, owners và aliases/anchors được bảo toàn cho 96 mục; 23 từ phổ thông giữ vai trò contextual references. D01 đóng; không tự chốt thêm bản dịch UI, storage types/cardinalities, protocol hoặc runtime capability.

Các định nghĩa được chuyển vào glossary sở hữu. English definitions được đặt trước; wording tiếng Việt hiện có được giữ để đối chiếu. 10 tên có qualifier được dùng thống nhất trong register; tên draft cũ vẫn truy được như aliases theo đúng scope. Nhãn cũ “Đội năng lực” được dọn khỏi các surface/tài liệu hiện hành về Agent Catalog; fixture IDs, route team và code symbols được giữ.

Nguồn cũ bị thay nội dung được giữ nguyên trong history/d01-before-2026-10-23. Source IDs và excerpts cũ được bảo toàn, ghi originalPath/historical; các definition sources mới trỏ tới owning glossaries hiện hành. Mapping links dùng originalPath làm ngữ cảnh cho relative links của snapshot. Acceptance không biến code fixture thành implementation production hoặc tự phê duyệt các quan hệ/type còn đề xuất.

## D01 migration verification, 2026-10-23

- Cả 155 IDs có English definition và owning anchor hợp lệ: 132 local definitions, 23 contextual references. Không còn pending names hoặc definition gaps trong tập V1 đã review.
- Giữ toàn bộ explicit anchors trước migration; 13 source-file snapshots bảo toàn excerpts cũ. Cả 478 source pins khớp và 468 local Markdown links được kiểm không lỗi.
- Register/generated-view validation và kiểm lossless JavaScript payload đạt; dictionary reconstruction giữ nguyên mọi trường/giá trị. JavaScript của graph, acceptance record và prototype hợp cú pháp.
- Graph và English acceptance record preview/smoke đạt ở 728/375 px; search/filter/inspector/CQ trace/reset không console errors.
- Prototype route team preview đạt ở 728/375 px: title/navigation dùng Danh mục agent, không còn nhãn cũ hiển thị. Đây là kiểm nhãn fixture, không phải nghiệm thu provider dispatch hoặc runtime production.

## Engineering follow-up — onboarding implementation specification, 2026-10-23

Đã viết [onboarding-implementation.md](onboarding-implementation.md) cho lát cắt MCP → config → Readiness/Handover → user Spawn Engineering → reconnect/reconcile. Đặc tả giữ lifecycle trong Work, settings/definitions ở owner hiện có và UI/MCP qua cùng interface. Nó mô tả receipt replay trước revision validation của request mới, native create/send intents riêng, report/dependency freshness, Session authority generations và Replace với thu hồi quyền. Ma trận OB01–OB14 là yêu cầu kiểm, chưa là kết quả runtime.

Đã đồng bộ onboarding contracts/agent, first-run, interaction, architecture, modules, verification, README và HTML tổng quan. F01/F02/F03 đã xử lý về văn bản hiện hành: V1 codebase có sẵn; definition chỉ tham chiếu native profiles; Open/Replace đã có hành vi rõ. Những bullet mô tả xung đột ở phần lịch sử phía trên là baseline trước lần sửa này. Các source IDs/excerpts cũ được bảo toàn tại history/onboarding-before-2026-10-23; register thêm SRC479–SRC481 cho wording hiện hành. Không đổi glossary đã duyệt, graph relations/types hoặc evidence level của CQs.

Kiểm tra tài liệu đạt:

- Register/generated views và English acceptance record sinh lại hợp lệ; 481 source pins khớp. JavaScript của ba HTML liên quan hợp cú pháp, graph payload giải mã khớp đầy đủ register.
- 136 local Markdown links trong bộ tài liệu vừa cập nhật và 12 links HTML tổng quan hợp lệ. Cả 155 vocabulary IDs giữ status/nameStatus approved; OB01–OB14 không thiếu hoặc trùng.
- HTML tổng quan preview tại 375/728 px đạt 26 assertions mỗi kích thước: thứ tự Onboarding/Engineering/Project, sáu mốc, nội dung từng mốc và nút trước/sau; không overflow ngang hoặc console errors. Product prototype và các spike không thay đổi.

Bước code tiếp theo: owner commands với SQLite/receipts/revisions/reservations và scripted Paseo adapter, rồi nối menu/RPC/MCP vào cùng interface. Native response loss, in-flight reload, per-Session credentials, Replace và Claude/Codex enforcement còn cần bằng chứng riêng. Không cần một vòng phỏng vấn lại vocabulary/product policy để làm các bước kỹ thuật này.

## Concept graph source review — 2026-10-23

**Phase hiện hành là thiết kế.** Chưa chuyển sang triển khai production. [Source audit](v1-concept-graph-audit.md) và [JSON per-record before/after](v1-concept-graph-audit.json) rà 230 relations ban đầu, 61 constraints và 155 type annotations theo nguồn đã chốt. Có 45 cạnh sửa diễn đạt/phạm vi, 3 cạnh bổ sung owning-definition provenance, một record trùng giữ ID lịch sử và bốn đường bổ sung về timer scope/catalog ownership. Graph có 233 cạnh hiện hành, R213 chuyển hướng sang R174; các nguồn trước đó và IDs được bảo toàn.

Giữ nguyên concepts/names/definitions/types, D01–D05, UI/code mappings và runtime evidence của các CQs. K24 làm rõ handler trả dữ liệu và runtime commit; tám constraints được bổ sung nguồn cho các vế đã chốt. Không tự nâng inferred/proposed thành approved hoặc coi các cardinalities unknown là mặc định triển khai.

Frontier **[GA01](v1-concept-graph-audit.md#ga01)**: sau timeout rồi fallback sang Session/model khác, Assignment tiếp tục qua nhiều Attempts hay phát hành Assignment mới liên kết cái cũ? Step Run/Attempt identity, đối soát trước retry và bảo toàn kết quả muộn đã chốt; identity của allocation/recipient cần quyết định trong phase thiết kế. Các CQs liên quan dẫn rõ frontier; không tự chọn phương án từ fixture.

Validation của graph source review đạt: 484 source pins khớp; audit có đủ và đúng snapshot after của 234 relation records/61 constraints; mọi CQ relation endpoint có trong concept inventory và không dùng cạnh đã superseded. JSON/browser payload lossless; hai HTML scripts hợp cú pháp; 1.723 local Markdown links trong audit/ledger/validation/README hợp lệ. Preview 375/728 px đạt search/filter/focused views/inspector/CQ trace/reset, R213 historical redirect, R135 handler/runtime distinction và GA01 frontier; không console errors hoặc overflow toàn trang. Graph vẫn cuộn ngang trong vùng riêng trên mobile.

Bước thiết kế tiếp theo là review scenario GA01, rồi tiếp tục các interface/schema đang mở theo danh sách công việc thiết kế; không tự chuyển sang làm runtime. English vocabulary và bằng chứng runtime của các CQs không đổi qua lần rà này.

<a id="ga01-assignment-identity-acceptance"></a>
## Accepted design — GA01 Assignment identity, 2026-10-23

Người dùng xác nhận “ok” sau đề xuất Assignment gắn với một lần giao việc cụ thể. GA01 đóng về identity/continuity trong phase thiết kế; không xác nhận implementation, runtime capability hoặc mọi cardinality. D01–D05 giữ nguyên.

Step Run giữ identity của phần việc trong lượt đi qua workflow. Retry kỹ thuật được phép tạo Attempt mới trong cùng Step Run. Nếu retry/fallback thực sự giao lại việc cho agent, tạo Assignment mới, kể cả khi tái sử dụng cùng Session; Assignment mới liên kết nguồn giao lại trước đó. Assignment đã giao giữ recipient Session và cấu hình/quyền được ghi nhận của lần giao đó, không đổi recipient tại chỗ sang Session fallback. Một Session có thể nhận nhiều Assignments theo thời gian; concurrency trong cùng Session chưa được chốt. Quy tắc này không bắt code-only Attempt phải tạo Assignment hoặc ép mọi Assignment ngoài workflow có Step Run.

Mất phản hồi create/send giữ nguyên Attempt/Assignment để đối soát, không tự tạo lượt mới. Agent hỏi thêm hoặc tiếp tục qua nhiều Turns vẫn cùng Assignment; đây không tự là retry/redispatch. Kết quả về muộn ghi dưới Assignment/Attempt gốc, không tự ghi đè lượt hiện hành; muốn dùng lại phải kiểm applicability và Evidence theo K57. Thay Session orchestrator không tự thay/cancel/rebind các Assignment của workers đang chạy.

Ví dụ đã chấp nhận: Code Review Step Run S → Attempt 1 / Assignment A / Session Claude; sau timeout và đối soát, fallback được phép → Attempt 2 / Assignment B / Session Codex. B liên kết A; A và kết quả muộn giữ lịch sử riêng. Retry trên cùng Session Claude cũng tạo Assignment mới nếu thực sự giao lại việc.

Owning definition Assignment được làm rõ bằng English trước; IDs, tên, anchors và nhãn UI giữ nguyên. Quan hệ nhận việc và các CQs liên quan được cập nhật; protocol/schema cụ thể vẫn thuộc việc thiết kế tiếp theo.

GA01 synchronization verification: owning definition và cả 155 definition anchors khớp register; 488 source pins khớp, gồm snapshot bảo toàn SRC354 trước khi làm rõ Assignment. Audit giữ source-review snapshots và accepted follow-up riêng; graph/ledger không còn đánh dấu GA01 open. 745 local links kiểm không lỗi. Generated-view validation, JavaScript syntax và lossless payload đạt; preview 375/728 px đạt cả accepted GA01 trace/decision status, không console errors. D01–D05, UI/code mappings và runtime evidence của 51 CQs giữ nguyên. Đây là cập nhật tài liệu thiết kế; không thay runtime hoặc spike.

<a id="d01-explicit-current-confirmation"></a>

## D01 explicit current confirmation — G01, 2026-10-23

Xác nhận hiện tại D01: người dùng đồng ý names, concise definitions và owners của 96 mục review, gồm 73 vocabulary và 23 contextual references; giữ aliases/anchors và nhãn UI đã duyệt. [Bằng chứng hỏi–đáp](history/glossary-v1-g01-2026-10-23/acceptance-g01.json).

Nguồn T3 trực tiếp: Q1 P2720, item `turn-item:provider:codex:native-item:msg_0a00c010b74921cf016adad0b57d9481918d56cd53b789d890`; câu trả lời “ok” P2722, item `turn-item:message:67d5036f-d3e0-47a5-a52f-1790abd4b024`. API page, source pointers, nội dung nguyên văn, hashes và bản review trước xác nhận được lưu trong history/glossary-v1-g01-2026-10-23. Q1 đầy đủ trước đó ở P2710 cũng được giữ.

Đây là xác nhận mới cho phạm vi D01, không dùng để diễn giải ngược câu “Ok thế theo đề xuất” ở P2367. [Audit lịch sử](grill-history/decision-ledger.md) và các source pins cũ được giữ nguyên. Phạm vi này không duyệt mọi graph relations/types/cardinalities, schema/API hoặc runtime capability. D02–D05/GA01 và 155 owning definitions giữ nguyên; chưa xác nhận kết thúc toàn phiên Glossary V1.

Rà F1 và parent review: [report](glossary-v1-frontier-audit-r1.md), [design tree / nhật ký tiếp tục](glossary-v1-grill.md). Chưa có material semantic question mới đủ căn cứ ngoài D01 trong phạm vi khảo sát. Provenance và wording cũ được sửa theo nguồn; schema/protocol/provider proof, các coverage watchpoints và gate nghiệm thu V1 vẫn ghi riêng, không âm thầm được chấp nhận qua G01.

G01 synchronization: register SHA-256 `bdc1e584cf5e9eb3b1c8632c12ee9ae4cc4014e1327085bff01dc3c8f47ffbed`; 493 source pins, 155 owning definitions và 96 reviewed entries kiểm nhất quán. Concept/relation/constraint/CQ/mapping records và runtime evidence giữ nguyên theo baseline; chỉ bổ sung xác nhận/provenance, sửa wording cũ và tái sinh views. [Verification record](history/glossary-v1-g01-2026-10-23/validation-g01.json) ghi giới hạn. G02 shared-understanding confirmation đang chờ, không tự kết thúc phiên Glossary V1 từ việc user chốt D01.

<a id="glossary-session-closed-g02"></a>

## Glossary V1 / concept graph session closed — G02, 2026-10-23

Người dùng xác nhận “ok rồi” ở T3 P2769 sau bản tổng hợp và câu hỏi kết thúc P2767. [Evidence G02](history/glossary-v1-g02-2026-10-23/closure-g02.json) giữ API response, source pointers, text nguyên văn, hashes và snapshot nhật ký trước closure. Đây là xác nhận kết thúc phiên trong phạm vi vocabulary/ngữ nghĩa/mô hình tham chiếu, không chỉ là xác nhận D01.

[Design tree và nhật ký](glossary-v1-grill.md) ghi G0/G5 closed; các frontier ngữ nghĩa đã hỏi trong phiên không còn câu trả lời đang chờ. Các records inferred/proposed/unknown không tự được nâng status; technical design/proof và gate nghiệm thu V1 vẫn thuộc các luồng liên quan. Register, owning definitions, graph/CQs và runtime evidence không đổi qua thao tác ghi closure này. Không tự bắt đầu triển khai production hoặc phiên grill khác.

## Architecture follow-up B9 — 2026-10-23

[Parent review/validation](history/architecture-b9-2026-10-23/review-b9.json) và [before snapshots](history/architecture-b9-2026-10-23/baseline.json) ghi synchronization sau A06–A11. Thêm Instructions/Learned Knowledge trong owning glossary hiện có, 12 inferred directed relations với cardinalities unknown, 11 accepted scoped constraints, CQ52–CQ57 và ba UI/engineering mappings. Pause/Resume UI controls và Knowledge module không được biến thành domain entity, service/database hoặc bounded context mới.

Current inventory: 157 concepts / 248 relations / 74 constraints / 14 requirements / 57 CQs / 113 mappings / 513 exact source pins. Original 155 concepts, CQ01–CQ51, source records, relation status và runtime evidence giữ nguyên. Glossary G02 closure vẫn giữ phạm vi lúc được xác nhận; đây là follow-up từ architecture acceptance, không viết lại G02/D01 history hoặc nâng runtime proof.

Builder/audit/source/anchor/CQ checks và lossless decoding đạt; full graph HTML 502872 characters, dưới inline cap 512000. Browser checks 728/375 px đạt 24 follow-up checks mỗi viewport cùng existing search/status/focus/inspection/CQ/reset smoke, không console errors. Whole-harness review có 17 browser checks mỗi viewport ở cùng hai kích thước. Đây là kiểm document/view, không runtime/provider tests.

Attempt delegated extraction failed do model capacity; parent hoàn tất extraction/sync và checks. A11 acceptance được lưu riêng; architecture shared-understanding confirmation A12 và aggregate V1 gate chưa được trả lời.
