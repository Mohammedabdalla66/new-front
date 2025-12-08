import { useLanguage } from "../contexts/LanguageContext";
import { Award, Shield, FileCheck, Headphones, Clock ,Handshake  ,DollarSign, FileUp , ShieldCheck , Headset  } from "lucide-react";
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
      icon: Handshake,
      titleKey: "certifiedProfessionals",
      descKey: "certifiedProfessionalsDesc",
    },
    {
      icon: Clock  ,
      titleKey: "savetimeandenergy",
      descKey: "savetimeandenergyDesc",
    },

   
      {
      icon: DollarSign,
      titleKey: "competitivePrices",
      descKey: "competitivePricesDesc",
    },
    {
      icon: FileUp,
      titleKey: "DocumentedContracts",
      descKey: "DocumentedContractsDesc",
    },
     
    {
      icon: ShieldCheck ,
      titleKey: "SecurePayment",
      descKey: "SecurePaymentDesc",
    },
    {
      icon: Headset  ,
      titleKey: "CommunicationSupport",
      descKey: "CommunicationSupportDesc",
    },
   
   
 
  ];

  return (
<section className="py-12 sm:py-16 bg-gradient-to-b from-blue-400 to-blue-900 text-white">
         <div className="w-full px-1 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center">
          {t("whyChooseUsTitle")}
        </h2>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  language === "ar" ? "flex-row-reverse" : ""
                } w-full`}
              >
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-blue-100 text-sm sm:text-base">
                    {t(benefit.descKey)}
                  </p>
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
