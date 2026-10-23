# Paseo beta.1 Consult/no-child feasibility — r9

2026-10-23. Paseo pin: `3fa625701eae6b3a07ccae18299200b1a7cf2776`. Read all four requested notes. **Finding:** Claude has a concrete supported-config candidate; Codex has partial candidates and an exact missing subagent control. Neither has a complete enforcement pass. This establishes neither impossibility nor a new architecture decision.

These are proposed per-Session overlays on compatible existing native profile references. Work still checks authority at admission and actions. No profile changes, probes, agents, installations, private-material access or implementation occurred; only this note was written.

## 1. Shared MCP premise

For either candidate, supply the actual proposed plugin’s scoped HTTP MCP as `mcpServers.paseo`, with pathname other than `/mcp/agents`. This suppresses native injection in the pinned code. Its server-side grants must exclude project writes, push/merge/release and child/indirect delegation, while permitting necessary reports and scratch artifacts. The endpoint/grant enforcement remains a design/proof prerequisite. Empty `toolPolicy` is no substitute. Per-agent options recursively override defaults; omitted nested keys survive. [P1–P3]

## 2. Claude: supported candidate, inherited execution still open

Candidate `config.options`:

```json
{
  "extraArgs": {
    "tools": "Read,Glob,Grep",
    "strict-mcp-config": null
  },
  "disallowedTools": ["Bash", "Agent", "Task", "Edit", "Write", "NotebookEdit"]
}
```

**Read:** Paseo accepts these keys and spreads them into SDK launch. Its pinned dependency is Agent SDK 0.3.246. That artifact documents arbitrary CLI `extraArgs`, serializes them into flags, identifies `--tools` as the built-in tool selection mechanism, and maps strict MCP selection to `--strict-mcp-config`. Direct `tools`/`strictMcpConfig` options are rejected by Paseo’s strict schema; this candidate deliberately uses its supported argument channel. [C1–C4]

**Proposed control:** built-in shell/code execution, native file mutation, web access and direct provider delegation are absent from the selected built-ins; explicit denials reinforce named routes. Thus shell-based CLI/SDK/daemon access is withheld at that tool entrypoint. MCP remains separately controlled. Scratch output through a scoped artifact operation is compatible with Consult; forbidding every possible scratch write is not the accepted requirement.

**Unestablished:** actual binary tool names/aliases, direct invocation rejection, inherited flags, MCP composition and lifecycle behavior. Paseo explicitly loads user/project/local settings and default agent definitions. Ordinary Sessions retain inherited hooks; its automatic `disableAllHooks` overlay applies only to internal agents. The schema exposes neither `settingSources` nor `settings.disableAllHooks`. CLI arguments might provide additional supported control, but `extraArgs.settings` can be overwritten by SDK settings, and repeating `setting-sources` needs binary precedence proof. No settings/Skill-isolation choice is made here. [C1, C3–C5]

The candidate therefore controls the selected model-tool route, not yet inherited hook/plugin execution, environment-mediated access, or native commands/mode changes. These routes require closure before admission.

## 3. Codex: partial candidates and an exact schema gap

Candidate `config.options`:

```json
{
  "sandbox_mode": "read-only",
  "approval_policy": "never",
  "web_search": "disabled",
  "features": {"multi_agent_v2": false, "network_proxy": false}
}
```

**Read:** these keys pass Paseo’s strict schema and enter app-server thread configuration; explicit sandbox/approval options override mode presets. This establishes mapping, not effective binary enforcement. [D1–D2]

Pinned upstream comparator: Codex **0.143.0**, commit `c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda`; Paseo’s schema says “0.143+”, which does not pin the installed executable. Upstream read-only policy disables outbound network and grants broad disk reads. Its macOS policy denies by default, with separate proxy/Unix-socket exceptions. Therefore shell TCP/loopback, Unix sockets, inherited proxies and daemon transports need fixture verification; reading same-user credentials is not prevented by this filesystem mode. [D1, U1–U2]

**Scratch-capable variant:** `workspace-write` with Session `cwd=S` outside project `P`, `writable_roots:[]`, `network_access:false`, and both temporary-root exclusions true is a candidate for scratch writes plus absolute-path project reads. With `cwd=P`, adding only `S` to writable roots still permits project writes: upstream always adds cwd. This is a bounded configuration alternative to test, not selected Session placement. [U1]

**Exact no-child gap:** upstream distinguishes `multi_agent_v2` from `multi_agent`/Collab, enabled by default. Disabling V2 falls back to V1 when Collab remains enabled; V1 registers spawn/send/resume tools. Model metadata or stored runtime selection also participates. Paseo accepts V2’s flag but rejects `features.multi_agent`, and supplies no native-tool denylist. The shown candidate consequently does **not** establish no-children on this comparator. [D1, U3–U5]

**Inherited routes:** Paseo’s MCP mapper cannot carry arbitrary per-server disable controls; tool policy limits only referenced servers. Upstream configuration tables merge recursively, so a supplied MCP map does not prove inherited servers disappear. The accepted options also lack hook disabling, read-denial and shell-environment policy. Upstream’s hook runner directly launches commands separately from sandboxed model commands. MCP effects and inherited hooks therefore remain separate closure obligations. [D1–D3, U6–U7]

## 4. Smallest discriminating probes — proposed only

