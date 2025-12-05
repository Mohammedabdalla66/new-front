import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Award, Shield, FileCheck, Headphones, DollarSign, Users, TrendingUp, CheckCircle, Network } from "lucide-react";

const WhyChooseUs = () => {
  const { t } = useLanguage();

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
    <section className="py-16 bg-[#1976D2] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">لماذا تختار منصة المحاسب القانوني؟</h2>

          <div className="grid grid-cols-2 gap-8 text-right">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">أسعار تنافسية</h3>
                <p className="text-blue-100">
                  نساعد في شبدا علية محاسبة اعتماداً شامل زمن الخدمات نسعون تساعدنا محافظ تبدم
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign size={32} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">محاسبون متخصصون ومدققون</h3>
                <p className="text-blue-100">
                  مراجعين اعلانك تحت أصداء جهاز محاسب متخصص دعدارة جراءة
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={32} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">سرعة ومرونة</h3>
                <p className="text-blue-100">
                  مرونة عبر كل ترخيص للعلم سرعة قرية نيا وجه موضاع استفسارات
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp size={32} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">دقة الإعادة والتحقق</h3>
                <p className="text-blue-100">
                  صادق فرح سور سرور تحت مير كولج وزارة حديثة جول نية شخدة عمل
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={32} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">تواصل سريع</h3>
                <p className="text-blue-100">
                  صلات قلدم مع المغامعت خلال تواصل مفيشلي حملاء محدداً
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <Network size={32} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">عروض تنافسية</h3>
                <p className="text-blue-100">
                  متاحة فرائض جوق بأفضل الأوضاع معاجناً عامة منصة اجتمعت
                </p>
              </div>
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                <Award size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default WhyChooseUs;
