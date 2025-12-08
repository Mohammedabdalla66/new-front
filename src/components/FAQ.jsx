import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
// Note: ChevronDown and ChevronUp are no longer needed as there's no open/close state

const FAQ = () => {
  const { t, language } = useLanguage();
  
  // Removed: const [openIndex, setOpenIndex] = useState(0);

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
    {   questionKey: "faqQ5",
      answerKey: "faqA5",
    },
  ];

  return (
    <section id="FAQ" >
<div className="w-full  ">
        <div className="text-center mb-3 sm:mb-12 bg-blue-100">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 p-4">
  <span>{t("faqTitle1")}</span><br />
  <span className="mt-3 block font-normal">{t("faqTitle2")}</span>
</h2>
        </div>

        {/* The Figma design shows a simple, text-heavy list without borders or explicit boxes. 
          We will simplify the wrapper classes to match this style. */}
<div className="space-y-6 sm:space-y-8 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              // Removed border, rounded-lg, overflow-hidden, and shadow classes
              className="pb-2  w-full text-center" // Added a subtle separator line
            >
              {/* Question (Header-like style) */}
              <h3 
                // Removed onClick, padding, and alignment logic for a static header
                className={`font-semibold text-lg sm:text-xl text-[#2075ba]  text-center"
                }`}
              >
                {t(faq.questionKey)}
              </h3>
              
              {/* Answer (Body text) - Always displayed */}
              <div className={`pt-1 text-center w-full"
              }`}>
                <p className=" text-blue-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {t(faq.answerKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;