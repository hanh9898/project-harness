# Paseo 0.13.0-beta.1 dispatch/authority delta — r8

2026-10-23. **Read** = pinned source/declarations; **Inference** = consequence; **Unverified** = needs runtime evidence. Compared `cafe4b01c8522ff39560241c5deb01427dc8dc5b` → `3fa625701eae6b3a07ccae18299200b1a7cf2776`. All five official package metadata pins match the latter; client/protocol/plugin declarations were inspected in memory. Parent-supplied runtime verification was not repeated. [Packages][packages]

Read Matt’s research skill and the four requested notes. Only this report was written; no live service calls, probes/tests, installation, runtime/configuration changes, private material, HBU access or delegation. R5/R6 remain historical. Accepted V1 stays: native profile/fallback references, explicit Skills/Principles without Skill isolation, workers without children by default, genuine Consult, scoped Session MCP, native chat primary, A11 Pause and GA01 identities. No operating/authority choice is selected.

## 1. Send surfaces: changed admission, unchanged execution limits

**Read:** SDK/RPC sends with `sourceAgentId` now enter a daemon-owned recipient queue; omitted behavior becomes **steer**, previously interrupt. Without that field, dispatch remains immediate/default interrupt. Both paths request permission clearing. The low-level SDK returns optional `deliveryStatus:"queued"`; public `agent.send()` still returns void and discards it. CLI takes provenance from `PASEO_AGENT_ID`, reports queued with `--no-wait`, and exposes no message-ID flag. [RPC][rpc] [SDK][sdk] [Handle][handle] [CLI][cli-send]

Local agent-scoped MCP `send_agent_prompt` now returns queued plus a generated message ID before provider dispatch; top-level MCP remains immediate/default interrupt. The tool accepts no caller message ID. Finish/error/permission notifications also enter this queue. Remote MCP sends use SDK/RPC delivery. [MCP][mcp-send] [Notifications][notifications]

**Read:** each enqueue resets a two-second timer **for that recipient**. “Quiet” means no new enqueues, not an idle agent. Compatible messages combine into one prompt; conflicting behavior/mode splits ordered dispatches. Pending batches/promises live in Maps; graceful shutdown flushes and waits. There is no persisted queue/replay or automatic retry after dispatch failure. The separate app Queue remains memory-backed and becomes interrupt during permission waits. [App][app-queue] [Store][app-store] [Queue][queue]

**Read:** dispatch still steers the current Turn or replaces it when steering is unavailable; explicit interrupt replaces. Internal Turn guards remain, but public send supplies no expected-Turn/idle CAS. A concurrent human Turn can receive the delayed input. RPC messages clear permissions; local MCP/notifications omit that flag, but batching ORs flags across messages. Provider permission-denial behavior remains. This is not durable, noninterrupting wake delivery. [Dispatch][dispatch] [Guards][guards] [Queue][queue] [RPC][rpc]

`waitForFinish` now waits for already-admitted recipient dispatches before observing status. It remains agent-scoped, not message/Assignment acknowledgement. Claude’s plan approval additionally supports resuming prior `auto` mode. [Wait][wait] [Claude][claude-plan]

## 2. Dedupe/recovery: owners unchanged, queued acknowledgement weaker

**Read:** CreationService, SDK CreationClient, MessageReceipts and atomic-file implementations are byte-identical between pins. Creation remains `(kind,key)` under one `paseoHome/creations`, across callers/workspaces; selected UUIDs and exclusive claims persist before effects. Changed intent conflicts; completed replay validates existence, without recreating deleted resources. Unfinished in-flight stages become outcomeUnknown; known-before-registration failures can retry. SDK operation maps remain process-local; callers must retain retry keys. No TTL/GC was added. Atomic replacement still has no fsync; cross-process/power-loss guarantees remain unverified. [Create][create] [Create client][create-client] [Atomic][atomic]

