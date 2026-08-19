# 🍎 果園筆記 — LLM 模型比較專案

> 同一份提示詞，不同模型，比較產出品質。

## 專案結構

```
apple-cards/
├── README.md              ← 你現在讀的檔案
├── AGENTS.md              ← 任務規格書（給 agent 看的提示詞與規範）
├── Google/
│   ├── Gemma4-12B/
│   └── HauhauCS-Gemma-4-26B-A4B/
├── OpenAI/
│   └── GPT-OSS-20B/
├── Qwen/
│   ├── Kwaipilot_KAT-Coder-V2.5-Dev/
│   ├── Qwen-3.5-9B/
│   ├── Qwen3.6-35B-think/
│   │   ├── index.html     ← 模型產出
│   │   └── notes.md       ← 測試環境與觀察
├── LiquidAI/
│   └── LFM2.5-2.6B/
│       └── apple-benefits-card.html
└── ...
```

## 使用方式

1. 將 `AGENTS.md` 中的提示詞與規範提供給模型
2. 將模型產出的 `index.html` 放入對應 `{模型家族}/{具體變體}/` 資料夾
3. 在該資料夾內建立 `notes.md` 記錄測試環境參數
4. 開啟 `index.html` 於瀏覽器預覽

## 已測試模型

| 模型家族 | 具體變體 | 檔案 |
|---------|---------|------|
| Google | Gemma4-12B | `Google/Gemma4-12B/index.html` |
| Google | HauhauCS-Gemma-4-26B-A4B | `Google/HauhauCS-Gemma-4-26B-A4B/index.html` |
| OpenAI | GPT-OSS-20B | `OpenAI/GPT-OSS-20B/index.html` |
| Qwen | Kwaipilot_KAT-Coder-V2.5-Dev | `Qwen/Kwaipilot_KAT-Coder-V2.5-Dev/index.html` |
| Qwen | Qwen-3.5-9B | `Qwen/Qwen-3.5-9B/index.html` |
| Qwen | Qwen3.6-35B-think | `Qwen/Qwen3.6-35B-think/index.html` |
| LiquidAI | LFM2.5-2.6B | `LiquidAI/LFM2.5-2.6B/apple-benefits-card.html` |

## 提示詞規範

請參閱 [`AGENTS.md`](./AGENTS.md)
