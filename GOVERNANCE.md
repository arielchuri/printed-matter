# Design System Governance & Lifecycle

Printed Matter follows a strict multi-platform synchronization and token governance model.

---

## Source of Truth Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│               1. tokens/tokens.css & tokens.ts          │
│                    (Source of Truth)                    │
└───────────────────────────┬─────────────────────────────┘
                            │ (npm run build:tokens)
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────┐ ┌─────────────────┐
│ tokens/tokens.json│ │tokens.dtcg.json│ tokens.scss &   │
│ (Tokens Studio)  │ │ (W3C Standard)│ Tailwind Preset │
└──────────────────┘ └──────────────┘ └─────────────────┘
```

1. **CSS `:root` & TypeScript Definitions**: The single source of truth.
2. **Figma Tokens Studio JSON**: Generated automatically via `build-tokens.js`. Hand-edits in Figma JSON are forbidden to prevent drift.
3. **W3C DTCG Format**: Exported for cross-tool interoperability.
4. **Application Consumption**: Next.js, Vite, MapLibre, and React components consume CSS variables and TypeScript constants.

---

## Token Change RFC Process

Any token modification requires:
1. **Luminance Audit**: Verify that contrast on `#EFECE6` meets WCAG 2.1 AA/AAA.
2. **Specimen Review**: Test across all interactive specimen pages (Typography, Components, Cartography).
3. **Automated Test Run**: `npm run validate:tokens` must pass with 0 errors.
4. **Changelog Entry**: Documented in `CHANGELOG.md` under SemVer guidelines.
