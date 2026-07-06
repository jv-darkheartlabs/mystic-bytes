#!/usr/bin/env python3
"""Third pass: category-aware Reader's seat for reviews under 520 words."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2] / "_readings"
MARKER = "## Discussion launchpad"
# ONLY these slugs may be modified — never glob the whole _readings dir.
ALLOWLIST = {
    "a-dark-fate", "a-heart-of-secrets-and-shadows", "a-savage-fae", "a-war-of-fae-and-fate",
    "altair-university", "altair-university-2", "bewitched", "dare-series-collection",
    "deadly-throne", "forever-rains", "fragile-allegiance", "house-of-earth-and-blood",
    "i-just-want-to-be-yours", "john-dies-at-the-end", "just-dont-call-me-yours", "never",
    "part-of-you", "peace-honey", "pine-poison", "pray-for-us", "sinners-absolve",
    "sins-of-the-past", "take-me-apart", "the-blood-we-crave-part-two", "the-duke-and-i",
    "the-final-score", "the-lawless-god", "the-murder-of-roger-ackroyd",
    "the-newspaper-nanny", "the-once-and-future-king", "the-ritual-of-bone",
    "the-shades-of-magic", "the-vegas-rule", "villain",
}
SKIP = {"passion", "breaking-hailey", "dance-of-a-burning-sea", "white-lines", "four", "a-dark-fate"}

def parse_fm(text):
    m = re.match(r"---\n(.*?)\n---", text, re.S)
    fm = {}
    if not m:
        return fm
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip('"')
    return fm

def seat(title, author, category, spice):
    cat = category.replace("-", " ")
    return f"""## Reader's seat

I'm sitting with *{title}*—{author}, {cat}, **spice {spice}**—and I'm not pretending I'm neutral. You picked this review because the trope already whispered to you. Good. Mystic-bytes keeps darkness as threshold work: what did you cross to keep reading, and what did you refuse to cross? Name both in discussion.

Poetry on this site will carry the uncut image later; here I curate. Evergreen prose means no hype, no comp shopping, no trend slang—just craft, appetite, and consequence you can trust in five years. If your body said yes while your mind said no, that's the split this shelf lives in. Bring it to the room. I'll meet you there."""

def wc(slug):
    return len((ROOT / f"{slug}.md").read_text().split("---", 2)[2].split())

def main():
    for slug in sorted(ALLOWLIST):
        path = ROOT / f"{slug}.md"
        if not path.exists() or slug in SKIP or wc(slug) >= 520:
            continue
        text = path.read_text()
        if "## Reader's seat" in text:
            continue
        fm = parse_fm(text)
        block = seat(fm.get("title", slug), fm.get("author", ""), fm.get("category", ""), fm.get("spice", "?"))
        text = text.replace(MARKER, block + "\n\n" + MARKER, 1)
        path.write_text(text)
        print(f"OK {slug} {wc(slug)}w")

if __name__ == "__main__":
    main()
