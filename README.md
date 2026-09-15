# Printed Matter Design System

> **Ink on Paper for the Web, Data Platforms, and Technical Cartography.**

Printed Matter is an editorial, brutalist, high-density design system engineered for mission-critical applications, mapping environments, and technical tools. Built with an "ink on physical paper" metaphor, it rejects floating glassmorphism, artificial bevels, and blurry drop shadows in favor of crisp hairline rules, warm Xerox stock, slate inks, and uncompromising typographic authority.

Originally crafted inside `mercury-geosight`, Printed Matter is now a **standalone design system project** equipped with full token pipelines (Tokens Studio, W3C DTCG, CSS/SCSS/TS), live interactive specimen pages, complete React components, contrast verification tooling, and governance guidelines.

---

## 🌟 Key Features

- 📜 **Physical Print Aesthetic**: Warm xerox stock (`#EFECE6`), mineral slate ink (`#242220`) with physical paper multiply, true white knockout surfaces (`#FFFFFF`).
- 🔷 **Monochrome Primary Brand Ink**: Single canonical primary ink (paper multiply). No fake tint ladders — light surfaces are the paper stock showing through.
- 🎯 **7-Color Spot Spectrum**: Red, Orange, Yellow, Green, Aqua, Blue, Violet for high-signal categorical tagging.
- 📐 **Zero Radius & Flat Geometry**: 0px border radius, 0px box shadows, 1px crisp hairline rules.
- ⚡ **Interactive Specimen & Doc App**: Full live token cascade inspector, type scale tester, component sandbox, and cartographic chrome preview.
- 🛠️ **State-of-the-Art Token Pipeline**:
  - **Figma Tokens Studio** (`tokens/tokens.json`)
  - **W3C DTCG Standard** (`tokens/tokens.dtcg.json`)
  - **CSS Custom Properties** (`tokens/tokens.css`)
  - **Typed TypeScript Engine** (`tokens/tokens.ts`) with live WCAG 2.1 contrast ratio calculations
  - **SCSS Maps** (`tokens/tokens.scss`)
  - **Tailwind CSS Preset** (`tailwind.config.js`)
- 🤖 **DESIGN.md Specification**: Machine-readable tokens + design rationale for AI coding assistants.

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/sparklelabs/printed-matter.git
cd printed-matter

# Install dependencies
npm install

# Start the interactive specimen & documentation app
npm run dev
```

### Building & Validating Tokens

```bash
# Compile tokens to Figma JSON, W3C DTCG, TS, SCSS, and CSS
npm run build:tokens

# Validate invariants (0px radius, flat elevation, WCAG AAA contrast)
npm run validate:tokens
```

---

## 🎨 Token Architecture

All tokens are structured hierarchically:

```
tokens/
├── tokens.css         # CSS Custom Properties (:root)
├── tokens.json        # Tokens Studio for Figma variables
├── tokens.dtcg.json   # W3C Design Tokens Community Group specification
├── tokens.ts          # Strongly typed TypeScript definitions & contrast engine
└── tokens.scss        # SCSS map declarations
```

### Importing into Figma

1. Open Figma and launch **Tokens Studio for Figma**.
2. Navigate to **Tools → Load from file/folder** and select `tokens/tokens.json`.
3. Click **Apply to document** to generate Figma Variables under `PrintedMatter/*`.

---

## 🧩 React Component Library

Import components directly:

```tsx
import {
  Button,
  Badge,
  Card,
  Tabs,
  SearchBox,
  DataReadout,
  TreeNode,
  ChevronToggle,
} from "@sparklelabs/printed-matter";

export function Example() {
  return (
    <Card title="Kenya Admin 1" badge="ADM1">
      <SearchBox placeholder="Filter indicators..." />
      <div className="flex gap-2 mt-4">
        <Button variant="primary">+ Add Dataset</Button>
        <Button variant="secondary">Inspect</Button>
      </div>
    </Card>
  );
}
```

---

## 📖 Documentation Index

- [PHILOSOPHY.md](./PHILOSOPHY.md) — The Ink-on-Paper Manifesto & Architectural Decisions.
- [DESIGN.md](./DESIGN.md) — Machine-readable format spec for AI agents.
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Component development & token RFC guidelines.
- [GOVERNANCE.md](./GOVERNANCE.md) — Versioning, deprecations, and synchronization policy.
- [CHANGELOG.md](./CHANGELOG.md) — Release notes and evolution history.

---

## ⚖️ License

MIT © [Sparkle Labs](https://sparklelabs.com) & Ariel Churi.
