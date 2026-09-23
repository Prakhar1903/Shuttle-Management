import { NavLink, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

/**
 * MoveInSync Top Navigation Header
 * Featuring the authentic MoveInSync brand mark, segmented tab pill group
 * (Tracking, Performance, Management), and user status controls.
 */
const Header = () => {
  const location = useLocation();

  return (
    <header className="h-16 bg-white border-b border-gray-200/90 px-6 flex items-center justify-between z-20 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left: Brand + Segmented Tab Control */}
      <div className="flex items-center gap-8">
        {/* MoveInSync Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-bold tracking-tight text-slate-800">Move</span>
            <span className="text-xl font-bold tracking-tight text-emerald-600">InSync</span>
          </div>
        </div>

        {/* Segmented Pill Tabs matching MoveInSync UI */}
        <div className="hidden md:flex items-center bg-[#dce3ee]/70 p-1 rounded-lg border border-slate-300/80 shadow-inner">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-6 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                isActive && location.pathname === '/'
                  ? 'bg-[#183a7b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`
            }
          >
            Tracking
          </NavLink>

          <NavLink
            to="/routes"
            className={({ isActive }) =>
              `px-6 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-[#183a7b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`
            }
          >
            Performance
          </NavLink>

          <NavLink
            to="/management"
            className={({ isActive }) =>
              `px-6 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                isActive || location.pathname.includes('/management') || location.pathname.includes('/bookings')
                  ? 'bg-[#183a7b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`
            }
          >
            Management
          </NavLink>
        </div>
      </div>

      {/* Right controls: quick search, notification bell, profile */}
      <div className="flex items-center gap-4">
        {/* Campus Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Campus Fleet Active</span>
        </div>

        {/* Notification Icon */}
        <button 
          title="Notifications"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-blue-100/90 border border-blue-200 text-[#183a7b] font-bold text-sm flex items-center justify-center shadow-xs">
            U
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-tight">Admin Portal</div>
            <div className="text-[11px] text-slate-500 leading-tight">Transport Lead</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
