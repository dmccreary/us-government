# Course Description Assessment

**Course:** US Government
**Analyzer Version:** 0.03
**Assessment Date:** 2026-05-13
**Target Audience:** High school students (grades 9–12) seeking college credit
**Alignment Standard:** College Board AP US Government and Politics

---

## Overall Score: 97 / 100

**Quality Rating: Excellent — Ready for learning graph generation**

This course description is comprehensive, specific, and well-structured. It
meets or exceeds every element of the quality rubric and is aligned with the
College Board AP US Government and Politics curriculum framework. The addition
of a dedicated AI-in-government unit is innovative and positions this textbook
ahead of current AP offerings. The description provides sufficient breadth and
depth to support generation of 200+ concepts.

---

## Detailed Scoring Breakdown

| Element | Max | Earned | Notes |
|---|---|---|---|
| Title | 5 | 5 | Clear, specific, matches `site_name` in `mkdocs.yml` |
| Target Audience | 5 | 5 | Grades 9–12, college credit, AP alignment explicitly stated |
| Prerequisites | 5 | 5 | Formally stated as "None"; optional middle-school civics noted |
| Main Topics Covered | 10 | 10 | 11 topics with substantive sub-bullets; AI unit is a strong addition |
| Topics Not Covered | 5 | 4 | 7 exclusions listed; minor overlap between "comparative government" and "parliamentary systems" bullets |
| Learning Outcomes Header | 5 | 5 | "After completing this course, students will be able to:" present |
| Remember | 10 | 10 | 9 outcomes; specific cases, statutes, and terms cited by name |
| Understand | 10 | 10 | 9 outcomes; causal and explanatory verbs (explain, summarize, describe) used correctly |
| Apply | 10 | 10 | 8 outcomes; concrete procedural scenarios (fact patterns, data interpretation) |
| Analyze | 10 | 10 | 8 outcomes; decomposition and comparison tasks are clearly differentiated from Understand |
| Evaluate | 10 | 10 | 8 outcomes; judgment criteria and evidence standards are explicit |
| Create | 10 | 10 | 7 outcomes; includes capstone products (amendment design, legislative proposal, policy memo, MicroSim) |
| Descriptive Context | 5 | 3 | 3-paragraph overview is strong; minor deduction because AP exam format (MCQ/FRQ structure) is not described |
| **Total** | **100** | **97** | |

---

## Gap Analysis

### Minor Gaps (3 points total)

**Topics Not Covered (−1 pt):** The exclusion list contains two bullets that
partially overlap ("Comparative government and political systems of other
nations" and "Parliamentary systems, proportional representation"). These could
be consolidated without loss of precision.

**Descriptive Context (−2 pts):** The course overview does not describe the AP
exam format (approximately 55 multiple-choice questions, 4 free-response
questions including one document-based question). Including this helps students
calibrate effort and helps the learning-graph-generator understand which
concepts need recall-level fluency versus deeper analysis.

---

## Improvement Suggestions

1. **Add an AP exam format paragraph** to the Course Overview section — one
   short paragraph describing the exam structure (MCQ, FRQ, time limits, score
   distribution) and what score is typically required for college credit (3, 4,
   or 5 depending on the receiving institution).

2. **Consolidate the Topics Not Covered list** by merging the two comparative-
   government bullets into one: "Comparative government, parliamentary systems,
   or proportional representation in depth — covered only as brief illustrative
   contrasts."

These are low-priority polish items. The description exceeds the 85-point
threshold required to proceed directly to learning graph generation.

---

## Concept Generation Readiness

**Estimated concept yield: 230–260 concepts**

| Source | Estimated concepts |
|---|---|
| Foundations of American Democracy (Unit 1) | 22 |
| The Constitution (Unit 2) | 18 |
| Federalism (Unit 3) | 16 |
| Congress (Unit 4) | 22 |
| The Presidency (Unit 5) | 20 |
| Federal Bureaucracy (Unit 6) | 16 |
| Federal Judiciary (Unit 7) | 20 |
| Civil Liberties and Civil Rights (Unit 8) | 26 |
| Political Ideologies and Public Opinion (Unit 9) | 18 |
| Political Participation and Elections (Unit 10) | 22 |
| AI and Government (Unit 11) | 20 |
| Cross-cutting concepts (federalism threads, constitutional principles) | 10–16 |
| **Total estimate** | **230–260** |

The learning-graph-generator should be instructed to target 200 concepts for
the final graph; excess concepts from the estimate provide room to merge
overlapping terms without falling below 200.

### Concept Type Diversity

The Bloom's Taxonomy outcomes span all six cognitive levels, meaning the
concept pool will include:

- **Foundational facts** (constitutional text, landmark case holdings,
  legislative titles) — supports Remember outcomes
- **Explanatory mechanisms** (how bills become law, how judicial review works,
  how political socialization occurs) — supports Understand outcomes
- **Procedural skills** (balancing-test application, constitutional analysis,
  poll interpretation) — supports Apply outcomes
- **Structural relationships** (iron triangle, checks and balances tensions,
  federalism evolution) — supports Analyze outcomes
- **Evaluative frameworks** (democratic legitimacy criteria, rights-vs-security
  trade-offs, campaign finance equity) — supports Evaluate outcomes
- **Synthesis products** (amendment drafting, legislative design, policy memo
  writing) — supports Create outcomes

This diversity ensures the generated learning graph will have a healthy mix
of terminal (applied) and foundational (definitional) nodes.

---

## Next Steps

The course description scores **97/100** — well above the 85-point readiness
threshold.

**Recommended immediate action:** Run the `learning-graph-generator` skill to
enumerate ~200 concepts with dependency relationships. Provide the generator
with the following guidance:

- Target 200 concepts (±10).
- The 11 main topics map naturally to 11 taxonomy categories or can be grouped
  into 8 categories by merging Units 4+5+6 (branches of government) and
  Units 9+10 (political behavior).
- Prioritize the AI-in-government unit concepts as a **terminal cluster** — they
  depend on constitutional, institutional, and civil-liberties foundations laid
  in earlier units.
- Required AP curriculum concepts (listed in the College Board Course and Exam
  Description) should be named verbatim where possible so students can cross-
  reference the official CED.
