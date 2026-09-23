import React, { useEffect, useRef } from 'react';
import { LogIn, LogOut, Coffee } from 'lucide-react';
import type { Driver } from '../../types';
import { useDrivers } from '../../context/DriverContext';
import toast from 'react-hot-toast';

interface DriverActionMenuProps {
  driver: Driver;
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
}

export const DriverActionMenu: React.FC<DriverActionMenuProps> = ({ 
  driver, 
  isOpen, 
  onClose,
  anchorEl
}) => {
  const { dispatch } = useDrivers();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          anchorEl && !anchorEl.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen) return null;

  const handleAction = (action: 'START_DUTY' | 'END_DUTY' | 'ADD_BREAK') => {
    // In a real app, this would open a modal to select time
    // For now, we'll just dispatch with current time
    
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    switch (action) {
      case 'START_DUTY':
        dispatch({
          type: 'START_DUTY',
          payload: { driverId: driver.id, time: timeString }
        });
        toast.success(`Started duty for ${driver.name} at ${timeString}`);
        break;
      case 'END_DUTY':
        dispatch({
          type: 'END_DUTY',
          payload: { driverId: driver.id, time: timeString }
        });
        toast.success(`Ended duty for ${driver.name} at ${timeString}`);
        break;
      case 'ADD_BREAK':
        // Mock a 30 min break
        const endTime = new Date(now.getTime() + 30 * 60000);
        const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
        
        dispatch({
          type: 'ADD_BREAK',
          payload: { 
            driverId: driver.id, 
            startTime: timeString,
            endTime: endTimeString
          }
        });
        toast.success(`Added break for ${driver.name} (${timeString} - ${endTimeString})`);
        break;
    }
    
    onClose();
  };

  // Position logic (simplified, assuming relative container)
  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
    >
      <button
        onClick={() => handleAction('START_DUTY')}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <LogIn size={16} className="text-blue-500" />
        Start Duty
      </button>
      
      <button
        onClick={() => handleAction('END_DUTY')}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <LogOut size={16} className="text-blue-500" />
        End Duty
      </button>
      
      <div className="h-px bg-gray-200 my-1"></div>
      
      <button
        onClick={() => handleAction('ADD_BREAK')}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Coffee size={16} className="text-purple-500" />
        Add Break
      </button>
    </div>
  );
};
