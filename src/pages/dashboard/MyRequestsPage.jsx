import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Calendar,
  DollarSign,
} from "lucide-react";

const MyRequestsPage = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const requests = [
    {
      id: 1,
      title: "Tax Filing Services for Q4 2024",
      client: "ABC Company",
      budget: "$2,500",
      submittedDate: "2024-12-15",
      status: "pending",
      deadline: "2024-12-31",
      description:
        "Complete tax filing services for Q4 2024 including all necessary documentation and compliance requirements.",
    },
    {
      id: 2,
      title: "Financial Statements Preparation",
      client: "XYZ Corp",
      budget: "$1,800",
      submittedDate: "2024-12-10",
      status: "accepted",
      deadline: "2025-01-15",
      description:
        "Prepare comprehensive financial statements for annual reporting.",
    },
    {
      id: 3,
      title: "Monthly Bookkeeping Services",
      client: "DEF Ltd",
      budget: "$800",
      submittedDate: "2024-12-05",
      status: "rejected",
      deadline: "2024-12-20",
      description: "Ongoing monthly bookkeeping and reconciliation services.",
    },
    {
      id: 4,
      title: "Audit Support Services",
      client: "GHI Industries",
      budget: "$3,200",
      submittedDate: "2024-12-12",
      status: "pending",
      deadline: "2025-01-30",
      description:
        "Provide audit support and documentation for external audit process.",
    },
    {
      id: 5,
      title: "Payroll Management Setup",
      client: "JKL Services",
      budget: "$1,200",
      submittedDate: "2024-12-08",
      status: "accepted",
      deadline: "2025-01-10",
      description: "Set up complete payroll management system and training.",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((request) => request.status === filter);

  const filterOptions = [
    { value: "all", label: "All Requests" },
    { value: "pending", label: t("pending") },
    { value: "accepted", label: t("accepted") },
    { value: "rejected", label: t("rejected") },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("myRequests")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your project proposals and track their status
          </p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          New Proposal
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === option.value
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Client: {request.client}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {t(request.status)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {request.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Budget: {request.budget}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Deadline: {request.deadline}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Submitted: {request.submittedDate}
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button className="flex items-center px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No requests found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === "all"
              ? "You haven't submitted any proposals yet."
              : `No ${filter} requests found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
