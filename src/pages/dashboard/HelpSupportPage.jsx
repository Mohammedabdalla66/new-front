import React, { useState } from "react";
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
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          id: 1,
          question: "How do I create my first project proposal?",
          answer:
            'To create your first project proposal, go to the "Browse Projects" page, find a project that matches your skills, and click "Apply for Project". Fill out the proposal form with your approach, timeline, and pricing.',
        },
        {
          id: 2,
          question: "What information should I include in my profile?",
          answer:
            "Your profile should include your professional title, experience, skills, certifications, and a compelling bio that highlights your expertise. Upload work samples and case studies to showcase your capabilities.",
        },
        {
          id: 3,
          question: "How do I set my hourly rate?",
          answer:
            "You can set your hourly rate in your profile settings. Consider your experience, market rates, and the complexity of projects when determining your pricing.",
        },
      ],
    },
    {
      id: "projects",
      title: "Projects & Proposals",
      icon: FileText,
      questions: [
        {
          id: 4,
          question: "How long do clients have to respond to my proposal?",
          answer:
            'Clients typically have 7-14 days to respond to proposals. You can check the status of your proposals in the "My Requests" section of your dashboard.',
        },
        {
          id: 5,
          question: "Can I withdraw a proposal after submitting it?",
          answer:
            'Yes, you can withdraw a proposal before the client responds. Go to "My Requests", find the proposal, and click "Withdraw".',
        },
        {
          id: 6,
          question: "What happens if a client doesn't respond to my proposal?",
          answer:
            "If a client doesn't respond within the specified timeframe, the proposal will automatically expire and you can apply to other projects.",
        },
      ],
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: CreditCard,
      questions: [
        {
          id: 7,
          question: "How do I get paid for completed projects?",
          answer:
            "Once a project is completed and approved by the client, payment is automatically processed to your wallet. You can then withdraw funds to your bank account.",
        },
        {
          id: 8,
          question: "What are the platform fees?",
          answer:
            "Our platform fee is 10% of each completed project. This covers payment processing, dispute resolution, and platform maintenance.",
        },
        {
          id: 9,
          question: "How long does it take to receive payments?",
          answer:
            "Payments are typically processed within 24-48 hours after project completion and client approval.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Security",
      icon: Shield,
      questions: [
        {
          id: 10,
          question: "How do I verify my account?",
          answer:
            "To verify your account, upload a government-issued ID and proof of your professional credentials. Verification typically takes 1-3 business days.",
        },
        {
          id: 11,
          question: "Can I change my email address?",
          answer:
            "Yes, you can change your email address in your account settings. You'll need to verify the new email address before it becomes active.",
        },
        {
          id: 12,
          question: "How do I delete my account?",
          answer:
            "To delete your account, contact our support team. Please note that this action is irreversible and you'll lose access to all your data.",
        },
      ],
    },
  ];

  const supportCategories = [
    "General Inquiry",
    "Technical Issue",
    "Payment Problem",
    "Account Issue",
    "Project Dispute",
    "Feature Request",
  ];

  const priorityLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
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
    alert("Support request submitted successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("helpSupport")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQ..."
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
                  Subject
                </label>
                <input
                  type="text"
                  value={supportForm.subject}
                  onChange={(e) =>
                    handleSupportFormChange("subject", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={supportForm.category}
                  onChange={(e) =>
                    handleSupportFormChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {supportCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
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
                  Message
                </label>
                <textarea
                  rows={4}
                  value={supportForm.message}
                  onChange={(e) =>
                    handleSupportFormChange("message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide detailed information about your issue..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Submit Support Request
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Support
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
                    Phone Support
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
                    Support Hours
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
