---
layout: essay
title: Why Readable Code Is a Communication Contract
dek: "Code is written once and read many times — optimize for the reader."
number: 007.71
sort_key: 000771
date: 2026-04-04
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: mystic-bytes plugins and Liquid includes
  issue: helper named process hid a sidecar write in a generator
  constraint: names and file layout must let a stranger fix a bug without a Slack thread
---

The compiler will accept a shrug. The next engineer will not.

Readable code is a communication contract. You are not typing for the compiler alone. Names, file layout, and boundaries state intent. A function named `process` is a shrug. A function named `validatePaymentAndEnqueueReceipt` is a promise about what happens if you call it. Comments earn their keep when they explain why the obvious approach is wrong. They waste space when they restate the what.

I inherited a mystic-bytes generator helper called `process` that also wrote a sidecar manifest. The tests were green. The next edit broke the sidecar because the name offered no warning. They optimize for clever nesting and then tax every reader with a mental stack they did not ask to hold.

Keep units small enough to hold in working memory. Extract when a block needs a name to be understood. Prefer an explicit structure over a clever nest the reader has to unpack. Review with one question: could someone fix a bug here without asking you? If not, the code is passing tests and failing the contract.

Write for the reader. Maintenance cost is the invoice.

— JV · Dark Heart Labs.
