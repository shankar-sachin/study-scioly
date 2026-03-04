# Claude Prompt — Multiple JSON Files (Recommended)

Use this when you have **2–8 JSON files** from different invitational rounds for the same event.

---

## How to Use

1. Upload all your JSON files to Claude
2. Copy everything below the `---` line and paste it as your message
3. Send it

---

## ✂️ COPY FROM HERE

------

I'm attaching [N] JSON files from my Science Olympiad **[EVENT NAME]** invitational test results. Each file contains questions I got wrong or only partially correct, scraped from Scilympiad using a browser console script.

Please create a comprehensive, nationals-ready `.docx` cheat sheet covering every weak area revealed by these files combined. Verify whether the scorer was correct or not.
If yes, find the general topic behind that question and create a new part in the study guide with the explanation and study description (concise, detailed, **[HIGH OR LOW LEVEL]**).

**Event:** [EVENT NAME — e.g. Meteorology, Oceanography, Solar System]
**Division:** C
**Goal:** Nationals preparation

---

### Cheat Sheet Requirements

**Structure:**
- 10–14 major sections organized by topic (not by test round)
- Each section has an H1 header (dark blue, underlined)
- Subsections use H2 headers (medium blue)
- Warning callouts (⚠) in red for traps I fell for repeatedly

**Content priorities (in order):**
1. Topics where I lost the most points
2. Conceptual mistakes (wrong direction of reasoning, not just wrong facts)
3. Vocabulary/definitions I clearly didn't know
4. Fill-in-the-blank patterns that appeared multiple times
5. Rapid-fire T/F traps
6. Math/calculation worked examples

**Formatting:**
- Two-column tables for term → definition/answer pairs (blue left column, white right)
- Yellow formula boxes (monospace font) for equations with worked examples
- Bullet lists only for multi-item sequences
- Fill-in-the-blank section at the end with answer key inline
- Rapid-fire T/F table at the end
- Sign off with something encouraging lol

**Document settings:**
- US Letter, 0.75" margins
- Arial font throughout
- Color scheme: headers #0B3D6B (dark blue), subheaders #1565A7 (medium blue), warnings #B7472A (red), formula boxes #FFF3CD (yellow bg)

---

### What to Watch For in the JSON

- `"status": "incorrect"` = I got 0 points
- `"status": "partial"` = I got some points but not all
- `"yourAnswer"` = what I wrote/selected (analyze my misconceptions)
- `"correctAnswer"` = the right answer (use this as ground truth)
- High `pointsTotal` questions = prioritize these
- Questions where my answer reveals a systematic misunderstanding > random guesses

### Important Notes
- Some correct answers just say `"Correct: B"` without the actual answer text — use your knowledge of [EVENT NAME] to fill in what the correct answer actually is
- Consolidate similar mistakes across all files into one entry (don't repeat the same concept 4 times)
- Don't organize by test round — organize by topic
- Be brutally honest about where I clearly had no clue vs where I was close

Generate the `.docx` file directly. Do not just show me the content as text.

-----

## FINISH COPYING HERE
