import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import BookingTable from './BookingTable';
import BookingDetailPanel from './BookingDetailPanel';
import BookingForm from './BookingForm';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';
import { Plus } from 'lucide-react';

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
    <section className="space-y-3">
      {/* Section Header: Title on Left, Controls Aligned on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Booking Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor passenger transit requests, schedule assignments, and trip execution.
          </p>
        </div>

        {/* Right Aligned Filter Controls: Search, Date, New Booking */}
        <div className="flex flex-wrap items-center gap-2.5">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search employee, ID..."
            className="w-56 sm:w-64"
          />

          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <button
            type="button"
            onClick={() => dispatch({ type: 'OPEN_FORM' })}
            className="h-9 inline-flex items-center gap-1.5 bg-[#183a7b] hover:bg-[#122b5e] text-white px-3.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <BookingTable bookings={filteredBookings} />
      </div>

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
    </section>
  );
};

export default BookingManagement;
