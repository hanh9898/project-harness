# Issue tracker: GitHub

Issues and specs live in GitHub Issues for `hanh9898/project-harness`. Use the `gh` CLI; resolve the repository from `origin` and pass `--repo hanh9898/project-harness` when outside this checkout.

## Operations

- Create: `gh issue create --title "..." --body-file <file>`.
- Read: `gh issue view <number> --json number,title,body,labels,comments`.
- List: `gh issue list --state open --json number,title,body,labels`, adding label filters as needed.
- Comment: `gh issue comment <number> --body-file <file>`.
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.

Prepare multiline bodies in a file. Apply the role labels defined in `docs/agents/triage-labels.md`.

## Skill conventions

"Publish to the issue tracker" means create a GitHub issue. "Fetch the relevant ticket" means read that issue and its comments.

**PRs as a request surface: no.**

## Wayfinding

- Map: one issue labelled `wayfinder:map`, containing Notes, Decisions-so-far and Fog.
- Child tickets: one issue per decision/task, labelled `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling` or `wayfinder:task`, and linked through native sub-issues when supported. Otherwise add children to the map's task list and put `Part of #<map>` in each child.
- Blocking: use native GitHub issue dependencies when supported. Otherwise record `Blocked by: #<n>, #<n>` in the child. A ticket is unblocked when all blockers are closed.
- Frontier: open, unblocked, unassigned children, in map order.
- Claim: assign the child to the driving developer before starting.
- Resolve: comment with the answer, close the child, and append a summary/link to Decisions-so-far.

Use `gh api` for native relationships when the installed CLI lacks corresponding flags; use the documented fallback if that capability is unavailable.
