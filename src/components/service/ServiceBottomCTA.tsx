import React from "react";
import Link from "next/link";
import { PhoneCall, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export interface ServiceBottomCTAProps {
  serviceName: string;
  hasSales: boolean;
}

export function ServiceBottomCTA({ serviceName, hasSales }: ServiceBottomCTAProps) {
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  return (
    <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-3 relative z-10 text-center md:text-left">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Certified Service • 100% Guaranteed
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Need {serviceName} at Your Property?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
          Talk to a master engineer or submit your preferred date. We dispatch same-day across all regional hubs.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 w-full md:w-auto">
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
          <span>{phone}</span>
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi%2C+I+need+help+with+${encodeURIComponent(serviceName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Quick Help</span>
        </a>
      </div>
    </div>
  );
}

export default ServiceBottomCTA;
