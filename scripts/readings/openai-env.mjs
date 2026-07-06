/**
 * OpenAI-compatible API config (OpenAI, Tetrate Agent Router, etc.)
 *
 * Env vars (first match wins for base URL):
 *   OPENAI_API_KEY      — required
 *   OPENAI_BASE_URL     — e.g. https://api.router.tetrate.ai/v1
 *   OPENAI_API_BASE     — legacy alias
 *
 * Optional: project-root `.env` (gitignored) loaded before reading env.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

function loadDotEnv() {
  const path = join(ROOT, ".env");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv();

function normalizeBaseUrl(raw) {
  const base = (raw || "https://api.openai.com/v1").replace(/\/+$/, "");
  return base.endsWith("/v1") ? base : `${base}/v1`;
}

export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = normalizeBaseUrl(
    process.env.OPENAI_BASE_URL || process.env.OPENAI_API_BASE
  );
  return {
    apiKey,
    baseUrl,
    chatCompletionsUrl: `${baseUrl}/chat/completions`,
  };
}

export function requireOpenAIConfig() {
  const cfg = getOpenAIConfig();
  if (!cfg.apiKey) {
    throw new Error(
      "OPENAI_API_KEY required. Set it in .env or your shell (see .env.example)."
    );
  }
  return cfg;
}
