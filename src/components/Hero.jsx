import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CheckCircle, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t } = useLanguage();
  const Navigate = useNavigate();
  const GoToLogin = () => {
    Navigate ("/auth/login")
  } 

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left rtl:lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-end mb-12">
              <button 
              onClick={GoToLogin}
              className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t("findService")}
              </button>
              <button 
              onClick={GoToLogin}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-700 hover:bg-blue-50 transition-colors">
                {t("joinAsAccountant")}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center lg:text-left rtl:lg:text-right">
                <div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span className="text-2xl font-bold text-gray-900">500+</span>
                </div>
                <p className="text-gray-600">{t("certifiedAccountants")}</p>
              </div>
              <div className="text-center lg:text-left rtl:lg:text-right">
                <div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    1000+
                  </span>
                </div>
                <p className="text-gray-600">{t("clientsServed")}</p>
              </div>
              <div className="text-center lg:text-left rtl:lg:text-right">
                <div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end mb-2">
                  <Award className="h-5 w-5 text-purple-500 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    2000+
                  </span>
                </div>
                <p className="text-gray-600">{t("completedServices")}</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Accounting Professional"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 rtl:-right-auto rtl:-left-6 bg-green-100 rounded-full p-4 shadow-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="absolute -bottom-6 -left-6 rtl:-left-auto rtl:-right-6 bg-blue-100 rounded-full p-4 shadow-lg">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
