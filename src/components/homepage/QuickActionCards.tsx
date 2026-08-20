"use client";

import React from "react";
import { Wrench, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function QuickActionCards() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Wrench className="w-5 h-5 text-slate-900" />,
      title: t("qa_service_title"),
      description: t("qa_service_desc"),
      inquiryType: "Book a Service / Repair",
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-slate-900" />,
      title: t("qa_sales_title"),
      description: t("qa_sales_desc"),
      inquiryType: "Purchase Equipment / Sales Enquiry",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-slate-900" />,
      title: t("qa_support_title"),
      description: t("qa_support_desc"),
      inquiryType: "Warranty Support / Existing Service Issue",
    },
  ];

  const handleCardClick = (inquiryType: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("nextgen-select-inquiry", {
          detail: { inquiryType },
        })
      );
      const hub = document.getElementById("service-hub");
      if (hub) {
        hub.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href="/#service-hub"
              onClick={(e) => handleCardClick(card.inquiryType, e)}
              className="group p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-400 hover:bg-white transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  {React.cloneElement(card.icon as React.ReactElement, {
                    className: "w-5 h-5 group-hover:text-white transition-colors",
                  })}
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-950 group-hover:text-orange-600 transition-colors">
                <span>{t("qa_btn_continue")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickActionCards;
