import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Driver, ScheduleEvent } from '../types';
import { mockDrivers } from '../data/mockData';

interface DriverState {
  drivers: Driver[];
  filteredDrivers: Driver[];
  searchTerm: string;
  selectedDate: string;
  selectedDriver: Driver | null;
}

type Action =
  | { type: 'SET_DRIVERS'; payload: Driver[] }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SELECT_DRIVER'; payload: Driver | null }
  | { type: 'START_DUTY'; payload: { driverId: string; time: string } }
  | { type: 'END_DUTY'; payload: { driverId: string; time: string } }
  | { type: 'ADD_BREAK'; payload: { driverId: string; startTime: string; endTime: string } }
  | { type: 'UPDATE_SCHEDULE'; payload: { driverId: string; schedule: ScheduleEvent[] } };

const initialState: DriverState = {
  drivers: mockDrivers,
  filteredDrivers: mockDrivers,
  searchTerm: '',
  selectedDate: new Date().toISOString().split('T')[0],
  selectedDriver: null,
};

function driverReducer(state: DriverState, action: Action): DriverState {
  switch (action.type) {
    case 'SET_SEARCH': {
      const term = action.payload.toLowerCase();
      const filtered = state.drivers.filter(d => d.name.toLowerCase().includes(term));
      return { ...state, searchTerm: action.payload, filteredDrivers: filtered };
    }
    case 'SET_DRIVERS':
      return { ...state, drivers: action.payload, filteredDrivers: action.payload };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SELECT_DRIVER':
      return { ...state, selectedDriver: action.payload };
    case 'START_DUTY': {
      const updateDriver = (d: Driver): Driver => {
        if (d.id === action.payload.driverId) {
          const [h, m] = action.payload.time.split(':').map(Number);
          const endMins = (h * 60 + m) + 30; // 30 min initial duty segment
          const endH = Math.min(22, Math.floor(endMins / 60));
          const endM = endMins % 60;
          const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

          const newEvent: ScheduleEvent = {
            id: `event-duty-start-${Date.now()}`,
            type: 'duty-start',
            startTime: action.payload.time,
            endTime: endTime,
            label: 'Duty Start'
          };
          
          // Filter out duplicate duty-starts at same time and sort chronologically
          const updatedSchedule = [...d.schedule, newEvent].sort((a, b) => {
            const [aH, aM] = a.startTime.split(':').map(Number);
            const [bH, bM] = b.startTime.split(':').map(Number);
            return (aH * 60 + aM) - (bH * 60 + bM);
          });

          return { 
            ...d, 
            status: 'Online', 
            schedule: updatedSchedule 
          };
        }
        return d;
      };
      return {
        ...state,
        drivers: state.drivers.map(updateDriver),
        filteredDrivers: state.filteredDrivers.map(updateDriver)
      };
    }
    case 'END_DUTY': {
      const updateDriver = (d: Driver): Driver => {
        if (d.id === action.payload.driverId) {
          const [h, m] = action.payload.time.split(':').map(Number);
          const endMins = (h * 60 + m) + 30;
          const endH = Math.min(22, Math.floor(endMins / 60));
          const endM = endMins % 60;
          const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

          const newEvent: ScheduleEvent = {
            id: `event-duty-end-${Date.now()}`,
            type: 'duty-end',
            startTime: action.payload.time,
            endTime: endTime,
            label: 'Duty End'
          };

          const updatedSchedule = [...d.schedule, newEvent].sort((a, b) => {
            const [aH, aM] = a.startTime.split(':').map(Number);
            const [bH, bM] = b.startTime.split(':').map(Number);
            return (aH * 60 + aM) - (bH * 60 + bM);
          });

          return { 
            ...d, 
            status: 'Offline', 
            schedule: updatedSchedule 
          };
        }
        return d;
      };
      return {
        ...state,
        drivers: state.drivers.map(updateDriver),
        filteredDrivers: state.filteredDrivers.map(updateDriver)
      };
    }
    case 'ADD_BREAK': {
      const updateDriver = (d: Driver): Driver => {
        if (d.id === action.payload.driverId) {
          const newEvent: ScheduleEvent = {
            id: `event-break-${Date.now()}`,
            type: 'break',
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
            label: 'Break'
          };

          const updatedSchedule = [...d.schedule, newEvent].sort((a, b) => {
            const [aH, aM] = a.startTime.split(':').map(Number);
            const [bH, bM] = b.startTime.split(':').map(Number);
            return (aH * 60 + aM) - (bH * 60 + bM);
          });

          return { 
            ...d, 
            schedule: updatedSchedule 
          };
        }
        return d;
      };
      return {
        ...state,
        drivers: state.drivers.map(updateDriver),
        filteredDrivers: state.filteredDrivers.map(updateDriver)
      };
    }
    case 'UPDATE_SCHEDULE': {
      const updateDriver = (d: Driver) => {
        if (d.id === action.payload.driverId) {
          return { ...d, schedule: action.payload.schedule };
        }
        return d;
      };
      return {
        ...state,
        drivers: state.drivers.map(updateDriver),
        filteredDrivers: state.filteredDrivers.map(updateDriver)
      };
    }
    default:
      return state;
  }
}

const DriverContext = createContext<{ state: DriverState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

/**
 * DriverProvider wraps the application and provides driver state.
 */
export const DriverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(driverReducer, initialState);
  return <DriverContext.Provider value={{ state, dispatch }}>{children}</DriverContext.Provider>;
};

/**
 * Custom hook to use the driver context.
 */
export const useDrivers = () => {
  const context = useContext(DriverContext);
  if (!context) throw new Error('useDrivers must be used within a DriverProvider');
  return context;
};
