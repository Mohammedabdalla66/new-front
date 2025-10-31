import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Award, Shield, FileCheck, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Award,
      titleKey: "certifiedProfessionals",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      titleKey: "securePayment",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: FileCheck,
      titleKey: "verifiedContracts",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Headphones,
      titleKey: "support24",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("whyChooseUs")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(feature.titleKey)}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
