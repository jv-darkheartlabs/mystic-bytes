---
layout: essay
title: Virtual Memory Is a Lie That Works
dek: "Your process thinks it owns a contiguous machine. It owns a story the kernel maintains."
number: 004.80
sort_key: 0004.80
date: 2026-08-06
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes CI host cover preprocess
  issue: process reported plenty of virtual RAM; host OOM-killed it anyway
  constraint: no hardware add; live with overcommit and cgroup limits
---

Virtual memory is a productive fiction. Each process gets an address space that looks private and contiguous. The hardware and the kernel map that fiction onto frames, swap, and other people's pages. The lie works until it does not — then you meet the OOM killer, a page-fault storm, or a mapping that was never backed.

I use this fiction. I do not implement MMUs. mystic-bytes preprocess has died with plenty of "virtual" memory left because overcommit said yes at `mmap` and no at first touch. The process believed `malloc`. The machine believed physics. That gap is the design: share RAM among more programs than fit, and collect the tax when someone actually writes.

Treat RSS and address-space size as different numbers. Respect cgroup limits. Do not confuse a large `Virt` column with a budget you were promised in metal. Swap is not free RAM; it is a deadline wearing a longer coat. The lie is the operating system doing its job. Your job is not to take the map as inventory.

Ask what is resident, what is promised, and what happens when the promise is called. The address space was never the machine.

— JV · Dark Heart Labs.
