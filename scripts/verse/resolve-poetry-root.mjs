import { readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "/Users/jenthedev/Documents";

export function resolvePoetryRoot() {
  if (process.env.POETRY_ROOT) return process.env.POETRY_ROOT;
  const docs = readdirSync(BASE).find((d) => d.startsWith("Documents - Jennifer"));
  if (!docs) throw new Error("Poetry root not found under ~/Documents");
  return join(BASE, docs, "Active/dark-heart-labs/poetry");
}
