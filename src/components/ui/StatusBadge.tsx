import React from 'react';
import { getStatusColor } from '../../utils/filterUtils';

export interface StatusBadgeProps {
  status: string;
}

/**
 * Color-coded status badge component.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getStatusColor(status);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};