Send receipts remain `(resolved agentId,messageId)` under `agent-requests`: pending → dispatch acknowledgement → completed; completed replay dedupes, pending replay reports outcome unknown. Missing/empty IDs bypass receipts. **New:** an agent-originated RPC response can acknowledge queue admission while its disk receipt remains pending. A crash then can lose the in-memory message while preserving an ambiguous pending receipt; replay cannot reconstruct it. Later dispatch failure does not retract the earlier queued response. No public receipt-query/result-ack contract was found. [Receipts][receipts] [RPC][rpc]

The fingerprint now includes source server/mode and source-sensitive default behavior. **Inference:** replaying an old provenance send that omitted behavior can conflict because its normalized intent changed from interrupt to steer; pin original effective values during reconciliation. Submitted-request disconnect errors now carry `outcome:"unknown"`, improving diagnosis without resolving delivery. [Old RPC][old-rpc] [RPC][rpc] [Disconnect][disconnect]

Local native MCP creation still calls the creation command directly, without caller create-key support; CLI creation uses SDK-generated keys. Neither CLI rerun nor repeated MCP call establishes durable retry identity. Agent worktree placement changed: legacy SDK git/worktreeName is rejected; MCP directs callers to create_workspace first. [Native create][native-create] [Command][create-command] [CLI create][cli-create] [SDK placement][placement]

## 3. Timeline/observation: better batch correlation, same durability gap

**Read:** batched envelopes project into separate agent-message rows with individual message IDs and optional sender server ID, including provider replay. Live batch dispatch passes only its first ID as provider `clientMessageId`. Normal bootstrap still supplies neither durableTimelineStore nor a durable replacement; history hydration still omits row Turn metadata. Universal durable message→Turn recovery remains unestablished. [Envelope][envelope] [Queue wiring][queue-wiring] [Bootstrap][bootstrap] [Hydration][hydration]

**Changed:** `agent.turn_ended.timeline` is now always empty/deprecated, including the published plugin declaration; fetch history explicitly. Existing pagination/subscriptions remain observations, not durable result acknowledgement. Startup repairs stored running/initializing statuses to closed; that does not prove delivery or human Pause. [Hooks][hooks] [Startup][startup]

## 4. Authority/configuration: new connection ceiling, no Session binding

**Read:** injected native MCP still uses one daemon-run bearer plus separately queried callerAgentId; authentication accepts that bearer/daemon password, or unauthenticated access when no password is configured. No per-Session authenticated role binding was added; RPC source IDs also remain provenance fields. [Identity][identity] [Token][token] [Auth][auth]

**New supported host control:** low-level `sessionPermissions` in WebSocket hello intersects admitted daemon permissions, persists as that connection’s ceiling through permission updates, and is replaced on resume. It narrows that RPC connection, not an agent’s native tools/MCP/credentials. CLI does not set it; password/local-credential admission still grants owner authority. **Inference:** an owner-admitted caller can reconnect omitting the ceiling; this is not credential-bound attenuation. Operation permission arrays are alternatives, so removing workspace.write alone need not deny an operation. Plugin RPC still requires daemon.manage and passes only input plus {paseo}, without original caller/gesture evidence. [Ceiling][ceiling] [Resume][resume] [CLI auth][cli-auth] [Admission][admission] [Gates][gates] [Operations][operations] [Handler][handler]

**New surface:** native catalog adds list_hosts and serverId routing for selected agent/workspace tools. MCP routing requests daemon OWNER_PERMISSIONS, bounded by destination admission; lockedCwd rejects remote routing. SDK qualified addresses/parent labels establish location/relationships, not grants. These paths expand verification scope, without establishing Consult/no-child enforcement. [Catalog][catalog] [Host route][host-route] [Addresses][addresses]

**Unchanged supported composition:** agent.create hooks precede validation/injection; hooks replace configuration sequentially without automatic deep merge, while session_open can change only env. Per-agent options override provider defaults recursively; arrays/scalars/null replace. Local same-provider MCP children inherit providerOptions only. [Preparation][preparation] [Merge][merge] [Hook order][hook-order] [Hook guards][hook-guards] [Inheritance][inheritance]

