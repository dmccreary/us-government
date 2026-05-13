# Log: Learning Graph Generator

**Date:** 2026-05-13
**Skill version:** 0.05
**Operator:** Dan McCreary

## Python Program Versions

| Program | Version | Source |
|---|---|---|
| `analyze-graph.py` | (as shipped in skill v0.05) | learning-graph-generator skill |
| `csv-to-json.py` | v0.04 (self-reported in output) | learning-graph-generator skill |
| `taxonomy-distribution.py` | (as shipped in skill v0.05) | learning-graph-generator skill |
| `add-taxonomy.py` | (as shipped in skill v0.05) | learning-graph-generator skill |

## Steps Completed

| Step | Action | Result |
|---|---|---|
| 0 | Setup — verified `docs/` and `mkdocs.yml` exist | ✅ |
| 1 | Course description quality check | ✅ Score 100 — skipped re-analysis |
| 2 | Generated 200 concept labels | ✅ `concept-list.md` |
| 3 | Generated dependency graph CSV | ✅ `learning-graph.csv` |
| 4 | DAG validation — found and fixed one cycle | ✅ `quality-metrics.md` |
| 5 | Created concept taxonomy (12 categories) | ✅ `concept-taxonomy.md` |
| 5b | Created taxonomy names JSON | ✅ `taxonomy-names.json` |
| 6 | TaxonomyID column already in CSV from Step 3 | ✅ (no separate step needed) |
| 7 | Created metadata JSON | ✅ `metadata.json` |
| 8 | Created color config JSON | ✅ `color-config.json` |
| 9 | Generated complete learning graph JSON | ✅ `learning-graph.json` |
| 10 | Generated taxonomy distribution report | ✅ `taxonomy-distribution.md` |
| 11 | Created `index.md` from template | ✅ `index.md` |
| 12 | Wrote this session log | ✅ |
| 13 | Updated `mkdocs.yml` nav | ✅ |

## Graph Statistics

| Metric | Value |
|---|---|
| Total concepts | 200 |
| Taxonomy categories | 12 |
| Dependency edges | 362 |
| Foundational concepts (no deps) | 3 |
| Terminal nodes (leaf concepts) | 84 (42%) |
| Orphaned nodes | 0 |
| Connected components | 1 |
| Max dependency chain length | 15 |
| Average dependencies per concept | 1.84 |
| Graph quality score | 88 / 100 |

## Foundational Concepts (Graph Roots)

- **1** — Enlightenment Philosophy
- **7** — Articles of Confederation
- **191** — Critical Thinking in Civics

## Bug Fixed During Generation

**Cycle between concepts 9 and 13:**

- Original: `9,Constitutional Convention of 1787,7|8|13,FOUND` and
  `13,Federalists and Antifederalists,9|4,FOUND`
- Problem: Mutual dependency — each required the other to be learned first.
- Fix: Removed 13 from concept 9's dependency list.
  The Federalists/Antifederalists debate emerged *from* the Convention,
  so Convention → Federalists is the correct learning order.
- Corrected: `9,Constitutional Convention of 1787,7|8,FOUND`

## Taxonomy Color Assignment

| Category | TaxonomyID | Color | Font |
|---|---|---|---|
| Foundations of American Democracy | FOUND | SteelBlue | white |
| The Constitution | CONST | DarkSlateBlue | white |
| Federalism | FED | DarkGreen | white |
| Congress | CONG | Teal | white |
| The Presidency | PRES | DodgerBlue | white |
| The Federal Bureaucracy | BURO | OliveDrab | white |
| The Federal Judiciary | JUDI | MediumPurple | white |
| Civil Liberties and Civil Rights | CLIB | Crimson | white |
| Political Opinion and Media | OPIN | Gold | black |
| Elections and Political Participation | ELEC | DarkGoldenrod | white |
| AI and Government | AIGOV | Orange | black |
| Critical Thinking and Civic Skills | CRIT | DeepPink | white |

## Files Created

```
docs/learning-graph/
  index.md
  concept-list.md
  learning-graph.csv
  learning-graph.json
  concept-taxonomy.md
  taxonomy-names.json
  taxonomy-distribution.md
  quality-metrics.md
  metadata.json
  color-config.json
  analyze-graph.py       (copied from skill)
  csv-to-json.py         (copied from skill)
  taxonomy-distribution.py (copied from skill)
  add-taxonomy.py        (copied from skill)
```

## Next Steps

1. Review `concept-list.md` — add or remove concepts before generating chapters.
2. Review `concept-taxonomy.md` — verify category assignments make sense.
3. Run `/book-installer` option 23 to add the interactive graph viewer
   (`docs/sims/graph-viewer/`).
4. Run `/book-chapter-generator` to design the chapter structure from the
   learning graph. **Review chapter outlines carefully before generating
   content** — chapter content generation uses many tokens.
