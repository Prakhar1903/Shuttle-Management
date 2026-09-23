import React from 'react';
import { Calendar } from 'lucide-react';

export interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

/**
 * MoveInSync Date Picker
 * Styled rounded pill with calendar icon matching the reference UI.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  // Format the date string for display (e.g. "Dec 16, 2024")
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
      <label className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50/70 transition-all cursor-pointer shadow-2xs">
        <span className="whitespace-nowrap">{formatDisplay(value)}</span>
        <Calendar className="w-4 h-4 text-gray-500" />
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
