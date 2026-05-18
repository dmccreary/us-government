---
title: Causes of Political Corruption — Trust In Government Causal Loop Diagram
description: An interactive systems-thinking view of the forces that erode and restore trust in the U.S. government. Four feedback loops — two reinforcing, two balancing — centered on the stock of public trust.
status: approved
library: vis-network
bloom_level: Analyze
---

# Causes of Political Corruption

A causal loop diagram (CLD) of the forces that **erode** and **restore** trust in the U.S. government.

The diagram below puts **Trust In Government** at the center as a *stock* — a quantity that fills or drains over time. Four feedback loops act on it:

- **Two reinforcing loops (R)** — vicious cycles that drive trust *down*.
- **Two balancing loops (B)** — self-correcting forces that push trust *back up*.

Whether trust recovers or collapses depends on which set of loops is stronger at any given moment.

!!! mascot-welcome "Welcome, future leaders!"
    ![Lex waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    *"The law belongs to all of us!"* Today we'll examine the system of forces shaping trust in government. Drag the nodes around — feel how everything is connected to everything else.

## How to read a causal loop diagram

| Symbol | Meaning |
|--------|---------|
| **+** (green) on an arrow | When the source goes up, the target also goes up |
| **−** (red) on an arrow | When the source goes up, the target goes *down* |
| **R** (red circle) | Reinforcing loop — runs away from equilibrium |
| **B** (green circle) | Balancing loop — pushes back toward equilibrium |

A loop with an **even** number of negative edges is **reinforcing**. A loop with an **odd** number is **balancing**.

---

## R1 — Gerrymandering Arms Race

When one state party draws aggressive district maps to lock in safe seats, the opposing party in other states feels pressured to retaliate. Both sides end up with uncompetitive elections that don't reward responsiveness to voters — and trust falls further with every cycle.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/gerrymandering-arms-race-cld.json"
     data-cld="gerrymandering-arms-race-cld"
     style="height:520px"></div>

[Open R1 Fullscreen](../cld-viewer/main.html?file=gerrymandering-arms-race-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Partisan hostility ↑ → Partisan gerrymandering ↑ → Uncompetitive elections ↑ → Trust falls further. Two negative edges → reinforcing.

---

## R2 — Disinformation Spiral

When official sources lose credibility, citizens seek alternatives. Many of those alternatives have weaker fact-checking and faster spread, which amplifies false claims and conspiracy beliefs — which in turn make government look even less trustworthy.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/disinformation-spiral-cld.json"
     data-cld="disinformation-spiral-cld"
     style="height:520px"></div>

[Open R2 Fullscreen](../cld-viewer/main.html?file=disinformation-spiral-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Alternative media use ↑ → Disinformation spread ↑ → Belief in conspiracies ↑ → Trust falls further. Two negative edges → reinforcing.

---

## R3 — Money in Politics

When trust falls, fewer ordinary citizens vote — but lobbyists and major donors still show up. Policy starts to reflect donor priorities more than voter priorities, which deepens cynicism and pushes turnout still lower. The legal landscape of this loop has shifted dramatically since *Citizens United v. FEC* (2010).

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/money-in-politics-cld.json"
     data-cld="money-in-politics-cld"
     style="height:520px"></div>

[Open R3 Fullscreen](../cld-viewer/main.html?file=money-in-politics-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Voter turnout ↓ → Special interest influence ↑ → Policy capture ↑ → Trust falls further. Two negative edges → reinforcing.

This loop is the trickiest to classify by inspection — the first edge (Trust → Turnout) is *positive* (they move together), but the second edge (Turnout → Special Interest Influence) is *negative*. Count carefully: 2 negatives = even = reinforcing.

---

## B1 — Civic Reform Pressure

Falling trust is not only destructive. It also mobilizes voters, activists, and reform candidates. After Watergate, sustained public pressure produced the *Ethics in Government Act of 1978*. After the 2008 financial crisis, *Dodd-Frank*. Real reforms reduce corruption and slowly rebuild trust.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/civic-reform-pressure-cld.json"
     data-cld="civic-reform-pressure-cld"
     style="height:520px"></div>

[Open B1 Fullscreen](../cld-viewer/main.html?file=civic-reform-pressure-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Civic activism ↑ → Anti-corruption reforms ↑ → Political corruption ↓ → Trust recovers. Three negative edges → balancing.

---

## B2 — Free Press Accountability

The First Amendment makes this loop possible. A free press can investigate without government permission. When journalists expose wrongdoing, prosecutors and Congress respond, and visible accountability rebuilds trust. Watergate, Iran-Contra, and Abu Ghraib all show the loop in action.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/free-press-accountability-cld.json"
     data-cld="free-press-accountability-cld"
     style="height:520px"></div>

[Open B2 Fullscreen](../cld-viewer/main.html?file=free-press-accountability-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Investigative journalism ↑ → Officials held accountable ↑ → Political corruption ↓ → Trust recovers. Three negative edges → balancing.

!!! mascot-thinking "Key Concept"
    ![Lex thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img"}
    The balancing loops all work by **reducing political corruption** — that's why they share a node. The Framers deliberately built B2 (free press) and B3 (judicial prosecution) into the Constitution.

---

## B3 — Judicial Oversight

The third constitutional check. When the Department of Justice prosecutes corrupt officials and federal courts convict them, the credible threat of prison deters future misconduct. This loop's strength depends critically on **prosecutorial independence** from the executive branch — when presidents can fire the prosecutors investigating them, the loop weakens dramatically.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/judicial-oversight-cld.json"
     data-cld="judicial-oversight-cld"
     style="height:520px"></div>

[Open B3 Fullscreen](../cld-viewer/main.html?file=judicial-oversight-cld&menu=true){ .md-button }

**Trace the loop:** Low trust → Federal indictments ↑ → Convictions ↑ → Political corruption ↓ → Trust recovers. Three negative edges → balancing.

**How does B3 connect to B2?** Investigative journalism (B2) often supplies the evidence that prosecutors (B3) use to indict. The two loops are sequential — exposure feeds prosecution. They share the same political corruption node.

---

## Status Table

| Loop | Type | Status (2026) | Comment |
|------|------|--------------|---------|
| R1 — Gerrymandering Arms Race | Reinforcing | **Strong, escalating** | Both parties draw aggressive maps after every census. |
| R2 — Disinformation Spiral | Reinforcing | **Very strong** | Social media has dramatically amplified the loop's speed. |
| R3 — Money in Politics | Reinforcing | **Strong, structural** | *Citizens United* (2010) widened the loop; voter turnout remains low in midterms. |
| B1 — Civic Reform Pressure | Balancing | **Weakening** | Congressional gridlock makes major reform bills harder to pass. |
| B2 — Free Press Accountability | Balancing | **Strong but contested** | The legal protection holds, but newsroom budgets have shrunk. |
| B3 — Judicial Oversight | Balancing | **Contested** | Strong in theory; depends entirely on prosecutorial independence in practice. |

---

## Putting It All Together

The full system below places **Trust In Government** at the hub, with the four "core" loops radiating outward. R1 and R2 (reinforcing) sit on top; B1 and B2 (balancing) sit at the bottom, both flowing through a shared **Political Corruption** node.

R3 (Money in Politics) and B3 (Judicial Oversight) are powerful loops in their own right but are kept out of the full-system diagram to preserve clarity. Explore each as a standalone above, or click the buttons in the chapter discussions.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/trust-in-government-full-cld.json"
     data-cld="trust-in-government-full-cld"
     style="height:720px"></div>

[Open Full System Fullscreen](../cld-viewer/main.html?file=trust-in-government-full-cld&menu=true){ .md-button .md-button--primary }

**The question this diagram makes visible:** are the two reinforcing loops driving trust down faster than the two balancing loops can restore it?

---

## Design Your Own Loop (Student Lab)

The six loops above are not the whole picture. Pick a force you think is missing — social media algorithms, foreign election interference, gerontocracy, partisan primaries, public education quality, lobbying revolving door — and draw it as a loop that passes through **Trust In Government**. Defend your polarity choices in class.

Once you have it on paper, you can turn it into a live diagram:

1. Copy any JSON file in [`docs/sims/cld-viewer/examples/`](../cld-viewer/index.md) as a starting template
2. Rename the file and the `metadata.id` to match (e.g., `my-loop-cld.json`)
3. Edit the `nodes`, `edges`, and `loops` arrays
4. Add your file's id to the `examples` list in `cld-viewer.js`
5. Load the page and click your new button

**Investigation questions to defend in class:**

- How many negative edges does your loop have? Does the parity match your declared loop type?
- Does your loop share a node with any of the six existing loops? Where do they connect?
- What real-world event in the past five years would make your loop visible?

---

## Signals to Watch

Three concrete, observable indicators that tell you which side of the system is winning:

1. **Trust polling** — Pew's [Public Trust in Government](https://www.pewresearch.org/politics/trust-in-government-1958-2024/) series. Trust above 30% means balancing loops are holding; below 20% means reinforcing loops are dominating.
2. **Major reform legislation** — Are bills like the *For the People Act* or *Freedom to Vote Act* passing? B1 is alive when reforms ship; weak when they stall.
3. **Investigative journalism output** — Number of Pulitzer Prizes for investigative reporting, FOIA suits filed, and newsroom employment levels. B2's strength tracks these.

---

## Bottom Line

Trust in government is not a fixed quantity — it is a *stock* that flows up and down based on the balance of feedback forces. The Framers built B2 (free press) into the Constitution and left room for B1 (civic reform) through the amendment process. But the U.S. has no constitutional defense against R1 (gerrymandering) or R2 (disinformation) — those have to be held in check by the balancing loops, by political will, and by an informed citizenry.

!!! mascot-celebration "You finished the chapter!"
    ![Lex celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    You've just learned to think in *systems* — to see how forces connect into loops rather than acting in straight lines. This is one of the most powerful tools in political analysis. *Knowledge is the cornerstone of democracy!*

---

## How This MicroSim Was Built

This MicroSim uses [vis-network](https://visjs.github.io/vis-network/docs/network/) to render the loops. Each diagram loads from a JSON file in [`docs/sims/cld-viewer/examples/`](../cld-viewer/main.html). You can edit the JSON files to add nodes, change polarities, or build your own loops.

- **Library:** vis-network 10.0.1
- **Bloom Level:** Analyze (L4) — students decompose a system into its feedback components
- **Status:** Built — implementation complete, awaiting human review

<style>
  .cld-inline {
    position: relative;
    width: 100%;
    background: aliceblue;
    border: 2px solid blue;
    margin-bottom: 1em;
    overflow: hidden;
  }
  .cld-inline-title {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font: 24px Arial, Helvetica, sans-serif;
    color: black;
    pointer-events: none;
    z-index: 10;
  }
</style>

<script src="../cld-viewer/cld-inline.js"></script>
