# Industry terminology: orchestration, agents, and harnesses

Research notes, checked 2026-10-22. Primary vendor sources only. These are documented usages, not universal definitions or a proposed product architecture. No product names, Vietnamese translations, or glossary entries are selected here.

Context: one project kit with two proposed orchestrators; possible packaging includes a Paseo plugin, CLI/recovery tools, and skills. Those packaging choices do not establish which components are agents, harnesses, or runtimes.

## 1. Agent and agentic system have different scopes in Anthropic's taxonomy

Anthropic explicitly acknowledges multiple meanings of agent. In its 2024 article, **agentic system** is the umbrella covering both workflows and agents. Its architectural distinction is whether predefined code paths coordinate LLMs/tools or the LLM dynamically controls its process and tool use. This is a declared convention, not an industry-wide agreement. [Building effective agents, “What are agents?”](https://www.anthropic.com/research/building-effective-agents)

Short quote: “At Anthropic, we categorize all these variations as agentic systems”.

**Nomenclature implication:** distinguish the whole system from an individual agent role. State whose convention is being used; an agent need not mean an entire autonomous product, and an agentic system need not contain an LLM supervisor.

## 2. Agent loop names execution behavior, not a supervisor role

OpenAI's runner repeatedly calls the current model, inspects output, executes tools and feeds back results, or switches agents on handoff; it returns on final output. Thus one run can involve multiple agents. The application-level turn and its internal loop are different scopes. [Running agents, “The agent loop”](https://developers.openai.com/api/docs/guides/agents/running-agents)

Short quote: “One SDK run is one application-level turn.”

**Nomenclature implication:** agent loop is useful for the model/tool feedback cycle. A scheduler repeatedly launching runs is a separate cycle. Loop ownership, model decisions, and cross-agent coordination should be described separately; none alone proves there is an orchestrator agent.

## 3. Workflow does not reliably mean that every decision is hardcoded

The same Anthropic article labels **orchestrator-workers** a workflow even though a central LLM chooses subtasks, delegates, and combines results. Its top-level workflow/agent distinction therefore should not be read as excluding dynamic decisions inside a predefined pattern. [Building effective agents, “Workflow: Orchestrator-workers”](https://www.anthropic.com/research/building-effective-agents)

OpenAI likewise discusses multi-agent workflows where either a manager retains the reply or a handoff transfers it. [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration)

**Nomenclature implication:** specify what is predefined: phase order, routing rules, task decomposition, or stopping conditions. Workflow alone does not settle autonomy or control ownership.

## 4. Orchestration is the activity; an orchestrator agent is one possible implementation

OpenAI explicitly supports orchestration through LLM decisions, through code, or a mixture. Its broader building guide includes steps, tools, handoffs, guardrails, and context under orchestration. [Agents SDK: Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/), [Building agents, “Orchestration”](https://developers.openai.com/tracks/building-agents)

Short quote from the SDK page: “Orchestrating via code: determining the flow of agents via your code.”

Anthropic's research system uses a **lead agent** to coordinate parallel subagents and calls the architecture an orchestrator-worker pattern. That supports orchestrator agent for this particular LLM-led role; it does not restrict every orchestrator to an LLM. [How we built our multi-agent research system, “Architecture overview for Research”](https://www.anthropic.com/research/multi-agent-research-system)

Short quote from the research-system article: “a lead agent coordinates the process while delegating to specialized subagents”.

There is also a direct software counterexample: OpenAI's Python running guide calls Dapr a workflow orchestrator. [Running agents, “Dapr”](https://openai.github.io/openai-agents-python/running_agents/#dapr)

**Nomenclature implication (synthesis):** orchestrator is a coordination role that needs a stated scope and implementation. Orchestrator agent adds the claim that an agent fills that role. For the two proposed orchestrators, establish what each coordinates and where its decisions come from before adding agent to either label. The claim “orchestrator only means an LLM agent” is unsupported and contradicted by these usages.

## 5. Harness covers support around model execution, including continuity across sessions

Anthropic calls the Claude Agent SDK an agent harness, then develops additional practices for work spanning context windows: initialization, feature tracking, progress artifacts, Git history, and verification. It explicitly says compaction alone is insufficient. These are continuity mechanisms around model work, not evidence that the harness is another planning agent. [Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)

Short quote: “The system prompt, set of tools, and overall agent harness was otherwise identical.”

That footnote explains that initializer agent and coding agent are separate labels here because their initial user prompts differ. It does not establish separate runtimes, models, or implementations.

**Nomenclature implication:** distinguish agent role/prompt, execution support, and continuity artifacts. Harness can include orchestration support without being synonymous with orchestrator agent. This article presents one solution, not a mandatory harness component checklist.

## 6. Harness and runtime overlap; a universal boundary is not established

Anthropic's newer Managed Agents article separates session log, harness, and sandbox. It describes the harness as the loop calling Claude and routing tool calls; the sandbox is where code and file operations execute. The harness can live outside that sandbox and recover using the external session log. [Scaling Managed Agents with stable interfaces](https://www.anthropic.com/research/managed-agents)

Short quote: “a harness (the loop that calls Claude and routes Claude’s tool calls to the relevant infrastructure)”.

OpenAI uses runtime vocabulary for agent execution choices and loop/state behavior. Its SDK overview separates application ownership of deployment, tools, storage, and approvals from the SDK executing the agent loop. [Agents SDK, “Build with the SDK”](https://developers.openai.com/api/docs/guides/agents/sdk)

**Nomenclature implication (synthesis):** harness emphasizes model-facing execution/control support; runtime may describe the executing engine or a wider managed execution service. These are useful tendencies, not disjoint industry categories. Define the local scope explicitly. Do not automatically equate runtime with sandbox, process, plugin, CLI, or the whole kit.

## Evidence limits for the next glossary interview

The sources establish English usage and counterexamples, not a standard vocabulary binding every vendor. The 2024 Anthropic article now carries a notice that tooling has changed and points to Managed Agents; its architectural vocabulary remains evidence of that article's usage. The newer material narrows some descriptions of harness without proving older or broader usages invalid.

The unresolved questions are local: what each proposed orchestrator coordinates; whether decisions are code-driven, model-driven, or mixed; who owns execution, state, recovery, and final output; and what the kit merely packages. Plugin, CLI, and skills describe delivery/integration surfaces and cannot answer those questions by themselves. This note makes no selection among them.

URL note: Anthropic's original `/engineering/building-effective-agents`, `/engineering/effective-harnesses-for-long-running-agents`, and `/engineering/multi-agent-research-system` URLs redirected to the exact `/research/` URLs cited above when checked. OpenAI SDK pages are living documentation. Each source's direct quotations total at most 25 words in this note.
