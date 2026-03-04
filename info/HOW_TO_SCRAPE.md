# How to Scrape Your Scilympiad Results

## Prerequisites

- Google Chrome (or any Chromium browser)
- Access to your Scilympiad test results page
- The scraper script from this repo (`partial-plus-incorrect.js` or `incorrect-only-scrape.js`)

---

## Step-by-Step

### 1. Open Your Test Results

Log into [scilympiad.com](https://scilympiad.com), navigate to your test, and open the **results/review page** — the one where you can see each question with your answer and the correct answer shown side by side.

> ⚠️ The scraper will NOT work on the test-taking page or the summary page. It needs the full question review page.

### 2. Open Chrome DevTools Console

**Windows/Linux:** `F12` → click the **Console** tab  
**Mac:** `Cmd + Option + J`

You should see a blinking cursor in the console.

### 3. Paste the Scraper Script

Go back to (GitHub)[https://github.com/shankar-sachin/study-scioly/tree/main] and click on your preferred script ((Partially Correct + Incorrect)[partial-plus-incorrect.js] or (Incorrect Only)[incorrect-only.js])

Hit **Enter**.

### 4. Wait for the Download

The script will:
1. Parse all questions on the page
2. Identify which ones you got wrong or partially correct
3. Build a JSON object with your answers + correct answers
4. Auto-download a file named `flagged_questions.json`

This usually takes under a second.

### 5. Rename & Repeat

Rename the downloaded file to something descriptive:
```
flagged_questions_invitational1.json
flagged_questions_invitational2.json
flagged_questions_regional.json
```

Repeat for each test round. Then upload all of them to Claude at once.

---

## Choosing the Right Scraper

| Scraper | Captures | Best For |
|---------|----------|----------|
| `partial-plus-incorrect.js` | Incorrect + partial | Most comprehensive — use this |
| `incorrect-only-scrape.js` | Incorrect only | Quicker, fewer entries, less noise |

**Recommendation:** Use `partial-plus-incorrect.js`. Partial credit questions often reveal the most nuanced misconceptions — stuff where you *kinda* knew but missed a key detail.

---

## Troubleshooting

**Nothing downloaded?**
- Make sure you're on the question review page, not the summary
- Check if your browser blocked the download (look for a popup in the address bar)
- Try running `console.log("test")` first to confirm the console is active

**JSON file is empty / has 0 questions?**
- The page layout may have changed since the scraper was written
- Open an issue on this repo with a screenshot of the results page

**Script throws an error?**
- Copy the error message and open an issue

---

## Privacy Note

The JSON files contain your test answers and the correct answers. They do **not** contain your login credentials, personal info, or anything beyond question/answer text. Still, don't commit them to a public repo unless you're okay sharing your test performance publicly.
