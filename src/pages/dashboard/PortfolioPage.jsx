import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { portfolioAPI } from "../../services/api";
import { toast } from "react-toastify";
import AddPortfolioModal from "../../components/AddPortfolioModal";
import ViewPortfolioModal from "../../components/ViewPortfolioModal";
import {
  Plus,
  Upload,
  Eye,
  Edit,
  Trash2,
  Award,
  FileText,
  Image,
  Download,
  Share2,
} from "lucide-react";

const PortfolioPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("samples");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);
  
  // Map tab IDs to backend types
  const tabTypeMap = {
    samples: 'work',
    cases: 'case',
    certifications: 'cert'
  };
  
  // Fetch portfolio items
  const loadPortfolioItems = async (type = null) => {
    try {
      setLoading(true);
      const backendType = type ? tabTypeMap[type] : null;
      const response = await portfolioAPI.getMyItems(backendType);
      if (response.data.success) {
        setPortfolioItems(response.data.data || []);
      }
    } catch (error) {
      // Only show error if it's not a rate limit
      if (error?.response?.status !== 429) {
        console.error("Error loading portfolio items:", error);
        toast.error("Failed to load portfolio items");
      }
      // Set empty array on error
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Load items when component mounts or tab changes
  useEffect(() => {
    // Add a small delay to avoid rate limiting conflicts
    const timer = setTimeout(() => {
      loadPortfolioItems(activeTab);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  // Filter items by current tab
  const getFilteredItems = () => {
    const backendType = tabTypeMap[activeTab];
    return portfolioItems.filter(item => item.type === backendType);
  };
  
  const filteredItems = getFilteredItems();
  
  // Helper function to get first image file from files array
  const getFirstImageFile = (item) => {
    if (item.files && item.files.length > 0) {
      const imageFile = item.files.find(f => f.type === 'image');
      return imageFile ? imageFile.url : null;
    }
    return null;
  };
  
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const tabs = [
    { id: "samples", label: t("workSamples") },
    { id: "cases", label: t("caseStudies") },
    { id: "certifications", label: t("certifications") },
  ];

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

  const handleAddItem = async (tabType, newItem) => {
    // This will be handled by AddPortfolioModal with API call
    // Just reload the items after successful creation
    await loadPortfolioItems(activeTab);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteItem = async (tabType, itemId) => {
    if (
      window.confirm(
        t("confirmDelete") || "Are you sure you want to delete this item?"
      )
    ) {
      try {
        const response = await portfolioAPI.delete(itemId);
        if (response.data.success) {
          toast.success("Portfolio item deleted successfully");
          await loadPortfolioItems(activeTab);
        } else {
          toast.error(response.data.message || "Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting portfolio item:", error);
        toast.error(error?.response?.data?.message || "Failed to delete item");
      }
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleViewItem = (item) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  const handleUpdateItem = async (tabType, updatedItem) => {
    // This will be handled by AddPortfolioModal with API call
    // Just reload the items after successful update
    setIsEditModalOpen(false);
    setEditingItem(null);
    await loadPortfolioItems(activeTab);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("portfolio")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your work samples, case studies, and certifications
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>
          <button
            onClick={handleOpenModal}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Tab Content */}
      {!loading && activeTab === "samples" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No work samples yet. Add your first one!</p>
            </div>
          ) : (
            filteredItems.map((sample) => {
              const imageUrl = getFirstImageFile(sample);
              const hasImage = imageUrl !== null;
              const hasFiles = sample.files && sample.files.length > 0;
              
              return (
                <div
                  key={sample._id || sample.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <img
                        src={imageUrl}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                    ) : hasFiles ? (
                      <FileText className="w-12 h-12 text-gray-400" />
                    ) : (
                      <Image className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {sample.title}
                      </h3>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleViewItem(sample)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditItem(sample)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("samples", sample._id || sample.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {sample.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      {sample.tags && sample.tags.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                          {sample.tags[0]}
                        </span>
                      )}
                      <span>{formatDate(sample.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {!loading && activeTab === "cases" && (
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No case studies yet. Add your first one!</p>
            </div>
          ) : (
            filteredItems.map((study) => (
            <div
              key={study._id || study.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {study.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewItem(study)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditItem(study)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem("cases", study._id || study.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Client
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {study.client}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Industry
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {study.industry}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {study.duration || 'N/A'}
                  </p>
                </div>
              </div>

              {study.results && study.results.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Key Results
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.results.map((result, index) => (
                      <span
                        key={index}
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            ))
          )}
        </div>
      )}

      {!loading && activeTab === "certifications" && (
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No certifications yet. Add your first one!</p>
            </div>
          ) : (
            filteredItems.map((cert) => (
            <div
              key={cert._id || cert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {cert.issuer}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Issued
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {formatDate(cert.date)}
                        </p>
                      </div>
                      {cert.expiry && (
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Expires
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {formatDate(cert.expiry)}
                          </p>
                        </div>
                      )}
                      {cert.credentialId && (
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Credential ID
                          </p>
                          <p className="text-gray-900 dark:text-white font-mono">
                            {cert.credentialId}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {cert.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        cert.status
                      )}`}
                    >
                      {cert.status}
                    </span>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewItem(cert)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditItem(cert)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteItem("certifications", cert._id || cert.id)
                      }
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      )}

      {/* Add Portfolio Modal */}
      <AddPortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activeTab={activeTab}
        onAddItem={handleAddItem}
      />

      {/* Edit Portfolio Modal */}
      <AddPortfolioModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        activeTab={activeTab}
        onAddItem={handleUpdateItem}
        editingItem={editingItem}
        isEditMode={true}
      />

      {/* View Portfolio Modal */}
      <ViewPortfolioModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        item={viewingItem}
        activeTab={activeTab}
      />
    </div>
  );
};

export default PortfolioPage;
