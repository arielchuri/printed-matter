import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "level" | "status" | "spectrum" | "neutral";
  color?: "red" | "orange" | "yellow" | "green" | "aqua" | "blue" | "violet" | "gray";
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
          "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider",
          size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
          "bg-[#DFDDD7] text-[#222D2C] border border-[#BCBCB8]",
          className
        )}
        style={{ borderRadius: 0 }}
        {...props}
      >
        {children}
      </span>
    );
  }

  const spectrumColors = {
    red: "bg-[#D35B50]/15 text-[#D35B50] border-[#D35B50]",
    orange: "bg-[#F39D22]/15 text-[#9e5d00] border-[#F39D22]",
    yellow: "bg-[#F4D35A]/25 text-[#735c00] border-[#F4D35A]",
    green: "bg-[#54C93F]/15 text-[#1b6b0e] border-[#54C93F]",
    aqua: "bg-[#3ABEAE]/15 text-[#006e62] border-[#3ABEAE]",
    blue: "bg-[#1A66A6]/15 text-[#1A66A6] border-[#1A66A6]",
    violet: "bg-[#8F57CB]/15 text-[#8F57CB] border-[#8F57CB]",
    gray: "bg-[#DFDDD7] text-[#222D2C] border-[#BCBCB8]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-mono font-semibold border",
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
