# Learning Graph for US Government

This section contains the learning graph for this textbook. A learning graph is
a graph of concepts used in this textbook. Each concept is represented by a
node in a network graph. Concepts are connected by directed edges that indicate
what concepts each node depends on before that concept is understood by the student.

A learning graph is the foundational data structure for intelligent textbooks
that can recommend learning paths. A learning graph is like a roadmap of
concepts to help students arrive at their learning goals.

At the left of the learning graph are prerequisite or foundational concepts.
They have no outbound edges — they only have inbound edges for concepts that
depend on understanding them first. At the far right we have the most advanced
concepts in the course. To master these concepts you must understand all the
concepts that they point to.

The US Government learning graph contains **200 concepts** organized into
**12 taxonomy categories**, connected by **362 dependency edges**, with a
maximum learning path of **15 concepts** from foundational to advanced.

## Course Description

We use the [Course Description](../course-description.md) as the source
document for the concepts included in this course. The course description uses
the 2001 Bloom's Taxonomy to order learning objectives, and is aligned with
the College Board AP US Government and Politics curriculum framework.

## List of Concepts

Generative AI converted the course description into a [Concept List](./concept-list.md).
Each concept is in the form of a short Title Case label with most labels under
32 characters long. 200 concepts span 11 content units plus four cross-cutting
civic skill concepts.

## Concept Dependency List

The dependency graph is provided in two formats. The [CSV file](./learning-graph.csv)
contains columns `ConceptID`, `ConceptLabel`, `Dependencies` (pipe-delimited
prerequisite IDs), and `TaxonomyID`. The [JSON file](./learning-graph.json)
uses the vis-network JavaScript library format with `metadata`, `groups`,
`nodes`, and `edges` sections — ready to drop into the interactive graph viewer.

## Analysis and Documentation

### Course Description Quality Assessment

Quality review of `course-description.md` for learning graph generation.

- Course description fields and content depth analysis
- Validates sufficient depth for 200+ concepts
- Bloom's Taxonomy coverage check
- Score: **100/100 — Excellent**

[View the Course Description Quality Assessment](./course-description-assessment.md)

### Learning Graph Quality Validation

Overall quality assessment of the generated dependency graph.

- Valid DAG structure (0 cycles detected) ✅
- 3 foundational entry points (Enlightenment Philosophy, Articles of Confederation, Critical Thinking in Civics)
- 0 orphaned nodes — all 200 concepts are connected ✅
- 362 dependency edges, average 1.84 per concept
- Maximum dependency chain length: 15 steps
- Graph quality score: **88/100**

[View the Learning Graph Quality Validation](./quality-metrics.md)

### Concept Taxonomy

12 color-coded categories assign each concept to a primary classifier for
visualization in the graph viewer.

- FOUND — Foundations of American Democracy (SteelBlue)
- CONST — The Constitution (DarkSlateBlue)
- FED — Federalism (DarkGreen)
- CONG — Congress (Teal)
- PRES — The Presidency (DodgerBlue)
- BURO — The Federal Bureaucracy (OliveDrab)
- JUDI — The Federal Judiciary (MediumPurple)
- CLIB — Civil Liberties and Civil Rights (Crimson)
- OPIN — Political Opinion and Media (Gold)
- ELEC — Elections and Political Participation (DarkGoldenrod)
- AIGOV — AI and Government (Orange)
- CRIT — Critical Thinking and Civic Skills (DeepPink)

[View the Concept Taxonomy](./concept-taxonomy.md)

### Taxonomy Distribution

Statistical breakdown of concepts per category with balance verification.
No category exceeds 30% of total concepts.

[View the Taxonomy Distribution Report](./taxonomy-distribution.md)
