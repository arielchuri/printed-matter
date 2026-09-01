import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  Tabs,
  SearchBox,
  ChevronToggle,
  DataReadout,
  TreeNode,
  PatternSwatch,
  ColorChip,
} from "./components";
import { COLOR_SWATCHES, PRINTED_MATTER_TOKENS, getContrastRatio, getWCAGGrade } from "../tokens/tokens";
import { Layers, Type, Sliders, MapPin, Sparkles, Check, Copy } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("tokens");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState<string>("The quick brown fox jumps over the lazy dog");
  const [selectedAdminLevel, setSelectedAdminLevel] = useState<string>("ADM1");
  const [searchVal, setSearchVal] = useState<string>("Turkana County");
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>("adm1-1");

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
    <div className="min-h-screen bg-[#EFECE6] text-[#222D2C] font-sans selection:bg-[#1A66A6] selection:text-white">
      {/* ─── Header ────────────────────────────────────────────── */}
      <header className="border-b border-[#222D2C] bg-[#1A66A6] text-[#FFFFFF] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black/40 text-white tracking-widest uppercase">
            DS-01
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-[#FFFFFF] m-0 leading-none">
            PRINTED MATTER
          </h1>
          <span className="text-xs text-[#FFFFFF]/70 font-mono hidden sm:inline">
            // v1.0.0 (Ink on Paper)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-white text-[#1A66A6] px-2 py-0.5 font-bold">
            WARM XEROX #EFECE6
          </span>
        </div>
      </header>

      {/* ─── Sub-Navigation Tabs ────────────────────────────────── */}
      <div className="bg-[#DFDDD7] border-b border-[#222D2C] px-6">
        <Tabs
          tabs={[
            { id: "tokens", label: "Design Tokens & Spectrum", icon: <Layers size={14} /> },
            { id: "typography", label: "Typography & Type Specimen", icon: <Type size={14} /> },
            { id: "components", label: "Components & Controls", icon: <Sliders size={14} /> },
            { id: "cartography", label: "Cartography & Chrome", icon: <MapPin size={14} /> },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* ─── Main Content Container ────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* =========================================================
            TAB 1: DESIGN TOKENS & SPECTRUM
            ========================================================= */}
        {activeTab === "tokens" && (
          <div className="flex flex-col gap-8">
            <section>
              <div className="flex items-baseline justify-between border-b border-[#222D2C] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">The Printed Spectrum</h2>
                  <p className="text-sm text-[#5B6360] mt-0.5">
                    Seven spot inks printed on warm xerox stock. Click any swatch to copy its CSS token.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#5B6360]">7 SPOT INKS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
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
              <div className="flex items-baseline justify-between border-b border-[#222D2C] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Derived Neutrals (Slate Ink Scale)</h2>
                  <p className="text-sm text-[#5B6360] mt-0.5">
                    Multiplication of paper stock (#EFECE6) with slate ink (#222D2C). Warmth carries through the scale.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#5B6360]">10 NEUTRALS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {COLOR_SWATCHES.filter((s) => s.category === "neutral").map((swatch) => (
                  <ColorChip
                    key={swatch.cssVar}
                    token={swatch.cssVar}
                    name={swatch.name.replace("gray-", "G").toUpperCase()}
                    value={swatch.value}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-baseline justify-between border-b border-[#222D2C] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Surfaces & Primary Blue</h2>
                  <p className="text-sm text-[#5B6360] mt-0.5">
                    Canonical single blue (#1A66A6), warm xerox ground, and knockout pure white.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#5B6360]">CORE FOUNDATIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ColorChip
                  token="--white"
                  name="WARM XEROX STOCK (PAPER)"
                  value="#EFECE6"
                  description="The primary page and canvas ground. Soft unbleached stock."
                />
                <ColorChip
                  token="--true-white"
                  name="KNOCKOUT PURE WHITE"
                  value="#FFFFFF"
                  description="Strictly for readouts, search boxes, and high-contrast cutouts."
                />
                <ColorChip
                  token="--primary-500"
                  name="PRINTED MATTER BLUE"
                  value="#1A66A6"
                  description="The single authoritative brand blue. Lighter tints are paper."
                />
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 2: TYPOGRAPHY SPECIMEN
            ========================================================= */}
        {activeTab === "typography" && (
          <div className="flex flex-col gap-8">
            <section className="bg-[#FFFFFF] border border-[#222D2C] p-6" style={{ borderRadius: 0 }}>
              <div className="flex items-baseline justify-between border-b border-[#222D2C]/20 pb-3 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A66A6]">
                  Interactive Type Tester
                </h3>
                <span className="text-xs font-mono text-[#5B6360]">INTER &amp; JETBRAINS MONO</span>
              </div>

              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type custom text to preview scale..."
                className="w-full bg-[#EFECE6] border border-[#222D2C] p-3 text-sm mb-6 focus:border-[#1A66A6] focus:outline-none"
                style={{ borderRadius: 0 }}
              />

              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    Display Poster / 6rem (90px) / Weight 800
                  </span>
                  <div className="ds-display text-[#222D2C] overflow-hidden truncate">
                    {sampleText || "PRINTED MATTER"}
                  </div>
                </div>

                <div className="border-t border-[#222D2C]/10 pt-4">
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    H1 Headline / 4rem (60px) / Weight 800
                  </span>
                  <h1 className="ds-h1 text-[#222D2C] overflow-hidden truncate">
                    {sampleText || "National Administrative Overview"}
                  </h1>
                </div>

                <div className="border-t border-[#222D2C]/10 pt-4">
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    H2 Section Head / 2.75rem (41px) / Weight 700
                  </span>
                  <h2 className="ds-h2 text-[#222D2C] overflow-hidden truncate">
                    {sampleText || "Subnational Demographic Analysis"}
                  </h2>
                </div>

                <div className="border-t border-[#222D2C]/10 pt-4">
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    H3 Subsection / 1.85rem (28px) / Weight 800
                  </span>
                  <h3 className="ds-h3 text-[#222D2C]">
                    {sampleText || "Water Access &amp; Primary Sanitation Indicators"}
                  </h3>
                </div>

                <div className="border-t border-[#222D2C]/10 pt-4">
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    H4 Uppercase Category / 1.35rem (20px) / Weight 700 / Spaced
                  </span>
                  <h4 className="ds-h4 text-[#222D2C]">
                    {sampleText || "ADMINISTRATIVE BOUNDARY LEVEL 2"}
                  </h4>
                </div>

                <div className="border-t border-[#222D2C]/10 pt-4">
                  <span className="text-xs font-mono text-[#5B6360] uppercase block mb-1">
                    Technical Metadata / JetBrains Mono / Tabular Numbers
                  </span>
                  <p className="font-mono text-sm text-[#222D2C] tabular-nums bg-[#EFECE6] p-3 border border-[#222D2C]">
                    COORDINATES: 00°01&apos;25&quot;N 037°54&apos;22&quot;E | ELEV: 1,240.50m | TIME: 15:42:09 UTC | RESOLUTION: 0.005°
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 3: COMPONENTS & CONTROLS
            ========================================================= */}
        {activeTab === "components" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Buttons & Interaction */}
            <div className="flex flex-col gap-6">
              <Card title="Buttons & Pressed State" badge={<Badge color="green">TACTILE PRESS</Badge>}>
                <p className="text-xs text-[#5B6360] mb-4">
                  Zero bevels, zero elevation. When clicked, buttons flash <strong>solid green (#54C93F)</strong> while held.
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary">Primary Blue</Button>
                  <Button variant="secondary">Rule Button</Button>
                  <Button variant="danger">Danger Red</Button>
                  <Button disabled>Disabled</Button>
                </div>

                <div className="mt-4 pt-4 border-t border-[#222D2C]/20 flex flex-wrap gap-2 items-center">
                  <Button size="sm" variant="primary">Small</Button>
                  <Button size="md" variant="primary">Medium</Button>
                  <Button size="lg" variant="primary">Large Action</Button>
                </div>
              </Card>

              <Card title="Form Inputs & Search" badge={<Badge color="blue">HAIRLINE FRAMES</Badge>}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5B6360] uppercase block mb-1">Search Component</label>
                    <SearchBox
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      onClear={() => setSearchVal("")}
                      placeholder="Search boundaries or indicators..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B6360] uppercase block mb-1">Administrative Level Filter</label>
                    <div className="flex gap-2">
                      {["ADM0", "ADM1", "ADM2", "ADM3"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setSelectedAdminLevel(lvl)}
                          className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                            selectedAdminLevel === lvl
                              ? "bg-[#1A66A6] text-white border border-[#1A66A6]"
                              : "bg-white text-[#222D2C] border border-[#222D2C] hover:bg-[#EFECE6]"
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
            </div>

            {/* Column 2: Hierarchical Tree & Badges */}
            <div className="flex flex-col gap-6">
              <Card title="Hierarchical Location Tree" badge={<Badge variant="level">C A1 A2</Badge>}>
                <p className="text-xs text-[#5B6360] mb-3">
                  Margin-indented administrative structure with square toggle boxes.
                </p>
                <div className="bg-[#EFECE6] p-2 border border-[#222D2C]">
                  <TreeNode
                    node={sampleTree}
                    selectedId={selectedTreeNode}
                    onSelect={(node) => setSelectedTreeNode(node.id)}
                  />
                </div>
              </Card>

              <Card title="Badges & Spectrum Tags">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="level">ADM0</Badge>
                    <Badge variant="level">ADM1</Badge>
                    <Badge variant="level">ADM2</Badge>
                    <Badge variant="level">ADM3</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
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
            TAB 4: CARTOGRAPHY & CHROME
            ========================================================= */}
        {activeTab === "cartography" && (
          <div className="flex flex-col gap-8">
            <Card title="Split Telemetry Readout Dock" badge={<Badge color="blue">LIVE DOCK</Badge>}>
              <p className="text-xs text-[#5B6360] mb-4">
                Ink-on-white status dock separating geographic place facts from camera attitude and solar time.
              </p>
              <DataReadout />
            </Card>

            <section>
              <div className="flex items-baseline justify-between border-b border-[#222D2C] pb-2 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0">Single-Ink Cartographic Patterns</h2>
                  <p className="text-sm text-[#5B6360] mt-0.5">
                    Hatching, crosshatching, and stippling drawn in single slate ink over paper stock.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#5B6360]">6 OVERLAYS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <PatternSwatch type="solid" label="Solid Ink" description="100% Slate #222D2C" />
                <PatternSwatch type="hatch-45" label="45° Hatch" description="Diagonal linear rule" />
                <PatternSwatch type="hatch-135" label="135° Counter" description="Opposing linear rule" />
                <PatternSwatch type="crosshatch" label="Crosshatch" description="Dense grid overlay" />
                <PatternSwatch type="dots" label="Dot Matrix" description="Regular point grid" />
                <PatternSwatch type="stipple" label="Stipple" description="Organic noise scatter" />
              </div>
            </section>

            <Card title="Map Control Rules: On-Map vs. On-Paper" badge={<Badge color="green">CANVAS RULE</Badge>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#222D2C] text-white">
                  <span className="text-xs font-mono font-bold block mb-2 text-[#F4D35A]">
                    STANDING ON MAP IMAGERY (BORDERLESS)
                  </span>
                  <p className="text-xs text-[#DFDDD7] mb-3">
                    Controls standing on satellite or terrain imagery are <strong>borderless ink-on-white</strong> to avoid visual border conflict.
                  </p>
                  <div className="flex gap-1">
                    <Button variant="map-control" isActive>+</Button>
                    <Button variant="map-control">−</Button>
                    <Button variant="map-control">⌖</Button>
                    <Button variant="map-control">◷</Button>
                  </div>
                </div>

                <div className="p-4 bg-[#EFECE6] border border-[#222D2C]">
                  <span className="text-xs font-mono font-bold block mb-2 text-[#1A66A6]">
                    STANDING ON PAPER STOCK (HAIRLINE)
                  </span>
                  <p className="text-xs text-[#5B6360] mb-3">
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
      </main>
    </div>
  );
}
