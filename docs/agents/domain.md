# Domain docs

## Before exploration

1. Read `GLOSSARY-MAP.md` and the root `GLOSSARY.md`.
2. Follow the map to each glossary relevant to the work: Execution, Automation, Evolution or Analytics. For UI work, also read UI Language; for technical interfaces and identifiers, read Engineering Language.
3. Read relevant decisions in `docs/adr/`. If a referenced domain document is absent, continue; domain-modeling creates new material when terms or decisions are resolved.

## Existing layout

The root glossary owns common language. Additional glossaries live under `docs/domain/*/`, `docs/ui/` and `docs/engineering/`; `GLOSSARY-MAP.md` owns their navigation.

Retain this accepted organization. Glossary groups do not imply separate services, databases or deployment bounded contexts.

## Vocabulary and decisions

- Use canonical English names and definitions from the owning glossary. Use the accepted Vietnamese equivalents and UI mappings where relevant.
- Keep each definition in its owning glossary; reference it from other documents.
- Bring unresolved vocabulary to domain-modeling instead of introducing a competing synonym.
- Surface conflicts with an existing ADR explicitly before proposing a replacement.

## Current design and evidence

Use `docs/design/README.md` to locate current designs and pending technical work. Read each artifact's status: proposed mechanisms, accepted decisions, historical evidence and production verification remain distinct.

Preserve frozen interview/source evidence and its hashes. Record subsequent decisions separately rather than rewriting historical acceptance.
