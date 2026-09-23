import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Modern Search Input (h-9 / 36px)
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-8.5 pr-8 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 p-0.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200/50 transition-colors"
          title="Clear"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
