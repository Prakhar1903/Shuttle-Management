# 🚐 MoveInSync — Shuttle Management System

A **Smart Campus Transit Solution** built with React, TypeScript, and Tailwind CSS. This system provides efficient, cost-effective, and seamless transportation management for university campus shuttle services.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Architecture](#-project-architecture)
- [Module Documentation](#-module-documentation)
- [Complexity Analysis](#-complexity-analysis)
- [Scalability Considerations](#-scalability-considerations)
- [Screenshots](#-screenshots)

---

## ✨ Features

### I. Shuttle Booking Management
- **Add, View, and Edit Bookings** — Full CRUD operations for shuttle ride bookings
- **Trip History Tracking** — View past trips with date, time, route, and driver details
- **Status Color-Coding** — 9 distinct booking statuses (Accepted, Waiting, No Show, Declined, Completed, Requested, On Going, Cancelled, Dropped)
- **Advanced Search & Filter** — Search by employee name, ID, or booking ID with debounced input
- **Sortable Table** — Click any column header to sort ascending/descending
- **Paginated Results** — "Showing 1-10 of 50 Items" with page navigation

### II. Driver Availability Management
- **Visual Timeline** — Horizontal Gantt-chart-style display (6:00–22:00) showing driver schedules
- **Color-Coded Segments** — Duty periods (yellow), breaks (purple), vehicle changes (green), empty legs (gray)
- **Hover Tooltips** — Pickup/drop counts displayed on segment hover
- **Current Time Indicator** — Blue vertical line at the current time
- **Action Menu** — Start Duty, End Duty, and Add Break controls per driver
- **Real-time Updates** — Schedule changes reflect immediately in the timeline

### III. Admin Functionalities
- **Route Management** — Define, update, and toggle campus shuttle routes
- **Dashboard Analytics** — Total bookings, active drivers, completed trips, peak hours
- **Hourly Demand Chart** — Visual bar chart showing booking demand patterns
- **Route Utilization Overview** — Monitor route usage and optimize schedules

### IV. Booking Detail Panel
- **Slide-out Panel** — Click "View" to see full booking details
- **Employee Info** — Name, ID, status, sign-in time
- **Vehicle Details** — ID, plate, type, color, capacity
- **Route Info** — Pickup/drop locations with requested and planned times
- **Driver Info** — Name, phone, rating
- **Quick Actions** — Sign in rider, Mark as No-show, Cancel Booking, Edit

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 | UI component library |
| **Language** | TypeScript 5 | Type-safe development |
| **Build Tool** | Vite 8 | Fast development & optimized builds |
| **Routing** | React Router v6 | Client-side navigation |
| **State Management** | React Context + useReducer | Domain-specific state (bookings, drivers, routes) |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **Icons** | Lucide React | Lightweight icon library |
| **Date Handling** | date-fns | Date formatting utilities |
| **Notifications** | React Hot Toast | Success/error toast messages |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shuttle-management.git
cd shuttle-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

---

## 🏗 Project Architecture

```
src/
├── types/              # TypeScript interfaces & type definitions
│   └── index.ts        # Booking, Driver, Route, Vehicle, etc.
│
├── data/               # Mock data layer
│   └── mockData.ts     # 50 bookings, 5 drivers, 6 routes, 4 vehicles
│
├── context/            # State management (React Context + useReducer)
│   ├── BookingContext   # Booking CRUD, search, sort, pagination
│   ├── DriverContext    # Driver schedules, duty management
│   └── RouteContext     # Route CRUD, toggle active/inactive
│
├── hooks/              # Custom React hooks
│   ├── useSearch.ts    # Debounced search (300ms delay)
│   ├── usePagination.ts# Generic pagination logic
│   └── useSort.ts      # Multi-column sort with direction toggle
│
├── utils/              # Utility functions
│   ├── timeUtils.ts    # Timeline position calculations
│   └── filterUtils.ts  # Search filtering, status colors
│
├── components/
│   ├── layout/         # App shell (Sidebar, Header, Layout)
│   ├── ui/             # Reusable UI primitives (8 components)
│   ├── drivers/        # Driver Management (5 components)
│   └── bookings/       # Booking Management (4 components)
│
└── pages/              # Route-level page components
    ├── Dashboard.tsx    # Analytics overview
    ├── Management.tsx   # Main page (Driver + Booking management)
    ├── Routes.tsx       # Route management
    └── TripHistory.tsx  # Past trip records
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   App (Router)                  │
│  ┌──────────────────────────────────────────┐   │
│  │          Context Providers                │   │
│  │  BookingProvider → DriverProvider →       │   │
│  │  RouteProvider                            │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │         Layout                      │  │   │
│  │  │  ┌─────────┐ ┌──────────────────┐  │  │   │
│  │  │  │ Sidebar  │ │ Header + Content │  │  │   │
│  │  │  │ (nav)    │ │   (Outlet)       │  │  │   │
│  │  │  └─────────┘ └──────────────────┘  │  │   │
│  │  └────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 📚 Module Documentation

### Context Layer (State Management)

Each domain has its own Context with a reducer pattern:

**BookingContext** — Actions: `SET_SEARCH`, `SET_SORT`, `SET_PAGE`, `SELECT_BOOKING`, `ADD_BOOKING`, `UPDATE_BOOKING`, `CANCEL_BOOKING`, `OPEN_FORM`, `CLOSE_FORM`, `CLOSE_DETAIL`

**DriverContext** — Actions: `SET_SEARCH`, `START_DUTY`, `END_DUTY`, `ADD_BREAK`, `UPDATE_SCHEDULE`

**RouteContext** — Actions: `ADD_ROUTE`, `UPDATE_ROUTE`, `DELETE_ROUTE`, `TOGGLE_ACTIVE`

### Custom Hooks

| Hook | Purpose | Time Complexity |
|---|---|---|
| `useSearch(delay)` | Debounced search with 300ms default delay | O(1) per keystroke |
| `usePagination(items, pageSize)` | Generic pagination with computed derived values | O(k) where k = pageSize |
| `useSort(items, defaultKey)` | Multi-column sorting with direction toggle | O(n log n) per sort |

### Utility Functions

| Function | Purpose | Complexity |
|---|---|---|
| `getTimelinePosition(time)` | Converts HH:mm to percentage (6:00=0%, 22:00=100%) | O(1) |
| `getTimelineWidth(start, end)` | Calculates segment width as percentage | O(1) |
| `filterBookings(bookings, term)` | Multi-field search (name, ID, empID) | O(n) |
| `getStatusColor(status)` | Maps booking status to Tailwind color classes | O(1) |

### Reusable UI Components

| Component | Props | Description |
|---|---|---|
| `SearchBar` | value, onChange, placeholder | Debounced search with icon |
| `DatePicker` | value, onChange | Styled native date input |
| `Modal` | isOpen, onClose, title, children, size | Dialog with overlay + escape key |
| `Pagination` | currentPage, totalPages, totalItems, pageSize, onPageChange | Page navigation with item count |
| `StatusBadge` | status | Color-coded status pill |
| `SortableHeader` | label, sortKey, currentSort, onSort | Table header with sort arrows |
| `ConfirmDialog` | isOpen, title, message, onConfirm, onCancel | Destructive action confirmation |
| `EmptyState` | icon, title, description, action | No-data placeholder |

---

## 📊 Complexity Analysis

### Time Complexity

| Operation | Complexity | Details |
|---|---|---|
| Search/Filter bookings | **O(n)** | Linear scan with string matching |
| Sort table column | **O(n log n)** | JavaScript Timsort algorithm |
| Paginate results | **O(k)** | Array slice, k = page size |
| Timeline rendering | **O(d × e)** | d = drivers, e = events per driver |
| Add/Update booking | **O(n)** | Array map/concat operations |
| Driver schedule update | **O(e)** | Insert into events array |

### Space Complexity

| Data Structure | Space | Details |
|---|---|---|
| Bookings store | **O(n)** | n = total bookings |
| Filtered results | **O(n)** | Worst case = all bookings match |
| Driver schedules | **O(d × e)** | Per-driver event arrays |
| Sort buffer | **O(n)** | Shallow copy for immutable sort |
| Pagination | **O(1)** | Only stores page index + size |

### Performance Optimizations

1. **Debounced Search** — 300ms delay prevents excessive re-renders during typing
2. **Memoized Sorting** — `useMemo` ensures sorts only recalculate when data/config changes
3. **Pagination Slicing** — Only renders k items per page, not the full dataset
4. **Context Splitting** — Three separate contexts prevent unnecessary re-renders across domains
5. **Immutable Updates** — Reducer pattern ensures predictable state transitions

---

## 📈 Scalability Considerations

### Current Design (Mock Data)
- 50 bookings, 5 drivers, 6 routes — all in-memory
- Instant filtering, sorting, pagination on client

### Production-Ready Scaling

| Concern | Strategy |
|---|---|
| **1000+ bookings** | Server-side pagination with API `?page=1&limit=10` |
| **Real-time updates** | WebSocket for live booking status & driver location |
| **Large driver pool** | Virtual scrolling for driver list (react-virtualized) |
| **Authentication** | JWT-based auth with role-based access (Admin/Student/Driver) |
| **API Layer** | REST or GraphQL backend with caching (React Query / SWR) |
| **State Management** | Migrate to Zustand or Redux Toolkit for complex state |
| **Database** | PostgreSQL for bookings, Redis for real-time driver positions |
| **Deployment** | Docker + Kubernetes for horizontal scaling |

---

## 🎨 Error Handling

- **Form Validation** — Required field checks, "From ≠ To" validation, time format validation
- **Toast Notifications** — Success/error messages for all CRUD operations
- **Confirm Dialogs** — Destructive actions (cancel booking, delete route) require confirmation
- **Empty States** — Informative messages when no data matches filters
- **Graceful Fallbacks** — Null values display as "-" in table cells

---

## 📸 Screenshots

The application closely matches the MoveInSync product interface:

1. **Management Page** — Split view with Driver Timeline (top) and Booking Table (bottom)
2. **Booking Detail Panel** — Right slide-out with employee, vehicle, route, and driver info
3. **Dashboard** — Stats cards, hourly demand chart, recent bookings widget
4. **Route Management** — Card grid with visual route diagrams

---

## 📄 License

This project was built as part of the MoveInSync hiring assessment.

---

## 🙏 Acknowledgments

- MoveInSync for the design reference
- React, Vite, and Tailwind CSS teams for excellent tooling
