import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import type { Driver } from '../../types';
import { DriverActionMenu } from './DriverActionMenu';

interface DriverListProps {
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
  selectedDriverId?: string;
}

/**
 * Clean Driver List Panel
 * Fixed width, 64px row heights aligned precisely with the timeline.
 */
export const DriverList: React.FC<DriverListProps> = ({ 
  drivers, 
  onSelectDriver,
  selectedDriverId 
}) => {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>, driverId: string) => {
    e.stopPropagation();
    if (menuOpenId === driverId) {
      setMenuOpenId(null);
      setAnchorEl(null);
    } else {
      setMenuOpenId(driverId);
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <div className="flex flex-col divide-y divide-slate-100">
      {drivers.map(driver => (
        <div 
          key={driver.id}
          onClick={() => onSelectDriver(driver)}
          className={`h-16 flex items-center justify-between px-4 transition-colors cursor-pointer ${
            selectedDriverId === driver.id 
              ? 'bg-blue-50/70' 
              : 'hover:bg-slate-50/70'
          }`}
        >
          {/* Driver Info */}
          <div className="min-w-0 pr-3">
            <div className="font-semibold text-slate-900 text-sm truncate leading-tight">
              {driver.name}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                driver.status === 'Online'
                  ? 'text-emerald-700'
                  : 'text-slate-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  driver.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'
                }`}></span>
                {driver.status}
              </span>
            </div>
          </div>
          
          {/* Action Menu Trigger */}
          <div className="relative shrink-0">
            <button 
              type="button"
              onClick={(e) => handleMenuClick(e, driver.id)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors focus:outline-none"
              title="Driver Shift Options"
            >
              <MoreVertical size={16} />
            </button>
            
            {menuOpenId === driver.id && (
              <DriverActionMenu 
                driver={driver}
                isOpen={true}
                onClose={() => {
                  setMenuOpenId(null);
                  setAnchorEl(null);
                }}
                anchorEl={anchorEl}
              />
            )}
          </div>
        </div>
      ))}

      {drivers.length === 0 && (
        <div className="h-32 flex items-center justify-center text-xs text-slate-400 px-4 text-center">
          No matching drivers
        </div>
      )}
    </div>
  );
};

export default DriverList;
