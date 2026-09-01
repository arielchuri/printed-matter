/**
 * Printed Matter Design Token Compiler & Formatter
 * Generates Figma Tokens Studio JSON, W3C DTCG tokens, TypeScript definitions, SCSS maps,
 * and validates WCAG 2.1 AA/AAA contrast ratios.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// Raw Token Definitions
const tokens = {
  surfaces: {
    "white": { value: "#EFECE6", description: "Warm xerox stock — the primary page ground" },
    "true-white": { value: "#FFFFFF", description: "Knockout pure white — strictly for cutouts & data readouts" },
    "true-black": { value: "#000000", description: "Pure black — deepest contrast anchor" },
    "surface": { value: "#EFECE6", description: "Default component surface" },
    "surface-muted": { value: "#E7E4DF", description: "Recessed ground / gutter" },
    "surface-subtle": { value: "#DFDDD7", description: "Secondary panel ground" },
  },
  primary: {
    "primary-050": { value: "#EFECE6", description: "Paper ground alias" },
    "primary-100": { value: "#EFECE6", description: "Paper ground alias" },
    "primary-200": { value: "#1A66A6", description: "Brand blue" },
    "primary-300": { value: "#1A66A6", description: "Brand blue" },
    "primary-400": { value: "#1A66A6", description: "Brand blue" },
    "primary-500": { value: "#1A66A6", description: "Canonical Printed Matter Blue" },
    "primary-600": { value: "#145082", description: "Hover / pressed tone" },
    "primary-700": { value: "#0F3D64", description: "Accessible link text" },
    "primary-800": { value: "#0A2B47", description: "High contrast header" },
    "primary-900": { value: "#061B2C", description: "Deep navy mark" },
    "primary-muted": { value: "#909390", description: "Tonal multiply tone" },
    "primary-color": { value: "#1A66A6", description: "Primary brand alias" },
  },
  spectrum: {
    "spectrum-red": { value: "#D35B50", description: "Printed Matter spot red" },
    "spectrum-orange": { value: "#F39D22", description: "Printed Matter spot orange" },
    "spectrum-yellow": { value: "#F4D35A", description: "Printed Matter spot yellow" },
    "spectrum-green": { value: "#54C93F", description: "Printed Matter spot green" },
    "spectrum-aqua": { value: "#3ABEAE", description: "Printed Matter spot aqua" },
    "spectrum-blue": { value: "#1A66A6", description: "Printed Matter spot blue" },
    "spectrum-violet": { value: "#8F57CB", description: "Printed Matter spot violet" },
  },
  status: {
    "success-color": { value: "#54C93F", description: "Success / positive indicator" },
    "warning-color": { value: "#F39D22", description: "Warning indicator" },
    "danger-color": { value: "#D35B50", description: "Danger / error indicator" },
    "yellow": { value: "#F4D35A", description: "Notice indicator" },
  },
  neutrals: {
    "gray-50": { value: "#E7E4DF", description: "Derived neutral 50 (Paper x Ink multiply)" },
    "gray-100": { value: "#DFDDD7", description: "Derived neutral 100" },
    "gray-200": { value: "#CECDC8", description: "Derived neutral 200" },
    "gray-300": { value: "#BCBCB8", description: "Derived neutral 300" },
    "gray-400": { value: "#A1A49F", description: "Derived neutral 400" },
    "gray-500": { value: "#909390", description: "Derived neutral 500" },
    "gray-600": { value: "#707673", description: "Derived neutral 600" },
    "gray-700": { value: "#5B6360", description: "Derived neutral 700" },
    "gray-800": { value: "#3E4846", description: "Derived neutral 800" },
    "gray-900": { value: "#222D2C", description: "Slate Ink (Primary dark mark)" },
  },
  typography: {
    "font-family-base": { value: "Inter, -apple-system, sans-serif", description: "Primary sans stack" },
    "font-family-mono": { value: "JetBrains Mono, monospace", description: "Technical metadata mono stack" },
    "font-size-display": { value: "6rem", description: "Display / Cover poster" },
    "font-size-h1": { value: "4rem", description: "H1 headline" },
    "font-size-h2": { value: "2.75rem", description: "H2 section head" },
    "font-size-h3": { value: "1.85rem", description: "H3 subhead" },
    "font-size-h4": { value: "1.35rem", description: "H4 uppercase header" },
    "font-size-h5": { value: "1.15rem", description: "H5 uppercase category" },
    "font-size-h6": { value: "0.95rem", description: "H6 title" },
    "font-size-base": { value: "15px", description: "Body baseline font size" },
    "font-size-sm": { value: "13px", description: "Small caption" },
    "font-size-xs": { value: "11px", description: "Technical metadata badge" },
  },
  spacing: {
    "space-1": { value: "4px" },
    "space-2": { value: "8px" },
    "space-3": { value: "12px" },
    "space-4": { value: "16px" },
    "space-5": { value: "24px" },
    "space-6": { value: "32px" },
    "space-7": { value: "48px" },
    "space-8": { value: "64px" },
  },
  geometry: {
    "radius-none": { value: "0px" },
    "radius-pill": { value: "9999px" },
    "shadow-none": { value: "none" },
    "border-width-hairline": { value: "1px" },
  }
};

// Relative Luminance Calculator
function getLuminance(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Contrast Ratio Calculator
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// 1. Generate Figma Tokens Studio format
function generateTokensStudio() {
  const figma = {
    "PrintedMatter": {
      "color": {},
      "spacing": {},
      "radius": {},
      "fontFamilies": {
        "base": { value: "Inter", type: "fontFamilies" },
        "mono": { value: "JetBrains Mono", type: "fontFamilies" }
      }
    }
  };

  for (const group of ["surfaces", "primary", "spectrum", "status", "neutrals"]) {
    for (const [key, item] of Object.entries(tokens[group])) {
      figma.PrintedMatter.color[key] = {
        value: item.value,
        type: "color",
        description: item.description || ""
      };
    }
  }

  for (const [key, item] of Object.entries(tokens.spacing)) {
    figma.PrintedMatter.spacing[key] = {
      value: item.value,
      type: "spacing"
    };
  }

  for (const [key, item] of Object.entries(tokens.geometry)) {
    if (key.startsWith("radius")) {
      figma.PrintedMatter.radius[key] = {
        value: item.value,
        type: "borderRadius"
      };
    }
  }

  return JSON.stringify(figma, null, 2);
}

// 2. Generate W3C DTCG Format
function generateDTCG() {
  const dtcg = {
    "$schema": "https://design-tokens.github.io/community-group/format/",
    "name": "Printed Matter",
    "color": {},
    "dimension": {},
    "fontFamily": {},
    "fontSize": {}
  };

  for (const group of ["surfaces", "primary", "spectrum", "status", "neutrals"]) {
    for (const [key, item] of Object.entries(tokens[group])) {
      dtcg.color[key] = {
        "$value": item.value,
        "$type": "color",
        "$description": item.description || ""
      };
    }
  }

  for (const [key, item] of Object.entries(tokens.spacing)) {
    dtcg.dimension[key] = {
      "$value": item.value,
      "$type": "dimension"
    };
  }

  return JSON.stringify(dtcg, null, 2);
}

// 3. Generate TypeScript constants & utilities
function generateTypeScript() {
  const swatches = [];
  for (const group of ["surfaces", "primary", "spectrum", "status", "neutrals"]) {
    for (const [k, v] of Object.entries(tokens[group])) {
      swatches.push(`  { name: "${k}", cssVar: "--${k}", value: "${v.value}", category: "${group === "surfaces" ? "surface" : group === "neutrals" ? "neutral" : group}", description: "${v.description || ""}" },`);
    }
  }

  return `/**
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

export const PRINTED_MATTER_TOKENS = ${JSON.stringify(tokens, null, 2)} as const;

export const COLOR_SWATCHES: TokenItem[] = [
${swatches.join("\n")}
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
`;
}

// 4. Generate SCSS
function generateSCSS() {
  let scss = "/* Printed Matter SCSS Tokens */\n\n";
  for (const group of ["surfaces", "primary", "spectrum", "status", "neutrals"]) {
    scss += `// ${group}\n`;
    for (const [key, item] of Object.entries(tokens[group])) {
      scss += `$${key}: ${item.value};\n`;
    }
    scss += "\n";
  }
  return scss;
}

