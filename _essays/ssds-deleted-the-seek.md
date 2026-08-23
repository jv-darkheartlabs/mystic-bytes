---
layout: essay
title: SSDs Deleted the Seek
dek: "The arm is gone. Wear is the new folklore."
number: 004.91
sort_key: 0004.91
date: 2026-07-27
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [craft]
brief:
  system: Fedora workstation and CI disks for mystic-bytes
  issue: storage advice still written as if a head has to seek
  constraint: user of NVMe; not a NAND designer
---

SSDs deleted the seek. A spinning disk had a head. Random I/O meant waiting for the arm. Databases, filesystems, and "do not put swap there" folklore were written for that wait. NAND does not seek. It erases blocks and wears out. The slow operation changed names.

I write mystic-bytes on NVMe. CI runs on whatever flash GitHub's runners have. Advice copied from a 2008 blog — defrag for the track, never random-write a database, treat seek time as the tax — is a category error. The new folklore is wear, TRIM, write amplification, and a "disk full" that is sometimes a controller having a bad day. Sequential versus random still matters at the margins. It does not matter the way it did when a seek was ten milliseconds.

If your architecture assumes a mechanical penalty, measure. The B-tree vs LSM argument is not the same argument it was when the disk was a motor. Layout still matters. Physics changed. I do not design NAND. I do notice when a laptop no longer sounds like a database warming up.

The seek is gone. The wear is not. Buy the drive as flash, not as a quiet HDD. Then stop copying tuning guides that still wait for the arm.

— JV · Dark Heart Labs.

[^1]: Common SSD / NVMe controller behavior (erase blocks, TRIM) as documented by vendors and OS storage guides. Seek-time folklore as the HDD inheritance this essay is retiring.
