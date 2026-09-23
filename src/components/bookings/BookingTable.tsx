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
 * Enterprise Booking Data Table
 * Clean Linear/Stripe aesthetic: comfortable row height, subtle horizontal borders,
 * clear typography, and responsive horizontal scrolling.
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
    <div className="w-full flex flex-col">
      {/* Scrollable Table Area */}
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-left border-collapse min-w-[1020px]">
          {/* Table Header */}
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
            <tr>
              <SortableHeader label="Booking ID" sortKey="id" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Employee" sortKey="employeeName" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="From" sortKey="from" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="To" sortKey="to" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Vehicle" sortKey="vehicle" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Requested Pickup" sortKey="requestedPickupTime" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Pickup Time" sortKey="pickupTime" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Planned Drop" sortKey="plannedDrop" currentSort={sortConfig} onSort={requestSort} />
              <SortableHeader label="Actual Drop" sortKey="actualDrop" currentSort={sortConfig} onSort={requestSort} />
              <th className="px-3.5 py-3 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 bg-white text-sm">
            {paginatedItems.map((booking) => (
              <tr 
                key={`${booking.id}-${booking.status}-${booking.requestedPickupTime}`} 
                className="hover:bg-slate-50/70 transition-colors"
              >
                {/* Booking ID */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs font-medium text-slate-800">
                  {booking.id}
                </td>

                {/* Employee */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs font-medium text-slate-800">
                  {booking.employeeName}
                </td>

                {/* Status */}
                <td className="px-3.5 py-3 whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </td>

                {/* Route: From */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700">
                  {booking.from}
                </td>

                {/* Route: To */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700">
                  {booking.to}
                </td>

                {/* Vehicle */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700 font-mono">
                  {booking.vehicle || '-'}
                </td>

                {/* Requested Pickup */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700 font-mono">
                  {booking.requestedPickupTime}
                </td>

                {/* Pickup Time */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-500 font-mono">
                  {booking.pickupTime || '-'}
                </td>

                {/* Planned Drop */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700 font-mono">
                  {booking.plannedDrop || '-'}
                </td>

                {/* Actual Drop */}
                <td className="px-3.5 py-3 whitespace-nowrap text-xs text-slate-700 font-mono">
                  {booking.actualDrop || '-'}
                </td>

                {/* Action: Blue outline View button matching reference screenshot */}
                <td className="px-3.5 py-3 whitespace-nowrap text-right">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SELECT_BOOKING', payload: booking })}
                    className="px-4 py-1 text-xs font-semibold rounded-md border border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8]/5 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-16 text-center text-slate-400 text-sm">
                  No bookings found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default BookingTable;
