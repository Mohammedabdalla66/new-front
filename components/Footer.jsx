import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Calculator,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = [
    { key: "aboutUs", href: "/about" },
    { key: "privacyPolicy", href: "/privacy" },
    { key: "terms", href: "/terms" },
    { key: "support", href: "/support" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">
                {language === "ar" ? "حسابي" : "AccountPro"}
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {language === "ar"
                ? "منصتك الموثوقة لجميع الخدمات المحاسبية. نربطك بأفضل المحاسبين المعتمدين لتلبية احتياجاتك المالية."
                : "Your trusted platform for all accounting services. We connect you with certified professionals for your financial needs."}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors`}
                    aria-label={`Social media link ${index + 1}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@accountpro.com</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 {language === "ar" ? "حسابي" : "AccountPro"}.{" "}
            {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
