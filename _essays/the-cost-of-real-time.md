---
layout: essay
title: The Cost of Real-Time
dek: "Sub-second is a different product."
number: 005.276
sort_key: 0005.276
date: 2026-01-24
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind live session feed; mystic-bytes remains a static Jekyll site
  issue: poll-based updates lag; product wants sub-second presence
  constraint: no downtime; no schema break; do not re-platform the batch core
---

## Thesis

**Real-time is a different consistency model, not a feature you bolt onto a batch architecture.** The failure modes change. Teams routinely under-budget the leap.

## Context

mystic-bytes is a static site. Jekyll builds HTML. GitHub Pages serves files. Thirty seconds of staleness after a push is honest. Readers do not need to see a new essay the instant my Fedora disk flushes. That is batch, and batch is a feature.

Nightbind's live session feed wanted a different promise: who is in the room, who just rolled, what the table just received. A demo with a websocket and a pub/sub channel looked like a sprint. Production load showed the back-of-house was still designed for batch. PostgreSQL as source of truth. No conflict rules for concurrent edits. Retry semantics that assumed idempotent reads, not fan-out writes.[^1]

I am not running a planet-scale store. I am running a product that told people *now* and a writing site that correctly says *soon*. Mixing those promises is how you pay real-time prices for batch value. Auckland 2026 does not require a live cursor on an essay. A TTRPG table does require dice to appear when they happened, not when a poll woke up.

Cursor will scaffold a websocket before it asks whether the user can act on the data in a second. That is a product question wearing a library install.

## Mechanism

Push versus poll changes the contract. Polling hides latency behind a refresh interval. Users learn the UI is eventually current. Push promises *now*, and it breaks trust the first time *now* is wrong. Optimistic UI, conflict resolution, ordering, and backoff when the socket drops are not polish. They are the product.

The hot path moves. In a poll architecture, the database answers questions when asked. In a push architecture, events flow continuously. The database becomes a checkpoint, not the conversation. Kleppmann's split still holds: stream processing and OLTP solve different problems. Merge them without naming which is authoritative and you get ghosts — states the UI shows that no single store believes.[^2]

Failure modes multiply. Poll failure means stale data until the next tick. Push failure means silent disconnect, duplicate delivery, or messages arriving out of order. Each needs design: heartbeats, replay buffers, client-side merge rules, server-side idempotency keys. Nightbind learned this when a reconnect after a router blip double-applied dice until we added event IDs and last-seen cursors.

Operational cost shows up as metrics batch products often lack: lag, queue depth, connection churn. On-call playbooks written for HTTP 500s do not cover "half the clients think the session ended."

Human expectations shift with the promise. Sub-second updates train people to treat the UI as truth. Batch-trained readers forgive a refresh. Real-time-trained players file bugs when latency exceeds a few hundred milliseconds. You are buying a stricter SLA with nervous systems, not only with infrastructure. The browser's event loop already lies about freshness; push semantics collide with render timing whether you read Archibald or not.[^3]

On a personal overlay I once tried for viewer counts, I kept poll for the graph — thirty seconds is honest for a number nobody acts on frame-by-frame — and moved only presence-like alerts to push. Splitting channels let me pay real-time cost where the promise required *now*. Nightbind did the same split later: presence and table events on a log; Postgres as periodic snapshot. mystic-bytes never needed the split. Static HTML is allowed to be still.

## Tradeoffs

**Websocket vs SSE vs poll.** Server-Sent Events are simpler for one-way fan-out. Websockets for bidirectional. Poll remains valid when thirty-second staleness is honest product semantics — dashboards, non-critical counts, a Jekyll site. Choosing push for vanity metrics is how you rent a socket farm for a badge.

**Strong vs eventual consistency.** Strong consistency at scale is expensive. Eventual is honest if the UI says so. Nightbind chose eventual with explicit merge for concurrent table edits, and kept request/response for payment-adjacent flows. Money kept the old path.

**Build vs buy.** Managed pub/sub trades vendor cost for ops headroom. Self-hosted streams trade money for on-call surface. Neither removes the need to model conflicts in application code.

**When not to go real-time.** If the user cannot act on the information within a second, sub-second delivery is theater. Audit logs, analytics, email digests, essay deploys: batch is a feature. mystic-bytes should stay boring.

## Close

If real-time is the requirement, scope it as architecture: event schema, ordering rules, reconnect story, observability, and the copy that sets latency expectations. A websocket on top of a batch core is wishful thinking with extra moving parts.

We shipped Nightbind's feed by naming the event log authoritative for presence and demoting Postgres to a snapshot. We did not shorten the poll interval and call it done. Ask whether the user can act on sub-second data before you pay sub-second prices. Then leave the writing site in the batch world, where it belongs.

— JV · Dark Heart Labs.

## References

[^1]: Pat Helland, "Life Beyond Distributed Transactions," *ACM Queue* 14, no. 5 (2016). Why "now" across nodes is a negotiated lie unless you partition the problem.

[^2]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017), ch. 11–12. When logs, not queries, should be the system of record.

[^3]: Jake Archibald, "In The Loop" (talk and related writing). Browser event loops, timers, and the gap between perceived and actual UI freshness.
