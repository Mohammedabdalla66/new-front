import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Users,
  Shield,
  CheckCircle,
  Network,
  Lock,
  ChevronLeft,
} from "lucide-react";

const QualityRights = () => {
  const { t, language } = useLanguage();

  const qualityFeatures = [
    {
      titleKey: "continuousCommunication",
      descKey: "continuousCommunicationDesc",
    },
    {
      titleKey: "transactionGuarantee",
      descKey: "transactionGuaranteeDesc",
    },
    {
      titleKey: "differentChannels",
      descKey: "differentChannelsDesc",
    },
    {
      titleKey: "qualityGuarantee",
      descKey: "qualityGuaranteeDesc",
    },
    {
      titleKey: "verifiedAccountants",
      descKey: "verifiedAccountantsDesc",
    },
    {
      titleKey: "intellectualRights",
      descKey: "intellectualRightsDesc",
    },
  ];

  return (
    <section className="pt-1 sm:pt-2 pb-16 ">
      <div className="w-full py-4 bg-[#EFF8FF]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl mt-8 sm:text-3xl lg:text-4xl font-bold text-[#1976D2] mb-8 sm:mb-12 text-center">
          {t("qualityRightsTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {qualityFeatures.map((feature, index) => {
            return (
              <div key={index} className="flex gap-x-4 items-start p-4 hover:bg-white rounded-lg transition-colors duration-300">
                <ChevronLeft
                  fill="#2176B9"
                  stroke="#2176B9"
                  className="mt-1 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
                />
                <div>
                  <h3 className="text-[#2176B9] text-lg sm:text-xl font-medium mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <h4 className="text-[#0404048F] font-normal text-sm sm:text-base leading-relaxed">
                    {t(feature.descKey)}
                  </h4>
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
