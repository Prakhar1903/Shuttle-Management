import React, { useState } from 'react';
import { useDrivers } from '../../context/DriverContext';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';
import { DriverList } from './DriverList';
import { DriverTimeline } from './DriverTimeline';
import { MapPin, Coffee, Bus, LogIn, LogOut } from 'lucide-react';

/**
 * Driver Availability Management
 * Top half of the main Operations Management view.
 * Features driver search, schedule timeline, and duty state controls.
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
    <section className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-5 md:p-6 mb-7 transition-all">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-1">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">Driver Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time driver roster, shift timelines, and hourly availability</p>
        </div>
        
        {/* Date Selector matching MoveInSync ("Dec 16, 2021") */}
        <DatePicker 
          value={selectedDate} 
          onChange={setSelectedDate} 
        />
      </div>

      {/* Main Timeline Card Container */}
      <div className="border border-gray-200/90 rounded-xl overflow-hidden bg-white shadow-2xs">
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Driver Search + Driver List */}
          <div className="w-full md:w-72 shrink-0 bg-slate-50/60 border-b md:border-b-0 md:border-r border-gray-200/90 flex flex-col">
            {/* Search Input matching Screenshot */}
            <div className="p-3 border-b border-gray-200/90 bg-white">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search driver"
                className="w-full"
              />
            </div>
            
            {/* Driver Items */}
            <div className="flex-1 overflow-y-auto max-h-[380px] md:max-h-none">
              <DriverList 
                drivers={filteredDrivers}
                selectedDriverId={selectedDriverId}
                onSelectDriver={(d) => setSelectedDriverId(d.id)}
              />
            </div>
          </div>

          {/* Right Column: Driver Timeline Grid */}
          <div className="flex-1 overflow-x-auto bg-white min-w-0">
            <DriverTimeline drivers={filteredDrivers} />
          </div>
        </div>
      </div>

      {/* Timeline Legend Bar matching Screenshot 1 */}
      <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 mt-4 pt-4 border-t border-gray-100 text-xs text-slate-600 font-medium select-none">
        {/* Duty Start */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
          <LogIn size={12} className="text-emerald-700" />
          <span>Duty Start</span>
        </div>

        {/* Duty End */}
        <div className="flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200/80 px-2 py-0.5 rounded">
          <span>Duty End</span>
          <LogOut size={12} className="text-rose-700" />
        </div>

        {/* Pickup/Drop */}
        <div className="flex items-center gap-1.5 text-blue-700">
          <MapPin size={13} className="text-blue-600" />
          <span>Pickup/Drop</span>
        </div>

        {/* Break */}
        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
          <Coffee size={13} className="text-amber-700 fill-amber-700" />
          <span>Break</span>
        </div>

        {/* Vehicle Change */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
          <Bus size={13} className="text-emerald-600" />
          <span>Vehicle Change</span>
        </div>

        {/* Empty Leg */}
        <div className="flex items-center gap-1.5 bg-gray-100 border border-dashed border-gray-300 px-2 py-0.5 rounded text-gray-500">
          <span>-9 Empty Leg</span>
        </div>
      </div>
    </section>
  );
};

export default DriverManagement;
