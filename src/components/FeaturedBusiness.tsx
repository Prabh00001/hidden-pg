import React, { useEffect, useState } from "react";

export default function FeaturedBusiness() {
  const [shimmer, setShimmer] = useState(false);

  // One-time only (per tab): run shimmer once
  useEffect(() => {
    if (!sessionStorage.getItem("hpg_featured_seen")) {
      setShimmer(true);
      sessionStorage.setItem("hpg_featured_seen", "1");
      const t = setTimeout(() => setShimmer(false), 1300);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      className={
        "relative z-10 rounded-2xl border border-slate-200 bg-white shadow-xl " +
        "p-6 md:p-7 min-h-[180px] " +            // taller + comfy
        "flex flex-col " +
        (shimmer ? "shimmer-once " : "")
      }
    >
      <div className="flex items-start gap-4">
        <img
          src="/logo.png"
          alt="Biz Logo"
          className="w-14 h-14 rounded-lg object-contain"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h3 className="text-lg md:text-xl font-semibold leading-tight text-slate-900">
            Your Business Name
          </h3>
          <p className="mt-1 text-slate-600">
            Short punchy line about what makes you special. Link to menu, booking, or shop.
          </p>

          <div className="mt-3 md:mt-4 lg:mt-6">
          <a
            href="#"
            className="inline-flex btn-3d btn-3d-white btn-3d-sm btn-3d-text whitespace-nowrap"
          >
            Visit Website
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}
