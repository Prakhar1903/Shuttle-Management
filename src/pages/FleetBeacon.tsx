import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Bus, 
  BatteryCharging, 
  Fuel, 
  Gauge, 
  Wifi, 
  Users, 
  CheckCircle2, 
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BeaconVehicle {
  id: string;
  name: string;
  plate: string;
  type: string;
  driver: string;
  driverPhone: string;
  status: 'In Transit' | 'At Station' | 'Standby' | 'Depot';
  currentLocation: string;
  nextStop: string;
  speed: number;
  batteryOrFuel: string;
  isElectric: boolean;
  passengers: number;
  capacity: number;
  lastPing: string;
  coordinates: { x: number; y: number }; // percentage on visual map
}

const MOCK_BEACON_VEHICLES: BeaconVehicle[] = [
  {
    id: 'NB-002-RF',
    name: 'White Bus Alpha',
    plate: 'UA3282',
    type: 'White Bus',
    driver: 'Samuel Jones',
    driverPhone: '555-0101',
    status: 'In Transit',
    currentLocation: 'Campus Avenue',
    nextStop: 'Library',
    speed: 28,
    batteryOrFuel: '84%',
    isElectric: true,
    passengers: 8,
    capacity: 12,
    lastPing: '2s ago',
    coordinates: { x: 38, y: 42 }
  },
  {
    id: 'NB-005-BL',
    name: 'Blue Shuttle Beta',
    plate: 'UA9104',
    type: 'Blue Minibus',
    driver: 'Bob Jones',
    driverPhone: '555-0102',
    status: 'At Station',
    currentLocation: 'Admin Block',
    nextStop: 'Hostel B',
    speed: 0,
    batteryOrFuel: '68%',
    isElectric: false,
    passengers: 5,
    capacity: 16,
    lastPing: '4s ago',
    coordinates: { x: 62, y: 28 }
  },
  {
    id: 'NB-001-RD',
    name: 'Red Cruiser Gamma',
    plate: 'UA1108',
    type: 'Red Van',
    driver: 'Jonathan Spikes',
    driverPhone: '555-0103',
    status: 'Standby',
    currentLocation: 'Main Depot',
    nextStop: 'Main Gate',
    speed: 0,
    batteryOrFuel: '95%',
    isElectric: true,
    passengers: 0,
    capacity: 8,
    lastPing: '1s ago',
    coordinates: { x: 18, y: 72 }
  }
];

const CAMPUS_STOPS = [
  { name: 'Main Gate', x: 12, y: 55 },
  { name: 'Hostel A', x: 25, y: 22 },
  { name: 'Hostel B', x: 45, y: 18 },
  { name: 'Library', x: 42, y: 50 },
  { name: 'Data Centre', x: 58, y: 65 },
  { name: 'Admin Block', x: 65, y: 32 },
  { name: 'Sports Complex', x: 80, y: 48 },
  { name: 'Cafeteria', x: 75, y: 75 },
  { name: 'Main Depot', x: 16, y: 78 }
];

