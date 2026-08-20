"use client";

import React, { Suspense } from "react";
import { HeroSection } from "@/components/homepage/HeroSection";
import { QuickActionCards } from "@/components/homepage/QuickActionCards";
import { AboutSection } from "@/components/homepage/AboutSection";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { UnifiedServiceHub } from "@/components/homepage/UnifiedServiceHub";
import { Testimonials } from "@/components/homepage/Testimonials";
import { FAQ } from "@/components/homepage/FAQ";
import { ContactCTA } from "@/components/homepage/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickActionCards />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      
      {/* Minimal Unified Booking & Support Hub */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
        <UnifiedServiceHub />
      </Suspense>

      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
