# JSON Schema Reference

Full reference for the output format produced by the scrapers.

---

## Top-Level Structure

```json
{
  "summary": { ... },
  "questions": [ ... ]
}
```

---

## `summary` Object

| Field | Type | Description |
|-------|------|-------------|
| `totalFlagged` | number | Total questions in this file (incorrect + partial) |
| `incorrect` | number | Questions where you scored 0 points |
| `partial` | number | Questions where you scored >0 but <total points |
| `totalPointsLost` | number | Sum of all points you could have gotten but didn't |

### Example
```json
"summary": {
  "totalFlagged": 38,
  "incorrect": 36,
  "partial": 2,
  "totalPointsLost": 42.5
}
```

---

## `questions` Array

Each element is a question object:

| Field | Type | Description |
|-------|------|-------------|
| `meta` | string | Question number, point value, and optional tiebreaker order |
| `status` | string | `"incorrect"` or `"partial"` |
| `pointsAwarded` | number \| null | Points you actually received. `null` = free response, not yet graded numerically |
| `pointsTotal` | number | Maximum points possible for this question |
| `question` | string | The question text |
| `yourAnswer` | string | What you wrote or selected |
| `correctAnswer` | string | The correct answer as shown on the results page |
| `imageUrls` | string[] | (optional) URLs of images embedded in the question |

### Example — Multiple Choice (Incorrect)
```json
{
  "meta": "2. (1.00 pts)",
  "status": "incorrect",
  "pointsAwarded": 0,
  "pointsTotal": 1,
  "question": "What is the average depth of the ocean?",
  "yourAnswer": "Selected: 5,000 m",
  "correctAnswer": "Correct: C"
}
```

### Example — Free Response (Partial)
```json
{
  "meta": "11. (2.00 pts)",
  "status": "partial",
  "pointsAwarded": null,
  "pointsTotal": 2,
  "question": "Let's say that at the bottom of layer C, there is about 10.5 ppt of sodium in water. Around how many ppt of chloride would you expect to find at the same layer? Which principal did you use to find this?",
  "yourAnswer": "17 ppt",
  "correctAnswer": "~19 ppt (allow answers from 18.5 to 19.5 ppt)\n\nPrincipal of constant proportions / Forchhammer's principal"
}
```

### Example — With Tiebreaker & Image
```json
{
  "meta": "27. (1.00 pts, Tiebreaker order: 60",
  "status": "incorrect",
  "pointsAwarded": null,
  "pointsTotal": 1,
  "question": "Is 2.5 meters a realistic height for the still water line? Explain.",
  "yourAnswer": "Depends on where you are...",
  "correctAnswer": "(answer: no, because the still water line is defined to be at 0 meters)",
  "imageUrls": [
    "https://scilympiad.com/Data/turs/.../image.png"
  ]
}
```

---

## Field Notes

### `meta` parsing
The `meta` field always starts with the question number and point value. It optionally includes tiebreaker order:
```
"14. (2.00 pts)"                      → Q14, 2 pts, no tiebreaker
"27. (1.00 pts, Tiebreaker order: 60" → Q27, 1 pt, tiebreaker position 60
```

### `pointsAwarded: null`
This happens when:
- It's a free response question that the scraper couldn't parse a score for
- The grader left the score blank
- It's a partial credit question with a complex rubric

Claude should treat `null` as "some points lost, amount unknown."

### `correctAnswer` format variations
The correct answer field is not standardized across test creators:

| Format | Example | Meaning |
|--------|---------|---------|
| Letter only | `"Correct: B"` | MC answer, letter only — Claude must infer the actual answer |
| Letter + bracket | `"Correct: [Cirrus]"` | Fill-in-the-blank answer |
| Full text | `"Thermal expansion\nAs ocean temperatures rise..."` | Free response rubric |
| Parenthetical | `"(answer: no, because...)"` | Short answer with explanation |

### `imageUrls`
Image URLs point directly to Scilympiad's CDN. Claude cannot fetch these URLs during cheat sheet generation. However, the question text usually provides enough context to understand what was being asked.

---

## Scraper Differences

| Field | `partial-plus-incorrect.js` | `incorrect-only-scrape.js` |
|-------|-----------------|----------------------|
| Includes `"incorrect"` | ✅ | ✅ |
| Includes `"partial"` | ✅ | ❌ |
| `summary.partial` | Accurate | Always `0` |
| `summary.totalFlagged` | incorrect + partial | incorrect only |
