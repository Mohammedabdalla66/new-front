import React, { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const serviceCategories = [
    {
      id: "all",
      name: t("allServices"),
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      id: "accounting",
      name: t("generalAccounting"),
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "audit",
      name: t("financialAudit"),
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "consulting",
      name: t("financialConsulting"),
      icon: <TrendingUp className="w-5 h-5" />,
    },
    { id: "tax", name: t("taxServices"), icon: <Users className="w-5 h-5" /> },
  ];

  const services = [
    {
      id: 1,
      category: "accounting",
      title: t("financialStatementsPrep"),
      description: t("financialStatementsDesc"),
      features:
        language === "ar"
          ? [
              "قائمة المركز المالي",
              "قائمة الدخل",
              "قائمة التدفقات النقدية",
              "الإيضاحات المتممة",
            ]
          : [
              "Balance Sheet",
              "Income Statement",
              "Cash Flow Statement",
              "Notes to Financial Statements",
            ],
      price:
        language === "ar" ? "يبدأ من 500 ريال عماني" : "Starting from 500 OMR",
      duration: language === "ar" ? "5-7 أيام عمل" : "5-7 business days",
      popular: true,
    },
    {
      id: 2,
      category: "accounting",
      title: t("bookkeepingService"),
      description: t("bookkeepingDesc"),
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
      popular: false,
    },
    {
      id: 3,
      category: "audit",
      title: t("internalAudit"),
      description: t("internalAuditDesc"),
      features:
        language === "ar"
          ? [
              "مراجعة النظم المالية",
              "تقييم المخاطر",
              "تقارير التدقيق",
              "التوصيات العملية",
            ]
          : [
              "Financial Systems Review",
              "Risk Assessment",
              "Audit Reports",
              "Practical Recommendations",
            ],
      price:
        language === "ar" ? "يبدأ من 800 ريال عماني" : "Starting from 800 OMR",
      duration: language === "ar" ? "10-15 يوم عمل" : "10-15 business days",
      popular: false,
    },
    {
      id: 4,
      category: "audit",
      title: t("externalAudit"),
      description: t("externalAuditDesc"),
      features:
        language === "ar"
          ? ["تدقيق معتمد", "تقرير المدقق", "شهادة الامتثال", "ضمان الجودة"]
          : [
              "Certified Audit",
              "Auditor Report",
              "Compliance Certificate",
              "Quality Assurance",
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
      category: "consulting",
      title: t("financialConsultingService"),
      description: t("financialConsultingDesc"),
      features:
        language === "ar"
          ? ["تحليل مالي", "تخطيط استراتيجي", "دراسات الجدوى", "إدارة المخاطر"]
          : [
              "Financial Analysis",
              "Strategic Planning",
              "Feasibility Studies",
              "Risk Management",
            ],
      price:
        language === "ar" ? "يبدأ من 300 ريال عماني" : "Starting from 300 OMR",
      duration: language === "ar" ? "3-5 أيام عمل" : "3-5 business days",
      popular: false,
    },
    {
      id: 6,
      category: "consulting",
      title: t("budgetPreparation"),
      description: t("budgetPreparationDesc"),
      features:
        language === "ar"
          ? [
              "ميزانية تشغيلية",
              "ميزانية رأسمالية",
              "تحليل الانحرافات",
              "متابعة دورية",
            ]
          : [
              "Operational Budget",
              "Capital Budget",
              "Variance Analysis",
              "Periodic Follow-up",
            ],
      price:
        language === "ar" ? "يبدأ من 400 ريال عماني" : "Starting from 400 OMR",
      duration: language === "ar" ? "7-10 أيام عمل" : "7-10 business days",
      popular: false,
    },
    {
      id: 7,
      category: "tax",
      title: t("taxReturns"),
      description: t("taxReturnsDesc"),
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
        language === "ar" ? "يبدأ من 250 ريال عماني" : "Starting from 250 OMR",
      duration: language === "ar" ? "3-5 أيام عمل" : "3-5 business days",
      popular: true,
    },
    {
      id: 8,
      category: "tax",
      title: t("taxConsulting"),
      description: t("taxConsultingDesc"),
      features:
        language === "ar"
          ? [
              "تفسير القوانين",
              "التخطيط الضريبي",
              "حل المنازعات",
              "التمثيل أمام الهيئات",
            ]
          : [
              "Law Interpretation",
              "Tax Planning",
              "Dispute Resolution",
              "Representation before Authorities",
            ],
      price:
        language === "ar" ? "يبدأ من 350 ريال عماني" : "Starting from 350 OMR",
      duration: language === "ar" ? "2-4 أيام عمل" : "2-4 business days",
      popular: false,
    },
    {
      id: 9,
      category: "accounting",
      title: t("companyFormation"),
      description: t("companyFormationDesc"),
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
              "Accounting Manual Preparation",
              "Initial Training",
            ],
      price:
        language === "ar" ? "يبدأ من 600 ريال عماني" : "Starting from 600 OMR",
      duration: language === "ar" ? "10-14 يوم عمل" : "10-14 business days",
      popular: true,
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
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>{t("callNow")}</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 space-x-reverse">
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4" />
                    <span>{t("mostRequested")}</span>
                  </div>
                )}

                <div className="p-8">
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

                  <div className="border-t pt-6">
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

                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
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
