// src/components/BlogPreview.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG } from '../data/blog';
import { track } from '../utils/analytics';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function BlogPreview({ limit }: { limit?: number }) {
  const list = typeof limit === 'number' ? BLOG.slice(0, limit) : BLOG;
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.map((post) => {
        const tags = (post as any).tags as string[] | undefined;
        const slug = (post as any).slug || slugify(post.title);

        return (
          <article key={post.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition">
            <Link
              to={`/story/${slug}`}
              className="block"
              onClick={() => track('story_open', { id: post.id, slug, where: 'preview' })}
            >
              <img src={post.img} alt={post.title} className="h-44 w-full object-cover" loading="lazy" decoding="async" />
              <div className="p-4">
                <h3 className="font-semibold text-lg leading-snug font-serif">{post.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-sm text-slate-700 mb-3">{post.excerpt || 'Full story coming soon.'}</p>

                {Array.isArray(tags) && tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2" onClick={(e) => e.preventDefault()}>
                    {tags.slice(0, 6).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          track('tag_click', { tag: t.toLowerCase(), where: 'preview' });
                          navigate(`/tag/${encodeURIComponent(t.toLowerCase())}`);
                        }}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium
                                   text-[#FF7A3F] border-[#FF7A3F]/30 bg-white/70"
                        title={`View stories tagged #${t}`}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}

                <span className="inline-block mt-3 text-pg-blue hover:underline">Read More →</span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
