import type { PluginServerContext } from "@getpaseo/plugin/server";
import { createPaseoClient } from "@getpaseo/client";
import { join } from "node:path";
import { stateDir } from "./server/location";
import { appendFile } from "node:fs/promises";
import { readJson } from "./server/journal";
import { Owner, type Bootstrap } from "./server/owner";
import { listen } from "./server/http";
export default function contribute(server: PluginServerContext) {
  const dir = stateDir;
  let cleanup: (() => Promise<void>) | undefined;
  let client: ReturnType<typeof createPaseoClient> | undefined;
  const ready = (async () => {
    const boot = await readJson<Bootstrap>(join(dir, "bootstrap.json"));
    if (!boot) throw Error("PREPARE_REQUIRED");
    server.before("agent.create", ({ request }) => {
      const role = (["onboarding", "engineering"] as const).find((role) =>
        request.config.systemPrompt?.startsWith(
          `ONBOARDING_SPIKE:${boot.runId}:${role}\n`,
        ),
      );
      if (!role) return request;
      const tools = [
        "onboarding_inspect",
        "guidance_read",
        "onboarding_check",
        "handover_read",
        ...(role === "onboarding"
          ? ["onboarding_configure", "onboarding_complete"]
          : ["handover_acknowledge"]),
      ];
      return {
        ...request,
        config: {
          ...request.config,
          toolPolicy: {
            preapproved: [
              ...(request.config.toolPolicy?.preapproved ?? []),
              ...tools.map((tool) => ({
                kind: "mcp" as const,
                server: "onboarding",
                tool,
              })),
            ],
          },
          mcpServers: {
            ...request.config.mcpServers,
            onboarding: {
              type: "http",
              url: `http://127.0.0.1:${boot.port}/mcp/${role}`,
              headers: { Authorization: `Bearer ${boot.tokens[role]}` },
            },
          },
        },
      };
    });
    client = createPaseoClient({ url: boot.daemonUrl });
    await client.connect();
    const owner = new Owner(dir, boot, client);
    const roles = await owner.transaction((s) => owner.reconcile(s));
    await appendFile(
      join(dir, "boots.jsonl"),
      JSON.stringify({
        at: new Date().toISOString(),
        pid: process.pid,
        roles,
      }) + "\n",
      { mode: 0o600 },
    );
    cleanup = await listen(owner);
    console.log(
      "ONBOARDING_SPIKE_READY",
      JSON.stringify({ pid: process.pid, runId: boot.runId }),
    );
  })().catch((e) => {
    console.error("ONBOARDING_SPIKE_BOOT_FAILED", String(e));
    throw e;
  });
  return async () => {
    try {
      await ready;
    } finally {
      await cleanup?.();
      await client?.close();
    }
  };
}
