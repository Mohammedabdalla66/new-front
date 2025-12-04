import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serviceProviderAPI, proposalsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { useLanguage } from "../../contexts/LanguageContext";
import { useConfirmationToast } from "../../components/ui/ConfirmationToast";
import { getServiceTitleLabel } from "../../utils/titleUtils";
import {
  ArrowLeft,
  DollarSign,
  Calendar as CalendarIcon,
  FileText,
  User,
  Mail,
  Clock,
  Send,
  Upload,
  X,
  Building2,
  TrendingUp,
  Wallet,
} from "lucide-react";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { language } = useLanguage();
=======
  const { t, language } = useLanguage();
>>>>>>> origin/mohamedAbdo
  const { showConfirmation, ConfirmationToastComponent } = useConfirmationToast();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalLoading, setProposalLoading] = useState(false);

  // Proposal form state
  const [price, setPrice] = useState("");
  const [endDate, setEndDate] = useState("");
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
<<<<<<< HEAD
        setError(err?.response?.data?.message || "Failed to load request");
=======
        setError(err?.response?.data?.message || t("failedToLoadRequest"));
>>>>>>> origin/mohamedAbdo
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

    if (!request || !request.budget) {
      return true; // No budget range to validate against
    }

    const budgetRange = parseBudgetRange(request.budget);
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

  const handleSubmitProposal = async (e) => {
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
      return;
    }

    const timeDifference = selectedDate - today;
    const durationDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    try {
      setProposalLoading(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("price", price);
      formData.append("durationDays", durationDays.toString());
      formData.append("notes", notes || "");

      // Append files - backend expects 'documents' field name
      files.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await proposalsAPI.create(id, formData);

      if (response.data.success) {
<<<<<<< HEAD
        toast.success("Proposal submitted successfully! Awaiting admin approval.");
=======
        toast.success(t("proposalSubmittedSuccess"));
>>>>>>> origin/mohamedAbdo
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
        setEndDate("");
        setNotes("");
        setFiles([]);
      }
    } catch (err) {
      console.error("Error submitting proposal:", err);
<<<<<<< HEAD
      console.error("Error response:", err?.response?.data);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to submit proposal";
      toast.error(errorMessage);
=======
      toast.error(err?.response?.data?.message || t("failedToSubmitProposal"));
>>>>>>> origin/mohamedAbdo
    } finally {
      setProposalLoading(false);
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

  // Helper function to get label for legal form
  const getLegalFormLabel = (value) => {
    const legalForms = {
<<<<<<< HEAD
      individual_trader: "Individual Trader",
      sole_partner: "Sole Partner",
      limited_liability: "Limited Liability",
      public_company: "Public Company",
      closed_company: "Closed Company",
      limited_partnership: "Limited Partnership",
      solidarity_company: "Solidarity Company",
=======
      individual_trader: t("individualTrader"),
      sole_partner: t("solePartner"),
      limited_liability: t("limitedLiability"),
      public_company: t("publicCompany"),
      closed_company: t("closedCompany"),
      limited_partnership: t("limitedPartnership"),
      solidarity_company: t("solidarityCompany"),
>>>>>>> origin/mohamedAbdo
    };
    return legalForms[value] || value;
  };

  // Helper function to get label for business activity
  const getBusinessActivityLabel = (value) => {
    const activities = {
<<<<<<< HEAD
      financial_sector: "Financial Sector",
      industrial_sector: "Industrial Sector",
      oil_gas_sector: "Oil & Gas Sector",
      tourism_sector: "Tourism Sector",
      service_sector: "Service Sector",
      construction_sector: "Construction Sector",
      retail_sector: "Retail Sector",
      telecommunications_it: "Telecommunications & IT",
      education_sector: "Education Sector",
      public_sector: "Public Sector",
=======
      financial_sector: t("financialSector"),
      industrial_sector: t("industrialSector"),
      oil_gas_sector: t("oilGasSector"),
      tourism_sector: t("tourismSector"),
      service_sector: t("serviceSector"),
      construction_sector: t("constructionSector"),
      retail_sector: t("retailSector"),
      telecommunications_it: t("telecommunicationsIT"),
      education_sector: t("educationSector"),
      public_sector: t("publicSector"),
>>>>>>> origin/mohamedAbdo
    };
    return activities[value] || value;
  };

  // Format currency in Riyal
  const formatRiyal = (amount) => {
<<<<<<< HEAD
    if (!amount || amount === 0) return "Not specified";
    return `${parseFloat(amount).toLocaleString()} Riyal`;
=======
    if (!amount || amount === 0) return t("notSpecified");
    return `${parseFloat(amount).toLocaleString()} ${t("omr")}`;
>>>>>>> origin/mohamedAbdo
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
<<<<<<< HEAD
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading request...</p>
=======
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t("loadingRequest")}</p>
>>>>>>> origin/mohamedAbdo
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
<<<<<<< HEAD
          <p className="text-red-800 dark:text-red-200">{error || "Request not found"}</p>
=======
          <p className="text-red-800 dark:text-red-200">{error || t("requestNotFound")}</p>
>>>>>>> origin/mohamedAbdo
        </div>
        <button
          onClick={() => navigate("/firm/browse")}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
<<<<<<< HEAD
          Back to Browse
=======
          {t("backToBrowse")}
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
          onClick={() => navigate("/firm/browse")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
<<<<<<< HEAD
            Request Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View request information and submit a proposal
=======
            {t("requestDetails")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("viewRequestInfo")}
>>>>>>> origin/mohamedAbdo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getServiceTitleLabel(request.title, language)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {request.description}
            </p>

            {/* All Project Details in One Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Basic Info */}
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("requestBudget")}</p>
>>>>>>> origin/mohamedAbdo
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(request.budget)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("deadline")}</p>
>>>>>>> origin/mohamedAbdo
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(request.deadline)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.status || "pending"}
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("status")}</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.status || t("pending")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
<<<<<<< HEAD
                  <p className="text-sm text-gray-500 dark:text-gray-400">Attachments</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.attachments?.length || 0} files
