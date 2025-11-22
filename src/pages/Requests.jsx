import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { RequestFilters } from "../components/Requests/RequestFilters.jsx";
import { RequestsTable } from "../components/Requests/RequestsTable.jsx";
import { RequestNew } from "./RequestNew.jsx";
import { requestsAPI } from "../services/api.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const Requests = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    serviceType: "",
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await requestsAPI.list();
      
      // Handle new API response format: { success: true, data: [...], meta: {...} }
      let data = [];
      if (res.data.success) {
        data = res.data.data || [];
      } else if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.data)) {
        data = res.data.data;
      }
      
      const mapped = data.map((r) => ({
        id: r._id || r.id,
        title: r.title,
        description: r.description,
        serviceType: r.serviceType || "",
        status: r.status || "submitted",
        offers: r.proposalsCount || r.offers || 0,
        lastUpdated: r.updatedAt || r.createdAt || new Date().toISOString(),
      }));
      setRequests(mapped);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Reload requests when navigating back from request/new page
  useEffect(() => {
    if (location.pathname === "/client/requests" || location.pathname === "/client/request") {
      loadRequests();
    }
  }, [location.pathname]);

  const filtered = requests.filter((r) => {
    if (
      filters.search &&
      !r.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.status && r.status !== filters.status) return false;
    if (filters.serviceType && r.serviceType !== filters.serviceType)
      return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("myRequests")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("myRequestsSubtitle")}
          </p>
        </div>
        <button
          onClick={() => navigate("/client/request/new")}
          className="flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm sm:text-base">{t("newRequest")}</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-4 sm:mb-6">
        <RequestFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 overflow-hidden">
        {loading && (
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400">{t("loading")}</div>
        )}
        {error && (
          <div className="p-4 text-sm text-red-600 dark:text-red-400">{error || t("failedToLoad")}</div>
        )}
        <RequestsTable
          requests={filtered}
          onViewDetails={(id) => navigate(`/client/request/${id}`)}
        />
      </div>
    </div>
  );
};
export default Requests;