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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const live = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      if (live) setComputedVal(live);
    }
  }, [token]);

  const hexShown = computedVal || value;
  const paperGround = "#EFECE6";
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
      className="flex flex-col border border-[#222D2C] bg-[#FFFFFF] cursor-pointer hover:translate-y-[-2px] transition-transform group relative"
      style={{ borderRadius: 0, boxShadow: "1px 1px 1px 0 rgba(128, 128, 128, 0.25)" }}
    >
      <div
        className="h-20 w-full flex items-end justify-between p-2 relative"
        style={{ backgroundColor: hexShown }}
      >
        <span
          className={clsx(
            "font-mono text-xs font-bold px-1.5 py-0.5",
            isLightGround ? "text-[#222D2C] bg-white/70" : "text-white bg-black/50"
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
            <span className="font-bold text-xs text-[#222D2C]">{name}</span>
            {copied ? (
              <span className="text-[10px] text-[#54C93F] font-bold flex items-center gap-0.5">
                <Check size={12} /> COPIED
              </span>
            ) : (
              <Copy size={12} className="text-[#909390] group-hover:text-[#222D2C]" />
            )}
          </div>
          <span className="font-mono text-[11px] text-[#1A66A6] mt-0.5 block">{token}</span>
        </div>
        {description && (
          <p className="text-[11px] text-[#5B6360] mt-2 line-clamp-2 leading-tight">{description}</p>
        )}
      </div>
    </div>
  );
};
