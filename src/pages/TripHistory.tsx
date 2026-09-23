import { useState } from 'react';
import { mockBookings } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { History, Filter, Download, MapPin, Clock, User } from 'lucide-react';
// Assuming generic UI components exist or using standard HTML inputs for simplicity
// import SearchBar from '../components/ui/SearchBar';
// import DatePicker from '../components/ui/DatePicker';

const TripHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const historyBookings = mockBookings.filter(b => 
    ['Completed', 'Cancelled', 'Dropped', 'No Show'].includes(b.status)
  );

  const completedCount = historyBookings.filter(b => b.status === 'Completed' || b.status === 'Dropped').length;
  const cancelledCount = historyBookings.filter(b => b.status === 'Cancelled').length;
  const noShowCount = historyBookings.filter(b => b.status === 'No Show').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <History className="w-6 h-6 mr-2 text-gray-500" />
          Trip History
        </h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">Total Trips</p>
          <p className="text-2xl font-bold text-gray-900">{historyBookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-b-4 border-green-500">
          <p className="text-sm text-gray-500 mb-1">Completed</p>
          <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-b-4 border-red-500">
          <p className="text-sm text-gray-500 mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-b-4 border-orange-500">
          <p className="text-sm text-gray-500 mb-1">No Show</p>
          <p className="text-2xl font-bold text-gray-900">{noShowCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search by Employee ID or Name" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex-1">
           <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex-1">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {historyBookings.map((trip) => {
          let borderColor = 'border-gray-200';
          if (trip.status === 'Completed' || trip.status === 'Dropped') borderColor = 'border-green-500';
          if (trip.status === 'Cancelled') borderColor = 'border-red-500';
          if (trip.status === 'No Show') borderColor = 'border-orange-500';

          return (
            <div key={trip.id} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${borderColor}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-mono text-gray-500 mb-1 block">ID: {trip.id}</span>
                  <StatusBadge status={trip.status} />
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{trip.employeeName}</p>
                  <p className="text-xs text-gray-500">Driver: {trip.driverName || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-700 mb-2 font-medium">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="truncate">{trip.from} &rarr; {trip.to}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{trip.date} • {trip.requestedPickupTime}</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">Vehicle: EV-100</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex justify-center mt-6">
        <nav className="flex space-x-1">
          <button className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">Prev</button>
          <button className="px-3 py-1 rounded bg-blue-600 text-white font-medium">1</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </div>
  );
};

export default TripHistory;
