# Nguồn tham khảo và giới hạn bằng chứng

Khảo sát nền ngày 2026-10-22; trang này tổng hợp nguồn đã đọc, không phải kiểm toán phiên bản mới hoặc xác nhận runtime. [Mục lục](README.md). Hợp đồng của repo nằm ở [architecture.md](architecture.md), [modules.md](modules.md) và [verification.md](verification.md); semantics của nguồn khác không tự trở thành bảo đảm của bộ harness.

## 1. Agent và harness dài hạn

[Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents) mô tả năm pattern đang dùng trong thiết kế và agent lấy phản hồi môi trường trong vòng lặp. Tổ hợp pattern và tự cải tiến harness là lựa chọn sản phẩm của repo, không phải bài viết bắt mọi hệ thống triển khai toàn bộ.

[Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) ghi nhận compaction chưa đủ trong thử nghiệm của họ; progress artifacts, Git, công việc tăng dần và end-to-end checks giúp tiếp tục qua session. Hai vai initializer/coding trong bài không phải bằng chứng cho hai orchestrator harness/project của repo.

[Harness design for long-running application development](https://www.anthropic.com/research/harness-design-long-running-apps) cho thấy cách xử lý context có thể thay đổi theo model và việc tách evaluator hữu ích trong thử nghiệm của tác giả. Không cố định reset hay giữ một conversation mãi như luật phổ quát.

[Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) phân biệt task/trial/grader/transcript/outcome, capability/regression và nhu cầu hiệu chỉnh LLM grader. Hàm ý của repo: kiểm outcome/evidence, gắn baseline đúng revision, chấp nhận inconclusive; một lần pass không chứng minh cải tiến ổn định.

## 2. Trách nhiệm và planes

[HashiCorp — Management, control and data planes](https://developer.hashicorp.com/well-architected-framework/design-resilient-systems/design-control-data-management-plane) phân biệt interface quản trị/quan sát, quyết định điều khiển và workload. [AWS — Control planes and data planes](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/control-planes-and-data-planes.html) phân biệt quản trị tài nguyên với chức năng chính của dịch vụ.

Repo áp dụng phép so sánh management/control/project-work planes tại [interaction-model.md](interaction-model.md). Đây là mô hình trách nhiệm, không khẳng định một orchestrator luôn tương đương một plane hoặc cần process riêng.

## 3. Paseo: dữ kiện trong tài liệu đã khảo sát

- [Schedules](https://paseo.sh/docs/schedules.md): schedule tạo agent mới mỗi lượt, heartbeat gửi prompt vào agent hiện có; schedule mặc định archive workspace khi xong nên cần lưu artifacts trước cleanup.
- [Schedules CLI](https://paseo.sh/docs/schedules-cli.md): có cron/timezone và giới hạn lượt/hạn dùng; every được biên dịch sang cron, không là interval đếm từ thời điểm tạo. Heartbeat CLI cần context agent và có bề mặt nhỏ hơn schedule.
- [SDK](https://paseo.sh/docs/sdk.md), [agents](https://paseo.sh/docs/sdk/agents.md), [reference](https://paseo.sh/docs/sdk/reference.md): TypeScript client quản lý lifecycle; run có idle/permission/error/timeout; timeout không mặc nhiên cancel. outputSchema không thay validation/evidence phía harness.
- [SDK events](https://paseo.sh/docs/sdk/events.md): live events bị lỡ không tự replay sau reconnect; cần snapshot/refetch/reconcile.
- [Plugin reference](https://paseo.sh/docs/plugins/reference.md): server plugin chạy subprocess; reload dừng process và RPC đang chờ có thể bị reject. Hook events không là journal bền vững. Vì vậy plugin dày cần state ngoài bộ nhớ và đường recovery độc lập.
- [Provider options](https://paseo.sh/docs/sdk/provider-options.md), [security](https://paseo.sh/docs/security.md): cấu hình/quyền khác nhau theo provider; options không tự là host isolation. Phải kiểm native tools/shell/MCP thật.
- [Hub triggers](https://paseo.sh/docs/hub/triggers): có nguồn event ngoài và continuation. Hub là tích hợp tùy nhu cầu, không yêu cầu v1 local phải triển khai.

Các dữ kiện này đến từ docs, chưa được thử trên deployment đích. Không suy “docs chưa nêu” thành “Paseo không có”. Chưa xác minh native overlap/catch-up, clocks/DST, busy heartbeat, lifecycle qua restart, role enforcement, cancel và bridge occurrence. Những spike này được liệt kê tại [verification.md](verification.md).

## 4. Scheduler và durable execution

[Temporal Schedules](https://docs.temporal.io/schedule#policies) tách định danh schedule khỏi workflow execution, có overlap/catch-up policy; pause schedule không tự dừng workflow đã chạy. Hàm ý: cron expression chưa mô tả đủ hợp đồng giao việc.

[Kubernetes CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) lưu ý có thể tạo trùng hoặc bỏ lỡ job và yêu cầu job idempotent. Admission tài nguyên cần rộng hơn một schedule riêng lẻ.

[LangGraph Checkpointers](https://docs.langchain.com/oss/javascript/langgraph/checkpointers) mô tả checkpoint theo thread/super-step; [Functional API](https://docs.langchain.com/oss/javascript/langgraph/functional-api#idempotency) giải thích replay, task kết quả đã lưu và side effect cần idempotency. Hàm ý: checkpoint không khôi phục tùy ý ở mọi dòng, SQLite không làm effect lên daemon nguyên tử.

Repo dùng stable occurrence/operation identity, delivery outbox, revision và reconcile. Chưa chọn Temporal, Kubernetes hoặc LangGraph làm dependency; các nguồn này giúp đặt đúng câu hỏi về semantics.

## 5. Concept HBU tiếp nhận có chọn lọc

Nguồn local được khảo sát đọc: `/Users/hanhnt2/Desktop/hblead-stream/`. Chỉ chạy help của `hbu harness` và các nhánh daily/experiment/verdict/dispatch; không vận hành loop, thử nghiệm hoặc sửa hệ đang chạy. Các file/dòng dưới đây là ghi nhận tại lúc khảo sát, không bảo đảm còn nguyên khi source thay đổi.

| Nguồn tương đối trong repo HBU | Ghi nhận và hàm ý |
| --- | --- |
| `hbu/src/hbu/core/state.py:104`, `core/runner.py:284` | Có state machine/check thật; text marker kết thúc mong manh, không nên copy thành hợp đồng outcome |
| `hbu/src/hbu/harness/keeper.py:24`, `hbu/skills/hbu-harness/SKILL.md` | Closed-loop agent có keeper/handoff; code runtime và quyết định LLM là trách nhiệm riêng |
| `hbu/src/hbu/core/profile.py:117`, `core/phases.py:125` | Có seam profile nhưng còn import và state HBU; không đồng nhất tên generic với hợp đồng đã generic |
| `hbu/src/hbu/core/phia.py`, `hbu/paseo-plugin/shared/roles.ts:14` | Repo/test/title/role còn chuyên biệt; tránh mang mặc định dự án vào lõi |
| `hbu/tests/repo_checks/test_core_boundary.py:23` | Kiểm vocabulary giúp canh ranh giới nhưng không thay test hành vi |

Giữ concept inbox, keeper, reconcile, role/skill bindings, daily retro và hypothesis/verdict. Không sao chép phase A/B/C/R/V, gate, title regex, số worker, quota, provider defaults, luật không hỏi người hoặc workaround CLI/version thành policy chung. HBU chưa cung cấp abstraction năm pattern tổng quát theo nhu cầu repo base.

Khảo sát không chứng minh độ bền/liveness trên deployment thật. Code được tiếp nhận sau khi có hợp đồng và test cô lập; phạm vi nghiệm thu vẫn một dự án cùng fixtures.

## Rà lại chức năng native — 2026-10-22

Đã đọc lại docs triển khai qua llms.txt: [Agent profiles](https://paseo.sh/docs/agent-profiles.md), [Schedules](https://paseo.sh/docs/schedules.md), [Workspaces](https://paseo.sh/docs/workspaces.md), [Worktrees](https://paseo.sh/docs/worktrees.md), [Plugins](https://paseo.sh/docs/plugins.md), [SDK agents](https://paseo.sh/docs/sdk/agents.md). Quyết định bỏ UI trùng tại [paseo-boundary.md](paseo-boundary.md). Docs hiện mô tả backend log tail sống qua reload/crash; không dùng kết luận cũ “mất toàn bộ log khi reload” làm giả định thiết kế. Durability/correlation của workflow vẫn cần journal riêng và spike.