=======
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("attachments")}</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {request.attachments?.length || 0} {t("files")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
              </div>

              {/* Legal Form */}
              {request.legalForm && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
<<<<<<< HEAD
                      Legal Form
=======
                      {t("legalForm")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {getLegalFormLabel(request.legalForm)}
                    </p>
                  </div>
                </div>
              )}

              {/* Business Activity */}
              {request.businessActivity && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
<<<<<<< HEAD
                      Business Activity
=======
                      {t("businessActivity")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {getBusinessActivityLabel(request.businessActivity)}
                    </p>
                  </div>
                </div>
              )}

              {/* Capital as per the commercial register */}
              {request.registeredCapital && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
<<<<<<< HEAD
                      Capital as per the commercial register (Riyal)
=======
                      {t("capitalAsPerRegister")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {formatRiyal(request.registeredCapital)}
                    </p>
                  </div>
                </div>
              )}

              {/* Estimated Revenue */}
              {request.estimatedRevenue && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
<<<<<<< HEAD
                      Estimated Revenue (Riyal)
=======
                      {t("estimatedRevenue")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {formatRiyal(request.estimatedRevenue)}
                    </p>
                  </div>
                </div>
              )}

              {/* Estimated Expenses */}
              {request.estimatedExpenses && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
<<<<<<< HEAD
                      Estimated Expenses (Riyal)
=======
                      {t("estimatedExpenses")}
>>>>>>> origin/mohamedAbdo
                    </label>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {formatRiyal(request.estimatedExpenses)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
<<<<<<< HEAD
                  Attachments
=======
                  {t("attachments")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                Submit Proposal
=======
                {t("submitProposal")}
>>>>>>> origin/mohamedAbdo
              </h2>
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
<<<<<<< HEAD
                      Price (OMR) *
=======
                      {t("priceOMR")}
>>>>>>> origin/mohamedAbdo
                      {request.budget && (() => {
                        const budgetRange = parseBudgetRange(request.budget);
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
                    {request.budget && !priceError && price && (() => {
                      const budgetRange = parseBudgetRange(request.budget);
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
                    disabled={proposalLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {proposalLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
<<<<<<< HEAD
                        Submitting...
=======
                        {t("submitting")}
>>>>>>> origin/mohamedAbdo
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                        Submit Proposal
=======
                        {t("submitProposalButton")}
>>>>>>> origin/mohamedAbdo
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProposalForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
<<<<<<< HEAD
                    Cancel
=======
                    {t("cancel")}
>>>>>>> origin/mohamedAbdo
                  </button>
                </div>
              </form>
            </div>
          )}

          {request.hasProposal && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200">
<<<<<<< HEAD
                You have already submitted a proposal for this request.
=======
                {t("alreadySubmittedProposal")}
>>>>>>> origin/mohamedAbdo
              </p>
              {request.proposalId && (
                <button
                  onClick={() => navigate(`/firm/proposals/${request.proposalId}`)}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
<<<<<<< HEAD
                  View your proposal
=======
                  {t("viewYourProposal")}
>>>>>>> origin/mohamedAbdo
                </button>
              )}
            </div>
          )}

          {/* Rejected Proposal Alert */}
          {request.proposal && request.proposal.status === 'rejected' && request.proposal.rejectionReason && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
<<<<<<< HEAD
                    Proposal Rejected
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p className="font-medium mb-1">Rejection Reason:</p>
=======
                    {t("proposalRejected")}
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p className="font-medium mb-1">{t("rejectionReason")}</p>
>>>>>>> origin/mohamedAbdo
                    <p className="whitespace-pre-wrap">{request.proposal.rejectionReason}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
              Client Information
=======
              {t("clientInformation")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
              <p className="text-gray-500 dark:text-gray-400">Client information not available</p>
=======
              <p className="text-gray-500 dark:text-gray-400">{t("clientInfoNotAvailable")}</p>
>>>>>>> origin/mohamedAbdo
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;

