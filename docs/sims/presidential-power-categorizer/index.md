---
title: Presidential Power — Formal vs. Informal Sources
description: Students will *classify* (Bloom L2 — Understand) presidential powers as enumerated (constitutional) or informal (practice-based), and *apply* (Bloom L3 — Apply) this distinction to novel scenarios.
status: implemented
library: p5.js
bloom_level: Apply
---

# Presidential Power — Formal vs. Informal Sources

## Learning Objective

Students will *classify* (Bloom L2 — Understand) presidential powers as enumerated (constitutional) or informal (practice-based), and *apply* (Bloom L3 — Apply) this distinction to novel scenarios.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Classify, Apply
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Chapter 5: The Presidency"](../../chapters/05-the-presidency/index.md).

```text
Type: MicroSim
**sim-id:** presidential-power-categorizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *classify* (Bloom L2 — Understand) presidential powers as enumerated (constitutional) or informal (practice-based), and *apply* (Bloom L3 — Apply) this distinction to novel scenarios.

**Design:**
- Two drop zones at the top: "Enumerated (Constitutional)" and "Informal (Practice-Based)"
- A stack of draggable cards below, each naming one presidential power
- Student drags each card to the correct zone; card snaps in with a checkmark (correct) or shakes and returns (incorrect)
- After all cards sorted, a "Review" screen shows the correct categorization with a one-sentence explanation for each

**Power cards to include:**
- Veto legislation → Enumerated (Article II)
- Issue executive orders → Informal (practice)
- Commander in Chief → Enumerated (Article II)
- Negotiate executive agreements → Informal (accepted by courts)
- Grant pardons → Enumerated (Article II)
- Use signing statements → Informal (practice)
- Appoint federal judges → Enumerated (Article II, with Senate consent)
- Declare emergencies → Informal (statutory + practice)
- Make treaties → Enumerated (Article II, Senate must ratify)
- "Go public" — appeal directly to citizens to pressure Congress → Informal (mass media era)
- Receive ambassadors → Enumerated (Article II)
- Impound appropriated funds → Contested; curtailed by 1974 Impoundment Control Act

**Canvas:** 100% width × 500px; responsive.
```

## Related Resources

- [Chapter 5: "Chapter 5: The Presidency"](../../chapters/05-the-presidency/index.md)
