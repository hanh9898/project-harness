# Sources for organizing project terminology

Research checked 2026-10-22. This note uses only `GLOSSARY.md` and `docs/design/scope-80-20.md` for project context. It does not audit the prototype, verify Paseo capabilities, or decide architecture. The organization below is a proposal for discussion, not an adopted documentation structure.

## What the classical DDD source establishes

Eric Evans's *Domain-Driven Design Reference* (2015), published by Domain Language, is the primary reference. Page numbers below are printed pages; PDF viewer pages are seven higher.

- **Ubiquitous Language:** shared, model-based language connects domain experts, developers, discussion, and code. Improving expressions can improve the model itself. This is more than collecting definitions. See [Ubiquitous Language, pp. 3–4](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf#page=10).
- **Bounded Context:** explicitly delimit where a model applies and maintain consistent meanings inside that boundary. Team organization, application usage, codebases, and schemas can express its scope. See [Bounded Context, p. 2](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf#page=9).
- **Context Map:** identify existing contexts and describe their contacts, translations, sharing, isolation, and influence. Map current reality before proposing transformation. See [Context Map, p. 29](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf#page=36).

These sections do **not prescribe separate domain, screen-language, and code-language glossary files**. That conclusion concerns this reference, not every DDD publication. Such a split would be our documentation convention, not a classical DDD requirement.

## UI wording has a different audience

Jakob Nielsen's first-party [10 Usability Heuristics, §2, Match Between the System and the Real World](https://www.nngroup.com/articles/ten-usability-heuristics/#2-match-between-the-system-and-the-real-world) recommends familiar user vocabulary instead of internal jargon; §4 asks for consistency. This supports choosing comprehensible screen wording without requiring every implementation identifier to appear on screen. It does not establish a glossary file format or a bounded-context boundary.

My synthesis: distinguish meaning from presentation. A user-facing label may be shorter or localized while still referring to the same domain concept. Conversely, a friendly label becomes misleading if it merges objects with different consequences. A screen glossary should record the relationship explicitly rather than silently create a second business model.

## Candidate organization for this repo

The following is a local proposal only. No additional glossary files are created by this research.

1. **Domain terminology:** retain confirmed meanings, distinctions, and avoided synonyms in `GLOSSARY.md`. Its existing distinctions include Workflow Definition versus Workflow Run, Job versus Schedule, and Agent Session versus Agent Turn. These provide useful anchors when discussing new wording. Link to the owning definition instead of copying it into every document.
2. **Screen language:** a possible companion file could record the displayed Vietnamese/English term, intended audience, referenced domain concept, screen location, and wording rationale. Record provisional labels as provisional. If one label represents several concepts, explain when each meaning applies rather than implying equivalence.
3. **Code language:** another possible companion could connect a domain concept to actual type, field, enum, API, or storage names. Separate verified identifiers from proposed identifiers. Technical mechanisms without domain meaning can have their own explanations; they need not be promoted into business vocabulary.

These are views for different readers. More files create a maintenance obligation: changes need traceable links, and conflicting definitions need resolution. File count alone does not improve conceptual clarity. Nothing in this note settles filenames, ownership, or the final entry template.

## Caveats for the parallel terminology audit

**UI and backend layers are not automatically bounded contexts.** Evans treats layering separately in [Layered Architecture, p. 10](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf#page=17). The inference for this repo is that presentation placement alone cannot establish a model boundary. Separate glossaries, panels, processes, or the two orchestrator names likewise do not prove separate contexts. That requires investigation of meanings and responsibilities; this note makes no such assignment.

**A glossary is not a state-machine specification.** This is a practical documentation distinction, not a quoted Evans rule. Defining Run, Turn, retry, or recovery does not specify allowed transitions, guards, authority, side effects, persistence, or failure handling. The scope document requires durable execution and reconciliation after uncertain effects. Those behaviors need explicit contracts and verification beyond terminology; listing state names would not supply them.

For the parent audit, ask whether a proposed wording preserves the existing concept, introduces an audience-specific label, names an implementation mechanism, or proposes a new concept. Treat unresolved mappings as questions. Neither these external sources nor a polished prototype can confirm a local architecture decision or a runtime capability.
