import React from 'react';
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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const activeTab = path.startsWith('/requests') || path.startsWith('/request') ? 'requests' :
    path.startsWith('/profile') ? 'profile' :
    path.startsWith('/settings') ? 'settings' : 'dashboard';

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
      case 'payments':
      case 'documents':
      case 'help':
      case 'logout':
      default:
        navigate('/');
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={onTabChange}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/request/new" element={<RequestNew />} />
        <Route path="/request/:id" element={<RequestDetails />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;


