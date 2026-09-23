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
      <label className="w-[168px] h-[39px] flex items-center justify-between px-3 bg-white border border-[#dedfe3] rounded-[8px] text-[17px] text-[#303746] font-medium hover:border-slate-300 transition-colors cursor-pointer shadow-sm select-none">
        <span className="whitespace-nowrap">{formatDisplay(value)}</span>
        <Calendar className="w-4 h-4 text-[#687382]" />
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
