import React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "map-control";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isActive, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-colors select-none focus:outline-none";
    
    const sizeStyles = {
      sm: "px-2.5 py-1 text-xs gap-1.5 h-[28px]",
      md: "px-3.5 py-1.5 text-sm gap-2 h-[34px]",
      lg: "px-5 py-2.5 text-base gap-2.5 h-[42px]",
    };

    const variantStyles = {
      primary: "bg-[#1A66A6] text-[#EFECE6] border-none hover:bg-[#145082] active:!bg-[#54C93F] active:!text-white active:!border-[#54C93F]",
      secondary: "bg-transparent text-[#1A66A6] border border-[#1A66A6] hover:bg-[#1A66A6]/10 active:!bg-[#54C93F] active:!text-white active:!border-[#54C93F]",
      danger: "bg-[#D35B50] text-white border-none hover:bg-[#b84238] active:!bg-[#54C93F] active:!text-white",
      ghost: "bg-transparent text-[#222D2C] hover:bg-[#CECDC8]/40 border-none",
      "map-control": clsx(
        "w-[32px] h-[32px] p-0 border-none transition-colors",
        isActive ? "bg-[#1A66A6] text-white" : "bg-[#FFFFFF] text-[#222D2C] hover:bg-[#EFECE6]"
      ),
    };

    const disabledStyles = disabled ? "!bg-[#CECDC8] !text-[#909390] !border-[#BCBCB8] cursor-not-allowed pointer-events-none" : "cursor-pointer";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          baseStyles,
          variant !== "map-control" && sizeStyles[size],
          variantStyles[variant],
          disabledStyles,
          className
        )}
        style={{ borderRadius: 0, boxShadow: "none" }}
        {...props}
      >
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
