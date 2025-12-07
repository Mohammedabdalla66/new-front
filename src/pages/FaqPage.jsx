import React, { useState } from "react";
import {
  HelpCircle,
  FileText,
  CreditCard,
  Shield,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const FAQPage = () => {
  const { t } = useLanguage();
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion((prev) => (prev === id ? null : id));
  };

  // FAQ Categories structure with translation keys
  const faqCategories = [
    {
      id: "getting-started",
      titleKey: "faqCategoryGettingStarted",
      icon: HelpCircle,
      questions: [
        {
          id: 1,
          questionKey: "providerFaqQ1",
          answerKey: "providerFaqA1",
        },
        {
          id: 2,
          questionKey: "providerFaqQ2",
          answerKey: "providerFaqA2",
        },
        {
          id: 3,
          questionKey: "providerFaqQ3",
          answerKey: "providerFaqA3",
        },
      ],
    },
    {
      id: "projects",
      titleKey: "faqCategoryProjects",
      icon: FileText,
      questions: [
        {
          id: 4,
          questionKey: "providerFaqQ4",
          answerKey: "providerFaqA4",
        },
        {
          id: 5,
          questionKey: "providerFaqQ5",
          answerKey: "providerFaqA5",
        },
        {
          id: 6,
          questionKey: "providerFaqQ6",
          answerKey: "providerFaqA6",
        },
      ],
    },
    {
      id: "payments",
      titleKey: "faqCategoryPayments",
      icon: CreditCard,
      questions: [
        {
          id: 7,
          questionKey: "providerFaqQ7",
          answerKey: "providerFaqA7",
        },
        {
          id: 8,
          questionKey: "providerFaqQ8",
          answerKey: "providerFaqA8",
        },
        {
          id: 9,
          questionKey: "providerFaqQ9",
          answerKey: "providerFaqA9",
        },
      ],
    },
    {
      id: "account",
      titleKey: "faqCategoryAccount",
      icon: Shield,
      questions: [
        {
          id: 10,
          questionKey: "providerFaqQ10",
          answerKey: "providerFaqA10",
        },
        {
          id: 11,
          questionKey: "providerFaqQ11",
          answerKey: "providerFaqA11",
        },
        {
          id: 12,
          questionKey: "providerFaqQ12",
          answerKey: "providerFaqA12",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddProject={() => {}} />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 text-center">
          <h1 className="text-5xl font-bold mb-4">{t("faqTitle")}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("faqSubtitle")}
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-4 space-x-reverse">
              <Phone className="w-5 h-5" />
              <span>{t("faqCallNow")}</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-4 space-x-reverse">
              <Mail className="w-5 h-5" />
              <span>{t("faqRequestConsultation")}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                {/* Category Title */}
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-7 h-7 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {t(category.titleKey)}
                  </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                  {category.questions.map((q) => (
                    <div
                      key={q.id}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm"
                    >
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full flex justify-between items-center p-5 text-left"
                      >
                        <span className="text-lg font-semibold text-gray-900">
                          {t(q.questionKey)}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 text-gray-600 transition-transform ${
                            openQuestion === q.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openQuestion === q.id && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                          {t(q.answerKey)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
