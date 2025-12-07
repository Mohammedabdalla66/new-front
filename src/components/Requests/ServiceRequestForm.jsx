import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { requestsAPI } from "../../services/api";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useConfirmationToast } from "../ui/ConfirmationToast";

export const ServiceRequestForm = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { showConfirmation, ConfirmationToastComponent } = useConfirmationToast();
  const editRequest = location.state?.editRequest;
  const isEditMode = !!editRequest && editRequest.status === "rejected";
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [legalForm, setLegalForm] = useState(""); // New state for legal form
  const [businessActivity, setBusinessActivity] = useState(""); // New state for business activity
  const [registeredCapital, setRegisteredCapital] = useState(""); // New state for registered capital
  const [estimatedRevenue, setEstimatedRevenue] = useState(""); // New state for estimated revenue
  const [estimatedExpenses, setEstimatedExpenses] = useState(""); // New state for estimated expenses
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form when editing or when service is preselected from Hero search
  useEffect(() => {
    if (isEditMode && editRequest) {
      setTitle(editRequest.title || "");
      setDescription(editRequest.description || "");
      setBudget(editRequest.budget || "");
      setDeadline(editRequest.deadline ? new Date(editRequest.deadline).toISOString().split('T')[0] : "");
      setLegalForm(editRequest.legalForm || "");
      setBusinessActivity(editRequest.businessActivity || "");
      setRegisteredCapital(editRequest.registeredCapital || "");
      setEstimatedRevenue(editRequest.estimatedRevenue || "");
      setEstimatedExpenses(editRequest.estimatedExpenses || "");
    } else if (location.state?.preselectedService) {
      // Pre-fill service title when coming from Hero search
      setTitle(location.state.preselectedService);
    }
  }, [isEditMode, editRequest, location.state]);

  // Legal form options
  const LEGAL_FORM_OPTIONS = [
    {
      value: "",
      label:
        language === "ar" ? "اختر الشكل القانوني للشركة" : "Select Legal Form",
    },
    {
      value: "individual_trader",
      label: language === "ar" ? "تاجر فرد" : "Individual Trader",
    },
    {
      value: "sole_partner",
      label: language === "ar" ? "الشريك الواحد" : "Sole Partner",
    },
    {
      value: "limited_liability",
      label: language === "ar" ? "محدودية المسؤولية" : "Limited Liability",
    },
    {
      value: "public_company",
      label: language === "ar" ? "مساهمة عامة" : "Public Company",
    },
    {
      value: "closed_company",
      label: language === "ar" ? "مساهمة مغلقة" : "Closed Company",
    },
    {
      value: "limited_partnership",
      label: language === "ar" ? "توصية" : "Limited Partnership",
    },
    {
      value: "solidarity_company",
      label: language === "ar" ? "تضامنية" : "Solidarity Company",
    },
  ];

  // Business activity options
  const BUSINESS_ACTIVITY_OPTIONS = [
    {
      value: "",
      label:
        language === "ar" ? "اختر النشاط التجاري" : "Select Business Activity",
    },
    {
      value: "financial_sector",
      label: language === "ar" ? "القطاع المالي" : "Financial Sector",
    },
    {
      value: "industrial_sector",
      label: language === "ar" ? "القطاع الصناعي" : "Industrial Sector",
    },
    {
      value: "oil_gas_sector",
      label: language === "ar" ? "قطاع النفط والغاز" : "Oil & Gas Sector",
    },
    {
      value: "tourism_sector",
      label: language === "ar" ? "القطاع السياحي" : "Tourism Sector",
    },
    {
      value: "service_sector",
      label: language === "ar" ? "القطاع الخدمي" : "Service Sector",
    },
    {
      value: "construction_sector",
      label: language === "ar" ? "البناء والإنشاءات" : "Construction Sector",
    },
    {
      value: "retail_sector",
      label: language === "ar" ? "قطاع التجزئة" : "Retail Sector",
    },
    {
      value: "telecommunications_it",
      label:
        language === "ar"
          ? "الاتصالات وتقنية المعلومات"
          : "Telecommunications & IT",
    },
    {
      value: "education_sector",
      label: language === "ar" ? "التعليم" : "Education Sector",
    },
    {
      value: "public_sector",
      label: language === "ar" ? "قطاع عام" : "Public Sector",
    },
  ];

  // Service title options - 15 options
  const TITLE_OPTIONS = [
    {
      value: "",
      label:
        language === "ar" ? "اختر عنوان الخدمة" : "Select Service Title",
    },
    {
      value: "option_1",
      label: language === "ar" ? "الاستشارات المالية" : "Financial Consultancy",
    },
    {
      value: "option_2",
      label: language === "ar" ? "إستشارات الحوكمة وإدارة المخاطر ": "Governance Services",
    },
    {
      value: "option_3",
      label: language === "ar" ? "التقييم التجاري للشركات" : "Business Valuation services",
    },
    {
      value: "option_4",
      label: language === "ar" ? "التدقيق الخارجي وعمل الميزانيات السنوية " : "External Auditing",
    },
    {
      value: "option_5",
      label: language === "ar" ? "التدقيق الداخلي" : "Internal Auditing",
    },
    {
      value: "option_6",
      label: language === "ar" ? "مسك الدفاتر المحاسبية " : "Accounting bookkeeping",
    },
    {
      value: "option_7",
      label: language === "ar" ? " دراسات الجدوى الإقتصادية " : "Economic Feasibility Studies",
    },
    {
      value: "option_8",
      label: language === "ar" ? " تقارير الملاءة المالية" : "Financial Solvency Reports",
    },
    {
      value: "option_9",
      label: language === "ar" ? " تأسيس الشركات وادارة الأعمال " : "Business Setup",
    },
    {
      value: "option_10",
      label: language === "ar" ? "خدمات الضرائب وتقييم ضريبة القيمة المضافة" : "Tax and VAT Assessment Services",
    },
    {
      value: "option_11",
      label: language === "ar" ? "التصفيات وإغلاق السجل التجاري " : "Liquidation of the companies ",
    },
    {
      value: "option_12",
      label: language === "ar" ? "المحاسبة الجنائية والتحقيق في الاحتيال المالي وتقارير إساءة الأمانة" : "Forensic Accounting, Financial Fraud Investigations, and Reports of Abuse of Trust",
    },
    {
      value: "option_13",
      label: language === "ar" ? " تدقيق الامتثال والأداء " : "ISO Compliance Services ",
    },
    {
      value: "option_14",
      label: language === "ar" ? "خدمات أخرى" : "Other Services",
    },
  ];

  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  const handleSubmit = async (e) => {
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

    setLoading(true);
    setError("");

    try {
      // If files are present, use FormData for multipart upload to Cloudinary
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("budget", budget || "");
        formData.append("legalForm", legalForm || "");
        formData.append("businessActivity", businessActivity || "");
        formData.append("registeredCapital", registeredCapital || "");
        formData.append("estimatedRevenue", estimatedRevenue || "");
        formData.append("estimatedExpenses", estimatedExpenses || "");
        if (deadline) {
          formData.append("deadline", deadline);
        }

        // Append files - backend expects 'documents' field name from multer config
        files.forEach((file) => {
          formData.append("documents", file);
        });

        // Log FormData for debugging (in development only)
        if (process.env.NODE_ENV === "development") {
          console.log("FormData entries:");
          for (let pair of formData.entries()) {
            if (pair[1] instanceof File) {
              console.log(
                `${pair[0]}: [File] ${pair[1].name} (${pair[1].size} bytes)`
              );
            } else {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
          }
        }

        if (isEditMode && editRequest?._id) {
          // Update existing request
          const response = await requestsAPI.update(editRequest._id, formData);
          toast.success(t("requestUpdatedSuccess") || "Request updated successfully!");
        } else {
          // Create new request
          const response = await requestsAPI.createWithFiles(formData);
          toast.success(t("requestSubmittedSuccess"));
        }
        setSubmitted(true);

        // Redirect to Requests page after 1.5 seconds
        setTimeout(() => {
          navigate("/client/requests");
        }, 1500);
      } else {
        // No files - use JSON payload
        const payload = {
          title,
          description,
          budget: budget || "", // Send budget range as string
          legalForm: legalForm || "",
          businessActivity: businessActivity || "",
          registeredCapital: registeredCapital || "",
          estimatedRevenue: estimatedRevenue || "",
          estimatedExpenses: estimatedExpenses || "",
          deadline: deadline || undefined,
        };

        if (isEditMode && editRequest?._id) {
          // Update existing request
          const response = await requestsAPI.update(editRequest._id, payload);
          toast.success(t("requestUpdatedSuccess") || "Request updated successfully!");
        } else {
          // Create new request
          const response = await requestsAPI.create(payload);
          toast.success(t("requestSubmittedSuccess"));
        }
        setSubmitted(true);

        // Redirect to Requests page after 1.5 seconds
        setTimeout(() => {
          navigate("/client/requests");
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        t("failedToSubmit");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <ConfirmationToastComponent />
      <div className="mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? (t("updateServiceRequest") || "Update Service Request") : t("createServiceRequest")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
            {isEditMode 
              ? (t("updateRequestDetails") || "Update your request details and resubmit for review.")
              : t("provideDetails")}
          </p>
        </div>

        {/* Edit Mode Banner */}
        {isEditMode && editRequest?.rejectionReason && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-3 text-xs sm:text-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {t("previousRejection") || "Previous Rejection Reason"}
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p className="whitespace-pre-wrap">{editRequest.rejectionReason}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-3 text-xs sm:text-sm text-green-800 dark:text-green-200">
            {t("requestSubmittedSuccess")} {t("redirectingToRequests")}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-xs sm:text-sm text-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5"
        >
          {/* Service Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("serviceTitle")}
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {TITLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("description")}
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("attachments")}
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleFilesChange}
              className="block w-full text-xs sm:text-sm text-gray-700 dark:text-gray-300 file:mr-2 sm:file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900/20 file:px-2 sm:file:px-4 file:py-1 sm:file:py-2 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
            />
            {files.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {files.map((f, i) => (
                  <li key={i} className="truncate">
                    {f.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Legal Form and Business Activity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("legalFormLabel")}
              </label>
              <select
                value={legalForm}
                onChange={(e) => setLegalForm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {LEGAL_FORM_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("businessActivityLabel")}
            </label>
              <select
                value={businessActivity}
                onChange={(e) => setBusinessActivity(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {BUSINESS_ACTIVITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Registered Capital, Estimated Revenue, and Estimated Expenses */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("registeredCapitalLabel")}
              </label>
              <input
                type="number"
                value={registeredCapital}
                onChange={(e) => setRegisteredCapital(e.target.value)}
                placeholder={t("enterCapital")}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">
                {t("estimatedRevenueLabel")}
              </label>
              <input
                type="number"
                value={estimatedRevenue}
                onChange={(e) => setEstimatedRevenue(e.target.value)}
                placeholder={t("enterRevenue")}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">
                {t("estimatedExpensesLabel")}
              </label>
              <input
                type="number"
                value={estimatedExpenses}
                onChange={(e) => setEstimatedExpenses(e.target.value)}
                placeholder={t("enterExpenses")}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Budget and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("budgetRangeLabel")}
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t("selectBudgetRange")}</option>
                  <option value="25-50">25 - 50 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="50-100">50 - 100 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="100-250">200 - 250 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="250-500">250 - 500 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="500-1000">500 - 2000 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="1000-2500">2000 - 2500 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="2500-5000">2500 - 5000 {language === "ar" ? "ريال" : "Riyal"}</option>
                <option value="5000-10000">5000 - 20000 {language === "ar" ? "ریال" : "Riyal"}</option>
                <option value="10000+">20000 - {language === "ar" ? "أكثر من" : "More than"} 20000 {language === "ar" ? "ریال" : "Riyal"}</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("selectEstimatedBudget")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("deadlineLabel")}
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("selectTargetDate")}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm sm:text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t("submitting")}
                </>
              ) : (
                t("submitRequest")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
