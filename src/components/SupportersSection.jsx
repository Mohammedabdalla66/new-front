import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const SupportersSection = () => {
  const { t, language } = useLanguage();

  const supporters = [
    {
      name: "FinTech Gate",
      imageUrl: "https://fintechgate.net/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-13-at-10.43.12-AM.jpeg",
      alt: "FinTech Gate"
    },
    {
      name: "Partner 2",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zw0aFBCGW3zVssdscJOrubhsldGIevZZkw&s",
      alt: "Partner 2"
    },
    {
      name: "Muscat Audit",
      imageUrl: "https://muscataudit.com/wp-content/uploads/2025/03/cropped-cropped-MAAS-Logo-jpeg.jpg",
      alt: "Muscat Audit"
    },
    {
      name: "First Choice",
      imageUrl: "../assets/Screenshot 2025-12-05 001556.png",
      alt: "First Choice"
    },
    {
        name : "Oman Data Park" ,
        imageUrl: "../assets/download2.png",
        alt: ""
    },
    {
        name : "" ,
        imageUrl: "../assets/download1.png",
        alt: ""
    }
   
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "ar" ? "شركاؤنا ومؤيدونا" : "Our Partners & Supporters"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === "ar" 
              ? "نفتخر بشراكتنا مع أفضل المؤسسات والمنظمات الرائدة في القطاع" 
              : "Proud to partner with leading organizations in the industry"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center justify-items-center">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="group flex items-center justify-center p-4 sm:p-6 w-full min-h-[120px] sm:min-h-[150px] bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300"
            >
              <img
                src={supporter.imageUrl}
                alt={supporter.alt || supporter.name}
                className="max-w-[90%] max-h-[100px] sm:max-h-[120px] w-auto h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image for ${supporter.name}:`, supporter.imageUrl);
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="hidden items-center justify-center text-gray-400 text-xs sm:text-sm text-center px-2 font-medium"
              >
                {supporter.name}
              </div>
            </div>
          ))}
        </div>
        
        
        
      
      </div>
    </section>
  );
};

export default SupportersSection;
