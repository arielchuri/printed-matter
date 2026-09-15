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
        "w-5 h-5 inline-flex items-center justify-center border transition-colors p-0 cursor-pointer active:!bg-[var(--success-color)] active:!text-[var(--white)] active:!border-[var(--success-color)]",
        isOpen
          ? "bg-[var(--success-color)] text-[var(--white)] border-[var(--success-color)]"
          : "bg-transparent text-[var(--text)] border-[var(--border-gray)] hover:bg-[var(--surface-muted)]",
        className
      )}
      style={{ borderRadius: 0, boxShadow: "none" }}
      aria-expanded={isOpen}
    >
      {isOpen ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
    </button>
  );
};
