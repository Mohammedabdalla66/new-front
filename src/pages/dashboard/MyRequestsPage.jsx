import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { requestsAPI, proposalsAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const isServiceProvider = user?.role === 'serviceProvider' || user?.role === 'firm';
  
  const [filter, setFilter] = useState("all");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        if (isServiceProvider) {
          // For service providers, show their proposals
          const response = await proposalsAPI.listMy();
          
          if (response.data.success) {
            let proposals = response.data.data || [];
            
            // Filter by status
            if (filter !== "all") {
              proposals = proposals.filter(p => p.status === filter);
            }
            
            // Search filter
            if (debouncedSearch) {
              const q = debouncedSearch.toLowerCase();
              proposals = proposals.filter(p => 
                p.request?.title?.toLowerCase().includes(q) ||
                p.notes?.toLowerCase().includes(q)
              );
            }
            
            setRequests(proposals.map(p => ({
              _id: p._id,
              id: p._id,
              title: p.request?.title || 'Request',
              description: p.notes || '',
              status: p.status,
              budget: p.price,
              createdAt: p.createdAt,
              request: p.request,
              proposal: p,
            })));
            setTotalPages(1); // Proposals don't have pagination yet
          } else {
            setRequests(response.data.data || response.data || []);
          }
        } else {
          // For clients, show their requests
          const response = await requestsAPI.list({
            page,
            limit: 25,
            status: filter === "all" ? "" : filter,
            q: debouncedSearch || undefined,
            sort: '-createdAt',
          });
          
          // Handle new API response format
          if (response.data.success) {
            setRequests(response.data.data || []);
            setTotalPages(response.data.meta?.pages || 1);
          } else {
            setRequests(response.data.data || response.data || []);
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err?.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, filter, debouncedSearch, isServiceProvider]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "Not specified";
    return `$${amount.toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "open":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "in-progress":
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "canceled":
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "in-progress":
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100";
      case "canceled":
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  // Requests are already filtered by the API
  const filteredRequests = requests;

  const filterOptions = isServiceProvider
    ? [
        { value: "all", label: "All Proposals" },
        { value: "pending", label: "Pending" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" },
        { value: "canceled", label: "Canceled" },
      ]
    : [
        { value: "all", label: "All Requests" },
        { value: "submitted", label: "Submitted" },
        { value: "open", label: "Open" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "canceled", label: "Canceled" },
      ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isServiceProvider ? "My Proposals" : t("myRequests")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isServiceProvider 
              ? "Manage your proposals and track their status"
              : "Manage your project requests and track their status"}
          </p>
        </div>
        {!isServiceProvider && (
          <button 
            onClick={() => navigate("/dashboard/requests/new")}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            New Request
          </button>
        )}
        {isServiceProvider && (
          <button 
            onClick={() => navigate("/firm/browse")}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Browse Projects
          </button>
        )}
      </div>

      {/* Search and Filter Tabs */}
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setFilter(option.value);
                setPage(1);
              }}
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
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading requests...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Requests List */}
      {!loading && !error && (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request._id || request.id}
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
                        {isServiceProvider 
                          ? `Proposal for: ${request.request?.title || 'Request'}`
                          : `Request ID: ${request._id?.slice(-8) || request.id}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status || "submitted"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {request.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {isServiceProvider ? (
                      <>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Price: {formatCurrency(request.budget || request.proposal?.price)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Duration: {request.proposal?.durationDays || 'N/A'} days
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Submitted: {formatDate(request.createdAt)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Budget: {formatCurrency(request.budget)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {formatDate(request.deadline)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Submitted: {formatDate(request.createdAt)}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                  {isServiceProvider ? (
                      <>
                      <button 
                        onClick={() => navigate(`/firm/browse/${request.request?._id || request.request?.id}`)}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Request
                      </button>
                      {request.status === 'pending' && (
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this proposal?')) {
                              proposalsAPI.cancel(request._id || request.id)
                                .then(() => {
                                  // Reload data
                                  window.location.reload();
                                })
                                .catch(err => {
                                  console.error('Error canceling proposal:', err);
                                  alert('Failed to cancel proposal');
                                });
                            }
                          }}
                          className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      )}
                    </>
                  ) : (
                    <button 
                      onClick={() => navigate(`/dashboard/requests/${request._id || request.id}`)}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isServiceProvider ? "No proposals found" : "No requests found"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isServiceProvider
              ? filter === "all"
                ? "You haven't submitted any proposals yet."
                : `No ${filter} proposals found.`
              : filter === "all"
                ? "You haven't submitted any requests yet."
                : `No ${filter} requests found.`}
          </p>
          {isServiceProvider ? (
            <button
              onClick={() => navigate("/firm/browse")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Browse Projects
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard/requests/new")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Create New Request
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
