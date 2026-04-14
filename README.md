# Interactive Regex Equivalence & String Generator

> A single-page Automata Theory lab that pairs an AST-driven string synthesizer with a bounded regex equivalence verifier. Built with pure HTML5, ES6, and Tailwind CSS – perfect for demonstrations, assignments, or tinkering with regular languages.

## ✨ Highlights
- **Three-Panel Research UI** – curated inputs with a calculator palette, dual generation panels, and a verdict card that explains counter-examples.
- **Custom Parser & AST** – enforces the `{a, b, ε, (, ), |, *}` grammar and produces a structured tree for downstream algorithms.
- **Bounded String Synthesizer** – BFS + memoization enumerates every accepted string up to length 5, displayed by length and alphabetically.
- **Exhaustive Test Suite** – evaluates both regexes against every binary string of length ≤ 8; the first disagreement becomes the counter-example.
- **Curated Examples** – balanced catalog (50% equivalent / 50% non-equivalent) for quick demos and classroom exercises.
- **Componentized Architecture** – HTML, CSS, data, algorithms, and UI helpers live in their own modules for clarity and future React migrations.
- **Zero Dependencies** – pure HTML + ES modules + Tailwind CDN; no bundlers or package managers required.

## 🧠 How it Works
1. **Inputs & Palette** – type expressions or click palette tokens `( ) | * a b ε` to insert symbols at the caret.
2. **Parser** – a recursive-descent parser validates syntax, prevents invalid constructs like `a**`, and builds an AST with `literal`, `epsilon`, `concat`, `union`, and `star` nodes.
3. **String Generation** – the AST is explored with a BFS frontier that respects the Kleene-star length guard (N = 5). Results surface in two scrollable panels.
4. **Equivalence Verification** – every binary string up to length 8 is evaluated with JS `RegExp` objects (wrapped in `^...$`). Any mismatch triggers a red verdict and displays the witness string.
5. **Curated Examples** – `Generate Example` will randomly load one of six annotated scenarios so you can illustrate concepts instantly.

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/TAFL-Project.git
   cd TAFL-Project
   ```
2. Open the app locally (no server needed):
   ```bash
   open public/index.html   # macOS
   # or
   xdg-open public/index.html  # Linux
   # or double-click the file on Windows
   ```
3. Enter two regexes, optionally tap `Generate Example`, and click **Analyze & Verify**.

## 📂 Project Structure
```
TAFL-Project
├── public/
│   ├── index.html                # Layout + Tailwind harness
│   └── assets/
│       ├── css/
│       │   └── custom.css        # Extra polish (scrollbars, typography, palette buttons)
│       └── js/
│           ├── main.js           # App bootstrap + orchestration
│           ├── core/
│           │   ├── parser.js     # Recursive-descent parser / AST builder
│           │   ├── generator.js  # Bounded BFS string generator
│           │   └── verification.js # Universal test-suite checker
│           ├── components/
│           │   └── ui.js         # DOM renderers + status updates
│           └── data/
│               └── examples.js   # Curated example catalog (50/50 split)
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Pages deployment pipeline
└── README.md                     # Project overview & usage guide
```

## 📚 Example Catalog
| # | Title | Regex 1 | Regex 2 | Verdict |
|---|-------|---------|---------|---------|
| 1 | Synchronous Blocks | `(ab|ε)(ab)*` | `(ab)*` | Equivalent |
| 2 | Optional Prefix | `(a|ε)b*` | `(ab*|b*)` | Equivalent |
| 3 | All Binary Strings | `(a*b*)*` | `(a|b)*` | Equivalent |
| 4 | Terminal Symbol Contrast | `(a|b)*a` | `(a|b)*b` | Not Equivalent |
| 5 | Order of Blocks | `a*b*` | `b*a*` | Not Equivalent |
| 6 | Alternating Patterns | `(ab)*` | `(ba)*` | Not Equivalent |

> Tip: Click **Generate Example** to load one of these pairs instantly.

## 🌐 Deployment (GitHub Pages)
- A dedicated GitHub Actions workflow (`.github/workflows/pages.yml`) builds and deploys the contents of `public/` to the `gh-pages` branch.
- On every push to `main`, the workflow:
  1. Checks out the repo.
  2. Uploads the static files as an artifact.
  3. Publishes to GitHub Pages via `actions/deploy-pages`.
- Enable GitHub Pages in your repository settings (select **GitHub Actions** as the source) and your site will be available at `https://<username>.github.io/<repo>/`.

## 🧪 Suggested Experiments
- Compare standard identities such as `(a|b)*` vs. `(ab)*` to illustrate counter-examples quickly.
- Modify the maximum test length (currently 8) or string-generation bound (5) inside `public/index.html` to explore larger languages.
- Extend the curated example list with your own course-specific patterns.

Have fun exploring regular expressions with academic rigor and a modern UX!
