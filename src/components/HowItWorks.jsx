import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FileText, Users, Shield, CheckCircle, FileCheck, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      titleKey: "step1",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      titleKey: "step2",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Shield,
      titleKey: "step3",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: CheckCircle,
      titleKey: "step4",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-[#1976D2] mb-12">كيف نعمل</h2>

      <div className="grid grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileCheck className="text-[#1976D2]" size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#1976D2] mb-2">استلام الخدمة بطريقة رقمية</h3>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="text-[#1976D2]" size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#1976D2] mb-2">تواصل وادفع الأجر</h3>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-[#1976D2]" size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#1976D2] mb-2">استقبال العروض من المكاتب</h3>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-[#1976D2]" size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#1976D2] mb-2">اعدد متطلباتك او اكثر خدمة</h3>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HowItWorks;
