#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "images");
fs.mkdirSync(out, { recursive: true });

const covers = [
  { name: "cover-code", c1: "#9b7bd4", c2: "#080610", label: "000–099" },
  { name: "cover-mind", c1: "#c87a8a", c2: "#1a0a22", label: "100–199" },
  { name: "cover-archive", c1: "#6ee7d4", c2: "#0a1628", label: "200–299" },
  { name: "cover-systems", c1: "#ff5577", c2: "#2a1230", label: "300–399" },
  { name: "cover-language", c1: "#e8d9c0", c2: "#1a1525", label: "400–499" },
  { name: "cover-craft", c1: "#9b7bd4", c2: "#ff5577", label: "600–799" },
  { name: "cover-mentorship", c1: "#6ee7d4", c2: "#9b7bd4", label: "signal" },
  { name: "project-neuroshell", c1: "#9b7bd4", c2: "#6ee7d4", label: "NeuroShell" },
  { name: "project-focus-guard", c1: "#ff5577", c2: "#080610", label: "focus-guard" },
];

for (const { name, c1, c2, label } of covers) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" opacity="0.08" filter="url(#n)"/>
  <text x="64" y="680" fill="${c1}" opacity="0.5" font-family="monospace" font-size="28" letter-spacing="0.2em">${label.toUpperCase()}</text>
</svg>`;
  fs.writeFileSync(path.join(out, `${name}.svg`), svg);
  console.log("wrote", `${name}.svg`);
}
