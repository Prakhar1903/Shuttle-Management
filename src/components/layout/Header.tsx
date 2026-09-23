import { NavLink, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

/**
 * Enterprise SaaS Top Header Bar (64px)
 * Clean, well-spaced navigation inspired by Stripe and Linear.
 */
const Header = () => {
  const location = useLocation();

  const isManagementActive = 
    location.pathname === '/' || 
    location.pathname === '/management' || 
    location.pathname === '/bookings' ||
    location.pathname === '/drivers';

  const isPerformanceActive = 
    location.pathname === '/performance' || 
    location.pathname === '/dashboard';

  const isTrackingActive = 
    location.pathname === '/routes' ||
    location.pathname === '/tracking';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 lg:px-8 flex items-center justify-between z-30 shrink-0 sticky top-0">
      {/* Left: Product Brand */}
      <div className="flex items-center gap-8">
        <NavLink to="/management" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
          <div className="flex items-baseline gap-1 select-none">
            <span className="text-base font-bold text-slate-900 tracking-tight">Move</span>
            <span className="text-base font-bold text-emerald-600 tracking-tight">InSync</span>
          </div>
        </NavLink>

        {/* Primary Segmented Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/70 gap-1">
          {/* Tracking */}
          <NavLink
            to="/routes"
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              isTrackingActive
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Tracking
          </NavLink>

          {/* Performance */}
          <NavLink
            to="/performance"
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              isPerformanceActive
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Performance
          </NavLink>

          {/* Management */}
          <NavLink
            to="/management"
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              isManagementActive
                ? 'bg-[#183a7b] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Management
          </NavLink>
        </nav>
      </div>

      {/* Right: Operational Status + Notifications + User Profile */}
      <div className="flex items-center gap-6">
        {/* Campus Fleet Status Pill (Separated from Navigation) */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Campus Fleet Active</span>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button 
            type="button"
            title="System Alerts"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-1">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
              U
            </div>
            <div className="hidden sm:block text-left select-none">
              <div className="text-xs font-semibold text-slate-900 leading-tight">Admin Portal</div>
              <div className="text-[11px] text-slate-500 leading-tight">Transport Lead</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
