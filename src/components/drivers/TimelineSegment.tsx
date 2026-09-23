import React, { useState } from 'react';
import { MapPin, Coffee, Bus, LogIn, LogOut } from 'lucide-react';
import type { ScheduleEvent } from '../../types';

interface TimelineSegmentProps {
  event: ScheduleEvent;
  style: React.CSSProperties;
}

/**
 * MoveInSync Timeline Segment Component
 * Renders duty blocks, break periods, vehicle changes, and pickup/drop markers
 * with authentic MoveInSync styling and hover summary tooltips.
 */
export const TimelineSegment: React.FC<TimelineSegmentProps> = ({ event, style }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderContent = () => {
    switch (event.type) {
      case 'duty-start':
        return (
          <div className="h-full bg-emerald-100/90 text-emerald-800 border border-emerald-300 rounded px-1.5 flex items-center gap-1 font-semibold text-[11px] shadow-2xs">
            <LogIn size={11} className="text-emerald-700" />
            <span>→9</span>
          </div>
        );

      case 'duty-end':
        return (
          <div className="h-full bg-rose-100/90 text-rose-800 border border-rose-300 rounded px-1.5 flex items-center gap-1 font-semibold text-[11px] shadow-2xs">
            <span>9←</span>
            <LogOut size={11} className="text-rose-700" />
          </div>
        );

      case 'break':
        return (
          <div className="h-full w-full bg-[#fde047] text-amber-900 border border-amber-400 rounded-md flex items-center justify-center gap-1 font-medium text-xs shadow-2xs px-2">
            <Coffee size={13} className="text-amber-950 fill-amber-900" />
          </div>
        );

      case 'vehicle-change':
        return (
          <div className="h-full w-full bg-emerald-200 text-emerald-900 border border-emerald-400 rounded-md flex items-center justify-center gap-1 text-xs shadow-2xs px-2">
            <Bus size={13} />
            <span className="text-[10px] font-bold">UA3282</span>
          </div>
        );

      case 'pickup':
      case 'drop':
        return (
          <div className="h-full w-full bg-[#d6e4f8] text-[#1b3d75] border border-[#a4c0ea] rounded-md flex items-center justify-center gap-1 shadow-2xs px-1 hover:brightness-95 transition-all">
            <MapPin size={13} className={event.type === 'drop' ? 'fill-current text-blue-800' : 'text-blue-700'} />
            {(event.pickupCount || event.dropCount) && (
              <span className="text-[10px] font-bold text-blue-900">
                {event.pickupCount ? `+${event.pickupCount}` : `-${event.dropCount}`}
              </span>
            )}
          </div>
        );

      case 'empty-leg':
        return (
          <div className="h-full w-full bg-gray-100/90 border border-dashed border-gray-300 rounded-md flex items-center justify-between px-2 text-gray-500 text-[10px] font-semibold">
            <span>-9</span>
            <span>-9</span>
          </div>
        );

      default:
        return (
          <div className="h-full w-full bg-[#d6e4f8] border border-[#a4c0ea] rounded-md" />
        );
    }
  };

  return (
    <div 
      className="absolute top-3.5 bottom-3.5 z-10 transition-transform duration-100 hover:scale-[1.02] cursor-pointer"
      style={style}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {renderContent()}
      
      {/* Floating Dark Popover matching Screenshot (e.g. "2 Pickup, 3 Drop") */}
      {showTooltip && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none flex flex-col items-center border border-slate-700">
          <div className="font-semibold text-center leading-tight">
            {event.pickupCount || event.dropCount 
              ? `${event.pickupCount || 0} Pickup, ${event.dropCount || 0} Drop`
              : (event.label || event.type)}
          </div>
          <div className="text-[10px] text-slate-300 font-mono">
            {event.startTime} - {event.endTime}
          </div>
          {/* Arrow */}
          <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 border-r border-b border-slate-700"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineSegment;
