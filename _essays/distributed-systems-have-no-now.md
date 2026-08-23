---
layout: essay
title: Distributed Systems Have No Now
dek: "There is no shared instant. There are messages, delays, and partitions."
number: 004.77
sort_key: 0004.77
date: 2026-08-04
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes CI runner vs production host clocks
  issue: artifact stamped "now" on the runner looked in the past on the host
  constraint: no global NTP I control; encode causality in artifacts, not wall clocks
---

There is no now that both machines agree on. There are clocks that drift, messages that arrive late, and partitions that make the other side a rumor until the network heals.

I am not running a planet-scale store. I run CI, a host, and a browser. That is already distributed. A mystic-bytes deploy job stamped artifacts with the runner's clock; the site host was minutes off. A freshness check decided the new build lived in the past. NTP is a courtesy, not a consensus protocol. When a partition happens — laptop offline, Actions cache split, DNS half-updated — each side has a perfectly sincere now, and they do not match.

Lamport's point was not "buy better clocks." It was that happened-before is the ordering you can defend, and simultaneous is often a fiction.[^1] The operational habit is cheaper than rereading the paper: put versions and causal IDs on artifacts. Do not compare wall times across nodes and call it truth.

If you need a now, you need a single writer or a protocol. A timestamp copied between machines is neither. Partitions do not pause the clocks. They just stop the gossip.

— JV · Dark Heart Labs.

[^1]: Leslie Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System," *Communications of the ACM* 21, no. 7 (1978).
