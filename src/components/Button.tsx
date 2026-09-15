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
      primary: "bg-[var(--primary-500)] text-[var(--anti-primary-color,#FFFFFF)] border-none hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)]",
      secondary: "bg-transparent text-[var(--primary-500)] border border-[var(--primary-500)] hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] hover:border-[var(--primary-rollover)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)] active:!border-[var(--primary-active)]",
      danger: "bg-[var(--danger-color)] text-[var(--white)] border-none hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)]",
      ghost: "bg-transparent text-[var(--primary-500)] border-none hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)]",
      "map-control": clsx(
        "w-[32px] h-[32px] p-0 border-none transition-colors hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)]",
        isActive ? "bg-[var(--primary-500)] text-[var(--anti-primary-color,#FFFFFF)]" : "bg-[var(--white)] text-[var(--primary-500)]"
      ),
    };

    const disabledStyles = disabled ? "!bg-[var(--gray-200)] !text-[var(--gray-500)] !border-[var(--gray-300)] cursor-not-allowed pointer-events-none" : "cursor-pointer";

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
