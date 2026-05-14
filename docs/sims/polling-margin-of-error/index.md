---
title: Understanding Polling — Margin of Error MicroSim
description: Students will *interpret* (Bloom L2 — Understand) polling data including margin of error and *apply* (Bloom L3 — Apply) this understanding to distinguish between statistically significant differences and statistical ties.
status: implemented
library: p5.js
bloom_level: Apply
---

# Understanding Polling — Margin of Error MicroSim

## Learning Objective

Students will *interpret* (Bloom L2 — Understand) polling data including margin of error and *apply* (Bloom L3 — Apply) this understanding to distinguish between statistically significant differences and statistical ties.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Interpret, Apply
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="472" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: "Chapter 9: Political Opinion, Media, and Civic Reasoning"](../../chapters/09-political-opinion-media-and-civic-reasoning/index.md).

```text
Type: MicroSim
**sim-id:** polling-margin-of-error<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *interpret* (Bloom L2 — Understand) polling data including margin of error and *apply* (Bloom L3 — Apply) this understanding to distinguish between statistically significant differences and statistical ties.

**Design:**
- A horizontal bar chart showing two candidates ("Candidate A" and "Candidate B") with adjustable bars
- Sliders on the left:
  - "Sample size": 100 to 5,000 (default 1,000)
  - "Candidate A support": 40% to 60%
- As sliders adjust, the chart shows:
  - Each bar with its percentage
  - Error bars (±margin of error) around each bar
  - A color-coded verdict: "STATISTICAL TIE" (if ranges overlap) or "CLEAR LEAD" (if ranges don't overlap)
  - The formula displayed: Margin of Error = 1 / √(sample size) × 100%
- A note at the bottom: "Real margins of error are more complex, but this approximation captures the key relationship: larger samples → smaller margin of error → more precise estimates."
- Educational callout: "If a poll says A leads 52%-48% with ±4% margin, can you call a winner?" → No: A's range is 48%–56%; B's range is 44%–52%. Overlapping ranges = statistical tie.
- Canvas: 100% width × 450px; responsive
```

## Related Resources

- [Chapter 9: "Chapter 9: Political Opinion, Media, and Civic Reasoning"](../../chapters/09-political-opinion-media-and-civic-reasoning/index.md)
