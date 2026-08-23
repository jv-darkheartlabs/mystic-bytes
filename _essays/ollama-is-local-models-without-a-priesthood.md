---
layout: essay
title: Ollama Is Local Models Without a Priesthood
dek: "A binary, a pull, a run. The MLOps channel was optional."
number: 006.53
sort_key: 0006.53
date: 2026-07-30
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [ai]
brief:
  system: local model runner on a Fedora workstation
  issue: local inference treated as an MLOps program instead of a CLI that pulls weights
  constraint: public Ollama docs; local use; distinct from the eval-priesthood essay
---

Ollama is local models without a priesthood. You install a binary, you `ollama pull`, you `ollama run`, and a model answers on your machine. No cluster ticket. No MLOps channel. No permission from a lab beyond the license on the weight.

I run that pattern on Fedora when I want a completion that does not leave the desk. I do not run a GPU farm. The priesthood this skips is the one that used to sit between "I want a model" and a Python env with CUDA, a Hub token, and a blog post from 2023. Ollama wrapped llama.cpp-shaped work in a Docker-ish UX. That is a product.

Local is not free. Disk, RAM, a model smaller than the hosted one, and the same evaluation problem I already wrote about: fluency is not a test. Fixtures still matter. What you get is custody. The weights sit next to the essays. The vendor cannot quietly swap the SKU overnight, though the file you pulled can still be wrong, stale, or licensed in a way you ignored.

Use Ollama when the job can tolerate a local model and you want the bytes at home. Do not use it as a personality. It is a runtime. The priesthood was optional. The golden set is not. A local llama that invents a catalog number is still a fail, just a fail that never left the laptop.

— JV · Dark Heart Labs.

[^1]: Ollama documentation (`pull`, `run`, local model library). Public CLI as the anti-priesthood interface; evaluation remains a separate job.
