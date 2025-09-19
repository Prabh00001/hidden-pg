import React, { useState } from "react";

/** shared fetch helper */
async function postLead(payload: Record<string, any>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed");
  // @ts-ignore (GA optional)
  window.gtag?.("event", "lead_submit", { form: payload.form });
}

type State = "idle" | "sending" | "ok" | "error";

export default function ContactPage() {
  // main contact form
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [cState, setCState] = useState<State>("idle");

  // partner quick forms
  const [photo, setPhoto] = useState({ name: "", email: "", portfolio: "", notes: "" });
  const [pState, setPState] = useState<State>("idle");

  const [collab, setCollab] = useState({ name: "", email: "", company: "", idea: "" });
  const [sState, setSState] = useState<State>("idle");

  const submitContact: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setCState("sending");
    try {
      await postLead({ form: "contact", source: "contact_page", ...contact, hp: "" });
      setCState("ok");
      setContact({ name: "", email: "", message: "" });
    } catch {
      setCState("error");
    }
  };

  const submitPhotographer: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setPState("sending");
    try {
      await postLead({ form: "photographer", source: "contact_page_partner", ...photo, hp: "" });
      setPState("ok");
      setPhoto({ name: "", email: "", portfolio: "", notes: "" });
    } catch {
      setPState("error");
    }
  };

  const submitCollab: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSState("sending");
    try {
      await postLead({ form: "partner", source: "contact_page_partner", ...collab, hp: "" });
      setSState("ok");
      setCollab({ name: "", email: "", company: "", idea: "" });
    } catch {
      setSState("error");
    }
  };

  return (
    <div className="pb-16">
      {/* Top gradient band + wave to match theme */}
      <section className="relative app-animated-bg text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">Contact</h1>
          <p className="mt-1 max-w-2xl text-white/90">
            Questions, suggestions, partnerships — we’d love to hear from you.
          </p>
        </div>
        <svg className="absolute inset-x-0 -bottom-px w-full h-6 text-white" viewBox="0 0 1200 24" preserveAspectRatio="none">
          <path d="M0,0 C300,22 900,22 1200,0 L1200,24 L0,24 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Main two-column cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid gap-6 md:grid-cols-2">
        {/* Reach us */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur p-6">
          <h2 className="text-xl font-semibold mb-3 font-serif">Reach us</h2>
          <p className="text-slate-600 mb-4">
            Prefer email? We typically respond within 1–2 business days.
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              {/* mail icon */}
              <svg className="w-5 h-5 mt-0.5 text-slate-500" viewBox="0 0 24 24" fill="none">
                <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <a href="mailto:hello@hiddenprincegeorge.ca" className="text-sky-800 hover:underline">
                hello@hiddenprincegeorge.ca
              </a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 text-slate-500" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Prince George, BC
            </li>
          </ul>

          <div className="mt-6 text-sm text-slate-600">
            Tip: For features or partnerships, include your website and 1–2 goals.
          </div>
        </div>

        {/* Send a message */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur p-6">
          <h2 className="text-xl font-semibold mb-3 font-serif">Send a message</h2>

          {cState === "ok" ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3">
              Thanks! We received your message.
            </p>
          ) : (
            <form className="space-y-4" onSubmit={submitContact}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full h-12 text-[16px] rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700/30"
                  placeholder="Your name"
                  value={contact.name}
                  onChange={(e) => setContact((f) => ({ ...f, name: e.target.value }))}
                  name="name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full h-12 text-[16px] rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700/30"
                  placeholder="you@email.com"
                  value={contact.email}
                  onChange={(e) => setContact((f) => ({ ...f, email: e.target.value }))}
                  name="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-sky-700/30"
                  placeholder="How can we help?"
                  value={contact.message}
                  onChange={(e) => setContact((f) => ({ ...f, message: e.target.value }))}
                  name="message"
                  required
                />
              </div>

              <button
                className="btn-3d btn-3d-brand btn-3d-md"
                type="submit"
                disabled={cState === "sending"}
              >
                {cState === "sending" ? "Sending…" : "Send"}
              </button>

              {cState === "error" && (
                <p className="text-sm text-rose-700">Sorry—something went wrong. Please try again or email hello@hiddenprincegeorge.ca.</p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Partner with us */}
      <section className="mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight">Partner with Hidden PG</h2>
          <p className="mt-1 text-slate-600 max-w-3xl">
            Work with us to reach engaged Prince George locals — from businesses to creators.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Photographers */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
              <h3 className="text-lg font-semibold">Contribute photos (local photographers)</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
                <li className="flex gap-2"><span className="inline-block w-4 text-emerald-700">✓</span> Get credited on stories & guides</li>
                <li className="flex gap-2"><span className="inline-block w-4 text-emerald-700">✓</span> Link to your portfolio or Instagram</li>
                <li className="flex gap-2"><span className="inline-block w-4 text-emerald-700">✓</span> Priority for paid shoots as we grow</li>
              </ul>

              {pState === "ok" ? (
                <p className="mt-3 rounded-xl border border-emerald-200 bg-white text-emerald-800 px-4 py-3">
                  Thanks! We’ll review your work and get back to you.
                </p>
              ) : (
                <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={submitPhotographer}>
                  <input type="hidden" name="form" value="photographer" />
                  <input type="hidden" name="source" value="contact_page_partner" />
                  <input
                    name="name"
                    placeholder="Your name"
                    required
                    value={photo.name}
                    onChange={(e) => setPhoto((f) => ({ ...f, name: e.target.value }))}
                    className="h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    value={photo.email}
                    onChange={(e) => setPhoto((f) => ({ ...f, email: e.target.value }))}
                    className="h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <input
                    name="portfolio"
                    placeholder="Portfolio / Instagram"
                    value={photo.portfolio}
                    onChange={(e) => setPhoto((f) => ({ ...f, portfolio: e.target.value }))}
                    className="md:col-span-2 h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <textarea
                    name="notes"
                    placeholder="Anything we should know?"
                    value={photo.notes}
                    onChange={(e) => setPhoto((f) => ({ ...f, notes: e.target.value }))}
                    className="md:col-span-2 rounded-xl border border-slate-300 px-3 py-2"
                  />
                  <div className="md:col-span-2">
                    <button className="btn-3d btn-3d-brand btn-3d-md w-full" disabled={pState === "sending"}>
                      {pState === "sending" ? "Sending…" : "Apply as a contributor"}
                    </button>
                  </div>
                  {pState === "error" && (
                    <p className="md:col-span-2 text-sm text-rose-700">
                      Sorry—something went wrong. Please try again or email hello@hiddenprincegeorge.ca.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Collaborations / Sponsors */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Collaborations & local sponsors</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
                <li className="flex gap-2"><span className="inline-block w-4 text-sky-800">✓</span> Feature your business in a guide</li>
                <li className="flex gap-2"><span className="inline-block w-4 text-sky-800">✓</span> Host a giveaway with our audience</li>
                <li className="flex gap-2"><span className="inline-block w-4 text-sky-800">✓</span> Co-create content or events</li>
              </ul>

              {sState === "ok" ? (
                <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3">
                  Awesome — we’ll be in touch shortly.
                </p>
              ) : (
                <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={submitCollab}>
                  <input type="hidden" name="form" value="partner" />
                  <input type="hidden" name="source" value="contact_page_partner" />
                  <input
                    name="name"
                    placeholder="Your name"
                    required
                    value={collab.name}
                    onChange={(e) => setCollab((f) => ({ ...f, name: e.target.value }))}
                    className="h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    value={collab.email}
                    onChange={(e) => setCollab((f) => ({ ...f, email: e.target.value }))}
                    className="h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <input
                    name="company"
                    placeholder="Business / org (optional)"
                    value={collab.company}
                    onChange={(e) => setCollab((f) => ({ ...f, company: e.target.value }))}
                    className="md:col-span-2 h-12 rounded-xl border border-slate-300 px-3"
                  />
                  <textarea
                    name="idea"
                    placeholder="Tell us your idea"
                    value={collab.idea}
                    onChange={(e) => setCollab((f) => ({ ...f, idea: e.target.value }))}
                    className="md:col-span-2 rounded-xl border border-slate-300 px-3 py-2"
                  />
                  <div className="md:col-span-2">
                    <button className="btn-3d btn-3d-brand btn-3d-md w-full" disabled={sState === "sending"}>
                      {sState === "sending" ? "Sending…" : "Request collaboration info"}
                    </button>
                  </div>
                  {sState === "error" && (
                    <p className="md:col-span-2 text-sm text-rose-700">
                      Sorry—something went wrong. Please try again or email hello@hiddenprincegeorge.ca.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
