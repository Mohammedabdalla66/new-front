import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t, language } = useLanguage();
  const Navigate = useNavigate();
  const GoToLogin = () => {
    Navigate ("/auth/login")
  } 

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Left Side (RTL: Right Side) */}
          <div className="text-center lg:text-right rtl:lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E40AF] leading-tight mb-6">
              {t("heroTitle") || "منصة المحاسب القانوني"}
            </h1>
            <p className="text-xl text-gray-700 mb-4 leading-relaxed font-medium">
              {t("heroSubtitle") || "إحصل على أفضل خدمات الإستشارات والتدقيق بأسعار تنافسية"}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {language === "ar" 
                ? "تواصل مع مكاتب تدقيق معتمدة ومرخصة وإحصل على عروض أسعار متعددة وإختر أفضل عرض يناسب إحتياجات عملك"
                : "Connect with accredited and licensed auditing offices and get multiple price offers and choose the best offer that suits your business needs"}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center lg:items-end rtl:lg:items-start mb-8">
              <button 
                onClick={GoToLogin}
                className="bg-[#FF6B35] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#E55A2B] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4">
                {t("findService") || "ابدء الخدمة"}
              </button>
              <p className="text-gray-700 text-sm">
                {language === "ar" ? "ما هي الخدمة التي تحتاجها ؟" : "What service do you need?"}
              </p>
            </div>
          </div>

          {/* Hero Image - Right Side (RTL: Left Side) */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Accounting Professional"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Statistics Overlays */}
              <div className="absolute top-8 left-8 rtl:left-auto rtl:right-8 bg-[#1E40AF] rounded-full p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">1000 +</div>
                  <div className="text-sm text-white/90">{language === "ar" ? "عميل" : "Client"}</div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 right-8 rtl:right-auto rtl:left-8 bg-[#FF6B35] rounded-full p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">500 +</div>
                  <div className="text-sm text-white/90">{language === "ar" ? "مكاتب مرخصة ومعتمدة" : "Licensed Offices"}</div>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1E40AF] rounded-full p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">200 +</div>
                  <div className="text-sm text-white/90">{language === "ar" ? "خدمة منفذة" : "Services Executed"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
