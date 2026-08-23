---
layout: essay
title: How to Review AI-Generated Code Without Outsourcing Judgment
dek: "Your assistant can type faster than you can read. That asymmetry is a trust problem."
number: 006.4
sort_key: 0006.04
date: 2026-02-10
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
hashnode: true
related_projects: [NeuroShell]
brief:
  system: mystic-bytes in Cursor; NeuroShell AI-assisted workflows
  issue: fluent diffs accepted unread; tests cover the happy path the model also guessed
  constraint: judgment stays local; distinct from ChatGPT-as-product and Cursor-as-editor essays
---

A coding assistant can generate faster than you can read. That is a productivity gain only if review keeps pace. There is a product essay about ChatGPT as a subscription object, and an editor essay about Cursor as a buffer with a model in the loop. This is the merge protocol. The model proposes. You own the commit.

## Thesis

**AI pair programming works when judgment stays local.** Fluency is not a test suite. If you would not sign a contract unread, do not merge a diff unread because the font changed color.

## Context

[NeuroShell](https://github.com/jv-darkheartlabs/NeuroShell) treats AI as augmentation for loud minds: plain-English input, session recovery, focus tooling. It does not treat the model as the person who is liable at 2am. mystic-bytes is the daily version of the same boundary. I draft in Cursor from Auckland in 2026. I still read the diff. Voice, footnotes, and whether this essay duplicates another file are not properties `tsc` will catch.

The failure pattern is stable across teams: accept suggestion, run tests, ship. Tests pass because they cover the happy path the model also guessed. The three-second timeout that lives only in a human's memory does not appear in the training set. Bender and colleagues named the underlying confusion: fluent language is not understanding.[^1] Fluent TypeScript is the same trick in a different syntax.

I have merged bad essay sentences because they were nearby and confident. I have merged a helper that renamed a field in half the call sites. Cursor's summary panel said the change was local. The tree said otherwise. Fedora, git, and a slow read would have been enough. Speed was the bug.

## Mechanism

Models are useful for boilerplate that already exists in the repo, test scaffolding for interfaces already documented, refactors that surface repetition you stopped seeing, and first drafts of docs you will rewrite. They do not know undocumented business constraints. They do not feel accountable to a user whose payment hangs. They rarely refuse a plausible wrong answer because the stakes are high.

The protocol I actually use:

Read the diff line by line, not the summary panel. Ask one adversarial question: what breaks if the input is empty, stale, or malicious. Run the tests you already distrust, then add one test for the constraint the model could not know. Reject velocity metrics that count lines accepted without lines understood.

That last line is cultural. GitHub's Copilot research is often quoted for speed and happiness.[^2] Pair it with an internal number that embarrasses you: incidents after AI-heavy PRs, review comments that say "did you read this," time-to-understand in on-call. If those numbers are missing, you are measuring the generator and calling it engineering.

Partnership, not delegation. The useful mental model is a fast, literal colleague who never tires and rarely pushes back. Pushback is your job. Do not outsource it because the suggestion glows. I keep secrets out of the loop. I keep unpublished vendor gossip out. Public docs are citable. The rest is a conversation I should have without pasting the studio into a context window.

Name what changed in the PR, in your own words. If you cannot, you did not review. You attended a generation. mystic-bytes PRs that touch frontmatter and sort keys need a human sentence about ordering. Generated YAML will happily invent a key the collection does not use.

On NeuroShell, anything that shells out or touches session restore gets the boring pass: empty input, cancelled permission, a path that does not exist. The model will generate the happy demo. The product promise is the unhappy path.

## Tradeoffs

Tab-complete helps locally. Architecture still needs a human map of failure domains. I will accept a generated loop. I will not accept a generated auth change I skimmed.

More context improves suggestions and sends more of the studio into a vendor pipeline. Classify what the model may see. Draft essays are drafts. Production secrets are not "context."

Tool optimism versus team norms: the best guardrail is still "show me the diff." Linters catch style. Types catch shape. Neither catches "this timeout is load-bearing and not in the file." That catch is a person who remembers.

Rejecting a fluent patch feels slow. Merging it is slower when it pages you from a different hemisphere. Auckland morning after a US deploy is a bad time to discover you trusted a summary.

## Close

AI amplifies reach. It does not transfer liability. Keep review boring, repeatable, and non-negotiable on auth, money, migrations, and anything that deletes user state.

If you ship one habit this week: no merge without a named human hypothesis for what changed. I still fail that habit when I am tired. The protocol exists because tired is the default at the wrong hour, not because I am virtuous.

— JV · Dark Heart Labs.

## References

[^1]: Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, and Shmargaret Shmitchell, "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?" FAccT (2021). Fluency is not understanding; the reason a green test suite is not a review.

[^2]: GitHub, research on GitHub Copilot and developer productivity. A baseline on speed and satisfaction; pair with internal review and incident metrics rather than treating vendor research as a merge policy.
