# Paseo 0.12 role/tool authority facts, round 6

2026-10-23. **Read** = inspected primary source; **Inference** = bounded consequence; **Gap** = unestablished. Target: published 0.12.0, commit `cafe4b01c8522ff39560241c5deb01427dc8dc5b`. Read Matt’s research skill and the requested design/facts notes. No tests, installs, live service/API calls, private credentials/configuration/transcripts, HBU access, runtime changes or delegation; only this file was written. Public source/documentation retrieval supplied static evidence.

Accepted V1 remains: native profiles first, primary/fallback references, explicit installed Skills/Principles, no Skill isolation requirement, workers without child delegation by default, genuinely restricted Consult, scoped harness MCP tokens, and native tools within effective authority.

## 1. Native MCP and CLI identity

**Read:** creation hooks precede configuration validation/runtime injection. For Claude/Codex, the enabled, unshadowed path injects HTTP `mcpServers.paseo`, pointing at `/mcp/agents?callerAgentId=<agentId>`, with an Authorization bearer. Claude passes URL/headers to its SDK; Codex converts them to `config.mcp_servers` URL/`http_headers` on thread start/resume. [Creation][manager] · [Preparation][prepare] · [Injection][injection] · [Claude mapping][claude-mcp] · [Codex mapping][codex-mcp] · [Resume][codex-resume]

**Read:** that bearer is random **per daemon run**, shared across injected connections, not per Session. The endpoint accepts it or a daemon password; without a configured password it accepts unauthenticated requests. Each POST creates a stateless MCP server/catalog; `callerAgentId` comes separately from the query and selects the stored provider-derived tool policy. This is not authenticated per-Session role binding. [Token][token] · [Bootstrap][bootstrap] · [Auth][auth]

**Read:** CLI uses daemon WebSocket RPC, resolving a URI/environment password or matching local credential. `PASEO_AGENT_ID` is checked by fetching that agent and supplies caller/parentage information; `paseo run` directly invokes `client.createAgent`. It does not obtain an attenuated MCP catalog/token from that variable. [CLI connection][cli] · [Caller][caller] · [Run][run]

## 2. Session controls and collision order

**Read:** SDK `config.options` maps to wire `providerOptions`; agent overrides recursively merge over provider defaults, arrays replace, and only agent options persist. `mcpServers`, `toolPolicy`, mode and provider options are per-agent. Conversely `mcpEnabled`/`mcpInjectIntoAgents` are daemon controls; `paseoTools.enabled/disabledTools` and provider-runtime `disallowedTools` belong to provider configuration. Catalog registration applies that Paseo policy, with `speak` excepted. [Options][options] · [Provider schema][provider] · [Policy][policy] · [Catalog][catalog]

**Read:** `agent.create` can replace public config except `cwd`; later hooks overwrite without automatic deep merge. `agent.session_open` can change only environment overrides; Paseo then sets its agent ID/CWD variables. These are lifecycle hooks, not a plugin per-tool authorization callback. [Hook contract/order][hooks] · [Guards][guards]

**Read:** automatic injection first strips a `paseo` HTTP/SSE entry whose URL **pathname** equals `/mcp/agents`, irrespective of host. A remaining custom entry named `paseo` suppresses injection; otherwise injection adds it. Deleting/emptying the map therefore does not disable injection. [Injection][injection]

**Inference:** a creation hook can select a real alternative endpoint under that name for one Session without global changes/provider patch. **Gap:** collision behavior is source-backed; complete Consult enforcement, inherited provider MCP composition and restart behavior still require probes. No placeholder endpoint or undocumented disable key is proposed.

## 3. Provider mappings and limits

**Read — Claude:** strict options accept `allowedTools`, `disallowedTools`, sandbox settings and `settings.permissions` allow/ask/deny. `toolPolicy.preapproved` adds exact `mcp__<server>__<tool>` entries to `allowedTools`. Options reach SDK launch; provider-runtime denials append afterward. Supported modes include plan/default/acceptEdits/auto/bypassPermissions; `dontAsk` is absent from the validated mode set. [Claude schema][claude-options] · [Launch][claude] · [Modes][claude-modes]

**Read — provider documentation:** Claude `allowedTools` preapproves; unlisted tools remain available. Bare-name `disallowedTools` removes tools; deny rules precede permissions modes. Thus per-agent denials can cover named Paseo MCP tools and native delegation tools, subject to actual CLI names/version. Plan mode is not proof of denied writes: write requests can reach the approval callback. Its Bash sandbox excludes file tools, MCP servers and hooks. [Claude permissions][claude-permissions] · [Sandbox scope][claude-sandbox]

**Read — Codex:** strict options accept `sandbox_mode`, `approval_policy`, workspace-write settings and `features.multi_agent_v2`; they accept neither Claude tool-list keys nor arbitrary `mcp_servers` policy. MCP conversion drops unsupported fields; the adapter does not map provider-runtime `disallowedTools`. `toolPolicy` sets each **referenced** server’s `enabled_tools`, default approval `prompt`, and exact grants `approve`; other servers remain untouched, and empty grants generate no allowlist. Validation requires referenced servers in the same agent request, before automatic injection. [Codex schema/policy][codex-options] · [Mapping][codex-mcp] · [Validation][validation]

**Read:** explicit Codex sandbox/approval options override mode presets. The internal read-only preset still uses `on-request`; `never` disables prompts, not all actions. OpenAI documents MCP allow/deny lists separately, and command-network controls exclude MCP connections. These provider docs do not establish Paseo passthrough. [Launch][codex] · [Modes][codex-modes] · [OpenAI approvals][openai-security] · [MCP][openai-mcp]

