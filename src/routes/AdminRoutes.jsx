import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import Firms from '../pages/Firms.jsx';
import Clients from '../pages/Clients.jsx';
import Transactions from '../pages/Transactions.jsx';
import Reports from '../pages/Reports.jsx';
import Settings from '../pages/Settings.jsx';
import AdminProfile from '../pages/AdminProfile.jsx';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="firms" element={<Firms />} />
      <Route path="clients" element={<Clients />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
