import React from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import MouseSmokeEffect from "@/components/effects/MouseSmokeEffect";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MouseSmokeEffect />
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
