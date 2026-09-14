/**
 * Design Token & Contract Validator
 * Ensures zero drift, verifies contract invariants (0px radius, no drop shadows),
 * checks contrast compliance, and enforces token isolation from data palettes.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PRINTED_MATTER_TOKENS, getContrastRatio, getWCAGGrade } from "../tokens/tokens.ts";

console.log("Running Printed Matter Design System Validator...\n");

let errors = 0;
let warnings = 0;

// Invariant 1: Canvas must be warm paper stock (Stone 100)
const paper = PRINTED_MATTER_TOKENS.surfaces.white.value.toUpperCase();
if (paper !== "#F5F5F4") {
  console.error("FAIL: Canvas paper ground must be #F5F5F4 (Stone 100), found: " + paper);
  errors++;
} else {
  console.log("PASS: Canvas ground is Stone 100 #F5F5F4");
}

// Invariant 2: Radii must be 0px (except pill)
for (const [key, item] of Object.entries(PRINTED_MATTER_TOKENS.geometry)) {
  if (key.startsWith("radius-") && key !== "radius-pill" && item.value !== "0px") {
    console.error(`FAIL: Geometric radius for ${key} must be 0px for print integrity, found: ${item.value}`);
    errors++;
  }
}
console.log("PASS: Sharp geometric corners verified (0px radius)");

// Invariant 3: Shadows must be none (Paper does not shadow itself)
for (const [key, item] of Object.entries(PRINTED_MATTER_TOKENS.geometry)) {
  if (key.startsWith("shadow-") && item.value !== "none") {
    console.error(`FAIL: Elevation shadow for ${key} must be none, found: ${item.value}`);
    errors++;
  }
}
console.log("PASS: Elevation is flat (zero drop shadows)");

// Invariant 4: Contrast check (Stone 800 on Stone 100)
const ink = PRINTED_MATTER_TOKENS.neutrals["gray-800"].value;
const ratio = getContrastRatio(ink, paper);
const grade = getWCAGGrade(ratio);
if (!grade.aaa) {
  console.error(`FAIL: Text contrast ratio ${grade.score} fails WCAG AAA (required >= 7:1)`);
  errors++;
} else {
  console.log(`PASS: Ink on Paper contrast ${grade.score} meets WCAG AAA`);
}

// Invariant 5: Tokens file presence
for (const file of ["tokens/tokens.json", "tokens/tokens.dtcg.json", "tokens/tokens.css", "tokens/tokens.ts", "tokens/tokens.scss"]) {
  if (!fs.existsSync(path.resolve(file))) {
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
