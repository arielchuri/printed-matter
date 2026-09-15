/**
 * @sparklelabs/printed-matter Design Tokens & Metadata
 * Machine-generated from canonical token definitions.
 */

export interface TokenItem {
  name: string;
  cssVar: string;
  value: string;
  category: "surface" | "primary" | "spectrum" | "status" | "neutral" | "typography" | "spacing" | "geometry" | "layout";
  description?: string;
}

export const PRINTED_MATTER_TOKENS = {
  "surfaces": {
    "white": {
      "value": "#F5F5F4",
      "description": "Stone 100 — the primary page ground (paper white)"
    },
    "surface": {
      "value": "#F5F5F4",
      "description": "Default component surface (Stone 100)"
    },
    "surface-muted": {
      "value": "#E7E5E4",
      "description": "Recessed warm stone ground / gutter (Stone 200)"
    },
    "surface-subtle": {
      "value": "#D6D3D1",
      "description": "Secondary warm stone panel ground (Stone 300)"
    }
  },
  "primary": {
    "primary-050": {
      "value": "#F5F5F4",
      "description": "Paper ground alias (Stone 100)"
    },
    "primary-100": {
      "value": "#F5F5F4",
      "description": "Paper ground alias (Stone 100)"
    },
    "primary-200": {
      "value": "#6EA3BE",
      "description": "Spot Blue"
    },
    "primary-300": {
      "value": "#6EA3BE",
      "description": "Spot Blue"
    },
    "primary-400": {
      "value": "#6EA3BE",
      "description": "Spot Blue"
    },
    "primary-500": {
      "value": "#6EA3BE",
      "description": "Canonical Blue (#6EA3BE)"
    },
    "primary-600": {
      "value": "#5A8BA4",
      "description": "Deepened blue hover"
    },
    "primary-700": {
      "value": "#3C6B84",
      "description": "Accessible link text"
    },
    "primary-800": {
      "value": "#284D62",
      "description": "High contrast header"
    },
    "primary-900": {
      "value": "#162F3E",
      "description": "Deep navy mark"
    },
    "primary-muted": {
      "value": "#78716C",
      "description": "Tonal warm multiply stone tone"
    },
    "primary-color": {
      "value": "#6EA3BE",
      "description": "Spot Blue"
    }
  },
  "spectrum": {
    "spectrum-red": {
      "value": "#E65E59",
      "description": "Pos 0% • Red Swatch (#E65E59)"
    },
    "spectrum-red-orange": {
      "value": "#EA7B49",
      "description": "Pos 10% • Spectrum Red-Orange (#EA7B49)"
    },
    "spectrum-orange": {
      "value": "#ED9235",
      "description": "Pos 20% • Orange Swatch (#ED9235)"
    },
    "spectrum-amber": {
      "value": "#EDBC2F",
      "description": "Pos 30% • Spectrum Amber / Warm Gold (#EDBC2F)"
    },
    "spectrum-yellow": {
      "value": "#EDD528",
      "description": "Pos 40% • Yellow Swatch (#EDD528)"
    },
    "spectrum-lime": {
      "value": "#BBCA49",
      "description": "Pos 50% • Spectrum Lime (#BBCA49)"
    },
    "spectrum-green": {
      "value": "#74BE60",
      "description": "Pos 60% • Green Swatch (#74BE60)"
    },
    "spectrum-aqua": {
      "value": "#71B197",
      "description": "Pos 70% • Spectrum Aqua / Seafoam (#71B197)"
    },
    "spectrum-blue": {
      "value": "#6EA3BE",
      "description": "Pos 80% • Blue Swatch (#6EA3BE)"
    },
    "spectrum-indigo": {
      "value": "#8E92C6",
      "description": "Pos 90% • Spectrum Indigo / Periwinkle (#8E92C6)"
    },
    "spectrum-violet": {
      "value": "#A773C4",
      "description": "Pos 100% • Violet Swatch (#A773C4)"
    }
  },
  "status": {
    "success-color": {
      "value": "#74BE60",
      "description": "Success / positive indicator (Green Swatch #74BE60)"
    },
    "warning-color": {
      "value": "#ED9235",
      "description": "Warning indicator (Orange Swatch #ED9235)"
    },
    "danger-color": {
      "value": "#E65E59",
      "description": "Danger / error indicator (Red Swatch #E65E59)"
    },
    "yellow": {
      "value": "#EDD528",
      "description": "Notice indicator (Yellow Swatch #EDD528)"
    }
  },
  "neutrals": {
    "gray-50": {
      "value": "#FAFAF9",
      "description": "Stone 50 (Warm unprinted ground highlight)"
    },
    "gray-100": {
      "value": "#F5F5F4",
      "description": "Stone 100 (Warm paper tint)"
    },
    "gray-200": {
      "value": "#E7E5E4",
      "description": "Stone 200 (Warm hairline gutter rule)"
    },
    "gray-300": {
      "value": "#D6D3D1",
      "description": "Stone 300 (Warm disabled hairline)"
    },
    "gray-400": {
      "value": "#A8A29E",
      "description": "Stone 400 (Warm midpoint mark)"
    },
    "gray-500": {
      "value": "#78716C",
      "description": "Stone 500 (Warm secondary placeholder)"
    },
    "gray-600": {
      "value": "#57534E",
      "description": "Stone 600 (Warm technical caption)"
    },
    "gray-700": {
      "value": "#44403C",
      "description": "Stone 700 (Warm editorial stone ink)"
    },
    "gray-800": {
      "value": "#292524",
      "description": "Stone 800 (Deep warm stone mark)"
    },
    "gray-900": {
      "value": "#1C1917",
      "description": "Stone 900 Warm Carbon Ink (Primary dark mark)"
    }
  },
  "typography": {
    "font-family-base": {
      "value": "Inter, -apple-system, sans-serif",
      "description": "Primary sans stack"
    },
    "font-family-mono": {
      "value": "JetBrains Mono, monospace",
      "description": "Technical metadata mono stack"
    },
    "font-size-display": {
      "value": "6rem",
      "description": "Display / Cover poster"
    },
    "font-size-h1": {
      "value": "4rem",
      "description": "H1 headline"
    },
    "font-size-h2": {
      "value": "2.75rem",
      "description": "H2 section head"
    },
    "font-size-h3": {
      "value": "1.85rem",
      "description": "H3 subhead"
    },
    "font-size-h4": {
      "value": "1.35rem",
      "description": "H4 uppercase header"
    },
    "font-size-h5": {
      "value": "1.15rem",
      "description": "H5 uppercase category"
    },
    "font-size-h6": {
      "value": "0.95rem",
      "description": "H6 title"
    },
    "font-size-base": {
      "value": "15px",
      "description": "Body baseline font size"
    },
    "font-size-sm": {
      "value": "13px",
      "description": "Small caption"
    },
    "font-size-xs": {
      "value": "11px",
      "description": "Technical metadata badge"
    }
  },
  "spacing": {
    "space-1": {
      "value": "4px"
    },
    "space-2": {
      "value": "8px"
    },
    "space-3": {
      "value": "12px"
    },
    "space-4": {
      "value": "16px"
    },
    "space-5": {
      "value": "24px"
    },
    "space-6": {
      "value": "32px"
    },
    "space-7": {
      "value": "48px"
    },
    "space-8": {
      "value": "64px"
    }
  },
  "geometry": {
    "radius-none": {
      "value": "0px"
    },
    "radius-pill": {
      "value": "9999px"
    },
    "shadow-none": {
      "value": "none"
    },
    "border-width-hairline": {
      "value": "1px"
    }
  },
  "layout": {
    "breakpoint-3xl": {
      "value": "1920px",
      "description": "Responsive width step 3xl (FHD desktop)"
    },
    "breakpoint-4xl": {
      "value": "2560px",
      "description": "Responsive width step 4xl (QHD / Ultrawide workstation)"
    },
    "container-3xl": {
      "value": "1920px",
      "description": "Max container width step 3xl"
    },
    "container-4xl": {
      "value": "2560px",
      "description": "Max container width step 4xl"
    },
    "max-width-reading-sm": {
      "value": "45ch",
      "description": "Narrow editorial line length (45 characters)"
    },
    "max-width-reading": {
      "value": "65ch",
      "description": "Optimal editorial reading measure (65 characters)"
    },
    "max-width-reading-lg": {
      "value": "75ch",
      "description": "Extended technical reading measure (75 characters)"
    },
    "column-max-width-sm": {
      "value": "320px",
      "description": "Narrow column max width"
    },
    "column-max-width-md": {
      "value": "480px",
      "description": "Standard column max width"
    },
    "column-max-width-lg": {
      "value": "640px",
      "description": "Wide editorial column max width"
    },
    "column-max-width": {
      "value": "480px",
      "description": "Default column max width cap"
    }
  }
} as const;

