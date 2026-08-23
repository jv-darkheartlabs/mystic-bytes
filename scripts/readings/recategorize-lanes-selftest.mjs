import { resolveLaneCategory } from "./recategorize-lanes.mjs";

const cases = [
  {
    name: "Emma",
    meta: { slug: "emma", title: "Emma", author: "Jane Austen", category: "enemies-to-lovers" },
    want: "classic-literature",
  },
  {
    name: "Dracula",
    meta: { slug: "dracula", title: "Dracula", author: "Bram Stoker", category: "gothic-horror-romance" },
    want: "classic-literature",
  },
  {
    name: "Corduroy",
    meta: { slug: "corduroy", title: "Corduroy", author: "Don Freeman", category: "gothic-horror-romance" },
    want: "juvenile-fiction",
  },
  {
    name: "Nancy Drew",
    meta: {
      slug: "nancy-drew-01-the-secret-of-the-old-clock",
      title: "The Secret of the Old Clock",
      author: "Carolyn Keene",
      category: "dark-thriller",
    },
    want: "juvenile-fiction",
  },
  {
    name: "Potter",
    meta: {
      slug: "harry-potter-and-the-sorcerers-stone",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      category: "juvenile-fiction",
    },
    want: "ya-fiction",
  },
  {
    name: "Dune",
    meta: {
      slug: "dune-dune-1",
      title: "Dune (Dune, #1)",
      author: "Frank Herbert",
      category: "fantasy-romance",
    },
    want: "sff",
  },
  {
    name: "Fourth Wing",
    meta: {
      slug: "fourth-wing",
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      category: "fantasy-romance",
    },
    want: "fantasy-romance",
  },
  {
    name: "Homerun override",
    meta: {
      slug: "a-homerun-proposal",
      title: "A Homerun Proposal",
      author: "Someone",
      category: "enemies-to-lovers",
    },
    overrides: { "a-homerun-proposal": "enemies-to-lovers" },
    want: "enemies-to-lovers",
  },
];

let failed = 0;
for (const c of cases) {
  const got = resolveLaneCategory(c.meta, c.overrides || {}).category;
  if (got !== c.want) {
    console.error(`FAIL ${c.name}: got ${got}, want ${c.want}`);
    failed += 1;
  } else {
    console.log(`ok ${c.name} → ${got}`);
  }
}
if (failed) process.exit(1);
console.log("selftest passed");
