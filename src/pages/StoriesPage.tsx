// src/pages/StoriesPage.tsx
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG } from '../data/blog';
import { track } from '../utils/analytics';
import Seo from '@/components/Seo'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function StoriesPage() {
  const navigate = useNavigate();

  // Unique, sorted tag list (lowercased for URLs; render original text if you prefer)
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of BLOG) {
      const t = (p as any).tags as string[] | undefined;
      if (Array.isArray(t)) t.forEach(v => set.add(v.toLowerCase()));
    }
    return Array.from(set).sort();
  }, []);

  return (
    <div className="pb-12">
      {/* Minimal hero band */}
      <section className="relative">
        <div className="bg-gradient-to-r from-[#044660] to-[#0866A0] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif">Stories</h1>
            <p className="mt-2 text-white/90">
              Short reads and local notes from Prince George—curated with love.
            </p>
          </div>
        </div>
        <svg className="absolute inset-x-0 -bottom-px w-full h-5 text-white" viewBox="0 0 1200 20" preserveAspectRatio="none">
          <path d="M0,0 C300,20 900,20 1200,0 L1200,20 L0,20 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Tag cloud (optional quick filter via links) */}
      {tags.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 24).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { track('tag_click', { tag: t, where: 'stories_page' }); navigate(`/tag/${encodeURIComponent(t)}`); }}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                           text-[#FF7A3F] border-[#FF7A3F]/30 bg-white hover:bg-white/80 transition"
                title={`View stories tagged #${t}`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Story list */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {BLOG.map(post => {
          const slug = (post as any).slug || slugify(post.title);
          const postTags = (post as any).tags as string[] | undefined;

          return (
            <article
              key={post.id}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white/95 backdrop-blur
                         hover:shadow-md transition"
            >
              <Link
                to={`/story/${slug}`}
                className="block group"
                onClick={() => track('story_open', { id: post.id, slug, where: 'stories_page' })}
              >
                <div className="md:flex">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full md:w-64 h-56 object-cover md:rounded-r-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-5 flex-1">
                    <h2 className="text-2xl font-semibold font-serif group-hover:underline">{post.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                    <p className="mt-3 text-slate-700">{post.excerpt || 'Full story coming soon.'}</p>

                    {Array.isArray(postTags) && postTags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2" onClick={(e) => e.preventDefault()}>
                        {postTags.slice(0, 6).map((t) => (
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

                    <span className="inline-block mt-4 text-pg-blue group-hover:underline">Read More →</span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
