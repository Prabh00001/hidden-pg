import React, { useState } from "react";
import { FORMS } from "@config/forms";

type Props = { source?: string; action?: string };

export default function FeatureBusinessInline({ source = "blog_footer", action = FORMS.feature }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur">
      <h3 className="text-lg font-semibold">Feature your business</h3>
      <p className="mt-1 text-sm text-slate-600">Priority placement seen by locals this month.</p>

      {!sent ? (
        <form action={action} method="POST" onSubmit={() => setSent(true)} className="mt-3 grid gap-2 sm:grid-cols-3">
          <input name="name" placeholder="Your name" required className="rounded-xl border px-3 py-2 sm:col-span-1" />
          <input name="business" placeholder="Business name" required className="rounded-xl border px-3 py-2 sm:col-span-1" />
          <input type="email" name="email" placeholder="Email" required className="rounded-xl border px-3 py-2 sm:col-span-1" />
          <div className="sm:col-span-3">
            <textarea name="notes" rows={3} placeholder="What would you like to feature?" className="w-full rounded-xl border px-3 py-2" />
          </div>
          <input type="hidden" name="tag" value="feature-business" />
          <input type="hidden" name="source" value={source} />
          <input type="text" name="_gotcha" className="hidden" />
          <div className="sm:col-span-3">
            <button className="w-full rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700">Request details</button>
          </div>
        </form>
      ) : (
        <p className="mt-3 text-emerald-700">Thanks! We’ll reply shortly.</p>
      )}
    </section>
  );
}
