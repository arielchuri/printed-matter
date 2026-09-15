export interface PrinterSymbol {
  id: string;
  name: string;
  shortName: string;
  category: "vintage-cabbage" | "calibration" | "finishing";
  categoryLabel: string;
  era: string;
  description: string;
  viewBox: string;
  svgMarkup: string;
  tags: string[];
}

export const PRINTERS_SYMBOLS_DATA: PrinterSymbol[] = [
  // ─── VINTAGE PRINTER'S CABBAGES & DINGBATS ──────────────────────
  {
    id: "manicule-right",
    name: "Manicule (Pointing Hand Right ☞)",
    shortName: "Manicule Right",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Renaissance / Victorian Letterpress (15th–19th C.)",
    description: "Iconic printer's fist / index hand used in margins and section headings to direct reader attention. Features ruffled sleeve cuff and extended index finger.",
    viewBox: "0 0 100 60",
    tags: ["manicule", "fist", "index", "hand", "pointer", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100" height="60" fill="currentColor">
  <!-- Manicule (Pointing Hand Right) -->
  <g>
    <!-- Ruffled Cuff -->
    <path d="M4 18 C6 17, 10 16, 14 18 L14 42 C10 44, 6 43, 4 42 Z" />
    <path d="M16 16 C18 16, 20 18, 20 22 L20 38 C20 42, 18 44, 16 44 Z" />
    <!-- Index Finger & Upper Palm -->
    <path d="M22 22 C22 16, 30 14, 38 14 L88 14 C93 14, 96 17, 96 20 C96 23, 93 26, 88 26 L62 26 C66 28, 70 30, 70 32 C70 35, 66 36, 60 36 C64 38, 68 40, 68 42 C68 45, 64 46, 56 46 C60 48, 62 50, 62 52 C62 55, 58 56, 50 56 L34 56 C26 56, 22 48, 22 44 Z" />
    <!-- Thumb Curve -->
    <path d="M30 14 C34 10, 42 8, 48 10 C50 11, 48 14, 42 16 L34 18 Z" />
    <!-- Finger Separator Lines -->
    <line x1="14" y1="18" x2="14" y2="42" stroke="currentColor" strokeWidth="0.75" />
    <line x1="50" y1="36" x2="38" y2="36" stroke="var(--white, #F5F5F4)" strokeWidth="1" />
    <line x1="48" y1="46" x2="38" y2="46" stroke="var(--white, #F5F5F4)" strokeWidth="1" />
  </g>
</svg>`,
  },
  {
    id: "manicule-left",
    name: "Manicule (Pointing Hand Left ☜)",
    shortName: "Manicule Left",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Renaissance / Victorian Letterpress (15th–19th C.)",
    description: "Symmetrical counter-directional pointing hand for marginalia, back-references, and lead paragraph entry points.",
    viewBox: "0 0 100 60",
    tags: ["manicule", "fist", "index", "hand", "left", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="100" height="60" fill="currentColor">
  <!-- Manicule (Pointing Hand Left) -->
  <g transform="translate(100, 0) scale(-1, 1)">
    <!-- Ruffled Cuff -->
    <path d="M4 18 C6 17, 10 16, 14 18 L14 42 C10 44, 6 43, 4 42 Z" />
    <path d="M16 16 C18 16, 20 18, 20 22 L20 38 C20 42, 18 44, 16 44 Z" />
    <!-- Index Finger & Upper Palm -->
    <path d="M22 22 C22 16, 30 14, 38 14 L88 14 C93 14, 96 17, 96 20 C96 23, 93 26, 88 26 L62 26 C66 28, 70 30, 70 32 C70 35, 66 36, 60 36 C64 38, 68 40, 68 42 C68 45, 64 46, 56 46 C60 48, 62 50, 62 52 C62 55, 58 56, 50 56 L34 56 C26 56, 22 48, 22 44 Z" />
    <!-- Thumb Curve -->
    <path d="M30 14 C34 10, 42 8, 48 10 C50 11, 48 14, 42 16 L34 18 Z" />
    <!-- Finger Separator Lines -->
    <line x1="14" y1="18" x2="14" y2="42" stroke="currentColor" strokeWidth="0.75" />
    <line x1="50" y1="36" x2="38" y2="36" stroke="var(--white, #F5F5F4)" strokeWidth="1" />
    <line x1="48" y1="46" x2="38" y2="46" stroke="var(--white, #F5F5F4)" strokeWidth="1" />
  </g>
</svg>`,
  },
  {
    id: "aldine-fleuron",
    name: "Aldine Fleuron / Hedera (Ivy Leaf ❧)",
    shortName: "Aldine Fleuron",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Venice, Aldus Manutius (c. 1495)",
    description: "The classic typographical fleuron / printer's flower (hedera). Used as a paragraph divider and colophon embellishment since early Renaissance incunabula.",
    viewBox: "0 0 100 100",
    tags: ["fleuron", "hedera", "leaf", "aldine", "aldus", "flower", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Aldine Fleuron / Hedera (Ivy Leaf) -->
  <path d="M50 8 C38 8, 14 26, 14 52 C14 74, 34 88, 48 88 C44 76, 42 64, 44 52 C46 40, 52 30, 58 24 C54 36, 54 48, 56 60 C58 72, 66 84, 76 88 C84 82, 88 72, 88 60 C88 34, 68 8, 50 8 Z M48 88 C40 92, 28 94, 20 86 C14 80, 16 70, 22 64 C24 62, 28 64, 26 68 C22 74, 24 78, 28 80 C34 82, 42 80, 48 88 Z" />
</svg>`,
  },
  {
    id: "maltese-cross",
    name: "Maltese Cross / Cross Formée (✠)",
    shortName: "Maltese Cross",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "16th Century Typography & Liturgical Press",
    description: "Four-armed flared cross with arrowhead indentations and central core. Used as chapter opening mark, footnote indicator, and colophon seal.",
    viewBox: "0 0 100 100",
    tags: ["cross", "maltese", "formee", "divider", "seal", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Maltese Cross Formée -->
  <path d="M50 40 L66 10 L50 20 L34 10 Z M60 50 L90 34 L80 50 L90 66 Z M50 60 L34 90 L50 80 L66 90 Z M40 50 L10 66 L20 50 L10 34 Z M40 40 L60 40 L60 60 L40 60 Z" />
</svg>`,
  },
  {
    id: "aldine-anchor",
    name: "Aldine Anchor & Dolphin (Festina Lente)",
    shortName: "Aldine Anchor",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Aldine Press Venice (1502)",
    description: "The Renaissance emblem of Aldus Manutius signifying 'Festina Lente' (Make haste slowly) — balancing speed with typographic precision.",
    viewBox: "0 0 100 100",
    tags: ["anchor", "dolphin", "aldus", "venice", "renaissance", "device", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Aldine Anchor & Dolphin -->
  <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <!-- Anchor Ring & Stock -->
    <circle cx="50" cy="14" r="6" strokeWidth="2" fill="none" />
    <line x1="28" y1="26" x2="72" y2="26" strokeWidth="3.5" />
    <!-- Anchor Shank -->
    <line x1="50" y1="20" x2="50" y2="88" strokeWidth="3.5" />
    <!-- Anchor Flukes & Crown -->
    <path d="M18 64 C22 84, 40 92, 50 92 C60 92, 78 84, 82 64" strokeWidth="3.5" fill="none" />
    <polygon points="14,66 18,62 22,70" fill="currentColor" stroke="none" />
    <polygon points="86,66 82,62 78,70" fill="currentColor" stroke="none" />
    <!-- Entwined Dolphin -->
    <path d="M42 24 C30 32, 30 46, 50 52 C68 58, 68 74, 50 82" strokeWidth="3.5" fill="none" />
    <path d="M38 20 C42 16, 48 18, 48 24 C44 26, 40 24, 38 20 Z" fill="currentColor" stroke="none" />
    <polygon points="48,82 42,88 54,88" fill="currentColor" stroke="none" />
  </g>
</svg>`,
  },
  {
    id: "asterism-stars",
    name: "Asterism / Triple Star (⁂)",
    shortName: "Asterism (⁂)",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "17th–18th Century Editorial Typography",
    description: "Triangular cluster of three faceted stars. Used in classical publishing to indicate major section breaks or dinkuses in novels and essays.",
    viewBox: "0 0 100 100",
    tags: ["asterism", "dinkus", "stars", "break", "divider", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Asterism (Triple Star Section Divider ⁂) -->
  <g transform="translate(50, 28) scale(0.65)">
    <polygon points="0,-18 4,-5 18,-4 7,5 11,18 0,9 -11,18 -7,5 -18,-4 -4,-5" />
    <circle cx="0" cy="0" r="3" fill="var(--surface, #F5F5F4)" />
  </g>
  <g transform="translate(28, 70) scale(0.65)">
    <polygon points="0,-18 4,-5 18,-4 7,5 11,18 0,9 -11,18 -7,5 -18,-4 -4,-5" />
    <circle cx="0" cy="0" r="3" fill="var(--surface, #F5F5F4)" />
  </g>
  <g transform="translate(72, 70) scale(0.65)">
    <polygon points="0,-18 4,-5 18,-4 7,5 11,18 0,9 -11,18 -7,5 -18,-4 -4,-5" />
    <circle cx="0" cy="0" r="3" fill="var(--surface, #F5F5F4)" />
  </g>
</svg>`,
  },
  {
    id: "starburst-octagram",
    name: "Eight-Pointed Starburst (✦)",
    shortName: "Starburst Star",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "19th Century Letterpress Metal Type",
    description: "Faceted octagram starburst dingbat with alternating primary and secondary rays. Common in type specimen specimen sheets and title borders.",
    viewBox: "0 0 100 100",
    tags: ["star", "starburst", "octagram", "faceted", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Eight-Pointed Starburst -->
  <g transform="translate(50, 50)">
    <polygon points="0,-45 8,-12 38,-38 12,-8 45,0 12,8 38,38 8,12 0,45 -8,12 -38,38 -12,8 -45,0 -12,-8 -38,-38 -8,-12" />
    <circle cx="0" cy="0" r="6" fill="var(--surface, #F5F5F4)" />
    <circle cx="0" cy="0" r="2.5" fill="currentColor" />
  </g>
</svg>`,
  },
  {
    id: "arabesque-corner",
    name: "Arabesque Guilloche Corner Flourish",
    shortName: "Arabesque Corner",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Intaglio Engraving / Victorian Border Casts",
    description: "90-degree decorative corner flourish combining geometric guilloche rule with organic acanthus scrolls for archival framing.",
    viewBox: "0 0 100 100",
    tags: ["arabesque", "corner", "guilloche", "flourish", "frame", "border", "cabbage"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Arabesque Guilloche Corner Flourish -->
  <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 90 L10 20 C10 14, 14 10, 20 10 L90 10" strokeWidth="2.5" />
    <path d="M20 90 L20 30 C20 24, 24 20, 30 20 L90 20" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M10 50 C24 50, 36 38, 36 24 C36 10, 50 10, 50 10" />
    <path d="M10 70 C36 70, 56 50, 56 24 C56 10, 70 10, 70 10" />
    <circle cx="28" cy="28" r="8" fill="currentColor" />
    <circle cx="28" cy="28" r="4" fill="var(--surface, #F5F5F4)" />
    <path d="M46 46 C56 36, 68 36, 76 44 C84 52, 84 64, 74 74 C64 84, 52 84, 44 76 C36 68, 36 56, 46 46 Z" fill="currentColor" />
  </g>
</svg>`,
  },
  {
    id: "vignette-tailpiece",
    name: "Typefounder's Vignette Tailpiece",
    shortName: "Vignette Tailpiece",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "18th Century Caslon / Baskerville Specimen Books",
    description: "Symmetrical horizontal vignette rule with central diamond medallion and tapered terminal fins. Cast as single metal sorts.",
    viewBox: "0 0 160 40",
    tags: ["vignette", "tailpiece", "rule", "divider", "caslon", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" width="160" height="40" fill="currentColor">
  <!-- Typefounder's Vignette Tailpiece -->
  <g>
    <!-- Center Diamond & Beads -->
    <polygon points="80,8 92,20 80,32 68,20" />
    <circle cx="80" cy="20" r="4" fill="var(--surface, #F5F5F4)" />
    <circle cx="80" cy="20" r="1.5" fill="currentColor" />
    <circle cx="60" cy="20" r="3.5" />
    <circle cx="100" cy="20" r="3.5" />
    <circle cx="50" cy="20" r="2.5" />
    <circle cx="110" cy="20" r="2.5" />
    <!-- Left Tapered Rule -->
    <polygon points="44,19 8,19.5 8,20.5 44,21" />
    <polygon points="8,17 0,20 8,23" />
    <!-- Right Tapered Rule -->
    <polygon points="116,19 152,19.5 152,20.5 116,21" />
    <polygon points="152,17 160,20 152,23" />
  </g>
</svg>`,
  },
  {
    id: "sol-sunburst",
    name: "Sol Radiance / Sunburst Emblem",
    shortName: "Sol Sunburst",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Renaissance Almanac Woodcut / Letterpress Seal",
    description: "Classical astronomical solar emblem with concentric core and 8 cardinal flame rays. Represents enlightenment in early printing colophons.",
    viewBox: "0 0 100 100",
    tags: ["sun", "sunburst", "sol", "radiance", "almanac", "emblem", "cabbage"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Sol Radiance / Sunburst Emblem -->
  <g>
    <circle cx="50" cy="50" r="16" fill="currentColor" />
    <circle cx="50" cy="50" r="12" fill="var(--surface, #F5F5F4)" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
    <!-- Cardinal Flame Rays -->
    <polygon points="50,6 53,24 47,24" />
    <polygon points="50,94 53,76 47,76" />
    <polygon points="6,50 24,47 24,53" />
    <polygon points="94,50 76,47 76,53" />
    <!-- Diagonal Rays -->
    <polygon points="19,19 35,31 31,35" />
    <polygon points="81,81 65,69 69,65" />
    <polygon points="81,19 69,35 65,31" />
    <polygon points="19,81 31,65 35,69" />
  </g>
</svg>`,
  },
  {
    id: "fleur-de-lis",
    name: "Heraldic Fleur-de-lis Dingbat",
    shortName: "Fleur-de-lis",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "French Royal Imprimerie / Renaissance Typography",
    description: "Three-petaled stylized lily bound by a horizontal band and triangular root. A staple of classical title pages and publisher cartouches.",
    viewBox: "0 0 100 100",
    tags: ["fleur-de-lis", "lily", "heraldic", "french", "royal", "cabbage", "dingbat"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="currentColor">
  <!-- Heraldic Fleur-de-lis -->
  <g>
    <!-- Center Petal -->
    <path d="M50 10 C46 26, 40 38, 44 56 L56 56 C60 38, 54 26, 50 10 Z" />
    <!-- Left Petal -->
    <path d="M44 56 C38 48, 20 40, 14 50 C10 56, 14 66, 24 66 C34 66, 40 60, 44 56 Z" />
    <!-- Right Petal -->
    <path d="M56 56 C62 48, 80 40, 86 50 C90 56, 86 66, 76 66 C66 66, 60 60, 56 56 Z" />
    <!-- Horizontal Binding Ring -->
    <rect x="36" y="58" width="28" height="6" rx="1" />
    <!-- Lower Base -->
    <path d="M44 66 C40 76, 32 84, 28 88 L50 82 L72 88 C68 84, 60 76, 56 66 Z" />
  </g>
</svg>`,
  },
  {
    id: "gordian-knot",
    name: "Gordian Knot / Interlaced Ribbon Block",
    shortName: "Gordian Knot",
    category: "vintage-cabbage",
    categoryLabel: "Vintage Cabbage",
    era: "Renaissance Letterpress Border Type (16th C.)",
    description: "Celtic & Renaissance continuous ribbon interlace block used in decorative corners, repeating friezes, and spine stamps.",
    viewBox: "0 0 100 100",
    tags: ["knot", "gordian", "celtic", "ribbon", "interlace", "border", "cabbage"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Gordian Knot / Interlaced Ribbon Block -->
  <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="20" y="20" width="60" height="60" rx="4" />
    <circle cx="50" cy="50" r="24" />
    <circle cx="50" cy="50" r="9" fill="currentColor" stroke="none" />
    <line x1="12" y1="50" x2="88" y2="50" strokeWidth="2.5" />
    <line x1="50" y1="12" x2="50" y2="88" strokeWidth="2.5" />
  </g>
</svg>`,
  },

  // ─── PRESS CALIBRATION & FINISHING SYMBOLS ──────────────────────
  {
    id: "reg-crosshair-4col",
    name: "4-Plate Overprint Registration Crosshair (⨁)",
    shortName: "4-Color Crosshair",
    category: "calibration",
    categoryLabel: "Calibration Symbol",
    era: "Multi-Plate Offset Lithography (20th C. – Present)",
    description: "Precision 4-color crosshair target printed simultaneously in Cyan, Magenta, Yellow, and Key Black. When plates misregister, chromatic fringes appear.",
    viewBox: "0 0 100 100",
    tags: ["crosshair", "registration", "target", "cmyk", "overprint", "misregistration"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- 4-Plate Overprint Registration Crosshair -->
  <!-- Cyan/Blue Plate -->
  <g stroke="#6EA3BE" fill="none" style="mix-blend-mode: multiply;">
    <circle cx="50" cy="50" r="36" strokeWidth="1" />
    <circle cx="50" cy="50" r="22" strokeWidth="1" />
    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.75" />
    <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.75" />
  </g>
  <!-- Magenta/Red Plate -->
  <g stroke="#E65E59" fill="none" style="mix-blend-mode: multiply;">
    <circle cx="50" cy="50" r="36" strokeWidth="1" />
    <circle cx="50" cy="50" r="22" strokeWidth="1" />
    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.75" />
    <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.75" />
  </g>
  <!-- Yellow Plate -->
  <g stroke="#EDD528" fill="none" style="mix-blend-mode: multiply;">
    <circle cx="50" cy="50" r="36" strokeWidth="1" />
    <circle cx="50" cy="50" r="22" strokeWidth="1" />
    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.75" />
    <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.75" />
  </g>
  <!-- Key Black Plate -->
  <g stroke="#1C1917" fill="none" style="mix-blend-mode: multiply;">
    <circle cx="50" cy="50" r="36" strokeWidth="1.25" />
    <circle cx="50" cy="50" r="22" strokeWidth="1" />
    <circle cx="50" cy="50" r="8" strokeWidth="0.75" />
    <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" />
    <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" />
    <circle cx="50" cy="50" r="1.5" fill="#1C1917" />
  </g>
</svg>`,
  },
  {
    id: "vernier-target",
    name: "Concentric Vernier Micrometer Target",
    shortName: "Vernier Target",
    category: "calibration",
    categoryLabel: "Calibration Symbol",
    era: "Precision Gravure & Offset Lithography",
    description: "Concentric circular target with 8-axis radial micro-ticks calibrated to 0.05mm increments for measuring rotational plate shift and dot gain.",
    viewBox: "0 0 100 100",
    tags: ["vernier", "micrometer", "gain", "diagnostic", "concentric", "target"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="currentColor">
  <!-- Concentric Vernier Micrometer Target -->
  <circle cx="50" cy="50" r="42" strokeWidth="0.75" />
  <circle cx="50" cy="50" r="32" strokeWidth="0.75" strokeDasharray="2,2" />
  <circle cx="50" cy="50" r="20" strokeWidth="0.75" />
  <circle cx="50" cy="50" r="10" strokeWidth="0.75" />
  <!-- 8-Axis Radial Ticks -->
  <line x1="50" y1="6" x2="50" y2="16" strokeWidth="0.75" />
  <line x1="50" y1="84" x2="50" y2="94" strokeWidth="0.75" />
  <line x1="6" y1="50" x2="16" y2="50" strokeWidth="0.75" />
  <line x1="84" y1="50" x2="94" y2="50" strokeWidth="0.75" />
  <line x1="19" y1="19" x2="26" y2="26" strokeWidth="0.75" />
  <line x1="81" y1="81" x2="74" y2="74" strokeWidth="0.75" />
  <line x1="81" y1="19" x2="74" y2="26" strokeWidth="0.75" />
  <line x1="19" y1="81" x2="26" y2="74" strokeWidth="0.75" />
  <circle cx="50" cy="50" r="2" fill="currentColor" />
</svg>`,
  },
  {
    id: "siemens-star",
    name: "Siemens Star Rosette Target (36-Ray)",
    shortName: "Siemens Star",
    category: "calibration",
    categoryLabel: "Calibration Symbol",
    era: "Optical Resolution & Lens Calibration Standard",
    description: "Radial spokes converging to a central point. Used by press operators to detect astigmatism, lateral doubling, and the ultimate optical resolution limit.",
    viewBox: "0 0 100 100",
    tags: ["siemens", "star", "rosette", "resolution", "spokes", "optical"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="currentColor">
  <!-- Siemens Star Rosette (36 Rays) -->
  <g transform="translate(50, 50)">
    <!-- Alternating Ray Spokes -->
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(10)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(20)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(30)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(40)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(50)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(60)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(70)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(80)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(90)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(100)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(110)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(120)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(130)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(140)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(150)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(160)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(170)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(180)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(190)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(200)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(210)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(220)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(230)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(240)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(250)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(260)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(270)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(280)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(290)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(300)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(310)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(320)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(330)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="1.5" transform="rotate(340)" />
    <line x1="0" y1="0" x2="0" y2="-44" strokeWidth="0.75" transform="rotate(350)" />
    <circle cx="0" cy="0" r="4" fill="var(--surface, #F5F5F4)" stroke="currentColor" strokeWidth="1" />
    <circle cx="0" cy="0" r="1" fill="currentColor" />
  </g>
</svg>`,
  },
  {
    id: "crop-marks-corner",
    name: "Guillotine Corner Crop & Bleed Marks",
    shortName: "Corner Crop Marks",
    category: "finishing",
    categoryLabel: "Finishing Mark",
    era: "Standard Commercial Printing & Bindery Spec",
    description: "Hairline corner rules positioned outside the trim box showing the guillotine operator where to cut, with standard 3mm bleed margin.",
    viewBox: "0 0 100 100",
    tags: ["crop", "trim", "bleed", "guillotine", "cut", "finishing"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" stroke="currentColor" fill="none">
  <!-- Precision Guillotine Corner Crop & Bleed Marks -->
  <!-- Trim Boundary (Dashed Guide) -->
  <rect x="16" y="16" width="68" height="68" stroke="var(--gray-400, #A8A29E)" strokeWidth="0.75" strokeDasharray="2,2" />
  <!-- Top-Left Crop Lines -->
  <line x1="16" y1="0" x2="16" y2="12" strokeWidth="1" />
  <line x1="0" y1="16" x2="12" y2="16" strokeWidth="1" />
  <!-- Top-Right Crop Lines -->
  <line x1="84" y1="0" x2="84" y2="12" strokeWidth="1" />
  <line x1="88" y1="16" x2="100" y2="16" strokeWidth="1" />
  <!-- Bottom-Left Crop Lines -->
  <line x1="16" y1="88" x2="16" y2="100" strokeWidth="1" />
  <line x1="0" y1="84" x2="12" y2="84" strokeWidth="1" />
  <!-- Bottom-Right Crop Lines -->
  <line x1="84" y1="88" x2="84" y2="100" strokeWidth="1" />
  <line x1="88" y1="84" x2="100" y2="84" strokeWidth="1" />
</svg>`,
  },
  {
    id: "fold-perf-rules",
    name: "Mechanical Score, Fold & Perforation Rules",
    shortName: "Score & Perf Rules",
    category: "finishing",
    categoryLabel: "Finishing Mark",
    era: "Bindery & Converting Production Finishing",
    description: "Standard finishing line rules: dashed lines for folding scores, dotted rules for micro-tie perforations, and solid lines for guillotine slit cuts.",
    viewBox: "0 0 160 80",
    tags: ["fold", "score", "perforation", "slit", "cut", "bindery", "finishing"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <!-- Mechanical Score, Fold & Perforation Rules -->
  <!-- Fold / Score Rule (Dashed) -->
  <g>
    <text x="10" y="16" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="currentColor">FOLD / SCORE (DASHED)</text>
    <line x1="10" y1="24" x2="150" y2="24" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6,4" />
  </g>
  <!-- Perforation Rule (Dotted) -->
  <g>
    <text x="10" y="44" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#E65E59">PERFORATION (MICRO-TIE)</text>
    <line x1="10" y1="52" x2="150" y2="52" stroke="#E65E59" stroke-width="1.5" stroke-dasharray="2,3" />
  </g>
  <!-- Slit Cut Rule (Solid) -->
  <g>
    <text x="10" y="68" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#6EA3BE">CUT LINE (SLIT)</text>
    <line x1="10" y1="74" x2="150" y2="74" stroke="#6EA3BE" stroke-width="1" />
  </g>
</svg>`,
  },
  {
    id: "slur-ladder-gauge",
    name: "Directional Slur & Doubling Ladder Gauge",
    shortName: "Slur Gauge",
    category: "calibration",
    categoryLabel: "Calibration Symbol",
    era: "High-Speed Web & Sheetfed Offset Press Tool",
    description: "Parallel horizontal and vertical ladder bars that blur asymmetrically when press blanket or impression cylinder experiences mechanical slip.",
    viewBox: "0 0 140 70",
    tags: ["slur", "doubling", "ladder", "slip", "cylinder", "calibration"],
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 70" width="140" height="70" fill="currentColor">
  <!-- Directional Slur & Doubling Ladder Gauge -->
  <!-- Horizontal Ladder (Circumferential Slur) -->
  <g>
    <rect x="8" y="8" width="56" height="54" fill="none" stroke="currentColor" stroke-width="0.75" />
    <rect x="12" y="14" width="48" height="2" />
    <rect x="12" y="20" width="48" height="2" />
    <rect x="12" y="26" width="48" height="2" />
    <rect x="12" y="32" width="48" height="2" />
    <rect x="12" y="38" width="48" height="2" />
    <rect x="12" y="44" width="48" height="2" />
    <rect x="12" y="50" width="48" height="2" />
  </g>
  <!-- Vertical Ladder (Lateral Shift) -->
  <g>
    <rect x="76" y="8" width="56" height="54" fill="none" stroke="currentColor" stroke-width="0.75" />
    <rect x="82" y="14" width="2" height="42" />
    <rect x="88" y="14" width="2" height="42" />
    <rect x="94" y="14" width="2" height="42" />
    <rect x="100" y="14" width="2" height="42" />
    <rect x="106" y="14" width="2" height="42" />
    <rect x="112" y="14" width="2" height="42" />
    <rect x="118" y="14" width="2" height="42" />
  </g>
</svg>`,
  },
];