**Inference:** filesystem sandboxing does not gate effects inside daemon handlers; client filtering gates its tool route, not CLI/SDK RPC. The catalog directly registers `create_agent`, `update_agent` and `create_schedule`; provider sandbox settings are not inputs to their execution gate. [Catalog execution][catalog] · [Creation][native-create] · [Mode updates][native-update] · [Schedules][native-schedule]

## 4. Owner RPC and shared-user limits

**Read:** plugin RPC requires `daemon.manage`, checked before dispatch. The handler receives validated input plus `{ paseo }`, without originating principal, Session or user-gesture evidence. Plugin IPC attaches with owner admission and verifies reserved plugin connection identity. Password/local-credential admission also grants owner permissions. The permission map gates file writes, push/merge and agent creation separately from provider permissions. [Permissions][permissions] · [Gate][session] · [Dispatch][rpc-dispatch] · [Handler][handler] · [Plugin admission][socket] · [Identity][plugin-identity] · [Admission][admission]

**Read:** local credentials use mode 0600; Paseo describes provider options as CLI constraints, not a host boundary. **Inference:** file modes distinguish OS users, not processes sharing that user where reads remain permitted; CLI can have owner authority independently of MCP filtering. This establishes an authority prerequisite to verify, not an exploit or a promised malicious-process isolation failure. [Credential source][credential] · [Options][options]

## 5. Gaps and contract probes — not executed

1. **Composition:** capture sanitized launch configuration and effective tool catalog for both providers: empty map, custom `paseo`, internal-path collision, adjacent unrestricted Session, resume/reload. Verify global configuration unchanged; denied calls must fail before effects, including direct calls absent from discovery.
2. **Consult:** on disposable fixtures, try native edits, shell writes, daemon file writes, terminal/script execution, push/merge/release through every exposed route. Verify actual rejection and unchanged project/remote-effect counters; successful reading/advice remains required. Include approvals and mode-update paths.
3. **No children:** probe native provider delegation, Paseo creation/schedules, prompting another agent to act, and CLI/SDK routes. Claude delegation names need the actual binary catalog. Paseo accepts `multi_agent_v2`; current OpenAI docs name `multi_agent`. Establish target-version behavior rather than translating keys. [Codex schema][codex-options] · [OpenAI feature][openai-config]
4. **Authority/lifecycle:** with synthetic credentials, establish allowed CLI transports and owner RPC access; verify harness tokens bind Session/authority server-side, reject wrong/expired/revoked bindings, and recover correctly across reconnect/reload. Native MCP caller IDs supply no such proof. Repeat with fallback profiles and revocation.

**Gap:** no complete Claude/Codex Consult or no-child contract pass is established here. These are implementation/verification seams under accepted V1, not grounds to weaken it or declare it impossible.

## Sources

All Paseo links pin the target commit. Official provider documentation is current, unpinned evidence, not proof for an unspecified installed CLI version.

[manager]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/agent-manager.ts#L1277-L1314
[injection]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/runtime-mcp-config.ts#L6-L69
[claude]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/claude/agent.ts#L3499-L3588
[codex]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L5320-L5364
[bootstrap]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L1445-L1558
[auth]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/auth.ts#L128-L154
[cli]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/utils/client.ts#L172-L239
[caller]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/utils/caller-agent.ts#L7-L20
[run]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/cli/src/commands/agent/run.ts#L707-L720
[options]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/sdk/provider-options.md#L11-L52
[provider]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/protocol/src/provider-config.ts#L25-L65
[policy]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/paseo-tool-policy.ts#L7-L28
[catalog]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L674-L707
[hooks]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/public-docs/plugins/reference.md#L776-L836
[guards]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/lifecycle/index.ts#L133-L160
[claude-options]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/claude/options.ts#L45-L102
[claude-permissions]: https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated
[claude-sandbox]: https://code.claude.com/docs/en/sandboxing#what-runs-outside-the-sandbox
[codex-options]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/codex/options.ts#L37-L86
[openai-security]: https://learn.chatgpt.com/docs/agent-approvals-security
[openai-mcp]: https://learn.chatgpt.com/docs/extend/mcp?surface=cli
[permissions]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/authorization/operation-permissions.ts#L55-L136
[session]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/session.ts#L2140-L2169
[handler]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/plugins/plugin-process.ts#L495-L501
[socket]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/websocket-server.ts#L1016-L1030
[admission]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/session-admission-auth.ts#L11-L36
[credential]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/local-credential.ts#L10-L36
[openai-config]: https://learn.chatgpt.com/docs/config-file/config-reference
[prepare]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/agent-manager.ts#L5297-L5387
[validation]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/agent-manager.ts#L5254-L5277
[claude-mcp]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/claude/agent.ts#L1062-L1097
[codex-mcp]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L873-L904
[codex-resume]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L4064-L4084
[claude-modes]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/claude/agent.ts#L381-L409
[codex-modes]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L300-L320
[token]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/bootstrap.ts#L653-L660
[native-create]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L1530-L1591
[native-update]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L2258-L2291
[native-schedule]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/agent/tools/paseo-tools.ts#L2640-L2682
[rpc-dispatch]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/session.ts#L2483-L2493
[plugin-identity]: https://github.com/getpaseo/paseo/blob/cafe4b01c8522ff39560241c5deb01427dc8dc5b/packages/server/src/server/websocket-server.ts#L1599-L1607
