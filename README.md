# 🏆 Science Olympiad Study Guide Generator from Online Invitationals (through Scilympiad)

---

## ⏻ Quick Start

Unless you genuinely want to waste your splendid time on this repository, I'd recommend just going to one of the scrapers, going to DevTools, pasting, and then taking that and uploading it to an AI, then getting the prompt from (single invy)[info/PROMPT_SINGLE.md] or (single invy)[info/PROMPT_MULTI.md] and then taking that study guide and using it.

---

## Overview

Automatically scrape your flagged questions from [Scilympiad](https://scilympiad.com), dump them to JSON, then feed them to Claude to generate a **nationals-ready `.docx` cheat sheet** covering every weak area.

> Built for Division C-level students. Tested on Solar System, Meteorology, and Oceanography.
> Credits: Info documents might be AI-y, they were built mostly on Claude.

---

## 📁 Repo Structure

```
scioly-cheatsheet-repo/
├── README.md                    ← you are here
├── scrapers/
│   ├── scraper_all.js           ← scrapes incorrect + partial questions
│   └── scraper_incorrect.js     ← scrapes incorrect questions only
├── demo/
│   └── demo.json                ← example output JSON
├── prompts/
│   ├── PROMPT_SINGLE.md         ← Claude prompt for 1 JSON file
│   └── PROMPT_MULTI.md          ← Claude prompt for multiple JSON files (recommended)
└── docs/
    ├── HOW_TO_SCRAPE.md         ← step-by-step scraping guide
    ├── HOW_TO_PROMPT.md         ← how to talk to Claude effectively
    └── JSON_SCHEMA.md           ← full JSON field reference
```

---

## ⚡ Quick Start

### Step 1 — Scrape your test results

1. Open your Scilympiad test results page in Chrome
2. Open DevTools → Console (`F12` or `Cmd+Option+J`)
3. Paste the contents of `partial-plus-incorrect.js` (or `incorrect-only-scrape.js`)
4. Hit Enter — a JSON file will auto-download
5. Repeat for each invitational round

### Step 2 — Feed to Claude

1. Go to [claude.ai](https://claude.ai)
2. Upload all your JSON files
3. Copy-paste the prompt from `info/PROMPT_MULTI.md`
4. Watch Claude cook

### Step 3 — Download your cheat sheet

Claude will generate a `.docx` file you can download, print, or load into your binder.

---

## 🔧 Scraper Variants

| File | What it captures | Use case |
|------|-----------------|----------|
| `partial-plus-incorrect.js` | Incorrect **+** partial credit questions | Recommended — catches everything you fumbled |
| `incorrect-only-scrape.js` | Incorrect questions only | Faster, cleaner, fewer entries |

See [`info/HOW_TO_SCRAPE.md`](info/HOW_TO_SCRAPE.md) for detailed usage.

---

## 📊 JSON Output Schema

Each JSON file contains:
```json
{
  "summary": {
    "totalFlagged": 38,
    "incorrect": 36,
    "partial": 2,
    "totalPointsLost": 42.5
  },
  "questions": [
    {
      "meta": "2. (1.00 pts)",
      "status": "incorrect",
      "pointsAwarded": 0,
      "pointsTotal": 1,
      "question": "What is the average depth of the ocean?",
      "yourAnswer": "Selected: 5,000 m",
      "correctAnswer": "Correct: C"
    }
  ]
}
```

Full schema reference in [`info/JSON_SCHEMA.md`](info/JSON_SCHEMA.md).

---

## 📝 Example Output

The generated cheat sheet includes:
- **Color-coded sections** by topic
- **Two-column tables** for quick lookup (term → definition/answer)
- **Formula boxes** (yellow background, monospace font)
- **Warning callouts** for common traps you fell for
- **Fill-in-the-blank section** summarizing answer patterns
- **Rapid-fire T/F section** for last-minute review

---

## ⚠️ Known Limitations

- The scraper only works on **Scilympiad** test result pages (not paper scantrons)
- Multiple choice questions where the correct answer is just `"Correct: B"` won't give Claude the actual answer text — Claude will infer from context where possible
- Images embedded in questions are captured as URLs but Claude cannot view them directly


