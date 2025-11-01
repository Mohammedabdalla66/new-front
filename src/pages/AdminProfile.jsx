import React, { useState } from "react";
import Navbar from "../components/Layout/Navbar";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import { ProfileForm } from "../components/Profile/ProfileForm.jsx";

const mockAdmin = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@accounthub.com",
  phone: "+1 (555) 000-0000",
  company: "AccountHub Inc.",
  avatar:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
  location: "San Francisco, CA",
  joinedDate: "2022-01-01",
  verified: true,
};

export default function AdminProfile() {
  const [user, setUser] = useState(mockAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    console.log("Saving admin (static):", updatedUser);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
          role="presentation"
        />
      )}
      <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your administrator information and preferences.
            </p>
          </div>

          <ProfileForm user={user} onSave={handleSave} />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                12
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Firms Managed
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                1,240
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Clients Across Firms
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                System Health
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
