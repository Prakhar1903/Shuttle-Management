import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, GraduationCap } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

/**
 * Top Application Header (64px)
 * Spans 100% width with brand mark, segmented role-based navigation,
 * interactive Role Switcher toggle, separated campus status, and user profile grouping.
 */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, currentUser } = useUser();

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

  const isStudentActive = 
    location.pathname === '/student' || 
    (role === 'student' && location.pathname === '/');

  return (
    <header className="w-full h-16 bg-[#cbd2dc] border-b border-slate-300/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0 select-none">
      {/* Left: Brand Identity + Navigation Tabs */}
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Brand Mark matching reference screenshot */}
        <NavLink 
          to={role === 'student' ? '/student' : '/management'} 
          className="flex items-center gap-2.5 focus:outline-none group select-none"
        >
          {/* Authentic MoveInSync Green S-Loop Parallelogram */}
          <div className="w-9 h-9 rounded-lg bg-[#449d44] -skew-x-3 flex items-center justify-center text-white shadow-2xs group-hover:opacity-95 transition-opacity">
            <svg className="w-6 h-6 fill-current skew-x-3" viewBox="0 0 24 24">
              <path d="M5 8h10l-2.5-2.5 1.4-1.4L18.8 8l-4.9 3.9-1.4-1.4L15 9H7a2 2 0 0 0-2 2v2H3v-2a4 4 0 0 1 4-4zm14 8H9l2.5 2.5-1.4 1.4L5.2 16l4.9-3.9 1.4 1.4L9 15h8a2 2 0 0 0 2-2v-2h2v2a4 4 0 0 1-4 4z"/>
            </svg>
          </div>
          {/* Stacked Move / inSync™ Typography */}
          <div className="flex flex-col leading-none">
            <span className="text-[17px] font-bold text-slate-900 tracking-tight">Move</span>
            <span className="text-[17px] font-bold italic text-slate-900 -mt-0.5 flex items-start">
              inSync<span className="text-[9px] font-semibold not-italic ml-0.5 -mt-0.5">™</span>
            </span>
          </div>
        </NavLink>

        {/* Primary Segmented Navigation */}
        {role === 'admin' ? (
          <nav 
            aria-label="Admin Navigation" 
            className="hidden md:grid grid-cols-3 w-[380px] h-[36px] p-[2.5px] rounded-lg border border-[#183a7b]/60 bg-[#edf2f7]/50 text-center select-none shrink-0"
          >
            {/* Tracking */}
            <NavLink
              to="/routes"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                isTrackingActive
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              Tracking
            </NavLink>

            {/* Performance */}
            <NavLink
              to="/performance"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                isPerformanceActive
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              Performance
            </NavLink>

            {/* Management */}
            <NavLink
              to="/management"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                isManagementActive
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              Management
            </NavLink>
          </nav>
        ) : (
          <nav 
            aria-label="Student Navigation" 
            className="hidden md:grid grid-cols-3 w-[390px] h-[36px] p-[2.5px] rounded-lg border border-[#183a7b]/60 bg-[#edf2f7]/50 text-center select-none shrink-0"
          >
            {/* Student Shuttle Pass */}
            <NavLink
              to="/student"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                isStudentActive
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              Book & Pass
            </NavLink>

            {/* Routes */}
            <NavLink
              to="/routes"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                location.pathname === '/routes'
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              Campus Lines
            </NavLink>

            {/* Trip History */}
            <NavLink
              to="/history"
              className={`flex items-center justify-center h-full text-[13px] rounded-[5px] transition-all ${
                location.pathname === '/history'
                  ? 'bg-[#102d69] text-white font-medium shadow-2xs'
                  : 'text-slate-800 hover:text-slate-950 font-normal'
              }`}
            >
              My Rides
            </NavLink>
          </nav>
        )}
      </div>

      {/* Right: Role Switcher + Operational Status + Notifications + User Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Interactive Role Switcher Toggle Pill */}
        <div 
          role="radiogroup" 
          aria-label="Portal Role Selector" 
          className="flex items-center bg-[#b9c1ce] p-1 rounded-xl border border-slate-400/80 shadow-inner"
        >
          <button
            type="button"
            role="radio"
            aria-checked={role === 'admin'}
            onClick={() => {
              setRole('admin');
              if (location.pathname === '/student') {
                navigate('/management');
              }
              toast.success('🛡️ Switched to Transport Lead (Admin Portal)');
            }}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'admin'
                ? 'bg-[#102d69] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
            }`}
          >
            <ShieldCheck size={14} className={role === 'admin' ? 'text-blue-300' : 'text-slate-600'} />
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="sm:hidden">Admin</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={role === 'student'}
            onClick={() => {
              setRole('student');
              navigate('/student');
              toast.success('👋 Switched to Student Commuter (Alex Rivera)');
            }}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              role === 'student'
                ? 'bg-[#102d69] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
            }`}
          >
            <GraduationCap size={14} className={role === 'student' ? 'text-blue-300' : 'text-slate-600'} />
            <span className="hidden sm:inline">Student / Rider</span>
            <span className="sm:hidden">Student</span>
          </button>
        </div>

        {/* Campus Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{role === 'student' ? 'Shuttle Circuit Active' : 'Campus Fleet Active'}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Notification Button */}
          <button 
            type="button"
            title="System Alerts"
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors focus:outline-none cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-slate-300"></div>

          {/* User Profile / Quick Switcher */}
          <button
            type="button"
            onClick={() => {
              if (role === 'admin') {
                setRole('student');
                navigate('/student');
                toast.success('👋 Switched to Student / Rider Mode (Alex Rivera)');
              } else {
                setRole('admin');
                navigate('/management');
                toast.success('🛡️ Switched to Admin Operations Mode');
              }
            }}
            className="flex items-center gap-2.5 pl-1 hover:opacity-85 transition-opacity cursor-pointer text-left focus:outline-none"
            title="Click to Switch Portal Role"
          >
            <div className={`w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs ${
              role === 'student' ? 'bg-[#1e40af]' : 'bg-slate-900'
            }`}>
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                <span>{currentUser.name}</span>
                <span className="text-[10px] text-blue-700 underline font-normal">(switch)</span>
              </div>
              <div className="text-[11px] text-slate-600 leading-tight">{currentUser.role}</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
