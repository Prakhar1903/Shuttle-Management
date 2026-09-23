import type { Booking, Driver } from '../types';

/**
 * Filters bookings by search term (matches against employee name, booking ID, employee ID)
 */
export function filterBookings(bookings: Booking[], searchTerm: string): Booking[] {
  if (!searchTerm.trim()) return bookings;
  const term = searchTerm.toLowerCase();
  return bookings.filter(
    (b) =>
      b.employeeName.toLowerCase().includes(term) ||
      b.id.toLowerCase().includes(term) ||
      b.employeeId.toLowerCase().includes(term)
  );
}

/**
 * Filters bookings by date
 */
export function filterBookingsByDate(bookings: Booking[], date: string): Booking[] {
  if (!date) return bookings;
  return bookings.filter((b) => b.date === date);
}

/**
 * Filters drivers by search term
 */
export function filterDrivers(drivers: Driver[], searchTerm: string): Driver[] {
  if (!searchTerm.trim()) return drivers;
  const term = searchTerm.toLowerCase();
  return drivers.filter((d) => d.name.toLowerCase().includes(term));
}

/**
 * Gets status color class for booking status badges
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Accepted': 'bg-green-100 text-green-800 border-green-300',
    'Waiting': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'No Show': 'bg-orange-100 text-orange-800 border-orange-300',
    'Declined': 'bg-gray-100 text-gray-800 border-gray-300',
    'Completed': 'bg-blue-100 text-blue-800 border-blue-300',
    'Requested': 'bg-purple-100 text-purple-800 border-purple-300',
    'On Going': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'Cancelled': 'bg-red-100 text-red-800 border-red-300',
    'Dropped': 'bg-pink-100 text-pink-800 border-pink-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
}

/**
 * Gets the segment color for timeline events
 */
export function getSegmentColor(type: string): string {
  const colors: Record<string, string> = {
    'duty-start': 'bg-yellow-300',
    'duty-end': 'bg-yellow-300',
    'pickup': 'bg-yellow-300',
    'drop': 'bg-yellow-300',
    'break': 'bg-purple-400',
    'vehicle-change': 'bg-green-400',
    'empty-leg': 'bg-gray-300',
  };
  return colors[type] || 'bg-gray-300';
}
