import React from 'react';
import type { Driver } from '../../types';
import { TimelineSegment } from './TimelineSegment';
import { getTimelinePosition, getTimelineWidth } from '../../utils/timeUtils';

interface DriverTimelineProps {
  drivers: Driver[];
}

export const DriverTimeline: React.FC<DriverTimelineProps> = ({ drivers }) => {
  // Hours from 6:00 to 22:00
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // Calculate current time indicator position
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
  
  let currentIndicatorPosition = 0;
  if (currentHour >= 6 && currentHour <= 22) {
    currentIndicatorPosition = getTimelinePosition(timeString);
  }

  return (
    <div className="min-w-[900px]">
      {/* Header with time markers */}
      <div className="flex h-10 border-b bg-gray-50 relative">
        {hours.map((hour) => (
          <div 
            key={hour} 
            className="flex-1 flex justify-center items-center text-xs text-gray-500 font-medium"
          >
            {hour}:00
          </div>
        ))}
      </div>

      {/* Grid lines and content */}
      <div className="relative">
        {/* Vertical dashed lines */}
        <div className="absolute inset-0 flex pointer-events-none">
          {hours.map((hour) => (
            <div key={hour} className="flex-1 border-r border-dashed border-gray-200 h-full"></div>
          ))}
        </div>

        {/* Current time indicator */}
        {currentHour >= 6 && currentHour <= 22 && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-blue-400 z-20 pointer-events-none"
            style={{ left: `${currentIndicatorPosition}%` }}
          >
            <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
        )}

        {/* Driver tracks */}
        <div className="flex flex-col">
          {drivers.map(driver => (
            <div key={driver.id} className="h-14 border-b relative group hover:bg-gray-50 transition-colors">
              {driver.schedule?.map((event, index) => {
                const left = getTimelinePosition(event.startTime);
                const width = getTimelineWidth(event.startTime, event.endTime);
                
                return (
                  <TimelineSegment 
                    key={`${driver.id}-event-${index}`} 
                    event={event} 
                    style={{ left: `${left}%`, width: `${width}%` }} 
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
