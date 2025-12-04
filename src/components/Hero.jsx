import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BarChart3, Users } from "lucide-react";

const Hero = () => {
  const { t, language } = useLanguage();
  const Navigate = useNavigate();
  const GoToLogin = () => {
    Navigate ("/auth/login")
  } 

  return (
    <section className="relative bg-gradient-to-l from-blue-100 to-blue-50 py-20 overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6B35] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute right-20 top-10 w-64 h-64 bg-[#1976D2] rounded-full transform rotate-45"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-12 items-center relative z-10">
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/7681670/pexels-photo-7681670.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Business"
          className="rounded-lg shadow-2xl w-full"
        />
        <div className="absolute top-10 -left-10 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center text-white">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1976D2]">1000 +</div>
            <div className="text-sm text-gray-600">عميل راضي</div>
          </div>
        </div>
        <div className="absolute top-32 -left-10 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center text-white">
            <BarChart3 size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1976D2]">80 +</div>
            <div className="text-sm text-gray-600">كفاءة الخدمة المقدمة</div>
          </div>
        </div>
        <div className="absolute bottom-10 -left-10 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center text-white">
            <Users size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1976D2]">200 +</div>
            <div className="text-sm text-gray-600">كادر مؤهل</div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center justify-end gap-3 mb-6">
          <h1 className="text-4xl font-bold text-[#1976D2]">منصة المحاسب القانوني</h1>
          <div className="w-16 h-16 bg-white rounded-sm shadow-lg flex items-center justify-center">
            <div className="relative">
              <div className="w-10 h-10 bg-[#FF6B35] transform rotate-45"></div>
              <div className="absolute top-0 left-0 w-10 h-10 bg-[#1976D2] transform rotate-45 translate-x-3"></div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#1976D2] mb-4">
          إحصل على أفضل خدمات الإستشارات
          <br />
          والتدقيق بأسعار تنافسية وسريعة
        </h2>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          تواصل مع مكاتب تدقيق معتمدة ومرخصة
          <br />
          واحصل على عرض أسعار مفصلة وقائمة احتياجاتك بنفسك احتياجاتك عملك
        </p>

        <button className="bg-[#FF6B35] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#E55A28] transition-colors">
          ابدأ الآن
        </button>

        <p className="text-sm text-gray-500 mt-4">
          أو اطلع على الخدمة التي تناسبك ←
        </p>
      </div>
    </div>
  </section>
  );
};

export default Hero;
