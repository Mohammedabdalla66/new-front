import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Users, Shield, CheckCircle, Network, Lock } from "lucide-react";

const QualityRights = () => {
  const { t, language } = useLanguage();

  const qualityFeatures = [
    {
      icon: Shield,
      titleKey: "continuousCommunication",
      descKey: "continuousCommunicationDesc",
    },
    {
      icon: Lock,
      titleKey: "transactionGuarantee",
      descKey: "transactionGuaranteeDesc",
    },
    {
      icon: Network,
      titleKey: "differentChannels",
      descKey: "differentChannelsDesc",
    },
    {
      icon: CheckCircle,
      titleKey: "qualityGuarantee",
      descKey: "qualityGuaranteeDesc",
    },
    {
      icon: Users,
      titleKey: "verifiedAccountants",
      descKey: "verifiedAccountantsDesc",
    },
    {
      icon: Shield,
      titleKey: "intellectualRights",
      descKey: "intellectualRightsDesc",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1976D2] mb-8 sm:mb-12 text-center">{t("qualityRightsTitle")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {qualityFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className={`text-right rtl:text-right ${language === "ar" ? "text-right" : "text-left"}`}>
              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1976D2] mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{t(feature.descKey)}</p>
                </div>
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default QualityRights;
