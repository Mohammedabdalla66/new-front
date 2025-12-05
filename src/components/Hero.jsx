import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CheckCircle, TrendingUp, Award } from "lucide-react";
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
          src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Left Side (RTL) */}
          <div className="text-center lg:text-right rtl:lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t("heroDescription")}
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <button 
                onClick={GoToLogin}
                className="bg-[#F97316] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#EA580C] transition-colors shadow-lg hover:shadow-xl">
                {t("startService")}
              </button>
            </div>

            <p className="text-white/90 text-lg mb-4">
              {t("whatServiceNeed")}
            </p>
          </div>

          {/* Right Side - Image with Statistics Overlays */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Accounting Professional"
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Statistics Overlays */}
            <div className="absolute top-8 left-8 rtl:left-auto rtl:right-8 bg-[#1E40AF] rounded-full p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000 +</div>
                <div className="text-sm text-white/90">{t("client")}</div>
              </div>
            </div>
            
            <div className="absolute top-32 right-12 rtl:right-auto rtl:left-12 bg-[#F97316] rounded-full p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500 +</div>
                <div className="text-sm text-white/90">{t("licensedOffices")}</div>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rtl:translate-x-1/2 bg-[#1E40AF] rounded-full p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">200 +</div>
                <div className="text-sm text-white/90">{t("servicesExecuted")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
