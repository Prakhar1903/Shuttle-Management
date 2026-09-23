import React, { useState } from 'react';
import { MapPin, Coffee, Bus, LogIn, LogOut } from 'lucide-react';
import type { ScheduleEvent } from '../../types';

interface TimelineSegmentProps {
  event: ScheduleEvent;
  style: React.CSSProperties;
}

/**
 * Clean Enterprise Timeline Event Segment
 * Calm colors, clear typography, and subtle hover popover.
 */
export const TimelineSegment: React.FC<TimelineSegmentProps> = ({ event, style }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderContent = () => {
    switch (event.type) {
      case 'duty-start':
        return (
          <div className="h-8 px-2 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/90 flex items-center gap-1 text-[11px] font-semibold shadow-2xs">
            <LogIn size={12} className="text-emerald-600" />
            <span>→9</span>
          </div>
        );

      case 'duty-end':
        return (
          <div className="h-8 px-2 rounded-md bg-rose-50 text-rose-800 border border-rose-200/90 flex items-center gap-1 text-[11px] font-semibold shadow-2xs">
            <span>9←</span>
            <LogOut size={12} className="text-rose-600" />
          </div>
        );

      case 'break':
        return (
          <div className="h-8 w-full px-2.5 rounded-md bg-amber-100/90 text-amber-900 border border-amber-300 flex items-center justify-center gap-1.5 text-xs font-medium shadow-2xs">
            <Coffee size={13} className="text-amber-800" />
            <span className="text-[11px] font-semibold">Break</span>
          </div>
        );

      case 'vehicle-change':
        return (
          <div className="h-8 w-full px-2 rounded-md bg-teal-50 text-teal-800 border border-teal-200/90 flex items-center justify-center gap-1 text-xs shadow-2xs font-medium">
            <Bus size={13} className="text-teal-600" />
            <span className="text-[10px] font-semibold">Vehicle</span>
          </div>
        );

      case 'pickup':
      case 'drop':
        return (
          <div className="h-8 w-full px-2 rounded-md bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center gap-1 text-xs shadow-2xs hover:bg-blue-100/70 transition-colors">
            <MapPin size={12} className={event.type === 'drop' ? 'text-blue-700 fill-blue-700' : 'text-blue-600'} />
            {(event.pickupCount || event.dropCount) ? (
              <span className="text-[11px] font-semibold text-blue-900">
                {event.pickupCount ? `${event.pickupCount}P` : `${event.dropCount}D`}
              </span>
            ) : null}
          </div>
        );

      case 'empty-leg':
        return (
          <div className="h-8 w-full px-2 rounded-md bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between text-[10px] font-medium text-slate-500">
            <span>-9</span>
            <span>-9</span>
          </div>
        );

      default:
        return (
          <div className="h-8 w-full rounded-md bg-slate-100 border border-slate-200" />
        );
    }
  };

  const getTooltipLabel = () => {
    if (event.pickupCount || event.dropCount) {
      const parts = [];
      if (event.pickupCount) parts.push(`${event.pickupCount} Pickup`);
      if (event.dropCount) parts.push(`${event.dropCount} Drop`);
      return parts.join(', ');
    }
    return event.label || event.type;
  };

  return (
    <div 
      className="absolute top-4 z-10 transition-transform duration-150 hover:scale-[1.02] cursor-pointer"
      style={style}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {renderContent()}
      
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none flex flex-col items-center border border-slate-800">
          <span className="font-semibold">{getTooltipLabel()}</span>
          <span className="text-[10px] text-slate-300 font-mono">
            {event.startTime} - {event.endTime}
          </span>
          <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 border-r border-b border-slate-800"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineSegment;
