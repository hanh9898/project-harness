# Glossary V1 / concept graph — resumed grill

Ngày mở lại và kết thúc: 2026-10-23. Phase: **thiết kế**. **Phiên đã kết thúc sau xác nhận G02: P2767 → P2769 “ok rồi”.** Áp dụng grill-with-docs → grilling + domain-modeling. Đây là cây quyết định và nhật ký của phiên tiếp tục, không thay transcript lịch sử. [Bằng chứng kết thúc](history/glossary-v1-g02-2026-10-23/closure-g02.json).

## Mục tiêu và ranh giới

Đạt cách hiểu chung về English vocabulary, nghĩa, nơi sở hữu định nghĩa và các quan hệ/ràng buộc khái niệm cần để giải thích hành vi V1. UI Vietnamese labels đã duyệt được bảo toàn. Graph/CQs dùng kiểm tra mô hình; không suy approved toàn graph từ việc duyệt một tập vocabulary.

Schemas lưu trữ, transport/API, thuật toán, số slot/threshold cần đo, provider capabilities và runtime proof được ghi đúng owner/frontier khác khi cần. Không biến một chi tiết kỹ thuật chưa triển khai thành một quyết định sản phẩm chưa được user trả lời. Không tự bỏ một lựa chọn ngữ nghĩa khỏi phiên bằng cách gọi nó là technical.

## Căn cứ trước khi tiếp tục

