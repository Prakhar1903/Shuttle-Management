import React from 'react';
import type { Driver, ScheduleEvent } from '../../types';
import { MapPin, Coffee, Bus } from 'lucide-react';
import { 
  TIMELINE_HOURLY_SLOTS, 
  getTimelinePosition, 
  getTimelineWidth,
  timeToMinutes
} from '../../utils/timeUtils';

interface DriverTimelineProps {
  drivers: Driver[];
}

/**
 * Enterprise Driver Availability Timeline
 * Contiguous flush shift ribbon containers with pixel-perfect hourly grid.
 */
export const DriverTimeline: React.FC<DriverTimelineProps> = ({ drivers }) => {
  // Current time position (12:45 matching reference)
  const currentTimePercentage = getTimelinePosition('12:45');

  // Helper to cluster contiguous events into bounded shift containers
  const getShiftClusters = (events: ScheduleEvent[]) => {
    if (!events || events.length === 0) return [];
    const clusters: { start: string; end: string; isStandby?: boolean; events: ScheduleEvent[] }[] = [];
    let currentClusterEvents = [events[0]];
    let currentStart = events[0].startTime;
    let currentEnd = events[0].endTime;
    let isCurrentStandby = events[0].label === 'Standby';

    for (let i = 1; i < events.length; i++) {
      const prev = events[i - 1];
      const curr = events[i];
      
      const [prevH, prevM] = prev.endTime.split(':').map(Number);
      const [currH, currM] = curr.startTime.split(':').map(Number);
      const gapMinutes = (currH * 60 + currM) - (prevH * 60 + prevM);

      if (gapMinutes > 35) {
        clusters.push({ 
          start: currentStart, 
          end: currentEnd, 
          isStandby: isCurrentStandby,
          events: currentClusterEvents 
        });
        currentStart = curr.startTime;
        currentEnd = curr.endTime;
        isCurrentStandby = curr.label === 'Standby';
        currentClusterEvents = [curr];
      } else {
        currentEnd = curr.endTime;
        if (curr.label === 'Standby') isCurrentStandby = true;
        currentClusterEvents.push(curr);
      }
    }
    clusters.push({ 
      start: currentStart, 
      end: currentEnd, 
      isStandby: isCurrentStandby,
      events: currentClusterEvents 
    });
    return clusters;
  };

  const renderSegmentInsideShift = (event: ScheduleEvent, isStandby?: boolean) => {
    switch (event.type) {
      case 'duty-start':
        return (
          <div className="w-full h-full bg-[#e6f4ea] text-[#137333] border-r border-[#8b5cf6]/30 flex items-center justify-center font-bold text-xs select-none">
            <span className="text-sm font-extrabold leading-none">→</span>
            <span className="text-[10px] ml-0.5">9</span>
          </div>
        );

      case 'duty-end':
        return (
          <div className="w-full h-full bg-[#fde8e8] text-[#d9384e] border-l border-[#8b5cf6]/30 flex items-center justify-center font-bold text-xs select-none">
            <span className="text-[10px] mr-0.5">9</span>
            <span className="text-sm font-extrabold leading-none">↳</span>
          </div>
        );

      case 'break':
        return (
          <div className={`w-full h-full ${isStandby ? 'bg-transparent text-slate-400' : 'bg-[#fde047] text-[#713f12] border-r border-[#8b5cf6]/30'} flex items-center justify-center select-none`}>
            <Coffee size={13} className={isStandby ? 'text-slate-400' : 'text-[#713f12] fill-[#713f12]'} />
          </div>
        );

      case 'vehicle-change':
        return (
          <div className="w-full h-full bg-[#ccfbf1] text-[#0f766e] border-r border-[#8b5cf6]/30 flex items-center justify-center select-none">
            <Bus size={13} className="text-[#0f766e]" />
          </div>
        );

      case 'pickup':
      case 'drop':
        return (
          <div className="w-full h-full bg-[#dbeafe] text-[#1e40af] border-r border-[#8b5cf6]/30 flex items-center justify-center hover:bg-[#bfdbfe] transition-colors relative group/pin select-none">
            <MapPin size={12} className="text-[#1e3a8a] fill-[#1e3a8a]" />
            {/* Tooltip on hover matching reference */}
            <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity duration-150 absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-2xl z-50 pointer-events-none flex flex-col items-center leading-tight whitespace-nowrap">
              <div>{event.pickupCount || 2} Pickup</div>
              <div>{event.dropCount || 3} Drop</div>
              <div className="w-2.5 h-2.5 bg-[#111827] rotate-45 absolute -bottom-1"></div>
            </div>
          </div>
        );

      case 'empty-leg':
        return (
          <div className="w-full h-full bg-[#fce7f3] text-[#9d174d] border-r border-[#8b5cf6]/30 flex items-center justify-between px-1 text-[10px] font-bold select-none">
            <span>-9</span>
            <MapPin size={9} className="text-[#9d174d] fill-[#9d174d]" />
            <span>-9</span>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-slate-100 border border-slate-200" />
        );
    }
  };

  return (
    <div className="min-w-[1294px] select-none">
      {/* Timeline Hour Header (h-11 matching Driver column) */}
      <div className="h-[65px] border-b border-[#e0e2e6] bg-white sticky top-0 z-20 pt-[19px] px-9 pr-6">
        <div className="h-[39px] flex items-center text-[14px] font-medium text-[#303746]">
          {TIMELINE_HOURLY_SLOTS.map((hour) => (
            <div key={hour} className="flex-1 flex items-center justify-start pl-1.5 border-r border-[#eceef2] h-full">
              {hour}:00
            </div>
          ))}
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative">
        {/* Vertical Column Guides */}
        <div className="absolute inset-y-0 left-9 right-6 flex pointer-events-none z-0">
          {TIMELINE_HOURLY_SLOTS.map((hour) => (
            <div 
              key={`grid-${hour}`} 
              className="flex-1 border-r border-slate-100 h-full"
            />
          ))}
        </div>

        {/* Current Time Indicator (Vertical line at 12:45 with top circle pin) */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-[#666d76] z-20 pointer-events-none"
          style={{ left: `calc(36px + (100% - 60px) * ${currentTimePercentage / 100})` }}
        >
          {/* Top Pin Header circle at timeline header edge */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#475569] border border-white shadow-xs"></div>
        </div>

        {/* Driver Rows (h-[68px] precisely matching DriverList) */}
        <div className="flex flex-col relative z-10">
          {drivers.map((driver) => {
            const shiftClusters = getShiftClusters(driver.schedule || []);

            return (
              <div 
                key={driver.id} 
              className="h-[71px] border-b border-[#edf0f3] relative flex items-center hover:bg-slate-50/20 transition-colors group"
              >
                {/* Contiguous Bounded Shift Containers */}
                {shiftClusters.map((cluster, cIdx) => {
                  const cLeft = getTimelinePosition(cluster.start);
                  const cWidth = getTimelineWidth(cluster.start, cluster.end);
                  const clusterTotalDuration = timeToMinutes(cluster.end) - timeToMinutes(cluster.start) || 1;
                  const isStandby = cluster.isStandby || (cluster.start >= '16:00' && driver.status === 'Offline');

                  return (
                    <div 
                      key={`cluster-${driver.id}-${cIdx}`}
                      className={`absolute h-12 top-[12px] rounded-md overflow-hidden flex z-10 ${
                        isStandby
                          ? 'border border-slate-200/90 bg-[#f0fdfa]/40 shadow-xs'
                          : 'border border-[#8b5cf6]/60 bg-white shadow-2xs'
                      }`}
                      style={{ left: `calc(36px + (100% - 60px) * ${cLeft / 100})`, width: `calc((100% - 60px) * ${cWidth / 100})` }}
                    >
                      {cluster.events.map((event, eIdx) => {
                        const evDuration = Math.max(12, (timeToMinutes(event.endTime) - timeToMinutes(event.startTime)));
                        const evWidthPercent = (evDuration / clusterTotalDuration) * 100;

                        return (
                          <div 
                            key={`${event.id}-${eIdx}`}
                            className="h-full relative shrink-0 flex items-center justify-center cursor-pointer group/seg"
                            style={{ width: `${evWidthPercent}%` }}
                          >
                            {renderSegmentInsideShift(event, isStandby)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}

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
