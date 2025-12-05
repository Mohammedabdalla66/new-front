import React, { useState } from "react";
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

const HomePage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

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
