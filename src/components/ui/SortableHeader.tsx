import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
 * Table header cell with sort indicator.
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
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 group select-none"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <span className="flex flex-col text-gray-400 group-hover:text-gray-500">
          <ChevronUp
            className={`h-3 w-3 -mb-1 ${isActive && isAsc ? 'text-blue-600 font-bold' : ''}`}
          />
          <ChevronDown
            className={`h-3 w-3 ${isActive && !isAsc ? 'text-blue-600 font-bold' : ''}`}
          />
        </span>
      </div>
    </th>
  );
};
