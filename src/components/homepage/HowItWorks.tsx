"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      title: t("how_1_title"),
      description: t("how_1_desc"),
    },
    {
      num: "02",
      title: t("how_2_title"),
      description: t("how_2_desc"),
    },
    {
      num: "03",
      title: t("how_3_title"),
      description: t("how_3_desc"),
    },
  ];

  return (
    <section id="how-it-works" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            {t("how_tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t("how_title")}
          </h2>
          <p className="text-sm text-slate-600">
            {t("how_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="space-y-3">
              <div className="text-3xl font-black text-slate-300">{s.num}</div>
              <h3 className="text-base font-bold text-slate-950">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
