---
title: Checks and Balances Among the Three Branches
description: Students will *identify* (Bloom L1 — Remember) each constitutional check and *explain* (Bloom L2 — Understand) how it prevents any one branch from becoming too powerful.
status: implemented
library: p5.js
bloom_level: Understand
---

# Checks and Balances Among the Three Branches

## Learning Objective

Students will *identify* (Bloom L1 — Remember) each constitutional check and *explain* (Bloom L2 — Understand) how it prevents any one branch from becoming too powerful.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Identify, Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Chapter 2: The Constitution and Bill of Rights"](../../chapters/02-constitution-and-bill-of-rights/index.md).

```text
Type: interactive infographic
**sim-id:** checks-and-balances-diagram<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *identify* (Bloom L1 — Remember) each constitutional check and *explain* (Bloom L2 — Understand) how it prevents any one branch from becoming too powerful.

**Design:**
- Three nodes arranged in a triangle: Congress (top-left), President (top-right), Judiciary (bottom-center)
- Each node is a rounded rectangle with the branch name and its main constitutional function
- Directed arrows between each pair of nodes, each labeled with a specific check
- Clicking an arrow opens an infobox explaining the check in one sentence and giving a real historical example
- Color coding: Congress = orange, President = blue, Judiciary = purple
- Checks to include:

Congress → President:
- Override veto (2/3 both chambers)
- Declare war (limits Commander-in-Chief)
- Control appropriations (power of the purse)
- Impeach and remove president

President → Congress:
- Veto legislation
- Call special sessions
- Recommend legislation (State of the Union)
- Negotiate treaties (Senate must ratify by 2/3)

Congress → Judiciary:
- Senate confirms federal judges
- Impeach and remove judges
- Set jurisdiction of lower federal courts
- Constitutional amendment can override rulings

Judiciary → Congress:
- Judicial review — can strike down statutes as unconstitutional

Judiciary → President:
- Judicial review — can strike down executive orders as unconstitutional

President → Judiciary:
- Nominate all federal judges (including Supreme Court)

**Historical examples in infoboxes (sample):**
- Override veto: Congress overrode President Nixon's veto of the War Powers Resolution in 1973
- Judicial review of president: *Youngstown Sheet & Tube Co. v. Sawyer* (1952) struck down Truman's seizure of steel mills
- Senate confirms judges: Senate rejected Bork (1987), confirmed Kagan (2010)

**Interactive feature:** A "Test Yourself" button hides all arrow labels; student must click each arrow and type what check it represents before revealing the answer.

**Canvas:** 100% width × 500px; responsive stacking on mobile.
```

## Related Resources

- [Chapter 2: "Chapter 2: The Constitution and Bill of Rights"](../../chapters/02-constitution-and-bill-of-rights/index.md)
