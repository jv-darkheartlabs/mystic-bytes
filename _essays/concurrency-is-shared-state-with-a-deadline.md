---
layout: essay
title: Concurrency Is Shared State With a Deadline
dek: "Async is a scheduling story. A race is a shared-state story."
number: 004.76
sort_key: 0004.76
date: 2026-08-04
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes cover preprocess workers
  issue: two jobs wrote the same slug; last writer won; serial tests stayed green
  constraint: existing worker pool; no rewrite onto a new async runtime
---

Concurrency is not "just use async." Async moves when work waits on I/O. Concurrency is what happens when two pieces of work share a file, a row, or a socket and both think they own the next write.

The cover preprocess pool on mystic-bytes taught me that without a new runtime. Two workers picked the same slug, wrote thumbnails, and the last fsync won. Serial tests were green. Production was a race with a deadline: the batch window. `async`/`await` would not have saved it. The bug was shared mutable state without a lock, a partition, or an idempotent upsert. I write pipelines. I do not write the kernel scheduler. The distinction is still mine to keep: asynchrony overlaps latency; races overlap mutation.

If two tasks can touch the same thing, name the thing, name the owner, and name what happens when they disagree. Timeouts are deadlines on waiting. They are not a concurrency strategy. Mutexes, transactions, and single-writer queues are.

Stop selling async as a race cure. It is a wait strategy. Shared state still needs a law, and the law needs a clock — a lock lease, a batch window, a timeout that fails closed instead of hoping the other writer is done.

— JV · Dark Heart Labs.
