import React, { useState } from 'react';
import { X, Bus, Users, User, Star, LogIn, Ban, Clock, Phone } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import toast from 'react-hot-toast';

/**
 * Slide-out Employee Ride Detail Drawer
 * Matches Linear / Stripe drawer patterns: calm cards, clear hierarchy, and smooth backdrop.
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
    toast.success(`Rider ${booking.employeeName} signed in`);
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
      {/* Backdrop Overlay */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] z-40 animate-overlay"
      />

      {/* Slide-out Drawer */}
      <aside 
        className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-xl z-50 flex flex-col animate-drawer border-l border-slate-200 select-none overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ride Detail</span>
            <span className="text-xs font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              #{booking.id}
            </span>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            title="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Employee Card */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{booking.employeeName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Emp ID: {booking.employeeId}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/60">
              <span>Sign In Status: <span className="font-medium text-slate-700">Pending</span></span>
              <span className="font-medium text-slate-600">Tue, Dec 17</span>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <Bus className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 text-sm">{booking.vehicle || 'NB-002-RF'}</h4>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Users size={12} /> {booking.vehicleCapacity || 12} seats
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Plate: {booking.vehiclePlate || 'UA3282'} • {booking.vehicleType || 'White Bus'}
                </p>
              </div>
            </div>
          </div>

          {/* Route Stops with Delay */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-white">
            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Pickup Stop */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full"></div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{booking.from}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Pickup: {booking.requestedPickupTime}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                    11:25 (+5)
                  </span>
                </div>
              </div>

              {/* Drop Stop */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-white border-2 border-emerald-600 rounded-full"></div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{booking.to}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Drop: {booking.plannedDrop || '11:32'}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">—</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Profile */}
          <div className="flex items-center justify-between p-4 border border-slate-200/80 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{booking.driverName || 'Steve Smith'}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <Phone size={11} />
                  <span>{booking.driverPhone || '+1-323-493-3293'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-xs font-semibold">
              <span>{booking.driverRating || 4.5}</span>
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleSignIn}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/80 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign in rider</span>
            </button>

            <button
              type="button"
              onClick={handleNoShow}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold text-rose-700 bg-rose-50/80 border border-rose-200/80 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Mark rider as No-show</span>
            </button>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
          <button 
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors border border-slate-200 bg-white" 
            title="Trip history"
          >
            <Clock className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="px-3.5 py-1.5 border border-rose-200 text-rose-700 rounded-lg hover:bg-rose-50 transition-colors font-medium text-xs bg-white"
            >
              Cancel Booking
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'OPEN_FORM', payload: booking })}
              className="px-4 py-1.5 bg-[#183a7b] hover:bg-[#122b5e] text-white rounded-lg transition-colors font-semibold text-xs shadow-2xs"
            >
              Edit
            </button>
          </div>
        </div>
      </aside>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <ConfirmDialog
          isOpen={showConfirm}
          title="Cancel Booking"
          message={`Are you sure you want to cancel booking #${booking.id} for ${booking.employeeName}?`}
          onConfirm={handleCancelBooking}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default BookingDetailPanel;
