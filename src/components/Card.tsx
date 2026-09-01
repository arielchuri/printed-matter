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
    paper: "bg-[#EFECE6]",
    knockout: "bg-[#FFFFFF]",
    subtle: "bg-[#DFDDD7]",
  };

  return (
    <div
      className={clsx(
        "border border-[#222D2C] flex flex-col relative",
        surfaceStyles[surface],
        className
      )}
      style={{
        borderRadius: 0,
        boxShadow: "1px 1px 1px 0 rgba(128, 128, 128, 0.25)",
      }}
      {...props}
    >
      {(title || badge || actions) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#222D2C]/20">
          <div className="flex items-center gap-2">
            {title && <span className="font-bold text-sm text-[#222D2C]">{title}</span>}
            {badge}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
};
