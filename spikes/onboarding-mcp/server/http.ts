import { createServer, type IncomingMessage } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  Configure,
  Complete,
  Acknowledge,
  Guidance,
  Role,
} from "../shared/contracts";
import { Owner } from "./owner";
import { atomicJson } from "./journal";
import { join } from "node:path";
async function body(req: IncomingMessage) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 32768) throw Error("BODY_TOO_LARGE");
  }
  return raw ? JSON.parse(raw) : {};
}
export async function listen(owner: Owner) {
  const connections = new Set<StreamableHTTPServerTransport>();
  const http = createServer(async (req, res) => {
    try {
      if (
        req.headers.host !== `127.0.0.1:${owner.boot.port}` ||
        req.headers.origin
      ) {
        res.writeHead(403).end();
        return;
      }
      const path = req.url,
        auth = req.headers.authorization;
      if (path === "/driver") {
        if (auth !== `Bearer ${owner.boot.tokens.driver}`) {
          res.writeHead(401).end();
          return;
        }
        if (req.method !== "POST") {
          res.writeHead(405).end();
          return;
        }
        const input = z
          .object({
            command: z.enum([
              "inspect",
              "spawn",
              "dispatch",
              "reconcile",
              "handover",
            ]),
            role: Role.optional(),
          })
          .strict()
          .parse(await body(req));
        let value: unknown;
        switch (input.command) {
          case "inspect":
            value = await owner.read();
            break;
          case "reconcile":
            value = await owner.transaction((s) => owner.reconcile(s));
            break;
          case "spawn":
            value = await owner.spawn(Role.parse(input.role));
            break;
          case "dispatch":
            value = await owner.dispatch(Role.parse(input.role));
            break;
          case "handover":
            value = await owner.handover("engineering");
            break;
        }
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(value));
        return;
      }
      const role =
        path === "/mcp/onboarding"
          ? "onboarding"
          : path === "/mcp/engineering"
            ? "engineering"
            : null;
      if (!role) {
        res.writeHead(404).end();
        return;
      }
      if (auth !== `Bearer ${owner.boot.tokens[role]}`) {
        res.writeHead(401).end();
        return;
      }
      const server = new McpServer({
        name: "project-harness-onboarding-spike",
        version: "0.0.0",
      });
      const register = (
        name: string,
        schema: z.ZodRawShape,
        fn: (args: unknown) => Promise<unknown>,
      ) =>
        server.registerTool(name, { inputSchema: schema }, async (args) => {
          try {
            const value = await fn(args);
            return {
              content: [{ type: "text" as const, text: JSON.stringify(value) }],
            };
          } catch (error) {
            return {
              isError: true,
              content: [{ type: "text" as const, text: String(error) }],
            };
          }
        });
      register("onboarding_inspect", {}, () => owner.inspect(role));
      register("guidance_read", {}, async () => Guidance);
      register("onboarding_check", {}, () => owner.check(role));
      register("handover_read", {}, () => owner.handover(role));
      if (role === "onboarding") {
        register("onboarding_configure", Configure.shape, (args) =>
          owner.configure(role, args),
        );
        register("onboarding_complete", Complete.shape, (args) =>
          owner.complete(role, args),
        );
      } else
        register("handover_acknowledge", Acknowledge.shape, (args) =>
          owner.acknowledge(role, args),
        );
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });
      connections.add(transport);
      res.on("close", () => {
        connections.delete(transport);
        void transport.close();
        void server.close();
      });
      await server.connect(transport);
      await transport.handleRequest(
        req,
        res,
        req.method === "POST" ? await body(req) : undefined,
      );
    } catch (error) {
      if (!res.headersSent) {
        res.writeHead(409, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: String(error) }));
      } else res.end();
    }
  });
  await new Promise<void>((resolve, reject) => {
    http.once("error", reject);
    http.listen(owner.boot.port, "127.0.0.1", resolve);
  });
  await atomicJson(join(owner.dir, "listening.json"), {
    pid: process.pid,
    port: owner.boot.port,
    at: new Date().toISOString(),
  });
  return async () => {
    for (const t of connections) await t.close();
    http.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      http.close((e) => (e ? reject(e) : resolve())),
    );
  };
}
