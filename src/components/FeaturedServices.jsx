import React from "react";
import { Link } from "react-router-dom";
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
  FileCog,
  FilePen,
  UserCog,
} from "lucide-react";

const FeaturedServices = () => {
  const { t , language } = useLanguage();

  const serviceCards = [
    {
      icon: FileCog,
      titleKey: "economicFeasibility",
    },
    {
      icon: FileText,
      titleKey: "financialStatements",
    },
    {
      icon: Calculator,
      titleKey: "realEstateValuation",
    },
    {
      icon: FilePen,
      titleKey: "auditing",
    },
    {
      icon: FileSearch,
      titleKey: "financialConsulting",
    },
    {
      icon: UserCog,
      titleKey: "companyFormation",
    },
  ];

  return (
    <section className="py-4 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1976D2] mb-8 sm:mb-12">{t("featuredServices")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {serviceCards.map((service, index) => {
            const IconComponent = service.icon;
            return (
              // <div key={index} className="border-b-4 border-[#1976D2] bg-gray-50 p-6 sm:p-8 rounded-lg hover:shadow-lg transition-shadow">
              //   <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              //     <IconComponent className="text-[#FF6B35]" size={28} />
              //   </div>
              //   <h3 className="text-lg sm:text-xl font-bold text-[#1976D2] mb-3">{t(service.titleKey)}</h3>
              //   <p className="text-gray-600 text-sm mb-4">{t("learnMore")}</p>
              //   <Link to="/services" className="text-[#1976D2] text-sm flex items-center justify-center gap-2 hover:text-[#1565C0] transition-colors">
              //     <span>{language === "ar" ? "←" : "→"}</span>
              //   </Link>
              // </div>
              <div key={index} className="flex flex-col relative bg-[#D5ECFF] pt-8 sm:pt-10 px-4 rounded-xl items-center text-center hover:shadow-lg transition-shadow duration-300">
                <IconComponent className="text-[#FF6B35] mb-4 sm:mb-5" size={50} />
                <h3 className="text-[#2075B9] text-xl sm:text-2xl font-normal">{t(service.titleKey)}</h3>
                <Link to="/services" className="mb-8 w-full flex justify-center">
                  <div className="flex mt-4 gap-x-3 items-center">
                    <Search stroke="#2176B9" size={20} />
                    <h4 className="text-[#2075B9] font-normal text-sm">{language === 'ar' ? 'ابحث عن الخدمة' : 'Search Service'}</h4>
                  </div>
                </Link>
                <div className="w-full absolute bottom-0 py-2 bg-[#4A95D1]  rounded-b-xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
