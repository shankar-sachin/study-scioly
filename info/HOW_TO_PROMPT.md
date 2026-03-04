# How to Prompt Claude Effectively

The prompt guides in this repository root are designed to get the best possible cheat sheet out of Claude. Here's what's happening under the hood and how to customize them.

---

## The Core Idea

Claude needs to do three things simultaneously:

1. **Diagnose your misconceptions** — not just note that you got Q7 wrong, but understand *why* you got it wrong (wrong direction of reasoning, vocab gap, formula confusion, etc.)
2. **Synthesize across files** — if you missed the same concept in 3 different tests, it should appear as one consolidated entry, not three
3. **Generate a formatted document** — not just markdown, but an actual `.docx` with proper styling

The prompt is engineered to push Claude toward all three.

---

## Key Prompt Decisions Explained

### "Organize by topic, not by test round"
Without this, Claude will often do a lazy pass of "Test 1 mistakes, Test 2 mistakes..." which is useless for studying. Forcing topic organization makes Claude actually synthesize.

### "Analyze my misconceptions from yourAnswer"
The `yourAnswer` field is gold. It tells Claude *how* you were wrong, not just *that* you were wrong. E.g., if you answered "increases" when the answer is "decreases" across 4 questions, Claude should flag that as a systematic reversal error.

### "Prioritize high pointsTotal questions"
A 10-point free response you bombed matters more than a 0.5-point MC you guessed wrong. Without this instruction, Claude weights all questions equally.

### "Fill in correct answers where it just says 'Correct: B'"
Multiple choice answers often just reference an answer letter without the text. Claude's knowledge of the event fills the gap — but it needs explicit permission to do this, otherwise it'll hedge and leave blanks.

### "Generate the .docx directly"
Without this, Claude sometimes just outputs a markdown block or plain text and says "here's your cheat sheet." This forces it to actually produce the file.

---

## Customization Tips

### Change the color scheme
Replace the hex codes in the prompt:
```
#0B3D6B → your preferred dark color (headers)
#1565A7 → your preferred medium color (subheaders)
#B7472A → your preferred warning color
#FFF3CD → your preferred formula box background
```

### Add specific topics to emphasize
Add a line like:
```
Pay extra attention to: [topic 1], [topic 2], [topic 3]
```

### Request additional sections
```
Also include:
- A "Key People & Discoveries" table with scientist names and what they're known for
- A timeline of major events
- A comparison table for [concept A] vs [concept B]
```

### Adjust length
```
Keep the cheat sheet under 10 pages / make it as comprehensive as possible / aim for ~15 pages
```

---

## What Claude Does Well

- Synthesizing patterns across many questions
- Identifying systematic misconceptions (not just one-off errors)
- Generating well-formatted tables and formulas
- Inferring what "Correct: B" actually means using domain knowledge
- Calling out "traps" — questions designed to exploit common misconceptions

## What Claude Sometimes Gets Wrong

- Exact numerical answers from multiple choice (it doesn't see the actual choices)
- Very niche sub-event-specific facts that weren't in training data
- Occasionally conflates concepts from different sub-topics when they share vocabulary

**Fix:** After getting the cheat sheet, skim it for anything that seems off and ask Claude to correct specific entries.

---

## Pro Tips

**Upload in one message.** Don't upload JSON files one at a time across multiple messages — Claude's synthesis is much better when it sees all files simultaneously.

**Name your files descriptively.** `flagged_MIT_invitational.json` is more useful than `flagged_questions3.json` because Claude can reference which round each mistake came from.

**Run it twice if needed.** If the first output misses a topic you know you struggled with, just say "also add a section on [topic]" and Claude will patch it.

**Ask for a follow-up Q&A.** After the cheat sheet is done, you can say "now quiz me on the hardest 10 concepts from that cheat sheet" and Claude will generate flashcard-style questions.
