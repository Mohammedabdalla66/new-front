import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { X, Upload, Calendar } from "lucide-react";
import { categories, budgetRanges, contactMethods } from "../data/mockData";

/** Props: { isOpen, onClose } */
const AddProjectModal = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    budget: "",
    deadline: "",
    description: "",
    contactMethod: "",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Project submitted:", formData);

    // Show success message
    alert(
      language === "ar"
        ? "تم إرسال المشروع بنجاح!"
        : "Project submitted successfully!"
    );

    // Reset form and close modal
    setFormData({
      title: "",
      category: "",
      budget: "",
      deadline: "",
      description: "",
      contactMethod: "",
      file: null,
    });
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("addProjectTitle")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("projectTitle")}
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={
                language === "ar" ? "أدخل عنوان المشروع" : "Enter project title"
              }
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("category")}
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {language === "ar" ? "اختر التصنيف" : "Select category"}
              </option>
              {categories[language].map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("budget")}
            </label>
            <select
              id="budget"
              required
              value={formData.budget}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, budget: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {language === "ar" ? "اختر الميزانية" : "Select budget"}
              </option>
              {budgetRanges[language].map((budget, index) => (
                <option key={index} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("deadline")}
            </label>
            <div className="relative">
              <input
                type="date"
                id="deadline"
                required
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("description")}
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={
                language === "ar"
                  ? "اشرح تفاصيل مشروعك"
                  : "Describe your project details"
              }
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("attachFile")}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.file
                    ? formData.file.name
                    : language === "ar"
                    ? "انقر لإرفاق ملف"
                    : "Click to attach file"}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PDF, DOC, XLS (Max 10MB)
                </span>
              </label>
            </div>
          </div>

          {/* Contact Method */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("contactMethod")}
            </label>
            <select
              id="contact"
              required
              value={formData.contactMethod}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactMethod: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {language === "ar"
                  ? "اختر طريقة التواصل"
                  : "Select contact method"}
              </option>
              {contactMethods[language].map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t("submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
