import { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  Tabs,
  SearchBox,
  DataReadout,
  TreeNode,
  PatternSwatch,
  ColorChip,
  FullerMap,
  CanvasPaperTexture,
  ArchivalPrintSpecimen,
} from "./components";
import { COLOR_SWATCHES, getContrastRatio, getWCAGGrade } from "../tokens/tokens";
import { Layers, Type, Sliders, MapPin, Check, Copy, AlignLeft, AlignCenter, AlignRight, Moon, Sun, Sparkles, Droplet, RefreshCw } from "lucide-react";

export const PRIMARY_PALETTE = [
  { name: "BLUE", hex: "#6EA3BE", hoverHex: "#5A8BA4", darkHex: "#3C6B84", lightHex: "#EEF5F8", antiColor: "#FFFFFF" },
  { name: "RED", hex: "#E65E59", hoverHex: "#C94D48", darkHex: "#8F2A26", lightHex: "#FDE8E7", antiColor: "#FFFFFF" },
  { name: "RED-ORANGE", hex: "#EA7B49", hoverHex: "#CC6333", darkHex: "#8F3915", lightHex: "#FDEEE7", antiColor: "#FFFFFF" },
  { name: "ORANGE", hex: "#ED9235", hoverHex: "#D1771D", darkHex: "#8A4707", lightHex: "#FEF2E6", antiColor: "#1C1917" },
  { name: "AMBER", hex: "#EDBC2F", hoverHex: "#CE9F17", darkHex: "#856306", lightHex: "#FEF9E7", antiColor: "#1C1917" },
  { name: "YELLOW", hex: "#EDD528", hoverHex: "#D1BA15", darkHex: "#7A6C05", lightHex: "#FEFBE6", antiColor: "#1C1917" },
  { name: "LIME", hex: "#BBCA49", hoverHex: "#9EAE2F", darkHex: "#5C6613", lightHex: "#F7F9E9", antiColor: "#1C1917" },
  { name: "GREEN", hex: "#74BE60", hoverHex: "#5CA449", darkHex: "#316422", lightHex: "#EEF8EB", antiColor: "#1C1917" },
  { name: "AQUA", hex: "#71B197", hoverHex: "#57967D", darkHex: "#2C5847", lightHex: "#EEF6F3", antiColor: "#1C1917" },
  { name: "INDIGO", hex: "#8E92C6", hoverHex: "#7579B0", darkHex: "#444980", lightHex: "#F2F3FA", antiColor: "#FFFFFF" },
  { name: "VIOLET", hex: "#A773C4", hoverHex: "#8E58AE", darkHex: "#5E2F79", lightHex: "#F6EEF9", antiColor: "#FFFFFF" },
  { name: "INK BLACK", hex: "#1C1917", hoverHex: "#292524", darkHex: "#000000", lightHex: "#E7E5E4", antiColor: "#FFFFFF" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("tokens");
  const [activePrimaryColor, setActivePrimaryColor] = useState<string>("BLUE");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState<string>("The quick brown fox jumps over the lazy dog");
  const [selectedAdminLevel, setSelectedAdminLevel] = useState<string>("ADM1");
  const [searchVal, setSearchVal] = useState<string>("Turkana County");
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>("adm1-1");
  const [selectedMeasure, setSelectedMeasure] = useState<"narrow" | "optimal" | "wide" | "unconstrained">("optimal");
  const [columnMaxWidth, setColumnMaxWidth] = useState<"sm" | "md" | "lg" | "none">("none");
  const [columnAlign, setColumnAlign] = useState<"left" | "center" | "right">("center");
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "stone">("light");
  const [patternSpotColor, setPatternSpotColor] = useState<string>("var(--primary-500)");
  const [misregisterX, setMisregisterX] = useState<number>(1.5);
  const [misregisterY, setMisregisterY] = useState<number>(1.0);
  const [knockoutPair, setKnockoutPair] = useState<"red-blue" | "blue-yellow" | "red-yellow" | "aqua-black">("red-blue");
  
  // SVG feTurbulence Dual-Relief Ground State (Identical Base Noise with Separate Light/Dark Controls)
  const [paperBaseFrequency, setPaperBaseFrequency] = useState<number>(0.45); // Freq X: .450
  const [paperFreqY, setPaperFreqY] = useState<number>(0.20); // Freq Y: .200
  const [paperFreqLocked, setPaperFreqLocked] = useState<boolean>(false);
  const [paperOctaves, setPaperOctaves] = useState<number>(2); // Octaves: 2
  const [paperNoiseType, setPaperNoiseType] = useState<"fractalNoise" | "turbulence">("turbulence"); // Turbulence
  
  // Light Channel (Highlights on Dark Ink & Color Fields) - Reduced by 20%
  const [paperLightEnabled, setPaperLightEnabled] = useState<boolean>(true);
  const [paperLightOpacity, setPaperLightOpacity] = useState<number>(0.0029); // 0.29% (reduced 20% from 0.36%)
  const [paperLightGain, setPaperLightGain] = useState<number>(1.0); // 1.00x
  const [paperLightFloor, setPaperLightFloor] = useState<number>(0.29); // 29% Floor clip to eliminate fog on black ink
  const [paperLightOffsetX, setPaperLightOffsetX] = useState<number>(-1.0); // -1.00px
  const [paperLightOffsetY, setPaperLightOffsetY] = useState<number>(-1.0); // -1.00px
  const [paperLightBlur, setPaperLightBlur] = useState<number>(0.4); // 0.40px

  // Dark Channel (Shadows on Light Paper Ground) - Reduced by 20% to 0.52%
  const [paperDarkEnabled, setPaperDarkEnabled] = useState<boolean>(true);
  const [paperDarkInvert, setPaperDarkInvert] = useState<boolean>(false); // Direct multiply
  const [paperDarkOpacity, setPaperDarkOpacity] = useState<number>(0.0052); // 0.52% (reduced 20% from 0.65%)
  const [paperDarkGain, setPaperDarkGain] = useState<number>(2.0); // 2.00x
  const [paperDarkOffsetX, setPaperDarkOffsetX] = useState<number>(1.0); // +1.00px
  const [paperDarkOffsetY, setPaperDarkOffsetY] = useState<number>(1.0); // +1.00px
  const [paperDarkBlur, setPaperDarkBlur] = useState<number>(0.0); // 0.00px
  const [paperDarkR, setPaperDarkR] = useState<number>(0.38); // Deep warm paper red component
  const [paperDarkG, setPaperDarkG] = useState<number>(0.32); // Deep warm paper green component
  const [paperDarkB, setPaperDarkB] = useState<number>(0.24); // Deep warm paper blue component
  const [paperDarkWarmth, setPaperDarkWarmth] = useState<number>(1.42); // 1.42x Warmth multiplier (#81522E)

  // Offset Symmetry, Global Overlay, Global Ink Squash & Letterpress Black Squash
  const [paperSymmetricOffset, setPaperSymmetricOffset] = useState<boolean>(true);
  const [globalPaperTexture, setGlobalPaperTexture] = useState<boolean>(true);
  const [inkSquashEnabled, setInkSquashEnabled] = useState<boolean>(true);
  const [blackInkSquashEnabled, setBlackInkSquashEnabled] = useState<boolean>(true);
  
  // Global Multi-Plate Chromatic Misregistration (Default ON)
  const [globalMisregistration, setGlobalMisregistration] = useState<boolean>(true);
  const [misregisterIntensity, setMisregisterIntensity] = useState<number>(1.0);
  const [plateOffsets, setPlateOffsets] = useState<Record<string, { x: number; y: number }>>({
    blue: { x: 0.75, y: -0.50 },
    red: { x: -0.80, y: 0.60 },
    yellow: { x: 0.60, y: 0.75 },
    green: { x: -0.65, y: -0.65 },
    purple: { x: 0.70, y: 0.40 },
    aqua: { x: -0.55, y: 0.45 },
    orange: { x: 0.65, y: -0.60 },
  });

  const randomizePlates = () => {
    const plates = ["blue", "red", "yellow", "green", "purple", "aqua", "orange"];
    const next: Record<string, { x: number; y: number }> = {};
    plates.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.4 + Math.random() * 0.8;
      next[p] = {
        x: parseFloat((Math.cos(angle) * dist).toFixed(2)),
        y: parseFloat((Math.sin(angle) * dist).toFixed(2)),
      };
    });
    setPlateOffsets(next);
  };
  const [paperPreset, setPaperPreset] = useState<"user" | "rag" | "micro" | "laid" | "washi">("user");

  // Option 2: CSS Micro-Grain Stipple (Ultra-fine down to 1px)
  const [cssStippleDensity, setCssStippleDensity] = useState<number>(4);
  const [cssDotRadius, setCssDotRadius] = useState<number>(0.5);
  const [cssSecondaryHarmonic, setCssSecondaryHarmonic] = useState<boolean>(true);
  const [cssStippleOpacity, setCssStippleOpacity] = useState<number>(0.28);

  // Option 3: Archival Laid Paper & Watermark (Ultra-fine wire down to 0.8px)
  const [laidPitch, setLaidPitch] = useState<number>(2.0);
  const [laidThickness, setLaidThickness] = useState<number>(0.5);
  const [chainPitch, setChainPitch] = useState<number>(28);
  const [chainThickness, setChainThickness] = useState<number>(0.8);
  const [watermarkText, setWatermarkText] = useState<string>("⨁ MOULD-MADE 1954");
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [deckleEdge, setDeckleEdge] = useState<boolean>(true);
  const [laidOpacity, setLaidOpacity] = useState<number>(0.24);

  // Option 4: HTML5 Canvas Procedural Cotton Fibers (Dense micro-threads & frequency)
  const [canvasFiberCount, setCanvasFiberCount] = useState<number>(2500);
  const [canvasFiberLength, setCanvasFiberLength] = useState<number>(4);
  const [canvasFiberThickness, setCanvasFiberThickness] = useState<number>(0.6);
  const [canvasFiberCurvature, setCanvasFiberCurvature] = useState<number>(4);
  const [canvasFiberFrequency, setCanvasFiberFrequency] = useState<number>(3.0);
  const [canvasSpeckCount, setCanvasSpeckCount] = useState<number>(1800);
  const [canvasSpeckSize, setCanvasSpeckSize] = useState<number>(0.7);
  const [canvasColorTone, setCanvasColorTone] = useState<"white" | "cream" | "charcoal" | "brown">("white");
  const [canvasFiberOpacity, setCanvasFiberOpacity] = useState<number>(0.28);
  const [canvasSeed, setCanvasSeed] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const effectiveWidthPx = windowWidth;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "stone");
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (themeMode === "stone") {
      document.documentElement.classList.add("stone");
      document.documentElement.setAttribute("data-theme", "stone");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [themeMode]);

  useEffect(() => {
    if (inkSquashEnabled) {
      document.documentElement.setAttribute("data-ink-squash", "on");
      document.documentElement.classList.remove("no-ink-squash");
    } else {
      document.documentElement.setAttribute("data-ink-squash", "off");
      document.documentElement.classList.add("no-ink-squash");
    }
  }, [inkSquashEnabled]);

  useEffect(() => {
    if (blackInkSquashEnabled) {
      document.documentElement.setAttribute("data-black-ink-squash", "on");
      document.documentElement.classList.remove("no-black-ink-squash");
    } else {
      document.documentElement.setAttribute("data-black-ink-squash", "off");
      document.documentElement.classList.add("no-black-ink-squash");
    }
  }, [blackInkSquashEnabled]);

  useEffect(() => {
    const selected = PRIMARY_PALETTE.find((p) => p.name === activePrimaryColor) || PRIMARY_PALETTE[0];
    const root = document.documentElement;
    root.style.setProperty("--primary-500", selected.hex);
    root.style.setProperty("--primary-color", selected.hex);
    root.style.setProperty("--primary-600", selected.hoverHex);
    root.style.setProperty("--primary-700", selected.darkHex);
    root.style.setProperty("--primary-800", selected.darkHex);
    root.style.setProperty("--primary-900", selected.darkHex);
    root.style.setProperty("--primary-100", selected.lightHex);
    root.style.setProperty("--primary-200", selected.hex);
    root.style.setProperty("--primary-300", selected.hex);
    root.style.setProperty("--primary-400", selected.hex);
    root.style.setProperty("--anti-primary-color", selected.antiColor);
  }, [activePrimaryColor]);

  useEffect(() => {
    const root = document.documentElement;
    if (globalMisregistration) {
      root.setAttribute("data-misregistration", "on");
      root.classList.remove("no-misregistration");
      Object.entries(plateOffsets).forEach(([plate, offset]) => {
        root.style.setProperty(`--misregister-${plate}-x`, `${(offset.x * misregisterIntensity).toFixed(2)}px`);
        root.style.setProperty(`--misregister-${plate}-y`, `${(offset.y * misregisterIntensity).toFixed(2)}px`);
      });
    } else {
      root.setAttribute("data-misregistration", "off");
      root.classList.add("no-misregistration");
    }
  }, [globalMisregistration, plateOffsets, misregisterIntensity]);

  const sampleTree = {
    id: "root",
    name: "Kenya (National)",
    level: "ADM0",
    count: 47,
    children: [
      {
        id: "adm1-1",
        name: "Turkana County",
        level: "ADM1",
        count: 6,
        children: [
          { id: "adm2-1", name: "Turkana Central", level: "ADM2", count: 31 },
          { id: "adm2-2", name: "Turkana North", level: "ADM2", count: 18 },
        ],
      },
      {
        id: "adm1-2",
        name: "Garissa County",
        level: "ADM1",
        count: 6,
      },
      {
        id: "adm1-3",
        name: "Wajir County",
        level: "ADM1",
        count: 6,
      },
    ],
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--text)] font-sans selection:bg-[var(--primary-500)] selection:text-white flex flex-col relative">
      {/* ─── Header ────────────────────────────────────────────── */}
      <header className="border-b border-[var(--border-gray)] bg-[var(--primary-500)] text-[var(--anti-primary-color)] px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black/40 text-white tracking-widest uppercase">
            DS-01
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-white m-0 leading-none">
            PRINTED MATTER
          </h1>
          <span className="text-xs text-white/70 font-mono hidden sm:inline">
            // v1.0.0 (Ink on Paper)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Paper Texture Global Toggle */}
          <button
            onClick={() => setGlobalPaperTexture(!globalPaperTexture)}
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 transition-colors border ${
              globalPaperTexture
                ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                : "bg-black/30 text-white/80 border-white/20 hover:text-white"
            }`}
            style={{ borderRadius: 0 }}
            title="Toggle Global Dual-Relief Paper Texture (feTurbulence)"
          >
            <Sparkles size={12} className={globalPaperTexture ? "text-[var(--spectrum-yellow)]" : "text-white/70"} />
            <span>PAPER TEXTURE: {globalPaperTexture ? "ON" : "OFF"}</span>
          </button>

          {/* Ink Squash Global Toggle */}
          <button
            onClick={() => setInkSquashEnabled(!inkSquashEnabled)}
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 transition-colors border ${
              inkSquashEnabled
                ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                : "bg-black/30 text-white/80 border-white/20 hover:text-white"
            }`}
            style={{ borderRadius: 0 }}
            title="Toggle Global Ink Squash (Meniscus & Pigment Perimeter Squeeze on Colors)"
          >
            <Droplet size={12} className={inkSquashEnabled ? "text-[var(--spectrum-yellow)]" : "text-white/70"} />
            <span>INK SQUASH: {inkSquashEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Letterpress Black Ink Squash Global Toggle */}
          <button
            onClick={() => setBlackInkSquashEnabled(!blackInkSquashEnabled)}
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 transition-colors border ${
              blackInkSquashEnabled
                ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                : "bg-black/30 text-white/80 border-white/20 hover:text-white"
            }`}
            style={{ borderRadius: 0 }}
            title="Toggle Deep Meniscus Letterpress Ink Squash on Black Ink (Headings & Slabs)"
          >
            <Droplet size={12} className={blackInkSquashEnabled ? "text-[var(--spectrum-yellow)]" : "text-white/70"} />
            <span>BLACK SQUASH: {blackInkSquashEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Global Chromatic Misregistration Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setGlobalMisregistration(!globalMisregistration)}
              className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 transition-colors border ${
                globalMisregistration
                  ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                  : "bg-black/30 text-white/80 border-white/20 hover:text-white"
              }`}
              style={{ borderRadius: 0 }}
              title="Toggle Global Multi-Plate Chromatic Misregistration (Hairline Plate Shifts)"
            >
              <Layers size={12} className={globalMisregistration ? "text-[var(--spectrum-yellow)]" : "text-white/70"} />
              <span>MISREGISTER: {globalMisregistration ? "ON" : "OFF"}</span>
            </button>
            {globalMisregistration && (
              <button
                onClick={randomizePlates}
                className="bg-black/40 text-white hover:bg-black/60 px-1.5 py-1 border border-l-0 border-white/20 transition-colors"
                style={{ borderRadius: 0 }}
                title="Randomize Plate Shift Angles (Hairline Jitter)"
              >
                <RefreshCw size={11} className="text-[var(--spectrum-yellow)]" />
              </button>
            )}
          </div>

          {/* Ground / Theme 3-way Switch */}
          <div className="flex items-center bg-black/30 border border-white/20 p-0.5">
            <button
              onClick={() => setThemeMode("light")}
              className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 transition-colors ${
                themeMode === "light"
                  ? "bg-white text-[var(--gray-900)]"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ borderRadius: 0 }}
              title="Light Mode: Stone 100 Paper (#F5F5F4)"
            >
              <Sun size={12} className={themeMode === "light" ? "text-[var(--primary-600)]" : "text-white/70"} />
              <span>LIGHT</span>
            </button>

            <button
              onClick={() => setThemeMode("stone")}
              className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 transition-colors ${
                themeMode === "stone"
                  ? "bg-[#A8A29E] text-[var(--gray-900)] border border-black/30 font-extrabold"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ borderRadius: 0 }}
              title="Stone-400 Midtone Ground Mode (#A8A29E)"
            >
              <span className="w-2.5 h-2.5 rounded-none bg-[#A8A29E] border border-black/40 inline-block" />
              <span>STONE-400</span>
            </button>

            <button
              onClick={() => setThemeMode("dark")}
              className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 transition-colors ${
                themeMode === "dark"
                  ? "bg-[var(--gray-900)] text-white border border-[var(--gray-600)]"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ borderRadius: 0 }}
              title="Dark Mode: Stone 800 (#292524)"
            >
              <Moon size={12} className={themeMode === "dark" ? "text-[var(--spectrum-yellow)]" : "text-white/70"} />
              <span>DARK</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Sub-Navigation Tabs ────────────────────────────────── */}
      <div className="bg-[var(--gray-100)] border-b border-[var(--border-gray)] px-6">
        <Tabs
          tabs={[
            { id: "tokens", label: "Design Tokens & Spectrum", icon: <Layers size={14} /> },
            { id: "typography", label: "Typography & Type Specimen", icon: <Type size={14} /> },
            { id: "components", label: "Components & Controls", icon: <Sliders size={14} /> },
            { id: "textures-symbols", label: "Textures & Symbols", icon: <Sparkles size={14} /> },
            { id: "datavis", label: "Data Visualization", icon: <MapPin size={14} /> },
            { id: "effects", label: "Ink Effects & Plate Artifacts", icon: <Droplet size={14} /> },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 w-full max-w-none 3xl:max-w-3xl 4xl:max-w-4xl mx-auto px-6 3xl:px-12 4xl:px-16 py-8">
        {/* =========================================================
            TAB 1: DESIGN TOKENS & SPECTRUM
            ========================================================= */}
        {activeTab === "tokens" && (
          <div className="flex flex-col gap-8">
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">The Printed Spectrum</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Eleven calibrated spot inks (0% to 100% spectrum progression) calibrated for physical paper printing with multiply effect.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">11 SPOT INKS (0% &ndash; 100% MULTIPLIED)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 3xl:grid-cols-11 4xl:grid-cols-11 gap-3">
                {COLOR_SWATCHES.filter((s) => s.category === "spectrum").map((swatch) => (
                  <ColorChip
                    key={swatch.cssVar}
                    token={swatch.cssVar}
                    name={swatch.name.replace("spectrum-", "").toUpperCase()}
                    value={swatch.value}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Derived Neutrals (Tailwind Stone Scale)</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Warm stone neutral scale (Stone 50 to Stone 900) replacing cool slate. Warmth of the unbleached press sheet carries through every step.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">10 WARM STONE NEUTRALS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 3xl:grid-cols-10 4xl:grid-cols-10 gap-2">
                {COLOR_SWATCHES.filter((s) => s.category === "neutral").map((swatch) => (
                  <ColorChip
                    key={swatch.cssVar}
                    token={swatch.cssVar}
                    name={swatch.name.replace("gray-", "STONE-").toUpperCase()}
                    value={swatch.value}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Surfaces &amp; Primary Brand Ink</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Stone 100 paper ground (#F5F5F4), recessed stone gutters, Ink Black (Stone 900), and dynamic Primary Brand Ink.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">CORE FOUNDATIONS &amp; PRIMARY SWITCHER</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4 gap-4">
                <ColorChip
                  token="--white"
                  name="STONE 100 STOCK (PAPER GROUND)"
                  value="#F5F5F4"
                  description="The primary page and canvas ground. In dark mode, inverts to Stone 800 Ink Black."
                />
                <ColorChip
                  token="--surface-muted"
                  name="RECESSED STONE GUTTER (STONE 200)"
                  value="#E7E5E4"
                  description="Gutter and subtle panel substrate. Built with Tailwind Stone neutrals."
                />
                <ColorChip
                  token="--gray-900"
                  name="INK BLACK (STONE 900 CARBON)"
                  value="#1C1917"
                  description="Deep carbon black ink (#1C1917) providing foundational press contrast."
                />
                
                {/* Primary Brand Ink with Dynamic Color Swatch Selector */}
                <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-gray)]/20">
                      <span className="font-mono text-xs font-bold text-[var(--primary-500)] uppercase">
                        PRIMARY BRAND INK
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--primary-500)] text-[var(--anti-primary-color)] px-1.5 py-0.5 font-bold">
                        ACTIVE: {activePrimaryColor}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 my-2">
                      <div
                        className="w-12 h-12 border border-black/20 shrink-0"
                        style={{ backgroundColor: "var(--primary-500)" }}
                      />
                      <div className="font-mono text-xs">
                        <div className="font-bold text-[var(--text)]">var(--primary-500)</div>
                        <div className="text-[var(--text-muted)] text-[11px]">{PRIMARY_PALETTE.find(p => p.name === activePrimaryColor)?.hex}</div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-[var(--text-muted)] mb-3 leading-snug">
                      Click any swatch below to set the primary brand ink across the entire design system and site chrome:
                    </p>
                  </div>

                  {/* Interactive Swatches for all 12 Colors */}
                  <div className="pt-2 border-t border-[var(--border-gray)]/20">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {PRIMARY_PALETTE.map((pal) => (
                        <button
                          key={pal.name}
                          onClick={() => setActivePrimaryColor(pal.name)}
                          className={`w-6 h-6 border transition-all ${
                            activePrimaryColor === pal.name
                              ? "ring-2 ring-[var(--gray-900)] scale-110 border-white z-10"
                              : "border-black/30 hover:scale-105"
                          }`}
                          style={{ backgroundColor: pal.hex, borderRadius: 0 }}
                          title={`Set primary brand ink to ${pal.name} (${pal.hex})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Responsive Width &amp; Readability Tokens</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Two larger responsive breakpoint steps (3xl, 4xl) and optimal reading measures (45ch–75ch).
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">LAYOUT CONTRACTS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4 gap-4">
                <div
                  onClick={() => copyToClipboard("--breakpoint-3xl")}
                  className="p-4 bg-[var(--white)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors relative"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--primary-500)]">STEP 1: 3XL</span>
                    <Copy size={12} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="text-xl font-mono font-bold text-[var(--text)]">1920px</div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">--breakpoint-3xl / 120rem</span>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    FHD 1080p full desktop displays. Expands multi-pane cartographic viewports.
                  </p>
                </div>

                <div
                  onClick={() => copyToClipboard("--breakpoint-4xl")}
                  className="p-4 bg-[var(--white)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors relative"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--primary-500)]">STEP 2: 4XL</span>
                    <Copy size={12} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="text-xl font-mono font-bold text-[var(--text)]">2560px</div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">--breakpoint-4xl / 160rem</span>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    2K QHD, 4K UHD, and Ultrawide displays. Unlocks high-density telemetry panes.
                  </p>
                </div>

                <div
                  onClick={() => copyToClipboard("--measure-optimal")}
                  className="p-4 bg-[var(--white)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors relative"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--success-color)]">READING MEASURE</span>
                    <Copy size={12} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="text-xl font-mono font-bold text-[var(--text)]">65ch</div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">--measure-optimal / 65 chars</span>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Classic typographic golden mean. Maximizes reading velocity and saccade stability.
                  </p>
                </div>

                <div
                  onClick={() => copyToClipboard("--measure-narrow")}
                  className="p-4 bg-[var(--white)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors relative"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--warning-color)]">NARROW &amp; WIDE</span>
                    <Copy size={12} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="text-xl font-mono font-bold text-[var(--text)]">45ch &bull; 75ch</div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">--measure-narrow &bull; --measure-wide</span>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    45ch for lead-ins and captions; 75ch for dense technical references and tables.
                  </p>
                </div>

                <div
                  onClick={() => copyToClipboard("--column-max-width")}
                  className="p-4 bg-[var(--white)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors relative"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[var(--primary-500)]">COLUMN MAX WIDTH</span>
                    <Copy size={12} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="text-xl font-mono font-bold text-[var(--text)]">480px</div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">--column-max-width / 320–640px</span>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Divs inhabit columns with maximum width caps, flush left by default with center/right alignment.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 2: TYPOGRAPHY SPECIMEN
            ========================================================= */}
        {activeTab === "typography" && (
          <div className="flex flex-col gap-8">
            <section className="bg-[var(--white)] p-6" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)]">
                  Interactive Type Tester
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)]">INTER &amp; JETBRAINS MONO</span>
              </div>

              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type custom text to preview scale..."
                className="w-full bg-[var(--surface-muted)] border border-[var(--border-gray)] p-3 text-sm mb-6 text-[var(--text)] focus:border-[var(--primary-500)] focus:outline-none"
                style={{ borderRadius: 0 }}
              />

              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Display Poster / 6rem (90px) / Weight 800
                  </span>
                  <div className="ds-display text-[var(--text)] overflow-hidden truncate">
                    {sampleText || "PRINTED MATTER"}
                  </div>
                </div>

                <div className="border-t border-[var(--border-gray)]/10 pt-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    H1 Headline / 4rem (60px) / Weight 800
                  </span>
                  <h1 className="ds-h1 text-[var(--text)] overflow-hidden truncate">
                    {sampleText || "National Administrative Overview"}
                  </h1>
                </div>

                <div className="border-t border-[var(--border-gray)]/10 pt-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    H2 Section Head / 2.75rem (41px) / Weight 700
                  </span>
                  <h2 className="ds-h2 text-[var(--text)] overflow-hidden truncate">
                    {sampleText || "Subnational Demographic Analysis"}
                  </h2>
                </div>

                <div className="border-t border-[var(--border-gray)]/10 pt-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    H3 Subsection / 1.85rem (28px) / Weight 800
                  </span>
                  <h3 className="ds-h3 text-[var(--text)]">
                    {sampleText || "Water Access &amp; Primary Sanitation Indicators"}
                  </h3>
                </div>

                <div className="border-t border-[var(--border-gray)]/10 pt-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    H4 Uppercase Category / 1.35rem (20px) / Weight 700 / Spaced
                  </span>
                  <h4 className="ds-h4 text-[var(--text)]">
                    {sampleText || "ADMINISTRATIVE BOUNDARY LEVEL 2"}
                  </h4>
                </div>

                <div className="border-t border-[var(--border-gray)]/10 pt-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Technical Metadata / JetBrains Mono / Tabular Numbers
                  </span>
                  <p className="font-mono text-sm text-[var(--text)] tabular-nums bg-[var(--surface-muted)] p-3">
                    COORDINATES: 00°01&apos;25&quot;N 037°54&apos;22&quot;E | ELEV: 1,240.50m | TIME: 15:42:09 UTC | RESOLUTION: 0.005°
                  </p>
                </div>
              </div>
            </section>

            {/* ─── Typographic Ink & Ground Interactions: Paper, Ink & Color ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)] font-mono">
                    Typographic Ink &amp; Ground Interactions
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Physical ink-on-paper relationships: <strong>Type on Paper/Ink</strong>, <strong>Type on Color</strong>, and <strong>Color Type on Paper/Ink</strong>. Validated with WCAG AAA &amp; AA contrast ratings.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">CONTRAST &amp; MATERIAL DENSITY</span>
              </div>

              <div className="space-y-8">
                {/* ─── Group 1: Type on Paper / Ink ─── */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[var(--gray-900)] inline-block" />
                      1. Type on Paper / Ink (Foundational Ink on Paper)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">WCAG AAA (13.90:1 Contrast)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1A: Ink Black on Paper Stock */}
                    <div className="p-5 bg-[var(--white)] border border-[var(--border-gray)] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                          <span className="font-mono text-xs font-bold text-[var(--primary-500)] uppercase">
                            INK BLACK ON PAPER STOCK
                          </span>
                          <span className="font-mono text-[10px] bg-[var(--gray-900)] text-white px-2 py-0.5 font-bold">
                            13.90:1 AAA PASS
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[var(--gray-900)] mb-1 leading-snug">
                          Deep Carbon Ink on Stone 100 Press Sheet
                        </h4>
                        <p className="text-xs text-[var(--gray-700)] leading-relaxed mb-3">
                          Stone 900 Carbon Ink (<code className="text-[11px] bg-[var(--surface-muted)] px-1">#1C1917</code>) physically absorbs the warmth of the unbleached Stone 100 (<code className="text-[11px] bg-[var(--surface-muted)] px-1">#F5F5F4</code>) paper sheet. Eliminates digital glare while delivering crisp, authoritative legibility.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[var(--border-gray)]/20 font-mono text-[11px] text-[var(--gray-600)] flex justify-between">
                        <span>INK: var(--gray-900)</span>
                        <span>GROUND: var(--white)</span>
                      </div>
                    </div>

                    {/* 1B: Knockout White on Solid Ink Black */}
                    <div className="p-5 bg-[var(--gray-900)] text-white border border-[var(--gray-900)] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/20">
                          <span className="font-mono text-xs font-bold text-[var(--spectrum-yellow)] uppercase">
                            KNOCKOUT WHITE ON SOLID INK
                          </span>
                          <span className="font-mono text-[10px] bg-white text-[var(--gray-900)] px-2 py-0.5 font-bold">
                            13.90:1 AAA PASS
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[var(--white)] mb-1 leading-snug">
                          Reversed Intaglio Plate (Paper Knockout)
                        </h4>
                        <p className="text-xs text-[var(--gray-200)] leading-relaxed mb-3">
                          Unprinted Paper White (<code className="text-[11px] bg-white/20 px-1">#F5F5F4</code>) cut into solid carbon ink ground. Used for critical administrative warnings, inverted cartographic docks, and terminal HUD readouts.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/20 font-mono text-[11px] text-[var(--gray-300)] flex justify-between">
                        <span>KNOCKOUT: var(--white)</span>
                        <span>GROUND: var(--gray-900)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Group 2: Type on Color ─── */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[var(--spectrum-amber)] inline-block" />
                      2. Type on Color (Ink &amp; Knockout Typography over Spot Color Plates)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Photolithographic Ground Rule</span>
                  </div>

                  {/* 2A: Ink Black on Light/Mid Spot Colors */}
                  <div className="mb-3">
                    <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase block mb-2">
                      A. Ink Black Typography on Light/Mid Spot Color Grounds (AAA High Contrast):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* On Yellow */}
                      <div className="p-3.5 bg-[var(--spectrum-yellow)] text-[var(--gray-900)] border border-[var(--gray-900)]/40 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT YELLOW</span>
                            <span className="bg-[var(--gray-900)] text-white px-1.5 py-0.2">10.8:1 AAA</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Administrative Notice</h5>
                          <p className="text-[11px] leading-snug">Boundary revisions active for sector 4 telemetry.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          #EDD528 Spot Yellow
                        </div>
                      </div>

                      {/* On Amber Gold */}
                      <div className="p-3.5 bg-[var(--spectrum-amber)] text-[var(--gray-900)] border border-[var(--gray-900)]/40 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON AMBER GOLD</span>
                            <span className="bg-[var(--gray-900)] text-white px-1.5 py-0.2">8.9:1 AAA</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Caution Advisory</h5>
                          <p className="text-[11px] leading-snug">Precipitation delta exceeding seasonal baseline.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          #EDBC2F Amber Gold
                        </div>
                      </div>

                      {/* On Green */}
                      <div className="p-3.5 bg-[var(--spectrum-green)] text-[var(--gray-900)] border border-[var(--gray-900)]/40 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT GREEN</span>
                            <span className="bg-[var(--gray-900)] text-white px-1.5 py-0.2">6.8:1 AAA</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Confirmed Parity</h5>
                          <p className="text-[11px] leading-snug">All 47 county registries synchronized.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          #74BE60 Green Spot
                        </div>
                      </div>

                      {/* On Aqua */}
                      <div className="p-3.5 bg-[var(--spectrum-aqua)] text-[var(--gray-900)] border border-[var(--gray-900)]/40 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON AQUA SEAFOAM</span>
                            <span className="bg-[var(--gray-900)] text-white px-1.5 py-0.2">7.2:1 AAA</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Hydrologic Flow</h5>
                          <p className="text-[11px] leading-snug">Lake Turkana reservoir telemetry active.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          #71B197 Aqua Seafoam
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2B: Knockout White on Deep Spot Colors */}
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase block mb-2">
                      B. Knockout Paper White Typography on Deep Spot Color Grounds:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* On Spot Blue */}
                      <div className="p-3.5 bg-[var(--primary-500)] text-white border border-[var(--primary-600)] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT BLUE</span>
                            <span className="bg-white text-[var(--primary-900)] px-1.5 py-0.2">3.0:1 AA Lrg</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Brand Banner Action</h5>
                          <p className="text-[11px] text-white/90 leading-snug">Primary geographic command heading plate.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          #6EA3BE Spot Blue
                        </div>
                      </div>

                      {/* On Red */}
                      <div className="p-3.5 bg-[var(--spectrum-red)] text-white border border-[var(--spectrum-red)] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT RED</span>
                            <span className="bg-white text-[var(--gray-900)] px-1.5 py-0.2">3.2:1 AA Lrg</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Critical Alarm</h5>
                          <p className="text-[11px] text-white/90 leading-snug">High vulnerability anomaly threshold.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          #E65E59 Spot Red
                        </div>
                      </div>

                      {/* On Orange */}
                      <div className="p-3.5 bg-[var(--spectrum-orange)] text-[var(--gray-900)] border border-[var(--spectrum-orange)] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT ORANGE</span>
                            <span className="bg-[var(--gray-900)] text-white px-1.5 py-0.2">7.1:1 AAA</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Telemetry Alert</h5>
                          <p className="text-[11px] text-[var(--gray-800)] leading-snug">Sensor ping deviation detected in ADM2.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          #ED9235 Spot Orange
                        </div>
                      </div>

                      {/* On Violet */}
                      <div className="p-3.5 bg-[var(--spectrum-violet)] text-white border border-[var(--spectrum-violet)] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span>ON SPOT VIOLET</span>
                            <span className="bg-white text-[var(--gray-900)] px-1.5 py-0.2">3.8:1 AA Lrg</span>
                          </div>
                          <h5 className="font-bold text-sm leading-tight mb-1">Spatial Category</h5>
                          <p className="text-[11px] text-white/90 leading-snug">Geodesic triangulation sector reference.</p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          #A773C4 Spot Violet
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2C: Color on Color Knockout (Substrate & Plate Reverse Cutouts) */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase block mb-2">
                      C. Color on Color Knockout (Intaglio Aperture Cutouts in Misregistration):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* C1: Yellow Knockout in Spot Blue Plate */}
                      <div
                        className="p-3.5 bg-[var(--primary-500)] text-[var(--spectrum-yellow)] border border-[var(--primary-600)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                        data-plate="blue"
                      >
                        <div data-plate="yellow" className="ko-fringe-yellow">
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="text-white/90">YELLOW ON BLUE</span>
                            <span className="bg-[var(--spectrum-yellow)] text-[var(--primary-900)] px-1.5 py-0.2 font-black">KNOCKOUT</span>
                          </div>
                          <h5 className="font-extrabold text-sm leading-tight mb-1 text-[var(--spectrum-yellow)]">
                            Boundary Override
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-yellow)]/90 leading-snug font-medium">
                            Yellow underplate revealed cleanly through solid Spot Blue intaglio cutout aperture.
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          Top: Blue (#6EA3BE) &bull; Cutout: Yellow (#EDD528)
                        </div>
                      </div>

                      {/* C2: Aqua Seafoam Knockout in Spot Violet Plate */}
                      <div
                        className="p-3.5 bg-[var(--spectrum-violet)] text-[var(--spectrum-aqua)] border border-[var(--spectrum-violet)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                        data-plate="violet"
                      >
                        <div data-plate="aqua" className="ko-fringe-aqua">
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="text-white/90">AQUA ON VIOLET</span>
                            <span className="bg-[var(--spectrum-aqua)] text-[var(--gray-900)] px-1.5 py-0.2 font-black">KNOCKOUT</span>
                          </div>
                          <h5 className="font-extrabold text-sm leading-tight mb-1 text-[var(--spectrum-aqua)]">
                            Geodesic Vertex
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-aqua)]/90 leading-snug font-medium">
                            High-frequency aqua plate exposed cleanly through dense violet field mask.
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          Top: Violet (#A773C4) &bull; Cutout: Aqua (#71B197)
                        </div>
                      </div>

                      {/* C3: Spot Red Knockout in Spot Lime Plate (Pure Spot on Spot) */}
                      <div
                        className="p-3.5 bg-[var(--spectrum-lime)] text-[var(--spectrum-red)] border border-[var(--spectrum-lime)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                        data-plate="lime"
                      >
                        <div data-plate="red" className="ko-fringe-red">
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="text-[var(--gray-900)]">RED ON LIME</span>
                            <span className="bg-[var(--spectrum-red)] text-white px-1.5 py-0.2 font-black">KNOCKOUT</span>
                          </div>
                          <h5 className="font-extrabold text-sm leading-tight mb-1 text-[var(--spectrum-red)]">
                            Spectral Chromatic Gap
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-red)]/95 leading-snug font-medium">
                            Saturated red plate exposed cleanly through brilliant lime ground cutout.
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)]">
                          Top: Lime (#BBCA49) &bull; Cutout: Red (#E65E59)
                        </div>
                      </div>

                      {/* C4: Amber Gold Knockout in Carbon Black Plate */}
                      <div
                        className="p-3.5 bg-[var(--gray-900)] text-[var(--spectrum-amber)] border border-[var(--gray-900)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                        data-plate="black"
                      >
                        <div data-plate="amber" className="ko-fringe-amber">
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="text-white/90">AMBER ON BLACK</span>
                            <span className="bg-[var(--spectrum-amber)] text-[var(--gray-900)] px-1.5 py-0.2 font-black">KNOCKOUT</span>
                          </div>
                          <h5 className="font-extrabold text-sm leading-tight mb-1 text-[var(--spectrum-amber)]">
                            Carbon Relief
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-amber)]/95 leading-snug font-medium">
                            Amber gold text punch cut through heavy 100% carbon black bed.
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/80">
                          Top: Carbon Black (#1C1917) &bull; Cutout: Amber (#EDBC2F)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2D: Color on Color Overprint (Subtractive Multiply Overprinting) */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase block mb-2">
                      D. Color on Color Overprint (Subtractive Multiply Ink Layering):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* D1: Spot Red Type overprinted on Spot Yellow Ground -> Optical Cadmium Orange */}
                      <div
                        className="p-3.5 bg-[var(--spectrum-yellow)] border border-[var(--spectrum-amber)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                      >
                        <div
                          className="relative z-10 text-[var(--spectrum-red)]"
                          data-plate="red"
                          style={{ mixBlendMode: "multiply" }}
                        >
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="font-mono font-black">RED ON YELLOW</span>
                            <span className="bg-[var(--spectrum-red)] text-white px-1.5 py-0.2 font-black">MULTIPLY</span>
                          </div>
                          <h5 className="font-black text-sm leading-tight mb-1 text-[var(--spectrum-red)]">
                            Optical Cadmium Orange
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-red)] leading-snug font-semibold">
                            Spot red ink multiplies over yellow ground, absorbing blue spectra to synthesize vibrant cadmium vermilion orange text.
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                            <span className="w-3 h-3 border border-black/20" style={{ backgroundColor: "#CA4E0E" }} />
                            <span>Result: #CA4E0E Vermilion</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)] relative z-10">
                          Red (#E65E59) &times; Yellow (#EDD528) &rarr; Orange
                        </div>
                      </div>

                      {/* D2: Spot Blue Type overprinted on Spot Yellow Ground -> Optical Forest Green */}
                      <div
                        className="p-3.5 bg-[var(--spectrum-yellow)] border border-[var(--spectrum-green)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                      >
                        <div
                          className="relative z-10 text-[var(--primary-500)]"
                          data-plate="blue"
                          style={{ mixBlendMode: "multiply" }}
                        >
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="font-mono font-black">BLUE ON YELLOW</span>
                            <span className="bg-[var(--primary-500)] text-white px-1.5 py-0.2 font-black">MULTIPLY</span>
                          </div>
                          <h5 className="font-black text-sm leading-tight mb-1 text-[var(--primary-500)]">
                            Optical Emerald Forest Green
                          </h5>
                          <p className="text-[11px] text-[var(--primary-500)] leading-snug font-semibold">
                            Spot blue ink multiplies over yellow ground, filtering red wavelengths to forge rich organic forest green typography.
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                            <span className="w-3 h-3 border border-black/20" style={{ backgroundColor: "#63891E" }} />
                            <span>Result: #63891E Forest Green</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)] relative z-10">
                          Blue (#6EA3BE) &times; Yellow (#EDD528) &rarr; Green
                        </div>
                      </div>

                      {/* D3: Spot Violet Type overprinted on Aqua Seafoam Ground -> Optical Navy */}
                      <div
                        className="p-3.5 bg-[var(--spectrum-aqua)] border border-[var(--spectrum-blue)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                      >
                        <div
                          className="relative z-10 text-[var(--spectrum-violet)]"
                          data-plate="violet"
                          style={{ mixBlendMode: "multiply" }}
                        >
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="font-mono font-black">VIOLET ON AQUA</span>
                            <span className="bg-[var(--spectrum-violet)] text-white px-1.5 py-0.2 font-black">MULTIPLY</span>
                          </div>
                          <h5 className="font-black text-sm leading-tight mb-1 text-[var(--spectrum-violet)]">
                            Deep Marine Navy Overprint
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-violet)] leading-snug font-semibold">
                            Spot violet ink multiplies over aqua seafoam ground, absorbing warm spectra to produce heavy maritime navy letterforms.
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                            <span className="w-3 h-3 border border-black/20" style={{ backgroundColor: "#4A5273" }} />
                            <span>Result: #4A5273 Marine Navy</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-[var(--gray-900)]/20 font-mono text-[10px] text-[var(--gray-800)] relative z-10">
                          Violet (#A773C4) &times; Aqua (#71B197) &rarr; Navy
                        </div>
                      </div>

                      {/* D4: Spot Red Type overprinted on Spot Blue Ground -> Royal Aubergine Plum */}
                      <div
                        className="p-3.5 bg-[var(--primary-500)] border border-[var(--primary-700)] flex flex-col justify-between relative overflow-hidden select-none"
                        style={{ isolation: "isolate" }}
                      >
                        <div
                          className="relative z-10 text-[var(--spectrum-red)]"
                          data-plate="red"
                          style={{ mixBlendMode: "multiply" }}
                        >
                          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] font-bold">
                            <span className="font-mono font-black">RED ON BLUE</span>
                            <span className="bg-[var(--spectrum-red)] text-white px-1.5 py-0.2 font-black">MULTIPLY</span>
                          </div>
                          <h5 className="font-black text-sm leading-tight mb-1 text-[var(--spectrum-red)]">
                            Royal Aubergine Plum
                          </h5>
                          <p className="text-[11px] text-[var(--spectrum-red)] leading-snug font-semibold">
                            Spot red ink multiplies directly over spot blue ground, synthesizing deep royal aubergine plum typography without a third plate.
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                            <span className="w-3 h-3 border border-black/20" style={{ backgroundColor: "#603C4B" }} />
                            <span>Result: #603C4B Aubergine Plum</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/20 font-mono text-[10px] text-white/90 relative z-10">
                          Red (#E65E59) &times; Blue (#6EA3BE) &rarr; Plum
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Group 3: Color Type on Paper / Ink ─── */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[var(--primary-500)] inline-block" />
                      3. Color Type on Paper / Ink (Spot Inks as Typographic Accents)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Editorial Signal Colors</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 3A: Color Type on Paper Stock (#F5F5F4) */}
                    <div className="p-5 bg-[var(--white)] border border-[var(--border-gray)] shadow-sm">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                        <span className="font-mono text-xs font-bold text-[var(--text)] uppercase">
                          A. SPOT COLOR TYPE ON PAPER STOCK (#F5F5F4)
                        </span>
                        <span className="font-mono text-[10px] bg-[var(--surface-muted)] text-[var(--text)] px-2 py-0.5">
                          GROUND: PAPER WHITE
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-2.5 bg-[var(--surface)] border border-[var(--border-gray)]/30">
                          <span className="font-bold text-sm block text-[var(--primary-700)] font-sans">
                            Primary Blue Link &amp; Header (var(--primary-700))
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] block mt-0.5 font-mono">
                            4.52:1 WCAG AA &bull; Primary navigation markers and data URLs
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--surface)] border border-[var(--border-gray)]/30">
                          <span className="font-bold text-sm block text-[var(--spectrum-red)] font-sans">
                            Spot Red Critical Alert (var(--spectrum-red))
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] block mt-0.5 font-mono">
                            3.15:1 WCAG AA Large &bull; Emergency telemetry anomalies &amp; boundary breaches
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--surface)] border border-[var(--border-gray)]/30">
                          <span className="font-bold text-sm block text-[var(--gray-900)] font-sans">
                            <span className="text-[var(--spectrum-green)] font-mono font-bold mr-1.5">[OK]</span>
                            Spot Green Verified Delta (var(--spectrum-green))
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] block mt-0.5 font-mono">
                            Positive status indicators, online node pings, and synchronized data
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--surface)] border border-[var(--border-gray)]/30">
                          <span className="font-bold text-sm block text-[var(--spectrum-orange)] font-sans">
                            Spot Orange Caution Notice (var(--spectrum-orange))
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] block mt-0.5 font-mono">
                            Active tracking coordinates and caution thresholds
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3B: Color Type on Solid Ink Black (#1C1917) */}
                    <div className="p-5 bg-[var(--gray-900)] text-white border border-[var(--gray-900)] shadow-sm">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/20">
                        <span className="font-mono text-xs font-bold text-[var(--spectrum-yellow)] uppercase">
                          B. SPOT COLOR TYPE ON SOLID INK BLACK (#1C1917)
                        </span>
                        <span className="font-mono text-[10px] bg-white text-[var(--gray-900)] px-2 py-0.5 font-bold">
                          GROUND: INK BLACK
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-2.5 bg-[var(--gray-800)] border border-[var(--gray-700)]">
                          <span className="font-bold text-sm block text-[var(--spectrum-yellow)] font-sans">
                            Spot Yellow High-Voltage HUD (var(--spectrum-yellow))
                          </span>
                          <span className="text-[11px] text-[var(--gray-300)] block mt-0.5 font-mono">
                            10.8:1 WCAG AAA &bull; Primary night-vision coordinates &amp; radar vectors
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--gray-800)] border border-[var(--gray-700)]">
                          <span className="font-bold text-sm block text-[var(--spectrum-amber)] font-sans">
                            Amber Gold Warning Readout (var(--spectrum-amber))
                          </span>
                          <span className="text-[11px] text-[var(--gray-300)] block mt-0.5 font-mono">
                            8.9:1 WCAG AAA &bull; Altitude &amp; solar azimuth telemetry flags
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--gray-800)] border border-[var(--gray-700)]">
                          <span className="font-bold text-sm block text-[var(--spectrum-aqua)] font-sans">
                            Aqua Seafoam Sensor Ping (var(--spectrum-aqua))
                          </span>
                          <span className="text-[11px] text-[var(--gray-300)] block mt-0.5 font-mono">
                            7.2:1 WCAG AAA &bull; Hydrographic sounding depths &amp; contours
                          </span>
                        </div>

                        <div className="p-2.5 bg-[var(--gray-800)] border border-[var(--gray-700)]">
                          <span className="font-bold text-sm block text-[var(--spectrum-lime)] font-sans">
                            Lime Chartreuse Target Lock (var(--spectrum-lime))
                          </span>
                          <span className="text-[11px] text-[var(--gray-300)] block mt-0.5 font-mono">
                            8.2:1 WCAG AAA &bull; Satellite ephemeris &amp; geodesic vertices
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Typographic Measure & Line Length for Readability ────── */}
            <section className="bg-[var(--white)] p-6" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)]">
                    Typographic Measure &amp; Max Line Length for Readability
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Typographic research demonstrates that comfortable multi-line reading requires 45 to 75 characters per line (optimal: 65ch). Unconstrained lines on widescreen displays cause reader fatigue and tracking errors.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">45ch &bull; 65ch &bull; 75ch</span>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase mr-2">Select Measure:</span>
                {[
                  { id: "narrow", label: "45ch — Narrow", widthClass: "max-w-[45ch]" },
                  { id: "optimal", label: "65ch — Optimal Readability", widthClass: "max-w-[65ch]" },
                  { id: "wide", label: "75ch — Technical Wide", widthClass: "max-w-[75ch]" },
                  { id: "unconstrained", label: "100% — Unconstrained (Fatigue)", widthClass: "max-w-none" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMeasure(m.id as any)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                      selectedMeasure === m.id
                        ? "bg-[var(--primary-500)] text-white border border-[var(--primary-500)]"
                        : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--gray-100)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Character Ruler & Visual Specimen Container */}
              <div className="bg-[var(--surface-muted)] p-4 sm:p-6 overflow-x-auto">
                <div
                  className={`transition-all duration-200 border-r-2 border-dashed border-[var(--primary-500)] pr-4 ${
                    selectedMeasure === "narrow"
                      ? "max-w-[45ch]"
                      : selectedMeasure === "optimal"
                      ? "max-w-[65ch]"
                      : selectedMeasure === "wide"
                      ? "max-w-[75ch]"
                      : "max-w-none border-r-0 pr-0"
                  }`}
                >
                  {/* Visual Character Ruler */}
                  <div className="font-mono text-[10px] text-[var(--text-muted)] border-b border-[var(--border-gray)]/30 pb-1 mb-3 select-none flex justify-between">
                    <span>| 0</span>
                    {selectedMeasure !== "narrow" && <span>| 25</span>}
                    <span>| 45 (Narrow)</span>
                    {(selectedMeasure === "optimal" || selectedMeasure === "wide" || selectedMeasure === "unconstrained") && (
                      <span className="text-[var(--primary-500)] font-bold">| 65 (Optimal)</span>
                    )}
                    {(selectedMeasure === "wide" || selectedMeasure === "unconstrained") && (
                      <span>| 75 (Wide)</span>
                    )}
                  </div>

                  <p className="text-base text-[var(--text)] leading-relaxed font-sans mb-3">
                    Geographic cartography and editorial prose demand strict discipline over typographic measure. When line lengths exceed eighty characters on widescreen desktop monitors, the eye loses its return path when jumping down to the next row of copy, triggering cognitive friction and saccadic disorientation.
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-normal font-sans">
                    By binding paragraph widths to character counts (<code>45ch</code>, <code>65ch</code>, <code>75ch</code>) or using the <code>prose</code> class, editorial columns retain their physical print rhythm across ultrawide monitors and expansive workstation viewports.
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20 flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                    <span>
                      ACTIVE CLASS:{" "}
                      <strong className="text-[var(--primary-500)]">
                        {selectedMeasure === "narrow"
                          ? "max-w-reading-sm (45ch)"
                          : selectedMeasure === "optimal"
                          ? "max-w-reading / prose (65ch)"
                          : selectedMeasure === "wide"
                          ? "max-w-reading-lg (75ch)"
                          : "max-w-none (Full Container)"}
                      </strong>
                    </span>
                    <span>
                      LIMIT:{" "}
                      <strong>
                        {selectedMeasure === "narrow"
                          ? "45 chars"
                          : selectedMeasure === "optimal"
                          ? "65 chars"
                          : selectedMeasure === "wide"
                          ? "75 chars"
                          : "Unlimited"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Column Max Width & Alignment Specimen ──────────────── */}
            <section className="bg-[var(--white)] p-6" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)]">
                    Column Max Width &amp; Horizontal Alignment (Flush Left / Center / Right)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Divs inhabit columns with constrained maximum widths instead of exceeding readability caps. Columns are flush left by default, with dedicated options to center or right-align within wider viewports.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">MAX WIDTH + ALIGNMENT</span>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase mr-2">
                    Column Max Width:
                  </span>
                  {[
                    { id: "sm", label: "SM (320px)", widthClass: "max-w-col-sm", px: "320px" },
                    { id: "md", label: "MD (480px) — Default", widthClass: "max-w-col-md", px: "480px" },
                    { id: "lg", label: "LG (640px)", widthClass: "max-w-col-lg", px: "640px" },
                    { id: "none", label: "None (Full 100%)", widthClass: "max-w-none", px: "100%" },
                  ].map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setColumnMaxWidth(col.id as any)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                        columnMaxWidth === col.id
                          ? "bg-[var(--primary-500)] text-white border border-[var(--primary-500)]"
                          : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--gray-100)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      {col.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase mr-2">
                    Alignment:
                  </span>
                  {[
                    { id: "left", label: "Flush Left (Default)", icon: <AlignLeft size={13} />, alignClass: "ml-0 mr-auto" },
                    { id: "center", label: "Center", icon: <AlignCenter size={13} />, alignClass: "mx-auto" },
                    { id: "right", label: "Flush Right", icon: <AlignRight size={13} />, alignClass: "ml-auto mr-0" },
                  ].map((aln) => (
                    <button
                      key={aln.id}
                      onClick={() => setColumnAlign(aln.id as any)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 ${
                        columnAlign === aln.id
                          ? "bg-[var(--primary-500)] text-white border border-[var(--primary-500)]"
                          : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--gray-100)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      {aln.icon}
                      <span>{aln.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Multi-Column Viewport Stage */}
              <div className="bg-[var(--surface-muted)] p-4 sm:p-6 overflow-x-auto">
                {/* Visual Bounds Indicator */}
                <div className="border border-dashed border-[var(--border-gray)]/30 p-3 mb-4">
                  <div className="font-mono text-[11px] text-[var(--text-muted)] mb-2 flex items-center justify-between">
                    <span>PARENT CONTAINER VIEWPORT (EXPANDS FREELY)</span>
                    <span>
                      ACTIVE:{" "}
                      <strong className="text-[var(--primary-500)]">
                        {columnMaxWidth === "sm"
                          ? "max-w-[320px] / .ds-col-sm"
                          : columnMaxWidth === "md"
                          ? "max-w-[480px] / .ds-col-md"
                          : columnMaxWidth === "lg"
                          ? "max-w-[640px] / .ds-col-lg"
                          : "max-w-none"}{" "}
                        &bull;{" "}
                        {columnAlign === "left"
                          ? "FLUSH LEFT (ml-0 mr-auto)"
                          : columnAlign === "center"
                          ? "CENTERED (mx-auto)"
                          : "FLUSH RIGHT (ml-auto mr-0)"}
                      </strong>
                    </span>
                  </div>

                  {/* The constrained column div inhabiting the parent */}
                  <div
                    className={`transition-all duration-200 ${
                      columnMaxWidth === "sm"
                        ? "max-w-[320px]"
                        : columnMaxWidth === "md"
                        ? "max-w-[480px]"
                        : columnMaxWidth === "lg"
                        ? "max-w-[640px]"
                        : "max-w-none"
                    } ${
                      columnAlign === "left"
                        ? "ml-0 mr-auto"
                        : columnAlign === "center"
                        ? "mx-auto"
                        : "ml-auto mr-0"
                    }`}
                  >
                    <div className="bg-[var(--white)] p-5 border border-[var(--border-gray)] shadow-sm">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                        <span className="font-mono text-xs font-bold text-[var(--primary-500)] uppercase">
                          Constrained Column Div
                        </span>
                        <span className="font-mono text-[10px] bg-[var(--surface-muted)] px-2 py-0.5 text-[var(--text)]">
                          CAP: {columnMaxWidth === "sm" ? "320px" : columnMaxWidth === "md" ? "480px" : columnMaxWidth === "lg" ? "640px" : "100%"}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[var(--text)] mb-2">
                        Geographic Data Telemetry Column
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                        This container is capped at a strict maximum width. Even when the outer browser or display expands to 1920px (3XL) or 2560px (4XL), this column never exceeds its designated boundary. It remains anchored flush left by default, preserving typographic structure.
                      </p>

                      <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-gray)]/20">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[var(--text-muted)]">Alignment Rule:</span>
                          <strong className="text-[var(--primary-500)] uppercase">
                            {columnAlign === "left" ? "Flush Left (Default)" : columnAlign === "center" ? "Centered Column" : "Flush Right"}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[var(--text-muted)]">CSS Classes:</span>
                          <code className="text-[11px] bg-[var(--surface-muted)] px-1.5 py-0.5">
                            {columnMaxWidth === "sm" ? ".ds-col-sm" : columnMaxWidth === "md" ? ".ds-col-md" : columnMaxWidth === "lg" ? ".ds-col-lg" : ".w-full"} .ds-col-{columnAlign}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multi-column grid example showing multiple capped divs */}
                <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20">
                  <span className="font-mono text-xs font-bold text-[var(--text-muted)] block mb-3 uppercase">
                    Multi-Column Pair (Divs Inhabiting Columns with Caps &amp; Shared Ground):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`w-full transition-all duration-200 ${
                        columnMaxWidth === "sm"
                          ? "max-w-[320px]"
                          : columnMaxWidth === "md"
                          ? "max-w-[480px]"
                          : columnMaxWidth === "lg"
                          ? "max-w-[640px]"
                          : "max-w-none"
                      } ${
                        columnAlign === "left"
                          ? "ml-0 mr-auto"
                          : columnAlign === "center"
                          ? "mx-auto"
                          : "ml-auto mr-0"
                      }`}
                    >
                      <div className="bg-[var(--white)] p-4 border border-[var(--border-gray)]">
                        <span className="text-xs font-mono font-bold text-[var(--primary-500)] block mb-1">
                          COLUMN A (PRIMARY INLET)
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">
                          Capped width prevents line stretching and maintains comfortable saccadic eye rhythm.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-full transition-all duration-200 ${
                        columnMaxWidth === "sm"
                          ? "max-w-[320px]"
                          : columnMaxWidth === "md"
                          ? "max-w-[480px]"
                          : columnMaxWidth === "lg"
                          ? "max-w-[640px]"
                          : "max-w-none"
                      } ${
                        columnAlign === "left"
                          ? "ml-0 mr-auto"
                          : columnAlign === "center"
                          ? "mx-auto"
                          : "ml-auto mr-0"
                      }`}
                    >
                      <div className="bg-[var(--white)] p-4 border border-[var(--border-gray)]">
                        <span className="text-xs font-mono font-bold text-[var(--primary-500)] block mb-1">
                          COLUMN B (SECONDARY TELEMETRY)
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">
                          Aligns in lockstep with column rules across wider responsive breakpoint states.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Tailwind Typography Plugin Integration Specimen ────── */}
            <section className="bg-[var(--white)] p-6" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)]">
                    Tailwind Typography Plugin Specimen (.prose)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Rendered with <code>@tailwindcss/typography</code> styled specifically for Printed Matter (mineral stone ink, sharp corners, hairline borders, and 65ch max-width).
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">@tailwindcss/typography</span>
              </div>

              <article className="prose max-w-reading mx-auto bg-[var(--surface)] p-6 sm:p-8">
                <span className="font-mono text-xs font-bold uppercase text-[var(--primary-500)] tracking-wider block not-prose mb-1">
                  CARTOGRAPHIC SPECIFICATION // DOC-88
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] mt-0 mb-3">
                  Single-Ink Cartography &amp; Optical Legibility
                </h2>
                <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed">
                  In technical cartography, map typography must balance simultaneous reading modes: micro-annotation of coordinate telemetry alongside sustained reading of regional field notes. The paper substrate provides the quiet contrast baseline.
                </p>

                <blockquote>
                  &ldquo;A digital screen is not a glowing void; it is an unprinted press sheet waiting for precise deposit of ink.&rdquo;
                </blockquote>

                <h3 className="text-lg font-bold text-[var(--text)] mt-6 mb-2">Technical Parameters</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  When styling data readouts and tabular logs, all numerals use <code>font-variant-numeric: tabular-nums</code> and monospace stacks:
                </p>

                <table className="w-full text-xs font-mono not-prose mb-4">
                  <thead>
                    <tr className="bg-[var(--gray-100)] border-b border-[var(--border-gray)]">
                      <th className="p-2 text-left text-[var(--text)]">STEP</th>
                      <th className="p-2 text-left text-[var(--text)]">BREAKPOINT</th>
                      <th className="p-2 text-left text-[var(--text)]">TARGET DISPLAY</th>
                      <th className="p-2 text-left text-[var(--text)]">CONTAINER CAP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--gray-200)]">
                      <td className="p-2 font-bold text-[var(--primary-500)]">2XL</td>
                      <td className="p-2">1536px</td>
                      <td className="p-2">Standard Desktop Monitor</td>
                      <td className="p-2">1280px (max-w-7xl)</td>
                    </tr>
                    <tr className="border-b border-[var(--gray-200)] bg-[var(--white)]">
                      <td className="p-2 font-bold text-[var(--primary-500)]">3XL (New)</td>
                      <td className="p-2 font-bold">1920px (120rem)</td>
                      <td className="p-2">Full HD (1080p) Workstation</td>
                      <td className="p-2 font-bold">1920px (max-w-3xl)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-[var(--primary-500)]">4XL (New)</td>
                      <td className="p-2 font-bold">2560px (160rem)</td>
                      <td className="p-2">1440p QHD / 4K / Ultrawide</td>
                      <td className="p-2 font-bold">2560px (max-w-4xl)</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs text-[var(--text-muted)] font-mono not-prose bg-[var(--white)] p-3">
                  <code>npm install -D @tailwindcss/typography</code> &bull; Configured with custom 65ch measure &amp; sharp hairlines.
                </p>
              </article>
            </section>

            {/* ─── Responsive Width Scale Matrix ──────────────────────── */}
            <section className="bg-[var(--white)] p-6" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary-500)]">
                    Complete Responsive Width Scale (Including 2 Larger Steps)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Full spectrum of responsive viewport steps from compact mobile to expansive 4K workstations.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">7 BREAKPOINTS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
                {[
                  { step: "SM", id: "sm", width: "640px", note: "Mobile Landscape", isNew: false },
                  { step: "MD", id: "md", width: "768px", note: "Tablet Portrait", isNew: false },
                  { step: "LG", id: "lg", width: "1024px", note: "Laptop Screen", isNew: false },
                  { step: "XL", id: "xl", width: "1280px", note: "Standard Desktop", isNew: false },
                  { step: "2XL", id: "2xl", width: "1536px", note: "Large Desktop", isNew: false },
                  { step: "3XL", id: "3xl", width: "1920px", note: "FHD 1080p Desktop", isNew: true },
                  { step: "4XL", id: "4xl", width: "2560px", note: "QHD / 4K / Ultrawide", isNew: true },
                ].map((bp) => (
                  <div
                    key={bp.step}
                    className={`p-3 border transition-all ${
                      bp.isNew
                        ? "border-[var(--primary-500)] bg-[var(--primary-500)]/5"
                        : "border-[var(--border-gray)] bg-[var(--white)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[var(--text)]">{bp.step}</span>
                      {bp.isNew && (
                        <span className="font-mono text-[9px] bg-[var(--primary-500)] text-white px-1 font-bold">
                          NEW STEP
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-base font-bold text-[var(--primary-500)]">{bp.width}</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-1">{bp.note}</div>
                    <div className="mt-2 pt-2 border-t border-[var(--border-gray)]/20 text-[10px] font-mono text-[var(--text-muted)]">
                      min-width: {bp.width}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 3: COMPONENTS & CONTROLS
            ========================================================= */}
        {activeTab === "components" && (
          <div className="flex flex-col gap-8">
            {/* Breakpoint Telemetry Banner */}
            <div className="bg-[var(--white)] p-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--primary-500)] uppercase">Responsive Layout Mode:</span>
                <span className="bg-[var(--surface)] px-2 py-0.5 border border-[var(--border-gray)]">
                  {effectiveWidthPx >= 2560 ? "4XL Grid (4 Columns Active)" : effectiveWidthPx >= 1920 ? "3XL Grid (3 Columns Active)" : effectiveWidthPx >= 768 ? "MD/XL Grid (2 Columns Active)" : "Mobile Grid (1 Column Active)"}
                </span>
              </div>
              <span className="text-[var(--text-muted)]">
                Breakpoints adapt component density without compromising 0px flat elevation contracts.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 gap-6">
              {/* Card 1: Buttons */}
              <Card title="Buttons & Pressed State" badge={<Badge color="green">TACTILE PRESS</Badge>}>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  Zero bevels, zero elevation. When clicked, buttons flash <strong>solid green (var(--spectrum-green))</strong> while held.
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button variant="primary">Primary Blue</Button>
                  <Button variant="secondary">Rule Button</Button>
                  <Button variant="danger">Danger Red</Button>
                  <Button disabled>Disabled</Button>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--border-gray)] flex flex-wrap gap-2 items-center">
                  <Button size="sm" variant="primary">Small</Button>
                  <Button size="md" variant="primary">Medium</Button>
                  <Button size="lg" variant="primary">Large Action</Button>
                </div>
              </Card>

              {/* Card 2: Form Inputs & Search */}
              <Card title="Form Inputs & Search" badge={<Badge color="blue">HAIRLINE FRAMES</Badge>}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">Search Component</label>
                    <SearchBox
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      onClear={() => setSearchVal("")}
                      placeholder="Search boundaries or indicators..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">Administrative Level Filter</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["ADM0", "ADM1", "ADM2", "ADM3"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setSelectedAdminLevel(lvl)}
                          className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                            selectedAdminLevel === lvl
                              ? "bg-[var(--primary-500)] text-white border border-[var(--primary-500)]"
                              : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--surface)]"
                          }`}
                          style={{ borderRadius: 0, boxShadow: "none" }}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card 3: Hierarchical Location Tree */}
              <Card title="Hierarchical Location Tree" badge={<Badge variant="level">C A1 A2</Badge>}>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Margin-indented administrative structure with square toggle boxes.
                </p>
                <div className="bg-[var(--surface)] p-2 border border-[var(--border-gray)]">
                  <TreeNode
                    node={sampleTree}
                    selectedId={selectedTreeNode}
                    onSelect={(node) => setSelectedTreeNode(node.id)}
                  />
                </div>
              </Card>

              {/* Card 4: Badges & Spectrum Tags */}
              <Card title="Badges & Spectrum Tags" badge={<Badge color="orange">SPOT SYSTEM</Badge>}>
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-[var(--text-muted)]">
                    Administrative level pills alongside spot ink chips with multiply blending.
                  </p>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Badge variant="level">ADM0</Badge>
                    <Badge variant="level">ADM1</Badge>
                    <Badge variant="level">ADM2</Badge>
                    <Badge variant="level">ADM3</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Badge color="red">RED SPOT</Badge>
                    <Badge color="orange">ORANGE SPOT</Badge>
                    <Badge color="yellow">YELLOW SPOT</Badge>
                    <Badge color="green">GREEN SPOT</Badge>
                    <Badge color="aqua">AQUA SPOT</Badge>
                    <Badge color="blue">BLUE SPOT</Badge>
                    <Badge color="violet">VIOLET SPOT</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: TEXTURES & SYMBOLS
            ========================================================= */}
        {activeTab === "textures-symbols" && (
          <div className="flex flex-col gap-8">
            {/* Breakpoint Telemetry Banner */}
            <div className="bg-[var(--white)] p-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border border-[var(--border-gray)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--primary-500)] uppercase">Press Substrate &amp; Control Chrome:</span>
                <span className="bg-[var(--surface)] px-2 py-0.5 border border-[var(--border-gray)]">
                  Mechanical Screens &bull; Color Cabbages &bull; Registration Targets &bull; Slur Gauges
                </span>
              </div>
              <span className="text-[var(--text-muted)]">
                Physical press calibration artifacts, intaglio pattern density scales, and multi-plate overprinting symbols.
              </span>
            </div>

            {/* ─── 1. Baseline Cartographic & Print Patterns (Ink Black) ─── */}
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Single-Ink Screen Overlays (Ink Black)</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Hatching, crosshatching, dot matrix, and stippling drawn strictly in <strong>Ink Black</strong> (<code className="text-xs bg-[var(--surface-muted)] px-1">var(--gray-900)</code> / Stone 900 carbon ink) over paper stock with physical multiply blending.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">6 BASELINE OVERLAYS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 3xl:grid-cols-6 4xl:grid-cols-6 gap-3">
                <PatternSwatch type="solid" color="var(--gray-900)" label="Solid Ink Black" description="100% Ink Black var(--gray-900)" />
                <PatternSwatch type="hatch-45" color="var(--gray-900)" label="45° Hatch" description="1.5px diagonal hairline rule" />
                <PatternSwatch type="hatch-135" color="var(--gray-900)" label="135° Counter" description="Opposing linear rule" />
                <PatternSwatch type="crosshatch" color="var(--gray-900)" label="Crosshatch" description="Intaglio cross-grid rule" />
                <PatternSwatch type="dots" color="var(--gray-900)" label="Dot Matrix" description="Regular point grid" />
                <PatternSwatch type="stipple" color="var(--gray-900)" label="Stipple" description="Lithographic noise scatter" />
              </div>
            </section>

            {/* ─── 2. Mechanical Tonal Greyscale (Pattern Density Scale) ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono">
                    Mechanical Tonal Greyscale (Pattern Density Scale)
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    In physical cartography and intaglio engraving, tonal grays are formed by <strong>mechanical frequency modulation</strong> (spacing, stroke width, and point radius) rather than translucent digital alpha. These 5 binary steps reproduce with 100% fidelity on high-contrast thermal, laser, and newsprint media.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">5 DENSITY TIERS (10% &ndash; 90%)</span>
              </div>

              <div className="space-y-6">
                {/* 2A: Crosshatch Density Ramp */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--gray-900)] inline-block" />
                      1. Crosshatch Tonal Scale (Intaglio Linear Grid)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Grid pitch: 16px &rarr; 4px</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <PatternSwatch type="crosshatch" density={1} color="var(--gray-900)" label="Crosshatch 10%" description="16px pitch • 0.75px rule (Sparse)" />
                    <PatternSwatch type="crosshatch" density={2} color="var(--gray-900)" label="Crosshatch 25%" description="12px pitch • 1.0px rule (Light)" />
                    <PatternSwatch type="crosshatch" density={3} color="var(--gray-900)" label="Crosshatch 50%" description="8px pitch • 1.25px rule (Medium)" />
                    <PatternSwatch type="crosshatch" density={4} color="var(--gray-900)" label="Crosshatch 75%" description="6px pitch • 1.5px rule (Dense)" />
                    <PatternSwatch type="crosshatch" density={5} color="var(--gray-900)" label="Crosshatch 90%" description="4px pitch • 1.6px rule (Heavy)" />
                  </div>
                </div>

                {/* 2B: Dot Matrix Density Ramp */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--gray-900)] inline-block" />
                      2. Dot Matrix / Halftone Tonal Scale (Point Frequency)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Dot radius: 1.0px &rarr; 2.25px</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <PatternSwatch type="dots" density={1} color="var(--gray-900)" label="Dot Matrix 10%" description="16px pitch • r=1.0px (Fine Point)" />
                    <PatternSwatch type="dots" density={2} color="var(--gray-900)" label="Dot Matrix 25%" description="12px pitch • r=1.5px (Light)" />
                    <PatternSwatch type="dots" density={3} color="var(--gray-900)" label="Dot Matrix 50%" description="8px pitch • r=1.75px (Medium)" />
                    <PatternSwatch type="dots" density={4} color="var(--gray-900)" label="Dot Matrix 75%" description="6px pitch • r=2.0px (Dense)" />
                    <PatternSwatch type="dots" density={5} color="var(--gray-900)" label="Dot Matrix 90%" description="5px pitch • r=2.25px (Heavy)" />
                  </div>
                </div>

                {/* 2C: Stipple Density Ramp */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--gray-900)] inline-block" />
                      3. Stipple Tonal Scale (Lithographic Organic Scatter)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Particle count: 2 &rarr; 7 points</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <PatternSwatch type="stipple" density={1} color="var(--gray-900)" label="Stipple 10%" description="16px tile • 2 points (Sparse)" />
                    <PatternSwatch type="stipple" density={2} color="var(--gray-900)" label="Stipple 25%" description="14px tile • 4 points (Light)" />
                    <PatternSwatch type="stipple" density={3} color="var(--gray-900)" label="Stipple 50%" description="12px tile • 5 points (Medium)" />
                    <PatternSwatch type="stipple" density={4} color="var(--gray-900)" label="Stipple 75%" description="10px tile • 6 points (Dense)" />
                    <PatternSwatch type="stipple" density={5} color="var(--gray-900)" label="Stipple 90%" description="8px tile • 7 points (Heavy Litho)" />
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 3. Spot Ink Color Cartographic Patterns ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono">
                    Spot Ink Color Screen Patterns
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Single-ink patterns rendered with Printed Matter&apos;s 11 calibrated spot inks. In print runs, these act as layered spot-color screens over warm paper stock.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">CALIBRATED SPOT INKS</span>
              </div>

              {/* Interactive Color Selector Palette */}
              <div className="mb-6 bg-[var(--surface-muted)] p-4 border border-[var(--border-gray)]/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono font-bold text-[var(--text)] uppercase">
                    Select Spot Ink for Live Pattern Inspection:
                  </span>
                  <span className="font-mono text-xs text-[var(--primary-500)] font-bold">
                    ACTIVE COLOR: {patternSpotColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "SPOT BLUE", val: "var(--primary-500)", hex: "#6EA3BE" },
                    { name: "RED SWATCH", val: "var(--spectrum-red)", hex: "#E65E59" },
                    { name: "ORANGE SWATCH", val: "var(--spectrum-orange)", hex: "#ED9235" },
                    { name: "AMBER GOLD", val: "var(--spectrum-amber)", hex: "#EDBC2F" },
                    { name: "GREEN SWATCH", val: "var(--spectrum-green)", hex: "#74BE60" },
                    { name: "AQUA SEAFOAM", val: "var(--spectrum-aqua)", hex: "#71B197" },
                    { name: "SLATE BLUE", val: "var(--spectrum-blue)", hex: "#6EA3BE" },
                    { name: "INDIGO PERIWINKLE", val: "var(--spectrum-indigo)", hex: "#8E92C6" },
                    { name: "VIOLET SWATCH", val: "var(--spectrum-violet)", hex: "#A773C4" },
                    { name: "INK BLACK", val: "var(--gray-900)", hex: "#1C1917" },
                  ].map((ink) => (
                    <button
                      key={ink.val}
                      onClick={() => setPatternSpotColor(ink.val)}
                      className={`flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-bold transition-all ${
                        patternSpotColor === ink.val
                          ? "bg-[var(--gray-900)] text-white border-2 border-[var(--primary-500)] shadow-sm"
                          : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--surface)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <span className="w-3 h-3 inline-block" style={{ backgroundColor: ink.hex }} />
                      <span>{ink.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Suite for Selected Color */}
              <div className="mb-6">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] block mb-3 uppercase">
                  Pattern Suite Pressed in Active Spot Ink:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <PatternSwatch type="solid" color={patternSpotColor} label="Solid Press" description="100% spot coverage" />
                  <PatternSwatch type="hatch-45" color={patternSpotColor} label="45° Rule" description="Diagonal screen" />
                  <PatternSwatch type="hatch-135" color={patternSpotColor} label="135° Counter" description="Opposing screen" />
                  <PatternSwatch type="crosshatch" color={patternSpotColor} density={3} label="Crosshatch" description="50% medium cross" />
                  <PatternSwatch type="dots" color={patternSpotColor} density={3} label="Dot Matrix" description="50% halftone point" />
                  <PatternSwatch type="stipple" color={patternSpotColor} density={3} label="Stipple" description="50% litho noise" />
                </div>
              </div>

              {/* Multi-Color Pattern Showcase Matrix */}
              <div className="pt-4 border-t border-[var(--border-gray)]/20">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] block mb-3 uppercase">
                  Multi-Spot Ink Showcase:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <PatternSwatch type="crosshatch" density={3} angle={15} color="var(--primary-500)" label="Spot Blue" description="15° Screen • Cross 50%" />
                  <PatternSwatch type="crosshatch" density={3} angle={75} color="var(--spectrum-red)" label="Red Swatch" description="75° Screen • Cross 50%" />
                  <PatternSwatch type="dots" density={3} angle={30} color="var(--spectrum-green)" label="Green Swatch" description="30° Screen • Dots 50%" />
                  <PatternSwatch type="dots" density={3} angle={60} color="var(--spectrum-amber)" label="Amber Gold" description="60° Screen • Dots 50%" />
                  <PatternSwatch type="stipple" density={3} angle={105} color="var(--spectrum-aqua)" label="Aqua Seafoam" description="105° Screen • Stipple" />
                  <PatternSwatch type="stipple" density={3} angle={120} color="var(--spectrum-violet)" label="Violet Swatch" description="120° Screen • Stipple" />
                </div>
              </div>
            </section>

            {/* ─── 4. PRINTER'S SYMBOLS & COLOR CABBAGES ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[var(--spectrum-red)] inline-block" />
                    Printer&apos;s Calibration Symbols &amp; Color Cabbages
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Authentic lithographic &amp; letterpress calibration strip artifacts: 4-color process cabbages, overprinted registration crosshairs, Siemens rosette star targets, slur ladders, and precision trim crop marks.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">CMYK &amp; SPOT PRESS TOOLS</span>
              </div>

              <div className="space-y-8">
                {/* 4A: Printer's Color Cabbages / Progressive Tint Control Slugs */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--primary-500)] inline-block" />
                      A. Printer&apos;s Color Cabbages &amp; Progressive Tint Slugs (Densitometer Control Strips)
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">100% &rarr; 5% Progressive Tint Density</span>
                  </div>

                  <div className="space-y-4">
                    {/* CMYK 4-Color Process Stepped Cabbages */}
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] font-mono text-xs">
                      <span className="font-bold text-[var(--text)] uppercase block mb-2.5">
                        1. Primary Process Cabbages (Cyan/Blue, Magenta/Red, Yellow, Key Black):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Cyan / Process Blue */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-2.5">
                          <div className="flex justify-between items-center mb-1.5 font-bold text-[var(--primary-700)]">
                            <span>CYAN / BLUE PLATE</span>
                            <span className="text-[10px] text-[var(--text-muted)]">C100</span>
                          </div>
                          <div className="grid grid-cols-6 gap-1 h-8">
                            <div className="bg-[var(--primary-700)] flex items-center justify-center text-[9px] text-white font-bold" title="100%">100</div>
                            <div className="bg-[var(--primary-600)] flex items-center justify-center text-[9px] text-white font-bold" title="80%">80</div>
                            <div className="bg-[var(--primary-500)] flex items-center justify-center text-[9px] text-white font-bold" title="60%">60</div>
                            <div className="bg-[var(--primary-400)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="40%">40</div>
                            <div className="bg-[var(--primary-200)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="20%">20</div>
                            <div className="bg-[var(--primary-100)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="5%">5</div>
                          </div>
                        </div>

                        {/* Magenta / Process Red */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-2.5">
                          <div className="flex justify-between items-center mb-1.5 font-bold text-[var(--spectrum-red)]">
                            <span>MAGENTA / RED PLATE</span>
                            <span className="text-[10px] text-[var(--text-muted)]">M100</span>
                          </div>
                          <div className="grid grid-cols-6 gap-1 h-8">
                            <div className="bg-[#B91C1C] flex items-center justify-center text-[9px] text-white font-bold" title="100%">100</div>
                            <div className="bg-[var(--spectrum-red)] flex items-center justify-center text-[9px] text-white font-bold" title="80%">80</div>
                            <div className="bg-[#F87171] flex items-center justify-center text-[9px] text-white font-bold" title="60%">60</div>
                            <div className="bg-[#FCA5A5] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="40%">40</div>
                            <div className="bg-[#FECACA] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="20%">20</div>
                            <div className="bg-[#FEF2F2] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="5%">5</div>
                          </div>
                        </div>

                        {/* Process Yellow */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-2.5">
                          <div className="flex justify-between items-center mb-1.5 font-bold text-[#A16207]">
                            <span>PROCESS YELLOW</span>
                            <span className="text-[10px] text-[var(--text-muted)]">Y100</span>
                          </div>
                          <div className="grid grid-cols-6 gap-1 h-8">
                            <div className="bg-[var(--spectrum-yellow)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="100%">100</div>
                            <div className="bg-[#FDE047] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="80%">80</div>
                            <div className="bg-[#FEF08A] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="60%">60</div>
                            <div className="bg-[#FEF9C3] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="40%">40</div>
                            <div className="bg-[#FEFCE8] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="20%">20</div>
                            <div className="bg-[#FFFBEB] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="5%">5</div>
                          </div>
                        </div>

                        {/* Process Key Black */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-2.5">
                          <div className="flex justify-between items-center mb-1.5 font-bold text-[var(--gray-900)]">
                            <span>KEY CARBON BLACK</span>
                            <span className="text-[10px] text-[var(--text-muted)]">K100</span>
                          </div>
                          <div className="grid grid-cols-6 gap-1 h-8">
                            <div className="bg-[var(--gray-900)] flex items-center justify-center text-[9px] text-white font-bold" title="100%">100</div>
                            <div className="bg-[var(--gray-700)] flex items-center justify-center text-[9px] text-white font-bold" title="80%">80</div>
                            <div className="bg-[var(--gray-500)] flex items-center justify-center text-[9px] text-white font-bold" title="60%">60</div>
                            <div className="bg-[var(--gray-400)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="40%">40</div>
                            <div className="bg-[var(--gray-200)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="20%">20</div>
                            <div className="bg-[var(--gray-100)] flex items-center justify-center text-[9px] text-[var(--gray-900)] font-bold" title="5%">5</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2-Plate & 3-Plate Subtractive Overprint Trap Slugs */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] font-mono text-xs">
                      <span className="font-bold text-[var(--text)] uppercase block mb-2">
                        2. Multi-Plate Subtractive Trap &amp; Rich Black Slugs (mix-blend-mode: multiply):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {/* C + M -> Optical Violet */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">C + M (BLUE+RED)</span>
                          <div className="relative h-10 bg-white overflow-hidden border border-black/20">
                            <div className="absolute inset-0 bg-[var(--primary-500)]" />
                            <div className="absolute inset-0 bg-[var(--spectrum-red)]" style={{ mixBlendMode: "multiply" }} />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--text)] mt-1">Optical Violet</span>
                        </div>

                        {/* C + Y -> Optical Green */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">C + Y (BLUE+YELLOW)</span>
                          <div className="relative h-10 bg-white overflow-hidden border border-black/20">
                            <div className="absolute inset-0 bg-[var(--primary-500)]" />
                            <div className="absolute inset-0 bg-[var(--spectrum-yellow)]" style={{ mixBlendMode: "multiply" }} />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--text)] mt-1">Optical Green</span>
                        </div>

                        {/* M + Y -> Optical Orange */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">M + Y (RED+YELLOW)</span>
                          <div className="relative h-10 bg-white overflow-hidden border border-black/20">
                            <div className="absolute inset-0 bg-[var(--spectrum-red)]" />
                            <div className="absolute inset-0 bg-[var(--spectrum-yellow)]" style={{ mixBlendMode: "multiply" }} />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--text)] mt-1">Optical Orange</span>
                        </div>

                        {/* C + M + Y -> 3-Color Process Umber */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">C + M + Y (3-WAY)</span>
                          <div className="relative h-10 bg-white overflow-hidden border border-black/20">
                            <div className="absolute inset-0 bg-[var(--primary-500)]" />
                            <div className="absolute inset-0 bg-[var(--spectrum-red)]" style={{ mixBlendMode: "multiply" }} />
                            <div className="absolute inset-0 bg-[var(--spectrum-yellow)]" style={{ mixBlendMode: "multiply" }} />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--text)] mt-1">3-Color Neutral</span>
                        </div>

                        {/* 4-Color Rich Black (C60 M40 Y40 K100) */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">C+M+Y+K RICH BLACK</span>
                          <div className="relative h-10 bg-white overflow-hidden border border-black/20">
                            <div className="absolute inset-0 bg-[var(--primary-500)]" />
                            <div className="absolute inset-0 bg-[var(--spectrum-red)]" style={{ mixBlendMode: "multiply" }} />
                            <div className="absolute inset-0 bg-[var(--spectrum-yellow)]" style={{ mixBlendMode: "multiply" }} />
                            <div className="absolute inset-0 bg-[var(--gray-900)]" style={{ mixBlendMode: "multiply" }} />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--text)] mt-1">Rich Carbon Black</span>
                        </div>

                        {/* Densitometer Micro-Step Target */}
                        <div className="border border-[var(--border-gray)] p-2 flex flex-col justify-between bg-[var(--surface-muted)]">
                          <span className="font-bold text-[10px] text-[var(--text-muted)] mb-1">PRESS DENSITY</span>
                          <div className="h-10 flex border border-black/20">
                            <div className="flex-1 bg-[var(--spectrum-red)]" />
                            <div className="flex-1 bg-[var(--spectrum-yellow)]" />
                            <div className="flex-1 bg-[var(--spectrum-green)]" />
                            <div className="flex-1 bg-[var(--primary-500)]" />
                            <div className="flex-1 bg-[var(--gray-900)]" />
                          </div>
                          <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1">0.05D &ndash; 2.20D</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4B: Overprinted Multi-Plate Registration Marks & Targets */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--spectrum-green)] inline-block" />
                      B. Multi-Plate Overprint Registration Targets &amp; Crop Marks
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Overprinted Red, Yellow, Blue, Key Black</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Target 1: 4-Color Overprinted Crosshair Target */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>4-PLATE CROSSHAIR</span>
                        <span className="text-[var(--primary-500)]">⨁ OVERPRINT</span>
                      </div>
                      <div className="w-36 h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] flex items-center justify-center p-2">
                        {/* Red Plate */}
                        <svg className="absolute inset-0 w-full h-full text-[var(--spectrum-red)]" style={{ mixBlendMode: "multiply", transform: globalMisregistration ? "translate(var(--misregister-red-x), var(--misregister-red-y))" : "none" }} viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.75" />
                          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.75" />
                        </svg>
                        {/* Yellow Plate */}
                        <svg className="absolute inset-0 w-full h-full text-[var(--spectrum-yellow)]" style={{ mixBlendMode: "multiply", transform: globalMisregistration ? "translate(var(--misregister-yellow-x), var(--misregister-yellow-y))" : "none" }} viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.75" />
                          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.75" />
                        </svg>
                        {/* Blue Plate */}
                        <svg className="absolute inset-0 w-full h-full text-[var(--primary-500)]" style={{ mixBlendMode: "multiply", transform: globalMisregistration ? "translate(var(--misregister-blue-x), var(--misregister-blue-y))" : "none" }} viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.75" />
                          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.75" />
                        </svg>
                        {/* Key Black Plate */}
                        <svg className="absolute inset-0 w-full h-full text-[var(--gray-900)]" style={{ mixBlendMode: "multiply" }} viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1.25" />
                          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" />
                          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="1.5" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        C+M+Y+K Multi-Plate Optical Trap
                      </span>
                    </div>

                    {/* Target 2: Concentric Micro-Tick Vernier Target */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>VERNIER TARGET</span>
                        <span className="text-[var(--spectrum-red)]">0.05mm GAIN</span>
                      </div>
                      <div className="w-36 h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] flex items-center justify-center p-2">
                        <svg className="w-full h-full text-[var(--gray-900)]" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,2" />
                          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          {/* 8-Axis Radial Ticks */}
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <line
                              key={deg}
                              x1="50"
                              y1="6"
                              x2="50"
                              y2="16"
                              stroke="currentColor"
                              strokeWidth="0.75"
                              transform={`rotate(${deg} 50 50)`}
                            />
                          ))}
                          <circle cx="50" cy="50" r="2" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Angular Press Shift Diagnostic
                      </span>
                    </div>

                    {/* Target 3: Corner Trim & Bleed Registration Crop Marks */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>CROP &amp; BLEED MARKS</span>
                        <span className="text-[var(--spectrum-amber)]">3.0mm BLEED</span>
                      </div>
                      <div className="w-36 h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] p-2 overflow-hidden">
                        {/* Trim area bounds */}
                        <div className="absolute inset-4 border border-dashed border-[var(--gray-400)] flex items-center justify-center">
                          <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase">Trim Area</span>
                        </div>
                        {/* Overprinted Corner Crop Marks in C, M, Y, K */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          {/* Top-Left Crops */}
                          <line x1="16" y1="0" x2="16" y2="12" stroke="var(--gray-900)" strokeWidth="1" />
                          <line x1="0" y1="16" x2="12" y2="16" stroke="var(--gray-900)" strokeWidth="1" />
                          {/* Top-Right Crops */}
                          <line x1="84" y1="0" x2="84" y2="12" stroke="var(--gray-900)" strokeWidth="1" />
                          <line x1="88" y1="16" x2="100" y2="16" stroke="var(--gray-900)" strokeWidth="1" />
                          {/* Bottom-Left Crops */}
                          <line x1="16" y1="88" x2="16" y2="100" stroke="var(--gray-900)" strokeWidth="1" />
                          <line x1="0" y1="84" x2="12" y2="84" stroke="var(--gray-900)" strokeWidth="1" />
                          {/* Bottom-Right Crops */}
                          <line x1="84" y1="88" x2="84" y2="100" stroke="var(--gray-900)" strokeWidth="1" />
                          <line x1="88" y1="84" x2="100" y2="84" stroke="var(--gray-900)" strokeWidth="1" />
                        </svg>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Precision Guillotine Hairlines
                      </span>
                    </div>

                    {/* Target 4: Perforation & Fold Line Chrome */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>FOLD &amp; PERFORATION</span>
                        <span className="text-[var(--primary-500)]">SCORE RULE</span>
                      </div>
                      <div className="w-36 h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between p-3 font-mono text-[10px]">
                        <div>
                          <div className="flex justify-between text-[9px] text-[var(--text-muted)] mb-1">
                            <span>FOLD (DASHED)</span>
                            <span>SCORE</span>
                          </div>
                          <div className="h-0 border-t-2 border-dashed border-[var(--gray-900)] mb-3" />
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] text-[var(--text-muted)] mb-1">
                            <span>PERFORATION (DOTS)</span>
                            <span>MICRO-TIE</span>
                          </div>
                          <div className="h-0 border-t-2 border-dotted border-[var(--spectrum-red)] mb-3" />
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] text-[var(--text-muted)] mb-1">
                            <span>CUT LINE (SOLID)</span>
                            <span>SLIT</span>
                          </div>
                          <div className="h-0 border-t border-[var(--primary-500)]" />
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Mechanical Finishing Indicators
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4C: Siemens Rosette Star Target & Slur / Doubling Gauges */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/20">
                    <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--spectrum-violet)] inline-block" />
                      C. Siemens Star Rosette Target &amp; Slur/Doubling Resolution Gauges
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">Optical Resolving Power &bull; Hairline Calibrations</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Siemens Star Rosette */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>SIEMENS STAR ROSETTE</span>
                        <span className="text-[var(--primary-500)]">36 RAYS</span>
                      </div>
                      <div className="w-36 h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] flex items-center justify-center p-2">
                        <svg className="w-full h-full text-[var(--gray-900)]" viewBox="0 0 100 100">
                          {Array.from({ length: 36 }).map((_, i) => {
                            const angle = (i * 360) / 36;
                            return (
                              <line
                                key={i}
                                x1="50"
                                y1="50"
                                x2="50"
                                y2="6"
                                stroke="currentColor"
                                strokeWidth={i % 2 === 0 ? "1.5" : "0.75"}
                                transform={`rotate(${angle} 50 50)`}
                              />
                            );
                          })}
                          <circle cx="50" cy="50" r="4" fill="var(--surface)" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Radial Optical Resolution Limit
                      </span>
                    </div>

                    {/* Slur and Doubling Ladder Gauge */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>SLUR &amp; DOUBLING GAUGE</span>
                        <span className="text-[var(--spectrum-red)]">PRESS SLIP</span>
                      </div>
                      <div className="w-full h-36 relative bg-[var(--surface)] border border-[var(--border-gray)] p-2 grid grid-cols-2 gap-2">
                        {/* Horizontal Ladder (Directional Slur) */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-1.5 flex flex-col justify-between">
                          <span className="font-mono text-[9px] font-bold text-[var(--text-muted)]">HORIZ. LADDER</span>
                          <div className="space-y-1">
                            {Array.from({ length: 7 }).map((_, idx) => (
                              <div key={idx} className="h-0.5 bg-[var(--gray-900)]" />
                            ))}
                          </div>
                          <span className="font-mono text-[8px] text-[var(--text-muted)]">Circumferential</span>
                        </div>
                        {/* Vertical Ladder (Directional Slur) */}
                        <div className="border border-[var(--border-gray)] bg-[var(--white)] p-1.5 flex flex-col justify-between">
                          <span className="font-mono text-[9px] font-bold text-[var(--text-muted)]">VERT. LADDER</span>
                          <div className="flex justify-between h-14 items-stretch">
                            {Array.from({ length: 7 }).map((_, idx) => (
                              <div key={idx} className="w-0.5 bg-[var(--gray-900)]" />
                            ))}
                          </div>
                          <span className="font-mono text-[8px] text-[var(--text-muted)]">Lateral Shift</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Detects Directional Cylinder Slippage
                      </span>
                    </div>

                    {/* Hairline Calibrated Rule Gauge */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-between">
                      <div className="w-full flex justify-between font-mono text-[10px] font-bold text-[var(--text-muted)] mb-2">
                        <span>HAIRLINE RULE GAUGE</span>
                        <span className="text-[var(--spectrum-green)]">0.1pt &ndash; 2.0pt</span>
                      </div>
                      <div className="w-full h-36 bg-[var(--surface)] border border-[var(--border-gray)] p-3 flex flex-col justify-between font-mono text-[10px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--text-muted)]">0.10pt (Ultra)</span>
                          <div className="w-24 h-[0.5px] bg-[var(--gray-900)]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--text-muted)]">0.25pt (Hairline)</span>
                          <div className="w-24 h-[1px] bg-[var(--gray-900)]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--text-muted)]">0.50pt (Light)</span>
                          <div className="w-24 h-[1.5px] bg-[var(--gray-900)]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--text-muted)]">1.00pt (Regular)</span>
                          <div className="w-24 h-[2px] bg-[var(--gray-900)]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--text-muted)]">2.00pt (Heavy Rule)</span>
                          <div className="w-24 h-[3px] bg-[var(--gray-900)]" />
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 text-center">
                        Stroke Fidelity &amp; Gain Calibration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 5. Map & Chrome Control Rules ─── */}
            <Card title="Map & Canvas Control Rules: On-Map vs. On-Paper" badge={<Badge color="green">CANVAS RULE</Badge>}>
              <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-2 4xl:grid-cols-2 gap-6">
                <div className="p-4 bg-[var(--gray-900)] text-white">
                  <span className="text-xs font-mono font-bold block mb-2 text-[var(--spectrum-yellow)]">
                    STANDING ON MAP IMAGERY (BORDERLESS)
                  </span>
                  <p className="text-xs text-[var(--gray-100)] mb-3">
                    Controls standing on satellite or terrain imagery are <strong>borderless ink-on-white</strong> to avoid visual border conflict.
                  </p>
                  <div className="flex gap-1">
                    <Button variant="map-control" isActive>+</Button>
                    <Button variant="map-control">−</Button>
                    <Button variant="map-control">⌖</Button>
                    <Button variant="map-control">◷</Button>
                  </div>
                </div>

                <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)]">
                  <span className="text-xs font-mono font-bold block mb-2 text-[var(--primary-500)]">
                    STANDING ON PAPER STOCK (HAIRLINE)
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mb-3">
                    Controls standing on paper stock carry crisp <strong>1px hairline rules</strong> to define boundaries against the warm canvas.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">+ Layer</Button>
                    <Button variant="secondary" size="sm">Inspect</Button>
                    <Button variant="secondary" size="sm">Filter</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* =========================================================
            TAB 5: DATA VISUALIZATION
            ========================================================= */}
        {activeTab === "datavis" && (
          <div className="flex flex-col gap-8">
            {/* Breakpoint Telemetry Banner */}
            <div className="bg-[var(--white)] p-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border border-[var(--border-gray)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--primary-500)] uppercase">Data Visualization Density:</span>
                <span className="bg-[var(--surface)] px-2 py-0.5 border border-[var(--border-gray)]">
                  Tactile Press Charts &bull; Multi-Plate Overprinting &bull; Fuller Projection
                </span>
              </div>
              <span className="text-[var(--text-muted)]">
                Leveraging subtractive spot ink blending, intaglio mechanical hatch fills, and tabular numerals.
              </span>
            </div>

            {/* Split Telemetry Readout Dock */}
            <Card title="Split Telemetry Readout Dock" badge={<Badge color="blue">LIVE DOCK</Badge>}>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Ink-on-white status dock separating geographic place facts from camera attitude and solar time.
              </p>
              <DataReadout />
            </Card>

            {/* ─── Vector Dymaxion Map (Buckminster Fuller Airocean Projection) ─── */}
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--border-gray)] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Vector Cartography: Buckminster Fuller Dymaxion Map</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Continuous icosahedral polyhedron vector unfold with single-ink intaglio patterns, spot-color screens, and geodesic Great Circle chords.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">DYMAXION AIROCEAN VECTOR</span>
              </div>
              <FullerMap />
            </section>

            {/* ─── Tactile Data Visualization Specimen Suite ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[var(--primary-500)] inline-block" />
                    Tactile Press Data Visualizations (Overprinting &amp; Mechanical Screens)
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Charts built for physical paper reproduction: <strong>Radar spider plots</strong> with multiply overlapping plates, <strong>intaglio coordinate line plots</strong> with crosshatch fills, <strong>density tile heat maps</strong>, <strong>2-plate overprint bar graphs</strong>, and <strong>subtractive cumulative area charts</strong>.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">5 DATA SPECIMENS</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ─── Specimen 1: Multi-Plate Radar Plot (Spider Chart) ─── */}
                <div className="p-5 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/30">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--primary-500)] inline-block" />
                        1. Multi-Plate Radar Plot (Spider Graph)
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--primary-500)] text-white px-2 py-0.5 font-bold">
                        3-PLATE MULTIPLY
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Overlapping spot-ink polygonal plates (Spot Blue, Spot Red, Amber Gold). Intersecting polygons synthesize optical secondary colors physically via <code>mix-blend-mode: multiply</code>.
                    </p>

                    <div className="flex items-center justify-center p-2 bg-[var(--white)] border border-[var(--border-gray)] relative">
                      <svg className="w-full max-w-[340px] h-[300px]" viewBox="0 0 340 300">
                        {/* Concentric Hexagonal Grids (20%, 40%, 60%, 80%, 100%) */}
                        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, sIdx) => {
                          const cx = 170;
                          const cy = 150;
                          const r = 110 * scale;
                          const points = [0, 60, 120, 180, 240, 300]
                            .map((deg) => {
                              const rad = (deg - 90) * (Math.PI / 180);
                              return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
                            })
                            .join(" ");
                          return (
                            <polygon
                              key={sIdx}
                              points={points}
                              fill="none"
                              stroke="var(--gray-300)"
                              strokeWidth="0.75"
                              strokeDasharray={scale === 1.0 ? "none" : "2,2"}
                            />
                          );
                        })}

                        {/* 6 Axis Spoke Hairlines */}
                        {[0, 60, 120, 180, 240, 300].map((deg, aIdx) => {
                          const cx = 170;
                          const cy = 150;
                          const rad = (deg - 90) * (Math.PI / 180);
                          const x2 = cx + 115 * Math.cos(rad);
                          const y2 = cy + 115 * Math.sin(rad);
                          return (
                            <line
                              key={aIdx}
                              x1={cx}
                              y1={cy}
                              x2={x2}
                              y2={y2}
                              stroke="var(--gray-400)"
                              strokeWidth="0.75"
                            />
                          );
                        })}

                        {/* Axis Labels */}
                        {[
                          { text: "LATENCY", x: 170, y: 22, anchor: "middle" },
                          { text: "THROUGHPUT", x: 285, y: 90, anchor: "start" },
                          { text: "PRECISION", x: 285, y: 215, anchor: "start" },
                          { text: "DENSITY", x: 170, y: 282, anchor: "middle" },
                          { text: "RESILIENCE", x: 55, y: 215, anchor: "end" },
                          { text: "VELOCITY", x: 55, y: 90, anchor: "end" },
                        ].map((lbl, lIdx) => (
                          <text
                            key={lbl}
                            x={lbl.x}
                            y={lbl.y}
                            textAnchor={lbl.anchor}
                            className="text-[9px] font-mono font-bold fill-[var(--gray-700)]"
                          >
                            {lbl.text}
                          </text>
                        ))}

                        {/* Plate A: Spot Blue Polygon (Hatch pattern) */}
                        <polygon
                          points="170,55 255,105 240,195 170,225 95,190 100,105"
                          fill="var(--primary-500)"
                          fillOpacity="0.55"
                          stroke="var(--primary-700)"
                          strokeWidth="1.5"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Plate B: Spot Red Polygon (Multiply) */}
                        <polygon
                          points="170,75 235,120 220,175 170,245 80,160 115,120"
                          fill="var(--spectrum-red)"
                          fillOpacity="0.55"
                          stroke="var(--spectrum-red)"
                          strokeWidth="1.5"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Plate C: Amber Gold Polygon (Multiply) */}
                        <polygon
                          points="170,40 220,135 255,200 170,205 120,180 85,90"
                          fill="var(--spectrum-yellow)"
                          fillOpacity="0.55"
                          stroke="var(--spectrum-amber)"
                          strokeWidth="1.5"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Data Points */}
                        {[[170, 55], [255, 105], [240, 195], [170, 225], [95, 190], [100, 105]].map(([px, py], pIdx) => (
                          <circle key={pIdx} cx={px} cy={py} r="2.5" fill="var(--primary-700)" stroke="white" strokeWidth="0.75" />
                        ))}
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[var(--primary-500)] inline-block" />
                        Sector Alpha
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[var(--spectrum-red)] inline-block" />
                        Sector Beta
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[var(--spectrum-yellow)] inline-block" />
                        Sector Gamma
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)]">Overlap = Multiply Secondary</span>
                  </div>
                </div>

                {/* ─── Specimen 2: Intaglio Coordinate Plot / Line Graph ─── */}
                <div className="p-5 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/30">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--spectrum-red)] inline-block" />
                        2. Intaglio Coordinate Line Plot &amp; Halftone Fill
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--gray-900)] text-white px-2 py-0.5 font-bold">
                        TABULAR COORD
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Continuous telemetry line plot with mechanical intaglio screen fill under curve, hairline coordinate grid, and spot color registration points.
                    </p>

                    <div className="p-2 bg-[var(--white)] border border-[var(--border-gray)] relative">
                      <svg className="w-full h-[300px]" viewBox="0 0 420 260">
                        {/* Define Pattern Fills */}
                        <defs>
                          <pattern id="datavis-cross-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="var(--primary-500)" strokeWidth="0.8" opacity="0.45" />
                          </pattern>
                          <pattern id="datavis-dot-fill" width="6" height="6" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="1.2" fill="var(--spectrum-red)" opacity="0.4" />
                          </pattern>
                        </defs>

                        {/* Coordinate Grid Hairlines */}
                        {[40, 85, 130, 175, 220].map((y, yIdx) => (
                          <g key={yIdx}>
                            <line x1="45" y1={y} x2="400" y2={y} stroke="var(--gray-200)" strokeWidth="0.75" />
                            <text x="38" y={y + 3} textAnchor="end" className="text-[9px] font-mono fill-[var(--text-muted)]">
                              {(220 - y) * 2}k
                            </text>
                          </g>
                        ))}

                        {[45, 104, 163, 222, 281, 340, 400].map((x, xIdx) => (
                          <g key={xIdx}>
                            <line x1={x} y1="30" x2={x} y2="220" stroke="var(--gray-200)" strokeWidth="0.75" strokeDasharray="2,2" />
                            <text x={x} y="235" textAnchor="middle" className="text-[9px] font-mono fill-[var(--text-muted)]">
                              0{xIdx}:00
                            </text>
                          </g>
                        ))}

                        {/* Baseline Axes */}
                        <line x1="45" y1="220" x2="400" y2="220" stroke="var(--gray-900)" strokeWidth="1.25" />
                        <line x1="45" y1="30" x2="45" y2="220" stroke="var(--gray-900)" strokeWidth="1.25" />

                        {/* Series 1 Fill (Under Curve Hatch) */}
                        <path
                          d="M 45 220 L 45 160 Q 104 120 163 150 T 281 70 T 340 100 T 400 45 L 400 220 Z"
                          fill="url(#datavis-cross-hatch)"
                        />

                        {/* Series 2 Fill (Under Curve Dots) */}
                        <path
                          d="M 45 220 L 45 190 Q 104 170 163 180 T 281 125 T 340 140 T 400 95 L 400 220 Z"
                          fill="url(#datavis-dot-fill)"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Series 1 Stroke (Spot Blue) */}
                        <path
                          d="M 45 160 Q 104 120 163 150 T 281 70 T 340 100 T 400 45"
                          fill="none"
                          stroke="var(--primary-700)"
                          strokeWidth="2"
                        />

                        {/* Series 2 Stroke (Spot Red Dashed) */}
                        <path
                          d="M 45 190 Q 104 170 163 180 T 281 125 T 340 140 T 400 95"
                          fill="none"
                          stroke="var(--spectrum-red)"
                          strokeWidth="1.75"
                          strokeDasharray="4,3"
                        />

                        {/* Active Coordinate Crosshair Marker */}
                        <g transform="translate(281, 70)">
                          <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--gray-900)" strokeWidth="1" />
                          <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--gray-900)" strokeWidth="1" />
                          <circle cx="0" cy="0" r="3.5" fill="var(--spectrum-yellow)" stroke="var(--gray-900)" strokeWidth="1.25" />
                          {/* Value Flag */}
                          <rect x="10" y="-18" width="60" height="16" fill="var(--gray-900)" />
                          <text x="40" y="-6" textAnchor="middle" className="text-[9px] font-mono font-bold fill-white">
                            300.00 kPa
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-bold text-[var(--primary-700)]">
                        <span className="w-3 h-0.5 bg-[var(--primary-700)] inline-block" />
                        Primary Press Stream
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[var(--spectrum-red)]">
                        <span className="w-3 h-0.5 bg-[var(--spectrum-red)] inline-block border-b border-dashed" />
                        Baseline Anomaly
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)]">Intaglio Crosshatch + Halftone Screen</span>
                  </div>
                </div>

                {/* ─── Specimen 3: Density Tile Heat Map (Matrix Grid) ─── */}
                <div className="p-5 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/30">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--spectrum-aqua)] inline-block" />
                        3. Mechanical Density Tile Heat Map (Matrix Grid)
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--spectrum-aqua)] text-[var(--gray-900)] px-2 py-0.5 font-bold">
                        SPOT CHOROPLETH
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Quantized matrix cells leveraging physical spot ink saturation and mechanical frequency modulation (from 10% point tint to 100% solid press).
                    </p>

                    <div className="p-3 bg-[var(--white)] border border-[var(--border-gray)] overflow-x-auto">
                      <div className="min-w-[360px] font-mono text-xs">
                        {/* Days of week header */}
                        <div className="grid grid-cols-8 gap-1 mb-1.5 text-center text-[10px] font-bold text-[var(--text-muted)]">
                          <span>HRS</span>
                          <span>MON</span>
                          <span>TUE</span>
                          <span>WED</span>
                          <span>THU</span>
                          <span>FRI</span>
                          <span>SAT</span>
                          <span>SUN</span>
                        </div>

                        {/* 6 Time Blocks */}
                        {[
                          { time: "00-04", vals: [1, 1, 2, 1, 1, 2, 3] },
                          { time: "04-08", vals: [2, 3, 3, 4, 3, 2, 1] },
                          { time: "08-12", vals: [4, 5, 5, 5, 5, 4, 2] },
                          { time: "12-16", vals: [5, 5, 4, 5, 5, 5, 3] },
                          { time: "16-20", vals: [4, 4, 5, 4, 5, 4, 4] },
                          { time: "20-24", vals: [2, 3, 3, 3, 4, 4, 3] },
                        ].map((row, rIdx) => (
                          <div key={rIdx} className="grid grid-cols-8 gap-1 mb-1 items-center">
                            <span className="text-[9px] font-bold text-[var(--text-muted)] text-center">
                              {row.time}
                            </span>
                            {row.vals.map((v, cIdx) => {
                              // Map density level 1-5 to spot color tint
                              const styles = [
                                { bg: "bg-[var(--primary-100)]", text: "text-[var(--gray-700)]", label: "10%" },
                                { bg: "bg-[var(--spectrum-aqua)]/40", text: "text-[var(--gray-800)]", label: "30%" },
                                { bg: "bg-[var(--spectrum-aqua)]/80", text: "text-[var(--gray-900)]", label: "60%" },
                                { bg: "bg-[var(--primary-500)] text-white", text: "text-white", label: "80%" },
                                { bg: "bg-[var(--primary-700)] text-white font-black", text: "text-white", label: "100%" },
                              ][v - 1];
                              return (
                                <div
                                  key={cIdx}
                                  className={`h-7 flex items-center justify-center text-[10px] font-mono border border-black/10 transition-transform hover:scale-105 ${styles.bg}`}
                                  title={`Density Tier ${v} (${styles.label})`}
                                >
                                  {styles.label}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="text-[var(--text-muted)]">Density Key: 10% &rarr; 30% &rarr; 60% &rarr; 80% &rarr; 100% Solid</span>
                    <span className="font-bold text-[var(--primary-700)]">Zero Gradient Invariance</span>
                  </div>
                </div>

                {/* ─── Specimen 4: Overprint Bar Graph with Offset Bar Graph ─── */}
                <div className="p-5 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/30">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--spectrum-yellow)] inline-block" />
                        4. 2-Plate Overprint Bar Graph &amp; Offset Bars
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--spectrum-yellow)] text-[var(--gray-900)] px-2 py-0.5 font-bold">
                        OVERPRINT GREEN
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Budget Target (Spot Yellow) and Actual Realized (Spot Blue) overlap physically. The subtractive intersection forms vivid <strong>Optical Green</strong> via press multiplying.
                    </p>

                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)]">
                      <div className="space-y-4 font-mono text-xs">
                        {[
                          { label: "ADM1 Turkana Central", target: 82, actual: 68, offset: 4 },
                          { label: "ADM1 Garissa North", target: 60, actual: 75, offset: -3 },
                          { label: "ADM1 Wajir East", target: 90, actual: 88, offset: 2 },
                          { label: "ADM1 Marsabit Basin", target: 45, actual: 52, offset: -5 },
                        ].map((item, bIdx) => (
                          <div key={bIdx}>
                            <div className="flex justify-between text-[11px] mb-1 font-bold">
                              <span className="text-[var(--text)]">{item.label}</span>
                              <span className="text-[var(--text-muted)]">
                                Tgt: {item.target}% &bull; Act: {item.actual}%
                              </span>
                            </div>
                            <div className="h-8 bg-[var(--surface)] border border-[var(--border-gray)] relative overflow-hidden flex items-center">
                              {/* Background Scale Marks */}
                              <div className="absolute inset-0 flex justify-between pointer-events-none px-2">
                                <div className="w-px h-full bg-[var(--border-gray)]/40" />
                                <div className="w-px h-full bg-[var(--border-gray)]/40" />
                                <div className="w-px h-full bg-[var(--border-gray)]/40" />
                                <div className="w-px h-full bg-[var(--border-gray)]/40" />
                              </div>

                              {/* Plate 1: Target Allocation (Spot Yellow) */}
                              <div
                                className="absolute left-0 top-1 bottom-1 bg-[var(--spectrum-yellow)] border-r-2 border-[var(--spectrum-amber)]"
                                style={{ width: `${item.target}%` }}
                              />

                              {/* Plate 2: Actual Realized (Spot Blue with Multiply & Hairline Misregister) */}
                              <div
                                className="absolute top-2 bottom-2 bg-[var(--primary-500)] border-r-2 border-[var(--primary-700)] shadow-none"
                                style={{
                                  left: globalMisregistration ? `${item.offset}px` : "0px",
                                  width: `${item.actual}%`,
                                  mixBlendMode: "multiply",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[var(--spectrum-yellow)] inline-block" />
                        Target Allocation
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[var(--primary-500)] inline-block" />
                        Actual Realized
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[var(--spectrum-green)]">
                        <span className="w-2.5 h-2.5 bg-[var(--spectrum-green)] inline-block" />
                        Overlap (Optical Green)
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)]">Plate Offset Hairlines</span>
                  </div>
                </div>

                {/* ─── Specimen 5: Layered Cumulative Area Graph ─── */}
                <div className="p-5 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between lg:col-span-2">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-gray)]/30">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--spectrum-violet)] inline-block" />
                        5. Layered Cumulative Area Graph (Subtractive 3-Plate Stream)
                      </span>
                      <span className="font-mono text-[10px] bg-[var(--spectrum-violet)] text-white px-2 py-0.5 font-bold">
                        3-INK STREAM
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      Cumulative multi-band area chart featuring three spot inks (Aqua Seafoam, Amber Gold, Spot Violet) rendered with mechanical crosshatch, diagonal rule, and dot matrix pattern fills with physical multiply blending.
                    </p>

                    <div className="p-3 bg-[var(--white)] border border-[var(--border-gray)] relative">
                      <svg className="w-full h-[240px]" viewBox="0 0 800 240">
                        {/* Define Area Patterns */}
                        <defs>
                          <pattern id="area-hatch-aqua" width="8" height="8" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="8" y2="8" stroke="var(--spectrum-aqua)" strokeWidth="1.25" />
                          </pattern>
                          <pattern id="area-dots-amber" width="6" height="6" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="1.25" fill="var(--spectrum-amber)" />
                          </pattern>
                          <pattern id="area-cross-violet" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="var(--spectrum-violet)" strokeWidth="0.8" />
                          </pattern>
                        </defs>

                        {/* Grid Lines */}
                        {[40, 90, 140, 190].map((y, yIdx) => (
                          <line key={yIdx} x1="40" y1={y} x2="780" y2={y} stroke="var(--gray-200)" strokeWidth="0.75" />
                        ))}

                        {/* Band 1: Aqua Base Layer */}
                        <path
                          d="M 40 200 L 40 150 Q 180 130 320 160 T 580 110 T 780 130 L 780 200 Z"
                          fill="url(#area-hatch-aqua)"
                          stroke="var(--spectrum-aqua)"
                          strokeWidth="1.5"
                        />

                        {/* Band 2: Amber Middle Layer (Multiply) */}
                        <path
                          d="M 40 200 L 40 110 Q 200 80 360 120 T 600 70 T 780 90 L 780 200 Z"
                          fill="url(#area-dots-amber)"
                          stroke="var(--spectrum-amber)"
                          strokeWidth="1.5"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Band 3: Violet Top Layer (Multiply) */}
                        <path
                          d="M 40 200 L 40 70 Q 220 50 400 80 T 620 40 T 780 55 L 780 200 Z"
                          fill="url(#area-cross-violet)"
                          stroke="var(--spectrum-violet)"
                          strokeWidth="1.5"
                          style={{ mixBlendMode: "multiply" }}
                        />

                        {/* Baseline Rule */}
                        <line x1="40" y1="200" x2="780" y2="200" stroke="var(--gray-900)" strokeWidth="1.5" />

                        {/* X-Axis Ticks */}
                        {[40, 188, 336, 484, 632, 780].map((x, idx) => (
                          <g key={idx}>
                            <line x1={x} y1="200" x2={x} y2="206" stroke="var(--gray-900)" strokeWidth="1" />
                            <text x={x} y="220" textAnchor="middle" className="text-[9px] font-mono fill-[var(--text-muted)]">
                              Q{idx + 1} 2026
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 font-bold text-[var(--spectrum-aqua)]">
                        <span className="w-3 h-3 border border-[var(--spectrum-aqua)] inline-block" style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--spectrum-aqua) 0, var(--spectrum-aqua) 1px, transparent 0, transparent 4px)" }} />
                        Aqua Hydrology
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-[var(--spectrum-amber)]">
                        <span className="w-3 h-3 border border-[var(--spectrum-amber)] inline-block bg-[var(--spectrum-amber)]/30" />
                        Amber Agricultural
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-[var(--spectrum-violet)]">
                        <span className="w-3 h-3 border border-[var(--spectrum-violet)] inline-block" style={{ backgroundImage: "repeating-linear-gradient(0deg, var(--spectrum-violet) 0, var(--spectrum-violet) 1px, transparent 0, transparent 4px)" }} />
                        Violet Territorial
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)]">Subtractive Multi-Plate Screen Composite</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 5: INK EFFECTS & PRESS ARTIFACTS
            ========================================================= */}
        {activeTab === "effects" && (
          <div className="flex flex-col gap-8">
            {/* Header Telemetry Banner */}
            <div className="bg-[var(--white)] p-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border border-[var(--border-gray)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--primary-500)] uppercase">Press Physicality &amp; Plate Artifacts:</span>
                <span className="bg-[var(--surface)] px-2 py-0.5 border border-[var(--border-gray)]">
                  Ink Squash &bull; Multiply Layering &bull; 2-Ink Knockout Misregistration
                </span>
              </div>
              <span className="text-[var(--text-muted)]">
                Emulating the tactile physics of heavy relief plates, deep perimeter ink meniscus, and two-plate overprint registration.
              </span>
            </div>

            {/* ─── QUICK-REFERENCE: UTILITY CLASSES & DESIGN TOKENS ─── */}
            <section className="bg-[var(--surface)] p-5 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/30 pb-2 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--primary-500)]" />
                  <h3 className="text-sm font-bold tracking-tight m-0 text-[var(--text)] uppercase font-mono">
                    Ink Effects Utility Classes &amp; CSS Tokens (Ready to Apply)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">CLICK ANY TOKEN OR CLASS TO COPY</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {/* Token 1 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-squash");
                    setCopiedToken(".ink-squash");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--primary-500)]">.ink-squash</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Soft 8px–16px feathered inward relief squeeze without hard edge.
                  </span>
                </div>

                {/* Token 2 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-squash-deep");
                    setCopiedToken(".ink-squash-deep");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--primary-500)]">.ink-squash-deep</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Soft 12px–24px feathered inward compression with luminous core.
                  </span>
                </div>

                {/* Token 3 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-squash-text");
                    setCopiedToken(".ink-squash-text");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--primary-500)]">.ink-squash-text</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Soft letterform ink meniscus shadow without hard stroke.
                  </span>
                </div>

                {/* Token 4 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-multiply");
                    setCopiedToken(".ink-multiply");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--primary-500)]">.ink-multiply</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    mix-blend-mode: multiply for subtractive press layering.
                  </span>
                </div>

                {/* Token 5 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-misregister-shift");
                    setCopiedToken(".ink-misregister-shift");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--primary-500)]">.ink-misregister-shift</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Overprint plate offset via var(--misregister-x/y).
                  </span>
                </div>

                {/* Token 6 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText("var(--ink-squash-shadow)");
                    setCopiedToken("var(--ink-squash-shadow)");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text)]">--ink-squash-shadow</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Feathered multi-stop soft inward box shadow token.
                  </span>
                </div>

                {/* Token 7 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText("var(--misregister-x)");
                    setCopiedToken("var(--misregister-x)");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text)]">--misregister-x / y</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    CSS mechanical plate shift coordinate variables.
                  </span>
                </div>

                {/* Token 8 */}
                <div
                  onClick={() => {
                    navigator.clipboard?.writeText(".ink-squash-subtle");
                    setCopiedToken(".ink-squash-subtle");
                    setTimeout(() => setCopiedToken(null), 2000);
                  }}
                  className="p-3 bg-[var(--white)] border border-[var(--border-gray)] cursor-pointer hover:border-[var(--primary-500)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text)]">.ink-squash-subtle</span>
                    <Copy size={11} className="text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">
                    Delicate 5px–10px soft kiss impression for card interfaces.
                  </span>
                </div>
              </div>
            </section>

            {/* ─── SECTION 1: INK SQUASH (SATURATED INK MENISCUS) ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono">
                    1. Ink Squash (Hyper-Saturated Pigment Meniscus)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-3xl">
                    When platen relief plates compress ink onto paper, viscous ink squashes toward the perimeter. Rather than muddying toward black, the concentrated ink film concentrates into a <strong>pure, hyper-saturated chromatic hue of that exact ink</strong> (e.g. Cobalt Blue into intense Ultramarine, Carmine Red into vivid Crimson, Cadmium Orange into deep radiant Amber) with <strong>soft feathered edges and zero hard vector lines</strong>.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">SATURATED PIGMENT SQUEEZE</span>
              </div>

              {/* Saturated Meniscus Calibration HUD */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[var(--surface-muted)] p-4 border border-[var(--border-gray)]/30">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="font-bold text-[var(--text)] uppercase">Platen Squeeze Depth:</span>
                  <span className="text-[var(--primary-500)] font-bold bg-[var(--white)] px-2 py-0.5 border border-[var(--border-gray)]">
                    5px–10px Subtle Saturated Meniscus (Kiss Impression)
                  </span>
                  <button
                    onClick={() => setInkSquashEnabled(!inkSquashEnabled)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold border transition-colors ${
                      inkSquashEnabled
                        ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                        : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border-gray)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Droplet size={12} />
                    <span>Global Ink Squash: {inkSquashEnabled ? "ON" : "OFF"}</span>
                  </button>
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)]">
                  PHYSICAL PRESS PROFILE: FEATHERED SATURATED EDGE &bull; ZERO HARSH VECTOR STROKES
                </div>
              </div>

              {/* 1A: Large Ink Squash Relief Plates with Saturated Meniscus */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
                    A. Spot Ink Solid Field Plates (Pigment Meniscus Concentrates into Saturated Hue, Not Black):
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    PRESS STOCK: 100# UNCOATED STONE &bull; INSET DEPTH: 5PX–10PX
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "SPOT BLUE",
                      hex: "#6EA3BE",
                      rimHex: "#356A85",
                      token: "var(--primary-500)",
                      viscosity: "Standard Press",
                      desc: "Mineral blue press ink; concentrates into saturated slate-blue (#356A85)",
                    },
                    {
                      name: "SPOT RED",
                      hex: "#E65E59",
                      rimHex: "#B8120B",
                      token: "var(--spectrum-red)",
                      viscosity: "High Viscosity",
                      desc: "Carmine lake red; concentrates into intense saturated crimson (#B8120B)",
                    },
                    {
                      name: "SPOT GREEN",
                      hex: "#74BE60",
                      rimHex: "#1E750A",
                      token: "var(--spectrum-green)",
                      viscosity: "Standard Press",
                      desc: "Chrome oxide green; concentrates into saturated emerald viridian (#1E750A)",
                    },
                    {
                      name: "SPOT ORANGE",
                      hex: "#ED9235",
                      rimHex: "#B84800",
                      token: "var(--spectrum-orange)",
                      viscosity: "Medium Viscosity",
                      desc: "Cadmium orange; concentrates into deep radiant amber-orange (#B84800)",
                    },
                    {
                      name: "AMBER GOLD",
                      hex: "#EDBC2F",
                      rimHex: "#A87000",
                      token: "var(--spectrum-amber)",
                      viscosity: "Dense Opaque",
                      desc: "Ochre earth amber; concentrates into rich golden ochre (#A87000)",
                    },
                    {
                      name: "INK BLACK",
                      hex: "#1C1917",
                      rimHex: "#000000",
                      token: "var(--gray-900)",
                      viscosity: "Dense Carbon",
                      desc: "Lamp black intaglio; deep velvet carbon meniscus (#000000)",
                    },
                  ].map((chip) => {
                    const shadowStyle = `inset 0 0 6px ${chip.rimHex}88, inset 0 0 12px ${chip.rimHex}33`;

                    return (
                      <div
                        key={chip.name}
                        className="bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between"
                        style={{ borderRadius: 0 }}
                      >
                        {/* Large Plate Specimen Area */}
                        <div className="p-4 bg-[var(--surface)]">
                          <div
                            className="h-48 w-full relative transition-all duration-200 flex flex-col justify-between p-4 overflow-hidden select-none"
                            style={{
                              backgroundColor: chip.hex,
                              boxShadow: shadowStyle,
                              color: chip.name === "INK BLACK" || chip.name === "SPOT RED" ? "#FFFFFF" : "#1C1917",
                            }}
                          >
                            {/* Inner Stamp Header */}
                            <div className="flex items-center justify-between font-mono text-[10px] tracking-wider uppercase opacity-90">
                              <span className="font-bold">PLATE REF: {chip.name}</span>
                              <span className="bg-black/40 text-white px-2 py-0.5 backdrop-blur-xs font-bold">
                                SUBTLE INK MENISCUS
                              </span>
                            </div>

                            {/* Center Physical Metric Readout */}
                            <div className="text-center my-auto">
                              <div className="text-3xl font-mono font-extrabold uppercase tracking-tight">
                                {chip.name}
                              </div>
                              <div className="text-xs font-mono opacity-80 mt-1">
                                {chip.hex} &bull; {chip.viscosity}
                              </div>
                            </div>

                            {/* Bottom Edge Annotation */}
                            <div className="flex items-center justify-between font-mono text-[9px] uppercase opacity-80 border-t border-current/20 pt-1.5">
                              <span>SATURATED RIM: {chip.rimHex}</span>
                              <span>INWARD FALLOFF: 5px–10px (Subtle)</span>
                            </div>
                          </div>
                        </div>

                        {/* Technical Meta Footer */}
                        <div className="p-3.5 bg-[var(--white)] border-t border-[var(--border-gray)]/30 font-mono text-xs">
                          <div className="flex items-center justify-between font-bold text-[var(--text)]">
                            <span>{chip.name}</span>
                            <span className="text-[11px] text-[var(--primary-500)]">{chip.token}</span>
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                            {chip.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 1B: Large Typographic Relief Specimen & Comparison */}
              <div className="p-6 bg-[var(--surface)] border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
                <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-[var(--border-gray)]/30 font-mono text-xs gap-2">
                  <span className="font-bold text-[var(--text)] uppercase tracking-tight">
                    B. Large Typographic Relief Impression Comparison:
                  </span>
                  <span className="text-[var(--text-muted)]">
                    SCALE: 72PT DISPLAY GLYPHS &bull; METAL RELIEF PROOF
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Standard Digital Flat Vector */}
                  <div className="p-6 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase block mb-3">
                        1. Standard Digital Flat Vector (No Ink Displacement):
                      </span>
                      <div className="text-6xl sm:text-7xl font-black font-sans text-[var(--gray-900)] leading-none select-none tracking-tighter">
                        PRINTED
                      </div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[var(--gray-900)] leading-none select-none tracking-tight">
                        MATTER 1954
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[var(--border-gray)]/20 font-mono text-xs text-[var(--text-muted)] leading-snug">
                      <strong className="text-[var(--text)] block uppercase mb-0.5">Uniform Digital Density:</strong>
                      Pixel-exact sharp vector boundary without physical ink viscosity or paper tooth absorption.
                    </div>
                  </div>

                  {/* Right: Letterpress Ink Squash Simulation */}
                  <div className="p-6 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[var(--primary-500)] uppercase block mb-3">
                        2. Letterpress Relief Squash (Soft Feathered Meniscus):
                      </span>
                      <div
                        className="text-6xl sm:text-7xl font-black font-sans text-[var(--gray-900)] leading-none select-none tracking-tighter transition-all duration-200"
                        style={{
                          textShadow: "0 0 1.5px rgba(0,0,0,0.4), 0 0 3px rgba(0,0,0,0.15)",
                        }}
                      >
                        PRINTED
                      </div>
                      <div
                        className="text-4xl sm:text-5xl font-mono font-bold text-[var(--gray-900)] leading-none select-none tracking-tight transition-all duration-200"
                        style={{
                          textShadow: "0 0 1.5px rgba(0,0,0,0.4), 0 0 3px rgba(0,0,0,0.15)",
                        }}
                      >
                        MATTER 1954
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[var(--border-gray)]/20 font-mono text-xs text-[var(--text-muted)] leading-snug">
                      <strong className="text-[var(--primary-500)] block uppercase mb-0.5">Soft Feathered Halo:</strong>
                      Soft feathered ink edge absorption emulates the physical liquid meniscus without artificial vector stroke lines.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 2: INK OVERLAYS WITH MULTIPLY BLENDING ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono">
                    2. Layered Ink Overlays (Multiply Blending)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-3xl">
                    Transparent press inks absorb paper reflection via subtractive color synthesis. Overlapping spot inks and screened halftones create secondary optical mixtures and physical moiré matrices directly on unbleached press stock using <code className="font-mono text-[var(--text)] bg-[var(--surface-muted)] px-1 py-0.5 border border-[var(--border-gray)]/30">mix-blend-mode: multiply</code>.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">SUBTRACTIVE PRESS PROOFS</span>
              </div>

              {/* 2A: Large Offset Square Overlays */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
                    A. Two-Ink Offset Squares &amp; Subtractive Triad Proofs:
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    PRESS STOCK: UNBLEACHED PAPER (VAR(--SURFACE))
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Pair 1: Blue + Yellow = Emerald Green */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="relative h-52 w-full flex items-center justify-center bg-[var(--white)] border border-[var(--border-gray)]/40 overflow-hidden">
                      {/* Square 1: Spot Blue */}
                      <div
                        className="w-32 h-32 bg-[var(--primary-500)] absolute -translate-x-6 -translate-y-4 mix-blend-multiply flex items-start justify-start p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                          BLUE PLATE
                        </span>
                      </div>
                      {/* Square 2: Spot Yellow */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-yellow)] absolute translate-x-6 translate-y-4 mix-blend-multiply flex items-end justify-end p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-[var(--gray-900)] uppercase tracking-wider">
                          YELLOW PLATE
                        </span>
                      </div>
                      {/* Center intersection label callout */}
                      <div className="absolute z-10 pointer-events-none px-2 py-0.5 bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                        MULTIPLY: FOREST (#2B6833)
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20 font-mono">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text)] uppercase">
                        <span>Spot Blue &times; Spot Yellow</span>
                        <span className="w-3 h-3 bg-[#2B6833] border border-black/30 inline-block" />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                        Subtractive synthesis yielding deep pine forest emerald.
                      </div>
                    </div>
                  </div>

                  {/* Pair 2: Red + Blue = Royal Intaglio Violet */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="relative h-52 w-full flex items-center justify-center bg-[var(--white)] border border-[var(--border-gray)]/40 overflow-hidden">
                      {/* Square 1: Spot Red */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-red)] absolute -translate-x-6 -translate-y-4 mix-blend-multiply flex items-start justify-start p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                          RED PLATE
                        </span>
                      </div>
                      {/* Square 2: Spot Blue */}
                      <div
                        className="w-32 h-32 bg-[var(--primary-500)] absolute translate-x-6 translate-y-4 mix-blend-multiply flex items-end justify-end p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                          BLUE PLATE
                        </span>
                      </div>
                      <div className="absolute z-10 pointer-events-none px-2 py-0.5 bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                        MULTIPLY: VIOLET (#3D2B60)
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20 font-mono">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text)] uppercase">
                        <span>Spot Red &times; Spot Blue</span>
                        <span className="w-3 h-3 bg-[#3D2B60] border border-black/30 inline-block" />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                        Dense two-plate overlap generating royal intaglio violet.
                      </div>
                    </div>
                  </div>

                  {/* Pair 3: Red + Yellow = Warm Vermilion */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="relative h-52 w-full flex items-center justify-center bg-[var(--white)] border border-[var(--border-gray)]/40 overflow-hidden">
                      {/* Square 1: Spot Red */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-red)] absolute -translate-x-6 -translate-y-4 mix-blend-multiply flex items-start justify-start p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                          RED PLATE
                        </span>
                      </div>
                      {/* Square 2: Spot Yellow */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-yellow)] absolute translate-x-6 translate-y-4 mix-blend-multiply flex items-end justify-end p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-[var(--gray-900)] uppercase tracking-wider">
                          YELLOW PLATE
                        </span>
                      </div>
                      <div className="absolute z-10 pointer-events-none px-2 py-0.5 bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                        MULTIPLY: VERMILION (#C84518)
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20 font-mono">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text)] uppercase">
                        <span>Spot Red &times; Spot Yellow</span>
                        <span className="w-3 h-3 bg-[#C84518] border border-black/30 inline-block" />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                        Warm dual-spot intersection producing radiant vermilion.
                      </div>
                    </div>
                  </div>

                  {/* Pair 4: Aqua + Amber = Patina Verdigris */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="relative h-52 w-full flex items-center justify-center bg-[var(--white)] border border-[var(--border-gray)]/40 overflow-hidden">
                      {/* Square 1: Spot Aqua */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-aqua)] absolute -translate-x-6 -translate-y-4 mix-blend-multiply flex items-start justify-start p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                          AQUA PLATE
                        </span>
                      </div>
                      {/* Square 2: Spot Amber */}
                      <div
                        className="w-32 h-32 bg-[var(--spectrum-amber)] absolute translate-x-6 translate-y-4 mix-blend-multiply flex items-end justify-end p-2"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-[var(--gray-900)] uppercase tracking-wider">
                          AMBER PLATE
                        </span>
                      </div>
                      <div className="absolute z-10 pointer-events-none px-2 py-0.5 bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                        MULTIPLY: PATINA (#237A6A)
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-gray)]/20 font-mono">
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text)] uppercase">
                        <span>Spot Aqua &times; Spot Amber</span>
                        <span className="w-3 h-3 bg-[#237A6A] border border-black/30 inline-block" />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                        Mineral geological wash creating verdigris patina.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Centerpiece: 3-Plate Subtractive Triad Specimen */}
                <div className="mt-6 p-6 bg-[var(--surface)] border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
                  <div className="flex flex-col lg:flex-row gap-6 items-center">
                    <div className="relative h-64 w-full lg:w-96 flex items-center justify-center bg-[var(--white)] border border-[var(--border-gray)] shrink-0 overflow-hidden">
                      {/* Square 1: Blue (Top-Left) */}
                      <div
                        className="w-40 h-40 bg-[var(--primary-500)] absolute -translate-x-10 -translate-y-8 mix-blend-multiply flex items-start justify-start p-2.5"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase">
                          BLUE PLATE
                        </span>
                      </div>
                      {/* Square 2: Red (Top-Right) */}
                      <div
                        className="w-40 h-40 bg-[var(--spectrum-red)] absolute translate-x-10 -translate-y-8 mix-blend-multiply flex items-start justify-end p-2.5"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-white uppercase">
                          RED PLATE
                        </span>
                      </div>
                      {/* Square 3: Yellow (Bottom-Center) */}
                      <div
                        className="w-40 h-40 bg-[var(--spectrum-yellow)] absolute translate-y-10 mix-blend-multiply flex items-end justify-center p-2.5"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="font-mono text-[10px] font-bold text-[var(--gray-900)] uppercase">
                          YELLOW PLATE
                        </span>
                      </div>
                      {/* 3-Plate Core Overlay Label */}
                      <div className="absolute z-10 pointer-events-none px-2.5 py-1 bg-black/80 text-white font-mono text-[10px] uppercase font-bold tracking-widest border border-white/20">
                        3-INK CORE (#191410)
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 font-mono">
                      <div className="flex items-center justify-between border-b border-[var(--border-gray)]/30 pb-2">
                        <span className="text-sm font-bold text-[var(--text)] uppercase tracking-tight">
                          Three-Plate Subtractive Triad (7 Distinct Hue Zones)
                        </span>
                        <span className="text-xs text-[var(--primary-500)] font-bold">C-M-Y EQUIVALENT</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        When three pure spot color ink films overlap sequentially on unbleached press paper, they formulate 7 discrete chromatic interactions: 3 pure single-ink plates (Cyan Blue, Carmine Red, Cadmium Yellow), 3 two-ink binary intersections (Emerald Green, Royal Violet, Vermilion Orange), and 1 dense three-ink tertiary core simulating rich neutral key black.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                        <div className="p-1.5 bg-[var(--white)] border border-[var(--border-gray)]">
                          <span className="block font-bold text-[var(--primary-500)]">BLUE + RED</span>
                          <span className="text-[var(--text-muted)]">= Violet (#3D2B60)</span>
                        </div>
                        <div className="p-1.5 bg-[var(--white)] border border-[var(--border-gray)]">
                          <span className="block font-bold text-[var(--spectrum-green)]">BLUE + YELLOW</span>
                          <span className="text-[var(--text-muted)]">= Green (#2B6833)</span>
                        </div>
                        <div className="p-1.5 bg-[var(--white)] border border-[var(--border-gray)]">
                          <span className="block font-bold text-[var(--spectrum-orange)]">RED + YELLOW</span>
                          <span className="text-[var(--text-muted)]">= Vermilion (#C84518)</span>
                        </div>
                        <div className="p-1.5 bg-[var(--white)] border border-[var(--gray-900)]">
                          <span className="block font-bold text-[var(--gray-900)]">BLUE+RED+YEL</span>
                          <span className="text-[var(--text-muted)]">= Core (#191410)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2B: Screen & Pattern Multiplied Overlays */}
              <div className="pt-6 border-t border-[var(--border-gray)]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)] block uppercase">
                    B. Multiplied Cartographic Pattern Overlays (8 Intaglio Screen Layering Combinations):
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    PHYSICAL LITHOGRAPHIC MOIRÉ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Pattern 1: Dual-Screen Crosshatch */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-hatch-15-lg" width="8" height="8" patternTransform="rotate(15 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--primary-500)" strokeWidth="1.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-hatch-15-lg)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-hatch-75-lg" width="8" height="8" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--spectrum-red)" strokeWidth="1.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-hatch-75-lg)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        1. Dual-Angle Crosshatch
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        15° Blue Screen &times; 75° Red Screen yielding orthogonal 60° node intersections.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 2: 3-Color Halftone Rosette Matrix */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      {/* Yellow Plate (0° Angle) */}
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-dots-yellow-lg" width="12" height="12" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="6" cy="6" r="3.2" fill="var(--spectrum-yellow)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-dots-yellow-lg)" />
                      </svg>
                      {/* Blue Plate (15° Angle) */}
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-dots-blue-lg" width="12" height="12" patternTransform="rotate(15 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="6" cy="6" r="2.2" fill="var(--primary-500)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-dots-blue-lg)" />
                      </svg>
                      {/* Red Plate (75° Angle) */}
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-dots-red-lg" width="12" height="12" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="6" cy="6" r="2.0" fill="var(--spectrum-red)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-dots-red-lg)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        2. 3-Color Rosette Matrix
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        0° Yellow &times; 15° Blue &times; 75° Red screens forming authentic litho rosette structure.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 3: Multi-Color Litho Stipple */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-stipple-amber" width="12" height="12" patternTransform="rotate(15 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="3" r="1.0" fill="var(--spectrum-amber)" />
                          <circle cx="8" cy="2" r="1.4" fill="var(--spectrum-amber)" />
                          <circle cx="5" cy="8" r="0.9" fill="var(--spectrum-amber)" />
                          <circle cx="10" cy="10" r="1.3" fill="var(--spectrum-amber)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-stipple-amber)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-stipple-aqua" width="12" height="12" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="3" cy="7" r="1.1" fill="var(--spectrum-aqua)" />
                          <circle cx="9" cy="4" r="0.9" fill="var(--spectrum-aqua)" />
                          <circle cx="6" cy="11" r="1.3" fill="var(--spectrum-aqua)" />
                          <circle cx="11" cy="2" r="0.8" fill="var(--spectrum-aqua)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-stipple-aqua)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        3. Litho Stipple Scatter
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        15° Amber &times; 75° Aqua rotated litho stipple scatter creating sandstone texture.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 4: Topo Line & Elevation Point Grid */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-topo-line" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="10" stroke="var(--primary-500)" strokeWidth="1.2" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-topo-line)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-elevation-dot" width="10" height="10" patternTransform="rotate(15 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="5" cy="5" r="1.8" fill="var(--spectrum-green)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-elevation-dot)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        4. Topo Line &amp; Point Grid
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        45° Blue Contour lines &times; 15° Green elevation sampling point matrix.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 5: Terrain Slope Density Screen */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-slope-red" width="6" height="6" patternTransform="rotate(135 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--spectrum-red)" strokeWidth="1.6" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-slope-red)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-stipple-violet" width="8" height="8" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.0" fill="var(--spectrum-violet)" />
                          <circle cx="6" cy="6" r="1.2" fill="var(--spectrum-violet)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-stipple-violet)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        5. Slope Relief Density
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        135° Red heavy slope hatch &times; 75° Violet stipple screen for escarpment shading.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 6: Dual-Frequency Halftone */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-coarse-yellow" width="16" height="16" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="8" cy="8" r="4.0" fill="var(--spectrum-yellow)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-coarse-yellow)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-fine-aqua" width="6" height="6" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <circle cx="3" cy="3" r="1.5" fill="var(--spectrum-aqua)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-fine-aqua)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        6. Dual-Frequency Halftone
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        0° Coarse Yellow screen &times; 75° Fine Aqua screen with pitch and angular modulation.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 7: Cross-Screen Intaglio Mesh */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-mesh-green" width="6" height="6" patternTransform="rotate(30 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--spectrum-green)" strokeWidth="1.0" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-mesh-green)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-mesh-orange" width="6" height="6" patternTransform="rotate(120 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--spectrum-orange)" strokeWidth="1.0" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-mesh-orange)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        7. Cross-Screen Mesh
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        30° Green &times; 120° Orange fine-gauge intaglio mesh producing warm olive field.
                      </span>
                    </div>
                  </div>

                  {/* Pattern 8: 3-Plate Screen on Tone Ground */}
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border-gray)] flex flex-col justify-between" style={{ borderRadius: 0 }}>
                    <div className="h-40 w-full bg-[var(--white)] border border-[var(--border-gray)] relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[var(--spectrum-yellow)] opacity-40" />
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-keyplate-red" width="8" height="8" patternTransform="rotate(75 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--spectrum-red)" strokeWidth="0.9" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-keyplate-red)" />
                      </svg>
                      <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                        <pattern id="ov-keyplate-black" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--gray-900)" strokeWidth="1.2" />
                          <line x1="0" y1="0" x2="8" y2="0" stroke="var(--gray-900)" strokeWidth="1.2" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#ov-keyplate-black)" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block">
                        8. 3-Plate Screen Overprint
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block mt-1 leading-snug">
                        0° Yellow tint &times; 75° Red screen &times; 45° Black Intaglio Keyplate.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 3: TWO-INK MECHANICAL MISREGISTRATION & KNOCKOUT TYPE ─── */}
            <section className="bg-[var(--white)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-gray)]/20 pb-3 mb-6 gap-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight m-0 text-[var(--primary-500)] uppercase font-mono">
                    3. Two-Ink Mechanical Misregistration &amp; Knockout Type
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-3xl">
                    In multi-plate printing, when type is <strong>knocked out of two overlaid transparent inks</strong>, mechanical cylinder shift exposes a <strong>pure Plate 1 color fringe on one edge</strong> and a <strong>pure Plate 2 color fringe on the opposite edge</strong>, while the center preserves the warm paper ground and the surrounding field multiplies.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">2-COLOR OVERPRINT &amp; KNOCKOUT</span>
              </div>

              {/* ─── GLOBAL MULTI-PLATE CHROMATIC MISREGISTRATION HUD ─── */}
              <div className="mb-6 bg-[var(--surface-muted)] p-5 border border-[var(--primary-500)]/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-gray)]/30 pb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGlobalMisregistration(!globalMisregistration)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold border transition-colors ${
                        globalMisregistration
                          ? "bg-[var(--primary-500)] text-white border-[var(--primary-600)]"
                          : "bg-[var(--white)] text-[var(--text)] border-[var(--border-gray)] hover:bg-[var(--surface)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <Layers size={13} className={globalMisregistration ? "text-[var(--spectrum-yellow)]" : "text-[var(--primary-500)]"} />
                      <span>Global Misregistration: {globalMisregistration ? "ACTIVE (ON)" : "DISABLED (OFF)"}</span>
                    </button>
                    <button
                      onClick={randomizePlates}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--surface)] text-xs font-mono font-bold transition-colors"
                      style={{ borderRadius: 0 }}
                      title="Randomize each ink plate's micro-hairline angle and offset vector"
                    >
                      <RefreshCw size={12} className="text-[var(--primary-500)]" />
                      <span>Randomize Plate Jitter</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-[var(--text-muted)]">Plate Jitter Intensity:</span>
                    <strong className="text-[var(--primary-500)] font-bold">{misregisterIntensity.toFixed(2)}&times;</strong>
                    <input
                      type="range"
                      min="0.20"
                      max="3.00"
                      step="0.05"
                      value={misregisterIntensity}
                      onChange={(e) => setMisregisterIntensity(parseFloat(e.target.value))}
                      className="w-28 accent-[var(--primary-500)]"
                    />
                  </div>
                </div>

                {/* 7-Plate Vector Readout Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-[10px]">
                  {[
                    { id: "blue", name: "Primary Blue", color: "var(--primary-500)" },
                    { id: "red", name: "Spot Red", color: "var(--spectrum-red)" },
                    { id: "yellow", name: "Spot Yellow", color: "var(--spectrum-yellow)" },
                    { id: "green", name: "Emerald Green", color: "var(--spectrum-green)" },
                    { id: "purple", name: "Violet", color: "var(--spectrum-purple)" },
                    { id: "aqua", name: "Hydro Aqua", color: "var(--spectrum-aqua)" },
                    { id: "orange", name: "Amber Orange", color: "var(--spectrum-orange)" },
                  ].map((p) => {
                    const off = plateOffsets[p.id] || { x: 0, y: 0 };
                    const curX = (off.x * misregisterIntensity).toFixed(2);
                    const curY = (off.y * misregisterIntensity).toFixed(2);
                    return (
                      <div key={p.id} className="p-2 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: p.color }} />
                          <span className="font-bold truncate text-[var(--text)]">{p.name}</span>
                        </div>
                        <div className="text-[9px] text-[var(--text-muted)] flex justify-between">
                          <span>dx: <strong className="text-[var(--text)]">{curX > "0" ? `+${curX}` : curX}px</strong></span>
                          <span>dy: <strong className="text-[var(--text)]">{curY > "0" ? `+${curY}` : curY}px</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Misregistration Offset Controls */}
              <div className="mb-6 bg-[var(--surface-muted)] p-5 border border-[var(--border-gray)]/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[var(--text)] uppercase">
                      Plate Shift Coordinates:
                    </span>
                    <span className="font-mono text-xs text-[var(--primary-500)] font-bold bg-[var(--white)] px-2 py-0.5 border border-[var(--border-gray)]">
                      dx = {misregisterX > 0 ? `+${misregisterX}` : misregisterX}px &nbsp;|&nbsp; dy = {misregisterY > 0 ? `+${misregisterY}` : misregisterY}px
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    PLATE 1 (BASE: 0,0) &times; PLATE 2 (OFFSET: DX, DY)
                  </span>
                </div>

                {/* Range Sliders for Precision Plate Adjustment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[var(--text)]">
                      <span>Horizontal Shift (dx):</span>
                      <strong className="text-[var(--primary-500)]">{misregisterX}px</strong>
                    </div>
                    <input
                      type="range"
                      min="-8"
                      max="8"
                      step="0.5"
                      value={misregisterX}
                      onChange={(e) => setMisregisterX(parseFloat(e.target.value))}
                      className="w-full accent-[var(--primary-500)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[var(--text)]">
                      <span>Vertical Shift (dy):</span>
                      <strong className="text-[var(--primary-500)]">{misregisterY}px</strong>
                    </div>
                    <input
                      type="range"
                      min="-8"
                      max="8"
                      step="0.5"
                      value={misregisterY}
                      onChange={(e) => setMisregisterY(parseFloat(e.target.value))}
                      className="w-full accent-[var(--primary-500)]"
                    />
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-[var(--border-gray)]/20">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase mr-1">Calibration Presets:</span>
                  {[
                    { label: "0.0px (Perfect Parity)", x: 0, y: 0 },
                    { label: "1.5px (Hairline Vintage Shift)", x: 1.5, y: 1.0 },
                    { label: "3.0px (Rotary Web Press)", x: 3.0, y: 2.0 },
                    { label: "5.5px (Loose Newsprint Drift)", x: 5.5, y: 3.5 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => { setMisregisterX(p.x); setMisregisterY(p.y); }}
                      className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                        misregisterX === p.x && misregisterY === p.y
                          ? "bg-[var(--primary-500)] text-white border border-[var(--primary-500)]"
                          : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--surface)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Two-Ink Plate Knockout Pair Selector */}
                <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-[var(--border-gray)]/20">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase mr-1">Two-Ink Overprint Build:</span>
                  {[
                    {
                      id: "red-blue",
                      name: "SPOT RED × SPOT BLUE",
                      plate1: "var(--spectrum-red)",
                      plate2: "var(--primary-500)",
                      p1Hex: "#E65E59",
                      p2Hex: "#6EA3BE",
                      resultName: "Royal Violet Field",
                    },
                    {
                      id: "blue-yellow",
                      name: "SPOT BLUE × SPOT YELLOW",
                      plate1: "var(--primary-500)",
                      plate2: "var(--spectrum-yellow)",
                      p1Hex: "#6EA3BE",
                      p2Hex: "#EDD528",
                      resultName: "Forest Green Field",
                    },
                    {
                      id: "red-yellow",
                      name: "SPOT RED × SPOT YELLOW",
                      plate1: "var(--spectrum-red)",
                      plate2: "var(--spectrum-yellow)",
                      p1Hex: "#E65E59",
                      p2Hex: "#EDD528",
                      resultName: "Vermilion Field",
                    },
                    {
                      id: "aqua-black",
                      name: "SPOT AQUA × INK BLACK",
                      plate1: "var(--spectrum-aqua)",
                      plate2: "var(--gray-900)",
                      p1Hex: "#71B197",
                      p2Hex: "#1C1917",
                      resultName: "Deep Slate Field",
                    },
                  ].map((pair) => (
                    <button
                      key={pair.id}
                      onClick={() => setKnockoutPair(pair.id as any)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold transition-colors ${
                        knockoutPair === pair.id
                          ? "bg-[var(--gray-900)] text-white border border-[var(--primary-500)]"
                          : "bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] hover:bg-[var(--surface)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <span className="flex items-center -space-x-1">
                        <span className="w-2.5 h-2.5 inline-block border border-black/30" style={{ backgroundColor: pair.p1Hex }} />
                        <span className="w-2.5 h-2.5 inline-block border border-black/30" style={{ backgroundColor: pair.p2Hex }} />
                      </span>
                      <span>{pair.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Misregistration Specimens */}
              <div className="space-y-8">
                {/* ─── SPECIMEN 1: TYPE KNOCKED OUT OF 2 OVERLAYED INKS IN MISREGISTRATION ─── */}
                <div className="p-6 bg-[var(--surface)] border-2 border-[var(--primary-500)]" style={{ borderRadius: 0 }}>
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-gray)]/30 font-mono text-xs gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[var(--primary-500)] text-white px-2 py-0.5 font-bold uppercase">HERO PROOF</span>
                      <span className="font-bold text-[var(--text)] uppercase tracking-tight">
                        Specimen 1: Display Type Knocked Out of Two Overlaid Inks
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)]">
                      OUTER PLATE EDGES &amp; INNER KNOCKOUTS SHOW DUAL-COLOR MISREGISTRATION FRINGES
                    </span>
                  </div>

                  {(() => {
                    const currentPair =
                      knockoutPair === "red-blue"
                        ? { p1: "var(--spectrum-red)", p2: "var(--primary-500)", p1Name: "Spot Red", p2Name: "Spot Blue", p1Hex: "#E65E59", p2Hex: "#6EA3BE" }
                        : knockoutPair === "blue-yellow"
                        ? { p1: "var(--primary-500)", p2: "var(--spectrum-yellow)", p1Name: "Spot Blue", p2Name: "Spot Yellow", p1Hex: "#6EA3BE", p2Hex: "#EDD528" }
                        : knockoutPair === "red-yellow"
                        ? { p1: "var(--spectrum-red)", p2: "var(--spectrum-yellow)", p1Name: "Spot Red", p2Name: "Spot Yellow", p1Hex: "#E65E59", p2Hex: "#EDD528" }
                        : { p1: "var(--spectrum-aqua)", p2: "var(--gray-900)", p1Name: "Spot Aqua", p2Name: "Ink Black", p1Hex: "#71B197", p2Hex: "#1C1917" };

                    return (
                      <div className="space-y-4">
                        {/* Large 2-Ink Knockout Display Canvas */}
                        <div className="relative p-6 sm:p-10 bg-[var(--surface)] border border-[var(--border-gray)] overflow-hidden select-none min-h-[340px] flex items-center justify-center">
                          {/* SVG Multi-Layered Masked Knockout Engine with Perimeter Plate Shift */}
                          <svg className="w-full h-72 sm:h-80" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              {/* Plate 1 Knockout Mask (Base Plate Inset: x=30, y=20, w=740, h=240) */}
                              <mask id="ko-mask-plate1">
                                <rect x="30" y="20" width="740" height="240" fill="white" />
                                <text x="400" y="110" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="76" letterSpacing="-2px" fill="black">
                                  PRINTED
                                </text>
                                <text x="400" y="195" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="42" letterSpacing="4px" fill="black">
                                  MATTER 1954
                                </text>
                                <text x="400" y="240" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="16" letterSpacing="6px" fill="black">
                                  // TECHNICAL CARTOGRAPHY
                                </text>
                              </mask>

                              {/* Plate 2 Knockout Mask (Identical Inset Geometry in Plate 2 Local Space) */}
                              <mask id="ko-mask-plate2">
                                <rect x="30" y="20" width="740" height="240" fill="white" />
                                <text x="400" y="110" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="76" letterSpacing="-2px" fill="black">
                                  PRINTED
                                </text>
                                <text x="400" y="195" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="42" letterSpacing="4px" fill="black">
                                  MATTER 1954
                                </text>
                                <text x="400" y="240" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="16" letterSpacing="6px" fill="black">
                                  // TECHNICAL CARTOGRAPHY
                                </text>
                              </mask>
                            </defs>

                            {/* Background Unprinted Paper Sheet Ground */}
                            <rect width="800" height="280" fill="var(--surface)" />

                            {/* PLATE 1: Solid Ink Layer 1 (Base Position 0,0 + Multiply) */}
                            <g style={{ mixBlendMode: "multiply" }}>
                              <rect x="30" y="20" width="740" height="240" fill={currentPair.p1} mask="url(#ko-mask-plate1)" />
                            </g>

                            {/* PLATE 2: Solid Ink Layer 2 (Shifted Entire Plate Block + Mask via Translation + Multiply) */}
                            <g transform={`translate(${misregisterX}, ${misregisterY})`} style={{ mixBlendMode: "multiply" }}>
                              <rect x="30" y="20" width="740" height="240" fill={currentPair.p2} mask="url(#ko-mask-plate2)" />
                            </g>

                            {/* Corner Registration Target Marks (Plate 1 & Plate 2) */}
                            <g style={{ mixBlendMode: "multiply" }}>
                              <circle cx="50" cy="40" r="10" fill="none" stroke={currentPair.p1} strokeWidth="1.5" />
                              <line x1="38" y1="40" x2="62" y2="40" stroke={currentPair.p1} strokeWidth="1.5" />
                              <line x1="50" y1="28" x2="50" y2="52" stroke={currentPair.p1} strokeWidth="1.5" />
                            </g>
                            <g style={{ mixBlendMode: "multiply" }} transform={`translate(${misregisterX}, ${misregisterY})`}>
                              <circle cx="50" cy="40" r="10" fill="none" stroke={currentPair.p2} strokeWidth="1.5" />
                              <line x1="38" y1="40" x2="62" y2="40" stroke={currentPair.p2} strokeWidth="1.5" />
                              <line x1="50" y1="28" x2="50" y2="52" stroke={currentPair.p2} strokeWidth="1.5" />
                            </g>

                            <g style={{ mixBlendMode: "multiply" }}>
                              <circle cx="750" cy="40" r="10" fill="none" stroke={currentPair.p1} strokeWidth="1.5" />
                              <line x1="738" y1="40" x2="762" y2="40" stroke={currentPair.p1} strokeWidth="1.5" />
                              <line x1="750" y1="28" x2="750" y2="52" stroke={currentPair.p1} strokeWidth="1.5" />
                            </g>
                            <g style={{ mixBlendMode: "multiply" }} transform={`translate(${misregisterX}, ${misregisterY})`}>
                              <circle cx="750" cy="40" r="10" fill="none" stroke={currentPair.p2} strokeWidth="1.5" />
                              <line x1="738" y1="40" x2="762" y2="40" stroke={currentPair.p2} strokeWidth="1.5" />
                              <line x1="750" y1="28" x2="750" y2="52" stroke={currentPair.p2} strokeWidth="1.5" />
                            </g>
                          </svg>

                          {/* Optical Breakdown Callout Overlay */}
                          <div className="absolute bottom-3 right-3 bg-[var(--white)]/95 backdrop-blur-sm p-3 border border-[var(--border-gray)] font-mono text-[11px] space-y-1">
                            <div className="font-bold text-[var(--gray-900)] uppercase">Registration Fringe Breakdown:</div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: currentPair.p1Hex }} />
                              <span>Top/Left &amp; Knockout Edge: Pure {currentPair.p1Name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: currentPair.p2Hex }} />
                              <span>Bottom/Right &amp; Knockout Edge: Pure {currentPair.p2Name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 inline-block bg-[var(--surface)] border border-black/30" />
                              <span>Letter Center: Unprinted Paper Ground</span>
                            </div>
                          </div>
                        </div>

                        {/* Physical Description Card */}
                        <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] font-mono text-xs space-y-2">
                          <div className="flex flex-wrap items-center justify-between text-[var(--text)] font-bold">
                            <span>MECHANICAL PLATE MISREGISTRATION (INSIDE &amp; OUTSIDE EDGES)</span>
                            <span className="text-[var(--primary-500)]">
                              SHIFT: dx={misregisterX}px, dy={misregisterY}px
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed m-0">
                            When multi-plate presses print overlaid solid plates with knockout type, mechanical plate shift displaces the <strong>entire physical plate block</strong>. The outside top/left perimeter reveals bare <strong>{currentPair.p1Name}</strong> fringe, the outside bottom/right perimeter reveals bare <strong>{currentPair.p2Name}</strong> fringe, the main body multiplies into deep combined ink, and the knocked-out letterforms show opposing chromatic fringes along stroke edges.
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ─── SPECIMEN 2: TWO-INK KNOCKOUT ADMINISTRATIVE BADGES & TELEMETRY ─── */}
                <div className="p-6 bg-[var(--surface)] border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-gray)]/30 font-mono text-xs gap-2">
                    <span className="font-bold text-[var(--text)] uppercase tracking-tight">
                      Specimen 2: Two-Ink Knockout Administrative Badges &amp; Tags
                    </span>
                    <span className="text-[var(--text-muted)]">
                      ENTIRE PLATE BLOCK &amp; KNOCKOUT TYPE EXPERIENCE PHYSICAL REGISTRATION SHIFT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Badge 1: Red + Blue (Violet Field) */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                      <div className="relative h-28 w-full bg-[var(--surface)] flex items-center justify-center overflow-hidden border border-black/10">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <defs>
                            <mask id="badge-mask-1">
                              <rect x="12" y="8" width="176" height="64" fill="white" />
                              <text x="100" y="46" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="17" fill="black">
                                ADM1 TURKANA
                              </text>
                            </mask>
                          </defs>
                          <rect width="200" height="80" fill="var(--surface)" />
                          <rect x="12" y="8" width="176" height="64" fill="var(--spectrum-red)" mask="url(#badge-mask-1)" style={{ mixBlendMode: "multiply" }} />
                          <g transform={`translate(${misregisterX}, ${misregisterY})`} style={{ mixBlendMode: "multiply" }}>
                            <rect x="12" y="8" width="176" height="64" fill="var(--primary-500)" mask="url(#badge-mask-1)" />
                          </g>
                        </svg>
                      </div>
                      <div className="mt-3 font-mono text-xs">
                        <span className="font-bold text-[var(--text)] block uppercase">Red + Blue Build</span>
                        <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                          Multiplied violet block with red &amp; blue registration fringes on borders and glyphs.
                        </span>
                      </div>
                    </div>

                    {/* Badge 2: Blue + Yellow (Green Field) */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                      <div className="relative h-28 w-full bg-[var(--surface)] flex items-center justify-center overflow-hidden border border-black/10">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <defs>
                            <mask id="badge-mask-2">
                              <rect x="12" y="8" width="176" height="64" fill="white" />
                              <text x="100" y="46" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="17" fill="black">
                                ELEV 2400M
                              </text>
                            </mask>
                          </defs>
                          <rect width="200" height="80" fill="var(--surface)" />
                          <rect x="12" y="8" width="176" height="64" fill="var(--primary-500)" mask="url(#badge-mask-2)" style={{ mixBlendMode: "multiply" }} />
                          <g transform={`translate(${misregisterX}, ${misregisterY})`} style={{ mixBlendMode: "multiply" }}>
                            <rect x="12" y="8" width="176" height="64" fill="var(--spectrum-yellow)" mask="url(#badge-mask-2)" />
                          </g>
                        </svg>
                      </div>
                      <div className="mt-3 font-mono text-xs">
                        <span className="font-bold text-[var(--text)] block uppercase">Blue + Yellow Build</span>
                        <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                          Multiplied green block with blue &amp; yellow misregistration fringes on outside borders.
                        </span>
                      </div>
                    </div>

                    {/* Badge 3: Aqua + Black (Slate Field) */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col justify-between">
                      <div className="relative h-28 w-full bg-[var(--surface)] flex items-center justify-center overflow-hidden border border-black/10">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <defs>
                            <mask id="badge-mask-3">
                              <rect x="12" y="8" width="176" height="64" fill="white" />
                              <text x="100" y="46" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="17" fill="black">
                                INT-500 CAL
                              </text>
                            </mask>
                          </defs>
                          <rect width="200" height="80" fill="var(--surface)" />
                          <rect x="12" y="8" width="176" height="64" fill="var(--spectrum-aqua)" mask="url(#badge-mask-3)" style={{ mixBlendMode: "multiply" }} />
                          <g transform={`translate(${misregisterX}, ${misregisterY})`} style={{ mixBlendMode: "multiply" }}>
                            <rect x="12" y="8" width="176" height="64" fill="var(--gray-900)" mask="url(#badge-mask-3)" />
                          </g>
                        </svg>
                      </div>
                      <div className="mt-3 font-mono text-xs">
                        <span className="font-bold text-[var(--text)] block uppercase">Aqua + Black Build</span>
                        <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                          Multiplied deep slate block with aqua halo on trailing edge borders and letter strokes.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── SPECIMEN 3: CARTOGRAPHIC TOPOGRAPHY & COASTLINE DRIFT ─── */}
                <div className="p-6 bg-[var(--surface)] border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-gray)]/30 font-mono text-xs gap-2">
                    <span className="font-bold text-[var(--text)] uppercase tracking-tight">
                      Specimen 3: Cartographic Topography &amp; Maritime Coastline Drift
                    </span>
                    <span className="text-[var(--text-muted)]">
                      PLATE 1: HYDRO TINT (AQUA) &nbsp;|&nbsp; PLATE 2: CONTOUR KEYLINES (BLACK SHIFT: {misregisterX}px, {misregisterY}px)
                    </span>
                  </div>

                  <div className="relative h-72 w-full bg-[var(--white)] border border-[var(--border-gray)] overflow-hidden select-none">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, var(--border-gray) 1px, transparent 1px), linear-gradient(to bottom, var(--border-gray) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                    {/* PLATE 1: Hydro & Elevation Tint Polygons */}
                    <svg className="w-full h-full absolute inset-0 mix-blend-multiply z-0 pointer-events-none">
                      <path
                        d="M 50 40 Q 150 20 280 60 T 500 40 T 700 80 L 700 240 Q 550 260 380 220 T 100 250 Z"
                        fill="var(--spectrum-aqua)"
                        opacity="0.85"
                      />
                      <polygon points="120,80 180,70 220,110 190,160 130,140" fill="var(--spectrum-green)" opacity="0.9" />
                      <polygon points="340,90 420,80 460,130 400,170 330,140" fill="var(--spectrum-green)" opacity="0.9" />
                      <polygon points="530,110 610,95 640,140 590,190 520,160" fill="var(--spectrum-green)" opacity="0.9" />
                      <circle cx="270" cy="160" r="28" fill="var(--spectrum-yellow)" opacity="0.75" />
                      <circle cx="480" cy="180" r="22" fill="var(--spectrum-yellow)" opacity="0.75" />
                    </svg>

                    {/* PLATE 2: Keyplate Contours, Soundings & Coastal Outlines */}
                    <svg
                      className="w-full h-full absolute inset-0 mix-blend-multiply z-10 pointer-events-none transition-transform duration-75"
                      style={{
                        transform: `translate(${misregisterX}px, ${misregisterY}px)`,
                      }}
                    >
                      <path
                        d="M 50 40 Q 150 20 280 60 T 500 40 T 700 80 L 700 240 Q 550 260 380 220 T 100 250 Z"
                        fill="none"
                        stroke="var(--gray-900)"
                        strokeWidth="2.0"
                      />
                      <polygon points="120,80 180,70 220,110 190,160 130,140" fill="none" stroke="var(--gray-900)" strokeWidth="1.8" />
                      <polygon points="340,90 420,80 460,130 400,170 330,140" fill="none" stroke="var(--gray-900)" strokeWidth="1.8" />
                      <polygon points="530,110 610,95 640,140 590,190 520,160" fill="none" stroke="var(--gray-900)" strokeWidth="1.8" />
                      
                      <circle cx="270" cy="160" r="28" fill="none" stroke="var(--gray-900)" strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx="480" cy="180" r="22" fill="none" stroke="var(--gray-900)" strokeWidth="1.2" strokeDasharray="3 3" />

                      <text x="80" y="70" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="var(--gray-900)">14m</text>
                      <text x="210" y="55" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="var(--gray-900)">38m</text>
                      <text x="440" y="60" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="var(--gray-900)">82m</text>
                      <text x="620" y="70" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="var(--gray-900)">145m</text>

                      <text x="140" y="120" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--gray-900)">ISLE I</text>
                      <text x="365" y="130" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--gray-900)">ISLE II</text>
                      <text x="550" y="150" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--gray-900)">ISLE III</text>
                      <text x="250" y="165" fontFamily="monospace" fontSize="9" fill="var(--gray-900)">[SHOAL]</text>

                      <line x1="30" y1="140" x2="690" y2="140" stroke="var(--gray-900)" strokeWidth="0.75" strokeDasharray="6 4" />
                      <text x="35" y="135" fontFamily="monospace" fontSize="9" fill="var(--gray-900)">PARALLEL 03°36'N</text>
                    </svg>

                    <div className="absolute bottom-3 left-3 bg-[var(--white)]/90 backdrop-blur-sm p-2 border border-[var(--border-gray)] font-mono text-[10px] space-y-0.5">
                      <div className="font-bold text-[var(--gray-900)] uppercase">HYDROGRAPHIC SURVEY 1:25,000</div>
                      <div className="text-[var(--text-muted)]">DATUM: WGS-84 &bull; INT-500</div>
                    </div>
                  </div>
                </div>

                {/* ─── SPECIMEN 5: PRESS REGISTRATION TARGETS & VERNIER SCALE ─── */}
                <div className="p-6 bg-[var(--surface)] border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
                  <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-gray)]/30 font-mono text-xs gap-2">
                    <span className="font-bold text-[var(--text)] uppercase tracking-tight">
                      Specimen 5: Press Registration Targets &amp; Vernier Scale
                    </span>
                    <span className="text-[var(--text-muted)]">
                      PLATE 1: SPOT RED RETICLE &nbsp;|&nbsp; PLATE 2: SPOT BLUE CROSSHAIR (SHIFT: {misregisterX}px, {misregisterY}px)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Target 1: Concentric Reticle Target */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-center">
                      <div className="relative w-36 h-36 flex items-center justify-center overflow-hidden bg-[var(--surface)] border border-[var(--border-gray)]/30">
                        <svg className="w-full h-full absolute inset-0 mix-blend-multiply">
                          <circle cx="72" cy="72" r="48" fill="none" stroke="var(--spectrum-red)" strokeWidth="3" />
                          <circle cx="72" cy="72" r="28" fill="none" stroke="var(--spectrum-red)" strokeWidth="2" />
                          <circle cx="72" cy="72" r="10" fill="var(--spectrum-red)" />
                          <line x1="72" y1="10" x2="72" y2="134" stroke="var(--spectrum-red)" strokeWidth="1.5" />
                          <line x1="10" y1="72" x2="134" y2="72" stroke="var(--spectrum-red)" strokeWidth="1.5" />
                        </svg>

                        <svg
                          className="w-full h-full absolute inset-0 mix-blend-multiply transition-transform duration-75"
                          style={{
                            transform: `translate(${misregisterX}px, ${misregisterY}px)`,
                          }}
                        >
                          <circle cx="72" cy="72" r="48" fill="none" stroke="var(--primary-500)" strokeWidth="2" />
                          <circle cx="72" cy="72" r="28" fill="none" stroke="var(--primary-500)" strokeWidth="1.5" />
                          <circle cx="72" cy="72" r="6" fill="var(--primary-500)" />
                          <line x1="72" y1="10" x2="72" y2="134" stroke="var(--primary-500)" strokeWidth="1.2" />
                          <line x1="10" y1="72" x2="134" y2="72" stroke="var(--primary-500)" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase mt-3">
                        Concentric Reticle
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] text-center mt-0.5">
                        Overlapping red/blue targets reveal violet center with colored fringe rings.
                      </span>
                    </div>

                    {/* Target 2: Quadrant Calibration Block */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-center">
                      <div className="relative w-36 h-36 flex items-center justify-center overflow-hidden bg-[var(--surface)] border border-[var(--border-gray)]/30">
                        <div className="w-24 h-24 grid grid-cols-2 grid-rows-2 absolute mix-blend-multiply">
                          <div className="bg-[var(--spectrum-red)]" />
                          <div className="bg-transparent" />
                          <div className="bg-transparent" />
                          <div className="bg-[var(--spectrum-red)]" />
                        </div>

                        <div
                          className="w-24 h-24 grid grid-cols-2 grid-rows-2 absolute mix-blend-multiply transition-transform duration-75"
                          style={{
                            transform: `translate(${misregisterX}px, ${misregisterY}px)`,
                          }}
                        >
                          <div className="bg-transparent" />
                          <div className="bg-[var(--primary-500)]" />
                          <div className="bg-[var(--primary-500)]" />
                          <div className="bg-transparent" />
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase mt-3">
                        Checkerboard Quadrant
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] text-center mt-0.5">
                        Checker blocks expose white gap lines and multiplied violet corners.
                      </span>
                    </div>

                    {/* Target 3: Vernier Micrometer Scale */}
                    <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] flex flex-col items-center justify-center">
                      <div className="relative w-36 h-36 flex flex-col items-center justify-center overflow-hidden bg-[var(--surface)] border border-[var(--border-gray)]/30 p-2 font-mono">
                        <div className="w-full flex justify-between items-end h-10 border-b border-[var(--spectrum-red)] pb-0.5 mix-blend-multiply">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="flex flex-col items-center">
                              <div className="w-0.5 h-3 bg-[var(--spectrum-red)]" />
                              <span className="text-[8px] text-[var(--spectrum-red)] font-bold">{n}</span>
                            </div>
                          ))}
                        </div>

                        <div
                          className="w-full flex justify-between items-start h-10 border-t border-[var(--primary-500)] pt-0.5 mix-blend-multiply transition-transform duration-75"
                          style={{
                            transform: `translate(${misregisterX}px, 0px)`,
                          }}
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="flex flex-col items-center">
                              <span className="text-[8px] text-[var(--primary-500)] font-bold">{n}</span>
                              <div className="w-0.5 h-3 bg-[var(--primary-500)]" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--text)] uppercase mt-3">
                        Vernier Pitch Scale
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] text-center mt-0.5">
                        Coinciding tick marks indicate exact mechanical plate shift in mm.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 4: SVG feTurbulence DUAL-RELIEF PAPER GROUND ─── */}
            <section className="bg-[var(--surface)] p-6 border border-[var(--border-gray)]" style={{ borderRadius: 0 }}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[var(--border-gray)] pb-4 mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-[var(--primary-500)] text-white uppercase">
                      OPTION 1: SVG feTurbulence
                    </span>
                    <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)] uppercase font-mono m-0">
                      Dual-Relief Paper Ground (Identical Light &amp; Dark with X/Y Offset)
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] font-mono m-0">
                    Procedural vector paper tooth generating identical light highlight and dark shadow channels from a single noise source, offset in $(x, y)$ to model physical 3D fiber relief across solid blacks, colors, and white paper.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGlobalPaperTexture(!globalPaperTexture)}
                    className={`py-1.5 px-3 font-mono text-xs font-bold uppercase transition-colors border flex items-center gap-1.5 ${
                      globalPaperTexture
                        ? "bg-[var(--spectrum-green)] text-white border-[var(--spectrum-green)]"
                        : "bg-[var(--surface-muted)] text-[var(--text)] border-[var(--border-gray)] hover:bg-[var(--border-gray)]/30"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <Droplet size={13} />
                    <span>{globalPaperTexture ? "Global Page Overlay: ON" : "Global Page Overlay: OFF"}</span>
                  </button>
                </div>
              </div>

              {/* ─── Granular Parameter Controls Panel ─── */}
              <div className="p-4 bg-[var(--white)] border border-[var(--border-gray)] mb-6 font-mono text-xs space-y-4">
                {/* Fast Presets & Mode Toggles */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-gray)]/30 pb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[var(--text-muted)] text-[11px] font-bold mr-1">PRESETS:</span>
                    {[
                      { id: "user", label: "Requested (.45 × .20, 2 oct, Light 0.86% / Dark 9.98%)", freqX: 0.45, freqY: 0.20, oct: 2, type: "turbulence", lOp: 0.0086, dOp: 0.0998, lOffX: -1.0, lOffY: -1.0, dOffX: 1.0, dOffY: 1.0, lGain: 1.0, dGain: 0.74, lBlur: 0.4, dBlur: 0.0, lFloor: 0.29, dWarmth: 1.42, dInvert: false },
                      { id: "rag", label: "Cotton Rag (.12 × .12, 4 oct, 10%)", freqX: 0.12, freqY: 0.12, oct: 4, type: "fractalNoise", lOp: 0.10, dOp: 0.10, lOffX: -0.4, lOffY: -0.4, dOffX: 0.4, dOffY: 0.4, lGain: 1.0, dGain: 1.0, lBlur: 0.0, dBlur: 0.0, lFloor: 0.0, dWarmth: 1.2, dInvert: true },
                      { id: "micro", label: "Ultra Micro-Tooth (.40 × .40, 5 oct, 7%)", freqX: 0.40, freqY: 0.40, oct: 5, type: "fractalNoise", lOp: 0.07, dOp: 0.07, lOffX: -0.2, lOffY: -0.2, dOffX: 0.2, dOffY: 0.2, lGain: 1.0, dGain: 1.0, lBlur: 0.0, dBlur: 0.0, lFloor: 0.0, dWarmth: 1.2, dInvert: true },
                      { id: "laid", label: "Directional Laid Grain (.48 × .08, 3 oct, 12%)", freqX: 0.48, freqY: 0.08, oct: 3, type: "turbulence", lOp: 0.12, dOp: 0.10, lOffX: -0.8, lOffY: -0.2, dOffX: 0.8, dOffY: 0.2, lGain: 1.0, dGain: 1.0, lBlur: 0.0, dBlur: 0.0, lFloor: 0.0, dWarmth: 1.2, dInvert: true },
                      { id: "washi", label: "Coarse Washi (.04 × .04, 4 oct, 15%)", freqX: 0.04, freqY: 0.04, oct: 4, type: "turbulence", lOp: 0.15, dOp: 0.14, lOffX: -0.6, lOffY: -0.6, dOffX: 0.6, dOffY: 0.6, lGain: 1.0, dGain: 1.0, lBlur: 0.0, dBlur: 0.0, lFloor: 0.0, dWarmth: 1.2, dInvert: true },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setPaperPreset(p.id as any);
                          setPaperBaseFrequency(p.freqX);
                          setPaperFreqY(p.freqY);
                          setPaperFreqLocked(p.freqX === p.freqY);
                          setPaperOctaves(p.oct);
                          setPaperNoiseType(p.type as any);
                          setPaperLightOpacity(p.lOp);
                          setPaperDarkOpacity(p.dOp);
                          setPaperLightOffsetX(p.lOffX);
                          setPaperLightOffsetY(p.lOffY);
                          setPaperDarkOffsetX(p.dOffX);
                          setPaperDarkOffsetY(p.dOffY);
                          if (p.lGain !== undefined) setPaperLightGain(p.lGain);
                          if (p.dGain !== undefined) setPaperDarkGain(p.dGain);
                          if (p.lBlur !== undefined) setPaperLightBlur(p.lBlur);
                          if (p.dBlur !== undefined) setPaperDarkBlur(p.dBlur);
                          if (p.lFloor !== undefined) setPaperLightFloor(p.lFloor);
                          if (p.dWarmth !== undefined) setPaperDarkWarmth(p.dWarmth);
                          if (p.dInvert !== undefined) setPaperDarkInvert(p.dInvert);
                          setPaperLightEnabled(true);
                          setPaperDarkEnabled(true);
                        }}
                        className={`px-2 py-0.5 text-[10px] font-bold border transition-colors ${
                          paperPreset === p.id
                            ? "bg-[var(--primary-500)] text-white border-[var(--primary-700)]"
                            : "bg-[var(--surface-muted)] text-[var(--text)] border-[var(--border-gray)] hover:bg-[var(--border-gray)]/30"
                        }`}
                        style={{ borderRadius: 0 }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Channel Mode Quick Actions */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[var(--text-muted)] text-[10px] font-bold mr-1">MODE:</span>
                    <button
                      onClick={() => { setPaperLightEnabled(true); setPaperDarkEnabled(true); }}
                      className={`px-2 py-0.5 text-[10px] font-bold border ${paperLightEnabled && paperDarkEnabled ? "bg-[var(--primary-700)] text-white" : "bg-[var(--white)] text-[var(--text)]"}`}
                    >
                      Dual Relief
                    </button>
                    <button
                      onClick={() => { setPaperLightEnabled(true); setPaperDarkEnabled(false); }}
                      className={`px-2 py-0.5 text-[10px] font-bold border ${paperLightEnabled && !paperDarkEnabled ? "bg-[var(--spectrum-yellow)] text-black" : "bg-[var(--white)] text-[var(--text)]"}`}
                    >
                      Solo Light (Ink Only)
                    </button>
                    <button
                      onClick={() => { setPaperLightEnabled(false); setPaperDarkEnabled(true); }}
                      className={`px-2 py-0.5 text-[10px] font-bold border ${!paperLightEnabled && paperDarkEnabled ? "bg-[var(--gray-800)] text-white" : "bg-[var(--white)] text-[var(--text)]"}`}
                    >
                      Solo Dark (Paper Only)
                    </button>
                    <button
                      onClick={() => {
                        const avg = (paperLightOpacity + paperDarkOpacity) / 2;
                        setPaperLightOpacity(avg);
                        setPaperDarkOpacity(avg);
                      }}
                      className="px-2 py-0.5 text-[10px] font-bold border bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text)]"
                      title="Equalize Light and Dark opacities"
                    >
                      Equalize Opacity
                    </button>
                  </div>
                </div>

                {/* 3-Column Granular Slider Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                  {/* Column 1: Shared Base feTurbulence Noise Generator */}
                  <div className="p-3 bg-[var(--surface)] border border-[var(--border-gray)] space-y-3">
                    <div className="flex justify-between items-center pb-1 border-b border-[var(--border-gray)]/30">
                      <span className="font-bold text-[var(--primary-600)] uppercase">1. Shared Noise Generator</span>
                      <span className="text-[10px] bg-[var(--primary-500)] text-white px-1 font-bold">
                        {paperNoiseType.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Freq X (0.005–0.500):</span>
                        <span className="text-[var(--primary-600)] font-bold">{paperBaseFrequency.toFixed(3)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.005"
                        max="0.500"
                        step="0.001"
                        value={paperBaseFrequency}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setPaperBaseFrequency(val);
                          if (paperFreqLocked) setPaperFreqY(val);
                          setPaperPreset("custom" as any);
                        }}
                        className="w-full accent-[var(--primary-500)] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Freq Y (0.005–0.500):</span>
                        <span className="text-[var(--primary-600)] font-bold">{paperFreqY.toFixed(3)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.005"
                        max="0.500"
                        step="0.001"
                        value={paperFreqY}
                        onChange={(e) => {
                          setPaperFreqY(parseFloat(e.target.value));
                          setPaperFreqLocked(false);
                          setPaperPreset("custom" as any);
                        }}
                        className="w-full accent-[var(--primary-500)] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Octaves (1–8):</span>
                        <span className="text-[var(--primary-600)] font-bold">{paperOctaves}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={paperOctaves}
                        onChange={(e) => setPaperOctaves(parseInt(e.target.value))}
                        className="w-full accent-[var(--primary-500)] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--border-gray)]/20">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setPaperNoiseType("turbulence")}
                          className={`px-1.5 py-0.5 font-bold ${paperNoiseType === "turbulence" ? "bg-[var(--primary-500)] text-white" : "bg-[var(--white)] text-[var(--text)] border"}`}
                        >
                          Turbulence
                        </button>
                        <button
                          onClick={() => setPaperNoiseType("fractalNoise")}
                          className={`px-1.5 py-0.5 font-bold ${paperNoiseType === "fractalNoise" ? "bg-[var(--primary-500)] text-white" : "bg-[var(--white)] text-[var(--text)] border"}`}
                        >
                          Fractal
                        </button>
                      </div>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paperFreqLocked}
                          onChange={(e) => {
                            setPaperFreqLocked(e.target.checked);
                            if (e.target.checked) setPaperFreqY(paperBaseFrequency);
                          }}
                          className="accent-[var(--primary-500)]"
                        />
                        <span>Lock X/Y</span>
                      </label>
                    </div>
                  </div>

                  {/* Column 2: Light Highlight Channel (White Fibers on Ink) */}
                  <div className={`p-3 bg-[var(--surface)] border space-y-3 transition-opacity ${paperLightEnabled ? "border-[var(--spectrum-yellow)]" : "border-[var(--border-gray)] opacity-60"}`}>
                    <div className="flex justify-between items-center pb-1 border-b border-[var(--border-gray)]/30">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={paperLightEnabled}
                          onChange={(e) => setPaperLightEnabled(e.target.checked)}
                          className="accent-[var(--spectrum-yellow)] cursor-pointer"
                          id="chk-light-channel"
                        />
                        <label htmlFor="chk-light-channel" className="font-bold text-[var(--text)] uppercase cursor-pointer">
                          2. Light Highlights (Ink)
                        </label>
                      </div>
                      <span className="text-[10px] bg-[var(--spectrum-yellow)] text-[var(--gray-900)] px-1 font-bold">
                        {paperLightEnabled ? `${(paperLightOpacity * 100).toFixed(2)}% OPACITY` : "DISABLED"}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Light Opacity (0.00%–3.00%):</span>
                        <span className="text-[var(--primary-600)] font-bold">{(paperLightOpacity * 100).toFixed(2)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.0000"
                        max="0.0300"
                        step="0.0001"
                        value={paperLightOpacity}
                        onChange={(e) => setPaperLightOpacity(parseFloat(e.target.value))}
                        className="w-full accent-[var(--spectrum-yellow)] cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="font-bold block mb-0.5">Gain: {paperLightGain.toFixed(2)}×</span>
                        <input
                          type="range"
                          min="0.000"
                          max="2.500"
                          step="0.005"
                          value={paperLightGain}
                          onChange={(e) => setPaperLightGain(parseFloat(e.target.value))}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="font-bold block mb-0.5">Blur: {paperLightBlur.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="0.00"
                          max="2.00"
                          step="0.05"
                          value={paperLightBlur}
                          onChange={(e) => setPaperLightBlur(parseFloat(e.target.value))}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Peak Floor / Noise Clip:</span>
                        <span className="text-[var(--primary-600)] font-bold">{(paperLightFloor * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.00"
                        max="0.80"
                        step="0.01"
                        value={paperLightFloor}
                        onChange={(e) => setPaperLightFloor(parseFloat(e.target.value))}
                        className="w-full accent-[var(--primary-500)] cursor-pointer"
                        title="Clips bottom noise floor to isolate true fiber peaks and prevent flat gray fogging on black ink"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="font-bold block mb-0.5">Offset X: {paperLightOffsetX > 0 ? `+${paperLightOffsetX.toFixed(2)}` : paperLightOffsetX.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="-5.00"
                          max="5.00"
                          step="0.05"
                          value={paperLightOffsetX}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPaperLightOffsetX(val);
                            if (paperSymmetricOffset) setPaperDarkOffsetX(-val);
                          }}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="font-bold block mb-0.5">Offset Y: {paperLightOffsetY > 0 ? `+${paperLightOffsetY.toFixed(2)}` : paperLightOffsetY.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="-5.00"
                          max="5.00"
                          step="0.05"
                          value={paperLightOffsetY}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPaperLightOffsetY(val);
                            if (paperSymmetricOffset) setPaperDarkOffsetY(-val);
                          }}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--border-gray)]/20 text-[var(--text-muted)]">
                      <span>Targets: Solid Blacks &amp; Inks</span>
                      <span>Color: Bleached Fiber (#FFFFFF)</span>
                    </div>
                  </div>

                  {/* Column 3: Dark Shadow Channel (Deep Warm Shade of Paper Ground) */}
                  <div className={`p-3 bg-[var(--surface)] border space-y-3 transition-opacity ${paperDarkEnabled ? "border-[var(--gray-700)]" : "border-[var(--border-gray)] opacity-60"}`}>
                    <div className="flex justify-between items-center pb-1 border-b border-[var(--border-gray)]/30">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={paperDarkEnabled}
                          onChange={(e) => setPaperDarkEnabled(e.target.checked)}
                          className="accent-[var(--gray-800)] cursor-pointer"
                          id="chk-dark-channel"
                        />
                        <label htmlFor="chk-dark-channel" className="font-bold text-[var(--text)] uppercase cursor-pointer">
                          3. Dark Shadows (Paper)
                        </label>
                      </div>
                      <span className="text-[10px] bg-[var(--gray-800)] text-white px-1 font-bold">
                        {paperDarkEnabled ? `${(paperDarkOpacity * 100).toFixed(2)}% OPACITY` : "DISABLED"}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-bold">Dark Opacity (0.00%–25.00%):</span>
                        <span className="text-[var(--primary-600)] font-bold">{(paperDarkOpacity * 100).toFixed(2)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.0000"
                        max="0.2500"
                        step="0.0005"
                        value={paperDarkOpacity}
                        onChange={(e) => setPaperDarkOpacity(parseFloat(e.target.value))}
                        className="w-full accent-[var(--gray-800)] cursor-pointer"
                      />
                    </div>

                    {/* Shadow Tone Presets & Warmth */}
                    <div className="p-2 bg-[var(--white)] border border-[var(--border-gray)]/60 space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--primary-700)]">SHADOW PAPER TONE:</span>
                        <div className="flex items-center gap-1">
                          <span
                            className="inline-block w-3 h-3 border border-black/20"
                            style={{
                              backgroundColor: `rgb(${Math.round(Math.min(1.0, Math.max(0, paperDarkR * (paperDarkWarmth * 0.8 + 0.2))) * 255)}, ${Math.round(Math.min(1.0, Math.max(0, paperDarkG)) * 255)}, ${Math.round(Math.min(1.0, Math.max(0, paperDarkB / (paperDarkWarmth * 0.8 + 0.2))) * 255)})`,
                            }}
                          />
                          <span className="font-mono text-[9px] text-[var(--text-muted)]">
                            {`#${Math.round(Math.min(1.0, Math.max(0, paperDarkR * (paperDarkWarmth * 0.8 + 0.2))) * 255).toString(16).padStart(2, '0')}${Math.round(Math.min(1.0, Math.max(0, paperDarkG)) * 255).toString(16).padStart(2, '0')}${Math.round(Math.min(1.0, Math.max(0, paperDarkB / (paperDarkWarmth * 0.8 + 0.2))) * 255).toString(16).padStart(2, '0')}`.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-wrap">
                        {[
                          { label: "Warm Paper Ground", r: 0.38, g: 0.32, b: 0.24, w: 1.2 },
                          { label: "Stone 600", r: 0.34, g: 0.32, b: 0.30, w: 1.0 },
                          { label: "Raw Umber", r: 0.44, g: 0.34, b: 0.20, w: 1.3 },
                          { label: "Sepia", r: 0.30, g: 0.22, b: 0.16, w: 1.2 },
                        ].map((t) => (
                          <button
                            key={t.label}
                            onClick={() => {
                              setPaperDarkR(t.r);
                              setPaperDarkG(t.g);
                              setPaperDarkB(t.b);
                              setPaperDarkWarmth(t.w);
                            }}
                            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors ${
                              paperDarkR === t.r && paperDarkG === t.g && paperDarkWarmth === t.w
                                ? "bg-[var(--primary-600)] text-white border-[var(--primary-700)]"
                                : "bg-[var(--surface)] text-[var(--text)] border-[var(--border-gray)] hover:bg-[var(--border-gray)]/20"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="pt-1">
                        <div className="flex justify-between text-[9px] mb-0.5">
                          <span className="font-bold">Warmth / Amber Bias:</span>
                          <span className="text-[var(--primary-600)] font-bold">{paperDarkWarmth.toFixed(2)}×</span>
                        </div>
                        <input
                          type="range"
                          min="0.60"
                          max="1.80"
                          step="0.01"
                          value={paperDarkWarmth}
                          onChange={(e) => setPaperDarkWarmth(parseFloat(e.target.value))}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="font-bold block mb-0.5">Gain: {paperDarkGain.toFixed(2)}×</span>
                        <input
                          type="range"
                          min="0.000"
                          max="2.500"
                          step="0.005"
                          value={paperDarkGain}
                          onChange={(e) => setPaperDarkGain(parseFloat(e.target.value))}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="font-bold block mb-0.5">Blur: {paperDarkBlur.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="0.00"
                          max="2.00"
                          step="0.05"
                          value={paperDarkBlur}
                          onChange={(e) => setPaperDarkBlur(parseFloat(e.target.value))}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="font-bold block mb-0.5">Offset X: {paperDarkOffsetX > 0 ? `+${paperDarkOffsetX.toFixed(2)}` : paperDarkOffsetX.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="-5.00"
                          max="5.00"
                          step="0.05"
                          value={paperDarkOffsetX}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPaperDarkOffsetX(val);
                            if (paperSymmetricOffset) setPaperLightOffsetX(-val);
                          }}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="font-bold block mb-0.5">Offset Y: {paperDarkOffsetY > 0 ? `+${paperDarkOffsetY.toFixed(2)}` : paperDarkOffsetY.toFixed(2)}px</span>
                        <input
                          type="range"
                          min="-5.00"
                          max="5.00"
                          step="0.05"
                          value={paperDarkOffsetY}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPaperDarkOffsetY(val);
                            if (paperSymmetricOffset) setPaperLightOffsetY(-val);
                          }}
                          className="w-full accent-[var(--primary-500)] cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--border-gray)]/20 text-[var(--text-muted)] flex-wrap gap-2">
                      <label className="flex items-center gap-1 cursor-pointer font-bold text-[var(--primary-700)]">
                        <input
                          type="checkbox"
                          checked={paperDarkInvert}
                          onChange={(e) => setPaperDarkInvert(e.target.checked)}
                          className="accent-[var(--primary-600)] cursor-pointer"
                        />
                        <span>Invert Phase (Shadows in Troughs)</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paperSymmetricOffset}
                          onChange={(e) => setPaperSymmetricOffset(e.target.checked)}
                          className="accent-[var(--primary-500)]"
                        />
                        <span>Symmetric Offset Link</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── GRAND SPECIMEN PROOF (DUAL-RELIEF SVG feTurbulence: Multiply + Screen) ─── */}
              <div className="mb-6">
                <ArchivalPrintSpecimen
                  title="SVG feTurbulence Dual-Relief Ground"
                  badgeText={`MULTIPLY (DARK ${paperDarkInvert ? 'INVERTED' : 'DIRECT'}) + SCREEN (LIGHT)`}
                  subtitle={`Procedural vector paper ground (Freq: ${paperBaseFrequency.toFixed(3)} × ${paperFreqY.toFixed(3)}, ${paperOctaves} oct | Dark (Multiply ${paperDarkInvert ? 'Inverted' : 'Direct'}): ${paperDarkEnabled ? `${(paperDarkOpacity * 100).toFixed(2)}% op (${paperDarkGain.toFixed(2)}×)` : 'OFF'} [${paperDarkOffsetX.toFixed(2)}px, ${paperDarkOffsetY.toFixed(2)}px] | Light (Screen): ${paperLightEnabled ? `${(paperLightOpacity * 100).toFixed(2)}% op (${paperLightGain.toFixed(2)}×)` : 'OFF'} [${paperLightOffsetX.toFixed(2)}px, ${paperLightOffsetY.toFixed(2)}px])`}
                  mode="full"
                  footerLeft={`FREQ: ${paperBaseFrequency.toFixed(3)} × ${paperFreqY.toFixed(3)} | DARK [MULTIPLY ${paperDarkInvert ? 'INV' : 'DIR'}]: ${paperDarkOffsetX.toFixed(2)}px, ${paperDarkOffsetY.toFixed(2)}px (${(paperDarkOpacity * 100).toFixed(2)}%, ${paperDarkGain.toFixed(2)}×) | LIGHT [SCREEN]: ${paperLightOffsetX.toFixed(2)}px, ${paperLightOffsetY.toFixed(2)}px (${(paperLightOpacity * 100).toFixed(2)}%, ${paperLightGain.toFixed(2)}×)`}
                  footerRight="PRINTED MATTER DUAL-RELIEF SUITE"
                />
              </div>

              {/* ─── PRODUCTION CODE EXPORT CARD ─── */}
              <div className="p-4 bg-[var(--gray-900)] text-[var(--gray-100)] font-mono text-xs border border-[var(--border-gray)] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--spectrum-yellow)] uppercase">
                    Production Implementation Code (Dual Blend Modes: Multiply Dark + Screen Light)
                  </span>
                  <button
                    onClick={() => {
                      const darkR = Math.min(1.0, Math.max(0, paperDarkR * (paperDarkWarmth * 0.8 + 0.2)));
                      const darkG = Math.min(1.0, Math.max(0, paperDarkG));
                      const darkB = Math.min(1.0, Math.max(0, paperDarkB / (paperDarkWarmth * 0.8 + 0.2)));
                      const sR = (1 - darkR) * paperDarkOpacity * paperDarkGain * 2;
                      const sG = (1 - darkG) * paperDarkOpacity * paperDarkGain * 2;
                      const sB = (1 - darkB) * paperDarkOpacity * paperDarkGain * 2;
                      const darkValues = paperDarkInvert
                        ? `${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} 0 ${(1 - sR).toFixed(4)}   ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} 0 ${(1 - sG).toFixed(4)}   ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} 0 ${(1 - sB).toFixed(4)}   0 0 0 0 1`
                        : `${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} 0 1   ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} 0 1   ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} 0 1   0 0 0 0 1`;
                      const effScale = (paperLightOpacity * paperLightGain) / Math.max(0.01, 1 - paperLightFloor);
                      const kL = (effScale / 3).toFixed(5);
                      const bL = (-(paperLightFloor * effScale)).toFixed(5);
                      const code = `/* Option 1: SVG feTurbulence Dual-Relief Ground (Multiply Inverted Dark + Screen Light) */
<div className="relative w-full h-full">
  <!-- 1. Dark Shadow Layer: mix-blend-mode: multiply (Valleys darkened into Paper Ground, 0% Lightening on Black Ink) -->
  ${paperDarkEnabled ? `<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: "multiply" }}>
    <filter id="paper-dark-tooth" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="${paperNoiseType}" baseFrequency="${paperBaseFrequency} ${paperFreqY}" numOctaves="${paperOctaves}" result="baseNoise" />
      <feOffset in="baseNoise" dx="${paperDarkOffsetX.toFixed(2)}" dy="${paperDarkOffsetY.toFixed(2)}" result="offsetDark" />
      ${paperDarkBlur > 0 ? `<feGaussianBlur in="offsetDark" stdDeviation="${paperDarkBlur.toFixed(2)}" result="blurredDark" />\n      ` : ""}<feColorMatrix
        in="${paperDarkBlur > 0 ? "blurredDark" : "offsetDark"}"
        type="matrix"
        values="${darkValues}"
        result="darkMultiplyMap"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#paper-dark-tooth)" fill="white" />
  </svg>` : "<!-- Dark Shadow Channel Disabled -->"}

  <!-- 2. Light Highlight Layer: mix-blend-mode: screen (Peaks highlighted on Dark Ink, 0% Darkening on Paper Ground) -->
  ${paperLightEnabled ? `<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: "screen" }}>
    <filter id="paper-light-tooth" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="${paperNoiseType}" baseFrequency="${paperBaseFrequency} ${paperFreqY}" numOctaves="${paperOctaves}" result="baseNoise" />
      <feOffset in="baseNoise" dx="${paperLightOffsetX.toFixed(2)}" dy="${paperLightOffsetY.toFixed(2)}" result="offsetLight" />
      ${paperLightBlur > 0 ? `<feGaussianBlur in="offsetLight" stdDeviation="${paperLightBlur.toFixed(2)}" result="blurredLight" />\n      ` : ""}<feColorMatrix
        in="${paperLightBlur > 0 ? "blurredLight" : "offsetLight"}"
        type="matrix"
        values="${kL} ${kL} ${kL} 0 ${bL}   ${kL} ${kL} ${kL} 0 ${bL}   ${kL} ${kL} ${kL} 0 ${bL}   0 0 0 0 1"
        result="lightScreenMap"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#paper-light-tooth)" fill="black" />
  </svg>` : "<!-- Light Highlight Channel Disabled -->"}
</div>`;
                      copyToClipboard(code);
                    }}
                    className="px-2.5 py-1 bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)] font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Copy size={11} />
                    <span>Copy Production Code</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] text-[var(--gray-300)] p-2 bg-black/40 border border-white/10 font-mono">
                  {`/* Option 1: Dual Blend Modes (Dark: Multiply ${paperDarkInvert ? '[Inverted/Troughs]' : '[Direct]'}, Light: Screen [Peaks] | Freq: ${paperBaseFrequency.toFixed(3)} x ${paperFreqY.toFixed(3)}, ${paperOctaves} oct) */
<!-- Layer 1: Dark Shadows (Multiply) -->
<svg style={{ mixBlendMode: "multiply" }} className="absolute inset-0 w-full h-full pointer-events-none">
  <filter id="paper-dark-tooth">
    <feTurbulence type="${paperNoiseType}" baseFrequency="${paperBaseFrequency} ${paperFreqY}" numOctaves="${paperOctaves}" result="baseNoise" />
    <feOffset in="baseNoise" dx="${paperDarkOffsetX.toFixed(2)}" dy="${paperDarkOffsetY.toFixed(2)}" result="offsetDark" />
    <feColorMatrix in="offsetDark" type="matrix" values="${(() => {
      const darkR = Math.min(1.0, Math.max(0, paperDarkR * (paperDarkWarmth * 0.8 + 0.2)));
      const darkG = Math.min(1.0, Math.max(0, paperDarkG));
      const darkB = Math.min(1.0, Math.max(0, paperDarkB / (paperDarkWarmth * 0.8 + 0.2)));
      const sR = (1 - darkR) * paperDarkOpacity * paperDarkGain * 2;
      const sG = (1 - darkG) * paperDarkOpacity * paperDarkGain * 2;
      const sB = (1 - darkB) * paperDarkOpacity * paperDarkGain * 2;
      return paperDarkInvert
        ? `${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} 0 ${(1 - sR).toFixed(4)}   ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} 0 ${(1 - sG).toFixed(4)}   ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} 0 ${(1 - sB).toFixed(4)}   0 0 0 0 1`
        : `${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} 0 1   ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} 0 1   ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} 0 1   0 0 0 0 1`;
    })()}" />
  </filter>
  <rect width="100%" height="100%" filter="url(#paper-dark-tooth)" fill="white" />
</svg>

<!-- Layer 2: Light Highlights (Screen) -->
<svg style={{ mixBlendMode: "screen" }} className="absolute inset-0 w-full h-full pointer-events-none">
  <filter id="paper-light-tooth">
    <feTurbulence type="${paperNoiseType}" baseFrequency="${paperBaseFrequency} ${paperFreqY}" numOctaves="${paperOctaves}" result="baseNoise" />
    <feOffset in="baseNoise" dx="${paperLightOffsetX.toFixed(2)}" dy="${paperLightOffsetY.toFixed(2)}" result="offsetLight" />
    <feColorMatrix in="offsetLight" type="matrix" values="${(() => {
      const effScale = (paperLightOpacity * paperLightGain) / Math.max(0.01, 1 - paperLightFloor);
      const kL = (effScale / 3).toFixed(5);
      const bL = (-(paperLightFloor * effScale)).toFixed(5);
      return `${kL} ${kL} ${kL} 0 ${bL}   ${kL} ${kL} ${kL} 0 ${bL}   ${kL} ${kL} ${kL} 0 ${bL}   0 0 0 0 1`;
    })()}" />
  </filter>
  <rect width="100%" height="100%" filter="url(#paper-light-tooth)" fill="black" />
</svg>`}
                </pre>
              </div>
            </section>
          </div>
        )}
        </main>

        {/* ─── Global Option 1 Paper Texture Overlay (Dual-Relief Multiply + Screen - Infinite Full-Page Tiling) ─── */}
        <div
          className="absolute inset-0 w-full min-h-full pointer-events-none z-30 transition-opacity duration-150 overflow-hidden"
          style={{ opacity: globalPaperTexture ? 1 : 0 }}
        >
          {/* Global Dark Layer (Multiply - Deep warm shadow valleys on paper, 0% lightening on black) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150"
            style={{
              mixBlendMode: "multiply",
              opacity: paperDarkEnabled ? Math.min(1.0, paperDarkOpacity * paperDarkGain * 3.0) : 0,
            }}
            aria-hidden="true"
          >
            <defs>
              <filter id="pm-global-dark-tooth" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type={paperNoiseType}
                  baseFrequency={`${paperBaseFrequency} ${paperFreqY}`}
                  numOctaves={paperOctaves}
                  result="baseNoise"
                />
                <feOffset in="baseNoise" dx={paperDarkOffsetX} dy={paperDarkOffsetY} result="offsetDark" />
                {paperDarkBlur > 0 && <feGaussianBlur in="offsetDark" stdDeviation={paperDarkBlur} result="blurredDark" />}
                {(() => {
                  const darkR = Math.min(1.0, Math.max(0, paperDarkR * (paperDarkWarmth * 0.8 + 0.2)));
                  const darkG = Math.min(1.0, Math.max(0, paperDarkG));
                  const darkB = Math.min(1.0, Math.max(0, paperDarkB / (paperDarkWarmth * 0.8 + 0.2)));
                  const sR = 1 - darkR;
                  const sG = 1 - darkG;
                  const sB = 1 - darkB;
                  return (
                    <feColorMatrix
                      in={paperDarkBlur > 0 ? "blurredDark" : "offsetDark"}
                      type="matrix"
                      values={
                        paperDarkInvert
                          ? `
                            ${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} ${(sR / 3).toFixed(4)} 0 ${darkR.toFixed(4)}
                            ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} ${(sG / 3).toFixed(4)} 0 ${darkG.toFixed(4)}
                            ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} ${(sB / 3).toFixed(4)} 0 ${darkB.toFixed(4)}
                            0 0 0 0 1
                          `
                          : `
                            ${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} ${(-sR / 3).toFixed(4)} 0 1
                            ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} ${(-sG / 3).toFixed(4)} 0 1
                            ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} ${(-sB / 3).toFixed(4)} 0 1
                            0 0 0 0 1
                          `
                      }
                      result="darkMultiplyMap"
                    />
                  );
                })()}
              </filter>
              <pattern id="pm-dark-tile-pattern" width="1024" height="1024" patternUnits="userSpaceOnUse">
                <rect width="1024" height="1024" filter="url(#pm-global-dark-tooth)" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pm-dark-tile-pattern)" />
          </svg>

          {/* Global Light Layer (Screen - Pure monochromatic bleached fiber highlights on dark ink, 0% darkening on paper) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150"
            style={{
              mixBlendMode: "screen",
              opacity: paperLightEnabled ? Math.min(1.0, paperLightOpacity * paperLightGain * 10.0) : 0,
            }}
            aria-hidden="true"
          >
            <defs>
              <filter id="pm-global-light-tooth" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type={paperNoiseType}
                  baseFrequency={`${paperBaseFrequency} ${paperFreqY}`}
                  numOctaves={paperOctaves}
                  result="baseNoise"
                />
                <feOffset in="baseNoise" dx={paperLightOffsetX} dy={paperLightOffsetY} result="offsetLight" />
                {paperLightBlur > 0 && <feGaussianBlur in="offsetLight" stdDeviation={paperLightBlur} result="blurredLight" />}
                {(() => {
                  const effScale = 1.0 / Math.max(0.01, 1.0 - paperLightFloor);
                  const kL = (effScale / 3).toFixed(5);
                  const bL = (-(paperLightFloor * effScale)).toFixed(5);
                  return (
                    <feColorMatrix
                      in={paperLightBlur > 0 ? "blurredLight" : "offsetLight"}
                      type="matrix"
                      values={`
                        ${kL} ${kL} ${kL} 0 ${bL}
                        ${kL} ${kL} ${kL} 0 ${bL}
                        ${kL} ${kL} ${kL} 0 ${bL}
                        0 0 0 0 1
                      `}
                      result="lightScreenMap"
                    />
                  );
                })()}
              </filter>
              <pattern id="pm-light-tile-pattern" width="1024" height="1024" patternUnits="userSpaceOnUse">
                <rect width="1024" height="1024" filter="url(#pm-global-light-tooth)" fill="black" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pm-light-tile-pattern)" />
          </svg>
        </div>

        {copiedToken && (
          <div className="fixed bottom-4 right-4 bg-[var(--gray-900)] text-white text-xs font-mono px-3 py-1.5 border border-[var(--spectrum-yellow)] shadow-lg z-50 flex items-center gap-2">
            <Check size={12} className="text-[var(--spectrum-yellow)]" />
            <span>COPIED: {copiedToken}</span>
          </div>
        )}
      </div>
    );
  }
