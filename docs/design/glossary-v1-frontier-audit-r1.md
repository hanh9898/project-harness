# Glossary V1 / concept graph — frontier audit R1

2026-10-23 · **DESIGN ONLY** · Research for the resumed parent grill; no semantic decisions, status changes, product implementation or session-closure claim.

**Finding:** this bounded source review justifies **no additional material meaning question** beyond the known D01 approval-scope issue. The separate V1 acceptance gate is also demonstrably unanswered. This is not evidence that the whole design tree has been exhausted: neither `openModelingFrontiers: []`, approved statuses, nor CQ/node coverage proves that.

Classification: **A** requires a user decision; **B** later technical design/factual prerequisite/proof; **C** already settled meaning or explicitly unspecified/deferred detail; **D** clerical vocabulary/provenance repair. Strength is stated per finding. File references below are workspace-relative; **P** numbers are original transcript positions, not JSONL line numbers.

## 1. D01 needs explicit current scope, not inferred historical approval

**A — known approval-scope issue; strong/direct evidence of ambiguity, not evidence that every definition is disputed.** In `docs/design/grill-history/messages.jsonl`, P2359 proposes the whole review; P2361 asks what “đội năng lực” means; P2365 explains Agent Catalog; P2367 says “Ok thế theo đề xuất”; P2368 is the assistant's bulk-approval interpretation. These are JSONL lines 641–646, with the intervening messages preserved. Compare `docs/design/v1-glossary-completion-plan.md:158` and `docs/design/v1-vocabulary-review.md:3`, which claim acceptance of all 96 entries.

Already settled: Agent Catalog / Danh mục agent has separate earlier approval (P1785→P1787 and P1792→P1794; `docs/design/grill-history/decision-ledger.md:25`). D02–D05 and GA01 have their own acceptance. The manifest identifies 96 reviewed IDs, including 23 contextual references; its null `unresolvedQuestion` fields are the reviewer's synthesis, not independent user approval.

Remaining alternatives: explicit current acceptance of the presented 96-entry names/definitions/owners and preserved aliases, or specific exceptions/revisions; the historical reply could concern the bulk proposal or only the intervening explanation. The parent owns that question. Dependency: identify the current review scope before declaring it accepted; no need to reopen separately approved policies. Affected: the 96 manifest IDs and D01-linked CQ02/03/04/06/07/16/18/19/20/22/30/50. This concerns the accepted language/meaning baseline, not storage or provider capability. No status was changed by this audit.

## 2. D02–D05 and GA01 have direct, scoped closure evidence

**C — strong/direct.** Read the actual proposals and replies in `messages.jsonl`: P2212→P2214, P2232→P2234, P2247→P2249, P2262→P2264, P2279→P2281, P2291→P2293 and P2540→P2542. The ledger indexes their scopes at `docs/design/grill-history/decision-ledger.md:69`.

They settle per-visit Step Run and admitted Attempt identity; all-required/dynamic closure and required-branch failure; aggregate Outcome versus Verdict and conditional reuse; mandatory Deep triggers, goal-specific evidence, honest cost attribution and Fix-forward containment; and new Assignment per actual redispatch, with continuity on uncertain response/continued Turns. GA01 also preserves worker allocations through orchestrator replacement.

No competing material interpretation was found in the reviewed current owning definitions. CQ10–15/19–21/24/26–28/38–43/46–47/51 still require technical realization; that does not reopen these rules. Release-check reuse remains stricter than workflow-result reuse (`docs/design/release-policy.md:46`; `docs/design/v1-glossary-completion-plan.md:205`).

## 3. The V1 completion gate remains a separate decision

**A — known cross-session acceptance decision; strong/direct.** P1270 asks for the six-part completion gate; P1272 asks whether prototype screens are missing instead (`docs/design/grill-history/messages.jsonl:350` and `:351`). `docs/design/scope-80-20.md:90` still labels the gate proposed/pending.

Already settled: MUST capabilities and V1 boundaries at scope lines 21–88. Alternatives: approve the six proposed evidence groups or revise the completion standard. Dependency: a current consolidated acceptance proposal, not runtime success. Affected: all feature requirement groups, especially CQ01/05/13/16–18/24–30/44. This changes what qualifies as “V1 complete,” hence is a material acceptance decision rather than a schema choice. It is **not a newly discovered glossary meaning frontier** and need not block a narrowly scoped D01 answer. Do not silently approve it or reopen its underlying features.

## 4. Remaining technical prerequisites must stay visible

**B — strong/direct; no external capability asserted.** `docs/design/onboarding-contracts.md:20`, `:40` and `:46`, and `docs/design/onboarding-implementation.md:128` distinguish intent/receipt from actual native effects. Correlation completeness, native idempotency scope/retention, per-Session credentials/reattachment, permission narrowing/confirmed stop, and Claude/Codex parity require later investigation on selected versions. A SQLite lease or stored binding is insufficient evidence of native/shell fencing.

Likewise, scheduler occurrence evidence/DST/race linearization, revision application, check invalidation, multi-writer activation/recovery, migration compatibility, usage capture and metric formulas are B (`docs/design/modules.md:66`; `docs/design/release-policy.md:62`; `docs/design/verification.md:66`). Requirements already specify block/reconcile/report unsupported behavior; implementation cannot silently weaken them. Only a later demonstrated incompatibility requiring a changed product contract would create a dependent A question. Existing spike claims were not revalidated here.

