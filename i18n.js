/* ============================================================
 * i18n — all UI strings live here.
 *
 * HOW TO ADD A LANGUAGE (e.g. Japanese):
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
    "prompt.note":
      "Note: every model received this prompt in Traditional Chinese — switch the site language to 繁體中文 to read the verbatim original. The text above is an English translation for reference.",
    "nav.models": "Models",
    "filter.all": "All",
    "label.effort": "effort",
    "params.quant": "Quantization",
    "params.temperature": "temperature",
    "params.min_p": "min-p",
    "params.top_p": "top-p",
    "params.top_k": "top-k",
    "params.architecture": "Architecture",
    "links.chatTemplate": "Chat template",
    "links.model": "Model (GGUF)",
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

  "zh-TW": {
    "site.title": "Apple Cards",
    "meta.description":
      "同一道關於吃蘋果好處的提示詞，由多個模型各自回答——每份答案都是一張「果園筆記」風格的 HTML 卡片。",
    "hero.title": "一道提示詞，多個模型。",
    "hero.tagline":
      "下方每個模型收到的都是完全相同的任務：做一張介紹吃蘋果好處的 HTML 卡片，設計得像從果園筆記本上撕下來的一頁。每個預覽就是卡片本身，原樣嵌入。",
    "prompt.summary": "提示詞",
    "prompt.text":
      "寫一個簡單的 HTML 卡片，介紹吃蘋果的好處。將程式碼貼在這裡。設計風格為「果園筆記」，看起來像筆記本的一頁或撕式卡片。卡片頂部印有果園筆記編號（蘋果為 01）及標題，接著是一道撕線，然後是正文。正文包含一個大尺寸的蘋果圖片（或表情符號），以及以互動且時尚格式列出的好處。接著是一個小區塊，顯示蘋果的營養數據，例如卡路里、膳食纖維等，最後是卡片底部。",
    "prompt.note": "以上為原始提示詞（繁體中文、逐字呈現）——所有模型收到的就是這段文字本身。",
    "nav.models": "模型",
    "filter.all": "全部",
    "label.effort": "思考強度",
    "params.quant": "量化",
    "params.temperature": "temperature",
    "params.min_p": "min-p",
    "params.top_p": "top-p",
    "params.top_k": "top-k",
    "params.architecture": "架構",
    "links.chatTemplate": "聊天模板",
    "links.model": "模型（GGUF）",
    "card.open": "全尺寸開啟",
    "compare.label": "選入比較",
    "compare.selected": "已選 %n 張",
    "compare.viewing": "正在比較 %n 張",
    "compare.button": "並排比較",
    "compare.clear": "清除",
    "compare.back": "← 返回全部卡片",
    "loadmore.button": "載入更多（剩 %n 張）",
    "theme.light": "切換到淺色模式",
    "theme.dark": "切換到深色模式",
    "lang.label": "語言",
    "footer.note": "所有卡片都是自包含的 HTML 與內嵌 CSS，無外部依賴。",
  },
};

const SUPPORTED_LANGS = [
  { code: "en", label: "English", match: ["en"] },
  // Any `zh*` browser code maps to Traditional Chinese
  // (the site's primary audience writes in zh-TW).
  { code: "zh-TW", label: "繁體中文", match: ["zh"] },
];

const DEFAULT_LANG = SUPPORTED_LANGS[0].code;
