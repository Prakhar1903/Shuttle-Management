import React, { useState } from 'react';
import { X, Bus, Users, Star, ArrowRight, Ban, History, Edit3 } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import toast from 'react-hot-toast';

/**
 * Slide-out Employee Ride Detail Drawer
 * Matches the reference screenshot layout:
 * - 400-420px width, right-fixed, full height
 * - Translucent darkened backdrop
 * - Header: Booking ID: 123123 [X]
 * - Passenger info: Name, Status badge, Emp ID, Sign In status, Date
 * - Single combined bordered card with Vehicle, Route timeline, Driver
 * - Quick action links: Sign in rider, Mark rider as No-show
 * - Sticky bottom footer: History button, Cancel Booking, Edit button
 */
export const BookingDetailPanel: React.FC = () => {
  const { state, dispatch } = useBookings();
  const [showConfirm, setShowConfirm] = useState(false);

  const booking = state.bookings.find(b => b.id === state.selectedBooking?.id) || state.selectedBooking;

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
    dispatch({
      type: 'UPDATE_BOOKING',
      payload: { ...booking, status: 'On Going' }
    });
    toast.success(`✅ Rider ${booking.employeeName} signed in! Status updated to On Going.`);
  };

  const handleCompleteRide = () => {
    dispatch({
      type: 'UPDATE_BOOKING',
      payload: { ...booking, status: 'Completed' }
    });
    toast.success(`🏁 Ride #${booking.id} marked as Completed.`);
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
      {/* 1. Backdrop Overlay (Darkens page behind drawer) */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] z-40 animate-in fade-in duration-200"
      />

      {/* 2. Slide-out Drawer */}
      <aside 
        className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 select-none animate-in slide-in-from-right duration-200"
      >
        {/* Header: Booking ID: 123123 on left, Close X on right */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white">
          <div className="text-base font-bold text-slate-900">
            Booking ID: {booking.id}
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Passenger Information */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {booking.employeeName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Emp ID: {booking.employeeId}
                </p>
              </div>

              {/* Status Badge */}
              <StatusBadge status={booking.status} />
            </div>

            {/* Sign In & Date line */}
            <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-1">
              <span>Sign In: <span className={booking.status === 'On Going' || booking.status === 'Completed' || booking.status === 'Dropped' ? 'font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-1' : 'text-slate-700 ml-1'}>{booking.status === 'On Going' || booking.status === 'Completed' || booking.status === 'Dropped' ? 'Signed In (On Board)' : '-'}</span></span>
              <span>
                {booking.date 
                  ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  : 'Mon, Dec 16'}
              </span>
            </div>
          </div>

          {/* Unified Card: Vehicle + Route Timeline + Driver Info */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs divide-y divide-slate-100">
            {/* Section 1: Vehicle Information */}
            <div className="p-4 flex items-center gap-3.5">
              <div className="w-12 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <Bus className="w-5 h-5 text-slate-700" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-900 text-sm">
                  {booking.vehicle && booking.vehicle !== '-' ? booking.vehicle : 'Unassigned Shuttle'}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  {booking.vehicle && booking.vehicle !== '-' ? (
                    <>
                      <span>{booking.vehiclePlate || 'UA3282'}</span>
                      <span>|</span>
                      <span>{booking.vehicleType || 'White Bus'}</span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {booking.vehicleCapacity || 12}
                      </span>
                    </>
                  ) : (
                    <span>Pending fleet dispatch assignment</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Route Stop Timeline */}
            <div className="p-4 space-y-4">
              {/* Pickup Stop */}
              <div className="relative pl-6">
                {/* Visual Node */}
                <div className="absolute left-1 top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                {/* Connecting Line */}
                <div className="absolute left-2 top-4 bottom-[-16px] w-0.5 bg-slate-200"></div>

                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-xs text-slate-900">{booking.from}</span>
                  <span className="text-xs font-bold text-slate-900">
                    {booking.pickupTime || booking.requestedPickupTime}
                    {booking.pickupTime && booking.pickupTime !== booking.requestedPickupTime && (
                      <span className="text-amber-600 font-semibold ml-1">(Adjusted)</span>
                    )}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Requested Pickup Time: {booking.requestedPickupTime}
                </div>
              </div>

              {/* Drop Stop */}
              <div className="relative pl-6">
                {/* Visual Square Node */}
                <div className="absolute left-1 top-1.5 w-2.5 h-2.5 bg-slate-400"></div>

                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-xs text-slate-900">{booking.to}</span>
                  <span className="text-xs font-medium text-slate-500">
                    {booking.actualDrop || booking.plannedDrop || '-'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Planned Drop: {booking.plannedDrop || '-'}
                </div>
              </div>
            </div>

            {/* Section 3: Driver Information */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                  <span>{(booking.driverName || 'Samuel Jones').charAt(0)}</span>
                  {/* Green Online Dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    {booking.driverName || 'Samuel Jones'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {booking.driverPhone || '555-0101'}
                  </div>
                </div>
              </div>

              {/* Driver Rating */}
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <span>{booking.driverRating || 4.8}</span>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            </div>
          </div>

          {/* Quick Action Links matching reference */}
          <div className="space-y-3 pt-2">
            {booking.status === 'On Going' ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Rider Signed In (On Going)</span>
                </span>
                <button
                  type="button"
                  onClick={handleCompleteRide}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer underline underline-offset-2"
                >
                  Mark as Dropped / Complete
                </button>
              </div>
            ) : booking.status === 'Completed' || booking.status === 'Dropped' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                <span>Trip Completed</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <span>Sign in rider</span>
              </button>
            )}

            {booking.status !== 'No Show' && booking.status !== 'Completed' && (
              <button
                type="button"
                onClick={handleNoShow}
                className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer transition-colors"
              >
                <Ban className="w-4 h-4 text-rose-600" />
                <span>Mark rider as No-show</span>
              </button>
            )}
          </div>
        </div>

        {/* Sticky Footer: History [🕒], Cancel Booking, Edit [✎] */}
        <div className="p-4 border-t border-slate-200/80 bg-white flex items-center justify-between gap-3">
          {/* History Button */}
          <button 
            type="button"
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs" 
            title="Trip History Logs"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 border border-slate-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Cancel Booking</span>
              <Ban size={13} className="text-rose-500" />
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'OPEN_FORM', payload: booking })}
              className="px-5 py-2 bg-[#183a7b] hover:bg-[#122b5e] text-white rounded-lg transition-colors font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Edit</span>
              <Edit3 size={13} />
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
