"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  const points = [
    t("about_p1"),
    t("about_p2"),
    t("about_p3"),
    t("about_p4"),
  ];

  return (
    <section id="about" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {t("about_tag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {t("about_title")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t("about_desc")}
            </p>

            <div className="space-y-3 pt-2">
              {points.map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Minimal Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="text-3xl font-extrabold text-slate-950">{t("about_stat1_val")}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{t("about_stat1_lbl")}</div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="text-3xl font-extrabold text-slate-950">{t("about_stat2_val")}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{t("about_stat2_lbl")}</div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="text-3xl font-extrabold text-slate-950">{t("about_stat3_val")}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{t("about_stat3_lbl")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
