import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
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
  const [workSamples, setWorkSamples] = useState([
    {
      id: 1,
      title: "Financial Statements - ABC Company",
      description:
        "Complete set of financial statements including balance sheet, income statement, and cash flow statement for Q4 2024.",
      category: "Financial Statements",
      date: "2024-12-15",
      thumbnail: "/api/placeholder/300/200",
      type: "document",
    },
    {
      id: 2,
      title: "Tax Filing Documentation",
      description:
        "Comprehensive tax filing documentation and compliance reports for a medium-sized manufacturing company.",
      category: "Tax Services",
      date: "2024-12-10",
      thumbnail: "/api/placeholder/300/200",
      type: "document",
    },
    {
      id: 3,
      title: "Audit Report - XYZ Corp",
      description:
        "Detailed audit report with findings and recommendations for improving internal controls.",
      category: "Auditing",
      date: "2024-12-05",
      thumbnail: "/api/placeholder/300/200",
      type: "document",
    },
  ]);

  const [caseStudies, setCaseStudies] = useState([
    {
      id: 1,
      title: "Streamlining Financial Processes for Tech Startup",
      description:
        "Helped a growing tech startup implement efficient accounting systems and processes, resulting in 40% time savings.",
      client: "TechStart Inc.",
      industry: "Technology",
      duration: "3 months",
      results: ["40% time savings", "Improved accuracy", "Better compliance"],
      date: "2024-11-20",
    },
    {
      id: 2,
      title: "Tax Optimization for Manufacturing Company",
      description:
        "Developed tax optimization strategies for a manufacturing company, resulting in $50,000 annual savings.",
      client: "Manufacturing Co.",
      industry: "Manufacturing",
      duration: "6 months",
      results: [
        "$50,000 annual savings",
        "Improved cash flow",
        "Better tax compliance",
      ],
      date: "2024-10-15",
    },
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Certified Public Accountant (CPA)",
      issuer: "American Institute of CPAs",
      date: "2020-06-15",
      expiry: "2025-06-15",
      credentialId: "CPA-12345",
      status: "active",
    },
    {
      id: 2,
      name: "Chartered Financial Analyst (CFA)",
      issuer: "CFA Institute",
      date: "2019-08-20",
      expiry: "2025-08-20",
      credentialId: "CFA-67890",
      status: "active",
    },
    {
      id: 3,
      name: "QuickBooks ProAdvisor",
      issuer: "Intuit",
      date: "2021-03-10",
      expiry: "2024-03-10",
      credentialId: "QB-54321",
      status: "expiring",
    },
  ]);

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

  const handleAddItem = (tabType, newItem) => {
    switch (tabType) {
      case "samples":
        setWorkSamples((prev) => [...prev, newItem]);
        break;
      case "cases":
        setCaseStudies((prev) => [...prev, newItem]);
        break;
      case "certifications":
        setCertifications((prev) => [...prev, newItem]);
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteItem = (tabType, itemId) => {
    if (
      window.confirm(
        t("confirmDelete") || "Are you sure you want to delete this item?"
      )
    ) {
      switch (tabType) {
        case "samples":
          setWorkSamples((prev) => prev.filter((item) => item.id !== itemId));
          break;
        case "cases":
          setCaseStudies((prev) => prev.filter((item) => item.id !== itemId));
          break;
        case "certifications":
          setCertifications((prev) =>
            prev.filter((item) => item.id !== itemId)
          );
          break;
        default:
          break;
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

  const handleUpdateItem = (tabType, updatedItem) => {
    switch (tabType) {
      case "samples":
        setWorkSamples((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        break;
      case "cases":
        setCaseStudies((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        break;
      case "certifications":
        setCertifications((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        break;
      default:
        break;
    }
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingItem(null);
  };

  // Clean up image URLs when component unmounts
  useEffect(() => {
    return () => {
      workSamples.forEach((sample) => {
        if (
          sample.file &&
          sample.file.type &&
          sample.file.type.startsWith("image/")
        ) {
          URL.revokeObjectURL(URL.createObjectURL(sample.file));
        }
      });
    };
  }, [workSamples]);

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

      {/* Tab Content */}
      {activeTab === "samples" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workSamples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {sample.file &&
                sample.file.type &&
                sample.file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(sample.file)}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                ) : sample.thumbnail &&
                  sample.thumbnail !== "/api/placeholder/300/200" ? (
                  <img
                    src={sample.thumbnail}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                ) : sample.type === "document" ? (
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
                      onClick={() => handleDeleteItem("samples", sample.id)}
                      className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {sample.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {sample.category}
                  </span>
                  <span>{sample.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "cases" && (
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
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
                    onClick={() => handleDeleteItem("cases", study.id)}
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
                    {study.duration}
                  </p>
                </div>
              </div>

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
            </div>
          ))}
        </div>
      )}

      {activeTab === "certifications" && (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {cert.issuer}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Issued
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {cert.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Expires
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {cert.expiry}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Credential ID
                        </p>
                        <p className="text-gray-900 dark:text-white font-mono">
                          {cert.credentialId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      cert.status
                    )}`}
                  >
                    {cert.status}
                  </span>
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
                        handleDeleteItem("certifications", cert.id)
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
          ))}
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
