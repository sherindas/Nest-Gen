"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Menu, X, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function StickyHeader() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 93535 98831";

  const navLinks = [
    { label: t("nav_services"), href: "#services" },
    { label: t("nav_about"), href: "#about" },
    { label: t("nav_why_us"), href: "#why-us" },
    { label: t("nav_how_it_works"), href: "#how-it-works" },
    { label: t("nav_faq"), href: "#faq" },
    { label: t("nav_contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = ["services", "about", "why-us", "how-it-works", "faq", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const hub = document.getElementById("service-hub");
    if (hub) {
      hub.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#service-hub");
    } else {
      window.location.href = "/#service-hub";
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5"
          : "bg-white border-b border-slate-100 py-3 sm:py-3.5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group select-none shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors shrink-0">
              <Wrench className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 leading-tight">
                Next<span className="text-orange-600">Gen</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-slate-500 leading-none">
                {t("brand_subtext")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 shrink-0"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const target = link.href.replace("#", "");
              const isActive = activeSection === target;
              return (
                <a
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher, Phone, CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            {/* Phone Hotline: Visible on sm and up */}
            <a
              href={`tel:${phone}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>{phone}</span>
            </a>

            {/* Direct Book Button */}
            <a
              href="/#service-hub"
              onClick={handleBookClick}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-sm shadow-orange-600/20 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t("nav_book_service")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus:outline-none transition-colors shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      {menuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white/98 backdrop-blur-lg px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-sm font-bold text-slate-700 hover:text-orange-600 hover:bg-orange-50/80 px-3 py-2.5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>{phone}</span>
              </a>

              <a
                href="/#service-hub"
                onClick={handleBookClick}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 transition-colors shadow-sm"
              >
                <span>{t("nav_book_service")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default StickyHeader;
