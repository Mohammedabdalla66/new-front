import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  BookOpen,
  FileText,
  Calculator,
  Search,
  TrendingUp,
  Users,
  BarChart3,
  Network,
  FileSearch,
  ClipboardCheck,
  Award,
} from "lucide-react";

const FeaturedServices = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: BookOpen,
      titleKey: "bookkeeping",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: FileText,
      titleKey: "financialStatements",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      icon: Calculator,
      titleKey: "taxFiling",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Search,
      titleKey: "auditing",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      icon: TrendingUp,
      titleKey: "financialConsulting",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
    },
    {
      icon: Users,
      titleKey: "payroll",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
  ];

  return (
    <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-[#1976D2] mb-12">الخدمات المميزة</h2>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">دراسات الجدوى الاقتصادية</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>

        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">إعداد القوائم المالية</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>

        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Network className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">تأسيس الشركات ودراسة قياس</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileSearch className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">الاستشارات المالية</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>

        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">المراجعة والتدقيق</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>

        <div className="border-b-4 border-[#1976D2] bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="text-[#FF6B35]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1976D2] mb-3">التقييم العقاري وقياس</h3>
          <p className="text-gray-600 text-sm mb-4">تعرّف على المزيد</p>
          <a href="#" className="text-[#1976D2] text-sm flex items-center justify-center gap-2">
            <span>←</span>
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

export default FeaturedServices;
