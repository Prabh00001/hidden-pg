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
import GemModal from "./GemModal";

type Props = { gem: Gem };

export default function GemCard({ gem }: Props) {
  const tiltMaybe = useTilt(8); // your hook expects a number
  const tiltRef: React.Ref<HTMLDivElement> =
    (tiltMaybe as any)?.ref ?? (tiltMaybe as any) ?? null;

  const [open, setOpen] = React.useState(false);

  const title = gem.title ?? gem.name ?? "";
  const desc = gem.description ?? gem.desc ?? "";

  const jsonLd = useMemo(() => {
    const imgs = [gem.image, ...(gem.images || [])].filter(Boolean);
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: title,
      image: imgs,
      url: gem.website || undefined,
      telephone: gem.phone || undefined,
      address: gem.address
        ? { "@type": "PostalAddress", streetAddress: gem.address }
        : undefined,
    } as Record<string, any>;
  }, [gem.address, gem.images, gem.image, gem.phone, gem.website, title]);

  const websiteUrl = gem.website
    ? withUTM(gem.website, {
        source: "hiddenpg",
        medium: "card",
        campaign: "gem_profile",
      })
    : undefined;

  const handleOpen = () => {
    setOpen(true);
    trackGemOpen(gem.id, title);
  };

  return (
    <>
<article
  id={`gem-${gem.id}`}
  ref={tiltRef}
  className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
  onClick={handleOpen}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  }}
>

        {/* Image (click opens modal) */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={gem.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer"
            loading="lazy"
            onClick={handleOpen}
          />
          {/* Photo credit (top-left) */}
          {gem.photoCredit?.name && (
            <a
              href={gem.photoCredit.url || "#"}
              onClick={(e) => e.stopPropagation()}
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
            <h3
              className="text-base font-semibold text-slate-900 cursor-pointer"
              onClick={handleOpen}
            >
              {title}
            </h3>
            <span className="shrink-0 text-xs text-slate-500">{gem.category}</span>
          </div>
          <p className="mt-1 text-[13.5px] text-slate-700 line-clamp-3">{desc}</p>

          {/* SEO Hashtags (sunset orange) */}
          {(gem.tags?.length ?? 0) > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {gem.tags!.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="text-[11px] leading-tight px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* CTA Row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!!websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener"
                className="btn-3d btn-3d-white btn-3d-sm btn-3d-text"
                onClick={(e) => {
                  e.stopPropagation();
                  trackGemClickWebsite(gem.id, title, websiteUrl);
                }}
              >
                Website
              </a>
            )}
            {!!gem.phone && (
              <a
                href={`tel:${normalizePhone(gem.phone)}`}
                className="btn-3d btn-3d-emerald btn-3d-sm btn-3d-text"
                onClick={(e) => {
                  e.stopPropagation();
                  trackGemClickCall(gem.id, title, gem.phone!);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  trackGemClickDirections(gem.id, title, gem.mapsUrl!);
                }}
              >
                Directions
              </a>
            )}
          </div>
        </div>

        {/* JSON-LD (compact) */}
        <SeoJsonLd data={jsonLd} />
      </article>

      {/* Modal */}
      <GemModal gem={gem} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

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
