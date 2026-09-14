import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { getContrastRatio, getWCAGGrade, isLight } from "@tokens/tokens";
import { Copy, Check } from "lucide-react";

export interface ColorChipProps {
  token: string;
  name: string;
  value: string;
  description?: string;
  onCopy?: (text: string) => void;
}

export const ColorChip: React.FC<ColorChipProps> = ({ token, name, value, description }) => {
  const [copied, setCopied] = useState(false);
  const [computedVal, setComputedVal] = useState(value);
  const [paperGround, setPaperGround] = useState("#F5F5F4");

  useEffect(() => {
    const updateLive = () => {
      if (typeof window !== "undefined") {
        const live = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
        if (live) setComputedVal(live);
        const liveGround = getComputedStyle(document.documentElement).getPropertyValue("--white").trim();
        if (liveGround) setPaperGround(liveGround);
      }
    };
    updateLive();

    const observer = new MutationObserver(updateLive);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => observer.disconnect();
  }, [token]);

  const hexShown = computedVal || value;
  const contrastWithPaper = getContrastRatio(hexShown, paperGround);
  const wcag = getWCAGGrade(contrastWithPaper);
  const isLightGround = isLight(hexShown);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      onClick={handleCopy}
      className="flex flex-col bg-[var(--white)] cursor-pointer hover:translate-y-[-2px] transition-transform group relative"
      style={{ borderRadius: 0 }}
    >
      <div
        className="h-20 w-full flex items-end justify-between p-2 relative"
        style={{ backgroundColor: hexShown }}
      >
        <span
          className={clsx(
            "font-mono text-xs font-bold px-1.5 py-0.5",
            isLightGround ? "text-[#292524] bg-[#F5F5F4]/85" : "text-[#F5F5F4] bg-[#292524]/75"
          )}
        >
          {hexShown}
        </span>
        <span className="text-xs font-mono font-semibold px-1 py-0.5 bg-black/40 text-white text-[10px]">
          {wcag.score}
        </span>
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[var(--text)]">{name}</span>
            {copied ? (
              <span className="text-[10px] text-[var(--success-color)] font-bold flex items-center gap-0.5">
                <Check size={12} /> COPIED
              </span>
            ) : (
              <Copy size={12} className="text-[var(--text-subtle)] group-hover:text-[var(--text)]" />
            )}
          </div>
          <span className="font-mono text-[11px] text-[var(--primary-500)] mt-0.5 block">{token}</span>
        </div>
        {description && (
          <p className="text-[11px] text-[var(--text-muted)] mt-2 line-clamp-2 leading-tight">{description}</p>
        )}
      </div>
    </div>
  );
};
