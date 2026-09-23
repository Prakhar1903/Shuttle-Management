import React from 'react';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: SortConfig | null;
  onSort: (key: string) => void;
}

/**
 * Modern MoveInSync Sortable Table Header Cell
 */
export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  currentSort,
  onSort,
}) => {
  const isActive = currentSort?.key === sortKey;
  const isAsc = currentSort?.direction === 'asc';

  return (
    <th
      className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100/70 transition-colors group select-none whitespace-nowrap"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
          {isActive ? (
            isAsc ? (
              <ChevronUp className="h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
            )
          ) : (
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
          )}
        </span>
      </div>
    </th>
  );
};

export default SortableHeader;
