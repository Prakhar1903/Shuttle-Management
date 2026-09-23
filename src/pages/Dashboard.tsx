import { useState } from 'react';
import { mockStats, hourlyDemand, mockBookings, mockRoutes, mockVehicles } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  Users, 
  Bus, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  Download, 
  BatteryCharging, 
  ShieldCheck, 
  Route as RouteIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Enterprise Transit Performance & Analytics Dashboard
 * Comprehensive operational overview with KPI metrics, demand visualization,
 * real-time ride activity, route performance, and fleet capacity health.
 */
const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('today');
  const maxDemand = Math.max(...hourlyDemand.map((d) => d.bookings));

  const handleExport = () => {
    toast.success('Performance report exported to CSV successfully');
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* 1. Page Header with Time Range Filter & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Performance & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time university transit operational metrics, hourly passenger demand, and vehicle fleet utilization.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === 'today'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === '7d'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past 7 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === '30d'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past 30 Days
            </button>
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="h-9 inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Primary KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Total Bookings */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
              <Bus className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {mockStats.totalBookings.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>+14.8% vs last week</span>
            </div>
          </div>
        </div>

        {/* Active Drivers */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Drivers</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 text-3xl font-extrabold text-slate-900 tracking-tight">
              <span>{mockStats.activeDrivers}</span>
              <span className="text-sm font-semibold text-slate-400">/ 5 Registered</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>60% fleet on-duty</span>
            </div>
          </div>
        </div>

        {/* Completed Trips */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Trips</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {mockStats.completedTrips.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>96.4% fulfillment rate</span>
            </div>
          </div>
        </div>

        {/* Peak Demand Hour */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peak Hour Window</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mockStats.peakHour}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-700">
              <span>150 rides/hr morning spike</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Center: Hourly Demand Chart + Live Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Hourly Booking Demand */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Hourly Passenger Booking Demand</h2>
              <p className="text-xs text-slate-500 mt-0.5">24-hour campus passenger volume distribution across shift lines</p>
            </div>
            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-blue-700">
                <span className="w-3 h-3 rounded bg-blue-600"></span> Peak Rush (&gt;75%)
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-blue-200"></span> Standard Volume
              </span>
            </div>
          </div>

          {/* Bar Chart Canvas (h-64) */}
          <div className="flex items-end gap-1.5 sm:gap-2 h-64 pt-6 pb-2 border-b border-slate-100">
            {hourlyDemand.map((data, index) => {
              const heightPercentage = Math.max(8, (data.bookings / maxDemand) * 100);
              const isPeak = heightPercentage > 75;

              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  {/* Hover Floating Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                    {data.hour} • {data.bookings} rides
                  </div>

                  {/* Vertical Bar */}
                  <div 
                    className={`w-full rounded-t-md transition-all duration-300 group-hover:brightness-90 ${
                      isPeak 
                        ? 'bg-blue-600 shadow-xs' 
                        : 'bg-blue-200 hover:bg-blue-300'
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  />

                  {/* Hour Label */}
                  <span className="text-[10px] font-medium text-slate-400 mt-2 truncate w-full text-center">
                    {data.hour.split(':')[0]}h
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Insights: 3 Rush Windows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-2">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Morning Inflow</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">07:30 – 09:30</div>
              <div className="text-xs text-slate-600 mt-0.5">315 riders (Hostels → Academic)</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Midday Transit</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">12:00 – 13:30</div>
              <div className="text-xs text-slate-600 mt-0.5">205 riders (Labs → Cafeteria)</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Evening Outflow</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">16:30 – 18:30</div>
              <div className="text-xs text-slate-600 mt-0.5">230 riders (Campus → Metro/Gates)</div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Real-Time Fleet Feed / Recent Bookings */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Live Rides</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time trip activity stream</p>
            </div>
            <Link 
              to="/management" 
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Ride List */}
          <div className="space-y-3 mt-4 overflow-y-auto max-h-[380px] pr-1">
            {mockBookings.slice(0, 5).map((booking) => (
              <div 
                key={booking.id} 
                className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs truncate max-w-[140px]">
                    {booking.employeeName}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>
                
                <div className="flex items-center text-xs text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="truncate">{booking.from} → {booking.to}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span className="font-mono text-slate-500 font-medium">#{booking.id}</span>
                  <span className="flex items-center gap-1 font-mono text-slate-600">
                    <Clock size={11} className="text-slate-400" /> {booking.requestedPickupTime}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400">Connected to 4 campus transit stations</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Campus Route Utilization & Fleet Capacity Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Campus Route Utilization */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Campus Route Utilization</h2>
              <p className="text-xs text-slate-500 mt-0.5">Active shuttle circuit run-times and stop volume</p>
            </div>
            <Link to="/routes" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group">
              <span>Manage Routes</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {mockRoutes.slice(0, 4).map((route) => (
              <div 
                key={route.id} 
                className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <RouteIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs">{route.name}</span>
                    <span className={`px-2 py-0.2 rounded-full text-[10px] font-semibold ${
                      route.active 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {route.active ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    {route.stops.join(' → ')}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 shrink-0">
                  <span className="flex items-center gap-1 font-mono text-slate-600">
                    <Clock size={12} className="text-slate-400" /> {route.estimatedTime}m
                  </span>
                  <span className="flex items-center gap-1 font-mono text-slate-600">
                    <TrendingUp size={12} className="text-slate-400" /> {route.distance}km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Fleet Health & Vehicle Capacity */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Fleet Vehicle Capacity & Health</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time seat occupancy and electric shuttle charge status</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              4 Shuttles Online
            </span>
          </div>

          <div className="space-y-3">
            {mockVehicles.map((vehicle, idx) => {
              const occupancy = idx === 0 ? 10 : idx === 1 ? 6 : idx === 2 ? 12 : 4;
              const percent = Math.round((occupancy / vehicle.capacity) * 100);
              const battery = idx === 0 ? 88 : idx === 1 ? 94 : idx === 2 ? 76 : 100;

              return (
                <div 
                  key={vehicle.id} 
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-200/70 px-2 py-0.5 rounded">
                        {vehicle.name}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">{vehicle.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <BatteryCharging size={14} className="text-emerald-600" />
                      <span>{battery}% EV Charge</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
                      <span>Occupancy: {occupancy} / {vehicle.capacity} seats</span>
                      <span className="font-mono font-bold text-slate-700">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          percent > 80 ? 'bg-amber-500' : 'bg-blue-600'
                        }`} 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
