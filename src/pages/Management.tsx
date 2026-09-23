import { DriverManagement } from '../components/drivers/DriverManagement';
import BookingManagement from '../components/bookings/BookingManagement';

/**
 * Primary Operations & Dispatch View
 * Structured Page Container with Page Header, Driver Management, and Booking Management.
 */
const Management = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <DriverManagement />
      <BookingManagement />
    </div>
  );
};

export default Management;
