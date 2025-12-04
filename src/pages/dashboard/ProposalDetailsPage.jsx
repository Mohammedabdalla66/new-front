import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { proposalsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { useLanguage } from "../../contexts/LanguageContext";
import { useConfirmationToast } from "../../components/ui/ConfirmationToast";
import { getServiceTitleLabel } from "../../utils/titleUtils";
import {
  ArrowLeft,
  DollarSign,
  Calendar as CalendarIcon,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Send,
  Upload,
  X,
} from "lucide-react";

const ProposalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { language } = useLanguage();
=======
  const { t, language } = useLanguage();
>>>>>>> origin/mohamedAbdo
  const { showConfirmation, ConfirmationToastComponent } = useConfirmationToast();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  
  // Edit form state
  const [price, setPrice] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [priceError, setPriceError] = useState("");

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
<<<<<<< HEAD
        setError(err?.response?.data?.message || "Failed to load proposal");
=======
        setError(err?.response?.data?.message || t("failedToLoadProposal"));
>>>>>>> origin/mohamedAbdo
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadProposal();
    }
  }, [id]);

  // Pre-fill form when editing
  useEffect(() => {
    if (showEditForm && proposal) {
      setPrice(proposal.price?.toString() || "");
      // Convert durationDays to end date
      if (proposal.durationDays) {
        const today = new Date();
        const endDateValue = new Date(today);
        endDateValue.setDate(today.getDate() + proposal.durationDays);
        setEndDate(endDateValue.toISOString().split('T')[0]);
      } else {
        setEndDate("");
      }
      setNotes(proposal.notes || "");
      setFiles([]);
    }
  }, [showEditForm, proposal]);

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
    const cleaned = budgetString.toString().replace(/[OMR,\s]/gi, '');

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
<<<<<<< HEAD
      setPriceError("Price must be a valid positive number");
=======
      setPriceError(t("priceMustBeValidNumber"));
>>>>>>> origin/mohamedAbdo
      return false;
    }

    if (!proposal || !proposal.request || !proposal.request.budget) {
      return true; // No budget range to validate against
    }

    const budgetRange = parseBudgetRange(proposal.request.budget);
    if (!budgetRange) {
      return true; // Budget range not specified or invalid, allow any price
    }

    if (priceNum < budgetRange.min) {
<<<<<<< HEAD
      setPriceError(`Price must be at least ${budgetRange.min.toLocaleString()} OMR. The client's budget range is ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} OMR, but you can offer a higher price.`);
=======
      setPriceError(`${t("priceMustBeAtLeast")} ${budgetRange.min.toLocaleString()} ${t("omr")}. ${t("clientBudgetRangeIs")} ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} ${t("omr")}, ${t("butCanOfferHigher")}`);
>>>>>>> origin/mohamedAbdo
      return false;
    }

    // Allow prices higher than the maximum limit
    // Only enforce minimum limit

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

  const handleUpdateProposal = async (e) => {
    e.preventDefault();
    
    // Show confirmation toast
    const confirmMessage = language === "ar" 
      ? "هل أنت متأكد من صحة جميع البيانات؟"
      : "Are you sure about all the data?";
    
    const confirmText = language === "ar" ? "نعم، متابعة" : "Yes, proceed";
    const cancelText = language === "ar" ? "إلغاء" : "Cancel";
    
    const confirmed = await showConfirmation(confirmMessage, confirmText, cancelText);
    
    if (!confirmed) {
      return; // User cancelled, don't submit
    }

    if (!price || !endDate) {
<<<<<<< HEAD
      toast.error("Price and end date are required");
=======
      toast.error(t("priceAndEndDateRequired"));
>>>>>>> origin/mohamedAbdo
      return;
    }

    // Validate price against budget range (minimum only)
    if (!validatePrice(price)) {
<<<<<<< HEAD
      toast.error(priceError || "Price must meet the minimum requirement");
=======
      toast.error(priceError || t("priceMustBeValidNumber"));
>>>>>>> origin/mohamedAbdo
      return;
    }

    try {
      setEditLoading(true);

      // Calculate durationDays from end date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(endDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
<<<<<<< HEAD
        toast.error("End date must be in the future");
=======
        toast.error(t("endDateMustBeFuture"));
>>>>>>> origin/mohamedAbdo
        setEditLoading(false);
        return;
      }

      const timeDifference = selectedDate - today;
      const durationDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("price", price);
      formData.append("durationDays", durationDays.toString());
      formData.append("notes", notes || "");
      
      // Append files - backend expects 'documents' field name
      files.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await proposalsAPI.update(id, formData);
      
      if (response.data.success) {
<<<<<<< HEAD
        toast.success("Proposal updated successfully! Awaiting admin approval.");
=======
        toast.success(t("proposalUpdatedSuccess"));
>>>>>>> origin/mohamedAbdo
        setShowEditForm(false);
        
        // Reload proposal to update status
        const reloadResponse = await proposalsAPI.get(id);
        if (reloadResponse.data.success) {
          setProposal(reloadResponse.data.data);
        } else {
          setProposal(reloadResponse.data);
        }
        // Reset form
        setPrice("");
        setEndDate("");
        setNotes("");
        setFiles([]);
      }
    } catch (err) {
      console.error("Error updating proposal:", err);
<<<<<<< HEAD
      toast.error(err?.response?.data?.message || "Failed to update proposal");
=======
      toast.error(err?.response?.data?.message || t("failedToUpdateProposal"));
>>>>>>> origin/mohamedAbdo
    } finally {
      setEditLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
<<<<<<< HEAD
    if (!amount || amount === 0) return "Not specified";
    return `${amount.toLocaleString()} OMR`;
=======
    if (!amount || amount === 0) return t("notSpecified");
    return `${amount.toLocaleString()} ${t("omr")}`;
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading proposal...</p>
=======
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t("loadingProposal")}</p>
>>>>>>> origin/mohamedAbdo
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
<<<<<<< HEAD
          <p className="text-red-800 dark:text-red-200">{error || "Proposal not found"}</p>
