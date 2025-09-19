import React, { useState } from "react";
import { FORMS } from "@config/forms";

type Props = { source?: string; action?: string };

export default function NewsletterInline({ source = "blog_footer", action = FORMS.newsletter }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur">
      <h3 className="text-lg font-semibold">Join our newsletter</h3>
      <p className="mt-1 text-sm text-slate-600">Local gems, stories & weekend picks. No spam.</p>

      {!sent ? (
        <form action={action} method="POST" onSubmit={() => setSent(true)} className="mt-3 flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input type="hidden" name="tag" value="newsletter" />
          <input type="hidden" name="source" value={source} />
          {/* honeypot */}
          <input type="text" name="_gotcha" className="hidden" />
          <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Join</button>
        </form>
      ) : (
        <p className="mt-3 text-emerald-700">Thanks! Please check your email.</p>
      )}
    </section>
  );
}
