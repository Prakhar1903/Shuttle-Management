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
 * Sortable, paginated booking table matching the MoveInSync screenshot.
 * Displays booking details with color-coded status badges and View action buttons.
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg booking-table">
          <thead className="bg-gray-50">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((booking) => (
              <tr key={`${booking.id}-${booking.status}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.from}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vehicle || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.requestedPickupTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.pickupTime || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.plannedDrop || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.actualDrop || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => dispatch({ type: 'SELECT_BOOKING', payload: booking })}
                    className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
