import { NavLink } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Armchair, 
  Zap, 
  Bell,
  Settings,
  GitFork
} from 'lucide-react';

/**
 * Enterprise Navigation Sidebar (64px fixed)
 * Minimalist icon rail matching Linear/Vercel styling.
 */
const Sidebar = () => {
  return (
    <aside className="w-16 shrink-0 bg-white border-r border-slate-200/80 h-screen flex flex-col items-center py-4 select-none z-30 justify-between">
      {/* Top Section: Navigation Links */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Navigation Icon List */}
        <nav aria-label="Sidebar Rail" className="flex flex-col items-center gap-1.5 w-full px-2">
          {/* Dashboard / Analytics */}
          <NavLink
            to="/performance"
            title="Performance Dashboard"
            className={({ isActive }) =>
              `w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <MapPin className="w-4.5 h-4.5" />
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Performance
            </span>
          </NavLink>

          {/* Operations Hub (Active Management) */}
          <NavLink
            to="/management"
            title="Shuttle Management"
            className={({ isActive }) =>
              `w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <Zap className="w-4.5 h-4.5 fill-current" />
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Operations
            </span>
          </NavLink>

          {/* Live Dispatch */}
          <NavLink
            to="/routes"
            title="Live Routes"
            className={({ isActive }) =>
              `w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <GitFork className="w-4.5 h-4.5" />
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Routes
            </span>
          </NavLink>

          {/* Trip History */}
          <NavLink
            to="/history"
            title="Trip History"
            className={({ isActive }) =>
              `w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <Armchair className="w-4.5 h-4.5" />
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Trip History
            </span>
          </NavLink>

          {/* Safety */}
          <button
            type="button"
            title="Safety & Compliance"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors group relative"
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Safety Verification
            </span>
          </button>
        </nav>
      </div>

      {/* Bottom Section: Alerts & Settings */}
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        <button 
          type="button"
          title="99+ Pending Alerts"
          className="relative w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors group"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
          <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            99+ Notifications
          </span>
        </button>

        <button
          type="button"
          title="Settings"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors group relative"
        >
          <Settings className="w-4.5 h-4.5" />
          <span className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