1. **Mock launcher/app-server, synthetic profile/settings:** validate each candidate; confirm rejected control keys; capture final sanitized argv/SDK/RPC configuration through start/resume. Seed one conflicting inherited flag, one extra MCP and one harmless hook. Check settings precedence, strict-MCP behavior and profile immutability. This proves transformation/composition only.
2. **Exact provider binary, disposable fixtures:** attempt native project edit, shell write, scratch write, direct provider spawn/send, hidden MCP invocation and mode-change bypass. Use mock TCP/Unix daemon endpoints and synthetic credentials; counters represent create/send/schedule, project-write and push/merge/release effects. Exercise hooks, inherited MCP, proxy variables, CLI/SDK routes, alternate tool workdirs and symlink paths. Require rejection before prohibited effects, successful reading/reporting and permitted scratch output.
3. **Lifecycle pair:** restricted/unrestricted fixture Sessions, resume/reload/fallback and revocation. Check restrictions survive and do not alter the neighboring profile. A mock cannot prove OS sandbox or real binary tool enforcement; a negative discovery result cannot prove direct-call denial.

## 5. Material user decision now?

**No.** The Codex schema/version mismatch and Claude inheritance closure are factual/proof prerequisites. No complete supported recipe has passed, and no evidence exhausts compatible native paths or demonstrates a necessary new deployment obligation. Preserve Consult/no-child semantics; block unsupported admissions. Resolve the exact executable/runtime and discriminating fixtures before presenting any concrete tradeoff. No preference question is justified.

## Sources

All implementation/declaration evidence below is publicly version-pinned. These public version pins do not identify the installed provider executables.

Workspace context: [Session authority](technical-session-authority.md), [delegation](agent-delegation.md), [r8](paseo-013-beta1-dispatch-authority-delta-r8.md), [r6](paseo-012-role-tools-facts-r6.md).

**Paseo 0.13.0-beta.1**, pin `3fa625701eae6b3a07ccae18299200b1a7cf2776`:

- **P1:** [Runtime MCP composition, lines 6–69](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/runtime-mcp-config.ts#L6-L69).
- **P2:** [Per-agent options and recursive inheritance, lines 17–26](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/public-docs/sdk/provider-options.md#L17-L26).
- **P3:** [Claude preapproval mapping, lines 93–103](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/options.ts#L93-L103); [Codex policy, lines 64–86](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex/options.ts#L64-L86).
- **C1:** [Strict Claude schema, lines 45–89](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/options.ts#L45-L89).
- **C2:** [Pinned SDK dependency, lines 106–109](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/package.json#L106-L109).
- **C3:** [SDK launch/overlays, lines 3529–3609](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/agent.ts#L3529-L3609).
- **C4:** [Official SDK 0.3.246 archive](https://registry.npmjs.org/@anthropic-ai/claude-agent-sdk/-/claude-agent-sdk-0.3.246.tgz), `package/sdk.d.ts:1403–1418` (Agent invocation), `1441–1446` (disallowedTools), `1473–1485` (built-in tools), `1514–1519` (extraArgs), `2028–2038` (setting sources), `2080–2087` (strict MCP); `package/sdk.mjs:99`, `initialize()`: built-in `--tools` / `--setting-sources` / `--strict-mcp-config` serialization, then `Je={...i??{}};if(this.options.settings)Je.settings=this.options.settings`, then extra-argument serialization. [Version metadata/integrity](https://registry.npmjs.org/@anthropic-ai/claude-agent-sdk/0.3.246): shasum `0009206e79ee0ae25f68ebb526584031cb5db048`.
- **C5:** [Loaded settings sources, lines 153–157](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/claude/agent.ts#L153-L157).
- **D1:** [Strict Codex schema, lines 4–60](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex/options.ts#L4-L60).
- **D2:** [Thread-start/config mapping, lines 5320–5364](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L5320-L5364); [resume, lines 4064–4085](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L4064-L4085).
- **D3:** [MCP conversion, lines 873–904](https://github.com/getpaseo/paseo/blob/3fa625701eae6b3a07ccae18299200b1a7cf2776/packages/server/src/server/agent/providers/codex-app-server-agent.ts#L873-L904).

**Official Codex 0.143.0 source**, pin `c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda`: [release tag object resolving to that commit](https://api.github.com/repos/openai/codex/git/tags/b213653e584580ccbb6dbd17ca1a6561e4bf065a).

- **U1:** [Sandbox policies, lines 988–1037](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/protocol/src/protocol.rs#L988-L1037); [read/network behavior and writable cwd, lines 1120–1185](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/protocol/src/protocol.rs#L1120-L1185).
- **U2:** [macOS base, lines 7–12](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/sandboxing/src/seatbelt_base_policy.sbpl#L7-L12); [socket policy inputs, lines 106–168](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/sandboxing/src/seatbelt.rs#L106-L168); [network exceptions, lines 274–335](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/sandboxing/src/seatbelt.rs#L274-L335).
- **U3:** [Distinct feature flags/defaults, lines 1033–1044](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/features/src/lib.rs#L1033-L1044); [V2→V1 fallback, lines 1406–1415](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/core/src/config/mod.rs#L1406-L1415).
- **U4:** [Collaboration gating, lines 346–368](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/core/src/tools/spec_plan.rs#L346-L368); [V1/V2 tool registration, lines 792–873](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/core/src/tools/spec_plan.rs#L792-L873).
- **U5:** [Stored/model runtime selection, lines 3081–3095](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/core/src/session/mod.rs#L3081-L3095).
- **U6:** [Loaded config layers, lines 94–105](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/config/src/loader/mod.rs#L94-L105); [recursive table merge, lines 6–34](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/config/src/merge.rs#L6-L34); [app-server config loading, lines 1076–1081](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/app-server/src/request_processors/thread_processor.rs#L1076-L1081).
- **U7:** [Hook execution, lines 24–42](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/hooks/src/engine/command_runner.rs#L24-L42); [shell/environment construction, lines 103–134](https://github.com/openai/codex/blob/c4d748f586a84a3ed5b6aceb82e9a1db4abb1cda/codex-rs/hooks/src/engine/command_runner.rs#L103-L134).

