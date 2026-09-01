import React from "react";
import { clsx } from "clsx";

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange, className }) => {
  return (
    <div className={clsx("flex border-b border-[#222D2C] bg-transparent", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-none transition-colors",
              isActive
                ? "bg-[#1A66A6] text-[#EFECE6]"
                : "bg-transparent text-[#5B6360] hover:text-[#222D2C] hover:bg-[#CECDC8]/30"
            )}
            style={{ borderRadius: 0, boxShadow: "none" }}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  "px-1.5 py-0.2 text-[10px] font-mono",
                  isActive ? "bg-[#0F3D64] text-white" : "bg-[#DFDDD7] text-[#222D2C]"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
