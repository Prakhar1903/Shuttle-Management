import React, { useEffect, useRef } from 'react';
import { Coffee } from 'lucide-react';
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

  // Position logic matching reference screenshot
  return (
    <div 
      ref={menuRef}
      className="absolute left-6 top-8 w-52 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-slate-100/90 text-sm font-medium text-slate-800 animate-in fade-in zoom-in-95 duration-100 select-none"
    >
      <button
        type="button"
        onClick={() => handleAction('START_DUTY')}
        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer text-slate-800 rounded-xl"
      >
        <span className="text-slate-600 font-bold text-base">→</span>
        <span>Start Duty</span>
      </button>
      
      <button
        type="button"
        onClick={() => handleAction('END_DUTY')}
        className="w-full text-left px-3.5 py-2.5 bg-[#f0f4fa] hover:bg-[#e6edf8] flex items-center gap-3 transition-colors cursor-pointer text-slate-900 rounded-xl font-medium"
      >
        <span className="text-slate-700 font-bold text-base">↳</span>
        <span>End Duty</span>
      </button>
      
      <button
        type="button"
        onClick={() => handleAction('ADD_BREAK')}
        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer text-slate-800 rounded-xl"
      >
        <Coffee size={16} className="text-slate-700" />
        <span>Add Break</span>
      </button>
    </div>
  );
};
