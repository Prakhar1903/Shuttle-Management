import React, { useState } from 'react';
import { useDrivers } from '../../context/DriverContext';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';
import { DriverList } from './DriverList';
import { DriverTimeline } from './DriverTimeline';

/**
 * Driver Availability & Scheduling Component
 * Clean enterprise Gantt scheduling view with driver search,
 * pixel-perfect hourly grid, and separated legend.
 */
export const DriverManagement: React.FC = () => {
  const { state } = useDrivers();
  const { drivers } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2021-12-16');
  const [selectedDriverId, setSelectedDriverId] = useState<string | undefined>();

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Driver Availability</h2>
          <p className="text-xs text-slate-500 mt-0.5">Live duty timelines, shift progress, and hourly driver scheduling.</p>
        </div>

        {/* Action Controls & Date */}
        <div className="flex items-center gap-3">
          <DatePicker 
            value={selectedDate} 
            onChange={setSelectedDate} 
          />
        </div>
      </div>

      {/* Main Scheduling Card: Synchronized Grid */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex">
        {/* Left Column: Search & Driver Names (w-64 fixed) */}
        <div className="w-64 shrink-0 border-r border-slate-200/90 bg-white flex flex-col">
          {/* Top Left Header Cell (40px = h-10 matching timeline hours) */}
          <div className="h-10 px-2.5 bg-slate-50/80 border-b border-slate-200 flex items-center">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search driver..."
              className="w-full text-xs"
            />
          </div>
          {/* Driver Rows (each item 64px = h-16) */}
          <DriverList 
            drivers={filteredDrivers}
            selectedDriverId={selectedDriverId}
            onSelectDriver={(d) => setSelectedDriverId(d.id)}
          />
        </div>

        {/* Right Column: Timeline Canvas (Hours Header + Shift Tracks) */}
        <div className="flex-1 overflow-x-auto bg-white min-w-0">
          <DriverTimeline drivers={filteredDrivers} />
        </div>
      </div>

      {/* Separated Legend Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 px-1">
        <span className="font-medium text-slate-400">Timeline Key:</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-medium">Duty Start</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-600 font-medium">Duty End</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-600 font-medium">Pickup / Drop</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-600 font-medium">Break Period</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <span className="text-slate-600 font-medium">Vehicle Change</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="text-slate-500 font-medium">Empty Leg</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverManagement;
