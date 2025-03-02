import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Create Professional CVs & Cover Letters with AI",
  subtitle = "Craft standout job application documents in minutes with our intelligent assistant. Get personalized recommendations and professional templates.",
  ctaText = "Get Started",
  onCtaClick = undefined,
  backgroundImage = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
}: HeroSectionProps) => {
  return (
    <div className="w-full h-[600px] bg-slate-50 overflow-hidden relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-white/90 mb-8">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="hover:bg-primary/90 text-white font-medium flex-row items-center rounded-lg justify-center h-12 bg-[#46bb2f]"
              >
                <Link to="/sign-up">
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Floating document preview mockup */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl w-[300px] h-[400px] rotate-3 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-48 bg-gray-100 rounded"></div>
            </div>
            <div className="p-4">
              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-6"></div>

              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded mb-6"></div>

              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content container */}
      {/* Wave decoration at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
