---
title: Causal Loop Diagram Viewer
description: A shared fullscreen viewer for browsing and editing the causal loop diagrams used across this textbook. Load any CLD file, drag nodes to reposition them, and save the new layout.
status: approved
library: vis-network
bloom_level: Apply
hide:
    toc
---

# Causal Loop Diagram (CLD) Viewer

A shared fullscreen viewer used by every CLD-based MicroSim in this textbook. Open it directly to browse all available CLDs, or follow a "Fullscreen" link from a specific MicroSim to load a particular diagram.

<iframe src="main.html?menu=true" width="100%" height="820" scrolling="no"></iframe>

[Open Viewer in Its Own Window](main.html?menu=true){ .md-button .md-button--primary }

## What this viewer does

- Loads any CLD JSON file from [`examples/`](https://github.com/dmccreary/us-government/tree/main/docs/sims/cld-viewer/examples)
- Lets you **drag nodes** to reposition them by hand
- Shows **node, edge, and loop details** in a side panel when you click on them
- Provides **Save Positions** and **Copy JSON** buttons so you can download an updated layout

## MicroSims that use this viewer

- [Causes of Political Corruption](../causes-of-political-corruption/index.md) — Trust In Government with 4 feedback loops

## For students

You can build your own CLD by:

1. Copying any file in `examples/` as a starting template
2. Renaming the `metadata.id` and the filename to match (e.g., `my-loop-cld.json`)
3. Editing the `nodes`, `edges`, and `loops` arrays
4. Adding your file's id to the `examples` list in `cld-viewer.js`
5. Loading the page and clicking your new button

See the [Lab Ideas in the Causes of Political Corruption MicroSim](../causes-of-political-corruption/index.md#future-loops-to-explore-student-labs) for suggested starting projects.
