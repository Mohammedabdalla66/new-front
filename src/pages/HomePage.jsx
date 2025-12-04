import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeaturedServices from "../components/FeaturedServices";
import QualitySection from "../components/QualitySection";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQSection from "../components/FAQSection";
import SupportersSection from "../components/SupportersSection";
import Footer from "../components/Footer";
import AddProjectModal from "../components/AddProjectModal";

const HomePage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header onAddProject={() => setIsAddProjectModalOpen(true)} />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedServices />
        <QualitySection />
        <WhyChooseUs />
        <FAQSection />
        <SupportersSection />
      </main>
      <Footer />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
