import React, { useState } from "react";
import { PrinterSymbol } from "../data/printersSymbols";
import { Check, Copy, Download, X, Maximize2, Sparkles, Layers } from "lucide-react";
import { PRIMARY_PALETTE } from "../App";

interface SvgCodeInspectorModalProps {
  symbol: PrinterSymbol | null;
  isOpen: boolean;
  onClose: () => void;
  activeColor: string;
  onSelectColor: (color: string) => void;
  copiedId: string | null;
  onCopySvg: (symbol: PrinterSymbol) => void;
}

export const SvgCodeInspectorModal: React.FC<SvgCodeInspectorModalProps> = ({
  symbol,
  isOpen,
  onClose,
  activeColor,
  onSelectColor,
  copiedId,
  onCopySvg,
}) => {
  const [bgMode, setBgMode] = useState<"paper" | "dark" | "grid">("paper");
  const [previewScale, setPreviewScale] = useState<number>(1.5);

  if (!isOpen || !symbol) return null;

  const isCopied = copiedId === symbol.id;

  const handleDownload = () => {
    const blob = new Blob([symbol.svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${symbol.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[var(--white)] border-2 border-[var(--border-gray)] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
        style={{ borderRadius: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Modal Header ────────────────────────────────────────── */}
        <div className="bg-[var(--primary-500)] text-white px-5 py-3.5 flex items-center justify-between border-b border-[var(--border-gray)]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-black/30 tracking-wider uppercase">
              {symbol.categoryLabel}
            </span>
            <h3 className="font-bold text-base tracking-tight m-0 text-white font-mono flex items-center gap-2">
              <span>{symbol.name}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/20 text-white transition-colors"
            style={{ borderRadius: 0 }}
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Modal Subheader Bar ─────────────────────────────────── */}
        <div className="px-5 py-2.5 bg-[var(--surface-muted)] border-b border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-2">
          <div>
            <span className="font-bold text-[var(--text)]">PROVENANCE &amp; ERA:</span>{" "}
            <span>{symbol.era}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--text)]">VIEWBOX:</span>
            <code className="bg-[var(--white)] px-1.5 py-0.5 border border-[var(--border-gray)]/40 text-[11px]">
              {symbol.viewBox}
            </code>
          </div>
        </div>

        {/* ─── Modal Body ─────────────────────────────────────────── */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Scalable Preview & Ink Swatches (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-[var(--text)] uppercase block mb-1">
                Live Press Render Preview:
              </span>
              <p className="text-xs text-[var(--text-muted)] mb-2">
                {symbol.description}
              </p>
            </div>

            {/* Preview Box */}
            <div
              className={`relative h-56 w-full border border-[var(--border-gray)] flex items-center justify-center p-6 overflow-hidden transition-colors ${
                bgMode === "paper"
                  ? "bg-[var(--white)]"
                  : bgMode === "dark"
                  ? "bg-[var(--gray-900)] text-white"
                  : "bg-[var(--surface)] bg-[radial-gradient(var(--border-gray)_1px,transparent_1px)] [background-size:12px_12px]"
              }`}
            >
              <div
                className="transition-transform flex items-center justify-center text-[var(--text)]"
                style={{
                  transform: `scale(${previewScale})`,
                  color: bgMode === "dark" && activeColor === "var(--gray-900)" ? "var(--white)" : activeColor,
                }}
                dangerouslySetInnerHTML={{ __html: symbol.svgMarkup }}
              />

              {/* Scale Indicator */}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-white font-mono text-[9px]">
                {previewScale}x SCALE
              </div>
            </div>

            {/* Canvas Controls */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block mb-1 font-bold">CANVAS GROUND:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setBgMode("paper")}
                    className={`px-2 py-1 flex-1 text-[10px] font-bold border ${
                      bgMode === "paper"
                        ? "bg-[var(--gray-900)] text-white border-[var(--gray-900)]"
                        : "bg-[var(--white)] border-[var(--border-gray)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    PAPER
                  </button>
                  <button
                    onClick={() => setBgMode("dark")}
                    className={`px-2 py-1 flex-1 text-[10px] font-bold border ${
                      bgMode === "dark"
                        ? "bg-[var(--gray-900)] text-white border-[var(--gray-900)]"
                        : "bg-[var(--white)] border-[var(--border-gray)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    DARK
                  </button>
                  <button
                    onClick={() => setBgMode("grid")}
                    className={`px-2 py-1 flex-1 text-[10px] font-bold border ${
                      bgMode === "grid"
                        ? "bg-[var(--gray-900)] text-white border-[var(--gray-900)]"
                        : "bg-[var(--white)] border-[var(--border-gray)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    GRID
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[var(--text-muted)] block mb-1 font-bold">PREVIEW SCALE:</span>
                <div className="flex gap-1">
                  {[1, 1.5, 2, 2.5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPreviewScale(s)}
                      className={`px-1.5 py-1 flex-1 text-[10px] font-bold border ${
                        previewScale === s
                          ? "bg-[var(--primary-500)] text-white border-[var(--primary-500)]"
                          : "bg-[var(--white)] border-[var(--border-gray)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spot Ink Selector */}
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] block mb-1.5 font-bold">
                PRESS INK FOR PREVIEW:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRIMARY_PALETTE.map((pal) => (
                  <button
                    key={pal.name}
                    onClick={() => onSelectColor(pal.hex)}
                    className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                      activeColor === pal.hex ? "border-black ring-2 ring-[var(--gray-900)] shadow-sm" : "border-black/30 hover:border-black hover:opacity-90"
                    }`}
                    style={{ backgroundColor: pal.hex, borderRadius: 0 }}
                    title={pal.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean SVG XML Code & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--text)] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[var(--spectrum-green)] inline-block" />
                  Standard SVG XML Source Code:
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {symbol.svgMarkup.length} chars &bull; Standalone Vector
                </span>
              </div>

              {/* Code Box */}
              <div className="relative">
                <pre className="p-4 bg-[var(--surface-muted)] border border-[var(--border-gray)] font-mono text-xs text-[var(--text)] overflow-x-auto max-h-72 leading-relaxed selection:bg-[var(--primary-500)] selection:text-white">
                  <code>{symbol.svgMarkup}</code>
                </pre>
              </div>

              <p className="text-[11px] text-[var(--text-muted)] mt-2 font-mono leading-snug">
                &bull; Ready for 1-click paste into HTML5, React JSX (<code className="text-[10px] bg-[var(--surface-muted)] px-1">dangerouslySetInnerHTML</code> or direct SVG element), or vector tools (Figma, Illustrator).
              </p>
            </div>

            {/* Action Buttons Bar */}
            <div className="pt-4 mt-4 border-t border-[var(--border-gray)]/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">TAGS:</span>
                <div className="flex flex-wrap gap-1">
                  {symbol.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-[var(--surface-muted)] text-[10px] font-mono text-[var(--text)] border border-[var(--border-gray)]/30"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-2 bg-[var(--white)] text-[var(--text)] border border-[var(--border-gray)] font-mono text-xs font-bold hover:bg-[var(--surface)] flex items-center gap-1.5 transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .svg</span>
                </button>

                <button
                  onClick={() => onCopySvg(symbol)}
                  className={`px-4 py-2 font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCopied
                      ? "bg-[var(--success-color)] text-white border border-[var(--success-color)]"
                      : "bg-[var(--primary-500)] text-white border border-[var(--primary-500)] hover:bg-[var(--primary-600)]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED SVG!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY SVG CODE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
