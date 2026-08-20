"use client";

import React from "react";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactCTA() {
  const { t } = useLanguage();
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 93535 98831";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919353598831";

  const handleScrollToHub = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const hub = document.getElementById("service-hub");
      if (hub) {
        hub.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            {t("cta_tag")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t("cta_title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            {t("cta_desc")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/#service-hub"
            onClick={handleScrollToHub}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            <span>{t("cta_btn_book")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-orange-400" />
            <span>{phone}</span>
          </a>

          <a
            href={`https://wa.me/${whatsapp}?text=Hi%2C+I+would+like+to+enquire+about+services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t("cta_btn_whatsapp")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
