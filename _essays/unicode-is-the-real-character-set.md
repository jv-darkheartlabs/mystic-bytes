---
layout: essay
title: Unicode Is the Real Character Set
dek: "If a name cannot survive a form, a sort, or a filename, the system does not know the person."
number: 004.71
sort_key: 0004.71
date: 2026-08-21
cover: /assets/images/cover-code.svg
type: pillar
read_time: 6
brief:
  system: mystic-bytes author names, Tāmaki Makaurau place names, and essay titles
  issue: macron-stripped Māori strings; search misses ā vs a plus combining mark; emoji in titles treated as noise
  constraint: no private alphabet; Unicode is the repertoire; do not "sanitize" by deleting what Latin-1 cannot see
---

ASCII is a cramped neighbourhood that a lot of software still treats as the map of the world. It is not. The repertoire people actually live in (names, te reo Māori, emoji in a title you meant seriously) is Unicode. If your database, your search index, or your slugify helper pretends otherwise, you are misidentifying people and places. Serialization of bytes is a separate problem. This is about which characters exist, how they cluster into a letter, and what happens when a form quietly deletes them.

## Thesis

**Unicode is the character set of record for human text on computers.** Normalization, grapheme clusters, and an honest allowlist beat "strip weird characters" as cleanliness. The weird characters are often the data.

## Context

I write mystic-bytes from an Auckland-bound 2026: Tāmaki Makaurau, Aotearoa, macrons in the place names I refuse to flatten for a CMS that was designed in a language without tohutō. Māori vowels with macrons (ā, ē, ī, ō, ū) are not decoration. They change pronunciation and, in enough words, they change meaning. A pipeline that turns *Māori* into *Maori* because the slug library used a Latin-1 table has already lost.

The same week I watched search on a local preview miss a heading I could see on the page. One file stored *ā* as a single precomposed character. Another, after a copy through a tool that likes decomposed form, stored *a* plus a combining macron. To a reader they are the same letter. To a naive `==` or a search index that never normalized, they are different strings. I had not been hacked. I had two Unicode spellings of the same word and software that only believed in one of them.

Emoji showed up in a title I almost "cleaned." A catalog blurb pipeline treated anything outside Basic Latin as a smell. The title was a tone marker, not clip art. Deleting it made the software's fear of the character set into editorial policy. Names are the same failure with higher stakes: hyphens, letters ASCII never met, display names people chose. "JV" fits in seven-bit. Plenty of readers of this site will not.

## Mechanism

**The Standard names characters; it does not ask your framework's permission.** The Unicode Standard catalogs abstract characters, code points, properties, and combining rules.[^1] Your language's `string` type sits on top of that catalog, often with accidents: "length" that is not a user-perceived character. Design against code points and grapheme clusters, not against whatever `.length` returned in 2012.

**Grapheme clusters are what people point at.** A macronized vowel can be one code point or two. An emoji with a skin-tone modifier or a ZWJ sequence can be many code points that still render as one symbol. Validation that says "max 30 characters" without specifying graphemes will cut names in half. Count what users see, or stop pretending the limit is about people. Emoji live in the same Standard: properties, variation selectors, sequences. If a title may have punctuation, it may have emoji unless a written house style forbids them. Accidental deletion is not a house style.

**Normalization is a compare-and-search problem.** The same visual letter can be stored more than one way. For mystic-bytes I NFC-normalize titles and names at the boundary before slug comparison, search indexing, and filename checks. I pick a form and apply it everywhere a string is identity. Skip that step and you get duplicate tags, missed searches, and "it works on my Mac" fights that are decomposed versus composed.

**Māori macrons are a product requirement in Aotearoa.** Government and iwi names, street signs, and the words I use for where I live assume tohutō. A URL fallback may map *ā* to *a*. The displayed name and the search corpus should keep the macron. Stripping as default is a colonial leftover dressed as sanitization.

## Tradeoffs

**ASCII slugs vs faithful display.** I still want permalinks that survive copy-paste into terminals that are rude about non-ASCII. That is a fallback identifier, not a reason to destroy the source string. Keep the Unicode in the heading, the `<title>`, and the index.

**Strict reject vs over-accept.** An input that is only combining marks, or a name that is ten thousand code points, can be a denial-of-service. Length limits on graphemes and a normalization step are enough for a writing site. A denylist of "non-English letters" is not security. It is exclusion with extra regex.

**Collation vs code point sort.** Phone-book order in Māori and English is not `strcmp`. If you sort authors or tags for humans, use a locale-aware collator. If you sort for cache keys, use normalized binary order and do not pretend it is alphabetical.

## Close

The real character set is the one the Unicode Consortium publishes, not the one your sanitizer inherited. mystic-bytes has to store Tāmaki Makaurau with the macrons intact, search *ā* as *ā*, and stop treating emoji as dirt in a title. Auckland 2026 is not an ASCII city. The site should not pretend it is.

If you ship a form this week, type a macronized word and one emoji through it. If either disappears, the bug is in your character set policy, not in the user.

— JV · Dark Heart Labs.

## References

[^1]: The Unicode Consortium, *The Unicode Standard* (unicode.org). Characters, combining marks, emoji sequences, and normalization (UAX #15). For compare-and-search, use the Standard's clusters rather than a runtime `.length`.
