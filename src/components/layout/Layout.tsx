import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Cohesive Application Layout Shell
 * Establishes consistent 64px rails, calm light-gray canvas, and standard padding.
 */
const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* 64px Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* 64px Sticky Header */}
        <Header />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-[1560px] mx-auto w-full pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
