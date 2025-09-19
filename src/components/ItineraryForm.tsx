import React, { useState } from "react";

// Same backend your site uses elsewhere
const ENDPOINT = "/api/lead";

export default function ItineraryForm({
  source = "blog_footer",
}: { source?: string }) {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      form: "itinerary",
      source,
      hp: "", // honeypot (kept blank)
      email: String(fd.get("email") || ""),
    };

    try {
      // JSON first (typical for Vercel), then fallback to multipart
      let r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const fd2 = new FormData();
        Object.entries(payload).forEach(([k, v]) => fd2.set(k, String(v ?? "")));
        r = await fetch(ENDPOINT, { method: "POST", body: fd2 });
      }
      if (!r.ok) throw new Error(await r.text());
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e?.message || "Failed to send");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 text-emerald-800 p-4">
        Thanks! Check your inbox for the PDF and tips.
      </div>
    );
  }

  return (
    <form id="pgItineraryForm" onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row"
      aria-label="Get the 48-Hour PG Itinerary"
    >
      {/* required by your backend */}
      <input type="hidden" name="form" value="itinerary" />
      <input type="hidden" name="source" value={source} />
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

      <input
        type="email" name="email" required placeholder="you@example.com"
        className="flex-1 px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-3d btn-3d-emerald btn-3d-md text-white font-semibold font-[Inter] leading-tight tracking-[0.01em] antialiased whitespace-nowrap"
      >
        {status === "loading" ? "Sending…" : "Send it"}
      </button>

      {status === "error" && (
        <div className="text-red-600 text-sm">{err}</div>
      )}
    </form>
  );
}
