import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';
import { useUser } from '../context/UserContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { 
  Bus, 
  MapPin, 
  Clock, 
  QrCode, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Ban, 
  Sparkles, 
  PhoneCall
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Booking } from '../types';

const CAMPUS_STOPS = [
  'Hostel A',
  'Hostel B',
  'Library',
  'Data Centre',
  'Sports Complex',
  'Cafeteria',
  'Admin Block',
  'Lab Building',
  'Parking',
  'Main Gate'
];

export const StudentPortal: React.FC = () => {
  const { state, dispatch } = useBookings();
  const { currentUser } = useUser();

  // Booking Form State
  const [fromStop, setFromStop] = useState('Hostel A');
  const [toStop, setToStop] = useState('Library');
  const [bookingDate, setBookingDate] = useState('2024-12-16');
  const [pickupTime, setPickupTime] = useState('11:45');
  const [passengerCount, setPassengerCount] = useState(1);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // Student's Bookings
  const studentBookings = state.bookings.filter(
    (b) => b.employeeName.toLowerCase().includes(currentUser.name.toLowerCase()) || 
           b.employeeId === currentUser.id
  );

  // Find active / upcoming ride
  const activeRide = studentBookings.find(
    (b) => ['Accepted', 'Waiting', 'On Going', 'Requested'].includes(b.status)
  ) || {
    // If no active ride yet, provide default preview ride for the student
    id: '892104',
    employeeName: currentUser.name,
    employeeId: currentUser.id,
    status: 'Accepted' as const,
    from: 'Hostel A',
    to: 'Academic Block',
    vehicle: 'NB-002-RF',
    vehiclePlate: 'UA3282',
    vehicleType: 'White Bus',
    vehicleCapacity: 12,
    requestedPickupTime: '12:15',
    pickupTime: null,
    plannedDrop: '12:35',
    actualDrop: null,
    date: '2024-12-16',
    driverName: 'Samuel Jones',
    driverPhone: '555-0101',
    driverRating: 4.8
  };

  const pastTrips = studentBookings.filter(
    (b) => ['Completed', 'Dropped', 'Cancelled', 'No Show'].includes(b.status)
  );

  const handleBookRide = (e: React.FormEvent) => {
    e.preventDefault();

    if (fromStop === toStop) {
      toast.error('Origin and destination stops cannot be the same!');
      return;
    }

    const [h, m] = pickupTime.split(':').map(Number);
    const dropTotalMins = h * 60 + m + 20; // 20 min transit
    const dropH = Math.floor(dropTotalMins / 60);
    const dropM = dropTotalMins % 60;
    const plannedDrop = `${dropH.toString().padStart(2, '0')}:${dropM.toString().padStart(2, '0')}`;

    const newBookingId = Math.floor(100000 + Math.random() * 900000).toString();

    const newBooking: Booking = {
      id: newBookingId,
      employeeName: currentUser.name,
      employeeId: currentUser.id,
      status: 'Requested',
      from: fromStop,
      to: toStop,
      vehicle: 'NB-002-RF',
      vehiclePlate: 'UA3282',
      vehicleType: 'White Bus',
      vehicleCapacity: 12,
      requestedPickupTime: pickupTime,
      pickupTime: null,
      plannedDrop,
      actualDrop: null,
      date: bookingDate,
      driverName: 'Samuel Jones',
      driverPhone: '555-0101',
      driverRating: 4.8
    };

    dispatch({ type: 'ADD_BOOKING', payload: newBooking });
    toast.success(`🎉 Shuttle ride #${newBookingId} requested successfully! Transport dispatch notified.`);
  };

  const handleCancelBooking = (bookingId: string) => {
    dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
    toast.success('Your shuttle ride has been cancelled.');
    setConfirmCancelId(null);
  };

  return (
    <div className="space-y-7 animate-fade-in max-w-[1400px] mx-auto pb-12 select-none">
      {/* 1. Student Hero Banner */}
      <div className="bg-gradient-to-r from-[#102d69] via-[#173d8a] to-[#2563eb] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-md mb-3">
              <Sparkles size={14} className="text-yellow-300" />
              <span>Campus Transit System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-sm text-blue-100/90 mt-1.5 leading-relaxed">
              Book campus shuttles, track your live boarding pass, and travel between dorms, labs, and libraries on time.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-black/20 p-3.5 rounded-2xl backdrop-blur-md border border-white/10 shrink-0">
            <div className="text-center px-3">
              <div className="text-xl font-bold">1</div>
              <div className="text-[11px] text-blue-200">Active Ride</div>
            </div>
            <div className="text-center px-3 border-x border-white/10">
              <div className="text-xl font-bold">{studentBookings.length || 4}</div>
              <div className="text-[11px] text-blue-200">My Rides</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-bold text-emerald-300">98%</div>
              <div className="text-[11px] text-blue-200">On-Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary 2-Column Section: Book Shuttle (Left) + Active Pass (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column (7 cols): Shuttle Ride Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 md:p-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Bus className="w-5 h-5 text-blue-600" />
                <span>Book Campus Shuttle Ride</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Reserve your seat on scheduled campus circuit transit lines
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Live Shuttle Fleet Active
            </span>
          </div>

          <form onSubmit={handleBookRide} className="space-y-5">
            {/* Origin & Destination Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Pickup Station (From)</span>
                </label>
                <select
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
                >
                  {CAMPUS_STOPS.map((stop) => (
                    <option key={stop} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Drop Station (To)</span>
                </label>
                <select
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
                >
                  {CAMPUS_STOPS.map((stop) => (
                    <option key={stop} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pickup Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Seats / Riders
                </label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white cursor-pointer"
                >
                  <option value={1}>1 Seat (Single)</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                  <option value={4}>4 Seats (Group)</option>
                </select>
              </div>
            </div>

            {/* Quick Time Preset Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400">Quick Slots:</span>
              {['11:45', '12:15', '13:00', '14:30', '16:00', '17:15'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPickupTime(slot)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    pickupTime === slot
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Passenger Note & Submit Button */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Rider ID: <span className="font-mono font-bold text-slate-700">{currentUser.id}</span> ({currentUser.name})</span>
              </div>

              <button
                type="submit"
                className="h-11 px-6 bg-[#102d69] hover:bg-[#0c2352] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Confirm Shuttle Booking</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (5 cols): Active Shuttle Pass & Digital Ticket */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <QrCode className="w-4.5 h-4.5 text-blue-600" />
                <span>My Active Shuttle Pass</span>
              </h2>
              <p className="text-[11px] text-slate-500">Live boarding pass for campus transit</p>
            </div>
            <StatusBadge status={activeRide.status} />
          </div>

          {/* Digital Boarding Pass Card */}
          <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/70 to-slate-50/90 p-5 space-y-4 shadow-2xs relative">
            {/* Header / Ticket Code */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600">Shuttle Pass ID</span>
                <div className="text-lg font-mono font-bold text-slate-900 leading-tight">#{activeRide.id}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Scheduled Date</span>
                <div className="text-xs font-semibold text-slate-700">{activeRide.date}</div>
              </div>
            </div>

            {/* Route Timeline Diagram */}
            <div className="space-y-3 py-1">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-100" />
                <div className="flex-1">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Pickup Station</div>
                  <div className="font-bold text-sm text-slate-900">{activeRide.from}</div>
                  <div className="text-[11px] text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" /> {activeRide.requestedPickupTime}
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="ml-1 -my-2 h-4 w-0.5 bg-slate-300 border-l border-dashed border-slate-400" />

              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0 ring-4 ring-rose-100" />
                <div className="flex-1">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Drop Destination</div>
                  <div className="font-bold text-sm text-slate-900">{activeRide.to}</div>
                  <div className="text-[11px] text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" /> Planned: {activeRide.plannedDrop || '12:35'}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle & Driver Details */}
            <div className="pt-3 border-t border-blue-100/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                  <Bus size={18} className="text-[#102d69]" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">{activeRide.vehicle || 'NB-002-RF'}</div>
                  <div className="text-[11px] text-slate-500">{activeRide.vehiclePlate || 'UA3282'} • {activeRide.vehicleType || 'White Bus'}</div>
                </div>
              </div>

              {/* Driver info */}
              <div className="text-right">
                <div className="font-bold text-slate-900 flex items-center justify-end gap-1">
                  <span>{activeRide.driverName || 'Samuel Jones'}</span>
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center justify-end gap-1 mt-0.5">
                  <PhoneCall size={10} className="text-slate-400" />
                  <span>{activeRide.driverPhone || '555-0101'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setConfirmCancelId(activeRide.id)}
                className="w-full py-2 px-3 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Ban size={13} />
                <span>Cancel Shuttle Ride</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. My Personal Trip History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 md:p-7 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
              My Ride History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Completed and past campus transit requests for {currentUser.name}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {pastTrips.length} Recorded Trips
          </span>
        </div>

        {pastTrips.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No completed rides yet. Book your first ride using the form above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastTrips.slice(0, 6).map((trip) => (
              <div 
                key={trip.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-2 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500">#{trip.id}</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mt-0.5">
                      <MapPin size={12} className="text-blue-600" />
                      <span>{trip.from}</span>
                      <span className="text-slate-400">→</span>
                      <span>{trip.to}</span>
                    </div>
                  </div>
                  <StatusBadge status={trip.status} />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{trip.date} • {trip.requestedPickupTime}</span>
                  <span>Vehicle: {trip.vehicle || 'NB-002-RF'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {confirmCancelId && (
        <ConfirmDialog
          isOpen={!!confirmCancelId}
          title="Cancel Shuttle Ride"
          message={`Are you sure you want to cancel your shuttle booking #${confirmCancelId}?`}
          onConfirm={() => handleCancelBooking(confirmCancelId)}
          onCancel={() => setConfirmCancelId(null)}
        />
      )}
    </div>
  );
};

export default StudentPortal;
