// src/pages/StoryDetail.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BLOG } from '../data/blog';
import SeoJsonLd from '../components/SeoJsonLd';
import { track } from '../utils/analytics';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
const getSlug = (p: { slug?: string; title: string }) => p.slug || slugify(p.title);
const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hiddenprincegeorge.ca';

function countWords(txt: string) {
  return (txt.trim().match(/\b[\w’'-]+\b/g) || []).length;
}

export default function StoryDetail() {
  const { slug } = useParams();

  // Find post by slug or id
  const post = useMemo(() => {
    if (!slug) return null;
    return BLOG.find(p => getSlug(p) === slug || p.id === slug) || null;
  }, [slug]);

  // reading progress
  const [progress, setProgress] = useState(0);

  // track view
  useEffect(() => {
    if (post) track('story_view', { id: post.id, slug: getSlug(post), title: post.title });
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold">Story not found</h1>
        <p className="mt-3"><Link className="text-pg-blue hover:underline" to="/stories">← Back to Stories</Link></p>
      </div>
    );
  }

  const raw = (post.content || '').trim();
  const placeholder = /add your 200[\u2013-]400 words|full blog coming soon/i.test(raw);
  const hasRealContent = raw.length > 0 && !placeholder;

  const textForTime = hasRealContent ? raw : (post.excerpt || '');
  const words = countWords(textForTime);
  const minutes = Math.max(1, Math.round(words / 200));
  const absUrl = `${origin}/story/${getSlug(post)}`;
  const tags = (post as any).tags as string[] | undefined;

  // Prev/Next by date (fallback to array order)
  const sorted = [...BLOG].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const idx = sorted.findIndex(p => p.id === post.id);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const onShare = async () => {
    try {
      track('story_share', { id: post.id, slug: getSlug(post) });
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt || 'Hidden PG – Story', url: absUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(absUrl);
        alert('Link copied to clipboard!');
      } else {
        window.prompt('Copy link:', absUrl);
      }
    } catch {
      /* user canceled */
    }
  };

  return (
    <>
      {/* progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-40">
        <div className="h-full bg-[#FF7A3F]" style={{ width: `${progress}%` }} />
      </div>

      <article id="article" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>›</li>
            <li><Link to="/stories" className="hover:underline">Stories</Link></li>
            <li>›</li>
            <li className="text-slate-700">{post.title}</li>
          </ol>
        </nav>

        <img src={post.img} alt={post.title} className="w-full h-72 object-cover rounded-xl" loading="lazy" />

        <header className="mt-6">
          <h1 className="text-4xl font-bold font-serif">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-2">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{minutes} min read</span>
            <button
              type="button"
              onClick={onShare}
              className="ml-auto px-3 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
              aria-label="Share this story"
            >
              Share
            </button>
          </div>

          {/* Tags */}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map(t => (
                <Link
                  key={t}
                  to={`/tag/${encodeURIComponent(t.toLowerCase())}`}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium
                             text-[#FF7A3F] border-[#FF7A3F]/30 bg-white/70"
                  title={`View stories tagged #${t}`}
                  onClick={() => track('tag_click', { tag: t.toLowerCase() })}
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </header>

        <section className="mt-6 text-[1.05rem] leading-8 tracking-normal font-serif text-slate-900">
          {hasRealContent ? (
            <p className="[&:first-letter]:text-5xl [&:first-letter]:font-bold [&:first-letter]:mr-2 [&:first-letter]:float-left">
              {raw}
            </p>
          ) : (
            <>
              <p className="mb-4">{post.excerpt || ''}</p>
              <p className="text-slate-600 text-sm">Full blog coming soon. We’ll publish detailed guides for SEO benefit.</p>
            </>
          )}
        </section>

        {/* Prev / Next */}
        <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              to={`/story/${getSlug(prev)}`}
              className="text-pg-blue hover:underline"
              onClick={() => track('story_prev', { from: post.id, to: prev.id })}
            >
              ← {prev.title}
            </Link>
          ) : <span />}

          {next ? (
            <Link
              to={`/story/${getSlug(next)}`}
              className="text-pg-blue hover:underline sm:ml-auto"
              onClick={() => track('story_next', { from: post.id, to: next.id })}
            >
              {next.title} →
            </Link>
          ) : <span />}
        </nav>

        <footer className="mt-6">
          <Link to="/stories" className="text-pg-blue hover:underline">Back to Stories</Link>
        </footer>
      </article>

      {/* BlogPosting JSON-LD */}
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": [post.img],
          "datePublished": post.date,
          "articleBody": hasRealContent ? raw : (post.excerpt || ""),
          "url": absUrl,
          "keywords": Array.isArray(tags) ? tags.join(", ") : undefined,
          "author": { "@type": "Organization", "name": "Hidden PG" },
          "publisher": { "@type": "Organization", "name": "Hidden PG" }
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${origin}/` },
            { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${origin}/stories` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": absUrl }
          ]
        }}
      />
    </>
  );
}
