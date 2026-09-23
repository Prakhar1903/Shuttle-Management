import React, { useState } from 'react';
import { useBookings } from '../../context/BookingContext';
import BookingTable from './BookingTable';
import BookingDetailPanel from './BookingDetailPanel';
import BookingForm from './BookingForm';
import { SearchBar } from '../ui/SearchBar';
import { DatePicker } from '../ui/DatePicker';

const BookingManagement: React.FC = () => {
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
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Booking Management</h2>
        <div className="flex gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search Emp, ID, Booking ID"
          />
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <button
            onClick={() => dispatch({ type: 'OPEN_FORM' })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            New Booking
          </button>
        </div>
      </div>

      <BookingTable bookings={filteredBookings} />

      {state.isDetailPanelOpen && <BookingDetailPanel />}
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
