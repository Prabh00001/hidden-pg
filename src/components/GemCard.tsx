// src/components/GemCard.tsx
import React, { useState } from 'react';
import { Gem } from '../types';
import { useTilt } from '../utils/useTilt';
import SeoJsonLd from './SeoJsonLd'; 
import { track } from '../utils/analytics'; 

export default function GemCard({ gem }: { gem: Gem }) {
  const { ref, onMouseLeave, onMouseMove } = useTilt(6);
  const [open, setOpen] = useState(false);

  return (
    <article id={`gem-${gem.id}`} className="group" aria-label={gem.name}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => { setOpen(true); track('gem_open', { id: gem.id, name: gem.name }); }} // ← ADD
        className="relative bg-white/70 backdrop-blur rounded-2xl overflow-hidden shadow-soft cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      >
        <img src={gem.img} alt={gem.name} loading="lazy" decoding="async" className="h-56 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{gem.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{gem.desc}</p>

          {/* TAGS — card footer */}
          {gem.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {gem.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium
                             text-[#FF7A3F] border-[#FF7A3F]/30 bg-white/70"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>


      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="gem-reveal bg-white rounded-2xl max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={gem.img} alt={gem.name} loading="lazy" decoding="async" className="h-64 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2">{gem.name}</h3>
              <p className="text-slate-700 mb-4">{gem.desc}</p>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-pg-blue text-white">
                Close
              </button>
            </div>

            {/* JSON-LD for a single gem detail view */}
            <SeoJsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "TouristAttraction",
                "name": gem.name,
                "description": gem.desc,
                "image": (gem as any).images?.length ? (gem as any).images : [gem.img],
                "url": `https://hiddenprincegeorge.ca/g/${(gem as any).slug || gem.id}`,
                "address": (gem as any).location || undefined
              }}
            />
          </div>
        </div>
      )}
    </article>
  );
}
