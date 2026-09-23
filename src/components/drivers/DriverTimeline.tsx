import React from 'react';
import type { Driver } from '../../types';
import { TimelineSegment } from './TimelineSegment';
import { 
  TIMELINE_HOURLY_SLOTS, 
  TIMELINE_END_HOUR, 
  getTimelinePosition, 
  getTimelineWidth 
} from '../../utils/timeUtils';

interface DriverTimelineProps {
  drivers: Driver[];
}

/**
 * Enterprise Driver Availability Timeline
 * Pixel-aligned hourly timeline grid with subtle current-time vertical indicator.
 */
export const DriverTimeline: React.FC<DriverTimelineProps> = ({ drivers }) => {
  // Current time position (12:30 for MoveInSync reference)
  const currentTimePercentage = getTimelinePosition('12:30');

  return (
    <div className="min-w-[1240px] select-none">
      {/* Timeline Hour Header */}
      <div className="h-10 border-b border-slate-200 bg-slate-50/80 flex items-center text-xs font-semibold text-slate-500 sticky top-0 z-20">
        {TIMELINE_HOURLY_SLOTS.map((hour) => (
          <div 
            key={hour} 
            className="flex-1 flex items-center justify-start pl-2 border-r border-slate-200/70 h-full font-mono text-[11px]"
          >
            {hour.toString().padStart(2, '0')}:00
          </div>
        ))}
        {/* Final hour mark at right edge */}
        <div className="w-12 text-right pr-2 font-mono text-[11px] text-slate-400">
          {TIMELINE_END_HOUR}:00
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative">
        {/* Vertical Column Guides */}
        <div className="absolute inset-0 flex pointer-events-none z-0">
          {TIMELINE_HOURLY_SLOTS.map((hour) => (
            <div 
              key={`grid-${hour}`} 
              className="flex-1 border-r border-slate-100 h-full"
            />
          ))}
          <div className="w-12 h-full" />
        </div>

        {/* Current Time Indicator (Vertical line at 12:30) */}
        <div 
          className="absolute top-0 bottom-0 w-[1.5px] bg-blue-500 z-20 pointer-events-none"
          style={{ left: `${currentTimePercentage}%` }}
        >
          {/* Top Pin Header */}
          <div className="absolute -top-2.5 -translate-x-[5px] w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></div>
        </div>

        {/* Driver Rows */}
        <div className="flex flex-col relative z-10">
          {drivers.map((driver) => (
            <div 
              key={driver.id} 
              className="h-16 border-b border-slate-100 relative flex items-center hover:bg-slate-50/40 transition-colors group"
            >
              {/* Subtle shift background track */}
              <div className="absolute inset-x-2 h-9 top-3.5 bg-slate-50/70 rounded-md pointer-events-none border border-slate-200/40"></div>

              {/* Driver's Scheduled Events */}
              {driver.schedule?.map((event, index) => {
                const left = getTimelinePosition(event.startTime);
                const width = Math.max(3.2, getTimelineWidth(event.startTime, event.endTime));

                return (
                  <TimelineSegment 
                    key={`${driver.id}-event-${index}`} 
                    event={event} 
                    style={{ 
                      left: `${left}%`, 
                      width: `${width}%`,
                      minWidth: event.type === 'duty-start' || event.type === 'duty-end' ? '40px' : '44px'
                    }} 
                  />
                );
              })}
            </div>
          ))}

          {drivers.length === 0 && (
            <div className="h-32 flex items-center justify-center text-sm text-slate-400">
              No drivers found for this view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverTimeline;
