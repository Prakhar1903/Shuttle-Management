import React, { useState } from 'react';
import { X, Bus, Users, User, Star, LogIn, Ban, Edit2, Clock } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import toast from 'react-hot-toast';

const BookingDetailPanel: React.FC = () => {
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
    toast.success('Rider signed in');
  };

  const handleNoShow = () => {
    dispatch({
      type: 'UPDATE_BOOKING',
      payload: { ...booking, status: 'No Show' }
    });
    toast.success('Rider marked as No-show');
  };

  return (
    <>
      <div className="detail-panel fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Booking ID: {booking.id}</h2>
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Employee Info Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">{booking.employeeName}</h3>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-sm text-gray-600 mb-2">Emp ID: {booking.employeeId}</p>
            <p className="text-xs text-gray-500">Sign In: - {booking.date}</p>
          </div>

          {/* Vehicle Info Card */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">{booking.vehicle || 'Not assigned'}</h3>
            </div>
            <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
              <p>Plate: {booking.vehiclePlate || 'N/A'}</p>
              <p>Type: {booking.vehicleType || 'N/A'} • {booking.vehicleColor || 'N/A'}</p>
              <p className="flex items-center gap-1 col-span-2 mt-1">
                <Users className="w-4 h-4" /> Capacity: {booking.vehicleCapacity || 'N/A'}
              </p>
            </div>
          </div>

          {/* Route Info */}
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 ml-2">
            <div className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{booking.from}</p>
                  <p className="text-xs text-gray-500 mt-1">Requested Pickup Time: {booking.requestedPickupTime}</p>
                </div>
                {booking.pickupTime && (
                  <span className="text-sm text-orange-500 font-medium whitespace-nowrap ml-2">{booking.pickupTime}</span>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 bg-white border-2 border-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">{booking.to}</p>
                <p className="text-xs text-gray-500 mt-1">Planned Drop: {booking.plannedDrop || '-'}</p>
              </div>
            </div>
          </div>

          {/* Driver Info Card */}
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{booking.driverName || 'Unassigned'}</h4>
              <p className="text-sm text-gray-600 truncate">{booking.driverPhone || 'N/A'}</p>
            </div>
            {booking.driverRating && (
              <div className="flex items-center gap-1 text-sm font-medium text-gray-700 shrink-0">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {booking.driverRating}
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors w-full text-left"
            >
              <LogIn className="w-5 h-5" /> Sign in rider
            </button>
            <button
              onClick={handleNoShow}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors w-full text-left"
            >
              <Ban className="w-5 h-5" /> Mark rider as No-show
            </button>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors" title="Trip history">
            <Clock className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors font-medium text-sm"
            >
              <Ban className="w-4 h-4" /> Cancel Booking
            </button>
            <button
              onClick={() => dispatch({ type: 'OPEN_FORM', payload: booking })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          isOpen={showConfirm}
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          onConfirm={handleCancelBooking}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default BookingDetailPanel;
