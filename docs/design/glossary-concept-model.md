# Glossary as a conceptual model — đề xuất phương pháp

2026-10-22. Đề xuất thay cách phỏng vấn theo danh sách từ bằng thiết kế mô hình khái niệm và kiểm coverage theo hành vi V1. Không thêm thuật ngữ đề xuất vào glossary đã xác nhận và không sửa code/runtime trong lượt này.

## Cơ sở và cách áp dụng

**Ontology Engineering** là cơ sở phù hợp cho yêu cầu này. Noy/McGuinness mô tả concepts cùng properties/relations/restrictions, khởi đầu từ scope và câu hỏi mô hình cần trả lời. Dùng [Ontology Development 101, mục 2 và Step 1/5](https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html). Áp dụng cho repo: thêm một concept model liên kết với glossary; glossary entries vẫn ngắn, quan hệ/ràng buộc ở model riêng.

**Competency questions** là cách kiểm mô hình đáp ứng nhu cầu: lấy tình huống thực tế để đặt câu hỏi, xác định terminology và constraints, rồi đánh giá khả năng trả lời. Nguồn gốc phương pháp ở [Grüninger & Fox, 1995](https://www.eil.utoronto.ca/wp-content/uploads/enterprise-modelling/papers/gruninger-ijcai95.pdf). Ở đây dùng các câu hỏi và traceability ở mức thiết kế; chưa áp formal logic, completeness theorem hoặc ontology reasoner của paper.

**DDD** giữ ngôn ngữ và nghĩa gắn với model trong phạm vi xác định; xem [Evans, DDD Reference, Bounded Context/Ubiquitous Language](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf). Common/Execution/Automation/Evolution/Analytics hiện vẫn là nhóm tài liệu đã chốt; không suy ra mỗi nhóm là service hay bounded context triển khai.

Liên hệ với **deep modules** của Matt là phép áp dụng do mình đề xuất, không phải một phương pháp glossary của skill: một tập khái niệm rõ, cùng quan hệ/ràng buộc tốt, cho phép người đọc hiểu nhiều tình huống mà ít cần học những tên riêng mới. Không đo chất lượng bằng số node/edge, độ sâu graph, số entries hay ít methods.

## Phân công giữa các tài liệu

1. **Scope/scenarios:** hệ thống V1 cần hỗ trợ và những biến thể quan trọng, dẫn tới requirements hiện hành.
2. **Concept model:** khái niệm có identity/role khác nhau, quan hệ có tên, direction, cardinality khi đã chốt, phạm vi và constraints. Quan hệ thời gian/phiên bản phải được diễn tả rõ khi ảnh hưởng nghĩa.
3. **Glossaries:** định nghĩa ngắn, English canonical term, owner và từ tránh. Không nhét protocol hoặc bảng chuyển trạng thái vào từng entry.
4. **UI/engineering mappings:** nhãn và identifiers tham chiếu concept IDs, ghi implemented/proposed/legacy và đúng phạm vi fixture/spike/production.
5. **Competency questions:** câu hỏi xuyên nhiều quan hệ và đáp án có nguồn; chưa trả lời được phải chỉ ra thiếu nghĩa, thiếu quan hệ hay thiếu quyết định thiết kế.

Chưa cần graph database, RDF/OWL hoặc sửa cấu trúc thư mục hàng loạt. Markdown, relation tables và sơ đồ có type đã đủ cho vòng thiết kế. Mở graph lên chỉ là cách xem, không tự làm mô hình đúng.

## Concept graph cấp hệ thống — phạm vi cần phủ

Các miền câu chuyện cần kết nối, dựa trên [scope V1](scope-80-20.md), [architecture](architecture.md), [modules](modules.md) và [coverage audit](glossary-coverage.md):

- **Lifecycle:** Project Harness, hai orchestrator, Onboarding Agent, Agent Session; Handover/Readiness Report và liên kết vai trò–Session còn thiếu owner definition.
- **Agent configuration and authority:** Agent Catalog/Definition/Role, native profile, Skill/Principle, Delegation Policy; Capability/Authority/Permission/Limit và Effective Configuration cần làm rõ.
- **Execution:** Work Item → Workflow Definition/Run → Assignment → Session → Outcome; Checkpoint/Artifact/Evidence và Attempt/Quality Iteration. Step/Step Run, năm pattern và composition cần hoàn thiện nghĩa.
- **Automation:** nguồn/sự kiện → trigger/delivery → Job/Schedule/Occurrence/Job Run → work khi có delta. Những node/edge nguồn/delivery/handler/binding còn chưa có nghĩa local được chốt.
- **Improvement and release:** vận hành → retro/hypothesis/experiment → Candidate → Evaluation → Release/Activation; recovery gắn operation và dữ liệu hiện tại. Experiment, hypothesis, fix-forward và operational mechanisms còn thiếu định nghĩa.
- **Analytics:** observations/metrics → analysis/comparison/evaluation → Verdict; Baseline/Saved View và provenance. Dataset/suite/attribution còn cần scope/định nghĩa khi dùng làm contract.
- **Engineering reliability:** operation/intent/receipt/journal/reconcile/admission/ownership/fencing liên kết với lifecycle/effects, không tạo glossary kiến trúc tách rời domain.
- **Local vs upstream:** cải tiến cục bộ và contribution upstream là công việc độc lập; liên hệ candidate/release, nguồn code và quyền công bố cần mapping, không mặc định tự push/merge.

Đây là map phạm vi kể chuyện của hệ thống, không phải tám module mới hoặc tám files glossary bắt buộc.

## Quan hệ cốt lõi đã có căn cứ

| Quan hệ | Ý nghĩa / cardinality đã biết | Nguồn |
| --- | --- | --- |
| Project Harness contains orchestrators | Có Project Orchestrator và Harness Engineering Orchestrator; Onboarding Agent không là orchestrator lâu dài thứ ba | [Common](../../GLOSSARY.md#project-harness), [first-run](first-run-ux.md) |
| Work Item is handled by Workflow Runs | Một yêu cầu có 0..* Runs; Run xử lý toàn bộ hoặc một phần, hoàn tất Run không tự resolve yêu cầu | [Execution](../domain/execution/GLOSSARY.md#work-item) |
| Workflow Run executes Workflow Definition | Thực thi trên một definition đã chọn/pin; version migration có protocol riêng | [Execution](../domain/execution/GLOSSARY.md#workflow-run), [Work invariants](modules.md#invariant-và-ordering) |
| Assignment is carried by Agent Session | Một Assignment gắn một agent nhận; một Session có thể nhận nhiều Assignments theo thời gian | [Assignment](../domain/execution/GLOSSARY.md#assignment), [v9 model](prototype-model-notes.md) |
| Assignment uses selected configuration and criteria | Đóng băng refs/revisions theo công việc; thay config không sửa ngầm việc cũ | [Delegation](agent-delegation.md), [configuration](configuration.md) |
| Definition references native profiles and methods | Profile chính/dự phòng có thứ tự; Skills và Principle policy riêng; profile không tự cấp authority | [Agent Definition](../../GLOSSARY.md#agent-definition), [configuration](configuration.md) |
| Outcome is evaluated into Verdict | Evidence và criteria phải gắn đúng đối tượng/phạm vi; không suy từ idle/Turn kết thúc | [Outcome](../domain/execution/GLOSSARY.md#outcome), [Verdict](../domain/analytics/GLOSSARY.md#verdict) |
| Schedule determines Job activation timing | Occurrence đến hạn có thể skip/gom; Job Run thủ công không cần Occurrence | [Automation](../domain/automation/GLOSSARY.md) |
| Job Run may create work | Poll unchanged không tạo/wake agent; changed/delivery cần dedupe và admission | [Triggers](modules.md#2-module-triggers--từ-nguồn-paseo-đến-công-việc-bền-vững) |
| Release fills operation-specific roles | Target có thể chưa active; actual active có thể null; recovery chọn theo operation và dữ liệu | [Evolution](../domain/evolution/GLOSSARY.md), [release policy](release-policy.md) |
| Saved View configures a view, not a dataset | Mở lại có thể có observations mới; Comparison không tự là kết luận nhân quả | [Analytics](../domain/analytics/GLOSSARY.md) |

Không suy một cạnh `contains` thành subclass (`is-a`), không coi containment là ownership dữ liệu và không dùng cardinality chưa chốt làm constraint triển khai.

## Competency questions — bản đầu theo V1

**Legend:** `G` = thiếu glossary/owner definition; `R` = thiếu hoặc chưa xác nhận relation/constraint; `M` = thiếu mapping; `D` = cần quyết định thiết kế. Các câu hỏi bên dưới là yêu cầu đánh giá model, không tuyên bố đã có đủ đáp án. Một số hành vi đã chốt trong spec vẫn cần glossary/mapping để người mới giải thích được bằng cùng ngôn ngữ.

| ID / tình huống | Câu hỏi mô hình phải trả lời | Truy vết hiện tại / phần thiếu |
| --- | --- | --- |
| CQ01 / onboarding | Ai cấu hình khởi đầu, ai dựng, ai giải quyết yêu cầu dự án? | Roles đã rõ ở Common/first-run; cần edges và lifecycle mapping thống nhất (`M`) |
| CQ02 / onboarding | Đủ cấu hình để dựng khác đủ khởi chạy và đã kiểm chứng vận hành ở đâu? | Onboarding spec có; Readiness/Report owner chưa có (`G`) |
| CQ03 / onboarding | Handover chuyển dữ liệu gì, có tự chuyển quyền điều phối hay thay Checkpoint không? | Contract/spike có; khái niệm và quan hệ chưa định nghĩa đủ (`G/R`) |
| CQ04 / agent config | Một agent được chọn bằng role, definition, native profile hay Session? | Các concepts có; Procedure/Entry Skill và selection relations thiếu (`G/R`) |
| CQ05 / agent config | Primary unavailable thì fallback khi nào; thiếu quyền hoặc output contract có được fallback không? | Policy đã chốt; Capability/Authority/Effective Configuration chưa có owner (`G`) |
| CQ06 / agent config | Đổi profile/Skill/Principle/policy khi đang chạy thì việc nào dùng bản nào? | Pin/revoke spec có; revision/snapshot/drift cần nghĩa local và mapping (`G/M`) |
| CQ07 / quyền | Một tool có thể gọi được có nghĩa agent được phép gọi không? | Chưa có định nghĩa riêng Capability/Permission/Authority (`G`) |
| CQ08 / quyền | Ai được mở rộng quyền, giới hạn hoặc delegate tiếp; con có quyền gì so với cha? | Delegation spec có; ngôn ngữ effective authority/limits cần chốt (`G/R`) |
| CQ09 / quyền | Thu hồi quyền giữa lượt chạy tác động lên hành động kế tiếp và tác động đã xảy ra ra sao? | Contract có; Role Binding/fencing/revocation mapping chưa đủ (`G/M`) |
| CQ10 / execution | Một yêu cầu có nhiều Runs; kết quả nào đủ để resolve toàn bộ yêu cầu? | Domain và fixture đã tách; evaluation scope/criteria canonical names còn thiếu (`G/M`) |
| CQ11 / execution | Một Session nhận nhiều Assignments; Outcome từng phần và Outcome tổng hợp liên quan thế nào? | Domain/v9 có; đầy đủ relation và aggregation contract còn cần ghi rõ (`R`) |
| CQ12 / execution | Lỗi kỹ thuật, phản hồi chất lượng và thiếu quyền tạo Attempt, Iteration hay blocked state? | Attempt/Iteration có; Step/Step Run, Retry và Admission chưa có definition (`G`) |
| CQ13 / composition | Năm pattern nối tiếp/lồng/song song nhau có Step identity và kiểu đầu vào/đầu ra thế nào? | Spec/sketch có; pattern/step/plan glossary và authoring representation chưa chốt hết (`G/D`) |
| CQ14 / composition | Parallel join biết chờ nhánh nào khi có worker động và một nhánh lỗi? | Hợp đồng tổng quát có; join/worker unit/stop semantics cụ thể chưa đủ (`G/R/D`) |
| CQ15 / composition | Evaluator-optimizer dừng khi đạt, hết budget hoặc inconclusive khác nhau thế nào? | Pattern yêu cầu trần/criteria có; Feedback/Limit/stop-state mapping cần hoàn thiện (`G/R`) |
| CQ16 / lịch | Job, Schedule, Occurrence, Job Run và Workflow Run khác nhau thế nào? | Automation definitions có; relation source/handler/executor chưa đầy đủ (`G/R`) |
| CQ17 / lịch | Callback lặp, overlap hoặc host tắt tạo bao nhiêu work; policy do ai sở hữu? | Contracts có; Trigger/Delivery/Binding/missed/overlap nghĩa chưa chốt (`G/R`) |
| CQ18 / lịch | Poll không có thay đổi có tạo agent không; có delta thì cursor/event/work gắn nhau thế nào? | Hành vi có; Source Event/Cursor/receipt/outbox mapping thiếu (`G/M`) |
| CQ19 / gián đoạn | Mất response tạo Session thì hệ thống đã biết gì và khi nào được retry? | Spike/scripted tests có; Operation/Receipt/Reconciliation/unknown chưa đủ (`G/M`) |
| CQ20 / gián đoạn | Reload hoặc Replace Session giữ công việc và quyền điều phối bằng những quan hệ nào? | Contract có; Handover/Role Binding/ownership epoch chưa chốt terminology (`G/R`) |
| CQ21 / gián đoạn | Timeout, cancel và interruption có chứng minh worker ngừng hoặc effects được thu hồi không? | Spec có phân biệt; engineering definitions còn thiếu (`G`) |
| CQ22 / cải tiến | Retro tạo hypothesis/experiment hay Candidate; khi nào không cần thay đổi? | Loop/spec có; Hypothesis/Experiment/Feedback chưa có owner definition (`G/R`) |
| CQ23 / cải tiến | Candidate kiểm đạt có tự được activation không; ai cấp quyền và pin evidence thế nào? | Evolution/authority policy có; authority/digest/ref mapping chưa đủ (`G/M`) |
| CQ24 / release | UI/runtime/schema/skills/jobs cùng cập nhật ra sao khi còn Runs đang làm? | Release policy có; operation/ref/compatibility definitions và mapping thiếu (`G/M`) |
| CQ25 / release | Bản được chọn không boot thì bản nào đang active, bản nào được chọn để recovery? | Domain/v9 có; native observation/unknown và recovery evidence map thiếu (`G/M`) |
| CQ26 / release | Lỗi nhỏ đi fix-forward, lỗi không thể tự sửa đi recovery dựa vào khái niệm và phạm vi nào? | Policy có; Fix-forward/recovery executable/effect scope chưa đủ definition (`G/R`) |
| CQ27 / analytics | Một số 0 khác thiếu dữ liệu hoặc không đo được ở đâu? | Metric/Observation có; missing/unavailable semantics và metric specification cần rõ (`G/R`) |
| CQ28 / analytics | So sánh observations có đủ kết luận candidate tốt hơn không; suite/case/environment là gì? | Analysis/Trial/Verdict có; Dataset/Suite/attribution mapping thiếu (`G/M`) |
| CQ29 / analytics | Saved View mở lại có giữ cùng dữ liệu và Verdict không? | Nghĩa đã chốt; cần nối view configuration, data/time scope và sources (`R/M`) |
| CQ30 / local/upstream | Cải tiến local và contribution upstream có chung quyền, release và kết quả không? | Quyết định tách công việc đã có; concepts/owner và external mappings thiếu (`G/M`) |

CQ01–CQ30 là bộ ban đầu; cần rà ngược từng yêu cầu V1 và biến thể lỗi để bổ sung trước khi nói coverage đầy đủ. Đây là test thiết kế ngôn ngữ, không thay tests runtime hoặc bằng chứng native APIs.

## Tiêu chí mô hình có chiều sâu

Áp dụng tinh thần deep modules, không tuyên bố là một thước đo chuẩn:

- **Explanatory leverage:** một tập concepts/relations giải thích được nhiều tình huống và câu hỏi liên hoàn.
- **Locality of meaning:** mỗi nghĩa có owner; khi nghĩa đổi biết những labels/code/contracts nào cần xem lại.
- **Minimal distinctions:** thêm concept khi cần giải thích một khác biệt hành vi/quyền/identity, không thêm theo từng màn hoặc biến.
- **Explicit limits:** graph không trả lời được thì chỉ ra đúng chỗ thiếu; không âm thầm giả định câu trả lời.
- **Deletion test:** bỏ một concept/relation, nếu vẫn trả lời được mọi câu hỏi bằng mô hình đơn giản hơn thì cân nhắc bỏ/gộp; nếu phải suy diễn hoặc nhập hai nghĩa vào một từ thì cần giữ phân biệt.

## Cách làm tiếp

1. Khóa scope V1 đã chốt và xác nhận bộ tình huống/câu hỏi, trước khi dịch thêm nhãn.
2. Lập concept/relation register toàn phạm vi, liên kết tới definitions đã có; đánh dấu những quyết định chưa chốt.
3. Đi theo đường quan hệ của từng tình huống để tìm missing concepts/constraints; chỉ grill những lựa chọn nghĩa hoặc thiết kế thực sự chưa quyết định.
4. Ghi definitions vào owner glossary, relations/constraints vào model, protocol vào spec; UI/engineering dẫn tới cùng concept IDs.
5. Rà cả câu hỏi thành công, lỗi, gián đoạn, cập nhật và quyền; cần có answers có nguồn, không chỉ node liên kết được.
6. Chỉ gọi là đủ cho V1 khi mỗi requirement/scenario cần thiết đã truy vết tới questions, definitions, relations và constraints; chưa có khoảng trống chưa giải thích. Không gọi đó là hoàn chỉnh cho mọi dự án hoặc mọi thay đổi tương lai.

Phương pháp này chưa được người dùng xác nhận là workflow authoring mới của repo. Đây là đề xuất cụ thể để review, không thay các quyết định domain đã chốt.
