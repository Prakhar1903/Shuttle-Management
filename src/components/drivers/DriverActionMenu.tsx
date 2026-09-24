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

  const handleAction = (e: React.MouseEvent, action: 'START_DUTY' | 'END_DUTY' | 'ADD_BREAK' | 'TOGGLE_STATUS') => {
    e.stopPropagation();
    e.preventDefault();
    
    const now = new Date();
    const currentH = now.getHours();
    // Default to operational hours between 06:00 and 22:00
    const validH = Math.max(6, Math.min(21, currentH));
    const timeString = `${validH.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    switch (action) {
      case 'START_DUTY':
        dispatch({
          type: 'START_DUTY',
          payload: { driverId: driver.id, time: timeString }
        });
        toast.success(`✅ Started duty for ${driver.name} at ${timeString}. Status set to Online.`);
        break;

      case 'END_DUTY':
        dispatch({
          type: 'END_DUTY',
          payload: { driverId: driver.id, time: timeString }
        });
        toast.success(`🛑 Ended duty for ${driver.name} at ${timeString}. Status set to Offline.`);
        break;

      case 'ADD_BREAK': {
        const [h, m] = timeString.split(':').map(Number);
        const endMins = (h * 60 + m) + 45; // 45 min break
        const endH = Math.min(22, Math.floor(endMins / 60));
        const endM = endMins % 60;
        const endTimeString = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
        
        dispatch({
          type: 'ADD_BREAK',
          payload: { 
            driverId: driver.id, 
            startTime: timeString,
            endTime: endTimeString
          }
        });
        toast.success(`☕ Added 45m break for ${driver.name} (${timeString} - ${endTimeString})`);
        break;
      }

      case 'TOGGLE_STATUS': {
        const nextStatus = driver.status === 'Online' ? 'Offline' : 'Online';
        if (nextStatus === 'Online') {
          dispatch({
            type: 'START_DUTY',
            payload: { driverId: driver.id, time: timeString }
          });
          toast.success(`🟢 ${driver.name} is now ONLINE.`);
        } else {
          dispatch({
            type: 'END_DUTY',
            payload: { driverId: driver.id, time: timeString }
          });
          toast.success(`🔴 ${driver.name} is now OFFLINE.`);
        }
        break;
      }
    }
    
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-8 w-56 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-slate-200 text-sm font-medium text-slate-800 animate-in fade-in zoom-in-95 duration-100 select-none"
    >
      <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold truncate">{driver.name}</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
          driver.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {driver.status}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => handleAction(e, 'START_DUTY')}
        className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50 text-emerald-900 flex items-center gap-3 transition-colors cursor-pointer rounded-xl font-medium"
      >
        <span className="text-emerald-700 font-bold text-base leading-none">→</span>
        <span>Start Duty (Go Online)</span>
      </button>
      
      <button
        type="button"
        onClick={(e) => handleAction(e, 'END_DUTY')}
        className="w-full text-left px-3.5 py-2.5 hover:bg-rose-50 text-rose-900 flex items-center gap-3 transition-colors cursor-pointer rounded-xl font-medium"
      >
        <span className="text-rose-700 font-bold text-base leading-none">↳</span>
        <span>End Duty (Go Offline)</span>
      </button>
      
      <button
        type="button"
        onClick={(e) => handleAction(e, 'ADD_BREAK')}
        className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50 text-amber-900 flex items-center gap-3 transition-colors cursor-pointer rounded-xl font-medium"
      >
        <Coffee size={16} className="text-amber-700" />
        <span>Add 45m Break</span>
      </button>

      <div className="border-t border-slate-100 mt-1 pt-1">
        <button
          type="button"
          onClick={(e) => handleAction(e, 'TOGGLE_STATUS')}
          className="w-full text-left px-3.5 py-2 hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors cursor-pointer rounded-xl text-xs font-semibold"
        >
          <span>Quick Flip Status</span>
          <span className="text-[11px] text-blue-600">
            {driver.status === 'Online' ? 'Set Offline' : 'Set Online'}
          </span>
        </button>
      </div>
    </div>
  );
};
