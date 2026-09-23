import { NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, Bell, Bus } from 'lucide-react';
import { useUser } from '../../context/UserContext';

/**
 * Enterprise Navigation Sidebar (100px fixed)
 * Matching exact pastel icons with full-width dark blue active selection for every item.
 * Adapts to Admin Operations vs Student / Rider view.
 */
const Sidebar = () => {
  const location = useLocation();
  const { role } = useUser();

  const adminNavItems = [
    {
      id: 'routes',
      to: '/routes',
      title: 'Campus Lines',
      isActive: location.pathname === '/routes',
      defaultBg: 'bg-[#eadfd7]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#a75d16]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
          <path d="M12 3a3.5 3.5 0 0 0-3.5 3.5c0 3 3.5 6.5 3.5 6.5s3.5-3.5 3.5-6.5A3.5 3.5 0 0 0 12 3z" />
          <circle cx="12" cy="6.5" r="1" />
        </svg>
      )
    },
    {
      id: 'beacon',
      to: '/tracking',
      title: 'Fleet Beacon',
      isActive: location.pathname === '/tracking' || location.pathname === '/beacon',
      defaultBg: 'bg-[#dfcdd5]',
      icon: (isActive: boolean) => (
        <span className={`w-3.5 h-3.5 rounded-full ${isActive ? 'bg-[#102d69]' : 'bg-[#b43a3a]'}`}></span>
      )
    },
    {
      id: 'configuration',
      to: '/configuration',
      title: 'Configuration',
      isActive: location.pathname === '/configuration' || location.pathname === '/settings',
      defaultBg: 'bg-[#c6bddd]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#6251a5]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    {
      id: 'performance',
      to: '/performance',
      title: 'Performance & Transit',
      isActive: location.pathname === '/performance' || location.pathname === '/dashboard',
      defaultBg: 'bg-[#c4d4c9]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#25807f]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 6a2 2 0 1 0 0 .01"/>
          <circle cx="7" cy="6" r="0.8" fill="currentColor"/>
          <path d="M7 8.5v3a3.5 3.5 0 0 0 3.5 3.5h3a3.5 3.5 0 0 1 3.5 3.5v1.5"/>
          <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'safety',
      to: '/safety',
      title: 'Safety Compliance',
      isActive: location.pathname === '/safety',
      defaultBg: 'bg-[#b6cbd8]',
      icon: (isActive: boolean) => (
        <ShieldCheck className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#236dbb]'}`} strokeWidth={2.2} />
      )
    },
    {
      id: 'history',
      to: '/history',
      title: 'Trip History',
      isActive: location.pathname === '/history',
      defaultBg: 'bg-[#b8c8ce]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#142e87]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8 3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v7c0 1.7 1.3 3 3 3h4c1.1 0 2 .9 2 2s-.9 2-2 2H9c-2.8 0-5-2.2-5-5V6c0-1.7 1.3-3 3-3h1z"/>
        </svg>
      )
    },
    {
      id: 'management',
      to: '/management',
      title: 'Operations Dispatch',
      isActive: location.pathname === '/' || location.pathname === '/management' || location.pathname === '/bookings' || location.pathname === '/drivers',
      defaultBg: 'bg-[#b8c8ce]',
      icon: (_isActive: boolean) => (
        <svg className="w-7 h-7 text-[#102d69] fill-current" viewBox="0 0 24">
          <path d="M3 10h4v2H3v-2zm-1 4h5v2H2v-2zm12-12l-7 11h5l-2 9 9-11h-5l2-9z"/>
        </svg>
      )
    }
  ];

  const studentNavItems = [
    {
      id: 'student-pass',
      to: '/student',
      title: 'Shuttle Pass & Booking',
      isActive: location.pathname === '/student' || (role === 'student' && location.pathname === '/'),
      defaultBg: 'bg-[#b6cbd8]',
      icon: (isActive: boolean) => (
        <Bus className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#142e87]'}`} />
      )
    },
    {
      id: 'student-routes',
      to: '/routes',
      title: 'Campus Transit Lines',
      isActive: location.pathname === '/routes',
      defaultBg: 'bg-[#eadfd7]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#a75d16]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
          <path d="M12 3a3.5 3.5 0 0 0-3.5 3.5c0 3 3.5 6.5 3.5 6.5s3.5-3.5 3.5-6.5A3.5 3.5 0 0 0 12 3z" />
          <circle cx="12" cy="6.5" r="1" />
        </svg>
      )
    },
    {
      id: 'student-history',
      to: '/history',
      title: 'My Ride History',
      isActive: location.pathname === '/history',
      defaultBg: 'bg-[#b8c8ce]',
      icon: (isActive: boolean) => (
        <svg 
          className={`w-7 h-7 ${isActive ? 'text-[#102d69]' : 'text-[#142e87]'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8 3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v7c0 1.7 1.3 3 3 3h4c1.1 0 2 .9 2 2s-.9 2-2 2H9c-2.8 0-5-2.2-5-5V6c0-1.7 1.3-3 3-3h1z"/>
        </svg>
      )
    }
  ];

  const currentNavItems = role === 'student' ? studentNavItems : adminNavItems;

  return (
    <aside className="app-sidebar w-[100px] shrink-0 bg-[#c7c9cc] border-r border-[#aeb3b9] h-full flex flex-col items-center py-3 select-none z-20 justify-between">
      {/* Top Section: Navigation Links */}
      <div className="flex flex-col items-center w-full">
        <nav aria-label="Sidebar Navigation" className="flex flex-col items-center gap-1.5 w-full">
          {currentNavItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              title={item.title}
              className={`w-full flex items-center justify-center py-2.5 relative group cursor-pointer transition-all ${
                item.isActive
                  ? 'bg-[#102c70]'
                  : 'hover:bg-black/5'
              }`}
            >
              <div
                className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center shadow-2xs transition-all ${
                  item.isActive
                    ? 'bg-[#d4d5d9]'
                    : item.defaultBg
                }`}
              >
                {item.icon(item.isActive)}
              </div>
              <span className="absolute left-16 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {item.title}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section: 99+ Notifications Bell with Red Badge */}
      <div className="flex flex-col items-center w-full px-2 pb-2">
        <button 
          type="button"
          title="99 Notifications"
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white/40 transition-all group cursor-pointer"
        >
          <Bell className="w-5 h-5 text-slate-700" />
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#dc2626] text-white text-[10px] font-bold rounded-full shadow-xs leading-tight">
            99
          </span>
          <span className="absolute left-16 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            99 Pending Alerts
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
