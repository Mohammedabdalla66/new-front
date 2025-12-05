import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Users, Shield, CheckCircle, Network, Lock } from "lucide-react";

const QualityRights = () => {
  const { t } = useLanguage();

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
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-[#1976D2] mb-12">{t("qualityRightsTitle")}</h2>

      <div className="grid grid-cols-3 gap-8">
        {qualityFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          const isFirstInColumn = index % 2 === 0;
          return (
            <div key={index} className="text-right">
              <div className={`flex items-start gap-4 ${isFirstInColumn ? 'mb-8' : ''}`}>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1976D2] mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-gray-600">{t(feature.descKey)}</p>
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
