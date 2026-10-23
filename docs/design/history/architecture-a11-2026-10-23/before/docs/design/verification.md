# Kiểm chứng và các quyết định kỹ thuật còn mở

Thiết kế hiện hành • 2026-10-23 • [Mục lục](README.md).

## 1. Trạng thái bằng chứng

Prototype UI có đặc tả riêng tại [prototype-spec.md](prototype-spec.md), HTML tại [prototype.html](prototype.html) và báo cáo [prototype-checks.md](prototype-checks.md). Các kiểm UI không được tính thành pass của acceptance runtime bên dưới.

Repo có [spike Paseo](paseo-spike-results.md) đã chạy SDK/plugin và worker Codex thật trên daemon 0.11.1: resolve native profile, đọc một Skill, kiểm output và nhận lại cùng agent qua plugin reload. Kết quả cuối được thu bằng reconcile tường minh; chưa có controller closed loop hoàn chỉnh, SQLite runtime, installer production hoặc nghiệm thu toàn Project Harness. HTML vẫn chỉ là mô phỏng, không tạo resource thật. Các ca bên dưới là yêu cầu cần kiểm; bằng chứng spike không tự chuyển chúng thành pass.

Nghiệm thu dùng một dự án được chọn cùng fixture cô lập; không yêu cầu triển khai dự án thứ hai. Khi tiếp nhận code HBU, chuyển các ca hành vi có giá trị sang interface mới thay vì sao chép test gắn cứng phase/gate.

## 2. Acceptance theo hành vi

| Nhóm | Bằng chứng phải có |
| --- | --- |
| Khởi tạo | Cài bằng Paseo, dùng context đã có, chỉ hỏi binding thiếu; không tạo setup/login/registry trùng |
| Bootstrap | Onboarding cấu hình bằng MCP → user Spawn Engineering dựng → user Spawn Project; từ đó Project Orchestrator nhận chat nghiệp vụ và yêu cầu năng lực liên kết |
| Kiểm chứng ban đầu | Người dùng chọn công việc đại diện; chạy cô lập, đủ tiêu chí/evidence trước khi công nhận năng lực tương ứng |
| Chat và panel | Chat chủ trì nghiệp vụ; panel config/inbox harness/monitor, không yêu cầu nhập lại task vào form |
| Monitor | Nhìn theo hoạt động, mở agent/chat và chi tiết evidence; phân biệt đang chạy/chờ/bị chặn/offline |
| Config | Catalog đủ scope/owner, effective value và inheritance; nháp/active/observed và apply mode đúng; không cho config override trạng thái runtime hoặc nghiệp vụ |
| Composition | Đủ năm pattern ghép tuần tự/song song/lồng, route hợp lệ, dynamic workers và vòng sửa có giới hạn |
| Outcome | Sai schema/thiếu evidence không hoàn thành; turn kết thúc không thay verdict |
| Criteria | Đúng owner/scope/revision, thay đổi không viết lại verdict cũ; tiêu chí mâu thuẫn hoặc không đo được có quyết định |
| Closed loop | Feedback → hypothesis → candidate → eval/regression → activation → monitoring → giữ/lùi/inconclusive |
| Daily | Dùng dữ liệu có provenance; không có evidence có thể kết luận chưa cần thay đổi |
| Admission | Worker/thời gian/budget không tự tăng; thiếu capability chặn phần phụ thuộc |
| Quyền | Provider đích thực sự chặn ngoài quyền, gồm native tools/shell; worker ghi cô lập |
| Triggers/timers | Occurrence và retry không giao trùng; policy missed/overlap/revision/pause quan sát được; timer cũ không tác động attempt mới |
| Recovery | Mất phản hồi, sự kiện, kết nối và reload/crash được reconcile, không tạo thay worker mù |
| Update | Plugin mới lỗi có đường recovery độc lập; bản Recovery và state hiện tại tương thích theo operation, không mặc định restore DB cũ |

## 3. Test qua interface

Dùng SQLite/FS/Git thật tạm; scripted Paseo adapter cho lỗi/mất phản hồi, fake clock cho timer/lease/daily. Kiểm receipt/snapshot/result qua interface module, không dùng private table/helper làm oracle duy nhất. Đóng/mở lại implementation để kiểm durability.

Các ca hợp đồng cần có:

