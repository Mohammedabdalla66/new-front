import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Star, MessageCircle, Clock } from "lucide-react";
import { accountants } from "../data/mockData";

const TopAccountants = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("topAccountants")}
          </h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            {t("viewAll")}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accountants.map((accountant) => (
            <div
              key={accountant.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center mb-4">
                <img
                  src={accountant.avatar}
                  alt={accountant.name[language]}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {accountant.name[language]}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {accountant.specialization[language]}
                </p>
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 mr-1 rtl:mr-0 rtl:ml-1">
                    {accountant.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <span>{t("completedProjects") || "Projects"}</span>
                  <span className="font-medium">
                    {accountant.completedProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                    Response
                  </span>
                  <span className="font-medium">{accountant.responseTime}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t("contactBtn")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAccountants;
