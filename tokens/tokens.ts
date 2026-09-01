/**
 * @sparklelabs/printed-matter Design Tokens & Metadata
 * Machine-generated from canonical token definitions.
 */

export interface TokenItem {
  name: string;
  cssVar: string;
  value: string;
  category: "surface" | "primary" | "spectrum" | "status" | "neutral" | "typography" | "spacing" | "geometry";
  description?: string;
}

export const PRINTED_MATTER_TOKENS = {
  "surfaces": {
    "white": {
      "value": "#EFECE6",
      "description": "Warm xerox stock — the primary page ground"
    },
    "true-white": {
      "value": "#FFFFFF",
      "description": "Knockout pure white — strictly for cutouts & data readouts"
    },
    "true-black": {
      "value": "#000000",
      "description": "Pure black — deepest contrast anchor"
    },
    "surface": {
      "value": "#EFECE6",
      "description": "Default component surface"
    },
    "surface-muted": {
      "value": "#E7E4DF",
      "description": "Recessed ground / gutter"
    },
    "surface-subtle": {
      "value": "#DFDDD7",
      "description": "Secondary panel ground"
    }
  },
  "primary": {
    "primary-050": {
      "value": "#EFECE6",
      "description": "Paper ground alias"
    },
    "primary-100": {
      "value": "#EFECE6",
      "description": "Paper ground alias"
    },
    "primary-200": {
      "value": "#1A66A6",
      "description": "Brand blue"
    },
    "primary-300": {
      "value": "#1A66A6",
      "description": "Brand blue"
    },
    "primary-400": {
      "value": "#1A66A6",
      "description": "Brand blue"
    },
    "primary-500": {
      "value": "#1A66A6",
      "description": "Canonical Printed Matter Blue"
    },
    "primary-600": {
      "value": "#145082",
      "description": "Hover / pressed tone"
    },
    "primary-700": {
      "value": "#0F3D64",
      "description": "Accessible link text"
    },
    "primary-800": {
      "value": "#0A2B47",
      "description": "High contrast header"
    },
    "primary-900": {
      "value": "#061B2C",
      "description": "Deep navy mark"
    },
    "primary-muted": {
      "value": "#909390",
      "description": "Tonal multiply tone"
    },
    "primary-color": {
      "value": "#1A66A6",
      "description": "Primary brand alias"
    }
  },
  "spectrum": {
    "spectrum-red": {
      "value": "#D35B50",
      "description": "Printed Matter spot red"
    },
    "spectrum-orange": {
      "value": "#F39D22",
      "description": "Printed Matter spot orange"
    },
    "spectrum-yellow": {
      "value": "#F4D35A",
      "description": "Printed Matter spot yellow"
    },
    "spectrum-green": {
      "value": "#54C93F",
      "description": "Printed Matter spot green"
    },
    "spectrum-aqua": {
      "value": "#3ABEAE",
      "description": "Printed Matter spot aqua"
    },
    "spectrum-blue": {
      "value": "#1A66A6",
      "description": "Printed Matter spot blue"
    },
    "spectrum-violet": {
      "value": "#8F57CB",
      "description": "Printed Matter spot violet"
    }
  },
  "status": {
    "success-color": {
      "value": "#54C93F",
      "description": "Success / positive indicator"
    },
    "warning-color": {
      "value": "#F39D22",
      "description": "Warning indicator"
    },
    "danger-color": {
      "value": "#D35B50",
      "description": "Danger / error indicator"
    },
    "yellow": {
      "value": "#F4D35A",
      "description": "Notice indicator"
    }
  },
  "neutrals": {
    "gray-50": {
      "value": "#E7E4DF",
      "description": "Derived neutral 50 (Paper x Ink multiply)"
    },
    "gray-100": {
      "value": "#DFDDD7",
      "description": "Derived neutral 100"
    },
    "gray-200": {
      "value": "#CECDC8",
      "description": "Derived neutral 200"
    },
    "gray-300": {
      "value": "#BCBCB8",
      "description": "Derived neutral 300"
    },
    "gray-400": {
      "value": "#A1A49F",
      "description": "Derived neutral 400"
    },
    "gray-500": {
      "value": "#909390",
      "description": "Derived neutral 500"
    },
    "gray-600": {
      "value": "#707673",
      "description": "Derived neutral 600"
    },
    "gray-700": {
      "value": "#5B6360",
      "description": "Derived neutral 700"
    },
    "gray-800": {
      "value": "#3E4846",
      "description": "Derived neutral 800"
    },
    "gray-900": {
      "value": "#222D2C",
      "description": "Slate Ink (Primary dark mark)"
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
  }
} as const;

export const COLOR_SWATCHES: TokenItem[] = [
  { name: "white", cssVar: "--white", value: "#EFECE6", category: "surface", description: "Warm xerox stock — the primary page ground" },
  { name: "true-white", cssVar: "--true-white", value: "#FFFFFF", category: "surface", description: "Knockout pure white — strictly for cutouts & data readouts" },
  { name: "true-black", cssVar: "--true-black", value: "#000000", category: "surface", description: "Pure black — deepest contrast anchor" },
  { name: "surface", cssVar: "--surface", value: "#EFECE6", category: "surface", description: "Default component surface" },
  { name: "surface-muted", cssVar: "--surface-muted", value: "#E7E4DF", category: "surface", description: "Recessed ground / gutter" },
  { name: "surface-subtle", cssVar: "--surface-subtle", value: "#DFDDD7", category: "surface", description: "Secondary panel ground" },
  { name: "primary-050", cssVar: "--primary-050", value: "#EFECE6", category: "primary", description: "Paper ground alias" },
  { name: "primary-100", cssVar: "--primary-100", value: "#EFECE6", category: "primary", description: "Paper ground alias" },
  { name: "primary-200", cssVar: "--primary-200", value: "#1A66A6", category: "primary", description: "Brand blue" },
  { name: "primary-300", cssVar: "--primary-300", value: "#1A66A6", category: "primary", description: "Brand blue" },
  { name: "primary-400", cssVar: "--primary-400", value: "#1A66A6", category: "primary", description: "Brand blue" },
  { name: "primary-500", cssVar: "--primary-500", value: "#1A66A6", category: "primary", description: "Canonical Printed Matter Blue" },
  { name: "primary-600", cssVar: "--primary-600", value: "#145082", category: "primary", description: "Hover / pressed tone" },
  { name: "primary-700", cssVar: "--primary-700", value: "#0F3D64", category: "primary", description: "Accessible link text" },
  { name: "primary-800", cssVar: "--primary-800", value: "#0A2B47", category: "primary", description: "High contrast header" },
  { name: "primary-900", cssVar: "--primary-900", value: "#061B2C", category: "primary", description: "Deep navy mark" },
  { name: "primary-muted", cssVar: "--primary-muted", value: "#909390", category: "primary", description: "Tonal multiply tone" },
  { name: "primary-color", cssVar: "--primary-color", value: "#1A66A6", category: "primary", description: "Primary brand alias" },
  { name: "spectrum-red", cssVar: "--spectrum-red", value: "#D35B50", category: "spectrum", description: "Printed Matter spot red" },
  { name: "spectrum-orange", cssVar: "--spectrum-orange", value: "#F39D22", category: "spectrum", description: "Printed Matter spot orange" },
  { name: "spectrum-yellow", cssVar: "--spectrum-yellow", value: "#F4D35A", category: "spectrum", description: "Printed Matter spot yellow" },
  { name: "spectrum-green", cssVar: "--spectrum-green", value: "#54C93F", category: "spectrum", description: "Printed Matter spot green" },
  { name: "spectrum-aqua", cssVar: "--spectrum-aqua", value: "#3ABEAE", category: "spectrum", description: "Printed Matter spot aqua" },
  { name: "spectrum-blue", cssVar: "--spectrum-blue", value: "#1A66A6", category: "spectrum", description: "Printed Matter spot blue" },
  { name: "spectrum-violet", cssVar: "--spectrum-violet", value: "#8F57CB", category: "spectrum", description: "Printed Matter spot violet" },
  { name: "success-color", cssVar: "--success-color", value: "#54C93F", category: "status", description: "Success / positive indicator" },
  { name: "warning-color", cssVar: "--warning-color", value: "#F39D22", category: "status", description: "Warning indicator" },
  { name: "danger-color", cssVar: "--danger-color", value: "#D35B50", category: "status", description: "Danger / error indicator" },
  { name: "yellow", cssVar: "--yellow", value: "#F4D35A", category: "status", description: "Notice indicator" },
  { name: "gray-50", cssVar: "--gray-50", value: "#E7E4DF", category: "neutral", description: "Derived neutral 50 (Paper x Ink multiply)" },
  { name: "gray-100", cssVar: "--gray-100", value: "#DFDDD7", category: "neutral", description: "Derived neutral 100" },
  { name: "gray-200", cssVar: "--gray-200", value: "#CECDC8", category: "neutral", description: "Derived neutral 200" },
  { name: "gray-300", cssVar: "--gray-300", value: "#BCBCB8", category: "neutral", description: "Derived neutral 300" },
  { name: "gray-400", cssVar: "--gray-400", value: "#A1A49F", category: "neutral", description: "Derived neutral 400" },
  { name: "gray-500", cssVar: "--gray-500", value: "#909390", category: "neutral", description: "Derived neutral 500" },
  { name: "gray-600", cssVar: "--gray-600", value: "#707673", category: "neutral", description: "Derived neutral 600" },
  { name: "gray-700", cssVar: "--gray-700", value: "#5B6360", category: "neutral", description: "Derived neutral 700" },
  { name: "gray-800", cssVar: "--gray-800", value: "#3E4846", category: "neutral", description: "Derived neutral 800" },
  { name: "gray-900", cssVar: "--gray-900", value: "#222D2C", category: "neutral", description: "Slate Ink (Primary dark mark)" },
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
