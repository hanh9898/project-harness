# WorkflowPrograms and Work execution — T04

2026-10-23. **Engineering proposal**, following [T03 acceptance](history/technical-t03-2026-10-23/acceptance-t03.json). This specifies an implementation within the accepted architecture; it is not running code, a newly accepted glossary policy or detailed-design closure. [Technical tree](technical-design-grill.md) keeps remaining work. Canonical meanings remain in the [Execution glossary](../domain/execution/GLOSSARY.md).

## 1. Module Interfaces and ownership

**WorkflowPrograms** checks and normalizes a composition of registered blocks. Its Interface hides input/output contract matching, permitted routing, nested composition, worker templates, join rules and bounded quality loops. **Work** owns persisted execution, admission, identities, result applicability, timers and reconciliation. Callers submit intent or a permitted composition; they do not run individual nodes or coordinate SQLite and Paseo.

| Description | Meaning in this implementation |
| --- | --- |
| Workflow Definition | Identified description of permitted execution, backed by registered code/assets or a run-scoped composition |
| Execution Plan | Serializable selected structure for a particular Run, plus recorded expansions permitted by that definition |
| Workflow Run | Durable execution and its pinned inputs/revisions; not the definition, native Session or Work Item |
| Registered code block | Harness-owned executable artifact selected by identity/revision/digest; not a string of code returned by a model |

The TypeScript authoring helpers already proposed in `modules.md` are a developer Interface. They produce validated data. A user chatting with an orchestrator does not learn a DSL, draw a graph or write TypeScript. Project Orchestrator can compose registered blocks for a task; creating reusable behavior or changing executable code still follows A09 candidate/check/activation.

Deleting WorkflowPrograms should force composition rules back into authors, runtime and tests. Deleting Work should force persistence/admission/recovery back into callers. Those are the reasons for these seams; a separate module or adapter for each pattern would add little leverage.

## 2. Serializable representation

Proposed persisted data contains schema version, definition/registry references, stable step keys, input/output contracts, allowed branches/templates, join/stopping policies and bounds. Each node is an agent/code leaf or a nested `chain`, `route`, `parallel`, `workers` or `optimize` structure. A registered subworkflow can be referenced by version; unrestricted graph cycles are expressed through supported bounded loop constructs.

Authoring functions/closures are not saved as continuation state or rerun on restart. Code handlers are resolved from registered, available executable artifacts with a supported runtime contract. An agent's plan is data validated against this finite representation; it is never passed to `eval`, imported as newly trusted code or treated as authority.

Schema compatibility is checked conservatively: matching contract references or an explicitly registered mapping where needed, plus validation of actual values at execution. Do not promise automatic proof of arbitrary JSON Schema subtyping. Structured output proves shape only; business criteria remain separately assessed.

Schematic harness pseudocode, not a Paseo SDK API or executable example:

```ts
const composition = chain(
  route(classifyTask, {
    small: implement,
    broad: workers({ planner: decompose, template: implementPart, bounds }),
  }),
  parallel({ code: codeReview, security: securityReview }, allRequired),
  optimize({ revise, evaluate, stop: criterionAndIterationBounds }),
);

const prepared = WorkflowPrograms.prepare({ composition, registry, contracts, bounds });
// Validated serializable output; prepare does not run classifyTask or a worker.
// Work persists the accepted plan/revisions before admitting its first execution.
```

This illustrates all five patterns and nesting; it does not authorize writes/merges, prove that these named blocks exist, or supply a complete input-mapping schema. The actual workflow uses explicit artifacts/workspaces and registered transformations rather than reviewers implicitly sharing an unversioned mutable directory.

## 3. Preparing and progressing a Run

1. Work durably accepts the Work Item before asking an agent to choose a plan. Planning itself can be an identified Assignment with a Result Contract; the receipt is not delayed until planning finishes.
2. Work obtains the applicable catalog/policy/criteria/resource snapshots through their owners. WorkflowPrograms validates the proposed composition against those permitted inputs. Native profile references remain native-owned; resolved launch inputs record what was actually selected/observed.
3. Work commits the Run, prepared plan, relevant revisions/input references, context selection and pending initial progression. A later configuration edit does not overwrite this snapshot; current authority/revocation is still checked for each action.
4. A progression examines committed state and validated observations, computes a transition and commits resulting state/intents under revision and writer checks. Native/Tool I/O occurs after commit and outside the transaction, as specified in [T02](technical-owner-ingress.md).
5. Agent routing/splitting/evaluation decisions must satisfy their Result Contracts and allowed choices. Code decides whether the resulting transition is permitted. Free-text claims that a step is done cannot advance it.

Transition computation is an internal seam inside Work, not a public `executeNode` protocol. It can be exercised with deterministic inputs without a provider. The external native seam has production and scripted adapters; local durability uses real temporary SQLite/FS.

## 4. Execution identities and continuation

| Event | Persisted identity behavior inherited from D02/GA01 |
| --- | --- |
| Run visits a Workflow Step | Create a distinct Step Run; a stable definition step key is not a Step Run ID |
| Admission denied by pause/authority/capacity | Record the blocker; no new Attempt merely because execution was requested |
| Execution admitted | Record Attempt before dispatch; agent allocation/delivery records its Assignment before sending that work |
| Create/send response uncertain | Reconcile the same effect/Attempt/Assignment; silence does not authorize redispatch |
| Permitted technical retry really redispatches | New Attempt within the same Step Run; agent redispatch creates a new Assignment with predecessor |
| Agent asks for context or continues over several Turns | Preserve Assignment/Attempt unless work is actually redispatched |
| Revision after evaluator feedback revisits a step | New Step Run in the recorded Quality Iteration; technical retry does not itself increment that iteration |
| Late outcome | Retain original source identity; selecting an applicable result is explicit and does not rewrite the old outcome |

