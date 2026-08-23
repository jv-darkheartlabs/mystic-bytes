---
layout: essay
title: Queues Move the Failure in Time
dek: "A job queue does not delete the error. It schedules the error for later."
number: 004.78
sort_key: 0004.78
date: 2026-08-05
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes cover ingest jobs
  issue: poison payload retried until healthy jobs starved
  constraint: existing retry budget; add a dead-letter path, not a new broker
---

A queue is a courtesy to the present. It takes a failure that would have blocked the request and files it for a worker who was not in the room. That is mercy. It is also how poison lives longer.

I consume job queues. I do not write brokers. Cover ingest on mystic-bytes retried a corrupt payload because retry looked like resilience. The worker crashed, the job returned, the crash returned. Healthy jobs waited. The failure had not vanished. It had a schedule. Retries help transient faults: timeouts, rate limits, blips. They punish permanent faults (bad bytes, a missing field, a bug in the handler) unless you cap attempts and park the poison where a human can see it.

Idempotency still matters. At-least-once is the usual delivery deal. Exactly-once is a story you tell after duplicates are safe. Dead-letter the rest. Alert on depth and age, not only on whether the queue process is up. A silent retry loop is an outage with better uptime graphs.

Move the failure in time on purpose. Do not confuse delay with repair. The job is not done because it left the request path. It is done when a worker succeeds or a human accepts the poison.

— JV · Dark Heart Labs.