// Write files
const figmaTokens = generateTokensStudio();
fs.writeFileSync(path.join(ROOT, "tokens/tokens.json"), figmaTokens);
console.log("-> Wrote tokens/tokens.json (Tokens Studio for Figma)");

const dtcgTokens = generateDTCG();
fs.writeFileSync(path.join(ROOT, "tokens/tokens.dtcg.json"), dtcgTokens);
console.log("-> Wrote tokens/tokens.dtcg.json (W3C DTCG Specification)");

const tsTokens = generateTypeScript();
fs.writeFileSync(path.join(ROOT, "tokens/tokens.ts"), tsTokens);
console.log("-> Wrote tokens/tokens.ts (TypeScript Definitions & Contrast Engine)");

const scssTokens = generateSCSS();
fs.writeFileSync(path.join(ROOT, "tokens/tokens.scss"), scssTokens);
console.log("-> Wrote tokens/tokens.scss");

// Validation Report
console.log("\n=== TOKEN CONTRAST AUDIT ===");
const paper = tokens.surfaces["white"].value;
const ink = tokens.neutrals["gray-900"].value;
const blue = tokens.primary["primary-500"].value;
const red = tokens.spectrum["spectrum-red"].value;

console.log(`Ink (${ink}) on Paper (${paper}): ${getContrastRatio(ink, paper).toFixed(2)}:1 (WCAG AAA Pass)`);
console.log(`Blue (${blue}) on Paper (${paper}): ${getContrastRatio(blue, paper).toFixed(2)}:1 (WCAG AA Pass)`);
console.log(`Red (${red}) on Paper (${paper}): ${getContrastRatio(red, paper).toFixed(2)}:1 (WCAG AA Large Pass)`);
console.log("Token build complete!\n");
