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

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <DriverProvider>
          <RouteProvider>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="management" element={<Management />} />
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
