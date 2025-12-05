import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function RoleProtectedRoute({ children, roles = [] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (roles.length && !roles.includes((user?.role || '').toLowerCase())) {
    return <Navigate to="/" replace />;
  }
  return children;
}
