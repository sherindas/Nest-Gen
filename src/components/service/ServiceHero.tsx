import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Clock, CheckCircle2, PhoneCall, MessageSquare, ArrowRight } from "lucide-react";

export interface ServiceHeroProps {
  serviceName: string;
  headline: string;
  supportingText: string;
}

export function ServiceHero({
  serviceName,
  headline,
  supportingText,
}: ServiceHeroProps) {
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  return (
    <section className="relative overflow-hidden mesh-gradient-hero text-white pt-10 pb-16 md:pt-14 md:pb-20">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Breadcrumb back to all services */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-orange-400 transition-colors w-fit bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Services</span>
        </Link>

        <div className="flex flex-col items-start gap-4 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-orange-500/40 text-orange-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span>{serviceName}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {headline}
          </h1>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {supportingText}
          </p>

          {/* Quick metric pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Service Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Same-Day Dispatch Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceHero;
