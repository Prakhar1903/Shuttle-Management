import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import BookingTable from './BookingTable';
import BookingDetailPanel from './BookingDetailPanel';
import BookingForm from './BookingForm';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';

/**
 * Booking Management Section
 * Enterprise data table container with aligned filters and consistent 36px controls.
 */
export const BookingManagement: React.FC = () => {
  const { state, dispatch } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-12-16');

  const filteredBookings = state.bookings.filter((booking) => {
    const matchesSearch =
      booking.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate
      ? booking.date === selectedDate
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 md:p-6 space-y-4">
      {/* Card Header: Title on Left, Controls Aligned on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Booking Management
        </h2>

        {/* Right Aligned Filter Controls: Search and Date matching reference screenshot */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search Emp, ID, Booking ID"
            className="w-64 sm:w-72"
          />

          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      </div>

      {/* Main Table */}
      <BookingTable bookings={filteredBookings} />

      {/* Slide-out Drawer */}
      {state.isDetailPanelOpen && <BookingDetailPanel />}

      {/* New/Edit Booking Modal */}
      {state.isFormOpen && (
        <BookingForm
          booking={state.selectedBooking}
          isOpen={state.isFormOpen}
          onClose={() => dispatch({ type: 'CLOSE_FORM' })}
        />
      )}
    </div>
  );
};

export default BookingManagement;
