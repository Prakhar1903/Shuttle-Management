import React from 'react';
import { Calendar } from 'lucide-react';

export interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

/**
 * Enterprise Date Selector (h-9 / 36px)
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const formatDisplay = (val: string) => {
    if (!val) return 'Select Date';
    try {
      const parts = val.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return val;
    } catch {
      return val;
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <label className="h-9 flex items-center gap-2 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs select-none">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        <span className="whitespace-nowrap">{formatDisplay(value)}</span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
    </div>
  );
};
