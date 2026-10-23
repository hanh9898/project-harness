Current status, 2026-10-23: English vocabulary is accepted; see [Glossary Map](../../GLOSSARY-MAP.md). The design progression below records the earlier proposal and interview history; its pending-name statements are superseded by [D01 acceptance](v1-glossary-completion-plan.md).

# Đề xuất bộ glossary cho Project Harness

Ngày 2026-10-22. Cấu trúc một map và bảy glossary đã được người dùng xác nhận và đã tạo; các định nghĩa cũ được chuyển nguyên nghĩa. Các nhóm tài liệu không mặc định là services hoặc bounded contexts triển khai độc lập. Tên mới và các cặp còn mơ hồ bên dưới vẫn cần phỏng vấn, chưa đổi UI/code.

## 1. Khung tư duy

Dùng Domain-Driven Design (Eric Evans): Ubiquitous Language, Bounded Context và Context Map. Ngôn ngữ dùng chung được gắn với mô hình trong một phạm vi xác định; khi qua phạm vi khác phải làm rõ việc giữ nguyên hay dịch nghĩa. Đó không phải yêu cầu áp một bộ từ chung cho mọi hệ thống hoặc chia mỗi layer frontend/backend thành một bounded context. Nguồn chính: [DDD Reference, trang in 2–4 và 29](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf).

