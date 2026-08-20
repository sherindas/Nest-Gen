import React from "react";
import { ShoppingBag, Wrench, CheckCircle2 } from "lucide-react";

export interface SalesServiceSectionProps {
  hasSales: boolean;
  salesItems?: string[];
  serviceItems: string[];
  serviceName?: string;
}

export function SalesServiceSection({
  hasSales,
  salesItems,
  serviceItems,
}: SalesServiceSectionProps) {
  if (!hasSales) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
            SALES &amp; INSTALLATION
          </span>
          <h3 className="text-xl font-extrabold text-slate-900">
            Equipment Supply vs. Technical Service
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Sales Supply Column */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/90 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            <span>OEM Equipment We Supply</span>
          </div>
          <ul className="space-y-2 text-xs font-semibold text-amber-950">
            {(salesItems ?? []).map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Service Column */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Wrench className="w-4 h-4 text-orange-600" />
            <span>On-Site Engineering Support</span>
          </div>
          <ul className="space-y-2 text-xs font-semibold text-slate-700">
            {serviceItems.slice(0, 4).map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SalesServiceSection;
