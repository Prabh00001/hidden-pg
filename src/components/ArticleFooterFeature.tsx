import React from "react";

export default function ArticleFooterFeature() {
  return (
    <section
      id="feature-business"
      className="mt-10 rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur"
      aria-label="Feature your business"
    >
      <h3 className="text-lg font-semibold">Feature your business</h3>
      <p className="mt-1 text-sm text-slate-600">
        Priority placement seen by Prince George locals this month.
      </p>

      <form
        id="pgFeatureForm"
        action="/api/lead"
        method="POST"
        className="mt-3 grid gap-2 sm:grid-cols-3"
      >
        <input type="hidden" name="form" value="feature" />
        <input type="hidden" name="source" value="blog_footer" />
        <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

        <input name="name" placeholder="Your name" required className="rounded-xl border px-3 py-2 sm:col-span-1" />
        <input name="business" placeholder="Business name" required className="rounded-xl border px-3 py-2 sm:col-span-1" />
        <input type="email" name="email" placeholder="Email" required className="rounded-xl border px-3 py-2 sm:col-span-1" />

        <div className="sm:col-span-3">
          <textarea name="notes" rows={3} placeholder="What would you like to feature?" className="w-full rounded-xl border px-3 py-2" />
        </div>

        <div className="sm:col-span-3">
          <button
            type="submit"
            className="btn-3d btn-3d-emerald btn-3d-lg text-white font-semibold font-[Inter] leading-tight tracking-[0.01em] antialiased whitespace-nowrap"
          >
            Request details
          </button>
        </div>
      </form>
    </section>
  );
}
