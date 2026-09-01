# Printed Matter Design System — Roadmap & TODO

## 📋 Design System Management & Expansion Checklist

### 1. Token Engine & Export Tooling
- [ ] Implement bi-directional Figma Tokens Studio sync via GitHub Actions.
- [ ] Add Style-Dictionary multi-platform build pipeline (iOS Swift, Android XML/Compose).
- [ ] Automate W3C DTCG schema validation on git pre-commit.
- [ ] Add CSS-in-JS / zero-runtime token bindings (vanilla-extract / Panda CSS export).

### 2. Component Library Expansion
- [ ] Add accessible keyboard navigation tests for all form controls & tree views.
- [ ] Build Dropdown / Menu popover with sharp 0px radius paper surfaces.
- [ ] Build Split Pane and Dockable Sidebar components matching GeoSight layout.
- [ ] Implement DatePicker & TimeRange slider styled in single ink.
- [ ] Add Tooltip component with instant hover and yellow notice styling.

### 3. Cartography & Map Integration
- [ ] Create MapLibre GL theme package (@sparklelabs/maplibre-theme-printed-matter).
- [ ] Add SVG and WebGL fill-pattern generator for dynamic map polygon hatching.
- [ ] Add choropleth color scale isolation validator to prevent UI color contamination.

### 4. Documentation & Governance
- [ ] Deploy live interactive documentation to Vercel / GitHub Pages.
- [ ] Set up automated visual regression testing with Playwright.
- [ ] Write contributor RFC templates for new token proposals.
- [ ] Create comprehensive Figma UI Kit with Auto Layout and Component Properties.
