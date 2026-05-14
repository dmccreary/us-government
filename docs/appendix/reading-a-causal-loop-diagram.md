---
title: "Appendix: Reading a Causal Loop Diagram"
description: A step-by-step guide to reading the causal loop diagrams (CLDs) used throughout this textbook. Walks through one simple reinforcing loop and one simple balancing loop, explaining every component along the way.
---

# Appendix: Reading a Causal Loop Diagram

Several chapters of this textbook include **causal loop diagrams** (CLDs) — interactive pictures of how forces in government push on each other over time. The most complex one is the four-loop "Forces Acting on Trust In Government" diagram in [Chapter 1](../chapters/01-foundations-of-democracy/index.md). Before you tackle that, work through this appendix. It uses two **simple 3-node examples** to teach you every part of a CLD.

By the end of this page you will be able to:

1. Identify the four visual elements of a CLD (**nodes**, **edges**, **polarity markers**, **loop markers**)
2. Trace a loop and determine whether it is **reinforcing** or **balancing**
3. Predict what behavior the loop will produce *over time*

!!! mascot-welcome "Welcome, future leaders!"
    ![Lex waving welcome](../img/mascot/welcome.png){ class="mascot-admonition-img"}
    *"The law belongs to all of us!"* A causal loop diagram is a special kind of picture that political scientists, economists, and engineers all use. Once you can read one, you can read *all* of them. Take it slow — we'll build up one piece at a time.

---

## The Four Building Blocks

Every CLD in this textbook is built from just four things:

| Element | What it looks like | What it means |
|---------|-------------------|---------------|
| **Node** | A rectangle with a label | A *variable* — something that can go up or down (e.g., "Poll Numbers", "Approval Rating") |
| **Edge** | An arrow from one node to another | A *causal link* — "this thing affects that thing" |
| **Polarity marker** | A green **+** or red **−** on the arrow | The *direction* of the effect — same direction (+) or opposite direction (−) |
| **Loop marker** | A circle with **R** (red) or **B** (green) at the center | A label for the whole loop — **R**einforcing or **B**alancing |

That's it. No other symbols, no hidden rules. Once you know these four, you can read every CLD in this book.

---

## Example 1: A Reinforcing Loop

Let's start with a simple political example: how a candidate gains *momentum* during a campaign. People sometimes call this the "bandwagon effect" — success breeds more success.

The diagram below shows the loop. Try **hovering** over a node, an edge or the "Reinforcing" (R) circle
to display the details. You can also drag the items around the screen and pan the diagram
by dragging the background.

<iframe src="/us-government/sims/cld-viewer/main.html?file=campaign-momentum-cld" width="100%" height="500" scrolling="no"></iframe>

[Open Fullscreen with Details Panel](../sims/cld-viewer/main.html?file=campaign-momentum-cld&menu=true){ .md-button }

### Step 1: Read each node

There are three nodes in this loop:

- **Poll Numbers** — the candidate's standing in opinion polls
- **Campaign Donations** — money flowing into the campaign
- **Ad Spending** — money the campaign spends on TV and digital ads

### Step 2: Read each arrow (edge)

There are three arrows, and **all three are green with a + sign**. A green **+** means *the two variables move in the same direction*:

- **Poll Numbers → Campaign Donations (+):** When poll numbers go up, donations go up. (Donors like to back winners.)
- **Campaign Donations → Ad Spending (+):** When donations go up, ad spending goes up. (More money = more ads.)
- **Ad Spending → Poll Numbers (+):** When ad spending goes up, poll numbers go up. (Ads persuade voters.)

### Step 3: Trace the loop

Now follow the arrows around the circle. Pick any node — let's start with **Poll Numbers** — and imagine it goes *up* a little:

1. Poll Numbers ↑ → (because of the +) Campaign Donations ↑
2. Campaign Donations ↑ → (because of the +) Ad Spending ↑
3. Ad Spending ↑ → (because of the +) Poll Numbers ↑↑

We came back to where we started — but Poll Numbers is now even *higher*. The loop **amplified** the change. Run it again and Poll Numbers grows even more. This is a **runaway** behavior — that is what the (R) symbol for "reinforcing" means.

In the example above each of the edges is green with a "+" sign which means that
it increases the quantity or store of an item it points to.  However, some edges
will be red and and a (-) symbol.  This means they lower the amount of what they point to.


### Step 4: Confirm with the negative-edge count

Here is a useful shortcut to tell reinforcing from balancing without tracing the whole loop:

> **Count the negative (red) edges. Even number → Reinforcing. Odd number → Balancing.**

Campaign Momentum has **zero** negative edges. Zero is even, so the loop is **reinforcing**. The red **R** marker at the center of the loop confirms this.

!!! mascot-tip "Lex's Tip"
    ![Lex giving a helpful tip](../img/mascot/tip.png){ class="mascot-admonition-img"}
    A reinforcing loop is not always *good*. The same shape can produce a virtuous cycle (success breeds success) *or* a vicious cycle (decline breeds more decline). The *math* is the same; only the direction of change is different. That is why R1 (Gerrymandering Arms Race) and R2 (Disinformation Spiral) in the Trust in Government diagram are also reinforcing — but they make things *worse*, not better.

---

## Example 2: A Balancing Loop

Now let's look at the *opposite* kind of loop: one that *resists* change rather than amplifying it.

