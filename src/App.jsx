import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/auth/login" replace />
        } 
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;