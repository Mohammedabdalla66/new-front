import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Award, Shield, FileCheck, Headphones } from "lucide-react";

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

  return (
    <section className="py-16 bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("whyChooseUs") || (language === "ar" ? "لماذا تختار منصة المحاسب القانوني؟" : "Why Choose The Legal Accountant Platform?")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-white/80 text-sm">
                  {language === "ar"
                    ? ["وفر الوقت والجهد", "أسعار تنافسية", "محاسبون معتمدون ومرخصون", "عقود موثقة", "دفع آمن", "دعم مستمر"][index]
                    : ["Save Time and Effort", "Competitive Prices", "Certified and Licensed Accountants", "Documented Contracts", "Secure Payment", "Continuous Support"][index]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