1. Submit cùng key/payload trả một receipt; payload khác báo idempotency conflict; principal không tự chọn quyền bằng owner payload.
2. Agent đã được tạo nhưng phản hồi mất: restart/reconcile nhận lại assignment, không tạo agent thứ hai.
3. Provider idle nhưng output sai schema/thiếu evidence: task chưa đạt.
4. Pause khi còn worker: không admit worker mới, desired/observed state đúng; cancel giữ side effect cần đối soát.
5. Decision thuộc work khác, đã đóng hoặc stale revision bị từ chối; reply hợp lệ tiếp tục đúng việc.
6. Chia việc động vẫn trong template, role/capability/budget đã pin.
7. Đổi criteria không đổi verdict cũ; đánh giá mới dùng đúng revision/evidence/grader.
8. Reload/update bị ngắt: recovery executable độc lập nhận diện và phục hồi thao tác dang dở với code/state tương thích theo operation.
9. Delivery lặp hoặc crash sau Work commit trước Triggers receipt: restart vẫn một work item cho occurrence đó.
10. Máy ngủ qua nhiều kỳ: chỉ áp policy missed được adapter chứng minh; thiếu occurrence evidence phải báo unsupported, không phát lại cùng lịch Paseo từ runner khác; code jobs riêng có policy do harness sở hữu.
11. Các overlap policy đúng; nhiều trigger cùng sửa repo vẫn chịu admission tài nguyên chung.
12. Pause/sửa/retire cạnh tranh callback cũ đúng mốc commit; runOnce retry cùng ID không tạo hai lượt; work đã nhận giữ revisions.
13. Wake dồn khi orchestrator busy hoặc thay agent: chỉ một active owner, context/handoff đúng.
14. Timer của node/attempt cũ không chạm attempt mới; pause vẫn chặn admission khi timer tới hạn.
15. Daily thiếu evidence không sinh cải tiến giả; candidate giảm chất lượng không được chấp nhận chỉ vì rẻ hơn.
16. Monitoring thấy regression: giữ/lùi hoặc blocked recovery theo compatibility, không sửa lịch sử verdict.
17. Quyết định từ chat và thao tác panel đi qua cùng invariant; panel không nâng quyền, chat không chỉ lưu transcript.
18. Bootstrap discovery chưa bị gắn nhãn thực thi sẵn sàng; không publish/merge mặc định để chạy thử.
19. V1 một scope kit, role profile bindings tường minh; defaults/source và snapshot có revision rõ. Catalog candidate không thay quyền hoặc worker/time ceilings.
20. Chat/panel sửa cùng revision gây conflict, không mất thay đổi âm thầm; thiếu capability báo field cụ thể và không bỏ option ngầm.
21. Đổi model/skill/tool/program pin đúng revision cho lượt mới, run cũ không đổi ngầm; siết quyền/trần báo đúng trạng thái enforcement thực tế.
22. Settings/capability sync lỗi không báo đã enforce. Catalog/release drift chặn activation; giữ bundle work cũ và audit. Composite hot migration engine nằm ngoài v1.
23. Config export/log không chứa secret value; boot settings đọc được khi registry chưa mở mà không tạo hai nguồn active policy.

Các ca trên là yêu cầu test, chưa phải kết quả đã pass. Scripted adapter chứng minh code đối phó tình huống mô phỏng, không chứng minh Paseo thật có behavior đó.

## 4. Spike với Paseo/provider/host thật

| Spike | Câu hỏi phải trả lời |
| --- | --- |
| Schedule/heartbeat bridge | Giao work/wake bằng định danh nào, truyền correlation ra sao, agent busy/archived xử lý thế nào? |
| Clock và missed runs | Cron timezone/DST/clock correction/máy ngủ/restart; nguồn có catch-up hay chỉ live? |
| Delivery/reconnect | Trùng/mất callback, timeline refetch/cursor, sửa schedule cạnh tranh callback revision cũ |
| Lifecycle | Worker sống thế nào qua plugin reload/daemon restart; archive/dọn worktree giữ evidence ra sao? |
| Structured output | outputSchema/provider enforce mức nào; validate phía runtime, permission/timeout/invalid output |
| Quyền và cancel | Native/shell/MCP enforcement, worktree isolation, interrupt/cancel có thực hiện được theo role không? |
| Update/recovery | Plugin mới không boot, migration store, offline/online writer fencing, compatible recovery; backup/restore khi policy yêu cầu |
| Owner Tools trong native chat | Tool transport, authenticated context, request identity/Receipt recovery và acknowledgement nối vào native Session thế nào theo A02? |
| Native context & navigation | Resolve đúng project/workspace/host và profile; mở đúng session/Settings/Schedules bằng API thật; thiếu context xử lý thế nào? |

## 5. Các lựa chọn còn mở

Installer/packaging; SDK/runtime/provider versions; framework/interpreter; SQLite driver/schema; artifact/context layout và retention; clock/lease/backoff policy; native scheduler adapter; tích hợp startup Paseo hiện có theo A02; migration/recovery protocol; issue/event adapters; hosting/license/upstream. Không còn câu hỏi mở về việc V1 có thêm một OS supervisor riêng: A02 đã chọn dựa vào startup Paseo/máy/người dùng rồi tự reconcile.

