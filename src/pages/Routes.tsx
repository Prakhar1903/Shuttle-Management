import React, { useState } from 'react';
import { useRoutes } from '../context/RouteContext';
import { useUser } from '../context/UserContext';
import { Modal } from '../components/ui/Modal';
import { 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Clock, 
  Navigation, 
  ToggleLeft, 
  ToggleRight, 
  Route as RouteIcon, 
  Search,
  Activity,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Route } from '../types';

/**
 * Enterprise Route Management & Transit Lines View
 * Manage campus loops, intermediate stop progressions, and vehicle dispatch lines.
 */
const Routes = () => {
  const { state, dispatch } = useRoutes();
  const { role } = useUser();
  const isAdmin = role === 'admin';
  const { routes } = state;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  // Form State for Add / Edit
  const [routeName, setRouteName] = useState('');
  const [routeStops, setRouteStops] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [distance, setDistance] = useState(3.0);
  const [isActive, setIsActive] = useState(true);

  const filteredRoutes = routes.filter((route) => {
    const matchesQuery = 
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.stops.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      filterActive === 'all' ? true :
      filterActive === 'active' ? route.active :
      !route.active;

    return matchesQuery && matchesStatus;
  });

  const activeCount = routes.filter(r => r.active).length;
  const avgTime = Math.round(routes.reduce((acc, r) => acc + r.estimatedTime, 0) / (routes.length || 1));
  const totalDistance = routes.reduce((acc, r) => acc + r.distance, 0).toFixed(1);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      dispatch({ type: 'DELETE_ROUTE', payload: id });
      toast.success(`Route "${name}" deleted`);
    }
  };

  const handleToggle = (id: string, currentStatus: boolean) => {
    dispatch({ type: 'TOGGLE_ACTIVE', payload: id });
    toast.success(`Route status set to ${!currentStatus ? 'Active' : 'Standby'}`);
  };

  const openAddModal = () => {
    setEditingRoute(null);
    setRouteName('');
    setRouteStops('Main Gate, Library, Cafeteria');
    setEstimatedTime(15);
    setDistance(3.2);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (route: Route) => {
    setEditingRoute(route);
    setRouteName(route.name);
    setRouteStops(route.stops.join(', '));
    setEstimatedTime(route.estimatedTime);
    setDistance(route.distance);
    setIsActive(route.active);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeName.trim()) {
      toast.error('Please enter a route name');
      return;
    }

    const stopsArray = routeStops
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (stopsArray.length < 2) {
      toast.error('Please provide at least 2 stops');
      return;
    }

    if (editingRoute) {
      const updated: Route = {
        ...editingRoute,
        name: routeName,
        stops: stopsArray,
        estimatedTime: Number(estimatedTime),
        distance: Number(distance),
        active: isActive,
      };
      dispatch({ type: 'UPDATE_ROUTE', payload: updated });
      toast.success('Route updated successfully');
    } else {
      const newRoute: Route = {
        id: `r-${Date.now()}`,
        name: routeName,
        stops: stopsArray,
        estimatedTime: Number(estimatedTime),
        distance: Number(distance),
        active: isActive,
      };
      dispatch({ type: 'ADD_ROUTE', payload: newRoute });
      toast.success('New route added successfully');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? 'Route Management & Campus Lines' : 'Campus Transit Lines & Schedules'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isAdmin 
              ? 'Configure transit lines, monitor waypoint stop sequences, and optimize circuit transit frequencies.' 
              : 'Explore university transit lines, waypoint stops, loop durations, and station distances.'}
          </p>
        </div>

        {/* Primary Action */}
        {isAdmin ? (
          <button 
            onClick={openAddModal}
            className="h-9 inline-flex items-center gap-1.5 bg-[#183a7b] hover:bg-[#122b5e] text-white px-4 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Route</span>
          </button>
        ) : (
          <div className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800">
            Student Guide Mode (Read-Only)
          </div>
        )}
      </div>

      {/* 2. Route Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Routes */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <RouteIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{routes.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Configured Routes</div>
          </div>
        </div>

        {/* Active Lines */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{activeCount} / {routes.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Active Shuttle Lines</div>
          </div>
        </div>

        {/* Average Duration */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{avgTime} mins</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Avg Circuit Duration</div>
          </div>
        </div>

        {/* Total Campus Coverage */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">{totalDistance} km</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Campus Coverage</div>
          </div>
        </div>
      </div>

      {/* 3. Search and Quick Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search route or stop..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterActive('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterActive === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({routes.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterActive('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterActive === 'active'
                ? 'bg-[#183a7b] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterActive('inactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterActive === 'inactive'
                ? 'bg-slate-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Standby ({routes.length - activeCount})
          </button>
        </div>
      </div>

      {/* 4. Routes Grid (Responsive 3 Columns) */}
      {filteredRoutes.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-12 text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No matching routes found</h3>
          <p className="text-xs text-slate-500 mb-4">Try adjusting your search criteria or create a new route line.</p>
          <button 
            onClick={openAddModal}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            + Create a new campus route
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoutes.map((route, idx) => (
            <div 
              key={route.id} 
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header: Title, Badge, and Status */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        Line {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight">{route.name}</h3>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      {route.stops.length} Campus Waypoints
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold border shadow-2xs select-none ${
                    route.active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {route.active ? 'Active' : 'Standby'}
                  </span>
                </div>

                {/* Visual Stop Progression Stepper */}
                <div className="py-4 pl-3 relative">
                  {/* Vertical Guide Line */}
                  <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-slate-200 border-l border-dashed border-slate-300"></div>

                  <div className="space-y-3 relative">
                    {route.stops.map((stop, sIdx) => {
                      const isFirst = sIdx === 0;
                      const isLast = sIdx === route.stops.length - 1;

                      return (
                        <div key={sIdx} className="flex items-center gap-3">
                          <div className={`w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center border-2 border-white shadow-xs z-10 ${
                            isFirst 
                              ? 'bg-emerald-500 ring-2 ring-emerald-100' 
                              : isLast 
                              ? 'bg-rose-500 ring-2 ring-rose-100' 
                              : 'bg-blue-500'
                          }`} />
                          <span className={`text-xs ${
                            isFirst || isLast ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                          }`}>
                            {stop}
                            {isFirst && <span className="ml-1.5 text-[10px] text-emerald-600 font-semibold">(Origin)</span>}
                            {isLast && <span className="ml-1.5 text-[10px] text-rose-600 font-semibold">(Terminus)</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Info & Action Buttons */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-3 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{route.estimatedTime} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-slate-400" />
                    <span>{route.distance} km</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Freq: 12 min
                  </div>
                </div>

                {/* Actions Toolbar */}
                {isAdmin ? (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <button 
                      type="button"
                      onClick={() => handleToggle(route.id, route.active)}
                      className="flex items-center gap-1 text-slate-500 hover:text-blue-700 font-medium cursor-pointer"
                      title="Toggle active status"
                    >
                      {route.active ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-emerald-600" />
                          <span className="text-[11px] font-semibold text-emerald-700">In Service</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-slate-400" />
                          <span className="text-[11px] text-slate-500">Standby</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button 
                        type="button"
                        onClick={() => openEditModal(route)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Route"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDelete(route.id, route.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Route"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={`inline-flex items-center gap-1.5 font-semibold text-xs ${
                      route.active ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${route.active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      <span>{route.active ? 'Active Campus Circuit' : 'Standby Service'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">15m headway</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Fully Functional Add / Edit Route Modal */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={editingRoute ? 'Edit Campus Route' : 'Create New Route Line'}
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Route Name
              </label>
              <input
                type="text"
                required
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="e.g. North Campus Loop"
                className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stops (Comma separated)
              </label>
              <textarea
                required
                rows={3}
                value={routeStops}
                onChange={(e) => setRouteStops(e.target.value)}
                placeholder="e.g. Main Gate, Library, Lab Building, Admin Block"
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">Separate stops with commas in order of transit.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Est. Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  required
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(Number(e.target.value))}
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={0.1}
                  required
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="activeStatus"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="activeStatus" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Route Active for Immediate Shuttle Dispatch
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 px-4 rounded-xl bg-[#183a7b] hover:bg-[#122b5e] text-white text-xs font-semibold shadow-2xs cursor-pointer transition-colors"
              >
                {editingRoute ? 'Update Route' : 'Create Route'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Routes;
