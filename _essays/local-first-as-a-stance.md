---
layout: essay
title: Local-First as a Stance
dek: "Local-first is not nostalgia. It is sovereignty."
number: 004.3
sort_key: 0004.03
date: 2025-11-30
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading notes and draft essay editor
  issue: hosted editor outage blocks writing session; sync provider auth degrades mid-draft
  constraint: no new dependencies; persist locally first with optional cloud sync
---

Local-first software stores your data on your device first and the cloud second. The cloud becomes a syncing convenience, not a landlord. Power flows toward the user instead of toward a billing portal that can deprecate you tomorrow.

## Thesis

**Local-first is a sovereignty stance, not a storage optimization.** The design constraint is: the user can read and write their work when the vendor's auth service is having a bad night.

## Context

I draft mystic-bytes essays in a stack that syncs through a hosted editor. One evening the provider's auth degraded — not a full outage, worse: intermittent 401s that looked like user error. My draft existed in a browser tab and nowhere else. I could not save. I could not export without signing in. The words were mine; the gate was not.

That session pushed me to split the pipeline: markdown on disk in the repo as source of truth, preview locally, sync to the site as a publish step rather than a live tether. The essays collection became local-first by accident of git, not by product philosophy — and the philosophy caught up to the architecture.

## Mechanism

Ink & Switch coined *local-first* to name software that is **local by default, collaborative when online, and under user control**.[^1] Martin Kleppmann's CRDT work supplies part of the math for merging concurrent edits without a central arbiter.[^2] The stance is older than the label: git itself is local-first version control that happens to sync through remotes.

**The landlord model inverts risk.** SaaS defaults to: your files live in our bucket, your access flows through our IdP, your export is a feature we may tier. Outages become your problem. Price increases become your problem. Account suspension becomes your problem. The vendor holds the keys; you hold the habit.

**Local-first redistributes failure modes:**

1. **Device loss** — you need backups you control, not only vendor snapshots.
2. **Sync conflicts** — you need merge semantics, not last-write-wins surprise.
3. **Collaboration** — harder than "everyone edits the Google Doc." Not impossible; expensive.

**What you gain:**

- **Availability** — read and write offline; sync is eventual.
- **Latency** — typing is not a round trip.
- **Longevity** — plain files outlive platforms. Markdown in a repo has survived a decade of tool churn.
- **Auditability** — you can diff what changed; you are not clicking through version history UI that may disappear.

On dark-heart-themes I keep theme tokens as files in the repo, not only in a design tool cloud. The Figma link is a view; the contract is on disk. When a hosted service changes export rules, the product does not blink.

**Sovereignty is not anti-cloud.** Sync is valuable. Backups are valuable. Collaboration is valuable. The stance is about **default custody**: the user agent owns the primary copy; the cloud is a replica, not the master.

## Tradeoffs

**Conflict resolution vs simplicity.** CRDTs and OT are engineering heavy. Git-merge on save works for single-writer workflows; multiplayer docs need more machinery.

**Backup burden shifts.** Local-first means you own backup discipline. Time Machine, git push, periodic exports — pick one and automate it. "The vendor backs it up" is no longer the answer.

**Enterprise features lag.** SSO, DLP, centralized admin — cloud landlords sell these. Local-first products must replicate what matters without recentralizing keys.

**When cloud-first wins.** Real-time multiplayer with strict ACLs, compute the client cannot hold, regulated data that must live in a specific region under vendor contract. Local-first is a stance, not a religion.

Treat local-first as a design constraint: primary copy on device or repo you control, sync optional and inspectable, export in an open format without a support ticket. If your users cannot work at 3am when auth flickers, you have not shipped sovereignty — you have shipped dependency.

Write the custody story in the README the way you write the auth story: where bits live, who can revoke access, what works offline.

— JV · Dark Heart Labs.

## References

[^1]: Ink & Switch, "Local-First Software: You Own Your Data, in spite of the Cloud," 2019. The manifesto that named the stance and its seven ideals — the canonical product reference for local-first as intentional design, not offline mode as afterthought.

[^2]: Martin Kleppmann, "Conflict Resolution for Replicated Data Types," and related CRDT surveys; see also Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017). Kleppmann is the leading technical authority on mergeable replicated data — the mechanism layer beneath local-first collaboration.
