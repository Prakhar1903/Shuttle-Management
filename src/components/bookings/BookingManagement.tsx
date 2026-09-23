import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import BookingTable from './BookingTable';
import BookingDetailPanel from './BookingDetailPanel';
import BookingForm from './BookingForm';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';
import { Plus } from 'lucide-react';

/**
 * Booking Management Container
 * Bottom half of the main Operations Management view.
 * Handles booking filters, sortable/paginated bookings table,
 * slide-out rider journey drawer, and booking creation modal.
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
    <section className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-5 md:p-6 transition-all">
      {/* Top Header Row with Search & Date Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-1">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">Booking Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage passenger shuttle requests, trip schedules, and vehicle assignments</p>
        </div>

        {/* Search, Date, and Add Booking Controls matching MoveInSync UI */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search Emp, ID, Booking ID"
            className="w-full sm:w-64"
          />

          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <button
            type="button"
            onClick={() => dispatch({ type: 'OPEN_FORM' })}
            className="inline-flex items-center gap-1.5 bg-[#183876] hover:bg-[#122b5e] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Bookings Table Component */}
      <BookingTable bookings={filteredBookings} />

      {/* Slide-out Employee Journey Drawer */}
      {state.isDetailPanelOpen && <BookingDetailPanel />}

      {/* Booking Form Modal */}
      {state.isFormOpen && (
        <BookingForm
          booking={state.selectedBooking}
          isOpen={state.isFormOpen}
          onClose={() => dispatch({ type: 'CLOSE_FORM' })}
        />
      )}
    </section>
  );
};

export default BookingManagement;
