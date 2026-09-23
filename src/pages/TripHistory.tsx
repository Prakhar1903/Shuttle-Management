import { useState } from 'react';
import { useBookings } from '../context/BookingContext';
import { useUser } from '../context/UserContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { History, Download, MapPin, Clock, Calendar, CheckCircle2, XCircle, AlertCircle, UserCheck } from 'lucide-react';
import { SearchBar } from '../components/ui/SearchBar';
import { DatePicker } from '../components/ui/DatePicker';
import { Pagination } from '../components/ui/Pagination';
import toast from 'react-hot-toast';

/**
 * Enterprise Trip History & Archive View
 * Complete audit trail of past passenger transit requests, cancellations, and completed rides.
 * Dynamically updates from BookingContext and filters by user role.
 */
const TripHistory = () => {
  const { state } = useBookings();
  const { role, currentUser } = useUser();

  const isStudent = role === 'student';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [adminViewOnlyMine, setAdminViewOnlyMine] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Base history bookings from live context
  const historyBookings = state.bookings.filter(b => 
    ['Completed', 'Cancelled', 'Dropped', 'No Show'].includes(b.status)
  );

  // Filter trips: if student, strictly only their own trips
  const roleFilteredBookings = historyBookings.filter((trip) => {
    if (isStudent || adminViewOnlyMine) {
      return (
        trip.employeeName.toLowerCase().includes(currentUser.name.toLowerCase()) ||
        trip.employeeId === currentUser.id
      );
    }
    return true;
  });

  const completedCount = roleFilteredBookings.filter(b => b.status === 'Completed' || b.status === 'Dropped').length;
  const cancelledCount = roleFilteredBookings.filter(b => b.status === 'Cancelled').length;
  const noShowCount = roleFilteredBookings.filter(b => b.status === 'No Show').length;

  const filteredTrips = roleFilteredBookings.filter((trip) => {
    const matchesSearch = 
      trip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate ? trip.date === selectedDate : true;

    const matchesStatus = statusFilter === 'ALL' ? true : trip.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTrips.length / pageSize) || 1;
  const paginatedTrips = filteredTrips.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExport = () => {
    toast.success(isStudent ? 'Your ride history exported' : 'Fleet trip history archive exported');
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            {isStudent ? 'My Campus Ride History' : 'Trip History & Archive'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isStudent 
              ? `Personal historical audit of completed campus transit rides for ${currentUser.name}.`
              : 'Historical audit log of completed passenger circuits, cancellations, and station drop-offs.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {!isStudent && (
            <button
              type="button"
              onClick={() => setAdminViewOnlyMine(!adminViewOnlyMine)}
              className={`h-9 inline-flex items-center gap-2 border px-3.5 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${
                adminViewOnlyMine 
                  ? 'bg-[#102d69] text-white border-[#102d69]' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <UserCheck className={`w-3.5 h-3.5 ${adminViewOnlyMine ? 'text-blue-200' : 'text-slate-500'}`} />
              <span>{adminViewOnlyMine ? `My Dispatch Rides` : 'All Fleet Trips'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExport}
            className="h-9 inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{isStudent ? 'Export My Rides' : 'Export Archive'}</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Trips */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{roleFilteredBookings.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              {isStudent ? 'My Recorded Trips' : 'Archived Trips'}
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{completedCount}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Completed / Dropped</div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{cancelledCount}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Cancelled Requests</div>
          </div>
        </div>

        {/* No Show */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{noShowCount}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Passenger No-Shows</div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <SearchBar 
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search employee, ID..."
            className="w-full sm:w-64"
          />

          <DatePicker 
            value={selectedDate}
            onChange={(val) => {
              setSelectedDate(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>
      </div>

      {/* 4. Trips Cards Grid */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-12 text-center">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No trip records found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filters or date selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4.5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-500">#{trip.id}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{trip.employeeName}</h3>
                    <div className="text-[11px] text-slate-400 font-mono">ID: {trip.employeeId}</div>
                  </div>

                  <StatusBadge status={trip.status} />
                </div>

                {/* Route Information */}
                <div className="py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{trip.from}</span>
                    <span className="text-slate-400 font-bold">→</span>
                    <span>{trip.to}</span>
                  </div>
                </div>
              </div>

              {/* Footer Details */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1 font-mono text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trip.date}</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trip.requestedPickupTime}</span>
                </div>

                <div className="font-mono text-slate-600 font-medium">
                  {trip.vehicle || 'Standard Van'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredTrips.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TripHistory;
