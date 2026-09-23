import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type UserRole = 'admin' | 'student';

export interface UserProfile {
  name: string;
  id: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
}

export const ADMIN_USER: UserProfile = {
  name: 'Admin Portal',
  id: 'ADM001',
  role: 'Transport Lead',
  email: 'ops.lead@campus.edu',
  avatar: 'U',
  department: 'Fleet Dispatch'
};

export const STUDENT_USER: UserProfile = {
  name: 'Alex Rivera',
  id: 'EMP2042',
  role: 'Student Commuter',
  email: 'a.rivera@campus.edu',
  avatar: 'A',
  department: 'Computer Science'
};

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  currentUser: UserProfile;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  const [role, setRole] = useState<UserRole>(() => {
    return location.pathname === '/student' ? 'student' : 'admin';
  });

  const toggleRole = () => {
    setRole((prev) => (prev === 'admin' ? 'student' : 'admin'));
  };

  const currentUser = role === 'admin' ? ADMIN_USER : STUDENT_USER;

  return (
    <UserContext.Provider value={{ role, setRole, toggleRole, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
