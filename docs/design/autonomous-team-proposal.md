# Đề xuất lại: danh mục agent cho harness tự vận hành

Ngày: 2026-10-22. Hướng thiết kế đã được người dùng chấp nhận để cập nhật prototype; chi tiết protocol vẫn là đề xuất kỹ thuật; spike riêng chưa kiểm toàn bộ đội hoặc Improvement Loop. Giữ một bộ/một dự án, hai orchestrator, code jobs và workflow runtime hiện có. Không sửa hoặc vận hành repo HBU tham chiếu.

Sơ đồ tương tác: [autonomous-team.html](autonomous-team.html).

> Cập nhật yêu cầu sau prototype: người dùng cần editor agent trực tiếp gồm ordered native profile fallback, skills từ bộ đã nạp và principles auto/fixed/hybrid. Role tham chiếu **harness agent definition**, bắt buộc tham chiếu native Paseo profiles đã tạo trước. Settings vẫn bốn nhóm; chi tiết hiện hành tại configuration.md và prototype-spec.md. Các phân tích về native profile bên dưới vẫn áp dụng; harness chỉ bổ sung composition và skills/principles.

## 1. Điều chỉnh đề xuất trước

Bốn nhóm settings vẫn là hướng thu gọn hợp lý, nhưng mô tả Agents chỉ bằng role → Paseo profile đã làm mờ tài sản chính: cách orchestrator chọn người thực hiện, phương pháp, nguyên tắc và điều kiện nghiệm thu. Profile trả lời model/mode/options; chưa trả lời nên giao việc nào và làm theo phương pháp gì.

Cần ít settings cho người vận hành và một catalog năng lực đủ rõ cho agent. Definitions được version và sửa qua candidate không có nghĩa bị hard-code bất biến. Harness Engineering Orchestrator phải đọc, dùng và cải tiến được catalog trong quyền đã cấp.

## 2. Những gì thực sự có trong HBU

Nguồn chính: [config/agent-spawn.md](/Users/hanhnt2/Desktop/hblead-stream/config/agent-spawn.md:117), [docs/agents/agent-spawn.md](/Users/hanhnt2/Desktop/hblead-stream/docs/agents/agent-spawn.md), [roles.py](/Users/hanhnt2/Desktop/hblead-stream/hbu/src/hbu/harness/roles.py:139), [hbu-mode](/Users/hanhnt2/Desktop/hblead-stream/hbu/skills/hbu-mode/SKILL.md), [mục lục principles đã sinh](/Users/hanhnt2/Desktop/hblead-stream/.agents/skills/hbu-mode/PRINCIPLES.md), [ADR 0004](/Users/hanhnt2/Desktop/hblead-stream/hbu/docs/adr/0004-ky-su-harness-theo-mape-k.md).

Đã đọc, chưa chạy HBU/test/agent:

- Bảng đội harness gắn role với danh sách model ưu tiên, thinking và skills. Những vai như phân tích, lập kế hoạch, sửa, review, research và retro là các lựa chọn có cách làm rõ.
- Prompt được sinh từ role: skill chính, hbu-mode, skills phụ, con trỏ tài liệu/check và kết quả cuối. Code `header/plan/check` kiểm định dạng prompt; provider adapter có cách nạp khác nhau. Đây là kiểm cấu trúc, không chứng minh LLM đã làm đúng toàn bộ skill.
- Principles không phải danh sách cố định ở mỗi hàng. hbu-mode yêu cầu worker đọc mục lục, tự chọn 3–8 principles, đọc nội dung và nêu tác động khi báo về. Mục lục có mô tả tình huống áp dụng để hỗ trợ chọn.
- Role catalog thuộc đội harness; bản deploy có thể bị `control apply` ghi đè từ template. Muốn tái sử dụng phải chỉ rõ nơi sửa chuẩn, tránh edit bị mất.
- ADR 0004 dùng MAPE-K và chất lượng bắt buộc trước tối ưu chi phí/tốc độ. Mô tả model trong ADR cũ khác bảng hiện hành; không dùng nó làm ma trận model đang chạy.
- File còn trộn Phase/Excel/BD/epic riêng dự án, quota/routing đặc thù và các quyết định vận hành có thứ tự ưu tiên. Chế độ cuối file hiện giới hạn vào gỡ blocker, nên không thể suy từ bảng role rằng mọi công việc retro đều đang được admit.

Concept cần giữ là giao việc bằng năng lực/phương pháp và feedback. Không sao chép nguyên file hay các default model/quota/HBU-DONE/title conventions.

