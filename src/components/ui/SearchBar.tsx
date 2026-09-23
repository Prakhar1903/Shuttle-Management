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
      <Search className="absolute left-2.5 h-5 w-5 text-[#78818f] pointer-events-none" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[37px] pl-9 pr-8 text-[16px] bg-white border border-[#dfe1e5] rounded-[7px] focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all text-slate-900 placeholder-[#7b8390]"
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
