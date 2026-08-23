---
layout: essay
title: UTF-8 Is How Unicode Usually Arrives
dek: "Unicode is the inventory. UTF-8 is the shipping crate."
number: 004.75
sort_key: 0004.75
date: 2026-08-03
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes Jekyll essay pipeline
  issue: mojibake on em dashes and macrons after a latin-1 round trip
  constraint: no recode of the whole corpus; fix encoding at the file boundary
---

Unicode is the catalog of characters. UTF-8 is how that catalog usually shows up as bytes. Mixing those jobs is how you get mojibake: the inventory was fine; the crate was opened with the wrong tool.

I publish text. I do not implement Unicode. mystic-bytes taught me the difference when a helper treated files as latin-1 because the bytes looked like English until they did not. An em dash became `â€"` and macrons in Tāmaki Makaurau turned into junk. Nothing was wrong with the character set. The pipeline had decoded UTF-8 as latin-1, or encoded latin-1 and then labeled the result UTF-8 — the classic lie, because western European text is a subset until the first character that is not.

Declare UTF-8 at every boundary: HTTP `charset`, XML prolog, editor, git attributes. Refuse unlabeled bytes. Never "fix" mojibake by guessing. If a file is not valid UTF-8, fail loud. Latin-1 compatibility is how corruption becomes a default instead of an incident.

Encoding is a parse, not a vibe. Unicode names the characters. UTF-8 is how they usually arrive. Keep those sentences apart.

— JV · Dark Heart Labs.
