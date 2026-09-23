import React, { useState } from 'react';
import { X, Bus, Users, User, Star, LogIn, Ban, Edit2, Clock, Phone } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import toast from 'react-hot-toast';

/**
 * MoveInSync Employee Journey View and Edit Drawer
 * Faithfully matches Screenshot 2 with Employee Card, Vehicle Card,
 * Route Stops with Delay indicators, Driver Info, and Quick Action buttons.
 */
export const BookingDetailPanel: React.FC = () => {
  const { state, dispatch } = useBookings();
  const [showConfirm, setShowConfirm] = useState(false);

  const booking = state.selectedBooking;

  if (!state.isDetailPanelOpen || !booking) {
    return null;
  }

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DETAIL' });
  };

  const handleCancelBooking = () => {
    dispatch({ type: 'CANCEL_BOOKING', payload: booking.id });
    toast.success('Booking cancelled successfully');
    setShowConfirm(false);
    handleClose();
  };

  const handleSignIn = () => {
    toast.success(`Rider ${booking.employeeName} signed in successfully!`);
  };

  const handleNoShow = () => {
    dispatch({
      type: 'UPDATE_BOOKING',
      payload: { ...booking, status: 'No Show' }
    });
    toast.error(`Rider marked as No-show`);
  };

  return (
    <>
      {/* Dimmed Backdrop Overlay with blur for smooth focus */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/35 backdrop-blur-[2px] z-40 transition-opacity animate-fade-in"
      />

      {/* Slide-out Drawer matching Screenshot 2 */}
      <aside 
        className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-gray-200 select-none overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <h2 className="text-base font-bold text-slate-800">
            Booking ID: <span className="font-mono text-blue-700">{booking.id}</span>
          </h2>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1.5 text-gray-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Employee Info Card */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">{booking.employeeName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Emp ID: {booking.employeeId}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/60">
              <span>Sign In: -</span>
              <span className="font-medium text-slate-600">Tue, Dec 17</span>
            </div>
          </div>

          {/* Vehicle Info Card */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{booking.vehicle || 'NB-002-RF'}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="font-mono">{booking.vehiclePlate || 'UA3282'}</span>
                  <span>•</span>
                  <span>{booking.vehicleType || 'White Bus'}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <Users size={12} /> {booking.vehicleCapacity || 12}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Route Stops with Delay Indicator */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
            <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Pickup Stop */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 bg-white border-2 border-blue-600 rounded-full shadow-xs"></div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{booking.from}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Requested Pickup Time: {booking.requestedPickupTime}</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                    11:25 (+5)
                  </span>
                </div>
              </div>

              {/* Drop Stop */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 bg-white border-2 border-emerald-600 rounded-full shadow-xs"></div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{booking.to}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Planned Drop: {booking.plannedDrop || '11:32'}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Profile Card */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">{booking.driverName || 'Steve Smith'}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <Phone size={11} />
                  <span>{booking.driverPhone || '+1-323-493-3293'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-xs font-bold">
              <span>{booking.driverRating || 4.5}</span>
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleSignIn}
              className="flex items-center gap-2.5 text-blue-700 hover:text-blue-900 text-sm font-semibold p-2 rounded-lg hover:bg-blue-50 transition-colors w-full text-left"
            >
              <LogIn className="w-4 h-4 text-blue-600" />
              <span>Sign in rider</span>
            </button>

            <button
              type="button"
              onClick={handleNoShow}
              className="flex items-center gap-2.5 text-rose-600 hover:text-rose-800 text-sm font-semibold p-2 rounded-lg hover:bg-rose-50 transition-colors w-full text-left"
            >
              <Ban className="w-4 h-4 text-rose-500" />
              <span>Mark rider as No-show</span>
            </button>
          </div>
        </div>

        {/* Drawer Sticky Footer matching Screenshot 2 */}
        <div className="p-4 border-t border-gray-200 bg-slate-50/90 flex items-center justify-between gap-3">
          <button 
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition-colors border border-slate-300 bg-white shadow-2xs" 
            title="Trip history"
          >
            <Clock className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-rose-400 text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-semibold text-xs shadow-2xs cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Cancel Booking</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'OPEN_FORM', payload: booking })}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#183876] hover:bg-[#122b5e] text-white rounded-lg transition-all font-semibold text-xs shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Cancel Confirmation Dialog */}
      {showConfirm && (
        <ConfirmDialog
          isOpen={showConfirm}
          title="Cancel Booking"
          message={`Are you sure you want to cancel booking #${booking.id} for ${booking.employeeName}? This action cannot be undone.`}
          onConfirm={handleCancelBooking}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default BookingDetailPanel;
