import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioAPI } from "../services/api";
import { toast } from "react-toastify";
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
    tags: "",
    date: "",
    files: [],
    // For case studies
    client: "",
    industry: "",
    duration: "",
    results: "",
    // For certifications
    issuer: "",
    expiry: "",
    credentialId: "",
    status: "active",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Map tab IDs to backend types
  const tabTypeMap = {
    samples: 'work',
    cases: 'case',
    certifications: 'cert'
  };

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
      // Format date for input field
      const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };
      
      setFormData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        tags: editingItem.tags ? (Array.isArray(editingItem.tags) ? editingItem.tags.join(", ") : editingItem.tags) : "",
        date: formatDateForInput(editingItem.date),
        files: [],
        client: editingItem.client || "",
        industry: editingItem.industry || "",
        duration: editingItem.duration || "",
        results: editingItem.results ? (Array.isArray(editingItem.results) ? editingItem.results.join(", ") : editingItem.results) : "",
        issuer: editingItem.issuer || "",
        expiry: formatDateForInput(editingItem.expiry),
        credentialId: editingItem.credentialId || "",
        status: editingItem.status || "active",
      });

      // Set image preview from existing files
      if (editingItem.files && editingItem.files.length > 0) {
        const imageFile = editingItem.files.find(f => f.type === 'image');
        if (imageFile) {
          setImagePreview(imageFile.url);
        } else {
          setImagePreview(null);
        }
      } else {
        setImagePreview(null);
      }
    } else {
      // Reset form when not in edit mode
      setFormData({
        title: "",
        description: "",
        tags: "",
        date: "",
        files: [],
        client: "",
        industry: "",
        duration: "",
        results: "",
        issuer: "",
        expiry: "",
        credentialId: "",
        status: "active",
      });
      setImagePreview(null);
    }
  }, [isEditMode, editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    try {
      setSaving(true);
      
      const backendType = tabTypeMap[activeTab];
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('type', backendType);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description || '');
      if (formData.tags) formDataToSend.append('tags', formData.tags);
      if (formData.date) formDataToSend.append('date', formData.date);
      
      // Add type-specific fields
      if (backendType === 'case') {
        if (formData.client) formDataToSend.append('client', formData.client);
        if (formData.industry) formDataToSend.append('industry', formData.industry);
        if (formData.duration) formDataToSend.append('duration', formData.duration);
        if (formData.results) formDataToSend.append('results', formData.results);
      } else if (backendType === 'cert') {
        if (formData.issuer) formDataToSend.append('issuer', formData.issuer);
        if (formData.expiry) formDataToSend.append('expiry', formData.expiry);
        if (formData.credentialId) formDataToSend.append('credentialId', formData.credentialId);
        if (formData.status) formDataToSend.append('status', formData.status);
      }
      
      // Add files
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => {
          formDataToSend.append('documents', file);
        });
      }
      
      let response;
      if (isEditMode && editingItem) {
        // Update existing item
        response = await portfolioAPI.update(editingItem._id || editingItem.id, formDataToSend);
      } else {
        // Create new item
        response = await portfolioAPI.create(formDataToSend);
      }
      
      if (response.data.success) {
        toast.success(isEditMode ? "Portfolio item updated successfully" : "Portfolio item created successfully");
        onAddItem(activeTab, response.data.data);
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          tags: "",
          date: "",
          files: [],
          client: "",
          industry: "",
          duration: "",
          results: "",
          issuer: "",
          expiry: "",
          credentialId: "",
          status: "active",
        });
        setImagePreview(null);
        
        onClose();
      } else {
        toast.error(response.data.message || "Failed to save portfolio item");
      }
    } catch (error) {
      console.error("Error saving portfolio item:", error);
      toast.error(error?.response?.data?.message || "Failed to save portfolio item");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...formData.files, ...files];
    setFormData({ ...formData, files: newFiles });
    
    // Set preview for first image file
    const firstImage = newFiles.find(f => f.type && f.type.startsWith('image/'));
    if (firstImage) {
      if (firstImage instanceof File) {
        setImagePreview(URL.createObjectURL(firstImage));
      } else {
        setImagePreview(firstImage.url);
      }
    } else {
      setImagePreview(null);
    }
  };
  
  const handleRemoveFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
    
    // Update preview if needed
    const firstImage = newFiles.find(f => f.type && f.type.startsWith('image/'));
    if (firstImage) {
      if (firstImage instanceof File) {
        setImagePreview(URL.createObjectURL(firstImage));
      } else {
        setImagePreview(firstImage.url);
      }
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
                  {language === "ar" ? "العلامات (مفصولة بفواصل)" : "Tags (comma-separated)"}
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === "ar" ? "مثال: Financial Statements, Tax Services" : "e.g., Financial Statements, Tax Services"}
                />
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
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "ar"
                        ? "انقر لرفع الملفات"
                        : "Click to upload files"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PDF, DOC, XLS, JPG (Max 10MB each)
                    </span>
                  </label>
                </div>
                
                {/* Show selected files */}
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === "ar" ? "الملفات المحددة:" : "Selected files:"}
                    </p>
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {file.name || file.url || `File ${index + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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

          {/* File Upload for Case Studies and Certifications */}
          {(activeTab === "cases" || activeTab === "certifications") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === "ar" ? "رفع الملفات" : "Upload Files"}
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
                  id="file-upload-other"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload-other"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === "ar"
                      ? "انقر لرفع الملفات"
                      : "Click to upload files"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF, DOC, XLS, JPG (Max 10MB each)
                  </span>
                </label>
              </div>
              
              {/* Show selected files */}
              {formData.files && formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === "ar" ? "الملفات المحددة:" : "Selected files:"}
                  </p>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {file.name || file.url || `File ${index + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {language === "ar" ? "جاري الحفظ..." : "Saving..."}
                </>
              ) : (
                isEditMode
                  ? language === "ar"
                    ? "تحديث"
                    : "Update"
                  : language === "ar"
                  ? "إضافة"
                  : "Add"
              )}
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
