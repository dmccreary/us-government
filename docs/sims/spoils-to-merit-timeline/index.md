---
title: Spoils System vs. Merit System — Comparing Federal Employment Eras
description: Students will *compare* (Bloom L2 — Understand) the spoils and merit systems and *explain* (Bloom L2 — Understand) why the transition occurred and what problems it solved.
status: implemented
library: p5.js
bloom_level: Understand
---

# Spoils System vs. Merit System — Comparing Federal Employment Eras

## Learning Objective

Students will *compare* (Bloom L2 — Understand) the spoils and merit systems and *explain* (Bloom L2 — Understand) why the transition occurred and what problems it solved.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Compare, Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: "Chapter 6: The Federal Bureaucracy"](../../chapters/06-the-federal-bureaucracy/index.md).

```text
Type: interactive infographic
**sim-id:** spoils-to-merit-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *compare* (Bloom L2 — Understand) the spoils and merit systems and *explain* (Bloom L2 — Understand) why the transition occurred and what problems it solved.

**Design:**
- A split-screen timeline: left half shows "Spoils Era (1828–1883)" with red warning icons; right half shows "Merit Era (1883–present)" with green check icons
- Key events are clickable cards:
  - Spoils: Jackson's "rotation in office" policy (1829), number of patronage jobs under Grant administration, Garfield assassination by Guiteau (1881)
  - Merit: Pendleton Act (1883), extension of merit system (1900s), Hatch Act (1939, restricts political activity by federal employees), Civil Service Reform Act (1978)
- Each card opens an infobox with the event's name, date, description, and a "Why it matters" line connecting it to the current civil service system
- Clickable comparison table below: rows are criteria (hiring basis, job protection, dismissal grounds, political activity allowed), columns are spoils vs. merit
- Canvas: 100% width × 400px; responsive
```

## Related Resources

- [Chapter 6: "Chapter 6: The Federal Bureaucracy"](../../chapters/06-the-federal-bureaucracy/index.md)
