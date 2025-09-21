import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from '@/components/Seo' // add this
import { getPostBySlug } from "../data/posts";
import MobileStickyCTA from "../components/MobileStickyCTA";
import CTAInline from "../components/CTAInline";
import ArticleFooterItinerary from "../components/ArticleFooterItinerary";
import ArticleFooterFeature from "../components/ArticleFooterFeature";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || "");
  const [shareOpen, setShareOpen] = useState(false);

  // Attach submit handlers to the EXISTING forms inside the two sections:
  //   #email-capture  → itinerary form (top card in your post HTML)
  //   #feature-business → feature form (single form further down the page)
  useEffect(() => {
    const attach = (sectionId: "email-capture" | "feature-business", successText: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      const form = section.querySelector("form") as HTMLFormElement | null;
      if (!form) return;

      const onSubmit = async (e: Event) => {
        e.preventDefault();
        const fd = new FormData(form);
        const payload: Record<string, any> = Object.fromEntries(fd.entries());
        if (!payload.form) {
          payload.form = sectionId === "email-capture" ? "itinerary" : "feature";
        }
        try {
          const res = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });
          const body = await res.json().catch(() => ({}));
          if (res.ok) {
            alert(successText);
            form.reset();
          } else {
            alert(body?.error || "Sorry, something went wrong. Please email hello@hiddenprincegeorge.ca.");
          }
        } catch {
          alert("Network error. Please email hello@hiddenprincegeorge.ca.");
        }
      };

      form.addEventListener("submit", onSubmit);
      return () => form.removeEventListener("submit", onSubmit);
    };

    const cleanA = attach("email-capture", "Thanks! We’ll email the itinerary.");
    const cleanB = attach("feature-business", "Thanks! We’ll reply about featuring.");
    return () => {
      cleanA?.();
      cleanB?.();
    };
  }, []);

  // Fade/hide the DESKTOP sticky bar when the footer is visible
  useEffect(() => {
    const bar = document.getElementById("sticky-cta");
    const footer =
      (document.querySelector("footer") as HTMLElement | null) ||
      (document.getElementById("site-footer") as HTMLElement | null);
    if (!bar || !footer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.classList.add("opacity-0", "pointer-events-none");
        } else {
          bar.classList.remove("opacity-0", "pointer-events-none");
        }
      },
      // threshold 0 so it hides as soon as the footer begins
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  // Close share on ESC
    // Smooth-scroll to in-article anchors (#feature-business / #email-capture)
  useEffect(() => {
    const HEADER_OFFSET = 84;

    function onDocClick(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href="#feature-business"], a[href="#email-capture"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (!el) return; // let default anchor behavior run if not found

      ev.preventDefault();
      const top = window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

      // focus the first button in the section and flash briefly
      setTimeout(() => {
        (el.querySelector("button") as HTMLButtonElement | null)?.focus?.();
        el.classList.add("target-flash");
        setTimeout(() => el.classList.remove("target-flash"), 900);
      }, 350);
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShareOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-slate-300">Post not found.</p>
        <Link to="/blog" className="text-emerald-600 underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  // JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: window.location.origin + "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: window.location.origin + "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: window.location.origin + "/blog/" + post.slug },
    ],
  };

  const faqJsonLd = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

      const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.dateISO,
      image: post.hero || "/og-hero.jpg",
      ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    };


  // share URLs
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${post.title} — Hidden PG`;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
  };

  return (
    <>
    <Seo
      title={post.title}
      description={post.description}
      image={post.hero || "https://hiddenprincegeorge.ca/og-hero.jpg"}
    />

      {/* Blog type styling (scoped) */}
      <style>{`
        /* Fonts */
        :root { --font-sans: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji','Segoe UI Emoji'; --font-serif: 'Playfair Display', Georgia, Cambria, 'Times New Roman', serif; }
        /* Article wrapper on light card */
        .article-card { background:#ffffff; border:1px solid #e5e7eb; border-radius: 1rem; box-shadow: 0 1px 8px rgba(2,6,23,.06); }
        /* Body typography */
        #article-root { font-family: var(--font-sans); color:#0f172a; font-size: 1.05rem; line-height: 1.8; letter-spacing: .005em; }
        #article-root p + p { margin-top: .9rem; }
        #article-root ul { list-style: disc; padding-left: 1.25rem; }
        #article-root li + li { margin-top: .25rem; }
        /* Headings (serif) */
        #article-root h2 { font-family: var(--font-serif); font-weight:700; letter-spacing:-.01em; margin-top:2rem; margin-bottom:.5rem; color:#0b1220; }
        #article-root h3 { font-family: var(--font-serif); font-weight:600; letter-spacing:-.005em; margin-top:1.5rem; margin-bottom:.4rem; color:#0b1220; }
        /* Links */
        #article-root a { color:#065f46; text-decoration: underline; text-underline-offset: 3px; }
        /* Media blocks (photos, iframes) */
        #article-root .blog-media, #article-root figure { margin: 1rem 0 1.25rem; border:1px solid #e5e7eb; border-radius: 1rem; overflow:hidden; box-shadow: 0 1px 6px rgba(2,6,23,.06); }
        #article-root .blog-media iframe, #article-root figure img { width:100%; height:16rem; display:block; }
        #article-root figcaption { font-size:.75rem; color:#64748b; padding:.5rem .75rem; }
        /* Make anchors work well with sticky header */
        #email-capture, #feature-business { scroll-margin-top: 96px; }
        /* Itinerary card tweaks that live inside the article HTML */
        #article-root #email-capture h3 { color:#0b1220; }
        #article-root #email-capture p { color:#475569; }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumbs + Share */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            <Link to="/" className="hover:underline">Home</Link> / <Link to="/blog" className="hover:underline">Blog</Link>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, text, url }).catch(() => setShareOpen(true));
              } else {
                setShareOpen(true);
              }
            }}
            className="btn-soft-emerald"
            aria-label="Share this article"
          >
            <svg
    className="h-4 w-4 opacity-80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 18V5" />
    <path d="M9 8l3-3 3 3" /> 
    <rect x="5" y="12" width="14" height="8" rx="2" />
  </svg>

  {/* Hide the word on small screens, show from sm+ */}
  <span className="hidden sm:inline">Share</span>
