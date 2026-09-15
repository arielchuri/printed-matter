---
name: Printed Matter
version: 1.0.0
author: Ariel Churi <ariel@sparklelabs.com>
license: MIT
description: "An editorial, high-density design system rooted in physical print, technical cartography, and brutalist utility."
colors:
  primary: "#185E96"
  secondary: "#C65448"
  neutral: "#242220"
  background: "#EFECE6"
  knockout: "#FFFFFF"
  spectrum:
    red: "#C65448"
    orange: "#E4911F"
    yellow: "#E5C351"
    green: "#4FBA39"
    aqua: "#36B09D"
    blue: "#185E96"
    violet: "#8651B7"
typography:
  display:
    fontFamily: Inter
    fontSize: 6rem
    fontWeight: 800
    lineHeight: 1.02
  h1:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 1.05
  h2:
    fontFamily: Inter
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.1
  h3:
    fontFamily: Inter
    fontSize: 1.85rem
    fontWeight: 800
    lineHeight: 1.2
  h4:
    fontFamily: Inter
    fontSize: 1.35rem
    fontWeight: 700
    lineHeight: 1.3
  h5:
    fontFamily: Inter
    fontSize: 1.15rem
    fontWeight: 600
    lineHeight: 1.3
  h6:
    fontFamily: Inter
    fontSize: 0.95rem
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 500
rounded:
  default: 0px
  pill: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 48px
  8: 64px
---

# Printed Matter Design System

## Core Philosophy: Ink on Paper

**Printed Matter** treats the digital screen as a physical press sheet. It rejects the skeuomorphism of simulated plastic keys, floating glass cards, faux 3D bevels, and artificial drop shadows. Everything on the screen is either **the paper stock** or **ink printed on that stock**.

### The 6 Core Tenets

1. **Warm Paper Stock Canvas (`#EFECE6`)**
   The canvas is warm xerox bond, not blinding `#FFFFFF` screen glare. True white (`#FFFFFF`) is treated as a **knockout** — reserved strictly for technical data readouts, search boxes, and high-contrast cutouts.

2. **Warm Mineral Slate Ink (`#242220`), Derived via Paper Multiply**
   Rules and body copy are set in a deep warm mineral slate ink. Through physical multiply blending against warm xerox paper (`#EFECE6`), all inks absorb the warmth of the unbleached stock rather than looking cold or synthetic. Hairlines are crisp `1px solid #242220`.

3. **Single Blue Foundation (`#185E96`, Paper Multiply)**
   The primary brand colour is a single, authoritative editorial blue multiplied onto warm paper stock. Lighter tints are not arbitrary pastel hexes; they are the physical paper stock showing through.

4. **Zero Bevels & Flat Elevation**
   Buttons do not simulate raised keycaps. Cards do not hover on heavy blur drop shadows. Paper does not cast drop shadows on itself. Depth is communicated strictly through hairline rules, ink densities, and clear layout hierarchies.

5. **Sharp Corners (`0px` Radius)**
   Physical print does not round corners. Rectangles are uncompromisingly squared, emphasizing precision and structure.

6. **Isolation of UI Colour from Scientific Data**
   Brand colours, spot inks, and UI chrome must never collide with cartographic or choropleth data ramps. Choropleths use dedicated domain sequences, keeping UI state strictly distinguishable from scientific data layers.

---

## Typography Hierarchy

- **Display (6rem / 800 weight)**: Designed for cover posters, landing hero titles, and high-impact editorial statements.
- **H1 (4rem / 800 weight)**: Page-level primary headers.
- **H2 (2.75rem / 700 weight)**: Major section dividers.
- **H3 (1.85rem / 800 weight)**: Subsection headers.
- **H4–H5 (1.15–1.35rem uppercase / 600-700 weight)**: Category markers, table headers, and panel titles.
- **Body (15px / 400 weight, 1.5 line-height)**: Highly legible, rhythmic editorial text.
- **Technical Metadata (JetBrains Mono)**: Slashed-zero numeric figures, coordinates, zoom levels, solar time, hex values, and data source citations.

