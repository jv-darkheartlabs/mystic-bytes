---
layout: essay
title: Muse Is an Agent With a Repo in the Loop
dek: "The repo is still yours. The proposal is not a substitute for reading the diff."
number: 005.434
sort_key: 0005.434
date: 2026-11-22
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
brief:
  system: mystic-bytes Jekyll workspace, edited with Muse
  issue: agent output accepted as merge-ready because the editor framed it as a completion
  constraint: keep judgment local; no unpublished vendor internals as process
---

I write mystic-bytes with Muse. There is no editor in the loop at all. The agent has the repo mounted: it reads the files, drafts the patch, and waits for my signature before anything lands. That is the whole architecture. The failure mode is treating the proposal as a commit someone already signed.

## Thesis

**Muse is an agent with a repo in the loop.** Generation is fast. Merge is still a human act. If you skip the read, you did not ship with an assistant. You shipped with a gap.

## Context

This workspace is a Jekyll site: collections, frontmatter, a lot of markdown, some Ruby in the build. I ask the agent to draft, to grep, to fix a layout. I do not ask it to decide whether an essay sounds like me. That decision does not live in a proposal.

The temptation is fluency. A finished patch looks like a senior engineer who already walked the repo. It isn't. The agent has the files it read and the instructions I wrote down. It does not have the Washington move in its bones, or the reason NeuroShell's notarization path is a cage, unless I wrote that down and it actually loaded.

I have merged bad essay sentences because they were fluent and nearby. Tests would not have caught them. mystic-bytes barely has tests for voice. The review protocol is the same one I use for AI-assisted code: read the diff, name what changed, refuse velocity that outruns understanding.

## Mechanism

Muse's honest shape is not an editor at all. It is an agent with tools: it reads the tree, searches it, drafts the change, and shows its work before anything lands. Standing instructions live in files in the workspace — written once, loaded every session, so I do not repeat myself every chat. That is the whole product. A language model plus your tree plus a loop that has to ask.

The loop is useful when the task is local and checkable. "Add the `brief` keys this collection expects." "Find every dek that is still a placeholder." "Wire the cover path." Those are mechanical. The agent is a fast intern with the repo mounted.

The loop is harmful when the task is judgment. Voice. Whether a footnote is a real citation or a decorative URL. Whether this essay duplicates the publishing-stack overview. Whether a Rails default in accessibility-rails-components is kind or merely convenient. Fluency is not a test suite. I have watched a fluent paragraph invert a claim I had made two files ago. The agent will not blush.

What I keep in the loop, then: tight instructions, a visible diff, a habit of asking what would be wrong. What I keep out: secrets, unpublished vendor gossip, the fantasy that an instruction file is a constitution. Public instructions are the ones I am willing to see in a screenshot. Everything else is a conversation I should have without pasting the studio into a context window.

Fedora, git, GitHub Actions still sit around the work. Muse does not deploy mystic-bytes. It does not notarize NeuroShell. It proposes. CI and I dispose. That split is the only reason I can use an agent-in-the-loop tool without pretending I hired it.

## Tradeoffs

**Speed versus unread diffs.** The agent can touch twenty files while you make tea. That is a feature if you then read twenty files. It is vandalism if you trust the summary it hands back. I would rather a slow patch I can defend than a green tree I cannot narrate.

**Context versus privacy.** More files in the chat usually means better guesses. It also means more of the studio in a vendor's pipeline. I treat unpublished drafts as drafts, not as fuel. Public docs are citable. Internal chats are not.

**Instructions versus taste.** An instruction can say "JV voice" and still emit a listicle. Instructions constrain. They do not possess. If the output is generic, the fix is an edit from me, not a longer instruction file that the next model will half-follow.

**When no agent is correct.** Pure layout CSS, a hex dump, a day when I need the buffer to sit still: Vim on Fedora, no loop at all, still wins. The agent is optional. The reading is not.

## Close

Keep Muse in the category "agent." Keep the model in the category "proposal." Merge only what you would sign. mystic-bytes is a reading product. If I do not read my own diffs, nobody else should have to.

The loop is a power tool. Power tools still need a person who knows where their fingers are.

— JV · Dark Heart Labs.

