import React from "react";
import { CheckCircle2, ShieldCheck, Wrench, Sparkles } from "lucide-react";

export interface ServiceAboutProps {
  description: string;
  serviceItems: string[];
}

export function ServiceAbout({ description, serviceItems }: ServiceAboutProps) {
  return (
    <div className="space-y-8">
      {/* Overview Block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 bg-orange-600"></span>
          <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest">
            SCOPE &amp; OVERVIEW
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
          Comprehensive Engineering &amp; Execution Details
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Checklist Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5" id="scope">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
              <Wrench className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              What&apos;s Included &amp; Tested
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {serviceItems.length} Deliverables
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
          {serviceItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm font-semibold text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceAbout;
