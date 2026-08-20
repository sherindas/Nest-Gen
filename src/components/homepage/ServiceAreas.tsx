"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Search, CheckCircle, Phone } from "lucide-react";

export function ServiceAreas() {
  const [searchTerm, setSearchTerm] = useState("");

  const areas = [
    { city: "Coimbatore", state: "Tamil Nadu", popular: true },
    { city: "Ernakulam", state: "Kerala", popular: true },
    { city: "Thrissur", state: "Kerala", popular: true },
    { city: "Palakkad", state: "Kerala", popular: true },
    { city: "Malappuram", state: "Kerala", popular: false },
    { city: "Kozhikode", state: "Kerala", popular: true },
    { city: "Kochi", state: "Kerala", popular: true },
    { city: "Kunnamkulam", state: "Kerala", popular: false },
    { city: "Guruvayur", state: "Kerala", popular: false },
    { city: "Chalakudy", state: "Kerala", popular: false },
    { city: "Perinthalmanna", state: "Kerala", popular: false },
    { city: "Tirur", state: "Kerala", popular: false },
    { city: "Pollachi", state: "Tamil Nadu", popular: false },
    { city: "Aluva", state: "Kerala", popular: false },
    { city: "Angamaly", state: "Kerala", popular: false },
  ];

  const filteredAreas = areas.filter(
    (a) =>
      a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210";

  return (
    <section
      id="service-areas"
      className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
          <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest">
            REGIONAL COVERAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Service Coverage &amp; Dispatch Zones
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We operate fully equipped mobile engineering vans across key districts in Tamil Nadu and Kerala.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-md mx-auto w-full relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your city or region (e.g. Coimbatore, Kochi)..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 pl-11 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/15 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Area Pills Grid */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
          {filteredAreas.map((area) => (
            <span
              key={area.city}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-800 hover:text-orange-700 font-semibold text-xs rounded-2xl transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{area.city}</span>
              <span className="text-[10px] text-slate-400 font-normal">({area.state})</span>
              {area.popular && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1" title="Primary Hub" />
              )}
            </span>
          ))}

          {filteredAreas.length === 0 && (
            <div className="text-center py-6 text-slate-500 text-sm">
              No matching city found in primary list. Contact our dispatch desk directly to confirm coverage!
            </div>
          )}
        </div>

        {/* Unlisted Area Help Callout */}
        <div className="max-w-xl mx-auto text-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-left">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Don&apos;t see your specific locality? We often service surrounding areas.</span>
          </div>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            Check with Dispatch
          </a>
        </div>
      </div>
    </section>
  );
}

export default ServiceAreas;
