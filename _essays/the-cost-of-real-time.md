---
layout: essay
title: The Cost of Real-Time
dek: "Sub-second is a different product."
number: 005.276
sort_key: 0005.276
date: 2025-07-06
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: darkheartlabs Twitch overlay and Nightbind live session feed
  issue: poll-based updates lag 30s; product wants sub-second viewer counts
  constraint: no downtime; no schema break; ship before weekend stream
---

## Thesis

Real-time is not a feature bolted onto a batch architecture — it is a **different consistency model** with different failure modes, and teams routinely under-budget the leap.

## Context

The darkheartlabs streaming stack started poll-based: overlay fetched viewer counts and chat highlights on a thirty-second interval. Fine for VOD-era assumptions. Nightbind's live session feed wanted sub-second presence — who is in the room, who just rolled, what the GM pushed to the table. The demo worked with a websocket and a Redis pub/sub channel. Production load on a Friday stream revealed the back-of-house was still designed for batch: PostgreSQL as source of truth, no conflict rules for concurrent edits, retry semantics that assumed idempotent reads not fan-out writes.[^1]

Teams treat real-time as a sprint. It behaves like a re-platform. The weekend stream deadline did not care about our architecture debt — viewers expected dice rolls to appear when they happened, not when PostgreSQL finished catching up.

## Mechanism

**Push vs poll changes the contract.** Polling hides latency behind a refresh interval; users learn the UI is eventually current. Push promises *now* — and breaks trust the first time *now* is wrong. Optimistic UI, conflict resolution, ordering guarantees, and backoff when the socket drops are not polish. They are the product.

**The hot path moves.** In poll architecture, the database answers questions when asked. In push architecture, events flow continuously; the database becomes a checkpoint, not the conversation. Martin Kleppmann's framing applies: stream processing and OLTP solve different problems; merging them without naming which is authoritative produces ghosts — states the UI shows that no single store believes.[^2]

**Failure modes multiply.** Poll failure means stale data until the next tick. Push failure means silent disconnect, duplicate delivery, or messages arriving out of order. Each requires explicit design: heartbeats, replay buffers, client-side merge rules, server-side idempotency keys. The Nightbind feed learned this when a reconnect storm after a router blip double-applied dice results until we added event IDs and last-seen cursors.

**Operational cost.** Real-time systems need monitoring on lag, queue depth, and connection churn — metrics batch products often lack until incident. On-call playbooks written for HTTP 500s do not cover *half the clients think the session ended.*

**Human expectations.** Sub-second updates train users to treat the UI as truth. Batch-trained users forgive refresh delay; real-time-trained users file bugs when latency exceeds a few hundred milliseconds. You are buying a stricter SLA with your users' nervous systems, not just your infrastructure.

On the darkheartlabs overlay, we kept poll for historical viewer graphs — thirty seconds is honest for analytics — and moved only presence and live alerts to push. Splitting channels let us pay real-time costs where the product promise required *now* and avoid re-architecting the entire stats pipeline for a metric nobody watches frame-by-frame.

## Tradeoffs

**Websocket vs SSE vs poll.** Server-Sent Events are simpler for one-way fan-out; websockets for bidirectional. Poll remains valid when thirty-second staleness is honest product semantics — dashboards, non-critical counts. Choosing push for vanity metrics is how you pay real-time prices for batch value.

**Strong vs eventual consistency.** Strong consistency at scale is expensive; eventual is honest if the UI says so. Nightbind chose eventual with explicit merge for concurrent edits and strong only for payment-adjacent flows — money keeps the old request/response path.

**Build vs buy.** Managed pub/sub (Ably, Pusher, Supabase Realtime) trades vendor cost for ops headroom. Self-hosted Redis streams trades money for on-call surface. Neither removes the need to model conflicts in application code.

**When not to go real-time.** If the user cannot act on the information within a second, sub-second delivery is theater. Audit logs, analytics, email digests — batch is a feature, not a failure.

If real-time is the requirement, scope it as architecture: event schema, ordering rules, reconnect story, observability, and the product copy that sets latency expectations. A websocket on top of a batch core is wishful thinking with extra moving parts. We shipped Nightbind's feed by naming the event log authoritative for presence and demoting Postgres to periodic snapshot — not by shortening the poll interval and calling it done. Ask whether the user can act on sub-second data before you pay sub-second prices.

— JV · Dark Heart Labs.

## References

[^1]: Pat Helland, "Life Beyond Distributed Transactions," *ACM Queue* 14:5 (2016). Helland's essay is the standard reference for why real-time and strongly consistent distributed state are incompatible without explicit architectural partition — the authority on treating "now" as a negotiated lie.

[^2]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017), ch. 11–12 on stream processing and event sourcing. Kleppmann is the definitive modern authority on when logs, not queries, should be the system of record.

[^3]: Jake Archibald, "In The Loop" and related writing on browser event loops, timers, and the gap between perceived and actual UI freshness — practical grounding for why push semantics collide with render timing on the client.
