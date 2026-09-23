import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { useBookings } from '../../context/BookingContext';
import type { Booking } from '../../types';
import toast from 'react-hot-toast';

interface BookingFormProps {
  booking?: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const LOCATIONS = [
  'Library',
  'Data Centre',
  'Parking',
  'Main Gate',
  'Hostel A',
  'Hostel B',
  'Sports Complex',
  'Cafeteria',
  'Admin Block',
  'Lab Building'
];

const BookingForm: React.FC<BookingFormProps> = ({ booking, isOpen, onClose }) => {
  const { dispatch } = useBookings();
  const isEditing = !!booking;

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    from: '',
    to: '',
    vehicle: '',
    date: new Date().toISOString().split('T')[0],
    requestedPickupTime: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (booking) {
      setFormData({
        employeeName: booking.employeeName,
        employeeId: booking.employeeId,
        from: booking.from,
        to: booking.to,
        vehicle: booking.vehicle || '',
        date: booking.date,
        requestedPickupTime: booking.requestedPickupTime
      });
    }
  }, [booking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee Name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.from) newErrors.from = 'Pickup location is required';
    if (!formData.to) newErrors.to = 'Drop-off location is required';
    if (formData.from && formData.to && formData.from === formData.to) {
      newErrors.to = 'From and To locations cannot be the same';
      toast.error('From and To locations cannot be the same');
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.requestedPickupTime) newErrors.requestedPickupTime = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (isEditing && booking) {
      const updatedBooking: Booking = {
        ...booking,
        ...formData
      };
      dispatch({ type: 'UPDATE_BOOKING', payload: updatedBooking });
      toast.success('Booking updated successfully');
    } else {
      const newBooking: Booking = {
        ...formData,
        id: `BKG-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        status: 'Requested',
        pickupTime: null,
        plannedDrop: null,
        actualDrop: null,
      } as Booking; // Asserting as Booking as we might be missing some default optional props in formData
      
      dispatch({ type: 'ADD_BOOKING', payload: newBooking });
      toast.success('Booking created successfully');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Booking' : 'New Booking'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name *</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.employeeName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. John Doe"
          />
          {errors.employeeName && <p className="text-red-500 text-xs mt-1">{errors.employeeName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.employeeId ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. EMP001"
          />
          {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From *</label>
            <select
              name="from"
              value={formData.from}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.from ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select location</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
            <select
              name="to"
              value={formData.to}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.to ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select location</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requested Time *</label>
            <input
              type="time"
              name="requestedPickupTime"
              value={formData.requestedPickupTime}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.requestedPickupTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.requestedPickupTime && <p className="text-red-500 text-xs mt-1">{errors.requestedPickupTime}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle (Optional)</label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Auto-assign</option>
            <option value="NB-001">NB-001</option>
            <option value="NB-002-RF">NB-002-RF</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update Booking' : 'Save Booking'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingForm;
