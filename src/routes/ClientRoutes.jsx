import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ClientDashboard from "../pages/ClientDashboard.jsx";
import ClientSidebar from "../components/sidebar/ClientSidebar.jsx";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Layout/Header.jsx";

// Import existing pages with static data
import { Requests } from "../pages/Requests.jsx";
import { RequestNew } from "../pages/RequestNew.jsx";
import { RequestDetails } from "../pages/RequestDetails.jsx";
import { Messages } from "../pages/Messages.jsx";
import { Wallet } from "../pages/Wallet.jsx";
import { Documents } from "../pages/Documents.jsx";
import { Settings } from "../pages/Settings.jsx";
import { Help } from "../pages/Help.jsx";
import ClientProfile from "../pages/ClientProfile.jsx";

export default function ClientRoutes() {
  const [unreadMessagesCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fallbackUser = {
    name: "John Davidson",
    email: "john.davidson@company.com",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
  };

  const headerUser = {
    name: user?.name || fallbackUser.name,
    email: user?.email || fallbackUser.email,
    avatar: user?.avatar || fallbackUser.avatar,
  };

  // Set active tab based on current location
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/client" || path === "/client/") return "dashboard";
    if (path.includes("/requests")) return "requests";
    if (path.includes("/messages")) return "messages";
    if (path.includes("/wallet")) return "wallet";
    if (path.includes("/documents")) return "documents";
    if (path.includes("/settings")) return "settings";
    if (path.includes("/profile")) return "profile";
    if (path.includes("/help")) return "help";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const onTabChange = (tab) => {
    // Handle special actions
    if (tab === "logout") {
      logout();
      navigate("/auth/login");
      return;
    }

    // Navigate to different routes
    switch (tab) {
      case "dashboard":
        navigate("/client");
        break;
      case "requests":
        navigate("/client/requests");
        break;
      case "new request":
        navigate("/client/request/new");
        break;
      case "messages":
        navigate("/client/messages");
        break;
      case "wallet":
        navigate("/client/wallet");
        break;
      case "documents":
        navigate("/client/documents");
        break;
      case "settings":
        navigate("/client/settings");
        break;
      case "profile":
        navigate("/client/profile");
        break;
      case "help":
        navigate("/client/help");
        break;
      default:
        navigate("/client");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
          role="presentation"
        />
      )}
      <ClientSidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        unreadMessagesCount={unreadMessagesCount}
        isMobileOpen={isSidebarOpen}
        onMobileClose={closeSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={headerUser} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
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
        </main>
      </div>
    </div>
  );
}
