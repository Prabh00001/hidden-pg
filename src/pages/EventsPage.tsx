import React, { useMemo, useState } from "react";
import { events } from "../data/events";
import EventCard from "../components/EventCard";

type ModalType = "feature" | "submit";

export default function EventsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  // modal state
  const [modal, setModal] = useState<ModalType | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const now = new Date();

  // Sorts featured first, then by start date (soonest first), while keeping your existing filters.
  const upcoming = useMemo(() => {
    const base = events
      .filter((e) => new Date((e as any).end ?? (e as any).start) >= now)
      .sort((a: any, b: any) => {
        const fa = !!a.featured;
        const fb = !!b.featured;
        if (fa !== fb) return fb ? 1 : -1; // featured first
        return +new Date(a.start) - +new Date(b.start);
      });

    const byCat = cat === "all" ? base : base.filter((e: any) => e.category === cat);

    const query = q.trim().toLowerCase();
    const byQ = query
      ? byCat.filter((e: any) =>
          (
            (e.title || "") +
            " " +
            (e.description || "") +
            " " +
            ((e.tags || []) as string[]).join(" ")
          )
            .toLowerCase()
            .includes(query)
        )
      : byCat;

    return byQ;
  }, [q, cat]);

  // JSON-LD for SEO (ItemList of Events)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: upcoming.map((e: any, i: number) => ({
      "@type": "Event",
      position: i + 1,
      name: e.title,
      startDate: e.start,
      endDate: e.end ?? e.start,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: e.location,
        address: e.address ?? "Prince George, BC"
      },
      url: e.url ?? "https://hiddenprincegeorge.ca/events",
      image: e.image ? [e.image] : undefined,
      description: e.description ?? ""
    }))
  };

  const cats = ["all","music","food","sports","family","arts","community","business","outdoors","other"];

  // submit handler for the modal form
  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal) return;

    setSending(true);
    setDone(false);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    // enrich payload for the API
    fd.set("form", "event");
    fd.set("subtype", modal); // "feature" | "submit"
    fd.set("source", "events_page_modal");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });

      if (res.ok) {
        (e.currentTarget as HTMLFormElement).reset();
        setDone(true);
      } else {
        const txt = await res.text();
        setErr(txt || `Request failed (${res.status})`);
      }
    } catch (error: any) {
      setErr(String(error?.message || error));
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Events in Prince George</h1>
        <p className="text-slate-600 mt-1">Find something to do this week and beyond.</p>
      </header>

      {/* Feature Event CTA (with spacing below) */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">
            Feature your event — priority placement
          </h3>
          <p className="text-sm text-slate-600 truncate">
            Quick approval · Clickable links · Reaches locals planning their weekend
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Primary: Buy Feature (opens modal) */}
          <button
            type="button"
            onClick={() => { setModal("feature"); setDone(false); setErr(null); }}
            className="inline-flex items-center rounded-full bg-emerald-600 text-white px-3.5 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-700 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Buy Feature
          </button>

          {/* Secondary: Submit Details (opens modal) */}
          <button
            type="button"
            onClick={() => { setModal("submit"); setDone(false); setErr(null); }}
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
          >
            Submit Details
          </button>
        </div>
      </div>

      {/* Search + category filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events (music, market, family...)"
          className="w-full md:w-80 rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                cat === c ? "bg-emerald-600 text-white border-emerald-600" : "hover:bg-slate-50"
              }`}
            >
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((ev: any) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </section>

      {upcoming.length === 0 && (
        <p className="text-slate-600 mt-8">No upcoming events match your filters.</p>
      )}

      {/* ===== Modal ===== */}
      {modal && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModal(null)}
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {modal === "feature" ? "Buy Event Feature" : "Submit Event Details"}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="px-5 py-4 grid gap-3">
              {/* success */}
              {done && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 px-3 py-2 text-sm">
                  Thanks! We’ve received your {modal === "feature" ? "feature request" : "event details"}.
                </div>
              )}
              {/* error (kept quiet unless truly non-2xx) */}
              {err && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-800 px-3 py-2 text-sm">
                  {err}
                </div>
              )}

              <input
                type="text"
                name="title"
                required
                placeholder="Event title"
                className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  name="date"
                  required
                  placeholder="Date"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="time"
                  name="time"
                  placeholder="Time (optional)"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder="Location / Address"
                className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="url"
                name="link"
                placeholder="Event link (website, FB, ticketing)"
                className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea
                name="notes"
                rows={4}
                placeholder="Short description / anything else"
                className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Your email (for confirmation)"
                className="rounded-xl border border-slate-300 px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[.98]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-700 active:scale-[.98] disabled:opacity-60"
                >
                  {sending ? "Sending…" : modal === "feature" ? "Send feature request" : "Send details"}
                </button>
              </div>
            </form>

            {/* hidden fields posted with the form */}
            <form style={{ display: "none" }}>
              <input type="hidden" name="form" value="event" />
              <input type="hidden" name="subtype" value={modal || ""} />
              <input type="hidden" name="source" value="events_page_modal" />
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
