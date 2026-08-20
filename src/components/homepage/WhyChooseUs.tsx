"use client";

import React from "react";
import { ShieldCheck, Award, Clock, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const points = [
    {
      icon: <Award className="w-5 h-5 text-slate-950" />,
      title: t("why_1_title"),
      description: t("why_1_desc"),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-slate-950" />,
      title: t("why_2_title"),
      description: t("why_2_desc"),
    },
    {
      icon: <Clock className="w-5 h-5 text-slate-950" />,
      title: t("why_3_title"),
      description: t("why_3_desc"),
    },
    {
      icon: <DollarSign className="w-5 h-5 text-slate-950" />,
      title: t("why_4_title"),
      description: t("why_4_desc"),
    },
  ];

  return (
    <section id="why-us" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            {t("why_tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t("why_title")}
          </h2>
          <p className="text-sm text-slate-600">
            {t("why_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 mb-1.5">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
