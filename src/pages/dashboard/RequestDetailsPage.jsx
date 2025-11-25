import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serviceProviderAPI, proposalsAPI } from "../../services/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  FileText,
  User,
  Mail,
  Clock,
  Send,
  Upload,
  X,
} from "lucide-react";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalLoading, setProposalLoading] = useState(false);

  // Proposal form state
  const [price, setPrice] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      try {
        setLoading(true);
        const response = await serviceProviderAPI.getRequest(id);
        
        if (response.data.success) {
          setRequest(response.data.data);
          // Show proposal form if provider hasn't proposed yet
          if (!response.data.data.hasProposal) {
            setShowProposalForm(true);
          }
        } else {
          setRequest(response.data);
        }
      } catch (err) {
        console.error("Error loading request:", err);
        setError(err?.response?.data?.message || "Failed to load request");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadRequest();
    }
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Parse budget range from request
  const parseBudgetRange = (budgetString) => {
    if (!budgetString || budgetString.trim() === '') {
      return null; // No budget range specified
    }

    // Remove currency symbols and whitespace
    const cleaned = budgetString.toString().replace(/[$,\s]/g, '');
    
    // Check if it's a range (e.g., "500-1000" or "500 - 1000")
    if (cleaned.includes('-')) {
      const parts = cleaned.split('-').map(p => p.trim());
      if (parts.length === 2) {
        const min = parseFloat(parts[0]);
        const max = parseFloat(parts[1]);
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max >= min) {
          return { min, max };
        }
      }
    }
    
    // Check if it's a single number
    const singleValue = parseFloat(cleaned);
    if (!isNaN(singleValue) && singleValue >= 0) {
      // If single value, treat it as both min and max (exact match)
      return { min: singleValue, max: singleValue };
    }
    
    return null; // Invalid format
  };

  // Validate price against budget range
  const validatePrice = (priceValue) => {
    setPriceError("");
    
    if (!priceValue || priceValue.trim() === '') {
      return true; // Will be caught by required validation
    }

    const priceNum = parseFloat(priceValue);
    if (isNaN(priceNum) || priceNum < 0) {
      setPriceError("Price must be a valid positive number");
      return false;
    }

    if (!request || !request.budget) {
      return true; // No budget range to validate against
    }

    const budgetRange = parseBudgetRange(request.budget);
    if (!budgetRange) {
      return true; // Budget range not specified or invalid, allow any price
    }

    if (priceNum < budgetRange.min) {
      setPriceError(`Price must be at least $${budgetRange.min.toLocaleString()}. The client's budget range is $${budgetRange.min.toLocaleString()} - $${budgetRange.max.toLocaleString()}.`);
      return false;
    }

    if (priceNum > budgetRange.max) {
      setPriceError(`Price must not exceed $${budgetRange.max.toLocaleString()}. The client's budget range is $${budgetRange.min.toLocaleString()} - $${budgetRange.max.toLocaleString()}.`);
      return false;
    }

    return true;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (value) {
      validatePrice(value);
    } else {
      setPriceError("");
    }
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    
    if (!price || !durationDays) {
      toast.error("Price and duration are required");
      return;
    }

    // Validate price against budget range
    if (!validatePrice(price)) {
      toast.error(priceError || "Price is outside the client's budget range");
      return;
    }

    try {
      setProposalLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("price", price);
      formData.append("durationDays", durationDays);
      formData.append("notes", notes || "");
      
      // Append files - backend expects 'documents' field name
      files.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await proposalsAPI.create(id, formData);
      
      if (response.data.success) {
        toast.success("Proposal submitted successfully! Awaiting admin approval.");
        setShowProposalForm(false);
        
        // Get proposal ID from response
        const proposalId = response.data.data?._id || response.data.data?.id || response.data._id;
        
        // Reload request to update hasProposal status
        const reloadResponse = await serviceProviderAPI.getRequest(id);
        if (reloadResponse.data.success) {
          const updatedRequest = reloadResponse.data.data;
          // Add proposalId to the request object
          if (proposalId) {
            updatedRequest.proposalId = proposalId;
          }
          setRequest(updatedRequest);
        }
        // Reset form
        setPrice("");
        setDurationDays("");
        setNotes("");
        setFiles([]);
      }
    } catch (err) {
      console.error("Error submitting proposal:", err);
      toast.error(err?.response?.data?.message || "Failed to submit proposal");
    } finally {
      setProposalLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "Not specified";
    return `$${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading request...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error || "Request not found"}</p>
        </div>
        <button
          onClick={() => navigate("/firm/browse")}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/firm/browse")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Request Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View request information and submit a proposal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {request.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {request.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(request.budget)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(request.deadline)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.status || "pending"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Attachments</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.attachments?.length || 0} files
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Attachments
                </h3>
                <div className="space-y-2">
                  {request.attachments.map((att, index) => (
                    <a
                      key={index}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {att.name || `Attachment ${index + 1}`}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Proposal Form */}
          {showProposalForm && !request.hasProposal && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Submit Proposal
              </h2>
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (USD) *
                      {request.budget && (() => {
                        const budgetRange = parseBudgetRange(request.budget);
                        if (budgetRange) {
                          return (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              (Range: ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()})
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={handlePriceChange}
                      onBlur={() => validatePrice(price)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                        priceError
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      }`}
                    />
                    {priceError && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {priceError}
                      </p>
                    )}
                    {request.budget && !priceError && price && (() => {
                      const budgetRange = parseBudgetRange(request.budget);
                      if (budgetRange) {
                        const priceNum = parseFloat(price);
                        if (!isNaN(priceNum) && priceNum >= budgetRange.min && priceNum <= budgetRange.max) {
                          return (
                            <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                              ✓ Price is within the client's budget range
                            </p>
                          );
                        }
                      }
                      return null;
                    })()}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (Days) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={durationDays}
                      onChange={(e) => setDurationDays(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional information about your proposal..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Attachments (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900/20 file:px-4 file:py-2 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
                  />
                  {files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={proposalLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {proposalLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Proposal
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProposalForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {request.hasProposal && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200">
                You have already submitted a proposal for this request.
              </p>
              {request.proposalId && (
                <button
                  onClick={() => navigate(`/firm/proposals/${request.proposalId}`)}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View your proposal
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Client Information
            </h3>
            {request.client ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {request.client.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {request.client.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {request.client.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Client information not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;

