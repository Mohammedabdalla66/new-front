import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  BookOpen,
  FileText,
  Calculator,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";

const FeaturedServices = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: BookOpen,
      titleKey: "bookkeeping",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: FileText,
      titleKey: "financialStatements",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      icon: Calculator,
      titleKey: "taxFiling",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Search,
      titleKey: "auditing",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      icon: TrendingUp,
      titleKey: "financialConsulting",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
    },
    {
      icon: Users,
      titleKey: "payroll",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("featuredServices") || "الخدمات المميزة"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`bg-white ${service.borderColor} border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 text-center`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`p-4 ${service.bgColor} rounded-lg mb-4 group-hover:shadow-md transition-shadow`}
                  >
                    <IconComponent className={`h-10 w-10 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    {language === "ar" ? "ابحث عن الخدمة" : "Search for service"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