Default role/model/options, số worker, budget, lịch/timezone và nguồn yêu cầu là cấu hình được chọn khi bootstrap theo capability, không mang số HBU sang. Không thêm Temporal/Kubernetes hoặc scheduler thứ hai mặc định chỉ vì tài liệu nguồn có tính năng đó.

Nếu spike không đáp ứng ràng buộc đã chốt, ghi rõ bằng chứng và xem lại quyết định liên quan; không báo thành công hoặc hạ yêu cầu ngầm. Lát cắt triển khai hiện hành là [onboarding-implementation.md](onboarding-implementation.md), gồm OB01–OB14 với lớp bằng chứng cần có; [modules.md](modules.md) giữ ownership và thứ tự mở rộng. Các ca này chưa pass chỉ vì có đặc tả.

## Code jobs không gọi agent

- Poll rỗng không tạo/wake agent; poll có delta chuẩn hóa event vào đúng inbox, không tự coi task completed.
- Task/comment trùng qua nhiều kỳ hoặc replay chỉ có một event delivery theo identity nguồn.
- Crash giữa đọc API, commit cursor và delivery không làm mất delta; DB transaction/outbox và reconcile xử lý replay.
- Job overlap/timeout/retry/rate limit có giới hạn; pause job không hủy work agent đã nhận; runOnce có idempotency.
- Reload/restart giữ cursor và policy skip/coalesce; không chạy bù vô hạn. Host dừng không hứa job còn chạy.
- Handler/version/inputs phải được cấp quyền; không cho cron job tăng quyền hoặc chạy shell tùy ý.

Các ca này là yêu cầu runtime, chưa có integration pass.

## Danh mục agent và lựa chọn phương pháp

Đối chiếu role/procedure/profile đủ điều kiện; thiếu skill không dispatch prompt thay thế. Work pin team/settings/skill/principle refs và contracts. Chọn principles phải có nguồn và lý do/ảnh hưởng, không dùng số lượng hoặc dòng tên làm oracle chất lượng. Poll cơ học rỗng không tạo agent. Kiểm đủ routing và năm workflow patterns, không bắt mọi task dùng mọi role.

Candidate catalog phải qua evidence/eval, authority `allow/ask/deny`, capability/compatibility và expected active revision. Ask cần quyết định một lần; deny giữ blocked. Apply cho assignment mới, work cũ giữ snapshot. Kiểm bắt buộc sau activation đạt thì release đạt; regression đi fix-forward, không ghi đè release/catalog mới hơn hoặc tự rollback catalog. Những kiểm UI tại prototype-checks.md chưa chứng minh inference hoặc enforcement thật.

## Agent definitions trực tiếp

Tạo/clone/edit trong harness, validate expected revision và nguồn. Mỗi candidate là reference đến một profile native đã tạo trong Paseo, với provider/model/options chỉ đọc; fallback chỉ khi unavailable/rate-limit, kiểm mandatory capability/authority/contract và reconcile effect trước retry. Fixed/auto/hybrid principles phải giữ operating rules và source provenance. Skill list không là sandbox. Resolve role → definition một nguồn; pin definition/model/resources cho work/session, không đổi sau edit hoặc availability update. Import client metadata không chứng minh skill có trên host; kiểm source registry/loader thật, drift và remote paths trước dispatch. Native profile chưa có/bị xóa phải chặn và hướng dẫn mở Paseo; không tự tạo hoặc chọn profile ngoài cấu hình.

## Kiểm release bổ sung

[Release policy](release-policy.md) thay thế cách hiểu rollback/backup/monitoring gate mặc định ở các đề xuất cũ phía trên. [Release verification results](release-verification-results.md) ghi 25 ca kiểm cơ chế đạt, kèm phạm vi và giới hạn. HTML v7 có 57 assertions riêng ở 375/728 px; không cộng số UI assertions vào số runtime tests.

## Onboarding implementation slice — cập nhật 2026-10-23

