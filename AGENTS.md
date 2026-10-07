# AGENTS.md

## 任務

**提示詞：**

> 寫一個簡單的 HTML 卡片，介紹吃蘋果的好處。將程式碼貼在這裡。設計風格為「果園筆記」，看起來像筆記本的一頁或撕式卡片。卡片頂部印有果園筆記編號（蘋果為 01）及標題，接著是一道撕線，然後是正文。正文包含一個大尺寸的蘋果圖片（或表情符號），以及以互動且時尚格式列出的好處。接著是一個小區塊，顯示蘋果的營養數據，例如卡路里、膳食纖維等，最後是卡片底部。

**語言基線（重要）：** 本 repo 的所有模型卡片，都是模型針對上述**原始繁體中文提示詞**的產出。任何將本 repo 的介面、文案、文件或 `llms.txt` 翻譯成非中文語言（英文、日文等）時，都必須明確註明：卡片成果是基於「繁體中文提示詞」做出的，翻譯文字僅供理解，不得暗示模型收到的是該語言的提示詞。

**輸出格式：**
- 單一 `index.html` 檔案
- 所有 CSS 內嵌在 `<style>` 標籤中
- 不依賴外部資源（Google Fonts 除外）
- 使用繁體中文

## 產出規範

1. 將 `index.html` 放入 `{模型家族}/{具體變體}/` 資料夾
   - 模型家族：按模型來源分類（首字母大寫），如 `Qwen`、`Gemma`、`OpenAI`、`LiquidAI`
   - 具體變體：完整模型名稱，如 `Qwen3.6-35B-think`
2. 不要修改其他模型的檔案
3. 不要修改 `README.md`、`AGENTS.md`
4. 新增模型卡片後，须在 repo 根目錄 `models.js` **末尾** append 一列（`{ family, variant, effort?, file, added, notes? }`），網站首頁才會顯示其預覽（篩選按鈕與左側導航欄會自動產生，無需手動維護）
   - `added`（**必要**）：該卡片加入 repo 的日期，格式 `"YYYY-MM-DD"`（即當天日期）。它是網站的排序鍵，見下方「排序規則」
   - `effort`（選填）：同一模型的不同 reasoning effort，每個 effort 一列，變體相鄰、較強的排前面
   - `notes`（選填）：短標籤陣列，寫執行環境/量化/上下文等備註（如 `["llama.cpp", "Q4_K_M", "ctx 4096"]`）
   - `README.md` 與 `llms.txt` 的模型表格請一併同步，**最新的列排在最上層**，並帶「加入日期」欄位

## 排序規則（必須遵守：新成果置頂）

網站一律把**最新加入的模型卡片排在最上層**。實作方式：

1. `models.js` 的 `MODELS` 陣列**只 append、不手動重排**，保持加入時間的先後順序。
2. 每一列必須帶 `added: "YYYY-MM-DD"`。
3. `main.js` 的 `orderRegistry()` 依 `added` **倒序**排序後才渲染（`ORDER`）。
   - 缺 `added` 的列會落到最後
   - **同日期者的 tie-break（明文規則）**：保持書寫順序，即當天 append 的先後。
     同一模型的 effort 變體**必須較強的寫在前面**（xhigh → high → medium），
     變體才會相鄰且由強到弱。把 `added` 改成含時分的時間戳**無法**免除這條規則
     （同一次 commit 加入的變體時間戳相同），所以這條規則要長期遵守。
4. 因此新增模型時**不要**為了排序去動 `models.js` 的列序，也**不要**改 `main.js`；
   只要在末尾 append 並填對 `added`，位置會自動正確。
5. 所有渲染路徑（卡片網格、家族篩選鈕、左側導航欄、側欄跳轉的分頁計算）
   都必須讀同一個排序後的 `ORDER`，不可混用 `MODELS`。
   - **唯一例外**：左側導航欄的**家族名稱**採 0-9 → A-Z 字母序（方便按名稱查找），
     但家族**內**的模型仍依 `ORDER` 的最新在前。篩選鈕與卡片網格不受影響。
6. `README.md`「已測試模型」與 `llms.txt`「Available cards」兩份表格
   必須同步為最新的在前，並帶加入日期欄位。

## 支援的模型格式

- 資料夾內 `index.html`（Gemma、OpenAI、Qwen 等）
- 資料夾內 `apple-benefits-card.html`（LiquidAI 等）
- 資料夾內多個 reasoning effort 變體檔案（同一模型不同思考強度，檔名為 effort 等級，如 `Qwen3.8-27B` 的 `xhigh.html`、`medium.html`）

## 測試模型清單

> 這是**節選範例**，不是完整清單。完整且正確的清單以 [`models.js`](./models.js) 為準，
> `README.md` 與 `llms.txt` 的表格需與其一致，且一律**最新加入的排在最上層**（見「排序規則」）。

| 模型家族 | 具體變體 | 檔案名稱 |
|---------|---------|---------|
| OpenBMB | Sharp-MiniCPM5-2B-GGUF | `index.html` |
| Qwen | Qwen3.8-27B | `xhigh.html`（reasoning effort: xhigh）、`medium.html`（reasoning effort: medium），同一模型不同思考強度各一組 |
| LiquidAI | LFM2.5-2.6B | `apple-benefits-card.html` |

## 評估標準

1. **視覺設計**：撕式卡片風格、果園筆記編號、整體美感
2. **內容完整性**：蘋果好處、營養數據、資訊正確性
3. **互動性**：CSS 動畫、響應式設計
4. **程式碼品質**：HTML/CSS 結構、無外部依賴
