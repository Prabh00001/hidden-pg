// src/components/Hero.tsx
import React from "react";
import SearchBar from "./SearchBar";
import FeaturedBusiness from "./FeaturedBusiness";

interface Props {
  query: string;
  setQuery: (v: string) => void;
  onSurprise: () => void;

  showLogo?: boolean;
  logoSrc?: string;
  logoAlt?: string;

  showDecorations?: boolean;
}

/**
 * Hero with ONE center logo that acts as the "Surprise me" button.
 * Removes old white button and decorative icons.
 * SearchBar is left intact (same props), but its internal logo is hidden via showLogo={false}.
 */
export default function Hero({
  query,
  setQuery,
  onSurprise,
  showLogo = true,
  logoSrc = "/logo/hpg-badge.png",
  logoAlt = "Hidden PG",
}: Props) {
  return (
    <section className="relative isolate app-animated-bg overflow-hidden pb-20 sm:pb-26">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <div className="text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Discover Hidden Gems in Prince George
          </h1>
          <p className="mt-3 max-w-2xl mx-auto opacity-90">
            Curated local spots, events and small businesses — find your next favourite place.
          </p>
        </div>

        {/* SINGLE center logo -> Surprise Me button */}
        {showLogo && (
          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                // optional analytics
                // @ts-ignore
                (window as any)?.gtag?.("event", "surprise_click", { from: "hero_glowing_icon" });
                onSurprise();
              }}
              aria-label="Surprise me"
              title="Surprise me"
              className="relative block h-16 w-16 sm:h-20 sm:w-20 rounded-full focus:outline-none transition hover:scale-[1.03]"
            >
              {/* soft glow */}
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-emerald-400/30 blur-[8px] animate-ping" />
              {/* ring */}
              <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-emerald-300/60" />
              {/* logo image */}
              <img
                src={logoSrc}
                alt={logoAlt || "Surprise me"}
                className="relative z-[1] h-full w-full rounded-full shadow-lg"
                loading="eager"
                decoding="async"
              />
            </button>

            {/* Caption (visible on ALL screens) */}
            <p className="mt-2 text-center text-sm font-medium text-white/90">
              Tap “Icon” to jump to a random gem
            </p>
          </div>
        )}

        {/* Search (keep your props exactly; hide SearchBar's tiny logo) */}
        <div className="max-w-3xl mx-auto mt-6">
          <SearchBar
            query={query}
            setQuery={setQuery}
            showLogo={false}
            placeholder="Search gems, tags, places…"
          />
        </div>

        {/* Featured card */}
        <div className="mt-6 relative z-10 translate-y-4 md:translate-y-6">
          <FeaturedBusiness />
        </div>
      </div>

      {/* Decorative wave at the bottom (kept) */}
      <div className="absolute left-0 right-0 bottom-0">
        <svg
          className="pointer-events-none block w-full h-[90px] sm:h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"  stopColor="var(--pg-primary)"   stopOpacity="0.95" />
              <stop offset="35%" stopColor="var(--pg-secondary)" stopOpacity="0.95" />
              <stop offset="70%" stopColor="var(--pg-teal)"      stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--pg-blue)"     stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M0,32 C120,80 360,96 720,88 C1080,80 1320,48 1440,32 L1440,120 L0,120 Z" fill="url(#waveGrad)" />
        </svg>
      </div>
    </section>
  );
}
