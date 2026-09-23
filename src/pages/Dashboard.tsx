import { mockStats, hourlyDemand, mockBookings } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Users, Bus, CheckCircle2, Clock, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Modern Transit Analytics Dashboard
 * Campus Shuttle Overview with KPI cards, demand chart, and recent rides.
 */
const Dashboard = () => {
  const maxDemand = Math.max(...hourlyDemand.map((d) => d.bookings));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Performance & Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time transit performance metrics, passenger volume, and route analytics</p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Bus className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-none">{mockStats.totalBookings.toLocaleString()}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1.5">Total Bookings</p>
          </div>
        </div>

        {/* Active Drivers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-none">{mockStats.activeDrivers}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1.5">Active Drivers</p>
          </div>
        </div>

        {/* Completed Trips */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-none">{mockStats.completedTrips.toLocaleString()}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1.5">Completed Trips</p>
          </div>
        </div>

        {/* Peak Hour */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 leading-none">{mockStats.peakHour}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1.5">Peak Hour Demand</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Hourly Demand Chart + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Hourly Demand Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-7 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Hourly Booking Demand</h2>
              <p className="text-xs text-slate-500 mt-0.5">Peak campus passenger rush hours (6:00 to 23:00)</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 text-blue-700">
                <span className="w-3 h-3 rounded bg-blue-600"></span> Peak Hours
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded bg-blue-200"></span> Standard Hours
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end gap-2 h-64 pt-6 pb-2 border-b border-slate-100">
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
                        : 'bg-blue-200/80 hover:bg-blue-300'
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

          <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
            <span>Morning Shifts (06:00 - 12:00)</span>
            <span>Evening Rush (16:00 - 20:00)</span>
          </div>
        </div>

        {/* Recent Bookings Widget */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">Recent Rides</h2>
            <Link to="/management" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex-1 space-y-3.5 overflow-y-auto">
            {mockBookings.slice(0, 5).map((booking) => (
              <div 
                key={booking.id} 
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-800 text-sm">{booking.employeeName}</span>
                  <StatusBadge status={booking.status} />
                </div>
                
                <div className="flex items-center text-xs text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="truncate">{booking.from} → {booking.to}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span className="font-mono text-slate-500">#{booking.id}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {booking.requestedPickupTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Route Overview Cards */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Campus Route Utilization</h2>
            <p className="text-xs text-slate-500 mt-0.5">Key university transit lines, stops, and average travel durations</p>
          </div>
          <Link to="/routes" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <span>Manage Routes</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* North Campus */}
          <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all bg-slate-50/40">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 text-sm">North Campus Loop</h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-semibold">Active</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">5 Campus Stops • Library, Labs, Cafeteria</p>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-200/70 font-medium">
              <span className="flex items-center gap-1"><Clock size={13} className="text-slate-400" /> 25 mins</span>
              <span className="flex items-center gap-1"><TrendingUp size={13} className="text-slate-400" /> 5.2 km</span>
            </div>
          </div>

          {/* South Tech Park */}
          <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all bg-slate-50/40">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 text-sm">South Tech Park</h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-semibold">Active</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">3 Express Stops • Data Centre, Hostels</p>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-200/70 font-medium">
              <span className="flex items-center gap-1"><Clock size={13} className="text-slate-400" /> 15 mins</span>
              <span className="flex items-center gap-1"><TrendingUp size={13} className="text-slate-400" /> 3.8 km</span>
            </div>
          </div>

          {/* Metro Station Express */}
          <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all bg-slate-50/40">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 text-sm">Metro Station Express</h3>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 text-xs rounded-full font-semibold">Inactive</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">2 Direct Stops • Main Gate, Metro Hub</p>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-200/70 font-medium">
              <span className="flex items-center gap-1"><Clock size={13} className="text-slate-400" /> 10 mins</span>
              <span className="flex items-center gap-1"><TrendingUp size={13} className="text-slate-400" /> 2.1 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
