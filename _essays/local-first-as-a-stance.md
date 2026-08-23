---
layout: essay
title: Local-First as a Stance
dek: "The primary copy lives on a disk you control."
number: 004.3
sort_key: 0004.03
date: 2026-01-04
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes essay source on Fedora; optional hosted preview
  issue: hosted editor auth flickers mid-draft; the tab is the only copy
  constraint: no new dependencies; persist locally first; cloud sync optional
---

## Thesis

**Local-first is a sovereignty stance, not a storage optimization.** The user can read and write their work when a vendor's auth service is having a bad night. The cloud is a replica. It is not the landlord.

## Context

I draft mystic-bytes essays as Markdown on disk. That sounds obvious until you remember how easy it is to live in a hosted editor. One evening a provider's auth degraded — not a clean outage, worse: intermittent 401s that looked like I had mistyped a password. The draft existed in a browser tab. I could not save. I could not export without signing in. The words were mine. The gate was not.

That session split the pipeline for good. Files in the repo are the source of truth. I preview locally on Fedora. Cursor edits the buffer that git already sees. Publish is a git push and a Jekyll build, not a live tether to someone else's IdP. Auckland 2026 does not change the custody story. A laptop that works offline still has to work when the ferry Wi-Fi dies.

The collection became local-first by accident of git. The philosophy caught up to the architecture. Ink & Switch had already named the stance. I had been practicing a thin version of it every time I refused to keep the only copy in a tab.

## Mechanism

Ink & Switch coined *local-first* for software that is local by default, collaborative when online, and under user control.[^1] Martin Kleppmann's CRDT work supplies part of the math for merging concurrent edits without a central arbiter.[^2] The stance is older than the label. Git is local-first version control that happens to sync through remotes. mystic-bytes is a git remote with a writing habit.

The landlord model inverts risk. SaaS defaults to: your files live in our bucket, your access flows through our IdP, your export is a feature we may put behind a plan. Outages become your problem. Price increases become your problem. Account suspension becomes your problem. The vendor holds the keys. You hold the habit.

Local-first redistributes failure. Device loss means you need backups you control, not only vendor snapshots. Sync conflicts mean you need merge semantics, not last-write-wins surprise. Collaboration is harder than "everyone opens the Google Doc." Not impossible. Expensive.

What you gain is availability (read and write offline; sync is eventual), latency (typing is not a round trip), longevity (plain files outlive platforms), and auditability (you can `diff`; you are not clicking a history UI that may vanish). Markdown in this repo has already survived tool churn. A hosted canvas has not earned that sentence.

I keep Nightbind operational truth in Postgres I can dump. I keep theme tokens and essay files in git, not only in a design-tool cloud. The Figma link, when it exists, is a view. The contract is on disk. When a hosted service changes export rules, the product does not blink.

Sovereignty is not anti-cloud. Sync is valuable. Offsite backups are valuable. Collaboration is valuable. The stance is default custody: the user agent owns the primary copy. The cloud is a replica you can inspect. If export requires a support ticket, you do not own the work. You rent a view of it.

Cursor complicates the picture without changing the rule. A model in the loop can rewrite a file you still possess. That is fine. A model that only persists inside a vendor workspace is another landlord. I let Cursor touch mystic-bytes because the buffer is a file. I do not let a chat transcript become the only draft.

## Tradeoffs

**Conflict resolution vs simplicity.** CRDTs and operational transform are real engineering. Git-merge on save is enough for a single-writer essay repo. Multiplayer documents need more machinery. Do not buy the machinery for a diary.

**Backup burden shifts.** Local-first means you own backup discipline. Time Machine, `git push`, periodic exports — pick one and automate it. "The vendor backs it up" is no longer an answer. It was never a complete one.

**Enterprise features lag.** SSO, DLP, centralized admin: cloud landlords sell these. A local-first product has to decide which of those matter without recentralizing the keys. Many of them do not matter for a studio this size. Pretending they do is how you end up back in the bucket.

**When cloud-first wins.** Real-time multiplayer with strict ACLs. Compute the client cannot hold. Regulated data that must live in a named region under a vendor contract. Local-first is a stance. It is not a religion. Nightbind's payment path can stay request/response with a hosted processor. The essay files do not have to.

## Close

Treat local-first as a design constraint. Primary copy on a device or repo you control. Sync optional and inspectable. Export in an open format without a ticket. If you cannot write at 3am when auth flickers, you have not shipped sovereignty. You have shipped dependency.

Write the custody story in the README the way you write the auth story: where the bits live, who can revoke access, what works offline. Then keep a file open on Fedora and see whether the sentence is true.

— JV · Dark Heart Labs.

## References

[^1]: Ink & Switch, "Local-First Software: You Own Your Data, in spite of the Cloud," 2019. Seven ideals; local-first as intentional design, not offline mode as afterthought.

[^2]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017), and related CRDT surveys. Mergeable replicated data as the mechanism layer under local-first collaboration.
