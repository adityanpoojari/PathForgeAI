import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { RoadmapPreview } from "@/components/landing/RoadmapPreview";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { TechShowcase } from "@/components/landing/TechShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <RoadmapPreview />
        <FeaturesGrid />
        <TechShowcase />
        <HowItWorks />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
