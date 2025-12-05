import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      questionKey: "faqQ1",
      answerKey: "faqA1",
    },
    {
      questionKey: "faqQ2",
      answerKey: "faqA2",
    },
    {
      questionKey: "faqQ3",
      answerKey: "faqA3",
    },
    {
      questionKey: "faqQ4",
      answerKey: "faqA4",
    },
    {
      questionKey: "faqQ5",
      answerKey: "faqA5",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("faqTitle")}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right rtl:text-right bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 flex-1">
                  {t(faq.questionKey)}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{t(faq.answerKey)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

