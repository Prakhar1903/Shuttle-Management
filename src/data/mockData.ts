import type { Vehicle, Driver, Booking, Route, ShuttleStats } from '../types';

export const mockVehicles: Vehicle[] = [
  { id: 'v1', name: 'NB-002-RF', plate: 'UA3282', type: 'White Bus', color: 'White', capacity: 12 },
  { id: 'v2', name: 'NB-003-GN', plate: 'UA4511', type: 'Green Van', color: 'Green', capacity: 8 },
  { id: 'v3', name: 'NB-005-BL', plate: 'UA7823', type: 'Blue Bus', color: 'Blue', capacity: 15 },
  { id: 'v4', name: 'NB-001-RD', plate: 'UA1290', type: 'Red Van', color: 'Red', capacity: 6 }
];

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Samuel Jones',
    status: 'Online',
    phone: '555-0101',
    rating: 4.8,
    vehicleId: 'v1',
    schedule: [
      { id: 'se1', type: 'duty-start', startTime: '06:00', endTime: '06:20', label: 'Duty Start' },
      { id: 'se2', type: 'empty-leg', startTime: '06:20', endTime: '06:45', label: 'Empty Leg' },
      { id: 'se3', type: 'pickup', startTime: '06:45', endTime: '07:15', label: 'Pickup', pickupCount: 3 },
      { id: 'se4', type: 'break', startTime: '07:15', endTime: '08:00', label: 'Break' },
      { id: 'se5', type: 'empty-leg', startTime: '08:00', endTime: '08:20', label: 'Empty Leg' },
      { id: 'se6', type: 'pickup', startTime: '08:20', endTime: '09:15', label: 'Pickup', pickupCount: 4 },
      { id: 'se7', type: 'pickup', startTime: '09:15', endTime: '09:35', label: 'Pickup', pickupCount: 2 },
      { id: 'se8', type: 'drop', startTime: '09:35', endTime: '09:50', label: 'Drop', dropCount: 3 },
      { id: 'se9', type: 'empty-leg', startTime: '09:50', endTime: '10:05', label: 'Empty Leg' },
      { id: 'se10', type: 'vehicle-change', startTime: '11:30', endTime: '11:50', label: 'Vehicle Change' },
      { id: 'se11', type: 'empty-leg', startTime: '11:50', endTime: '12:05', label: 'Empty Leg' },
      { id: 'se12', type: 'empty-leg', startTime: '12:05', endTime: '12:20', label: 'Empty Leg' },
      { id: 'se13', type: 'pickup', startTime: '12:20', endTime: '13:45', label: 'Pickup', pickupCount: 5 },
      { id: 'se14', type: 'break', startTime: '13:45', endTime: '15:15', label: 'Lunch Break' },
      { id: 'se15', type: 'pickup', startTime: '15:15', endTime: '15:35', label: 'Pickup', pickupCount: 2 },
      { id: 'se16', type: 'empty-leg', startTime: '15:35', endTime: '15:50', label: 'Empty Leg' },
      { id: 'se17', type: 'duty-end', startTime: '15:50', endTime: '16:05', label: 'Duty End' }
    ]
  },
  {
    id: 'd2',
    name: 'Bob Jones',
    status: 'Offline',
    phone: '555-0102',
    rating: 4.5,
    vehicleId: 'v2',
    schedule: [
      { id: 'be1', type: 'break', startTime: '08:30', endTime: '08:45', label: 'Prep' },
      { id: 'be2', type: 'pickup', startTime: '08:45', endTime: '10:00', label: 'Pickup', pickupCount: 2 },
      { id: 'be3', type: 'pickup', startTime: '10:00', endTime: '11:15', label: 'Pickup', pickupCount: 3 },
      { id: 'be4', type: 'pickup', startTime: '11:15', endTime: '11:45', label: 'Pickup', pickupCount: 2, dropCount: 3 },
      { id: 'be5', type: 'pickup', startTime: '11:45', endTime: '12:05', label: 'Pickup', pickupCount: 1 },
      { id: 'be6', type: 'drop', startTime: '12:05', endTime: '12:25', label: 'Drop', dropCount: 2 },
      { id: 'be7', type: 'empty-leg', startTime: '12:25', endTime: '12:45', label: 'Empty Leg' },
      { id: 'be8', type: 'break', startTime: '16:30', endTime: '20:30', label: 'Standby' },
      { id: 'be9', type: 'duty-end', startTime: '20:30', endTime: '21:00', label: 'Duty End' }
    ]
  },
  {
    id: 'd3',
    name: 'Jonathan Spikes',
    status: 'Offline',
    phone: '555-0103',
    rating: 4.2,
    vehicleId: 'v3',
    schedule: [
      { id: 'je1', type: 'empty-leg', startTime: '08:30', endTime: '09:15', label: 'Empty Leg' },
      { id: 'je2', type: 'pickup', startTime: '09:15', endTime: '10:45', label: 'Pickup', pickupCount: 5 },
      { id: 'je3', type: 'break', startTime: '10:45', endTime: '11:30', label: 'Break' },
      { id: 'je4', type: 'pickup', startTime: '11:30', endTime: '12:30', label: 'Pickup', pickupCount: 3 },
      { id: 'je5', type: 'empty-leg', startTime: '12:30', endTime: '13:15', label: 'Empty Leg' },
      { id: 'je6', type: 'duty-end', startTime: '13:15', endTime: '13:35', label: 'Duty End' }
    ]
  },
  {
    id: 'd4',
    name: 'Maria Garcia',
    status: 'Online',
    phone: '555-0104',
    rating: 4.9,
    vehicleId: 'v4',
    schedule: [
      { id: 'me1', type: 'duty-start', startTime: '08:00', endTime: '08:00', label: 'Duty Start' },
      { id: 'me2', type: 'pickup', startTime: '09:00', endTime: '09:15', label: 'Pickup', pickupCount: 3 },
      { id: 'me3', type: 'drop', startTime: '09:45', endTime: '10:00', label: 'Drop', dropCount: 3 },
      { id: 'me4', type: 'duty-end', startTime: '17:00', endTime: '17:00', label: 'Duty End' }
    ]
  },
  {
    id: 'd5',
    name: 'David Chen',
    status: 'Offline',
    phone: '555-0105',
    rating: 4.7,
    vehicleId: 'v1',
    schedule: [
      { id: 'ce1', type: 'duty-start', startTime: '09:00', endTime: '09:00', label: 'Duty Start' },
      { id: 'ce2', type: 'pickup', startTime: '10:00', endTime: '10:15', label: 'Pickup', pickupCount: 1 },
      { id: 'ce3', type: 'drop', startTime: '10:30', endTime: '10:45', label: 'Drop', dropCount: 1 },
      { id: 'ce4', type: 'duty-end', startTime: '18:00', endTime: '18:00', label: 'Duty End' }
    ]
  }
];

