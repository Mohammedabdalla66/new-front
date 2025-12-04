import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const { language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = language === "ar" ? [
    {
      question: "كم من الوقت يستغرق استلام العروض؟",
      answer: "عادة ما تستغرق العروض من 24 إلى 48 ساعة للظهور بعد نشر طلبك."
    },
    {
      question: "ما هي تكلفة الخدمة للعملاء؟",
      answer: "الخدمة مجانية حالياً للعملاء. لا توجد رسوم إضافية."
    },
    {
      question: "كيف أتأكد من جودة مكاتب التدقيق؟",
      answer: "جميع مكاتب التدقيق مسجلة ومعتمدة من هيئة الخدمات المالية في عمان."
    },
    {
      question: "كيف يتم ضمان أمان الدفع؟",
      answer: "نستخدم نظام دفع آمن ومشفر. يتم الاحتفاظ بالأموال في حساب آمن حتى اكتمال المشروع."
    },
    {
      question: "ماذا يحدث بعد قبول عرض السعر؟",
      answer: "بعد قبول العرض، سيتم إنشاء عقد موثق ويمكنك البدء في التواصل مع مقدم الخدمة مباشرة."
    }
  ] : [
    {
      question: "How long does it take to receive offers?",
      answer: "Offers typically appear within 24 to 48 hours after publishing your request."
    },
    {
      question: "What is the service cost for clients?",
      answer: "The service is currently free for clients. There are no additional fees."
    },
    {
      question: "How do I ensure the quality of auditing offices?",
      answer: "All auditing offices are registered and accredited by the Financial Services Authority in Oman."
    },
    {
      question: "How is payment security guaranteed?",
      answer: "We use a secure and encrypted payment system. Funds are held in a secure account until project completion."
    },
    {
      question: "What happens after accepting a price offer?",
      answer: "After accepting the offer, a documented contract will be created and you can start communicating directly with the service provider."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left rtl:text-right flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 flex-1 pr-4 rtl:pr-0 rtl:pl-4">
                  {faq.question}
                </span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