## 5. Unknowns and absent dedicated scenarios are not automatic frontiers

**C/B — explicit limits strong; completeness inference bounded.** Per-Session concurrency and universal Attempt/Assignment cardinalities are explicitly unspecified (`docs/design/v1-glossary-completion-plan.md:203`; `docs/design/v1-concept-graph-audit.md:47`). Slot counts/fairness are not chosen (`docs/design/agent-delegation.md:23`). Retention duration and metrics formulas remain later work. R164/R165 and R222/R223 remain optional conceptual associations; their wording does not require Experiment/Suite/Case storage aggregates (`docs/design/v1-concept-graph-audit.md:54`). None alone justifies a new product interview.

Additional scenario probes, beyond reading CQ answers:

- Revoked authority during receipt replay: replay does not bypass revocation (`onboarding-implementation.md:85`); C meaning, B enforcement.
- Native Session disappears or Replace fails midway: no automatic replacement authority or revival of revoked owner (`onboarding-implementation.md:149`, `:161`); C/B.
- Evidence becomes inaccessible after archival: reuse requires accessible Evidence, and evidence must be preserved before archive (`v1-glossary-completion-plan.md:119`; `modules.md:158`); C/B.
- Host reboot during activation and resource starvation lack dedicated end-to-end CQs. Durable reconciliation and separate orchestrator/worker slots provide constraints, not proof of liveness (`release-execution.md:59`; `agent-delegation.md:24`); B/coverage watchpoints.
- Source task/comment edits or deletions versus already accepted work have no dedicated lifecycle CQ. Scope requires intake and deduplicated delivery, not an explicit bidirectional cancellation/synchronization policy (`scope-80-20.md:49`, `:53`; R137). **Weak possible scope extension, not a justified current A:** automatic cancellation cannot be invented. Revisit only if the parent establishes that behavior as required.

## 6. Clerical/provenance repairs can follow without inventing meaning

**D — strong for narrow pins/stale text; interpretive risk for shorthand.** Report only; existing files remain untouched.

- REQ05's sole SRC264 pins a Work heading/caller paragraph; REQ06's SRC265 pins a heading/table header; REQ14's SRC273 describes test methodology. These do not independently entail the full requirement names (`v1-concept-register.json:2557`, `:2567`, `:2633`). Add fuller supporting references later, preserving historical pins. Scope lines 25–37 and verification lines 40–62 supply relevant content; no new approval follows from repairing provenance.
- `configuration.md:20` still says Vietnamese labels need completion, although `agent-delegation.md:54` records the confirmed equivalents. `docs/ui/GLOSSARY.md:3` uses broad “observed” wording despite scoped confirmed entries. Qualify introductions; retain individual approvals.
- `onboarding-implementation.md:124` uses “new Attempt in the same Step Run” in a lifecycle-dispatch paragraph. Read it within workflow scope, or specify the lifecycle representation later; GA01 explicitly does not force every non-workflow Assignment to have a Step Run (`v1-glossary-completion-plan.md:203`). This is an overgeneralization risk, not a new identity choice.
- Historical “open” notes preceding later acceptance, including `v1-concept-register.json:18914`, must not outrank the subsequent GA01 acceptance. D01 acceptance claims require the parent's explicit scope answer, not a clerical assumption.

## Coverage / closure checklist

| Reviewed facts | Coverage and practical limit |
| --- | --- |
| REQ01–02: ownership, staged lifecycle | Success plus stale readiness, duplicate start, reload, Replace/revocation: CQ01–03/20/31–32/45/49 and OB01–OB14. Protocol matrix is proposed, not runtime proof. |
| REQ03–04/13: methods, delegation, authority | CQ04–09/33–35/44/48; missing refs, drift, deny, fallback, shared limits and provider mismatch. Native parity remains unproved. |
| REQ05–06/14: execution/composition | CQ10–15/19–21/38/43/47/50/51; source-backed identity/join/evidence, pause/cancel/late results. No exhaustive state-space or schema audit. |
| REQ07–08: schedules/integrations | CQ16–18/36–37; empty polls, crash/replay, downtime, overlap and stale callback revisions. Adapter ordering and edit/delete semantics need the limits above. |
| REQ09–10/12: improvement/release/upstream | CQ22–26/30/39–41/46; no-change retro, check drift, failed health, compatible independent recovery and separate contribution authority. No live revalidation. |
| REQ11: evaluation/Analytics | CQ27–29/42–43; incomparable trials, unavailable measurements, shared cost, historical criteria and changing Saved Views. No fabricated thresholds or causal guarantees. |

Inspected all 51 CQ question/answer bodies, 236 relation predicates/scopes (R213 historical), 63 constraints, the vocabulary manifest/review, graph audit JSON/MD, completion plan, Glossary Map, owning definitions and relevant policy/protocol passages; original chat was checked at the decision positions listed above. The counts are inventory observations. This was **not** an independent line-by-line entailment re-audit of all 488 source pins, all UI entries, all historical messages or experimental artifacts. Coverage outside the named requirements remains inferential. The parent must recompute its design tree/frontier after the explicit current D01 answer; this report neither declares the session complete nor supplies the user's shared-understanding confirmation.
