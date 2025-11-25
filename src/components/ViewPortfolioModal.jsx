import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  X,
  Calendar,
  Award,
  FileText,
  Image,
  Download,
  Share2,
} from "lucide-react";

const ViewPortfolioModal = ({ isOpen, onClose, item, activeTab }) => {
  const { language } = useLanguage();

  // Helper function to get first image file
  const getFirstImageFile = () => {
    if (item?.files && item.files.length > 0) {
      const imageFile = item.files.find(f => f.type === 'image');
      return imageFile ? imageFile.url : null;
    }
    return null;
  };
  
  const imageUrl = getFirstImageFile();

  if (!isOpen || !item) return null;

  const getModalTitle = () => {
    switch (activeTab) {
      case "samples":
        return language === "ar" ? "عرض عينة العمل" : "View Work Sample";
      case "cases":
        return language === "ar" ? "عرض دراسة الحالة" : "View Case Study";
      case "certifications":
        return language === "ar" ? "عرض الشهادة" : "View Certification";
      default:
        return language === "ar" ? "عرض العنصر" : "View Item";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "expiring":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

        {/* Content */}
        <div className="p-6">
          {/* Work Samples View */}
          {activeTab === "samples" && (
            <div className="space-y-6">
              {/* Thumbnail */}
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : item.files && item.files.length > 0 ? (
                  <FileText className="w-16 h-16 text-gray-400" />
                ) : (
                  <Image className="w-16 h-16 text-gray-400" />
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.tags && item.tags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {language === "ar" ? "العلامات" : "Tags"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {language === "ar" ? "تاريخ الإنجاز" : "Date"}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>

                {item.files && item.files.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {language === "ar" ? "الملفات المرفقة" : "Attached Files"}
                    </p>
                    <div className="space-y-2">
                      {item.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">
                              {file.name || `File ${index + 1}`}
                            </span>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Case Studies View */}
          {activeTab === "cases" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "العميل" : "Client"}
                  </p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {item.client}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "الصناعة" : "Industry"}
                  </p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {item.industry}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "المدة" : "Duration"}
                  </p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {item.duration}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  {language === "ar" ? "النتائج الرئيسية" : "Key Results"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.results &&
                    item.results.map((result, index) => (
                      <span
                        key={index}
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm"
                      >
                        {result}
                      </span>
                    ))}
                </div>
              </div>

              {item.files && item.files.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "الملفات المرفقة" : "Attached Files"}
                  </p>
                  <div className="space-y-2">
                    {item.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {file.name || `File ${index + 1}`}
                          </span>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "ar" ? "تاريخ الإنجاز" : "Completion Date"}:{" "}
                  {formatDate(item.date)}
                </p>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === "ar" ? "مشاركة" : "Share"}
                </button>
              </div>
            </div>
          )}

          {/* Certifications View */}
          {activeTab === "certifications" && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  {item.issuer && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {item.issuer}
                    </p>
                  )}
                </div>
                {item.status && (
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                )}
              </div>
              
              {item.description && (
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "تاريخ الإصدار" : "Issue Date"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "تاريخ الانتهاء" : "Expiry Date"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(item.expiry)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "رقم الشهادة" : "Credential ID"}
                  </p>
                  <p className="text-gray-900 dark:text-white font-mono text-lg">
                    {item.credentialId}
                  </p>
                </div>
              </div>

              {item.files && item.files.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {language === "ar" ? "الملفات المرفقة" : "Attached Files"}
                  </p>
                  <div className="space-y-2">
                    {item.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {file.name || `File ${index + 1}`}
                          </span>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  {item.files && item.files.length > 0 && (
                    <a
                      href={item.files[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {language === "ar" ? "تحميل" : "Download"}
                    </a>
                  )}
                  <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === "ar" ? "مشاركة" : "Share"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolioModal;
