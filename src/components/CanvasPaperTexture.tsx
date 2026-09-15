import React, { useEffect, useRef } from "react";

export interface CanvasPaperTextureProps {
  fiberCount?: number;
  fiberLength?: number;
  opacity?: number;
  seed?: number;
  blendMode?: "lighten" | "screen" | "multiply" | "overlay";
  className?: string;
  style?: React.CSSProperties;
}

// Pseudo-random generator with seed support for deterministic fiber layout
function createPRNG(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const CanvasPaperTexture: React.FC<CanvasPaperTextureProps> = ({
  fiberCount = 1800,
  fiberLength = 4,
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

    // 1. Draw microscopic pulp stipple flecks
    const speckCount = Math.floor(fiberCount * 1.2);
    for (let i = 0; i < speckCount; i++) {
      const x = rand() * width;
      const y = rand() * height;
      const r = rand() * 0.8 + 0.3;
      const a = rand() * 0.5 + 0.1;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = isLighten
        ? `rgba(255, 255, 255, ${a})`
        : `rgba(60, 50, 45, ${a * 0.6})`;
      ctx.fill();
    }

    // 2. Draw organic cotton micro-fibers (curved bezier filaments)
    ctx.lineWidth = 0.6;
    ctx.lineCap = "round";

    for (let i = 0; i < fiberCount; i++) {
      const x0 = rand() * width;
      const y0 = rand() * height;
      const angle = rand() * Math.PI * 2;
      const len = (rand() * 0.7 + 0.3) * fiberLength * 2.5;

      // Random control point deviation for natural curled filament
      const cx = x0 + Math.cos(angle) * (len * 0.5) + (rand() - 0.5) * 4;
      const cy = y0 + Math.sin(angle) * (len * 0.5) + (rand() - 0.5) * 4;
      const x1 = x0 + Math.cos(angle) * len;
      const y1 = y0 + Math.sin(angle) * len;

      const a = rand() * 0.5 + 0.15;
      ctx.strokeStyle = isLighten
        ? `rgba(255, 255, 255, ${a})`
        : `rgba(70, 60, 55, ${a * 0.5})`;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.stroke();
    }
  }, [fiberCount, fiberLength, opacity, seed, blendMode]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
        ...style,
      }}
    />
  );
};
