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
        "w-5 h-5 inline-flex items-center justify-center border border-[#1A66A6] transition-colors p-0 cursor-pointer",
        isOpen ? "bg-[#1A66A6] text-[#FFFFFF]" : "bg-transparent text-[#1A66A6] hover:bg-[#1A66A6]/10",
        className
      )}
      style={{ borderRadius: 0, boxShadow: "none" }}
      aria-expanded={isOpen}
    >
      {isOpen ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
    </button>
  );
};
