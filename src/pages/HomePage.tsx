import React, { Suspense, useMemo, useState, useCallback } from 'react';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import GemGrid from '../components/GemGrid';
import { GEMS } from '../data/gems';
import { Category } from '../types';
import { scrollToId } from '../utils/useScrollTo';
const FeaturedCarousel = React.lazy(() => import('../components/FeaturedCarousel'));
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import EventsSection from '../components/EventsSection';
import CTASection from '../components/CTASection';
import Seo from '@/components/Seo'

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GEMS.filter((g) => {
      const inCat = category === 'All' || g.category === category;
      if (!q) return inCat;
      return (
        inCat &&
        (
          g.name.toLowerCase().includes(q) ||
          (g.desc?.toLowerCase() ?? '').includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
        )
      );
    });
  }, [query, category]);

  const onSurprise = useCallback(() => {
    const pool = filtered.length ? filtered : GEMS;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    scrollToId(`gem-${pick.id}`);
  }, [filtered]);

  return (
    <>
      <Seo
        title="Hidden Prince George — Discover Trails, Cafés & Hidden Gems"
        description="Curated guides and a fast search to find trails, cafés, hidden spots, local businesses and events in Prince George."
        image="https://hiddenprincegeorge.ca/og-hero.jpg"
      />{/* HERO (full-bleed background; inner copy width is controlled inside Hero) */}
      <Hero
        query={query}
        setQuery={setQuery}
        onSurprise={onSurprise}
        showLogo
        logoSrc="/logo/hpg-badge.png"
      />

      {/* GEMS — wider on desktop */}
      <section id="gems" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Filters category={category} setCategory={setCategory} total={filtered.length} />
        <GemGrid items={filtered} />
      </section>

      {/* FEATURED — wider on desktop */}
      <section id="featured" className="bg-slate-50 py-14">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 font-[Playfair Display] tracking-[-0.01em]">
            Featured Highlights
          </h2>
          <Suspense fallback={<div>Loading…</div>}>
            <FeaturedCarousel />
          </Suspense>
        </div>
      </section>

      {/* EVENTS */}
      <EventsSection />

      {/* BLOG PREVIEW — a bit narrower for readability */}
      <section id="stories" className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold font-[Playfair Display] tracking-[-0.01em]">
              Latest from the Blog
            </h2>
            <Link to="/blog" className="text-emerald-400 hover:underline">View all →</Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition p-5"
              >
                <div className="text-xs text-slate-500">
                  {new Date(p.dateISO).toLocaleDateString()} • {p.readTimeMin} min read
                </div>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION (Newsletter + Suggest a Gem) */}
      <CTASection />
    </>
  );
}
