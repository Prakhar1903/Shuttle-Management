import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import RoutesPage from './pages/Routes';
import TripHistory from './pages/TripHistory';
import StudentPortal from './pages/StudentPortal';
import FleetBeacon from './pages/FleetBeacon';
import Configuration from './pages/Configuration';
import SafetyCompliance from './pages/SafetyCompliance';
import { UserProvider, useUser } from './context/UserContext';
import { BookingProvider } from './context/BookingContext';
import { DriverProvider } from './context/DriverContext';
import { RouteProvider } from './context/RouteContext';

import AdminOnlyRoute from './components/layout/AdminOnlyRoute';

/**
 * Root index route that directs to StudentPortal or Management based on active role
 */
const IndexRoute = () => {
  const { role } = useUser();
  return role === 'student' ? <StudentPortal /> : <Management />;
};

/**
 * Root Application Router
 * Provides Role Management with 7 Distinct Dedicated Operations Pages
 */
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <BookingProvider>
          <DriverProvider>
            <RouteProvider>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Dynamic default based on user role */}
                  <Route index element={<IndexRoute />} />
                  <Route path="student" element={<StudentPortal />} />

                  {/* 1. Operations Dispatch: Driver Gantt + Booking Table */}
                  <Route 
                    path="management" 
                    element={<AdminOnlyRoute><Management /></AdminOnlyRoute>} 
                  />
                  <Route 
                    path="bookings" 
                    element={<AdminOnlyRoute><Management /></AdminOnlyRoute>} 
                  />
                  <Route 
                    path="drivers" 
                    element={<AdminOnlyRoute><Management /></AdminOnlyRoute>} 
                  />

                  {/* 2. Fleet Beacon: Live GPS Telemetry & Campus Radar */}
                  <Route 
                    path="tracking" 
                    element={<AdminOnlyRoute><FleetBeacon /></AdminOnlyRoute>} 
                  />
                  <Route 
                    path="beacon" 
                    element={<AdminOnlyRoute><FleetBeacon /></AdminOnlyRoute>} 
                  />

                  {/* 3. System & Fleet Configuration: Rules, Limits, Policies */}
                  <Route 
                    path="configuration" 
                    element={<AdminOnlyRoute><Configuration /></AdminOnlyRoute>} 
                  />
                  <Route 
                    path="settings" 
                    element={<AdminOnlyRoute><Configuration /></AdminOnlyRoute>} 
                  />

                  {/* 4. Performance & Transit: Passenger Demand & Analytics */}
                  <Route 
                    path="performance" 
                    element={<AdminOnlyRoute><Dashboard /></AdminOnlyRoute>} 
                  />
                  <Route 
                    path="dashboard" 
                    element={<AdminOnlyRoute><Dashboard /></AdminOnlyRoute>} 
                  />

                  {/* 5. Safety Compliance: Duty Hours & Vehicle Inspection Audits */}
                  <Route 
                    path="safety" 
                    element={<AdminOnlyRoute><SafetyCompliance /></AdminOnlyRoute>} 
                  />

                  {/* 6. Campus Lines: Waypoints, Stops, & Route Progressions */}
                  <Route path="routes" element={<RoutesPage />} />

                  {/* 7. Trip History: Completed Rides & Audit Archive */}
                  <Route path="history" element={<TripHistory />} />
                </Route>
              </Routes>
            </RouteProvider>
          </DriverProvider>
        </BookingProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
