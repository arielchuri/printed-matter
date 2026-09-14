import React from "react";
import { clsx } from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  surface?: "paper" | "knockout" | "subtle";
}

export const Card: React.FC<CardProps> = ({
  className,
  title,
  badge,
  actions,
  surface = "knockout",
  children,
  ...props
}) => {
  const surfaceStyles = {
    paper: "bg-[var(--surface)]",
    knockout: "bg-[var(--gray-50)]",
    subtle: "bg-[var(--gray-100)]",
  };

  return (
    <div
      className={clsx(
        "flex flex-col relative",
        surfaceStyles[surface],
        className
      )}
      style={{
        borderRadius: 0,
      }}
      {...props}
    >
      {(title || badge || actions) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-gray)]/20">
          <div className="flex items-center gap-2">
            {title && <span className="font-bold text-sm text-[var(--text)]">{title}</span>}
            {badge}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
};
