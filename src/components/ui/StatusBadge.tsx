import React from 'react';
import { getStatusColor } from '../../utils/filterUtils';

export interface StatusBadgeProps {
  status: string;
}

/**
 * MoveInSync Color-Coded Status Pill Badge
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getStatusColor(status);
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-2xs select-none whitespace-nowrap ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
