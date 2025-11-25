import React from "react";
import { ProfileForm } from "../components/Profile/ProfileForm.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function ClientProfile() {
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
          {t("myProfile")}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t("updatePersonalDetails")}
        </p>
      </div>

      {/* Profile Form */}
      <ProfileForm onSave={handleSave} />

      {/* Stats Cards */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            24
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t("totalRequests")}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
            $1,820
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t("totalPaid")}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            3
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t("pendingDocuments")}
          </div>
        </div>
      </div>
    </div>
  );
}
