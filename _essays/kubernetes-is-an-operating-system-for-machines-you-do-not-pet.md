---
layout: essay
title: Kubernetes Is an Operating System for Machines You Do Not Pet
dek: "Borg's grandchildren. Not a laptop. Not this studio's daily driver."
number: 005.439
sort_key: 0005.439
date: 2026-08-01
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: industry default for scheduling containers across a cluster
  issue: cargo-culting k8s onto a Jekyll site and a Fedora workstation
  constraint: honest non-use at DHL; cite Borg and Kubernetes docs, not invented cluster ops
---

Kubernetes is how you treat a pile of machines as one computer you will not ssh into for fun. I do not run it for Dark Heart Labs. mystic-bytes is Jekyll on GitHub Pages. The writing laptop is Fedora. NeuroShell is a Mac app. There is no cluster to pet, and I will not pretend a `Deployment` YAML would make the essays more true.

The idea is older than the logo. Google's Borg paper described large-scale cluster management as a service: schedule work, isolate it, replace the machine without replacing the job.[^1] Kubernetes is the public, API-shaped descendant of that stance.[^2] Pods, schedulers, and desired state are the interface. The node is livestock.

Use it when the failure domain is "a rack," not "my SSD." Pages and a VPS are allowed to stay small. Orchestrators are for the fleet you refuse to name individually. I read the docs so I can talk to people who do run fleets. I do not owe the CNCF a Helm chart for a static site.

— JV · Dark Heart Labs.

## References

[^1]: Abhishek Verma et al., "Large-scale cluster management at Google with Borg," EuroSys 2015.

[^2]: Kubernetes Documentation, "Kubernetes Components," <https://kubernetes.io/docs/concepts/overview/components/>.
