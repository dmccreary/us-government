---
title: Electoral College — Interactive Map
description: Students will *explain* (Bloom L2 — Understand) how the Electoral College works and *analyze* (Bloom L4 — Analyze) how winner-take-all creates strategic incentives that concentrate campaign attention in swing states.
status: approved
library: p5.js
bloom_level: Analyze
---

# Electoral College — Interactive Map

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students will *explain* (Bloom L2 — Understand) how the Electoral College works and *analyze* (Bloom L4 — Analyze) how winner-take-all creates strategic incentives that concentrate campaign attention in swing states.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Explain, Analyze
- **Library:** p5.js

## Specification

The full specification below is extracted from
[Chapter 10: "Chapter 10: Voting, Political Parties, and Participation"](../../chapters/10-voting-political-parties-and-participation/index.md).

```text
Type: interactive infographic
**sim-id:** electoral-college-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *explain* (Bloom L2 — Understand) how the Electoral College works and *analyze* (Bloom L4 — Analyze) how winner-take-all creates strategic incentives that concentrate campaign attention in swing states.

**Design:**
- SVG map of the United States with each state colored by electoral vote count (gradient from light = few to dark = many)
- Each state is clickable: clicking shows a popup with the state's name, electoral vote count, and "lean" (safe blue/safe red/swing) based on recent election history
- "Build a Coalition" mode: user clicks states to allocate them to Candidate A or Candidate B; running tally of electoral votes shown at top
- System checks if 270 reached and displays "Candidate A wins" or "Candidate B wins"
- A toggle shows the result under a national popular vote system for comparison (for recent elections)
- A stats panel: "Competitive states (swing states) in recent elections: ~10 states. Non-competitive states: ~40 states."
- A reform options button: shows Electoral Vote Compact (give all electoral votes to national popular vote winner), proportional allocation (split by congressional district), and direct popular election — with pros and cons of each
- Canvas: 100% width × 500px; responsive
```

## Related Resources

- [Chapter 10: "Chapter 10: Voting, Political Parties, and Participation"](../../chapters/10-voting-political-parties-and-participation/index.md)
