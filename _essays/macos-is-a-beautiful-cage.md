---
layout: essay
title: macOS Is a Beautiful Cage
dek: "Unix under glass: you can see the bars when you try to ship."
number: 005.432
sort_key: 0005.432
date: 2026-08-10
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
related_projects: [NeuroShell]
brief:
  system: NeuroShell macOS terminal distribution
  issue: notarization and Gatekeeper turn a local Unix tool into a vendor-gated binary
  constraint: ship on the platform users actually have; no unsigned "right-click Open" as the install story
---

macOS is the prettiest Unix I have used, and the one most willing to remind me it is borrowed. The terminal still speaks `sh`. The dock still decides whether the binary I just built is allowed to exist.

## Thesis

**macOS is Unix under glass.** Darwin, POSIX tools, and a polished session are real. So are notarization, Gatekeeper, and a sandbox that treats your process as a guest. The cage is beautiful. It is still a cage.

## Context

[NeuroShell](https://github.com/jv-darkheartlabs/NeuroShell) is an ADHD-friendly macOS terminal. It exists because the default terminal session is a sharp object: history that vanishes, chrome that shouts, no recovery when attention drops mid-command. The users I care about already have Macs. Shipping "just clone it and compile" is not a product. Shipping a signed, notarized build is.

That is where the glass shows. A local `make` on my machine is Unix. A download from GitHub that Gatekeeper will actually open is Apple policy. I do not work at Apple. I stand in the line every other independent Mac developer stands in: upload, wait, staple, watch a staple ticket, explain to a tired user why macOS called their tool malware until the ticket landed.

Fedora on the writing laptop is the opposite contract. mystic-bytes builds without a notarization desk. NeuroShell cannot take that contract. The cage is the market.

## Mechanism

Apple documents the distribution path in the open. Notarization is a malware-scanning gate for software distributed outside the Mac App Store: you submit a ticket, Apple checks the binary, you staple the result so Gatekeeper can verify offline.[^1] Gatekeeper and runtime protection then decide whether a downloaded app may run, and under what quarantine bits.[^2] App Sandbox, when you opt in or when the store requires it, limits file and device access by entitlement instead of by "the user launched it, so it is god."[^3]

None of that is secret. None of it is optional if you want a normal install story. "Right-click, Open, ignore the dialog" is a developer cope. It is not a support policy. NeuroShell's install path has to assume a person who will not debug `spctl`.

Unix-under-glass is the rest of the day. You get `zsh`, `ssh`, `git`, a BSD userland with Linux muscle memory almost transferring. You also get TCC prompts for folders, a signed system volume you do not own, and a kernel you will not patch. The terminal is a licensed view of a Unix. It is a very good view. I write in it. I also keep Fedora because I want a machine whose pid 1 I can replace without a developer program.

The ADHD brief makes the cage sharper. NeuroShell's job is to lower sensory load and recover session state. Apple's job is to keep random binaries from owning the camera. Those jobs collide at the entitlement file. A terminal that needs shell access looks, to a sandbox, like a program that can do anything. The honest product on macOS is often "less sandbox, more notarization" — still gated, just gated at distribution time instead of at every `open()`.

Auckland 2026 does not change the Mac story. It changes which laptop I carry through the airport. NeuroShell still ships for the OS most of its users already paid for. The writing practice still lives in git on a machine I can reinstall. Two contracts, one studio.

## Tradeoffs

**Polish versus custody.** macOS windowing, fonts, and energy behavior are why people stay. Custody of the boot chain is why I do not use it as the only computer. I will not pretend a retina screen dissolves Gatekeeper.

**Store versus independent distribution.** The Mac App Store is a different cage with different bars: review, sandbox, revenue cut. Notarized Developer ID is the compromise NeuroShell uses. Both are Apple policy. Neither is `dpkg -i`.

**Local Unix versus shippable Unix.** `cargo build` is not a release. A release is a signed artifact plus a staple plus a README that does not tell civilians to disable SIP. Budget for that path or do not claim you ship on Mac.

**When the cage is the correct product surface.** If the users are on Mac, you build for Mac. Accessibility and ADHD-friendly tooling that only runs on Fedora is a zine, not a tool those users can open. NeuroShell accepted the cage on purpose. mystic-bytes did not need to.

## Close

Love the session. Distrust the gate. Use macOS where the users are, and keep a Linux box for the work that should not ask a vendor whether today's build is allowed to run.

NeuroShell taught me the difference in my hands: the terminal felt like mine; the notarization ticket did not. That split is the product. Name it in the README so you do not gaslight yourself later.

— JV · Dark Heart Labs.

## References

[^1]: Apple Developer Documentation, "Notarizing macOS software before distribution," <https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution>. The official gate for Developer ID builds shipped outside the Mac App Store.

[^2]: Apple Platform Security, "Gatekeeper and runtime protection," <https://support.apple.com/guide/security/gatekeeper-and-runtime-protection-sec5599bfeac/web>. How macOS decides whether a downloaded app may run, including quarantine and notarization checks.

[^3]: Apple Developer Documentation, "App Sandbox," <https://developer.apple.com/documentation/security/app_sandbox>. Entitlement-based restriction of file, network, and device access — the in-process half of the cage.
