"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ServiceCardProps } from "@/types";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { useLanguage } from "@/context/LanguageContext";

const serviceNameKn: Record<string, string> = {
  "Electrical Wiring & Renovation": "ವಿದ್ಯುತ್ ವೈರಿಂಗ್ ಮತ್ತು ನವೀಕರಣ",
  "Open Wiring & Concealed Wiring": "ತೆರೆದ ಮತ್ತು ಗುಪ್ತ ವೈರಿಂಗ್",
  "Plumbing & Leak Repairs": "ಪ್ಲಂಬಿಂಗ್ ಮತ್ತು ಸೋರಿಕೆ ದುರಸ್ತಿ",
  "Irrigation Systems & Automation": "ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಗಳು ಮತ್ತು ಆಟೊಮೇಷನ್",
  "Electrical Perimeter Fencing": "ವಿದ್ಯುತ್ ಭದ್ರತಾ ಬೇಲಿ",
  "Inverter & Battery Systems": "ಇನ್ವರ್ಟರ್ ಮತ್ತು ಬ್ಯಾಟರಿ ವ್ಯವಸ್ಥೆಗಳು",
  "Submersible & Borewell Motors": "ಬೋರ್‌ವೆಲ್ ಮತ್ತು ಮುಳುಗು ಮೋಟಾರ್‌ಗಳು",
  "Openwell Motor Pumps": "ಓಪನ್‌ವೆಲ್ ಮೋಟಾರ್ ಪಂಪ್‌ಗಳು",
  "CCTV & Security Surveillance": "ಸಿಸಿಟಿವಿ ಮತ್ತು ಭದ್ರತಾ ಕ್ಯಾಮೆರಾಗಳು",
  "Smart Home & Automation": "ಸ್ಮಾರ್ಟ್ ಹೋಮ್ ಆಟೊಮೇಷನ್",
  "Automated Water Level Controllers": "ಸ್ವಯಂಚಾಲಿತ ನೀರಿನ ಮಟ್ಟ ನಿಯಂತ್ರಕಗಳು",
  "Motor Starter & Control Panels": "ಮೋಟಾರ್ ಸ್ಟಾರ್ಟರ್ ಮತ್ತು ಕಂಟ್ರೋಲ್ ಪ್ಯಾನೆಲ್‌ಗಳು",
};

