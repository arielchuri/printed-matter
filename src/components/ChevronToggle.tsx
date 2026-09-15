import React from "react";
import { clsx } from "clsx";
import { ChevronRight, ChevronDown } from "lucide-react";

export interface ChevronToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const ChevronToggle: React.FC<ChevronToggleProps> = ({ isOpen, onToggle, className }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "w-5 h-5 inline-flex items-center justify-center border transition-colors p-0 cursor-pointer hover:bg-[var(--primary-rollover)] hover:text-[var(--primary-rollover-anti,#FFFFFF)] hover:border-[var(--primary-rollover)] active:!bg-[var(--primary-active)] active:!text-[var(--primary-active-anti,#FFFFFF)] active:!border-[var(--primary-active)]",
        isOpen
          ? "bg-[var(--primary-500)] text-[var(--anti-primary-color,#FFFFFF)] border-[var(--primary-500)]"
          : "bg-transparent text-[var(--primary-500)] border-[var(--border-gray)]",
        className
      )}
      style={{ borderRadius: 0, boxShadow: "none" }}
      aria-expanded={isOpen}
    >
      {isOpen ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
    </button>
  );
};
