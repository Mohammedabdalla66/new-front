import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Users, Shield, FolderOpen, MessageCircle, CheckCircle, Headphones, Network, Lock } from "lucide-react";

const QualityRights = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Users,
      titleKey: language === "ar" ? "مكاتب مرخصة ومعتمدة" : "Accredited and Licensed Service Providers",
      descriptionKey: language === "ar" 
        ? "نعمل مع مكاتب مسجلة في هيئة الخدمات المالية في عمان"
        : "We work with offices registered with the Financial Services Authority in Oman",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      titleKey: language === "ar" ? "الحفاظ على حقوقك المالية" : "Preserving Your Financial Rights",
      descriptionKey: language === "ar"
        ? "تبقى قيمة الصفقة في الحساب حتى يتم استلام المشروع بالكامل"
        : "The deal value remains in the account until the project is fully received",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: FolderOpen,
      titleKey: language === "ar" ? "ملفات متكاملة" : "Integrated Files",
      descriptionKey: language === "ar"
        ? "ملفات تعرض تقييمات فريدة وخبرة مقدمي الخدمات"
        : "Files showing unique evaluations and experience of service providers",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: MessageCircle,
      titleKey: language === "ar" ? "التواصل المسبق" : "Prior Communication",
      descriptionKey: language === "ar"
        ? "التواصل داخل المنصة لتوضيح الاتفاقيات قبل بدء المشروع"
        : "In-platform communication to clarify agreements before starting a project",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      titleKey: language === "ar" ? "ضمان الحقوق" : "Guarantee of Rights",
      descriptionKey: language === "ar"
        ? "استرداد كامل إذا لم يتم استلام العمل المتفق عليه"
        : "Full refund if the agreed work is not received",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      icon: Headphones,
      titleKey: language === "ar" ? "الدعم والمساعدة" : "Support and Assistance",
      descriptionKey: language === "ar"
        ? "فريق متاح على مدار الساعة للمساعدة"
        : "24/7 team availability for assistance",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
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

export default QualityRights;

