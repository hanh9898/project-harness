import type { PaseoApi, PaseoAgentConfig } from "@getpaseo/client";
import { readFile, realpath } from "node:fs/promises";
import { join } from "node:path";
import {
  Configuration,
  Configure,
  Complete,
  Acknowledge,
  Guidance,
  type Role,
} from "../shared/contracts";
import { atomicJson, digest, exclusive, readJson } from "./journal";
export type Bootstrap = {
  runId: string;
  host: string;
  daemonUrl: string;
  port: number;
  profileId: string;
  cwd: string;
  projectRoot: string;
  skill: string;
  principles: string;
  goal: string;
  tokens: Record<Role | "driver", string>;
};
export type Profile = {
  id: string;
  name: string;
  provider: string;
  model?: string;
  modeId?: string;
  thinkingOptionId?: string;
  featureValues?: Record<string, unknown>;
};
export type Binding = {
  identity: string;
  status: "intent" | "created";
  agentId?: string;
  workspaceId?: string;
  dispatch?: "intent" | "sent";
  handoverDigest?: string;
};
export type Report = {
  id: string;
  revision: number;
  dependencyDigest: string;
  blockers: string[];
  optionalGaps: string[];
};
export type Handover = {
  revision: number;
  config: Configuration;
  context: {
    host: string;
    projectId: string;
    workspaceId: string;
    projectRoot: string;
  };
  dependencyDigest: string;
  reportId: string;
  optionalGaps: string[];
  verification: "build-ready-smoke-only";
};
export type State = {
  version: 1;
  revision: number;
  config?: Configuration;
  context?: Handover["context"];
  report?: Report;
  handover?: Handover;
  roles: Partial<Record<Role, Binding>>;
  receipts: Record<string, { inputDigest: string; result: unknown }>;
  audit: Array<{ at: string; role: string; action: string; revision: number }>;
};
export const empty = (): State => ({
  version: 1,
  revision: 0,
  roles: {},
  receipts: {},
  audit: [],
});
export class Owner {
  readonly path: string;
  constructor(
    readonly dir: string,
    readonly boot: Bootstrap,
    readonly api: PaseoApi,
  ) {
    this.path = join(dir, "state.json");
  }
  async read() {
    return (await readJson<State>(this.path)) ?? empty();
  }
  async transaction<T>(fn: (s: State) => Promise<T>) {
    return exclusive(this.path, async () => {
      const s = await this.read();
      const result = await fn(s);
      await atomicJson(this.path, s);
      return result;
    });
  }
  async profile() {
    const { config } = await this.api.config.get();
    const profiles = (config.agentProfiles ?? []) as Profile[];
    const p = profiles.find((p) => p.id === this.boot.profileId);
    if (!p?.model || p.provider !== "codex")
      throw Error(
        "NATIVE_PROFILE_MISSING_OR_UNSUPPORTED: " + Guidance.nativeGap,
      );
    return {
      id: p.id,
      name: p.name,
      provider: p.provider,
      model: p.model,
      modeId: p.modeId,
      thinkingOptionId: p.thinkingOptionId,
      featureValues: p.featureValues,
    };
  }
  async execution(): Promise<PaseoAgentConfig> {
    const p = await this.profile();
    return {
      provider: p.provider + "/" + p.model,
      modeId: p.modeId,
      thinkingOptionId: p.thinkingOptionId,
      featureValues: p.featureValues,
      options: {
        sandbox_mode: "read-only",
        approval_policy: "never",
        web_search: "disabled",
      },
    };
  }
  proposed(): Configuration {
    return {
      goal: this.boot.goal,
      profileId: this.boot.profileId,
      skillSources: [this.boot.skill],
      principleSources: [this.boot.principles],
      limits: {
        maxSessions: 2,
        maxTurnSeconds: 180,
        authority: "bounded-smoke-no-project-writes",
      },
    };
  }
  async inspect(role: Role) {
    const s = await this.read();
    return {
      role,
      context: s.context,
      revision: s.revision,
      config: s.config,
      profile: await this.profile(),
      proposedConfig: this.proposed(),
      handoverDigest: s.handover ? digest(JSON.stringify(s.handover)) : null,
      guidance: Guidance,
      capabilities: {
        nativeProfileRead: "config.get",
        nativeProfileWrite: false,
        spawnFromMcp: false,
      },
    };
  }
  audit(s: State, role: string, action: string) {
    s.audit.push({
      at: new Date().toISOString(),
      role,
      action,
      revision: s.revision,
    });
  }
  async deps(s: State) {
    const blockers: string[] = [];
    const c = s.config;
    if (!c) blockers.push("MANDATORY_CONFIG_MISSING");
    if (!s.context) blockers.push("NATIVE_CONTEXT_MISSING");
    let profile: unknown = null;
    try {
      profile = await this.profile();
    } catch {
      blockers.push("NATIVE_PROFILE_MISSING");
    }
    if (c?.profileId !== this.boot.profileId)
      blockers.push("PROFILE_REF_MISSING_OR_UNAUTHORIZED");
    if (s.context) {
      try {
        const w = this.api.workspaces.ref(s.context.workspaceId);
        if (!(await w.refresh()) || w.projectId !== s.context.projectId)
          blockers.push("WORKSPACE_MISSING_OR_CHANGED");
      } catch {
        blockers.push("WORKSPACE_UNAVAILABLE");
      }
    }
    const sources: Record<string, string> = {};
    for (const path of [
      ...(c?.skillSources ?? []),
      ...(c?.principleSources ?? []),
    ]) {
      try {
        if (
          ![this.boot.skill, this.boot.principles].includes(path) ||
          (await realpath(path)) !== path
        )
          throw Error("unauthorized");
        sources[path] = digest(await readFile(path, "utf8"));
      } catch {
        blockers.push("SOURCE_MISSING_OR_UNAUTHORIZED:" + path);
      }
    }
    return {
      blockers,
      dependencyDigest: digest(
        JSON.stringify({ profile, context: s.context, sources }),
      ),
      optionalGaps: [
        "Backlog/GitLab/polling/specialists not configured; not required by smoke",
      ],
    };
  }
  async configure(role: Role, raw: unknown) {
    if (role !== "onboarding") throw Error("ROLE_DENIED");
    const input = Configure.parse(raw);
    return this.transaction(async (s) => {
      const key = "configure:" + input.requestId,
        hash = digest(JSON.stringify(input));
      const prior = s.receipts[key];
      if (prior) {
        if (prior.inputDigest !== hash) throw Error("REQUEST_PAYLOAD_CONFLICT");
        return prior.result;
      }
      if (s.revision !== input.expectedRevision)
        throw Error("REVISION_CONFLICT");
      if (input.config.profileId !== this.boot.profileId)
        throw Error("NATIVE_PROFILE_REF_UNAUTHORIZED");
      await this.profile();
      if (
        input.config.skillSources.some((x) => x !== this.boot.skill) ||
        input.config.principleSources.some((x) => x !== this.boot.principles)
      )
        throw Error("SOURCE_UNAUTHORIZED");
      s.config = input.config;
      s.revision++;
      delete s.handover;
      const result = { revision: s.revision, requestId: input.requestId };
      s.receipts[key] = { inputDigest: hash, result };
      this.audit(s, role, "configure");
      return result;
    });
  }
  async check(role: Role) {
    return this.transaction(async (s) => {
      const deps = await this.deps(s);
      s.report = {
        id: digest(JSON.stringify({ revision: s.revision, ...deps })),
        revision: s.revision,
        ...deps,
      };
      this.audit(s, role, "check");
      return s.report;
    });
  }
  async complete(role: Role, raw: unknown) {
    if (role !== "onboarding") throw Error("ROLE_DENIED");
    const input = Complete.parse(raw);
    return this.transaction(async (s) => {
      const key = "complete:" + input.requestId,
        hash = digest(JSON.stringify(input)),
        prior = s.receipts[key];
      if (prior && prior.inputDigest !== hash)
        throw Error("REQUEST_PAYLOAD_CONFLICT");
      if (
        input.expectedRevision !== s.revision ||
        s.report?.id !== input.reportId ||
        s.report.revision !== s.revision
      )
        throw Error("STALE_REPORT");
      const deps = await this.deps(s);
      if (deps.blockers.length)
        throw Error("MANDATORY_DEPENDENCY_BLOCKED:" + deps.blockers.join(","));
      if (deps.dependencyDigest !== s.report.dependencyDigest)
        throw Error("STALE_DEPENDENCY_REPORT");
      if (prior) return prior.result;
      s.handover = {
        revision: s.revision,
        config: Configuration.parse(s.config),
        context: s.context!,
        dependencyDigest: deps.dependencyDigest,
        reportId: s.report.id,
        optionalGaps: deps.optionalGaps,
        verification: "build-ready-smoke-only",
      };
      const result = {
        revision: s.revision,
        handoverDigest: digest(JSON.stringify(s.handover)),
        next: Guidance.next,
      };
      s.receipts[key] = { inputDigest: hash, result };
      this.audit(s, role, "complete");
      return result;
    });
  }
  async requireHandover(s: State) {
    const h = s.handover;
    if (!h || h.revision !== s.revision)
      throw Error("HANDOVER_MISSING_OR_STALE");
    const deps = await this.deps(s);
    if (deps.blockers.length || deps.dependencyDigest !== h.dependencyDigest)
      throw Error("MANDATORY_DEPENDENCY_CHANGED");
    return h;
  }
  async handover(role: Role) {
    const s = await this.read();
    const h = await this.requireHandover(s);
    return { handover: h, handoverDigest: digest(JSON.stringify(h)), role };
  }
  async acknowledge(role: Role, raw: unknown) {
    if (role !== "engineering") throw Error("ROLE_DENIED");
    const input = Acknowledge.parse(raw);
    return this.transaction(async (s) => {
      const h = await this.requireHandover(s);
      if (
        input.handoverDigest !== digest(JSON.stringify(h)) ||
        input.revision !== h.revision ||
        JSON.stringify(input.config) !== JSON.stringify(h.config)
      )
        throw Error("HANDOVER_MISMATCH");
      this.audit(s, role, "acknowledge-exact-handover");
      return {
        accepted: true,
        revision: s.revision,
        handoverDigest: input.handoverDigest,
      };
    });
  }
  async reconcile(s: State) {
    for (const [role, binding] of Object.entries(s.roles)) {
      if (!binding.agentId) {
        const page = await this.api.agents.list({
          filter: {
            labels: { onboarding_run: this.boot.runId, onboarding_role: role },
          },
        });
        if (page.pageInfo.hasMore) throw Error("RECONCILE_PAGINATION_REQUIRED");
        if (page.entries.length > 1) throw Error("DUPLICATE_ROLE_SESSIONS");
        if (page.entries.length === 1) {
          binding.agentId = page.entries[0].agent.id;
          binding.workspaceId = page.entries[0].agent.workspaceId ?? undefined;
          binding.status = "created";
        }
      }
      if (binding.agentId) {
        const a = this.api.agents.ref(binding.agentId);
        if (!(await a.refresh()) || a.archivedAt)
          throw Error("BOUND_SESSION_MISSING_OR_ARCHIVED");
        if (!a.workspaceId || binding.workspaceId !== a.workspaceId)
          throw Error("BOUND_WORKSPACE_CHANGED");
        if (role === "engineering" && a.workspaceId !== s.context?.workspaceId)
          throw Error("WORKSPACE_BINDING_MISMATCH");
        if (role === "onboarding" && !s.context) {
          const w = this.api.workspaces.ref(a.workspaceId);
          await w.refresh();
          if (!w.projectId) throw Error("NATIVE_PROJECT_MISSING");
          s.context = {
            host: this.boot.host,
            projectId: w.projectId,
            workspaceId: a.workspaceId,
            projectRoot: this.boot.projectRoot,
          };
        }
      }
    }
    return s.roles;
  }
  async spawn(role: Role) {
    return this.transaction(async (s) => {
      // Driver-only user command. MCP never exposes this method.
      if (role === "engineering") await this.requireHandover(s);
      await this.reconcile(s);
      const old = s.roles[role];
      if (old) {
        if (!old.agentId) throw Error("CREATE_OUTCOME_UNRESOLVED_NO_RETRY");
        return old;
      }
      const identity = this.boot.runId + ":" + role;
      const binding: Binding = {
        identity,
        status: "intent",
        ...(role === "engineering"
          ? { handoverDigest: digest(JSON.stringify(s.handover)) }
          : {}),
      };
      s.roles[role] = binding;
      await atomicJson(this.path, s);
      const options = {
        config: {
          ...(await this.execution()),
          systemPrompt: `ONBOARDING_SPIKE:${this.boot.runId}:${role}\nBounded native-session smoke experiment. Only use configuration MCP and read assigned source files. Do not modify project files, spawn agents, delegate, schedule, or access external services. Inherited skills may be visible. End after requested bounded work.`,
        },
        title: `[Disposable onboarding MCP] ${role}`,
        labels: { onboarding_run: this.boot.runId, onboarding_role: role },
        idempotencyKey: identity,
      };
      const agent =
        role === "engineering"
          ? await this.api.workspaces
              .ref(s.context!.workspaceId)
              .agents.create(options)
          : await this.api.agents.create({ ...options, cwd: this.boot.cwd });
      binding.agentId = agent.id;
      binding.workspaceId = agent.workspaceId ?? undefined;
      binding.status = "created";
      await atomicJson(this.path, s);
      if (!agent.workspaceId) throw Error("NATIVE_WORKSPACE_MISSING");
      const w = this.api.workspaces.ref(agent.workspaceId);
      await w.refresh();
      if (!w.projectId) throw Error("NATIVE_PROJECT_MISSING");
      if (role === "onboarding")
        s.context = {
          host: this.boot.host,
          projectId: w.projectId,
          workspaceId: agent.workspaceId,
          projectRoot: this.boot.projectRoot,
        };
      else if (s.context?.workspaceId !== agent.workspaceId)
        throw Error("WORKSPACE_BINDING_MISMATCH");
      this.audit(s, "driver", "spawn:" + role);
      return binding;
    });
  }
  async dispatch(role: Role) {
    return this.transaction(async (s) => {
      const binding = s.roles[role];
      if (!binding?.agentId) throw Error("SPAWN_FIRST");
      if (binding.dispatch) return { status: binding.dispatch, replayed: true };
      const prompt =
        role === "onboarding"
          ? `Use ONLY the injected onboarding MCP for configuration operations. Call onboarding_inspect and guidance_read. Read the assigned Skill ${this.boot.skill} and Principles ${this.boot.principles}. Use proposedConfig from inspect as the authorized minimal configuration. Call onboarding_configure with requestId "initial-config", expectedRevision from inspect, config exactly proposedConfig. Then onboarding_check, and if no blockers call onboarding_complete with requestId "initial-complete", expectedRevision equal saved revision and reportId from check. Explain briefly that build-ready is not operational verification and the user must explicitly Spawn Harness Engineering Orchestrator. Finish this turn. Do not call shell to access the MCP or state files.`
          : `This is the USER-INITIATED Spawn Harness Engineering Orchestrator bounded smoke turn. Expected pinned handover digest: ${binding.handoverDigest}. Call onboarding_inspect then handover_read. Verify its digest equals the expected pinned digest; call handover_acknowledge with the EXACT config, revision and handoverDigest returned by handover_read. Report the digest and goal. Do not build anything, spawn further sessions, or start loops. End this turn.`;
      binding.dispatch = "intent";
      await atomicJson(this.path, s);
      await this.api.agents.ref(binding.agentId).send(prompt);
      binding.dispatch = "sent";
      this.audit(s, "driver", "dispatch:" + role);
      return { status: "sent" };
    });
  }
}
