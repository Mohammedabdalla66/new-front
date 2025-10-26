import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ClientDashboard from '../pages/ClientDashboard.jsx';
import ClientSidebar from '../components/sidebar/ClientSidebar.jsx';
import { useAuth } from '../hooks/useAuth';

// Import existing pages with static data
import { Requests } from '../pages/Requests.jsx';
import { RequestNew } from '../pages/RequestNew.jsx';
import { RequestDetails } from '../pages/RequestDetails.jsx';
import { Messages } from '../pages/Messages.jsx';
import { Wallet } from '../pages/Wallet.jsx';
import { Documents } from '../pages/Documents.jsx';
import { Settings } from '../pages/Settings.jsx';
import { Help } from '../pages/Help.jsx';
import ClientProfile from '../pages/ClientProfile.jsx';

export default function ClientRoutes() {
  const [unreadMessagesCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Set active tab based on current location
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/client' || path === '/client/') return 'dashboard';
    if (path.includes('/requests')) return 'requests';
    if (path.includes('/messages')) return 'messages';
    if (path.includes('/wallet')) return 'wallet';
    if (path.includes('/documents')) return 'documents';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/help')) return 'help';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const onTabChange = (tab) => {
    // Handle special actions
    if (tab === 'logout') {
      logout();
      navigate('/auth/login');
      return;
    }
    
    // Navigate to different routes
    switch (tab) {
      case 'dashboard':
        navigate('/client');
        break;
      case 'requests':
        navigate('/client/requests');
        break;
      case 'new request':
        navigate('/client/request/new');
        break;
      case 'messages':
        navigate('/client/messages');
        break;
      case 'wallet':
        navigate('/client/wallet');
        break;
      case 'documents':
        navigate('/client/documents');
        break;
      case 'settings':
        navigate('/client/settings');
        break;
      case 'profile':
        navigate('/client/profile');
        break;
      case 'help':
        navigate('/client/help');
        break;
      default:
        navigate('/client');
    }
  };

  return (
    <div className="min-h-screen flex">
      <ClientSidebar 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        unreadMessagesCount={unreadMessagesCount} 
      />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route index element={<ClientDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="request/new" element={<RequestNew />} />
          <Route path="request/:id" element={<RequestDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </div>
    </div>
  );
}
