import React from 'react';
import { useBookings } from '../../context/BookingContext';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';
import { SortableHeader } from '../ui/SortableHeader';
import { StatusBadge } from '../ui/StatusBadge';
import { Pagination } from '../ui/Pagination';
import type { Booking } from '../../types';

interface BookingTableProps {
  bookings: Booking[];
}

/**
 * Modern MoveInSync Booking Management Data Table
 * Features multi-column sorting, color status pills, crisp typography,
 * generous cell padding, and smooth row hover transitions.
 */
const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  const { dispatch } = useBookings();
  const { sortedItems, requestSort, sortConfig } = useSort(bookings, 'id');
  const {
    paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
  } = usePagination(sortedItems, 10);

  return (
    <div className="mt-4">
      {/* Outer Card Wrapper */}
      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl bg-white shadow-2xs">
        <table className="min-w-full divide-y divide-slate-200/90 text-left text-sm">
          {/* Table Header */}
          <thead className="bg-slate-50/90 text-xs font-bold text-slate-600 uppercase tracking-wider select-none">
            <tr>
              <SortableHeader label="Booking ID" sortKey="id" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Employee" sortKey="employeeName" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="From" sortKey="from" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="To" sortKey="to" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Vehicle" sortKey="vehicle" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Requested Pickup Time" sortKey="requestedPickupTime" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Pickup Time" sortKey="pickupTime" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Planned Drop" sortKey="plannedDrop" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Actual Drop" sortKey="actualDrop" currentSort={sortConfig} onSort={requestSort} />
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedItems.map((booking) => (
              <tr 
                key={`${booking.id}-${booking.status}-${booking.requestedPickupTime}`} 
                className="hover:bg-slate-50/80 transition-colors duration-150 group"
              >
                {/* Booking ID */}
                <td className="px-5 py-4 whitespace-nowrap font-mono text-xs font-bold text-slate-800">
                  #{booking.id}
                </td>

                {/* Employee Name */}
                <td className="px-5 py-4 whitespace-nowrap text-slate-900 font-semibold text-sm">
                  {booking.employeeName}
                </td>

                {/* Status Pill Badge */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </td>

                {/* From Location */}
                <td className="px-5 py-4 whitespace-nowrap text-slate-700 font-medium">
                  {booking.from}
                </td>

                {/* To Location */}
                <td className="px-5 py-4 whitespace-nowrap text-slate-700 font-medium">
                  {booking.to}
                </td>

                {/* Vehicle Badge */}
                <td className="px-5 py-4 whitespace-nowrap">
                  {booking.vehicle ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 font-mono text-xs font-bold text-slate-700">
                      {booking.vehicle}
                    </span>
                  ) : (
                    <span className="text-slate-400 font-mono text-xs">-</span>
                  )}
                </td>

                {/* Requested Pickup Time */}
                <td className="px-5 py-4 whitespace-nowrap font-mono text-xs font-bold text-slate-800">
                  {booking.requestedPickupTime}
                </td>

                {/* Pickup Time */}
                <td className="px-5 py-4 whitespace-nowrap font-mono text-xs text-slate-500">
                  {booking.pickupTime || '-'}
                </td>

                {/* Planned Drop */}
                <td className="px-5 py-4 whitespace-nowrap font-mono text-xs text-slate-500">
                  {booking.plannedDrop || '-'}
                </td>

                {/* Actual Drop */}
                <td className="px-5 py-4 whitespace-nowrap font-mono text-xs text-slate-500">
                  {booking.actualDrop || '-'}
                </td>

                {/* Action Button matching MoveInSync "View" */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SELECT_BOOKING', payload: booking })}
                    className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-[#183a7b] border border-[#183a7b] rounded-lg bg-blue-50/30 hover:bg-[#183a7b] hover:text-white transition-all duration-150 shadow-2xs cursor-pointer active:scale-95"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={11} className="px-6 py-16 text-center text-slate-400 text-sm">
                  No bookings found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

export default BookingTable;
