---
title: The Grants Spectrum — Categorical to Block
description: Students will *compare and contrast* (Bloom L4 — Analyze) categorical grants and block grants, and *evaluate* (Bloom L5 — Evaluate) the trade-offs between federal accountability and state flexibility.
status: implemented
library: p5.js
bloom_level: Evaluate
---

# The Grants Spectrum — Categorical to Block

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students will *compare and contrast* (Bloom L4 — Analyze) categorical grants and block grants, and *evaluate* (Bloom L5 — Evaluate) the trade-offs between federal accountability and state flexibility.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Compare, Evaluate
- **Library:** p5.js

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Federalism and Federal Powers"](../../chapters/03-federalism-and-federal-powers/index.md).

```text
Type: interactive infographic
**sim-id:** grants-spectrum-slider<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *compare and contrast* (Bloom L4 — Analyze) categorical grants and block grants, and *evaluate* (Bloom L5 — Evaluate) the trade-offs between federal accountability and state flexibility.

**Design:**
- A horizontal slider labeled "Federal Control ←→ State Flexibility"
- Left anchor: "Categorical Grant" (high federal control, low state flexibility)
- Right anchor: "Block Grant" (low federal control, high state flexibility)
- As the user moves the slider, two panels update simultaneously:
  - Left panel: "Federal Government Perspective" — describes what changes (more/less accountability, more/less ability to ensure national standards)
  - Right panel: "State Government Perspective" — describes what changes (more/less freedom to innovate, more/less administrative burden)
- Three preset examples appear as clickable buttons above the slider: "Medicaid" (near categorical), "TANF" (block), "Highway Funds" (conditional categorical — move slider to that position when clicked)
- Below the slider: "Key AP Fact: Congress determines grant type when it appropriates funds. Presidents can advocate for a shift, but Congress must pass the legislation."
- Canvas: 100% width × 400px; responsive
```

## Related Resources

- [Chapter 3: "Chapter 3: Federalism and Federal Powers"](../../chapters/03-federalism-and-federal-powers/index.md)