</button>
        
        </div>

        {/* Title + Meta */}
        <h1 className="text-3xl md:text-4xl font-[Playfair Display] font-bold tracking-[-0.01em] text-slate-900">
          {post.title}
        </h1>
              <div className="mt-2 text-sm text-slate-500 font-[Inter]">
          {post.author ? <>By {post.author} · </> : null}
          {new Date(post.dateISO).toLocaleDateString()} · {post.readTimeMin} min read
        </div>


        {/* Hero */}
        {post.hero && (
          <figure className="mt-6">
            <img src={post.hero} alt="" className="rounded-2xl border border-slate-200 w-full object-cover" />
          </figure>
        )}

        {/* ARTICLE on a light card (theme-proof) */}
        
{/* ARTICLE on a light card (theme-proof) */}
<div className="mt-8 article-card">
  <article
    id="article-root"
    className="article p-6 sm:p-8"
    dangerouslySetInnerHTML={{ __html: post.html }}
  />
</div>
<ArticleFooterItinerary source={`blog:${post.slug}`} />
{/* Inline CTA (lazy-loaded form) */}
<ArticleFooterFeature />



        {/* DESKTOP sticky bottom CTA (hidden on mobile) */}
        <div
          id="sticky-cta"
          className="hidden sm:flex fixed inset-x-0 bottom-0 z-50 justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:pb-6 pointer-events-none transition-opacity duration-200 ease-out"
        >
          <div className="pointer-events-auto max-w-3xl w-full rounded-2xl border border-slate-200 bg-white shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-slate-700">
              Are you a local business?{" "}
              <strong className="font-semibold text-slate-900">Feature your business on Hidden PG.</strong>
            </p>
            <div className="flex gap-3 sm:ml-auto">
              <a
                href="#feature-business"
                className="btn-3d btn-3d-emerald btn-3d-sm sm:btn-3d-md whitespace-nowrap md:min-w-[240px] md:px-5 md:text-[15px] md:leading-tight"

              >
                Feature your business
              </a>
              <a
                href="#email-capture"
                className="btn-3d btn-3d-white btn-3d-sm sm:btn-3d-md whitespace-nowrap"
              >
                Get itinerary
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Share modal */}
      {shareOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShareOpen(false)}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShareOpen(false)}
              className="absolute right-3 top-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold text-slate-900">Share this guide</h3>
            <p className="mt-1 text-sm text-slate-500">Spread the word—locals will thank you.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl bg-[#1877F2] text-white text-center font-medium">Facebook</a>
              <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl bg-black text-white text-center font-medium">X / Twitter</a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl bg-[#25D366] text-white text-center font-medium">WhatsApp</a>
              <button
                onClick={async () => { await navigator.clipboard.writeText(url); alert("Link copied!"); }}
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 bg-white font-medium"
              >
                Copy link
              </button>
            </div>
            {typeof navigator.share === "function" && (
              <button
                onClick={() => navigator.share({ title: post.title, text, url })}
                className="mt-3 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
              >
                Share via device
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile sticky CTA (compact) — mobile only via component, desktop bar is hidden via CSS above */}
      <MobileStickyCTA />
      
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </>
  );
}
