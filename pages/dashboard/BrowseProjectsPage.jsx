import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Bookmark,
  Eye,
  Send,
} from "lucide-react";

const BrowseProjectsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "bookkeeping", label: "Bookkeeping" },
    { value: "tax", label: "Tax Services" },
    { value: "audit", label: "Auditing" },
    { value: "consulting", label: "Financial Consulting" },
    { value: "payroll", label: "Payroll" },
  ];

  const projects = [
    {
      id: 1,
      title: "Monthly Bookkeeping Services for Restaurant Chain",
      description:
        "We need an experienced accountant to handle monthly bookkeeping for our 5-location restaurant chain. Must be familiar with restaurant accounting and inventory management.",
      client: "FoodCorp Restaurants",
      location: "New York, NY",
      budget: "$2,000 - $3,000",
      duration: "3 months",
      posted: "2 hours ago",
      proposals: 12,
      category: "bookkeeping",
      skills: ["QuickBooks", "Restaurant Accounting", "Inventory Management"],
      rating: 4.8,
      verified: true,
    },
    {
      id: 2,
      title: "Tax Filing and Compliance for Tech Startup",
      description:
        "Looking for a CPA to handle our annual tax filing and ongoing compliance. We are a Series A funded startup with complex equity structures.",
      client: "TechStart Inc.",
      location: "San Francisco, CA",
      budget: "$5,000 - $8,000",
      duration: "6 months",
      posted: "4 hours ago",
      proposals: 8,
      category: "tax",
      skills: ["CPA", "Startup Tax", "Equity Compensation"],
      rating: 4.9,
      verified: true,
    },
    {
      id: 3,
      title: "Financial Audit for Manufacturing Company",
      description:
        "Annual financial audit required for our manufacturing company. Must have experience with manufacturing accounting and inventory valuation.",
      client: "Manufacturing Co.",
      location: "Chicago, IL",
      budget: "$10,000 - $15,000",
      duration: "2 months",
      posted: "1 day ago",
      proposals: 15,
      category: "audit",
      skills: ["Financial Audit", "Manufacturing", "Inventory Valuation"],
      rating: 4.7,
      verified: true,
    },
    {
      id: 4,
      title: "Financial Consulting for E-commerce Business",
      description:
        "Need financial consulting to optimize our e-commerce operations and improve cash flow management. Experience with online retail preferred.",
      client: "E-commerce Solutions",
      location: "Austin, TX",
      budget: "$3,000 - $5,000",
      duration: "4 months",
      posted: "2 days ago",
      proposals: 6,
      category: "consulting",
      skills: ["Financial Consulting", "E-commerce", "Cash Flow"],
      rating: 4.6,
      verified: false,
    },
    {
      id: 5,
      title: "Payroll Setup and Management",
      description:
        "Looking for an accountant to set up and manage payroll for our 50-employee company. Must be familiar with multi-state payroll requirements.",
      client: "Service Corp",
      location: "Miami, FL",
      budget: "$1,500 - $2,500",
      duration: "1 month",
      posted: "3 days ago",
      proposals: 20,
      category: "payroll",
      skills: ["Payroll Management", "Multi-state", "HR Integration"],
      rating: 4.5,
      verified: true,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.posted) - new Date(a.posted);
      case "budget":
        return (
          parseInt(b.budget.split("$")[1].replace(",", "")) -
          parseInt(a.budget.split("$")[1].replace(",", ""))
        );
      case "proposals":
        return b.proposals - a.proposals;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("browseProjects")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find and apply for accounting projects that match your skills
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="budget">Highest Budget</option>
              <option value="proposals">Most Proposals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.client}
                        {project.verified && (
                          <span className="ml-1 text-blue-500">✓</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.posted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.rating}
                      </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {project.budget}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.proposals} proposals
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="flex items-center px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <Send className="w-4 h-4 mr-1" />
                  {t("applyForProject")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria or check back later for new
            projects.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseProjectsPage;
