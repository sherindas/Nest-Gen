import React from "react";

export function SalesServiceCTA() {
  return (
    <section
      className="w-full bg-orange-600 px-4 sm:px-6 lg:px-8 py-14 md:py-20"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Need Sales or Service?
        </h2>
        <p className="text-orange-100 text-base md:text-lg max-w-xl leading-relaxed">
          Whether you need a new installation, want to purchase equipment, or
          need a repair — we&apos;re ready to help. Get in touch and we&apos;ll take care
          of the rest.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href="#service-request"
            className="
              inline-flex items-center justify-center
              bg-white hover:bg-gray-100 active:bg-gray-200
              text-orange-700 font-semibold
              px-6 py-3 rounded-md
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600
            "
          >
            Request Service
          </a>

          <a
            href="#sales-enquiry"
            className="
              inline-flex items-center justify-center
              bg-transparent hover:bg-orange-700 active:bg-orange-800
              text-white font-semibold
              border border-white
              px-6 py-3 rounded-md
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600
            "
          >
            Sales Enquiry
          </a>
        </div>
      </div>
    </section>
  );
}

export default SalesServiceCTA;
