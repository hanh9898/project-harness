import assert from "node:assert/strict";
import { createPaseoClient } from "@getpaseo/client";
import { readFile, writeFile, mkdir, realpath, rm } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, randomUUID } from "node:crypto";
import { createServer } from "node:net";
import { execFileSync } from "node:child_process";
import { atomicJson, readJson, digest } from "../server/journal";
import {
  Owner,
  type Bootstrap,
  type State,
  type Binding,
} from "../server/owner";
import type { Role } from "../shared/contracts";
const root = resolve(dirname(fileURLToPath(import.meta.url)), ".."),
  dir = join(root, ".run"),
  pluginId = "project-harness-onboarding-mcp-spike";
const cli = (args: string[]) =>
  JSON.parse(
    execFileSync("paseo", [...args, "--host", "127.0.0.1:6767", "--json"], {
      encoding: "utf8",
      timeout: 35000,
    }),
  );
const daemon = () =>
  JSON.parse(
    execFileSync("paseo", ["daemon", "status", "--json"], {
      encoding: "utf8",
      timeout: 15000,
    }),
  );
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const checkTypes = () =>
  execFileSync(
    process.execPath,
    [join(root, "node_modules/typescript/bin/tsc"), "--noEmit"],
    { cwd: root, stdio: "pipe", timeout: 30000 },
  );
