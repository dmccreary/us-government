---
title: How a Bill Becomes a Law
description: Students will *recall* (Bloom L1 — Remember) the sequence of steps in the legislative process and *apply* (Bloom L3 — Apply) this knowledge to determine at what stage a hypothetical bill was defeated.
status: approved
library: p5.js
bloom_level: Apply
---

# How a Bill Becomes a Law

<iframe src="main.html" width="100%" height="652" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Learning Objective

Students will *recall* (Bloom L1 — Remember) the sequence of steps in the legislative process and *apply* (Bloom L3 — Apply) this knowledge to determine at what stage a hypothetical bill was defeated.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Recall, Apply
- **Library:** p5.js

## Specification

The full specification below is extracted from
[Chapter 4: "Chapter 4: Congress: Structure and Processes"](../../chapters/04-congress-structure-and-processes/index.md).

```text
Type: interactive infographic
**sim-id:** bill-to-law-flowchart<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *recall* (Bloom L1 — Remember) the sequence of steps in the legislative process and *apply* (Bloom L3 — Apply) this knowledge to determine at what stage a hypothetical bill was defeated.

**Design:**
- Vertical flowchart with branching paths showing all possible outcomes (pass, fail, veto, override)
- Each step is a clickable node that opens an infobox with: step name, who is involved, what happens, and "where bills die" statistics
- Color coding: active steps in blue, kill points in red, success paths in green
- Steps in the flow:

1. Bill introduced (House or Senate)
2. Referred to committee
3. Subcommittee hearing and markup [Kill point: most bills die here — no hearing scheduled]
4. Full committee markup and vote [Kill point: committee votes no]
5. Rules Committee (House only) — sets terms of floor debate [Kill point: unfavorable rule or no rule granted]
6. Floor debate and amendment votes
7. Chamber floor vote [Kill point: majority votes no]
8. Sent to other chamber → repeats steps 2–7 in that chamber [Kill point: other chamber kills it]
9. If chambers pass different versions → Conference committee
10. Conference report voted on by both chambers [Kill point: one chamber rejects conference report]
11. Enrolled bill sent to President
12. Presidential action: Sign → becomes law; Veto → back to Congress; Pocket veto (Congress adjourned); No action (Congress in session → becomes law after 10 days)
13. Veto override vote: 2/3 both chambers → becomes law over veto [Kill point: override fails]

**Statistics in infoboxes:** "Approximately 10,000–15,000 bills are introduced each Congress. Fewer than 5% become law."

**Interactive feature:** "Test a Scenario" — user clicks a stage and sees: "Your bill died here. What would it take to revive it?"

**Canvas:** 100% width, scrollable; responsive design
```

## Related Resources

- [Chapter 4: "Chapter 4: Congress: Structure and Processes"](../../chapters/04-congress-structure-and-processes/index.md)
