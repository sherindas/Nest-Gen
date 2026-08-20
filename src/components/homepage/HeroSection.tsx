"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  const handleScrollToHub = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const hub = document.getElementById("service-hub");
      if (hub) {
        hub.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const s = document.getElementById("services");
      if (s) {
        s.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28 border-b border-slate-100 overflow-hidden">
      {/* Soft minimal gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/60 via-white to-white pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-slate-700 text-[11px] sm:text-xs font-semibold mb-6 sm:mb-8 shadow-sm max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0"></span>
          <span className="truncate">{t("hero_badge")}</span>
        </div>

        {/* Responsive headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
          {t("hero_title_1")}{" "}
          <span className="text-orange-600 font-black">{t("hero_title_2")}</span>
        </h1>

        {/* Responsive subheadline */}
        <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2">
          {t("hero_subtitle")}
        </p>

        {/* Clean CTAs: Full-width on mobile, auto on desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-2">
          <a
            href="/#service-hub"
            onClick={handleScrollToHub}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-slate-950 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>{t("hero_btn_book")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/#services"
            onClick={handleScrollToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all duration-200 cursor-pointer"
          >
            {t("hero_btn_explore")}
          </a>
        </div>

        {/* Responsive 3-metric row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-100 max-w-xl w-full text-center">
          <div className="px-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950">{t("hero_metric_1_val")}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 font-medium">{t("hero_metric_1_label")}</div>
          </div>
          <div className="px-1 border-x border-slate-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950">{t("hero_metric_2_val")}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 font-medium">{t("hero_metric_2_label")}</div>
          </div>
          <div className="px-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950">{t("hero_metric_3_val")}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 font-medium">{t("hero_metric_3_label")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
