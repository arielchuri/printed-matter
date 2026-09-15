import React, { useEffect, useRef } from "react";

export interface CanvasPaperTextureProps {
  fiberCount?: number;
  fiberLength?: number;
  fiberThickness?: number;
  fiberCurvature?: number;
  fiberFrequency?: number;
  speckCount?: number;
  speckSize?: number;
  colorTone?: "white" | "cream" | "charcoal" | "brown";
  opacity?: number;
  seed?: number;
  blendMode?: "lighten" | "screen" | "multiply" | "darken" | "overlay";
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
  fiberFrequency = 3,
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
    const isDarken = blendMode === "darken" || blendMode === "multiply";
    const isDualTone = blendMode === "overlay";

    const getLightRGB = (alpha: number) => {
      if (colorTone === "cream") return `rgba(255, 250, 238, ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const getDarkRGB = (alpha: number) => {
      if (colorTone === "charcoal") return `rgba(35, 30, 25, ${alpha * 0.8})`;
      if (colorTone === "brown") return `rgba(120, 85, 50, ${alpha * 0.85})`;
      if (colorTone === "cream") return `rgba(165, 140, 115, ${alpha * 0.65})`;
      return `rgba(45, 40, 35, ${alpha * 0.65})`;
    };

    // 1. Draw microscopic pulp stipple flecks
    for (let i = 0; i < speckCount; i++) {
      const x = rand() * width;
      const y = rand() * height;
      const r = rand() * speckSize + 0.2;
      const a = rand() * 0.65 + 0.15;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      if (isDarken) {
        ctx.fillStyle = getDarkRGB(a);
      } else if (isDualTone) {
        // In overlay/dual-tone, mix dark specks (to darken light paper) and light specks (to lighten dark ink)
        ctx.fillStyle = rand() > 0.4 ? getDarkRGB(a) : getLightRGB(a);
      } else {
        ctx.fillStyle = getLightRGB(a);
      }
      ctx.fill();
    }

    // 2. Draw organic cotton micro-fibers with wave frequency & curvature
    ctx.lineWidth = fiberThickness;
    ctx.lineCap = "round";

    // Number of micro-wave oscillations along the fiber path
    const waveSegments = Math.max(1, Math.min(8, Math.round(fiberFrequency)));

    for (let i = 0; i < fiberCount; i++) {
      const x0 = rand() * width;
      const y0 = rand() * height;
      const baseAngle = rand() * Math.PI * 2;
      const totalLen = (rand() * 0.7 + 0.3) * fiberLength * 2.8;

      const alpha = rand() * 0.55 + 0.2;
      const segmentLen = totalLen / waveSegments;
      const phase = rand() * Math.PI * 2;

      // Draw filament path with frequency undulations
      const drawFiberPath = (offsetX = 0, offsetY = 0) => {
        ctx.beginPath();
        let currentX = x0 + offsetX;
        let currentY = y0 + offsetY;
        ctx.moveTo(currentX, currentY);

        for (let seg = 1; seg <= waveSegments; seg++) {
          const t = seg / waveSegments;
          // Sinusoidal wave displacement based on fiberFrequency
          const lateralWiggle = Math.sin(t * Math.PI * fiberFrequency + phase) * (fiberCurvature * 0.6);
          const nextTargetX = x0 + Math.cos(baseAngle) * (totalLen * t) - Math.sin(baseAngle) * lateralWiggle + offsetX;
          const nextTargetY = y0 + Math.sin(baseAngle) * (totalLen * t) + Math.cos(baseAngle) * lateralWiggle + offsetY;

          const ctrlX = (currentX + nextTargetX) * 0.5 + Math.sin(baseAngle) * (fiberCurvature * 0.3 * (rand() - 0.5));
          const ctrlY = (currentY + nextTargetY) * 0.5 - Math.cos(baseAngle) * (fiberCurvature * 0.3 * (rand() - 0.5));

          ctx.quadraticCurveTo(ctrlX, ctrlY, nextTargetX, nextTargetY);
          currentX = nextTargetX;
          currentY = nextTargetY;
        }
      };

      if (isDualTone) {
        // Dual-tone: subtle dark cast shadow offset (darkens light paper) + light filament crest (lightens dark ink)
        drawFiberPath(0.4, 0.4);
        ctx.strokeStyle = getDarkRGB(alpha * 0.5);
        ctx.stroke();

        drawFiberPath(0, 0);
        ctx.strokeStyle = getLightRGB(alpha * 0.85);
        ctx.stroke();
      } else if (isDarken) {
        drawFiberPath(0, 0);
        ctx.strokeStyle = getDarkRGB(alpha);
        ctx.stroke();
      } else {
        drawFiberPath(0, 0);
        ctx.strokeStyle = getLightRGB(alpha);
        ctx.stroke();
      }
    }
  }, [
    fiberCount,
    fiberLength,
    fiberThickness,
    fiberCurvature,
    fiberFrequency,
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
