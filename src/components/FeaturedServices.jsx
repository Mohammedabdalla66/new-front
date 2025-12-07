import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  BookOpen,
  FileText,
  Calculator,
  Search,
  TrendingUp,
  Users,
  BarChart3,
  Network,
  FileSearch,
  ClipboardCheck,
  Award,
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

  const serviceCards = [
    {
      icon: BarChart3,
      titleKey: "economicFeasibility",
    },
    {
      icon: FileText,
      titleKey: "financialStatements",
    },
    {
      icon: Network,
      titleKey: "companyFormation",
    },
    {
      icon: FileSearch,
      titleKey: "financialConsulting",
    },
    {
      icon: ClipboardCheck,
      titleKey: "auditing",
    },
    {
      icon: Award,
      titleKey: "realEstateValuation",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1976D2] mb-8 sm:mb-12">{t("featuredServices")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {serviceCards.slice(0, 3).map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div key={index} className="border-b-4 border-[#1976D2] bg-gray-50 p-6 sm:p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <IconComponent className="text-[#FF6B35]" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1976D2] mb-3">{t(service.titleKey)}</h3>
              <p className="text-gray-600 text-sm mb-4">{t("learnMore")}</p>
              <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
                <span>{language === "ar" ? "←" : "→"}</span>
              </a>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {serviceCards.slice(3, 6).map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div key={index + 3} className="border-b-4 border-[#1976D2] bg-gray-50 p-6 sm:p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <IconComponent className="text-[#FF6B35]" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1976D2] mb-3">{t(service.titleKey)}</h3>
              <p className="text-gray-600 text-sm mb-4">{t("learnMore")}</p>
              <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
                <span>{language === "ar" ? "←" : "→"}</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default FeaturedServices;
