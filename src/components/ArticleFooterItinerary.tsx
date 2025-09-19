import React from "react";
import ItineraryForm from "./ItineraryForm";

export default function ArticleFooterItinerary({ source }: { source: string }) {
  return (
    <section id="email-capture" className="mt-12" aria-label="Itinerary signup">
      <div
        id="cta-bottom"
        className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold font-[Playfair Display] text-[color:var(--pg-teal,#02554C)]">
          Get our 48-Hour PG Itinerary PDF
        </h3>
        <p className="text-slate-700 mt-1">
          We’ll send a clean, printable plan with map links and local tips (free).
        </p>

        <div className="mt-4">
          <ItineraryForm source={source} />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Privacy-friendly: we only use your email to send the PDF and occasional useful PG updates.
        </p>
      </div>
    </section>
  );
}
