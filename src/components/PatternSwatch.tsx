import React, { useId } from "react";

export interface PatternSwatchProps {
  type: "solid" | "hatch-45" | "hatch-135" | "crosshatch" | "dots" | "stipple";
  label: string;
  description?: string;
  /** Ink color — defaults to Ink Black var(--gray-900) */
  color?: string;
  /** Density step: 1 (10% sparse) to 5 (90% dense). Defaults to 3 (50% medium) */
  density?: 1 | 2 | 3 | 4 | 5;
  /** Screen angle rotation in degrees (e.g., 0° Yellow, 15° Cyan, 45° Black, 75° Magenta) */
  angle?: number;
  id?: string;
  className?: string;
}

export const PatternSwatch: React.FC<PatternSwatchProps> = ({
  type,
  label,
  description,
  color = "var(--gray-900)",
  density = 3,
  angle,
  id,
  className = "",
}) => {
  const generatedId = useId();
  const patternId = id || `pattern-${type}-${density}-${(angle ?? 0)}-${generatedId.replace(/:/g, "")}`;

  const transform = angle !== undefined ? `rotate(${angle} 0 0)` : undefined;

  const renderPattern = () => {
    switch (type) {
      case "solid":
        return <rect width="100%" height="100%" fill={color} />;

      case "hatch-45": {
        const specs = [
          { size: 16, stroke: 0.8 },
          { size: 12, stroke: 1.0 },
          { size: 8, stroke: 1.5 },
          { size: 6, stroke: 1.8 },
          { size: 4, stroke: 2.0 },
        ][density - 1];
        return (
          <>
            <pattern
              id={patternId}
              width={specs.size}
              height={specs.size}
              patternTransform={transform || "rotate(45 0 0)"}
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2={specs.size} stroke={color} strokeWidth={specs.stroke} />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </>
        );
      }

      case "hatch-135": {
        const specs = [
          { size: 16, stroke: 0.8 },
          { size: 12, stroke: 1.0 },
          { size: 8, stroke: 1.5 },
          { size: 6, stroke: 1.8 },
          { size: 4, stroke: 2.0 },
        ][density - 1];
        return (
          <>
            <pattern
              id={patternId}
              width={specs.size}
              height={specs.size}
              patternTransform={transform || "rotate(135 0 0)"}
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2={specs.size} stroke={color} strokeWidth={specs.stroke} />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </>
        );
      }

      case "crosshatch": {
        const specs = [
          { size: 16, stroke: 0.75 },
          { size: 12, stroke: 1.0 },
          { size: 8, stroke: 1.25 },
          { size: 6, stroke: 1.5 },
          { size: 4, stroke: 1.6 },
        ][density - 1];
        return (
          <>
            <pattern
              id={patternId}
              width={specs.size}
              height={specs.size}
              patternTransform={transform}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M 0 0 L ${specs.size} ${specs.size} M ${specs.size} 0 L 0 ${specs.size}`}
                stroke={color}
                strokeWidth={specs.stroke}
              />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </>
        );
      }

      case "dots": {
        const specs = [
          { size: 16, r: 1.0 },
          { size: 12, r: 1.5 },
          { size: 8, r: 1.75 },
          { size: 6, r: 2.0 },
          { size: 5, r: 2.25 },
        ][density - 1];
        return (
          <>
            <pattern
              id={patternId}
              width={specs.size}
              height={specs.size}
              patternTransform={transform}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={specs.size / 2} cy={specs.size / 2} r={specs.r} fill={color} />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </>
        );
      }

      case "stipple": {
        switch (density) {
          case 1:
            return (
              <>
                <pattern id={patternId} width="16" height="16" patternTransform={transform} patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="4" r="0.6" fill={color} />
                  <circle cx="11" cy="12" r="0.7" fill={color} />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </>
            );
          case 2:
            return (
              <>
                <pattern id={patternId} width="14" height="14" patternTransform={transform} patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="3" r="0.75" fill={color} />
                  <circle cx="9" cy="4" r="0.8" fill={color} />
                  <circle cx="5" cy="11" r="0.75" fill={color} />
                  <circle cx="12" cy="10" r="0.85" fill={color} />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </>
            );
          case 3:
            return (
              <>
                <pattern id={patternId} width="12" height="12" patternTransform={transform} patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.9" fill={color} />
                  <circle cx="8" cy="4" r="0.8" fill={color} />
                  <circle cx="4" cy="8" r="1.1" fill={color} />
                  <circle cx="10" cy="10" r="0.9" fill={color} />
                  <circle cx="6" cy="11" r="0.85" fill={color} />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </>
            );
          case 4:
            return (
              <>
                <pattern id={patternId} width="10" height="10" patternTransform={transform} patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill={color} />
                  <circle cx="7" cy="2" r="1.0" fill={color} />
                  <circle cx="3" cy="6" r="1.2" fill={color} />
                  <circle cx="8" cy="7" r="1.1" fill={color} />
                  <circle cx="2" cy="9" r="1.0" fill={color} />
                  <circle cx="6" cy="9" r="1.15" fill={color} />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </>
            );
          case 5:
            return (
              <>
                <pattern id={patternId} width="8" height="8" patternTransform={transform} patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1.3" fill={color} />
                  <circle cx="5" cy="2" r="1.2" fill={color} />
                  <circle cx="2" cy="5" r="1.4" fill={color} />
                  <circle cx="6" cy="5" r="1.3" fill={color} />
                  <circle cx="4" cy="7" r="1.3" fill={color} />
                  <circle cx="7" cy="7" r="1.2" fill={color} />
                  <circle cx="1" cy="7" r="1.2" fill={color} />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </>
            );
        }
      }
    }
  };

  return (
    <div className={`flex flex-col bg-[var(--white)] ${className}`} style={{ borderRadius: 0 }}>
      <div className="h-20 w-full bg-[var(--surface)] relative overflow-hidden border border-[var(--border-gray)]/30">
        <svg className="w-full h-full mix-blend-multiply">{renderPattern()}</svg>
      </div>
      <div className="p-2.5 flex flex-col">
        <span className="text-xs font-bold text-[var(--text)]">{label}</span>
        {description && (
          <span className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">{description}</span>
        )}
      </div>
    </div>
  );
};
