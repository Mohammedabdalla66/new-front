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
  const { t } = useLanguage();

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
            {t("featuredServices")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`${service.bgColor} ${service.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow`}
                  >
                    <IconComponent className={`h-6 w-6 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mr-4 rtl:mr-0 rtl:ml-4">
                    {t(service.titleKey)}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {t("findService")} {t(service.titleKey).toLowerCase()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
