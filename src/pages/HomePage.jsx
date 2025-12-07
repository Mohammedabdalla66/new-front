import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeaturedServices from "../components/FeaturedServices";
import QualityRights from "../components/QualityRights";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import SupportersSection from "../components/SupportersSection";
import Footer from "../components/Footer";
import AddProjectModal from "../components/AddProjectModal";
import { scrollToSection } from "../utils/scrollUtils";

const HomePage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const location = useLocation();

  // Handle scroll when navigating from another page
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        scrollToSection(location.state.scrollTo, {
          offset: 80,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <Header onAddProject={() => setIsAddProjectModalOpen(true)} />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedServices />
        <QualityRights />
        <WhyChooseUs />
        <FAQ />
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