const boots = async () => {
  try {
    return (await readFile(join(dir, "boots.jsonl"), "utf8"))
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
};
async function prepare() {
  assert.ok(
    Number(process.versions.node.split(".")[0]) >= 22,
    "Node >=22 required",
  );
  assert.equal(
    await readJson(join(dir, "bootstrap.json")),
    null,
    "Previous run exists: inspect and cleanup, then explicitly move .run before another experiment",
  );
  assert.equal(
    await readJson(join(dir, "state.json")),
    null,
    "Old state exists: archive the cleaned .run directory before a new experiment",
  );
  const status = daemon();
  assert.equal(status.daemonVersion, "0.11.1");
  assert.equal(status.listen, "127.0.0.1:6767");
  assert.equal(status.hostname, "Mac-MN-14.local");
  const config = JSON.parse(
    await readFile(join(status.home, "config.json"), "utf8"),
  );
  assert.equal(
    config.pluginsEnabled,
    true,
    "Global plugins disabled. Do not enable on user host.",
  );
  const native = createPaseoClient({ url: "ws://127.0.0.1:6767/ws" });
  await native.connect();
  try {
    const { config: c } = await native.config.get();
    const p = c.agentProfiles?.find((p) => p.name === "test");
    assert.ok(p, "Create/select native profile in Paseo UI first");
    assert.equal(p.provider, "codex");
    const port = await new Promise<number>((resolve, reject) => {
      const s = createServer();
      s.on("error", reject);
      s.listen(0, "127.0.0.1", () => {
        const a = s.address();
        assert.ok(a && typeof a !== "string");
        s.close(() => resolve(a.port));
      });
    });
    const projectRoot = await realpath(join(root, "../.."));
    await mkdir(join(dir, "workspace"), { recursive: true });
    const boot: Bootstrap = {
      runId: "onboarding-" + randomUUID(),
      host: status.hostname,
      daemonUrl: "ws://127.0.0.1:6767/ws",
      port,
      profileId: p.id,
      cwd: await realpath(join(dir, "workspace")),
      projectRoot,
      skill: await realpath(
        "/Users/hanhnt2/.codex/plugins/cache/mattpocock/mattpocock-skills/1.3.1/skills/engineering/codebase-design/SKILL.md",
      ),
      principles: await realpath(
        join(projectRoot, "docs/design/paseo-boundary.md"),
      ),
      goal: "Validate the bounded Onboarding MCP to Harness Engineering handover for Project Harness; do not build production workflows.",
      tokens: {
        driver: randomBytes(32).toString("hex"),
        onboarding: randomBytes(32).toString("hex"),
        engineering: randomBytes(32).toString("hex"),
      },
    };
    await atomicJson(join(dir, "bootstrap.json"), boot);
    await writeFile(
      join(root, "server/location.ts"),
      `// Rewritten by prepare:live; path only, no credentials.\nexport const stateDir = ${JSON.stringify(dir)};\n`,
    );
    checkTypes();
    const versions = {
      at: new Date().toISOString(),
      node: process.version,
      cli: execFileSync("paseo", ["--version"], { encoding: "utf8" }).trim(),
      daemon: status.daemonVersion,
      host: status.hostname,
      listen: status.listen,
      workerPid: status.workerPid,
      sdk: "0.11.1",
      pluginSdk: "0.11.1",
      mcpSdk: "1.32.1",
      profile: {
        id: p.id,
        name: p.name,
        provider: p.provider,
        model: p.model,
        modeId: p.modeId,
        thinkingOptionId: p.thinkingOptionId,
      },
      plugins: cli(["plugin", "ls"]).map(
        (p: { id: string; status: string }) => ({ id: p.id, status: p.status }),
      ),
      sourceHashes: {
        skill: digest(await readFile(boot.skill, "utf8")),
        principles: digest(await readFile(boot.principles, "utf8")),
      },
    };
    await atomicJson(join(root, "evidence/discovery.json"), versions);
    console.log(JSON.stringify(versions, null, 2));
  } finally {
    await native.close();
  }
}
const boot = async () => {
  const b = await readJson<Bootstrap>(join(dir, "bootstrap.json"));
  assert.ok(b, "Run prepare:live first");
  return b;
};
async function call(b: Bootstrap, command: string, role?: Role) {
  const r = await fetch(`http://127.0.0.1:${b.port}/driver`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${b.tokens.driver}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command, ...(role ? { role } : {}) }),
    signal: AbortSignal.timeout(45000),
  });
  const value = await r.json();
  assert.equal(r.status, 200, JSON.stringify(value));
  return value;
}
async function waitReady(b: Bootstrap) {
  for (let i = 0; i < 50; i++) {
    try {
      await call(b, "inspect");
      return;
    } catch {
      await delay(200);
    }
  }
  throw Error("PLUGIN_ENDPOINT_NOT_READY");
}
async function cleanup() {
  const b = await boot(),
    api = createPaseoClient({ url: b.daemonUrl });
  await api.connect();
  try {
    const s = await readJson<State>(join(dir, "state.json"));
    const workspaces = new Set<string>(),
      archivedAgentIds: string[] = [];
    for (const [role, binding] of Object.entries(s?.roles ?? {})) {
      // Reconcile by labels if creation response was lost, never touch another run.
      const list = await api.agents.list({
        filter: { labels: { onboarding_run: b.runId, onboarding_role: role } },
      });
      assert.equal(list.pageInfo.hasMore, false);
      for (const { agent } of list.entries) {
        if (binding.agentId) assert.equal(agent.id, binding.agentId);
        await api.agents.ref(agent.id).archive();
        archivedAgentIds.push(agent.id);
        if (agent.workspaceId) workspaces.add(agent.workspaceId);
      }
    }
    for (const id of workspaces) {
      const list = await api.agents.list();
      assert.equal(list.pageInfo.hasMore, false);
      assert.ok(
        list.entries
          .filter(({ agent }) => agent.workspaceId === id)
          .every(({ agent }) => agent.archivedAt),
        "Refuse archive workspace with other active agents",
      );
      await api.workspaces.ref(id).archive();
    }
    const catalog = cli(["plugin", "ls"]);
    if (catalog.some((p: { id: string }) => p.id === pluginId))
      cli(["plugin", "remove", pluginId]);
    const after = daemon(),
      before = await readJson<{ workerPid: number }>(
        join(root, "evidence/discovery.json"),
      );
    assert.equal(
      after.workerPid,
      before?.workerPid,
      "Primary daemon worker must remain unchanged",
    );
    const p = await new Owner(dir, b, api).profile(),
      discovery = await readJson<{ profile: unknown }>(
        join(root, "evidence/discovery.json"),
      );
    assert.deepEqual(JSON.parse(JSON.stringify(p)), discovery?.profile);
    const summary = {
      at: new Date().toISOString(),
      pluginRemoved: !cli(["plugin", "ls"]).some(
        (p: { id: string }) => p.id === pluginId,
      ),
      archivedAgentIds,
      archivedWorkspaceIds: [...workspaces],
      workerPidUnchanged: after.workerPid,
      profileUnchanged: true,
      hbu: cli(["plugin", "ls"]).find(
        (p: { id: string }) => p.id === "hbu-agent-config",
      )?.status,
      tokensDeleted: true,
    };
    // Remove private bootstrap credentials after plugin has stopped. Source and redacted state stay.
    await rm(join(dir, "bootstrap.json"));
    await atomicJson(join(root, "evidence/cleanup.json"), summary);
    console.log("Cleanup", JSON.stringify(summary));
  } finally {
    await api.close();
  }
}
async function run() {
  const b = await boot(),
    api = createPaseoClient({ url: b.daemonUrl });
  await api.connect();
  const evidence: Record<string, unknown> = {
    at: new Date().toISOString(),
    runId: b.runId,
    cases: [],
  };
  const cases = evidence.cases as unknown[];
  const pass = (name: string, data: unknown = {}) => {
    cases.push({ name, outcome: "passed", data });
    console.log("PASS", name);
  };
  const saveEvidence = () =>
    atomicJson(join(root, "evidence/live.json"), evidence);
  async function waitTurn(id: string) {
    const a = api.agents.ref(id),
      deadline = Date.now() + 180000;
    while (Date.now() < deadline) {
      const r = await a.waitForFinish(15000);
      if (r.status === "timeout") {
        console.log("Waiting for bounded native turn", id);
        continue;
      }
      assert.equal(r.status, "idle", r.error ?? r.status);
      assert.ok(r.lastMessage, "No final response");
      return { status: r.status, finalDigest: digest(r.lastMessage) };
    }
    await a.archive();
    throw Error("BOUNDED_TURN_TIMEOUT_OWNED_SESSION_ARCHIVED");
  }
  try {
    checkTypes();
    const existing = cli(["plugin", "ls"]).find(
      (p: { id: string }) => p.id === pluginId,
    );
    assert.ok(
      !existing,
      "Plugin already installed; reconcile manually instead of duplicating run",
    );
    cli(["plugin", "install", root, "--id", pluginId]);
    await waitReady(b);
    assert.equal(
      cli(["plugin", "ls"]).find((p: { id: string }) => p.id === pluginId)
        ?.status,
      "running",
    );
    pass("plugin-installed-running");
    const owner = new Owner(dir, b, api);
    const missing = await owner.check("onboarding");
    assert.ok(missing.blockers.includes("MANDATORY_CONFIG_MISSING"));
    await assert.rejects(call(b, "spawn", "engineering"));
    pass("real-owner-blocks-missing-config");
    const onboarding = (await call(b, "spawn", "onboarding")) as Binding;
    assert.ok(onboarding.agentId);
    const repeated = (await call(b, "spawn", "onboarding")) as Binding;
    assert.equal(repeated.agentId, onboarding.agentId);
    pass("repeat-onboarding-spawn-same-native-session", {
      agentId: onboarding.agentId,
      workspaceId: onboarding.workspaceId,
    });
    await call(b, "dispatch", "onboarding");
    evidence.onboardingTurn = await waitTurn(onboarding.agentId);
    const before = await owner.read();
    assert.ok(before.handover, "Real agent did not save handover");
    assert.equal(before.revision, 1);
    assert.ok(before.audit.some((a) => a.action === "complete"));
    assert.equal(
      before.roles.engineering,
      undefined,
      "Completion cannot automatically spawn next role",
    );
    pass("real-onboarding-agent-persisted-config-check-and-handover", {
      revision: before.revision,
      handoverDigest: digest(JSON.stringify(before.handover)),
    });
    // Exercise stale revision on the real owner without changing user/native resources or persisted config.
    await assert.rejects(
      owner.complete("onboarding", {
        requestId: "stale-driver-check",
        expectedRevision: 0,
        reportId: before.report!.id,
      }),
      /STALE_REPORT/,
    );
    pass("real-owner-rejects-stale-revision");
    const firstBoots = await boots();
    checkTypes();
    cli(["plugin", "reload", pluginId]);
    await waitReady(b);
    await call(b, "reconcile");
    const after = (await call(b, "inspect")) as State,
      newBoots = await boots();
    assert.notEqual(firstBoots.at(-1).pid, newBoots.at(-1).pid);
    assert.deepEqual(after.handover, before.handover);
    assert.equal(after.roles.onboarding?.agentId, onboarding.agentId);
    assert.equal(
      ((await call(b, "spawn", "onboarding")) as Binding).agentId,
      onboarding.agentId,
    );
    pass("plugin-reload-reconciles-same-session-and-pinned-state", {
      oldPid: firstBoots.at(-1).pid,
      newPid: newBoots.at(-1).pid,
      bootRoles: newBoots.at(-1).roles,
    });
    const sameAgent = api.agents.ref(onboarding.agentId);
    await sameAgent.send(
      "After the disposable plugin reload, call onboarding_inspect and handover_read through the same injected MCP, report current revision and handover digest. Do not configure or spawn. Finish this bounded reconnect check.",
    );
    evidence.reconnectTurn = await waitTurn(onboarding.agentId);
    pass("same-native-onboarding-session-mcp-works-after-reload");
    // Explicit deterministic driver command simulates the user's button; agent completion never invokes Spawn.
    const engineering = (await call(b, "spawn", "engineering")) as Binding;
    assert.ok(engineering.agentId);
    assert.equal(
      ((await call(b, "spawn", "engineering")) as Binding).agentId,
      engineering.agentId,
    );
    await call(b, "dispatch", "engineering");
    evidence.engineeringTurn = await waitTurn(engineering.agentId);
    const end = await owner.read();
    assert.ok(end.audit.some((a) => a.action === "acknowledge-exact-handover"));
    assert.deepEqual(end.handover, before.handover);
    pass(
      "user-command-spawns-real-engineering-session-and-exact-handover-ack",
      {
        agentId: engineering.agentId,
        handoverDigest: engineering.handoverDigest,
      },
    );
    const native = await api.agents.list({
      filter: { labels: { onboarding_run: b.runId } },
    });
    assert.equal(native.pageInfo.hasMore, false);
    assert.equal(native.entries.length, 2);
    pass("exactly-two-native-role-sessions-after-repeated-spawn");
    evidence.handover = end.handover;
    evidence.audit = end.audit;
    evidence.boots = newBoots;
    evidence.sessions = [];
    for (const [role, binding] of Object.entries(end.roles)) {
      const a = api.agents.ref(binding.agentId!);
      await a.refresh();
      const timeline = await a.timeline.refetch({ limit: 200 });
      const safe = JSON.stringify(timeline);
      const names = [
        ...new Set(
          safe.match(
            /(?:mcp__onboarding__|onboarding\.)(?:onboarding_inspect|guidance_read|onboarding_configure|onboarding_check|onboarding_complete|handover_read|handover_acknowledge)/g,
          ) ?? [],
        ),
      ];
      (evidence.sessions as unknown[]).push({
        role,
        agentId: binding.agentId,
        workspaceId: binding.workspaceId,
        capabilities: {
          supportsMcpServers: a.capabilities?.supportsMcpServers,
        },
        runtimeInfo: a.runtimeInfo
          ? {
              provider: a.runtimeInfo.provider,
              sessionId: a.runtimeInfo.sessionId,
              model: a.runtimeInfo.model,
              thinkingOptionId: a.runtimeInfo.thinkingOptionId,
              modeId: a.runtimeInfo.modeId,
            }
          : null,
        observedToolNames: names,
        assignedSkillPathObserved: safe.includes(b.skill),
        assignedPrinciplesPathObserved: safe.includes(b.principles),
        timelineDigest: digest(safe),
      });
    }
    evidence.untested = [
      "Actual transport response loss between native create commit and SDK receipt",
      "Daemon restart",
      "Profile/provider CRUD",
      "Native stale-role fencing and Replace Session",
      "UI button/rendering",
      "Project Orchestrator build/operation",
    ];
  } catch (error) {
    evidence.error = String(error);
    throw error;
  } finally {
    await saveEvidence();
    await api.close();
  }
}
async function capture() {
  const b = await boot(),
    s = await readJson<State>(join(dir, "state.json"));
  assert.ok(s);
  const evidence = await readJson<Record<string, unknown>>(
    join(root, "evidence/live.json"),
  );
  assert.ok(evidence);
  const api = createPaseoClient({ url: b.daemonUrl });
  await api.connect();
  try {
    const sessions = [];
    for (const [role, binding] of Object.entries(s.roles)) {
      const agent = api.agents.ref(binding.agentId!);
      await agent.refresh();
      const timeline = await agent.timeline.refetch({ limit: 200 });
      assert.equal(
        timeline.hasOlder,
        false,
        "Need pagination before complete evidence",
      );
      const calls = timeline.entries.flatMap((e) =>
        e.item.type === "tool_call" ? [e.item] : [],
      );
      const mcpCalls = calls
        .filter((t) => t.name.startsWith("onboarding."))
        .map((t) => ({
          name: t.name,
          status: t.status,
          callId: t.callId,
          inputOutputDigest: digest(JSON.stringify(t.detail)),
        }));
      const reads = calls
        .flatMap((t) =>
          t.detail.type === "shell"
            ? [
                {
                  command: t.detail.command,
                  exitCode: t.detail.exitCode,
                  status: t.status,
                },
              ]
            : [],
        )
        .filter(
          (t) =>
            t.command.includes(b.skill) || t.command.includes(b.principles),
        );
      assert.ok(mcpCalls.length > 0);
      assert.ok(
        mcpCalls.every((t) => t.status === "completed"),
        "MCP call failure in native trace",
      );
      const runtime = agent.runtimeInfo;
      sessions.push({
        role,
        agentId: binding.agentId,
        workspaceId: binding.workspaceId,
        runtime: runtime
          ? {
              provider: runtime.provider,
              sessionId: runtime.sessionId,
              model: runtime.model,
              thinkingOptionId: runtime.thinkingOptionId,
              modeId: runtime.modeId,
            }
          : null,
        mcpCalls,
        assignedSourceReadCalls: reads,
        timelineDigest: digest(JSON.stringify(timeline)),
        hasOlder: timeline.hasOlder,
        hasNewer: timeline.hasNewer,
      });
    }
    evidence.sessions = sessions;
    evidence.audit = s.audit;
    evidence.handover = s.handover;
    evidence.boots = await boots();
    await atomicJson(join(root, "evidence/live.json"), evidence);
    console.log(
      "Captured sanitized native tool-call evidence for",
      sessions.length,
      "sessions",
    );
  } finally {
    await api.close();
  }
}
const command = process.argv[2];
if (command === "prepare") await prepare();
else if (command === "run") {
  await run();
  await capture();
} else if (command === "cleanup") await cleanup();
else if (command === "capture") await capture();
else throw Error("Use prepare | run | cleanup");
