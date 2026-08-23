---
layout: essay
title: Apple Sells Defaults
dek: "The computer, the OS, and the store are one policy with three invoices."
number: 338.761
sort_key: 0338.761
date: 2026-08-16
cover: /assets/images/cover-code.svg
type: pillar
tags: [craft]
brief:
  system: NeuroShell on Apple silicon, shipped from a remote Auckland workstation
  issue: notarization, entitlements, and distribution rules arrive as one vendor policy, not three optional layers
  constraint: product is macOS-native; cannot treat hardware, OS, and store as independent suppliers
---

## Thesis

Apple's product is a default stack. The chip, the kernel, and the store are one policy. You can dislike a toggle in Settings. You cannot leave the firm without leaving the machine.

## Context

I ship [NeuroShell](https://github.com/jv-darkheartlabs/NeuroShell) as a macOS terminal. The constraints that matter arrive with the laptop: a signed binary, notarization, entitlements I did not invent, Gatekeeper, and a distribution path that still treats the App Store as the respectable door even when I release from GitHub.

I am a user of that stack, writing from Tāmaki Makaurau in 2026. I have never been on Apple's payroll. The view here is the public one: developer docs, review guidelines, silicon announcements, and the second-order effects of living inside a computer that is also a store.

This is not the essay about product UI defaults. That one is about the checkbox most people never open. This one is about a company that sells the checkbox, the OS that hosts it, and the hardware that will not boot a competitor's kernel. The default is the firm.

## Mechanism

**Vertical integration is the policy document.** Apple Silicon made the CPU a first-party part. Secure Enclave, unified memory, and the recovery OS are not accessories. They are the terms of use, burned into a board. Once the chip is yours only as a customer, the OS is not a layer you swap. It is the firmware's preferred language. Linux on Apple hardware exists as a hobbyist's translation. The supported path is macOS, and macOS assumes iCloud, Safari, and a signed update channel the way a landlord assumes the lease.

**The store closes the loop.** App Review Guidelines are commerce law with a human interface.[^1] Guideline 3.1.1 still points digital goods through In-App Purchase unless a regulator has carved an exception. Search ranking, "Get" buttons, and the 15/30 percent take rate are not a marketplace beside the phone. They are how software reaches the phone. A developer in Aotearoa does not get the EU Digital Markets Act as a daily tool. Sideloading and alternative browser engines are regional weather. Outside that weather, the default distribution path remains Apple's.[^2]

**Notarization is the macOS version of the same idea.** Even when I distribute NeuroShell from GitHub, Gatekeeper asks the user to trust a Developer ID certificate Apple issued and can revoke. Direct download is still a first-party permission. Safety is the stated reason. Unsigned software becomes a support burden, and the warning dialog trains people to fear every vendor except one.

**Default apps are industrial policy.** Safari, Mail, Messages, and the App Store are not suggestions on a preference pane. They are the paths that work when Continuity, iMessage, and iCloud Keychain are the features you bought the laptop for. Switching the browser is allowed. Switching the identity graph is not. The hardware warranty, the OS update, and the store account share a login. That login is the product.

**Developers optimize for the reviewer, then for the user.** When payment, discovery, and OS APIs are the same vendor, the rational app is the one that survives review. Public APIs only. Intended-purpose frameworks. Those rules produce real security benefits. They also produce software that looks like Apple's Human Interface Guidelines because that is the dialect the gate speaks. I write NeuroShell against that dialect on purpose. It is not a free choice of platform the way choosing a CSS framework is.

## Tradeoffs

**Safety vs exit.** A signed, sandboxed, notarized world is kinder to people who should not have to become sysadmins. It is harsher to people who need to leave. The cost of Apple's default is not that Settings is hard. The cost is that the alternative computer is a different brand.

**Taste vs take rate.** Apple's design control is real. So is the commission. Treating them as unrelated is how the security argument gets used to defend a payment argument. Read the guidelines as both.

**Regional law vs global product.** DMA terms in the EU prove the stack can be unbundled when a legislature insists. From Auckland the lesson is sharper: if your jurisdiction does not insist, you are on the original contract. Plan for the contract you actually have.

**When the stack is the right buy.** If you want a machine that updates and a store that scans, Apple is a coherent vendor. Buy it as a vendor. Do not buy it as a philosophy and then act surprised when the philosophy invoices you.

## Close

I keep shipping on Mac because the machine matches the work. The honest accounting is that I am renting a default: silicon, OS, and distribution as one instrument. Audit that instrument the way you audit a cloud bill. Name what you cannot change. Name what a regulator would have to change for you. Then write software that survives the policy, not software that pretends the policy is a theme.

— JV · Dark Heart Labs.

## References

[^1]: Apple, *App Store Review Guidelines*, especially §3.1 (Business — Payments). Commerce, discovery, and OS APIs as one review surface.

[^2]: Apple, "Changes for apps in the European Union" (developer support, 2024 onward); Regulation (EU) 2022/1925 (Digital Markets Act). A regional unbundle shows the default stack is policy, not physics.

[^3]: Apple Platform Security documentation (Secure Enclave, notarization, Gatekeeper). Why "just install it" remains a first-party decision off the App Store.
