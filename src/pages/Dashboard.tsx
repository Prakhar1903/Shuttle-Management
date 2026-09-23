import { mockStats, hourlyDemand, mockBookings } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Users, Bus, CheckCircle, Clock, TrendingUp, MapPin } from 'lucide-react';

const Dashboard = () => {
  const maxDemand = Math.max(...hourlyDemand.map((d) => d.bookings));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Campus Shuttle Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Bus className="text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.totalBookings}</p>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <Users className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.activeDrivers}</p>
            <p className="text-sm text-gray-500">Active Drivers</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <CheckCircle className="text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.completedTrips}</p>
            <p className="text-sm text-gray-500">Completed Trips</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
            <Clock className="text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.peakHour}</p>
            <p className="text-sm text-gray-500">Peak Hour</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Hourly Booking Demand</h2>
          <div className="flex items-end space-x-2 h-48 mt-4">
            {hourlyDemand.map((data, index) => {
              const heightPercentage = (data.bookings / maxDemand) * 100;
              const isPeak = heightPercentage > 80;
              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div 
                    className={`w-full rounded-t-sm ${isPeak ? 'bg-blue-600' : 'bg-blue-200'}`}
                    style={{ height: `${heightPercentage}%` }}
                    title={`${data.hour}: ${data.bookings} bookings`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                    {data.hour}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {mockBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="border border-gray-100 rounded-lg p-3 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{booking.employeeName}</span>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate">{booking.from} → {booking.to}</span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{booking.requestedPickupTime}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <a href="/management" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Go to Management →
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Route Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Using mock data for routes or just dummy if not available */}
          <div className="border border-gray-100 rounded-lg p-4">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-semibold text-gray-800">North Campus Loop</h3>
               <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Active</span>
             </div>
             <p className="text-sm text-gray-600 mb-3">5 Stops</p>
             <div className="flex space-x-4 text-sm text-gray-500">
               <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 25 mins</span>
               <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> 5.2 km</span>
             </div>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-semibold text-gray-800">South Tech Park</h3>
               <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Active</span>
             </div>
             <p className="text-sm text-gray-600 mb-3">3 Stops</p>
             <div className="flex space-x-4 text-sm text-gray-500">
               <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 15 mins</span>
               <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> 3.8 km</span>
             </div>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-semibold text-gray-800">Metro Station Express</h3>
               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Inactive</span>
             </div>
             <p className="text-sm text-gray-600 mb-3">2 Stops</p>
             <div className="flex space-x-4 text-sm text-gray-500">
               <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 10 mins</span>
               <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> 2.1 km</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