const serviceDescKn: Record<string, string> = {
  "Electrical Wiring & Renovation": "ಮನೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗಳಿಗೆ ವೃತ್ತಿಪರ ವಿದ್ಯುತ್ ವೈರಿಂಗ್ ಮತ್ತು ಮರು-ವೈರಿಂಗ್ ಸೇವೆಗಳು.",
  "Open Wiring & Concealed Wiring": "ಹೊಸ ಕಟ್ಟಡಗಳು ಮತ್ತು ನವೀಕರಣಗಳಿಗಾಗಿ ಪರಿಣಿತ ತೆರೆದ ಹಾಗೂ ಗುಪ್ತ ಗೋಡೆ ವೈರಿಂಗ್ ಕೆಲಸಗಳು.",
  "Plumbing & Leak Repairs": "ನೀರಿನ ಸೋರಿಕೆ, ಪೈಪ್ ಲೈನ್ ಜೋಡಣೆ ಮತ್ತು ತುರ್ತು ಪ್ಲಂಬಿಂಗ್ ರಿಪೇರಿ ಸೇವೆಗಳು.",
  "Irrigation Systems & Automation": "ಕೃಷಿ, ತೋಟ ಮತ್ತು ಉದ್ಯಾನವನಗಳಿಗೆ ಸ್ವಯಂಚಾಲಿತ ಹನಿ ನೀರಾವರಿ ಸ್ಥಾಪನೆ ಮತ್ತು ನಿರ್ವಹಣೆ.",
  "Electrical Perimeter Fencing": "ಮನೆ, ತೋಟ ಮತ್ತು ವಾಣಿಜ್ಯ ಜಮೀನುಗಳ ಗಡಿ ರಕ್ಷಣೆಗಾಗಿ ವಿದ್ಯುತ್ ಫೆನ್ಸಿಂಗ್ ವ್ಯವಸ್ಥೆ.",
  "Inverter & Battery Systems": "ನಿರಂತರ ವಿದ್ಯುತ್ ಸರಬರಾಜಿಗಾಗಿ ಇನ್ವರ್ಟರ್ ಮತ್ತು ಬ್ಯಾಟರಿ ಮಾರಾಟ, ಅಳವಡಿಕೆ ಹಾಗೂ ಸರ್ವೀಸ್.",
  "Submersible & Borewell Motors": "ಎಲ್ಲಾ ಸಾಮರ್ಥ್ಯದ ಬೋರ್‌ವೆಲ್ ಮತ್ತು ಸಬ್‌ಮರ್ಸಿಬಲ್ ಮೋಟಾರ್‌ಗಳ ಸ್ಥಾಪನೆ, ದುರಸ್ತಿ ಮತ್ತು ವೈರಿಂಗ್.",
  "Openwell Motor Pumps": "ತೆರೆದ ಬಾವಿ ಮತ್ತು ಸಂಪ್‌ಗಳಿಗಾಗಿ ಹೆವಿ-ಡ್ಯೂಟಿ ಓಪನ್‌ವೆಲ್ ಮೋಟಾರ್ ಪಂಪ್‌ಗಳ ಸೇವೆ ಮತ್ತು ಪೂರೈಕೆ.",
  "CCTV & Security Surveillance": "ಹೆಚ್ಚಿನ ಸ್ಪಷ್ಟತೆಯ ಸಿಸಿಟಿವಿ ಕ್ಯಾಮೆರಾ ಅಳವಡಿಕೆ, ಮೊಬೈಲ್ ಲೈವ್ ವೀಕ್ಷಣೆ ಮತ್ತು ಭದ್ರತಾ ವ್ಯವಸ್ಥೆ.",
  "Smart Home & Automation": "ಮೊಬೈಲ್ ಮತ್ತು ಧ್ವನಿ ಮೂಲಕ ನಿಯಂತ್ರಿಸಬಹುದಾದ ಸ್ಮಾರ್ಟ್ ಸ್ವಿಚ್‌ಗಳು ಮತ್ತು ಲೈಟಿಂಗ್ ಆಟೊಮೇಷನ್.",
  "Automated Water Level Controllers": "ಟ್ಯಾಂಕ್ ತುಂಬಿದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮೋಟಾರ್ ಆನ್/ಆಫ್ ಮಾಡುವ ಸ್ಮಾರ್ಟ್ ವಾಟರ್ ಕಂಟ್ರೋಲರ್.",
  "Motor Starter & Control Panels": "ಮೋಟಾರ್ ರಕ್ಷಣೆಗಾಗಿ ಡಿಜಿಟಲ್ ಸ್ಟಾರ್ಟರ್‌ಗಳು, ಕಂಟ್ರೋಲ್ ಪ್ಯಾನೆಲ್‌ಗಳು ಮತ್ತು ಆಟೋ-ಸ್ವಿಚ್ ಅಳವಡಿಕೆ.",
};

export function ServiceCard({
  name,
  iconKey,
  description,
  serviceItems,
  hasSalesEnquiry,
}: ServiceCardProps) {
  const { t, language } = useLanguage();

  const displayName = language === "kn" ? serviceNameKn[name] || name : name;
  const displayDesc = language === "kn" ? serviceDescKn[name] || description : description;

  const keyItems = serviceItems ? serviceItems.slice(0, 2) : [];

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nextgen-select-inquiry", {
          detail: {
            service: name,
            inquiryType: "Book a Service / Repair",
          },
        })
      );
      const hub = document.getElementById("service-hub");
      if (hub) {
        hub.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#service-hub");
      } else {
        window.location.href = `/?service=${encodeURIComponent(name)}#service-hub`;
      }
    }
  };

  return (
    <article className="group bg-white rounded-3xl border border-slate-200 hover:border-orange-500/60 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300" />

      <div>
        {/* Card Header with Icon & Badges */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300">
            <ServiceIcon name={iconKey || "zap"} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {hasSalesEnquiry && (
              <span className="text-[10px] sm:text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                {t("card_sales_badge")}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-950 group-hover:text-orange-600 transition-colors mb-2.5 leading-snug">
          {displayName}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {displayDesc}
        </p>

        {/* Key Features / Included checklist */}
        {keyItems.length > 0 && (
          <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
            {keyItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Direct Full-Width Book Service CTA */}
      <div className="pt-4 border-t border-slate-100">
        <a
          href="/#service-hub"
          onClick={handleBookClick}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-extrabold shadow-sm shadow-orange-600/25 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <span>{t("card_book_now")}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export default ServiceCard;
