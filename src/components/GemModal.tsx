import React from "react";
import { createPortal } from "react-dom";
import { Gem } from "../types";
import SeoJsonLd from "../components/SeoJsonLd";
// import AnimatedGem from "./AnimatedGem";

import {
  trackGemClickWebsite,
  trackGemClickCall,
  trackGemClickDirections,
  trackGemClickInstagram,
  trackGemClickFacebook,
} from "../utils/analytics";

type Props = { gem: Gem; open: boolean; onClose: () => void };

export default function GemModal({ gem, open, onClose }: Props) {
  const images = React.useMemo(
    () => [gem.image, ...(gem.images ?? [])].filter((s): s is string => Boolean(s)),
    [gem.image, gem.images]
  );
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, images.length, onClose]);

  if (!open) return null;

  const title = gem.title ?? gem.name ?? "";
  const desc = gem.description ?? gem.desc ?? "";
  const websiteUrl = gem.website
    ? withUTM(gem.website, {
        source: "hiddenpg",
        medium: "modal",
        campaign: "gem_profile",
      })
    : undefined;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-[95vw] max-w-6xl mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {gem.brand?.logo && (
                <img
                  src={gem.brand.logo}
                  alt={gem.brand.logoAlt ?? `${gem.brand.name ?? "Brand"} logo`}
                  className="h-6 w-auto object-contain"
                />
              )}
              <h3 className="truncate text-lg font-semibold text-slate-900">{title}</h3>
            </div>
            {!!gem.category && <p className="text-xs text-slate-500 mt-0.5">{gem.category}</p>}
          </div>

          {/* <AnimatedGem className="absolute -right-3 -top-3" size={44} hue={210} anim="slow" /> */}

          <button aria-label="Close" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Gallery */}
          <div className="relative bg-slate-50 flex items-center justify-center" style={{ maxHeight: "82vh" }}>
            {/* The actual image (fixes the 'src=/images/...' text) */}
            {images.length > 0 ? (
              <img
                src={images[idx] ?? ""}
                alt={`${title} photo ${idx + 1}`}
                className="max-h-[82vh] w-auto max-w-full object-contain select-none"
                loading="eager"
                decoding="async"
                onError={() => setIdx(0)}
              />
            ) : (
              <div className="text-sm text-neutral-500">No image available</div>
            )}

            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <button
                  aria-label="Next"
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 px-2 py-1 bg-white/80 rounded-full shadow">
                  {images.map((src, i) => (
                    <button
                      key={`${i}-${src}`}
                      onClick={() => setIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full ${i === idx ? "bg-slate-900" : "bg-slate-300"}`}
                      aria-label={`Show image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-5 md:p-6">
            <p className="text-sm text-slate-700">{desc}</p>

            {/* SEO Hashtags (sunset orange) */}
            {(gem.tags?.length ?? 0) > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {gem.tags!.slice(0, 8).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] leading-tight px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Social pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {!!gem.instagram && (
                <a
                  href={gem.instagram}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackGemClickInstagram(gem.id, title, gem.instagram!)}
                  className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
                  </svg>
                  Instagram
                </a>
              )}
              {!!gem.facebook && (
                <a
                  href={gem.facebook}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackGemClickFacebook(gem.id, title, gem.facebook!)}
                  className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                    <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3.5A5.5 5.5 0 0 0 8 7.5V10H5v4h3v8h5z" />
                  </svg>
                  Facebook
                </a>
              )}
            </div>

            {/* CTA Row */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {!!websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-3d btn-3d-white btn-3d-sm btn-3d-text"
                  onClick={() => trackGemClickWebsite(gem.id, title, websiteUrl)}
                >
                  Website
                </a>
              )}
              {!!gem.phone && (
                <a
                  href={`tel:${normalizePhone(gem.phone)}`}
                  className="btn-3d btn-3d-emerald btn-3d-sm btn-3d-text"
                  onClick={() => trackGemClickCall(gem.id, title, gem.phone!)}
                >
                  Call
                </a>
              )}
              {!!gem.mapsUrl && (
                <a
                  href={gem.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-3d btn-3d-white btn-3d-sm btn-3d-text"
                  onClick={() => trackGemClickDirections(gem.id, title, gem.mapsUrl!)}
                >
                  Directions
                </a>
              )}
            </div>

            {/* Photo Credit */}
            {gem.photoCredit?.name && (
              <p className="mt-4 text-xs text-slate-500">
                Photos ©{" "}
                {gem.photoCredit.url ? (
                  <a href={gem.photoCredit.url} target="_blank" rel="noopener" className="underline hover:no-underline">
                    {gem.photoCredit.name}
                  </a>
                ) : (
                  gem.photoCredit.name
                )}
                . Used with permission.
              </p>
            )}
          </div>
        </div>

        {/* JSON-LD */}
        <SeoJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: title,
            image: images,
            url: gem.website || undefined,
            telephone: gem.phone || undefined,
            address: gem.address ? { "@type": "PostalAddress", streetAddress: gem.address } : undefined,
          }}
        />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function withUTM(url: string, params: { source: string; medium: string; campaign: string }) {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", params.source);
    u.searchParams.set("utm_medium", params.medium);
    u.searchParams.set("utm_campaign", params.campaign);
    return u.toString();
  } catch {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}utm_source=${params.source}&utm_medium=${params.medium}&utm_campaign=${params.campaign}`;
  }
}

function normalizePhone(p: string) {
  return p.replace(/\s+/g, "");
}
