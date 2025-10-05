import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../data/mockData";

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("testimonials")}
          </h2>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-current"
                />
              ))}
            </div>

            <blockquote className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
              "{testimonials[currentIndex].text[language]}"
            </blockquote>

            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name[language]}
                className="w-12 h-12 rounded-full mr-4 rtl:mr-0 rtl:ml-4 object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {testimonials[currentIndex].name[language]}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonials[currentIndex].role[language]}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 rtl:left-auto rtl:right-0 top-1/2 -translate-y-1/2 -translate-x-4 rtl:translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 rtl:right-auto rtl:left-0 top-1/2 -translate-y-1/2 translate-x-4 rtl:-translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
