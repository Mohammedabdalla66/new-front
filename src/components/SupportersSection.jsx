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
    <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
        <img src="https://fintechgate.net/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-13-at-10.43.12-AM.jpeg" alt="Client 1" className="h-16 object-contain mx-auto" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zw0aFBCGW3zVssdscJOrubhsldGIevZZkw&s" alt="Client 2" className="h-16 object-contain mx-auto" />
        <img src="https://muscataudit.com/wp-content/uploads/2025/03/cropped-cropped-MAAS-Logo-jpeg.jpg" alt="Client 3" className="h-16 object-contain mx-auto" />
        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQMdz0eJx8_Qt2cEDnScQnRiYjLyvPTV1FJuXPiKiz8TY96_1R6" alt="Client 4" className="h-16 object-contain mx-auto" />
        <img src="https://fintechgate.net/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-13-at-10.43.12-AM.jpeg" alt="Client 5" className="h-16 object-contain mx-auto" />
        <img src="https://muscataudit.com/wp-content/uploads/2025/03/cropped-cropped-MAAS-Logo-jpeg.jpg" alt="Client 6" className="h-16 object-contain mx-auto" />
      </div>
    </div>
    <div className="fixed bottom-8 left-8">
        <a
          href="https://wa.me/+201129028280"
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

      <div className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-[#1976D2] mb-6">الشركاء</h3>
          <div className="flex justify-center items-center gap-12">
            <img src="https://fintechgate.net/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-13-at-10.43.12-AM.jpeg" alt="Partner Logo" className="h-12 object-contain opacity-70" />
            <img src="https://muscataudit.com/wp-content/uploads/2025/03/cropped-cropped-MAAS-Logo-jpeg.jpg" alt="Partner Logo" className="h-12 object-contain opacity-70" />
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQMdz0eJx8_Qt2cEDnScQnRiYjLyvPTV1FJuXPiKiz8TY96_1R6" alt="Partner Logo" className="h-12 object-contain opacity-70" />
          </div>
        </div>
      </div>
  </section>
  
  );
};

export default SupportersSection;
