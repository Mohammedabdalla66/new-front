import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {t("ctaTitle")}
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          {t("ctaText")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t("requestService")}
          </button>
          <button className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
            {t("signUpAccountant")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
