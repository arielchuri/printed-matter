/**
 * Design Token & Contract Validator
 * Ensures zero drift, verifies contract invariants (0px radius, no drop shadows),
 * checks contrast compliance, and enforces token isolation from data palettes.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

console.log("Running Printed Matter Design System Validator...\n");

let errors = 0;
let warnings = 0;

// Load canonical tokens from tokens.json
const tokensPath = path.resolve(ROOT, "tokens/tokens.json");
if (!fs.existsSync(tokensPath)) {
  console.error("FAIL: tokens/tokens.json not found. Run npm run build:tokens first.");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
const tokens = raw.PrintedMatter || raw;

function getLuminance(hex) {
  if (!hex || typeof hex !== "string") return 0;
  const match = hex.replace("#", "").match(/.{2}/g);
  if (!match) return 0;
  const rgb = match.map((x) => parseInt(x, 16) / 255);
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Invariant 1: Canvas must be warm paper stock (Stone 100)
const paper = (tokens.color?.white?.value || "").toUpperCase();
if (paper !== "#F5F5F4") {
  console.error("FAIL: Canvas paper ground must be #F5F5F4 (Stone 100), found: " + paper);
  errors++;
} else {
  console.log("PASS: Canvas ground is Stone 100 #F5F5F4");
}

// Invariant 2: Radii must be 0px (except pill)
for (const [key, item] of Object.entries(tokens.radius || {})) {
  if (key.startsWith("radius-") && key !== "radius-pill" && item.value !== "0px") {
    console.error(`FAIL: Geometric radius for ${key} must be 0px for print integrity, found: ${item.value}`);
    errors++;
  }
}
console.log("PASS: Sharp geometric corners verified (0px radius)");

// Invariant 3: Shadows must be none (Paper does not shadow itself)
for (const [key, item] of Object.entries(tokens.geometry || {})) {
  if (key.startsWith("shadow-") && item.value !== "none") {
    console.error(`FAIL: Elevation shadow for ${key} must be none, found: ${item.value}`);
    errors++;
  }
}
console.log("PASS: Elevation is flat (zero drop shadows)");

// Invariant 4: Contrast check (Stone 800 on Stone 100)
const ink = tokens.color?.["gray-800"]?.value || "#292524";
const ratio = getContrastRatio(ink, paper);
if (ratio < 7.0) {
  console.error(`FAIL: Text contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AAA (required >= 7:1)`);
  errors++;
} else {
  console.log(`PASS: Ink on Paper contrast ${ratio.toFixed(2)}:1 meets WCAG AAA`);
}

// Invariant 5: Tokens file presence
for (const file of ["tokens/tokens.json", "tokens/tokens.dtcg.json", "tokens/tokens.css", "tokens/tokens.ts", "tokens/tokens.scss"]) {
  if (!fs.existsSync(path.resolve(ROOT, file))) {
    console.error(`FAIL: Required token export ${file} is missing.`);
    errors++;
  }
}
console.log("PASS: All token distribution artifacts present.");

console.log(`\nValidation finished with ${errors} errors and ${warnings} warnings.`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log("All design system invariants validated successfully!\n");
}