const generateRandomBookings = (): Booking[] => {
  const locations = ['Library', 'Data Centre', 'Parking', 'Main Gate', 'Hostel A', 'Hostel B', 'Sports Complex', 'Cafeteria', 'Admin Block', 'Lab Building'];
  const names = ['John Doe', 'Alice Smith', 'Jane Williams', 'Robert Brown', 'Michael Davis', 'Emily Miller', 'Chris Wilson', 'Sarah Moore', 'Kevin Taylor', 'Lisa Anderson'];
  const statuses: Booking['status'][] = ['Accepted', 'Waiting', 'No Show', 'Declined', 'Completed', 'Requested', 'On Going', 'Cancelled', 'Dropped'];
  const vehicles = ['NB-002-RF', 'NB-003-GN', 'NB-005-BL', 'NB-001-RD', '-'];
  
  const randomBookings: Booking[] = [];
  for (let i = 11; i <= 50; i++) {
    const from = locations[Math.floor(Math.random() * locations.length)];
    let to = locations[Math.floor(Math.random() * locations.length)];
    while (to === from) to = locations[Math.floor(Math.random() * locations.length)];
    
    const pickupHour = Math.floor(Math.random() * 11 + 7);
    const pickupMin = Math.floor(Math.random() * 60);
    const tripDuration = Math.floor(Math.random() * 20 + 15);
    const dropMinutesTotal = pickupHour * 60 + pickupMin + tripDuration;
    const dropHour = Math.floor(dropMinutesTotal / 60);
    const dropMin = dropMinutesTotal % 60;

    const requestedPickupTime = `${pickupHour.toString().padStart(2, '0')}:${pickupMin.toString().padStart(2, '0')}`;
    const plannedDrop = `${dropHour.toString().padStart(2, '0')}:${dropMin.toString().padStart(2, '0')}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hasPickup = ['On Going', 'Completed', 'Dropped'].includes(status);
    const hasDrop = ['Completed', 'Dropped'].includes(status);

    randomBookings.push({
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      employeeName: names[Math.floor(Math.random() * names.length)],
      employeeId: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
      status,
      from,
      to,
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      requestedPickupTime,
      pickupTime: hasPickup ? requestedPickupTime : null,
      plannedDrop,
      actualDrop: hasDrop ? plannedDrop : null,
      date: '2024-12-16'
    });
  }
  return randomBookings;
};

export const mockBookings: Booking[] = [
  { id: '123123', employeeName: 'Thompson', employeeId: 'EMP1001', status: 'Accepted', from: 'Library', to: 'Data Centre', vehicle: 'NB-002-RF', requestedPickupTime: '11:21', pickupTime: null, plannedDrop: '11:32', actualDrop: '11:32', date: '2024-12-16' },
  { id: '324235', employeeName: 'Daniel Radcliff', employeeId: 'EMP1002', status: 'Waiting', from: 'Library', to: 'Parking', vehicle: 'NB-002-RF', requestedPickupTime: '11:34', pickupTime: null, plannedDrop: '11:43', actualDrop: '11:43', date: '2024-12-16' },
  { id: '545232', employeeName: 'W.J. Smith', employeeId: 'EMP1003', status: 'No Show', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickupTime: '11:50', pickupTime: null, plannedDrop: '12:10', actualDrop: null, date: '2024-12-16' },
  { id: '434532', employeeName: 'Tina Shah', employeeId: 'EMP1004', status: 'Declined', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickupTime: '11:55', pickupTime: null, plannedDrop: null, actualDrop: null, date: '2024-12-16' },
  { id: '545233', employeeName: 'W.J. Smith', employeeId: 'EMP1003', status: 'Completed', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickupTime: '11:58', pickupTime: '12:25', plannedDrop: '12:35', actualDrop: '12:40', date: '2024-12-16' },
  { id: '434533', employeeName: 'Tina Shah', employeeId: 'EMP1004', status: 'Requested', from: 'Library', to: 'Data Centre', vehicle: 'NB-002-RF', requestedPickupTime: '11:55', pickupTime: null, plannedDrop: '12:15', actualDrop: null, date: '2024-12-16' },
  { id: '545234', employeeName: 'W.J. Smith', employeeId: 'EMP1003', status: 'On Going', from: 'Data Centre', to: 'Parking', vehicle: '-', requestedPickupTime: '11:58', pickupTime: '12:25', plannedDrop: '12:35', actualDrop: null, date: '2024-12-16' },
  { id: '434534', employeeName: 'Tina Shah', employeeId: 'EMP1004', status: 'Cancelled', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickupTime: '11:55', pickupTime: null, plannedDrop: '12:15', actualDrop: null, date: '2024-12-16' },
  { id: '545235', employeeName: 'W.J. Smith', employeeId: 'EMP1003', status: 'Dropped', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickupTime: '11:58', pickupTime: '12:25', plannedDrop: '12:35', actualDrop: '12:40', date: '2024-12-16' },
  { id: '434535', employeeName: 'Tina Shah', employeeId: 'EMP1004', status: 'Declined', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickupTime: '11:55', pickupTime: null, plannedDrop: null, actualDrop: null, date: '2024-12-16' },
  ...generateRandomBookings()
];

export const mockRoutes: Route[] = [
  { id: 'r1', name: 'Campus Loop', stops: ['Main Gate', 'Library', 'Data Centre', 'Cafeteria', 'Main Gate'], active: true, estimatedTime: 15, distance: 3.2 },
  { id: 'r2', name: 'Hostel Express', stops: ['Hostel A', 'Hostel B', 'Main Gate'], active: true, estimatedTime: 10, distance: 2.1 },
  { id: 'r3', name: 'Academic Route', stops: ['Main Gate', 'Library', 'Lab Building', 'Admin Block'], active: true, estimatedTime: 12, distance: 2.8 },
  { id: 'r4', name: 'Sports Shuttle', stops: ['Hostel A', 'Sports Complex', 'Cafeteria'], active: true, estimatedTime: 8, distance: 1.5 },
  { id: 'r5', name: 'Evening Route', stops: ['Library', 'Hostel A', 'Hostel B', 'Main Gate'], active: false, estimatedTime: 18, distance: 4.0 },
  { id: 'r6', name: 'Staff Route', stops: ['Parking', 'Admin Block', 'Library', 'Data Centre'], active: true, estimatedTime: 14, distance: 3.5 }
];

export const mockStats: ShuttleStats = {
  totalBookings: 1247,
  activeDrivers: 3,
  completedTrips: 1089,
  cancelledTrips: 58,
  peakHour: '09:00 - 10:00',
  averageRating: 4.3
};

export const hourlyDemand = [
  { hour: '00:00', bookings: 2 },
  { hour: '01:00', bookings: 1 },
  { hour: '02:00', bookings: 0 },
  { hour: '03:00', bookings: 0 },
  { hour: '04:00', bookings: 1 },
  { hour: '05:00', bookings: 5 },
  { hour: '06:00', bookings: 15 },
  { hour: '07:00', bookings: 45 },
  { hour: '08:00', bookings: 120 },
  { hour: '09:00', bookings: 150 },
  { hour: '10:00', bookings: 80 },
  { hour: '11:00', bookings: 60 },
  { hour: '12:00', bookings: 95 },
  { hour: '13:00', bookings: 110 },
  { hour: '14:00', bookings: 75 },
  { hour: '15:00', bookings: 65 },
  { hour: '16:00', bookings: 90 },
  { hour: '17:00', bookings: 140 },
  { hour: '18:00', bookings: 85 },
  { hour: '19:00', bookings: 45 },
  { hour: '20:00', bookings: 25 },
  { hour: '21:00', bookings: 15 },
  { hour: '22:00', bookings: 10 },
  { hour: '23:00', bookings: 5 }
];
