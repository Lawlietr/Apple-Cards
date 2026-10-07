/* ============================================================
 * Model registry.
 *
 * HOW TO ADD A MODEL:
 *   1. Put the card file in the repo at `{Family}/{Variant}/file.html`
 *      (any filename — index.html, apple-benefits-card.html, …).
 *   2. Append one entry at the END of the list below (append-only — never
 *      reorder by hand; the site sorts for you):
 *        { family: "FamilyName", variant: "ModelName",
 *          file: "path/to/file.html", added: "YYYY-MM-DD" }
 *      `added` is REQUIRED: the date the card was added to this repo
 *      (today's date, ISO 8601). It is the sort key — see ORDERING below.
 *   3. For the same model with different reasoning effort, add one entry
 *      per effort, e.g. { …, effort: "xhigh", file: "…/xhigh.html" }.
 *      Keep the effort variants adjacent, strongest effort first.
 *   4. Optional: `notes` — an array of short strings rendered as small
 *      tags next to the model name. Use it for runtime params, quantization,
 *      context size, etc., e.g.:
 *        { family: "Meta", variant: "Llama-3.1-8B",
 *          file: "Meta/Llama-3.1-8B/index.html", added: "2026-01-01",
 *          notes: ["llama.cpp", "Q4_K_M", "ctx 4096"] }
 *
 * ORDERING (why the list order does not matter, and what does):
 *   The site displays the NEWEST cards first. `main.js` sorts this list by
 *   `added` descending before rendering; entries missing `added` sink to the
 *   bottom in written order.
 *
 *   SAME-DATE TIE-BREAK (an explicit rule, not an accident): entries sharing
 *   an `added` date keep their written order, i.e. the order they were
 *   appended on that day. For effort variants of one model the strongest
 *   effort MUST be written first (xhigh before high before medium), so the
 *   pair stays adjacent and reads strongest-first everywhere. A finer
 *   timestamp would not remove the need for this rule — variants committed
 *   together share one commit timestamp.
 *
 *   Because of that, the array itself stays append-only and chronological.
 *
 *   The filter chips and the card grid follow the sorted list above. The
 *   sidebar lists FAMILY NAMES alphabetically (0-9 then A-Z) so a vendor can
 *   be found by name, but the models inside each family follow the same
 *   newest-first order. No other code changes are needed. The README.md and
 *   llms.txt model tables must be kept in the same newest-first order
 *   (see AGENTS.md).
 * ============================================================ */

const MODELS = [
  { family: "Gemma",  variant: "Gemma4-12B",               file: "Gemma/Gemma4-12B/index.html", added: "2026-08-20" },
  { family: "Gemini", variant: "Gemini-3.7_Flash",         file: "Gemini/Gemini-3.7_Flash/index.html", added: "2026-08-25" },
  { family: "Gemma",  variant: "HauhauCS-Gemma-4-26B-A4B", file: "Gemma/HauhauCS-Gemma-4-26B-A4B/index.html", added: "2026-08-20" },
  { family: "OpenAI", variant: "GPT-OSS-20B",              file: "OpenAI/GPT-OSS-20B/index.html", added: "2026-08-19" },
  { family: "OpenAI", variant: "GPT-5.6_sol", effort: "xhigh", file: "OpenAI/GPT-5.6_sol/xhigh.html", added: "2026-08-25" },
  { family: "OpenAI", variant: "GPT-5.6_sol", effort: "high",  file: "OpenAI/GPT-5.6_sol/high.html", added: "2026-08-25" },
  { family: "Qwen",   variant: "Kwaipilot_KAT-Coder-V2.5-Dev", file: "Qwen/Kwaipilot_KAT-Coder-V2.5-Dev/index.html", added: "2026-08-20" },
  { family: "Qwen",   variant: "Qwen-3.5-9B",              file: "Qwen/Qwen-3.5-9B/index.html", added: "2026-08-20" },
  { family: "Qwen",   variant: "Qwen3.6-35B-think",        file: "Qwen/Qwen3.6-35B-think/index.html", added: "2026-08-20" },
  { family: "Qwen",   variant: "Qwen3.8-27B", effort: "xhigh",  file: "Qwen/Qwen3.8-27B/xhigh.html", added: "2026-08-20" },
  { family: "Qwen",   variant: "Qwen3.8-27B", effort: "medium", file: "Qwen/Qwen3.8-27B/medium.html", added: "2026-08-20" },
  { family: "LiquidAI", variant: "LFM2.5-2.6B",            file: "LiquidAI/LFM2.5-2.6B/apple-benefits-card.html", added: "2026-08-19" },
  { family: "Qwen",     variant: "Cyber-Tiel-Coder",       file: "Qwen/Cyber-Tiel-Coder/index.html", added: "2026-09-13",
    // Structured metadata is rendered on the homepage (see main.js). Cards stay pure output.
    params: { quant: "UD-Q4_K_XL", kv: "Q8_0", temperature: 0.6, min_p: 0.0, top_p: 0.95, top_k: 20, architecture: "MoE 35B/A3B" },
    links:  { chatTemplate: "https://huggingface.co/peculiar-ragdoll/Qwen-Sharp-Chat-Templates",
              model: "https://huggingface.co/peculiar-ragdoll/Cyber-Tiel-Coder-35B-A3B-GGUF" } },
  { family: "OpenBMB",  variant: "Sharp-MiniCPM5-2B-GGUF", file: "OpenBMB/Sharp-MiniCPM5-2B-GGUF/index.html", added: "2026-10-01",
    notes: ["llama.cpp", "Q6_K_XL", "KV Q8_0", "temp 1.0", "top-p 0.95", "top-k 20", "min-p 0.0"] },
];
