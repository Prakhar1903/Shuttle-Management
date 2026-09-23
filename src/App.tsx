import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import RoutesPage from './pages/Routes';
import TripHistory from './pages/TripHistory';
import { BookingProvider } from './context/BookingContext';
import { DriverProvider } from './context/DriverContext';
import { RouteProvider } from './context/RouteContext';

/**
 * Root Application Router
 * Sets MoveInSync Shuttle Management as the primary landing page.
 */
function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <DriverProvider>
          <RouteProvider>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Primary Default Route is Management as requested */}
                <Route index element={<Management />} />
                <Route path="management" element={<Management />} />
                <Route path="tracking" element={<Management />} />
                <Route path="performance" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Management />} />
                <Route path="routes" element={<RoutesPage />} />
                <Route path="drivers" element={<Management />} />
                <Route path="history" element={<TripHistory />} />
              </Route>
            </Routes>
          </RouteProvider>
        </DriverProvider>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
