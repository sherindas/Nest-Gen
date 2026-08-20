"use client";

import React from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const handleSwitch = (lang: Language, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage(lang);
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-300/80 shadow-inner ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center pl-2 pr-1 text-slate-400">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={(e) => handleSwitch("en", e)}
        className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer select-none ${
          language === "en"
            ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
            : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70"
        }`}
        aria-pressed={language === "en"}
      >
        English
      </button>

      <button
        type="button"
        onClick={(e) => handleSwitch("kn", e)}
        className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer select-none ${
          language === "kn"
            ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
            : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70"
        }`}
        aria-pressed={language === "kn"}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

export default LanguageSwitcher;
