---
layout: essay
title: Swift Is Apple's Contract with Developers
dek: "Stable ABI is the promise. The platform lock is the price."
number: 005.217
sort_key: 0005.217
date: 2026-08-03
cover: /assets/images/cover-code.svg
read_time: 2
tags: [craft]
type: micro
brief:
  system: mystic-bytes Swift OCR pass in the reading import pipeline; NeuroShell on macOS
  issue: treating Swift as "just another language" ignores ABI-on-Apple as the real contract
  constraint: no claim of iOS product work; name platform lock as the price of the ABI
---

Swift is Apple's contract with developers: a language that is allowed to get better without breaking the binaries already on the system, on Apple's terms. The ABI stability story is the promise. The platform lock is the price. You write Swift for Darwin. The contract does not include a serious elsewhere.

I am not shipping an App Store product. I hit Swift as a toolchain: the OCR pass in the mystic-bytes reading import pipeline, the macOS gravity around NeuroShell, Xcode's deployment target. When Apple declared ABI stability, they promised OS-shipped libraries and language evolution could coexist. That is a vendor contract, not POSIX-by-committee.[^1] Fedora will not save you. The next macOS will still be the host.

They talk about Swift as if it were nicer Kotlin. Syntax is not the contract. The contract is: we will keep your binaries loadable, and you will keep shipping on our OS. If you need the same program on a Linux box in CI, you are negotiating a different language. I keep the OCR pass documented as Mac-only so a tired operator does not discover that in the middle of a batch.

Use Swift when you are accepting Apple's platform. Do not use it as a portable hope.

— JV · Dark Heart Labs.

[^1]: Swift.org, "ABI Stability" (and related Swift evolution documents on module stability). Apple's published contract for binary compatibility on their platform — the promise this note pairs with lock-in.
