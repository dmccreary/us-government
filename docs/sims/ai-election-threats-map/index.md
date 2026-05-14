---
title: AI Threat Taxonomy for Elections — Interactive Risk Map
description: Students will *classify* (Bloom L2 — Understand) different types of AI-enabled election threats and *evaluate* (Bloom L5 — Evaluate) the effectiveness of proposed countermeasures against each threat type.
status: scaffold
library: p5.js
bloom_level: TBD
---

# AI Threat Taxonomy for Elections — Interactive Risk Map

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students will *classify* (Bloom L2 — Understand) different types of AI-enabled election threats and *evaluate* (Bloom L5 — Evaluate) the effectiveness of proposed countermeasures against each threat type.

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: "Chapter 12: The Impact of AI on Government"](../../chapters/12-impact-of-ai-on-government/index.md).

```text
Type: interactive infographic
**sim-id:** ai-election-threats-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *classify* (Bloom L2 — Understand) different types of AI-enabled election threats and *evaluate* (Bloom L5 — Evaluate) the effectiveness of proposed countermeasures against each threat type.

**Design:**
- A matrix with threat type on the Y-axis (deepfakes, text disinformation, micro-targeting, voter suppression via false information, infrastructure attacks) and attack vector on the X-axis (social media, email, broadcast, in-person)
- Each cell in the matrix is clickable: clicking opens an infobox with: threat description, real example (if available), estimated difficulty to detect, proposed countermeasures
- A toggle switches from "Threat View" to "Defense View" — highlighting which threats each defensive measure (watermarking, platform moderation, media literacy, legal penalties, technical detection) addresses
- A "What Works?" panel summarizes expert consensus on most promising near-term defenses
- Canvas: 100% width × 500px; responsive
```

## Related Resources

- [Chapter 12: "Chapter 12: The Impact of AI on Government"](../../chapters/12-impact-of-ai-on-government/index.md)
