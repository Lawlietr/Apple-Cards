# AGENTS.md

## 任務

**提示詞：**

> 寫一個簡單的 HTML 卡片，介紹吃蘋果的好處。將程式碼貼在這裡。設計風格為「果園筆記」，看起來像筆記本的一頁或撕式卡片。卡片頂部印有果園筆記編號（蘋果為 01）及標題，接著是一道撕線，然後是正文。正文包含一個大尺寸的蘋果圖片（或表情符號），以及以互動且時尚格式列出的好處。接著是一個小區塊，顯示蘋果的營養數據，例如卡路里、膳食纖維等，最後是卡片底部。

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

## 支援的模型格式

- 資料夾內 `index.html`（Gemma、OpenAI、Qwen 等）
- 資料夾內 `apple-benefits-card.html`（LiquidAI 等）
- 資料夾內多個變體檔案（同一模型多組測試，如 `Qwen3.8-27B` 的 `xhigh.html`、`medium.html`）

## 測試模型清單

| 模型家族 | 具體變體 | 檔案名稱 |
|---------|---------|---------|
| Gemma | Gemma4-12B | `index.html` |
| Gemma | HauhauCS-Gemma-4-26B-A4B | `index.html` |
| OpenAI | GPT-OSS-20B | `index.html` |
| Qwen | Kwaipilot_KAT-Coder-V2.5-Dev | `index.html` |
| Qwen | Qwen-3.5-9B | `index.html` |
| Qwen | Qwen3.6-35B-think | `index.html` |
| Qwen | Qwen3.8-27B | `xhigh.html`、`medium.html`（同一模型的多組測試變體） |
| LiquidAI | LFM2.5-2.6B | `apple-benefits-card.html` |

## 評估標準

1. **視覺設計**：撕式卡片風格、果園筆記編號、整體美感
2. **內容完整性**：蘋果好處、營養數據、資訊正確性
3. **互動性**：CSS 動畫、響應式設計
4. **程式碼品質**：HTML/CSS 結構、無外部依賴
