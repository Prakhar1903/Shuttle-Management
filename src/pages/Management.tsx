import { DriverManagement } from '../components/drivers/DriverManagement';
import BookingManagement from '../components/bookings/BookingManagement';

const Management = () => {
  return (
    <div className="space-y-6">
      <DriverManagement />
      <BookingManagement />
    </div>
  );
};

export default Management;
