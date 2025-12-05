import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: language === "ar" 
        ? "كم يستغرق الوقت للحصول على العروض؟"
        : "How long does it take to receive offers?",
      answer: language === "ar"
        ? "عادة ما تستغرق العروض من 24 إلى 48 ساعة بعد نشر مشروعك."
        : "Offers usually take 24 to 48 hours after publishing your project.",
    },
    {
      question: language === "ar"
        ? "ما هي تكلفة الخدمة للعميل؟"
        : "What is the service cost for clients?",
      answer: language === "ar"
        ? "الخدمة مجانية حالياً للعملاء."
        : "The service is currently free for clients.",
    },
    {
      question: language === "ar"
        ? "كيف نضمن جودة مكاتب التدقيق؟"
        : "How do we ensure the quality of auditing offices?",
      answer: language === "ar"
        ? "نعمل فقط مع مكاتب مسجلة ومعتمدة في هيئة الخدمات المالية."
        : "We only work with offices registered and accredited with the Financial Services Authority.",
    },
    {
      question: language === "ar"
        ? "كيف نضمن أمان الدفع؟"
        : "How do we ensure payment security?",
      answer: language === "ar"
        ? "نستخدم نظام ضمان حيث تبقى الأموال في الحساب حتى اكتمال المشروع."
        : "We use an escrow system where funds remain in the account until project completion.",
    },
    {
      question: language === "ar"
        ? "ماذا يحدث بعد قبول عرض السعر؟"
        : "What happens after accepting a price offer?",
      answer: language === "ar"
        ? "يتم إنشاء عقد وتبدأ عملية التواصل والدفع الآمن."
        : "A contract is created and the communication and secure payment process begins.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "ar" 
              ? "هل لديك أسئلة ؟ اليك إجابات لأكثر الأسئلة شيوعا"
              : "Do you have questions? Here are answers to the most common questions"}
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
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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

