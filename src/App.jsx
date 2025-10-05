
import React from 'react';  
import AuthLayout from './components/layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AccountantsPage from "./pages/AccountantsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const { isAuthenticated, role } = useAuth();

  return (
    <LanguageProvider>
      
        <Routes>

        <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/accountants" element={<AccountantsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
              isAuthenticated ?( <DashboardPage role={role} /> ): (<Navigate to="/auth/login" replace />)
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      
    </LanguageProvider>
  );
}

export default App;
