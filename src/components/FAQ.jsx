import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const { t, language } = useLanguage();
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
    <section id="FAQ" className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("faqTitle")}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className={`w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 ${
                  language === "ar" ? "text-right" : "text-left"
                } bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2075ba] focus:ring-inset`}
              >
                <span className={`font-semibold text-gray-900 flex-1 text-base sm:text-lg ${
                  language === "ar" ? "text-right" : "text-left"
                }`}>
                  {t(faq.questionKey)}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#2075ba] ml-4 rtl:ml-0 rtl:mr-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 ml-4 rtl:ml-0 rtl:mr-4" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className={`px-4 sm:px-6 py-4 sm:py-5 bg-gray-50 border-t border-gray-200 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {t(faq.answerKey)}
                  </p>
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

