/* ============================================================
 * Model registry.
 *
 * HOW TO ADD A MODEL:
 *   1. Put the card file in the repo at `{Family}/{Variant}/file.html`
 *      (any filename — index.html, apple-benefits-card.html, …).
 *   2. Append one entry below:
 *        { family: "FamilyName", variant: "ModelName", file: "path/to/file.html" }
 *   3. For the same model with different reasoning effort, add one entry
 *      per effort, e.g. { …, effort: "xhigh", file: "…/xhigh.html" }.
 *   4. Optional: `notes` — an array of short strings rendered as small
 *      tags next to the model name. Use it for runtime params, quantization,
 *      context size, etc., e.g.:
 *        { family: "Meta", variant: "Llama-3.1-8B",
 *          file: "Meta/Llama-3.1-8B/index.html",
 *          notes: ["llama.cpp", "Q4_K_M", "ctx 4096"] }
 *
 *   The filter buttons and card grid are generated from this list —
 *   no other code changes needed.
 * ============================================================ */

const MODELS = [
  { family: "Gemma",  variant: "Gemma4-12B",               file: "Gemma/Gemma4-12B/index.html" },
  { family: "Gemma",  variant: "HauhauCS-Gemma-4-26B-A4B", file: "Gemma/HauhauCS-Gemma-4-26B-A4B/index.html" },
  { family: "OpenAI", variant: "GPT-OSS-20B",              file: "OpenAI/GPT-OSS-20B/index.html" },
  { family: "Qwen",   variant: "Kwaipilot_KAT-Coder-V2.5-Dev", file: "Qwen/Kwaipilot_KAT-Coder-V2.5-Dev/index.html" },
  { family: "Qwen",   variant: "Qwen-3.5-9B",              file: "Qwen/Qwen-3.5-9B/index.html" },
  { family: "Qwen",   variant: "Qwen3.6-35B-think",        file: "Qwen/Qwen3.6-35B-think/index.html" },
  { family: "Qwen",   variant: "Qwen3.8-27B", effort: "xhigh",  file: "Qwen/Qwen3.8-27B/xhigh.html" },
  { family: "Qwen",   variant: "Qwen3.8-27B", effort: "medium", file: "Qwen/Qwen3.8-27B/medium.html" },
  { family: "LiquidAI", variant: "LFM2.5-2.6B",            file: "LiquidAI/LFM2.5-2.6B/apple-benefits-card.html" },
];