Injection strips a named paseo HTTP/SSE entry with pathname /mcp/agents regardless of host; a remaining real custom paseo endpoint suppresses injection. Empty/deleted maps allow reinjection. Provider catalog enabled/disabledTools and daemon injection switches remain broader settings, distinct from per-agent mcpServers/toolPolicy/options. [Injection][injection] [Policy][policy]

Claude denial/sandbox/permission options and Codex strict schema/mapping are unchanged. Claude toolPolicy appends allowedTools grants. Codex still accepts multi_agent_v2; toolPolicy sets enabled_tools only on referenced servers, and empty grants impose no deny-all. Validation precedes automatic injection. No new whole-agent Consult/no-child enforcement or host isolation follows from these mappings. Claude launch applies providerOptions, settings overlays and the MCP map, then appends provider-runtime denials. Codex layers providerOptions → customCodexConfig → mapped agent MCP → toolPolicy; explicit options override mode presets. Effective inherited/user MCP composition and binary enforcement remain unverified. [Claude options][claude-options] [Codex options][codex-options] [Claude launch][claude-launch] [Codex launch][codex-launch] [Preparation][preparation]

## 5. Bounded probes proposed, not executed

1. Two disposable clients/recipients: burst, conflicting mode/behavior, human-Turn race and permission wait; compare RPC, local/remote MCP, top-level sends and public SDK return values.
2. One synthetic identity per surface: response loss/restart before enqueue, after queued ack and after dispatch/completion; same/changed replay, including old implicit behavior. Check graceful flush separately.
3. One two-message batch per provider: correlate both IDs/Turn before and after restart/refetch; verify empty hook payload and retained pending uncertainty.
4. Two differently restricted Sessions per provider: sanitized launch/catalog capture across custom paseo/internal-path collision, resume and fallback. Exercise Consult effects and all child routes against disposable fixtures, including CLI/SDK and registered-host routing; require rejection before effects and unchanged fixture/mock-remote counters.
5. Synthetic credentials: ceiling omission/reconnect/revocation and alternative permission gates; independently verify scoped Session token binding, expiry/revocation and A11 Pause. Preserve GA01 identity through response-loss reconciliation.

**Unverified:** complete Consult/no-child passes, durable noninterrupting delivery, Session authentication and universal durable correlation remain open; none is declared impossible.

## Sources

