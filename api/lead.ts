// api/lead.ts — Vercel Web API (Request/Response)
// Success: 204 No Content | Error: 500 JSON
import { Resend } from "resend";
export const runtime = "nodejs";

// --- Resend setup ---
const resend = new Resend(process.env.RESEND_API_KEY || "");

// --- CORS: allow your site + localhost ---
const ALLOWED_ORIGINS = new Set([
  "https://hiddenprincegeorge.ca",
  "http://localhost:5173",
]);

function cors(origin: string | null) {
  const allow =
    origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith(".vercel.app"))
      ? origin
      : "https://hiddenprincegeorge.ca";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 204,
    headers: cors(req.headers.get("origin")),
  });
}

// --- Helpers ---
function s(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}
async function readJson(req: Request) {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return {} as Record<string, unknown>;
  }
}
// Simple email check (good enough to avoid Resend 422s)
const EMAIL_OK = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// --- POST handler ---
export async function POST(req: Request) {
  const headers = cors(req.headers.get("origin"));

  try {
    const body = await readJson(req);

    // 1) Read form FIRST (newsletter | gem | contact)
    const form = s(body["form"] || body["topic"] || "contact");

    // 2) Honeypot: ignore for newsletter (extensions may fill hidden fields)
    if (body["hp"] && form !== "newsletter") {
      return new Response(null, { status: 204, headers });
    }

    // 3) Common fields
    const email = s(body["email"]);
    const place = s(body["place"]);
    const location = s(body["location"]);
    const link = s(body["link"]);
    const notes = s(body["notes"]);
    const source = s(body["source"] || "cta_section");

    // 4) Message build
    const TO = process.env.LEAD_TO || "hello@hiddenprincegeorge.ca";
    const FROM =
      process.env.LEAD_FROM || "Hidden PG <hello@hiddenprincegeorge.ca>";

    let subject = "Hidden PG – Lead";
    let html = "";
    let text = "";

    if (form === "newsletter") {
      subject = "Newsletter signup (CTA)";
      html = `
        <h2>Newsletter signup</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Source:</b> ${source}</p>`;
      text = `Newsletter signup
Email: ${email}
Source: ${source}
`;
    } else if (form === "gem") {
      subject = "New Hidden Gem suggestion";
      html = `
        <h2>Hidden Gem Suggestion</h2>
        <p><b>Place:</b> ${place}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Link:</b> ${link}</p>
        <p><b>Notes:</b><br/>${notes.replace(/\n/g, "<br/>")}</p>
        <p><b>Sender email:</b> ${email}</p>
        <p><b>Source:</b> ${source}</p>`;
      text = `Hidden Gem Suggestion
Place: ${place}
Location: ${location}
Link: ${link}
Notes: ${notes}
Sender email: ${email}
Source: ${source}
`;
    } else {
      // Fallback keeps endpoint flexible
      subject = "Hidden PG – Lead";
      html = `<pre>${JSON.stringify(body, null, 2)}</pre>`;
      text = JSON.stringify(body, null, 2);
    }

    // 5) Send via Resend — only include replyTo if valid email
    const replyTo = EMAIL_OK(email) ? email : undefined;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}), // avoid invalid reply_to 422
    });

    if (error) {
      // Bubble up as a real error for Network tab visibility
      throw new Error(error.message || "Email send failed");
    }

    // 6) Success → 204 No Content (frontend only checks res.ok)
    return new Response(null, { status: 204, headers });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Email send failed" }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
}
