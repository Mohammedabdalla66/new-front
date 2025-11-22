import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { proposalsAPI } from "../../services/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

const ProposalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProposal = async () => {
      try {
        setLoading(true);
        const response = await proposalsAPI.get(id);
        
        if (response.data.success) {
          setProposal(response.data.data);
        } else {
          setProposal(response.data);
        }
      } catch (err) {
        console.error("Error loading proposal:", err);
        setError(err?.response?.data?.message || "Failed to load proposal");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadProposal();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "Not specified";
    return `$${amount.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "canceled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
      case "canceled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading proposal...</p>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error || "Proposal not found"}</p>
        </div>
        <button
          onClick={() => navigate("/firm/requests")}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Back to My Proposals
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/firm/requests")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Proposal Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your proposal information and status
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Proposal Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Proposal for: {proposal.request?.title || "Request"}
              </h2>
              <div className="flex items-center space-x-2">
                {getStatusIcon(proposal.status)}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    proposal.status
                  )}`}
                >
                  {proposal.status || "pending"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(proposal.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {proposal.durationDays || "N/A"} days
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(proposal.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {proposal.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Notes
                </h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {proposal.notes}
                </p>
              </div>
            )}

            {/* Attachments */}
            {proposal.attachments && proposal.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Attachments
                </h3>
                <div className="space-y-2">
                  {proposal.attachments.map((att, index) => (
                    <a
                      key={index}
                      href={att.url || att.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {att.name || `Attachment ${index + 1}`}
                        </span>
                      </div>
                      <Download className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {proposal.status === "pending" && (
              <div className="mt-6">
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to cancel this proposal?")) {
                      try {
                        await proposalsAPI.cancel(id);
                        toast.success("Proposal canceled successfully");
                        navigate("/firm/requests");
                      } catch (err) {
                        toast.error(err?.response?.data?.message || "Failed to cancel proposal");
                      }
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Cancel Proposal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Info */}
          {proposal.request && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Request Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Request Title</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {proposal.request.title}
                  </p>
                </div>
                {proposal.request.budget && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client Budget</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(proposal.request.budget)}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => navigate(`/firm/browse/${proposal.request._id || proposal.request.id}`)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  View Request Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsPage;

