import React from "react";
import { clsx } from "clsx";
import { Search, X } from "lucide-react";

export interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  isLoading?: boolean;
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, value, onChange, onClear, isLoading, placeholder = "Search...", ...props }, ref) => {
    return (
      <div className={clsx("relative flex items-center w-full", className)}>
        <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none flex items-center">
          <Search size={15} />
        </span>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-[var(--white)] border border-[var(--border-gray)] text-[var(--text)] text-sm pl-9 pr-8 py-2 font-normal focus:border-[var(--primary-500)] focus:outline-none"
          style={{
            borderRadius: 0,
            boxShadow: "1px 1px 1px 0 rgba(128, 128, 128, 0.25)",
          }}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2.5 text-[var(--text-muted)] hover:text-[var(--text)] p-0.5 border-none bg-transparent cursor-pointer"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";
