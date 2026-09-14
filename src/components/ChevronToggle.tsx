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
        "w-5 h-5 inline-flex items-center justify-center border border-[var(--primary-500)] transition-colors p-0 cursor-pointer",
        isOpen ? "bg-[var(--primary-500)] text-[var(--white)]" : "bg-transparent text-[var(--primary-500)] hover:bg-[var(--primary-500)]/10",
        className
      )}
      style={{ borderRadius: 0, boxShadow: "none" }}
      aria-expanded={isOpen}
    >
      {isOpen ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
    </button>
  );
};
