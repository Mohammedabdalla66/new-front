import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyRequestsPage from "../pages/dashboard/MyRequestsPage";
import MessagesPage from "../pages/dashboard/MessagesPage";
import WalletPage from "../pages/dashboard/WalletPage";
import PortfolioPage from "../pages/dashboard/PortfolioPage";
import BrowseProjectsPage from "../pages/dashboard/BrowseProjectsPage";
import RequestDetailsPage from "../pages/dashboard/RequestDetailsPage";
import ProposalDetailsPage from "../pages/dashboard/ProposalDetailsPage";
import SettingsPage from "../pages/dashboard/SettingsPage";
import HelpSupportPage from "../pages/dashboard/HelpSupportPage";

export default function FirmRoutes() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="requests" element={<MyRequestsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="browse" element={<BrowseProjectsPage />} />
        <Route path="browse/:id" element={<RequestDetailsPage />} />
        <Route path="proposals/:id" element={<ProposalDetailsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpSupportPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/firm" replace />} />
    </Routes>
  );
}


