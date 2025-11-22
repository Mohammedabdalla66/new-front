import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Public pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import FaqPage from './pages/FaqPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Role route trees (ensure these files exist)
import AdminRoutes from './routes/AdminRoutes';
import ClientRoutes from './routes/ClientRoutes';
import FirmRoutes from './routes/FirmRoutes';

//profile
import { ProfileForm } from './components/Profile/ProfileForm';


const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const DashboardRedirect = () => {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'client') return <Navigate to="/client" replace />;
  if (user.role === 'serviceProvider' || user.role === 'firm') return <Navigate to="/firm" replace />;
  return <Navigate to="/auth/login" replace />;
};

const RoleRoute = ({ requiredRole, children }) => {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  
  // Support both single role string and array of roles
  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/FAQ" element={<FaqPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path='/ProfileForm' element={<ProfileForm />} />

      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path='/auth/register' element={<RegisterPage/>} />

      {/* Generic dashboard entry → role-based redirect */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Admin role area */}
      <Route
        path="/admin/*"
        element={
          <RoleRoute requiredRole="admin">
            <AdminRoutes />
          </RoleRoute>
        }
      />

      {/* Client role area */}
      <Route
        path="/client/*"
        element={
          <RoleRoute requiredRole="client">
            <ClientRoutes />
          </RoleRoute>
        }
      />
      {/* Service Provider / Firm role area */}
      <Route
        path="/firm/*"
        element={
          <RoleRoute requiredRole={['serviceProvider', 'firm']}>
            <FirmRoutes />
          </RoleRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

      );
}

export default App;
