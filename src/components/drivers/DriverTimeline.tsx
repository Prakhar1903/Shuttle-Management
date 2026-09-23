import React from 'react';
import type { Driver } from '../../types';
import { TimelineSegment } from './TimelineSegment';
import { getTimelinePosition, getTimelineWidth } from '../../utils/timeUtils';

interface DriverTimelineProps {
  drivers: Driver[];
}

/**
 * Driver Availability Timeline Grid
 * Renders the hourly Gantt timeline with current-time vertical indicator,
 * grid dividers, and interactive driver shift events.
 */
export const DriverTimeline: React.FC<DriverTimelineProps> = ({ drivers }) => {
  // Hours from 6:00 to 22:00 (17 hours)
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // Set current indicator position around mid-day (12:30) to match MoveInSync reference
  const currentIndicatorPosition = getTimelinePosition('12:30');

  return (
    <div className="min-w-[1050px] relative select-none">
      {/* Timeline Hour Header */}
      <div className="flex h-11 border-b border-gray-200/90 bg-gray-50/70 text-xs font-semibold text-gray-500 sticky top-0 z-20">
        {hours.map((hour) => (
          <div 
            key={hour} 
            className="flex-1 flex items-center justify-center border-r border-gray-200/60 last:border-r-0 font-medium"
          >
            {hour}:00
          </div>
        ))}
      </div>

      {/* Grid Canvas */}
      <div className="relative">
        {/* Full-height Vertical Dashed Guide Lines */}
        <div className="absolute inset-0 flex pointer-events-none z-0">
          {hours.map((hour) => (
            <div 
              key={`grid-${hour}`} 
              className="flex-1 border-r border-dashed border-gray-200/80 h-full"
            />
          ))}
        </div>

        {/* Current Time Indicator matching Screenshot 1 (Vertical line at 12:30 with top pin) */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-slate-600 z-30 pointer-events-none"
          style={{ left: `${currentIndicatorPosition}%` }}
        >
          {/* Top circle marker */}
          <div className="absolute -top-2.5 -translate-x-[5px] w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          </div>
        </div>

        {/* Driver Schedule Tracks */}
        <div className="flex flex-col relative z-10">
          {drivers.map((driver) => (
            <div 
              key={driver.id} 
              className="h-[72px] border-b border-gray-100/90 relative flex items-center hover:bg-slate-50/50 transition-colors group"
            >
              {/* Background shift track guide */}
              <div className="absolute inset-x-0 h-10 top-4 bg-slate-100/40 rounded-lg pointer-events-none border border-slate-200/30"></div>

              {/* Render Driver's Schedule Events */}
              {driver.schedule?.map((event, index) => {
                const left = getTimelinePosition(event.startTime);
                const width = Math.max(2.5, getTimelineWidth(event.startTime, event.endTime));
                
                return (
                  <TimelineSegment 
                    key={`${driver.id}-event-${index}`} 
                    event={event} 
                    style={{ 
                      left: `${left}%`, 
                      width: `${width}%`,
                      minWidth: event.type === 'duty-start' || event.type === 'duty-end' ? '38px' : '32px'
                    }} 
                  />
                );
              })}
            </div>
          ))}

          {drivers.length === 0 && (
            <div className="h-40 flex items-center justify-center text-sm text-gray-400">
              No schedule records for selected date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverTimeline;
