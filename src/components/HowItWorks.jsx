import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FileText, Users, Shield, CheckCircle } from "lucide-react";

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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("howItWorks") || "كيف نعمل"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${step.bgColor} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`h-10 w-10 ${step.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(step.titleKey)}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
