import React, { Suspense, useMemo, useState, useCallback } from 'react';
import Hero from '../components/Hero';
import GemGrid from '../components/GemGrid';
import { GEMS } from '../data/gems';
import { Gem } from '../types';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import EventsSection from '../components/EventsSection';
import CTASection from '../components/CTASection';
import Seo from '@/components/Seo';

// ---------- helpers (inline, identical logic to GemGrid's matcher) ----------
const normalize = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

const splitMulti = (s: string) =>
  s.split(/[•,/|]/).map((p) => p.trim()).filter(Boolean);

const hasCategory = (g: Gem, wantedRaw: string) => {
  if (!wantedRaw) return true; // "" -> All
  const wanted = normalize(wantedRaw);

  if (g.category) {
    for (const part of splitMulti(g.category)) {
      if (normalize(part) === wanted) return true;
    }
    if (normalize(g.category).includes(wanted)) return true;
  }
  if (Array.isArray(g.tags)) {
    if (g.tags.some((t) => normalize(t) === wanted)) return true;
  }
  return false;
};

// Build unique category list from data (split multi-labels, strip accents)
function getAllCategories(gems: Gem[]): string[] {
  const set = new Set<string>();
  for (const g of gems) {
    if (!g.category) continue;
    for (const part of splitMulti(g.category)) {
      const clean = normalize(part);
      if (clean) set.add(clean);
    }
  }
  const toTitle = (s: string) => s.slice(0,1).toUpperCase() + s.slice(1);
  return Array.from(set).sort().map(toTitle);
}


export default function HomePage() {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>(''); // "" = All

  // Derive categories from data so UI & filter are guaranteed in sync
  const categories = useMemo(() => {
    const list = getAllCategories(GEMS);
    // Ensure common ones are present/ordered nicely if they exist
    const pref = ['Cafe', 'Bakery', 'Restaurant', 'Trail', 'Park', 'Food'];
    const inList = (x: string) => list.includes(x);
    const ordered = [...pref.filter(inList), ...list.filter((x) => !pref.includes(x))];
    return ['All', ...ordered];
  }, []);

  // Build filtered list (query + category)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GEMS.filter((g) => {
      const inCat = hasCategory(g, category);   // "" means All
      if (!q) return inCat;

      const title = (g.title ?? g.name ?? '').toLowerCase();
      const desc  = (g.description ?? g.desc ?? '').toLowerCase();
      const tags  = (g.tags ?? []).map((t) => t.toLowerCase());
      const inQuery = title.includes(q) || desc.includes(q) || tags.some((t) => t.includes(q));

      return inCat && inQuery;
    });
  }, [query, category]);

  const onSurprise = useCallback(() => {
    const pool = filtered.length ? filtered : GEMS;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const el = document.getElementById(`gem-${pick.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filtered]);

  return (
    <>
      <Seo
        title="Hidden Prince George — Discover Trails, Cafés & Hidden Gems"
        description="Curated guides and a fast search to find trails, cafés, hidden spots, local businesses and events in Prince George."
        image="https://hiddenprincegeorge.ca/og-hero.jpg"
      />

      <Hero
        query={query}
        setQuery={setQuery}
        onSurprise={onSurprise}
        showLogo
        logoSrc="/logo/hpg-badge.png"
      />

      {/* GEMS */}
      <section id="gems" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Inline category pills (replaces external <Filters> to avoid mismatches) */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {categories.map((label) => {
            const value = label === 'All' ? '' : label; // we keep title-cased label, but our matcher normalizes it
            const active = category === value;
            return (
              <button
                key={label}
                onClick={() => setCategory(value)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm border",
                  active
                    ? "bg-emerald-600 text-white border-emerald-700"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                ].join(" ")}
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* The grid gets the already-filtered list */}
        <GemGrid items={filtered} />
      </section>

      {/* FEATURED */}
      <section id="featured" className="bg-slate-50 py-14">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 font-[Playfair Display] tracking-[-0.01em]">
            Featured Highlights
          </h2>
          <Suspense fallback={<div>Loading…</div>}>
            {/* Lazy import retained if you have it elsewhere */}
          </Suspense>
        </div>
      </section>

      <EventsSection />

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
                  {p.tags.slice(0, 3).map((t: string) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
