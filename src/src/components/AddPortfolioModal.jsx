import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { X, Upload, Calendar, Award, FileText, Image } from "lucide-react";

const AddPortfolioModal = ({
  isOpen,
  onClose,
  activeTab,
  onAddItem,
  editingItem = null,
  isEditMode = false,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    file: null,
    // For case studies
    client: "",
    industry: "",
    duration: "",
    results: "",
    // For certifications
    issuer: "",
    expiry: "",
    credentialId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const portfolioCategories = {
    en: [
      "Financial Statements",
      "Tax Services",
      "Auditing",
      "Consulting",
      "Other",
    ],
    ar: ["البيانات المالية", "خدمات الضرائب", "التدقيق", "الاستشارات", "أخرى"],
  };

  const industries = {
    en: [
      "Technology",
      "Manufacturing",
      "Healthcare",
      "Finance",
      "Retail",
      "Other",
    ],
    ar: [
      "التكنولوجيا",
      "التصنيع",
      "الرعاية الصحية",
      "التمويل",
      "التجارة",
      "أخرى",
    ],
  };

  // Load editing item data when in edit mode
  useEffect(() => {
    if (isEditMode && editingItem) {
      setFormData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        category: editingItem.category || "",
        date: editingItem.date || "",
        file: editingItem.file || null,
        client: editingItem.client || "",
        industry: editingItem.industry || "",
        duration: editingItem.duration || "",
        results: editingItem.results ? editingItem.results.join(", ") : "",
        issuer: editingItem.issuer || "",
        expiry: editingItem.expiry || "",
        credentialId: editingItem.credentialId || "",
      });

      // Set image preview for editing
      if (
        editingItem.file &&
        editingItem.file.type &&
        editingItem.file.type.startsWith("image/")
      ) {
        setImagePreview(URL.createObjectURL(editingItem.file));
      } else {
        setImagePreview(null);
      }
    } else {
      // Reset form when not in edit mode
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        file: null,
        client: "",
        industry: "",
        duration: "",
        results: "",
        issuer: "",
        expiry: "",
        credentialId: "",
      });
      setImagePreview(null);
    }
  }, [isEditMode, editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: isEditMode ? editingItem.id : Date.now(), // Keep existing ID for edit mode
      ...formData,
      date: formData.date || new Date().toISOString().split("T")[0],
      results: formData.results
        ? formData.results.split(",").map((r) => r.trim())
        : [],
      status:
        activeTab === "certifications"
          ? editingItem?.status || "active"
          : undefined,
      type: activeTab === "samples" ? "document" : undefined,
    };

    onAddItem(activeTab, newItem);

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      date: "",
      file: null,
      client: "",
      industry: "",
      duration: "",
      results: "",
      issuer: "",
      expiry: "",
      credentialId: "",
    });

    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));

    // Create image preview if it's an image file
    if (file && file.type && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Clean up image preview when modal closes
  useEffect(() => {
    if (!isOpen && imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  }, [isOpen, imagePreview]);

  if (!isOpen) return null;

  const getModalTitle = () => {
    if (isEditMode) {
      switch (activeTab) {
        case "samples":
          return language === "ar" ? "تعديل عينة العمل" : "Edit Work Sample";
        case "cases":
          return language === "ar" ? "تعديل دراسة الحالة" : "Edit Case Study";
        case "certifications":
          return language === "ar" ? "تعديل الشهادة" : "Edit Certification";
        default:
          return language === "ar" ? "تعديل العنصر" : "Edit Item";
      }
    } else {
      switch (activeTab) {
        case "samples":
          return language === "ar"
            ? "إضافة عينة عمل جديدة"
            : "Add New Work Sample";
        case "cases":
          return language === "ar"
            ? "إضافة دراسة حالة جديدة"
            : "Add New Case Study";
        case "certifications":
          return language === "ar"
            ? "إضافة شهادة جديدة"
            : "Add New Certification";
        default:
          return language === "ar" ? "إضافة عنصر جديد" : "Add New Item";
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === "ar" ? "العنوان" : "Title"}
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={language === "ar" ? "أدخل العنوان" : "Enter title"}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === "ar" ? "الوصف" : "Description"}
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={
                language === "ar" ? "أدخل الوصف" : "Enter description"
              }
            />
          </div>

          {/* Work Samples specific fields */}
          {activeTab === "samples" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "التصنيف" : "Category"}
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">
                    {language === "ar" ? "اختر التصنيف" : "Select category"}
                  </option>
                  {portfolioCategories[language].map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "تاريخ الإنجاز" : "Completion Date"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "رفع الملف" : "Upload File"}
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.file
                        ? formData.file.name
                        : language === "ar"
                        ? "انقر لرفع الملف"
                        : "Click to upload file"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PDF, DOC, XLS, JPG (Max 10MB)
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Case Studies specific fields */}
          {activeTab === "cases" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "العميل" : "Client"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) =>
                      handleInputChange("client", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={
                      language === "ar" ? "اسم العميل" : "Client name"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "الصناعة" : "Industry"}
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">
                      {language === "ar" ? "اختر الصناعة" : "Select industry"}
                    </option>
                    {industries[language].map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "المدة" : "Duration"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={
                    language === "ar" ? "مثال: 3 أشهر" : "e.g., 3 months"
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "النتائج الرئيسية" : "Key Results"}
                </label>
                <textarea
                  rows={3}
                  value={formData.results}
                  onChange={(e) => handleInputChange("results", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={
                    language === "ar"
                      ? "أدخل النتائج مفصولة بفواصل"
                      : "Enter results separated by commas"
                  }
                />
              </div>
            </>
          )}

          {/* Certifications specific fields */}
          {activeTab === "certifications" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "الجهة المانحة" : "Issuer"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={(e) => handleInputChange("issuer", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={
                    language === "ar"
                      ? "اسم الجهة المانحة"
                      : "Issuing organization"
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "تاريخ الإصدار" : "Issue Date"}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "تاريخ الانتهاء" : "Expiry Date"}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.expiry}
                      onChange={(e) =>
                        handleInputChange("expiry", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "رقم الشهادة" : "Credential ID"}
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) =>
                    handleInputChange("credentialId", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                  placeholder={
                    language === "ar" ? "رقم الشهادة" : "Credential ID"
                  }
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {isEditMode
                ? language === "ar"
                  ? "تحديث"
                  : "Update"
                : language === "ar"
                ? "إضافة"
                : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              {language === "ar" ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolioModal;
