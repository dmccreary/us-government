---
title: Iron Triangle vs. Issue Network — Structural Comparison
description: Students will *compare and contrast* (Bloom L4 — Analyze) the iron triangle and issue network models of policy influence, and *apply* (Bloom L3 — Apply) each model to a contemporary policy domain.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Iron Triangle vs. Issue Network — Structural Comparison

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students will *compare and contrast* (Bloom L4 — Analyze) the iron triangle and issue network models of policy influence, and *apply* (Bloom L3 — Apply) each model to a contemporary policy domain.

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: "Chapter 11: Interest Groups, Campaigns, and Elections"](../../chapters/11-interest-groups-campaigns-and-elections/index.md).

```text
Type: interactive infographic
**sim-id:** iron-triangle-vs-issue-network<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *compare and contrast* (Bloom L4 — Analyze) the iron triangle and issue network models of policy influence, and *apply* (Bloom L3 — Apply) each model to a contemporary policy domain.

**Design:**
- Two panels side by side:
  - Left: "Iron Triangle" — three nodes (Congressional Committee, Executive Agency, Interest Group) connected by bidirectional arrows labeled with what flows along each link (money, legislation, information, career opportunities)
  - Right: "Issue Network" — many nodes (committee, multiple agencies, many interest groups, think tanks, academics, journalists, advocacy organizations) connected by a complex web of relationships
- Clicking a node opens an infobox describing that actor's role and interest
- Clicking an arrow opens a description of the resource or influence flowing along that link
- A "Case Study" dropdown lets students apply either model to: (1) Agriculture policy, (2) Defense procurement, (3) Banking regulation, (4) Environmental regulation — loading a labeled version of the selected diagram for that domain
- A "Which model fits better?" question at the bottom with explanatory text for each case study
- Canvas: 100% width × 500px; responsive
```

## Related Resources

- [Chapter 11: "Chapter 11: Interest Groups, Campaigns, and Elections"](../../chapters/11-interest-groups-campaigns-and-elections/index.md)
