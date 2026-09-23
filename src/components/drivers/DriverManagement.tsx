import { useState } from 'react';
import { useDrivers } from '../../context/DriverContext';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';
import { DriverList } from './DriverList';
import { DriverTimeline } from './DriverTimeline';
import { Play, Square, MapPin, Coffee, Bus, GripHorizontal } from 'lucide-react';

/**
 * Driver Management section — top half of the Management page.
 * Contains driver list with search, timeline visualization, and legend.
 */
export const DriverManagement: React.FC = () => {
  const { state } = useDrivers();
  const { drivers } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | undefined>();

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Driver Management</h2>
        <DatePicker 
          value={selectedDate} 
          onChange={setSelectedDate} 
        />
      </div>

      <div className="flex border rounded-lg overflow-hidden h-[400px]">
        {/* Left column — Driver List with search */}
        <div className="w-56 bg-gray-50 flex flex-col border-r">
          <div className="p-3 border-b">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search driver..."
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <DriverList 
              drivers={filteredDrivers}
              selectedDriverId={selectedDriverId}
              onSelectDriver={(d) => setSelectedDriverId(d.id)}
            />
          </div>
        </div>

        {/* Right column — Timeline */}
        <div className="flex-1 overflow-x-auto relative bg-white">
          <DriverTimeline drivers={filteredDrivers} />
        </div>
      </div>

      {/* Legend bar */}
      <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
            <Play size={14} />
          </div>
          <span>Duty Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
            <Square size={14} />
          </div>
          <span>Duty End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-orange-500">
            <MapPin size={14} />
          </div>
          <span>Pickup/Drop</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600">
            <Coffee size={14} />
          </div>
          <span>Break</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-600">
            <Bus size={14} />
          </div>
          <span>Vehicle Change</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <GripHorizontal size={14} />
          </div>
          <span>Empty Leg</span>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
