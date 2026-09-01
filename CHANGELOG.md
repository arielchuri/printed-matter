# Changelog

All notable changes to Printed Matter Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-01

### Added
- **Standalone Project Initialization**: Extracted from `mercury-geosight` into a dedicated repository.
- **Interactive Specimen & Documentation Suite**:
  - Live Token Explorer with dynamic luminance contrast solver.
  - Typography Specimen with 6rem Display scale, live type tester, and tabular numbers.
  - Interactive Component Catalog with live property controls and code export.
  - Technical Cartography & Map Control preview.
  - Figma Tokens Studio & W3C DTCG instant exporter.
- **Token Build Pipeline**: Automated compilation to Tokens Studio JSON, W3C DTCG, TypeScript, SCSS, and CSS.
- **Full React Component Library**:
  - `Button`, `Badge`, `Card`, `Tabs`, `SearchBox`, `Input`, `Select`, `TreeNode`, `DataReadout`, `ChevronToggle`, `Modal`, `Drawer`, `Table`.
- **Validation Engine**: Continuous integration linter checking 0px radius, flat elevation, and WCAG AAA compliance.
- **Official DESIGN.md**: Specification for AI coding agents.

### Lineage from mercury-geosight
- Ported canonical xerox paper stock `#EFECE6` and slate ink `#222D2C`.
- Ported single blue foundation `#1A66A6` and 7-color spot spectrum.
- Ported tactile green pressed state (`#54C93F`).
- Ported split Location & Camera readout bar with solar clock.
