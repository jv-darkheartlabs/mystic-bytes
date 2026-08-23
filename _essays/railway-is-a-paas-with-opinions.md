---
layout: essay
title: Railway Is a PaaS With Opinions
dek: "Private DNS, volumes, and sleep are the product. The git-push demo is the brochure."
number: 005.451
sort_key: 0005.451
date: 2026-08-19
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['ops']
type: pillar
brief:
  system: Dark Heart Labs self-hosted scheduler on Railway versus mystic-bytes on Pages
  issue: treating Railway as a prettier VPS and discovering networking, disk, sleep, and cost only in the invoice
  constraint: platform thesis only; do not clone the multi-service checklist or the scheduler deploy narrative
---

Railway's demo is a git push and a URL. That is real, and it is the brochure. The product is opinions about how services talk, what survives a deploy, whether a process may sleep, and how that shows up as money. I already wrote the scheduler deploy and the multi-service checklist. Those are runbooks. This is the platform.

mystic-bytes does not live here. The writing site is Jekyll on GitHub Pages. I use Railway when I need processes, a database, and a private network I do not want to invent on a VPS. Fedora is the laptop. Railway is the rented runtime with a canvas instead of an SSH habit.

## Thesis

**Railway is a PaaS with opinions: private networking inside a project, volumes as the durable disk, sleep as a cost control that taxes latency, and usage as the bill.** If you only learned the push, you rented a pretty VPS and skipped the lease.

## Context

Dark Heart Labs runs a self-hosted social scheduler on Railway so cross-posting does not require handing the calendar to a SaaS buffer. I am not walking through OAuth order again. The platform assumed I had read the rest: internal hostnames, volumes, sleep, and a meter on CPU, RAM, disk, and egress.

Cursor will scaffold a Dockerfile and a `DATABASE_URL`. It will not tell you that public and private URLs disagree about who pays for packets, or that a worker that must never sleep cannot share a "serverless" toggle with staging you forgot.

They want Heroku nostalgia without reading what changed: usage pricing, a service canvas, defaults that are kind until they are expensive. Auckland 2026 does not change the invoice. It changes whether I am awake when a spend alert fires.

I do not run Kubernetes for this studio. Railway is someone else's orchestrator with a smaller language. The opinions are the language.

## Mechanism

Private networking is the first opinion worth paying for. Services in the same environment get internal DNS; traffic does not need to leave the project.[^1] App to Postgres should use the private hostname. The public URL is for you, `curl`, and mistakes. Egress is billed. The first time I pointed an app at the public database URL "because it worked in the browser," I was paying to leave the building to talk to a neighbor. The URL string is the policy. The canvas only draws it.

Volumes are the second. Deploy disks are ephemeral. A restart or a new deploy throws away local writes. Persistent storage is a volume you attach, size, and pay for.[^2] Database templates usually arrive with one. Application services that write uploads to `./storage` do not. If a Rails app treats the container as a disk, you learn it on the deploy that "lost" files.

Sleep is the third. Railway can stop a service after idle outbound traffic and wake it on the next request.[^3] That is idle-cost policy. It is also cold starts, webhook timeouts, and dead workers. A clock, a push consumer, a connection pool that hates being killed: these do not want sleep. A staging site you open twice a week does. The toggle is per service. Shared "on" is how a worker becomes a web hobby.

Cost is the fourth, written as numbers. A subscription is the door fee; RAM, CPU, volume, and egress are usage on top, billed by the minute for compute.[^4] Sleep exists because idle RAM is not free. Replica limits exist because a leak should crash rather than print money. I treat the usage graph as architecture, not as billing trivia.

The canvas (project, environment, service) is the type system. The core type is this process, this disk, this network name, this sleep policy, this spend cap.

## Tradeoffs

**Sleep vs always-on.** Sleep is correct for demos and quiet staging. It is wrong for workers, databases you treat as pets, and anything with a latency SLO measured in milliseconds of handshake. Split the toggle.

**Volume vs object storage.** Volumes are simple and regional. Media that should survive a region story belongs in object storage. Do not grow a volume as a personal S3.

**Private URL vs public URL.** Private is the default for service-to-service. Public is for humans and webhooks from the outside. Mixing them is a cost bug and a security smell.

**PaaS vs VPS vs nothing.** mystic-bytes stays on Pages. A VPS is cheaper until you are the orchestrator. Railway is the middle: opinions included. I am not writing Kubernetes YAML for this studio.

## Close

Draw the canvas and annotate four fields per service: internal name, volume or none, sleep or not, who pays for egress. If any field is "whatever the template did," you are still in the brochure.

Git push is how you arrive. Networking, disk, sleep, and the meter are what you bought.

— JV · Dark Heart Labs.

## References

[^1]: Railway Docs, "Private Networking," <https://docs.railway.com/networking/private-networking>. Internal DNS and in-project traffic — the networking opinion that makes a canvas more than a row of public URLs.

[^2]: Railway Docs, "Volumes," <https://docs.railway.com/volumes>. Persistent disk versus ephemeral deploys, including that local writes do not survive unless you attached storage.

[^3]: Railway Docs, "Serverless," <https://docs.railway.com/deployments/serverless>. Sleep after idle and wake on request — cost control with a latency and worker tax.

[^4]: Railway Docs, "Pricing," <https://docs.railway.com/pricing>. Subscription plus usage (CPU, RAM, volume, egress) — the economic opinions the other three implement.
