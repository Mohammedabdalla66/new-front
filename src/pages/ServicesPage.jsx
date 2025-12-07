import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  FileText,
  TrendingUp,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const ServicesPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleRequestService = () => {
    navigate("/auth/login");
  };

  const services = [
    {
      id: 1,
      category: "consulting",
      title: language === "ar" ? "الاستشارات المالية" : "Financial Consultancy",
      description:
        language === "ar"
          ? "نقدم استشارات مالية متخصصة لمساعدة الشركات على اتخاذ قرارات مالية سليمة وتحقيق أهدافها الاستراتيجية"
          : "We provide specialized financial consulting to help companies make sound financial decisions and achieve their strategic goals",
      features:
        language === "ar"
          ? [
              "تحليل مالي شامل",
              "تخطيط استراتيجي",
              "إدارة السيولة",
              "تقييم الاستثمارات",
            ]
          : [
              "Comprehensive Financial Analysis",
              "Strategic Planning",
              "Liquidity Management",
              "Investment Evaluation",
            ],
      price:
        language === "ar" ? "يبدأ من 300 ريال عماني" : "Starting from 300 OMR",
      duration: language === "ar" ? "3-7 أيام عمل" : "3-7 business days",
      popular: true,
    },
    {
      id: 2,
      category: "consulting",
      title:
        language === "ar"
          ? "إستشارات الحوكمة وإدارة المخاطر"
          : "Governance Services",
      description:
        language === "ar"
          ? "نساعد المؤسسات على تطبيق معايير الحوكمة وإدارة المخاطر المالية والتشغيلية بفعالية"
          : "We help organizations implement governance standards and manage financial and operational risks effectively",
      features:
        language === "ar"
          ? [
              "تقييم المخاطر",
              "سياسات الحوكمة",
              "الامتثال التنظيمي",
              "إدارة الأزمات",
            ]
          : [
              "Risk Assessment",
              "Governance Policies",
              "Regulatory Compliance",
              "Crisis Management",
            ],
      price:
        language === "ar" ? "يبدأ من 500 ريال عماني" : "Starting from 500 OMR",
      duration: language === "ar" ? "7-10 أيام عمل" : "7-10 business days",
      popular: false,
    },
    {
      id: 3,
      category: "consulting",
      title:
        language === "ar"
          ? "التقييم التجاري للشركات"
          : "Business Valuation services",
      description:
        language === "ar"
          ? "تقييم دقيق للشركات والأعمال التجارية باستخدام أحدث المعايير والطرق المعترف بها دولياً"
          : "Accurate valuation of companies and businesses using the latest internationally recognized standards and methods",
      features:
        language === "ar"
          ? [
              "تقييم الأصول",
              "تحليل السوق",
              "القيمة العادلة",
              "تقارير تقييم معتمدة",
            ]
          : [
              "Asset Valuation",
              "Market Analysis",
              "Fair Value",
              "Certified Valuation Reports",
            ],
      price:
        language === "ar" ? "يبدأ من 800 ريال عماني" : "Starting from 800 OMR",
      duration: language === "ar" ? "10-15 يوم عمل" : "10-15 business days",
      popular: true,
    },
    {
      id: 4,
      category: "audit",
      title:
        language === "ar"
          ? "التدقيق الخارجي وعمل الميزانيات السنوية"
          : "External Auditing",
      description:
        language === "ar"
          ? "مراجعة خارجية معتمدة للقوائم المالية وإعداد الميزانيات السنوية وفقاً للمعايير المحاسبية"
          : "Certified external audit of financial statements and preparation of annual budgets according to accounting standards",
      features:
        language === "ar"
          ? [
              "تدقيق معتمد",
              "تقرير المدقق",
              "القوائم المالية السنوية",
              "شهادة الامتثال",
            ]
          : [
              "Certified Audit",
              "Auditor's Report",
              "Annual Financial Statements",
              "Compliance Certificate",
            ],
      price:
        language === "ar"
          ? "يبدأ من 1200 ريال عماني"
          : "Starting from 1200 OMR",
      duration: language === "ar" ? "15-20 يوم عمل" : "15-20 business days",
      popular: true,
    },
    {
      id: 5,
      category: "audit",
      title: language === "ar" ? "التدقيق الداخلي" : "Internal Auditing",
      description:
        language === "ar"
          ? "مراجعة داخلية شاملة للعمليات المالية والإدارية لتحسين الكفاءة وتقليل المخاطر"
          : "Comprehensive internal review of financial and administrative operations to improve efficiency and reduce risks",
      features:
        language === "ar"
          ? [
              "مراجعة النظم المالية",
              "تقييم الضوابط الداخلية",
              "تقارير التدقيق",
              "التوصيات العملية",
            ]
          : [
              "Financial Systems Review",
              "Internal Controls Assessment",
              "Audit Reports",
              "Practical Recommendations",
            ],
      price:
        language === "ar" ? "يبدأ من 700 ريال عماني" : "Starting from 700 OMR",
      duration: language === "ar" ? "10-12 يوم عمل" : "10-12 business days",
      popular: false,
    },
    {
      id: 6,
      category: "accounting",
      title:
        language === "ar" ? "مسك الدفاتر المحاسبية" : "Accounting bookkeeping",
      description:
        language === "ar"
          ? "إدارة شاملة للسجلات المحاسبية اليومية وإعداد التقارير المالية الدورية"
          : "Comprehensive management of daily accounting records and preparation of periodic financial reports",
      features:
        language === "ar"
          ? ["قيود يومية", "ميزان المراجعة", "تقارير شهرية", "متابعة الحسابات"]
          : [
              "Daily Entries",
              "Trial Balance",
              "Monthly Reports",
              "Account Follow-up",
            ],
      price:
        language === "ar"
          ? "يبدأ من 200 ريال عماني شهرياً"
          : "Starting from 200 OMR monthly",
      duration: language === "ar" ? "خدمة شهرية" : "Monthly service",
      popular: true,
    },
    {
      id: 7,
      category: "consulting",
      title:
        language === "ar"
          ? "دراسات الجدوى الإقتصادية"
          : "Economic Feasibility Studies",
      description:
        language === "ar"
          ? "إعداد دراسات جدوى شاملة للمشاريع الجديدة لتقييم الجدوى الاقتصادية والمالية"
          : "Preparation of comprehensive feasibility studies for new projects to assess economic and financial viability",
      features:
        language === "ar"
          ? [
              "دراسة السوق",
              "التحليل المالي",
              "تقدير التكاليف",
              "تحليل العائد على الاستثمار",
            ]
          : [
              "Market Study",
              "Financial Analysis",
              "Cost Estimation",
              "ROI Analysis",
            ],
      price:
        language === "ar" ? "يبدأ من 600 ريال عماني" : "Starting from 600 OMR",
      duration: language === "ar" ? "10-14 يوم عمل" : "10-14 business days",
      popular: false,
    },
    {
      id: 8,
      category: "consulting",
      title:
        language === "ar"
          ? "تقارير الملاءة المالية"
          : "Financial Solvency Reports",
      description:
        language === "ar"
          ? "إعداد تقارير متخصصة لتقييم الملاءة المالية والقدرة على الوفاء بالالتزامات"
          : "Preparation of specialized reports to assess financial solvency and ability to meet obligations",
      features:
        language === "ar"
          ? [
              "تحليل السيولة",
              "نسب الملاءة المالية",
              "تقييم المديونية",
              "تقرير معتمد",
            ]
          : [
              "Liquidity Analysis",
              "Solvency Ratios",
              "Debt Assessment",
              "Certified Report",
            ],
      price:
        language === "ar" ? "يبدأ من 400 ريال عماني" : "Starting from 400 OMR",
      duration: language === "ar" ? "5-7 أيام عمل" : "5-7 business days",
      popular: false,
    },
    {
      id: 9,
      category: "accounting",
      title:
        language === "ar" ? "تأسيس الشركات وادارة الأعمال" : "Business Setup",
      description:
        language === "ar"
          ? "خدمات متكاملة لتأسيس الشركات وتصميم الأنظمة المحاسبية وإدارة الأعمال"
          : "Integrated services for company formation, accounting system design, and business management",
      features:
        language === "ar"
          ? [
              "إجراءات التأسيس",
              "تصميم النظام المحاسبي",
              "إعداد الدليل المحاسبي",
              "التدريب الأولي",
            ]
          : [
              "Formation Procedures",
              "Accounting System Design",
              "Accounting Manual",
              "Initial Training",
            ],
      price:
        language === "ar" ? "يبدأ من 650 ريال عماني" : "Starting from 650 OMR",
      duration: language === "ar" ? "10-14 يوم عمل" : "10-14 business days",
      popular: true,
    },
    {
      id: 10,
      category: "tax",
      title:
        language === "ar"
          ? "خدمات الضرائب وتقييم ضريبة القيمة المضافة"
          : "Tax and VAT Assessment Services",
      description:
        language === "ar"
          ? "خدمات ضريبية شاملة تشمل إعداد الإقرارات وتقييم ضريبة القيمة المضافة والامتثال الضريبي"
          : "Comprehensive tax services including tax return preparation, VAT assessment, and tax compliance",
      features:
        language === "ar"
          ? [
              "ضريبة الدخل",
              "ضريبة القيمة المضافة",
              "الامتثال الضريبي",
              "التخطيط الضريبي",
            ]
          : ["Income Tax", "Value Added Tax", "Tax Compliance", "Tax Planning"],
      price:
        language === "ar" ? "يبدأ من 300 ريال عماني" : "Starting from 300 OMR",
      duration: language === "ar" ? "3-5 أيام عمل" : "3-5 business days",
      popular: true,
    },
    {
      id: 11,
      category: "accounting",
      title:
        language === "ar"
          ? "التصفيات وإغلاق السجل التجاري"
          : "Liquidation of the companies",
      description:
        language === "ar"
          ? "إدارة إجراءات تصفية الشركات وإغلاق السجلات التجارية وفقاً للأنظمة القانونية"
          : "Managing company liquidation procedures and commercial registry closure according to legal regulations",
      features:
        language === "ar"
          ? [
              "تصفية الأصول",
              "تسوية الالتزامات",
              "إنهاء التراخيص",
              "إغلاق السجل التجاري",
            ]
          : [
              "Asset Liquidation",
              "Liability Settlement",
              "License Termination",
              "Registry Closure",
            ],
      price:
        language === "ar" ? "يبدأ من 550 ريال عماني" : "Starting from 550 OMR",
      duration: language === "ar" ? "15-25 يوم عمل" : "15-25 business days",
      popular: false,
    },
    {
      id: 12,
      category: "audit",
      title:
        language === "ar"
          ? "المحاسبة الجنائية والتحقيق في الاحتيال المالي وتقارير إساءة الأمانة"
          : "Forensic Accounting, Financial Fraud Investigations, and Reports of Abuse of Trust",
      description:
        language === "ar"
          ? "تحقيقات متخصصة في حالات الاحتيال المالي وإساءة الأمانة وإعداد تقارير قانونية"
          : "Specialized investigations in financial fraud and embezzlement cases with legal report preparation",
      features:
        language === "ar"
          ? [
              "التحقيق الجنائي",
              "كشف الاحتيال",
              "تحليل المعاملات",
              "تقارير قانونية",
            ]
          : [
              "Forensic Investigation",
              "Fraud Detection",
              "Transaction Analysis",
              "Legal Reports",
            ],
      price:
        language === "ar"
          ? "يبدأ من 1000 ريال عماني"
          : "Starting from 1000 OMR",
      duration: language === "ar" ? "20-30 يوم عمل" : "20-30 business days",
      popular: false,
    },
    {
      id: 13,
      category: "audit",
      title:
        language === "ar"
          ? "تدقيق الامتثال والأداء"
          : "ISO Compliance Services",
      description:
        language === "ar"
          ? "مراجعة مدى الامتثال للأنظمة واللوائح وتقييم أداء المؤسسة وكفاءة العمليات"
          : "Review compliance with regulations and laws, and evaluate institutional performance and operational efficiency",
      features:
        language === "ar"
          ? [
              "تدقيق الامتثال",
              "تقييم الأداء",
              "مراجعة السياسات",
              "مؤشرات الأداء",
            ]
          : [
              "Compliance Audit",
              "Performance Evaluation",
              "Policy Review",
              "Performance Indicators",
            ],
      price:
        language === "ar" ? "يبدأ من 750 ريال عماني" : "Starting from 750 OMR",
      duration: language === "ar" ? "12-18 يوم عمل" : "12-18 business days",
      popular: false,
    },
    {
      id: 14,
      category: "consulting",
      title: language === "ar" ? "خدمات أخرى" : "Other Services",
      description:
        language === "ar"
          ? "نقدم مجموعة متنوعة من الخدمات المحاسبية والمالية المتخصصة حسب احتياجات العملاء"
          : "We offer a diverse range of specialized accounting and financial services according to client needs",
      features:
        language === "ar"
          ? ["استشارات مخصصة", "حلول مبتكرة", "خدمات متخصصة", "دعم فني"]
          : [
              "Customized Consulting",
              "Innovative Solutions",
              "Specialized Services",
              "Technical Support",
            ],
      price: language === "ar" ? "حسب الطلب" : "Upon Request",
      duration: language === "ar" ? "حسب المشروع" : "Per Project",
      popular: false,
    },
  ];

  // Calculate service counts for each category
  const getServiceCount = (categoryId) => {
    if (categoryId === "all") return services.length;
    return services.filter((service) => service.category === categoryId).length;
  };

  const serviceCategories = [
    {
      id: "all",
      name: language === "ar" ? "جميع الخدمات" : "All Services",
      icon: <Calculator className="w-5 h-5" />,
      count: getServiceCount("all"),
    },
    {
      id: "consulting",
      name: language === "ar" ? "الاستشارات المالية" : "Financial Consulting",
      icon: <TrendingUp className="w-5 h-5" />,
      count: getServiceCount("consulting"),
    },
    {
      id: "audit",
      name: language === "ar" ? "التدقيق والمراجعة" : "Audit & Review",
      icon: <Shield className="w-5 h-5" />,
      count: getServiceCount("audit"),
    },
    {
      id: "accounting",
      name: language === "ar" ? "المحاسبة والدفاتر" : "Accounting & Books",
      icon: <FileText className="w-5 h-5" />,
      count: getServiceCount("accounting"),
    },
    {
      id: "tax",
      name: language === "ar" ? "الضرائب" : "Tax Services",
      icon: <Users className="w-5 h-5" />,
      count: getServiceCount("tax"),
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddProject={() => {}} />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">{t("services")}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("servicesSubtitle")}
            </p>
            <div className="flex justify-center flex-1  ">
              <button className="bg-white   text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>{t("callNow")}</span>
              </button>
              <button className="border-2 ms-8 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 space-x-reverse">
                <Mail className="w-5 h-5" />
                <span>{t("requestConsultation")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="pb-16">
        {/* Service Categories */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center space-x-4 space-x-reverse">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-medium transition-colors mb-2 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative flex flex-col h-full"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4" />
                    <span>{t("mostRequested")}</span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t("includes")}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 space-x-reverse text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-6 mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">{t("price")}</p>
                        <p className="font-bold text-blue-600">
                          {service.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{t("duration")}</p>
                        <p className="font-medium text-gray-900 flex items-center space-x-1 space-x-reverse">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleRequestService}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <span>{t("requestService")}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("whyChooseOurServices")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("whyChooseOurServicesText")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t("guaranteedCertified")}
                </h3>
                <p className="text-gray-600">{t("guaranteedCertifiedText")}</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t("professionalTeam")}
                </h3>
                <p className="text-gray-600">{t("professionalTeamText")}</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t("fastExecution")}
                </h3>
                <p className="text-gray-600">{t("fastExecutionText")}</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t("competitivePrices")}
                </h3>
                <p className="text-gray-600">{t("competitivePricesText")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">{t("readyToStart")}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t("readyToStartText")}
              </p>
              <div className="flex justify-center space-x-4 space-x-reverse">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
                  {t("getFreeConsultation")}
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg">
                  {t("learnMore")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
