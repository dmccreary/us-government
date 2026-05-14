---
title: Gerrymandering — Packing and Cracking Visualized
description: Students will *demonstrate* (Bloom L3 — Apply) how district boundary drawing affects election outcomes, and *analyze* (Bloom L4 — Analyze) the difference between packing and cracking strategies.
status: approved
library: p5.js
bloom_level: Analyze
---

# Gerrymandering — Packing and Cracking Visualized

<iframe src="main.html" width="100%" height="402" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students will *demonstrate* (Bloom L3 — Apply) how district boundary drawing affects election outcomes, and *analyze* (Bloom L4 — Analyze) the difference between packing and cracking strategies.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Demonstrate, Analyze
- **Library:** p5.js

## Specification

The full specification below is extracted from
[Chapter 4: "Chapter 4: Congress: Structure and Processes"](../../chapters/04-congress-structure-and-processes/index.md).

```text
Type: MicroSim
**sim-id:** gerrymandering-microsim<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *demonstrate* (Bloom L3 — Apply) how district boundary drawing affects election outcomes, and *analyze* (Bloom L4 — Analyze) the difference between packing and cracking strategies.

**Design:**
- A grid of ~50 cells representing a hypothetical state, each cell colored red or blue (fixed voter distribution: 60% blue, 40% red)
- Three preset district configurations selectable by buttons:
  1. "Fair" — compact districts roughly proportional to voter distribution → result: ~60% blue seats, ~40% red seats
  2. "Pack Blue" — blue voters packed into 2 landslide districts; red wins 5 of 7 remaining → result: red wins majority of seats despite blue voter majority
  3. "Crack Blue" — blue majority split across multiple districts where blue loses narrowly → result: similar to Pack scenario
- Each configuration shows the resulting seat distribution as a bar chart below the grid
- Clicking on a district highlights its voters and shows: "District X: 72% blue, 28% red — SAFE BLUE" or "District Y: 54% red, 46% blue — LEAN RED"
- A "Draw Your Own" mode lets the student drag district borders and see how their choices change the seat distribution in real time
- Key stat displayed: "Voter share vs. seat share — the gap is the gerrymander"
- Canvas: 700px × 500px; responsive scaling
```

## Related Resources

- [Chapter 4: "Chapter 4: Congress: Structure and Processes"](../../chapters/04-congress-structure-and-processes/index.md)
