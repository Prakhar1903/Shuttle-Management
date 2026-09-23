import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Enterprise Application Shell
 * Desktop Structure:
 * ┌──────────────────────────────────────────────────────────────┐
 * │ HEADER (64px, full width, sticky top)                       │
 * ├──────────────┬───────────────────────────────────────────────┤
 * │ SIDEBAR      │ MAIN CONTENT (bg-[#f8fafc], padding: 28px 36px│
 * │ (72px fixed) │ max-width: 1560px centered container)         │
 * └──────────────┴───────────────────────────────────────────────┘
 */
const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#cbd2dc] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="max-w-[1580px] mx-auto w-full pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
