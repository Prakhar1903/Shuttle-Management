import React from 'react';

export interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

/**
 * A styled native date input component.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white"
      />
    </div>
  );
};
