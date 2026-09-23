import React from 'react';

export interface StatusBadgeProps {
  status: string;
}

/**
 * MoveInSync Color-Coded Status Pill Badge
 * Refined SaaS styling with matching status dot indicator.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = (st: string) => {
    switch (st) {
      case 'Accepted':
        return 'bg-[#e8f7ee] text-[#1c8c4a]';
      case 'Waiting':
        return 'bg-[#fef3d6] text-[#b47a16]';
      case 'No Show':
        return 'bg-[#fde8dc] text-[#d9531e]';
      case 'Declined':
        return 'bg-[#edf1f5] text-[#5a6a7e]';
      case 'Completed':
        return 'bg-[#e4f6eb] text-[#1e8d4c]';
      case 'Requested':
        return 'bg-[#e2f0fd] text-[#1a73e8]';
      case 'On Going':
        return 'bg-[#e5effb] text-[#2c6ecb]';
      case 'Cancelled':
        return 'bg-[#fce5e8] text-[#d9384e]';
      case 'Dropped':
        return 'bg-[#e2f5f1] text-[#128a76]';
      default:
        return 'bg-[#edf1f5] text-[#5a6a7e]';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium tracking-normal select-none whitespace-nowrap text-center min-w-[76px] ${getBadgeStyle(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
