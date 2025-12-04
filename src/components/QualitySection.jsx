import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Users, Shield, FolderOpen, MessageSquare, CheckCircle, Headphones, Network, Lock } from "lucide-react";

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
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-[#1976D2] mb-12">كيف نضمن حقوقك وجودة أعمالك</h2>

      <div className="grid grid-cols-3 gap-8">
        <div className="text-right">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">تواصل مستمر</h3>
              <p className="text-gray-600">
                تواصل مع عدة مكاتب معتمدة، أسرع رد على عدة استفسارات، حصل على عروض تنافسية سعر
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={24} />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">ضمان معاملتك</h3>
              <p className="text-gray-600">
                سنضمن لك سلامة تواصلك، سندعم قراراتك ونحفظ أموالك من أي خلل
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">منفذات مختلفة</h3>
              <p className="text-gray-600">
                عدة قنوات متاحة، أصدر عروض أسعار وقائمة احتياجات متوافقة معك لمعرفة احتياجاتك
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <Network className="text-white" size={24} />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">
                نضمن لك تلقي عمل مطابق للمعايير المحلية والدولية، تحمل أي فروق من نقع
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">مدقيق خدمات محاسبين ومدققين</h3>
              <p className="text-gray-600">
                قائمة من محاسبين متخصصين من بدعدارة اعتمادات من اعلام يدعم المعرفة المؤسسات البنائية جهة
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="text-white" size={24} />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1976D2] mb-2">حفظ حقوقكم الفكرية</h3>
              <p className="text-gray-600">
                تمتع بمنصة دمج بيانات المصلحة ترفع تلقائية تجارية عروض الخدمات الثانوية عائلية
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default QualitySection;  
