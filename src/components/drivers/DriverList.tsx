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
 * Driver List Sidebar inside Driver Management
 * Renders each driver with high-contrast typography, status indicator pill,
 * and three-dot action trigger for start/end duty and breaks.
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
    <div className="flex flex-col divide-y divide-gray-100">
      {drivers.map(driver => (
        <div 
          key={driver.id}
          onClick={() => onSelectDriver(driver)}
          className={`h-[72px] flex items-center justify-between px-4 transition-all duration-150 cursor-pointer ${
            selectedDriverId === driver.id 
              ? 'bg-blue-50/70 border-l-4 border-l-blue-600' 
              : 'hover:bg-slate-50/80 border-l-4 border-l-transparent'
          }`}
        >
          <div className="min-w-0 pr-2">
            <div className="font-semibold text-slate-800 text-sm truncate">{driver.name}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                driver.status === 'Online'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  driver.status === 'Online' ? 'bg-emerald-500' : 'bg-gray-400'
                }`}></span>
                {driver.status}
              </span>
            </div>
          </div>
          
          <div className="relative shrink-0">
            <button 
              type="button"
              onClick={(e) => handleMenuClick(e, driver.id)}
              className="p-1.5 text-gray-400 hover:text-slate-700 rounded-lg hover:bg-gray-200/60 transition-colors"
              title="Driver Duty Controls"
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
        <div className="py-8 px-4 text-center text-sm text-gray-400">
          No drivers found.
        </div>
      )}
    </div>
  );
};

export default DriverList;
