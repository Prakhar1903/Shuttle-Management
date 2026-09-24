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
 * Clean Enterprise Driver List Panel
 * Fixed width, 68px row heights aligned precisely with the timeline tracks.
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
    <div className="flex flex-col divide-y divide-slate-100 overflow-visible">
      {drivers.map(driver => (
        <div 
          key={driver.id}
          onClick={() => onSelectDriver(driver)}
          className={`h-[71px] flex items-center justify-between px-7 transition-colors cursor-pointer select-none relative ${
            selectedDriverId === driver.id 
              ? 'bg-blue-50/60' 
              : 'hover:bg-slate-50/60'
          } ${menuOpenId === driver.id ? 'z-40' : 'z-10'}`}
        >
          {/* Driver Name & Status Badge */}
          <div className="min-w-0 pr-2">
            <div className="font-medium text-[#303746] text-[16px] truncate leading-tight">
              {driver.name}
            </div>
            <div className="mt-1.5">
              <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-0.5 rounded-md ${
                driver.status === 'Online'
                  ? 'bg-[#e6f4ea] text-[#137333]'
                  : 'bg-[#fce8e6] text-[#c5221f]'
              }`}>
                {driver.status}
              </span>
            </div>
          </div>
          
          {/* Action Menu Trigger (⋮) */}
          <div className="relative shrink-0 -mr-4">
            <button 
              type="button"
              onClick={(e) => handleMenuClick(e, driver.id)}
              className="p-1 text-[#3f4652] bg-[#e7eaf2] hover:bg-[#dbe2ee] rounded-md transition-colors focus:outline-none cursor-pointer shadow-2xs"
              title="Driver Shift Options"
            >
              <MoreVertical size={15} />
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
