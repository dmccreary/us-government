# MicroSim Screenshot TODO

This file tracks MicroSims that need screenshots captured or updated.

## Missing Screenshots (no main.html)

### Causes of Political Corruption — Trust In Government CLD
- **Status**: No `main.html` — directory contains only `index.md` and a JSON data file.
- **Action needed**: Implement the MicroSim or link to the `cld-viewer` with the JSON preloaded.
- **Directory**: `docs/sims/causes-of-political-corruption/`

## Blank Screenshots (JavaScript requires user interaction to render)

### Causal Loop Diagram Viewer
- **Status**: Screenshot is blank because the viewer requires a JSON file to be loaded via the file-input control before any diagram renders.
- **Command (retry after mkdocs serve is running)**:
```bash
~/.local/bin/bk-capture-screenshot docs/sims/cld-viewer 10
```
- **Alternative**: Capture manually using the browser after loading an example JSON (e.g., `examples/trust-in-government-full-cld.json`).
- **Directory**: `docs/sims/cld-viewer/`
