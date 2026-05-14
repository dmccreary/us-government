---
title: Cognitive Bias in Political Reasoning — Interactive Scenario Explorer
description: Students will *classify* (Bloom L2 — Understand) examples of biased political reasoning as confirmation bias, motivated reasoning, availability heuristic, in-group favoritism, or anchoring, and *apply* (Bloom L3 — Apply) this knowledge to evaluate political arguments they encounter.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Cognitive Bias in Political Reasoning — Interactive Scenario Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students will *classify* (Bloom L2 — Understand) examples of biased political reasoning as confirmation bias, motivated reasoning, availability heuristic, in-group favoritism, or anchoring, and *apply* (Bloom L3 — Apply) this knowledge to evaluate political arguments they encounter.

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: "Chapter 9: Political Opinion, Media, and Civic Reasoning"](../../chapters/09-political-opinion-media-and-civic-reasoning/index.md).

```text
Type: MicroSim
**sim-id:** cognitive-bias-identifier<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *classify* (Bloom L2 — Understand) examples of biased political reasoning as confirmation bias, motivated reasoning, availability heuristic, in-group favoritism, or anchoring, and *apply* (Bloom L3 — Apply) this knowledge to evaluate political arguments they encounter.

**Design:**
- A carousel of 8 short scenario cards (political reasoning vignettes, 2–3 sentences each)
- Example scenarios:
  1. "When I heard the crime rate had dropped, I immediately looked for reasons the statistic might be wrong — because I believe crime is getting worse." → Confirmation bias / motivated reasoning
  2. "I read about a recent terrorist attack and now I think terrorism is the #1 threat facing the country, even though car accidents kill far more Americans." → Availability heuristic
  3. "I think my party's candidate's use of executive orders is normal and necessary, but the other party's candidate doing the same thing is a constitutional crisis." → In-group favoritism / motivated reasoning
  4. "The pollster first told me the candidate was at 70%, so when they revised down to 52%, it still felt high." → Anchoring bias
- For each scenario, student clicks to identify the bias from a drop-down list
- After answering, the card flips to reveal the correct bias and a one-paragraph explanation of how it operates in political contexts
- Score tracked at top; final screen shows "X of 8 correct" with review option
- Canvas: 600px × 400px; responsive
```

## Related Resources

- [Chapter 9: "Chapter 9: Political Opinion, Media, and Civic Reasoning"](../../chapters/09-political-opinion-media-and-civic-reasoning/index.md)