export const COLOR_SWATCHES: TokenItem[] = [
  { name: "white", cssVar: "--white", value: "#F5F5F4", category: "surface", description: "Stone 100 — the primary page ground (paper white)" },
  { name: "surface", cssVar: "--surface", value: "#F5F5F4", category: "surface", description: "Default component surface (Stone 100)" },
  { name: "surface-muted", cssVar: "--surface-muted", value: "#E7E5E4", category: "surface", description: "Recessed warm stone ground / gutter (Stone 200)" },
  { name: "surface-subtle", cssVar: "--surface-subtle", value: "#D6D3D1", category: "surface", description: "Secondary warm stone panel ground (Stone 300)" },
  { name: "primary-050", cssVar: "--primary-050", value: "#F5F5F4", category: "primary", description: "Paper ground alias (Stone 100)" },
  { name: "primary-100", cssVar: "--primary-100", value: "#F5F5F4", category: "primary", description: "Paper ground alias (Stone 100)" },
  { name: "primary-200", cssVar: "--primary-200", value: "#6EA3BE", category: "primary", description: "Spot Blue" },
  { name: "primary-300", cssVar: "--primary-300", value: "#6EA3BE", category: "primary", description: "Spot Blue" },
  { name: "primary-400", cssVar: "--primary-400", value: "#6EA3BE", category: "primary", description: "Spot Blue" },
  { name: "primary-500", cssVar: "--primary-500", value: "#6EA3BE", category: "primary", description: "Canonical Blue (#6EA3BE)" },
  { name: "primary-600", cssVar: "--primary-600", value: "#5A8BA4", category: "primary", description: "Deepened blue hover" },
  { name: "primary-700", cssVar: "--primary-700", value: "#3C6B84", category: "primary", description: "Accessible link text" },
  { name: "primary-800", cssVar: "--primary-800", value: "#284D62", category: "primary", description: "High contrast header" },
  { name: "primary-900", cssVar: "--primary-900", value: "#162F3E", category: "primary", description: "Deep navy mark" },
  { name: "primary-muted", cssVar: "--primary-muted", value: "#78716C", category: "primary", description: "Tonal warm multiply stone tone" },
  { name: "primary-color", cssVar: "--primary-color", value: "#6EA3BE", category: "primary", description: "Spot Blue" },
  { name: "spectrum-red", cssVar: "--spectrum-red", value: "#E65E59", category: "spectrum", description: "Pos 0% • Red Swatch (#E65E59)" },
  { name: "spectrum-red-orange", cssVar: "--spectrum-red-orange", value: "#EA7B49", category: "spectrum", description: "Pos 10% • Spectrum Red-Orange (#EA7B49)" },
  { name: "spectrum-orange", cssVar: "--spectrum-orange", value: "#ED9235", category: "spectrum", description: "Pos 20% • Orange Swatch (#ED9235)" },
  { name: "spectrum-amber", cssVar: "--spectrum-amber", value: "#EDBC2F", category: "spectrum", description: "Pos 30% • Spectrum Amber / Warm Gold (#EDBC2F)" },
  { name: "spectrum-yellow", cssVar: "--spectrum-yellow", value: "#EDD528", category: "spectrum", description: "Pos 40% • Yellow Swatch (#EDD528)" },
  { name: "spectrum-lime", cssVar: "--spectrum-lime", value: "#BBCA49", category: "spectrum", description: "Pos 50% • Spectrum Lime (#BBCA49)" },
  { name: "spectrum-green", cssVar: "--spectrum-green", value: "#74BE60", category: "spectrum", description: "Pos 60% • Green Swatch (#74BE60)" },
  { name: "spectrum-aqua", cssVar: "--spectrum-aqua", value: "#71B197", category: "spectrum", description: "Pos 70% • Spectrum Aqua / Seafoam (#71B197)" },
  { name: "spectrum-blue", cssVar: "--spectrum-blue", value: "#6EA3BE", category: "spectrum", description: "Pos 80% • Blue Swatch (#6EA3BE)" },
  { name: "spectrum-indigo", cssVar: "--spectrum-indigo", value: "#8E92C6", category: "spectrum", description: "Pos 90% • Spectrum Indigo / Periwinkle (#8E92C6)" },
  { name: "spectrum-violet", cssVar: "--spectrum-violet", value: "#A773C4", category: "spectrum", description: "Pos 100% • Violet Swatch (#A773C4)" },
  { name: "success-color", cssVar: "--success-color", value: "#74BE60", category: "status", description: "Success / positive indicator (Green Swatch #74BE60)" },
  { name: "warning-color", cssVar: "--warning-color", value: "#ED9235", category: "status", description: "Warning indicator (Orange Swatch #ED9235)" },
  { name: "danger-color", cssVar: "--danger-color", value: "#E65E59", category: "status", description: "Danger / error indicator (Red Swatch #E65E59)" },
  { name: "yellow", cssVar: "--yellow", value: "#EDD528", category: "status", description: "Notice indicator (Yellow Swatch #EDD528)" },
  { name: "gray-50", cssVar: "--gray-50", value: "#FAFAF9", category: "neutral", description: "Stone 50 (Warm unprinted ground highlight)" },
  { name: "gray-100", cssVar: "--gray-100", value: "#F5F5F4", category: "neutral", description: "Stone 100 (Warm paper tint)" },
  { name: "gray-200", cssVar: "--gray-200", value: "#E7E5E4", category: "neutral", description: "Stone 200 (Warm hairline gutter rule)" },
  { name: "gray-300", cssVar: "--gray-300", value: "#D6D3D1", category: "neutral", description: "Stone 300 (Warm disabled hairline)" },
  { name: "gray-400", cssVar: "--gray-400", value: "#A8A29E", category: "neutral", description: "Stone 400 (Warm midpoint mark)" },
  { name: "gray-500", cssVar: "--gray-500", value: "#78716C", category: "neutral", description: "Stone 500 (Warm secondary placeholder)" },
  { name: "gray-600", cssVar: "--gray-600", value: "#57534E", category: "neutral", description: "Stone 600 (Warm technical caption)" },
  { name: "gray-700", cssVar: "--gray-700", value: "#44403C", category: "neutral", description: "Stone 700 (Warm editorial stone ink)" },
  { name: "gray-800", cssVar: "--gray-800", value: "#292524", category: "neutral", description: "Stone 800 (Deep warm stone mark)" },
  { name: "gray-900", cssVar: "--gray-900", value: "#1C1917", category: "neutral", description: "Stone 900 Warm Carbon Ink (Primary dark mark)" },
];

export function getLuminance(hex: string): number {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function getContrastRatio(foreground: string, background: string): number {
  try {
    const lum1 = getLuminance(foreground);
    const lum2 = getLuminance(background);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (e) {
    return 1;
  }
}

export function getWCAGGrade(ratio: number, isLargeText: boolean = false): {
  aa: boolean;
  aaa: boolean;
  score: string;
} {
  const aaMin = isLargeText ? 3.0 : 4.5;
  const aaaMin = isLargeText ? 4.5 : 7.0;
  return {
    aa: ratio >= aaMin,
    aaa: ratio >= aaaMin,
    score: ratio.toFixed(2) + ":1",
  };
}

export function isLight(color: string): boolean {
  try {
    return getLuminance(color) > 0.45;
  } catch (e) {
    return true;
  }
}
