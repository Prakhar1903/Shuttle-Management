import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface AdminOnlyRouteProps {
  children: React.ReactNode;
}

/**
 * Access Control Guard: Restricts admin management, analytics, and dispatch
 * operations exclusively to the Admin role. Automatically redirects students
 * to the Student Portal.
 */
export const AdminOnlyRoute: React.FC<AdminOnlyRouteProps> = ({ children }) => {
  const { role } = useUser();

  if (role !== 'admin') {
    return <Navigate to="/student" replace />;
  }

  return <>{children}</>;
};

export default AdminOnlyRoute;
