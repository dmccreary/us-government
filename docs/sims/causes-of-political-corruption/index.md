---
title: Causes of Political Corruption — Trust In Government Causal Loop Diagram
description: An interactive systems-thinking view of the forces that erode and restore trust in the U.S. government. Four feedback loops — two reinforcing, two balancing — centered on the stock of public trust.
status: built
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
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Lex waving welcome">
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
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Lex thinking">
    The two balancing loops both work by **reducing political corruption** — that's why they share a node in the full system view. The Framers deliberately built B2 into the Constitution.

---

## Status Table

| Loop | Type | Status (2026) | Comment |
|------|------|--------------|---------|
| R1 — Gerrymandering Arms Race | Reinforcing | **Strong, escalating** | Both parties draw aggressive maps after every census. |
| R2 — Disinformation Spiral | Reinforcing | **Very strong** | Social media has dramatically amplified the loop's speed. |
| B1 — Civic Reform Pressure | Balancing | **Weakening** | Congressional gridlock makes major reform bills harder to pass. |
| B2 — Free Press Accountability | Balancing | **Strong but contested** | The legal protection holds, but newsroom budgets have shrunk. |

---

## Putting It All Together

The full system places **Trust In Government** at the hub, with all four loops radiating outward. The two reinforcing loops (R1, R2) sit on top; the two balancing loops (B1, B2) sit at the bottom, both flowing through a shared **Political Corruption** node.

<div class="cld-inline"
     data-src="../../sims/cld-viewer/examples/trust-in-government-full-cld.json"
     data-cld="trust-in-government-full-cld"
     style="height:720px"></div>

[Open Full System Fullscreen](../cld-viewer/main.html?file=trust-in-government-full-cld&menu=true){ .md-button .md-button--primary }

**The question this diagram makes visible:** are the two reinforcing loops driving trust down faster than the two balancing loops can restore it?

---

## Future Loops to Explore (Student Labs)

The four loops above are a starting point, not the whole picture. The following loops were considered for this diagram but left out to keep complexity manageable. Each one would make a good **student project**: design the JSON, justify the polarities, and add it to the full system.

### Lab idea 1 — Judicial Oversight (Balancing)

> Political Corruption ↑ → Federal Indictments ↑ → Convictions and Sentences ↑ → Political Corruption ↓ → Trust Recovers ↑

The judicial branch is the third constitutional check. When the DOJ prosecutes corrupt officials and courts convict them, the credible threat of jail time deters future misconduct. The strength of this loop depends on prosecutorial independence — which is itself a debated topic.

**Investigation questions:**

- How is this loop different from B2 (Free Press)? Where do they connect?
- What happens to this loop when the executive branch can fire prosecutors?

### Lab idea 2 — Money in Politics (Reinforcing)

> Low Trust → Low Voter Turnout ↑ → Influence of Special Interests ↑ → Policy Capture ↑ → Low Trust

When trust falls, fewer ordinary citizens vote — but lobbyists and donors still show up. Policy starts to reflect donor priorities more than voter priorities, which deepens cynicism and pushes turnout still lower.

**Investigation questions:**

- Which campaign finance reforms (BCRA 2002, Citizens United 2010) would shift this loop, and in which direction?
- Is this loop reinforcing or balancing? Count the negative edges carefully.

### Lab idea 3 — Design your own

Pick a force you think is missing — social media algorithms, foreign election interference, gerontocracy, partisan primaries, public education quality — and draw it as a loop that passes through **Trust In Government**. Defend your polarity choices in class.

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
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Lex celebrating">
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
