// src/components/GemCard.tsx
import React, { useMemo } from "react";
import { Gem } from "../types";
import SeoJsonLd from "../components/SeoJsonLd";
import {
  trackGemOpen,
  trackGemClickWebsite,
  trackGemClickCall,
  trackGemClickDirections,
} from "../utils/analytics";
import { useTilt } from "../utils/useTilt";

type Props = { gem: Gem };

export default function GemCard({ gem }: Props) {
  // NOTE: do NOT pass a generic type arg; your hook isn't generic.
  // Also support both shapes: `const {ref} = useTilt()` or `const ref = useTilt()`.
  const tiltMaybe = useTilt(8);
  const tiltRef: React.Ref<HTMLDivElement> =
    (tiltMaybe as any)?.ref ?? (tiltMaybe as any) ?? null;

  // Back-compat fallbacks
  const title = gem.title ?? gem.name ?? "";
  const desc = gem.description ?? gem.desc ?? "";

  const jsonLd = useMemo(() => {
    const imgs = [gem.image, ...(gem.images || [])].filter(Boolean);
    const data: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: title,
      image: imgs,
      url: gem.website || undefined,
      telephone: gem.phone || undefined,
      address: gem.address
        ? { "@type": "PostalAddress", streetAddress: gem.address }
        : undefined,
    };
    return data;
  }, [gem.address, gem.images, gem.image, gem.phone, gem.website, title]);

  const handleOpen = () => {
    trackGemOpen(gem.id, title);
    // If you open a modal or navigate, do it here.
  };

  const websiteUrl = gem.website
    ? withUTM(gem.website, {
        source: "hiddenpg",
        medium: "card",
        campaign: "gem_profile",
      })
    : undefined;

  return (
    <article
      id={`gem-${gem.id}`}
      ref={tiltRef}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={gem.image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onClick={handleOpen}
        />

        {/* Photo credit (top-left) */}
        {gem.photoCredit?.name && (
          <a
            href={gem.photoCredit.url || "#"}
            onClick={(e) => {
              e.stopPropagation();
            }}
            target={gem.photoCredit.url ? "_blank" : undefined}
            rel="noopener"
            className="absolute left-2 top-2 z-10 text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white"
          >
            © {gem.photoCredit.name}
          </a>
        )}

        {/* Sponsored pill (top-right) */}
        {gem.sponsored && (
          <span className="absolute right-2 top-2 z-10 text-[11px] px-2 py-1 rounded-full bg-amber-500/90 text-white">
            Sponsored
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <span className="shrink-0 text-xs text-slate-500">{gem.category}</span>
        </div>
        <p className="mt-1 text-[13.5px] text-slate-700 line-clamp-3">{desc}</p>

        {/* CTA Row */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
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
      </div>

      {/* JSON-LD (compact) */}
      <SeoJsonLd data={jsonLd} />
    </article>
  );
}

/** Helpers */
function withUTM(
  url: string,
  params: { source: string; medium: string; campaign: string }
) {
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
