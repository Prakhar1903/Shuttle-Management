import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Booking, SortConfig, PaginationState } from '../types';
import { mockBookings } from '../data/mockData';

interface BookingState {
  bookings: Booking[];
  filteredBookings: Booking[];
  searchTerm: string;
  selectedDate: string;
  sortConfig: SortConfig;
  pagination: PaginationState;
  selectedBooking: Booking | null;
  isDetailPanelOpen: boolean;
  isFormOpen: boolean;
  editingBooking: Booking | null;
}

type Action =
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: Booking }
  | { type: 'CANCEL_BOOKING'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_SORT'; payload: SortConfig }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SELECT_BOOKING'; payload: Booking | null }
  | { type: 'CLOSE_DETAIL' }
  | { type: 'OPEN_FORM'; payload?: Booking }
  | { type: 'CLOSE_FORM' };

const initialState: BookingState = {
  bookings: mockBookings,
  filteredBookings: mockBookings,
  searchTerm: '',
  selectedDate: new Date().toISOString().split('T')[0],
  sortConfig: { key: 'date', direction: 'desc' },
  pagination: { 
    currentPage: 1, 
    pageSize: 10, 
    totalItems: mockBookings.length
  },
  selectedBooking: null,
  isDetailPanelOpen: false,
  isFormOpen: false,
  editingBooking: null,
};

function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_SEARCH': {
      const term = action.payload.toLowerCase();
      const filtered = state.bookings.filter((b) => 
        b.employeeName.toLowerCase().includes(term) ||
        b.id.toLowerCase().includes(term) ||
        b.employeeId.toLowerCase().includes(term)
      );
      return { 
        ...state, 
        searchTerm: action.payload, 
        filteredBookings: filtered,
        pagination: { 
          ...state.pagination, 
          currentPage: 1, 
          totalItems: filtered.length
        } 
      };
    }
    case 'SET_SORT': {
      const { key, direction } = action.payload;
      const sorted = [...state.filteredBookings].sort((a, b) => {
        const valA = (a as any)[key];
        const valB = (b as any)[key];
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      return { ...state, sortConfig: action.payload, filteredBookings: sorted };
    }
    case 'SET_PAGE':
      return { 
        ...state, 
        pagination: { ...state.pagination, currentPage: action.payload } 
      };
    case 'SELECT_BOOKING':
      return { 
        ...state, 
        selectedBooking: action.payload, 
        isDetailPanelOpen: !!action.payload 
      };
    case 'ADD_BOOKING': {
      const newBookings = [...state.bookings, action.payload];
      const term = state.searchTerm.toLowerCase();
      const newFiltered = newBookings.filter((b) => 
        b.employeeName.toLowerCase().includes(term) ||
        b.id.toLowerCase().includes(term) ||
        b.employeeId.toLowerCase().includes(term)
      );
      return { ...state, bookings: newBookings, filteredBookings: newFiltered };
    }
    case 'UPDATE_BOOKING': {
      const newBookings = state.bookings.map(b => b.id === action.payload.id ? action.payload : b);
      const newFiltered = state.filteredBookings.map(b => b.id === action.payload.id ? action.payload : b);
      const updatedSelected = state.selectedBooking?.id === action.payload.id ? action.payload : state.selectedBooking;
      return { 
        ...state, 
        bookings: newBookings, 
        filteredBookings: newFiltered,
        selectedBooking: updatedSelected 
      };
    }
    case 'CANCEL_BOOKING': {
      const updateFn = (b: Booking) => b.id === action.payload ? { ...b, status: 'Cancelled' as any } : b;
      const updatedSelected = state.selectedBooking?.id === action.payload 
        ? { ...state.selectedBooking, status: 'Cancelled' as any } 
        : state.selectedBooking;
      return { 
        ...state, 
        bookings: state.bookings.map(updateFn), 
        filteredBookings: state.filteredBookings.map(updateFn),
        selectedBooking: updatedSelected
      };
    }
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload, filteredBookings: action.payload };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'CLOSE_DETAIL':
      return { ...state, isDetailPanelOpen: false, selectedBooking: null };
    case 'OPEN_FORM':
      return { ...state, isFormOpen: true, editingBooking: action.payload || null };
    case 'CLOSE_FORM':
      return { ...state, isFormOpen: false, editingBooking: null };
    default:
      return state;
  }
}

const BookingContext = createContext<{ state: BookingState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

/**
 * BookingProvider wraps the application and provides booking state.
 */
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>;
};

/**
 * Custom hook to use the booking context.
 */
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within a BookingProvider');
  return context;
};
