import { NavLink, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

/**
 * MoveInSync Top Navigation Header
 * Features the brand emblem, generously spaced segmented pill buttons
 * (Tracking, Performance, Management), and status indicators.
 */
const Header = () => {
  const location = useLocation();

  // Helper to determine if Management tab is active
  const isManagementActive = 
    location.pathname === '/' || 
    location.pathname === '/management' || 
    location.pathname === '/tracking' ||
    location.pathname === '/bookings' ||
    location.pathname === '/drivers';

  const isPerformanceActive = 
    location.pathname === '/performance' || 
    location.pathname === '/dashboard';

  const isRoutesActive = location.pathname === '/routes';

  return (
    <header className="h-[72px] bg-white border-b border-slate-200/90 px-8 flex items-center justify-between z-20 shrink-0 shadow-xs select-none">
      {/* Left: Brand + Segmented Tab Control */}
      <div className="flex items-center gap-10">
        {/* MoveInSync Logo */}
        <NavLink to="/management" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold tracking-tight text-slate-800">Move</span>
            <span className="text-xl font-extrabold tracking-tight text-emerald-600">InSync</span>
          </div>
        </NavLink>

        {/* Segmented Pill Navigation matching Screenshot 2 */}
        <div className="hidden md:flex items-center bg-[#e4e9f2] p-1.5 rounded-xl border border-slate-300/80 shadow-inner gap-2">
          {/* Tracking Tab */}
          <NavLink
            to="/routes"
            className={`inline-flex items-center justify-center px-7 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isRoutesActive
                ? 'bg-[#183a7b] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Tracking
          </NavLink>

          {/* Performance Tab */}
          <NavLink
            to="/performance"
            className={`inline-flex items-center justify-center px-7 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isPerformanceActive
                ? 'bg-[#183a7b] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Performance
          </NavLink>

          {/* Management Tab (Primary Active) */}
          <NavLink
            to="/management"
            className={`inline-flex items-center justify-center px-7 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              isManagementActive
                ? 'bg-[#183a7b] text-white shadow-sm ring-1 ring-black/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Management
          </NavLink>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-5">
        {/* Campus Status Pill */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Campus Fleet Active</span>
        </div>

        {/* Notification Bell */}
        <button 
          type="button"
          title="Alerts"
          className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#183a7b] text-white font-bold text-sm flex items-center justify-center shadow-xs">
            U
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-850 leading-tight">Admin Portal</div>
            <div className="text-[11px] text-slate-500 leading-tight">Transport Lead</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
