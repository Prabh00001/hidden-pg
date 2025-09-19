// src/pages/TagPage.tsx
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BLOG } from '../data/blog';
// If you want JSON-LD for this page later, we can add SeoJsonLd import here.

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function TagPage() {
  const { tag } = useParams();
  const query = (tag || '').toLowerCase();

  const items = useMemo(() => {
    return BLOG.filter(p => {
      const tags = (p as any).tags as string[] | undefined;
      return Array.isArray(tags) && tags.some(t => t.toLowerCase() === query);
    });
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-1 font-serif">
        Stories tagged <span className="text-[#FF7A3F]">#{decodeURIComponent(tag || '')}</span>
      </h1>
      <p className="text-slate-600 mb-6">
        {items.length} result{items.length === 1 ? '' : 's'}
      </p>

      {items.length === 0 ? (
        <p>No stories found for this tag. <Link to="/stories" className="text-pg-blue hover:underline">View all stories</Link>.</p>
      ) : (
        <div className="space-y-6">
          {items.map(post => {
            const tags = (post as any).tags as string[] | undefined;
            const slug = (post as any).slug || slugify(post.title);
            return (
              <article key={post.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition">
                <Link to={`/story/${slug}`} className="block">
                  <img src={post.img} alt={post.title} className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-5">
                    <h2 className="text-2xl font-semibold font-serif">{post.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                    <p className="mt-3 text-slate-700">{post.excerpt || 'Full story coming soon.'}</p>

                    {Array.isArray(tags) && tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.slice(0, 8).map(t => (
                          <Link
                            key={t}
                            to={`/tag/${encodeURIComponent(t.toLowerCase())}`}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium
                                       text-[#FF7A3F] border-[#FF7A3F]/30 bg-white/70"
                            onClick={(e) => e.stopPropagation()}
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    )}

                    <span className="inline-block mt-4 text-pg-blue hover:underline">Read More →</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
