import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import ServiceProviders from '../pages/ServiceProviders.jsx';
import ServiceProviderDetails from '../pages/ServiceProviderDetails.jsx';
import Clients from '../pages/Clients.jsx';
import ClientDetails from '../pages/ClientDetails.jsx';
import Transactions from '../pages/Transactions.jsx';
import Reports from '../pages/Reports.jsx';
import Settings from '../pages/Settings.jsx';
import AdminProfile from '../pages/AdminProfile.jsx';
import PendingRequests from '../pages/PendingRequests.jsx';
import Proposals from '../pages/Proposals.jsx';
import AdminInProgressOrders from '../pages/AdminInProgressOrders.jsx';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="service-providers" element={<ServiceProviders />} />
      <Route path="service-providers/:id" element={<ServiceProviderDetails />} />
      <Route path="firms" element={<ServiceProviders />} /> {/* Legacy route */}
      <Route path="clients" element={<Clients />} />
      <Route path="clients/:id" element={<ClientDetails />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="requests/pending" element={<PendingRequests />} />
      <Route path="proposals" element={<Proposals />} />
      <Route path="orders/in-progress" element={<AdminInProgressOrders />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
