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
    'Accepted': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Waiting': 'bg-amber-50 text-amber-700 border-amber-200',
    'No Show': 'bg-orange-50 text-orange-700 border-orange-200',
    'Declined': 'bg-slate-100 text-slate-700 border-slate-200',
    'Completed': 'bg-blue-50 text-blue-700 border-blue-200',
    'Requested': 'bg-purple-50 text-purple-700 border-purple-200',
    'On Going': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200',
    'Dropped': 'bg-pink-50 text-pink-700 border-pink-200',
  };
  return colors[status] || 'bg-slate-100 text-slate-700 border-slate-200';
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
