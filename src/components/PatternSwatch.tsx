import React from "react";
import { clsx } from "clsx";

export interface PatternSwatchProps {
  type: "solid" | "hatch-45" | "hatch-135" | "crosshatch" | "dots" | "stipple";
  label: string;
  description?: string;
}

export const PatternSwatch: React.FC<PatternSwatchProps> = ({ type, label, description }) => {
  const getPatternSvg = () => {
    switch (type) {
      case "solid":
        return <rect width="100%" height="100%" fill="#222D2C" />;
      case "hatch-45":
        return (
          <>
            <pattern id="p-hatch-45" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#222D2C" strokeWidth="1.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#p-hatch-45)" />
          </>
        );
      case "hatch-135":
        return (
          <>
            <pattern id="p-hatch-135" width="8" height="8" patternTransform="rotate(135 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#222D2C" strokeWidth="1.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#p-hatch-135)" />
          </>
        );
      case "crosshatch":
        return (
          <>
            <pattern id="p-cross" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="#222D2C" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#p-cross)" />
          </>
        );
      case "dots":
        return (
          <>
            <pattern id="p-dots" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#222D2C" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#p-dots)" />
          </>
        );
      case "stipple":
        return (
          <>
            <pattern id="p-stipple" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#222D2C" />
              <circle cx="8" cy="4" r="0.8" fill="#222D2C" />
              <circle cx="4" cy="8" r="1.2" fill="#222D2C" />
              <circle cx="10" cy="10" r="0.9" fill="#222D2C" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#p-stipple)" />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col border border-[#222D2C] bg-[#FFFFFF]" style={{ borderRadius: 0 }}>
      <div className="h-20 w-full bg-[#EFECE6] border-b border-[#222D2C]/20 relative overflow-hidden">
        <svg className="w-full h-full">{getPatternSvg()}</svg>
      </div>
      <div className="p-2.5 flex flex-col">
        <span className="text-xs font-bold text-[#222D2C]">{label}</span>
        {description && <span className="text-[11px] text-[#5B6360] font-mono mt-0.5">{description}</span>}
      </div>
    </div>
  );
};
