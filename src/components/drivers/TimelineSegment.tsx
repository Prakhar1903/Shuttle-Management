import React, { useState } from 'react';
import { Play, Square, MapPin, Coffee, Bus } from 'lucide-react';
import type { ScheduleEvent } from '../../types';

interface TimelineSegmentProps {
  event: ScheduleEvent;
  style: React.CSSProperties;
}

export const TimelineSegment: React.FC<TimelineSegmentProps> = ({ event, style }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderContent = () => {
    switch (event.type) {
      case 'duty-start':
        return (
          <div className="h-full bg-blue-100 rounded-md border border-blue-200 flex items-center justify-center text-blue-600 segment-duty cursor-pointer px-1">
            <Play size={12} className="mr-1" />
            <span className="text-[10px] font-bold">-9</span>
          </div>
        );
      case 'duty-end':
        return (
          <div className="h-full bg-blue-100 rounded-md border border-blue-200 flex items-center justify-center text-blue-600 segment-duty cursor-pointer px-1">
            <span className="text-[10px] font-bold mr-1">-9</span>
            <Square size={12} />
          </div>
        );
      case 'pickup':
        return (
          <div className="h-full bg-orange-100 rounded-md border border-orange-200 flex items-center justify-center text-orange-500 cursor-pointer">
            <MapPin size={12} />
          </div>
        );
      case 'drop':
        return (
          <div className="h-full bg-orange-100 rounded-md border border-orange-200 flex items-center justify-center text-orange-600 cursor-pointer">
            <MapPin size={12} className="fill-current" />
          </div>
        );
      case 'break':
        return (
          <div className="h-full bg-purple-100 rounded-md border border-purple-200 flex items-center justify-center text-purple-600 segment-break cursor-pointer">
            <Coffee size={12} />
          </div>
        );
      case 'vehicle-change':
        return (
          <div className="h-full bg-green-100 rounded-md border border-green-200 flex items-center justify-center text-green-600 segment-vehicle-change cursor-pointer">
            <Bus size={12} />
          </div>
        );
      case 'empty-leg':
        return (
          <div className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-md flex items-center justify-between px-2 text-gray-500 segment-empty-leg cursor-pointer">
            <span className="text-[10px] font-medium">-9</span>
            <span className="text-[10px] font-medium">-9</span>
          </div>
        );
      default:
        return <div className="h-full bg-gray-200 rounded-md" />;
    }
  };

  const getTooltipContent = () => {
    if (event.type === 'pickup' || event.type === 'drop') {
      return `${event.pickupCount || 0} Pickup, ${event.dropCount || 0} Drop`;
    }
    if (event.type === 'break') {
      return 'Break';
    }
    return event.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div 
      className="absolute top-2 bottom-2 z-10"
      style={style}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {renderContent()}
      
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
          {getTooltipContent()}
          <div className="text-[10px] text-gray-300 mt-0.5">
            {event.startTime} - {event.endTime}
          </div>
        </div>
      )}
    </div>
  );
};
