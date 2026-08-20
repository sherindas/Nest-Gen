"use client";

import React from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  service: string;
}

export function Testimonials() {
  const { t, language } = useLanguage();

  const testimonialsEn: TestimonialItem[] = [
    {
      quote:
        "NextGen completely rewired our property with precision and neatness. The team was punctual, followed strict safety checks, and completed on schedule.",
      author: "Rajesh K.",
      role: "Residential Client",
      service: "Electrical Rewiring",
    },
    {
      quote:
        "Our high-capacity motor pump was diagnosed and repaired the same day. Excellent technical knowledge and completely transparent pricing.",
      author: "Priya N.",
      role: "Commercial Facility",
      service: "Pump & Motor Service",
    },
    {
      quote:
        "High quality CCTV installation with clean cabling and easy mobile configuration. Highly professional execution from start to finish.",
      author: "Suresh B.",
      role: "Property Owner",
      service: "CCTV Surveillance",
    },
  ];

  const testimonialsKn: TestimonialItem[] = [
    {
      quote:
        "ನೆಕ್ಸ್ಟ್‌ಜೆನ್ ತಂಡ ನಮ್ಮ ಮನೆಯ ಸಂಪೂರ್ಣ ವೈರಿಂಗ್ ಕೆಲಸವನ್ನು ಅಚ್ಚುಕಟ್ಟಾಗಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿಕೊಟ್ಟಿದೆ. ಅತ್ಯಂತ ವೃತ್ತಿಪರ ಕೆಲಸ.",
      author: "ರಾಜೇಶ್ ಕೆ.",
      role: "ಗೃಹ ಗ್ರಾಹಕ",
      service: "ವಿದ್ಯುತ್ ವೈರಿಂಗ್",
    },
    {
      quote:
        "ನಮ್ಮ ಬೋರ್‌ವೆಲ್ ಮೋಟಾರ್ ಸಮಸ್ಯೆಯನ್ನು ಒಂದೇ ದಿನದಲ್ಲಿ ನಿಖರವಾಗಿ ದುರಸ್ತಿ ಮಾಡಿದರು. ಪಾರದರ್ಶಕ ದರ ಮತ್ತು ನುರಿತ ತಂತ್ರಜ್ಞರು.",
      author: "ಪ್ರಿಯಾ ಎನ್.",
      role: "ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆ",
      service: "ಮೋಟಾರ್ ಪಂಪ್ ಸೇವೆ",
    },
    {
      quote:
        "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಸಿಸಿಟಿವಿ ಅಳವಡಿಕೆ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಪರ್ಕವನ್ನು ಸುಲಭವಾಗಿ ಮಾಡಿಕೊಟ್ಟರು. ಕೆಲಸದ ನಂತರದ ಬೆಂಬಲವೂ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
      author: "ಸುರೇಶ್ ಬಿ.",
      role: "ಕಟ್ಟಡ ಮಾಲೀಕರು",
      service: "ಸಿಸಿಟಿವಿ ಭದ್ರತೆ",
    },
  ];

  const list = language === "kn" ? testimonialsKn : testimonialsEn;

  return (
    <section id="reviews" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            {t("rev_tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t("rev_title")}
          </h2>
          <p className="text-sm text-slate-600">
            {t("rev_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-950">{item.author}</div>
                  <div className="text-[11px] text-slate-500">{item.role}</div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {item.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
