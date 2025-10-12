import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Create a simple placeholder page if none exists yet
function FirmDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Firm Dashboard</h1>
      <p>Welcome to the Firm area. Build your firm pages here.</p>
    </div>
  );
}

export default function FirmRoutes() {
  return (
    <Routes>
      <Route index element={<FirmDashboard />} />
      {/* Add more firm routes here */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

