import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  FileText,
  Users,
  Shield,
  CreditCard,
} from "lucide-react";

const HelpSupportPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  });

  const faqCategories = [
    {
      id: "getting-started",
      title: t("gettingStarted"),
      icon: HelpCircle,
      questions: [
        {
          id: 1,
          question: t("providerFaqQ1"),
          answer: t("providerFaqA1"),
        },
        {
          id: 2,
          question: t("providerFaqQ2"),
          answer: t("providerFaqA2"),
        },
        {
          id: 3,
          question: t("providerFaqQ3"),
          answer: t("providerFaqA3"),
        },
      ],
    },
    {
      id: "projects",
      title: t("projectsProposals"),
      icon: FileText,
      questions: [
        {
          id: 4,
          question: t("providerFaqQ4"),
          answer: t("providerFaqA4"),
        },
        {
          id: 5,
          question: t("providerFaqQ5"),
          answer: t("providerFaqA5"),
        },
        {
          id: 6,
          question: t("providerFaqQ6"),
          answer: t("providerFaqA6"),
        },
      ],
    },
    {
      id: "payments",
      title: t("paymentsBilling"),
      icon: CreditCard,
      questions: [
        {
          id: 7,
          question: t("providerFaqQ7"),
          answer: t("providerFaqA7"),
        },
        {
          id: 8,
          question: t("providerFaqQ8"),
          answer: t("providerFaqA8"),
        },
        {
          id: 9,
          question: t("providerFaqQ9"),
          answer: t("providerFaqA9"),
        },
      ],
    },
    {
      id: "account",
      title: t("accountSecurity"),
      icon: Shield,
      questions: [
        {
          id: 10,
          question: t("providerFaqQ10"),
          answer: t("providerFaqA10"),
        },
        {
          id: 11,
          question: t("providerFaqQ11"),
          answer: t("providerFaqA11"),
        },
        {
          id: 12,
          question: t("providerFaqQ12"),
          answer: t("providerFaqA12"),
        },
      ],
    },
  ];

  const supportCategories = [
    t("generalInquiry"),
    t("technicalIssue"),
    t("paymentProblem"),
    t("accountIssue"),
    t("projectDispute"),
    t("featureRequest"),
  ];

  const priorityLevels = [
    { value: "low", label: t("low") },
    { value: "medium", label: t("medium") },
    { value: "high", label: t("high") },
    { value: "urgent", label: t("urgent") },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const toggleFAQ = (questionId) => {
    setExpandedFAQ(expandedFAQ === questionId ? null : questionId);
  };

  const handleSupportFormChange = (field, value) => {
    setSupportForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    // Handle support form submission
    console.log("Support form submitted:", supportForm);
    toast.success(t("supportRequestSubmitted"));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("helpSupport")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t("findAnswers")}</p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchFAQ")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t("faq")}
            </h2>

            <div className="space-y-6">
              {filteredFAQs.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id}>
                    <div className="flex items-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {category.questions.map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {faq.question}
                            </span>
                            {expandedFAQ === faq.id ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          {expandedFAQ === faq.id && (
                            <div className="px-4 pb-3">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t("supportForm")}
            </h2>

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("subject")}
                </label>
                <input
                  type="text"
                  value={supportForm.subject}
                  onChange={(e) =>
                    handleSupportFormChange("subject", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("briefDescriptionOfIssue")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("category")}
                </label>
                <select
                  value={supportForm.category}
                  onChange={(e) =>
                    handleSupportFormChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{t("selectCategory")}</option>
                  {supportCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("priority")}
                </label>
                <select
                  value={supportForm.priority}
                  onChange={(e) =>
                    handleSupportFormChange("priority", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("message")}
                </label>
                <textarea
                  rows={4}
                  value={supportForm.message}
                  onChange={(e) =>
                    handleSupportFormChange("message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("provideDetailedInformation")}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {t("submitSupportRequest")}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("contactInformation")}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("emailSupport")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    support@accountingplatform.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("phoneSupport")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("supportHours")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mon-Fri: 9AM-6PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
