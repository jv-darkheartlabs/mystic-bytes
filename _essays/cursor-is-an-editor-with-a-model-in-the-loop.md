---
layout: essay
title: Cursor Is an Editor With a Model in the Loop
dek: "The buffer is still yours. The loop is not a substitute for reading the diff."
number: 005.434
sort_key: 0005.434
date: 2026-08-12
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
brief:
  system: mystic-bytes Jekyll workspace in Cursor
  issue: agent output accepted as merge-ready because the editor framed it as a completion
  constraint: keep judgment local; no unpublished vendor internals as process
---

I write mystic-bytes in Cursor. The window looks like an editor because it is one: buffers, git, a file tree, a terminal. A model sits in the loop. That is the whole architecture. The failure mode is treating the loop as a colleague who already signed the commit.

## Thesis

**Cursor is an editor with a model in the loop.** Generation is fast. Merge is still a human act. If you skip the read, you did not ship with an assistant. You shipped with a gap.

## Context

This workspace is a Jekyll site: collections, frontmatter, a lot of markdown, some Ruby in the build. I ask the agent to draft, to grep, to fix a layout. I do not ask it to decide whether an essay sounds like me. That decision does not live in a completion.

The temptation is layout. Tab looks like compiler output. Agent looks like a senior engineer who already walked the repo. Neither is true. The model has the files you indexed and the rules you published. It does not have the Auckland 2026 move in its bones, or the reason NeuroShell's notarization path is a cage, unless you wrote that down and it actually loaded.

I have merged bad essay sentences because they were fluent and nearby. Tests would not have caught them. mystic-bytes barely has tests for voice. The review protocol is the same one I use for AI-assisted code: read the diff, name what changed, refuse velocity that outruns understanding.

## Mechanism

Cursor's public docs describe an editor with Tab, Agent, and project rules — standing instructions the agent should follow so you do not repeat yourself every chat.[^1] Rules are prompts with metadata: when they apply, which globs they attach to, whether they are always on.[^2] That is the honest product. A language model plus your tree plus a loop that can edit files.

The loop is useful when the task is local and checkable. "Add the `brief` keys this collection expects." "Find every dek that is still a placeholder." "Wire the cover path." Those are mechanical. The model is a fast intern with the repo mounted.

The loop is harmful when the task is judgment. Voice. Whether a footnote is a real citation or a decorative URL. Whether this essay duplicates the publishing-stack overview. Whether a Rails default in accessibility-rails-components is kind or merely convenient. Fluency is not a test suite. I have watched a fluent paragraph invert a claim I had made two files ago. The editor will not blush.

What I keep in the loop, then: tight prompts, a visible diff, a habit of asking what would be wrong. What I keep out: secrets, unpublished vendor gossip, the fantasy that a rule file is a constitution. Public rules are the ones I am willing to see in a screenshot. Everything else is a conversation I should have without pasting the studio into a context window.

Fedora, git, GitHub Actions still sit around the editor. Cursor does not deploy mystic-bytes. It does not notarize NeuroShell. It proposes. CI and I dispose. That split is the only reason I can use a model-in-the-loop tool without pretending I hired it.

## Tradeoffs

**Speed versus unread diffs.** The agent can touch twenty files while you make tea. That is a feature if you then read twenty files. It is vandalism if you trust the summary panel. I would rather a slow patch I can defend than a green tree I cannot narrate.

**Context versus privacy.** More files in the chat usually means better guesses. It also means more of the studio in a vendor's pipeline. I treat unpublished drafts as drafts, not as fuel. Public docs are citable. Internal chats are not.

**Rules versus taste.** A rule can say "JV voice" and still emit a listicle. Rules constrain. They do not possess. If the output is generic, the fix is an edit from me, not a longer rule that the next model will half-follow.

**When a dumb editor is correct.** Pure layout CSS, a hex dump, a day when I need the buffer to sit still: VS Code without the loop, or Vim on Fedora, still wins. The model is optional. The editor is not.

## Close

Keep Cursor in the category "editor." Keep the model in the category "proposal." Merge only what you would sign. mystic-bytes is a reading product. If I do not read my own diffs, nobody else should have to.

The loop is a power tool. Power tools still need a person who knows where their fingers are.

— JV · Dark Heart Labs.

## References

[^1]: Cursor Documentation, <https://cursor.com/docs>. Public product docs for the editor, Tab, and Agent — the supported description of a model in the editing loop.

[^2]: Cursor Docs, "Rules," <https://cursor.com/docs/rules>. Project and user rules as standing instructions for Agent, including how `.mdc` files and `AGENTS.md` attach to a workspace.
