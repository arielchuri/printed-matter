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
    <div className={clsx("flex border-b border-[var(--border-gray)] bg-transparent", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-none transition-colors",
              isActive
                ? "bg-[var(--primary-500)] text-[var(--white)]"
                : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--gray-200)]/40"
            )}
            style={{ borderRadius: 0, boxShadow: "none" }}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  "px-1.5 py-0.2 text-[10px] font-mono",
                  isActive ? "bg-[var(--primary-700)] text-[var(--white)]" : "bg-[var(--gray-100)] text-[var(--text)]"
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