All implementation links pin beta.1 except the explicitly labeled old RPC. Public source archives were retrieved without checkout/extraction: [old pin](https://codeload.github.com/getpaseo/paseo/tar.gz/cafe4b01c8522ff39560241c5deb01427dc8dc5b), [beta.1 pin](https://codeload.github.com/getpaseo/paseo/tar.gz/3fa625701eae6b3a07ccae18299200b1a7cf2776). Byte-identical owners listed above were compared directly.

Official 0.13.0-beta.1 metadata: [client](https://registry.npmjs.org/@getpaseo/client/0.13.0-beta.1), [plugin](https://registry.npmjs.org/@getpaseo/plugin/0.13.0-beta.1), [protocol](https://registry.npmjs.org/@getpaseo/protocol/0.13.0-beta.1), [server](https://registry.npmjs.org/@getpaseo/server/0.13.0-beta.1), [CLI](https://registry.npmjs.org/@getpaseo/cli/0.13.0-beta.1).

Published archives/declarations inspected:

- [Client archive](https://registry.npmjs.org/@getpaseo/client/-/client-0.13.0-beta.1.tgz): `dist/daemon-client.d.ts:121,156–157,940–945` (connection ceiling, source server/mode, queued receipt); `dist/index.d.ts:267,290` (address, void public send).
- [Protocol archive](https://registry.npmjs.org/@getpaseo/protocol/-/protocol-0.13.0-beta.1.tgz): `dist/messages.d.ts:1306,7731,16852,35037` (qualified provenance, batching feature, queued status, hello ceiling).
- [Plugin archive](https://registry.npmjs.org/@getpaseo/plugin/-/plugin-0.13.0-beta.1.tgz): `dist/server/lifecycle.d.ts:54–57` (empty/deprecated timeline).

Additional exact supporting ranges: [permission ceiling on updates](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/websocket-server.ts#L1097-L1118), [Claude superseded-permission denial](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/agent.ts#L2786-L2797), [Codex denial](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L4834-L4843), [optional durable writes](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-manager.ts#L5022-L5058), [app queue drain](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/app/src/runtime/host-runtime.ts#L2510-L2548).

[packages]: https://registry.npmjs.org/@getpaseo/client/0.13.0-beta.1
[rpc]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/session.ts#L8198-L8323
[sdk]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/daemon-client.ts#L3734-L3792
[handle]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/index.ts#L984-L1009
[cli-send]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/cli/src/commands/agent/send.ts#L195-L235
[mcp-send]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/tools/paseo-tools.ts#L1946-L2088
[notifications]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-prompt.ts#L504-L599
[queue]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-messages/delivery.ts#L52-L188
[dispatch]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-prompt.ts#L103-L202
[guards]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-manager.ts#L2784-L2958
[wait]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/session.ts#L8325-L8400
[claude-plan]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/agent.ts#L2813-L2821
[create]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/creation/index.ts#L64-L377
[create-client]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/creation/index.ts#L110-L161
[atomic]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/atomic-file.ts#L5-L24
[receipts]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/message-receipts/index.ts#L7-L81
[old-rpc]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/session.ts#L8200-L8234
[disconnect]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/daemon-client.ts#L7182-L7200
[native-create]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/tools/paseo-tools.ts#L1591-L1720
[cli-create]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/cli/src/commands/agent/run.ts#L707-L721
[placement]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/daemon-client.ts#L3137-L3145
[envelope]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-messages/envelope.ts#L69-L205
[queue-wiring]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/websocket-server.ts#L704-L730
[bootstrap]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/bootstrap.ts#L949-L963
[hydration]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-manager.ts#L4233-L4246
[hooks]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/plugins/lifecycle/index.ts#L93-L124
[startup]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/bootstrap.ts#L1892-L1900
[identity]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/bootstrap.ts#L1482-L1571
[auth]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/auth.ts#L128-L154
[ceiling]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/websocket-server.ts#L1097-L1759
[resume]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/websocket-server.ts#L1864-L1883
[cli-auth]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/cli/src/utils/client.ts#L162-L215
[admission]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/session-admission-auth.ts#L11-L36
[gates]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/authorization/index.ts#L25-L55
[handler]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/plugins/plugin-process.ts#L495-L501
[catalog]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/tools/paseo-tools.ts#L613-L804
[host-route]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/host-operations/index.ts#L44-L224
[addresses]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/client/src/index.ts#L1057-L1069
[preparation]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/agent-manager.ts#L5246-L5379
[merge]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/public-docs/sdk/provider-options.md#L17-L26
[hook-order]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/plugins/runtime.ts#L549-L574
[inheritance]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/tools/paseo-tools.ts#L866-L874
[injection]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/runtime-mcp-config.ts#L6-L69
[policy]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/paseo-tool-policy.ts#L7-L28
[claude-options]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/options.ts#L45-L102
[codex-options]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex/options.ts#L37-L86
[claude-launch]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/agent.ts#L3500-L3588
[codex-launch]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L5320-L5364
[app-queue]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/app/src/composer/input/state.ts#L6-L12
[token]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/bootstrap.ts#L654-L661
[operations]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/authorization/operation-permissions.ts#L135-L179
[hook-guards]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/plugins/lifecycle/index.ts#L132-L159
[app-store]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/app/src/stores/session-store.ts#L631-L671
[create-command]: https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/create-agent/create.ts#L155-L170

