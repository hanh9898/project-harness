# V1 concept model validation

Register SHA-256: `bdc1e584cf5e9eb3b1c8632c12ee9ae4cc4014e1327085bff01dc3c8f47ffbed`.

Command: `python3 docs/design/build-v1-concept-views.py --check`

Structural checks passed: unique IDs; typed reference targets; status/provenance; cardinality syntax and range; source excerpt/line consistency; owning files and explicit glossary anchors; mapping links; no role inheritance; no orphan critical concepts; each critical concept traced to at least one CQ; each required area has CQs; each CQ has concepts, directed relations, constraints, answer, mappings or explicit gap, and separate runtime evidence scope. All original CQ01–CQ30 retained; later CQs expand failure/reload/authority/update and accepted follow-up scenarios.

Counts (inventory, not completion): {"concepts": 155, "relations": 236, "constraints": 63, "requirements": 14, "questions": 51, "mappings": 110, "sources": 493}.

Answer classifications: {'approved-sources': 6, 'relation-draft': 45}.
Runtime evidence classifications: {'unproved-v1': 41, 'partial-spike': 6, 'fixture-only': 4}.

`unknown` cardinalities remain explicit. Most relations are inferred draft synthesis, not newly accepted behavior. Validation checks consistency and traceability, not truth of every synthesis, formal logical completeness, or production implementation. Source excerpts are local citations, not proof native APIs enforce policy. The register and browser do not execute product workflows.

Source audit: [report](v1-concept-graph-audit.md) and [per-record before/after](v1-concept-graph-audit.json). Audit covers all relation/constraint records and concept type IDs; current CQ paths include their relation endpoints and exclude superseded relations. Historical relation IDs stay inspectable but do not add active graph edges. Source review does not promote inferred/proposed records to approved or establish runtime evidence.

Browser preview results are recorded separately in the completion plan; generated HTML uses inline data/script/style and no dependencies.
