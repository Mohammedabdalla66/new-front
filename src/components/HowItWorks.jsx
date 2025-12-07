import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FileText, Users, Shield, CheckCircle, FileCheck, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      titleKey: "step1",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      titleKey: "step2",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Shield,
      titleKey: "step3",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: CheckCircle,
      titleKey: "step4",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const newSteps = [
    {
      icon: FileText,
      titleKey: "step1New",
    },
    {
      icon: CheckCircle,
      titleKey: "step2New",
    },
    {
      icon: CreditCard,
      titleKey: "step3New",
    },
    {
      icon: FileCheck,
      titleKey: "step4New",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1976D2] mb-8 sm:mb-12">{t("howItWorks")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {newSteps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="text-[#1976D2]" size={32} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1976D2] mb-2">{t(step.titleKey)}</h3>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default HowItWorks;
