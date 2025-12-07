import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Award, Shield, FileCheck, Headphones, DollarSign, Users, TrendingUp, CheckCircle, Network } from "lucide-react";

const WhyChooseUs = () => {
  const { t, language } = useLanguage();

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

  const benefits = [
    {
      icon: DollarSign,
      titleKey: "competitivePrices",
      descKey: "competitivePricesDesc",
    },
    {
      icon: Users,
      titleKey: "specializedAccountants",
      descKey: "specializedAccountantsDesc",
    },
    {
      icon: TrendingUp,
      titleKey: "speedFlexibility",
      descKey: "speedFlexibilityDesc",
    },
    {
      icon: CheckCircle,
      titleKey: "accuracyVerification",
      descKey: "accuracyVerificationDesc",
    },
    {
      icon: Network,
      titleKey: "fastCommunication",
      descKey: "fastCommunicationDesc",
    },
    {
      icon: Award,
      titleKey: "competitiveOffers",
      descKey: "competitiveOffersDesc",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#1976D2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center">{t("whyChooseUsTitle")}</h2>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 ${language === "ar" ? "text-right" : "text-left"}`}>
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className={`flex items-start gap-4 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{t(benefit.titleKey)}</h3>
                    <p className="text-blue-100 text-sm sm:text-base">{t(benefit.descKey)}</p>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent size={28} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};

export default WhyChooseUs;
