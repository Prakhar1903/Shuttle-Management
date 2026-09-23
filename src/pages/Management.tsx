import { DriverManagement } from '../components/drivers/DriverManagement';
import BookingManagement from '../components/bookings/BookingManagement';

/**
 * Primary Operations & Dispatch View
 * Structured Page Container with Page Header, Driver Management, and Booking Management.
 */
const Management = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Shuttle Operations & Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time university campus transit dispatch, driver timeline availability, and booking lifecycle.
          </p>
        </div>

        {/* Global Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Dispatch Active</span>
          </div>
        </div>
      </div>

      {/* Driver Availability Management Section */}
      <DriverManagement />

      {/* Booking Management Data Table Section */}
      <BookingManagement />
    </div>
  );
};

export default Management;
