import { NavLink } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Armchair, 
  Zap, 
  Bell,
  Settings,
  CircleDot,
  GitFork
} from 'lucide-react';

/**
 * MoveInSync Left Navigation Bar
 * Replicates the authentic light-themed icon rail with pastel icon buttons,
 * active indicator, and bottom notification badge.
 */
const Sidebar = () => {
  return (
    <aside className="w-[72px] shrink-0 bg-[#f4f5f8] border-r border-gray-200/90 h-screen flex flex-col items-center py-4 select-none z-30 justify-between">
      {/* Top brand icon */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* MoveInSync Brand Emblem */}
        <NavLink 
          to="/management" 
          title="MoveInSync Transit"
          className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-sm hover:scale-105 transition-all text-white mb-2"
        >
          {/* Custom Stylized S-Arrow Emblem */}
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
        </NavLink>

        {/* Action / Nav Icon Rails matching MoveInSync */}
        <nav className="flex flex-col items-center gap-2.5 w-full px-2">
          {/* Dashboard / Analytics */}
          <NavLink
            to="/"
            title="Dashboard Overview"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md' 
                  : 'bg-orange-50/80 text-orange-500 border border-orange-100 hover:bg-orange-100 hover:shadow-sm'
              }`
            }
          >
            <MapPin className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Dashboard
            </span>
          </NavLink>

          {/* Tracking / Live Target */}
          <NavLink
            to="/management"
            title="Live Tracking"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md' 
                  : 'bg-rose-50/80 text-rose-500 border border-rose-100 hover:bg-rose-100 hover:shadow-sm'
              }`
            }
          >
            <CircleDot className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Live Operations
            </span>
          </NavLink>

          {/* Settings / Dispatch config */}
          <NavLink
            to="/routes"
            title="Route Management"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md' 
                  : 'bg-purple-50/80 text-purple-600 border border-purple-100 hover:bg-purple-100 hover:shadow-sm'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Route Config
            </span>
          </NavLink>

          {/* Routes flow */}
          <NavLink
            to="/routes"
            title="Campus Routes"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md' 
                  : 'bg-teal-50/80 text-teal-600 border border-teal-100 hover:bg-teal-100 hover:shadow-sm'
              }`
            }
          >
            <GitFork className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Shuttle Routes
            </span>
          </NavLink>

          {/* Security & Safety */}
          <button
            title="Safety & Compliance"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-50/80 text-sky-600 border border-sky-100 hover:bg-sky-100 transition-all group relative"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Safety Verification
            </span>
          </button>

          {/* Seating & Capacity */}
          <NavLink
            to="/history"
            title="Trip History & Capacity"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md' 
                  : 'bg-indigo-50/80 text-indigo-500 border border-indigo-100 hover:bg-indigo-100 hover:shadow-sm'
              }`
            }
          >
            <Armchair className="w-5 h-5" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Trip History
            </span>
          </NavLink>

          {/* Primary Management Hub (Active Lightning Icon) */}
          <NavLink
            to="/management"
            title="Shuttle & Driver Management"
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                isActive 
                  ? 'bg-[#183876] text-white shadow-md ring-2 ring-blue-400/40' 
                  : 'bg-blue-100/70 text-blue-700 hover:bg-blue-200'
              }`
            }
          >
            <Zap className="w-5 h-5 fill-current" />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Management Workspace
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom notifications area matching screenshot badge 99 */}
      <div className="flex flex-col items-center gap-3 w-full pb-2">
        <button 
          title="99+ Pending Alerts"
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-800 transition-colors border border-transparent hover:border-gray-200"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full border-2 border-[#f4f5f8] shadow-sm">
            99
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
