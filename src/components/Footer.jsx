import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import CaHupLogo from "./CaHupLogo";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { scrollToSection } from "../utils/scrollUtils";

const Footer = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const footerLinks = [
    { key: "aboutUs", href: "/services" },
    { key: "FAQ", href: "#FAQ" },
    { key: "terms", href: "/terms" },
    { key: "support", href: "/contact" },
  ];

  const handleLinkClick = (e, href) => {
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Check if we're on the homepage (where sections exist)
    const isHomePage = location.pathname === "/";
    
    if (href.startsWith("#")) {
      // If we're on homepage, scroll directly
      if (isHomePage) {
        scrollToSection(href, {
          offset: 80, // Adjust for fixed header height
          behavior: 'smooth',
        });
      } else {
        // Navigate to homepage first, then scroll after navigation
        navigate("/", { state: { scrollTo: href } });
      }
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1ACtkoWCpq/", color: "hover:text-blue-500" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ca-hub-7192783a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", color: "hover:text-blue-600" },
    { icon: Twitter, href: "https://x.com/cahub7782", color: "hover:text-blue-400" },
    { icon: Instagram, href: "https://www.instagram.com/cahub.om?igsh=bmdwaDBxZzc3Mjkz&utm_source=qr", color: "hover:text-pink-500" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Partners/Supporters Section */}
    
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <CaHupLogo className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">
                {language === "ar" ? "CaHup" : "CaHup"}
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
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {t(link.key)}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("contactUs")}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@CaHup.com</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Partners at bottom */}
       

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 CaHup {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
