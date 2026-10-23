# Automation

Ngôn ngữ về công việc được kích hoạt và quy tắc lịch. Một lượt chạy theo lịch không mặc định là một Workflow Run.

[Glossary Map](../../../GLOSSARY-MAP.md) · [Ngôn ngữ chung](../../../GLOSSARY.md)

## Language

<a id="job"></a>

**Job**:
Công việc có thể được kích hoạt để thực hiện một mục đích xác định, như đồng bộ task, kiểm tra PR hoặc chạy retro. Job có thể thực hiện bằng code hoặc giao cho agent, không mặc định cần một Agent Session.
_Avoid_: Schedule, mặc định là một agent hoặc Workflow Run

<a id="schedule"></a>

**Schedule**:
Quy tắc xác định thời điểm kích hoạt Job, như theo khoảng thời gian hoặc một giờ trong ngày. Schedule xác định khi nào kích hoạt; Job xác định công việc cần thực hiện.
_Avoid_: Job, Agent Session, toàn bộ cơ chế thực thi công việc


<a id="job-run"></a>

**Job Run**:
Một lần thực hiện Job, được kích hoạt theo lịch hoặc thủ công. Job Run thành công không mặc định tạo Work Item hoặc Workflow Run, chẳng hạn một lượt đồng bộ không tìm thấy dữ liệu mới.
_Avoid_: Job, Schedule Occurrence, Workflow Run

<a id="schedule-occurrence"></a>

**Schedule Occurrence**:
Một lượt đến hạn theo quy tắc của Schedule. Occurrence có thể bị bỏ qua, gom hoặc xếp chờ theo policy nên không đồng nhất với một Job Run được thực hiện; Job Run thủ công không cần Occurrence từ lịch.
_Avoid_: Job Run, Schedule, một công việc chắc chắn đã được thực hiện
