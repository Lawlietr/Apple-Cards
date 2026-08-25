/* ============================================================
 * i18n — all UI strings live here.
 *
 * HOW TO ADD A LANGUAGE (e.g. Traditional Chinese):
 *   1. Add a new object to I18N below, using the SAME keys as `en`.
 *      (A few missing keys are OK — `en` is used as fallback.)
 *   2. Add one entry to SUPPORTED_LANGS below:
 *        - code:  the key you used in I18N (also the localStorage value)
 *        - label: shown in the language selector
 *        - match: lowercase browser codes to auto-detect (e.g. "zh-tw")
 *
 *   The selector, persistence and auto-detection update
 *   automatically — no other code changes needed.
 * ============================================================ */

const I18N = {
  en: {
    "site.title": "Apple Cards",
    "meta.description":
      "One prompt about the benefits of eating apples, answered by many models — each answer is a hand-crafted HTML card in the orchard-notebook style.",
    "hero.title": "One prompt, many models.",
    "hero.tagline":
      "Every model below received the exact same task: build an HTML card about the benefits of eating apples, styled like a torn-out page from an orchard notebook. Each preview is the card itself, embedded as-is.",
    "prompt.summary": "The prompt",
    "prompt.text":
      "Write a simple HTML card introducing the benefits of eating an apple. The design style is “orchard notebook”: it should look like a page from a notebook or a torn-off card. The top of the card prints an orchard-notebook number (apple is 01) and a title, followed by a tear line and the body. The body contains a large apple image (or emoji) and the benefits listed in an interactive, fashionable format. Then a small block shows apple nutrition data such as calories and fiber, and finally the card footer. Single file, inline CSS, no external dependencies, Traditional Chinese.",
    "filter.all": "All",
    "label.effort": "effort",
    "card.open": "Open full size",
    "compare.label": "Select for comparison",
    "compare.selected": "%n selected",
    "compare.viewing": "Comparing %n cards",
    "compare.button": "Compare side by side",
    "compare.clear": "Clear",
    "compare.back": "← Back to all cards",
    "loadmore.button": "Load more (%n)",
    "theme.light": "Switch to light mode",
    "theme.dark": "Switch to dark mode",
    "lang.label": "Language",
    "footer.note":
      "All cards are self-contained HTML with inline CSS — no external dependencies.",
  },

  /*
   * Example — uncomment and translate to activate Traditional Chinese:
   *
   * "zh-TW": {
   *   "site.title": "蘋果卡片",
   *   "meta.description": "同一道提示詞，多個模型……",
   *   "hero.title": "一道提示詞，多個模型。",
   *   "hero.tagline": "……",
   *   "prompt.summary": "提示詞",
   *   "prompt.text": "寫一個簡單的 HTML 卡片，介紹吃蘋果的好處。……",
   *   "filter.all": "全部",
   *   "label.effort": "思考強度",
   *   "card.open": "全尺寸開啟",
   *   "compare.label": "選入比較",
   *   "compare.selected": "已選 %n 張",
   *   "compare.viewing": "正在比較 %n 張",
   *   "compare.button": "並排比較",
   *   "compare.clear": "清除",
   *   "compare.back": "← 返回全部卡片",
   *   "loadmore.button": "載入更多（剩 %n 張）",
   *   "theme.light": "切換到淺色模式",
   *   "theme.dark": "切換到深色模式",
   *   "lang.label": "語言",
   *   "footer.note": "所有卡片都是自包含的 HTML，無外部依賴。",
   * },
   */
};

const SUPPORTED_LANGS = [
  { code: "en", label: "English", match: ["en"] },
  // { code: "zh-TW", label: "繁體中文", match: ["zh-tw", "zh-hant"] },
];

const DEFAULT_LANG = SUPPORTED_LANGS[0].code;
