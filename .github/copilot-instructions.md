# GitHub Copilot Instructions

These instructions apply to all Copilot-assisted changes in this repository.

## Priorities
- Prefer clarity and maintainability over cleverness.
- Match existing conventions (naming, formatting, folder structure, patterns).
- Keep changes small and focused; avoid unrelated refactors.

## Behavior
- Ask before introducing new dependencies, frameworks, or tooling.
- Avoid generating placeholder code that compiles but is incorrect; prefer an explicit TODO if needed.
- Do not change public APIs (routes, controllers, exported functions, etc.) unless requested.

## Quality
- Add/update tests when behavior changes.
- Update docs/README when setup, usage, or commands change.
- Prefer straightforward error handling and useful error messages.

## Security & privacy
- Never add secrets, tokens, API keys, or real personal data.
- Do not log sensitive data.

## Output format (when responding in PRs/issues)
- Summarize what changed and why (2–5 bullets).
- List commands to run (tests/lint/format) if relevant.
