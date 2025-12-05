import React from "react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const Help = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("helpSupport")}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t("supportContentFAQs")}
        </p>
      </div>
    </div>
  );
};
