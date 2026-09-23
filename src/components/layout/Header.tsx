import { NavLink } from 'react-router-dom';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-8 h-full">
        <div className="font-bold text-xl">
          <span className="text-gray-800">Move</span>
          <span className="text-blue-600">InSync</span>
        </div>

        <nav className="hidden md:flex h-full items-center gap-1">
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              `px-4 h-full flex items-center text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`
            }
          >
            Tracking
          </NavLink>
          <NavLink
            to="/performance"
            className={({ isActive }) =>
              `px-4 h-full flex items-center text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`
            }
          >
            Performance
          </NavLink>
          <NavLink
            to="/management"
            className={({ isActive }) =>
              `px-4 h-full flex items-center text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`
            }
          >
            Management
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm cursor-pointer border border-blue-200">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
