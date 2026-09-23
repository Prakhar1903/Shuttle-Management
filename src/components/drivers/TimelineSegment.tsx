import React, { useState } from 'react';
import { MapPin, Coffee, Bus } from 'lucide-react';
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
          <div className="h-8 px-2 rounded-l-md bg-[#e6f4ea] text-[#137333] border border-[#a3e635]/50 flex items-center justify-center gap-0.5 font-bold text-xs shadow-2xs">
            <span className="text-sm font-extrabold">→</span>
            <span className="text-[10px]">9</span>
          </div>
        );

      case 'duty-end':
        return (
          <div className="h-8 px-2 rounded-r-md bg-[#fde8e8] text-[#d9384e] border border-[#fca5a5]/50 flex items-center justify-center gap-0.5 font-bold text-xs shadow-2xs">
            <span className="text-[10px]">9</span>
            <span className="text-sm font-extrabold">↳</span>
          </div>
        );

      case 'break':
        return (
          <div className="h-8 w-full px-2 rounded-sm bg-[#fde047] text-[#713f12] border border-[#eab308]/60 flex items-center justify-center gap-1 shadow-2xs">
            <Coffee size={13} className="text-[#713f12] fill-[#713f12]" />
          </div>
        );

      case 'vehicle-change':
        return (
          <div className="h-8 w-full px-2 rounded-sm bg-[#ccfbf1] text-[#0f766e] border border-[#5eead4]/60 flex items-center justify-center shadow-2xs">
            <Bus size={13} className="text-[#0f766e]" />
          </div>
        );

      case 'pickup':
      case 'drop':
        return (
          <div className="h-8 w-full px-1.5 rounded-sm bg-[#dbeafe] text-[#1e40af] border border-[#93c5fd]/60 flex items-center justify-center gap-1 shadow-2xs hover:bg-[#bfdbfe] transition-colors">
            <MapPin size={12} className="text-[#1e3a8a] fill-[#1e3a8a]" />
          </div>
        );

      case 'empty-leg':
        return (
          <div className="h-8 w-full px-1.5 rounded-sm bg-[#fce7f3] text-[#9d174d] border border-[#f472b6]/50 flex items-center justify-between text-[10px] font-bold">
            <span>-9</span>
            <MapPin size={10} className="text-[#9d174d] fill-[#9d174d]" />
            <span>-9</span>
          </div>
        );

      default:
        return (
          <div className="h-8 w-full rounded-sm bg-slate-100 border border-slate-200" />
        );
    }
  };

  return (
    <div 
      className="absolute top-[18px] z-10 transition-transform duration-100 hover:scale-[1.02] cursor-pointer"
      style={style}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {renderContent()}
      
      {/* Tooltip on hover matching reference screenshot */}
      {showTooltip && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-2xl z-50 pointer-events-none flex flex-col items-center leading-tight whitespace-nowrap">
          <div>{event.pickupCount || 2} Pickup</div>
          <div>{event.dropCount || 3} Drop</div>
          <div className="w-2.5 h-2.5 bg-[#111827] rotate-45 absolute -bottom-1"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineSegment;
