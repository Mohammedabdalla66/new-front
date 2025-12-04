import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Users, Shield, FolderOpen, MessageSquare, CheckCircle, Headphones } from "lucide-react";

const QualitySection = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Users,
      titleKey: "accreditedProviders",
      descriptionKey: "accreditedProvidersDesc",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      titleKey: "financialRights",
      descriptionKey: "financialRightsDesc",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: FolderOpen,
      titleKey: "integratedFiles",
      descriptionKey: "integratedFilesDesc",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: MessageSquare,
      titleKey: "priorCommunication",
      descriptionKey: "priorCommunicationDesc",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      titleKey: "guaranteeRights",
      descriptionKey: "guaranteeRightsDesc",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      icon: Headphones,
      titleKey: "supportAssistance",
      descriptionKey: "supportAssistanceDesc",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "ar" 
              ? "كيف نضمن حقوقك وجودة أعمالك" 
              : "How We Ensure Your Rights & Quality of Your Work"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-lg flex-shrink-0`}
                  >
                    <IconComponent className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t(feature.titleKey) || (language === "ar" 
                        ? ["مكاتب مرخصة ومعتمدة", "الحفاظ على حقوقك المالية", "ملفات متكاملة", "التواصل المسبق", "ضمان الحقوق", "الدعم والمساعدة"][index]
                        : ["Accredited Providers", "Financial Rights", "Integrated Files", "Prior Communication", "Guarantee Rights", "Support & Assistance"][index])}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(feature.descriptionKey) || (language === "ar"
                        ? [
                            "نعمل مع مكاتب مسجلة لدى هيئة الخدمات المالية في عمان",
                            "تبقى قيمة الصفقة في الحساب حتى يتم استلام المشروع بالكامل",
                            "ملفات توضح تقييمات وخبرات فريدة لمقدمي الخدمات",
                            "التواصل داخل المنصة لتوضيح الاتفاقيات قبل بدء المشروع",
                            "استرداد كامل إذا لم يتم استلام العمل المتفق عليه",
                            "فريق متاح على مدار الساعة لتقديم المساعدة"
                          ][index]
                        : [
                            "Working with offices registered with the Financial Services Authority in Oman",
                            "Deal value remains in account until project is fully received",
                            "Files showing unique evaluations and experience of service providers",
                            "In-platform communication to clarify agreements before starting project",
                            "Full refund if agreed work is not received",
                            "24/7 team availability for assistance"
                          ][index])}
                    </p>
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

export default QualitySection;

