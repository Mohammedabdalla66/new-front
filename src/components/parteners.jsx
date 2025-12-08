import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
// import firstChoice from "../assets/Screenshot 2025-12-05 001556.png";

const PartenersSection = () => {
  const { t, language } = useLanguage();

  const supporters = [
    {
      name: "FinTech Gate",
      imageUrl: "./partener1.png",
      alt: "FinTech Gate"
    },
    {
      name: "Partner 2",
      imageUrl: "./partener2.png",
      alt: "Partner 2"
    },
    {
      name: "Muscat Audit",
      imageUrl: "./partener3.png",
      alt: "Muscat Audit"
    },
  ];

  return (
    <section className="py-1 bg-white">
      <div className={`fixed bottom-4 sm:bottom-8 ${language === "ar" ? "left-4 sm:left-8" : "right-4 sm:right-8"} z-50`}>
        <a
          href="https://wa.me/+96899337448"
          className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-3 px-4 md:px-20 lg:px-40 items-center">
        <h3 className="font-bold text-3xl md:text-5xl text-[#2176B9] mt-6 lg:mt-0 border-e-0 lg:border-e-2 lg:pe-6 border-[#707070] mb-6 lg:mb-0 whitespace-nowrap">
          {t("partners")}
        </h3>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
            {supporters.slice(0, 3).map((supporter, index) => (
              <div
                key={index}
                className=" hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer p-4 flex items-center justify-center w-full"
              >
                <img
                  src={supporter.imageUrl}
                  alt={supporter.alt || supporter.name}
                  className="h-12 sm:h-16 lg:h-20 object-contain mx-auto max-w-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="bg-white py-8 border-t">
        <div className="max-w-2xl mx-auto px-10 sm:px-6 lg:px-10 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1976D2] mb-4 sm:mb-6">{t("partners")}</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
          <img src="/oman-data-park-logo.jpg" width={100} height={100} alt="Partner Logo" className="h-10 sm:h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" onError={(e) => { e.target.style.display = 'none'; }} />
            <img src="https://fintechgate.net/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-13-at-10.43.12-AM.jpeg" alt="Partner Logo" className="h-20 sm:h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/download1.png" alt="Partner Logo" className="h-10 sm:h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        </div>
      </div> */}
    </section>

  );
};

export default PartenersSection;