=======
          <p className="text-red-800 dark:text-red-200">{error || t("proposalNotFound")}</p>
>>>>>>> origin/mohamedAbdo
        </div>
        <button
          onClick={() => navigate("/firm/requests")}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
<<<<<<< HEAD
          Back to My Proposals
=======
          {t("backToMyProposals")}
>>>>>>> origin/mohamedAbdo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConfirmationToastComponent />
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
<<<<<<< HEAD
            Proposal Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your proposal information and status
=======
            {t("proposalDetails")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("viewProposalInfo")}
>>>>>>> origin/mohamedAbdo
          </p>
        </div>
      </div>

      {/* Rejection Reason Alert */}
      {proposal?.status === "rejected" && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
<<<<<<< HEAD
                Proposal Rejected
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">Rejection Reason:</p>
                {proposal.rejectionReason ? (
                  <p className="whitespace-pre-wrap">{proposal.rejectionReason}</p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 italic">No rejection reason provided.</p>
=======
                {t("proposalRejected")}
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">{t("rejectionReason")}</p>
                {proposal.rejectionReason ? (
                  <p className="whitespace-pre-wrap">{proposal.rejectionReason}</p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 italic">{t("noRejectionReason")}</p>
>>>>>>> origin/mohamedAbdo
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
<<<<<<< HEAD
                  Edit Proposal
=======
                  {t("editProposal")}
>>>>>>> origin/mohamedAbdo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Proposal Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
<<<<<<< HEAD
                Proposal for: {proposal.request?.title ? getServiceTitleLabel(proposal.request.title) : "Request"}
=======
                {t("proposalFor")} {proposal.request?.title ? getServiceTitleLabel(proposal.request.title) : t("request")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("price")}</p>
>>>>>>> origin/mohamedAbdo
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(proposal.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {proposal.durationDays || "N/A"} days
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("duration")}</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {proposal.durationDays || "N/A"} {t("days")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("submitted")}</p>
>>>>>>> origin/mohamedAbdo
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(proposal.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {proposal.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
<<<<<<< HEAD
                  Notes
=======
                  {t("notes")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                  Attachments
=======
                  {t("attachments")}
>>>>>>> origin/mohamedAbdo
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
                {/* <button
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
                </button> */}
              </div>
            )}
          </div>

          {/* Edit Proposal Form */}
          {showEditForm && proposal?.status === "rejected" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
                Update Proposal
=======
                {t("updateProposal")}
>>>>>>> origin/mohamedAbdo
              </h2>
              <form onSubmit={handleUpdateProposal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
<<<<<<< HEAD
                      Price (OMR) *
=======
                      {t("priceOMR")}
>>>>>>> origin/mohamedAbdo
                      {proposal?.request?.budget && (() => {
                        const budgetRange = parseBudgetRange(proposal.request.budget);
                        if (budgetRange) {
                          return (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
<<<<<<< HEAD
                              (Minimum: {budgetRange.min.toLocaleString()} OMR, Budget range: {budgetRange.min.toLocaleString()} - {budgetRange.max.toLocaleString()} OMR)
=======
                              ({t("minimum")} {budgetRange.min.toLocaleString()} {t("omr")}, {t("budgetRange")} {budgetRange.min.toLocaleString()} - {budgetRange.max.toLocaleString()} {t("omr")})
>>>>>>> origin/mohamedAbdo
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
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${priceError
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                        }`}
                    />
                    {priceError && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {priceError}
                      </p>
                    )}
                    {proposal?.request?.budget && !priceError && price && (() => {
                      const budgetRange = parseBudgetRange(proposal.request.budget);
                      if (budgetRange) {
                        const priceNum = parseFloat(price);
                        if (!isNaN(priceNum) && priceNum >= budgetRange.min) {
                          if (priceNum <= budgetRange.max) {
                            return (
                              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
<<<<<<< HEAD
                                ✓ Price is within the client's budget range
=======
                                {t("priceWithinRange")}
>>>>>>> origin/mohamedAbdo
                              </p>
                            );
                          } else {
                            return (
                              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
<<<<<<< HEAD
                                ✓ Price exceeds the client's maximum budget, but is allowed
=======
                                {t("priceExceedsMax")}
>>>>>>> origin/mohamedAbdo
                              </p>
                            );
                          }
                        }
                      }
                      return null;
                    })()}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">
<<<<<<< HEAD
                      End Date *
=======
                      {t("endDate")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
<<<<<<< HEAD
                      Select the project completion date
=======
                      {t("selectProjectCompletionDate")}
>>>>>>> origin/mohamedAbdo
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
<<<<<<< HEAD
                    Notes
=======
                    {t("notes")}
>>>>>>> origin/mohamedAbdo
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
<<<<<<< HEAD
                    placeholder="Add any additional information about your proposal..."
=======
                    placeholder={t("addAdditionalInfo")}
>>>>>>> origin/mohamedAbdo
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
<<<<<<< HEAD
                    Attachments (Optional)
=======
                    {t("attachmentsOptional")}
>>>>>>> origin/mohamedAbdo
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
                    disabled={editLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
<<<<<<< HEAD
                        Updating...
=======
                        {t("updating")}
>>>>>>> origin/mohamedAbdo
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                        Update Proposal
=======
                        {t("updateProposalButton")}
>>>>>>> origin/mohamedAbdo
                      </>
                    )}
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setPrice("");
                      setEndDate(null);
                      setNotes("");
                      setFiles([]);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button> */}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Info */}
          {proposal.request && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
                Request Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Request Title</p>
=======
                {t("requestInformation")}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("requestTitle")}</p>
>>>>>>> origin/mohamedAbdo
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getServiceTitleLabel(proposal.request.title, language)}
                  </p>
                </div>
                {proposal.request.budget && (
                  <div>
<<<<<<< HEAD
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client Budget</p>
=======
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("clientBudget")}</p>
>>>>>>> origin/mohamedAbdo
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(proposal.request.budget)}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => navigate(`/firm/browse/${proposal.request._id || proposal.request.id}`)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
<<<<<<< HEAD
                  View Request Details
=======
                  {t("viewRequestDetails")}
>>>>>>> origin/mohamedAbdo
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