Code-only Attempts need no Assignment. Assignments outside workflows need no Step Run. Native Session creation/observation and delivery are separately tracked effects; an unused or uncertain Session is not proof that the Assignment executed. Do not infer a new worker or a human Pause from native idle/canceled state.

An internal default is one active harness-controlled Assignment per native Session, with parallel work using separate Sessions under shared admission. This follows fresh-worker defaults and avoids relying on unproven native queuing semantics. It does not claim control of external manual prompts or establish a new user-visible quota. Any later concurrent-Assignment optimization needs explicit native ordering/context proof.

## 5. Dynamic branches, loops and join

Work stores each permitted expansion with its parent Step Run, request identity, input/decision evidence and revision. WorkflowPrograms validates template/roles/contracts/bounds; Work atomically checks the current branch-set revision and records accepted children. Repeating the same expansion request returns its prior acceptance; it does not create additional workers.

The branch set has a recorded open/closed state. Closing and adding children are serialized local transitions: an addition based on the old revision conflicts after closure. All current workers finishing does not close an open set. Work discovered later becomes a subsequent permitted expansion/iteration, not a silent edit of an aggregate already being assessed.

Default join remains **all-required**, after branch-set closure and valid required outputs. A valid review finding defects is available input with negative quality findings; a missing/invalid mandatory review is unavailable input. Exhausted infrastructure retry preserves other bounded running branches and their results, then records incomplete aggregation. Explicit quorum/fail-fast policy may differ; the runtime cannot change policy just because one branch is slow.

Loops record iteration identity, feedback, stop reason and remaining bounds. Native retry, evaluator revision, decomposition expansion and an orchestrator's chat Turn are distinct events. Hitting a limit creates an honest stopped/blocked/partial result as applicable, not an invented passing Verdict.

Aggregate Outcome references selected branch outcomes, outputs, remaining problems and input/criterion revisions. Criteria assesses it separately. A completed Run does not resolve the Work Item without its applicable criteria/evidence. Reusing an old result requires an applicability check and accessible evidence; the old history stays intact. Release-check reuse retains its narrower same-candidate policy.

## 6. Restart, checkpoint and code-version compatibility

Checkpoint data includes plan/schema reference and accepted expansions, execution identities, committed outputs/context/evidence references, open decisions, current timers, pending operations and selected revisions. It is sufficient to reconstruct the next permitted action, not just a chat summary.

On startup/reconnect, Work reads this state and reconciles native effects/agents before conflicting dispatch. It does not rerun the authoring function, repeat earlier code steps or ask a new LLM to reconstruct history. A missing live signal is repaired through state/native observation; event replay is not assumed. Expired timers retain their original execution identity and still pass current pause/admission checks.

Pause preserves accepted results and events while preventing the controlled new progression/admission described by A11. A result received during Pause can be durably recorded; its arrival does not Resume the owner or launch the next step. Cancellation/timeout records desired/observed state and unresolved effects separately.

An old executable reference needs the actual compatible artifact and dependencies, not merely its digest. Releases must establish that the new runtime can execute the pinned plan/handler contracts, retain needed compatible artifacts, or perform a recorded compatible checkpoint migration. Otherwise affected work remains blocked on the update/continuation path; never substitute the latest handler silently. A database schema version alone is insufficient proof of execution compatibility.

For replanning outside the permitted pinned definition, the proposed simple default is a linked successor Run under the same Work Item, carrying checked reusable artifacts/results and the remaining work. Keep old Outcomes/effect history; do not replay old side effects as part of reuse. This does not forbid the already accepted compatibility-checked checkpoint migration path. It is an engineering default under K21, not a new immutable-domain policy or extra user approval for each task plan.

## 7. Worked interruption trace

1. A Run closes a dynamic worker set and starts Code Review and Security Review. Each delivery has durable identities and actual input/criterion references.
2. Code Review returns a structurally valid report. Security Review times out; its native effect status is uncertain. The join waits; Work does not create a replacement just from the timeout.
3. Plugin reloads. Its SDK/MCP connection is restored under T03; Work reads the same Run/branch set/timer/operation records and observes the old Security Session. No orchestrator Spawn/Replace occurs automatically.
4. Once prior effects are reconciled and retry is permitted/admitted, Security Review receives a new Attempt/Assignment. Code Review is reused only if code/scope/criteria/evidence remain applicable.
5. The old Security result arrives late. It stays linked to the original Attempt/Assignment, without replacing the explicitly selected current result. The aggregate reports actual outputs and any remaining gap; Criteria then assesses it.
6. If revision changes the code and loops back to reviews, those visits get new Step Runs and relevant prior reviews are checked for invalidation. The Work Item stays the same throughout.

This is a design scenario, not executed evidence. It carries existing semantic decisions into a concrete protocol without changing their scope.

## 8. Verification and next slice

Interface cases use a temporary real database/artifact directory: crash at each commit/effect boundary, duplicate expansion versus seal, stale timer/result after retry, pause/result races, nested-loop identity, code-only execution, blocked admission without Attempt, and exact pin/handler incompatibility. Scripted native faults make uncertainty reproducible. Actual Claude/Codex dispatch/MCP/result/cancel/reload behavior still needs 0.12 live/contract proof. Existing historical spikes do not supply those passes.

These cases map to VA04/VA05/VA07/VA13/VA14 and OB06–OB10, alongside existing D02/D03/GA01 requirements. No runtime tests were added or run for this document. Next: Triggers/Work schedule occurrence, native cadence binding, fair shared admission and due-time recovery; then evaluator/Analytics and release coordination. No material new user decision is inferred merely from these types or storage mechanics. T0 remains open.