[Đặc tả và ma trận OB01–OB14](onboarding-implementation.md#10-acceptance-matrix-cho-implementation) tập trung vào menu/RPC và MCP cùng owner, config/revision conflicts, receipt replay, Build/Launch Readiness, native create/send bị mất response, in-flight reload, current Session authority và Replace. Chúng bổ sung acceptance ở trên; chưa có kết quả production cho protocol mới.

Bằng chứng cũ giữ nguyên phạm vi: spike Onboarding 0.11.1 kiểm hai Sessions Codex, config/check/Handover subset, reload giữa các bước và duplicate Spawn qua owner. Không gán pass native lost-response, Claude parity, Replace hoặc UI menu từ các local tests của spike. Owner fixture dùng file lock không phải implementation SQLite được đặc tả. Không cần chạy live mutation để nghiệm thu một thay đổi tài liệu.

## Acceptance bổ sung từ GA01 — yêu cầu thiết kế

Theo [GA01 đã chốt](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance), các tình huống cần kiểm sau này gồm: retry agent work trên cùng Session tạo Attempt/Assignment mới; fallback sang Session khác tạo allocation mới với predecessor; lost send response giữ cùng identity để reconcile; nhiều Turns hỏi thêm/tiếp tục không tạo allocation mới; late result không ghi đè lượt mới và chỉ reuse khi phù hợp; Replace orchestrator không tự rebind/cancel worker Assignments. Các mục này là contract cần đáp ứng, chưa là test pass hoặc yêu cầu chạy live trong phase thiết kế.

## Acceptance bổ sung từ A02 — yêu cầu thiết kế

[A02 đã chốt](history/architecture-a02-2026-10-23/acceptance-a02.json) bổ sung các contract dưới đây. Chưa có production implementation/test pass cho chúng; thay đổi tài liệu không yêu cầu live mutation.

| Tình huống | Kết quả cần kiểm |
| --- | --- |
| UI và agent cùng sửa Actions/Limits/Delegation Policy | Cùng Work owner validation/authority/revisions; stale edit conflict, không có bản policy active thứ hai |
| Catalog có Reviewer nhưng Project chỉ được Consult | Definition hợp lệ không tự cấp modes/quyền; Work kiểm effective policy và native constraints |
| Triggers/Releases và Work cùng tranh tài nguyên hoặc policy vừa bị thu hồi | Áp cùng policy hiệu lực; admission/action checks có provenance; không vượt trần hoặc giữ grant đã revoke nhờ snapshot |
| Orchestrator dừng trước Tool ghi nhận task từ chat | Chưa có Work acceptance; không dựng task từ một lời hứa trong transcript rồi báo đã commit |
| Owner commit xong nhưng response/chat acknowledgement mất | Đối soát bằng cùng request identity, nhận lại Receipt/reference; không tự submit key mới hoặc tạo việc trùng |
| Sửa tiêu chí/quyết định/config trong chat | Đúng owner Interface, quyền và revision; không nhất thiết sinh work item mới cho mọi lời nhắn |
| Paseo/host tắt rồi hoạt động lại | Plugin tự reconcile work/timers/jobs đã ghi; missed policy theo capability; không ghi nhận job đã chạy lúc executor tắt |
| Plugin lỗi giữa activation, Work subprocess không chạy | Recovery executable đọc/kiểm được durable policy/state và writer ownership; không phụ thuộc RPC của plugin đang lỗi |

V1 dùng startup Paseo/máy hiện có hoặc người dùng mở Paseo; không có cam kết OS service riêng tự bật lại host sau mọi crash/reboot. Bằng chứng watcher sống qua stop/start daemon 0.12.0 không chứng minh reboot/power loss hoặc production workflow resume. Phương thức nối owner Tools vào native Sessions và protocol phối hợp/fencing cần factual investigation/engineering trước implementation.

## Acceptance bổ sung từ A10 — starter assets và automation arming

[A10 đã chốt](history/architecture-a10-2026-10-23/acceptance-a10.json) bổ sung các ca cần kiểm khi triển khai; chưa có test pass cho runtime này.

| Tình huống | Kết quả cần kiểm |
| --- | --- |
| Cài repo base | Có source instructions/definitions cho Onboarding/Engineering, starter specialist presets, reusable workflow blocks/templates và validation/eval fixtures; không cần sinh lại tất cả từ đầu |
| Starter preset thiếu native profile/Skill/Principle binding bắt buộc | Không dispatch preset đó; việc độc lập đủ điều kiện không bị chặn; không tạo native profile/provider config thay thế |
| Fresh install hoặc Onboarding chưa hoàn tất giai đoạn cần thiết | Không tự bắt đầu LLM loop hoặc real external polling; plugin load/reconcile/health không bị đánh đồng với agent work |
| User Spawn Engineering, daily retro enabled và dependencies/quyền/cadence đủ | Đủ điều kiện chạy theo cadence/admission, không hỏi lại quyền từng lượt; configured không được coi là operational verification |
| Polling job enabled nhưng thiếu connection/filter/cadence | Chặn đúng job; không phát hiện task/PR giả hoặc ghi nhận đã poll |
| Reload/restart khi job disabled/paused hoặc Session chưa tồn tại | Giữ trạng thái và durable work; không tự re-enable, Spawn hoặc Replace; đối soát trước effect mơ hồ |

Fixtures đi kèm không chứng minh provider/model tùy chọn đã đạt capability/enforcement. Native cadence owner, initial representative verification và các giới hạn evidence cũ giữ nguyên; native Stop-to-Pause đang là frontier A11, chưa phải acceptance.
