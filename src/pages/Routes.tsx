import { useState } from 'react';
import { useRoutes } from '../context/RouteContext';
import { Modal } from '../components/ui/Modal';
import { MapPin, Plus, Edit2, Trash2, Clock, Navigation, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Routes = () => {
  const { state, dispatch } = useRoutes();
  const { routes } = state;
  const deleteRoute = (id: string) => dispatch({ type: 'DELETE_ROUTE', payload: id });
  const toggleRouteStatus = (id: string) => dispatch({ type: 'TOGGLE_ACTIVE', payload: id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      deleteRoute(id);
      toast.success('Route deleted successfully');
    }
  };

  const openAddModal = () => {
    setEditingRoute(null);
    setIsModalOpen(true);
  };

  const openEditModal = (route: any) => {
    setEditingRoute(route);
    setIsModalOpen(true);
  };

  const handleToggle = (id: string) => {
    toggleRouteStatus(id);
    toast.success('Route status updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Route
        </button>
      </div>

      {routes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
          <p className="text-gray-500 mb-4">You haven't added any routes yet.</p>
          <button 
            onClick={openAddModal}
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Create your first route
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route: any) => (
            <div 
              key={route.id} 
              className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${route.active ? 'border-l-blue-500' : 'border-l-gray-300'}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{route.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${route.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {route.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mb-6 relative pl-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200 border-l border-dashed border-gray-300"></div>
                  {route.stops.map((stop: string, idx: number) => (
                    <div key={idx} className="relative mb-3 last:mb-0">
                      <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                      <span className="text-sm text-gray-700">{stop}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{route.estimatedTime} mins</span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>{route.distance} km</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                  <button 
                    onClick={() => handleToggle(route.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Toggle Status"
                  >
                    {route.active ? <ToggleRight className="w-5 h-5 text-blue-500" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => openEditModal(route)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(route.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingRoute ? 'Edit Route' : 'Add New Route'}>
          <div className="p-4">
            <p className="text-gray-500 text-sm">Form implementation here...</p>
            {/* Modal form would go here */}
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  toast.success(editingRoute ? 'Route updated' : 'Route added');
                  setIsModalOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Routes;
