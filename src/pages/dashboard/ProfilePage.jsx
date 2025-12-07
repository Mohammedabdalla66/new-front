import React from "react";
import { ProfileForm } from "../../components/Profile/ProfileForm.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export default function ProfilePage() {
  const { t } = useLanguage();

  const handleSave = (updatedUser) => {
    // ProfileForm now handles all API calls and state updates
    console.log("Profile updated:", updatedUser);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("myProfile") || "My Profile"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t("updatePersonalDetails") || "Manage your account information and preferences."}
        </p>
      </div>

      {/* Profile Form */}
      <ProfileForm onSave={handleSave} />
    </div>
  );
}