## 3. Khung chính: MAPE-K

MAPE-K của autonomic computing gồm Monitor, Analyze, Plan, Execute dùng chung Knowledge. Nguồn gốc: [IBM Redbook, chương 6.1.1, trang in 195–196](https://www.redbooks.ibm.com/redbooks/pdfs/sg246665.pdf#page=210). Đây là khung phân trách nhiệm; mapping vào LLM bên dưới là đề xuất của bộ này, không phải IBM mô tả agent/skills.

| Trách nhiệm | Trong Project Harness | Quyết định cần trả lời |
| --- | --- | --- |
| Monitor | Code jobs/events/state + worker cô đọng dữ liệu khi cần | Có thay đổi đáng xử lý hay không? |
| Analyze | Orchestrator hoặc worker điều tra có phương pháp | Triệu chứng có căn cứ không, nguyên nhân/điều chưa biết là gì? |
| Plan | Orchestrator chọn role, procedure, profile và cấu trúc workflow | Cần ai, phương pháp nào, thứ tự/phạm vi/điều kiện dừng nào? |
| Execute | Runtime admit/dispatch; worker dùng skills/tools; reviewer kiểm | Có thực hiện đúng quyền và tạo bằng chứng đạt yêu cầu không? |
| Knowledge | Catalog roles/skills/principles, decisions, evidence, kết quả các lượt | Biết làm gì, tại sao chọn, đã học được gì? |

Không tạo bốn orchestrator M/A/P/E. Harness Engineering Orchestrator hiện có điều phối vòng này; code và workers thực hiện phần việc phù hợp. Project Orchestrator vẫn sở hữu nghiệp vụ, không bị thay bằng một bước Execute thụ động. Nó cũng có execution feedback loop, còn harness loop cải tiến năng lực phục vụ nó.

MAPE-K không tự cung cấp durability, quyền, scheduler hay migration. Runtime phải cài chúng. Framework cũng không chứng minh principle/skill hiệu quả; cần outcomes và eval để biết.

## 4. Phân biệt sáu thứ dễ bị gộp

- Role: trách nhiệm và loại kết quả phải bàn giao, ví dụ điều tra nguyên nhân hoặc kiểm thay đổi.
- Paseo profile: provider/model/mode/reasoning/features cho phiên thực thi.
- Skill/procedure: phương pháp làm việc có bước và artifact. Một skill có thể là entry procedure; skills phụ không mặc nhiên là các workflow step nối tiếp.
- Principle: tiêu chí tư duy giúp chọn phương án trong tình huống cụ thể, như idempotency khi có replay. Principle mang ràng buộc bắt buộc phải được biểu đạt bằng policy/check tương ứng.
- Tools/permissions: khả năng hành động và phạm vi thật được runtime/provider/host cưỡng chế. Skill hay principle không cấp quyền.
- Workflow: cấu trúc giao việc, routing, join, retry/repair, review và điều kiện dừng do code kiểm soát.

Vì vậy role không bằng model, skill không bằng workflow, và một dòng PRINCIPLES không bằng bằng chứng chất lượng.

## 5. Ít settings, giữ ba loại tài sản

### Settings vận hành — người dùng sở hữu authority

Giữ bốn nhóm Agents/Limits/Actions/Automations nhưng Agents cho phép tạo/nhân bản/sửa Agent Definitions, chọn native profile refs chính/fallback, Skills và principle policy, cùng role bindings và trạng thái catalog hiện hành. Không bắt người dùng chọn skills/principles cho từng task. Limits/Actions là trần; harness không nâng chúng bằng cách chỉnh catalog của nó.

### Danh mục agent — harness duy trì có version

Một file đội nhỏ, có thể đọc như bảng tương tự agent-spawn. Mỗi entry có role, when-to-use, profile reference, entry procedure, skills phụ được hỗ trợ và expected result. Quyền/tool requirements nằm trong role contract triển khai, không trở thành danh sách user phải điền cho mọi role.

Bắt đầu với năm trách nhiệm worker dưới đây, chưa có số liệu rằng năm là tối ưu. Chúng là nhóm để cấu trúc đội, không giới hạn vĩnh viễn khả năng mở rộng:

| Trách nhiệm | Preset phương pháp theo tình huống | Kết quả |
| --- | --- | --- |
| Observe/retro | retro + recall khi cần | Findings gắn evidence hoặc no-change |
| Investigate | diagnosing-bugs hoặc research; why khi cần | Nguyên nhân có kiểm / câu hỏi đã nghiên cứu / uncertainty |
| Design/plan | codebase-design; grill-with-docs hoặc wayfinder khi phạm vi đòi hỏi | Phương án, tradeoff và đơn vị kiểm chứng được |
| Implement | implement/implement-spec; tdd khi test-first phù hợp; writing-for-agents khi sửa tài liệu | Change candidate cùng evidence |
| Verify | code-review + check theo hợp đồng | Findings/verdict gắn đúng candidate và tiêu chí |

Tên skill là tham chiếu concept; phải resolve đúng tên/version thực sự được cài. Không nạp mọi skill trong một hàng. `Investigate/research` và `Investigate/debug` có thể là hai preset nhỏ dùng chung role; không cần thêm cả một loại agent chỉ để đổi entry skill. Tách role mới khi trách nhiệm/quyền/output khác đáng kể hoặc outcomes chứng minh cần.

### Kho phương pháp và principles — nạp theo việc

pstack và mattpocock giữ nguyên chuyên môn đã đọc, không đặt nhãn phân chia cứng rằng một bên chỉ tư duy, bên kia chỉ quy trình. Catalog ghi name, when-to-use và nguồn/revision; definitions giữ trong repo/package.

Orchestrator chọn role/entry procedure. Worker chọn principles từ mục lục theo nội dung việc và có thể đề nghị đổi phương pháp khi không khớp. Ghi lý do chọn và ít nhất quyết định/kiểm tra thực tế bị ảnh hưởng, thay vì đánh giá chất lượng bằng số principles.

Giữ core operating rules về bằng chứng/quyền/kết quả cho mọi task. Số principles bổ sung tùy nhu cầu; không mang 3–8 thành quota mặc định. Việc cơ học có thể không cần bổ sung principle; việc replay/concurrency có thể cần idempotency và phân tách shared state. Principle không được viện để vượt yêu cầu nghiệp vụ, authority hoặc bỏ nghiệm thu.

## 6. Hợp đồng giao việc tối thiểu

```ts
// Pseudocode của harness, không phải Paseo SDK.
delegate({
  role: "investigate",
  procedure: "debug",       // preset hợp lệ của role
  task: issue,
  inputs: [trace, stateSnapshot],
  doneWhen: ["tái hiện được lỗi", "phân biệt nguyên nhân với giả thuyết"],
});
```

Implementation resolve role/profile/procedure/version; loại phương án thiếu quyền/capability/quota trước; pin effective bundle và ghi intent; tạo worker qua Paseo với instructions chỉ định tường minh tên và nguồn Skills đã chọn trong Agent Definition. Kiểm nguồn truy cập được; không yêu cầu catalog riêng hoặc cấu hình trực tiếp provider. Worker chọn principles liên quan trước hành động quan trọng, ghi context selections và kết quả. Runtime kiểm output/evidence, không dùng lời tự báo xong làm pass.

Không cần selector agent riêng cho mỗi task. Việc hiển nhiên route bằng code/rule; trường hợp mơ hồ orchestrator lựa chọn trong candidate set đã đủ điều kiện. Khi hết capacity thì chờ; không tự chọn profile khác làm mất yêu cầu. Khi thiếu skill bắt buộc thì chặn/đề xuất bổ sung, không lặng lẽ chạy prompt tự chế.

Nạp qua slash/Skill/read-path là chi tiết adapter, không invariant sản phẩm. Giữ generated task envelope và registered procedure, bỏ ràng buộc mọi provider phải hiểu cùng một slash command. Không coi generated prefix là sandbox.

Reviewer tối thiểu là phiên/nhiệm vụ kiểm độc lập theo đúng candidate. Dùng model/provider khác là policy khi hữu ích và có capability, không mặc định khác provider chứng minh review đúng hoặc bắt mọi việc nhỏ chờ provider khác.

## 7. Chọn động ở đâu, cố định ở đâu

Cố định bằng code: ownership, quyền, budgets, role/procedure hợp lệ, contracts, state transitions và dispatch/recovery. Cấu trúc workflow được validate/pin; evaluator-optimizer có trần.

Agent quyết định: vấn đề nào đáng xử lý, chọn preset nào, đọc context nào, principles liên quan, chia việc trong templates và diễn giải feedback. Như vậy vẫn giữ luồng tất định bên ngoài, quyết định không tất định tại các điểm được phép.

Sửa catalog, skill, principle index hay workflow là thay đổi definition; không là quyền tự sửa ngay cấu hình active giữa một lượt. Candidate → kiểm → activation cho lượt mới → observe → keep/rollback tương thích. Nới permissions/budget/business objectives cần authority riêng. Mọi task pin bundle để phân biệt lỗi do lựa chọn hay do phiên bản thay đổi.

## 8. Ví dụ một vòng có giá trị

Code job poll PR phát hiện comment mới → normalize/dedupe vào project inbox. Project Orchestrator diễn giải comment là yêu cầu sửa nghiệp vụ hoặc thiếu năng lực; chỉ trường hợp sau mới tạo work harness liên kết.

Ví dụ lỗi tạo trùng task sau reconnect: code monitor cung cấp run IDs/cursor/delivery; harness giao Investigate/debug tái hiện. Worker tự chọn principle-make-operations-idempotent vì evidence chỉ ra replay, không vì tên role luôn yêu cầu principle đó. Nếu chưa có repro thì tiếp tục điều tra, không nhảy sang sửa.

Design/plan chỉ thêm khi thay đổi nhiều phần hoặc hướng sửa chưa rõ. Implement làm patch và test regression trong worktree. Verify đọc diff, kiểm replay/crash behavior và evidence. Harness activate bản đạt trong quyền; các lượt sau đo duplicate delivery và việc hợp lệ có bị mất không. Chưa đủ observations thì verdict pending/inconclusive, không tự tuyên bố improvement thành công.

Lỗi nhỏ đã rõ nguyên nhân có thể đi thẳng implement → verify. Không ép năm worker cho mọi task. Five workflow patterns hỗ trợ chọn/ghép/lồng luồng này; role catalog không khóa engine thành pipeline năm chặng.

## 9. 80/20 sau điều chỉnh

Giữ: catalog đội nhỏ có when-to-use/entry procedure/result; principles index theo tình huống; role-specific loading; runtime enforcement; independent verification; feedback đổi được definitions.

Cắt: ma trận mọi role × skill × principle; user checkbox principle mỗi task; quota đếm principle; mọi task phải qua mọi worker; copy toàn bộ 21 role HBU; hard-code model/provider names/fallback từ tên; title regex/marker text; UI quản lý riêng từng loại artifact.

UI cần một trang hoặc detail đọc được đội hiện hành, agent được chọn và lý do, skills/principles đã dùng cùng revision/evidence. Agent Definitions chỉnh trực tiếp trong Agents; thay role/procedure/Skill qua chat harness hoặc PR/candidate. Authority và giới hạn vẫn do người vận hành kiểm soát. Không mở lại 14 nhóm config để có một đội tự vận hành.

## 10. Kiểm xem concept có hoạt động

Đưa cùng một tập việc đại diện qua catalog hiện tại và candidate: job lỗi cần repro; kiến trúc mơ hồ cần thiết kế; sửa nhỏ có test; tài liệu; retro không có evidence; thiếu capability; quota cạn; context restart. Kiểm lựa chọn hợp lệ, output/evidence và outcomes; không chỉ kiểm worker kể đủ tên skills/principles.

Đánh giá thay đổi role/skill/principle phải giữ tiêu chí bắt buộc, xem rework/can thiệp/thời gian và chi phí khi đo được. Số lần dùng thấp chỉ là tín hiệu xem xét, không tự xóa skill hiếm nhưng cần cho recovery hoặc quyền. Khi học được bài có thể cưỡng chế bằng check/schema/test thì chuyển vào cấu trúc, tránh tích thêm prompt.

Đề xuất này giữ bốn nhóm settings, bổ sung rõ danh mục agent và kho phương pháp là tài sản do harness tự phát triển. Đã cập nhật HTML prototype theo hướng này; chưa triển khai runtime hoặc chốt ADR cho protocol/schema kỹ thuật.

## Starter packaging — accepted A10

[A10](history/architecture-a10-2026-10-23/acceptance-a10.json) xác nhận ship các trách nhiệm starter ở trên thành versioned presets cùng Onboarding/Harness Engineering instructions/definitions, reusable workflow blocks/templates và validation/eval fixtures. Onboarding bind native profiles và Skills/Principles đã cài; Engineering tái sử dụng/chỉnh cho dự án thay vì bắt buộc sinh lại toàn bộ. Năm nhóm là điểm xuất phát có thể phát triển, không phải số tối ưu đã được kiểm hoặc pipeline bắt buộc. Chưa đủ binding thì preset chưa runnable; fixture không tự chứng minh chosen model/provider đã đạt.