UI bổ sung quy tắc dùng từ quen thuộc với người dùng, theo [Nielsen heuristic #2](https://www.nngroup.com/articles/match-system-real-world/). Do đó cùng một khái niệm có thể có canonical English term, nhãn hiển thị tiếng Việt và code symbol phù hợp quy ước ngôn ngữ; nghĩa nghiệp vụ vẫn phải khớp. Không tạo hai định nghĩa độc lập chỉ vì một bên là UI và một bên là code.

DDD không quy định các tên file hoặc số lượng glossary sau đây. Đây là cách áp dụng đề xuất cho repo này, không phải một chuẩn file của Evans. Bốn vùng nghĩa bên dưới là ứng viên để phỏng vấn, chưa chứng minh là bốn bounded contexts triển khai riêng, services hoặc databases.

## 2. Bộ tài liệu đề xuất

### GLOSSARY-MAP.md — mục lục và đường đi

Chỉ dẫn nơi sở hữu nghĩa từng thuật ngữ, cách các vùng liên hệ, cách tìm tên trên UI/code, trạng thái đề xuất/đã chốt và trường hợp phải hỏi lại. Map dẫn tới glossary thay vì chép lại định nghĩa. Map hiện hành tại ../../GLOSSARY-MAP.md chỉ xác nhận đường đi và phạm vi tài liệu, không xác nhận topology triển khai.

### GLOSSARY.md — ngôn ngữ chung của sản phẩm

Giữ nhỏ: Project Harness, Paseo Plugin, Project Orchestrator, Harness Engineering Orchestrator, Orchestrator Agent, Agent Definition, Agent Role, Paseo Agent Profile, Skill, Principle, Tool và các tên chung được nhiều vùng dùng cùng nghĩa. Không nhét mọi trạng thái, field/config, metric, SDK type hoặc nhãn nút vào file gốc.

Các thuật ngữ đang giải thích bằng tiếng Việt có thể được chọn English canonical term khi phỏng vấn tiếp; không tự đổi tên chỉ vì xây thêm file.

### docs/domain/execution/GLOSSARY.md — thực hiện công việc

Đã chốt: Work Item, Workflow/Workflow Definition/Workflow Run, Agent Session/Turn/Loop, Assignment, Attempt, Quality Iteration, Outcome, Checkpoint, Artifact và Evidence. Step execution chưa có định nghĩa riêng; chỉ bổ sung khi cần phân biệt nó trong mô hình thực thi cụ thể.

Các phân biệt quan trọng: yêu cầu được nhận / đã dispatch / agent hết Turn / Run đã dừng / kết quả đạt tiêu chí. Dừng Run không mặc định hủy mọi side effect. Thuật ngữ nói một khái niệm là gì; bảng chuyển trạng thái và hợp đồng resume nằm trong state model/interface spec.

### docs/domain/automation/GLOSSARY.md — kích hoạt và lịch

Job, Schedule, Schedule Occurrence và Job Run đã chốt, gồm chạy thủ công, bỏ/gom lượt. Trigger binding, executor target, source event, missed/overlap policy có thiết kế tại các module liên quan; chưa tự nâng thành glossary entries độc lập trước khi cần chốt nghĩa cục bộ.

Không đồng nhất Job Run với Workflow Run: Job đồng bộ task có thể thành công dù không có delta, không gọi agent và không thực hiện một công việc dự án.

### docs/domain/evolution/GLOSSARY.md — phát triển và phát hành harness

Đã chốt Improvement Loop/daily retro, Candidate, Release, Activation, Activation Target, Active Release, Recovery Release và Fast/Deep path. Known-good Release là tên tránh dùng cho Recovery Release trong mô hình hiện hành. Recovery plan/migration/backup có policy riêng; glossary không thay protocol hoặc tự tạo thực thể độc lập cho từng thao tác.

### docs/domain/analytics/GLOSSARY.md — quan sát và kết luận

Đã chốt Metric, Observation, Evaluation Trial, Verdict, Operational Analysis, Controlled Evaluation, Baseline, Comparison và Saved View. Cohort/attribution chưa là thuật ngữ chuẩn được chốt; chỉ mở rộng khi có nhu cầu nghĩa cụ thể. Thiếu dữ liệu khác giá trị 0; Comparison không tự chứng minh nhân quả; Saved View không lưu bất biến dữ liệu/kết luận.

Công thức, đơn vị, denominator, nguồn, xử lý missing và cửa sổ thời gian thuộc metric specification riêng, không biến glossary thành kho công thức. Glossary phải dẫn tới spec đó khi cần.

### docs/ui/GLOSSARY.md — nhãn hiển thị và nghĩa người dùng hiểu

Đây là UI lexicon ánh xạ về các glossary nghĩa ở trên. Ghi đối tượng/surface, canonical term ID, nhãn EN/VI đề xuất, mô tả ngắn hoặc tooltip, nhãn cần tránh và nguồn định nghĩa. Bao phủ navigation, tên entity, hành động, trạng thái và lời giải thích thiếu dữ liệu.

Không làm một glossary cho từng màn. Không dùng nhãn trạng thái chung nếu cùng từ khiến người dùng hiểu nhầm kết quả. Ví dụ nút dừng lịch và dừng Run phải nêu đúng đối tượng; Job Run completed có thể hiển thị “Đã chạy xong”, còn Workflow Run accepted có thể hiển thị “Đạt tiêu chí”. Đây là ví dụ để review, chưa chốt nhãn mới.

### docs/engineering/GLOSSARY.md — cơ chế kỹ thuật và cầu nối tới code

Chỉ giải thích cách các cơ chế được dùng trong chính harness: adapter, operation intent, outbox, lease/fencing, reconciliation, snapshot, revision/digest và recovery executable nếu cần. Các khái niệm kỹ thuật phổ biến chỉ bổ sung khi cách dùng cục bộ ảnh hưởng thiết kế; không viết lại tài liệu TypeScript, SQLite, CLI hoặc MCP.

Tên entity/code nghiệp vụ phải tham chiếu glossary domain; không định nghĩa một Workflow Run khác chỉ dành cho code. Bảng mapping ghi canonical term ID, proposed symbol, observed identifier, API/event/storage names nếu đã có, đường dẫn và trạng thái proposed/implemented/legacy. Có thể để bảng mapping trong cùng file trước; chỉ tách TERM-MAP.md khi đủ lớn. Hiện repo chưa có production runtime để coi các symbols là đã triển khai.

## 3. Bằng chứng cần xử lý từ repo hiện tại

- Root glossary giải thích Project Harness, orchestrators, Skills... nhưng chưa đủ các từ điều hành như candidate/release/occurrence/attempt/outcome/evidence và từ phân tích.
- Prototype có activity routes, makeActivity và S.activities để biểu diễn công việc; UI lại nói Hoạt động hoặc Workflow Run. Đã chốt Work Item là yêu cầu có thể có nhiều Workflow Runs; Activity chỉ là cách gọi UI. Cần sửa mô hình fixture trước khi rename code để phản ánh đúng hai cấp.
- Prototype dùng completed cho activity và Job history. Nghĩa hoàn thành lượt chạy lịch không đồng nhất với đạt tiêu chí dự án; UI phải gắn label theo đối tượng.
- Prototype dùng S.v1.schedules cho cả cấu hình lịch, executor/target và run history. Đây là fixture gộp dữ liệu; không nên lấy nó làm bằng chứng rằng mô hình production chỉ có một Schedule entity.
- UI có Agents, cấu hình agent, Profile native và profile refs; code fixture còn property profile trong worker bundle. Cần ánh xạ rõ Agent Definition / Paseo Agent Profile / Agent Session.
- Metric quality trong Analytics đang là dữ liệu fixture; tên này chưa đủ để biết numerator/denominator hoặc cách kết luận cải tiến. Cần nghĩa trong analytics và metric spec, không suy ra từ tên biến.

Các quan sát này là audit code/tài liệu, không phải quyết định thay thế từ vựng đã chốt.

## 4. Quy tắc giữ nhất quán

1. Mỗi khái niệm có term ID ổn định và một nơi sở hữu định nghĩa trong phạm vi của nó. Mục dùng lại dẫn link thay vì chép nghĩa.
2. Canonical terms dùng tiếng Anh; giải thích có thể tiếng Việt. UI label là quyết định riêng, có EN/VI mapping; glossary gốc không ngầm quyết định toàn app phải dùng tiếng Anh.
3. Phân biệt tên đúng nghĩa, synonym được chấp nhận và từ bị tránh. Từ giống nhau nhưng nghĩa khác phải qualify theo context/entity.
4. State labels có object type; glossary giải thích state là gì, state model xác định cạnh hợp lệ và điều kiện chuyển. Không dùng một enum done để thay tất cả verdict.
5. Agent đọc map rồi nạp glossary liên quan tới task; UI/code thay đổi phải đối chiếu domain term, UI label và identifier đang dùng.
6. Muốn thêm/đổi khái niệm: nêu scenario và khác biệt nghĩa, chốt với người dùng rồi sửa glossary sở hữu; sau đó cập nhật UI/code mappings. Không tự coi tên mới trong prototype là thuật ngữ được duyệt.
7. Không ép viết một glossary cho từng module, màn hình hoặc provider. Chỉ tách khi có nhóm nghĩa độc lập đủ rõ; các file là tổ chức tri thức, không tự tạo kiến trúc phân tán.

## 5. Thứ tự nên làm

Chốt các vùng nghĩa và UI/code mapping → lập map và di chuyển nguyên nghĩa các term đã chốt → phỏng vấn các cặp dễ nhầm (work item/run, job/schedule/occurrence/run, candidate/release/activation, observation/trial/verdict) → cập nhật UI/code names sau khi chốt. Không viết một lúc hàng trăm định nghĩa dựa trên phỏng đoán.

Nghiên cứu bổ sung: [glossary-framework-sources.md](glossary-framework-sources.md). Cấu trúc cụ thể ở tài liệu này là đề xuất của dự án.

Tiến độ phỏng vấn: Candidate/Release/Activation và Activation Target/Active Release/Recovery Release đã chốt tại [Evolution](../domain/evolution/GLOSSARY.md). Known-good Release là từ tránh dùng cho khái niệm Recovery Release trong thiết kế hiện hành; nguồn nghiên cứu và lịch sử kiểm thử giữ nguyên cách dùng của nguồn. Checkpoint và Artifact/Evidence đã chốt tại [Execution](../domain/execution/GLOSSARY.md). Metric/Observation/Evaluation Trial/Verdict đã chốt tại [Analytics](../domain/analytics/GLOSSARY.md). Assignment và Attempt/Quality Iteration/Outcome đã chốt tại Execution; Operational Analysis / Controlled Evaluation đã chốt tên, giữ nguyên nghĩa và anchors cũ. Baseline/Comparison/Saved View đã chốt. Vòng thuật ngữ cốt lõi hoàn tất ghi nhận; còn đồng bộ fixture/state model, nhãn UI và cơ chế engineering theo nhu cầu triển khai. Mapping UI/code còn thiếu được ghi tường minh, chưa coi prototype đã có mô hình production tương ứng.

## Rà lại coverage sau các vòng UI và prototype v9

[glossary-coverage.md](glossary-coverage.md) là audit hiện tại. Những kết luận “vòng thuật ngữ cốt lõi hoàn tất” ở trên chỉ nói về tập cặp nghĩa đã phỏng vấn khi đó, không chứng minh glossary toàn hệ thống đầy đủ. UI labels đã được chốt qua nhiều vòng và v9 đã sửa ba nhóm fixture identity; onboarding/runtime/authority/automation/engineering và tên English cho các domain entries cũ còn thiếu.
