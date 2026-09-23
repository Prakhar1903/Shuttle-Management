import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import type { Driver } from '../../types';
import { DriverActionMenu } from './DriverActionMenu';

interface DriverListProps {
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
  selectedDriverId?: string;
}

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
    <div className="flex flex-col">
      {drivers.map(driver => (
        <div 
          key={driver.id}
          onClick={() => onSelectDriver(driver)}
          className={`flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-100 transition-colors ${
            selectedDriverId === driver.id ? 'bg-blue-50' : ''
          }`}
        >
          <div>
            <div className="font-medium text-gray-800 text-sm">{driver.name}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${driver.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className={`text-xs ${driver.status === 'Online' ? 'text-green-600' : 'text-gray-500'}`}>
                {driver.status === 'Online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={(e) => handleMenuClick(e, driver.id)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
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
    </div>
  );
};