export const FleetBeacon: React.FC = () => {
  const [vehicles] = useState<BeaconVehicle[]>(MOCK_BEACON_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<BeaconVehicle>(MOCK_BEACON_VEHICLES[0]);

  const handleRefresh = () => {
    toast.success('GPS telemetry synchronized across all beacons');
  };

  return (
    <div className="space-y-7 animate-fade-in select-none">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-[#102d69] animate-pulse" />
            <span>Fleet Beacon & Live Telemetry</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time GPS vehicle coordinates, telemetry sensors, speed logs, and station geofence tracking.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Beacon Signal: 100%</span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="h-9 inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sync Telemetry</span>
          </button>
        </div>
      </div>

      {/* 2. Beacon KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">3 / 3</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Transmitting Beacons</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">1.8s</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Avg Ping Latency</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">28 km/h</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Campus Fleet Speed</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">100%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Geofence Compliance</div>
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column: Interactive Campus Radar Map + Vehicle Telemetry Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Interactive Campus Visual Radar Map */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Interactive Campus Beacon Radar</span>
              </h2>
              <p className="text-xs text-slate-500">Live positions of shuttles relative to university waypoints</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Station
              </span>
              <span className="inline-flex items-center gap-1 text-blue-700 ml-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span> Active Shuttle
              </span>
            </div>
          </div>

          {/* Visual Map Canvas */}
          <div className="relative w-full h-[420px] bg-slate-100/90 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

            {/* Simulated Road Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 stroke-[2] stroke-dasharray-[4,4] fill-none">
              <path d="M 80 230 L 170 90 L 300 80 L 450 140 L 530 200 L 490 310 L 280 270 Z" />
              <path d="M 170 90 L 280 210 L 490 310" />
            </svg>

            {/* Campus Station Markers */}
            {CAMPUS_STOPS.map((stop) => (
              <div
                key={stop.name}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-default"
              >
                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-400 flex items-center justify-center shadow-xs group-hover:border-blue-600 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-blue-600" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs whitespace-nowrap">
                  {stop.name}
                </span>
              </div>
            ))}

            {/* Live Shuttle Markers */}
            {vehicles.map((v) => {
              const isSelected = selectedVehicle.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicle(v)}
                  style={{ left: `${v.coordinates.x}%`, top: `${v.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform ${
                    isSelected ? 'scale-115 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  <div className={`p-2 rounded-xl text-white shadow-md flex items-center gap-1.5 ${
                    isSelected ? 'bg-[#102d69] ring-4 ring-blue-300/60' : 'bg-blue-600'
                  }`}>
                    <Bus size={15} />
                    <span className="text-[11px] font-mono font-bold">{v.id}</span>
                  </div>
                  <span className="mt-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[9px] font-bold">
                    {v.speed > 0 ? `${v.speed} km/h` : 'At Stop'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right (4 cols): Selected Vehicle Live Telemetry Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Selected Telemetry</span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{selectedVehicle.name}</h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">{selectedVehicle.id} • {selectedVehicle.plate}</div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              selectedVehicle.status === 'In Transit' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {selectedVehicle.status}
            </span>
          </div>

          {/* Sensor Gauges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Gauge size={12} className="text-blue-600" />
                <span>Current Speed</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{selectedVehicle.speed} <span className="text-xs font-normal text-slate-500">km/h</span></div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                {selectedVehicle.isElectric ? (
                  <BatteryCharging size={12} className="text-emerald-600" />
                ) : (
                  <Fuel size={12} className="text-amber-600" />
                )}
                <span>{selectedVehicle.isElectric ? 'Battery' : 'Fuel'}</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{selectedVehicle.batteryOrFuel}</div>
            </div>
          </div>

          {/* Location & Next Stop */}
          <div className="space-y-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Current Station / Zone:</span>
              <span className="font-bold text-slate-900">{selectedVehicle.currentLocation}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Heading Towards:</span>
              <span className="font-bold text-blue-700 flex items-center gap-1">
                <MapPin size={12} /> {selectedVehicle.nextStop}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Passenger Load:</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 font-mono">
                <Users size={12} className="text-slate-500" /> {selectedVehicle.passengers} / {selectedVehicle.capacity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Assigned Driver:</span>
              <span className="font-bold text-slate-900">{selectedVehicle.driver}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Last GPS Beacon:</span>
              <span className="font-mono text-slate-600">{selectedVehicle.lastPing}</span>
            </div>
          </div>

          {/* Quick Vehicle Switcher List */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Switch Active Shuttle:</span>
            <div className="flex flex-col gap-1.5">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicle(v)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    selectedVehicle.id === v.id
                      ? 'bg-blue-50 border-blue-300 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bus size={14} className={selectedVehicle.id === v.id ? 'text-blue-700' : 'text-slate-500'} />
                    <span className="text-xs font-bold text-slate-900">{v.id}</span>
                    <span className="text-[11px] text-slate-500">({v.type})</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600">{v.speed} km/h</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetBeacon;
