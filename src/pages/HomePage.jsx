import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeaturedServices from "../components/FeaturedServices";
import TopAccountants from "../components/TopAccountants";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
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
        <TopAccountants />
        <WhyChooseUs />
        <Testimonials />
        <StatsSection />
        <CTASection />
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
