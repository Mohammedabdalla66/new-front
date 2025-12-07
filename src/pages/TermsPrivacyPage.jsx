import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, Shield, CreditCard, Lock, Users, Eye, Share2, AlertCircle } from "lucide-react";

const TermsPrivacyPage = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      id: "definitions",
      icon: FileText,
      titleKey: "termsDefinitionsTitle",
      contentKey: "termsDefinitionsContent",
    },
    {
      id: "user-responsibilities",
      icon: Users,
      titleKey: "termsUserResponsibilitiesTitle",
      contentKey: "termsUserResponsibilitiesContent",
    },
    {
      id: "account-security",
      icon: Lock,
      titleKey: "termsAccountSecurityTitle",
      contentKey: "termsAccountSecurityContent",
    },
    {
      id: "payments",
      icon: CreditCard,
      titleKey: "termsPaymentsTitle",
      contentKey: "termsPaymentsContent",
    },
    {
      id: "service-availability",
      icon: AlertCircle,
      titleKey: "termsServiceAvailabilityTitle",
      contentKey: "termsServiceAvailabilityContent",
    },
    {
      id: "intellectual-property",
      icon: Shield,
      titleKey: "termsIntellectualPropertyTitle",
      contentKey: "termsIntellectualPropertyContent",
    },
    {
      id: "data-collection",
      icon: Eye,
      titleKey: "privacyDataCollectionTitle",
      contentKey: "privacyDataCollectionContent",
    },
    {
      id: "cookies",
      icon: FileText,
      titleKey: "privacyCookiesTitle",
      contentKey: "privacyCookiesContent",
    },
    {
      id: "data-sharing",
      icon: Share2,
      titleKey: "privacyDataSharingTitle",
      contentKey: "privacyDataSharingContent",
    },
    {
      id: "data-security",
      icon: Lock,
      titleKey: "privacyDataSecurityTitle",
      contentKey: "privacyDataSecurityContent",
    },
    {
      id: "user-rights",
      icon: Shield,
      titleKey: "privacyUserRightsTitle",
      contentKey: "privacyUserRightsContent",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddProject={() => {}} />
      
      {/* Hero Header */}
      <div className="bg-[#2075ba] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {language === "ar" ? "الشروط والأحكام وسياسة الخصوصية" : "Terms & Conditions and Privacy Policy"}
          </h1>
          <p className="text-xl text-white/90 text-center leading-relaxed">
            {language === "ar"
              ? "يرجى قراءة هذه الوثائق بعناية قبل استخدام منصة CaHup. باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط."
              : "Please read these documents carefully before using the CaHup platform. By using our services, you agree to be bound by these terms."}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            {language === "ar"
              ? "نرحب بك في منصة CaHup. توضح هذه الوثيقة الشروط والأحكام التي تحكم استخدامك لمنصتنا، بالإضافة إلى سياسة الخصوصية التي تحدد كيفية جمع واستخدام وحماية معلوماتك الشخصية. نحن ملتزمون بشفافية كاملة فيما يتعلق بحقوقك ومسؤولياتك."
              : "Welcome to the CaHup platform. This document outlines the terms and conditions that govern your use of our platform, as well as the privacy policy that details how we collect, use, and protect your personal information. We are committed to full transparency regarding your rights and responsibilities."}
          </p>
        </div>

        {/* Terms & Conditions Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-1 w-16 bg-[#ef6820] mr-4 rtl:mr-0 rtl:ml-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </h2>
          </div>

          {sections.slice(0, 6).map((section) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-lg shadow-sm p-8 mb-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-[#2075ba]/10 rounded-lg mr-4 rtl:mr-0 rtl:ml-4">
                    <IconComponent className="h-6 w-6 text-[#2075ba]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 flex-1">
                    {t(section.titleKey)}
                  </h3>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {t(section.contentKey).split("\n").map((paragraph, index) => (
                    <p key={index} className={paragraph.trim() ? "" : "hidden"}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Policy Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-1 w-16 bg-[#ef6820] mr-4 rtl:mr-0 rtl:ml-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </h2>
          </div>

          {sections.slice(6).map((section) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-lg shadow-sm p-8 mb-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-[#2075ba]/10 rounded-lg mr-4 rtl:mr-0 rtl:ml-4">
                    <IconComponent className="h-6 w-6 text-[#2075ba]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 flex-1">
                    {t(section.titleKey)}
                  </h3>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {t(section.contentKey).split("\n").map((paragraph, index) => (
                    <p key={index} className={paragraph.trim() ? "" : "hidden"}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {language === "ar"
              ? "إذا كان لديك أي أسئلة أو استفسارات حول هذه الشروط أو سياسة الخصوصية، يرجى الاتصال بنا:"
              : "If you have any questions or inquiries regarding these terms or privacy policy, please contact us:"}
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>{language === "ar" ? "البريد الإلكتروني:" : "Email:"}</strong> info@CaHup.com
            </p>
            <p>
              <strong>{language === "ar" ? "الهاتف:" : "Phone:"}</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Agreement Statement */}
        <div className="bg-gradient-to-r from-[#2075ba] to-[#1e5a8a] rounded-lg shadow-lg p-8 text-white">
          <h3 className="text-2xl font-semibold mb-4">
            {language === "ar" ? "الإقرار والموافقة" : "Acknowledgement & Agreement"}
          </h3>
          <p className="leading-relaxed text-lg">
            {language === "ar"
              ? "باستخدام منصة CaHup، فإنك تقر بأنك قد قرأت وفهمت هذه الشروط والأحكام وسياسة الخصوصية. كما توافق على الالتزام بجميع الأحكام الواردة فيها. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا."
              : "By using the CaHup platform, you acknowledge that you have read and understood these Terms & Conditions and Privacy Policy. You also agree to comply with all provisions contained herein. If you do not agree to any of these terms, please do not use our services."}
          </p>
          <p className="mt-4 text-white/90">
            {language === "ar"
              ? "تاريخ آخر تحديث: يناير 2025"
              : "Last Updated: January 2025"}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPrivacyPage;
