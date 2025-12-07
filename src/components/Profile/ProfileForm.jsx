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
import { usersAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./ProfileForm.css";
import { DarkModeToggle } from "./DarkModeToggle";

export const ProfileForm = ({ onSave }) => {
  const { user: authUser, login } = useAuth();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [localUser, setLocalUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await usersAPI.getMe();
        if (response.data.success) {
          const userData = response.data.data;
          setLocalUser({
            ...userData,
            phone: userData.phone || "",
            address: userData.address || "",
            nationality: userData.nationality || "",
            taxId: userData.taxId || "",
            licenseNumber: userData.licenseNumber || "",
          });
          setPreview(userData.avatar || "/assets/default-avatar.png");
        } else {
          // Fallback to localStorage if API fails
          const storedUser = JSON.parse(localStorage.getItem("user") || "null");
          if (storedUser) {
            setLocalUser({
              ...storedUser,
              phone: storedUser.phone || "",
              address: storedUser.address || "",
              nationality: storedUser.nationality || "",
              taxId: storedUser.taxId || "",
              licenseNumber: storedUser.licenseNumber || "",
            });
            setPreview(storedUser.avatar || "/assets/default-avatar.png");
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Fallback to localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (storedUser) {
          setLocalUser({
            ...storedUser,
            phone: storedUser.phone || "",
            address: storedUser.address || "",
            nationality: storedUser.nationality || "",
            taxId: storedUser.taxId || "",
            licenseNumber: storedUser.licenseNumber || "",
          });
          setPreview(storedUser.avatar || "/assets/default-avatar.png");
        }
        toast.error(
          t("failedToLoadProfileData") || "Failed to load profile data"
        );
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Loading state
  if (loading || !localUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(
          t("pleaseSelectImageFile") || "Please select an image file"
        );
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          t("imageSizeTooLarge") || "Image size must be less than 5MB"
        );
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setAvatarFile(file);
      setHasChanges(true);
    }
  };

  // Save changes
  const handleSave = async () => {
    try {
      setSaving(true);

      // First, upload avatar if changed
      if (avatarFile) {
        try {
          const formData = new FormData();
          formData.append("avatar", avatarFile);

          toast.info(t("uploadingAvatar") || "Uploading avatar...");
          const avatarResponse = await usersAPI.uploadAvatar(formData);

          if (avatarResponse.data.success) {
            setLocalUser({
              ...localUser,
              avatar: avatarResponse.data.data.avatar,
            });
            setPreview(avatarResponse.data.data.avatar);
            setAvatarFile(null);
            toast.success(
              t("avatarUploadedSuccess") || "Avatar uploaded successfully"
            );
          } else {
            toast.error(
              avatarResponse.data.message ||
                t("failedToUploadAvatar") ||
                "Failed to upload avatar"
            );
            setSaving(false);
            return;
          }
        } catch (avatarError) {
          console.error("Error uploading avatar:", avatarError);
          if (avatarError.code === "ECONNABORTED") {
            toast.error(
              t("avatarUploadTimeout") ||
                "Avatar upload timed out. Please try again or use a smaller image."
            );
          } else {
            toast.error(
              avatarError?.response?.data?.message ||
                t("failedToUploadAvatarRetry") ||
                "Failed to upload avatar. Please try again."
            );
          }
          setSaving(false);
          return;
        }
      }

      // Then update profile
      const updateData = {
        name: localUser.name,
        phone: localUser.phone || "",
        address: localUser.address || "",
        nationality: localUser.nationality || "",
      };

      // Add service provider specific fields
      if (localUser.role === "serviceProvider") {
        if (localUser.taxId) updateData.taxId = localUser.taxId;
        if (localUser.licenseNumber)
          updateData.licenseNumber = localUser.licenseNumber;
      }

      toast.info(t("updatingProfile") || "Updating profile...");
      const response = await usersAPI.updateProfile(updateData);

      if (response.data.success) {
        const updatedUser = response.data.data;
        setLocalUser(updatedUser);

        // Update auth context and localStorage
        const userToStore = {
          ...updatedUser,
          id: updatedUser._id || updatedUser.id,
        };
        login(userToStore);

        setIsEditing(false);
        setHasChanges(false);
        toast.success(
          t("profileUpdatedSuccess") || "Profile updated successfully"
        );
        if (onSave) onSave(updatedUser);
      } else {
        toast.error(
          response.data.message ||
            t("failedToUpdateProfile") ||
            "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.code === "ECONNABORTED") {
        toast.error(
          t("requestTimeout") ||
            "Request timed out. Please check your connection and try again."
        );
      } else {
        toast.error(
          error?.response?.data?.message ||
            t("failedToSaveProfile") ||
            "Failed to save profile"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // Tab configuration
  const tabs = [
    { id: "account", label: t("accountInfo") || "Account Info", icon: User },
    { id: "security", label: t("security"), icon: Shield },
    ...(localUser.role === "accountant"
      ? [
          {
            id: "company",
            label: t("companyInfo") || "Company Info",
            icon: Building2,
          },
        ]
      : []),
  ];

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            {/* Profile Photo Section */}
            <div
              className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
              style={isArabic ? { flexDirection: "row-reverse" } : {}}
            >
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
                  {localUser.accountType
                    ? t(localUser.accountType.toLowerCase()) ||
                      localUser.accountType
                    : t("account")}{" "}
                  {t("account")}
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
                    {t("changePhoto")}
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
                  {t("fullName")}
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
                  {t("emailAddress")}
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
                  {t("phoneNumber")}
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
                  {t("country")}
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
                  {t("accountType")}
                </label>
                <select
                  value={localUser.accountType || "individual"}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("accountType", e.target.value)}
                  className="profile-input w-full px-4 py-3 border rounded-lg profile-transition"
                >
                  <option value="individual">{t("individual")}</option>
                  <option value="business">{t("business")}</option>
                  <option value="enterprise">{t("enterprise")}</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="profile-info-box rounded-lg p-4">
              <div
                className="flex items-center"
                style={isArabic ? { flexDirection: "row-reverse" } : {}}
              >
                <Shield
                  className="h-5 w-5 mr-2"
                  style={{ color: "var(--profile-warning-text)" }}
                />
                <h4 className="text-sm font-medium profile-info-box-text">
                  {t("securitySettings")}
                </h4>
              </div>
              <p className="text-sm profile-info-box-text-light mt-1">
                {t("managePasswordSecurity")}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  {t("currentPassword")}
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
                  {t("newPassword")}
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
                  {t("confirmNewPassword")}
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
              <div
                className="flex items-center"
                style={isArabic ? { flexDirection: "row-reverse" } : {}}
              >
                <Building2
                  className="h-5 w-5 mr-2"
                  style={{ color: "var(--profile-warning-text)" }}
                />
                <h4 className="text-sm font-medium profile-info-box-text">
                  {t("companyInformation")}
                </h4>
              </div>
              <p className="text-sm profile-info-box-text-light mt-1">
                {t("professionalDetailsAccounting")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--profile-text-tertiary)" }}
                >
                  {t("companyName")}
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
                  {t("companyEmail")}
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
                  {t("companyPhone")}
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
                  {t("licenseNumber")}
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
                  {t("companyAddress")}
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
                  {t("taxId")}
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
    <div
      className="min-h-screen profile-form-container py-4 sm:py-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <DarkModeToggle />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--profile-text-primary)" }}
          >
            {t("profileSettings")}
          </h1>
          <p
            className="mt-1 sm:mt-2 text-sm sm:text-base"
            style={{ color: "var(--profile-text-secondary)" }}
          >
            {t("manageAccountInfoPreferences")}
          </p>
        </div>

        {/* Main Card */}
        <div className="profile-card rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div
            className="border-b"
            style={{ borderColor: "var(--profile-border-primary)" }}
          >
            <nav
              className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-6 overflow-x-auto"
              style={isArabic ? { flexDirection: "row-reverse" } : {}}
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`profile-tab flex items-center py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm profile-transition whitespace-nowrap ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    style={isArabic ? { flexDirection: "row-reverse" } : {}}
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
          <div
            className="profile-action-bar px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            style={isArabic ? { flexDirection: "row-reverse" } : {}}
          >
            <div
              className="text-xs sm:text-sm"
              style={{ color: "var(--profile-text-secondary)" }}
            >
              {hasChanges && t("unsavedChanges")}
            </div>
            <div
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto"
              style={isArabic ? { flexDirection: "row-reverse" } : {}}
            >
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
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!hasChanges || saving}
                    className="profile-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg profile-transition flex items-center justify-center w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    style={isArabic ? { flexDirection: "row-reverse" } : {}}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("saving")}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {t("saveChanges")}
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="profile-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg profile-transition flex items-center justify-center w-full sm:w-auto"
                  style={isArabic ? { flexDirection: "row-reverse" } : {}}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {t("editProfile")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
