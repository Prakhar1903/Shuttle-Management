import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Route } from '../types';
import { mockRoutes } from '../data/mockData';

interface RouteState {
  routes: Route[];
  selectedRoute: Route | null;
  isFormOpen: boolean;
}

type Action =
  | { type: 'SET_ROUTES'; payload: Route[] }
  | { type: 'ADD_ROUTE'; payload: Route }
  | { type: 'UPDATE_ROUTE'; payload: Route }
  | { type: 'DELETE_ROUTE'; payload: string }
  | { type: 'SELECT_ROUTE'; payload: Route | null }
  | { type: 'TOGGLE_ACTIVE'; payload: string }
  | { type: 'OPEN_FORM'; payload?: Route }
  | { type: 'CLOSE_FORM' };

const initialState: RouteState = {
  routes: mockRoutes,
  selectedRoute: null,
  isFormOpen: false,
};

function routeReducer(state: RouteState, action: Action): RouteState {
  switch (action.type) {
    case 'SET_ROUTES':
      return { ...state, routes: action.payload };
    case 'ADD_ROUTE':
      return { ...state, routes: [...state.routes, action.payload] };
    case 'UPDATE_ROUTE':
      return { ...state, routes: state.routes.map(r => r.id === action.payload.id ? action.payload : r) };
    case 'DELETE_ROUTE':
      return { ...state, routes: state.routes.filter(r => r.id !== action.payload) };
    case 'SELECT_ROUTE':
      return { ...state, selectedRoute: action.payload };
    case 'TOGGLE_ACTIVE':
      return { 
        ...state, 
        routes: state.routes.map(r => r.id === action.payload ? { ...r, active: !r.active } : r) 
      };
    case 'OPEN_FORM':
      return { ...state, isFormOpen: true, selectedRoute: action.payload || null };
    case 'CLOSE_FORM':
      return { ...state, isFormOpen: false, selectedRoute: null };
    default:
      return state;
  }
}

const RouteContext = createContext<{ state: RouteState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

/**
 * RouteProvider wraps the application and provides route state.
 */
export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);
  return <RouteContext.Provider value={{ state, dispatch }}>{children}</RouteContext.Provider>;
};

/**
 * Custom hook to use the route context.
 */
export const useRoutes = () => {
  const context = useContext(RouteContext);
  if (!context) throw new Error('useRoutes must be used within a RouteProvider');
  return context;
};
