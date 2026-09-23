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
 * Sortable, Paginated Booking Table
 * Replicates the MoveInSync Booking Management data table with
 * sorting controls, status badges, and action triggers.
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
    <div className="mt-2">
      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200/90 rounded-xl bg-white shadow-2xs">
        <table className="min-w-full divide-y divide-gray-200/90 text-left text-sm">
          <thead className="bg-slate-50/80 text-xs font-bold text-slate-600 uppercase tracking-wider select-none">
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
              <th className="px-5 py-3.5 text-right font-bold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedItems.map((booking) => (
              <tr 
                key={`${booking.id}-${booking.status}-${booking.requestedPickupTime}`} 
                className="hover:bg-blue-50/40 transition-colors duration-100 group"
              >
                <td className="px-5 py-3.5 whitespace-nowrap font-medium text-slate-800">
                  {booking.id}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-800 font-medium">
                  {booking.employeeName}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">
                  {booking.from}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">
                  {booking.to}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-mono text-xs">
                  {booking.vehicle || '-'}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-700 font-medium">
                  {booking.requestedPickupTime}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                  {booking.pickupTime || '-'}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                  {booking.plannedDrop || '-'}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                  {booking.actualDrop || '-'}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-right">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SELECT_BOOKING', payload: booking })}
                    className="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold text-[#183a7b] border border-[#183a7b] rounded-md hover:bg-[#183a7b] hover:text-white transition-all shadow-2xs cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={11} className="px-6 py-12 text-center text-slate-400 text-sm">
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
