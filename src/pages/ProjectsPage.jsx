import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const ProjectsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddProject={() => {}} />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t("myProjects")}
            </h1>
            <p className="text-xl text-gray-600">
              Your projects dashboard - Coming Soon
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
