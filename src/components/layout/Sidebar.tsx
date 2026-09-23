
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Bus, MapPin, Settings, Users } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { id: 'dashboard', path: '/', icon: LayoutDashboard, tooltip: 'Dashboard' },
    { id: 'management', path: '/management', icon: CalendarDays, tooltip: 'Management' },
    { id: 'bookings', path: '/bookings', icon: Bus, tooltip: 'Bookings' },
    { id: 'routes', path: '/routes', icon: MapPin, tooltip: 'Routes' },
    { id: 'drivers', path: '/drivers', icon: Users, tooltip: 'Drivers' },
  ];

  return (
    <div className="w-16 bg-slate-800 h-screen flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <div className="mb-8 flex justify-center w-full">
        <div className="bg-blue-600 p-2 rounded-full">
          <Bus className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4 w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={item.tooltip}
            className={({ isActive }) =>
              `p-3 rounded-full transition-colors relative group ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="mt-auto w-full flex justify-center">
        <NavLink
          to="/settings"
          title="Settings"
          className={({ isActive }) =>
            `p-3 rounded-full transition-colors ${
              isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`
          }
        >
          <Settings className="w-5 h-5" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
