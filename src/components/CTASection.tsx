// src/components/CTASection.tsx
import React, { useEffect, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "ok" | "error";

interface CTASectionProps {
  showNewsletter?: boolean;
}

export default function CTASection({ showNewsletter = true }: CTASectionProps) {
  const [newsletterState, setNewsletterState] = useState<SubmitState>("idle");
  const [gemState, setGemState] = useState<SubmitState>("idle");

  const newsletterInputRef = useRef<HTMLInputElement>(null);

  // Keep brand var synced (optional; no behavior impact)
  useEffect(() => {
    const footer = document.querySelector("footer") as HTMLElement | null;
    if (!footer) return;
    const bg = getComputedStyle(footer).backgroundColor;
    if (bg) document.documentElement.style.setProperty("--pg-brand", bg);
  }, []);

  // Try a few known endpoints so we always hit whichever exists in your deploy
  const endpoints = [
    "/api/lead",
    "/api/leads",
    "/api/contact",
    "/.netlify/functions/lead",
    "/.netlify/functions/leads",
  ];

  async function postToAnyEndpoint(payload: Record<string, unknown>) {
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) return { ok: true as const, url };
      } catch {
        // try the next endpoint
      }
    }
    return { ok: false as const, url: null as string | null };
  }

  async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  which: "newsletter" | "gem"
) {
  e.preventDefault();

  const setState = which === "newsletter" ? setNewsletterState : setGemState;
  setState("sending");

  // Always the actual <form> that fired onSubmit
  const formEl = e.currentTarget as HTMLFormElement;

  const fd = new FormData(formEl);
  if (!fd.get("form")) fd.set("form", which);
  if (!fd.get("source")) fd.set("source", "cta_section");

  // Honeypot: ONLY add for non-newsletter
  if (which !== "newsletter" && !fd.get("hp")) fd.set("hp", "");

  console.info(`[CTA ${which}] POST /api/lead`, Object.fromEntries(fd.entries()));

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });

    console.info(`[CTA ${which}] Response`, res.status, res.statusText);

    if (res.ok) {
      // Clear fields BEFORE we flip to the success view
      if (which === "newsletter" && newsletterInputRef.current) {
        newsletterInputRef.current.value = "";
      }
      formEl.reset();

      // Optional analytics
      // @ts-ignore
      window.gtag?.("event", "lead_submit", { form: which });

      setState("ok");
      return;
    }

    // Non-2xx → error
    try {
      const txt = await res.text();
      console.error(`[CTA ${which}] Non-2xx:`, res.status, txt);
    } catch {
      console.error(`[CTA ${which}] Non-2xx:`, res.status);
    }
    setState("error");
  } catch (err) {
    console.error(`[CTA ${which}] Network error`, err);
    setState("error");
  }
}

  return (
    <section className="bg-slate-50 py-14">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Suggest a Hidden Gem */}
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Suggest a Hidden Gem</h2>
            <p className="mt-1 text-slate-600">Know a place we should feature? Tell us!</p>

            {gemState === "ok" ? (
              <p
                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3"
                aria-live="polite"
              >
                Thanks! We’ll check it out.
              </p>
            ) : (
              <>
                <form
                  id="gemForm"
                  className="mt-5 grid gap-3 sm:grid-cols-2"
                  onSubmit={(e) => handleSubmit(e, "gem")}
                  // prevent browser validation popups from blocking submit flow
                  noValidate
                  autoComplete="off"
                >
                  <input type="hidden" name="form" value="gem" />
                  <input type="hidden" name="source" value="cta_section" />
                  {/* Honeypot – keep present but hidden & unlikely to be auto-filled */}
                  <input
                    type="text"
                    name="hp"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="new-password"
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    name="place"
                    placeholder="Place name"
                    required
                    className="h-12 text-[16px] rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pg-secondary/30"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location (neighbourhood/address)"
                    className="h-12 text-[16px] rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pg-secondary/30"
                  />
                  <input
                    type="url"
                    name="link"
                    placeholder="Website / Instagram (optional)"
                    className="sm:col-span-2 h-12 text-[16px] rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pg-secondary/30"
                  />
                  <textarea
                    name="notes"
                    placeholder="Why is it a hidden gem?"
                    rows={4}
                    className="sm:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pg-secondary/30"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                    placeholder="Your email (so we can reply)"
                    className="sm:col-span-2 h-12 text-[16px] rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pg-secondary/30"
                  />
                </form>

                {/* Baseline-aligned submit */}
                <div className="mt-auto pt-4">
                  <button
                    form="gemForm"
                    type="submit"
                    disabled={gemState === "sending"}
                    className="btn-3d btn-3d-brand btn-3d-md w-full"
                  >
                    {gemState === "sending" ? "Sending…" : "Send suggestion"}
                  </button>
                </div>
              </>
            )}

            {/* Keep error hidden for users to avoid false negatives, but we can re-enable later if you want */}
            {/* {gemState === "error" && (
              <p className="mt-2 text-sm text-rose-700">Sorry—something went wrong. Please try again or email hello@hiddenprincegeorge.ca.</p>
            )} */}
          </div>

          {/* RIGHT: Newsletter + Feature value panel */}
          {showNewsletter && (
            <div
              id="newsletter"
              className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:order-2"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Join Our Newsletter</h2>
                <p className="mt-1 text-slate-600">Monthly roundup of the best things to do in PG.</p>

                {newsletterState === "ok" ? (
                  <p
                    className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3"
                    aria-live="polite"
                  >
                    Thanks! You’re on the list.
                  </p>
                ) : (
                  <form
                    id="newsletterForm"
                    className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch"
                    onSubmit={(e) => handleSubmit(e, "newsletter")}
                    noValidate
                    autoComplete="off"
                  >
                    <input type="hidden" name="form" value="newsletter" />
                    <input type="hidden" name="source" value="cta_section" />

                    <input
                      ref={newsletterInputRef}
                      type="email"
                      name="email"
                      required
                      autoComplete="off"
                      placeholder="Your email"
                      className="flex-1 h-12 text-[16px] px-4 py-3 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={newsletterState === "sending"}
                      className="btn-3d btn-3d-brand btn-3d-md"
                    >
                      {newsletterState === "sending" ? "Subscribing…" : "Subscribe"}
                    </button>
                  </form>
                )}

                {/* Keep error hidden for users for now */}
                {/* {newsletterState === "error" && (
                  <p className="mt-2 text-sm text-rose-700">Sorry—something went wrong. Please try again or email hello@hiddenprincegeorge.ca.</p>
                )} */}

                <p className="mt-2 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Value panel pushed to bottom */}
              <div className="mt-auto">
                <div className="mt-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/40 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">Feature your business on Hidden PG</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-800">
                    <li className="flex gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[12px] leading-4 text-center">✓</span>
                      Priority placement where locals plan their weekend
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[12px] leading-4 text-center">✓</span>
                      Clickable listing with links to your site & Instagram
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[12px] leading-4 text-center">✓</span>
                      Google-friendly internal links that help local SEO
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[12px] leading-4 text-center">✓</span>
                      Insights snapshot (monthly views & clicks email)
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[12px] leading-4 text-center">✓</span>
                      10-minute setup — cancel anytime
                    </li>
                  </ul>

                  <a
                    href="/contact?topic=feature#contact"
                    onClick={() =>
                      (window as any).gtag?.("event", "cta_feature_click", { from: "cta_newsletter_panel" })
                    }
                    className="btn-3d btn-3d-brand btn-3d-md mt-4"
                  >
                    Feature your business →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
