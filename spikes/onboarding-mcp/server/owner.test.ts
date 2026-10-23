import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { PaseoApi } from "@getpaseo/client";
import { Owner, type Bootstrap, type State } from "./owner";
import { atomicJson, digest } from "./journal";
async function fixture(
  fn: (
    o: Owner,
    env: {
      profile: Record<string, unknown>;
      counter: { creates: number; workspaceCreates: number };
      native: { id: string; workspaceId: string }[];
    },
  ) => Promise<void>,
) {
  const dir = await realpath(await mkdtemp(join(tmpdir(), "onboarding-unit-")));
  const profile = {
    id: "native-test",
    name: "test",
    provider: "codex",
    model: "model",
    modeId: "full-access",
    thinkingOptionId: "low",
  };
  const native: { id: string; workspaceId: string }[] = [],
    counter = { creates: 0, workspaceCreates: 0 };
  const create = async () => {
    counter.creates++;
    const a = { id: "a", workspaceId: "w" };
    native.push(a);
    return a;
  };
  const api = {
    config: { get: async () => ({ config: { agentProfiles: [profile] } }) },
    workspaces: {
      ref: () => ({
        refresh: async () => ({ id: "w" }),
        projectId: "p",
        agents: {
          create: async () => {
            counter.workspaceCreates++;
            return create();
          },
        },
      }),
    },
    agents: {
      list: async () => ({
        entries: native.map((agent) => ({ agent })),
        pageInfo: { hasMore: false },
      }),
      ref: () => ({
        refresh: async () => ({ id: "a" }),
        archivedAt: null,
        workspaceId: "w",
        send: async () => {},
      }),
      create,
    },
  } as unknown as PaseoApi;
  const boot: Bootstrap = {
    runId: "unit-run",
    host: "unit-host",
    daemonUrl: "ws://unused",
    port: 12345,
    profileId: "native-test",
    cwd: dir,
    projectRoot: dir,
    skill: join(dir, "SKILL.md"),
    principles: join(dir, "principles.md"),
    goal: "Build a bounded harness smoke fixture",
    tokens: { driver: "unit", onboarding: "unit-o", engineering: "unit-e" },
  };
  await writeFile(boot.skill, "assigned skill source");
  await writeFile(boot.principles, "authorized principles source");
  const o = new Owner(dir, boot, api);
  try {
    await fn(o, { profile, counter, native });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
const save = async (o: Owner, revision = 0, requestId = "config") =>
  o.configure("onboarding", {
    requestId,
    expectedRevision: revision,
    config: o.proposed(),
  });
async function ready(o: Owner) {
  await o.spawn("onboarding");
  await save(o);
  const report = await o.check("onboarding");
  await o.complete("onboarding", {
    requestId: "complete",
    expectedRevision: 1,
    reportId: report.id,
  });
  return report;
}
test("mandatory missing config blocks completion and Spawn; optional integrations do not block valid config", () =>
  fixture(async (o) => {
    const r = await o.check("onboarding");
    assert.ok(r.blockers.includes("MANDATORY_CONFIG_MISSING"));
    await assert.rejects(
      o.complete("onboarding", {
        requestId: "x",
        expectedRevision: 0,
        reportId: r.id,
      }),
      /MANDATORY_DEPENDENCY_BLOCKED/,
    );
    await assert.rejects(o.spawn("engineering"), /HANDOVER_MISSING/);
    await ready(o);
    assert.equal((await o.check("onboarding")).blockers.length, 0);
  }));
test("configure receipt survives re-instantiation, replays once, rejects changed payload and revision", () =>
  fixture(async (o) => {
    const a = await save(o);
    const resumed = new Owner(o.dir, o.boot, o.api);
    assert.deepEqual(await save(resumed), a);
    assert.equal((await resumed.read()).revision, 1);
    await assert.rejects(
      resumed.configure("onboarding", {
        requestId: "config",
        expectedRevision: 0,
        config: { ...o.proposed(), goal: "Different authorized smoke goal" },
      }),
      /PAYLOAD_CONFLICT/,
    );
    await assert.rejects(save(o, 0, "another"), /REVISION_CONFLICT/);
  }));
test("stale revision report cannot complete or unlock Spawn", () =>
  fixture(async (o) => {
    await ready(o);
    const old = (await o.read()).report!;
    await save(o, 1, "config-v2");
    await assert.rejects(
      o.complete("onboarding", {
        requestId: "new-complete",
        expectedRevision: 2,
        reportId: old.id,
      }),
      /STALE_REPORT/,
    );
    await assert.rejects(o.spawn("engineering"), /HANDOVER_MISSING/);
  }));
test("source drift after readiness invalidates report and launch", () =>
  fixture(async (o) => {
    const r = await ready(o);
    await writeFile(o.boot.skill, "changed source");
    await assert.rejects(
      o.complete("onboarding", {
        requestId: "again",
        expectedRevision: 1,
        reportId: r.id,
      }),
      /STALE_DEPENDENCY/,
    );
    await assert.rejects(o.spawn("engineering"), /DEPENDENCY_CHANGED/);
  }));
test("missing native profile blocks readiness and launch", () =>
  fixture(async (o, { profile }) => {
    await ready(o);
    profile.id = "removed";
    assert.ok(
      (await o.check("onboarding")).blockers.includes("NATIVE_PROFILE_MISSING"),
    );
    await assert.rejects(o.spawn("engineering"), /DEPENDENCY_CHANGED/);
  }));
test("repeated role Spawn and reload returns same native session without create", () =>
  fixture(async (o, { counter }) => {
    const a = await o.spawn("onboarding");
    const resumed = new Owner(o.dir, o.boot, o.api);
    assert.equal((await resumed.spawn("onboarding")).agentId, a.agentId);
    assert.equal(counter.creates, 1);
  }));
test("ambiguous intent reconciles existing labeled native session before any create", () =>
  fixture(async (o, { counter, native }) => {
    const s: State = await o.read();
    s.roles.onboarding = { identity: "unit-run:onboarding", status: "intent" };
    await atomicJson(o.path, s);
    native.push({ id: "recovered", workspaceId: "w" });
    assert.equal((await o.spawn("onboarding")).agentId, "recovered");
    assert.equal((await o.read()).context?.workspaceId, "w");
    assert.equal(counter.creates, 0);
  }));
test("unresolved empty native outcome fails closed without retry", () =>
  fixture(async (o, { counter }) => {
    const s = await o.read();
    s.roles.onboarding = { identity: "unit-run:onboarding", status: "intent" };
    await atomicJson(o.path, s);
    await assert.rejects(o.spawn("onboarding"), /OUTCOME_UNRESOLVED/);
    assert.equal(counter.creates, 0);
  }));
test("engineering role cannot configure; acknowledgement requires exact pinned content", () =>
  fixture(async (o) => {
    await ready(o);
    await assert.rejects(o.configure("engineering", {}), /ROLE_DENIED/);
    const h = (await o.read()).handover!;
    await assert.rejects(
      o.acknowledge("engineering", {
        revision: 1,
        handoverDigest: digest(JSON.stringify(h)),
        config: { ...h.config, goal: "A different misleading goal" },
      }),
      /HANDOVER_MISMATCH/,
    );
    assert.deepEqual(
      await o.acknowledge("engineering", {
        revision: 1,
        handoverDigest: digest(JSON.stringify(h)),
        config: h.config,
      }),
      {
        accepted: true,
        revision: 1,
        handoverDigest: digest(JSON.stringify(h)),
      },
    );
  }));
test("strict config rejects authority escalation and arbitrary patch fields", () =>
  fixture(async (o) => {
    await assert.rejects(
      o.configure("onboarding", {
        requestId: "bad",
        expectedRevision: 0,
        config: {
          ...o.proposed(),
          limits: { ...o.proposed().limits, authority: "full-access" },
          path: "/tmp",
        },
      }),
    );
    assert.equal((await o.read()).revision, 0);
  }));

test("actual HTTP MCP protocol shares durable owner with driver, authenticates scope and hides configure from engineering", () =>
  fixture(async (o) => {
    const { createServer } = await import("node:net");
    const { listen } = await import("./http");
    const { Client } = await import(
      "@modelcontextprotocol/sdk/client/index.js"
    );
    const { StreamableHTTPClientTransport } = await import(
      "@modelcontextprotocol/sdk/client/streamableHttp.js"
    );
    o.boot.port = await new Promise<number>((resolve) => {
      const s = createServer();
      s.listen(0, "127.0.0.1", () => {
        const a = s.address();
        assert.ok(a && typeof a !== "string");
        s.close(() => resolve(a.port));
      });
    });
    const base = `http://127.0.0.1:${o.boot.port}`,
      stop = await listen(o);
    const clients: InstanceType<typeof Client>[] = [];
    try {
      assert.equal(
        (await fetch(base + "/driver", { method: "POST", body: "{}" })).status,
        401,
      );
      assert.equal(
        (await fetch(base + "/mcp/onboarding", { method: "POST", body: "{}" }))
          .status,
        401,
      );
      assert.equal(
        (
          await fetch(base + "/driver", {
            method: "POST",
            headers: { Authorization: "Bearer " + o.boot.tokens.onboarding },
            body: "{}",
          })
        ).status,
        401,
      );
      for (const role of ["onboarding", "engineering"] as const) {
        const c = new Client({ name: "local-protocol-test", version: "1" });
        clients.push(c);
        await c.connect(
          new StreamableHTTPClientTransport(new URL(base + "/mcp/" + role), {
            requestInit: {
              headers: { Authorization: "Bearer " + o.boot.tokens[role] },
            },
          }),
        );
        const tools = await c.listTools();
        assert.equal(
          tools.tools.some((t) => t.name === "onboarding_configure"),
          role === "onboarding",
        );
        if (role === "onboarding") {
          const r = await c.callTool({
            name: "onboarding_configure",
            arguments: {
              requestId: "protocol-save",
              expectedRevision: 0,
              config: o.proposed(),
            },
          });
          assert.equal(r.isError, undefined);
          assert.equal(
            (await new Owner(o.dir, o.boot, o.api).read()).revision,
            1,
          );
          const driver = await fetch(base + "/driver", {
            method: "POST",
            headers: { Authorization: "Bearer " + o.boot.tokens.driver },
            body: JSON.stringify({ command: "inspect" }),
          });
          assert.equal(((await driver.json()) as State).revision, 1);
        }
      }
    } finally {
      for (const c of clients) await c.close();
      await stop();
    }
  }));

test("engineering Spawn uses the pinned workspace agent API and repeats without another create", () =>
  fixture(async (o, { counter }) => {
    await ready(o);
    const e = await o.spawn("engineering");
    assert.equal(e.workspaceId, (await o.read()).context?.workspaceId);
    assert.equal(counter.workspaceCreates, 1);
    assert.equal(counter.creates, 2);
    assert.deepEqual(await o.spawn("engineering"), e);
    assert.equal(counter.creates, 2);
  }));

test("reconciliation rejects a known session whose native workspace changed", () =>
  fixture(async (o) => {
    await o.spawn("onboarding");
    const original = o.api.agents.ref;
    o.api.agents.ref = (id) => ({
      ...original(id),
      workspaceId: "unexpected-workspace",
    });
    await assert.rejects(o.spawn("onboarding"), /BOUND_WORKSPACE_CHANGED/);
  }));
