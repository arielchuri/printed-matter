---
name: Printed Matter
version: 1.0.0
author: Ariel Churi <ariel@sparklelabs.com>
license: MIT
description: "An editorial, high-density design system rooted in physical print, technical cartography, and brutalist utility."
colors:
  primary: "#1A66A6"
  secondary: "#D35B50"
  neutral: "#222D2C"
  background: "#EFECE6"
  knockout: "#FFFFFF"
  spectrum:
    red: "#D35B50"
    orange: "#F39D22"
    yellow: "#F4D35A"
    green: "#54C93F"
    aqua: "#3ABEAE"
    blue: "#1A66A6"
    violet: "#8F57CB"
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

2. **Slate Ink (`#222D2C`), Never Synthetic Black**
   Rules and body copy are set in a deep mineral slate ink. Hairlines are crisp `1px solid #222D2C`.

3. **Single Blue Foundation (`#1A66A6`)**
   The primary brand colour is a single, authoritative editorial blue. Lighter tints are not arbitrary pastel hexes; they are the physical paper stock showing through.

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

---

## Component Invariants & Rules

### 1. Buttons
- **Resting**: No drop shadow, no inset bevels, zero border radius. Solid primary blue fill with paper-white text, or 1px hairline rule with ink text.
- **Pressed**: When the mouse is down, buttons flash **solid green (`#54C93F`)** with white text.
- **Disabled**: Neutral grey fill (`#CECDC8`) with muted text (`#909390`).

### 2. Tabs
- Square corners.
- Only the **active** tab carries solid blue fill (`#1A66A6`) with paper-white text.
- Inactive tabs are transparent with no bottom underline bars.

### 3. Administrative Level Badges (C, A1, A2, A3)
- Monospace compact chips (`0.68rem`) with hairline border and subtle neutral ground.

### 4. Technical Readout Bar
- Docked split bar: **Location** (lat, lon, elevation, place name) and **Camera** (altitude, facing, pitch, zoom, solar clock).
- Set in JetBrains Mono with tabular figures.

### 5. Map & Surface Controls
- **On Map Imagery**: Borderless ink-on-white square controls. Active state is solid blue fill.
- **On Paper Canvas**: Hairline 1px border.

---

## Governance & Token Sync

Tokens are maintained with `tokens/tokens.css` and `tokens/tokens.ts` as canonical sources of truth.
- **Figma**: Exported via `tokens/tokens.json` for Tokens Studio.
- **W3C DTCG**: Exported via `tokens/tokens.dtcg.json`.
- **Tailwind**: Consumed via `tailwind.config.js` and CSS variables.
