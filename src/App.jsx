import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout.jsx';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('darkMode') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    const handler = (e) => {
      const enabled = e.detail?.enabled;
      if (typeof enabled === 'boolean') setDarkMode(enabled);
    };
    window.addEventListener('toggle-dark-mode', handler);
    return () => window.removeEventListener('toggle-dark-mode', handler);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const activeTab =
    path.startsWith('/requests') || path.startsWith('/request') ? 'requests' :
    path.startsWith('/messages') ? 'messages' :
    path.startsWith('/wallet') ? 'wallet' :
    path.startsWith('/documents') ? 'documents' :
    path.startsWith('/help') ? 'help' :
    path.startsWith('/profile') ? 'profile' :
    path.startsWith('/settings') ? 'settings' :
    'dashboard';

  const onTabChange = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'requests':
        navigate('/requests');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'messages':
        navigate('/messages');
        break;
      case 'wallet':
        navigate('/wallet');
        break;
      case 'documents':
        navigate('/documents');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'logout':
      default:
        navigate('/');
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={onTabChange} darkMode={darkMode}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/request/new" element={<RequestNew />} />
        <Route path="/request/:id" element={<RequestDetails />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;


