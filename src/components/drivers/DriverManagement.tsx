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
import { MapPin, Coffee, Bus } from 'lucide-react';

export const DriverManagement: React.FC = () => {
  const { state } = useDrivers();
  const { drivers } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-12-16');
  const [selectedDriverId, setSelectedDriverId] = useState<string | undefined>();

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // The scheduler keeps its initial viewport deliberately concise, as in the
  // supplied design. A search always returns every matching driver.
  const displayedDrivers = searchQuery ? filteredDrivers : filteredDrivers.slice(0, 3);

  return (
    <section className="scheduler-card bg-white rounded-[14px] border border-[#dedfe3] shadow-sm">
      {/* Card Header: Title on Left, Date Picker on Right */}
      <div className="scheduler-head flex items-center justify-between">
        <h2 className="scheduler-title text-[17px] font-semibold text-[#171923] tracking-[-0.02em]">
          Driver Management
        </h2>

        {/* Date Selector */}
        <DatePicker 
          value={selectedDate} 
          onChange={setSelectedDate} 
        />
      </div>

      {/* Main Scheduling Grid: Synchronized Canvas */}
      <div className="scheduler-grid rounded-[10px] border border-[#dedfe3] overflow-hidden flex bg-white">
        {/* Left Column: Search & Driver Names (w-[210px] fixed matching reference) */}
        <div className="w-[239px] shrink-0 border-r border-[#e0e2e6] bg-white flex flex-col">
          {/* Top Left Header Cell matching reference */}
          <div className="h-[65px] pl-7 pr-5 bg-[#e9edf7] border-b border-[#e0e2e6] flex items-center">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search driver"
              className="w-full"
            />
          </div>
          {/* Driver Rows */}
          <DriverList 
            drivers={displayedDrivers}
            selectedDriverId={selectedDriverId}
            onSelectDriver={(d) => setSelectedDriverId(d.id)}
          />
        </div>

        {/* Right Column: Timeline Canvas */}
        <div className="flex-1 overflow-x-auto bg-white min-w-0">
          <DriverTimeline drivers={displayedDrivers} />
        </div>
      </div>

      {/* Timeline Legend matching reference screenshot */}
      <div className="flex flex-nowrap items-center justify-end overflow-x-auto text-[13px] text-slate-700 gap-x-6 pt-3 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-4 rounded bg-[#e6f4ea] border border-[#a3e635]/60 text-[#137333] flex items-center justify-center font-bold text-[10px]">
            →
          </span>
          <span className="font-medium text-slate-800">Duty Start</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-5 h-4 rounded bg-[#fde8e8] border border-[#fca5a5]/60 text-[#d9384e] flex items-center justify-center font-bold text-[10px]">
            ↳
          </span>
          <span className="font-medium text-slate-800">Duty End</span>
        </div>

        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-[#1e3a8a] fill-[#1e3a8a]" />
          <span className="font-medium text-slate-800">Pickup/Drop</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Coffee size={13} className="text-[#713f12] fill-[#713f12]" />
          <span className="font-medium text-slate-800">Break</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Bus size={13} className="text-[#0f766e]" />
          <span className="font-medium text-slate-800">Vehicle Change</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-[#9d174d] bg-[#fce7f3] border border-[#f472b6]/50 px-1 py-0.2 rounded">
            -9
          </span>
          <span className="font-medium text-slate-800">Empty Leg</span>
        </div>
      </div>
    </section>
  );
};

export default DriverManagement;
