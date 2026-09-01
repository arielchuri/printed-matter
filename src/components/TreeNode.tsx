import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronToggle } from "./ChevronToggle";
import { Badge } from "./Badge";

export interface TreeNodeItem {
  id: string;
  name: string;
  level?: string;
  children?: TreeNodeItem[];
  count?: number;
}

export interface TreeNodeProps {
  node: TreeNodeItem;
  selectedId?: string;
  onSelect?: (node: TreeNodeItem) => void;
  depth?: number;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, selectedId, onSelect, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col select-none" style={{ marginLeft: depth > 0 ? `${depth * 14}px` : 0 }}>
      <div
        onClick={() => onSelect && onSelect(node)}
        className={clsx(
          "flex items-center justify-between py-1.5 px-2 border mb-1 cursor-pointer transition-colors",
          isSelected
            ? "bg-[#1A66A6] text-white border-[#1A66A6]"
            : "bg-[#FFFFFF] text-[#222D2C] border-[#DFDDD7] hover:border-[#222D2C]"
        )}
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <div onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
              <ChevronToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </div>
          ) : (
            <span className="w-5" />
          )}
          <span className="text-xs font-semibold">{node.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {node.level && (
            <Badge variant="level" size="sm" className={isSelected ? "!bg-[#0F3D64] !text-white !border-none" : ""}>
              {node.level}
            </Badge>
          )}
          {node.count !== undefined && (
            <span className={clsx("font-mono text-[10px]", isSelected ? "text-white/80" : "text-[#5B6360]")}>
              ({node.count})
            </span>
          )}
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
