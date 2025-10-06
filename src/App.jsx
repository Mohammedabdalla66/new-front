import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// Auth Pages
import AuthLayout from './components/layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Public Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AccountantsPage from "./pages/AccountantsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

// Dashboard Layout & Pages
import { Layout } from './components/Layout/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Requests } from './pages/Requests.jsx';
import { RequestNew } from './pages/RequestNew.jsx';
import { RequestDetails } from './pages/RequestDetails.jsx';
import { Reviews } from './pages/Reviews.jsx';
import { Confirmation } from './pages/Confirmation.jsx';
import { Profile } from './pages/Profile.jsx';
import { Settings } from './pages/Settings.jsx';
import { Messages } from './pages/Messages.jsx';
import { Wallet } from './pages/Wallet.jsx';
import { Documents } from './pages/Documents.jsx';
import { Help } from './pages/Help.jsx';

import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, role , loading } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  const navigate = useNavigate();
  const location = useLocation();



  // 🔹 Toggle dark mode event listener
  useEffect(() => {
    const handler = (e) => {
      const enabled = e.detail?.enabled;
      if (typeof enabled === 'boolean') setDarkMode(enabled);
    };
    window.addEventListener('toggle-dark-mode', handler);
    return () => window.removeEventListener('toggle-dark-mode', handler);
  }, []);

  // 🔹 Determine active tab
  const path = location.pathname;
  const activeTab =
    path.startsWith('/dashboard/requests') ? 'requests' :
    path.startsWith('/dashboard/messages') ? 'messages' :
    path.startsWith('/dashboard/wallet') ? 'wallet' :
    path.startsWith('/dashboard/documents') ? 'documents' :
    path.startsWith('/dashboard/help') ? 'help' :
    path.startsWith('/dashboard/profile') ? 'profile' :
    path.startsWith('/dashboard/settings') ? 'settings' :
    'dashboard';

  const onTabChange = (tab) => {
    navigate(`/dashboard/${tab === 'dashboard' ? '' : tab}`);
  };

  return (
    <LanguageProvider>
      {loading ? 
      (
        <div className='flex items-center justify-center h-screen '>Loading ....</div>
      ) :(
      <Routes>
        {/* Public Routes */}
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

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Layout
                activeTab={activeTab}
                onTabChange={onTabChange}
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="request/new" element={<RequestNew />} />
          <Route path="request/:id" element={<RequestDetails />} />
          <Route path="reviews/:id" element={<Reviews />} />
          <Route path="confirmation/:id" element={<Confirmation />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="documents" element={<Documents />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      )}
    </LanguageProvider>
  );
}

export default App;
