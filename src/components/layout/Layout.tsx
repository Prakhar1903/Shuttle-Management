import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Main Application Shell Layout
 * Provides a clean, modern canvas with responsive padding and seamless view transitions.
 */
const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-[#eef1f6] overflow-hidden antialiased text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7">
          <div className="max-w-[1680px] mx-auto pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
