"use client";

import React, { useState } from "react";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/service/ServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { Layers } from "lucide-react";

type CategoryKey = "all" | "electrical" | "plumbing-motors" | "security" | "automation";

export function ServicesSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const categories: { key: CategoryKey; label: string; count: number }[] = [
    { key: "all", label: t("cat_all"), count: services.length },
    {
      key: "electrical",
      label: t("cat_electrical"),
      count: services.filter((s) => s.category === "electrical").length,
    },
    {
      key: "plumbing-motors",
      label: t("cat_plumbing"),
      count: services.filter((s) => s.category === "plumbing-motors").length,
    },
    {
      key: "security",
      label: t("cat_security"),
      count: services.filter((s) => s.category === "security").length,
    },
    {
      key: "automation",
      label: t("cat_automation"),
      count: services.filter((s) => s.category === "automation").length,
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{t("services_tag")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
              {t("services_title")}
            </h2>
            <p className="text-xs sm:text-base text-slate-600 max-w-xl">
              {t("services_desc")}
            </p>
          </div>

          {/* Clean Segmented Category Tabs with Counts: Light and warm active color */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-300/80 shadow-sm w-max sm:w-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 select-none ${
                      isActive
                        ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              name={service.name}
              slug={service.slug}
              category={service.category}
              iconKey={service.iconKey}
              description={service.shortDescription}
              imageUrl={service.imageUrl}
              serviceItems={service.serviceItems}
              hasSalesEnquiry={service.hasSales}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