Consider what happens to a president's approval rating over a four-year term. New presidents often start with high approval — call this the "honeymoon period." A president with high approval feels confident enough to take political risks (controversial vetoes, ambitious legislation, executive orders). Those risks anger some voters. The backlash drives approval back down. Then, with low approval, the president becomes more cautious — and approval often recovers somewhat. The whole system *oscillates* around an average.

<iframe src="/us-government/sims/cld-viewer/main.html?file=approval-self-correction-cld" width="100%" height="500" scrolling="no"></iframe>

[Open Fullscreen with Details Panel](../sims/cld-viewer/main.html?file=approval-self-correction-cld&menu=true){ .md-button }

### Step 1: Read each node

- **Approval Rating** — the percentage of Americans who approve of the president's job performance
- **Risky Policy Choices** — controversial moves that use up political capital
- **Voter Backlash** — public anger, protest, and negative media coverage

### Step 2: Read each arrow

Look carefully — **one of the arrows is red with a − sign**:

- **Approval Rating → Risky Policy Choices (+):** High approval emboldens the president to take risks.
- **Risky Policy Choices → Voter Backlash (+):** Risky choices anger some voters.
- **Voter Backlash → Approval Rating (−):** Backlash pulls approval *down*. **This is the negative edge** — the variables move in *opposite* directions.

### Step 3: Trace the loop

Start with Approval Rating going *up* a little:

1. Approval Rating ↑ → (+) Risky Policy Choices ↑
2. Risky Policy Choices ↑ → (+) Voter Backlash ↑
3. Voter Backlash ↑ → (**−**) Approval Rating ↓

We came back to Approval Rating — but it went **down**, not up. The loop *fought back* against the original change. That is what "balancing" means: the loop pushes the system toward a stable equilibrium.

### Step 4: Confirm with the negative-edge count

Approval Self-Correction has **one** negative edge. One is odd, so the loop is **balancing**. The green **B** marker at the center of the loop confirms this.

!!! mascot-thinking "Key Concept"
    ![Lex thinking carefully](../img/mascot/thinking.png){ class="mascot-admonition-img"}
    Most stabilizing forces in democracy are balancing loops. Elections, term limits, checks and balances, judicial review, public protest — all of them work by *pushing back* when one branch or one party gains too much power. The Framers' entire constitutional design is built on balancing loops.

---

## Reinforcing vs. Balancing: Side by Side

| Feature | Reinforcing (R) | Balancing (B) |
|---------|----------------|---------------|
| **Marker color** | Red | Green |
| **Negative edges** | Even number (0, 2, 4...) | Odd number (1, 3, 5...) |
| **Behavior over time** | Amplifies — exponential growth or decay | Resists — oscillates around an equilibrium |
| **Common metaphor** | "Snowball rolling downhill" | "Thermostat" |
| **Political examples in this textbook** | R1 Gerrymandering Arms Race, R2 Disinformation Spiral | B1 Civic Reform Pressure, B2 Free Press Accountability |

---

## Why the "Count Negatives" Trick Works

Here is the intuition. A positive (+) edge says "same direction." A negative (−) edge says "flip the direction."

If a perturbation goes around the loop and gets flipped an *even* number of times (0, 2, 4...), it comes back the *same direction* as it started — and the next pass amplifies it again. That's reinforcing.

If it gets flipped an *odd* number of times (1, 3, 5...), it comes back in the *opposite* direction — and the next pass undoes it. That's balancing.

You can verify this on any CLD in this textbook. Try it on the four-loop diagram in [Chapter 1](../chapters/01-foundations-of-democracy/index.md):

- R1 Gerrymandering Arms Race: 2 negative edges → even → reinforcing ✓
- R2 Disinformation Spiral: 2 negative edges → even → reinforcing ✓
- B1 Civic Reform Pressure: 3 negative edges → odd → balancing ✓
- B2 Free Press Accountability: 3 negative edges → odd → balancing ✓

---

## Practice Questions

Test your understanding before moving on:

1. A CLD has 5 edges. Three of them are negative. Is the loop reinforcing or balancing? *(Three is odd → balancing.)*
2. A CLD has 4 edges, all positive. Reinforcing or balancing? *(Zero negatives is even → reinforcing.)*
3. If you start with a node at value 10 and a reinforcing loop runs once, will the value come back closer to 10 or further from 10? *(Further from 10 — amplification.)*
4. If you start with a node at value 10 and a balancing loop runs once, will the value come back closer to 10 or further? *(Closer to 10 — resistance.)*
5. In the four-loop Trust in Government diagram, two reinforcing loops push trust *down* and two balancing loops push trust *up*. What does this tell you about the long-term behavior of trust in government? *(It depends on which set of loops is stronger at any given moment — the system is a tug-of-war.)*

---

## Where to Go Next

Now that you can read a CLD:

- Return to **[Chapter 1: Foundations of Democracy](../chapters/01-foundations-of-democracy/index.md)** and look at the full Trust in Government system with fresh eyes
- Visit the **[Causes of Political Corruption MicroSim](../sims/causes-of-political-corruption/index.md)** to explore each of the four loops one at a time
- Open the **[CLD Viewer](../sims/cld-viewer/index.md)** to load any diagram, drag nodes around, and explore details by clicking

!!! mascot-celebration "You did it!"
    ![Lex celebrating](../img/mascot/celebration.png){ class="mascot-admonition-img"}
    You can now read a causal loop diagram — a skill used by political scientists, policy analysts, and economists every day. *Knowledge is the cornerstone of democracy!*

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
