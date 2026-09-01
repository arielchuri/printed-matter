# Contributing to Printed Matter

Thank you for contributing to Printed Matter! We welcome contributions that maintain the integrity, precision, and physical print aesthetic of the design system.

---

## The 5 Design System Invariants

Before submitting a Pull Request, ensure your changes obey these inviolable rules:

1. **No Drop Shadows**: Never introduce `box-shadow` (except the standard `1px 1px 1px 0 rgba(128,128,128,0.25)` multiply on input fields).
2. **0px Border Radius**: All components must have square corners. (`borderRadius: 0`).
3. **Live Token Binding**: Never hardcode hex values in components. All colors must read from CSS Custom Properties (`var(--...)`) or Tailwind semantic classes.
4. **Contrast Verification**: All new text/ground pairings must meet at least WCAG 2.1 AA (4.5:1 for normal text, 3.0:1 for large text).
5. **No Synthetic Tint Ramps**: Do not create arbitrary lighter tints of brand colors. Use the paper ground (`#EFECE6`) or derived neutrals.

---

## Development Workflow

1. **Fork & Branch**:
   ```bash
   git checkout -b feat/my-new-component
   ```

2. **Add or Modify Tokens**:
   - Update `tokens/tokens.css` or `scripts/build-tokens.js`.
   - Run token compilation:
     ```bash
     npm run build:tokens
     ```

3. **Run Validation**:
   ```bash
   npm run validate:tokens
   ```

4. **Verify Live Specimen**:
   - Check your component in the interactive specimen viewer (`npm run dev`).
   - Test contrast across the live luminance evaluator.

5. **Submit PR**:
   - Provide screenshots of the specimen page and confirmation that `npm test` passes.
