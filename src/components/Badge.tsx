import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "level" | "status" | "spectrum" | "neutral";
  color?: "red" | "red-orange" | "orange" | "amber" | "yellow" | "lime" | "green" | "aqua" | "blue" | "indigo" | "violet" | "gray";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  color = "blue",
  size = "md",
  children,
  ...props
}) => {
  if (variant === "level") {
    return (
      <span
        className={clsx(
          "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider mix-blend-multiply",
          size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
          "bg-[var(--gray-100)] text-[var(--gray-900)] border border-[var(--gray-300)]",
          className
        )}
        style={{ borderRadius: 0 }}
        {...props}
      >
        {children}
      </span>
    );
  }

  const spectrumColors: Record<string, string> = {
    red: "bg-[var(--spectrum-red)]/15 text-[var(--spectrum-red)] border-[var(--spectrum-red)]",
    "red-orange": "bg-[var(--spectrum-red-orange)]/15 text-[var(--spectrum-red-orange)] border-[var(--spectrum-red-orange)]",
    orange: "bg-[var(--spectrum-orange)]/15 text-[var(--spectrum-orange)] border-[var(--spectrum-orange)]",
    amber: "bg-[var(--spectrum-amber)]/20 text-[#855300] border-[var(--spectrum-amber)]",
    yellow: "bg-[var(--spectrum-yellow)]/25 text-[#735c00] border-[var(--spectrum-yellow)]",
    lime: "bg-[var(--spectrum-lime)]/20 text-[#546109] border-transparent",
    green: "bg-[var(--spectrum-green)]/15 text-[var(--spectrum-green)] border-transparent",
    aqua: "bg-[var(--spectrum-aqua)]/15 text-[var(--spectrum-aqua)] border-transparent",
    blue: "bg-[var(--spectrum-blue)]/15 text-[var(--spectrum-blue)] border-transparent",
    indigo: "bg-[var(--spectrum-indigo)]/15 text-[var(--spectrum-indigo)] border-transparent",
    violet: "bg-[var(--spectrum-violet)]/15 text-[var(--spectrum-violet)] border-transparent",
    gray: "bg-[var(--gray-100)] text-[var(--gray-900)] border-[var(--gray-300)]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-mono font-semibold mix-blend-multiply border",
        size === "sm" ? "px-1.5 py-0.2 text-[11px]" : "px-2.5 py-0.5 text-xs",
        spectrumColors[color],
        className
      )}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </span>
  );
};
