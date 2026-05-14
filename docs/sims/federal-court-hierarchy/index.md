---
title: Three-Tier Federal Court Hierarchy
description: Students will *identify* (Bloom L1 — Remember) the three tiers of the federal court system and *explain* (Bloom L2 — Understand) what kind of jurisdiction each tier exercises and how cases move between levels.
status: implemented
library: p5.js
bloom_level: Understand
---

# Three-Tier Federal Court Hierarchy

## Learning Objective

Students will *identify* (Bloom L1 — Remember) the three tiers of the federal court system and *explain* (Bloom L2 — Understand) what kind of jurisdiction each tier exercises and how cases move between levels.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Identify, Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: "Chapter 7: The Federal Judiciary"](../../chapters/07-the-federal-judiciary/index.md).

```text
Type: interactive infographic
**sim-id:** federal-court-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *identify* (Bloom L1 — Remember) the three tiers of the federal court system and *explain* (Bloom L2 — Understand) what kind of jurisdiction each tier exercises and how cases move between levels.

**Design:**
- Three horizontal bands (top = Supreme Court, middle = 13 Circuits, bottom = 94 District Courts), arranged like a pyramid
- Each band is clickable: clicking opens an infobox with facts about that level (number of courts, jurisdiction type, who decides)
- Upward arrows labeled "Appeal" connect district courts → circuit courts → Supreme Court
- A side panel shows "State Court System" with dotted arrows showing that state supreme court decisions on federal/constitutional questions can also reach the U.S. Supreme Court
- A "trace a case" feature lets students click through the path of a hypothetical case from district court complaint to Supreme Court ruling
- The 13 circuit boundaries shown as a small clickable map; clicking a circuit highlights the states it covers
- Canvas: 100% width × 500px; responsive
```

## Related Resources

- [Chapter 7: "Chapter 7: The Federal Judiciary"](../../chapters/07-the-federal-judiciary/index.md)
