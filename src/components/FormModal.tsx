import React, { useEffect, useState } from "react";

// IMPORTANT: match your working site endpoint exactly.
// If you prefer env-driven, you can use: const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/lead";
const FORM_ENDPOINT = "/api/lead";

type Status = "idle" | "loading" | "success" | "error";

export function FormModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [debug, setDebug] = useState<string>("");
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    const s = (window as any).__HPG_FORM_SOURCE__;
    if (typeof s === "string") setSource(s);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setDebug("");

    const fd = new FormData(e.currentTarget);

    // match your backend's conventions
    if (!fd.get("form")) fd.set("form", "feature");                              // identifies this form
    if (!fd.get("source")) fd.set("source", source || "blog_modal");             // attribution
    if (!fd.get("hp")) fd.set("hp", "");                                         // honeypot field name your site uses

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const business = String(fd.get("business") || "");
    const website = String(fd.get("website") || "");
    const notes = String(fd.get("notes") || "");

    // Build payload + common aliases (covers typical handlers)
    const payload = {
      form: String(fd.get("form")),
      source: String(fd.get("source")),
      hp: String(fd.get("hp")),
      name,
      email,
      business,
      website,
      notes,
      // aliases some handlers use:
      company: business,
      url: website,
      message: notes,
      subject: business ? `Feature request: ${business}` : "Feature request",
    };

    try {
      // Most Vercel handlers expect JSON
      let res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      // If JSON fails (405/415/etc), retry as multipart form-data
      if (!res.ok) {
        const fd2 = new FormData();
        Object.entries(payload).forEach(([k, v]) => fd2.set(k, String(v ?? "")));
        res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd2 });
      }

      const ct = res.headers.get("content-type") || "";
      const bodyText = await (ct.includes("application/json")
        ? res.clone().json().then(JSON.stringify).catch(() => res.text())
        : res.text());

      if (!res.ok) {
        setDebug(`HTTP ${res.status} ${res.statusText}\n${bodyText || "(no body)"}`);
        throw new Error("Failed to send");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message || "Failed to send");
      if (!debug) setDebug("No additional server message.");
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[min(720px,92vw)] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Feature your business</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        {status === "success" ? (
          <div className="p-4 rounded bg-emerald-50 text-emerald-700">
            Thanks! We’ve received your info and will reach out soon.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            {/* Honeypot (leave blank) */}
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />
            {/* Attribution */}
            <input type="hidden" name="form" value="feature" readOnly />
            <input type="hidden" name="source" value={source} readOnly />

            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Your name" className="border rounded px-3 py-2" />
              <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" />
            </div>
            <input name="business" placeholder="Business name" required className="border rounded px-3 py-2" />
            <input name="website" placeholder="Website (optional)" className="border rounded px-3 py-2" />
            <textarea name="notes" placeholder="Tell us about your business…" rows={4} className="border rounded px-3 py-2"></textarea>

            {status === "error" && (
              <div className="text-red-600 text-sm">
                Failed to send{error ? `: ${error}` : ""}<br />
                {debug && <pre className="whitespace-pre-wrap text-xs mt-1 text-slate-500">{debug}</pre>}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                disabled={status === "loading"}
                className="rounded bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send"}
              </button>
              <button type="button" onClick={onClose} className="text-slate-600 hover:text-slate-800">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
