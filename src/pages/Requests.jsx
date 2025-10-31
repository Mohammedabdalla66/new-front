import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RequestFilters } from "../components/Requests/RequestFilters.jsx";
import { RequestsTable } from "../components/Requests/RequestsTable.jsx";
import { RequestNew } from "./RequestNew.jsx";

const mockRequests = [
  {
    id: "1",
    title: "Q4 2024 Tax Filing",
    description: "Complete tax return preparation for Q4 2024",
    serviceType: "tax-filing",
    status: "submitted",
    offers: 8,
    lastUpdated: "2025-01-12",
  },
  {
    id: "2",
    title: "Monthly Bookkeeping Services",
    description: "Ongoing monthly bookkeeping for small business",
    serviceType: "bookkeeping",
    status: "in-progress",
    offers: 12,
    lastUpdated: "2025-01-15",
  },
  {
    id: "3",
    title: "Financial Audit 2024",
    description: "Complete financial audit for annual compliance",
    serviceType: "auditing",
    status: "submitted",
    offers: 4,
    lastUpdated: "2025-01-05",
  },
];

export const Requests = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    serviceType: "",
  });

  const filtered = mockRequests.filter((r) => {
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
            My Requests
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Create and manage your service requests.
          </p>
        </div>
        <button
          onClick={() => navigate("/client/request/new")}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm sm:text-base">New Request</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-4 sm:mb-6">
        <RequestFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 overflow-hidden">
        <RequestsTable
          requests={filtered}
          onViewDetails={(id) => navigate(`/client/request/${id}`)}
        />
      </div>
    </div>
  );
};
