import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Settings,
  Camera,
  Save,
  Edit3,
} from "lucide-react";
import "./ProfileForm.css";
import { DarkModeToggle } from "./DarkModeToggle";

export const ProfileForm = ({ onSave }) => {
  const [localUser, setLocalUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalUser({
        ...storedUser,
        phone: storedUser.phone || "",
        country: storedUser.country || "",
        accountType: storedUser.accountType || "individual",
        companyName: storedUser.companyName || "",
        companyAddress: storedUser.companyAddress || "",
        companyPhone: storedUser.companyPhone || "",
        companyEmail: storedUser.companyEmail || "",
        licenseNumber: storedUser.licenseNumber || "",
        taxId: storedUser.taxId || "",
      });
      setPreview(storedUser.avatar || "/assets/default-avatar.png");
    }
  }, []);

  // Loading state
  if (!localUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle field changes
  const handleChange = (field, value) => {
    setLocalUser({ ...localUser, [field]: value });
    setHasChanges(true);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setLocalUser({ ...localUser, avatar: imageUrl });
      setHasChanges(true);
    }
  };

  // Save changes
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(localUser));
    setIsEditing(false);
    setHasChanges(false);
    if (onSave) onSave(localUser);
  };

  // Tab configuration
  const tabs = [
    { id: "account", label: "Account Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    ...(localUser.role === "accountant"
      ? [{ id: "company", label: "Company Info", icon: Building2 }]
      : []),
  ];

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={preview}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                />
                {isEditing && (
                  <label
                    className="absolute -bottom-1 -right-1 p-2 rounded-full cursor-pointer profile-transition"
                    style={{ backgroundColor: "var(--profile-accent)" }}
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h3
                  className="text-base sm:text-lg font-semibold"
                  style={{ color: "var(--profile-text-primary)" }}
                >
                  {localUser.name || "User Name"}
                </h3>
                <p
                  className="text-xs sm:text-sm capitalize"
                  style={{ color: "var(--profile-text-secondary)" }}
                >
                  {localUser.accountType} Account
                </p>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      document.querySelector('input[type="file"]')?.click()
                    }
                    className="text-sm mt-1 profile-transition"
                    style={{ color: "var(--profile-accent)" }}
                  >
                    Change Photo
                  </button>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={localUser.name || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={localUser.email || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={localUser.phone || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Country
                </label>
                <input
                  type="text"
                  value={localUser.country || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Account Type
                </label>
                <select
                  value={localUser.accountType || "individual"}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("accountType", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="profile-info-box rounded-lg p-4">
              <div className="flex items-center">
                <Shield
                  className="h-5 w-5 mr-2"
                  style={{ color: "var(--profile-warning-text)" }}
                />
                <h4 className="text-sm font-medium profile-info-box-text">
                  Security Settings
                </h4>
              </div>
              <p className="text-sm profile-info-box-text-light mt-1">
                Manage your password and security preferences
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  disabled={!isEditing}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  disabled={!isEditing}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  disabled={!isEditing}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="space-y-6">
            <div className="profile-info-box rounded-lg p-4">
              <div className="flex items-center">
                <Building2
                  className="h-5 w-5 mr-2"
                  style={{ color: "var(--profile-warning-text)" }}
                />
                <h4 className="text-sm font-medium profile-info-box-text">
                  Company Information
                </h4>
              </div>
              <p className="text-sm profile-info-box-text-light mt-1">
                Professional details for accounting services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  value={localUser.companyName || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Company Email
                </label>
                <input
                  type="email"
                  value={localUser.companyEmail || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("companyEmail", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Company Phone
                </label>
                <input
                  type="tel"
                  value={localUser.companyPhone || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("companyPhone", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  License Number
                </label>
                <input
                  type="text"
                  value={localUser.licenseNumber || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleChange("licenseNumber", e.target.value)
                  }
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Company Address
                </label>
                <textarea
                  value={localUser.companyAddress || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleChange("companyAddress", e.target.value)
                  }
                  rows={3}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition resize-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  Tax ID
                </label>
                <input
                  type="text"
                  value={localUser.taxId || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen profile-form-container py-4 sm:py-8">
      <DarkModeToggle />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--profile-text-primary)" }}
          >
            Profile Settings
          </h1>
          <p
            className="mt-1 sm:mt-2 text-sm sm:text-base"
            style={{ color: "var(--profile-text-secondary)" }}
          >
            Manage your account information and preferences
          </p>
        </div>

        {/* Main Card */}
        <div className="profile-card rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div
            className="border-b"
            style={{ borderColor: "var(--profile-border-primary)" }}
          >
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`profile-tab flex items-center py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm profile-transition whitespace-nowrap ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">{renderTabContent()}</div>

          {/* Action Buttons */}
          <div className="profile-action-bar px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div
              className="text-xs sm:text-sm"
              style={{ color: "var(--profile-text-secondary)" }}
            >
              {hasChanges && "You have unsaved changes"}
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setHasChanges(false);
                    }}
                    className="profile-btn-secondary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg profile-transition w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="profile-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg profile-transition flex items-center justify-center w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="profile-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg profile-transition flex items-center justify-center w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
