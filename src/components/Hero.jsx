import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CheckCircle, TrendingUp, Award, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t, language } = useLanguage();
  const Navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const GoToLogin = () => {
    Navigate("/auth/login");
  };

  const services = [
    {
      id: 1,
      titleAr: "الاستشارات المالية",
      titleEn: "Financial Consultancy",
      value: "option_1",
    },
    {
      id: 2,
      titleAr: "إستشارات الحوكمة وإدارة المخاطر",
      titleEn: "Governance Services",
      value: "option_2",
    },
    {
      id: 3,
      titleAr: "التقييم التجاري للشركات",
      titleEn: "Business Valuation services",
      value: "option_3",
    },
    {
      id: 4,
      titleAr: "التدقيق الخارجي وعمل الميزانيات السنوية",
      titleEn: "External Auditing",
      value: "option_4",
    },
    {
      id: 5,
      titleAr: "التدقيق الداخلي",
      titleEn: "Internal Auditing",
      value: "option_5",
    },
    {
      id: 6,
      titleAr: "مسك الدفاتر المحاسبية",
      titleEn: "Accounting bookkeeping",
      value: "option_6",
    },
    {
      id: 7,
      titleAr: "دراسات الجدوى الإقتصادية",
      titleEn: "Economic Feasibility Studies",
      value: "option_7",
    },
    {
      id: 8,
      titleAr: "تقارير الملاءة المالية",
      titleEn: "Financial Solvency Reports",
      value: "option_8",
    },
    {
      id: 9,
      titleAr: "تأسيس الشركات وادارة الأعمال",
      titleEn: "Business Setup",
      value: "option_9",
    },
    {
      id: 10,
      titleAr: "خدمات الضرائب وتقييم ضريبة القيمة المضافة",
      titleEn: "Tax and VAT Assessment Services",
      value: "option_10",
    },
    {
      id: 11,
      titleAr: "التصفيات وإغلاق السجل التجاري",
      titleEn: "Liquidation of the companies",
      value: "option_11",
    },
    {
      id: 12,
      titleAr:
        "المحاسبة الجنائية والتحقيق في الاحتيال المالي وتقارير إساءة الأمانة",
      titleEn:
        "Forensic Accounting, Financial Fraud Investigations, and Reports of Abuse of Trust",
      value: "option_12",
    },
    {
      id: 13,
      titleAr: "تدقيق الامتثال والأداء",
      titleEn: "ISO Compliance Services",
      value: "option_13",
    },
    {
      id: 14,
      titleAr: "خدمات أخرى",
      titleEn: "Other Services",
      value: "option_14",
    },
  ];

  // Filter services based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.trim();
    const filtered = services.filter((service) => {
      const title = language === "ar" ? service.titleAr : service.titleEn;
      // For Arabic, compare directly (no case conversion needed)
      // For English, use case-insensitive comparison
      if (language === "ar") {
        return title.includes(query);
      } else {
        return title.toLowerCase().includes(query.toLowerCase());
      }
    });

    setFilteredServices(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery, language]);

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSearchQuery(language === "ar" ? service.titleAr : service.titleEn);
    setShowSuggestions(false);
    // Navigate to request form with pre-filled service
    Navigate("/client/requests/new", {
      state: {
        preselectedService: service.value,
        preselectedTitle: language === "ar" ? service.titleAr : service.titleEn,
      },
    });
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredServices([]);
    setShowSuggestions(false);
  };

  return (
    <section id="aboutUs" className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="./1.png" alt="Background" className="w-full h-full" />
        <div className=""></div>
      </div>
      <div
        className="relative flex flex-col-reverse lg:flex-row justify-between flex-wrap gap-10 lg:gap-0 px-6 md:px-10 lg:px-0"
        dir="rtl"
      >
        <div className="w-full lg:w-1/2 relative min-h-[auto] lg:min-h-[600px] flex flex-row justify-around items-center lg:block py-4 lg:py-0">
          <div className="static lg:absolute lg:top-72 lg:right-28 transform hover:scale-110 transition-all duration-300 flex flex-col justify-center items-center text-right animate-float-slow">
            <h4 className="text-xl lg:text-5xl font-light text-white mb-2 lg:me-24">+ 500 </h4>
            <h4 className="text-xs lg:text-xl font-light text-white font-center text-center leading-tight">
              {t("licensedOffices")}
            </h4>
          </div>

          <div className="static lg:absolute lg:top-72 lg:left-0 transform hover:scale-110 transition-all duration-300 flex flex-col justify-center items-center text-right  animate-float-medium">
            <h4 className="text-xl lg:text-4xl font-light text-white mb-1"> + 1000 </h4>
            <h4 className="text-xs lg:text-xl text-white font-light">{t("client")}</h4>
          </div>
          <div className="static lg:absolute lg:bottom-10 lg:right-1/2 lg:translate-x-1/2 transform hover:scale-110 transition-all duration-300 flex flex-col justify-center items-center text-right  animate-float-fast">
            <h4 className="text-lg lg:text-3xl font-light text-white mb-1"> + 200 </h4>
            <h4 className="text-xs lg:text-lg text-white   font-light">{t("servicesExecuted")}</h4>
          </div>
        </div>
        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className="w-full lg:w-1/2 px-2 md:px-8 lg:px-12 xl:px-24"
        >
          <div className="flex gap-x-3 pt-8 md:pt-10 lg:pt-12 items-center justify-center lg:justify-start">
            <img src="./logo.png" className="w-20 h-20 md:w-24 md:h-24" />
            <h3 className="text-[#2075B9] text-4xl font-bold">
              {t("heroPlatformName")}
            </h3>
          </div>
          <h4 className="text-[#2075B9] text-2xl md:text-3xl font-bold mt-10 md:mt-16 lg:mt-24 xl:mt-32">
            {t("heroCTAHeadline")}
          </h4>
          <h5 className="text-[#3B3F41] text-lg md:text-xl font-bold mt-4 md:mt-6">
            {t("heroCTASubtitle1")}
          </h5>
          <h5 className="text-[#3B3F41] mb-8 md:mb-10 text-base md:text-lg font-bold">
            {t("heroCTASubtitle2")}
          </h5>
          <div className="">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
           
              <div className="relative flex-1" ref={searchRef}>
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 ${language === "ar" ? "right-0 pr-4" : "left-0 pl-4"
                      } flex items-center pointer-events-none`}
                  >
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (
                        searchQuery.trim() !== "" &&
                        filteredServices.length > 0
                      ) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder={`${t("searchForService")}...`}
                    className={`w-full ${language === "ar" ? "pr-12 pl-12" : "pl-12 pr-12"
                      } py-4 rounded-lg text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F97316] shadow-lg`}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className={`absolute inset-y-0 ${language === "ar" ? "left-0 pl-4" : "right-0 pr-4"
                        } flex items-center text-gray-400 hover:text-gray-600`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {showSuggestions && filteredServices.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    {filteredServices.map((service) => {
                      const title =
                        language === "ar" ? service.titleAr : service.titleEn;
                      const queryIndex =
                        language === "ar"
                          ? title.indexOf(searchQuery)
                          : title.toLowerCase().indexOf(searchQuery.toLowerCase());
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="text-gray-900 font-medium">
                            {queryIndex !== -1 ? (
                              <>
                                {title.substring(0, queryIndex)}
                                <span className="bg-yellow-200 font-semibold">
                                  {title.substring(
                                    queryIndex,
                                    queryIndex + searchQuery.length
                                  )}
                                </span>
                                {title.substring(queryIndex + searchQuery.length)}
                              </>
                            ) : (
                              title
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {showSuggestions &&
                  searchQuery.trim() !== "" &&
                  filteredServices.length === 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl p-4"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <p className="text-gray-600 text-center">
                        {language === "ar" ? "لا توجد نتائج" : "No results found"}
                      </p>
                    </div>
                  )}
              </div>
                 <button
                onClick={GoToLogin}
                className="bg-[#F97316] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#EA580C] transition-colors shadow-lg hover:shadow-xl whitespace-nowrap">
                {t("startService")}
              </button>
            </div>
            
          </div>
        </div>
      </div>
      {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`text-center ${language === 'en' ? 'lg:text-left' : 'lg:text-right rtl:lg:text-right'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t("heroDescription")}
            </p>

            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button 
                onClick={GoToLogin}
                  className="bg-[#F97316] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#EA580C] transition-colors shadow-lg hover:shadow-xl whitespace-nowrap">
                {t("startService")}
              </button>

                <div className="relative flex-1" ref={searchRef}>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${language === "ar" ? "right-0 pr-4" : "left-0 pl-4"} flex items-center pointer-events-none`}>
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        if (searchQuery.trim() !== "" && filteredServices.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      placeholder={language === "ar" ? "ابحث عن الخدمة..." : "Search for a service..."}
                      className={`w-full ${language === "ar" ? "pr-12 pl-12" : "pl-12 pr-12"} py-4 rounded-lg text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F97316] shadow-lg`}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    />
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
                        className={`absolute inset-y-0 ${language === "ar" ? "left-0 pl-4" : "right-0 pr-4"} flex items-center text-gray-400 hover:text-gray-600`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
            </div>

                  {showSuggestions && filteredServices.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      {filteredServices.map((service) => {
                        const title = language === "ar" ? service.titleAr : service.titleEn;
                        const queryIndex = language === "ar" 
                          ? title.indexOf(searchQuery)
                          : title.toLowerCase().indexOf(searchQuery.toLowerCase());
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="text-gray-900 font-medium">
                              {queryIndex !== -1 ? (
                                <>
                                  {title.substring(0, queryIndex)}
                                  <span className="bg-yellow-200 font-semibold">
                                    {title.substring(queryIndex, queryIndex + searchQuery.length)}
                                  </span>
                                  {title.substring(queryIndex + searchQuery.length)}
                                </>
                              ) : (
                                title
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {showSuggestions && searchQuery.trim() !== "" && filteredServices.length === 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl p-4"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <p className="text-gray-600 text-center">
                        {language === "ar" ? "لا توجد نتائج" : "No results found"}
            </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              
            </div>
            
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-8 rtl:left-auto rtl:right-2 sm:rtl:right-4 md:rtl:right-8 bg-[#2075ba] rounded-full p-2 sm:p-3 md:p-6 shadow-xl">
              <div className="text-center">
                <div className="text-base sm:text-xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">1000 +</div>
                <div className="text-xs sm:text-sm text-white/90 leading-tight">{t("client")}</div>
              </div>
            </div>
            
            <div className="absolute top-8 right-4 sm:top-20 sm:right-6 md:top-32 md:right-12 rtl:right-auto rtl:left-4 sm:rtl:left-6 md:rtl:left-12 bg-[#2075ba] rounded-full p-2 sm:p-3 md:p-6 shadow-xl">
              <div className="text-center">
                <div className="text-base sm:text-xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">500 +</div>
                <div className="text-xs sm:text-sm text-white/90 leading-tight">{t("licensedOffices")}</div>
              </div>
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 rtl:translate-x-1/2 sm:bottom-4 md:bottom-8 bg-[#2075ba] rounded-full p-2 sm:p-3 md:p-6 shadow-xl">
              <div className="text-center">
                <div className="text-base sm:text-xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">200 +</div>
                <div className="text-xs sm:text-sm text-white/90 leading-tight">{t("servicesExecuted")}</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
