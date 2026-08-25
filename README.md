# 🍎 果園筆記 — LLM 模型比較專案

> 同一份提示詞，不同模型，比較產出品質。
>
> 儲存庫根目錄同時託管公開預覽網站（GitHub Pages）：所有模型的卡片可以在同一頁面並排比較。
> 線上網址：<https://lawlietr.github.io/Apple-Cards/>

## 專案結構

```
apple-cards/
├── README.md              ← 你現在讀的檔案
├── AGENTS.md              ← 任務規格書（給 agent 看的提示詞與規範）
├── index.html             ← 網站首頁（GitHub Pages）
├── style.css              ← 網站樣式（日夜主題）
├── i18n.js                ← 網站介面文字（多語言擴充點）
├── models.js              ← 模型清單（驅動網站篩選鈕與預覽網格）
├── main.js                ← 網站邏輯（主題、語言、篩選、渲染）
├── llms.txt               ← 給 AI bot 的網站說明
├── .nojekyll              ← GitHub Pages 靜態發布
├── Gemma/
│   ├── Gemma4-12B/
│   └── HauhauCS-Gemma-4-26B-A4B/
├── OpenAI/
│   ├── GPT-OSS-20B/
│   └── GPT-5.6_sol/
│       ├── xhigh.html       ← effort: xhigh
│       └── high.html        ← effort: high
├── Qwen/
│   ├── Kwaipilot_KAT-Coder-V2.5-Dev/
│   ├── Qwen-3.5-9B/
│   ├── Qwen3.6-35B-think/
│   │   ├── index.html     ← 模型產出
│   │   └── notes.md       ← 測試環境與觀察
│   └── Qwen3.8-27B/       ← 同一模型不同 reasoning effort
│       ├── xhigh.html     ← effort: xhigh
│       └── medium.html    ← effort: medium
├── LiquidAI/
│   └── LFM2.5-2.6B/
│       └── apple-benefits-card.html
└── ...
```

## 使用方式

1. 將 `AGENTS.md` 中的提示詞與規範提供給模型
2. 將模型產出的 `index.html` 放入對應 `{模型家族}/{具體變體}/` 資料夾
3. 在該資料夾內建立 `notes.md` 記錄測試環境參數
4. 在 `models.js` 末尾 append 一列，讓新模型出現在網站
5. 預覽：瀏覽器開啟網站首頁 `index.html`（或直接開啟該模型的卡片檔案）

## 已測試模型

| 模型家族 | 具體變體 | 檔案 |
|---------|---------|------|
| Gemma | Gemma4-12B | `Gemma/Gemma4-12B/index.html` |
| Gemma | HauhauCS-Gemma-4-26B-A4B | `Gemma/HauhauCS-Gemma-4-26B-A4B/index.html` |
| OpenAI | GPT-OSS-20B | `OpenAI/GPT-OSS-20B/index.html` |
| OpenAI | GPT-5.6_sol（reasoning effort: xhigh） | `OpenAI/GPT-5.6_sol/xhigh.html` |
| OpenAI | GPT-5.6_sol（reasoning effort: high） | `OpenAI/GPT-5.6_sol/high.html` |
| Qwen | Kwaipilot_KAT-Coder-V2.5-Dev | `Qwen/Kwaipilot_KAT-Coder-V2.5-Dev/index.html` |
| Qwen | Qwen-3.5-9B | `Qwen/Qwen-3.5-9B/index.html` |
| Qwen | Qwen3.6-35B-think | `Qwen/Qwen3.6-35B-think/index.html` |
| Qwen | Qwen3.8-27B（reasoning effort: xhigh） | `Qwen/Qwen3.8-27B/xhigh.html` |
| Qwen | Qwen3.8-27B（reasoning effort: medium） | `Qwen/Qwen3.8-27B/medium.html` |
| LiquidAI | LFM2.5-2.6B | `LiquidAI/LFM2.5-2.6B/apple-benefits-card.html` |

## 公開網站（GitHub Pages）

網站位於 repo 根目錄，發布步驟：

1. 將此 repo push 到 GitHub
2. Settings → Pages → Source 選 **Deploy from a branch**，branch 選 `main`、folder 選 `/ (root)`
3. 上線網址：`https://lawlietr.github.io/Apple-Cards/`

網站功能：日夜主題（手動切換後瀏覽器會記住）、左側模型導航欄（按廠商分組、點開下拉模型、點擊快速跳到對應卡片；僅供導覽，不做篩選與比較）、按模型家族篩選、以 iframe 即時預覽每張卡片、初次只載入前幾張（按「Load more」載入其餘）、勾選 2–4 張卡片可並排比較。

## 新增模型

1. 卡片檔放入 `{模型家族}/{具體變體}/`
2. `models.js` 末尾 append 一列：`{ family, variant, effort?, file, notes? }`
   - `notes`（選填）：短字串陣列，會以小標籤顯示在模型名稱旁，
     適合放執行參數與量化資訊，例如：
     `notes: ["llama.cpp", "Q4_K_M", "ctx 4096"]`
3. 同步更新本檔「已測試模型」表格與 `llms.txt` 的表格（建議）

## 新增語言

目前支援：英文（`en`）、繁體中文（`zh-TW`）。介面文字集中在 `i18n.js`，要再加語言：

1. `I18N` 中新增該語言物件（key 照 `en` 抄，缺漏的 key 會自動 fallback 到英文）
2. `SUPPORTED_LANGS` 加一列（`code`、`label`、`match`）

語言選擇器、自動偵測與記憶自動生效，不需改其他程式碼。

## 提示詞規範

請參閱 [`AGENTS.md`](./AGENTS.md)
