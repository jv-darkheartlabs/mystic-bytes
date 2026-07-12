---
layout: essay
title: Operating Systems Are Political
dek: "The kernel decides who gets to do what to whom."
number: 005.46
sort_key: 0005.46
date: 2025-06-29
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: CI runner host for mystic-bytes build pipeline
  issue: vision preprocess job OOM-kills neighbor containers; no cgroup limits on shared staging host
  constraint: no downtime; no hardware add; negotiate fairness in software
---

An operating system is a peace treaty between processes that would otherwise eat each other. Scheduling, isolation, permissions — every kernel decision is a choice about who gets to do what to whom, enforced at gunpoint by the hardware.

## Thesis

**The kernel is governance.** Read scheduling, memory limits, and capability rules the way you read policy — because that is what they are, with syscalls instead of statutes.

## Context

The mystic-bytes CI and preprocess jobs share a staging host — one machine, many Docker containers, finite RAM. A vision batch spiked memory during cover OCR; the Linux OOM killer terminated a neighbor container running the merge queue validator. Exit code 137. Logs said nothing about fairness — only that something lost the fight for pages.

Nobody had set cgroup v2 memory limits. We had trusted polite processes on a crowded island. The OS did what OSes do: picked a victim when the treaty broke down. The political question — *who may consume how much of the commons?* — had never been answered in configuration, so the kernel answered with violence.

## Mechanism

Andrew Tanenbaum's textbook framing still holds: operating systems mediate resources — CPU, memory, I/O, namespace — among competing programs.[^1] Multics and Unix history show those mediations are not neutral engineering; they embed assumptions about trust, hierarchy, and blame.[^2]

**Every resource rule is a political choice:**

- **Scheduler priority** — whose work is "nice" and whose is realtime?
- **Memory limits** — does one container starve, or does the OOM killer evict?
- **File permissions** — who may read `/etc/shadow`, and under what role model?
- **Namespaces and cgroups** — what does a process believe exists about the machine?
- **Capabilities vs setuid** — fine-grained power or broad root trust?

**Docker on Linux is not magic isolation.** Containers are processes with extra paperwork. Without limits, they share the host kernel's single treaty. Kubernetes adds another legislature — requests, limits, QoS classes — but someone still writes the policy.

On the shared staging host we encoded the treaty explicitly: memory max on preprocess jobs, lower CPU shares for batch work, merge validator in a protected cgroup with reservation. The vision job still runs; it no longer holds veto power over neighbors. That is resource politics, not perf tuning.

**Userspace repeats the pattern.** macOS privacy prompts — which app may access the camera — are capability politics surfaced in UI. Windows UAC is escalation policy. Mobile sandboxes are the strictest treaties: apps do not share memory because the vendor decided inter-app trust is too expensive.

**Security models are constitutions.** Capability-based systems like seL4 ask: *what if nothing had authority unless explicitly granted?*[^3] Unix asks: *what if root is god and everyone else negotiates?* Your deployment picks a constitution and lives with its failure modes.

The mystic-bytes preprocess fix took an afternoon once we stopped treating OOM as bad luck and started treating it as missing policy. The lesson generalizes: shared infrastructure without explicit limits is a bet that your neighbors are polite forever.

## Tradeoffs

**Fairness vs throughput.** Strict limits prevent OOM cascades; they also leave RAM idle. Right-size per workload; revisit when jobs change.

**Isolation vs ops simplicity.** One process per host is the strongest treaty; it is also the most expensive. Shared hosts demand written policy.

**Portability vs control.** Managed platforms hide kernel politics behind abstractions — until the abstraction leaks and you are reading cgroup docs anyway.

**When defaults suffice.** Single-tenant laptop dev, one service per VM, serverless with vendor-enforced caps — the OS politics are mostly outsourced. The stance matters the moment you share a kernel.

Platform teams should document cgroup and quota policy the way they document API versioning: what is guaranteed, what is best-effort, and who gets paged when the OOM killer speaks. Ambiguity here is not flexibility — it is deferred blame assignment.

Read your deployment the way you would read a constitution: who has power, what are the checks, what happens when the commons is exhausted. If you cannot answer, the kernel will answer for you — and it does not write postmortems.

— JV · Dark Heart Labs.

## References

[^1]: Andrew S. Tanenbaum and Herbert Bos, *Modern Operating Systems* (Pearson, 5th ed.). Tanenbaum is the standard academic reference for OS resource mediation — processes, memory, scheduling — the baseline vocabulary for kernel-as-governance.

[^2]: Fernando J. Corbató, Marjorie Merwin-Daggett, and Robert C. Daley, "An Experimental Time-Sharing System," *Proceedings of the Spring Joint Computer Conference* (1962); and subsequent Multics literature. The Multics lineage established time-sharing as a policy problem — who gets the machine, for how long — not only a hardware problem.

[^3]: Gernot Heiser and Kevin Elphinstone, seL4 microkernel verification program; see also Heiser, "The seL4 Microkernel — An Introduction," 2020s technical summaries. seL4 represents the capability-security pole: formally verified, deny-by-default authority — the reference for OS design as explicit political minimalism.
