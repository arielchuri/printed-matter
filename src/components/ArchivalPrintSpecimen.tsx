import React from "react";

export interface ArchivalPrintSpecimenProps {
  title?: string;
  badgeText?: string;
  subtitle?: string;
  mode?: "compact" | "full";
  className?: string;
  children?: React.ReactNode;
  footerLeft?: string;
  footerRight?: string;
}

export const ArchivalPrintSpecimen: React.FC<ArchivalPrintSpecimenProps> = ({
  title = "ARCHIVAL SPECIMEN",
  badgeText = "ED. 1954",
  subtitle = "Mould-Made Ground, Halftone Penetration & Overprint Mechanics",
  mode = "compact",
  className = "",
  children,
  footerLeft,
  footerRight,
}) => {
  if (mode === "compact") {
    return (
      <div
        className={`p-5 bg-[var(--white)] border-2 border-[var(--border-gray)] relative overflow-hidden flex flex-col justify-between select-none min-h-[460px] ${className}`}
      >
        {/* Injected Paper Texture Layer */}
        {children}

        <div className="relative z-0 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-gray)]/40 font-mono text-[11px]">
            <span className="font-bold text-[var(--primary-600)] uppercase tracking-wider">
              {title}
            </span>
            <span className="bg-[var(--primary-500)] text-white px-1.5 py-0.5 text-[9px] font-bold">
              {badgeText}
            </span>
          </div>

          {/* Typography Headline */}
          <div>
            <h4 className="text-2xl font-black tracking-tighter uppercase text-[var(--gray-900)] leading-none ink-squash-text">
              TYPOGRAPHIA & IMPRESSIO
            </h4>
            <p className="text-[10px] font-mono text-[var(--gray-800)] mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Section 1: Field of Solid Black & Step Wedge */}
          <div className="p-2.5 bg-[var(--gray-900)] text-white font-mono text-[10px] border border-[var(--gray-900)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-[var(--spectrum-yellow)]">100% BLACK COVERAGE</span>
              <span className="text-[8px] text-[var(--gray-400)]">CARBON PIGMENT</span>
            </div>
            <div className="text-[9px] text-[var(--gray-300)] leading-tight mb-2">
              Deep relief ink meniscus over micro-tooth.
            </div>
            {/* Density step wedge */}
            <div className="grid grid-cols-6 h-4 border border-white/20 text-[7px] text-center font-bold">
              <div className="bg-black text-white flex items-center justify-center">100%</div>
              <div className="bg-zinc-800 text-white flex items-center justify-center">80%</div>
              <div className="bg-zinc-600 text-white flex items-center justify-center">60%</div>
              <div className="bg-zinc-400 text-black flex items-center justify-center">40%</div>
              <div className="bg-zinc-200 text-black flex items-center justify-center">20%</div>
              <div className="bg-zinc-100 text-black flex items-center justify-center">5%</div>
            </div>
          </div>

          {/* Section 2: Color Fields & Overprint Trapping */}
          <div className="grid grid-cols-2 gap-2">
            {/* Color swatches */}
            <div className="p-2 bg-[var(--surface-muted)] border border-[var(--border-gray)] font-mono text-[9px]">
              <div className="font-bold text-[var(--gray-900)] mb-1">COLOR FIELDS</div>
              <div className="grid grid-cols-2 gap-1 text-[8px] text-white font-bold text-center">
                <div className="h-5 bg-[var(--primary-500)] flex items-center justify-center">#6EA3BE</div>
                <div className="h-5 bg-[var(--spectrum-red)] flex items-center justify-center">#E65E59</div>
                <div className="h-5 bg-[var(--spectrum-yellow)] text-[var(--gray-900)] flex items-center justify-center">#FACC15</div>
                <div className="h-5 bg-[var(--spectrum-green)] flex items-center justify-center">#047857</div>
              </div>
            </div>

            {/* Overprint ink trap */}
            <div className="p-2 bg-[var(--surface-muted)] border border-[var(--border-gray)] font-mono text-[9px] relative overflow-hidden flex flex-col justify-between">
              <div className="font-bold text-[var(--gray-900)]">OVERPRINT TRAP</div>
              <div className="flex items-center justify-center gap-1 my-1 relative h-6">
                <div className="w-6 h-6 rounded-full bg-[var(--primary-500)] opacity-85 absolute -left-0.5 mix-blend-multiply" />
                <div className="w-6 h-6 rounded-full bg-[var(--spectrum-yellow)] opacity-85 absolute left-3 mix-blend-multiply" />
                <div className="w-6 h-6 rounded-full bg-[var(--spectrum-red)] opacity-85 absolute left-6.5 mix-blend-multiply" />
              </div>
              <div className="text-[7px] text-[var(--text-muted)] text-right">CYAN × YEL × MAG</div>
            </div>
          </div>

          {/* Section 3: Body Copy with Drop Cap & Graphic */}
          <div className="p-2.5 bg-[var(--surface)] border border-[var(--border-gray)] flex gap-2.5 items-start">
            {/* Mini Graphic Crest */}
            <svg
              className="w-12 h-12 flex-shrink-0 text-[var(--gray-900)]"
              viewBox="0 0 60 60"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="30" cy="30" r="28" strokeWidth="1" />
              <circle cx="30" cy="30" r="20" strokeWidth="0.75" strokeDasharray="2 2" />
              <circle cx="30" cy="30" r="10" strokeWidth="1.5" />
              <line x1="30" y1="2" x2="30" y2="58" strokeWidth="0.5" />
              <line x1="2" y1="30" x2="58" y2="30" strokeWidth="0.5" />
              <polygon points="30,12 36,26 50,30 36,34 30,48 24,34 10,30 24,26" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="0.75" />
            </svg>

            {/* Editorial snippet */}
            <div className="text-[9px] leading-[1.35] text-[var(--gray-800)] font-serif">
              <span className="float-left text-2xl font-bold font-serif leading-none pr-1 text-[var(--spectrum-red)] ink-squash-text">
                W
              </span>
              hen viscous pigment meets uncalendered cotton rag, microscopic capillary forces draw ink into paper tooth, producing soft tactile edges.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2 border-t border-[var(--border-gray)]/40 flex justify-between font-mono text-[9px] text-[var(--text-muted)] relative z-0">
          <span>{footerLeft || "GROUND: STONE-100 PHYSICAL TOOTH"}</span>
          <span>{footerRight || "0 KB PAYLOAD"}</span>
        </div>
      </div>
    );
  }

  // Mode === "full" (Large Specimen Sheet)
  return (
    <div
      className={`p-8 bg-[var(--white)] border-2 border-[var(--primary-500)] relative overflow-hidden select-none shadow-md ${className}`}
    >
      {/* Injected Paper Texture Layer */}
      {children}

      <div className="relative z-0 space-y-6">
        {/* Header / Masthead */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-[var(--gray-900)] gap-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--primary-600)] font-bold">
              <span>⌖ ARCHIVAL SPECIMEN NO. 4</span>
              <span>•</span>
              <span>1200 DPI MOULD-MADE PROOF</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--gray-900)] uppercase mt-1 leading-none ink-squash-text">
              {title}
            </h3>
            <p className="text-xs font-mono text-[var(--gray-700)] mt-1">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 font-mono text-xs">
            <span className="bg-[var(--gray-900)] text-white px-2 py-1 font-bold">
              {badgeText}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              CALENDER: UNPRESSED RAG
            </span>
          </div>
        </div>

        {/* Row 1: Field of Solid Black & Full Color Spectrum */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Field of Black (5 cols) */}
          <div className="lg:col-span-5 p-5 bg-[var(--gray-900)] text-white font-mono flex flex-col justify-between border border-[var(--gray-900)] shadow-inner">
            <div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/20 mb-3">
                <span className="font-bold text-[var(--spectrum-yellow)] uppercase">
                  Field of Solid Deep Black
                </span>
                <span className="bg-white/10 text-[10px] px-1.5 py-0.5 text-white">
                  100% K
                </span>
              </div>
              <div className="text-2xl font-black tracking-tighter uppercase mb-1">
                CARBON BLACK INK
              </div>
              <p className="text-xs text-[var(--gray-300)] leading-relaxed font-sans mb-4">
                Heavy viscous carbon-black pigment completely covering the ground. The texture visible through this slab tests the substrate tooth under 100% ink laydown.
              </p>
            </div>

            {/* Halftone Density Wedge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-[var(--gray-400)] font-bold">
                <span>HALFTONE DENSITY RAMP</span>
                <span>K-CHANNEL</span>
              </div>
              <div className="grid grid-cols-7 h-7 border border-white/30 text-[9px] font-bold text-center">
                <div className="bg-black text-white flex items-center justify-center">100%</div>
                <div className="bg-zinc-800 text-white flex items-center justify-center">85%</div>
                <div className="bg-zinc-600 text-white flex items-center justify-center">70%</div>
                <div className="bg-zinc-400 text-black flex items-center justify-center">50%</div>
                <div className="bg-zinc-300 text-black flex items-center justify-center">30%</div>
                <div className="bg-zinc-200 text-black flex items-center justify-center">15%</div>
                <div className="bg-zinc-100 text-black flex items-center justify-center">5%</div>
              </div>
            </div>
          </div>

          {/* Color Palette Fields & Overprint Trapping (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Color Swatch Bars */}
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-gray)]">
              <div className="flex justify-between items-center font-mono text-xs font-bold mb-2">
                <span className="text-[var(--gray-900)] uppercase">Fields of Pure Color</span>
                <span className="text-[var(--text-muted)] text-[10px]">SOLID ARCHIVAL PIGMENTS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-white font-mono text-xs font-bold text-center">
                <div className="p-3 bg-[var(--primary-500)] flex flex-col justify-center items-center shadow-sm">
                  <span className="text-sm">ITTEN BLUE</span>
                  <span className="text-[10px] opacity-80">#6EA3BE</span>
                </div>
                <div className="p-3 bg-[var(--spectrum-red)] flex flex-col justify-center items-center shadow-sm">
                  <span className="text-sm">CRIMSON</span>
                  <span className="text-[10px] opacity-80">#E65E59</span>
                </div>
                <div className="p-3 bg-[var(--spectrum-yellow)] text-[var(--gray-900)] flex flex-col justify-center items-center shadow-sm">
                  <span className="text-sm">YELLOW</span>
                  <span className="text-[10px] opacity-80">#FACC15</span>
                </div>
                <div className="p-3 bg-[var(--spectrum-green)] flex flex-col justify-center items-center shadow-sm">
                  <span className="text-sm">EMERALD</span>
                  <span className="text-[10px] opacity-80">#047857</span>
                </div>
              </div>
            </div>

            {/* Overprint Trapping & Ink Fusion */}
            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-gray)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs max-w-xs">
                <div className="font-bold text-[var(--gray-900)] uppercase mb-1">
                  Multi-Pass Ink Overprint Trapping
                </div>
                <p className="text-[11px] text-[var(--gray-700)] font-sans">
                  Translucent primary inks blend optically on the paper fiber to form secondary hues (Cyan + Yellow = Green, Magenta + Cyan = Violet).
                </p>
              </div>

              {/* Overlapping Circles */}
              <div className="relative w-44 h-20 flex items-center justify-center flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-500)] opacity-85 absolute left-1 mix-blend-multiply flex items-center justify-center text-white text-[9px] font-bold font-mono">
                  BLUE
                </div>
                <div className="w-16 h-16 rounded-full bg-[var(--spectrum-yellow)] opacity-85 absolute left-14 mix-blend-multiply flex items-center justify-center text-[var(--gray-900)] text-[9px] font-bold font-mono">
                  YEL
                </div>
                <div className="w-16 h-16 rounded-full bg-[var(--spectrum-red)] opacity-85 absolute left-26 mix-blend-multiply flex items-center justify-center text-white text-[9px] font-bold font-mono">
                  RED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Vector Graphic Specimen & Fine Line Weights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 bg-[var(--surface)] border border-[var(--border-gray)] items-center">
          {/* Detailed Graphic Emblem (4 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-2">
            <svg
              className="w-full max-w-[220px] aspect-square text-[var(--gray-900)]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
            >
              {/* Outer circular scale */}
              <circle cx="50" cy="50" r="46" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="42" strokeWidth="0.5" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="34" strokeWidth="1" />
              
              {/* Radiating angles */}
              <line x1="50" y1="4" x2="50" y2="96" strokeWidth="0.5" />
              <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.5" />
              <line x1="17" y1="17" x2="83" y2="83" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="17" y1="83" x2="83" y2="17" strokeWidth="0.5" strokeDasharray="2 2" />
              
              {/* Central Geometric Bauhaus Star */}
              <polygon
                points="50,18 58,42 82,50 58,58 50,82 42,58 18,50 42,42"
                fill="currentColor"
                opacity="0.12"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <circle cx="50" cy="50" r="8" fill="var(--primary-500)" stroke="none" />
              <circle cx="50" cy="50" r="4" fill="white" stroke="none" />
              <circle cx="50" cy="50" r="2" fill="var(--gray-900)" stroke="none" />

              {/* Cross-hatching quadrant */}
              <path d="M 50 18 L 82 50" stroke="currentColor" strokeWidth="0.75" />
              <path d="M 50 24 L 76 50" stroke="currentColor" strokeWidth="0.75" />
              <path d="M 50 30 L 70 50" stroke="currentColor" strokeWidth="0.75" />
              <path d="M 50 36 L 64 50" stroke="currentColor" strokeWidth="0.75" />
            </svg>
            <span className="font-mono text-[9px] text-[var(--text-muted)] mt-2">
              FIGURE 1.1 — GEOMETRIC VECTOR ROSETTE
            </span>
          </div>

          {/* Line Weights & Hairlines (7 cols) */}
          <div className="lg:col-span-7 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-1 border-b border-[var(--border-gray)]">
              <span className="font-bold text-[var(--gray-900)] uppercase">
                Hairline & Stroke Weight Ladder
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">VECTOR RESOLUTION</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">0.25 pt</span>
                <div className="flex-1 h-[0.5px] bg-[var(--gray-900)]" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">0.50 pt</span>
                <div className="flex-1 h-[1px] bg-[var(--gray-900)]" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">0.75 pt</span>
                <div className="flex-1 h-[1.5px] bg-[var(--primary-600)]" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">1.00 pt</span>
                <div className="flex-1 h-[2px] bg-[var(--gray-900)]" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">1.50 pt</span>
                <div className="flex-1 h-[3px] bg-[var(--spectrum-red)]" />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold">2.00 pt</span>
                <div className="flex-1 h-[4px] bg-[var(--gray-900)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Rich Editorial Body Copy & Typography Specimen */}
        <div className="p-6 bg-[var(--surface-muted)] border border-[var(--border-gray)] space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border-gray)] font-mono text-xs">
            <span className="font-bold text-[var(--gray-900)] uppercase">
              Typographic Body Copy & Micro-Impressions
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              SET IN ANTIQUA & GROTESK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--gray-800)] font-serif leading-relaxed">
            <div>
              <p>
                <span className="float-left text-5xl font-black font-serif leading-none pr-3 pt-1 text-[var(--spectrum-red)] ink-squash-text">
                  T
                </span>
                he physical materiality of printed matter is established through the interaction of viscous ink with the uncalendered fibers of cotton paper. Under the mechanical pressure of letterpress cylinder or lithographic blanket, ink does not merely deposit as a dry geometric boundary—it diffuses into the micro-cavities of the sheet.
              </p>
            </div>
            <div>
              <p>
                Unlike glass screens that illuminate pixels uniformly from beneath, printed artifacts rely entirely upon ambient light bouncing off the micro-relief of ink meniscus and laid paper ribs. This tactile variance between opaque carbon black coverage, delicate halftone tints, and exposed ground is the essence of archival print craftsmanship.
              </p>
            </div>
          </div>

          {/* Colophon & Tabular Figures */}
          <div className="pt-3 border-t border-[var(--border-gray)]/60 flex flex-wrap justify-between items-center font-mono text-[10px] text-[var(--text-muted)] gap-2">
            <span>FIGURES: 0 1 2 3 4 5 6 7 8 9</span>
            <span>ALPHABET: ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
            <span className="font-bold text-[var(--gray-900)]">⌖ REGISTRATION: 100% PASS</span>
          </div>
        </div>

        {/* Specimen Footer */}
        <div className="pt-3 border-t-2 border-[var(--gray-900)] flex justify-between font-mono text-[11px] text-[var(--gray-800)] font-bold">
          <span>{footerLeft || "SUBSTRATE: 320 GSM 100% COTTON MOULD-MADE"}</span>
          <span>{footerRight || "PRINTED MATTER DESIGN SYSTEM"}</span>
        </div>
      </div>
    </div>
  );
};
