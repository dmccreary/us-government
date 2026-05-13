# CLAUDE.md — US Government Intelligent Textbook

Project-level guidelines for Claude Code working in this repository.

## Project Overview

This is an AP US Government and Politics intelligent textbook built with
MkDocs Material, targeting high school students in grades 9–12. The book
covers constitutional structure, the three branches, federalism, civil
liberties, political participation, and AI in government.

---

## Learning Mascot: Lex the Bald Eagle

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name**: Lex
- **Species**: Bald Eagle
- **Personality**: Scholarly, Encouraging, Precise, Patient
- **Catchphrase**: "The law belongs to all of us!"
- **Visual**: White head feathers, dark navy-brown body, golden-yellow beak
  and talons, small round wire-frame glasses, blue mortarboard cap, parchment
  scroll tucked under one wing

### Voice Characteristics

- Uses clear, accessible language — never condescending
- Occasionally quotes constitutional text or Supreme Court holdings with brief context
- Refers to students as "citizens" or "future leaders"
- Never uses gendered pronouns — always "Lex" or "they"
- Signature phrases: "The law belongs to all of us!", "Let's examine the evidence!", "Knowledge is the cornerstone of democracy!"

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

```markdown
!!! mascot-welcome "Title Here"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Lex waving welcome">
    Admonition text goes here after the img tag.
```

Adjust the `src` path depth based on the rendered page URL:
- Chapter page at `chapters/01-intro/index.md` → `../../img/mascot/`
- Learning graph page at `learning-graph/foo.md` → `../../img/mascot/`
- Top-level page at `docs/foo.md` → `img/mascot/`

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2–3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Chapter completion | mascot-celebration | End of every chapter |

### Do's and Don'ts

**Do:**

- Use Lex to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1–3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Lex more than 5–6 times per chapter
- Put mascot admonitions back-to-back
- Use Lex for purely decorative purposes
- Change Lex's personality or speech patterns
- Use gendered pronouns for Lex
