"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ChevronUp } from "lucide-react";

export function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919353598831";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-slate-700 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Floating WhatsApp Action */}
      <a
        href={`https://wa.me/${whatsapp}?text=Hi%2C+I+would+like+to+enquire+about+NextGen+services.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all duration-200"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-100 leading-none">Instant Help</span>
          <span className="text-[11px] sm:text-xs font-bold leading-tight">WhatsApp</span>
        </div>
      </a>
    </div>
  );
}

export default FloatingContact;
