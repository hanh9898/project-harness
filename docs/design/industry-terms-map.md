# Industry terminology map for the glossary interview

Research snapshot: 2026-10-22. English canonical terms below describe documented usages. They are not adopted project glossary entries or a new product name. The user rejected the proposed umbrella name “Bộ harness” and the restriction “orchestrator means only an LLM agent”; those proposals are not decisions.

## Main finding: the terms answer different questions

It is misleading to ask whether a product is a harness **or** a CLI **or** a plugin. Harness describes support for agent operation; CLI describes a command interface; plugin describes an extension integrated into a host. A program can have all three properties. This decomposition is our synthesis for reading the sources, not an industry-standard layer diagram.

Anthropic explicitly calls Claude Agent SDK a general-purpose agent harness. Thus **SDK and harness are compatible descriptions of the same product**, rather than competing implementation choices. [Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)

## Documented English usages

| Term | What it identifies | Documented usage and limit |
|---|---|---|
| **Agentic system** | A system-level category | Anthropic uses it to include both workflows with predefined paths and agents with model-directed processes. It is an umbrella in that taxonomy, not a settled product category for this repo. [1] |
| **Agent** | A model-driven task-performing system or configured participant, depending on source | A bare model is insufficient to describe its tools, instructions and execution loop. Anthropic emphasizes dynamic model control; SDKs also expose a configured Agent object. Do not assume every use means just a model/persona, a process, or a whole application. [1][4] |
| **Agent loop** | The recurring execution cycle | Model call → tool use/results → next step or stopping condition. A single application run can contain this loop and handoffs. It is not the same term as a daily scheduler or self-improvement loop. [4] |
| **Agent harness** | Support/control around model operation | Common examples include tool execution, context management and agent-loop behavior; opinionated harnesses can also include planning, filesystem, subagents and skills. Exact scope varies: Anthropic and LangChain do not define identical boundaries. [2][3] |
| **Agent runtime** | Execution infrastructure/engine | LangGraph emphasizes durable state, resumption, streaming and human intervention. Other products use runtime more broadly for a managed execution environment. Runtime is not universally synonymous with sandbox or a standalone daemon. [3] |
| **Agent framework** | Abstractions and integrations for building agents | LangChain describes reusable agent/tool/middleware abstractions. This describes a development offering, which can also include a loop or runtime. Not every repo or plugin is therefore a framework. [3] |
| **Workflow** | Structure of coordinated work | Anthropic distinguishes predefined code paths from open-ended agent control, yet its orchestrator-workers workflow contains model-driven decomposition. State which decisions are predefined instead of treating all work as hardcoded. [1] |
| **Orchestration** | The activity of coordinating execution | OpenAI describes orchestration through LLMs, code, or both. It covers which agents run, their order and how next steps are chosen. [4] |
| **Orchestrator** | A coordinator, with implementation and scope to be stated | It can name a software workflow coordinator or a model-led coordinator. Use **orchestrator agent**, **manager agent**, or **lead agent** when specifically naming an agent role. A deterministic controller and an orchestrator agent can coexist. [4][5] |
| **SDK** | A development toolkit/interface | Claude Agent SDK exposes agent-operation capabilities to code and is also called a harness. SDK does not mean one specific deployment topology. [2] |
| **CLI** | A command-line interaction surface/application | Codex CLI provides terminal interaction and scriptable operation; what it implements can include agent execution. A harness can expose CLI commands, but a command wrapper need not implement a harness. [6] |
| **Plugin** | An extension integrated into a host product | A Paseo plugin can add screens, RPC, hooks and backend behavior. Plugin packaging does not decide whether that behavior is a runtime, orchestration, tools or an agent. [7] |
| **MCP server** | A program exposing context/capabilities over MCP | MCP defines host/client/server roles and capabilities such as tools/resources/prompts. MCP does not prescribe the agent loop or orchestration. A server could expose a workflow operation implemented elsewhere or internally. [8] |
| **Agent Skill** | A reusable package of procedural knowledge/resources | The open format uses SKILL.md with optional scripts, references and assets. A skill can describe a procedure, but a written procedure alone does not establish execution guarantees. [9] |
| **Meta-harness** | Interfaces supporting multiple/evolving harness implementations | Anthropic uses it for Managed Agents, separating session, harness and sandbox interfaces. This documented usage does not mean an agent that automatically writes another harness, and is not a universal standard. [11] |
| **Agent engineering** | An iterative development/improvement discipline | LangChain uses build, test, ship, observe and refine. **Agent engineering platform** is a product-category usage covering lifecycle tooling; it is not a universal technical standard or the chosen name of this repo. [10] |

## Consequences for this project's terminology

1. Do not make **harness**, **plugin**, **CLI**, **MCP server**, and **skills** mutually exclusive options. Describe responsibility and interface/packaging separately.
2. Do not impose **orchestrator = LLM agent**, or **runtime = all code outside that agent**. Choose local scope only after identifying who owns coordination, state and recovery.
3. Distinguish the **agent role** from its definition, a running session and the support system around it. One agent role may continue across sessions; a different initial prompt does not prove a distinct runtime.
4. Separate an **industry term**, a **project component name**, and a **product name/value proposition**. A product name should convey the intended benefit; a generic term like harness cannot supply that benefit by itself.
5. The desired closed loop spans execution and improvement. Harness engineering or agent engineering may be relevant disciplines; neither automatically means an autonomous self-improving orchestrator. That scope must be explicit rather than implied by the noun.

## Project interview outcome

The glossary interview is complete. [GLOSSARY.md](../../GLOSSARY.md) records the agreed local scope: Project Harness is the project-specific system, implemented as a Paseo Plugin, with Project Orchestrator, Harness Engineering Orchestrator and Workflow Runtime. Each orchestrator includes an Orchestrator Agent; CLI and MCP Server are optional access interfaces. This research keeps the sources’ broader terminology and is not a new product name or a substitute for those local definitions.

## Sources

1. [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents).
2. [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents).
3. [LangChain: Agent frameworks, runtimes, and harnesses](https://www.langchain.com/blog/agent-frameworks-runtimes-and-harnesses-oh-my), [2026 comparison](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph). The author explicitly acknowledges overlap; this is one proposed taxonomy.
4. [OpenAI Agents SDK: Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/), [Running agents](https://developers.openai.com/api/docs/guides/agents/running-agents).
5. [Anthropic: Multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system).
6. [Codex CLI](https://learn.chatgpt.com/docs/codex/cli).
7. [Paseo plugin reference](https://paseo.sh/docs/plugins/reference).
8. [MCP architecture](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture).
9. [Agent Skills open format](https://agentskills.io/home).
10. [Agent engineering](https://www.langchain.com/blog/agent-engineering-a-new-discipline), [LangSmith product-category usage](https://www.langchain.com/resources/what-is-langsmith).

11. [Anthropic: Managed Agents](https://www.anthropic.com/research/managed-agents).

Additional source analysis: [industry-terms-orchestration-sources.md](industry-terms-orchestration-sources.md). The completed interview is recorded in GLOSSARY.md; research terminology does not silently override those agreed definitions.