### Max Line Length for Readability (The Measure)
To prevent cognitive fatigue and maintain rhythmic scanning on expansive screens, editorial and technical content enforces strict typographic measures:
- **Optimal Reading Measure (`65ch` / `max-w-reading` / `max-w-prose`)**: 65 characters per line—the classic golden standard for comfortable multi-line body reading.
- **Narrow Measure (`45ch` / `max-w-reading-sm`)**: 45 characters for introductory lead-ins, side notes, callouts, and compact mobile columns.
- **Extended Measure (`75ch` / `max-w-reading-lg`)**: 75 characters for technical specifications, tabular annotations, and reference text.
- **Tailwind Typography Plugin Integration**: Configured with custom brutalist ink-on-paper tokens (slate ink headers, paper blockquote backgrounds, JetBrains Mono inline and fenced code blocks, and 1px hairline rules).

---

## Responsive Width Steps

In addition to standard responsive breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`), Printed Matter introduces **2 larger steps of responsive width** to support widescreen cartographic workstations and 4K technical displays:
- **`3xl` (1920px / 120rem)**: Tailored for standard Full HD (1080p) expansive dashboards and split-pane cartography viewports.
- **`4xl` (2560px / 160rem)**: Tailored for 1440p QHD, 4K, and Ultrawide workstations where multi-panel telemetry and full-sheet technical documents coexist without cramped viewports.
- **Responsive Max-Widths**: `max-w-8xl` (90rem / 1440px), `max-w-9xl` (108rem / 1728px), `max-w-3xl` (120rem / 1920px), and `max-w-4xl` (160rem / 2560px).

---

## Component Invariants & Rules

### 1. Buttons & Controls
- **Resting**: No drop shadow, no inset bevels, zero border radius. Solid primary ink fill (`var(--primary-500)`) with contrasting text, or 1px hairline rule with ink text.
- **Rollover / Hover**: Changes color by **shifting 1 position right** on the 12-color spot palette wheel (`var(--primary-rollover)`). If the button resting state is background color / outline / transparent, it fills with the rollover color.
- **Pressed / Active**: When the mouse is down, buttons flash the color **shifted 2 positions right** on the palette wheel (`var(--primary-active)`).
- **Disabled**: Neutral warm grey fill (`#CAC8C2`) with muted text (`#797773`).

### 2. Text Links
- **Resting**: Rendered in the current primary brand ink (`var(--primary-500)`) with 1px hairline underline.
- **Hover**: Shifts 1 position right on the palette wheel (`var(--primary-rollover)`).
- **Active**: Shifts 2 positions right on the palette wheel (`var(--primary-active)`).

### 3. Tabs
- Square corners.
- Only the **active** tab carries solid primary ink fill with contrasting text.
- Inactive tabs are transparent and fill with the rollover color on hover (`var(--primary-rollover)`).

### 4. Administrative Level Badges (C, A1, A2, A3)
- Monospace compact chips (`0.68rem`) with hairline border and subtle neutral ground.

### 5. Technical Readout Bar
- Docked split bar: **Location** (lat, lon, elevation, place name) and **Camera** (altitude, facing, pitch, zoom, solar clock).
- Set in JetBrains Mono with tabular figures.

### 6. Map & Surface Controls
- **On Map Imagery**: Borderless ink-on-white square controls. Hover fills with 1-step right rollover color, active state fills with 2-step right active color.
- **On Paper Canvas**: Hairline 1px border.

---

## Governance & Token Sync

Tokens are maintained with `tokens/tokens.css` and `tokens/tokens.ts` as canonical sources of truth.
- **Figma**: Exported via `tokens/tokens.json` for Tokens Studio.
- **W3C DTCG**: Exported via `tokens/tokens.dtcg.json`.
- **Tailwind**: Consumed via `tailwind.config.js` and CSS variables.
