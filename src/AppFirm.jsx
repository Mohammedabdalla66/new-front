import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import MyRequestsPage from "./pages/dashboard/MyRequestsPage";
import MessagesPage from "./pages/dashboard/MessagesPage";
import WalletPage from "./pages/dashboard/WalletPage";
import PortfolioPage from "./pages/dashboard/PortfolioPage";
import BrowseProjectsPage from "./pages/dashboard/BrowseProjectsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import HelpSupportPage from "./pages/dashboard/HelpSupportPage";

function AppFirm() {
  return (
      <Router>
          <Routes>
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="requests" element={<MyRequestsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="browse" element={<BrowseProjectsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="help" element={<HelpSupportPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/firm" replace />} />
          </Routes>
      </Router>

  );
}

export default AppFirm;