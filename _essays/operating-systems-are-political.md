---
layout: essay
title: Operating Systems Are Political
dek: "The kernel decides who gets to do what to whom."
number: 005.46
sort_key: 0005.46
date: 2026-01-28
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Fedora workstation running Jekyll, cover-preprocess, Cursor, and a browser
  issue: a memory spike in preprocess starves the neighbor; no explicit limits
  constraint: no new hardware; negotiate fairness in software
---

## Thesis

**The kernel is governance.** Read scheduling, memory limits, and capability rules the way you read policy. That is what they are, with syscalls instead of statutes.

## Context

I do not run a fleet. I run Fedora. On a working afternoon the neighbors are Jekyll, `cover-preprocess.py`, Firefox, and Cursor. Finite RAM. A vision-adjacent crop batch spiked during a cover import; the Linux OOM killer picked a victim. Exit 137. Logs said nothing about fairness. They said something lost the fight for pages.

Nobody had set a memory ceiling on the preprocess. I had trusted polite processes on a crowded laptop. The OS did what operating systems do: picked a victim when the treaty broke down. The political question — who may consume how much of the commons? — had never been answered in configuration, so the kernel answered with violence.

GitHub Actions outsources a different constitution. `ubuntu-latest` has vendor-enforced caps. I do not write those cgroups. I live under them. Auckland 2026 does not add RAM to either machine. It adds a reason not to pretend OOM is weather.

## Mechanism

Andrew Tanenbaum's textbook framing still holds. Operating systems mediate CPU, memory, I/O, and namespace among competing programs.[^1] Multics and Unix history show those mediations are not neutral engineering. They embed assumptions about trust, hierarchy, and blame.[^2] Time-sharing was a policy problem first: who gets the machine, for how long.

Every resource rule is a political choice. Scheduler priority decides whose work is "nice" and whose is realtime. Memory limits decide whether one job starves or the OOM killer evicts. File permissions decide who may read `/etc/shadow`, and under what role model. Namespaces and cgroups decide what a process believes exists about the machine. Capabilities versus setuid decide whether power is fine-grained or root is god.

Docker on Linux is not magic isolation. Containers are processes with extra paperwork. Without limits they share the host kernel's single treaty. Kubernetes adds another legislature — requests, limits, QoS classes — but someone still writes the policy. A studio that does not run Kubernetes still writes policy. `nice`, systemd slices, and "don't start the batch while the browser has thirty tabs" are policy. I encoded a small treaty on Fedora: preprocess gets a memory max; the merge of essays does not. The crop job still runs. It no longer holds veto power over the editor.

Userspace repeats the pattern. macOS privacy prompts — which app may use the camera — are capability politics in UI. Windows UAC is escalation policy. Mobile sandboxes are the strictest consumer treaties: apps do not share memory because the vendor decided inter-app trust is too expensive. I daily-drive Fedora. NeuroShell ships on macOS. None of that makes the politics optional. It changes which constitution you are reading.

Security models are constitutions. Capability systems like seL4 ask what if nothing had authority unless explicitly granted.[^3] Unix asks what if root is god and everyone else negotiates. Your deployment picks a constitution and lives with its failure modes. Shared infrastructure without explicit limits is a bet that your neighbors stay polite forever. They will not. A cover batch does not know about your Cursor window.

The preprocess fix took an afternoon once I stopped treating OOM as bad luck and started treating it as missing policy. The lesson generalizes past my laptop. The moment two workloads share a kernel, you are in politics. CI just hides the minutes behind a yellow check.

I used to restart Firefox and call it operations. That is a folk treaty. It works until a batch and an editor start in the same five minutes because Cursor launched a helper and I forgot. Written limits survive that kind of forgetting. Folk treaties do not.

## Tradeoffs

**Fairness vs throughput.** Strict limits prevent OOM cascades. They also leave RAM idle. Right-size per workload. Revisit when the job changes. A 2:3 crop is not the same job as a Jekyll rebuild of the whole writing set.

**Isolation vs ops simplicity.** One process per host is the strongest treaty. It is also the most expensive. A shared workstation demands written policy, even if the policy is a comment in a Makefile.

**Portability vs control.** Managed platforms hide kernel politics behind abstractions until the abstraction leaks and you are reading cgroup docs anyway. Pages hid them until the Action ran out of minutes. Then the constitution was a YAML file I did not write.

**When defaults suffice.** Single-tenant laptop work with one heavy job at a time. Serverless with vendor-enforced caps. The stance matters the moment you share a kernel on purpose. mystic-bytes shares one all afternoon.

## Close

Document cgroup and quota policy the way you document API versioning: what is guaranteed, what is best-effort, and who notices when the OOM killer speaks. Ambiguity here is not flexibility. It is deferred blame assignment.

Read your machine the way you would read a constitution. Who has power. What are the checks. What happens when the commons is exhausted. If you cannot answer, the kernel will answer for you. It does not write postmortems.

— JV · Dark Heart Labs.

## References

[^1]: Andrew S. Tanenbaum and Herbert Bos, *Modern Operating Systems* (Pearson). Processes, memory, scheduling — the baseline vocabulary for kernel-as-governance.

[^2]: Fernando J. Corbató, Marjorie Merwin-Daggett, and Robert C. Daley, "An Experimental Time-Sharing System," *Proceedings of the Spring Joint Computer Conference* (1962), and subsequent Multics literature. Time-sharing as policy: who gets the machine.

[^3]: Gernot Heiser, "The seL4 Microkernel — An Introduction," and the seL4 verification program. Capability security: deny-by-default authority, formally checked.
