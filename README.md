# Interactive Regex Equivalence & String Generator

**Live Demo:** https://mohit-lakra.github.io/TAFL-Project/

Imagine an Automata Theory studio that feels like a research-grade instrument yet stays playful enough for classroom demos. This project delivers exactly that: an academic-inspired interface where you can pit two regular expressions against each other, watch their accepted strings unfold, and immediately see whether they behave the same.

## Experience Highlights
- **Scholarly Interface** – a dark, minimalist dashboard with thoughtful typography, curated spacing, and status cards that feel like they belong in a graduate lab.
- **Dual Perspectives** – review the strings each expression accepts (organized by length) while a dedicated status panel summarizes the verdict and counter-example.
- **Curated Gallery** – six handpicked regex pairs (half equivalent, half not) for instant demonstrations. Tap “Generate Example” to load one and start exploring.
- **Storytelling Friendly** – changes are explained in plain language, making it easy to narrate what is happening whether you’re presenting to a class or working solo.

## What You Can Explore
- **Do these two expressions describe the same language?** The verdict card lights up with “EQUIVALENT” or “NOT EQUIVALENT,” along with the first string where they disagree.
- **Which concrete strings do they accept?** Scrollable panels show everything the app can synthesize within a reasonable bound, displayed neatly with their lengths.
- **How can I illustrate regex concepts quickly?** Use the curated examples to demonstrate common identities, pitfalls, or pattern contrasts without typing complex expressions repeatedly.

## Using the App
1. Open the live demo (or the local `index.html`) and enter two expressions using the alphabet `{a, b, ε}`.
2. Lean on the calculator palette if you prefer buttons to typing; it inserts tokens at your current cursor position.
3. Click **Analyze & Verify**. Within a blink, the generated strings appear, and the verdict card updates.
4. Curious about classic scenarios? Press **Generate Example** and the interface will load one of the six curated cases, complete with descriptive text.

## Example Scenarios (Built In)
| Title | What it Demonstrates |
|-------|----------------------|
| Synchronous Blocks | Optional ε versus pure repetition when concatenating `ab` blocks. |
| Optional Prefix | The difference between allowing an `a` up front or folding it into a union. |
| All Binary Strings | Showing that nested stars can describe the same set as `(a|b)*`. |
| Terminal Symbol Contrast | How ending in `a` versus ending in `b` affects acceptance. |
| Order of Blocks | Exposing that `a*b*` and `b*a*` prefer different symbol orders. |
| Alternating Patterns | Comparing `(ab)*` with `(ba)*` to show phase shifts. |

## Why It Exists
This app was designed for TAFL (Theory of Automata and Formal Languages) discussions where students often ask, “Are these two regexes actually the same?” Traditional proofs can feel abstract, so the goal was to provide an immediate, visually rich answer that sparks further curiosity. By seeing strings, counter-examples, and curated notes side by side, learners can bridge intuition and formal reasoning.

## Getting Started Locally
1. Clone the repository.
2. Open `public/index.html` in any modern browser.
3. Explore freely—there is nothing to build or install.

## Project Layout
```
TAFL-Project
├── public/
│   ├── index.html                # Layout + Tailwind harness
│   └── assets/
│       ├── css/custom.css        # Additional polish (scrollbars, palette styling)
│       └── js/                   # Organized ES modules for data + logic + UI helpers
├── .github/workflows/pages.yml   # GitHub Pages deployment pipeline
└── README.md                     # You are here
```

Enjoy presenting, teaching, or simply geeking out about regular expressions with a tool that feels as elegant as the subject deserves.
