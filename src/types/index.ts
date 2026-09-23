// Booking status enum
export type BookingStatus = 'Accepted' | 'Waiting' | 'No Show' | 'Declined' | 'Completed' | 'Requested' | 'On Going' | 'Cancelled' | 'Dropped';

// Driver status
export type DriverStatus = 'Online' | 'Offline';

// Schedule event types for timeline
export type ScheduleEventType = 'duty-start' | 'duty-end' | 'pickup' | 'drop' | 'break' | 'vehicle-change' | 'empty-leg';

export interface ScheduleEvent {
  id: string;
  type: ScheduleEventType;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  label?: string;
  bookingId?: string;
  pickupCount?: number;
  dropCount?: number;
}

export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  phone: string;
  rating: number;
  vehicleId?: string;
  schedule: ScheduleEvent[];
}

export interface Booking {
  id: string;
  employeeName: string;
  employeeId: string;
  status: BookingStatus;
  from: string;
  to: string;
  vehicle: string;
  requestedPickupTime: string;
  pickupTime: string | null;
  plannedDrop: string | null;
  actualDrop: string | null;
  date: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  vehiclePlate?: string;
  vehicleType?: string;
  vehicleColor?: string;
  vehicleCapacity?: number;
}

export interface Route {
  id: string;
  name: string;
  stops: string[];
  active: boolean;
  estimatedTime: number; // minutes
  distance: number; // km
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: string;
  color: string;
  capacity: number;
}

export interface ShuttleStats {
  totalBookings: number;
  activeDrivers: number;
  completedTrips: number;
  cancelledTrips: number;
  peakHour: string;
  averageRating: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
