import { z } from "zod";
export const Role = z.enum(["onboarding", "engineering"]);
export type Role = z.infer<typeof Role>;
export const Configuration = z
  .object({
    goal: z.string().trim().min(10).max(600),
    profileId: z.string().min(1),
    skillSources: z.array(z.string()).min(1).max(3),
    principleSources: z.array(z.string()).min(1).max(3),
    limits: z
      .object({
        maxSessions: z.literal(2),
        maxTurnSeconds: z.literal(180),
        authority: z.literal("bounded-smoke-no-project-writes"),
      })
      .strict(),
  })
  .strict();
export type Configuration = z.infer<typeof Configuration>;
export const Configure = z
  .object({
    requestId: z.string().min(1).max(120),
    expectedRevision: z.number().int().nonnegative(),
    config: Configuration,
  })
  .strict();
export const Complete = z
  .object({
    requestId: z.string().min(1),
    expectedRevision: z.number().int(),
    reportId: z.string(),
  })
  .strict();
export const Acknowledge = z
  .object({
    handoverDigest: z.string(),
    config: Configuration,
    revision: z.number().int(),
  })
  .strict();
export const Guidance = {
  version: "spike-1",
  next: "After code saves a build-ready handover, the USER explicitly invokes Spawn Harness Engineering Orchestrator. Existing role returns Open Session. This smoke does not build a project or verify operation.",
  nativeGap:
    "Native profile writes/login are not exposed by this spike. Use Paseo Settings → Agents → Agent profiles, then inspect again. Native profile refs remain owned by this host.",
  skills:
    "Assigned sources are explicit paths. Other inherited provider skills may remain visible; there is no catalog isolation.",
};
