import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AccountantsPage from "./pages/AccountantsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import MyRequestsPage from "./pages/dashboard/MyRequestsPage";
import MessagesPage from "./pages/dashboard/MessagesPage";
import WalletPage from "./pages/dashboard/WalletPage";
import PortfolioPage from "./pages/dashboard/PortfolioPage";
import BrowseProjectsPage from "./pages/dashboard/BrowseProjectsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import HelpSupportPage from "./pages/dashboard/HelpSupportPage";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/accountants" element={<AccountantsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

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
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
