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
<<<<<<< HEAD
      title: "Getting Started",
=======
      title: t("gettingStarted"),
>>>>>>> origin/mohamedAbdo
      icon: HelpCircle,
      questions: [
        {
          id: 1,
<<<<<<< HEAD
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
=======
          question: t("faqQ1"),
          answer: t("faqA1"),
        },
        {
          id: 2,
          question: t("faqQ2"),
          answer: t("faqA2"),
        },
        {
          id: 3,
          question: t("faqQ3"),
          answer: t("faqA3"),
>>>>>>> origin/mohamedAbdo
        },
      ],
    },
    {
      id: "projects",
<<<<<<< HEAD
      title: "Projects & Proposals",
=======
      title: t("projectsProposals"),
>>>>>>> origin/mohamedAbdo
      icon: FileText,
      questions: [
        {
          id: 4,
<<<<<<< HEAD
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
=======
          question: t("faqQ4"),
          answer: t("faqA4"),
        },
        {
          id: 5,
          question: t("faqQ5"),
          answer: t("faqA5"),
        },
        {
          id: 6,
          question: t("faqQ6"),
          answer: t("faqA6"),
>>>>>>> origin/mohamedAbdo
        },
      ],
    },
    {
      id: "payments",
<<<<<<< HEAD
      title: "Payments & Billing",
=======
      title: t("paymentsBilling"),
>>>>>>> origin/mohamedAbdo
      icon: CreditCard,
      questions: [
        {
          id: 7,
<<<<<<< HEAD
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
=======
          question: t("faqQ7"),
          answer: t("faqA7"),
        },
        {
          id: 8,
          question: t("faqQ8"),
          answer: t("faqA8"),
        },
        {
          id: 9,
          question: t("faqQ9"),
          answer: t("faqA9"),
>>>>>>> origin/mohamedAbdo
        },
      ],
    },
    {
      id: "account",
<<<<<<< HEAD
      title: "Account & Security",
=======
      title: t("accountSecurity"),
>>>>>>> origin/mohamedAbdo
      icon: Shield,
      questions: [
        {
          id: 10,
<<<<<<< HEAD
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
=======
          question: t("faqQ10"),
          answer: t("faqA10"),
        },
        {
          id: 11,
          question: t("faqQ11"),
          answer: t("faqA11"),
        },
        {
          id: 12,
          question: t("faqQ12"),
          answer: t("faqA12"),
>>>>>>> origin/mohamedAbdo
        },
      ],
    },
  ];

  const supportCategories = [
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
    alert("Support request submitted successfully!");
=======
    alert(t("supportRequestSubmitted"));
>>>>>>> origin/mohamedAbdo
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("helpSupport")}
        </h1>
<<<<<<< HEAD
        <p className="text-gray-600 dark:text-gray-400">
          Find answers to common questions or contact our support team
        </p>
=======
        <p className="text-gray-600 dark:text-gray-400">{t("findAnswers")}</p>
>>>>>>> origin/mohamedAbdo
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
<<<<<<< HEAD
            placeholder="Search FAQ..."
=======
            placeholder={t("searchFAQ")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                  Subject
=======
                  {t("subject")}
>>>>>>> origin/mohamedAbdo
                </label>
                <input
                  type="text"
                  value={supportForm.subject}
                  onChange={(e) =>
                    handleSupportFormChange("subject", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
<<<<<<< HEAD
                  placeholder="Brief description of your issue"
=======
                  placeholder={t("briefDescriptionOfIssue")}
>>>>>>> origin/mohamedAbdo
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
<<<<<<< HEAD
                  Category
=======
                  {t("category")}
>>>>>>> origin/mohamedAbdo
                </label>
                <select
                  value={supportForm.category}
                  onChange={(e) =>
                    handleSupportFormChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
<<<<<<< HEAD
                  <option value="">Select a category</option>
=======
                  <option value="">{t("selectCategory")}</option>
>>>>>>> origin/mohamedAbdo
                  {supportCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
<<<<<<< HEAD
                  Priority
=======
                  {t("priority")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                  Message
=======
                  {t("message")}
>>>>>>> origin/mohamedAbdo
                </label>
                <textarea
                  rows={4}
                  value={supportForm.message}
                  onChange={(e) =>
                    handleSupportFormChange("message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
<<<<<<< HEAD
                  placeholder="Please provide detailed information about your issue..."
=======
                  placeholder={t("provideDetailedInformation")}
>>>>>>> origin/mohamedAbdo
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
<<<<<<< HEAD
                Submit Support Request
=======
                {t("submitSupportRequest")}
>>>>>>> origin/mohamedAbdo
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
              Contact Information
=======
              {t("contactInformation")}
>>>>>>> origin/mohamedAbdo
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
<<<<<<< HEAD
                    Email Support
=======
                    {t("emailSupport")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                    Phone Support
=======
                    {t("phoneSupport")}
>>>>>>> origin/mohamedAbdo
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
<<<<<<< HEAD
                    Support Hours
=======
                    {t("supportHours")}
>>>>>>> origin/mohamedAbdo
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
