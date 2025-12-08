import { useLanguage } from "../contexts/LanguageContext";
import { FileText, FileCheck, CreditCard, BadgePercent } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLanguage();

  const newSteps = [
    {
      icon: FileText,
      titleKey: "step1New",
    },
    {
      icon: BadgePercent,
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
    <section className="py-3 sm:py-4 bg-[#D5ECFF]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#1976D2] mb-8 sm:mb-12">{t("howItWorks")}</h2>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> */}

      <div className="max-w-7xl mx-auto px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 p-4 bg-white/50 rounded-full">
                  <IconComponent className="text-[#2176B9]" size={40} />
                </div>
                <h4 className="text-[#2176B9] font-medium text-lg">{t(step.titleKey)}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
