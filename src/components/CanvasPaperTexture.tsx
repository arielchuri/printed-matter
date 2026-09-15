import React, { useEffect, useRef } from "react";

export interface CanvasPaperTextureProps {
  fiberCount?: number;
  fiberLength?: number;
  fiberThickness?: number;
  fiberCurvature?: number;
  speckCount?: number;
  speckSize?: number;
  colorTone?: "white" | "cream" | "charcoal" | "brown";
  opacity?: number;
  seed?: number;
  blendMode?: "lighten" | "screen" | "multiply" | "overlay";
  className?: string;
  style?: React.CSSProperties;
}

// Deterministic PRNG with seed
function createPRNG(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const CanvasPaperTexture: React.FC<CanvasPaperTextureProps> = ({
  fiberCount = 2000,
  fiberLength = 4,
  fiberThickness = 0.6,
  fiberCurvature = 4,
  speckCount = 1500,
  speckSize = 0.8,
  colorTone = "white",
  opacity = 0.3,
  seed = 1,
  blendMode = "lighten",
  className = "",
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const rand = createPRNG(seed);
    const isLighten = blendMode === "lighten" || blendMode === "screen";

    const getBaseRGB = (alpha: number) => {
      if (colorTone === "white") {
        return `rgba(255, 255, 255, ${alpha})`;
      }
      if (colorTone === "cream") {
        return isLighten
          ? `rgba(255, 250, 240, ${alpha})`
          : `rgba(215, 200, 180, ${alpha})`;
      }
      if (colorTone === "charcoal") {
        return `rgba(40, 35, 30, ${alpha * 0.7})`;
      }
      // brown / raw kraft
      return `rgba(130, 95, 60, ${alpha * 0.8})`;
    };

    // 1. Draw microscopic pulp stipple flecks
    for (let i = 0; i < speckCount; i++) {
      const x = rand() * width;
      const y = rand() * height;
      const r = rand() * speckSize + 0.2;
      const a = rand() * 0.6 + 0.1;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = getBaseRGB(a);
      ctx.fill();
    }

    // 2. Draw organic cotton micro-fibers (curved bezier filaments)
    ctx.lineWidth = fiberThickness;
    ctx.lineCap = "round";

    for (let i = 0; i < fiberCount; i++) {
      const x0 = rand() * width;
      const y0 = rand() * height;
      const angle = rand() * Math.PI * 2;
      const len = (rand() * 0.7 + 0.3) * fiberLength * 2.5;

      // Random control point deviation for natural curled filament
      const curl = fiberCurvature * (rand() - 0.5);
      const cx = x0 + Math.cos(angle) * (len * 0.5) + Math.sin(angle) * curl;
      const cy = y0 + Math.sin(angle) * (len * 0.5) - Math.cos(angle) * curl;
      const x1 = x0 + Math.cos(angle) * len;
      const y1 = y0 + Math.sin(angle) * len;

      const a = rand() * 0.55 + 0.15;
      ctx.strokeStyle = getBaseRGB(a);

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.stroke();
    }
  }, [
    fiberCount,
    fiberLength,
    fiberThickness,
    fiberCurvature,
    speckCount,
    speckSize,
    colorTone,
    opacity,
    seed,
    blendMode,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={450}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
        ...style,
      }}
    />
  );
};
