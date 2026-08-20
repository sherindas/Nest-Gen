"use client";

import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 93535 98831";

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            Next<span className="text-orange-500">Gen</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link href="/#services" className="hover:text-white transition-colors">
            {t("nav_services")}
          </Link>
          <Link href="/#about" className="hover:text-white transition-colors">
            {t("nav_about")}
          </Link>
          <Link href="/#why-us" className="hover:text-white transition-colors">
            {t("nav_why_us")}
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            {t("nav_faq")}
          </Link>
          <Link href="/#service-hub" className="hover:text-white transition-colors">
            {t("nav_book_service")}
          </Link>
          <a href={`tel:${phone}`} className="hover:text-white transition-colors">
            {phone}
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          &copy; {year} NextGen. {t("footer_rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
