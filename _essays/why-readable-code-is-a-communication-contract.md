---
layout: essay
title: Why Readable Code Is a Communication Contract
dek: "Code is written once and read many times — optimize for the reader."
number: 007.71
sort_key: 000771
date: 2003-01-05
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
You are not typing for the compiler alone. The compiler forgives opacity; the next engineer does not.

Readable code states intent in names, boundaries, and file layout. A function named `process` is a shrug. A function named `validatePaymentAndEnqueueReceipt` is a contract. Comments explain *why* when the why is not obvious from types and names — never restate the what.

Keep units small enough to hold in working memory. Extract when a block needs a name to be understood. Prefer explicit data structures over clever nesting. The reader should not need your mental stack to navigate the file.

Review with the question: *could someone fix a bug here without asking me?* If not, the code is not finished — it is merely passing tests.

Communication is not softness. It is maintenance cost control.


— JV · Dark Heart Labs.
