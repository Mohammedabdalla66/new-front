import React from "react";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export const RequestFilters = ({ filters, onFiltersChange }) => {
  const { t } = useLanguage();
  
  const handleChange = (key, value) =>
    onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("searchPlaceholder").replace("...", "")}
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder={t("searchRequests")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("status")}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="">{t("all")}</option>
            <option value="pending">{t("pending")}</option>
            <option value="in-progress">{t("inProgress")}</option>
            <option value="completed">{t("completed")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("serviceType")}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.serviceType}
            onChange={(e) => handleChange("serviceType", e.target.value)}
          >
            <option value="">{t("all")}</option>
            <option value="tax-filing">{t("taxFiling")}</option>
            <option value="bookkeeping">{t("bookkeeping")}</option>
            <option value="auditing">{t("auditing")}</option>
            <option value="payroll">{t("payroll")}</option>
            <option value="consultation">{t("consultation")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
