# Project Harness

Design of a Paseo plugin that builds and evolves a harness for one existing software project.

**Status:** design, interactive HTML prototypes, and disposable capability spikes. This repository does not yet contain a complete production plugin or installer. The current technical baseline is **Paseo 0.13.0-beta.1**; historical experiments retain their original versions and evidence limits.

The harness contains two orchestrators. The Harness Engineering Orchestrator builds and improves the harness and its workflows. The Project Orchestrator handles project work through native Paseo chat. Workflow execution, durable state, scheduling, evaluation, analytics and self-update are controlled by the plugin runtime.

## Start here

- [Current design index](docs/design/README.md)
- [Architecture](docs/design/architecture.md) and [module design](docs/design/modules.md)
- [V1 scope](docs/design/scope-80-20.md) and [acceptance matrix](docs/design/v1-acceptance-matrix.md)
- [Current Paseo baseline](docs/design/paseo-013-beta1-baseline.md) and [technical design](docs/design/technical-design-grill.md)
- [Glossary map](GLOSSARY-MAP.md) and [common language](GLOSSARY.md)
- [Design interview evidence](docs/design/grill-history/README.md)

Most design discussion is in Vietnamese; canonical domain names and definitions are in English. Proposed mechanisms, accepted decisions and runtime evidence have separate statuses.

## Interactive documents

Serve the repository locally and open the pages in a browser:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

- [Product prototype](http://127.0.0.1:8765/docs/design/prototype.html)
- [V1 concept graph](http://127.0.0.1:8765/docs/design/v1-concept-graph.html)
- [Architecture review](http://127.0.0.1:8765/docs/design/architecture-whole-harness-review.html)

These pages illustrate the design. Their fixtures and UI assertions do not establish native provider, scheduling or recovery capabilities.

## Experiments

Each experiment documents its tested versions, prerequisites, evidence and cleanup:

- [Paseo contract spike](spikes/paseo-contract/README.md)
- [Onboarding MCP spike](spikes/onboarding-mcp/README.md)
- [Release execution mechanisms](spikes/release-execution/README.md)
- [Live release/recovery spike](spikes/release-paseo-live/README.md)

Read an experiment's instructions before running it. Existing spikes are not automatically compatible with the current Paseo baseline. Local dependencies, private credentials and disposable runtime directories are excluded from version control; sanitized evidence and historical design records are retained.