- [Closure audit](grill-session-closure-audit.md): xác nhận từng nhánh khác với kết thúc toàn cây.
- [Original messages evidence](grill-history/README.md), [D01 scope ambiguity](grill-history/decision-ledger.md#d01-bằng-chứng-và-giới-hạn-phạm-vi).
- [Review D01](v1-vocabulary-review.md), [manifest 96 entries](v1-vocabulary-review.json), [register](v1-concept-register.json), [CQ ledger](v1-competency-ledger.md), [source audit](v1-concept-graph-audit.md), [Glossary Map](../../GLOSSARY-MAP.md).
- D02–D05 và GA01 đã có cặp đề xuất–đồng ý trong chat gốc. Không mở lại chỉ vì register còn cardinality unknown hoặc code chưa tồn tại.
- D01 hiện được ghi approved trong các tài liệu trước. Audit thấy phạm vi câu đồng ý cũ không rõ; phiên này hỏi xác nhận hiện tại, không tự diễn giải lại lời cũ hoặc âm thầm reset definitions/status.

## Design tree và dependencies

| Node | Nội dung | Dependencies | Trạng thái hiện tại |
|---|---|---|---|
| G0 | Shared understanding: mô hình khái niệm Glossary V1 | G1–G4 và xác nhận cuối | **Đã xác nhận và kết thúc qua G02** |
| G1 / D01 | Xác nhận hiện tại cho names/definitions/owners của bộ 96 entries | Bản review đã có | **Đã xác nhận: P2720 → P2722; G01** |
| F1 | Rà facts về coverage, nghĩa/quan hệ/constraints và scenario gaps của graph/CQs | Tài liệu/source hiện có | Đã có bounded audit và parent review; giới hạn ghi bên dưới |
| G2 | Phân loại những điểm thực sự còn cần quyết định ngữ nghĩa | F1; áp dụng phạm vi G1 khi có | Đã rà; không có material question mới đủ căn cứ trong phạm vi khảo sát |
| G3 | Hỏi toàn frontier ngữ nghĩa còn lại, nếu có | G2, các prerequisites tương ứng | D01 đã trả lời; không sinh thêm câu hỏi schema/proof |
| G4 | Đồng bộ owner definitions/graph/CQ/mapping; ghi rõ deferred engineering và limits | Quyết định liên quan đã có câu trả lời | Đã đồng bộ xác nhận/provenance và wording; kiểm chứng tài liệu ghi cuối trang |
| G5 | Kiểm frontier rỗng và tổng hợp để user xác nhận kết thúc | G1–G4 | **Đã xác nhận: P2767 → P2769; frontier trong phạm vi phiên đã đóng** |

F1 có thể chạy song song khi Q1 chờ câu trả lời. Không hỏi user facts có thể kiểm trong repo. G2 không coi decision.status=approved hay openModelingFrontiers=[] là bằng chứng duy nhất rằng không còn lựa chọn ngữ nghĩa. Unknown cardinality không tự sinh một câu hỏi nếu chưa cần quyết định cho hành vi V1.

Các nhánh đã đóng về nghĩa/policy: D02 execution identity/admission; D03 dynamic join/Outcome/reuse; D04 mandatory Deep/Fix-forward boundary; D05 evaluation/attribution; GA01 Assignment redispatch/continuity. Nhãn UI đã được duyệt và quy tắc chỉ định Skills tường minh cũng giữ nguyên.

## Factual exploration F1

- Task: `node:delegated-task:command%3Amcp%3A35df9414-89bb-48ff-85f3-623a87612eea%3Adelegate-task%3Aglossary-v1-resume-frontier-audit-r1-20261023`.
- Child thread: `thread:delegated-task:command%3Amcp%3A35df9414-89bb-48ff-85f3-623a87612eea%3Adelegate-task%3Aglossary-v1-resume-frontier-audit-r1-20261023`.
- Provider/model/options được trả về: `codex` / `gpt-6.1-sol` / `[{"id":"reasoningEffort","value":"xhigh"},{"id":"serviceTier","value":"default"}]`.
- Deliverable duy nhất: `docs/design/glossary-v1-frontier-audit-r1.md`.
- Brief: rà 155 concepts / 236 relation records / 63 constraints / 51 CQs theo source; tìm semantic alternatives còn thiếu, tách technical/proof khỏi approved decisions, không sửa definitions hoặc tự quyết. Phase design; không vận hành Paseo hoặc triển khai runtime.
- Trạng thái: **completed**, đã đọc báo cáo và kiểm task status ở lượt nhận kết quả. [Báo cáo F1](glossary-v1-frontier-audit-r1.md) là factual input, không phải câu trả lời user hoặc xác nhận kết thúc phiên.

### Parent review F1 — sau khi nhận báo cáo

Đã đọc toàn báo cáo; kiểm lại inventory 155/236/63/51, ba requirement/source pins REQ05/REQ06/REQ14 và các đoạn wording về delegation labels/lifecycle dispatch. Không có material semantic question mới đủ căn cứ ngoài scope D01. Các cặp acceptance D02–D05/GA01 đã có đối chiếu trực tiếp trong evidence bundle trước; không hỏi lại.

Tại lúc nhận F1, frontier user là **Q1 vòng G01**; câu hỏi đó đã được trả lời ở P2722. Gate nghiệm thu V1 tổng hợp thuộc phiên khác và vẫn chưa được xác nhận; không ghép nó vào câu hỏi vocabulary.

Các sửa clerical/provenance được ghi trong F1 — source pins quá hẹp và introductions còn cũ — không tự là quyết định nghĩa mới. Việc kiểm/sửa chúng và qualify câu về Step Run trong onboarding được để ở bước G4 sau câu trả lời liên quan; không tự thêm quy tắc non-workflow Assignment.

Giới hạn: F1 không re-audit độc lập từng dòng của toàn bộ 488 source pins, mọi historical message hoặc artifacts thực nghiệm. Host reboot/resource-starvation và source edit/delete chưa có dedicated end-to-end CQs; các gaps này được lưu như watchpoints, không âm thầm hứa thêm bidirectional sync/cancellation hoặc runtime liveness. Cần kiểm coverage/giới hạn này khi tổng hợp cuối phiên; không suy frontier rỗng chỉ từ kết quả bounded audit.

## Vòng G01 — đã trả lời

**Q1 — Chốt bộ English vocabulary D01 cho V1?**

Bạn có đồng ý chấp nhận **canonical English names, concise definitions và owning glossary** của 96 mục trong [bản review D01](v1-vocabulary-review.md), gồm 73 mục vocabulary và 23 contextual references?

**Đề xuất: đồng ý** trong phạm vi đó; giữ aliases/anchors và các nhãn UI Vietnamese đã duyệt. Việc này không tự phê duyệt toàn bộ graph relations/cardinalities, schemas hoặc runtime capabilities.

**User answer: “ok” — P2722, 2026-10-23.** Đây là xác nhận hiện tại cho Q1 được nhắc lại đầy đủ tại P2720 (bản hỏi đầu tiên ở P2710). Item ID: `turn-item:message:67d5036f-d3e0-47a5-a52f-1790abd4b024`. [API evidence và frozen review](history/glossary-v1-g01-2026-10-23/acceptance-g01.json) giữ source pointers, nguyên văn, hashes và snapshot bộ 96 mục đã hỏi. Xác nhận này không dùng để diễn giải ngược P2367 và không tự đóng toàn phiên.

## G4 — đồng bộ sau G01

- D01 trong register và review manifest trỏ trước tiên tới nguồn xác nhận mới SRC489; source SRC323 và lịch sử cũ vẫn được giữ. [Accepted follow-up](v1-glossary-completion-plan.md#d01-explicit-current-confirmation).
- REQ05/REQ06 thêm đoạn scope đầy đủ; REQ14 thêm nguồn owner/concurrency/privacy phù hợp, giữ status inferred. Các source pins hẹp cũ được bảo toàn, không tự nâng yêu cầu/test case thành runtime proof.
- Configuration/UI introduction làm rõ những nhãn đã duyệt; không tạo nhãn mới. Onboarding dispatch được qualify để quy tắc cùng Step Run chỉ áp cho retry trong Workflow Step; không ép mọi Assignment ngoài workflow có Step Run.
- Owning definitions, concept/relationship/constraint semantics, UI/code mappings và runtime evidence giữ nguyên so với baseline trước G01. Schema, protocol, công thức đo, số slot/concurrency và provider enforcement vẫn thuộc các phiên/module liên quan.

## Vòng G02 — đã xác nhận kết thúc

**Q1 — Bản tổng hợp này đã phản ánh đúng và đủ cách hiểu để kết thúc phiên Glossary V1 / concept graph chưa?**

Đề xuất **đồng ý** trong phạm vi sau: English vocabulary/definitions/owners đã xác nhận; các quy tắc execution/join/Outcome/evaluation/recovery và Assignment identity đã hỏi được giữ; glossary theo scope, UI/code mapping và graph/CQs làm mô hình tham chiếu có provenance. Các relations/types/cardinalities còn inferred/proposed/unknown giữ đúng nhãn, không được tự xem là đã duyệt. Những chi tiết schema/protocol/native capabilities/runtime proof và gate nghiệm thu V1 vẫn có owner/phạm vi riêng, không được coi là đã xong qua phiên này.

Rà requirements/scenarios và parent review không phát hiện thêm material semantic decision đủ căn cứ trong phạm vi đã khai báo. Giới hạn coverage của F1 được công khai ở trên. Phát hiện mới ở các phiên tiếp theo có thể mở lại một nhánh liên quan với lý do/evidence cụ thể; không tuyên bố mô hình hoàn chỉnh vĩnh viễn hoặc đủ chứng minh production.

**User answer G02: “ok rồi” — P2769, 2026-10-23.** Trả lời trực tiếp bản tổng hợp/câu hỏi kết thúc ở P2767. User item ID: `turn-item:message:9a593740-af70-4ae6-87f2-eee3b7f2a3d6`. [API evidence, nguyên văn và hashes](history/glossary-v1-g02-2026-10-23/closure-g02.json) giữ cả bản nhật ký trước khi ghi closure. Đây là xác nhận shared understanding và kết thúc phiên, tách khỏi xác nhận vocabulary D01 ở G01.

**Session status: closed trong phạm vi đã tổng hợp.** Không còn câu hỏi ngữ nghĩa đang chờ trong design tree của phiên này. Các giới hạn inferred/proposed/unknown, technical design/proof và gate V1 được giữ rõ ở bản tổng hợp; không biến chúng thành approved chỉ vì phiên đã khép. Các phiên kiến trúc tổng thể, Agent Catalog/Delegation, Onboarding/MCP và Release/Recovery không tự kết thúc cùng phiên này.

## Điều kiện kết thúc phiên

Mọi quyết định ngữ nghĩa cần cho phạm vi đã thống nhất có câu trả lời, contradictions/material gaps đã được xử lý hoặc có quyết định giới hạn phạm vi tường minh; các facts chưa biết và engineering work có owner/giới hạn rõ. Docs phản ánh đúng quyết định, không tự nâng inference thành approval. Khi frontier thực sự rỗng mới trình bản tổng hợp để user xác nhận shared understanding và kết thúc. Không có tuyên bố phần trăm hoặc đóng phiên chỉ vì đủ node/CQ.

## Verification sau G01

[Validation record](history/glossary-v1-g01-2026-10-23/validation-g01.json): 493 source pins khớp exact excerpts; 155 owning definitions/anchors khớp register; bộ 96 entry review vẫn khớp; concept/relation/constraint/CQ/mapping projections và runtime evidence không đổi so với baseline. Packed graph khôi phục đúng register; JavaScript của hai HTML hợp lệ; 500 liên kết/anchors Markdown đã kiểm không lỗi. Frozen history bundle và evidence G01 qua kiểm hashes/source pointers. Graph hiện 511218 ký tự, dưới giới hạn inline 512000.

Các kiểm này xác nhận tính nhất quán của tài liệu/dữ liệu, không thay source entailment review, browser layout test hoặc bằng chứng runtime. Chưa thực hiện thao tác Paseo hoặc triển khai sản phẩm. Không dùng validation để thay câu trả lời G02.
